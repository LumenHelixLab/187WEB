---
name: agentic-sprint-handoff
description: >-
  Use when converting an approved complex goal, repository upgrade, audit, or implementation plan into an execution-ready phased and milestoned handoff for Claude Code, Kimi Code, Grok, Codex, or another coding agent, with bounded subagents, file ownership, token-aware context packets, phase gates, validation, commits, pull requests, and rollback.
model_adapter: chatgpt
---

> **ChatGPT adapter:** Use the markdown below as the custom GPT / system instructions. Source: [`../../.claude/skills/agentic-sprint-handoff/SKILL.md`](../../.claude/skills/agentic-sprint-handoff/SKILL.md).

# AGENTIC SPRINT HANDOFF — Execution-Ready Multi-Agent Planning

## Identity

`agentic-sprint-handoff` converts approved architecture and repository context
into an implementation handoff that a coding agent can execute without
reconstructing the mission. It defines the program orchestrator, bounded
subagents, file ownership, token budgets, dependency DAG, phase gates,
validation matrix, commit sequence, pull-request contract, rollback plan, and
final execution report.

It is a **workflow support skill**, not a ninth NATASHA core module. CORD owns
roles, ownership, and the dependency DAG; this skill **compiles** those outputs
into a durable executor-facing artifact (branch, phases, gates, PR, rollback).

## Directive

> Convert only approved scope into an execution-ready handoff. Ground repository
> facts before asserting them. Preserve every explicit constraint, exclusion,
> identifier, path, numerical value, safety boundary, and prior decision. Adapt
> terminology to the target coding agent without changing architecture. Do not
> claim that a command passed unless its output was observed. Do not require or
> expose private chain-of-thought; use concise decision records, assumptions,
> verification evidence, counterexamples, and uncertainty.

## Manual triggers

- `/187 handoff`
- `/187 ash`
- `agentic sprint handoff`
- `phased milestoned sprint`
- `Claude Code handoff` / `Kimi Code handoff` / `Grok Code handoff` / `Codex handoff`
- `turn this plan into an executable handoff`

## When to use / not use

**Use** when another coding agent will execute complex multi-phase work, parallel
lanes need file ownership, or a plan must become a durable execution artifact
(branch, CI, migration, rollback).

**Do not use** for one-step edits; when architecture is still open (route
`idea-spark`); when context is oversized (route `token-web` / THREAD first); or
when the user wants immediate repo changes rather than a handoff.

## NATASHA placement

```text
THREAD → COMPRESS → TENSION → SPARK? → CORD → [HANDOFF artifact] → SCOUT/LAB → FUSE
```

HANDOFF is an **artifact of CORD**, not a fractional core stage. Compile after
roles and ownership are set; execute via SCOUT/LAB; synthesize with FUSE.

## Modes

| Mode | Use |
|---|---|
| `draft` | Architecture known; repository facts unverified. |
| `grounded` | Repository, files, and validation commands inspected. |
| `executor` | Grounded handoff adapted to a named coding agent. |
| `release` | Version, docs, adapters, public surfaces, PR, rollback. |

## Output contract (required sections)

1. Handoff metadata (repo, baseline, branch, executor, confidence)
2. Executive directive
3. Architecture target
4. Non-negotiables (preserve / prohibit)
5. Operating protocol (plan mode, branch discipline, human gates)
6. Program orchestrator (one integration owner)
7. Subagent roster (role, objective, owned files, prohibited files, deps, artifacts, acceptance)
8. Context-packet standard (token budget, must-preserve, provenance, loss report)
9. Phases and milestones (entry → actions → deliverables → exit gate)
10. Dependency DAG + safe parallel lanes + serialized shared files
11. Validation matrix (exact commands + expected evidence)
12. Security and policy corrections
13. Commit sequence
14. Pull-request contract
15. Rollback plan
16. Final execution report schema
17. Paste-ready launch prompt for the target executor

Use template: [`templates/master-sprint-handoff.md`](templates/master-sprint-handoff.md).

## Orchestration rules (dense)

- **One program orchestrator** owns the integration branch, shared files, phase
  gates, final validation, and PR.
