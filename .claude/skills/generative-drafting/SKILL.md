---
name: generative-drafting
description: Use when generating a structured SME draft from a brief while maintaining
  an objective, analytical voice.
origin: portfolio
---
# Draft Venom

**Suite:** 187web Ecosystem v2. Parent index:
[`187web-ecosystem`](../187web-ecosystem/SKILL.md).

This skill injects the `generative-drafting` directive from the 187web Master Prompt Manifest.
Load it when the task matches the triggers below.

## When to use this

- The user needs native-OS text productivity on the active vault note.

## Directive

> Generate a comprehensive draft based on the user's brief instructions. Adopt the persona of a subject matter expert, structure the output logically with clear headings, and maintain an objective, analytical voice.

## Inputs

| Var | Required | Default | Purpose |
|-----|----------|---------|---------|
| `brief` | true | — | User-supplied value |

## Neuro-toxin profile

| Param | Value |
|-------|-------|
| toxicity | 0.5 |
| lethality | medium |

## Pairs with

- [`widow-weaver`](../widow-weaver/SKILL.md) — Core vault/text engine

This skill is a child of [`widow-weaver`](../widow-weaver/SKILL.md).
