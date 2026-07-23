# ScrollTrigger section pin / scrub maps

Use when planning a section that pins, scrubs, or reveals based on scroll
position — the backbone of most `187SCROLL` catalog entries
(`/187steptime`, `/187stickfeat`, `/187horizscroll`, and the rest of the
`scroll-pin`/`scroll-narrative` sub-skills). Write the map *before* touching
code: name every trigger, start/end, and scrub value up front so the
implementation is a transcription, not a design exercise.

## Living example

`components/motion-lab/ScrollNarrative.tsx` — camera/object choreography
driven by scroll position across the page.

## Map format

| Section | Trigger element | Start | End | Scrub | Pin | Notes |
|---|---|---|---|---|---|---|
| Hero → intro | `#hero` | `top top` | `bottom top` | `1` | no | Fades hero out as intro scrolls under |
| Feature stack | `#features` | `top 80%` | `bottom 20%` | `0.6` | `#features-pin` | Pins the visual, scrubs the copy stack beside it |
| CTA | `#cta` | `top 90%` | `top 40%` | `false` (one-shot) | no | Reveal, not scrub — plays once on enter |

## Pattern

```ts
import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion/gsap";

registerGsap();

const ctx = gsap.context(() => {
  gsap.to("#features-visual", {
    scrollTrigger: {
      trigger: "#features",
      start: "top 80%",
      end: "bottom 20%",
      scrub: 0.6,
      pin: "#features-pin",
      // markers: true, // dev-only — never ship
    },
    yPercent: -20,
  });
}, scopeRef);

return () => ctx.revert();
```

## Rules

- Fill in the map table before writing code — a scroll section with an
  undocumented `start`/`end` pair is the most common source of "it worked
  on my screen size" bugs.
- `scrub: true` snaps to scroll exactly (can feel laggy on trackpads);
  `scrub: <number>` adds a smoothing lag in seconds — prefer a small number
  (`0.3`–`1`) over boolean `true` for anything the user stares at.
- Call `ScrollTrigger.refresh()` after any layout shift outside the
  trigger's own timeline (image load, font swap, accordion open).
- `markers: true` is dev-only. `docs:drift`/`showcase:sync` won't catch a
  shipped marker — grep for it before merge.
- Reduced-motion: content still reveals on scroll (that's navigation), but
  drop `scrub` in favor of a one-shot `toggleActions` reveal — see
  `187MOTION` for the shared gate.
