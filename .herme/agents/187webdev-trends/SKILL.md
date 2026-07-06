---
name: 187webdev-trends
description: >-
  Use when choosing a visual pole (dopamine vs calm), citing Core Web Vitals thresholds, WCAG 2.
model_adapter: hermes
---

> **Hermes adapter:** Use `system.md` as the system message for Hermes-based local LLMs (Ollama, lm-studio, etc.). Source: [`../../.claude/skills/187webdev-trends/SKILL.md`](../../.claude/skills/187webdev-trends/SKILL.md).

# 187WEBDEV — Trends & Standards (2026)

Trends are optional spice; standards are non-negotiable. When they conflict, standards win.

## Instructions

1. Read `../187webdesign/references/TRENDS-2026.md`.
2. For any design decision, name which trend pole fits the brief (dopamine vs calm, brutalist vs minimal, etc.) — do not blend poles into mush.
3. Before citing LCP/INP/CLS or WCAG criteria in client-facing copy, re-verify current thresholds (they move).
4. Default architecture guidance: Server Components first; `"use client"` only on the smallest interactive leaf.

Pair with `../187webdesign/SKILL.md` for the full award rubric and `../187webdev-resilience/SKILL.md` for honest loading/error states.
