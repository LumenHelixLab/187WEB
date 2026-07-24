# Agentic-logic core JS

The part of "agentic UI" that has nothing to do with animation: keeping one
agent module's state private from another, and sequencing UI updates around
an inference process that doesn't run on a fixed clock.

## Closures over classes for per-instance agent state

A page can host more than one agent surface at once (a "Coder" panel and an
"Analyst" panel). Module-level `let` state leaks across both; a closure-scoped
factory doesn't:

```ts
function createAgentController(id: string) {
  let status: "idle" | "thinking" | "acting" | "error" = "idle";
  const listeners = new Set<(s: typeof status) => void>();

  function setStatus(next: typeof status) {
    status = next;
    listeners.forEach((fn) => fn(status));
  }

  return {
    id,
    getStatus: () => status,
    subscribe(fn: (s: typeof status) => void) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    setStatus,
  };
}
```

Two `createAgentController("coder")` / `createAgentController("analyst")`
instances never see each other's state, and there's no cleanup burden beyond
what each instance already owns — contrast with a shared module singleton,
which needs explicit reset logic on every agent switch.

## Async generators for inference-paced sequences

A boot/reveal animation runs on a fixed timeline (`gsap.timeline()` is right
for that — see `187gsap`). A sequence that must *wait for the next inference
result* before advancing is a different shape: an async generator that yields
once per agent event, consumed by a `for await` loop.

```ts
async function* agentEvents(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { value, done } = await reader.read();
    if (done) return;
    yield decoder.decode(value, { stream: true });
  }
}

async function renderStream(stream: ReadableStream<Uint8Array>, onToken: (t: string) => void) {
  for await (const token of agentEvents(stream)) {
    onToken(token); // hand off to the rAF batcher — see STREAMING-DOM-BATCHING.md
  }
}
```

Don't reach for a `setInterval` poll loop here — it either falls behind a fast
stream or busy-waits on a slow one. The generator only does work when there's
actually a token.

## Microtask ordering vs. paint

`await` continuations run as microtasks, which flush *before* the next paint.
A tight loop of `await`ed agent events that each queue a DOM write can starve
the browser's paint cycle even though nothing looks synchronous in the source.
The fix isn't fewer `await`s — it's making sure the DOM write itself goes
through an rAF-batched queue (see `STREAMING-DOM-BATCHING.md`) rather than
writing on every microtask tick.

## Routing

Timeline-driven, fixed-duration animation → `187gsap`. This file only covers
the inference-paced, event-driven half.
