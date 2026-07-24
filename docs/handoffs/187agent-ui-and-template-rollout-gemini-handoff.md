# 187WEB — Agentic Sprint Handoff (187AGENT-UI landed, template rollout + skillchain expansion next)

## Handoff metadata
- Repository: `LumenHelixLab/187WEB` (local clone at `D:\projects\187webdesign`)
- Observed baseline (branch / HEAD / date): `feat/motion-registry` @ `f19ffd5`, 2026-07-24
- `main` @ `df93649` ("Merge pull request #13 from LumenHelixLab/feat/motion-registry") — **PR #13 merged early**; 4 commits landed on `feat/motion-registry` afterward and are stranded, not yet in `main`/GitHub Pages (see §1).
- Target branch: `main`, via a **new** PR from `feat/motion-registry` (PR #13 is closed/merged — do not reuse it)
- Target executor: **Gemini** (Gemini CLI / Gemini Code Assist agent). Load `.gemini/skills/*/SKILL.md` adapters, which carry `system_instruction:` + `model_adapter: gemini` fidelity markers per `docs/MODEL-ADAPTERS.md`. Canonical source of truth is always `.claude/skills/<name>/SKILL.md`; the `.gemini/` copies are generated, never hand-edited.
- Delivery target: PR (already opened by the prior agent — check for it before opening a duplicate) → human review → human-triggered merge
- Handoff mode: **release** (repo audited, commands observed, adapters synced)
- Confidence: high (every fact below was read from the live repo or an observed command, not assumed)

---

## 0. Executive directive

Two independent, non-blocking workstreams:

1. **Land the stranded work.** Four commits on `feat/motion-registry` (Hero lab, SaaS template flagship, 187AGENT-UI skill + lab, XAVIER skill-map tie-in) are fully built, tested, and pushed to `origin/feat/motion-registry`, but `main` still only has what PR #13 shipped. Get a PR opened (if not already) and reviewed. **Do not merge to `main` without an explicit human go — merging deploys to GitHub Pages.**
2. **Continue the established pattern.** Roll the SaaS-template-flagship treatment out to the 13 thin templates, and extend `187motion`'s named skillchain library. Both are additive, independently shippable, and should each land as their own PR — do not bundle unrelated work into one giant commit.

No scope beyond these two workstreams. Do not re-architect the skill suite, do not touch the deprecated pre-NATASHA persona (see `docs/migrations/CHARLOTTE-TO-NATASHA.md`), do not change brand tokens.

---

## 1. Architecture target

### 1a. Current repo shape (what exists today)

- Next.js 15.3.9 App Router, React 19, TypeScript, Tailwind CSS. Warm-blueprint marketing pole + "Abyssal Killer" dark showcase pole (`sc-*` tokens in `app/globals.css` `:root`, mirrored in `tailwind.config.ts`).
- **187SKILLS suite**: canonical skill definitions in `.claude/skills/<name>/SKILL.md`, mirrored to `.gemini/`, `.kimi/`, `.chatgpt/`, `.grok/`, `.ollama/`, `.herme/` via `python scripts/generate-model-adapters.py`. Registry source of truth for which skills are "first-class" (get a route + docs page + must appear in 10 mandatory release surfaces) is `scripts/lib/suite-constants.mjs` (Node-side) mirrored by `lib/first-class-skills.ts` (TypeScript-side, used by client components — **both must be updated together**, they are not the same file).
- **Skill showcase pages**: `app/187<route>/page.tsx` renders `<SkillShowcase skill={skill}>{lab}</SkillShowcase>` where `skill` comes from `lib/skill-showcase-data.ts`'s `skillShowcases` array. Every motion-lab-style skill (187hero, 187model, 187viz, 187audio, 187type, 187gsap, and now 187agent-ui) ships a **real interactive demo lab** immediately under the hero (see `components/showcase/SkillShowcase.tsx` — lab renders before the `#triggers` section, not at the page bottom). This is an established, hard-won convention — earlier attempts at generic/duplicated preview cards were explicitly rejected by the user as "freshmen level" quality; every demo must be mechanism-faithful to what its caption claims, not a generic shape.
- **Shared demo-lab kit**: `components/demo-lab/kit.tsx` — `DemoCard`, `useInView`, `useReducedMotion`, `useCanvas2D` (DPR-aware rAF canvas loop). Every lab component (`components/hero-lab/`, `components/model-lab/`, `components/viz-lab/`, `components/audio-lab/`, `components/agent-ui-lab/`, `components/type-lab/`) is built on this kit. Reuse it; do not reinvent per-lab.
- **Agent persona system**: `app/xavier/`, `app/kali/`, `app/natasha/`, `app/yelena/`, `app/charlotte/` (the last one is the deprecated pre-NATASHA persona — see `docs/migrations/CHARLOTTE-TO-NATASHA.md` — but its page/kit still renders, do not delete). Each persona has an `AgentKit` object in `lib/agents/<name>-kit.ts` with a `skills: string[]` array (routed skill ids) rendered as cards by `components/launch/AgentPage.tsx`'s `AgentSkills` section. `lib/agents/agent-kit.ts` defines `AGENT_EQUITY` — peers need ≥8 skills/prompts/tasks/triggers, XAVIER needs ≥14 (~2× peer, enforced by `lib/agents/__tests__/agent-equity.test.ts` via `toBeGreaterThanOrEqual`, so adding skills to any kit is always safe, never breaks equity).
- **Templates**: `app/templates/<name>/page.tsx`, 14 total. 13 are thin (58–83 lines, single/few sections). `app/templates/saas/page.tsx` ("Nimbus") is the flagship at 337 lines / 11 sections (nav, hero, features, bento grid, stats, testimonials, comparison table, FAQ accordion, final CTA, footer — built with `<Reveal>` scroll-entrance wrapping throughout). `components/templates/FaqAccordion.tsx` is a new reusable component built for Nimbus (accessible single-open accordion, `tone="dark"|"light"` prop) — reuse it for other templates' FAQ sections rather than rebuilding.

### 1b. What "done" looks like for each workstream

- **Workstream 1 (land stranded work)**: a PR from `feat/motion-registry` → `main` exists, is green on CI (or the local validation matrix in §11 passes), and a human has explicitly approved the merge.
- **Workstream 2a (template rollout)**: each of the 13 thin templates reaches the same bar as Nimbus — real sections (not lorem placeholders), `<Reveal>` scroll entrances, an accessible FAQ via `FaqAccordion`, and a design vocabulary distinct to that industry (per `.claude/skills/187webdev-templates/references/TEMPLATES.md` if it exists, or per `187webdesign`'s "avoid the generic AI-template defaults" rule) — not a copy-pasted Nimbus with different words.
- **Workstream 2b (skillchains)**: `.claude/skills/187motion/references/SKILLCHAINS.md` (currently 6 named chains: Hero Launch, Page Transition System, Scroll Narrative, Product Reveal, Sonic Feedback, Loader/Boot Sequence) gains additional named, multi-skill compositions with ready-to-run prompts, following the file's own `## Adding a new chain` convention at the bottom of the file — read that section before adding.

---

## 2. Non-negotiables

### Preserve
- Brand tokens: Abyssal Black `#080808` background family for the dark showcase pole, warm-blueprint tokens for marketing pages — defined once in `app/globals.css` `:root` and `tailwind.config.ts`. Never hardcode a new raw hex in a component; extend the token set if a genuinely new color is needed and the user has approved it.
- `prefers-reduced-motion` handling on every animated demo (`useReducedMotion()` from the shared kit) — every existing lab does this; new work must too.
- The skill-validator gate set (§11) — all seven must stay green.
- XAVIER's `skills` equity lead over peers (test uses `toBeGreaterThanOrEqual`, so this only breaks if a peer's list is padded past 14 or XAVIER's is cut below peers').
- The `feat/motion-registry` branch's existing 4 unmerged commits — do not rebase, squash, or force-push over them without explicit instruction.

### Prohibit
- Do not merge any PR to `main` without explicit human approval (merging deploys via GitHub Pages CI — this is a production action).
- Do not re-art-direct the "Abyssal Killer" or "Warm Blueprint" palettes — the 187web-ecosystem skill explicitly marks these "preserve; do not re-art-direct."
- Do not add new work to the deprecated pre-NATASHA persona (`app/charlotte/`) or resurrect its old skill/module naming (see `docs/migrations/CHARLOTTE-TO-NATASHA.md`).
- Do not skip the `npm run typecheck && npm run lint && npm test && npm run build` + suite-validator sequence before claiming any phase done.
- Do not fabricate demo mechanisms — every lab-card caption must describe what the code actually does (this was a hard user correction earlier in the project: generic/duplicated previews were rejected as low-quality; every preview must be mechanism-accurate).

---

## 3. Operating protocol

### Phase 0 repository audit (required — this handoff is `release` mode, but re-verify before acting)
```bash
git fetch origin
git log origin/main --oneline -3
git log origin/main..origin/feat/motion-registry --oneline   # should show 4 commits; if 0, workstream 1 is already merged — skip it
git status
```

### Branch and commit discipline
- Feature branch only, never direct commits to `main`.
- For workstream 2, branch from `main` **after** workstream 1's PR merges (so the new work isn't stacked on a branch whose PR is already closed) — or branch from `feat/motion-registry` if workstream 1 hasn't merged yet and you need the agent-ui/hero-lab work as a base. Check `git log origin/main..origin/feat/motion-registry` first to decide.
- Small, reviewable commits — one template per commit for workstream 2a is reasonable; one skillchain batch per commit for 2b.

