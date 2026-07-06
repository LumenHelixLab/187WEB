---
name: 187web-manifest
description: >-
  Use when starting a long-run 187web session, selecting a manifest prompt, compiling with 187web-compiler, or routing a Layer-4 viral/elegant prompt.
model_adapter: chatgpt
---

> **ChatGPT adapter:** Use the markdown below as the custom GPT / system instructions. Source: [`../../.claude/skills/187web-manifest/SKILL.md`](../../.claude/skills/187web-manifest/SKILL.md).

# 187web-manifest — Master Prompt Manifest

**Suite:** Charlotte v2 stack. Parent:
[`187web-ecosystem`](../187web-ecosystem/SKILL.md) · Compiler:
`scripts/187web-compiler.sh` · Registry: `references/MANIFEST.xml`

The manifest is the **Library of Skills** — 27 high-density XML-compiled prompts
ready for the pre-prompt-compiler to inject into agentic sessions. One manifest,
zero drift across long-run coding sessions.

Load this skill when you need to **select**, **compile**, or **inject** a specific
prompt; initialize a long-run session; or route Layer 4 viral prompts (UI audit,
A11y, XSS, state machines).

## When to use this

- Starting a long-run session — run compiler, read `PLAN.md`, inject compiled JSON.
- User names a manifest prompt (`ui-aesthetic-auditor`, `task-identification-extraction`).
- Hardware is edge/low-power and persona must downgrade automatically.
- Building OmniQube telemetry or vault-data integration pipelines.

## Manifest layers

| Layer | Name | Count | Routes to |
|-------|------|-------|-----------|
| 1 | Native OS Productivity | 5 | `widow-weaver` |
| 2 | Corporate & Workflow | 4 | `widow-weaver` (+ `{{SelectedText}}`) |
| 3 | Swarm-Mind Engineering | 6 | `swarm-mind` personas |
| 4 | Viral & Elegant Web/Agent | 12 | `187web-manifest` + 187WEBDEV suite |

**Canonical XML:** [`references/MANIFEST.xml`](./references/MANIFEST.xml)
**Build plan:** [`references/BUILD-PLAN.md`](./references/BUILD-PLAN.md)
**Phase roadmap:** [`references/PHASE-ROADMAP.md`](./references/PHASE-ROADMAP.md) (187webdev-templates mapped)

## Compiler usage

### Bash (FydeOS / Linux / Git Bash)

```bash
# Install registry (once)
mkdir -p ~/.187web/prompts
cp references/MANIFEST.xml ~/.187web/prompts/

# List all prompt IDs
./scripts/187web-compiler.sh --list

# Auto-detect power mode + folder → compile JSON
./scripts/187web-compiler.sh

# Explicit prompt
./scripts/187web-compiler.sh --prompt a11y-linting-agent

# Low-power override
E187WEB_POWER_MODE=low ./scripts/187web-compiler.sh
```

### PowerShell (Windows)

```powershell
.\scripts\187web-compiler.ps1 -List
.\scripts\187web-compiler.ps1 -Prompt ui-aesthetic-auditor
.\scripts\187web-compiler.ps1 -Write -Emit   # persist + push to OmniQube relay
$env:E187WEB_POWER_MODE = 'low'; .\scripts\187web-compiler.ps1

# Full session init (PLAN.md + relay + compile)
.\scripts\session-init.ps1
```

### Phase I stack (complete)

```powershell
# 1. Install compiler hook (once)
.\scripts\install-compiler-hook.ps1

# 2. Start telemetry relay
node .\scripts\telemetry-relay.mjs

# 3. Open OmniQube Render Matrix
# http://localhost:3000/omniqube.html  (with next dev)
```

### Compiler output (inject into agent context)

```json
{
  "ecosystem": "187web",
  "power_mode": "high",
  "prompt_id": "ui-aesthetic-auditor",
  "skill": "187webdesign",
  "persona": "ui-spinner",
  "directive": "...",
  "neuro_toxin": { "toxicity": 0.3, "lethality": "medium" }
}
```

## Prompt quick-reference

### Layer 1 — Native OS

| ID | Alias | Use |
|----|-------|-----|
| [`document-summarization`](../document-summarization/SKILL.md) | TLDR_Toxin | Dense docs → bullets |
| [`linguistic-translation`](../linguistic-translation/SKILL.md) | Polyglot_Thread | Translate preserving structure |
| [`tone-adjustment-polishing`](../tone-adjustment-polishing/SKILL.md) | Tone_Polish | Assertive professional rewrite |
| [`pdf-dialogue`](../pdf-dialogue/SKILL.md) | PDF_QA | Q&A against active document |
| [`generative-drafting`](../generative-drafting/SKILL.md) | Draft_Venom | SME draft from brief |

### Layer 2 — Corporate Office

