# 187WEB Modules — NATASHA core

Cross-cutting capabilities. They do not replace the 187SKILLS suite; they sharpen how any skill thinks, tunes, routes, scouts, executes, and synthesizes.

Canonical stack (eight core modules):

| Module | Modern alias | Legacy | What it does |
|---|---|---|---|
| **THREAD** | `thread` / `th` | `widow-weaver` | Prompt shaping, intent extraction, rewrite, refactor |
| **COMPRESS** | `compress` / `cmp` | — | Loss-bounded token and context distillation |
| **TENSION** | `tension` / `tu` | `TUNE` / `neuro-toxin` (deprecated) | Inference profile and model behavior tuning |
| **SPARK** | `spark` / `brainstorm` | — | Bounded divergent ideation and decision records |
| **CORD** | `cord` / `co` | `swarm-mind` | Coordinated role dispatch, ownership, dependency DAG |
| **SCOUT** | `scout` / `ch` | `CHAR` / `agent-charlotte` (deprecated) | Compliant web/source/repository research |
| **LAB** | `lab` / `lb` | `silk-sandbox` | Isolated execution and test workspace |
| **FUSE** | — | — | Evidence-weighted synthesis and conflict resolution under CORD |

**Workflow support (not a core module):** **HANDOFF** (`agentic-sprint-handoff`, aliases `handoff` / `ash`) compiles an approved CORD plan into a phased executor artifact. See [NATASHA-AGENTIC-HANDOFFS.md](NATASHA-AGENTIC-HANDOFFS.md).

```text
THREAD → COMPRESS → TENSION → SPARK? → CORD → [HANDOFF artifact] → SCOUT/LAB → FUSE
```

## THREAD

THREAD turns messy input into a clean, scoped directive. Use it before any skill acts when the request is vague, long, or contains conflicting instructions.

- Extract the real intent.
- Restate the task in one bounded sentence.
- Strip decoration and hedging.
- Hand off to the matched skill with a clean prompt.

## COMPRESS

COMPRESS produces loss-bounded context packets for subagents and long runs. Preserve constraints, numbers, paths, identifiers, commands, safety boundaries, and prior decisions. Return `NO_OP` when safe compression is impossible.

## TENSION

TENSION sets the inference profile for the job. It does not change the model; it changes how the model is asked to respond.

- Output length and density.
- Tone: executive, technical, plain language, or marketing.
- Reasoning depth: quick, structured, or exploratory.
- Safety and evidence standards.

Legacy name: **TUNE**. Prefer TENSION in new work.

## SPARK

SPARK is bounded brainstorming with critic and convergence. Use only when architecture choices are genuinely open. Produce a short decision record, then continue the chain.

## CORD

CORD routes work to the right expert persona or skill. It is the coordination layer, not the execution layer. It owns non-overlapping file ownership, dependency ordering, bounded retries, and FUSE conflict records.

### CORD compact role card template

```markdown
- **Role codename:**
- **Domain:**
- **Activation trigger:**
- **Input contract:**
- **Output contract:**
- **Safety guardrails:**
- **Handoff to:**
```

Use one card per persona or skill in a flow. Keep each card short. When an external coding agent will execute the plan, compile a **HANDOFF** artifact via `agentic-sprint-handoff`.

## SCOUT

SCOUT is the shared research module. It gathers context from the web, source repositories, or internal notes and threads findings back into the active workspace.

### SCOUT compact check template

```markdown
- **Target / question:**
- **Source scope:**
- **Confidence:**
- **Key finding:**
- **Source URL / citation:**
- **Related note:**
- **Next action:**
```

Use SCOUT for external research, competitive intelligence, reference harvesting, or live data extraction. SCOUT always cites sources and never bypasses authentication or paywalls.

Legacy name: **CHAR**. Prefer SCOUT in new work. See also [187-CHAR.md](187-CHAR.md) (legacy filename; content maps to SCOUT).

## LAB

LAB is the isolated execution and test workspace. It runs generated code, commands, or experiments in a bounded environment with logging and rollback.

- Execute only within the approved scope.
- Capture stdout, stderr, and exit codes.
- Verify before handing results back.
- Never modify production systems without explicit authorization.
- Defensive secret tests use **synthetic canary secrets** only.

## FUSE

FUSE reconciles multi-agent reports: selected evidence, rejected options, conflicts, and uncertainty. It runs under CORD at phase gates and at end of sprint.

## Default behavior

The default invocation is **solo + brief**: one skill, concise output, minimal coordination. Modules join only when they add clear value.
