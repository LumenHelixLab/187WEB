#!/usr/bin/env bash
# 187web-compiler — pre-prompt-compiler for Master Prompt Manifest v2.0
# Detects power mode, routes folder → persona, emits JSON for agent injection.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
MANIFEST="${HOME}/.187web/prompts/MANIFEST.xml"
FALLBACK="${SKILL_DIR}/references/MANIFEST.xml"

PROMPT_ID=""
LIST_ONLY=0
QUIET=0
DO_WRITE=0
DO_EMIT=0
RELAY_URL="${E187WEB_RELAY_URL:-http://localhost:18780}"
CWD="${PWD}"

usage() {
  cat <<'EOF'
187web-compiler — Master Prompt Manifest compiler

Usage:
  187web-compiler.sh [options]

Options:
  --prompt <id>   Compile a specific prompt ID
  --list          List all prompt IDs and exit
  --quiet         Suppress stderr diagnostics
  --write         Persist JSON to ~/.187web/last-compile.json
  --emit          POST JSON to telemetry relay (localhost:18780)
  --manifest <p>  Override manifest XML path
  -h, --help      Show this help

Environment:
  187WEB_POWER_MODE   Force high|low|standard
  187WEB_CWD          Override working directory for folder routing
  E187WEB_RELAY_URL   Telemetry relay base URL

Output: JSON to stdout (OmniQube / agent injection)
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --prompt) PROMPT_ID="${2:-}"; shift 2 ;;
    --list) LIST_ONLY=1; shift ;;
    --quiet) QUIET=1; shift ;;
    --write) DO_WRITE=1; shift ;;
    --emit) DO_EMIT=1; DO_WRITE=1; shift ;;
    --manifest) MANIFEST="${2:-}"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 1 ;;
  esac
done

log() { [[ "$QUIET" -eq 1 ]] || echo "[187web-compiler] $*" >&2; }

persist_and_emit() {
  local json="$1"
  if [[ "$DO_WRITE" -eq 1 ]]; then
    mkdir -p "${HOME}/.187web"
    printf '%s\n' "$json" > "${HOME}/.187web/last-compile.json"
    log "wrote ${HOME}/.187web/last-compile.json"
  fi
  if [[ "$DO_EMIT" -eq 1 ]]; then
    if command -v curl >/dev/null 2>&1; then
      curl -sf -X POST -H "Content-Type: application/json" -d "$json" "${RELAY_URL}/compile" >/dev/null \
        && log "emitted to ${RELAY_URL}/compile" \
        || log "emit failed (relay offline?)"
    else
      log "emit skipped: curl not found"
    fi
  fi
  printf '%s\n' "$json"
}

# Resolve manifest
if [[ ! -f "$MANIFEST" ]]; then
  if [[ -f "$FALLBACK" ]]; then
    MANIFEST="$FALLBACK"
    log "Using fallback manifest: $MANIFEST"
  else
    echo '{"error":"MANIFEST.xml not found"}' >&2
    exit 1
  fi
fi

CWD="${187WEB_CWD:-$CWD}"

# --- Power mode detection ---
detect_power_mode() {
  if [[ -n "${187WEB_POWER_MODE:-}" ]]; then
    echo "${187WEB_POWER_MODE}"
    return
  fi

  local cores
  cores="$(getconf _NPROCESSORS_ONLN 2>/dev/null || echo 4)"

  # Battery check (Linux)
  if [[ -f /sys/class/power_supply/BAT0/status ]]; then
    local bat
    bat="$(cat /sys/class/power_supply/BAT0/status 2>/dev/null || echo Unknown)"
    if [[ "$bat" == "Discharging" && "$cores" -lt 8 ]]; then
      echo "low"
      return
    fi
  fi

  # GPU hint
  if command -v nvidia-smi >/dev/null 2>&1; then
    if nvidia-smi -L >/dev/null 2>&1 && [[ "$cores" -ge 8 ]]; then
      echo "high"
      return
    fi
  fi

  if [[ "$cores" -ge 8 ]]; then
    echo "high"
  elif [[ "$cores" -lt 4 ]]; then
    echo "low"
  else
    echo "standard"
  fi
}

POWER_MODE="$(detect_power_mode)"
log "power_mode=$POWER_MODE cwd=$CWD"

# --- Python XML compiler (preferred) ---
if command -v python3 >/dev/null 2>&1; then
  JSON_OUT="$(python3 - "$MANIFEST" "$POWER_MODE" "$CWD" "$PROMPT_ID" "$LIST_ONLY" <<'PY'
import sys, json, xml.etree.ElementTree as ET
from pathlib import PurePosixPath

manifest_path, power_mode, cwd, prompt_id, list_only = sys.argv[1:6]
list_only = list_only == "1"
tree = ET.parse(manifest_path)
root = tree.getroot()

