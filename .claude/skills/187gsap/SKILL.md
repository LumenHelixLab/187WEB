---
name: 187gsap
description: GSAP skillset for CHARLOTTE and the motion lab — core, timeline, ScrollTrigger, plugins, React, performance, and reduced-motion safety.
origin: motion-lab
---

# 187GSAP

187GSAP is the crew's animation skillset. It covers the full GSAP surface so CHARLOTTE can invoke the right subset for any motion need, from a single micro-interaction to a scroll-driven narrative.

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
| `templates/gsap-timeline.md` | Timeline-driven entrances | Motion hooks |
| `templates/scrolltrigger-map.md` | Section pin / scrub maps | Scroll narrative |
| `templates/gsap-react.md` | React + cleanup patterns | All motion-lab cards |
| `templates/gsap-cursor-effects.md` | Magnetic / proximity hover | `MagneticMascot` |
| `templates/gsap-page-transitions.md` | Flip layout morphs | `FlipPageSampler` |
| `templates/gsap-scroll-effects.md` | Scroll reveals + custom scroller | `ScrollRevealSampler` |

### Brand motion assets

Samplers use the refreshed brand set from `lib/brand-assets.ts`:

- `orb` — badge icon
- `headerLockup` — horizontal lockup
- `wordmarkTagline` — wordmark + tagline
- `mascotReference` — full-figure mascot
- `mascotWireframe` — hologram wireframe
- `triangleIcon` — Flip grid tiles

CHARLOTTE can route these patterns through her **GSAP Motion System** skill chain.

## Routes

- **187MOTION** for reusable R3F/GSAP hooks.
- **187SCROLL** when scroll drives a 3D camera or scene.
- **187HERO** for immersive 3D hero scenes.
- **187TYPE** for kinetic typography.
- **187ACCESS+** for vestibular or photosensitive safety checks.
- **187PUBLISH** for the final ship gate.
