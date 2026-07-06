# Robust front-end code review — React / HTML5 / JS

A reusable review rubric for award-caliber *and* production-safe front-end code,
plus the findings from reviewing this repo's showcase. Use it on any PR; it pairs
with `CHECKLIST.md` (design/QA) — this one is engineering.

## Review rubric

### React (19 / server-first)
- [ ] Server Components by default; `"use client"` only on the smallest
      interactive leaf (keeps bundle/INP down).
- [ ] Every `useEffect` has a correct dependency array and a cleanup that removes
      listeners / cancels `requestAnimationFrame` / disconnects observers.
- [ ] No state updates after unmount; no effects that run only to set state that
      could be derived during render.
- [ ] Stable keys (not array index for reorderable lists); no work in render that
      belongs in an effect or event handler.
- [ ] Refs typed to the real element; no `any`. Props typed; no implicit `any`.

### HTML5 / semantics / a11y
- [ ] Landmarks (`header/nav/main/footer`), one `h1`, logical heading order.
- [ ] All controls labeled; decorative visuals `aria-hidden`; meaningful images
      have `alt`.
- [ ] Visible focus; full keyboard operability; targets ≥24×24px (WCAG 2.2).
- [ ] Live regions for async status; color never the only signal.

### JavaScript / performance
- [ ] No long tasks on the main thread during interaction; throttle/debounce
      high-frequency handlers; passive listeners for scroll/pointer.
- [ ] Animation via transform/opacity only (no layout thrash); rAF loops **pause
      when offscreen**; honor `prefers-reduced-motion`.
- [ ] Guard browser globals (`window`/`navigator`) for SSR/static export.
- [ ] No memory leaks (timers/listeners/observers cleaned up).

### SSR / static-export safety
- [ ] Builds with `output: export` (no server-only APIs on static routes).
- [ ] No `window`/`document` at module top level; only inside effects/handlers.

## Findings — this repo's showcase (reviewed & resolved)

| Sev | File | Finding | Resolution |
|-----|------|---------|-----------|
| Med | `components/showcase/Hero.tsx` | Constellation `rAF` ran even when the hero scrolled offscreen — wasted main-thread time, raises INP on long pages. | Added `IntersectionObserver` to **pause the loop when offscreen** and resume on re-entry. |
| Med | `components/showcase/primitives.tsx` `OrbitCanvas` | Same: orbit `rAF` ran continuously. | Paused when the canvas is not intersecting. |
| Low | `Hero` link pass | O(n²) nearest-neighbour lines each frame (n≤92 ⇒ ~4k pairs). | Acceptable at this cap; documented. Use a spatial grid if n grows. |
| Low | `primitives.tsx` global `pointermove` (cursor glow) | High-frequency handler. | rAF-smoothed; skipped on touch & reduced-motion. |
| Pass | all client comps | Effects clean up listeners/observers/rAF; globals guarded; decorative canvases `aria-hidden`; reduced-motion respected. | — |

## Standing rules

- **Prove it builds the way it ships.** Type-check + lint + the *static-export*
  build run in CI on every push (`.github/workflows/`).
- **Measure INP on a throttled device**, not a workstation; budget at 160ms.
- **Review the unhappy path** (`RESILIENCE.md`) in the same pass as the feature.
