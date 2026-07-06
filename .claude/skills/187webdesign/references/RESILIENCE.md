# Resilience — design for the unhappy path

Award demos show the happy path; shipped products survive everything else. A
"killer" site is also a *robust* one: every surface has a designed loading,
empty, error, and offline state, and core content survives a missing script, a
slow radio, or a failed image. Below: the failure scenarios to assume, the
prebuilt redundancy for each, and where it lives in this repo.

## The unhappy-path matrix

| # | Scenario (what goes wrong) | Symptom if ignored | Prebuilt redundancy |
|---|----------------------------|--------------------|---------------------|
| 1 | **Slow network** | Blank screen, layout jump | Skeletons + reserved space (`Skeleton`), `route loading.tsx`, font-display: swap |
| 2 | **Offline / connection drop** | Dead clicks, confusing failures | `OfflineBanner` (navigator.onLine + events), cached static shell |
| 3 | **Request fails / times out** | Spinner forever, raw error | `ErrorState` with retry, fetch timeout + fallback copy |
| 4 | **No data yet / empty result** | "0", broken grid, dead end | `EmptyState` with a primary next action |
| 5 | **JS disabled or fails to load** | Blank page | Server-rendered/static HTML first; `<noscript>` reveal; content before hydration |
| 6 | **Runtime/render error** | White screen of death | `app/error.tsx` + component `ErrorBoundary` with reset |
| 7 | **Image fails / is slow** | Broken-image icon, CLS | `ImageWithFallback` (onError swap), width/height or aspect-ratio |
| 8 | **Third-party/script down** | Whole page blocked | Async/defer, feature-detect, never block first paint on 3rd parties |
| 9 | **Reduced-motion / vestibular** | Nausea, distraction | `prefers-reduced-motion` honored globally; canvases draw 1 static frame |
| 10 | **Low-end device / high INP** | Janky, unresponsive | Small client islands; pause rAF offscreen; debounce/throttle; yield |
| 11 | **Tiny / huge viewport** | Clipping, mis-scale | Fluid `clamp()`, container queries, test 320→ultrawide |
| 12 | **Keyboard / screen-reader only** | Unusable | Focus management, visible focus, skip link, ARIA live regions |
| 13 | **Form input errors** | Lost data, vague failure | Inline + summary errors, preserve input, `aria-invalid`, `aria-describedby` |
| 14 | **404 / wrong URL** | Generic dead end | Designed `not-found.tsx` with search + routes back |
| 15 | **Session/auth expiry** | Silent data loss | Detect 401, re-auth prompt, preserve in-progress work |

## The prebuilt components (this repo)

Live demo of every state: **`/resilience`** on the showcase.

- `components/resilience/Skeleton.tsx` — content-shaped shimmer placeholders.
- `components/resilience/EmptyState.tsx` — icon + message + primary action.
- `components/resilience/ErrorState.tsx` — message + **Retry**; used by the boundary.
- `components/resilience/ErrorBoundary.tsx` — class boundary for client islands.
- `components/resilience/OfflineBanner.tsx` — live online/offline status bar.
- `components/resilience/ImageWithFallback.tsx` — swaps to a placeholder on error.
- `app/error.tsx` — route-level error boundary (reset).
- `app/loading.tsx` — route-level skeleton during navigation.
- `app/not-found.tsx` — designed 404.

## Rules of thumb

1. **Never trust the network.** Every fetch has a timeout, an error path, and a
   retry; every awaited UI has a skeleton.
2. **Content before chrome.** The first meaningful paint is server/static HTML;
   JS only *enhances*. If the bundle never loads, the page still reads.
3. **Degrade, don't disappear.** A failed feature shrinks to a sensible default
   (preview mode, static number, placeholder) instead of erroring the page.
4. **Announce changes.** Loading/empty/error states use `role="status"` /
   `aria-live` so they're perceivable without sight.
5. **Make the dead end a door.** Every empty/404/error state offers the next
   action (retry, search, go home, contact).
