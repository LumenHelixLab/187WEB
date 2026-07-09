# 187REPO-EVAL Rubric Checklist

Use this reference to score each of the 11 categories consistently. Every score needs an evidence source or concrete observation.

---

## 1. Purpose fit

**Question:** Does the candidate solve a real 187web, client, or product need?

### Sub-questions
- [ ] What exact problem or capability gap does it address?
- [ ] Is the problem recurring across 187web projects or one-off?
- [ ] Does it fit the current project roadmap or a near-term milestone?
- [ ] Can the need be met with existing in-house code or skills?

### Evidence sources
- Project brief / user request / milestone document
- README, landing page, feature list
- Comparison with current 187web stack and skills

### Scoring
| Score | Description |
|-------|-------------|
| 5 | Solves a high-priority, recurring problem with no adequate in-house alternative. |
| 3 | Solves a real problem but is partially addressed by existing tooling or skills. |
| 1 | Solves a marginal or theoretical problem; nice-to-have at best. |

### Common guardrails
- Define a narrow scope of use; avoid feature creep.
- Set a trial period with measurable success criteria.
- Document the decision and alternatives considered.

---

## 2. License / legal

**Question:** Is the license OSI-approved, commercial-use compatible, and free of patent/trademark concerns?

### Sub-questions
- [ ] What is the SPDX license identifier?
- [ ] Does the license permit commercial use, modification, and distribution?
- [ ] Are there copyleft obligations that affect 187web proprietary work?
- [ ] Are there patent grants, non-compete clauses, or trademark restrictions?
- [ ] Is the license applied consistently across the repo and its dependencies?

