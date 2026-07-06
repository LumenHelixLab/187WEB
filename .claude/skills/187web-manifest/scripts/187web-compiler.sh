#!/usr/bin/env bash
# 187web-compiler.sh — Master Prompt Manifest compiler v2.1
#
# Grounded inputs (real files / real hardware signals):
#   - CPU parallelism: getconf _NPROCESSORS_ONLN / nproc
#   - Battery state: /sys/class/power_supply/BAT0/status (Linux)
#   - GPU presence: nvidia-smi -L (NVIDIA only)
#   - Working directory: $PWD or $E187WEB_CWD (maps to folder_routing rules)
#   - Manifest file: ~/.187web/prompts/MANIFEST.xml or fallback references/MANIFEST.xml
#
# Selection precedence:
#   1. --prompt <id>
#   2. folder_routing match from manifest
#   3. power_routing default for detected power mode
#   4. first prompt that accepts the current power mode
#
# Output: JSON to stdout; optionally persisted to ~/.187web/last-compile.json
#         and POSTed to the telemetry relay.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
REGISTRY="${HOME}/.187web/prompts/MANIFEST.xml"
FALLBACK="${SKILL_DIR}/references/MANIFEST.xml"

PROMPT_ID=""
LIST_ONLY=0
QUIET=0
DO_WRITE=0
DO_EMIT=0
MANIFEST=""
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
  --emit          POST JSON to telemetry relay (also implies --write)
  --manifest <p>  Override manifest XML path
  -h, --help      Show this help

Environment:
  E187WEB_POWER_MODE   Force high|low|standard
  E187WEB_CWD         Override working directory for folder routing
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
      if curl -sf -X POST -H "Content-Type: application/json" -d "$json" "${RELAY_URL}/compile" >/dev/null; then
        log "emitted to ${RELAY_URL}/compile"
      else
        log "emit failed (relay offline?)"
      fi
    else
      log "emit skipped: curl not found"
    fi
  fi
  printf '%s\n' "$json"
}

# Resolve manifest path
if [[ -n "$MANIFEST" ]]; then
  : # user override
elif [[ -f "$REGISTRY" ]]; then
  MANIFEST="$REGISTRY"
  log "Using registry manifest: $MANIFEST"
elif [[ -f "$FALLBACK" ]]; then
  MANIFEST="$FALLBACK"
  log "Using fallback manifest: $MANIFEST"
else
  echo '{"error":"MANIFEST.xml not found"}' >&2
  exit 1
fi

CWD="${E187WEB_CWD:-$CWD}"

# --- Power mode detection ---
detect_power_mode() {
  if [[ -n "${E187WEB_POWER_MODE:-}" ]]; then
    echo "${E187WEB_POWER_MODE}"
    return
  fi

  local cores
  cores="$(getconf _NPROCESSORS_ONLN 2>/dev/null || nproc 2>/dev/null || echo 4)"

  # Battery check (Linux only)
  local bat="Unknown"
  if [[ -f /sys/class/power_supply/BAT0/status ]]; then
    bat="$(cat /sys/class/power_supply/BAT0/status 2>/dev/null || echo Unknown)"
  fi

  if [[ "$bat" == "Discharging" && "$cores" -lt 8 ]]; then
    echo "low"
    return
  fi

  # GPU hint (NVIDIA)
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
detect_python() {
  for cmd in python3 python; do
    if "$cmd" -V >/dev/null 2>&1; then
      command -v "$cmd"
      return 0
    fi
  done
  return 1
}

if detect_python >/dev/null 2>&1; then
  PYTHON_BIN="$(detect_python)"
  JSON_OUT="$($PYTHON_BIN - "$MANIFEST" "$POWER_MODE" "$CWD" "$PROMPT_ID" "$LIST_ONLY" <<'PY'
import sys, json, xml.etree.ElementTree as ET
from pathlib import PurePosixPath

manifest_path, power_mode, cwd, prompt_id, list_only = sys.argv[1:6]
list_only = list_only == "1"
tree = ET.parse(manifest_path)
root = tree.getroot()

def prompt_entry(layer_id, layer_name, layer_skill, p):
    nt = p.find("neuro_toxin")
    neuro = {k: v for k, v in nt.attrib.items()} if nt is not None else {}
    vars_ = [v.attrib.get("name") for v in p.findall("./vars/var") if v.attrib.get("name")]
    return {
        "id": p.attrib.get("id"),
        "alias": p.attrib.get("alias"),
        "layer": layer_id,
        "layer_name": layer_name,
        "skill": p.attrib.get("skill") or p.attrib.get("skill_ref") or layer_skill,
        "persona": p.attrib.get("persona", ""),
        "power": p.attrib.get("power", "any"),
        "directive": (p.findtext("directive") or "").strip(),
        "vars": vars_,
        "neuro_toxin": neuro,
    }

all_prompts = []
for layer in root.findall("layer"):
    lid = layer.attrib.get("id", "")
    lname = layer.attrib.get("name", "")
    lskill = layer.attrib.get("skill", "")
    for p in layer.findall("prompt"):
        entry = prompt_entry(lid, lname, lskill, p)
        if entry["id"]:
            all_prompts.append(entry)

if list_only:
    print(json.dumps({"prompts": [p["id"] for p in all_prompts]}, indent=2))
    sys.exit(0)

selected_id = prompt_id
norm_cwd = cwd.replace("\\", "/")

# Folder routing
if not selected_id:
    for route in root.findall("./folder_routing/route"):
        path = route.attrib.get("path", "")
        if path and path.rstrip("/") in norm_cwd:
            selected_id = route.attrib.get("prompt", "")
            break

# Power-mode default
if not selected_id:
    for mode in root.findall("./power_routing/mode"):
        if mode.attrib.get("id") == power_mode:
            selected_id = (mode.findtext("default_prompt") or "").strip()
            break

def power_ok(p):
    return p.get("power", "any") in ("any", power_mode)

candidates = [p for p in all_prompts if p["id"] == selected_id and power_ok(p)]
if not candidates:
    candidates = [p for p in all_prompts if p["id"] == selected_id]
if not candidates:
    pool = [p for p in all_prompts if power_ok(p)]
    if pool:
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
    "compiled_at": __import__("datetime").datetime.now(__import__("datetime").timezone.utc).isoformat().replace("+00:00", "Z"),
}
print(json.dumps(out, indent=2))
PY
  )"
  persist_and_emit "$JSON_OUT"
  exit $?
fi

# --- Grep fallback (no Python) ---
if [[ "$LIST_ONLY" -eq 1 ]]; then
  grep -oE 'id="[^"]+"' "$MANIFEST" | grep -oE '"[^"]+"' | tr -d '"' | sort -u
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
  "manifest_version": "2.0",
  "power_mode": "$POWER_MODE",
  "prompt_id": "$PROMPT_ID",
  "directive": "$DIRECTIVE",
  "compiler": "187web-compiler.sh",
  "fallback": true
}
EOF
)"
persist_and_emit "$JSON_OUT"
