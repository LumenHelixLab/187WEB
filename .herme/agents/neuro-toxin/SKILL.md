---
name: neuro-toxin
description: >-
  DEPRECATED. Routes to neuro-tension (TENSION). Do not use for new work.
model_adapter: hermes
---

> **Hermes adapter:** Use `system.md` as the system message for Hermes-based local LLMs (Ollama, lm-studio, etc.). Source: [`../../.claude/skills/neuro-toxin/SKILL.md`](../../.claude/skills/neuro-toxin/SKILL.md).

# neuro-toxin — DEPRECATED

**Status:** deprecated as of 2026-07-12.  
**Replacement:** [`neuro-tension`](../neuro-tension/SKILL.md) (module **TENSION** / legacy **TUNE**).  
**Migration:** [`docs/migrations/CHARLOTTE-TO-NATASHA.md`](../../../docs/migrations/CHARLOTTE-TO-NATASHA.md).

## Deprecation router

When this skill is loaded:

1. Emit: `DEPRECATED: neuro-toxin → neuro-tension (TENSION).`  
2. Load and follow **neuro-tension** exclusively.  
3. Map legacy keys (`toxicity`, `lethality_top_k`, …) per neuro-tension parameter table.  
4. Continue the user mission under TENSION profiles.

## Manual / automatic triggers

Historical `neuro-toxin`, “toxicity dose”, TUNE-only phrasing in old prompts.

## When to use

Compatibility only.

## When not to use

New work — call `neuro-tension` or module TENSION.

## Input / output contract

Same as `neuro-tension` after the deprecation notice.

## Routing rules

Always hand off to `neuro-tension`.

## Safety / ethics

Do not claim sampling parameters eliminate hallucinations.

## Acceptance tests

1. Load neuro-toxin → notice + neuro-tension profile guidance.  

