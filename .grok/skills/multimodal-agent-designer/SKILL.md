---
name: multimodal-agent-designer
description: >-
  Use when designing multimodal agents, GUI automation, visual/audio grounding, or modality-aware tool interfaces.
model_adapter: grok
---

> **Grok adapter:** Load as repository skill instructions. Canonical source: [`../../.claude/skills/multimodal-agent-designer/SKILL.md`](../../.claude/skills/multimodal-agent-designer/SKILL.md).

# Multimodal Agent Designer

**Suite:** 187web Ecosystem v2. Parent index:
[`187web-ecosystem`](../187web-ecosystem/SKILL.md).

This skill injects the `multimodal-agent-designer` directive from the 187web Master Prompt Manifest.
Load it when the task matches the triggers below.

## When to use this

- The note lives in the `/Design` vault folder or needs the `ui-spinner` persona.
- The work crosses into specialized engineering territory where a generalist response costs precision.

## Directive

> Advise on active perception, visual/audio grounding, token-efficient context management, modality-aware tool design, and GUI automation frameworks.

## Neuro-toxin profile

| Param | Value |
|-------|-------|
| toxicity | 0.4 |
| lethality | medium |

## Pairs with

- [`swarm-mind`](../swarm-mind/SKILL.md) — Persona routing

This skill is a child of [`swarm-mind`](../swarm-mind/SKILL.md).

