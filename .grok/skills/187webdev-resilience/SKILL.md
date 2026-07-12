---
name: 187webdev-resilience
description: >-
  Use when building loading states, error boundaries, skeletons, or reviewing failure paths in the same pass as features.
model_adapter: grok
---

> **Grok adapter:** Load as repository skill instructions. Canonical source: [`../../.claude/skills/187webdev-resilience/SKILL.md`](../../.claude/skills/187webdev-resilience/SKILL.md).

# 187WEBDEV — Resilience (Unhappy Path)

Award demos show the happy path; shipped products survive everything else.

## Instructions

1. Read `../187webdesign/references/RESILIENCE.md`.
2. For every new surface or data fetch, check the 15-scenario matrix and confirm a designed state exists (skeleton, empty, error+retry, offline, etc.).
3. Rules of thumb:
   - Never trust the network — timeout, error path, retry on every fetch.
   - Content before chrome — meaningful paint is server/static HTML; JS only enhances.
   - Degrade, don't disappear — failed features shrink to a sensible default.
   - Make every dead end a door — empty/404/error offers the next action.
4. Reference implementation: `187webdesign/components/resilience/` and live demo `/resilience`.

Review engineering details with `../187webdev-code-review/SKILL.md`; pre-ship with `../187webdev-qa/SKILL.md`.
