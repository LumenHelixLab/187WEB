# 187agent-ui — Public Skill Doc

> **Canonical skill:** [`.claude/skills/187agent-ui/SKILL.md`](../.claude/skills/187agent-ui/SKILL.md)

## Identity

187AGENT-UI is the frontend cockpit for an AI agent — streaming-token DOM rendering, human-in-the-loop (HITL) input mechanics, a typed pub/sub agent event bus, and agent-flavored data viz mapping. It routes GSAP/motion, WebGL rendering, and resilience/performance concerns to the skills that already own them instead of duplicating that territory.

## Triggers

### Manual

- `/187agent-ui`
- `187AGENT-UI`
- `agent ui`
- `agentic frontend`
- `streaming token renderer`
- `human in the loop`

### Automatic

- Any request mentioning streamed agent output, a HITL override control, an agent status/state indicator, a pub/sub agent event bus, or mapping agent data (confidence, embeddings) to a visual property.

## When to use

- Rendering streamed LLM/agent output token-by-token without layout thrash.
- Building HITL override controls (drag-to-constrain, throttle/debounce commands).
- Wiring a typed pub/sub event bus across disconnected UI regions.
- Modeling an Idle/Thinking/Acting/Error agent status surface.
- Mapping agent-native data (confidence, logprobs, embedding coordinates) to visual properties.

## Output contract

1. **Agent-state model** — the transition table, not ad hoc booleans.
2. **Render strategy** — batching approach and frame budget for high-frequency updates.
3. **Event-bus wiring** — publishers, subscribers, and cleanup points.
4. **HITL contract** — throttle/debounce values and the interrupt path.
5. **Reduced-motion / accessibility fallback** — static-state equivalents and keyboard paths.
6. **Routing notes** — what was handed to 187gsap/187viz/187motion/187webdev-resilience instead of built here.
7. **Next actions** — concrete, assignable steps.

## Templates

| Template | When to use |
|---|---|
| `templates/agent-state-machine.md` | An Idle/Thinking/Acting/Error status surface. |
| `templates/streaming-token-renderer.md` | Token-by-token streamed output. |
| `templates/hitl-constraint-canvas.md` | A drag-to-constrain override control. |

## Acceptance tests

1. Prompt: "Render streamed tokens without janking the page." → Expected: rAF-batched render strategy, not a raw `innerHTML +=` loop.
2. Prompt: "Let the user drag a box to constrain what the agent can click." → Expected: Pointer-Events HITL contract with keyboard fallback.
3. Prompt: "Animate a hero section for our agent landing page." → Expected: declines the hero work, routes to `187hero`.

## Routes

- **Skill source:** `.claude/skills/187agent-ui/SKILL.md`
- **Docs:** `docs/187AGENT-UI.md`
- **Page:** `/187agent-ui`
