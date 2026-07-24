# Agent event bus (pub/sub)

Broadcasting agent-state changes to disconnected UI regions — a status chip in
the header, a row in a sidebar, a browser tab title — without wiring every
consumer through a shared component tree.

## Minimal typed bus

```ts
type AgentEvent =
  | { type: "AGENT_THINKING"; id: string }
  | { type: "AGENT_ACTING"; id: string; tool: string }
  | { type: "AGENT_ERROR"; id: string; message: string }
  | { type: "AGENT_IDLE"; id: string }
  | { type: "TOOL_EXECUTED"; id: string; tool: string; ok: boolean };

type Listener = (e: AgentEvent) => void;

function createAgentBus() {
  const listeners = new Set<Listener>();
  return {
    publish(e: AgentEvent) {
      listeners.forEach((fn) => fn(e));
    },
    subscribe(fn: Listener) {
      listeners.add(fn);
      return () => listeners.delete(fn); // unsubscribe — see cleanup below
    },
  };
}
```

The discriminated union on `type` is the point: a consumer that only cares
about `AGENT_ERROR` narrows on it with a plain `if`, no runtime schema
validation needed, and TypeScript catches a typo'd event name at compile time
instead of it silently never firing.

## Subscriber lifecycle

Every `subscribe()` call returns an unsubscribe function; every component that
subscribes must call it on unmount / cleanup. In a React component this is the
effect-cleanup return value:

```ts
useEffect(() => {
  const unsub = agentBus.subscribe((e) => {
    if (e.type === "AGENT_ERROR") setErrorMsg(e.message);
  });
  return unsub;
}, []);
```

A bus that outlives the page (module-scoped, not component-scoped) is the
usual source of an agent-session memory leak — a subscriber from a *previous*
agent session that never unsubscribed keeps firing into state nobody reads.
Route the disposal audit for this specifically to `187webdev-resilience`; this
file only owns the wiring pattern.

## One bus per agent session, not one bus for the app

Scope the bus to the agent controller (see `AGENTIC-STATE-MACHINES.md`'s
closure-based factory) rather than a single app-wide singleton. Switching
between "Coder" and "Analyst" agents should mean discarding one bus and
creating another, not filtering a shared stream by `id` — filtering by `id`
means every subscriber pays the cost of every agent's events even when it only
cares about one.

## Routing

Rendering the *result* of an event (a timeline, a 3D scene update) is
187gsap/187viz territory — this file only owns getting the typed event from
publisher to subscriber.
