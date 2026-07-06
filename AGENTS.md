# Agent Guide — 187webdesign

## Project identity

`187webdesign` is a full-stack Next.js 15 starter and the living demo for the 187WEBDEV award-caliber web-design playbook. It ships with both a warm-blueprint marketing foundation and a dark "Killer Web" showcase surface.

## Stack

- **Framework:** Next.js 15 App Router, React 19, TypeScript 5 strict
- **Styling:** Tailwind CSS 3, warm-blueprint tokens + dark showcase palette
- **Database:** Prisma 6 + PostgreSQL (preview mode works without a DB)
- **Validation:** Zod
- **Tooling:** ESLint, Prettier, GitHub Actions CI + Pages deploy

## Skill architecture

Claude Code / Grok skills live under `.claude/skills/` and `.grok/skills/` respectively. They are mirrored one-to-one.

### Active skill suite

| Skill | Path | Load when |
|---|---|---|
| 187webdesign (core) | `.claude/skills/187webdesign/SKILL.md` | Building/redesigning/art-directing any marketing site or landing page |
| 187web-ecosystem v2 | `.claude/skills/187web-ecosystem/SKILL.md` | You need the full Charlotte / Killer Web skill array |
| widow-weaver | `.claude/skills/widow-weaver/SKILL.md` | Text/document processing: extraction, translation, tone polish, task extraction, code explanation, logic solving, refactoring |
| neuro-toxin | `.claude/skills/neuro-toxin/SKILL.md` | Tuning LLM inference parameters from Obsidian YAML frontmatter |
| swarm-mind | `.claude/skills/swarm-mind/SKILL.md` | Activating a niche engineering persona based on Obsidian folder |
| agent-charlotte | `.claude/skills/agent-charlotte/SKILL.md` | Autonomous web crawling and research back into the vault |
| silk-sandbox | `.claude/skills/silk-sandbox/SKILL.md` | Executing generated code in isolated sandboxes |
| 187web-manifest | `.claude/skills/187web-manifest/SKILL.md` | Project manifest, compiler, and 27 prompt skills |

### Manifest prompt skills

All 27 prompts in [`references/MANIFEST.xml`](.claude/skills/187web-manifest/references/MANIFEST.xml) have standalone skills under `.claude/skills/<prompt-id>/` and `.grok/skills/<prompt-id>/` (e.g., `ml-systems-architect`, `a11y-linting-agent`, `xss-vulnerability-scanner`).

### Model adapters

The full skill library is mirrored into model-specific formats under:

- `.gemini/skills/<name>/SKILL.md` — Gemini system-instruction skills
- `.kimi/skills/<name>/SKILL.md` — Kimi skills
- `.chatgpt/skills/<name>/SKILL.md` — ChatGPT custom GPT instructions
- `.ollama/modelfiles/<name>/Modelfile` — Ollama model files
- `.herme/agents/<name>/system.md` + `SKILL.md` — Hermes-based local agents

Regenerate all adapters with `python scripts/generate-model-adapters.py`. See [`docs/MODEL-ADAPTERS.md`](docs/MODEL-ADAPTERS.md).

### 187WEBDEV portfolio suite

The broader portfolio suite lives in `skills/187webdev/` and is mirrored in `.grok/skills/187webdev-*`:

- 187webdev-qa
- 187webdev-trends
- 187webdev-resilience
- 187webdev-templates
- 187webdev-code-review
- 187webdev-design-system

## Coding conventions

- Server Components first; client components only when interactivity is required.
- Null-safe Prisma access via `lib/db.ts`; preview mode degrades gracefully.
- Content as data: copy lives in `lib/content.ts`.
- Use the design-system tokens in `tailwind.config.ts` and `app/globals.css`.
- Respect `prefers-reduced-motion`.
- Run the pre-ship checklist (`CONTRIBUTING.md`) before any UI PR.

## Build & test

```sh
npm install
npm run lint
npm run typecheck
npm run build
```

Local database:

```sh
docker compose up -d
npm run db:push
npm run db:seed
```

## Current state

- `/` serves the dark Killer Web showcase.
- `/templates` lists 14 industry templates.
- `/resilience` demos unhappy-path states.
- `/api/lead` persists leads when a database is available.

## Notes for agents

- The warm-blueprint components in `components/` are mostly unused by `/`; they remain for template pages and future routes.
- The `.grok/` folder is a mirror of `.claude/skills/` for Grok compatibility; keep them in sync when editing skills.
- No runtime implementation of the Charlotte skills exists yet — they are currently prompt-engineering / skill-definition assets.
