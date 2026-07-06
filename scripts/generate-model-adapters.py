#!/usr/bin/env python3
"""Generate model-specific adaptations of the 187web skill library.

Reads canonical skills from .claude/skills/ and emits:
  - .gemini/skills/<name>/SKILL.md
  - .kimi/skills/<name>/SKILL.md
  - .chatgpt/skills/<name>/SKILL.md
  - .ollama/modelfiles/<name>/Modelfile
  - .herme/agents/<name>/system.md
  - .herme/agents/<name>/SKILL.md

Each adapter preserves the source content and adds model-specific framing.
"""
import re
import sys
from pathlib import Path
from yaml import safe_load

ROOT = Path("D:/projects/187webdesign")
SOURCE = ROOT / ".claude/skills"
OUT_ROOTS = {
    "gemini": ROOT / ".gemini/skills",
    "kimi": ROOT / ".kimi/skills",
    "chatgpt": ROOT / ".chatgpt/skills",
    "ollama": ROOT / ".ollama/modelfiles",
    "herme": ROOT / ".herme/agents",
}


def parse_skill(path: Path):
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        raise ValueError(f"{path}: missing frontmatter")
    _, rest = text.split("---", 1)
    fm_text, body = rest.split("---", 1)
    frontmatter = safe_load(fm_text)
    return frontmatter, body.lstrip("\n")


def extract_system_prompt(body: str, default_name: str) -> str:
    # 1. First blockquote under ## Directive
    m = re.search(r"## Directive\s*\n\n*(>.*(?:\n>.*)*)", body, re.IGNORECASE)
    if m:
        return "\n".join(line.lstrip("> ").strip() for line in m.group(1).splitlines())

    # 2. Any blockquote starting with **Strict developer directive.**
    m = re.search(r"> \*\*Strict developer directive\.\*\*\s*(.*(?:\n> .*)*)", body)
    if m:
        return "\n".join(line.lstrip("> ").strip() for line in m.group(0).splitlines())

    # 3. First non-empty paragraph that is not a heading/link/suite line
    for para in body.split("\n\n"):
        lines = [l.strip() for l in para.splitlines() if l.strip()]
        if not lines:
            continue
        if lines[0].startswith("#") or lines[0].startswith("[") or lines[0].startswith("**Suite:**"):
            continue
        return " ".join(lines)

    return f"You are the {default_name} skill in the 187web Ecosystem."


def temperature_from_body(body: str) -> float:
    # Derive a sensible temperature from neuro_toxin / lethality hints
    text = body.lower()
    if re.search(r"lethality[^\n]*max", text):
        return 0.2
    if re.search(r"lethality[^\n]*medium", text):
        return 0.5
    if re.search(r"lethality[^\n]*low", text):
        return 0.8
    return 0.6


def folded(text: str) -> str:
    return text.replace("\n", "\n  ")


def gemini_file(name: str, desc: str, system: str, body: str) -> str:
    return f'''---
name: {name}
description: >-
  {folded(desc)}
model_adapter: gemini
system_instruction: >-
  {folded(system)}
---

> **Gemini adapter:** Load as a system instruction. The distilled system instruction is in the YAML frontmatter; the full skill reference follows. Source: [`../../.claude/skills/{name}/SKILL.md`](../../.claude/skills/{name}/SKILL.md).

{body}
'''


def kimi_file(name: str, desc: str, body: str) -> str:
    return f'''---
name: {name}
description: >-
  {folded(desc)}
model_adapter: kimi
---

> **Kimi adapter:** Load via the Kimi Skill tool or place in your Kimi skills directory. Source: [`../../.claude/skills/{name}/SKILL.md`](../../.claude/skills/{name}/SKILL.md).

{body}
'''


def chatgpt_file(name: str, desc: str, body: str) -> str:
    return f'''---
name: {name}
description: >-
  {folded(desc)}
model_adapter: chatgpt
---

> **ChatGPT adapter:** Use the markdown below as the custom GPT / system instructions. Source: [`../../.claude/skills/{name}/SKILL.md`](../../.claude/skills/{name}/SKILL.md).

{body}
'''


def ollama_file(name: str, system: str, temp: float) -> str:
    return f'''# Modelfile for {name}
# Source: ../../.claude/skills/{name}/SKILL.md
# Replace <base-model> with a capable local model, e.g. llama3.1, mistral-nemo, qwen2.5.

FROM <base-model>

SYSTEM """
You are the {name} skill in the 187web Ecosystem.

{system}
"""

# Parameter guidance: lower temperature for high-lethality / max-precision skills.
PARAMETER temperature {temp}
PARAMETER top_p 0.9
'''


def herme_system_file(name: str, system: str) -> str:
    return f'''<|im_start|>system
You are the {name} agent in the 187web Ecosystem.

{system}
<|im_end|>
'''


def herme_skill_file(name: str, desc: str, body: str) -> str:
    return f'''---
name: {name}
description: >-
  {folded(desc)}
model_adapter: hermes
---

> **Hermes adapter:** Use `system.md` as the system message for Hermes-based local LLMs (Ollama, lm-studio, etc.). Source: [`../../.claude/skills/{name}/SKILL.md`](../../.claude/skills/{name}/SKILL.md).

{body}
'''


def main():
    counts = {k: 0 for k in OUT_ROOTS}
    errors = 0

    for skill_dir in sorted(SOURCE.iterdir()):
        src = skill_dir / "SKILL.md"
        if not src.is_file():
            continue
        try:
            fm, body = parse_skill(src)
        except Exception as e:
            print(f"skip {skill_dir.name}: {e}", file=sys.stderr)
            errors += 1
            continue

        name = fm.get("name", skill_dir.name)
        desc = fm.get("description", f"Use when working with the {name} skill.")
        system = extract_system_prompt(body, name)
        temp = temperature_from_body(body)

        # Gemini
        out = OUT_ROOTS["gemini"] / name / "SKILL.md"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(gemini_file(name, desc, system, body), encoding="utf-8")
        counts["gemini"] += 1

        # Kimi
        out = OUT_ROOTS["kimi"] / name / "SKILL.md"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(kimi_file(name, desc, body), encoding="utf-8")
        counts["kimi"] += 1

        # ChatGPT
        out = OUT_ROOTS["chatgpt"] / name / "SKILL.md"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(chatgpt_file(name, desc, body), encoding="utf-8")
        counts["chatgpt"] += 1

        # Ollama
        out = OUT_ROOTS["ollama"] / name / "Modelfile"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(ollama_file(name, system, temp), encoding="utf-8")
        counts["ollama"] += 1

        # Herme
        agent_dir = OUT_ROOTS["herme"] / name
        agent_dir.mkdir(parents=True, exist_ok=True)
        (agent_dir / "system.md").write_text(herme_system_file(name, system), encoding="utf-8")
        (agent_dir / "SKILL.md").write_text(herme_skill_file(name, desc, body), encoding="utf-8")
        counts["herme"] += 1

    print("Generated model adapters:")
    for k, v in counts.items():
        print(f"  {k}: {v}")
    if errors:
        print(f"{errors} errors", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
