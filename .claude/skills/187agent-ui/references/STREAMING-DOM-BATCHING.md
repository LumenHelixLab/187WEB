# Streaming-token DOM batching

Agent output arrives in bursts that don't match the browser's paint rate — a
token every 10ms, a tool-call log line 60 times a second. Writing the DOM on
every arrival causes layout thrash; batching writes to one per animation frame
fixes it without dropping a single token.

## The pattern: queue + rAF flush

```ts
function createTokenBatcher(target: HTMLElement) {
  let queue: string[] = [];
  let scheduled = false;

  function flush() {
    scheduled = false;
    if (queue.length === 0) return;
    // one write, not N — read phase (none needed here) stays separate from write phase
    target.append(document.createTextNode(queue.join("")));
    queue = [];
  }

  return {
    push(token: string) {
      queue.push(token);
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(flush);
      }
    },
    dispose() {
      queue = [];
      scheduled = false;
    },
  };
}
```

Every token pushed between two frames collapses into one `append`. A 240-token
burst becomes one paint, not 240.

## Read/write separation for anything geometry-dependent

If the render also needs to auto-scroll a transcript to the bottom, the naive
version reads `scrollHeight` and writes `scrollTop` on the same tick as the
text write, which is fine — but if *multiple* streaming regions are updating
in the same frame (transcript + tool-log + sidebar), read every region's
geometry before writing any of them:

```ts
function flushAll(regions: { el: HTMLElement; pending: string[] }[]) {
  // read phase
  const wasAtBottom = regions.map((r) => r.el.scrollHeight - r.el.scrollTop - r.el.clientHeight < 24);
  // write phase
  regions.forEach((r, i) => {
    if (r.pending.length === 0) return;
    r.el.append(document.createTextNode(r.pending.join("")));
    r.pending = [];
    if (wasAtBottom[i]) r.el.scrollTop = r.el.scrollHeight;
  });
}
```

Interleaving read-write-read-write across regions is what causes forced
synchronous layout ("layout thrash"); grouping all reads before all writes is
the fix, independent of how many regions there are.

## Virtual windowing for large batches

A single tool-call response with 100+ results should not inject 100 DOM nodes
in one frame even when batched — render a fixed window (e.g. 30 visible rows)
and recycle nodes on scroll, rather than growing the DOM unboundedly across a
long agent session. Pair with `187webdev-resilience`'s memory-safety guidance
for disposal when the agent resets.

## Routing

The *visual* treatment of a rendered token (fade-in, highlight-then-settle) is
a `187gsap` tween applied to the node this batcher already wrote — this file
only owns getting the node into the DOM without jank.
