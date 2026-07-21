# 187WEB Agent Remix — Xavier, Security Fleets & Agent Parity

**Date:** 2026-07-21  
**Status:** Design approved, ready for implementation planning  
**Owner:** 187WEB core team  

## 1. Goals

- Rename the fifth agent from **Krishna** to **Xavier** and establish the role as final creation/production responsibility, cross-crew vision, and the ability to call huddles (council) and spawn subagents (brood).
- Recolor the agent roster: **Xavier purple**, **Kali green**, **Charlotte blue**, **Yelena yellow**, **Natasha rose**.
- Split security duties cleanly:
  - **Natasha** → external / post-launch security + applications.
  - **Yelena** → pre-launch internal security / safety gates + applications.
- Free **Charlotte** and **Kali** for application work. Differentiate Kali’s creation path with a new skill **187CREATE** while Charlotte keeps **187CRAFT**.
- Build an **AgentKit parity layer**: every agent exposes the same surface types — skills, prompts, tasks, triggers, and commands.
- Give Xavier premium controls: **Council**, **Brood clone**, **Audit ledger**, **Kill switch**.
- Keep the implementation professional, reviewable, and CI-green at every phase.

## 2. Non-goals

- No live backend for subagent execution in Phase 1–4. Council/Brood are stateful UI surfaces that log decisions and simulate lifecycle controls.
- No billing integration for budget caps. Budgets are numeric guards stored in local state.
- No change to the underlying skill execution engine. We surface skills/prompts; we do not rewrite how skills run.

## 3. Final agent roster

| Agent | Color | Primary domain | Skills |
|-------|-------|----------------|--------|
| **NATASHA** | `#f43f5e` | External / post-launch security | `natasha`, `chain`, `test` |
| **YELENA** | `#facc15` | Pre-launch internal safety gates | `natasha`, `test`, `access-plus`, `include` |
| **CHARLOTTE** | `#3b82f6` | Application orchestration | `repo`, `craft`, `vibe`, `launch`, `write`, `research` |
| **KALI** | `#39FF14` | Growth + create assist | `seo`, `revenue`, `publish`, `create`, `repo`, `vibe` |
| **XAVIER** | `#a855f7` | Final creation / production + council/brood | `docs`, `version`, `publish`, `launch`, `natasha`, `test` |

All agents can jump in when triggered, assign subagents, call any 1st/2nd/3rd class skill, or appeal to Xavier for a council or a SkillChain.

## 4. Phase 1 — Rename, recolor, and 187CREATE

### 4.1 Rename Krishna → Xavier

- Rename directory `app/krishna` → `app/xavier`.
- Rename component `KrishnaSkillChains` → `XavierSkillChains` and move to `components/launch/XavierSkillChains.tsx`.
- Update every code reference: `AgentDepartments.tsx`, agent page files, `skillchains-data.ts`, and any string constants.
- Xavier’s tagline: **“Final creation + council”**.
- Xavier’s overview: final production responsibility, cross-crew vision, council huddles, and brood subagent management.

### 4.2 Color remap

Update the `color` field in `AgentDepartments.tsx` and each agent page:

- Natasha: `#f43f5e` (unchanged)
- Yelena: `#facc15`
- Charlotte: `#3b82f6`
- Kali: `#39FF14`
- Xavier: `#a855f7`

Any hard-coded color references in agent-specific UI must be derived from the agent config.

### 4.3 New first-class skill: 187CREATE

**Identity:** `187CREATE` is Kali’s growth-first creation counterpart to Charlotte’s craft-oriented design system work. It specializes in landing pages, ad creatives, influencer assets, and conversion-focused surfaces.

**Public surface:**
- `app/187create/page.tsx`
- `docs/187CREATE.md`
- `.claude/skills/187create/SKILL.md`
- Entry in `lib/skill-showcase-data.ts`
- Entry in `lib/first-class-skills.ts` and `scripts/lib/suite-constants.mjs`
- Release-surface roster updates in `app/page.tsx`, `app/187/page.tsx`, `components/showcase/Showcase.tsx`, `docs/ROUTING.md`
- Regenerate model adapters (`npm run adapters:generate`) and run drift checks.

