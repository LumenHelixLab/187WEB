---
name: 187seo
description: >-
  Policy-aware SEO, AEO, GEO, structured data, technical audits, content strategy, and search analytics for the 187web suite.
model_adapter: grok
---

> **Grok adapter:** Load as repository skill instructions. Canonical source: [`../../.claude/skills/187seo/SKILL.md`](../../.claude/skills/187seo/SKILL.md).

# 187SEO — Policy-Aware Search Engine Optimization

## Identity

187SEO makes 187web public work discoverable. It covers traditional SEO, answer-engine optimization (AEO), generative-engine optimization (GEO), structured data, technical audits, content strategy, local/ecommerce SEO, search analytics, and launch readiness — all with Google's spam policies treated as hard guardrails, not optional suggestions.

## Manual triggers

- `/187seo`
- `187SEO`
- `seo audit`
- `technical seo`
- `content brief`
- `schema plan`
- `search console`

## Automatic triggers

Use 187SEO when the task implies: SEO, search visibility, ranking, schema, structured data, meta tags, Core Web Vitals, sitemap, robots.txt, canonical, hreflang, local SEO, ecommerce SEO, AI search readiness, traffic drop, migration safety, launch readiness, accessibility SEO, or client reporting.

## When to use

- Technical SEO audits, page audits, and site architecture reviews.
- Content briefs and keyword-driven content strategy.
- Schema/structured-data planning.
- Search Console and analytics analysis.
- Launch readiness and migration safety checks.

## When not to use

- For paid ads strategy — route to `187launch`.
- For UI design — route to `187craft`.
- For free tool scouting — route to `187free`.

## Input contract

User provides: URL or project, target market, current platform, known issues, and any compliance constraints.

## Output contract

1. **Mode** — which 187SEO mode is active.
2. **Findings** — prioritized issues/opportunities.
3. **Recommendations** — specific, actionable changes.
4. **Schema / structured-data plan** — when relevant.
5. **Content brief** — when relevant.
6. **Risk / spam review** — any policy concerns.
7. **Priority list** — quick wins vs long-term bets.
8. **Next actions** — concrete tasks.

## Routing rules

- Use alone for SEO-specific audits and content.
- Use with `187craft` when recommendations require UI/component changes.
- Use with `187launch` for launch-readiness and GTM alignment.

## Safety / ethics guardrails

Never recommend or tolerate:
- Cloaking or hidden text
- Link schemes
- Fake reviews or fake schema
- Doorway pages
- Scaled thin content
- Unauthorized SERP scraping
- Ranking promises
- AI-search manipulation spam

Always align with Google's Search Essentials and treat accessibility as an SEO input.

## Integration points

- **Obsidian/Claudian:** outputs use `templates/site-audit.md`, `templates/page-audit.md`, `templates/content-brief.md`, `templates/schema-plan.md`, `templates/search-console-analysis.md`.
- **Claude Code:** load `.claude/skills/187seo/SKILL.md`.
- **MCP:** future 187SEO audit server.
- **CLI:** future `187repo.sh seo` / `187seo.sh`.
- **Adapters:** mirrored by `python scripts/generate-model-adapters.py`.

## Templates

| Template | When to use |
|---|---|
| [`templates/site-audit.md`](templates/site-audit.md) | Full-site technical, content, and off-site audit. |
| [`templates/page-audit.md`](templates/page-audit.md) | Single-page on-page SEO review. |
| [`templates/content-brief.md`](templates/content-brief.md) | Keyword-driven content plan before writing. |
| [`templates/schema-plan.md`](templates/schema-plan.md) | Structured-data rollout plan. |
| [`templates/search-console-analysis.md`](templates/search-console-analysis.md) | Interpreting Search Console / analytics performance. |

## Dashboards / UI representation

Future: `app/187seo/page.tsx` and Obsidian `_system/187SEO Dashboard.md`.

## CLI exposure

Future: `187repo.sh seo`, `187seo.sh`.

## Docs route

`docs/187SEO.md`

## Adapter regeneration

```bash
python scripts/generate-model-adapters.py
```

## Acceptance tests

1. Prompt: "Run a technical SEO audit for my Next.js site." → Expected: 187SEO only.
2. Prompt: "Build a content brief for a launch landing page." → Expected: 187SEO + possibly 187launch for GTM.
3. Prompt: "Can I buy backlinks to rank faster?" → Expected: 187SEO rejects the request and cites spam-policy guardrails.