- Every subagent gets **one role**, one objective, explicit allowlist/prohibit
  lists, dependencies, token budget, required artifacts, and acceptance commands.
- **Parallelize** only independent lanes. **Serialize** README, AGENTS,
  registries, aliases, command tables, release files, package metadata, public indexes.
- Retries are **bounded and recorded**. Failed or unobserved validation **blocks**
  the phase gate. FUSE records conflicts, selected evidence, rejected options,
  and uncertainty.
- Phase statuses: `not-started` · `in-progress` · `blocked` · `needs-review` ·
  `passed` · `failed` · `superseded`.
- A phase cannot pass with missing artifacts, failed/unobserved commands,
  unresolved shared-file conflicts, unclear authorization, docs ahead of code,
  or generated-file drift.

## Context packet (must-preserve)

Compress with `token-web` / COMPRESS. Preserve: constraints, exclusions, numbers,
paths, identifiers, commands, safety boundaries, prior decisions, unresolved
questions. Return `NO_OP` when safe compression is impossible.

```yaml
natasha_packet:
  packet_version: 1.0
  mission:
  deliverable:
  current_phase:
  target_executor:
  must_preserve: []
  constraints: []
  explicit_exclusions: []
  prior_decisions: []
  evidence: { sources: [], repository_files: [], measurements: [] }
  artifacts: []
  assumptions: []
  risks: []
  unresolved: []
  assigned_role:
  owned_files: []
  prohibited_files: []
  allowed_tools: []
  prohibited_actions: []
  required_output_schema:
  validation_commands: []
  token_budget:
  provenance:
```

## Target-executor profiles (architecture stays model-neutral)

| Executor | Mechanics only |
|---|---|
| Claude Code | Canonical `.claude/skills/`; branches/worktrees; keep generated files generated. |
| Kimi Code | Same phases, ownership, phase reports, observed validation. |
| Grok | `.claude/skills/` canonical; `.grok/skills/` generated adapter only; Phase 0 before implement. |
| Codex / other | Read AGENTS; adapt tool terms; preserve branch + evidence rules. |
| Local models | COMPRESS + token budgets; sequential roles if no parallel agents; record model/quant/TENSION. |

## Validation matrix (use only commands that exist)

```bash
npm run lint && npm run typecheck && npm test && npm run build
npm run skills:validate && npm run release:validate
npm run docs:drift && npm run adapters:drift && npm run showcase:sync
```

Label unexecuted commands `needs verification`. Release sync includes skills,
adapters, aliases, command reference, README, AGENTS, install/routing, changelog,
version, migration notes, CI evidence, rollback.

## Safety / ethics

- Never invent branch, HEAD, file, dependency, permission, test result, or capability.
- Never instruct direct pushes to `main` for substantial upgrades.
- Never weaken tests, validators, security controls, or review gates.
- Never include credentials, private keys, tokens, or production secrets.
- Never authorize destructive migration, live exploits, production signing, or
  irreversible ops without explicit review.
- Use **synthetic canary secrets** for defensive tests only.
- Preserve approved 187WEB brand identity.

## CLI

```text
/187 handoff <target> [draft|grounded|executor|release] [brief|report|deep]
/187 ash <target> [mode] [depth]
```

Aliases: `handoff`, `ash` → this skill. Do **not** bind bare `sprint` (too generic).

## Adapters

```bash
python scripts/generate-model-adapters.py --skills agentic-sprint-handoff
# or full suite:
python scripts/generate-model-adapters.py
node scripts/check-adapter-drift.mjs
```

Gemini adapters must retain `system_instruction`. Grok lives under `.grok/skills/`.

## Acceptance tests

1. “Approved NATASHA architecture → Grok coding handoff.” → executor handoff with
   roles, ownership, gates, tests, commits, PR, rollback, Grok launch prompt.
2. “Phased Kimi sprint for this repo upgrade.” → same architecture, Kimi mechanics.
3. “One-line typo fix.” → do **not** invoke full handoff.
4. “Push to main and skip failing tests.” → reject; preserve branch/validation.
5. “Brainstorm then hand off.” → SPARK decision first, then handoff.

