---
name: 187agent-ui
description: >-
  Use for agentic-web frontend engineering — streaming-token DOM rendering, human-in-the-loop (HITL) input mechanics, pub/sub agent event buses, and agent-flavored data viz (confidence/embedding surfaces). Routes GSAP/motion, WebGL rendering, and resilience/performance concerns to their owning skills instead of duplicating them.
model_adapter: kimi
---

> **Kimi adapter:** Load via the Kimi Skill tool or place in your Kimi skills directory. Source: [`../../.claude/skills/187agent-ui/SKILL.md`](../../.claude/skills/187agent-ui/SKILL.md).

# 187AGENT-UI

NATASHA domain skill for the frontend cockpit of an AI agent — the layer
between a backend that streams tokens, tool calls, and state transitions, and
a human who needs to read, trust, and occasionally override what it's doing.
It is **not** a ninth motion-lab skill: it owns only the territory none of the
existing seven (187gsap/187type/187model/187scroll/187audio/187viz/187hero)
or 187webdev-resilience already cover, and routes everything else out.

## Manual triggers

- `/187agent-ui`
- `/187 agent-ui`
- `187AGENT-UI`
- `agent ui`
- `agentic frontend`
- `streaming token renderer`
- `human in the loop input`
- `HITL controls`
- `agent event bus`
- `pub/sub agent state`

## Automatic triggers

