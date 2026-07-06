---
name: task-identification-extraction
description: >-
  Use when converting meeting transcripts or chaotic chat logs into actionable, distinct to-do items.
model_adapter: gemini
system_instruction: >-
  Convert meeting transcripts or chaotic chat logs into actionable, distinct to-do lists within the OS environment. Context: {{SelectedText}}
---

> **Gemini adapter:** Load as a system instruction. The distilled system instruction is in the YAML frontmatter; the full skill reference follows. Source: [`../../.claude/skills/task-identification-extraction/SKILL.md`](../../.claude/skills/task-identification-extraction/SKILL.md).

# Task Extractor

**Suite:** 187web Ecosystem v2. Parent index:
[`187web-ecosystem`](../187web-ecosystem/SKILL.md).

This skill injects the `task-identification-extraction` directive from the 187web Master Prompt Manifest.
Load it when the task matches the triggers below.

## When to use this

- The user selected text in an Obsidian note and needs a corporate/workflow template.

## Directive

> Convert meeting transcripts or chaotic chat logs into actionable, distinct to-do lists within the OS environment. Context: {{SelectedText}}

## Inputs

| Var | Required | Default | Purpose |
|-----|----------|---------|---------|
| `SelectedText` | true | — | Injected context |

## Neuro-toxin profile

| Param | Value |
|-------|-------|
| toxicity | 0.3 |
| lethality | max |

## Pairs with

- [`widow-weaver`](../widow-weaver/SKILL.md) — Core vault/text engine

This skill is a child of [`widow-weaver`](../widow-weaver/SKILL.md).

