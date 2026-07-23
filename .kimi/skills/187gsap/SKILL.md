---
name: 187gsap
description: >-
  GSAP skillset for CHARLOTTE and the motion lab — core, timeline, ScrollTrigger, plugins, React, performance, and reduced-motion safety. 120 catalogued patterns, the largest and default motion-lab skill.
model_adapter: kimi
---

> **Kimi adapter:** Load via the Kimi Skill tool or place in your Kimi skills directory. Source: [`../../.claude/skills/187gsap/SKILL.md`](../../.claude/skills/187gsap/SKILL.md).

# 187GSAP

187GSAP is the crew's animation skillset and the default home for any
general-purpose GSAP/DOM interaction pattern — sliders, cursors, nav,
transitions, forms, loaders — that isn't specific enough to one of the other
seven motion-lab skills. It covers the full GSAP surface so CHARLOTTE can
invoke the right subset for any motion need, from a single micro-interaction
to a scroll-driven narrative. It catalogs 120 patterns — by far the largest
single skill — in
[`references/EFFECT-CATALOG.md`](references/EFFECT-CATALOG.md), the
machine-readable source being
[`references/EFFECT-REGISTRY.json`](references/EFFECT-REGISTRY.json) (all
207 patterns across every motion-lab skill, with an `owner` field).

## Sub-skills

- **gsap-core** — `gsap.to()` / `from()` / `fromTo()`, easing, duration, stagger, defaults.
- **gsap-timeline** — sequencing, position parameter, labels, nesting, playback control.
- **gsap-scrolltrigger** — scroll-linked animation, pinning, scrub, start/end triggers, `ScrollTrigger.refresh()`.
- **gsap-plugins** — ScrollToPlugin, ScrollSmoother, Flip, Draggable, Inertia, Observer, SplitText, ScrambleText, SVG plugins, CustomEase, EasePack, GSDevTools.
- **gsap-react** — `useGSAP()` hook, refs, `gsap.context()`, cleanup, SSR safety.
- **gsap-performance** — transform-only motion, `will-change`, batching, avoiding layout thrash, reduced-motion fallbacks.

## When to invoke

- A page or component needs entrance, exit, or state-transition animation.
- Scroll progress should drive animation, pinning, or camera moves.
- The user mentions timeline, stagger, easing, ScrollTrigger, tween, or GSAP directly.
- CHARLOTTE is orchestrating a motion-hero, scroll-story, or micro-interaction chain.

## Output contract

1. **Motion intent** — what moves, why, and the feeling/timing goal.
2. **Target spec** — selectors, refs, or scopes (React-safe).
3. **Timeline / ScrollTrigger map** — tweens, position parameters, labels, start/end, scrub, pin.
4. **Plugin list** — which GSAP plugins are registered and why.
5. **Performance notes** — transform-only props, `will-change` plan, invalidation strategy.
6. **Reduced-motion fallback** — `prefers-reduced-motion` handling and alternative static states.
7. **Next actions** — concrete, assignable implementation steps.

## Templates

| Template | When to use | Living demo |
|---|---|---|
| `templates/gsap-timeline.md` | Timeline-driven entrances | `components/motion/TechBootLoader.tsx` |
| `templates/scrolltrigger-map.md` | Section pin / scrub maps | Scroll narrative (187SCROLL) |
| `templates/gsap-react.md` | React + cleanup patterns | All motion-lab cards |
| `templates/gsap-cursor-effects.md` | Magnetic / proximity hover | `/187magneticbtn`, `/187prevcursor` |
| `templates/gsap-page-transitions.md` | Flip layout morphs | `/187gridflip`, `/187flipscroll` |
| `templates/gsap-scroll-effects.md` | Scroll reveals + custom scroller | `/187revealbatch`, `/187lenis` |

All six now exist under `templates/` — the first three were referenced here
before they were written; fixed alongside the 207-pattern registry install.

### Brand motion assets

Samplers use the refreshed brand set from `lib/brand-assets.ts`:

- `orb` — badge icon
- `headerLockup` — horizontal lockup
- `wordmarkTagline` — wordmark + tagline
- `mascotReference` — full-figure mascot
- `mascotWireframe` — hologram wireframe
- `triangleIcon` — Flip grid tiles

CHARLOTTE can route these patterns through her **GSAP Motion System** skill
chain — see `187MOTION`'s [`references/SKILLCHAINS.md`](../187motion/references/SKILLCHAINS.md)
for the full named-chain compositions (Hero Launch, Page Transition System,
Scroll Narrative, Product Reveal, Sonic Feedback, Loader/Boot Sequence).

## Plugin registration

`lib/motion/gsap.ts` registers every plugin this skill claims — ScrollTrigger,
Flip, Draggable, InertiaPlugin, Observer, SplitText, ScrambleTextPlugin,
DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin, and CustomEase — confirmed
present in `node_modules/gsap` (GSAP 3.15, all-plugins-free license). Call
`registerGsap()` once per component before any `gsap.context()`; it's
idempotent, so redundant calls are free.

## Routes

- **187MOTION** for reusable R3F/GSAP hooks and the skillchains that compose
  this skill with the other seven.
- **187SCROLL** when scroll drives a 3D camera or scene.
- **187HERO** for immersive 3D hero scenes.
- **187TYPE** for kinetic typography.
- **187MODEL** for 3D object/carousel presentation.
- **187AUDIO** for audio playback and audio-reactive visuals.
- **187VIZ** for grid/particle-field visualization.
- **187ACCESS+** for vestibular or photosensitive safety checks.
- **187PUBLISH** for the final ship gate.

