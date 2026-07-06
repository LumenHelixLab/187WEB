---
name: annual-report-synthesizer
description: >-
  Use when extracting financial findings from raw text into exactly five focused bullet points totaling ~300 words.
model_adapter: hermes
---

> **Hermes adapter:** Use `system.md` as the system message for Hermes-based local LLMs (Ollama, lm-studio, etc.). Source: [`../../.claude/skills/annual-report-synthesizer/SKILL.md`](../../.claude/skills/annual-report-synthesizer/SKILL.md).

# Report Toxin

**Suite:** 187web Ecosystem v2. Parent index:
[`187web-ecosystem`](../187web-ecosystem/SKILL.md).

This skill injects the `annual-report-synthesizer` directive from the 187web Master Prompt Manifest.
Load it when the task matches the triggers below.

## When to use this

- The user selected text in an Obsidian note and needs a corporate/workflow template.

## Directive

> Extract financial findings from raw text. Present in exactly 5 bullet points, totaling ~300 words. Context: {{SelectedText}}

## Inputs

| Var | Required | Default | Purpose |
|-----|----------|---------|---------|
| `SelectedText` | true | — | Injected context |

## Neuro-toxin profile

| Param | Value |
|-------|-------|
| toxicity | 0.2 |
| lethality | max |

## Pairs with

- [`widow-weaver`](../widow-weaver/SKILL.md) — Core vault/text engine

This skill is a child of [`widow-weaver`](../widow-weaver/SKILL.md).

