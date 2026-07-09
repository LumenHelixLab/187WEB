---
name: 187free
description: Find practical free, free-tier, open-source, local-first, public-API, and low-cost bootstrap solutions.
origin: portfolio
---

# 187FREE — No-Cost Solution Engine

## Identity

187FREE is the Lumen Helix no-cost solution engine. It finds practical free, free-tier, open-source, local-first, public-domain, public-API, and low-cost bootstrap solutions for software, research, accessibility, civic tech, education, publishing, automation, data, AI, hosting, and client-budget needs.

## Manual triggers

- `/187free`
- `187FREE`
- `free stack`
- `free solution`
- `cheapest way`
- `no-cost option`
- `bootstrap this`

## Automatic triggers

Use 187FREE when the task implies: free, cheap, MVP, prototype, deploy, launch, hosting, database, auth, storage, email, domain, monitoring, analytics, docs, CI/CD, API, security scan, forms, search, CMS, image/video/audio utility, automation, public data, accessibility tool, assistive tech, student project, nonprofit/civic project, or client-budget project.

## When to use

- Choosing a no-cost stack for a landing page, MVP, demo, or client project.
- Finding open-source or local-first alternatives to paid tools.
- Scouting free public APIs, datasets, or hosting tiers.

## When not to use

- When the requirement is compliance, enterprise SLA, or regulated data — route to `187repo` + `187craft` with explicit risk review.
- When the task is pure scholarly research — route to `187research`.

## Input contract

User provides: the need, constraints (budget, privacy, scale), and any known tools to exclude.

## Output contract

Use [`references/free-stack-recipes.md`](references/free-stack-recipes.md) as a starting point when a common recipe matches the need.

1. **Need** — restated problem.
2. **Best Free Pick** — single best option with justification.
3. **Two Backup Options** — viable alternatives.
4. **Complete Free Stack Recipe** — if relevant, full wiring.
5. **Why This Works** — scoring rationale.
6. **Gotchas** — limits, quotas, expiration, telemetry.
7. **Privacy/Sensitivity Review** — data handling and consent.
8. **Upgrade Path** — what changes when free limits hit.
9. **Recommendation** — `use now` / `test first` / `avoid` / `paid upgrade likely later`.

## Routing rules

- Use alone for "what free tool can do this?"
- Use with `187research` when building a research lab or public demo with free hosting.
- Always run a privacy review for disability, medical, legal, civic, invention, or client projects.

## Safety / ethics guardrails

- Prefer local-first or private-by-default tools for sensitive data.
- Cross-check every source against [`references/free-source-policy.md`](references/free-source-policy.md) and [`references/gotcha-ledger.md`](references/gotcha-ledger.md).
- Avoid hidden telemetry.
- Require explicit consent before sharing, tracking, or caregiver access.
- Do not recommend a tool only because it is free; recommend the one most likely to actually work.

## Integration points

- **Obsidian/Claudian:** outputs saved as linked notes using `templates/free-stack-recipe.md` and `templates/tool-review.md`.
- **Claude Code:** load `.claude/skills/187free/SKILL.md` directly.
- **CLI:** invoked via `187repo.sh free` after Phase 6.
- **Adapters:** mirrored by `python scripts/generate-model-adapters.py`.

## Templates

- [`templates/free-stack-recipe.md`](templates/free-stack-recipe.md)
- [`templates/tool-review.md`](templates/tool-review.md)

## Dashboards / UI representation

Future: `app/187free/page.tsx` and Obsidian `_system/187FREE Dashboard.md`.

## CLI exposure

Future: `187repo.sh free`, `187free.sh`.

## Adapter regeneration

```bash
python scripts/generate-model-adapters.py
```

## Acceptance tests

1. Prompt: "I need a free stack for a static research demo with analytics and a contact form." → Expected: 187FREE only.
2. Prompt: "Find me the cheapest way to deploy promptPACK with auth, database, storage, email, and monitoring." → Expected: 187FREE only.
3. Prompt: "Find papers and a free hosting stack for an ADHD support tool." → Expected: 187RESEARCH for sources, 187FREE for stack.

## Core sources

- [free-for.dev](https://free-for.dev/)
- [ripienaar/free-for-dev](https://github.com/ripienaar/free-for-dev)
- Official free-tier pages and API docs
- Open-source repos and public datasets
