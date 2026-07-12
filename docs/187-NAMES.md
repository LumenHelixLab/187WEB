# 187WEB Short-Name Reference

Every 187WEB request resolves through a short name. The grammar is consistent across the CLI, the web UI, and agent prompts:

```text
187 <alias> [target] [mode] [depth]
```

- **`<alias>`** — required. Resolves to a skill or module.
- **`[target]`** — optional. The page, file, URL, question, or component to work on.
- **`[mode]`** — optional. How the skill should coordinate.
- **`[depth]`** — optional. How detailed the output should be.

## Alias table

Alias | Resolves to
|---|---|
| `187` / `cmd` | 187COMMAND |
| `rpt` / `rep` | 187REPORT |
| `scan` / `aud` | 187SCAN |
| `kit` / `tpl` / `demo` | 187KIT |
| `std` / `qual` | 187STANDARD |
| `flow` / `go` | 187FLOW |
| `kern` / `k` | 187KERNEL |
| `repo` / `rp` | 187REPO |
| `craft` / `ui` | 187CRAFT |
| `vibe` / `vx` | 187VIBE |
| `ship` / `launch` | 187LAUNCH |
| `free` / `fr` | 187FREE |
| `res` / `src` | 187RESEARCH |
| `seo` / `search` | 187SEO |
| `rev` / `money` | 187REVENUE |
| `docs` / `doc` | 187DOCS |
| `write` / `wrt` | 187WRITE |
| `learn` / `edu` | 187LEARN |
| `test` / `quiz` | 187TEST |
| `ax` / `a11y` | 187ACCESS+ |
| `inc` / `incl` | 187INCLUDE |
| `ver` / `v` | 187VERSION |
| `pub` / `sync` | 187PUBLISH |
| `th` / `thread` | THREAD |
| `tu` / `tension` / `tune` | TENSION (legacy alias: TUNE) |
| `co` / `cord` | CORD |
| `ch` / `scout` / `char` | SCOUT (legacy alias: CHAR) |
| `lb` / `lab` | LAB |
| `handoff` / `ash` | agentic-sprint-handoff (HANDOFF artifact) |

## Workflow modes

| Mode | Meaning |
|---|---|
| **solo** | One skill handles the whole request. Default. |
| **assist** | Primary skill owns the work; may ask another skill for a second opinion. |
| **flow** | Skills chain in a predefined order; each step hands off cleanly to the next. |
| **release** | Full publish gate: 187PUBLISH coordinates 187VERSION, 187DOCS, 187SEO, 187ACCESS+, and 187INCLUDE. |

## Output depths

| Depth | Use when |
|---|---|
| **brief** | Quick answer, decision, or pointer. Default. |
| **report** | Structured findings with context, recommendations, and next actions. |
| **deep** | Full exploration with alternatives, evidence, and implementation detail. |

## Legacy compatibility

Old v2 ecosystem names still resolve, but they now map to modules:

| Legacy name | New module | Role |
|---|---|---|
| `widow-weaver` | **THREAD** | Prompt shaping, intent extraction, rewrite, refactor |
| `neuro-toxin` | **TUNE** | Model behavior, output profile, inference settings |
| `swarm-mind` | **CORD** | Coordinated role dispatch, expert persona routing |
| `agent-charlotte` | **CHAR** | Shared scout for web/source/context help |
| `silk-sandbox` | **LAB** | Local action box, isolated execution/test workspace |

See [docs/187-MODULES.md](187-MODULES.md) for module details and [docs/187SKILLS.md](187SKILLS.md) for the full skill roster.
