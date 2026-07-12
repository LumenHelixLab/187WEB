---
name: token-web
description: >-
  Use for loss-bounded context compression into NATASHA context packets with fidelity metrics and NO_OP when compression would drop hard requirements.
model_adapter: chatgpt
---

> **ChatGPT adapter:** Use the markdown below as the custom GPT / system instructions. Source: [`../../.claude/skills/token-web/SKILL.md`](../../.claude/skills/token-web/SKILL.md).

# token-web — COMPRESS

**Module:** **COMPRESS** · Parent: [`187web-ecosystem`](../187web-ecosystem/SKILL.md)

Phase 1 foundation stub: full references/templates expand in Phase 2. Agents must already obey compression invariants below.

## Manual triggers

`/187 compress`, `COMPRESS`, `token-web`, context capsule

## Automatic triggers

oversized context, subagent handoff, multi-file packet, token budget

## When to use

- Context exceeds budget before CORD/LAB  
- Subagent handoff needs a bounded packet  

## When not to use

- Short prompts already under budget  
- When compression would drop hard requirements → return **`NO_OP`**

## Input contract

Raw mission text, constraints, paths, numbers, decisions, token_budget.

## Output contract

1. Compressed packet or `NO_OP`  
2. Loss report (what was dropped — only soft redundancy)  
3. Fidelity checklist: 100% hard requirements, identifiers, paths, numbers retained  

## Safety

Zero false additions. Prefer `NO_OP` over silent loss of requirements.

## Acceptance tests

1. Redundant prose → compressed packet with metrics.  
2. Only hard requirements present → `NO_OP`.  

