---
name: agent-charlotte
description: >-
  DEPRECATED. Routes to natasha-scout (SCOUT). Do not use for new work.
model_adapter: hermes
---

> **Hermes adapter:** Use `system.md` as the system message for Hermes-based local LLMs (Ollama, lm-studio, etc.). Source: [`../../.claude/skills/agent-charlotte/SKILL.md`](../../.claude/skills/agent-charlotte/SKILL.md).

# agent-charlotte — DEPRECATED

**Status:** deprecated as of 2026-07-12.  
**Replacement:** [`natasha-scout`](../natasha-scout/SKILL.md) (module **SCOUT**).  
**Migration:** [`docs/migrations/CHARLOTTE-TO-NATASHA.md`](../../../docs/migrations/CHARLOTTE-TO-NATASHA.md).

## Deprecation router

When this skill is loaded:

1. Emit: `DEPRECATED: agent-charlotte → natasha-scout (SCOUT). Charlotte is not the 187WEB operator.`  
2. Load and follow **natasha-scout** exclusively.  
3. Do **not** apply legacy fingerprint-spoofing or anti-bot-evasion directives from older agent-charlotte text.  
4. Continue the user mission under SCOUT safety rules.

## Manual / automatic triggers

Any historical reference to `agent-charlotte`, `CHAR`, `char`, or Charlotte-as-crawler.

## When to use

Never for new designs. Only as a compatibility entry point.

## When not to use

All new research tasks — call `natasha-scout` directly.

## Input / output contract

Same as `natasha-scout` after the deprecation notice.

## Routing rules

Always hand off to `natasha-scout`.

## Safety / ethics

Inherit **natasha-scout** guardrails only (stricter than pre-v3 crawler wording).

## Acceptance tests

1. Load agent-charlotte → notice + SCOUT behavior.  
2. Request paywall bypass → refuse under SCOUT rules.  

