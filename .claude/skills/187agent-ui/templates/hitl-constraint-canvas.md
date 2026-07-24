# HITL constraint canvas

Use for a drag-to-constrain override surface — the user draws a region to
limit or redirect what an autonomous agent can act on — wired to a typed
pub/sub event bus so the constraint reaches every interested subscriber in
one clean event.

## Living example

`components/agent-ui-lab/demos.tsx` — `ConstraintCanvas`.

## Pattern

See `references/HITL-INPUT-MECHANICS.md` for the full pointer-capture gesture
and `references/AGENT-EVENT-BUS.md` for the bus. Minimum viable wiring:

```ts
el.addEventListener("pointerdown", (e) => {
  el.setPointerCapture(e.pointerId);
  anchor = { x: e.offsetX, y: e.offsetY };
});

el.addEventListener("pointermove", (e) => {
  if (!anchor) return;
  requestAnimationFrame(() => drawRect(anchor, { x: e.offsetX, y: e.offsetY }));
});

el.addEventListener("pointerup", (e) => {
  if (!anchor) return;
  const region = normalizeRect(anchor, { x: e.offsetX, y: e.offsetY });
  agentBus.publish({ type: "REGION_CONSTRAINED", region });
  anchor = null;
});

el.addEventListener("pointercancel", () => { anchor = null; });
```

## Rules

- `pointercancel` must reset the same state `pointerup` would — an
  interrupted gesture (OS context menu, browser losing focus) can't leave a
  half-drawn region stuck.
- Publish exactly one `REGION_CONSTRAINED` event on commit, not one per
  `pointermove` — subscribers should never see in-progress drag noise.
- Keyboard equivalent required: a focused handle nudges with arrow keys,
  commits with Enter.
- Route the rectangle's visual polish (corner handles, glow) to `187gsap`;
  this template owns the gesture-to-event contract.
