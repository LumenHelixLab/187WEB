---
name: 187motion
description: >-
  Reusable React Three Fiber and GSAP hooks for animation patterns, entrance sequences, and scroll triggers — the shared runtime foundation every other motion-lab skill builds on.
model_adapter: gemini
system_instruction: >-
  187MOTION is the load-bearing layer under every other motion skill: the hooks, guardrails, and composition patterns that keep 207 different effects from turning into 207 different memory leaks. When another motion skill says "reduced-motion fallback" or "SSR-safe," it means: call into 187MOTION. 187MOTION does not own a slice of the effect registry — it owns the runtime every slice depends on.
---

> **Gemini adapter:** Load as a system instruction. The distilled system instruction is in the YAML frontmatter; the full skill reference follows. Source: [`../../.claude/skills/187motion/SKILL.md`](../../.claude/skills/187motion/SKILL.md).

# 187MOTION

187MOTION is the load-bearing layer under every other motion skill: the
hooks, guardrails, and composition patterns that keep 207 different effects
from turning into 207 different memory leaks. When another motion skill says
"reduced-motion fallback" or "SSR-safe," it means: call into 187MOTION.
187MOTION does not own a slice of the effect registry — it owns the runtime
every slice depends on.

## Core architecture (applies to every effect in the registry)

Every pattern documented across 187GSAP/TYPE/MODEL/SCROLL/AUDIO/VIZ/HERO
inherits these guardrails. This is not aspirational — the shipped hooks below
implement it.

| Guardrail | Implementation | Shipped as |
|---|---|---|
| **Auto-cleanup** | Animations scope in `gsap.context()`; unmount calls `context.revert()` | `lib/motion/useGsapTimeline.ts` |
| **Motion-safe** | `prefers-reduced-motion` detected; reduced state resolves instantly, no tweens | `lib/motion/useReducedMotion.ts` |
| **SSR-safe** | Hydration never reads `window` before mount; starts `false`/static, syncs in `useEffect` | `lib/motion/useClientMounted.ts`, `useReducedMotion.ts` |
| **Responsive** | `ResizeObserver` / `matchMedia` rebinds breakpoints | per-component; `ScrollTrigger.refresh()` on resize for scroll-bound effects |
| **Scroll-state** | Normalized 0–1 scroll progress without re-deriving `IntersectionObserver` math per component | `lib/motion/useScrollProgress.ts` |
| **Dual-trigger** | Every skill responds to an explicit `/187` command and a natural-language description | documented per-skill in each `references/EFFECT-CATALOG.md` |
| **Hybrid-ready** | When `@react-three/fiber`/`three` is already a dependency (it is — see `package.json`), DOM-based skills may upgrade to the WebGL variant catalogued under `hybrid: true` entries | `.claude/skills/187gsap/references/EFFECT-REGISTRY.json` |

## Shipped hooks

| Hook | Signature | Use for |
|---|---|---|
| `registerGsap()` | `() => void` | Idempotent plugin registration; call once per component before any `gsap.context()` |
| `useGsapTimeline(factory, deps)` | `(() => gsap.core.Timeline, deps) => RefObject<Timeline>` | Any component-scoped timeline; kills and nulls the timeline on unmount automatically |
| `useReducedMotion()` | `() => boolean` | Gate every tween; when `true`, render the final state directly, skip the tween |
| `useScrollProgress(ref)` | `(RefObject<Element>) => ScrollProgress` | Normalized scroll-linked values without hand-rolling `ScrollTrigger` boilerplate for simple cases |
| `useClientMounted()` | `() => boolean` | Guard any effect that must not run during SSR or the first client paint |

All five live in `lib/motion/` and are re-exported from `lib/motion/index.ts`.
Import from the barrel, not the individual files, in new components.

## Reference implementation

`components/motion/TechBootLoader.tsx` is the canonical example: it composes
`useClientMounted` + `useReducedMotion` + `registerGsap()` + a single
ref-scoped `gsap.context()`, and its cleanup function calls `ctx.revert()`.
Every new motion-lab component should structure its `useEffect` the same way
before writing effect-specific logic.

## When to use this skill directly

- Building a *new* reusable hook (not a one-off effect — that's the owning
  domain skill: 187GSAP/TYPE/MODEL/SCROLL/AUDIO/VIZ/HERO).
- Auditing whether an existing component actually follows the guardrails
  table above (dogfooding pass before `187PUBLISH`).
- Composing a **skillchain** — see below.

## Output contract

1. Hook API and signature (or chain: ordered skill list + handoff artifact).
2. Usage example against the shipped hooks (not hypothetical ones).
3. Dependency list (what's already installed vs. what would need adding).
4. Motion-accessibility notes (reduced-motion state, focus, ARIA live regions
   for progress/status).
5. Next actions.

## Skillchains

A skillchain is a named, ordered composition of motion-lab skills for a
recurring outcome. Each chain names its skills in invocation order and the
handoff artifact passed between them. Full definitions, with concrete
examples built from the effect registry, live in
[`references/SKILLCHAINS.md`](references/SKILLCHAINS.md).

| Chain | Skills in order | Use for |
|---|---|---|
| **Hero Launch** | 187HERO → 187TYPE → 187GSAP → 187MOTION | First-impression hero: immersive background + kinetic headline + entrance timeline, wrapped in shared hooks |
| **Page Transition System** | 187GSAP → 187SCROLL → 187MOTION | Route-to-route transitions plus the scroll-state that resumes correctly on the new page |
| **Scroll Narrative** | 187SCROLL → 187TYPE → 187VIZ → 187MOTION | Pinned, scroll-scrubbed story sections with data/visual payoff |
| **Product Reveal** | 187MODEL → 187GSAP → 187MOTION | 3D/carousel product presentation with a supporting micro-interaction layer |
| **Sonic Feedback** | 187AUDIO → 187GSAP → 187MOTION | Audio-reactive or audio-accompanied interaction |
| **Loader / Boot Sequence** | 187HERO → 187GSAP → 187MOTION | Splash/loading states — see `TechBootLoader.tsx` as the shipped example |

## Routes

- `187GSAP` for GSAP timeline/ScrollTrigger mechanics.
- `187TYPE` for typography-specific motion.
- `187HERO`, `187MODEL`, `187SCROLL`, `187AUDIO`, `187VIZ` for their owned
  effect domains — see each skill's `references/EFFECT-CATALOG.md`.
- `187ACCESS+` for reduced-motion / vestibular / photosensitivity review
  beyond the baseline guardrails above.
- `187PUBLISH` for the final ship gate.

