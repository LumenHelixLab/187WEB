---
name: neuro-toxin
description: >-
  Use when setting LLM/NPU parameters from Obsidian YAML frontmatter: temperature/toxicity, top-k/top-p lethality, repetition penalty, Mirostat weave, and context windowing.
model_adapter: chatgpt
---

> **ChatGPT adapter:** Use the markdown below as the custom GPT / system instructions. Source: [`../../.claude/skills/neuro-toxin/SKILL.md`](../../.claude/skills/neuro-toxin/SKILL.md).

# neuro-toxin — Inference Tuner

**Suite:** The 187web Ecosystem v2. Parent index:
[`187web-ecosystem`](../187web-ecosystem/SKILL.md) · Siblings:
[widow-weaver](../widow-weaver/SKILL.md) · [swarm-mind](../swarm-mind/SKILL.md) · [agent-charlotte](../agent-charlotte/SKILL.md) · [silk-sandbox](../silk-sandbox/SKILL.md)

`neuro-toxin` is the dose control system for the Killer Web stack. It reads the
Obsidian note's YAML frontmatter and sets the LLM/NPU inference profile that
governs how the model thinks. The wrong dose wastes tokens; the right dose makes
every generation strike clean.

Load this skill before any generation step where precision, creativity, or
context scale must be tuned from a note or directive.

## When to use this

- A note must produce deterministic code, math, or structured output.
- A note must brainstorm, diverge, or generate novel creative angles.
- Long generation runs are looping, repeating phrases, or drifting.
- Massive context ingestion threatens local NPU memory limits.
- The task requires sustained coherence during complex AST or architecture work.

## Capabilities

### 1. Toxicity — `Temperature`

**What it controls.** Variance. Low toxicity keeps the model on rails; high
toxicity lets it explore unusual pathways.

**Recommended values.**

| Value | Use case |
|-------|----------|
| `0.0` — `0.2` | Code, math, config, JSON, exact extraction |
| `0.3` — `0.5` | Technical explanation, refactoring plans, structured prose |
| `0.6` — `0.9` | Marketing copy, naming, creative layout concepts |
| `1.0` — `1.5` | Wild ideation, adversarial prompts, deliberate divergence |

**System-level.** Adjusts the softmax scaling factor applied to logits before
sampling. Lower values sharpen the peak; higher values flatten the distribution
and increase token diversity.

---

### 2. Lethality — `Top_K` / `Top_P`

**What it controls.** Probability constriction. Maximum lethality forces the
model onto the highest-confidence token path and cuts the long tail.

**Recommended values.**

| Profile | Top_K | Top_P | Use case |
|---------|-------|-------|----------|
| Surgical | `10` | `0.10` | Factual QA, exact code, single-right-answer tasks |
| Analytical | `40` | `0.15` | Reasoning, architecture decisions, debugging |
| Balanced | `60` | `0.40` | General writing, mixed creative/technical work |
| Open | `100` | `0.90` | Brainstorming, poetry, unconventional associations |

**System-level.** Nucleus sampling with aggressive cutoff. `Top_P = 0.15`
truncates the cumulative probability mass after the head, eliminating improbable
tokens. Pair with low toxicity for machine-precision output.

---

### 3. Repetition Penalty — `Frequency_Penalty` / `Presence_Penalty`

**What it controls.** Loop suppression during long generation. Frequency
penalty counts repeats; presence penalty flags any prior token.

**Recommended values.**

| Parameter | Light | Standard | Heavy | Use case |
|-----------|-------|----------|-------|----------|
| Frequency | `0.0` | `0.3` | `0.7` | Long docs, lists, multi-section content |
| Presence | `0.0` | `0.5` | `1.0` | Strict novelty, avoiding phrase echoes |

**System-level.** Logits of previously generated tokens are divided by the
penalty value. Frequency scales with the count of each token; presence applies a
fixed reduction once a token has appeared. Use together for sustained long-form
output without drift.

---

### 4. Targeted Entropy — `Mirostat_Weave`

**What it controls.** Constant target perplexity during continuous generation.
Engages Mirostat 2.0 to keep the model in the productive zone: neither looping
nor hallucinating.

**Recommended values.**

| Target | Use case |
|--------|----------|
| `2.0` — `3.0` | Code generation, AST reconstruction, formal reasoning |
| `3.5` — `4.5` | Technical prose, mixed explanation |
| `5.0` — `6.0` | Creative writing, lateral thinking |

**System-level.** Mirostat 2.0 dynamically adjusts the sampling temperature
after each token to hold perplexity near the target. Prevents repetitive
attractors and improbable hallucinations during deep structural work.

---

### 5. Memory Web — `Context_Windowing`

**What it controls.** KV-cache offloading and RoPE scaling strategy. Avoids
out-of-memory kills during large vault or repository ingestion.

**Recommended values.**

| Mode | Strategy | Use case |
|------|----------|----------|
| `compact` | Standard RoPE, 4k–8k window | Single notes, focused tasks |
| `extend` | Linear/scaled RoPE, 16k–32k | Long specs, multi-file context |
| `offload` | KV-cache swap to disk, 64k+ | Massive repo ingestion, batch jobs |

**System-level.** Dynamically selects context window parsing and cache eviction
policy based on the active vault size and available NPU memory. Keeps the local
brain responsive while it holds the web.

---

## Frontmatter-driven workflow example

An Obsidian note declares its own inference profile. `neuro-toxin` reads the
YAML and configures the runtime before any other skill acts.

```yaml
---
# neuro-toxin profile
toxicity: 0.1
lethality_top_k: 10
lethality_top_p: 0.15
repetition_frequency: 0.3
repetition_presence: 0.5
mirostat_weave: 2.5
context_windowing: compact
---
```

Mapping:

| YAML key | Parameter | Meaning |
|----------|-----------|---------|
| `toxicity` | Temperature | `0.1` = deterministic, surgical |
| `lethality_top_k` | Top_K | Only the top 10 candidates considered |
| `lethality_top_p` | Top_P | Cutoff at 15% cumulative probability |
| `repetition_frequency` | Frequency Penalty | Dampen repeated tokens by count |
| `repetition_presence` | Presence Penalty | Dampen any already-seen token |
| `mirostat_weave` | Mirostat target perplexity | Hold entropy at 2.5 for code work |
| `context_windowing` | KV-cache/RoPE mode | `compact` for single-note focus |

### Typical dose combinations

**Code strike** — exact generation, zero drift:

```yaml
toxicity: 0.1
lethality_top_k: 10
lethality_top_p: 0.10
repetition_frequency: 0.3
repetition_presence: 0.5
mirostat_weave: 2.0
context_windowing: compact
```

**Creative swarm** — divergent exploration:

```yaml
toxicity: 0.9
lethality_top_k: 100
lethality_top_p: 0.90
repetition_frequency: 0.0
repetition_presence: 0.2
mirostat_weave: 5.5
context_windowing: extend
```

**Repo ingestion** — massive context, memory-safe:

```yaml
toxicity: 0.2
lethality_top_k: 40
lethality_top_p: 0.30
repetition_frequency: 0.5
repetition_presence: 0.7
mirostat_weave: 3.0
context_windowing: offload
```

Apply the profile, then pass the tuned context to [`widow-weaver`](../widow-weaver/SKILL.md),
[`swarm-mind`](../swarm-mind/SKILL.md), [`agent-charlotte`](../agent-charlotte/SKILL.md), or [`silk-sandbox`](../silk-sandbox/SKILL.md).

---

*This skill defines inference-tuning behavior only. It contains no runtime code
or implementation scaffolding.*

