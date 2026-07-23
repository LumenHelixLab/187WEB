---
name: 187hero
description: >-
  Full-screen immersive hero systems — WebGL/R3F backgrounds, splash loaders, brand-mascot interaction, and first-impression page transitions. 8 catalogued patterns.
model_adapter: chatgpt
---

> **ChatGPT adapter:** Use the markdown below as the custom GPT / system instructions. Source: [`../../.claude/skills/187hero/SKILL.md`](../../.claude/skills/187hero/SKILL.md).

# 187HERO

187HERO owns the first five seconds — 187webdesign Principle #1's "the hero
is a thesis" made literal. It catalogs 8 patterns: full list with exact GSAP/
Three.js logic in
[`references/EFFECT-CATALOG.md`](references/EFFECT-CATALOG.md). This is a
deliberately small, curated catalog compared to `187SCROLL` or `187GSAP` — a
hero should have *one* signature move (187webdesign Principle #12), so the
job here is picking the single right pattern for the brief, not stacking
several.

## Sub-skills

- **hero-loader** — splash/boot sequences before the real hero mounts:
  `/187willemloader` (mascot-walk, brand-forward), `/187logoload` (morphing
  logo via `MorphSVGPlugin`). See `components/motion/TechBootLoader.tsx` for
  a shipped, non-registry loader in the same spirit — check it before
  building a new one; it may already cover the need.
- **hero-atmosphere** — immersive WebGL backgrounds (hybrid, Three.js
  required): `/187volumefog` (volumetric cursor light), `/187holointeract`
  (hologram-shatter image deconstruction).
- **hero-transition** — `/187shaderwipe`, the GLSL disintegration page
  transition — reserved for a hero-to-hero route change, not a routine
  in-page state change (that belongs to `187GSAP`'s transition family).
- **hero-mascot** — `/187mascotface`, cursor-tracked mascot eyes/head-tilt.
  Requires the brand mascot SVG (`lib/brand-assets.ts`); do not build a
  generic face — this pattern is specifically about *the* mascot.
- **hero-nav** — `/187centernav`, the hero-to-header scale transition that
  hands off to the fixed nav once the hero scrolls out of view.
- **hero-diversion** — `/187minigame`, the 404 interactive distractor. Only
  fires on the 404 route; never a homepage pattern.

## When to use

- WebGL/R3F hero background.
- Splash/loading sequence that precedes the real page.
- Hero linked to a scroll continuation or a route transition.
- Mascot-specific interaction in the hero viewport.

## When not to use

- A routine section-to-section transition inside a page — that's `187GSAP`.
- A product-focused 3D presentation — that's `187MODEL`.
- Scroll-scrubbed storytelling *after* the hero — that's `187SCROLL`.

## Output contract

1. Hero scene spec — which pattern, and why it's the one signature move for
   this brief (not a menu of options stacked together).
2. Layer stack (background → mascot/type → CTA).
3. Scroll/link integration plan — what the hero hands off to when it scrolls
   out (see the **Hero Launch** skillchain in `187MOTION`'s
   `references/SKILLCHAINS.md`).
4. Performance budget — WebGL heroes must still hit LCP < 2.5s
   (187webdesign Principle #9); state the fallback for low-end devices.
5. Next actions.

## Effect catalog

[`references/EFFECT-CATALOG.md`](references/EFFECT-CATALOG.md) — 8 entries.

## Routes

- `187MODEL` when the hero features a 3D product/model rather than an
  atmospheric background.
- `187SCROLL` when the hero transitions into a scroll narrative.
- `187TYPE` for the headline treatment inside the hero — see the **Hero
  Launch** skillchain.
- `187ACCESS+` for motion, autoplay, or contrast concerns — WebGL heroes and
  `/187volumefog`/`/187holointeract` specifically need a reduced-motion
  static-frame fallback, not just a shorter tween.

