---
title: 187RESEARCH Evidence Ladder
description: Claim classification rungs and usage rules.
skill: 187research
---

# 187RESEARCH Evidence Ladder

Every claim in a 187RESEARCH artifact must be assigned exactly one rung.

## Rungs

| Rung | Definition | When to use | Citation requirement |
|---|---|---|---|
| **proved** | Formal proof or rigorous derivation exists. | Theorems, lemmas, corollaries, verified algorithms. | Cite the proof source or verifier. |
| **measured** | Empirical measurement with documented method and uncertainty. | Experiments, surveys, benchmarks, observational data. | Cite dataset, instrument, protocol, and analysis. |
| **modeled** | Result from an explicit model or simulation. | Simulations, fits, forecasts, computational experiments. | Cite model, code, assumptions, and parameters. |
| **inherited** | Taken from a cited source. | Secondary reporting of another work's result. | Cite original source and note confidence. |
| **interpreted** | Reasonable inference from evidence. | Synthesis, discussion, expert reading. | Cite the evidence being interpreted. |
| **speculative** | Hypothesis or conjecture. | Future work, possible mechanisms, untested ideas. | Explicitly flag as speculative. |
| **poetic / metaphorical** | Aids intuition but is not evidence. | Analogies, visual metaphors, explanatory framing. | Do not present as fact. |
| **unsupported** | No backing evidence found. | Any claim that cannot be sourced. | Reject or downgrade before publication. |

## Rules

- A claim may only be published if it is **proved**, **measured**, **modeled**, **inherited**, or **interpreted** with clear sourcing.
- **Speculative** claims must be labeled as such and paired with a plan to test or find evidence.
- **Poetic / metaphorical** claims must be visually or typographically distinct from evidence claims.
- **Unsupported** claims must be removed, downgraded, or replaced before any public output.

## Evidence ladder in practice

When auditing a claim, ask:

1. What is the exact statement?
2. What is the strongest rung that applies?
3. What source supports it?
4. Does the source match the rung? (e.g., a blog post cannot support a "proved" claim.)
5. What limitations or uncertainties should be noted?
6. Should the claim be downgraded, rephrased, or removed?

## Domain notes

- **Mathematics:** Distinguish theorem/proof from computational witness and from analogy.
- **Biomedicine:** Distinguish clinical trial evidence from preclinical or review evidence.
- **Software research:** Distinguish benchmark measurement from repository metadata inference.
- **Public data:** Distinguish official statistics from derived aggregations.
