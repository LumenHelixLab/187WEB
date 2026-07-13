---
name: 187web-ecosystem
description: >-
  Use when routing across the full 187SKILLS suite or the NATASHA multi-agent integration stack (THREAD, COMPRESS, TENSION, SPARK, CORD, SCOUT, LAB, FUSE).
model_adapter: chatgpt
---

> **ChatGPT adapter:** Use the markdown below as the custom GPT / system instructions. Source: [`../../.claude/skills/187web-ecosystem/SKILL.md`](../../.claude/skills/187web-ecosystem/SKILL.md).

<!-- 187SKILLS first-class roster (release:validate) -->
<!-- 187REPO 187CRAFT 187VIBE 187LAUNCH 187FREE 187RESEARCH 187SEO 187REVENUE 187DOCS 187LEARN 187TEST 187ACCESS+ 187VERSION 187PUBLISH 187NATASHA 187QUANTUM 187CHAIN -->
# 187WEB Ecosystem v3.0 — NATASHA Integration

**Suite:** 187WEB multi-agent operating layer. Core modules:

**THREAD** · **COMPRESS** · **TENSION** · **SPARK** · **CORD** · **SCOUT** · **LAB** · **FUSE**

Domain skills (installable packs): **187QUANTUM** · **187CHAIN**

**Operator:** **NATASHA** — the 187WEB Black Widow orchestration architecture.  
**Charlotte** is reserved for a separate technology. See
[`docs/migrations/CHARLOTTE-TO-NATASHA.md`](../../../docs/migrations/CHARLOTTE-TO-NATASHA.md).

**Parent skill:** [187webdesign](../187webdesign/SKILL.md)

Load this skill first when the task spans more than one layer of the stack.
For single-layer work, jump directly to the module skill.

## When to use this

- Multi-stage workflows that need compression, specialist routing, research, and isolated execution.
- Setting Local Brain / vault behavior and module ownership.
- User mentions NATASHA, Killer Web, THREAD/TENSION/CORD/SCOUT/LAB, or suite-wide orchestration.
- Pack install: `natasha` or `qchain-lab`.

## When not to use this

- Single-skill work already clearly routed (load that skill only).
- Visual rebrand or mascot redesign (forbidden; preserve approved branding).
- Live-chain signing, secret exfiltration, or unauthorized offensive activity.

## Brand identity (preserve; do not re-art-direct)

| Token | Hex | Role |
|-------|-----|------|
| **Abyssal Black** | `#080808` | Primary background |
| **Dark Grey** | `#1A1A1A` | Surfaces |
| **Steel Grey** | `#4A4A4A` | Borders |
| **Ash** | `#CCCCCC` | Secondary text |
| **Signal Red** | `#FF0000` | Critical / stop |
| **Signal Green** | `#39FF14` | Success / live |

**Vibe:** Precise efficiency, no wasted overhead.  
**Operator architecture:** NATASHA (not Charlotte).

## Central nervous system: Obsidian Local Brain

Wired into an **Obsidian Local Brain** (Claudian). Skills read active pane / frontmatter and write densely linked markdown. Optional KNOTstore-compatible provenance for run records (does not alter KNOTstore licensing).

## NATASHA module array (v3)

| Module | Role | Canonical skill | Legacy alias |
|--------|------|-----------------|--------------|
| **THREAD** | Structural prompt / document engine | [`widow-weaver`](../widow-weaver/SKILL.md) | widow-weaver |
| **COMPRESS** | Loss-bounded token/context distillation | [`token-web`](../token-web/SKILL.md) | — (new; Phase 2 expands) |
| **TENSION** | Inference-profile controller | [`neuro-tension`](../neuro-tension/SKILL.md) | `neuro-toxin` (deprecated) |
| **SPARK** | Bounded divergent brainstorming | [`idea-spark`](../idea-spark/SKILL.md) | — (new; Phase 2 expands) |
| **CORD** | Multi-agent / subagent orchestration + FUSE | [`swarm-mind`](../swarm-mind/SKILL.md) | swarm-mind |
| **SCOUT** | Compliant source research | [`natasha-scout`](../natasha-scout/SKILL.md) | `agent-charlotte` / CHAR (deprecated) |
| **LAB** | Isolated execution & verification | [`silk-sandbox`](../silk-sandbox/SKILL.md) | silk-sandbox |
| **FUSE** | Evidence-weighted synthesis | Contract under CORD | — |
| **187web-manifest** | Prompt compiler / long-run routing | [`187web-manifest`](../187web-manifest/SKILL.md) | — |

