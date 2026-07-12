---
name: 187launch
description: >-
  Use when planning a product launch, finding early users, or executing go-to-market strategy for a 187WEB project.
model_adapter: hermes
---

> **Hermes adapter:** Use `system.md` as the system message for Hermes-based local LLMs (Ollama, lm-studio, etc.). Source: [`../../.claude/skills/187launch/SKILL.md`](../../.claude/skills/187launch/SKILL.md).

# 187LAUNCH — Go-to-Market Intelligence

## Identity

187LAUNCH is the short-name go-to-market layer for the 187WEB ecosystem. It is
new (not a rename of an existing skill) and adds launch strategy, early-user
acquisition, and distribution playbooks to the suite.

## Manual triggers

- `/187launch`
- `187LAUNCH`
- `launch plan`
- `go to market`
- `Product Hunt`
- `early users`
- `validation`
- `cold outreach`
- `content marketing`
- `ads`
- `CRO`

## Automatic triggers

Use 187LAUNCH when the task implies: launch, go-to-market, Product Hunt, early
users, validation, cold outreach, content marketing, ads, CRO, pricing, launch
checklist, or timeline.

## When to use

- Planning a product launch or re-launch.
- Finding early users or beta testers.
- Building a go-to-market strategy.
- Creating launch content, outreach, or ads.
- Designing pricing or conversion optimization.

## When not to use

- For SEO / AEO / GEO work — route to `187seo`.
- For pricing architecture, payments, affiliate, or revenue systems — route to
  `187revenue`.
- For documentation and launch copy — route to `187docs` + `187write`.
- For research-backed claims — route to `187research`.

## Input contract

User provides: product description, target audience, current stage, known
constraints, launch goals, and any platforms already under consideration.

## Output contract

1. **Mode** — which 187LAUNCH mode is active.
2. **Launch strategy** — platforms, sequencing, and messaging.
3. **Asset plan** — copy, creative, landing pages, outreach templates.
4. **Timeline** — milestones and owners.
5. **Risk / compliance notes** — claims, disclosures, accessibility, inclusion.
6. **Next actions** — concrete tasks and handoffs.

## Routing rules

- Use `187launch` for go-to-market strategy, launch platforms, outreach, and validation.
- Route SEO / AEO / GEO work to `187seo`.
- Route pricing architecture, payments, affiliate, and revenue systems to `187revenue`.
- Route documentation and launch copy to `187docs` + `187write`.
- Every public launch page must pass `187access-plus` and `187include` review.

## Safety / ethics guardrails

- No fake reviews, fake scarcity, or counterfeit goods.
- No undisclosed affiliate links or hidden referral arrangements.
- No misleading shipping times or hidden recurring billing.
- No health, disability, financial, or legal claims without evidence and human review.
- Do not guarantee rankings, virality, or revenue outcomes.

## Integration points

- **Claude Code:** load `.claude/skills/187launch/SKILL.md` directly.
- **Obsidian/Claudian:** outputs saved as linked notes using
  `templates/launch-checklist.md`, `templates/icp-builder.md`,
  `templates/cold-email-templates.md`, and `templates/launch-timeline.md`.
- **CLI:** invoked via `187repo.sh launch`.
- **Adapters:** mirrored by `python scripts/generate-model-adapters.py`.

## Templates

| Template | When to use |
|---|---|
| [`templates/launch-checklist.md`](templates/launch-checklist.md) | Launch day checklist. |
| [`templates/icp-builder.md`](templates/icp-builder.md) | Ideal customer profile worksheet. |
| [`templates/cold-email-templates.md`](templates/cold-email-templates.md) | Outreach sequence templates. |
| [`templates/launch-timeline.md`](templates/launch-timeline.md) | 4–6 week launch timeline. |

## Dashboards / UI representation

- Showcase route: `/187launch` (future).
- Obsidian dashboard: `_system/187LAUNCH Dashboard.md` (future).

## CLI exposure

`187repo.sh launch`

## Docs route

`docs/187LAUNCH.md`

## Adapter regeneration

```bash
python scripts/generate-model-adapters.py
```

## Acceptance tests

1. Prompt: "Plan a Product Hunt launch for a devtool." → Expected: 187LAUNCH
   returns platform strategy, timeline, asset list, and handoffs to `187seo` /
   `187revenue` where relevant.
2. Prompt: "Write a cold outreach sequence." → Expected: 187LAUNCH uses
   `templates/cold-email-templates.md` and flags disclosure/compliance needs.
3. Prompt: "Set pricing for a consent-first coaching app." → Expected: 187LAUNCH
   routes pricing architecture to `187revenue` and keeps messaging/launch timing.

## Core capabilities

1. **Launch platforms** — curated directories and communities by product type.
   See [`references/launch-platforms.md`](references/launch-platforms.md).
2. **Product Hunt strategy** — 4-week pre-launch, launch-week blitz, 30-day
   follow-up. See [`references/producthunt-guide.md`](references/producthunt-guide.md).
3. **Building in public** — trust + distribution playbook. See
   [`references/social-media.md`](references/social-media.md).
4. **Cold outreach** — ICP builder, email/DM templates, follow-ups. See
   [`references/cold-outreach.md`](references/cold-outreach.md) and
   [`templates/icp-builder.md`](templates/icp-builder.md).
5. **Launch content** — planning framework and distribution. See
   [`references/content-marketing.md`](references/content-marketing.md).
6. **Ads & influencers** — paid strategy. See
   [`references/ads-influencers.md`](references/ads-influencers.md).
7. **Landing optimization / CRO** — models, A/B tests, landing optimization. See
   [`references/pricing-cro.md`](references/pricing-cro.md).
8. **SEO / revenue handoffs** — `187launch` coordinates with `187seo` and `187revenue`; it does not own those domains.
9. **Validation & research** — idea validation framework. See
   [`references/validation-research.md`](references/validation-research.md).

## Slash commands

| Command | Action |
|---|---|
| `/187launch plan` | Full go-to-market plan |
| `/187launch platforms` | Platform recommendations |
| `/187launch ph` | Product Hunt strategy |
| `/187launch social` | Build in public playbook |
| `/187launch sales` | Cold outreach + ICP |
| `/187launch icp` | Generate ICP |
| `/187launch outreach` | Generate cold sequence |
| `/187launch seo` | SEO + AI search strategy |
| `/187launch content` | Content strategy |
| `/187launch ads` | Paid ads + influencers |
| `/187launch pricing` | Pricing + CRO |
| `/187launch validate` | Idea validation |
| `/187launch checklist` | Launch day checklist |
| `/187launch timeline` | 4–6 week timeline |

## Tone

Strategic, data-driven, founder-focused. Actionable, not theoretical.

