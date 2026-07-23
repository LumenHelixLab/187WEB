---
name: 187type
description: Kinetic, variable, and reactive typography systems that respond to scroll, audio, or interaction — 23 catalogued patterns from splash intros to physics-based falling text.
origin: motion-lab
skill_version: 2.0.0
last_updated: 2026-07-23
---

# 187TYPE

187TYPE designs type as behavior, not just a face and a size. It owns 23
catalogued patterns — the full list, with exact GSAP logic and inline
triggers, is [`references/EFFECT-CATALOG.md`](references/EFFECT-CATALOG.md).
Every pattern here still has to clear 187webdesign's own readability bar
(50–75ch line length, 1.4–1.6 body line-height, ≥16px body) before motion is
allowed to touch it — kinetic type that hurts reading loses on both Design
and Usability.

## Sub-skills

- **type-kinetic** — cycling, scrambling, and infinite-loop text:
  `/187rotatetext`, `/187scrambletri`, `/187scrrambletxt`, `/187loopselector`,
  `/187bigtypo`.
- **type-reveal** — scroll- or hover-gated reveals: `/187maskreveal`,
  `/187highlighter`, `/187scrollhighlight`, `/187welcomewords`.
- **type-variable** — variable-font axis animation: `/187varfont` (requires a
  variable font file; falls back to a weight-swap if none is loaded).
- **type-decoration** — underline, stagger, and title treatments:
  `/187underline`, `/187randunderline`, `/187charstagger`, `/187titlewipe`.
- **type-utility** — non-decorative text mechanics: `/187fittext` (binary-
  search auto-scale), `/187readtime` (reading-duration estimate),
  `/187skeleton` (shimmer loading text).
- **type-cursor** — text that follows or replaces the cursor:
  `/187textcursor`, `/187cursormarq`.
- **type-physics** — `/187gravitytxt` (Physics2DPlugin falling characters) —
  the one pattern in this skill that trades restraint for spectacle; reserve
  it for a genuine signature moment (187webdesign Principle #12), not a
  default headline treatment.

## When to use

- Kinetic headlines and hero type (hand off to `187HERO` for the surrounding
  scene).
- Variable-font axis animation.
- Any text element where scroll, hover, or audio should drive a visible
  change in the type itself, not just its container.
- 3D text scenes route to `187MODEL`/`187VIZ` instead — this skill covers DOM
  typography, not extruded/mesh text.

## Output contract

1. Type motion spec — which registry pattern, what triggers it, what the
   rest state looks like.
2. Variable-font axis plan (if `type-variable`): which axes, range, and
   fallback for non-variable fonts.
3. Readability check against 187webdesign's type-scale and line-length rules
   — motion must not be the reason a paragraph fails the 50–75ch rule.
4. Reduced-motion fallback: the exact final state rendered when
   `useReducedMotion()` is `true` (see `187MOTION`).
5. Next actions.

## Effect catalog

Full table: [`references/EFFECT-CATALOG.md`](references/EFFECT-CATALOG.md) —
23 entries with exact `**Logic**`/`**Trigger**` text sourced from
`docs/handoffs/187-motion-gsap-skill-registry-v3.md`.

## Brand alignment

Type motion in 187WEB stays inside the Abyssal palette (`#080808` base,
`#39FF14` signal accent) — see `187GSAP`'s brand-assets section for the
shared token list. `/187highlighter`'s marker sweep and `/187underline`'s
draw-in both default to the signal-green accent, not an arbitrary highlight
color, unless the brief specifies otherwise.

## Routes

- `187GSAP` for the timeline/ScrollTrigger mechanics under any `type-*`
  pattern.
- `187HERO` for full-screen hero integration.
- `187MOTION` for the shared hooks (`useReducedMotion`, `useGsapTimeline`)
  every pattern here is built on.
- `187ACCESS+` for motion/readability review — kinetic type is one of the
  faster ways to fail a vestibular-safety pass.
