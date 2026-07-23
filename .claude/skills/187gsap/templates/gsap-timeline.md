# GSAP timeline-driven entrances

Use for any multi-step entrance sequence where steps must stay in relative
sync — a hero reveal, a boot/loader sequence, a card grid stagger. This is
the template `187MOTION`'s **Hero Launch** and **Loader / Boot Sequence**
skillchains both hand off into.

## Living example

`components/motion/TechBootLoader.tsx` — opacity fade-in, tick-mark stagger,
and a numeric progress tween all scoped to one `gsap.context()`, with a
reduced-motion branch that skips straight to the final state.

## Pattern

```ts
"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useClientMounted } from "@/lib/motion/useClientMounted";

export function EntranceSequence() {
  const mounted = useClientMounted();
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted || reduced || !rootRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(".entrance-bg", { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .fromTo(".entrance-headline", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.1")
        .fromTo(".entrance-item", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.05 }, "-=0.2")
        .addLabel("cta-ready");
    }, rootRef);

    return () => ctx.revert();
  }, [mounted, reduced]);

  return <div ref={rootRef}>{/* .entrance-bg / .entrance-headline / .entrance-item nodes */}</div>;
}
```

## Rules

- One `gsap.timeline()` per entrance, scoped inside one `gsap.context()`
  — not a pile of independent `gsap.to()` calls racing each other.
- Use the position parameter (`"-=0.1"`) for overlap, not fixed `delay`
  values — it stays correct if an earlier step's duration changes.
- Label the beat other code needs to hook (`addLabel("cta-ready")`) instead
  of hardcoding a timestamp downstream.
- Reduced-motion: skip the whole effect and render final state directly —
  see the `if (!mounted || reduced || ...) return;` guard above. Do not run
  a shortened version of the timeline; run none of it.
- `ctx.revert()` on cleanup, always — this is what makes the pattern
  React-safe across remounts and route changes.
