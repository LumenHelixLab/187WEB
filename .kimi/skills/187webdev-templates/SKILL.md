---
name: 187webdev-templates
description: >-
  Use when starting a new landing page, picking a visual pole for a brief (SaaS, fintech, restaurant, editorial, etc.
model_adapter: kimi
---

> **Kimi adapter:** Load via the Kimi Skill tool or place in your Kimi skills directory. Source: [`../../.claude/skills/187webdev-templates/SKILL.md`](../../.claude/skills/187webdev-templates/SKILL.md).

# 187WEBDEV — Industry Template Gallery

Fourteen distinct design languages — adapt the rubric to the brief, don't stamp one look on everything.

## Instructions

1. Read `../187webdesign/references/TEMPLATES.md`.
2. Match the brief to an industry row (SaaS, e-commerce, agency, healthcare, etc.) and name the design pole from `TRENDS-2026.md` that fits.
3. When scaffolding a new page:
   - Copy structure from `187webdesign/app/templates/<slug>/page.tsx` if available.
   - Swap copy/colors for the real brand; replace placeholders with real media (`ImageWithFallback`).
   - Run `../187webdev-qa/SKILL.md` before ship.
4. Spend boldness on one signature component per template; keep surrounding UI quiet.

Load `../187webdesign/SKILL.md` for core principles. Live gallery: `187webdesign` showcase `/templates`.
