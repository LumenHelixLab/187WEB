---
name: persona-simulation-testing
description: >-
  Use when simulating a non-technical user persona to find stuck points and breakage in a web agent flow.
model_adapter: hermes
---

> **Hermes adapter:** Use `system.md` as the system message for Hermes-based local LLMs (Ollama, lm-studio, etc.). Source: [`../../.claude/skills/persona-simulation-testing/SKILL.md`](../../.claude/skills/persona-simulation-testing/SKILL.md).

# Persona Simulation Testing

**Suite:** 187web Ecosystem v2. Parent index:
[`187web-ecosystem`](../187web-ecosystem/SKILL.md).

This skill injects the `persona-simulation-testing` directive from the 187web Master Prompt Manifest.
Load it when the task matches the triggers below.

## When to use this

- The task is an explicit Layer-4 viral/elegant web or agent prompt.

## Directive

> Adopt the persona of {{Persona}}. Attempt to 'break' the current web agent flow. Identify where a non-technical user would get stuck.

## Inputs

| Var | Required | Default | Purpose |
|-----|----------|---------|---------|
| `Persona` | true | — | User-supplied value |

## Neuro-toxin profile

| Param | Value |
|-------|-------|
| toxicity | 0.6 |
| lethality | low |

## Pairs with

- [`agent-charlotte`](../agent-charlotte/SKILL.md) — Agentic simulation

This skill is part of the 187web manifest Layer-4 prompt library.

