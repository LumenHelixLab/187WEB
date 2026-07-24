# Agent-native data viz mapping

Turning raw agent output — a confidence score, a token logprob, an embedding
coordinate — into a visual property, without the mapping step itself causing
a reflow. This file owns the *interpolation*; the actual canvas/WebGL render
target is `187viz` (grid/particle/network scenes) or `187hero` (full-screen
immersive) — see those skills for the rendering surface itself.

## Map to a CSS custom property, not a class swap

A confidence score updating 10x/second should drive a custom property that
a stylesheet already consumes, not a class name that forces a style
recalculation on every tick:

```ts
function setConfidence(el: HTMLElement, score: number) {
  // clamp once here, not in the consuming CSS
  const clamped = Math.max(0, Math.min(1, score));
  el.style.setProperty("--agent-confidence", clamped.toFixed(3));
}
```

```css
.confidence-bar {
  opacity: calc(0.35 + var(--agent-confidence) * 0.65);
  transform: scaleX(var(--agent-confidence));
}
```

The browser handles the interpolation between property writes as a normal
style recompute — no manual `requestAnimationFrame` tween needed for a single
scalar; reserve rAF batching (`STREAMING-DOM-BATCHING.md`) for cases with many
elements updating in the same frame.

## Precompute, don't trig-in-the-loop

Mapping an embedding coordinate to a screen position (e.g. polar → cartesian
for a radial confidence display) with `Math.cos`/`Math.sin` inside a
high-frequency update loop is a measurable cost at scale, and — if any part of
that math runs during SSR — a hydration-mismatch risk, since Node's and the
browser's floating-point transcendental functions aren't guaranteed
bit-identical. Precompute a lookup table for any fixed set of angles/steps
instead of calling `Math.cos`/`Math.sin` per frame per point.

## Color mapping: perceptual, not linear-in-hex

Interpolating two hex colors channel-by-channel (linear RGB) for a
confidence gradient produces a visible grey dead-zone in the middle of the
range. Prefer `color-mix(in oklab, ...)` (or a precomputed OKLab ramp) over
naive RGB lerp when the mapping needs to read as smooth across its full range
— this matters most for confidence heatmaps, where the middle of the range is
exactly the ambiguous case a viewer most needs to read correctly.

## Routing

Once the mapping produces (x, y, radius, hue) tuples, handing them to a canvas
2D loop or a WebGL point cloud is `187viz`'s job (see its `useCanvas2D`-style
hook pattern) — this file stops at producing the numbers.
