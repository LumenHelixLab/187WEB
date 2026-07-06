---
name: stylistic-unification
description: >-
  Use when standardizing multi-author contributions into a consistent executive voice and flow.
origin: portfolio
---

# Voice Unify

**Suite:** 187web Ecosystem v2. Parent index:
[`187web-ecosystem`](../187web-ecosystem/SKILL.md).

This skill injects the `stylistic-unification` directive from the 187web Master Prompt Manifest.
Load it when the task matches the triggers below.

## When to use this

- The user selected text in an Obsidian note and needs a corporate/workflow template.

## Directive

> Standardize multi-author contributions to achieve a consistent, singular executive voice. Focus on sentence structure and flow. Context: {{SelectedText}}

## Inputs

| Var | Required | Default | Purpose |
|-----|----------|---------|---------|
| `SelectedText` | true | — | Injected context |

## Neuro-toxin profile

| Param | Value |
|-------|-------|
| toxicity | 0.4 |
| lethality | medium |

## Pairs with

- [`widow-weaver`](../widow-weaver/SKILL.md) — Core vault/text engine

This skill is a child of [`widow-weaver`](../widow-weaver/SKILL.md).
