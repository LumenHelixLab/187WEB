---
name: 187scroll
description: >-
  Scroll-driven camera, parallax, and pinned narratives — the largest motion-lab catalog at 46 patterns, from simple progress bars to pinned 3D scene morphs.
model_adapter: hermes
---

> **Hermes adapter:** Use `system.md` as the system message for Hermes-based local LLMs (Ollama, lm-studio, etc.). Source: [`../../.claude/skills/187scroll/SKILL.md`](../../.claude/skills/187scroll/SKILL.md).

# 187SCROLL

187SCROLL is the largest single catalog in the motion lab — 46 patterns,
because "something changes as you scroll" is the single most common request
in the source registry. Full list:
[`references/EFFECT-CATALOG.md`](references/EFFECT-CATALOG.md). This skill
was originally scoped narrower — "scroll-driven 3D camera narratives" — and
that remains the deepest end of the catalog (`/187morphsphere`,
`/187noiseterrain`, `/187globe3d`); most of the 46 entries are plainer 2D/DOM
scroll effects (progress bars, pins, parallax), which is the honest shape of
the source registry. The job here is as much subtraction as construction:
most pages need one or two of these, not a stack of six competing scroll
effects fighting for the same viewport (187webdesign Principle #2 — one
focal point per view still applies when the "view" is scroll-triggered).

## Sub-skills

- **scroll-pin** — content pinned while scroll drives internal state:
  `/187steptime`, `/187sticksteps`, `/187stickfeat`, `/187stickytitle`,
  `/187horizscroll`.
- **scroll-parallax** — layered depth via differential scroll speed:
  `/187parallaxhoriz`, `/187depthtiles`, `/187footerparallax`,
  `/187stackparallax`, `/187globalparallax`, `/187parallaxthumb`,
  `/187parallaxlayers`, `/187overlapfix`.
- **scroll-progress** — UI that reports scroll state back to the user:
  `/187progressnav`, `/187progressnum`, `/187progressbar`, `/187backtop`,
  `/187scrolldir`, `/187sectiontheme`.
- **scroll-narrative** — scroll as the timeline for a 3D camera/scene
  sequence, this skill's original core scope: `/187seqscroll`,
  `/187videoscroll`, `/187motionpathscroll`, `/187pathscroll`,
  `/187morphsphere`, `/187noiseterrain`, `/187globe3d`, `/187globeaccel`,
  `/187orbittiles`.
- **scroll-reveal** — content entrance gated by viewport intersection:
  `/187revealbatch`, `/187linetestimonial`, `/187comparetable`,
  `/187tocarticle`.
- **scroll-transition** — section-to-section transitions driven by scroll
  position rather than a click: `/187shutterscroll`, `/187pixelscroll`,
  `/187pixelbasic`, `/187zoomtobg`, `/187flipscroll`, `/187scrollsnap`,
  `/187twostepnav`, `/187stackbounce`.
- **scroll-smoothing** — the scroll experience itself: `/187lenis`,
  `/187lenisanchor`, `/187locomotive`, `/187dirmarq`, `/187undernav`.

## When to use

- Scroll progress should drive animation, pinning, or a camera/scene move.
- Content should reveal, stagger, or restate itself as it enters the
  viewport.
- The user mentions scroll, pin, parallax, sticky, or scrub directly.

## Output contract

1. Scroll mechanic — which sub-skill pattern, `scrub` value (boolean vs.
   numeric lag), pin boundaries (`start`/`end`).
2. `ScrollTrigger` map — triggers, `pinSpacing`, `markers` for dev-only
   debugging (never shipped).
3. Performance notes — `ScrollTrigger.refresh()` timing after layout shifts;
   `will-change` scoped to the active pin only.
4. Reduced-motion fallback — pinned sections should still reveal content on
   scroll (that's navigation, not motion) but skip the scrub/lag; see
   `187MOTION`.
5. Next actions.

## Effect catalog

[`references/EFFECT-CATALOG.md`](references/EFFECT-CATALOG.md) — 46 entries,
by far the deepest single catalog; use the sub-skill groupings above to
narrow before reading the full table.

## Routes

- `187GSAP` for the underlying ScrollTrigger/timeline mechanics.
- `187TYPE` when the scroll-driven content is primarily typographic
  (`/187scrollhighlight`, `/187highlighter` live in 187TYPE, not here, even
  though they're scroll-triggered — the catalog draws the DOM/typography
  line at content, not trigger).
- `187VIZ`/`187MODEL` for the 3D-object end of `scroll-narrative`.
- `187HERO` when the narrative starts with an immersive hero.
- `187MOTION` for `useScrollProgress` and the shared pin/refresh discipline.
- `187ACCESS+` for vestibular safety / scroll hijacking — pinned/parallax
  sections are a common motion-sickness trigger; always ship the
  reduced-motion static path.