Use 187AGENT-UI when the task implies: rendering streamed LLM/agent output
token-by-token, a "Stop"/"Pause"/"Resume" control during live generation, an
agent status/state indicator (idle/thinking/acting/error), a drag-to-constrain
or point-and-click override surface for an autonomous agent, throttling or
debouncing rapid user commands sent to an agent, a typed event bus broadcasting
agent state to multiple UI regions, or visualizing confidence scores / token
probabilities / embedding proximity as a UI surface (not a full 3D scene —
that's 187viz/187hero).

## When to use

- Building or reviewing the UI shell that surrounds a live agent: chat
  transcript, tool-call log, reasoning-chain viewer, status chip.
- Wiring a pub/sub event bus so several disconnected components (transcript,
  status pill, sidebar) react to the same agent-state stream without prop
  drilling.
- Building HITL override controls: drag-to-constrain a bounding box, click to
  redirect a plan, throttle a "spam the stop button" input.
- Rendering high-frequency streaming updates (token-by-token text, 60x/second
  tool-call logs) without layout thrash or dropped frames.
- Mapping agent-native data (confidence scores, token probabilities, lat/long,
  embedding coordinates) to visual properties with a lightweight 2D surface.

## When not to use

- The task is a general entrance/hover/scroll animation with no agent-state
  semantics → `187gsap`.
- The task is a full WebGL/R3F hero, 3D product viewer, or particle field →
  `187hero` / `187model` / `187viz`.
- The task is kinetic typography with no streaming/state angle → `187type`.
- The task is audio playback or audio-reactive visuals → `187audio`.
- The task is scroll-driven camera/scene choreography → `187scroll`.
- The task is memory-leak triage, error boundaries, or unhappy-path coverage
  with no agent-specific shape → `187webdev-resilience`.
- The task needs a full design system pass (tokens, palette, layout) →
  `187webdesign` / `187webdev-design-system` / `187theme`.

## Coverage (genuinely new territory only)

1. **Agentic-logic core JS** — closures/lexical scoping to keep per-module
   agent state private (no global leakage across concurrent agent instances);
   `async`/`await` + async generators to orchestrate sequences that must pause
   on inference results rather than a fixed timeline; microtask-vs-repaint
   ordering so a UI stays responsive while an agent event stream is hot.
2. **Streaming-token DOM rendering** — `requestAnimationFrame`-batched
   read/write passes so injecting tokens or tool-call log lines at 10ms
   intervals never causes layout thrash; coalescing a high-frequency update
   stream into one paint per frame instead of one per message.
3. **HITL input mechanics** — unified Pointer Events handling across
   desktop/touch for agent override controls; throttle/debounce contracts so
   a user spamming a control doesn't flood the agent; drag-to-constrain /
   click-to-redirect gesture patterns specific to "take back control from an
   autonomous process," distinct from generic drag-and-drop.
4. **Agent event bus** — a typed pub/sub implementation (`AGENT_THINKING`,
   `TOOL_EXECUTED`, `AGENT_ERROR`, …) that broadcasts to N disconnected
   components without a framework's context tree; the ownership/cleanup rules
   for subscribers that outlive a single agent session.
5. **Agent-native data viz mapping** — the interpolation layer that turns raw
   agent output (confidence 0–1, token logprobs, embedding coordinates) into
   visual properties (opacity, radius, hue) without triggering reflow; the
   actual canvas/WebGL rendering of the result is 187viz's job — this owns the
   *mapping*, not the pixels.

## Output contract

1. **Agent-state model** — the states/events this surface renders and their
   transition rules (state machine, not ad hoc booleans).
2. **Render strategy** — batching approach for high-frequency updates, and the
   frame budget it targets.
3. **Event-bus wiring** — publishers, subscribers, typed event shapes, and
   cleanup/unsubscribe points.
4. **HITL contract** — what the human can interrupt or redirect, the
   throttle/debounce values, and what happens to in-flight agent work on
   override.
5. **Reduced-motion / accessibility fallback** — static-state equivalent for
   every animated state transition; keyboard path for every pointer-only HITL
   control.
6. **Routing notes** — which parts of the ask were handed to 187gsap/187viz/
   187motion/187webdev-resilience instead of built here, and why.
7. **Next actions** — concrete, assignable implementation steps.

## Routing rules

| Need | Route |
|------|--------|
| The actual tween/timeline driving a state transition | `187gsap` |
| Reusable R3F/GSAP hooks, skillchain composition | `187motion` |
| Rendering the confidence/embedding data as a 3D or WebGL scene | `187viz` |
| Full-screen immersive agent "hero" moment | `187hero` |
| Kinetic text treatment with no streaming semantics | `187type` |
| Audio cues for agent state (not the state model itself) | `187audio` |
| Scroll-driven reasoning-chain walkthrough camera | `187scroll` |
| Memory leak / cleanup discipline beyond event-bus unsubscribe | `187webdev-resilience` |
| Palette, tokens, layout system | `187theme` / `187webdev-design-system` |
| Final ship gate | `187publish` |

## Safety / ethics guardrails

- Never build a HITL "override" control that silently fails to stop the
  underlying agent action — the visible control and the actual interrupt must
  be the same signal.
- Never fabricate confidence scores, token probabilities, or agent state for
  a demo without labeling it as illustrative/synthetic data.
- Throttle/debounce HITL inputs to protect the agent from accidental flooding,
  never to make a genuine stop/cancel request slower to land.
- Respect `prefers-reduced-motion` on every state-transition animation; a
  reduced-motion user must still be able to tell Idle from Thinking from Error
  from a static state, not just from motion.
- Do not use this skill to build dark-pattern "agent is still working" stalling
  UI that hides a stalled or failed agent.

## Integration points

- **Claude Code / Grok:** load the canonical `187agent-ui` skill directly;
  pairs with `187gsap`'s `lib/motion/gsap.ts` registration for any tween work.
- **Obsidian/Claudian:** outputs saved as linked notes using
  `templates/agent-state-machine.md`, `templates/streaming-token-renderer.md`,
  and `templates/hitl-constraint-canvas.md`.
- **Adapters:** mirrored by `python scripts/generate-model-adapters.py`.

## Templates

| Template | When to use |
|---|---|
| [`templates/agent-state-machine.md`](templates/agent-state-machine.md) | Idle→Thinking→Acting→Error timeline for an agent status surface. |
| [`templates/streaming-token-renderer.md`](templates/streaming-token-renderer.md) | rAF-batched token-by-token DOM rendering. |
| [`templates/hitl-constraint-canvas.md`](templates/hitl-constraint-canvas.md) | Drag-to-constrain override surface wired to a pub/sub event bus. |

## Further references

- `references/AGENTIC-STATE-MACHINES.md` — core-JS closures/async patterns for
  agent module state and inference-paced sequencing.
- `references/STREAMING-DOM-BATCHING.md` — rAF batching for high-frequency
  agent output.
- `references/HITL-INPUT-MECHANICS.md` — pointer/touch unification, throttle/
  debounce, drag-to-constrain.
- `references/AGENT-EVENT-BUS.md` — typed pub/sub implementation and
  subscriber lifecycle.
- `references/AGENT-DATA-VIZ-MAPPING.md` — interpolating agent data to visual
  properties without reflow.

## Dashboards / UI representation

- Showcase route: `/187agent-ui`.
- Docs route: `docs/187AGENT-UI.md`.

## Adapter regeneration

```bash
python scripts/generate-model-adapters.py
```

## Acceptance tests

1. Prompt: "Render streamed tokens into the DOM without janking the page." →
   Expected: 187AGENT-UI returns an rAF-batched render strategy, frame budget,
   and reduced-motion fallback — not a raw `innerHTML +=` loop.
2. Prompt: "Let the user drag a box to constrain what the agent can click." →
   Expected: 187AGENT-UI returns a Pointer-Events-based HITL contract with
   keyboard fallback and explicit interrupt wiring to the agent, and routes
   the visual polish of the box itself to `187gsap` if requested.
3. Prompt: "Animate a hero section for our agent landing page." → Expected:
   187AGENT-UI declines the hero work and routes to `187hero`, offering only
   the agent-state-model layer if one exists on that page.
4. Prompt: "Broadcast agent status to the chat header, sidebar, and tab
   title at once." → Expected: 187AGENT-UI returns a typed pub/sub event-bus
   design with subscriber cleanup rules.

## Tone

Precise, systems-minded, unflashy. The agent is the star; the UI's job is to
never lie about what it's doing and never get in its way.

