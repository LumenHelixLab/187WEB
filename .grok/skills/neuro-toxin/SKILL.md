---
name: neuro-toxin
description: >-
  Inference tuner for the 187web Ecosystem v2 ("Killer Web"). Dynamically
  controls temperature, top-k/top-p, repetition penalty, Mirostat weave, and
  context windowing from Obsidian YAML frontmatter or task type. Use when output
  precision, creativity, or long-generation stability must be dialed before
  widow-weaver, swarm-mind, agent-charlotte, or silk-sandbox run. Triggers:
  neuro-toxin, inference tuning, toxicity, lethality, temperature, top_p, top_k,
  mirostat, context windowing, /neuro-toxin.
origin: portfolio
---

# neuro-toxin — Inference Tuner

**Suite:** The 187web Ecosystem v2. Parent index:
[`187web-ecosystem`](../187web-ecosystem/SKILL.md) · Siblings:
`widow-weaver` · `swarm-mind` · `agent-charlotte` · `silk-sandbox`

`neuro-toxin` controls the variance and precision of every downstream skill.
It reads Obsidian YAML frontmatter (or infers from task type) and sets the
inference profile before generation begins. Low toxicity for code. High
lethality for facts. Mirostat weave for long AST reconstructions.

Load this skill when output quality depends on sampling parameters — before
[`widow-weaver`](../widow-weaver/SKILL.md) runs on deterministic code, before
[`swarm-mind`](../swarm-mind/SKILL.md) personas engage, or when long reports
risk looping.

## When to use this

- A note's frontmatter specifies `toxicity`, `lethality`, or `mirostat` values.
- The task is code/math (needs low toxicity) vs brainstorming (needs high).
- Long generation (reports, refactors) shows repetition or drift.
- Vault context is large and context-window strategy must be chosen.
- You need to declare the inference profile explicitly before a kill-chain run.

## Frontmatter schema

Add to Obsidian note YAML when routing through Claudian:

```yaml
---
toxicity: 0.1          # temperature analog: 0.0–1.5
lethality: max         # top_k / top_p: low | medium | max
repetition_penalty: 1.1
frequency_penalty: 0.3
presence_penalty: 0.2
mirostat: 2            # 0=off, 1=Mirostat 1, 2=Mirostat 2.0
context_mode: sliding  # sliding | summarize | offload
target_language: en
persona: alpha-architect
---
```

If frontmatter is absent, infer from task type using the defaults table below.

## Capabilities

### 1. Toxicity — Temperature (0.0–1.5)

**What it does.** Controls output variance via softmax scaling over logits.

| Range | Mode | Use when |
|-------|------|----------|
| 0.0–0.2 | Greedy / deterministic | Code, math, formal proofs, config |
| 0.3–0.5 | Analytical | Architecture docs, API specs, refactors |
| 0.6–0.8 | Balanced | General writing, mixed tasks |
| 0.9–1.5 | High variance | Brainstorming, naming, creative exploration |

> **Strict developer directive.** Low toxicity (≤0.2) for strictly deterministic
> code and math. High toxicity (≥0.8) only for creative brainstorming. Never
> use high toxicity on security audits or smart-contract review.

---

### 2. Lethality — Top_K / Top_P

**What it does.** Constricts the probability distribution. Maximum lethality
forces high-confidence, factual token pathways.

| Profile | top_k | top_p | Behavior |
|---------|-------|-------|----------|
| **max** | 20 | 0.15 | Purely analytical; cuts distribution tail |
| **medium** | 40 | 0.85 | Default balanced sampling |
| **low** | 80 | 0.95 | Wider vocabulary; more phrasing variety |

> **Strict developer directive.** Top_P = 0.15 at max lethality. Use max
> lethality for reference notes, security review, and quantitative extraction.

---

### 3. Repetition Penalty

**What it does.** Scales logits of previously generated tokens to prevent loops
during long reports, extensive refactors, or multi-file explanations.

- **Frequency penalty** — penalizes by token count (repeated phrases).
- **Presence penalty** — penalizes boolean presence (topic re-entry).

**Defaults:** `repetition_penalty: 1.05` for short tasks; scale to `1.15–1.25`
for generations exceeding 2,000 tokens.

> **Strict developer directive.** Dynamically increase repetition penalty during
> long generation. Split frequency (counts) and presence (boolean) penalties.

---

### 4. Targeted Entropy — Mirostat_Weave

**What it does.** Engages Mirostat 2.0 to maintain constant target perplexity
during continuous code generation.

**Use when:** Complex AST reconstructions, multi-file refactors, or long
[`Refactor_Venom`](../widow-weaver/SKILL.md) runs risk repetitive loops or
improbable hallucinations.

| Setting | Effect |
|---------|--------|
| `0` | Disabled |
| `1` | Mirostat 1 — basic perplexity control |
| `2` | Mirostat 2.0 — recommended for code generation |

> **Strict developer directive.** Engage Mirostat 2.0 when cyclomatic complexity
> of output target exceeds 10 or generation spans 3+ files.

---

### 5. Memory Web — Context_Windowing

**What it does.** Manages context parsing strategy when vault or repo size
threatens to exceed the active context window.

| Mode | Strategy |
|------|----------|
| `sliding` | Recent N tokens + active pane priority |
| `summarize` | Run `TLDR_Toxin` on distant context first |
| `offload` | KV-cache aware chunking; RoPE scaling for long docs |

> **Strict developer directive.** Shift to `summarize` when active vault context
> exceeds 60% of window. Use `offload` for massive repository ingestion. Never
> OOM the local NPU — prefer bounded chunks over full-vault dumps.

---

## Task-type defaults

When frontmatter is missing, apply:

| Task | toxicity | lethality | mirostat | context_mode |
|------|----------|-----------|----------|--------------|
| Code / refactor | 0.1 | max | 2 | sliding |
| Security audit | 0.0 | max | 0 | summarize |
| ML / RAG design | 0.3 | medium | 1 | sliding |
| Creative / naming | 0.9 | low | 0 | sliding |
| Long report | 0.5 | medium | 2 | summarize |
| Web research | 0.4 | medium | 0 | sliding |

## Invocation / workflow example

Before a [`widow-weaver`](../widow-weaver/SKILL.md) `Refactor_Venom` pass on a
legacy monolith:

1. Read note frontmatter or infer: `toxicity: 0.1`, `lethality: max`,
   `mirostat: 2`.
2. Set `repetition_penalty: 1.15` because output spans multiple files.
3. If vault context >60% window, run `context_mode: summarize` via
   `TLDR_Toxin` on peripheral notes first.
4. Declare the profile in one line, then hand off to widow-weaver.

**Output format when declaring profile:**

```text
[neuro-toxin] toxicity=0.1 lethality=max top_p=0.15 mirostat=2 context=sliding
```

---

*This skill defines inference-tuning behavior only. It contains no runtime code
or API implementation scaffolding.*