### Evidence sources
- `LICENSE` / `COPYING` file
- `package.json`, `pyproject.toml`, `Cargo.toml` license fields
- OSI license list (https://opensource.org/licenses)
- `NOTICE` / `AUTHORS` files

### Scoring
| Score | Description |
|-------|-------------|
| 5 | Permissive OSI-approved license (e.g., MIT, Apache-2.0, BSD-3-Clause) with no conflicts. |
| 3 | Permissive but with minor attribution/notice requirements or mixed licensing. |
| 1 | Copyleft, custom, proprietary, or unclear license; legal review required. |

### Common guardrails
- Add license attribution to `NOTICE` or credits page.
- Restrict usage to non-core modules until legal review clears.
- Pin a specific version to avoid future license changes.

---

## 3. Maintenance health

**Question:** Is the project actively maintained with responsive maintainers and healthy issue/PR velocity?

### Sub-questions
- [ ] Date of last commit and release?
- [ ] Frequency of commits and releases over the last 12 months?
- [ ] Median time to close issues and merge PRs?
- [ ] Ratio of open to closed issues and PRs?
- [ ] Are maintainers responsive, courteous, and public?
- [ ] Is there a governance model or backup maintainers?

### Evidence sources
- GitHub / GitLab commit graph and releases page
- Issue and PR trackers (open/closed counts, age distribution)
- `MAINTAINERS`, `GOVERNANCE`, or `CONTRIBUTING` files
- Changelog / release notes cadence

### Scoring
| Score | Description |
|-------|-------------|
| 5 | Active development, recent release, fast issue/PR turnover, healthy community. |
| 3 | Maintenance is slower but ongoing; occasional releases and responses. |
| 1 | Stale, abandoned, or single-maintainer bus-factor risk. |

### Common guardrails
- Fork or vendor the dependency if bus-factor is high.
- Set up automated update alerts (Dependabot, Renovate).
- Contribute fixes upstream to build relationship.

---

## 4. Security posture

**Question:** Does the project demonstrate good security hygiene and transparency?

### Sub-questions
- [ ] Known CVEs in the project or its transitive dependencies?
- [ ] Are security advisories published and patched promptly?
- [ ] Is there evidence of third-party audits?
- [ ] Are dependencies pinned and scanned?
- [ ] Does CI include secret scanning, SAST, or SLSA provenance?
- [ ] Are release artifacts signed or reproducible?

### Evidence sources
- GitHub Security Advisories / CVE databases
- `SECURITY.md` policy
- Audit reports (blog posts, docs, issue references)
- CI configuration files (`.github/workflows`, `.gitlab-ci.yml`)
- SBOM or lockfile presence

### Scoring
| Score | Description |
|-------|-------------|
| 5 | Clean CVE record, published security policy, audits, signed releases, dependency scanning. |
| 3 | No major CVEs but limited security signaling; standard hygiene only. |
| 1 | Active/high-severity CVEs, no security policy, or opaque release process. |

### Common guardrails
- Pin to a known-good version and scan in CI.
- Isolate in a sandbox or least-privilege service boundary.
- Subscribe to security advisories and schedule patch cycles.

---

## 5. Accessibility

**Question:** Is accessibility built-in or easily pluggable, with WCAG 2.2 alignment?

### Sub-questions
- [ ] Are UI components keyboard navigable and screen-reader friendly?
- [ ] Does documentation mention a11y or WCAG conformance?
- [ ] Are there automated a11y tests (Axe, Lighthouse, jest-axe)?
- [ ] Is theming flexible enough for high-contrast / focus-visible / reduced-motion?
- [ ] Does it avoid common anti-patterns (div soup, missing labels, color-only feedback)?

### Evidence sources
- Component demos and Storybook
- `a11y`, `accessibility`, or `wcag` docs sections
- Test files and CI checks
- Manual keyboard / screen-reader smoke test

### Scoring
| Score | Description |
|-------|-------------|
| 5 | First-class a11y, WCAG 2.2 AA claims or tests, keyboard/screen-reader support documented. |
| 3 | A11y is possible but requires extra work or add-on packages. |
| 1 | Inaccessible defaults, no a11y docs, or active a11y bugs. |

### Common guardrails
- Budget extra engineering time for a11y remediation.
- Add a11y checks to the project CI pipeline.
- Require keyboard/screen-reader acceptance criteria before release.

---

## 6. Performance / footprint

**Question:** What is the bundle size, runtime cost, cold-start, and memory profile?

### Sub-questions
- [ ] Minified + gzipped bundle size?
- [ ] Tree-shaking support and side-effects declaration?
- [ ] Runtime overhead (CPU, memory, network requests)?
- [ ] Cold-start impact for serverless or edge use?
- [ ] Benchmarks or performance budgets published?

### Evidence sources
- `package.json` size fields / bundlephobia.com / npmgraph.js.org
- Benchmarks in repo or docs
- Lighthouse / WebPageTest profile
- Runtime profiling in a sample integration

### Scoring
| Score | Description |
|-------|-------------|
| 5 | Tiny footprint, tree-shakeable, fast cold-start, published benchmarks. |
| 3 | Acceptable footprint but requires careful import paths or lazy loading. |
| 1 | Bloated, slow cold-start, or high memory usage with no mitigation path. |

### Common guardrails
- Use deep imports or dynamic imports to reduce bundle size.
- Set a performance budget and monitor in CI.
- Lazy-load the dependency on non-critical paths.

---

## 7. Dependency / supply chain

**Question:** What is the transitive risk, and are installs reproducible with a pinning policy?

### Sub-questions
- [ ] How many direct and transitive dependencies?
- [ ] Are any dependencies unmaintained, duplicated, or known risky?
- [ ] Is there a lockfile committed and kept current?
- [ ] Does the project follow semantic versioning?
- [ ] Are install scripts / postinstall hooks present and audited?

### Evidence sources
- Lockfile (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `poetry.lock`, etc.)
- Dependency tree from package manager
- npm / PyPI / crates advisory databases
- `package.json` `scripts` for postinstall behavior

### Scoring
| Score | Description |
|-------|-------------|
| 5 | Minimal, well-maintained dependency tree, reproducible installs, no install scripts. |
| 3 | Moderate dependencies with some risk; lockfile present but not perfect. |
| 1 | Large, risky, or opaque dependency tree; no lockfile or un-audited install scripts. |

### Common guardrails
- Pin versions and review lockfile diffs on updates.
- Run dependency vulnerability scans in CI.
- Prefer packages without postinstall scripts.

---

## 8. Documentation / API stability

**Question:** Is the documentation clear, is the API stable, and is the breaking-change policy reasonable?

### Sub-questions
- [ ] Is there a getting-started guide and API reference?
- [ ] Are examples relevant to 187web use cases?
- [ ] What is the current major version and release cadence?
- [ ] Is there a documented deprecation and breaking-change policy?
- [ ] How many recent breaking changes occurred?

### Evidence sources
- README, docs site, API reference
- Changelog / `CHANGELOG.md` / release notes
- Version history on registry
- Migration guides

### Scoring
| Score | Description |
|-------|-------------|
| 5 | Excellent docs, stable API, clear semver policy, easy migration path. |
| 3 | Adequate docs and mostly stable API but some migration friction. |
| 1 | Poor or missing docs, frequent breaking changes, unclear versioning. |

### Common guardrails
- Wrap the dependency in an internal adapter/facade.
- Budget time for migrations on major version bumps.
- Avoid using experimental or undocumented APIs.

---

## 9. Integration cost

**Question:** How complex is the API surface, what data migration is needed, and how reversible is lock-in?

### Sub-questions
- [ ] How much code change is required to integrate?
- [ ] Does it require new infrastructure, accounts, or external services?
- [ ] Is data import/export well supported?
- [ ] How easy is it to replace or remove later?
- [ ] Does it impose architectural constraints on 187web projects?

### Evidence sources
- API surface inspection
- Quick proof-of-concept spike
- Migration / export docs
- Existing 187web architecture diagrams

### Scoring
| Score | Description |
|-------|-------------|
| 5 | Drop-in integration, no lock-in, easy to reverse, minimal architectural impact. |
| 3 | Moderate integration work; some lock-in but manageable. |
| 1 | Heavy refactoring, proprietary data formats, or high exit cost. |

### Common guardrails
- Abstract the integration behind an internal interface.
- Document an exit plan and data-export procedure.
- Run a time-boxed spike before full commitment.

---

## 10. Privacy / telemetry

**Question:** What data is collected, how long is it retained, and are trackers or hidden telemetry present?

### Sub-questions
- [ ] Does the tool collect user data, usage analytics, or crash reports?
- [ ] Is collection opt-in, opt-out, or unavoidable?
- [ ] Where is data stored and who has access?
- [ ] Are there hidden third-party trackers or network calls?
- [ ] Is there a published privacy policy and DPA?

### Evidence sources
- Privacy policy and terms of service
- Network traffic inspection during usage
- Source code search for analytics/tracking endpoints
- `telemetry`, `analytics`, or `metrics` config options
- GDPR / CCPA compliance statements

### Scoring
| Score | Description |
|-------|-------------|
| 5 | No telemetry, fully local/open-source, or transparent opt-in with clear policy. |
| 3 | Some telemetry but configurable and disclosed; data stays in acceptable regions. |
| 1 | Opaque tracking, unavoidable telemetry, or unclear data handling. |

### Common guardrails
- Disable telemetry in configuration and verify with network inspection.
- Route traffic through a privacy-compliant proxy if needed.
- Document data handling for client compliance audits.

---

## 11. 187web brand fit

**Question:** Does the candidate match the warm-blueprint / Killer Web vibe, Charlotte tone, and lethal precision?

### Sub-questions
- [ ] Does the UX feel polished, modern, and intentional?
- [ ] Is the design language compatible with 187web design tokens?
- [ ] Does the tool enable fast, decisive, high-quality delivery?
- [ ] Would it feel at home in a Charlotte kill-chain demo?
- [ ] Is the default aesthetic aligned with warm-blueprint principles?

### Evidence sources
- Visual demo / screenshots / Storybook
- Design tokens and theming docs
- 187web design system skill (`skills/187webdev-design-system/SKILL.md`)
- Internal brand guidelines

### Scoring
| Score | Description |
|-------|-------------|
| 5 | Immediately on-brand, themeable to 187web tokens, demo-ready. |
| 3 | Neutral or themeable with moderate customization effort. |
| 1 | Clashes with brand direction or requires heavy redesign. |

### Common guardrails
- Build a 187web theme layer or wrapper.
- Limit use to internal tools or non-client-facing surfaces until themed.
- Capture theming work in the project design system backlog.

---

## Final scoring bands

| Total | Recommendation |
|-------|----------------|
| 44–55 | `adopt` |
| 33–43 | `adopt-with-guardrails` |
| 22–32 | `watch` |
| 0–21  | `reject` |

When scoring, document every claim with a source. No score without evidence.
