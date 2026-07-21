---
title: 187web Skill Contract
description: Required structure for every first-class 187web skill.
suite: 187SKILLS
skill_version: 1.0.0
contract_version: 2.0.0
last_updated: 2026-07-09
last_verified: 2026-07-09
status: active
replaces: docs/SKILL-CONTRACT.md v1
deprecated: false
compatible_with:
  - 187webdesign >=0.1.0
requires:
  - docs/runbooks/187web_master_overseer_repo_upgrade_runbook.md
---

# 187web Skill Contract

Every first-class 187web skill MUST be a self-contained folder under `.claude/skills/<name>/` with a `SKILL.md` file at the root. The skill MUST expose the following contract so that routing, adapters, and UI surfaces can consume it deterministically.

## Required frontmatter

```yaml
---
name: <skill-id>                # short, lowercase, kebab-case
description: <one-line purpose>
suite: 187SKILLS                # suite identifier
skill_version: <semver>         # skill-level version
contract_version: 2.0.0         # version of this contract
last_updated: <YYYY-MM-DD>
last_verified: <YYYY-MM-DD>
status: active | draft | deprecated
replaces: <skill-id> | none     # optional prior skill this replaces
deprecated: false | true
compatible_with:
  - <repo> <version>
requires:
  - <skill-id or file path>
---
```

## Parity (equal depth)

Public cards in `lib/skill-showcase-data.ts` must meet **docs/SKILL-PARITY.md**:

- **8–12 triggers** (slash + name + intent phrases)
- **4–5 use cases**
- **5–6 outputs**
- **1–2 sentence** plain description

Run: `npx tsx scripts/check-skill-parity.ts`

## Required sections

1. **Identity** — skill name and one-line purpose (plain language).
2. **Manual triggers** — slash commands and explicit trigger phrases a user can type (target 8+).
3. **Automatic triggers** — keywords or contexts that should route to this skill.
4. **When to use** — concrete use cases.
5. **When not to use** — misrouting and anti-patterns.
6. **Input contract** — what the user must provide (prompt, file, context).
7. **Output contract** — required output format (numbered sections, tables, etc.).
8. **Routing rules** — how this skill relates to sibling skills.
9. **Safety / ethics guardrails** — hard rules (privacy, spam, consent, accessibility, etc.).
10. **Integration points** — Obsidian, Claudian, Claude Code, MCP, CLI, adapters, docs route, app surface.
11. **Templates** — list of template files and when to use them.
12. **Dashboards / UI representation** — vault dashboards or app pages.
13. **CLI exposure** — commands that invoke this skill.
14. **Docs route** — public doc file path for this skill.
15. **Adapter regeneration** — command to mirror this skill to other model adapters.
16. **Acceptance tests** — sample prompts and expected routing outcomes.

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

## Version rule

When a skill changes, bump `skill_version` per SemVer, update `last_updated`, and re-run `last_verified` after validation.