**Skill data (suggested):**
- id: `create`
- name: `187CREATE`
- tagline: `Growth-first creation`
- color: `#39FF14`
- triggers: `build a landing page`, `spin up ad creative`, `design influencer kit`, `optimize conversion surface`
- use cases: growth pages, campaign assets, quick MVPs
- outputs: shipped growth surface, campaign brief, conversion checklist

### 4.4 Kali skill swap

Replace `craft` with `create` in Kali’s `skillIds` and update her overview to reflect growth-first creation.

## 5. Phase 2 — AgentKit parity layer

### 5.1 Data model

Introduce a typed `AgentKit` in `lib/agents/agent-kit.ts`:

```ts
export type Prompt = { id: string; title: string; body: string; whenToUse: string };
export type Task = { id: string; title: string; steps: string[]; output: string };
export type Trigger = { id: string; condition: string; action: string };
export type Command = { id: string; name: string; description: string; args?: string; premium?: boolean };

export type AgentKit = {
  slug: string;
  name: string;
  color: string;
  tagline: string;
  overview: string;
  skills: string[];
  prompts: Prompt[];
  tasks: Task[];
  triggers: Trigger[];
  commands: Command[];
  skillChains?: SkillChain[];
};
```

### 5.2 Agent kit files

Create one kit file per agent:

- `lib/agents/natasha-kit.ts`
- `lib/agents/yelena-kit.ts`
- `lib/agents/charlotte-kit.ts`
- `lib/agents/kali-kit.ts`
- `lib/agents/xavier-kit.ts`

Each kit exports a fully populated `AgentKit`. The `AgentDepartments.tsx` `AGENTS` array is replaced by a derived `agentRegistry` map built from the kits.

### 5.3 AgentPage redesign

`components/launch/AgentPage.tsx` renders sections for the active agent:

1. **Overview** — name, tagline, color hero, description.
2. **Skills** — existing skill chips, linking to `/187<skillId>`.
3. **Prompts** — copy-ready prompt cards with title, when-to-use, and body.
4. **Tasks** — runnable task cards with ordered steps and expected output.
5. **Triggers** — condition → action cards.
6. **Commands** — CLI-style command cards: name, description, args. Xavier’s commands are marked premium.
7. **SkillChains** — rendered from `agent.skillChains` if present.

For Xavier, add two extra tabs:
- **Council**
- **Brood**

Sections use the agent’s color for accents and maintain existing glass/dark styling.

### 5.4 Equitable surface targets

Every agent kit contains at minimum:
- 4 prompts
- 4 tasks
- 4 triggers
- 4 commands
- 2–4 skill chains

Xavier adds premium commands on top of the baseline.

## 6. Phase 3 — Security fleets (Natasha & Yelena)

### 6.1 Natasha fleet (external / post-launch)

Skill chains:
1. **Post-Launch Threat Sweep** — `natasha`, `chain`, `test`, `version` → external threat report + patch plan.
2. **Contract Audit Chain** — `chain`, `natasha`, `test`, `docs` → smart-contract / API audit report.
3. **Public Bounty Triage** — `natasha`, `test`, `version` → triage log and severity ranking.
4. **External Access Review** — `natasha`, `access-plus`, `include` → public surface access audit.

Commands: `sweep`, `audit`, `triage`, `escalate`.

### 6.2 Yelena fleet (pre-launch internal)

Skill chains:
1. **Pre-Launch Safety Gate** — `test`, `access-plus`, `include`, `version` → release gate record.
2. **CI Safety Sweep** — `test`, `access-plus`, `include`, `repo` → CI pass/fail report.
3. **Internal Access Review** — `access-plus`, `include`, `natasha` → internal IAM audit.
4. **Dependency Vetting** — `test`, `version`, `chain` → dependency risk report.

Commands: `gate`, `sweep`, `vet`, `approve`.

### 6.3 Shared security skill notes

