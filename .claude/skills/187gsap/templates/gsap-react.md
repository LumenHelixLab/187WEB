# GSAP + React cleanup patterns

The one non-negotiable rule underneath every other template in this skill:
GSAP tweens and ScrollTriggers registered inside a React component **must**
be scoped and reverted, or they leak — and in dev/Strict Mode double-invoke,
an un-scoped effect doubles its tweens, not just its console noise.

## Living example

`components/motion/TechBootLoader.tsx` and every file under
`components/motion-lab/` follow this exact shape.

## Pattern

```ts
"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useClientMounted } from "@/lib/motion/useClientMounted";

export function AnyMotionComponent() {
  const mounted = useClientMounted();   // 1. never touch window/gsap before mount
  const reduced = useReducedMotion();   // 2. respect the user's stated preference
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted || reduced || !scopeRef.current) return; // 3. bail early, both conditions
    registerGsap();                                        // 4. idempotent plugin registration

    const ctx = gsap.context(() => {
      // 5. all gsap.to/from/timeline calls go here, scoped to scopeRef
    }, scopeRef);

    return () => ctx.revert();                              // 6. the whole reason this pattern exists
  }, [mounted, reduced]);

  return <div ref={scopeRef}>{/* ... */}</div>;
}
```

## Rules

- `useClientMounted()` first — SSR and the first client paint must render
  identically, or hydration mismatches. Never read `window.matchMedia` or
  start a tween before this is `true`.
- `useReducedMotion()` gates the *entire* effect, not individual tweens
  inside it — if reduced motion is on, the effect shouldn't run at all; the
  component's default (non-animated) render *is* the reduced-motion state.
- `registerGsap()` is safe to call from every component — it's guarded by a
  module-level `registered` flag in `lib/motion/gsap.ts` and does nothing on
  the second call.
- Every `gsap.to`/`from`/`fromTo`/`timeline` call lives inside exactly one
  `gsap.context(fn, scopeRef)` per component — this is what makes
  `ctx.revert()` able to kill everything the component created, including
  ScrollTriggers, in one call.
- The cleanup function returns `ctx.revert()` and nothing else. Don't
  manually track tween references to kill them individually — that's what
  `gsap.context` already does, correctly, including edge cases like a tween
  that outlives its scope element.
- If the component owns its own timeline ref for external control (play/
  pause from outside), use `useGsapTimeline` (`lib/motion/useGsapTimeline.ts`)
  instead of hand-rolling this — it wraps the exact pattern above.
