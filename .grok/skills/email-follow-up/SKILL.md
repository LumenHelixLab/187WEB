---
name: email-follow-up
description: Use when crafting a concise, professional follow-up email reply from
  selected context.
origin: portfolio
---
# Email Followup

**Suite:** 187web Ecosystem v2. Parent index:
[`187web-ecosystem`](../187web-ecosystem/SKILL.md).

This skill injects the `email-follow-up` directive from the 187web Master Prompt Manifest.
Load it when the task matches the triggers below.

## When to use this

- The user selected text in an Obsidian note and needs a corporate/workflow template.

## Directive

> Craft a response to follow up with the customer, keeping the text concise and the language strictly professional. Context: {{SelectedText}}

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