Both agents reference the `natasha` and `test` skills. The specialization is expressed through their fleet chains, triggers, and command verbs rather than by duplicating skill pages.

## 7. Phase 4 — Xavier premium controls

### 7.1 Council command

Component: `components/launch/XavierCouncil.tsx`

- Form: select participating agents, topic, urgency.
- Output: a decision log entry with timestamp, participants, topic, and resolution.
- State: stored in a React ref / local state. No backend required.

### 7.2 Brood clone

Component: `components/launch/XavierBrood.tsx`

- Spawn a subagent from any agent template: name, task scope, parent agent.
- List running subagents: status (idle/running/paused/killed), task, start time.
- Controls: pause, resume, kill.
- Concurrency cap: default 5, configurable via UI guard.

### 7.3 Audit ledger

Component: `components/launch/XavierAuditLedger.tsx`

- Append-only log of councils, brood spawns, kills, and task dispatches.
- Exportable as text/markdown.
- Filter by event type.

### 7.4 Kill switch

- Global “Kill all brood” button in XavierBrood with confirmation.
- Per-subagent kill button.
- Emergency rollback command card in Xavier’s command list.

### 7.5 Premium command set

Xavier commands (baseline + premium):
- `council` — call a huddle / Q&A.
- `brood` — spawn subagent clones.
- `audit` — open the audit ledger.
- `ship` — final production sign-off.
- `kill` — emergency kill switch (premium).

## 8. Files changed (summary)

### Phase 1
- `app/krishna/` → `app/xavier/`
- `components/launch/KrishnaSkillChains.tsx` → `components/launch/XavierSkillChains.tsx`
- `components/launch/skillchains-data.ts` (rename references)
- `components/launch/AgentDepartments.tsx`
- `app/natasha/page.tsx`, `app/charlotte/page.tsx`, `app/kali/page.tsx`, `app/yelena/page.tsx`, `app/xavier/page.tsx`
- New: `app/187create/page.tsx`, `docs/187CREATE.md`, `.claude/skills/187create/SKILL.md`
- Updates: `lib/skill-showcase-data.ts`, `lib/first-class-skills.ts`, `scripts/lib/suite-constants.mjs`, `app/page.tsx`, `app/187/page.tsx`, `components/showcase/Showcase.tsx`, `docs/ROUTING.md`
- Regenerated model adapters

### Phase 2
- New: `lib/agents/agent-kit.ts`, `lib/agents/natasha-kit.ts`, `lib/agents/yelena-kit.ts`, `lib/agents/charlotte-kit.ts`, `lib/agents/kali-kit.ts`, `lib/agents/xavier-kit.ts`
- Rewrite: `components/launch/AgentPage.tsx`
- Delete: `components/launch/launch-data.ts` agent constants if fully absorbed into kits.

### Phase 3
- Updates: `lib/agents/natasha-kit.ts`, `lib/agents/yelena-kit.ts`
- New section rendering in `AgentPage.tsx` for skill chains.

### Phase 4
- New: `components/launch/XavierCouncil.tsx`, `components/launch/XavierBrood.tsx`, `components/launch/XavierAuditLedger.tsx`
- Updates: `app/xavier/page.tsx`, `lib/agents/xavier-kit.ts`

## 9. Validation criteria

After each phase:
- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm test` passes.
- `npm run docs:drift` passes.
- `npm run showcase:sync` passes.
- `npm run release:validate` passes.
- `npm run adapters:drift` passes (after adapter regeneration).
- Pages deploy on `main` succeeds.

## 10. Open questions / decisions

1. Should 187CREATE get its own showcase demo card, or is the skill page sufficient?  
   *Recommendation:* skill page sufficient for Phase 1; showcase card can be added later.
2. Should the council/brood state persist across browser sessions?  
   *Recommendation:* keep it in-memory for Phase 4; localStorage persistence can be a fast follow.
3. Should Xavier’s color be exactly `#a855f7` or a custom purple to avoid clashing with Kali’s new green?  
   *Recommendation:* use `#a855f7` as specified; it contrasts cleanly with the green/blue/yellow/rose set.
