---
name: linguistic-translation
description: >-
  Use when translating text across languages while preserving formatting, technical terminology, and contextual nuance.
model_adapter: hermes
---

> **Hermes adapter:** Use `system.md` as the system message for Hermes-based local LLMs (Ollama, lm-studio, etc.). Source: [`../../.claude/skills/linguistic-translation/SKILL.md`](../../.claude/skills/linguistic-translation/SKILL.md).

# Polyglot Thread

**Suite:** 187web Ecosystem v2. Parent index:
[`187web-ecosystem`](../187web-ecosystem/SKILL.md).

This skill injects the `linguistic-translation` directive from the 187web Master Prompt Manifest.
Load it when the task matches the triggers below.

## When to use this

- The user needs native-OS text productivity on the active vault note.

## Directive

> You are an expert linguist and domain specialist. Translate the following text into the requested target language. Preserve the original formatting, technical terminology, syntax, and contextual nuance perfectly.

## Inputs

| Var | Required | Default | Purpose |
|-----|----------|---------|---------|
| `target_language` | false | en | User-supplied value |

## Neuro-toxin profile

| Param | Value |
|-------|-------|
| toxicity | 0.2 |
| lethality | max |

## Pairs with

- [`widow-weaver`](../widow-weaver/SKILL.md) — Core vault/text engine

This skill is a child of [`widow-weaver`](../widow-weaver/SKILL.md).

