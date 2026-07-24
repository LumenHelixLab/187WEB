# Agent state machine (Idle → Thinking → Acting → Error → Idle)

Use for a status surface that must never lie about what the agent is doing —
a chip, a border color, an icon — driven by explicit states, not booleans.

## Living example

`components/agent-ui-lab/demos.tsx` — `AgentStatusChip`.

## Pattern

```ts
type AgentState = "idle" | "thinking" | "acting" | "error";

const TRANSITIONS: Record<AgentState, AgentState[]> = {
  idle: ["thinking"],
  thinking: ["acting", "idle", "error"],
  acting: ["thinking", "idle", "error"],
  error: ["idle"],
};

function canTransition(from: AgentState, to: AgentState) {
  return TRANSITIONS[from].includes(to);
}
```

Reject (or log, never silently allow) a transition not listed in the table —
an "error" that jumps straight to "acting" without passing through a human
ack is exactly the kind of bug this table exists to catch.

## GSAP wiring (delegate the tween to 187gsap)

```ts
import { gsap, registerGsap } from "@/lib/motion/gsap";

registerGsap();
const tl = gsap.timeline({ paused: true });
tl.to(".status-ring", { rotate: 360, duration: 1.2, repeat: -1, ease: "none" }, 0);
// play/pause the ring based on state, don't build a second state machine in GSAP
function applyState(state: AgentState) {
  if (state === "thinking") tl.play();
  else tl.pause();
}
```

## Reduced-motion fallback

Every state needs a static tell independent of the ring's rotation: a label,
an icon, or a color — `prefers-reduced-motion` users get the same information
without the spin.

## Rules

- One source of truth for the current state; the visual layer only reads it.
- Log rejected transitions during development — a rejected transition usually
  means the agent backend and the UI have drifted out of sync.
- Route the tween itself to `187gsap`; this template owns the state table.
