# 187KERNEL

187KERNEL is the default behavior cycle for every 187WEB skill and module. It is not a separate skill; it is the operating rhythm built into each one.

## Behavior cycle

```text
Detect → Read → Interpret → Report → Plan → Act → Verify → Handoff → Log
```

1. **Detect** — Identify the request type, alias, target, mode, and depth.
2. **Read** — Gather the relevant context: files, sources, config, or prior logs.
3. **Interpret** — Convert the request into a bounded task statement.
4. **Report** — State what will be done, any risks, and what approval is needed.
5. **Plan** — Produce a minimal, ordered plan before acting.
6. **Act** — Execute only within the approved scope.
7. **Verify** — Check that the output matches the request and quality gates.
8. **Handoff** — Pass to another skill only when genuinely needed.
9. **Log** — Record decisions, actions, and outcomes for traceability.

## Autonomy levels

| Level | Name | Behavior |
|---|---|---|
| **L1** | `READ_ONLY_REPORT` | Default. Read, interpret, report, and propose. No side effects without explicit consent. |
| **L2** | `DRAFT_AND_REVIEW` | Produce drafts, plans, or code. Wait for human review before applying. |
| **L3** | `ACT_AND_VERIFY` | Apply changes inside the scoped target, then verify and report. Requires explicit mode authorization. |
| **L4** | `ORCHESTRATE_AND_RELEASE` | Coordinate multiple skills and publish public surfaces. Reserved for `release` mode with full human review. |

Higher autonomy is never implied. It must be requested through an explicit mode or a scoped consent step.

## Human-in-the-loop

- **Scoped consent** — the human approves a specific target, mode, and depth, not an open-ended mandate.
- **Meaningful review** — before any L3 or L4 action, the skill presents a clear summary of what will change.
- **Stop signal** — any request to pause, revert, or escalate overrides the cycle immediately.

## Related docs

- [docs/187SKILLS.md](187SKILLS.md) — full skill roster and command grammar.
- [docs/187-NAMES.md](187-NAMES.md) — alias table, modes, and depths.
- [docs/187-MODULES.md](187-MODULES.md) — THREAD, COMPRESS, TENSION, SPARK, CORD, SCOUT, LAB, FUSE.
- [docs/187-CHAR.md](187-CHAR.md) — legacy scout doc (maps to SCOUT).
- [docs/NATASHA-AGENTIC-HANDOFFS.md](NATASHA-AGENTIC-HANDOFFS.md) — HANDOFF workflow support.
