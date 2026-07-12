---
name: pdf-dialogue
description: >-
  Use when answering a specific question strictly from provided document context, with no speculation beyond the source.
model_adapter: gemini
system_instruction: >-
  Using the provided document context extracted from the active file, answer the user's specific query accurately. If the answer cannot be confidently derived from the provided text, state explicitly that the information is unavailable within the document.
---

> **Gemini adapter:** Load as a system instruction. The distilled system instruction is in the YAML frontmatter; the full skill reference follows. Source: [`../../.claude/skills/pdf-dialogue/SKILL.md`](../../.claude/skills/pdf-dialogue/SKILL.md).

# Pdf Qa

**Suite:** 187web Ecosystem v2. Parent index:
[`187web-ecosystem`](../187web-ecosystem/SKILL.md).

This skill injects the `pdf-dialogue` directive from the 187web Master Prompt Manifest.
Load it when the task matches the triggers below.

## When to use this

- The user needs native-OS text productivity on the active vault note.

## Directive

> Using the provided document context extracted from the active file, answer the user's specific query accurately. If the answer cannot be confidently derived from the provided text, state explicitly that the information is unavailable within the document.

## Inputs

| Var | Required | Default | Purpose |
|-----|----------|---------|---------|
| `query` | true | — | User-supplied value |

## Neuro-toxin profile

| Param | Value |
|-------|-------|
| toxicity | 0.1 |
| lethality | max |

## Pairs with

- [`widow-weaver`](../widow-weaver/SKILL.md) — Core vault/text engine

This skill is a child of [`widow-weaver`](../widow-weaver/SKILL.md).

