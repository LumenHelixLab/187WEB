# Human-in-the-loop (HITL) input mechanics

Controls that let a person interrupt, redirect, or constrain an autonomous
process. The mechanics differ from ordinary UI input handling in one respect:
the cost of a *missed* or *delayed* signal is the agent doing something the
human already tried to stop.

## Pointer Events, not mouse + touch branches

One listener family covers mouse, touch, and pen, and avoids the classic
double-fire bug of binding both `mousedown` and `touchstart`:

```ts
el.addEventListener("pointerdown", onStart);
el.addEventListener("pointermove", onMove);
el.addEventListener("pointerup", onEnd);
el.addEventListener("pointercancel", onEnd); // required — a HITL control that
// never fires "cancel" on an interrupted gesture (e.g. an OS-level context
// menu popping up mid-drag) leaves the agent's constraint state stuck.
```

`setPointerCapture(e.pointerId)` on `pointerdown` keeps the drag tracking the
pointer even if it leaves the element's bounds — important for a
drag-to-constrain box, where the human is often dragging *past* the edge of
the intended region.

## Throttle vs. debounce — pick the one that matches the risk

- **Throttle** a control the human might rapid-fire (e.g. "step forward one
  token") so every Nth click isn't dropped, just rate-limited. The agent still
  gets a click every ~100ms even under a spam of clicks.
- **Debounce** a control where only the *final* value matters (e.g. dragging a
  confidence-threshold slider) so the agent isn't flooded with intermediate
  values it'll immediately supersede.
- **Never throttle or debounce a stop/cancel/interrupt control.** That signal
  fires once, immediately, unconditionally — see Safety in `SKILL.md`.

```ts
function throttle<T extends (...args: never[]) => void>(fn: T, ms: number) {
  let last = 0;
  return (...args: Parameters<T>) => {
    const now = performance.now();
    if (now - last >= ms) {
      last = now;
      fn(...args);
    }
  };
}

function debounce<T extends (...args: never[]) => void>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
```

## Drag-to-constrain

The gesture where a human draws a box to limit where an autonomous
computer-use agent may click, distinct from generic drag-and-drop (which
moves an object; this *defines a region*):

1. `pointerdown` records the anchor corner.
2. `pointermove` (throttled to animation-frame rate via rAF, not a fixed ms
   value — this is a visual-feedback loop, not an agent-facing signal) updates
   the opposite corner and redraws the rectangle.
3. `pointerup` commits the region and publishes it on the event bus (see
   `AGENT-EVENT-BUS.md`) as a single, final `REGION_CONSTRAINED` event — the
   agent should see one clean rectangle, not a stream of in-progress ones.
4. Provide a keyboard equivalent (arrow keys to nudge a focused handle, Enter
   to commit) — a pointer-only HITL control excludes anyone who can't drag.

## Feedback signal: prove receipt

A control that silently accepts input leaves the human unsure whether the
agent "got it." Pair every HITL commit with an immediate, cheap acknowledgment
(a border flash, a status-chip update) *before* waiting on the agent's actual
response — the acknowledgment says "your input was received," not "the agent
has acted on it," and those are different promises; don't conflate them.

## Routing

The polish on that acknowledgment flash (easing, duration) is `187gsap`
territory — this file owns the event contract and gesture recognition it
attaches to.
