# GSAP page transitions / Flip morphs

Use for layout morphs, shared-element transitions, and route-level timeline handoffs.

## Living example

`components/motion-lab/FlipPageSampler.tsx` — triangle grid ↔ lockup + mascot detail via Flip.

## Pattern

```ts
import { Flip, gsap, registerGsap } from "@/lib/motion/gsap";

registerGsap();

// 1. Capture state before DOM/layout change
const state = Flip.getState(root.querySelectorAll("[data-flip-id]"));

// 2. Apply React/DOM change
setOpen(true);

// 3. After commit (useLayoutEffect), animate from prior state
Flip.from(state, {
  duration: 0.55,
  ease: "power2.inOut",
  absolute: true,
  nested: true,
  onEnter: (els) => gsap.fromTo(els, { opacity: 0 }, { opacity: 1, duration: 0.3 }),
  onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.2 }),
});
```

## Rules

- Register Flip once (`registerGsap()` already does this in 187WEB).
- Prefer `data-flip-id` matching across states for shared elements.
- Reduced-motion: cross-fade or instant swap — no Flip morph.
