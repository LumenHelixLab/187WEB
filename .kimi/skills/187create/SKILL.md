---
name: 187create
description: >-
  Use when building growth-first landing pages, ad creatives, influencer kits, or conversion-focused surfaces for a 187WEB project.
model_adapter: kimi
---

> **Kimi adapter:** Load via the Kimi Skill tool or place in your Kimi skills directory. Source: [`../../.claude/skills/187create/SKILL.md`](../../.claude/skills/187create/SKILL.md).

# 187CREATE — Growth-First Creation

## Identity

187CREATE is Kali's growth-first creation skill for the 187WEB ecosystem. It
prioritizes speed and conversion over systemization, building landing-page MVPs,
ad creative variants, influencer kits, and conversion-focused surfaces that plug
directly into the 187WEB suite. It is the counterpart to 187CRAFT:
ship fast, validate, then hand off winners for systemization.

## Manual triggers

- `/187create`
- `187CREATE`
- `create a landing page`
- `spin up ad creative`
- `design an influencer kit`
- `optimize a conversion surface`
- `build a growth MVP`
- `growth page`
- `campaign asset`
- `conversion copy`

## Automatic triggers

Use 187CREATE when the task implies: landing page, ad creative, influencer kit,
campaign asset, conversion optimization, growth MVP, growth hacking, CTA, funnel,
lead capture, or go-fast creative.

## When to use

- Shipping a landing-page MVP for a campaign or launch.
- Generating ad-creative variants and conversion copy.
- Building influencer or partner asset kits.
- Running a conversion-optimization pass on an existing surface.
- Creating growth MVPs that may later hand off to 187CRAFT for systemization.

## When not to use

- For design-system or component-library work — route to `187craft`.
- For final release gating — route to `187publish`.
- For SEO strategy — route to `187seo`.
- For revenue/checkout architecture — route to `187revenue`.
- For research-grade source work — route to `187research`.

## Input contract

User provides: the growth goal (offer, audience, channel), existing constraints
(brand voice, tech stack, compliance needs), and the desired outcome (landing
page, ad variant, influencer kit, or conversion pass).

## Output contract

1. **Mode** — which 187CREATE mode is active.
2. **Growth asset** — shipped page, component set, or creative variant(s).
3. **Campaign brief** — copy, visual direction, and asset checklist.
4. **Conversion checklist** — CTA clarity, above-the-fold placement, A/B candidates.
5. **Handoff notes** — next skill to call (usually `187craft`, `187publish`, or `187seo`).
6. **Next actions** — concrete follow-ups and owners.

## Routing rules

- Use `187create` for growth-first landing pages, ad creatives, influencer kits, and conversion passes.
- Route systemization of a validated winner to `187craft`.
- Route publish/release gating to `187publish`.
- Route discoverability to `187seo`.
- Route monetization to `187revenue`.
- Route accessibility-only reviews to `187access-plus`.
- Route inclusion-only language reviews to `187include`.

## Safety / ethics guardrails

- Do not recommend inaccessible patterns as defaults.
- Do not use fake reviews, fake scarcity, or counterfeit social proof.
- No undisclosed affiliate links or hidden referral arrangements.
- No misleading shipping times or hidden recurring billing.
- Respect `prefers-reduced-motion` and color-contrast minimums.
- Do not present growth opinions as evidence-based user research.

## Integration points

- **Claude Code / Grok:** load the canonical `187create` skill directly for growth work.
- **Obsidian/Claudian:** outputs saved as linked notes using
  `templates/landing-page-mvp.md` and `templates/ad-creative-brief.md`.
- **CLI:** invoked via `187repo.sh create`.
- **Adapters:** mirrored by `python scripts/generate-model-adapters.py`.

## Templates

| Template | When to use |
|---|---|
| [`templates/landing-page-mvp.md`](templates/landing-page-mvp.md) | One-section landing page for an offer and audience. |
| [`templates/ad-creative-brief.md`](templates/ad-creative-brief.md) | Ad-creative variants for a channel and offer. |

## Dashboards / UI representation

- Showcase route: `/187create`.
- Docs route: `docs/187CREATE.md`.

## CLI exposure

`187repo.sh create`

## Docs route

`docs/187CREATE.md`

## Adapter regeneration

```bash
python scripts/generate-model-adapters.py
```

## Acceptance tests

1. Prompt: "Create a landing page for a consent-first coaching app." → Expected:
   187CREATE returns a one-section MVP with headline, subhead, social-proof
   placeholder, CTA, and accessibility checks.
2. Prompt: "Spin up three ad creatives for LinkedIn." → Expected: 187CREATE
   returns three variants with headline, hook, visual direction, and CTA.
3. Prompt: "Optimize this signup page for conversions." → Expected: 187CREATE
   audits the surface, proposes A/B candidates, and routes the winner to
   `187craft` / `187publish`.

## Tone

Fast, decisive, conversion-obsessed. Ship the MVP, measure the winner, then
systemize.