### NATASHA workflow support skills

| Skill | Role | Trigger |
|---|---|---|
| [`agentic-sprint-handoff`](../agentic-sprint-handoff/SKILL.md) | Compile approved architecture into phased, milestoned, executor-ready multi-agent handoffs | `/187 handoff`, `/187 ash`, target-agent handoff |

HANDOFF is a **CORD output artifact** (workflow support), not a ninth core
module or brand layer. Invoke after roles and ownership are set, before
delegating to an external coding agent or extended SCOUT/LAB execution.

### Domain skills (Phase 4–5 land full trees; index reserved)

| Skill | Role |
|-------|------|
| `187quantum` | Quantum algorithms & circuits |
| `187chain` | Smart-contract & DeFi assurance |

## Short-name aliases

| Short name | Maps to | Use when |
|---|---|---|
| [`187repo`](../187repo/SKILL.md) | ecosystem + manifest | Repo generation, deploy, installer |
| [`187craft`](../187craft/SKILL.md) | 187webdesign + webdev suite | Design, UX, frontend, QA |
| [`187vibe`](../187vibe/SKILL.md) | SCOUT, THREAD, TENSION, CORD, LAB | Delight, research, tuning, execution |
| [`187launch`](../187launch/SKILL.md) | 187launch | Go-to-market |

## 187SKILLS public suite map

Unchanged public suite skills (repo, craft, vibe, launch, free, research, seo, revenue, docs, write, learn, test, access-plus, include, version, publish, command, report, scan, kit, standard, flow) remain first-class. See prior suite tables in routing docs; NATASHA modules compose *under* or *alongside* them.

## Command grammar

```text
187 <alias> [target] [mode] [depth]
```

Recommended NATASHA aliases (CLI Phase 6 finalizes):

```text
natasha | nt → 187web-ecosystem
compress | cmp → token-web
spark | brainstorm → idea-spark
tension → neuro-tension
scout → natasha-scout
quantum | quant → 187quantum
chain | web3 | defi → 187chain
```

Deprecated: `char`, `ch`, `agent-charlotte` → route to **SCOUT** with deprecation notice.

## Default kill chain (composition order)

0. **187web-manifest** — session compile / PLAN.md  
1. **COMPRESS** — bound context packet when oversized  
2. **THREAD** — extract intent / Verification Record  
3. **TENSION** — inference profile  
4. **SPARK** — only if design options unresolved  
5. **CORD** — specialist subagents + ownership; compile **HANDOFF** artifact when delegating  
6. **SCOUT** — authorized research  
7. **LAB** — isolated execute / verify  
8. **FUSE** — evidence-weighted synthesis  

Not every step is required. THREAD + LAB covers many refactors.

## Input / output contract (orchestrator)

**Input:** mission, constraints, owned files, autonomy ceiling, evidence.  
**Output:** NATASHA context packet fields, module handoffs, FUSE record, provenance.

## Routing rules

- Prefer module skill when user names THREAD/TENSION/SCOUT/etc.  
- Prefer this index when multi-module or “NATASHA” / “full stack”.  
- Deprecated skills must not be recommended as primary for new work.

- Route phased, milestoned, target-agent execution briefs to `agentic-sprint-handoff`.  

## Safety / ethics guardrails

- No fingerprint spoofing, auth bypass, paywall bypass, or anti-bot evasion.  
- No real secret exfiltration; synthetic canaries only in LAB.  
- No live exploits, live signing, or investment advice (chain/quantum modules).  
- Human-in-the-loop when autonomy or authorization is unclear.  
- Do not recolor or regenerate approved brand artwork.

## Integration points

- **Obsidian/Claudian:** Local Brain vault templates (Phase 6).  
- **Claude Code:** `.claude/skills/`.  
- **Grok / adapters:** regenerate from `.claude` via `npm run adapters:generate`.  
- **CLI:** `187` grammar; pack install Phase 6.  
- **Docs:** `docs/NATASHA-ARCHITECTURE.md` (Phase 6), migration doc now.

## Acceptance tests

1. Prompt “run NATASHA stack” → routes to this skill, modules listed without Charlotte operator.  
2. Prompt “CHAR research” → deprecation → SCOUT / natasha-scout.  
3. Prompt “neuro-toxin dose” → deprecation → neuro-tension.  
4. Prompt single “a11y audit” → does not force full NATASHA chain.

---

*Ecosystem index only — contracts and pointers, not runtime scaffolding.*

