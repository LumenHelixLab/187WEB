# 187web Long-Run Session Build Plan

Phased rollout for the Charlotte integration stack. Each phase has concrete
deliverables and skill ownership.

## Phase I — The Nervous System ✅ COMPLETE

| Step | Deliverable | Skill / Tool |
|------|-------------|--------------|
| 1 | Compiler hook on `cd` | `install-compiler-hook.ps1` / `.sh` |
| 2 | Persona registry at `~/.187web/prompts/` | `references/MANIFEST.xml` |
| 3 | Telemetry SSE feed | `telemetry-relay.mjs` → `public/omniqube.html` |

**Roadmap for Phases II–IV:** `references/PHASE-ROADMAP.md` (187webdev-templates mapped)

**Session init:** Run compiler → pipe JSON to agent context or OmniQube Render Matrix.

## Phase II — Agentic Sovereignty (Foraging)

| Step | Deliverable | Skill |
|------|-------------|-------|
| 4 | KNOTstore DB connections | `agent-charlotte` |
| 5 | Silk-Sandbox pre-flight audit middleware | `silk-sandbox` |
| 6 | Authenticated browser tokens (Web-Relay) | `agent-charlotte` |

## Phase III — The Killer UI (Telemetry & Spinner)

| Step | Deliverable | Skill / Prompt |
|------|-------------|----------------|
| 7 | Compiler JSON → OmniQube Render Matrix | `187web-manifest` |
| 8 | Atomic component library refactor | `swarm-mind` → UI-Spinner |
| 9 | A11y on every UI-Spinner output | `a11y-linting-agent` prompt |

## Phase IV — The Infinite Session (State & Planning)

| Step | Deliverable | Skill |
|------|-------------|-------|
| 10 | `PLAN.md` loop at session start | `187web-manifest` |
| 11 | Red-team background daemon | `swarm-mind` → Red-Team Widow |
| 12 | NPU thermal self-regulation | `neuro-toxin` + `npu-performance-linter` |

## Immediate: Compiler Script

```bash
# List all prompts
./scripts/187web-compiler.sh --list

# Compile for current directory + hardware
./scripts/187web-compiler.sh

# Explicit prompt injection
./scripts/187web-compiler.sh --prompt ui-aesthetic-auditor

# Force low-power persona
E187WEB_POWER_MODE=low ./scripts/187web-compiler.sh
```

Windows:

```powershell
.\scripts\187web-compiler.ps1 -List
.\scripts\187web-compiler.ps1 -Prompt ui-aesthetic-auditor
$env:E187WEB_POWER_MODE = 'low'; .\scripts\187web-compiler.ps1
```

## PLAN.md loop (Phase IV step 10)

At every long-run session start:

1. `cat PLAN.md` (or `Get-Content PLAN.md`) — read active phase and blockers.
2. Run compiler — inject persona + neuro-toxin profile.
3. Execute current phase step only — no scope creep.
4. Append session log to `PLAN.md` under `## Session Log`.