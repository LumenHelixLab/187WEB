---
name: 187web-ecosystem
description: >-
  Top-level index for the 187web Ecosystem v2 ("Killer Web"). Use when you need
  the full Charlotte integration stack: prompt engineering, inference tuning,
  specialist personas, autonomous web research, and isolated execution. Defines
  the brand identity, central nervous system (Obsidian + Claudian), and how the
  five v2 skills compose. Triggers: 187web ecosystem, Charlotte integration,
  killer web, widow-weaver, neuro-toxin, swarm-mind, agent-charlotte,
  silk-sandbox, 187web-manifest, /187web-ecosystem.
origin: portfolio
---

# 187web Ecosystem v2 — Charlotte Integration

**Suite:** The 187web Ecosystem v2 skill index. Child skills:
`187web-manifest` · `widow-weaver` · `neuro-toxin` · `swarm-mind` ·
`agent-charlotte` · `silk-sandbox`

The 187web Ecosystem v2 is the "Killer Web" stack: excellent, precise, highly
effective execution with zero wasted overhead. It is organized around
**Charlotte** — a stylized Black Widow representing lethal precision and web
mastery — and five specialized skills that mirror her web: extraction, tuning,
persona, research, and execution.

Load this skill first when the task spans more than one layer of the stack.
For single-layer work, jump directly to the child skill.

## When to use this

Orchestrating a multi-stage workflow inside the 187web Ecosystem; setting the
overall tone, palette, or nervous-system behavior; or deciding which Charlotte
skill owns the next move. If the prompt mentions "Killer Web," "Charlotte,"
"widow," or any v2 skill name, start here.

## Brand identity

The ecosystem speaks in tight, intentional language. No filler. Every token
must earn its place.

| Token | Hex | Role |
|-------|-----|------|
| **Abyssal Black** | `#080808` | Deepest base, void canvas, primary background |
| **Dark Grey** | `#1A1A1A` | Surfaces, cards, panels |
| **Steel Grey** | `#4A4A4A` | Structural borders, dividers, tertiary elements |
| **Ash** | `#CCCCCC` | Secondary text, muted UI, quiet labels |
| **Widow Red** | `#FF0000` | Critical alerts, kill switches, errors |
| **Toxic Avenger Green** | `#39FF14` | Success states, execution confirmation, live signals |

**Vibe:** Lethal efficiency, highly calculated, no wasted overhead.
**Mascot:** Charlotte — the Black Widow. Lethal precision, total web mastery.

## Central nervous system: Obsidian Local Brain

The ecosystem is wired into an **Obsidian "Local Brain"** powered by
**Claudian**. Skills dynamically read context from the active Obsidian pane and
vault frontmatter, then output aggressively linked, bidirectional markdown
files.

Under the hood, the nervous system uses local REST APIs and WebSockets to:

- Monitor filesystem mutations in the active vault.
- Maintain a persistent graph representation of notes, tasks, and outputs.
- Bidirectionally link every generated artifact back to its source context.

Treat every output as a node in the web: link it, tag it, and make it
findable.

## Skill array (v2)

| Skill | Role | When to use | Path |
|-------|------|-------------|------|
| **widow-weaver** | Native OS prompt engine | Extract intent, polish tone, explain code, solve logic, refactor with venom | [`.claude/skills/widow-weaver/SKILL.md`](./widow-weaver/SKILL.md) |
| **neuro-toxin** | Inference tuner | Tune toxicity/temperature, top-k/top-p, repetition penalty, Mirostat weave, context windowing | `.claude/skills/neuro-toxin/SKILL.md` |
| **swarm-mind** | Engineering & niche personas | Bring in a specialist persona (architect, RAG weaver, edge venom, UI spinner, ledger spider, red-team widow, sysop widow) | `.claude/skills/swarm-mind/SKILL.md` |
| **agent-charlotte** | Autonomous web crawler | Deep-web spinning, contextual traversal, Obsidian auto-weaving | `.claude/skills/agent-charlotte/SKILL.md` |
| **silk-sandbox** | Execution engine | MicroVM isolation, syscall monitoring, I/O multiplexing | `.claude/skills/silk-sandbox/SKILL.md` |
| **187web-manifest** | Master Prompt Manifest | 27 XML prompts, compiler, long-run session routing | [`.claude/skills/187web-manifest/SKILL.md`](./187web-manifest/SKILL.md) |

## Invocation / workflow guidance

The skills compose like a kill chain. Default order:

0. **187web-manifest** — Compile the session: run `187web-compiler`, read
   `PLAN.md`, inject the routed directive and neuro-toxin profile.
1. **widow-weaver** — Understand and sharpen the request. Use
   `TLDR_Toxin`, `Polyglot_Thread`, `Tone_Polish`, `Task_Extractor`,
   `Code_Explainer`, `Logic_Solver`, or `Refactor_Venom` to extract the real
   intent and produce a clean task statement.
2. **neuro-toxin** — Tune the inference environment. Dial
   toxicity/temperature, top-k/top-p lethality, repetition penalty, Mirostat
   weave, and context windowing to match the desired output precision.
3. **swarm-mind** — Call a specialist persona when the work needs domain
   depth (architecture, RAG, edge cases, UI, ledger, red-team, sysop).
4. **agent-charlotte** — Send Charlotte crawling for research, references,
   or data to auto-weave into Obsidian.
5. **silk-sandbox** — Execute code or commands in an isolated MicroVM with
   syscall monitoring and I/O multiplexing.

Not every workflow needs all five. For a quick refactor, `widow-weaver` +
`silk-sandbox` is enough. For a complex build, run the full chain.

## Child skill links

- [187web-manifest — Master Prompt Manifest](./187web-manifest/SKILL.md)
- [widow-weaver — Native OS prompt engine](./widow-weaver/SKILL.md)
- [neuro-toxin — Inference tuner](./neuro-toxin/SKILL.md)
- [swarm-mind — Engineering & niche personas](./swarm-mind/SKILL.md)
- [agent-charlotte — Autonomous web crawler](./agent-charlotte/SKILL.md)
- [silk-sandbox — Execution engine](./silk-sandbox/SKILL.md)

---

*This skill is the ecosystem index. It contains no implementation code or
runtime scaffolding — only brand, architecture, composition rules, and
pointers to the child skills.*
