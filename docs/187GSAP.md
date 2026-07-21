# 187gsap — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187gsap/SKILL.md`](.claude/skills/187gsap/SKILL.md)

## Identity

187GSAP is the crew's animation skillset. It covers the full GSAP surface so CHARLOTTE can invoke the right subset for any motion need, from a single micro-interaction to a scroll-driven narrative.

## Sub-skills

- **gsap-core** — `gsap.to()` / `from()` / `fromTo()`, easing, duration, stagger, defaults.
- **gsap-timeline** — sequencing, position parameter, labels, nesting, playback control.
- **gsap-scrolltrigger** — scroll-linked animation, pinning, scrub, start/end triggers, `ScrollTrigger.refresh()`.
- **gsap-plugins** — ScrollToPlugin, ScrollSmoother, Flip, Draggable, Inertia, Observer, SplitText, ScrambleText, SVG plugins, CustomEase, EasePack, GSDevTools.
- **gsap-react** — `useGSAP()` hook, refs, `gsap.context()`, cleanup, SSR safety.
- **gsap-performance** — transform-only motion, `will-change`, batching, avoiding layout thrash, reduced-motion fallbacks.

## Triggers

### Manual

- `/187gsap`
- `187GSAP`
- `gsap timeline`
- `scrolltrigger`
- `animation choreograph`
- `gsap react`

### Automatic

- Any request mentioning GSAP, timeline, ScrollTrigger, tween, stagger, or easing.
- When CHARLOTTE is running the **Motion-Lab Hero** or **GSAP Motion System** skill chains.

## When to use

- A page or component needs entrance, exit, or state-transition animation.
- Scroll progress should drive animation, pinning, or camera moves.
- Standardizing easing, stagger, and reduced-motion fallbacks.
- CHARLOTTE is orchestrating a motion-hero, scroll-story, or micro-interaction chain.

## Output contract

1. **Motion intent** — what moves, why, and the feeling/timing goal.
2. **Target spec** — selectors, refs, or scopes (React-safe).
3. **Timeline / ScrollTrigger map** — tweens, position parameters, labels, start/end, scrub, pin.
4. **Plugin list** — which GSAP plugins are registered and why.
5. **Performance notes** — transform-only props, `will-change` plan, invalidation strategy.
6. **Reduced-motion fallback plan** — `prefers-reduced-motion` handling and alternative static states.
7. **Next actions** — concrete, assignable implementation steps.

## Templates

| Template | When to use | Living demo |
|---|---|---|
| `templates/gsap-timeline.md` | A new timeline-driven animation. | Motion hooks |
| `templates/scrolltrigger-map.md` | Mapping scroll progress to animation. | Scroll narrative |
| `templates/gsap-react.md` | Using GSAP inside a React component with `useGSAP`. | All motion-lab cards |
| `templates/gsap-cursor-effects.md` | Magnetic / proximity hover. | `MagneticMascot` |
| `templates/gsap-page-transitions.md` | Flip layout morphs. | `FlipPageSampler` |
| `templates/gsap-scroll-effects.md` | Scroll reveals + custom scroller. | `ScrollRevealSampler` |

Brand assets for the samplers live under `public/images/` and are keyed in `lib/brand-assets.ts` (`orb`, `headerLockup`, `wordmarkTagline`, `mascotReference`, `mascotWireframe`, `triangleIcon`).

## Acceptance tests

1. Prompt: "Build a GSAP timeline for a hero headline and CTA." → Expected: timeline spec + stagger plan.
2. Prompt: "Pin a section and scrub a progress bar." → Expected: ScrollTrigger map with pin/scrub.
3. Prompt: "Respect reduced motion." → Expected: fallback plan included.
4. Prompt: "Animate a React card on mount." → Expected: `useGSAP` + scope + cleanup pattern.

## Routes

- **Skill source:** `.claude/skills/187gsap/SKILL.md`
- **Docs:** `docs/187GSAP.md`
- **Page:** `/187gsap`
- **187MOTION** for reusable R3F/GSAP hooks.
- **187SCROLL** when scroll drives a 3D camera or scene.
- **187HERO** for immersive 3D hero scenes.
- **187TYPE** for kinetic typography.
- **187ACCESS+** for vestibular or photosensitive safety checks.
- **187PUBLISH** for the final ship gate.