### Human approval boundaries
- Automatic without asking: file edits, running tests/builds/validators, opening a PR, pushing to a feature branch.
- Requires explicit human go: merging any PR to `main`, force-push, deleting branches, any `GITHUB_PAT`-based Power Mode deploy.

---

## 4. Program orchestrator

Single integration owner role (whoever/whatever runs this handoff) owns: the feature branch, `scripts/lib/suite-constants.mjs` + `lib/first-class-skills.ts` (must always change together), `lib/skill-showcase-data.ts`, the 10 mandatory release-surface files (§10), final validation, and PR creation.

---

## 5. Subagent roster (if parallelizing workstream 2a across templates)

| Role | Objective | Owned files | Prohibited | Dependencies | Acceptance | Gate |
|---|---|---|---|---|---|---|
| Template builder — Agency/Editorial/Portfolio | Expand 3 templates to Nimbus-equivalent depth | `app/templates/{agency,editorial,portfolio}/page.tsx` | Shared components, other templates | `components/templates/FaqAccordion.tsx` must exist | `npm run typecheck && npm run lint` clean; live browser check | Phase 1 |
| Template builder — Commerce/DevTool/Events | Expand 3 templates | `app/templates/{commerce,devtool,events}/page.tsx` | Shared components, other templates | same | same | Phase 1 |
| Template builder — Fintech/Healthcare/Nonprofit | Expand 3 templates | `app/templates/{fintech,healthcare,nonprofit}/page.tsx` | Shared components, other templates | same | same | Phase 1 |
| Template builder — Realestate/Restaurant/Scientific/Education | Expand 4 templates | `app/templates/{realestate,restaurant,scientific,education}/page.tsx` | Shared components, other templates | same | same | Phase 1 |
| Integrator | Final build, cross-template consistency pass, PR | Read-only on template files; owns root config | — | All 4 lanes complete | Full validation matrix green | Phase 2 |