def prompt_entry(p):
    nt = p.find("neuro_toxin")
    neuro = {}
    if nt is not None:
        neuro = {k: v for k, v in nt.attrib.items()}
    vars_ = [v.attrib.get("name") for v in p.findall("./vars/var")]
    return {
        "id": p.attrib.get("id"),
        "alias": p.attrib.get("alias"),
        "layer": p.attrib.get("layer_id") or p.getparent_layer,
        "skill": p.attrib.get("skill") or p.attrib.get("skill_ref") or "",
        "persona": p.attrib.get("persona", ""),
        "power": p.attrib.get("power", "any"),
        "directive": (p.findtext("directive") or "").strip(),
        "vars": vars_,
        "neuro_toxin": neuro,
    }

# Index prompts by layer
all_prompts = []
for layer in root.findall("layer"):
    lid = layer.attrib.get("id", "")
    lname = layer.attrib.get("name", "")
    lskill = layer.attrib.get("skill", "")
    for p in layer.findall("prompt"):
        entry = prompt_entry(p)
        entry["layer"] = lid
        entry["layer_name"] = lname
        if not entry["skill"]:
            entry["skill"] = lskill
        all_prompts.append(entry)

if list_only:
    print(json.dumps({"prompts": [p["id"] for p in all_prompts]}, indent=2))
    sys.exit(0)

# Folder routing
selected_id = prompt_id
if not selected_id:
    for route in root.findall("./folder_routing/route"):
        path = route.attrib.get("path", "")
        if path and path.rstrip("/") in cwd.replace("\\", "/"):
            selected_id = route.attrib.get("prompt", "")
            break

# Power-mode default
if not selected_id:
    for mode in root.findall("./power_routing/mode"):
        if mode.attrib.get("id") == power_mode:
            selected_id = mode.findtext("default_prompt", "").strip()
            break

# Power filter: prefer prompts matching power or "any"
def power_ok(p):
    pw = p.get("power", "any")
    return pw in ("any", power_mode)

candidates = [p for p in all_prompts if p["id"] == selected_id]
if not candidates:
    pool = [p for p in all_prompts if power_ok(p)]
    # Fallback by power routing default persona layer
    for mode in root.findall("./power_routing/mode"):
        if mode.attrib.get("id") == power_mode:
            fallback = mode.findtext("default_prompt", "").strip()
            candidates = [p for p in all_prompts if p["id"] == fallback]
            break
    if not candidates and pool:
        candidates = [pool[0]]

if not candidates:
    print(json.dumps({"error": "no matching prompt", "power_mode": power_mode}))
    sys.exit(1)

chosen = candidates[0]
out = {
    "ecosystem": "187web",
    "manifest_version": root.attrib.get("version", "2.0"),
    "power_mode": power_mode,
    "cwd": cwd,
    "prompt_id": chosen["id"],
    "alias": chosen.get("alias"),
    "layer": chosen.get("layer"),
    "layer_name": chosen.get("layer_name"),
    "skill": chosen.get("skill"),
    "persona": chosen.get("persona"),
    "directive": chosen.get("directive"),
    "vars": chosen.get("vars"),
    "neuro_toxin": chosen.get("neuro_toxin"),
    "compiler": "187web-compiler.sh",
    "compiled_at": __import__("datetime").datetime.utcnow().isoformat() + "Z",
}
print(json.dumps(out, indent=2))
PY
  )
  persist_and_emit "$JSON_OUT"
  exit $?
fi

# --- Grep fallback (no python3) ---
if [[ "$LIST_ONLY" -eq 1 ]]; then
  grep -oP 'id="\K[^"]+' "$MANIFEST" | grep -v '^[0-9]*$' | sort -u | \
    python3 -c "import sys,json; print(json.dumps({'prompts':[l.strip() for l in sys.stdin]},indent=2))" 2>/dev/null || \
    grep -o 'id="[^"]*"' "$MANIFEST" | sed 's/id="//;s/"//'
  exit 0
fi

if [[ -z "$PROMPT_ID" ]]; then
  case "$POWER_MODE" in
    high) PROMPT_ID="generative-drafting" ;;
    low) PROMPT_ID="edge-ai-deployment-specialist" ;;
    *) PROMPT_ID="ml-systems-architect" ;;
  esac
fi

DIRECTIVE="$(awk -v id="$PROMPT_ID" '
  $0 ~ "id=\"" id "\"" { found=1 }
  found && /<directive>/ { gsub(/.*<directive>/,""); gsub(/<\/directive>.*/,""); print; exit }
' "$MANIFEST")"

JSON_OUT="$(cat <<EOF
{
  "ecosystem": "187web",
  "power_mode": "$POWER_MODE",
  "prompt_id": "$PROMPT_ID",
  "directive": $(python3 -c "import json,sys; print(json.dumps(sys.stdin.read()))" <<< "$DIRECTIVE" 2>/dev/null || echo "\"$DIRECTIVE\""),
  "compiler": "187web-compiler.sh",
  "fallback": true
}
EOF
)"
persist_and_emit "$JSON_OUT"