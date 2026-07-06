# 187web Model Adapters

The 187web Ecosystem skills are model-agnostic by design. This directory contains
per-model adapters so the same skill library loads cleanly into Gemini, Kimi,
ChatGPT, Ollama, and Hermes-based local agents.

**Canonical source:** `.claude/skills/<name>/SKILL.md`  
**Generator:** `scripts/generate-model-adapters.py`

## Layout

```text
.claude/skills/<name>/SKILL.md          # canonical skill
.grok/skills/<name>/SKILL.md            # Grok adaptation (existing)
.gemini/skills/<name>/SKILL.md          # Gemini system-instruction skill
.kimi/skills/<name>/SKILL.md            # Kimi Skill-tool skill
.chatgpt/skills/<name>/SKILL.md         # Custom GPT instructions
.ollama/modelfiles/<name>/Modelfile     # Ollama Modelfile
.herme/agents/<name>/system.md          # Hermes ChatML system message
.herme/agents/<name>/SKILL.md           # Hermes usage reference
```

## Adapter conventions

| Model | Format | How the skill is loaded |
|-------|--------|--------------------------|
| **Grok** | `SKILL.md` | Native Grok skills directory (already present). |
| **Gemini** | `SKILL.md` with `system_instruction` frontmatter | Paste the frontmatter's `system_instruction` into the Gemini API `systemInstruction` field, or read the full skill for context. |
| **Kimi** | `SKILL.md` | Load via Kimi Code CLI's `Skill` tool, or place in your Kimi skills directory. |
| **ChatGPT** | `SKILL.md` | Paste the markdown body into the custom GPT **Instructions** field. |
| **Ollama** | `Modelfile` | `ollama create <name> -f .ollama/modelfiles/<name>/Modelfile` after replacing `<base-model>`. |
| **Hermes** | `system.md` + `SKILL.md` | Use `system.md` as the ChatML system message in Ollama/lm-studio/llama.cpp; keep `SKILL.md` as reference. |

## Regenerating adapters

After editing a canonical `.claude/skills/<name>/SKILL.md`, rerun the generator:

```bash
python scripts/generate-model-adapters.py
```

This overwrites all adapter files. Do not hand-edit adapter outputs; change the
canonical skill and regenerate.

## Best practices baked into the generator

1. **System prompt distillation** — prompt skills use their `## Directive` quote;
   core skills use the first `> **Strict developer directive.**` block. This gives
   each model a concise behavior anchor without losing the full reference.
2. **Temperature hints** — Ollama Modelfiles set `temperature` from the skill's
   lethality profile: `max` → 0.2, `medium` → 0.5, `low` → 0.8.
3. **Source link** — every adapter points back to the canonical `.claude` skill so
   drift is easy to detect.
4. **Cross-link preservation** — relative `../xxx/SKILL.md` links in the source
   remain valid within each model's skill tree because the directory structure is
   identical.

## Adding a new model

1. Add an output root to `scripts/generate-model-adapters.py`.
2. Add a formatter function that wraps the canonical frontmatter and body.
3. Run the generator and validate.
4. Document the new adapter in this file and in `AGENTS.md`.
