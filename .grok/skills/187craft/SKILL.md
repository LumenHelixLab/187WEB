---
name: 187craft
description: >-
  Use when designing, building, or auditing UI/UX for a 187WEB project.
model_adapter: grok
---

> **Grok adapter:** Load as repository skill instructions. Canonical source: [`../../.claude/skills/187craft/SKILL.md`](../../.claude/skills/187craft/SKILL.md).

# 187CRAFT — Short-Name Design + Frontend

## Identity

187CRAFT is the short-name entry point for the mature 187WEB design layer.
It delegates to [`187webdesign`](../187webdesign/SKILL.md),
[`187webdev-design-system`](../187webdev-design-system/SKILL.md),
[`187webdev-qa`](../187webdev-qa/SKILL.md), and
[`187webdev-code-review`](../187webdev-code-review/SKILL.md). It does not
replace them; it provides a fast, conversational trigger for design, UX,
frontend, component, and pre-ship audit work.

## Manual triggers

- `/187craft`
- `187CRAFT`
- `design this`
- `UI review`
- `UX audit`
- `component library`
- `color palette`
- `font pairing`
- `polish this page`
- `accessibility audit`

## Automatic triggers

Use 187CRAFT when the task implies: design, UI, UX, frontend, components,
accessibility, color palette, font pairing, motion, pre-ship audit, design
system, landing page, hero section, or visual polish.

## When to use

- Building or redesigning a public-facing page.
- Art-directing a hero or landing section.
- Running a pre-ship audit.
- Generating a design system, palette, or component library.
- Fixing motion performance or accessibility issues.

## When not to use

- For research-grade source work — route to `187research`.
- For go-to-market strategy — route to `187launch`.
- For SEO strategy — route to `187seo`.
- For revenue/checkout architecture — route to `187revenue`.

## Input contract

User provides: the target surface (page, component, or flow), existing
constraints (brand, tech stack, accessibility needs), and the desired outcome
(design system, audit, components, or polish).

## Output contract

1. **Mode** — which 187CRAFT mode is active.
2. **Design direction** — tokens, palette, typography, layout intent.
3. **Component plan** — generated or updated components.
4. **Accessibility notes** — a11y considerations and fixes.
5. **Audit findings** — if a pre-ship audit was requested.
6. **Next actions** — concrete follow-ups and owners.

## Routing rules

- Use `187craft` for design, UX, frontend, components, and audits.
- Route accessibility-only reviews to `187access-plus`.
- Route inclusion-only language reviews to `187include`.
- Route SEO implications to `187seo`.
- Route launch copy to `187launch` + `187write`.
- **Motion Lab (do not swallow these under craft):**

| Need | Route |
|------|--------|
| Hero animation / WebGL hero | `187hero` |
| Scroll choreography / scrub decks | `187scroll` |
| GSAP timelines / ScrollTrigger | `187gsap` |
| 3D product viewer | `187model` |
| Kinetic typography | `187type` |
| Network / data scenes | `187viz` |
| Reusable motion hooks | `187motion` |
| Audio-reactive geometry | `187audio` |
| Palette / fonts / tokens | `187theme` |

- `/187 craft palette` and `/187 craft fonts` **route to 187THEME**.

## Safety / ethics guardrails

- Do not recommend inaccessible patterns as defaults.
- Do not invent new brand palettes unless the brief explicitly requests a rebrand.
- Respect `prefers-reduced-motion` and color-contrast minimums.
- Do not present aesthetic opinions as evidence-based user research.

## Integration points

- **Claude Code / Grok:** load the canonical `187webdesign` and `187webdev-*`
  skills directly for deep work.
- **Obsidian/Claudian:** outputs saved as linked notes using
  `templates/design-direction.md` and `templates/pre-ship-audit.md`.
- **CLI:** invoked via `187repo.sh craft`.
- **Adapters:** mirrored by `python scripts/generate-model-adapters.py`.

## Templates

| Template | When to use |
|---|---|
| [`templates/design-direction.md`](templates/design-direction.md) | Capture a design decision or system update. |
| [`templates/pre-ship-audit.md`](templates/pre-ship-audit.md) | Run the baseline pre-ship checklist. |

## Dashboards / UI representation

- Showcase route: `/187craft` (future).
- Obsidian dashboard: `_system/187CRAFT Dashboard.md` (future).

## CLI exposure

`187repo.sh craft`

## Docs route

`docs/187CRAFT.md`

## Adapter regeneration

```bash
python scripts/generate-model-adapters.py
```

## Acceptance tests

1. Prompt: "Design a landing page for a consent-first coaching app." → Expected:
   187CRAFT loads 187webdesign + 187webdev-design-system and returns tokens,
   layout, components, and accessibility notes.
2. Prompt: "Run an accessibility audit on this component." → Expected:
   187CRAFT runs the audit and routes severe findings to 187access-plus.
3. Prompt: "Suggest a color palette and font pairing." → Expected: 187CRAFT
   proposes a warm-blueprint-compatible palette and pairing with contrast
   rationale.

## Slash commands

| Command | Loads | Action |
|---|---|---|
| `/187craft design` | `187webdesign` + `187webdev-design-system` | Generate/update design system |
| `/187craft ui` | `187webdesign` | Generate UI components |
| `/187craft a11y` | `a11y-linting-agent` + `187webdev-qa` | Run accessibility audit |
| `/187craft palette` | `187theme` | Suggest / apply palette (187THEME) |
| `/187craft fonts` | `187theme` | Font pairing via 187THEME |
| `/187craft polish` | `187webdesign` + `ui-aesthetic-auditor` | Run baseline polish |
| `/187craft motion` | Motion Lab skills | Route hero/scroll/gsap/type — not a mono craft path |

## Design tokens

Reuse the warm-blueprint and Killer Web tokens already in
[`tailwind.config.ts`](../../../tailwind.config.ts) and
[`app/globals.css`](../../../app/globals.css). Do not invent new palettes unless the
brief explicitly requires a rebrand.

## Tone

Refined, precise, detail-obsessed. Every pixel matters.

