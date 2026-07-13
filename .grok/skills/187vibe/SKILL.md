---
name: 187vibe
description: >-
  Use when adding delight, micro-interactions, onboarding, community, or retention to a 187WEB project.
model_adapter: grok
---

> **Grok adapter:** Load as repository skill instructions. Canonical source: [`../../.claude/skills/187vibe/SKILL.md`](../../.claude/skills/187vibe/SKILL.md).

# 187VIBE — Short-Name Delight + Community

## Identity

187VIBE is the short-name entry point for the NATASHA personality / delight layer.
It delegates to **SCOUT** ([`natasha-scout`](../natasha-scout/SKILL.md)),
**THREAD** ([`widow-weaver`](../widow-weaver/SKILL.md)),
**TENSION** ([`neuro-tension`](../neuro-tension/SKILL.md)),
**CORD** ([`swarm-mind`](../swarm-mind/SKILL.md)), and
**LAB** ([`silk-sandbox`](../silk-sandbox/SKILL.md)). It adds delight, onboarding,
retention, community, and safe execution to 187WEB projects.

## Manual triggers

- `/187vibe`
- `187VIBE`
- `delight`
- `whimsy`
- `onboarding`
- `retention`
- `community`
- `spark joy`
- `micro-interactions`

## Automatic triggers

Use 187VIBE when the task implies: delight, whimsy, onboarding, retention,
community, spark joy, micro-interactions, copy sharpening, inference tuning,
safe code execution, or persona selection.

## When to use

- Adding delight or micro-interactions to a component.
- Building onboarding flows or retention loops.
- Building community tools.
- Sharpening copy and extracting intent.
- Tuning inference parameters for a task.
- Running generated code safely.

## When not to use

- For research-grade source work — route to `187research`.
- For go-to-market strategy — route to `187launch`.
- For design or frontend execution — route to `187craft`.

## Input contract

User provides: the target surface, desired emotional outcome, audience, and any
constraints (brand voice, performance budget, accessibility).

## Output contract

1. **Mode** — which 187VIBE mode is active.
2. **Delight plan** — specific interactions, copy, or flows.
3. **Community / retention mechanics** — when relevant.
4. **Safety notes** — code execution, PII, consent.
5. **Next actions** — implementation steps and owners.

## Routing rules

- Use `187vibe` for delight, onboarding, retention, and community.
- Route research questions to `187research`.
- Route launch strategy to `187launch`.
- Route SEO questions to `187seo`.
- Route revenue architecture to `187revenue`.

## Safety / ethics guardrails

- Do not execute untrusted code outside a sandbox.
- Do not use dark patterns or manipulative retention tactics.
- Respect user consent and privacy in community features.
- Honor `prefers-reduced-motion` for delight animations.

## Integration points

- **Claude Code:** load the underlying NATASHA module skills directly for deep work.
- **Obsidian/Claudian:** outputs saved as linked notes using
  `templates/delight-plan.md` and `templates/onboarding-flow.md`.
- **CLI:** invoked via `187repo.sh vibe`.
- **Adapters:** mirrored by `python scripts/generate-model-adapters.py`.

## Templates

| Template | When to use |
|---|---|
| [`templates/delight-plan.md`](templates/delight-plan.md) | Plan a delight moment or micro-interaction. |
| [`templates/onboarding-flow.md`](templates/onboarding-flow.md) | Map an onboarding sequence. |

## Dashboards / UI representation

- Showcase route: `/187vibe` (future).
- Obsidian dashboard: `_system/187VIBE Dashboard.md` (future).

## CLI exposure

`187repo.sh vibe`

## Docs route

`docs/187VIBE.md`

## Adapter regeneration

```bash
python scripts/generate-model-adapters.py
```

## Acceptance tests

1. Prompt: "Add spark joy to this empty state." → Expected: 187VIBE proposes a
   playful, accessible micro-interaction with copy and motion notes.
2. Prompt: "Design an onboarding flow for a research app." → Expected: 187VIBE
   returns a step-by-step onboarding plan and routes consent-sensitive steps to
   `187access-plus` / `187include`.
3. Prompt: "Tune creativity vs precision for this copy task." → Expected:
   187VIBE uses TENSION framing to recommend temperature/top-p settings.

## Composition

1. **Context / tone:** THREAD sharpens copy and extracts intent.
2. **Persona depth:** CORD brings in the right specialist.
3. **Inference tuning:** TENSION dials precision vs creativity.
4. **Safe execution:** LAB runs generated code.
5. **Research-grade work:** route to `187research`, not `187vibe`.

## Slash commands

| Command | Action |
|---|---|
| `/187vibe delight` | Add Spark Joy to a component |
| `/187vibe whimsy` | Add playful micro-interactions |
| `/187vibe onboard` | Generate onboarding flow |
| `/187vibe community` | Build community tools |
| `/187vibe retention` | Create retention strategy |
| `/187vibe polish` | Add finishing touches |

## Tone

Warm, energetic, playful. Make users smile.