These 4 lanes are file-disjoint (no two touch the same `page.tsx`) and safe to run in parallel. `components/templates/FaqAccordion.tsx` is shared — read-only for all lanes; if a lane needs a new shared component, it must be a **new** file, not an edit to an existing shared one, to avoid merge conflicts (or the integrator adds it after collecting requests).

---

## 6. Context packet standard

Token budget: this document is the full context packet — a fresh Gemini session should not need the prior conversation history, only this file plus live repo reads. Must-preserve fields already folded into §1–§2 above. No compression was needed to produce this handoff (repo facts were read directly, not summarized from a long chat history).

---

## 7. Phases and milestones

### Phase 0 — Baseline and DAG
Entry: this handoff. Actions: run the Phase 0 audit commands (§3). Exit: confirmed whether workstream 1's 4 commits are still unmerged.

### Phase 1 — Workstream 1: land stranded work
Entry: Phase 0 complete. Actions: check for an existing open PR from `feat/motion-registry` (a prior agent may have already opened one — do not duplicate); if none exists, open one titled something like "Land 187HERO lab, Nimbus template expansion, and 187AGENT-UI skill" with a body summarizing the 4 commits. Deliverable: PR URL. Exit gate: PR opened, human notified — **do not merge**.

### Phase 2 — Workstream 2a: template rollout (can run in parallel with Phase 1 review)
Entry: `components/templates/FaqAccordion.tsx` exists (it does, already built). Actions: per the subagent roster in §5, expand each of the 13 templates to Nimbus-equivalent depth — real sections, distinct industry vocabulary, `<Reveal>` entrances, accessible FAQ. Deliverable: 13 expanded template pages, ideally as separate commits/PRs so each can be reviewed independently rather than one enormous diff. Exit gate: `npm run typecheck && npm run lint && npm run build` clean, live browser spot-check of at least 3 templates.

