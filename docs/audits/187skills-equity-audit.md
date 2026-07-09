# 187skills Equity Audit

## Date

2026-07-09

## Branch

`claude/187skills-equity-upgrade`

## Inventory

| Category | Count | Notes |
|---|---|---|
| `.claude/skills` SKILL.md files | 45 | Includes prompt skills, 187webdev suite, Charlotte skills, and short-name skills |
| Adapter files across `.chatgpt`, `.gemini`, `.kimi`, `.grok`, `.ollama`, `.herme` | 315 | Mirrored from `.claude/skills` by `scripts/generate-model-adapters.py` |
| Public short-name skills | 4 | `187repo`, `187craft`, `187vibe`, `187launch` |

## Existing public skills summary

| Skill | Role | Strengths | Gaps |
|---|---|---|---|
| `187repo` | Orchestration, deploy, installer | Clear short-name map, archetypes, power mode | Not yet expanded to route the full seven-skill suite |
| `187craft` | Design + frontend | Strong design-token discipline, QA hooks | None major |
| `187vibe` | Delight + community | Playful tone, Charlotte persona layer | Currently lists "research" in description; should narrow to delight/community/retention |
| `187launch` | Go-to-market | Strong launch playbook, SEO reference | Currently owns SEO as a primary category; should hand SEO ownership to new `187seo` skill |

## Missing first-class skills

| Skill | Purpose | Priority |
|---|---|---|
| `187free` | No-cost/free-tier/open-source/local-first solution scouting | High |
| `187research` | Scholarly/biomedical/math/code source routing and reproducible labs | High |
| `187seo` | Policy-aware SEO, AEO, GEO, structured data, analytics | High |

## Structural gaps

- No documented universal skill contract.
- Existing skills vary in frontmatter keys and section structure.
- New skills need to match the existing `.claude/skills/<name>/` convention with `references/` and `templates/`.

## Recommended upgrade order

1. Define universal skill contract.
2. Add `187free`, `187research`, `187seo` as first-class skills following the contract.
3. Refactor existing suite routing in a follow-up PR.
4. Fix adapter generator root and regenerate adapters.
5. Add validator + CI gate.
