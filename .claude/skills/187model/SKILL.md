---
name: 187model
description: Interactive 3D product and object presentation — orbital/cylindrical carousels, tilt cards, and physics-driven object cascades. 6 catalogued patterns.
origin: motion-lab
skill_version: 2.0.0
last_updated: 2026-07-23
---

# 187MODEL

187MODEL presents *objects* — a product, a card, a set of items arranged in
3D space — as distinct from `187HERO`'s atmospheric backgrounds or
`187VIZ`'s data shapes. It catalogs 6 patterns:
[`references/EFFECT-CATALOG.md`](references/EFFECT-CATALOG.md). This is the
smallest catalog in the motion lab, honestly so — the source registry is a
DOM/GSAP interaction library, not a dedicated 3D-product-configurator
toolkit, so most true product-viewer work (model loading, material variants,
camera presets, full configurator UX — this skill's original stated scope)
is still greenfield here rather than drawn from the registry. Treat the 6
catalogued patterns as the object-*presentation* layer, not a full
configurator.

## Sub-skills

- **model-carousel** — rotating arrangements of multiple objects:
  `/187radial3d` (orbital, `Draggable` + `InertiaPlugin`), `/187cylcarousel`
  (cylindrical rotation), `/187tornado3d` (helical funnel — the most
  spectacle-forward of the three; reserve for a genuine signature moment).
- **model-interaction** — `/187perspective3d`, mouse-tilt on a single card
  via `mapRange`-clamped `rotateX/Y`. The default choice for "make this card
  feel dimensional" when a full carousel is overkill.
- **model-transition** — `/187cube3d`, the hardware-accelerated cube-flip
  page transition. Routes from `187GSAP`'s transition family when the brief
  specifically wants a 3D panel flip rather than a 2D wipe/fade.
- **model-physics** — `/187physicscascade`, Matter.js driving the 2D physics
  while Three.js renders the 3D boxes. The heaviest pattern in this catalog;
  confirm the performance budget (187webdesign Principle #9) before
  committing to it on a page with other motion already running.

## When to use

- Multiple objects need a rotating/orbital presentation (carousel scale:
  more than ~4 items → `radial3d`/`cylcarousel`; fewer → a static grid, no
  3D needed).
- A single card benefits from depth/tilt on hover or cursor proximity.
- A page transition should read as a physical object flip, not a wipe.
- A full 3D product viewer (model loading, material variants, camera
  presets) — still in scope for this skill, just not yet catalogue-backed;
  build it directly against React Three Fiber rather than forcing one of
  the 6 patterns above to fit.

## Output contract

1. Object/scene spec — geometry, count, and which sub-skill pattern.
2. Interaction model — drag, hover, or scroll-driven; inertia/snap behavior
   if draggable.
3. Performance budget — vertex/mesh count, target frame budget, fallback for
   `prefers-reduced-motion` (a static frame, not a slowed rotation).
4. Camera/perspective notes — `perspective` value, `transform-origin`,
   `preserve-3d` boundaries.
5. Next actions.

## Effect catalog

[`references/EFFECT-CATALOG.md`](references/EFFECT-CATALOG.md) — 6 entries.

## Routes

- `187CRAFT` for UI/UX and design tokens.
- `187GSAP` for the DOM-based 2D transition family this skill's `cube3d`
  pattern is a 3D alternative to.
- `187HERO` when the 3D object *is* the hero background, not a
  product/content presentation.
- `187MOTION` for the shared `Draggable`/`InertiaPlugin` registration and
  reduced-motion gating every carousel pattern needs.
- `187ACCESS+` for keyboard/screen-reader support and vestibular safety on
  continuous-rotation patterns (`radial3d`, `cylcarousel`, `tornado3d` all
  auto-spin by default — confirm a pause-on-hover or reduced-motion static
  state).
