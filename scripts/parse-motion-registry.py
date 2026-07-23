#!/usr/bin/env python3
"""Parse docs/handoffs/187-motion-gsap-skill-registry-v3.md (the 207-item
GSAP/Three.js interaction-pattern registry) into a canonical JSON catalog and
per-skill markdown catalog tables under each motion skill's references/.

Source of truth is the markdown table itself — this script never hand-copies
row content, so the emitted catalog is provably faithful to the upload.
Re-run after any edit to the source registry:

    python3 scripts/parse-motion-registry.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/handoffs/187-motion-gsap-skill-registry-v3.md"
OUT_JSON = ROOT / ".claude/skills/187gsap/references/EFFECT-REGISTRY.json"

MAIN_ROW = re.compile(
    r"^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*\*\*`(/187[a-z0-9]+)`\*\*\s*\|\s*\*(.+?)\*\s*\|\s*"
    r"\*\*Logic\*\*:\s*(.+?)\s*\*\*Trigger\*\*:\s*(.+?)\.\s*\|\s*$"
)
HYBRID_ROW = re.compile(
    r"^\|\s*(\d+)\s*\|\s*\*\*`(/187[a-z0-9]+)`\*\*\s*\|\s*\*(.+?)\*\s*\|\s*"
    r"\*\*Logic\*\*:\s*(.+?)\s*\*\*Trigger\*\*:\s*(.+?)\.\s*\|\s*$"
)

# Owner classification. Two passes, deliberately asymmetric in strictness:
#
# 1. TITLE_RULES match only against `command` + `name` (the terse, deliberate
#    labels) — safe to match on short substrings like "scroll" or "text"
#    because these fields don't contain incidental prose.
# 2. LOGIC_RULES match against the free-text `logic` field too, but ONLY for
#    highly specific multi-word / technical terms unlikely to appear as an
#    incidental English word (e.g. "point cloud", "howler.js") — a bare word
#    like "highlight" or "scroll" is NOT safe here because logic prose
#    routinely mentions "highlights the terrain" or "on scroll/click" as
#    incidental phrasing, not a category signal.
#
# First matching rule wins, title rules checked before logic rules, in the
# listed order.
TITLE_RULES = [
    ("187type", [
        "text", "typo", "typing", "font", "underline", "word", "character",
        "gradwave", "scramble", "highlight", "readtime",
    ]),
    ("187audio", ["audio", "howler", "colorwaveaudio", "sound"]),
    ("187viz", ["pixelgrid", "gridvisual", "fiberorb", "pointcloud"]),
    ("187scroll", [
        "scroll", "parallax", "sticky", "depthtiles", "orbittiles",
        "globe", "footerparallax", "progressnav", "progressnum",
        "progressbar", "scrolldir", "sectiontheme", "seqscroll",
        "motionpathscroll", "pathscroll", "steptime", "sticksteps",
        "stickfeat", "stickytitle",
    ]),
    ("187hero", [
        "hero", "shaderwipe", "volumefog", "holointeract", "mascotface",
        "willemloader", "logoload", "welcomewords", "minigame",
    ]),
    ("187model", [
        "cylcarousel", "radial3d", "cube3d", "tornado3d", "perspective3d",
        "physicscascade",
    ]),
]

LOGIC_RULES = [
    ("187audio", ["howler.js", "web audio", "analysernode"]),
    ("187viz", ["point cloud", "node-edge", "force layout"]),
    ("187scroll", ["scrolltrigger", "scrub:", "pinned", "pin wrapper"]),
]

DEFAULT_OWNER = "187gsap"

OWNER_LABELS = {
    "187gsap": "187GSAP — core GSAP mechanics (sliders, cursors, transitions, nav, forms, loaders)",
    "187type": "187TYPE — kinetic / variable / reactive typography",
    "187model": "187MODEL — 3D product / carousel / perspective object systems",
    "187scroll": "187SCROLL — scroll-driven camera, parallax, and pinned narratives",
    "187audio": "187AUDIO — audio playback and audio-reactive geometry",
    "187viz": "187VIZ — 3D / data-driven visualization",
    "187hero": "187HERO — full-screen immersive hero and first-impression systems",
}


def classify(command: str, rebrand: str, logic: str) -> str:
    title = f"{command} {rebrand}".lower()
    for owner, keywords in TITLE_RULES:
        if any(kw in title for kw in keywords):
            return owner
    logic_l = logic.lower()
    for owner, keywords in LOGIC_RULES:
        if any(kw in logic_l for kw in keywords):
            return owner
    return DEFAULT_OWNER


def parse():
    text = SOURCE.read_text(encoding="utf-8")
    main_section, _, rest = text.partition("## 🚀 /187 HYBRID EXPANSION")
    hybrid_section = rest

    entries = []
    for line in main_section.splitlines():
        m = MAIN_ROW.match(line.strip())
        if not m:
            continue
        idx, resource, command, rebrand, logic, trigger = m.groups()
        entries.append({
            "id": int(idx),
            "command": command,
            "source_resource": resource.strip(),
            "name": rebrand.strip(),
            "logic": logic.strip(),
            "triggers": trigger.strip(),
            "hybrid": False,
        })

    for line in hybrid_section.splitlines():
        m = HYBRID_ROW.match(line.strip())
        if not m:
            continue
        idx, command, rebrand, logic, trigger = m.groups()
        entries.append({
            "id": int(idx),
            "command": command,
            "source_resource": None,
            "name": rebrand.strip(),
            "logic": logic.strip(),
            "triggers": trigger.strip(),
            "hybrid": True,
        })

    entries.sort(key=lambda e: e["id"])
    for e in entries:
        e["owner"] = classify(e["command"], e["name"], e["logic"])

    return entries


def write_json(entries):
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "source": "docs/handoffs/187-motion-gsap-skill-registry-v3.md",
        "generated_by": "scripts/parse-motion-registry.py",
        "count": len(entries),
        "owners": OWNER_LABELS,
        "entries": entries,
    }
    OUT_JSON.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def write_catalogs(entries):
    by_owner: dict[str, list[dict]] = {owner: [] for owner in OWNER_LABELS}
    for e in entries:
        by_owner[e["owner"]].append(e)

    for owner, items in by_owner.items():
        skill_dir = ROOT / ".claude/skills" / owner / "references"
        skill_dir.mkdir(parents=True, exist_ok=True)
        out = skill_dir / "EFFECT-CATALOG.md"
        lines = [
            f"# {owner.upper()} effect catalog",
            "",
            f"Generated from [`docs/handoffs/187-motion-gsap-skill-registry-v3.md`](../../../../docs/handoffs/187-motion-gsap-skill-registry-v3.md)"
            f" by `scripts/parse-motion-registry.py`. Do not hand-edit — re-run the script after"
            f" changing the source registry or the classification rules in the script.",
            "",
            f"**{len(items)} patterns** classified to this skill "
            f"(of {len(entries)} total in the registry). Full machine-readable registry: "
            f"[`EFFECT-REGISTRY.json`](../../187gsap/references/EFFECT-REGISTRY.json).",
            "",
            "| # | Command | Name | Logic | Trigger | Hybrid (Three.js) |",
            "|---|---|---|---|---|---|",
        ]
        for e in items:
            logic = e["logic"].replace("|", "\\|")
            trig = e["triggers"].replace("|", "\\|")
            hybrid = "yes" if e["hybrid"] else ""
            lines.append(f"| {e['id']} | `{e['command']}` | {e['name']} | {logic} | {trig} | {hybrid} |")
        out.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main():
    entries = parse()
    expected = 207
    if len(entries) != expected:
        raise SystemExit(
            f"parsed {len(entries)} entries, expected {expected} — check the regex against the source table"
        )
    write_json(entries)
    write_catalogs(entries)

    counts = {}
    for e in entries:
        counts[e["owner"]] = counts.get(e["owner"], 0) + 1
    print(f"Parsed {len(entries)} entries (197 main + 10 hybrid).")
    print("Distribution:")
    for owner in OWNER_LABELS:
        print(f"  {owner:10s} {counts.get(owner, 0)}")


if __name__ == "__main__":
    main()
