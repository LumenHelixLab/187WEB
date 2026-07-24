# Streaming token renderer

Use for rendering LLM/agent output token-by-token into the DOM without
janking the page, and without losing the user's ability to click "Stop"
mid-stream.

## Living example

`components/agent-ui-lab/demos.tsx` — `StreamRenderer`.

## Pattern

See `references/STREAMING-DOM-BATCHING.md` for the full batching rationale.
Minimum viable shape:

```ts
const batcher = createTokenBatcher(transcriptEl);

for await (const token of agentEvents(stream)) {
  if (stopRequested) break; // checked every iteration — a stop must land
  // within one token, not one batch
  batcher.push(token);
}
batcher.dispose();
```

## Rules

- Check the stop/cancel flag every loop iteration, not just at flush time —
  the human's stop control is not subject to batching.
- One `requestAnimationFrame` flush per frame regardless of token arrival
  rate; never flush synchronously on every token.
- Auto-scroll only if the viewport was already at the bottom before the
  write (see the read-before-write pattern in `STREAMING-DOM-BATCHING.md`) —
  don't yank a user's scroll position who scrolled up to re-read something.
- Route the per-token visual treatment (fade-in, highlight) to `187gsap`
  applied to the node this template already appended.
