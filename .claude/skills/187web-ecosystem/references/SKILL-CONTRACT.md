---
title: 187web Skill Contract
description: Required structure for every first-class 187web skill.
---

# 187web Skill Contract

Every first-class 187web skill MUST be a self-contained folder under `.claude/skills/<name>/` with a `SKILL.md` file at the root. The skill MUST expose the following contract so that routing, adapters, and UI surfaces can consume it deterministically.

## Required frontmatter

```yaml
---
name: <skill-id>                # short, lowercase, kebab-case
description: <one-line purpose>
origin: portfolio               # or project / user
---
```

## Required sections

1. **Identity** — skill name and one-line purpose.
2. **Manual triggers** — slash commands and explicit trigger phrases a user can type.
3. **Automatic triggers** — keywords or contexts that should route to this skill.
4. **When to use** — concrete use cases.
5. **When not to use** — misrouting and anti-patterns.
6. **Input contract** — what the user must provide (prompt, file, context).
7. **Output contract** — required output format (numbered sections, tables, etc.).
8. **Routing rules** — how this skill relates to sibling skills.
9. **Safety / ethics guardrails** — hard rules (privacy, spam, consent, accessibility, etc.).
10. **Integration points** — Obsidian, Claudian, Claude Code, MCP, CLI, adapters.
11. **Templates** — list of template files and when to use them.
12. **Dashboards / UI representation** — vault dashboards or app pages.
13. **CLI exposure** — commands that invoke this skill.
14. **Adapter regeneration** — command to mirror this skill to other model adapters.
15. **Acceptance tests** — sample prompts and expected routing.

## File layout

```text
.claude/skills/<name>/
├── SKILL.md
├── references/
│   ├── <topic>.md
│   └── ...
└── templates/
    ├── <template>.md
    └── ...
```

## Adapter rule

After modifying any first-class skill, run:

```bash
python scripts/generate-model-adapters.py
```

This mirrors `.claude/skills/<name>/SKILL.md` into `.gemini/skills/<name>/`, `.kimi/skills/<name>/`, `.chatgpt/skills/<name>/`, `.ollama/modelfiles/<name>/`, and `.herme/agents/<name>/`.

## Acceptance rule

Every first-class skill must include at least three sample prompts with expected routing outcomes.
