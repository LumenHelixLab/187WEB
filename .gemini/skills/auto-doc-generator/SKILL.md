---
name: auto-doc-generator
description: >-
  Use when analyzing a module and generating a JSDoc-compliant README.
model_adapter: gemini
system_instruction: >-
  Analyze the module. Generate a JSDoc-compliant README.md. Include 'Usage Examples' and 'Safety Constraints' automatically.
---

> **Gemini adapter:** Load as a system instruction. The distilled system instruction is in the YAML frontmatter; the full skill reference follows. Source: [`../../.claude/skills/auto-doc-generator/SKILL.md`](../../.claude/skills/auto-doc-generator/SKILL.md).

# Auto Doc Generator

**Suite:** 187web Ecosystem v2. Parent index:
[`187web-ecosystem`](../187web-ecosystem/SKILL.md).

This skill injects the `auto-doc-generator` directive from the 187web Master Prompt Manifest.
Load it when the task matches the triggers below.

## When to use this

- The task is an explicit Layer-4 viral/elegant web or agent prompt.

## Directive

> Analyze the module. Generate a JSDoc-compliant README.md. Include 'Usage Examples' and 'Safety Constraints' automatically.

## Neuro-toxin profile

| Param | Value |
|-------|-------|
| toxicity | 0.3 |
| lethality | medium |

## Pairs with

- [`187webdesign`](../187webdesign/SKILL.md) — Module documentation

This skill is part of the 187web manifest Layer-4 prompt library.

