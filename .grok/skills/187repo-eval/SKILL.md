---
name: 187repo-eval
description: >-
  Use when evaluating a repository, package, or third-party tool for adoption into the 187web suite.
model_adapter: grok
---

> **Grok adapter:** Load as repository skill instructions. Canonical source: [`../../.claude/skills/187repo-eval/SKILL.md`](../../.claude/skills/187repo-eval/SKILL.md).

# 187REPO-EVAL — Repo Integration Scorecard

**Suite:** Short-name gate for bringing external repos, packages, or tools into the 187web ecosystem.

## When to use this

- User says "evaluate repo", "repo review", "integration scorecard", "should we adopt", or "187repo eval".
- A new dependency, scaffold, library, or service is being considered for a 187web project.
- You need a documented yes/no/watch decision with evidence.

## What it does

Runs an 11-category rubric over the candidate repo/tool and produces a Markdown scorecard with a final recommendation:

- `adopt`
- `adopt-with-guardrails`
- `watch`
- `reject`

## Rubric categories (0–5 each)

1. **Purpose fit** — Does it solve a real 187web / client / product need?
2. **License / legal** — OSI-approved? Commercial-use compatible? Patent / trademark concerns?
3. **Maintenance health** — Recent commits, responsive maintainers, issue/PR velocity.
4. **Security posture** — Audit history, CVEs, dependency hygiene, secret scanning, SLSA/SBOM signals.
5. **Accessibility** — a11y built-in or easily pluggable? WCAG 2.2 alignment?
6. **Performance / footprint** — Bundle size, runtime cost, cold-start, memory profile.
7. **Dependency / supply chain** — Transitive risk, reproducible installs, pinning policy.
8. **Documentation / API stability** — Getting-started friction, breaking-change policy, examples.
9. **Integration cost** — API surface, data migration, lock-in reversibility.
10. **Privacy / telemetry** — Data collection, retention, consent model, hidden trackers.
11. **187web brand fit** — Warm-blueprint / Killer Web vibe, Charlotte tone, lethal precision.

## Scoring

- **44–55:** `adopt`
- **33–43:** `adopt-with-guardrails`
- **22–32:** `watch`
- **0–21:** `reject`

## Required output format

1. Candidate (repo URL / package name / tool)
2. Eval date / evaluator
3. Category scores + evidence bullets
4. Risk summary
5. Final recommendation
6. Required guardrails (if any)
7. 187FREE alternative check (is there a free/open-source/local-first alternative?)
8. Next action

## Trigger phrases

- `187repo eval`
- `evaluate repo`
- `repo review`
- `integration scorecard`
- `should we adopt`

## Tone

Surgical, evidence-first, no hype. Every score needs a source or observation.

