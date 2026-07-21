# GSAP scroll-driven effects

Use for ScrollTrigger pin, scrub, parallax, and in-card scroll reveals.

## Living example

`components/motion-lab/ScrollRevealSampler.tsx` — wireframe → wordmark → badge scrubbed inside a card scroller.

## Pattern

```ts
import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion/gsap";

registerGsap();

gsap.fromTo(
  el,
  { y: 40, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    ease: "none",
    scrollTrigger: {
      scroller: cardScrollerEl, // optional: custom scroller
      trigger: el,
      start: "top 90%",
      end: "top 45%",
      scrub: 0.6,
    },
  },
);
```

## Rules

- Prefer scrub + transform opacity over long autoplay loops.
- Call `ScrollTrigger.refresh()` after layout shifts.
- Kill triggers scoped to the component on unmount.
- Reduced-motion: render the final static stack with no scrub.