### Phase 3 — Workstream 2b: skillchain expansion
Entry: independent of Phase 2. Actions: read `.claude/skills/187motion/references/SKILLCHAINS.md`'s existing 6 chains and its own `## Adding a new chain` section, then add new named, multi-skill compositions with ready-to-run prompts following the same format. Deliverable: expanded `SKILLCHAINS.md`. Exit gate: format-consistent with existing entries, cross-referenced correctly from `187gsap`'s SKILL.md if it links there.

### Phase 4 — Validation and release
Entry: Phase 2 and/or 3 deliverables exist. Actions: run the full validation matrix (§11) on the integration branch. Deliverable: green matrix. Exit gate: human approves merge.

---

## 8. Dependency DAG

```
Phase 0 (audit)
  ├─→ Phase 1 (land stranded work) ──────────────┐
  ├─→ Phase 2 (template rollout, 4 parallel lanes) ├─→ Phase 4 (validate + release)
  └─→ Phase 3 (skillchain expansion) ─────────────┘
```
Phases 1, 2, and 3 are mutually independent and may run concurrently. Phase 4 depends on whichever of 2/3 you're shipping in that PR (Phase 1 ships on its own, separately).

## 9. Safe parallel lanes
The 4 template-builder lanes in §5 (file-disjoint `page.tsx` sets). Phase 1 and Phase 3 are also safe to run alongside Phase 2 — different files entirely.

## 10. Serialized shared files
If workstream 2a or 2b ever needs a **new** first-class skill or template category (not just filling in existing templates), these must be touched serially by one owner, never in parallel:
`README.md`, `AGENTS.md`, `CHANGELOG.md`, `docs/INSTALL.md`, `docs/MODEL-ADAPTERS.md`, `docs/ROUTING.md`, `app/page.tsx`, `app/187/page.tsx`, `.claude/skills/187web-ecosystem/SKILL.md`, `.claude/skills/187web-manifest/SKILL.md`, `scripts/lib/suite-constants.mjs`, `lib/first-class-skills.ts`, `lib/skill-showcase-data.ts`. (Not expected to be needed for the template rollout or skillchain expansion — templates aren't first-class skills and don't touch this list. Flagged here only in case scope grows.)

---

## 11. Validation matrix