| ID | Alias | Vars |
|----|-------|------|
| [`email-follow-up`](../email-follow-up/SKILL.md) | Email_FollowUp | `{{SelectedText}}` |
| [`task-identification-extraction`](../task-identification-extraction/SKILL.md) | Task_Extractor | `{{SelectedText}}` |
| [`stylistic-unification`](../stylistic-unification/SKILL.md) | Voice_Unify | `{{SelectedText}}` |
| [`annual-report-synthesizer`](../annual-report-synthesizer/SKILL.md) | Report_Toxin | `{{SelectedText}}` |

### Layer 3 — Swarm-Mind

| ID | Persona | Folder |
|----|---------|--------|
| [`ml-systems-architect`](../ml-systems-architect/SKILL.md) | alpha-architect | `/MachineLearning` |
| [`llm-deployment-architect`](../llm-deployment-architect/SKILL.md) | rag-weaver | `/RAG` |
| [`multimodal-agent-designer`](../multimodal-agent-designer/SKILL.md) | ui-spinner | `/Design` |
| [`s-agent-spatial-architect`](../s-agent-spatial-architect/SKILL.md) | spatial-architect | `/Spatial` |
| [`edge-ai-deployment-specialist`](../edge-ai-deployment-specialist/SKILL.md) | edge-venom | `/Hardware` |
| [`ai-ethics-reviewer`](../ai-ethics-reviewer/SKILL.md) | ethics-reviewer | `/Ethics` |

### Layer 4 — Viral & Elegant

| ID | Pairs with |
|----|------------|
| [`ui-aesthetic-auditor`](../ui-aesthetic-auditor/SKILL.md) | `187webdesign` |
| [`user-journey-mapper`](../user-journey-mapper/SKILL.md) | agent flow design |
| [`component-library-weaver`](../component-library-weaver/SKILL.md) | `187webdev-design-system` |
| [`seo-semantic-optimizer`](../seo-semantic-optimizer/SKILL.md) | DOM/meta audit |
| [`a11y-linting-agent`](../a11y-linting-agent/SKILL.md) | `187webdev-qa` |
| [`persona-simulation-testing`](../persona-simulation-testing/SKILL.md) | `{{Persona}}` var |
| [`copy-conversion-linter`](../copy-conversion-linter/SKILL.md) | `187webdesign` |
| [`responsive-breakpoint-debugger`](../responsive-breakpoint-debugger/SKILL.md) | CSS grid/flex |
| [`npu-performance-linter`](../npu-performance-linter/SKILL.md) | `edge-venom` |
| [`xss-vulnerability-scanner`](../xss-vulnerability-scanner/SKILL.md) | `red-team-widow` |
| [`state-machine-generator`](../state-machine-generator/SKILL.md) | Charlotte states |
| [`auto-doc-generator`](../auto-doc-generator/SKILL.md) | JSDoc README |

## Agent workflow (long-run session)

1. **Read `PLAN.md`** — current phase and blockers (Phase IV).
2. **Run compiler** — `./scripts/187web-compiler.sh` or `.ps1`.
3. **Apply neuro-toxin** — use compiled `neuro_toxin` block.
4. **Load routed skill** — `widow-weaver`, `swarm-mind`, or 187WEBDEV child.
5. **Execute directive** — verbatim from compiled JSON; substitute `{{vars}}`.
6. **Hand off** — `agent-charlotte` (research) or `silk-sandbox` (execution).
7. **Log** — append outcome to `PLAN.md` Session Log.

## Power-mode routing

| Mode | Detected when | Default persona | Default prompt |
|------|---------------|-----------------|----------------|
| `high` | GPU + AC power or ≥8 cores | ui-spinner | generative-drafting |
| `low` | Battery / NPU-only / &lt;4 cores | edge-venom | edge-ai-deployment-specialist |
| `standard` | Everything else | alpha-architect | ml-systems-architect |

Override: `E187WEB_POWER_MODE=high|low|standard`

## Integration map

```
MANIFEST.xml
    ↓ 187web-compiler
    ├→ neuro-toxin (inference profile)
    ├→ widow-weaver (Layer 1–2)
    ├→ swarm-mind (Layer 3)
    ├→ 187WEBDEV suite (Layer 4 UI prompts)
    ├→ agent-charlotte (web crawler, vault relay)
    └→ silk-sandbox (safety sentinel)
         ↓
    OmniQube Render Matrix (WebSocket telemetry)
```

## .zshrc hook (Phase I)

```bash
# 187web compiler hook — recompile persona on directory change
_187web_compiler_hook() {
  command -v 187web-compiler.sh >/dev/null 2>&1 || return 0
  187web-compiler.sh --quiet --write --emit >/dev/null 2>&1 &
}
# Add to chpwd_functions (zsh) or PROMPT_COMMAND (bash)
```

---

*Manifest is the source of truth. Child skills execute; compiler routes.*
