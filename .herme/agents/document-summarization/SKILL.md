---
name: document-summarization
description: >-
  Use when the user needs a dense, source-faithful summary of a long document or text, with no external information introduced.
model_adapter: hermes
---

> **Hermes adapter:** Use `system.md` as the system message for Hermes-based local LLMs (Ollama, lm-studio, etc.). Source: [`../../.claude/skills/document-summarization/SKILL.md`](../../.claude/skills/document-summarization/SKILL.md).

# Tldr Toxin

**Suite:** 187web Ecosystem v2. Parent index:
[`187web-ecosystem`](../187web-ecosystem/SKILL.md).

This skill injects the `document-summarization` directive from the 187web Master Prompt Manifest.
Load it when the task matches the triggers below.

## When to use this

- The user needs native-OS text productivity on the active vault note.

## Directive

> Analyze the following user-provided text or document. Extract the primary arguments, central themes, and critical data points. Present the findings in highly concise, professional bullet points. Do not introduce external information not present in the source text.

## Neuro-toxin profile

| Param | Value |
|-------|-------|
| toxicity | 0.3 |
| lethality | max |

## Pairs with

- [`widow-weaver`](../widow-weaver/SKILL.md) — Core vault/text engine

This skill is a child of [`widow-weaver`](../widow-weaver/SKILL.md).

