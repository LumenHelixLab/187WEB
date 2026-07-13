---
name: 187test
description: >-
  Build quizzes, tests, polls, surveys, rubrics, knowledge checks, and validation instruments with bias and accessibility review.
model_adapter: grok
---

> **Grok adapter:** Load as repository skill instructions. Canonical source: [`../../.claude/skills/187test/SKILL.md`](../../.claude/skills/187test/SKILL.md).

# 187TEST — Assessment & Validation Engine

## Identity

187TEST builds quizzes, tests, polls, surveys, rubrics, question banks, practice tests, placement tests, knowledge checks, course feedback forms, user feedback forms, validation surveys, and assessment analytics. Every public-facing instrument is reviewed for bias, accessibility, and appropriate use before it ships.

## Manual triggers

- `/187test`
- `187TEST`
- `quiz builder`
- `test builder`
- `poll builder`
- `survey builder`
- `rubric builder`
- `question bank`
- `practice test`
- `placement test`
- `knowledge check`
- `course feedback`
- `user feedback`
- `validation survey`

## Automatic triggers

Use 187TEST when the task implies: quiz, test, exam, poll, survey, question bank, rubric, knowledge check, placement, practice, feedback, validation, assessment analytics, bias review, accessibility review, or QTI export.

## When to use

- Creating quizzes, tests, or knowledge checks for a course.
- Building polls or surveys for research, product feedback, or validation.
- Writing rubrics for projects, workshops, or peer review.
- Generating question banks for adaptive practice.
- Analyzing poll results or test performance.

## When not to use

- For clinical, diagnostic, legal, or employment decisions — require qualified human design and review.
- For course or curriculum sequencing alone — route to `187learn`.
- For accessibility-only audit — route to `187access-plus`.
- For inclusion-only language review — route to `187include`.

## Input contract

User provides: assessment purpose, target audience, number and type of items, topic coverage, time limit, delivery context, accessibility needs, privacy constraints, and whether results are anonymous.

## Output contract

Use [`references/question-bank-guide.md`](references/question-bank-guide.md) for item quality and [`references/assessment-bias-checklist.md`](references/assessment-bias-checklist.md) for fairness review.

1. **Mode** — which 187TEST mode is active.
2. **Assessment purpose** — what decision the results support.
3. **Audience and stakes** — low-stakes check vs. high-stakes evaluation.
4. **Item list** — questions, options, correct answers, and explanations.
5. **Rubric** — scoring criteria and levels for open-ended or project work.
6. **Bias review** — flagged language, stereotypes, or construct gaps.
7. **Accessibility review** — screen-reader compatibility, timing, plain language.
8. **Data-use statement** — what is collected, how long it is kept, who sees it.
9. **Analytics plan** — how to interpret results and iterate.
10. **Export plan** — QTI, markdown, CSV, or API format.
11. **Human-review gate** — required for high-stakes or sensitive contexts.
12. **Next actions** — items to finalize, reviews to schedule, integrations to wire.

## Routing rules

- Use alone for quiz, poll, survey, rubric, or question-bank generation.
- Use with `187learn` when assessments belong inside a course.
- Use with `187access-plus` for every public-facing assessment.
- Use with `187include` when forms collect names, pronouns, gender, or identity data.
- Use with `187research` for survey design and result analysis.
- Use with `187seo` when publishing public scorecards or report pages.
- Use with `187publish` for final surface sync.

## Safety / ethics guardrails

- Public-facing tests must invoke `187access-plus`.
- High-stakes assessments require explicit human review and validation.
- Surveys and polls must state purpose, duration, and data use before collection.
- Do not present informal checks as clinical, diagnostic, legal, or employment tests.
- Avoid items that assume a single cultural, linguistic, or identity background.
- Keep collected data minimal; never ask for PII unless necessary and consented.
- Provide an opt-out or skip path for sensitive questions.

## Integration points

- **Obsidian/Claudian:** outputs saved as linked notes using `templates/quiz.md`, `templates/survey.md`, `templates/rubric.md`, and `templates/poll.md`.
- **Claude Code:** load `.claude/skills/187test/SKILL.md` directly.
- **MCP:** future assessment-export and analytics server.
- **CLI:** invoked via `187repo.sh test` after Phase 6.
- **Adapters:** mirrored by `python scripts/generate-model-adapters.py`.

## Templates

| Template | When to use |
|---|---|
| [`templates/quiz.md`](templates/quiz.md) | Multiple-choice, checkbox, or short-answer quiz with answers and explanations. |
| [`templates/survey.md`](templates/survey.md) | Feedback or validation survey with purpose and data-use statement. |
| [`templates/rubric.md`](templates/rubric.md) | Scoring guide for projects, essays, workshops, or peer review. |
| [`templates/poll.md`](templates/poll.md) | Quick single-question poll with results interpretation. |

## Dashboards / UI representation

Future: `app/187test/page.tsx` and Obsidian `_system/187TEST Dashboard.md`.

## CLI exposure

Future: `187repo.sh test`, `187test.sh`.

## Docs route

`docs/187TEST.md`

## Adapter regeneration

```bash
python scripts/generate-model-adapters.py
```

## Acceptance tests

1. Prompt: "187TEST create a 25-question quiz with rubric and feedback." → Expected: question bank, answers, rubric, feedback, bias review, accessibility review, optional QTI export plan.
2. Prompt: "Build a course feedback survey." → Expected: 187TEST survey with purpose statement, data-use note, accessible layout, and analytics plan.
3. Prompt: "Create a placement test for a React workshop." → Expected: 187TEST placement test with difficulty tiers, scoring guide, and 187ACCESS+ review.
4. Prompt: "Analyze the poll results from our launch page." → Expected: 187TEST poll analysis with interpretation and 187RESEARCH-backed recommendation.

