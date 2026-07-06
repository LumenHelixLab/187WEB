# 187web Phase Roadmap — Template-Mapped Approach

Phases II–IV plotted via **`187webdev-templates`** gallery methodology: each phase
picks one industry **design pole**, one **signature component**, and composes
shared Charlotte primitives — same playbook as `/templates`, applied to the
agentic stack.

**Template index:** `skills/187webdesign/references/TEMPLATES.md`

---

## Phase I — The Nervous System ✅ COMPLETE

| Field | Value |
|-------|-------|
| **Template pole** | **Forge API** (devtool) — terminal dark, mono, live data |
| **Design language** | Abyssal `#080808` + Toxic `#39FF14` + Widow `#FF0000` |
| **Signature component** | **Render Matrix** — OmniQube telemetry panel |
| **Shared primitives** | Compiler JSON, SSE relay, revivescan hook |

**Shipped:**
- `MANIFEST.xml` registry · `187web-compiler` · `telemetry-relay.mjs`
- `public/omniqube.html` · `install-revivescan` · `session-init.ps1`

---

## Phase II — Agentic Sovereignty (Foraging)

| Field | Value |
|-------|-------|
| **Template pole** | **Vault** (fintech) — trust, security, structured data |
| **Design language** | Deep navy trust surfaces + mint confirmation + stat counters |
| **Signature components** | KNOTstore connection panel · Web-Relay auth vault · Safety Sentinel gate |
| **Charlotte skills** | `agent-charlotte` · `silk-sandbox` |

### Approach (copy `app/templates/fintech/page.tsx` structure)

1. **KNOTstore DB (step 4)** — Scaffold `lib/knotstore/` as Vault-style data layer:
   - Stat counters for crawl depth / entities woven / stub pages created
   - Rates-table pattern → connection health matrix (latency, errors, last sync)
   - App-mock panel → KNOTstore schema preview

2. **Safety Sentinel (step 5)** — `silk-sandbox` pre-flight middleware:
   - Security row from Vault template → syscall audit checklist before execute
   - Widow Red flash on boundary violation (matches OmniQube alert bar)

3. **Web-Relay (step 6)** — `agent-charlotte` authenticated tokens:
   - Trust badges UI (Forge API install-command pattern) for token scope display
   - Never store tokens in manifest XML — env + `~/.187web/secrets/`

### Exit criteria

- Charlotte crawl writes to KNOTstore SQLite with bidirectional wikilinks
- Every `silk-sandbox` run passes pre-flight audit or aborts with Red alert
- Web-Relay tokens rotate without vault exposure

---

## Phase III — The Killer UI (Telemetry & Spinner)

| Field | Value |
|-------|-------|
| **Template pole** | **Nimbus** (SaaS) — dark gradient, glow, bento grid |
| **Design language** | Dopamine dark + gradient glow on active persona |
| **Signature components** | Bento Render Matrix · Atomic widget library · A11y patch rail |
| **Charlotte skills** | `swarm-mind` UI-Spinner · `a11y-linting-agent` prompt |

### Approach (copy `app/templates/saas/page.tsx` + OmniQube)

1. **Telemetry injection (step 7)** — Upgrade OmniQube to Nimbus bento:
   - Feature bento → compiler metrics tiles (power, persona, layer, toxicity)
   - Logo cloud → active skill badges (widow-weaver, swarm-mind, etc.)
   - Pricing-tier pattern → neuro-toxin profile presets (Greedy / Balanced / Creative)

2. **Atomic component library (step 8)** — UI-Spinner refactor:
   - Extract OmniQube panels into `components/charlotte/` (RenderMatrix, NeuroSlider, DirectivePane)
   - One bold signature: glowing persona indicator ring (Nimbus glow rule)
   - Surrounding UI quiet — steel borders, ash labels

3. **A11y integration (step 9)** — Gate every UI-Spinner output:
   - Run `a11y-linting-agent` manifest prompt post-generation
   - Patch-file output → PR-ready diff (WCAG 2.2 AA from `187webdev-qa`)
   - Spend boldness on persona ring only; everything else passes contrast lint

### Exit criteria

- `/omniqube` route (Next.js) replaces static HTML with server-first components
- Charlotte widgets reusable across HOOT / 187webdesign dashboards
- Zero UI-Spinner output ships without A11y patch pass

---

## Phase IV — The Infinite Session (State & Planning)

| Field | Value |
|-------|-------|
| **Template pole** | **Lattice Lab** (scientific) — serif + mono, journal, citations |
| **Design language** | Calm editorial structure for plans, logs, state machines |
| **Signature components** | PLAN.md journal view · State machine diagram · Red-team findings index |
| **Charlotte skills** | `187web-manifest` · `swarm-mind` Red-Team Widow · `neuro-toxin` |

### Approach (copy `app/templates/scientific/page.tsx` structure)

1. **PLAN.md loop (step 10)** — Journal-style session index:
   - Abstract block → current phase summary
   - Captioned figures → Mermaid state machines from `state-machine-generator`
   - References section → bidirectional links to vault notes / PRs

2. **Red-team daemon (step 11)** — Background security journal:
   - Citation-style finding IDs (CVE format)
   - Red-Team Widow persona runs `xss-vulnerability-scanner` on schedule
   - Findings append to `PLAN.md` under `## Security Journal`

3. **NPU self-regulation (step 12)** — Thermal-aware neuro-toxin:
   - `npu-performance-linter` feeds temperature telemetry → toxicity slider
   - Scientific figure → time-series chart of power_mode shifts
   - Auto-downgrade to `edge-venom` when thermal threshold exceeded

### Exit criteria

- Every session starts with `session-init` + PLAN.md abstract read
- State machine has no dead-end states (Charlotte: Idle → Scanning → Weaving → Abort)
- Red-team journal has dated, reproducible findings

---

## Cross-phase composition rules (from 187webdev-templates)

| Rule | Application |
|------|-------------|
| **Choose one pole per phase** | Forge API → Vault → Nimbus → Lattice Lab |
| **One bold signature each** | Render Matrix → KNOTstore panel → Persona glow ring → State journal |
| **Shared primitives** | Compiler JSON, Charlotte palette, `TemplateBar`-style chrome |
| **Pre-ship gate** | `187webdev-qa` before any Phase III UI ships |
| **Static-export safe** | All telemetry pages work without client JS where possible |

## Recommended build order

```
Phase I ✅ → Phase II (data/trust) → Phase III (UI/telemetry) → Phase IV (planning/daemons)
```

Phase II before III: KNOTstore and Safety Sentinel must exist before Nimbus UI
displays real crawl data. Phase IV daemons wrap the finished stack.

## Next session command

```powershell
.\.grok\skills\187web-manifest\scripts\session-init.ps1
```

Then begin **Phase II step 4**: scaffold `lib/knotstore/` using Vault fintech
template patterns.