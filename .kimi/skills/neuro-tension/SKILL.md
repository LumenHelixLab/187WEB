---
name: neuro-tension
description: >-
  Use when setting inference profiles (exact, analytical, brainstorm, critic, synthesis, repo-ingestion, local-npu) or legacy neuro-toxin dose parameters.
model_adapter: kimi
---

> **Kimi adapter:** Load via the Kimi Skill tool or place in your Kimi skills directory. Source: [`../../.claude/skills/neuro-tension/SKILL.md`](../../.claude/skills/neuro-tension/SKILL.md).

# neuro-tension — TENSION (Inference Profile Controller)

**Suite:** 187WEB Ecosystem v3 — NATASHA. Parent: [`187web-ecosystem`](../187web-ecosystem/SKILL.md).  
**Module:** **TENSION** (legacy module name **TUNE** still accepted).  
**Legacy alias:** `neuro-toxin` (deprecated router).

Controls sampling / context **profiles**. Does **not** claim to eliminate hallucinations.

## Manual triggers

`/187 tension`, `TENSION`, `neuro-tension`, `tune profile`, `inference profile`

## Automatic triggers

temperature, top-k, top-p, mirostat, context window, NPU memory, dose, toxicity (legacy term)

## When to use

- Need deterministic vs divergent generation  
- Long runs looping or drifting  
- Large repo/vault ingestion  
- Switching NATASHA subagent modes (exact / critic / brainstorm)

## When not to use

- Content writing alone without profile needs  
- Claiming “zero hallucination” via parameters alone  

## Profiles (v1)

| Profile | Intent | Guidance |
|---------|--------|----------|
| `exact` | Code, JSON, math | Low temperature, tight nucleus |
| `analytical` | Reasoning, architecture | Moderate temperature, mid nucleus |
| `brainstorm` | Divergence (pair with SPARK) | Higher temperature; still bounded |
| `critic` | Review / red-team | Low-mid temperature, structured critique |
| `synthesis` | FUSE-style combine | Mid temperature, preserve citations |
| `repo-ingestion` | Massive context | Prefer compact/offload windowing |
| `local-npu` | Constrained local hardware | Smaller windows, conservative sampling |

### Legacy parameter map (from neuro-toxin)

| YAML / term | Meaning |
|-------------|---------|
| `toxicity` | Temperature |
| `lethality_top_k` / `lethality_top_p` | Top-K / Top-P |
| `repetition_frequency` / `repetition_presence` | Frequency / presence penalty |
| `mirostat_weave` | Mirostat target perplexity |
| `context_windowing` | `compact` \| `extend` \| `offload` |

## Input contract

Profile name and/or YAML frontmatter fields above; task type; hardware constraints if known.

## Output contract

1. Selected profile name  
2. Parameter table  
3. Explicit non-claim: sampling ≠ factual correctness  
4. Handoff to THREAD / CORD / LAB as appropriate  

## Routing rules

- Before generation in multi-step NATASHA chains  
- After COMPRESS when large context needs a profile  
- Deprecated `neuro-toxin` must redirect here  

## Safety / ethics

- Do not claim parameters guarantee truthfulness.  
- Do not disable safety systems via “creative” profiles.  

## Integration points

- Obsidian frontmatter profiles  
- NATASHA packet `tension_profile` field (runtime Phase 3)  
- Docs: Phase 2 expands `references/`  

## Acceptance tests

1. “Use exact profile for JSON” → exact + low temperature guidance.  
2. “neuro-toxin code strike” → deprecation path still yields exact/code guidance via this skill.  