| Command | Phase | Expected evidence | Status (as of `f19ffd5`) |
|---|---|---|---|
| `npm run typecheck` | all | clean, no output beyond the command banner | ✅ passing |
| `npm run lint` | all | `✔ No ESLint warnings or errors` | ✅ passing |
| `npm test` | all | `80 passed (80)` across 13 test files | ✅ passing |
| `rm -rf .next && npm run build` | all | `✓ Compiled successfully`, all routes statically generated | ✅ passing |
| `npm run skills:validate` | skill changes only | `[OK] 75 canonical skills validated` | ✅ passing |
| `npm run adapters:drift` | skill changes only | `✅ Adapter drift check passed for 75 skills` | ✅ passing |
| `npm run docs:drift` | skill/docs changes only | `✅ Docs drift check passed` | ✅ passing |
| `npm run showcase:sync` | skill changes only | `✅ Showcase sync check passed` | ✅ passing |
| `npm run skills:parity` | skill changes only | one known **pre-existing, unrelated** failure: `access.triggers: 16 > 14` — do not attempt to fix this as part of either workstream, it predates this handoff | ⚠️ 1 pre-existing failure, unrelated |
| `npm run release:validate` | skill changes only | `✅ All first-class skills present in mandatory release surfaces` | ✅ passing |

Templates and skillchains don't touch the skill registry, so only the first four rows apply to workstream 2 — the skill-specific validators only matter if you add a *new* skill (not expected for this handoff's scope).

---

## 12. Security and policy corrections
None outstanding. No unsafe legacy behavior identified in the files this handoff touches.

---

## 13. Commit sequence
1. (Phase 1) No new commits needed — `feat/motion-registry`'s existing 4 commits ship as-is via PR.
2. (Phase 2) One commit per template, or grouped by the 4 lanes in §5 — e.g. `feat: expand agency/editorial/portfolio templates to flagship depth`.
3. (Phase 3) One commit for the SKILLCHAINS.md expansion.
4. Each workstream gets its own PR — do not combine workstream 1 with 2 or 3.

## 14. Pull-request contract
- **Summary**: what shipped, in plain language.
- **Migration**: none expected (no schema/API changes in either workstream).
- **Tests**: paste the validation matrix results.
- **Known limitations**: for workstream 2a, note if any template's industry-specific content used placeholder copy pending real client content.
- **Rollback**: `git revert` the merge commit; no data migrations to reverse.
- **Reviewer checklist**: does each new/changed template avoid the generic AI-template defaults (per `187webdesign`'s anti-generic rule)? Does every animated element respect `prefers-reduced-motion`?

## 15. Rollback plan
Standard `git revert` of the merge commit on `main`. No database, no external service state, no irreversible side effects in either workstream — this is a static Next.js site (GitHub Pages export).

## 16. Final execution report schema
```
Status: <passed|failed|partial>
Commits: <list>
Files changed: <count, or list if small>
Tests: <matrix results>
Limitations: <any>
Next sprint: <what's left, e.g. remaining templates if not all 13 landed>
```

---

## 17. Paste-ready launch prompt (for Gemini)

```
You are continuing work on the 187WEB repo (LumenHelixLab/187WEB, Next.js 15 +
React 19 + TypeScript + Tailwind). Read
docs/handoffs/187agent-ui-and-template-rollout-gemini-handoff.md in full before
doing anything else — it is your complete context packet, you do not need
prior conversation history.

Load the canonical skill definitions from .claude/skills/ (not the .gemini/
mirrors — those are generated output, read .claude/skills/<name>/SKILL.md as
the source of truth; regenerate mirrors with
`python scripts/generate-model-adapters.py` if you change a canonical skill).

Start with Phase 0 in the handoff (repository audit) to confirm current
branch/main state, since it may have changed since this handoff was written.
Then proceed to whichever phase the human directs — Phase 1 (land the
stranded feat/motion-registry commits via PR, no auto-merge), Phase 2
(template rollout to the 13 thin templates using the SaaS/Nimbus template at
app/templates/saas/page.tsx as your quality bar), or Phase 3 (expand
.claude/skills/187motion/references/SKILLCHAINS.md with new named chains).

Non-negotiables: never merge to main without explicit human approval; never
touch the deprecated pre-NATASHA persona (app/charlotte/); every animated element must respect
prefers-reduced-motion; run the full validation matrix (§11 of the handoff)
before calling any phase done; every demo/preview caption must accurately
describe what the code does — no generic or fabricated mechanisms.
```
