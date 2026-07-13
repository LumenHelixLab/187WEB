# <Project> — Agentic Sprint Handoff

## Handoff metadata
- Repository:
- Observed baseline (branch / HEAD / date):
- Target branch:
- Target executor: Claude Code | Kimi | Grok | Codex | local | neutral
- Delivery target: patch | commit series | PR | release
- Handoff mode: draft | grounded | executor | release
- Confidence: high | medium | low

## 0. Executive directive
One bounded mission statement. No optional scope creep.

## 1. Architecture target
System map, ownership boundaries, and what “done” looks like.

## 2. Non-negotiables
### Preserve
### Prohibit

## 3. Operating protocol
### Phase 0 repository audit (required if mode ≠ grounded)
### Branch and commit discipline
- Feature branch only; no direct `main` for substantial work.
### Human approval boundaries
What may run automatically vs what needs explicit approval.

## 4. Program orchestrator
Single integration owner: branch, shared files, gates, PR.

## 5. Subagent roster
| Role | Objective | Owned files | Prohibited | Dependencies | Acceptance | Gate |
|---|---|---|---|---|---|---|

## 6. Context packet standard
Token budget, must-preserve fields, provenance, loss report / NO_OP rule.
(See skill `agentic-sprint-handoff` packet schema.)

## 7. Phases and milestones
For each phase: entry conditions · milestones · owners · deliverables ·
validation commands · exit evidence · rollback point · next dependency.

Statuses: `not-started` · `in-progress` · `blocked` · `needs-review` ·
`passed` · `failed` · `superseded`.

### Phase 0 — Baseline and DAG
### Phase 1 — Foundation
### Phase 2 — Implementation lanes
### Phase 3 — Integration
### Phase 4 — Validation and release

## 8. Dependency DAG
## 9. Safe parallel lanes
## 10. Serialized shared files
README, AGENTS, registries, aliases, command tables, release surfaces, package metadata.

## 11. Validation matrix
| Command | Phase | Expected evidence | Status |
|---|---|---|---|

## 12. Security and policy corrections
Unsafe legacy behavior to remove or constrain (canary secrets only for tests).

## 13. Commit sequence
Small, reviewable, dependency-ordered commits.

## 14. Pull-request contract
Summary · migration · tests · known limitations · rollback · reviewer checklist.

## 15. Rollback plan
## 16. Final execution report schema
Status · commits · files · tests · benchmarks · limitations · next sprint.

## 17. Paste-ready launch prompt
Target-executor-specific startup instruction (no private CoT required).
