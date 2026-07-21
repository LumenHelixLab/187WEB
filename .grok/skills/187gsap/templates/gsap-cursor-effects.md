# GSAP cursor / hover effects

Use for magnetic buttons, proximity grids, and pointer-tracking micro-interactions.

## Living example

`components/motion-lab/MagneticMascot.tsx` — badge + wireframe lean toward the pointer via `gsap.quickTo`.

## Pattern

```ts
import { gsap } from "@/lib/motion/gsap";

const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

root.addEventListener("pointermove", (e) => {
  const rect = root.getBoundingClientRect();
  xTo((e.clientX - rect.left - rect.width / 2) * 0.15);
  yTo((e.clientY - rect.top - rect.height / 2) * 0.15);
});

root.addEventListener("pointerleave", () => {
  xTo(0);
  yTo(0);
});
```

## Rules

- Transform-only (`x`/`y`/`scale`/`rotate`) — no layout thrash.
- Kill listeners and tweens on unmount.
- Under `prefers-reduced-motion`, skip pointer tracking and show the static stack.
