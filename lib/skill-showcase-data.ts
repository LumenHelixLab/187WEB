/**
 * Data source for the 187SKILLS showcase pages (Phase 5).
 * Keep this file in sync with .claude/skills/<name>/SKILL.md and
 * scripts/187repo.sh / 187repo.ps1 command lists.
 */

export type SkillTemplate = {
  name: string;
  when: string;
};

export type SkillRoute = {
  name: string;
  when: string;
};

export type SkillShowcaseData = {
  id: string;
  name: string;
  tagline: string;
  color: string;
  description: string;
  triggers: string[];
  useCases: string[];
  outputs: string[];
  routesTo?: SkillRoute[];
  templates?: SkillTemplate[];
  related: string[];
};

export const skillShowcases: SkillShowcaseData[] = [
  {
    id: "natasha",
    name: "187NATASHA",
    tagline: "Security + red-team ethos",
    color: "#f43f5e",
    description:
      "NATASHA is the 187WEB red-team / security function: threat-surface audits, contract and test assurance, access-gate review, and source-backed risk research with claim discipline.",
    triggers: [
      "/187natasha",
      "NATASHA",
      "security audit",
      "red team",
      "threat surface",
      "contract assurance",
      "risk research",
      "quantum claim audit",
      "quantum non-claim",
      "unsupported quantum advantage",
    ],
    useCases: [
      "Threat-surface and security-gate audits",
      "Contract / DeFi assurance and responsible disclosure",
      "Test and validation review with bias and accessibility checks",
      "Source-backed risk research and claim audit",
      "Quantum-claim audit and non-claim review (unsupported advantage, hardware results, scalability claims)",
    ],
    outputs: [
      "Security profile and findings",
      "Severity / confidence matrix",
      "Access-gate review",
      "Risk research packet",
      "Quantum claim / non-claim review",
      "Provenance / run lineage",
    ],
    routesTo: [
      { name: "187SCAN", when: "health, SEO, or security scan" },
      { name: "187STANDARD", when: "scoring against 187WEB quality gates" },
      { name: "187TEST", when: "assessment and validation review" },
    ],
    templates: [
      { name: "security-audit-report.md", when: "Structured security findings" },
      { name: "risk-research-packet.md", when: "Source-backed risk review" },
    ],
    related: ["chain", "test", "scan", "standard"],
  },
  {
    id: "chain",
    name: "187CHAIN",
    tagline: "EVM and DeFi assurance",
    color: "#f59e0b",
    description:
      "Scoped smart-contract review with separate severity and confidence, DeFi risk vectors, and responsible disclosure — no live keys or exploits.",
    triggers: ["/187 chain", "187CHAIN", "solidity audit", "defi risk"],
    useCases: ["Scope an audit", "Map DeFi risks", "Retest findings"],
    outputs: ["Findings", "Severity/confidence", "DeFi vector report", "Disclosure notes"],
    related: ["natasha", "research"],
  },
  {
    id: "gsap",
    name: "187GSAP",
    tagline: "GSAP timeline + ScrollTrigger foundation",
    color: "#85c918",
    description:
      "Animation choreography with GSAP timelines, ScrollTrigger pinning/scrubbing, and performance-safe motion patterns for React and Next.js.",
    triggers: ["/187gsap", "187GSAP", "gsap timeline", "scrolltrigger", "animation choreograph", "gsap react"],
    useCases: [
      "Build a GSAP timeline for a page or component",
      "Add ScrollTrigger pinning, scrub, or progress-linked animation",
      "Standardize easing, stagger, and reduced-motion fallbacks",
    ],
    outputs: [
      "Timeline spec (targets, duration, easing, stagger)",
      "ScrollTrigger map (trigger, start/end, scrub, pin)",
      "Easing and performance notes",
      "Reduced-motion fallback plan",
      "Next actions",
    ],
    routesTo: [
      { name: "187MOTION", when: "the work should become a reusable hook" },
      { name: "187SCROLL", when: "scroll drives a 3D camera or scene" },
      { name: "187ACCESS+", when: "motion triggers vestibular or photosensitive concerns" },
    ],
    templates: [
      { name: "gsap-timeline.md", when: "A new timeline-driven animation" },
      { name: "scrolltrigger-map.md", when: "Mapping scroll progress to animation" },
    ],
    related: ["motion", "scroll", "type", "craft"],
  },
  {
    id: "type",
    name: "187TYPE",
    tagline: "Kinetic / variable 3D typography",
    color: "#f472b6",
    description:
      "Reactive, variable, and three-dimensional typography systems that respond to scroll, audio, or interaction.",
    triggers: ["/187type", "187TYPE", "kinetic type", "variable font", "3d typography", "text motion", "typography animation"],
    useCases: [
      "Design kinetic headlines and hero type",
      "Animate variable-font axes on interaction or scroll",
      "Build 3D text scenes with R3F/Three.js",
    ],
    outputs: [
      "Type motion spec",
      "Variable-font axis plan",
      "3D text render notes",
      "Readability / accessibility review",
      "Next actions",
    ],
    routesTo: [
      { name: "187GSAP", when: "timeline or scrolltrigger sequencing is needed" },
      { name: "187HERO", when: "type lives inside a full-screen hero" },
      { name: "187ACCESS+", when: "readability, motion, or photosensitive review is required" },
    ],
    templates: [
      { name: "kinetic-type-spec.md", when: "Designing animated type" },
      { name: "variable-font-plan.md", when: "Animating font axes" },
    ],
    related: ["gsap", "motion", "hero", "craft"],
  },
  {
    id: "model",
    name: "187MODEL",
    tagline: "3D product showcase / configurator",
    color: "#22d3ee",
    description:
      "Interactive 3D product viewers with model loading, material variants, camera presets, and configurator UX.",
    triggers: ["/187model", "187MODEL", "product viewer", "3d configurator", "model showcase", "three.js product", "r3f product"],
    useCases: [
      "Build a 3D product viewer",
      "Add material, color, or feature variants",
      "Define camera presets and orbit constraints",
    ],
    outputs: [
      "Model loading and format plan",
      "Variant state map",
      "Camera rig spec",
      "Performance budget",
      "Next actions",
    ],
    routesTo: [
      { name: "187CRAFT", when: "UI/UX and design-token work is needed" },
      { name: "187HERO", when: "the model anchors a full-screen hero" },
      { name: "187ACCESS+", when: "the viewer needs keyboard/screen-reader support" },
    ],
    templates: [
      { name: "product-viewer-spec.md", when: "A 3D product showcase" },
      { name: "configurator-state-map.md", when: "Variant selection and state" },
    ],
    related: ["craft", "viz", "hero", "motion"],
  },
  {
    id: "scroll",
    name: "187SCROLL",
    tagline: "Scroll-driven 3D camera narratives",
    color: "#a78bfa",
    description:
      "Long-form scroll narratives that drive 3D camera paths, scene transitions, and progress-based reveals.",
    triggers: ["/187scroll", "187SCROLL", "scroll narrative", "camera scroll", "3d scroll story", "scroll-driven scene", "scroll camera"],
    useCases: [
      "Build a scroll-driven 3D scene",
      "Animate a camera path tied to scroll progress",
      "Sequence scene reveals and transitions",
    ],
    outputs: [
      "Scroll progress map",
      "Camera path spec",
      "Scene sequence",
      "Performance notes",
      "Next actions",
    ],
    routesTo: [
      { name: "187GSAP", when: "GSAP ScrollTrigger drives the scroll layer" },
      { name: "187HERO", when: "the narrative starts with an immersive hero" },
      { name: "187ACCESS+", when: "scroll hijacking or motion sensitivity is a concern" },
    ],
    templates: [
      { name: "scroll-narrative-spec.md", when: "A scroll-driven 3D story" },
      { name: "camera-path-plan.md", when: "Defining a scroll-linked camera" },
    ],
    related: ["gsap", "hero", "viz", "motion"],
  },
  {
    id: "audio",
    name: "187AUDIO",
    tagline: "Audio-reactive 3D geometry",
    color: "#f87171",
    description:
      "Web Audio and Three.js geometry that reacts to frequency data, beats, and microphone input in real time.",
    triggers: ["/187audio", "187AUDIO", "audio reactive", "music visualizer", "frequency mesh", "mic input", "audio three.js"],
    useCases: [
      "Build audio-reactive mesh or particle systems",
      "Sync visuals to frequency bands or beat detection",
      "Add microphone-driven motion with permission handling",
    ],
    outputs: [
      "Audio node graph",
      "Frequency-band mapping",
      "Geometry reactivity spec",
      "Permission and performance notes",
      "Next actions",
    ],
    routesTo: [
      { name: "187VIZ", when: "the output is a data-driven visualization" },
      { name: "187MOTION", when: "reusable audio-reactive hooks are needed" },
      { name: "187ACCESS+", when: "auto-play audio or flashing motion is involved" },
    ],
    templates: [
      { name: "audio-reactive-spec.md", when: "Building a music-reactive scene" },
      { name: "frequency-mapping.md", when: "Mapping audio bands to geometry" },
    ],
    related: ["viz", "motion", "model", "hero"],
  },
  {
    id: "viz",
    name: "187VIZ",
    tagline: "3D network / node-edge data visualization",
    color: "#2dd4bf",
    description:
      "Three.js data visualizations for networks, graphs, force layouts, and spatial data stories.",
    triggers: ["/187viz", "187VIZ", "network viz", "node graph", "3d data viz", "force layout", "spatial data story"],
    useCases: [
      "Build a 3D network or node-edge graph",
      "Animate data updates and selection states",
      "Create spatial data stories with camera guidance",
    ],
    outputs: [
      "Data schema and source plan",
      "Layout algorithm choice",
      "Interaction plan (hover, select, filter)",
      "Render performance notes",
      "Next actions",
    ],
    routesTo: [
      { name: "187MODEL", when: "nodes need detailed 3D product/model representations" },
      { name: "187SCROLL", when: "the visualization is part of a scroll narrative" },
      { name: "187ACCESS+", when: "the graph needs screen-reader or keyboard navigation" },
    ],
    templates: [
      { name: "network-viz-spec.md", when: "A node-edge network visualization" },
      { name: "data-storyboard.md", when: "A spatial data story" },
    ],
    related: ["model", "scroll", "audio", "motion"],
  },
  {
    id: "motion",
    name: "187MOTION",
    tagline: "Reusable R3F/GSAP animation hooks",
    color: "#fbbf24",
    description:
      "A library of reusable React Three Fiber and GSAP hooks for common animation patterns, entrance sequences, and scroll triggers.",
    triggers: ["/187motion", "187MOTION", "motion hooks", "r3f animation", "usegsap", "animation hook", "reusable animation"],
    useCases: [
      "Create reusable animation hooks",
      "Standardize entrance and transition effects",
      "Compose scroll-triggered and interaction-driven animations",
    ],
    outputs: [
      "Hook API and signature",
      "Usage examples",
      "Dependency list",
      "Motion accessibility notes",
      "Next actions",
    ],
    routesTo: [
      { name: "187GSAP", when: "the hook wraps GSAP timelines or ScrollTrigger" },
      { name: "187TYPE", when: "typography-specific motion is needed" },
      { name: "187ACCESS+", when: "reduced-motion or vestibular safety must be handled" },
    ],
    templates: [
      { name: "motion-hook-spec.md", when: "Designing a reusable animation hook" },
      { name: "entrance-sequence-plan.md", when: "Standardizing entrance effects" },
    ],
    related: ["gsap", "type", "scroll", "craft"],
  },
  {
    id: "hero",
    name: "187HERO",
    tagline: "Full-screen immersive 3D hero systems",
    color: "#39FF14",
    description:
      "Full-screen immersive hero sections with WebGL/R3F backgrounds, parallax layers, and scroll-linked CTAs.",
    triggers: ["/187hero", "187HERO", "hero scene", "immersive hero", "webgl background", "full screen 3d", "hero three.js"],
    useCases: [
      "Build a WebGL/R3F hero background",
      "Add parallax or depth layers to a hero",
      "Link the hero to a scroll CTA or transition",
    ],
    outputs: [
      "Hero scene spec",
      "Layer stack (background, mid, foreground, CTA)",
      "Scroll / link integration plan",
      "Performance budget",
      "Next actions",
    ],
    routesTo: [
      { name: "187MODEL", when: "the hero features a 3D product or model" },
      { name: "187SCROLL", when: "the hero transitions into a scroll narrative" },
      { name: "187ACCESS+", when: "the hero has motion, auto-play, or contrast concerns" },
    ],
    templates: [
      { name: "hero-scene-spec.md", when: "A full-screen immersive hero" },
      { name: "hero-performance-budget.md", when: "Defining hero load and runtime limits" },
    ],
    related: ["scroll", "model", "type", "motion"],
  },

  {
    id: "free",
    name: "187FREE",
    tagline: "No-cost stack engine",
    color: "#10b981",
    description:
      "Finds practical free, free-tier, open-source, local-first, public-API, and low-cost bootstrap solutions for software, research, civic tech, education, and client-budget projects.",
    triggers: ["/187free", "187FREE", "free stack", "free solution", "cheapest way", "no-cost option"],
    useCases: [
      "No-cost stack for a landing page, MVP, demo, or client project",
      "Open-source or local-first alternatives to paid tools",
      "Free public APIs, datasets, or hosting tiers",
    ],
    outputs: [
      "Restated need",
      "Best free pick with justification",
      "Two backup options",
      "Complete free stack recipe",
      "Privacy / sensitivity review",
      "Upgrade path when limits hit",
    ],
    routesTo: [
      { name: "187research", when: "building a research lab or public demo with free hosting" },
      { name: "187repo + 187craft", when: "compliance, enterprise SLA, or regulated data" },
    ],
    templates: [
      { name: "free-stack-recipe.md", when: "A common recipe matches the need" },
      { name: "tool-review.md", when: "Comparing and vetting a tool" },
    ],
    related: ["research", "repo", "craft"],
  },
  {
    id: "research",
    name: "187RESEARCH",
    tagline: "Research-grade lab engine",
    color: "#6366f1",
    description:
      "Routes research questions through scientific, mathematical, biomedical, software, and scholarly databases; classifies claims; builds reproducible lab artifacts; and converts findings into source-backed notes.",
    triggers: [
      "/187research",
      "187RESEARCH",
      "research this",
      "source this",
      "build a lab",
      "literature review",
      "claim audit",
      "quantum algorithm",
      "quantum circuit design",
      "quantum resource estimate",
      "qiskit",
      "circuit optimize",
    ],
    useCases: [
      "Searching scholarly, biomedical, mathematical, or software sources",
      "Building a reproducible computational lab or public research page",
      "Auditing claims and separating proof from pattern",
      "Quantum algorithm selection, circuit design, and resource estimation",
    ],
    outputs: [
      "Research need & domain classification",
      "Best source routes & query plan",
      "Evidence ladder",
      "Lab artifact plan",
      "Reproducibility checklist",
      "Citation / source lineage",
      "Quantum circuit metrics, equivalence notes, and resource estimates (when applicable)",
    ],
    routesTo: [
      { name: "187free", when: "the lab needs free hosting or tooling" },
      { name: "187publish", when: "releasing findings publicly" },
    ],
    templates: [
      { name: "research-question.md", when: "Scoping a new research question" },
      { name: "literature-review.md", when: "Synthesizing multiple sources" },
      { name: "computational-lab.md", when: "Building a reproducible notebook" },
      { name: "dataset-card.md", when: "Documenting a dataset with FAIR metadata" },
      { name: "claim-audit.md", when: "Auditing claims against the evidence ladder" },
    ],
    related: ["free", "docs", "publish"],
  },
  {
    id: "seo",
    name: "187SEO",
    tagline: "Policy-aware search optimization",
    color: "#a855f7",
    description:
      "Makes 187WEB public work discoverable through traditional SEO, answer-engine optimization (AEO), generative-engine optimization (GEO), structured data, technical audits, content strategy, and search analytics.",
    triggers: ["/187seo", "187SEO", "seo audit", "technical seo", "content brief", "schema plan", "search console"],
    useCases: [
      "Technical SEO audits and page audits",
      "Content briefs and keyword-driven strategy",
      "Schema / structured-data planning",
      "Launch readiness and migration safety",
    ],
    outputs: [
      "Mode & findings",
      "Prioritized recommendations",
      "Schema / structured-data plan",
      "Content brief",
      "Risk / spam review",
      "Quick wins vs long-term bets",
    ],
    routesTo: [
      { name: "187craft", when: "recommendations require UI/component changes" },
      { name: "187launch", when: "launch-readiness and GTM alignment" },
    ],
    templates: [
      { name: "site-audit.md", when: "Full-site technical, content, and off-site audit" },
      { name: "page-audit.md", when: "Single-page on-page SEO review" },
      { name: "content-brief.md", when: "Keyword-driven content plan" },
      { name: "schema-plan.md", when: "Structured-data rollout" },
      { name: "search-console-analysis.md", when: "Interpreting Search Console / analytics" },
    ],
    related: ["craft", "launch", "access", "publish"],
  },
  {
    id: "revenue",
    name: "187REVENUE",
    tagline: "Ethical revenue architecture",
    color: "#f97316",
    description:
      "Designs, audits, and implements revenue systems: pricing models, payment integrations, subscriptions, affiliates, coupons, dropshipping, sponsorships, licensing, and commerce operations.",
    triggers: ["/187revenue", "187REVENUE", "revenue model", "pricing strategy", "payment integration", "subscription system", "affiliate system"],
    useCases: [
      "Revenue model, offer ladder, or pricing page",
      "Payment processor, subscription, or billing logic",
      "Affiliate, coupon, deal, or dropshipping systems",
      "Refund, chargeback, tax, and legal-review gates",
    ],
    outputs: [
      "Recommended model(s)",
      "Stack / integration plan",
      "Offer ladder / packaging",
      "Disclosure & compliance plan",
      "Risk & margin review",
      "187SEO / 187ACCESS+ / 187INCLUDE gates",
    ],
    routesTo: [
      { name: "187craft", when: "checkout, pricing page, or dashboard UI" },
      { name: "187launch", when: "GTM, campaign, and sponsorship timing" },
      { name: "187seo", when: "deal-page and product-page strategy" },
      { name: "187ACCESS+ / 187INCLUDE+", when: "public checkout, forms, and pricing pages" },
    ],
    templates: [
      { name: "pricing-architecture.md", when: "Designing tiers and offer ladders" },
      { name: "payment-integration-plan.md", when: "Processor, webhooks, and billing logic" },
      { name: "affiliate-disclosure-plan.md", when: "Documenting affiliate relationships" },
      { name: "coupon-deal-plan.md", when: "Coupons, discounts, and deal pages" },
      { name: "dropshipping-risk-review.md", when: "Supplier, margin, and compliance risks" },
      { name: "revenue-dashboard-spec.md", when: "Metrics, sources, and reporting views" },
    ],
    related: ["craft", "launch", "seo", "access", "include", "publish"],
  },
  {
    id: "docs",
    name: "187DOCS",
    tagline: "Documentation architecture engine",
    color: "#0ea5e9",
    description:
      "Designs, writes, audits, and repairs documentation systems following the Diátaxis framework: READMEs, install guides, how-to guides, reference docs, API docs, SOPs, changelogs, and drift repair.",
    triggers: ["/187docs", "187DOCS", "docs this", "write README", "install guide", "quickstart", "how to guide", "API docs"],
    useCases: [
      "Project docs and READMEs",
      "Install guides, quickstarts, and how-to guides",
      "API docs, SOPs, and user manuals",
      "Docs drift audits and cross-surface sync",
    ],
    outputs: [
      "Audience & doc-type mapping",
      "Structure & draft content",
      "Code / command examples",
      "Cross-references",
      "Drift repair notes",
      "187WRITE polish pass",
    ],
    routesTo: [
      { name: "187write", when: "polishing public-facing copy" },
      { name: "187research", when: "docs cite papers, APIs, or datasets" },
      { name: "187ACCESS+ / 187INCLUDE+", when: "publishing public docs" },
      { name: "187publish", when: "final sync across surfaces" },
    ],
    templates: [
      { name: "README.md", when: "Project landing doc" },
      { name: "install-guide.md", when: "Step-by-step environment setup" },
      { name: "quickstart.md", when: "First success in minutes" },
      { name: "how-to-guide.md", when: "Goal-oriented task instructions" },
      { name: "reference-doc.md", when: "Fact lookup, commands, schemas" },
      { name: "explanation-doc.md", when: "Conceptual background and why" },
      { name: "troubleshooting-guide.md", when: "Error diagnosis and recovery" },
      { name: "SOP.md", when: "Repeatable operational procedure" },
      { name: "API-docs.md", when: "API endpoint and schema reference" },
      { name: "changelog-entry.md", when: "Version change entry" },
    ],
    related: ["write", "research", "access", "include", "publish"],
  },
  {
    id: "learn",
    name: "187LEARN",
    tagline: "Learning experience engine",
    color: "#eab308",
    description:
      "Designs courses, curricula, lessons, workshops, microlearning, and accessible learning experiences that feed docs, SEO, revenue, and testing workflows.",
    triggers: ["/187learn", "187LEARN", "course architect", "study plan", "lesson plan", "syllabus", "workshop", "learning path"],
    useCases: [
      "Courses and tutorial series",
      "Study plans and learning paths",
      "Instructor and learner guides",
      "Docs-to-course conversion",
    ],
    outputs: [
      "Learning outcomes",
      "Audience profile",
      "Sequence / scope",
      "Lesson plans",
      "Assessments & 187TEST integration",
      "Accessibility plan",
      "Downstream hooks",
    ],
    routesTo: [
      { name: "187write", when: "polishing public course copy" },
      { name: "187test", when: "quizzes and knowledge checks" },
      { name: "187ACCESS+", when: "accessible learning design" },
      { name: "187seo", when: "course discoverability" },
      { name: "187revenue", when: "paid course or certification offers" },
      { name: "187publish", when: "final course surface sync" },
    ],
    templates: [
      { name: "course-outline.md", when: "Full course map" },
      { name: "lesson-plan.md", when: "Single lesson" },
      { name: "study-plan.md", when: "Self-paced learner schedule" },
      { name: "workshop-runbook.md", when: "Facilitator guide" },
    ],
    related: ["test", "access", "seo", "revenue", "docs", "publish"],
  },
  {
    id: "test",
    name: "187TEST",
    tagline: "Assessment & validation engine",
    color: "#ef4444",
    description:
      "Builds quizzes, tests, polls, surveys, rubrics, question banks, and assessment analytics with bias and accessibility review baked in.",
    triggers: ["/187test", "187TEST", "quiz builder", "test builder", "poll builder", "survey builder", "rubric builder"],
    useCases: [
      "Quizzes and knowledge checks for a course",
      "Polls and surveys for research or product feedback",
      "Rubrics and question banks",
      "Assessment analytics",
    ],
    outputs: [
      "Item list & rubric",
      "Bias review",
      "Accessibility review",
      "Data-use statement",
      "Analytics plan",
      "Export plan",
      "Human-review gate",
    ],
    routesTo: [
      { name: "187learn", when: "assessments belong inside a course" },
      { name: "187ACCESS+", when: "public-facing assessment" },
      { name: "187INCLUDE+", when: "forms collect identity data" },
      { name: "187publish", when: "final surface sync" },
    ],
    templates: [
      { name: "quiz.md", when: "Multiple-choice, checkbox, or short-answer quiz" },
      { name: "survey.md", when: "Feedback or validation survey" },
      { name: "rubric.md", when: "Scoring guide for projects or workshops" },
      { name: "poll.md", when: "Quick single-question poll" },
    ],
    related: ["learn", "access", "include", "research", "publish"],
  },
  {
    id: "access",
    name: "187ACCESS+",
    tagline: "Disability access + assistive-tech engine",
    color: "#ec4899",
    description:
      "Audits and improves disability access and assistive-technology support: blind/low-vision, Deaf/HoH, motor/physical, speech, vestibular, photosensitive, and assistive-tech compatibility. Keeps WCAG, ARIA, screen-reader, keyboard/switch, caption/transcript, and focus-order concerns in one place.",
    triggers: [
      "/187access-plus",
      "187ACCESS+",
      "a11y",
      "wcag",
      "accessibility audit",
      "blind user",
      "screen reader",
      "low vision",
      "color contrast",
      "deaf",
      "captions",
      "transcripts",
      "audio description",
      "motor access",
      "switch control",
      "keyboard navigation",
      "focus order",
      "tremor friendly",
      "voice control",
      "braille display",
      "magnifier",
      "WCAG",
      "ARIA",
      "a11y audit",
    ],
    useCases: [
      "Blind / screen-reader audit for pages, apps, forms, and docs",
      "Low-vision review: contrast, zoom, reflow, focus indicators",
      "Deaf/HoH captions, transcripts, and audio-description planning",
      "Motor/switch/eye-gaze navigation and keyboard maps",
      "Physical/tremor-friendly target sizing and gesture review",
      "Vestibular motion review and photosensitive safety checks",
      "Accessible forms, errors, and assistive-tech compatibility",
    ],
    outputs: [
      "Accessibility profile",
      "WCAG/ARIA findings with severity",
      "Screen-reader test plan",
      "Caption/transcript plan",
      "Keyboard/switch map",
      "Color-contrast report",
      "Focus-order diagram",
      "Accommodation plan",
      "Validation steps",
    ],
    routesTo: [
      { name: "187INCLUDE+", when: "forms or content touch identity" },
      { name: "187craft", when: "design-level fixes" },
      { name: "187test", when: "accessible quiz or survey review" },
      { name: "187publish", when: "gating public pages before release" },
      { name: "187docs", when: "access statements and docs" },
    ],
    templates: [
      { name: "access-audit-report.md", when: "Structured findings for a page or flow" },
      { name: "accommodation-plan.md", when: "Consent-first support plan" },
      { name: "wcag-plus-checklist.md", when: "Pre-publish WCAG+ checklist" },
      { name: "assistive-tech-scout.md", when: "Tool recommendations for an access need" },
      { name: "screen-reader-test-plan.md", when: "Planning screen-reader validation" },
      { name: "caption-transcript-plan.md", when: "Planning media accessibility" },
    ],
    related: ["include", "craft", "test", "docs", "publish"],
  },
  {
    id: "version",
    name: "187VERSION",
    tagline: "Version & release control engine",
    color: "#64748b",
    description:
      "Controls change across the 187WEB suite: version bumps, changelogs, migration notes, compatibility matrices, deprecations, and adapter sync.",
    triggers: ["/187version", "187VERSION", "version bump", "semver", "changelog", "release notes", "migration guide", "deprecation"],
    useCases: [
      "SemVer decisions for suite upgrades",
      "Changelog and release notes",
      "Migration guides for breaking changes",
      "Compatibility and deprecation plans",
      "Adapter version sync",
    ],
    outputs: [
      "Version decision",
      "Changelog entry",
      "Migration notes",
      "Compatibility matrix",
      "Deprecation notices",
      "Adapter sync checklist",
      "Release plan",
    ],
    routesTo: [
      { name: "187docs", when: "versioning docs, install guides, and API references" },
      { name: "187write", when: "polishing release prose" },
      { name: "187publish", when: "final synchronization gate" },
      { name: "187repo", when: "branch naming, CI, and GitHub release mechanics" },
    ],
    templates: [
      { name: "changelog-entry.md", when: "Drafting a single version block" },
      { name: "migration-guide.md", when: "Breaking-change migration steps" },
      { name: "release-notes.md", when: "Human-friendly release notes" },
      { name: "version-bump-checklist.md", when: "Verifying files before a bump" },
    ],
    related: ["docs", "write", "publish", "repo"],
  },
  {
    id: "publish",
    name: "187PUBLISH",
    tagline: "Release synchronization engine",
    color: "#14b8a6",
    description:
      "Final gate for public releases. Audits every surface for drift, synchronizes docs, READMEs, command pages, adapters, app routes, and produces a go/no-go decision.",
    triggers: ["/187publish", "187PUBLISH", "publish audit", "release sync", "docs drift", "showcase drift", "GitHub Pages sync"],
    useCases: [
      "Pre-release sync audits",
      "Docs / showcase / README drift repair",
      "GitHub Pages launch checklist",
      "SEO / accessibility / inclusion publish checks",
    ],
    outputs: [
      "Surface inventory",
      "Drift findings",
      "Sync actions",
      "Release checklist",
      "SEO publish check",
      "Accessibility publish check",
      "Final go/no-go",
    ],
    routesTo: [
      { name: "187version", when: "tag and changelog verification" },
      { name: "187craft", when: "screenshots, demos, and visual assets" },
      { name: "187launch", when: "launch-page copy and campaign alignment" },
      { name: "187repo", when: "CI status and GitHub release mechanics" },
    ],
    templates: [
      { name: "release-sync-plan.md", when: "Mapping every surface to its required update" },
      { name: "publish-gate-report.md", when: "Final go/no-go report" },
      { name: "github-pages-launch-checklist.md", when: "Updating the GitHub Pages showcase" },
      { name: "adapter-sync-checklist.md", when: "Regenerating model adapters" },
    ],
    related: ["version", "docs", "write", "access", "include", "seo", "repo", "launch"],
  },
  {
    id: "command",
    name: "187COMMAND",
    tagline: "Universal command surface",
    color: "#f43f5e",
    description:
      "The universal 187WEB command surface and intent router. Parses aliases, modes, and depths; routes ambiguous requests to the right skill; and exposes the `/187 <alias> [target] [mode] [depth]` grammar.",
    triggers: ["/187", "187COMMAND", "187", "cmd", "command router", "route this", "187 this"],
    useCases: [
      "Opening the universal slash-command surface",
      "Resolving short aliases to canonical skills",
      "Routing ambiguous or universal requests",
      "Setting workflow mode and output depth",
    ],
    outputs: [
      "Parsed intent",
      "Resolved skill alias",
      "Workflow mode (solo/assist/flow/release)",
      "Output depth (brief/report/deep)",
      "Routed directive",
      "Approval options when ambiguous",
    ],
    routesTo: [
      { name: "187report", when: "the request needs a compact report or approval artifact first" },
      { name: "187flow", when: "the goal spans multiple skills or surfaces" },
      { name: "187repo", when: "the request involves repo generation, deploy, or installer" },
    ],
    templates: [
      { name: "command-intent.md", when: "Capturing parsed intent and routing decision" },
      { name: "alias-resolution.md", when: "Mapping a legacy or ambiguous alias to a canonical skill" },
    ],
    related: ["report", "flow", "repo"],
  },
  {
    id: "report",
    name: "187REPORT",
    tagline: "Status + audit reports",
    color: "#8b5cf6",
    description:
      "Creates compact reports, status summaries, audit artifacts, and approval documents across the 187WEB suite.",
    triggers: ["/187report", "187REPORT", "rpt", "report", "status", "summary", "audit artifact", "approval doc"],
    useCases: [
      "Status reports and health summaries",
      "Audit artifacts with findings and recommendations",
      "Approval documents with go/no-go decisions",
      "Metrics and dashboard briefs",
    ],
    outputs: [
      "Report scope",
      "Key findings",
      "Prioritized recommendations",
      "Approval request",
      "Risk notes",
      "Next actions",
    ],
    routesTo: [
      { name: "187docs", when: "the report becomes persistent documentation" },
      { name: "187write", when: "polishing public or executive prose" },
      { name: "187scan", when: "the report requires inspection data" },
      { name: "187publish", when: "releasing the report publicly" },
    ],
    templates: [
      { name: "status-report.md", when: "Regular status or health summary" },
      { name: "audit-artifact.md", when: "Structured audit findings and approvals" },
    ],
    related: ["docs", "write", "scan", "publish"],
  },
  {
    id: "scan",
    name: "187SCAN",
    tagline: "Health + security scanner",
    color: "#06b6d4",
    description:
      "Inspects repositories, sites, docs, apps, and external surfaces for health, SEO, security, accessibility, and standard compliance.",
    triggers: ["/187scan", "187SCAN", "scan", "audit", "health check", "inspect", "security scan", "seo scan"],
    useCases: [
      "Repo, site, docs, and app health scans",
      "SEO and structured-data audits",
      "Security and dependency reviews",
      "Accessibility and inclusion scans",
    ],
    outputs: [
      "Scan target and scope",
      "Findings with severity",
      "Standard references",
      "Concrete remediation steps",
      "Re-scan plan",
      "Human-review gate",
    ],
    routesTo: [
      { name: "187standard", when: "findings need scoring against 187WEB quality standards" },
      { name: "187ACCESS+", when: "the scan touches disability access" },
      { name: "187INCLUDE+", when: "the scan touches identity-safe language" },
      { name: "187seo", when: "findings are search-visibility related" },
    ],
    templates: [
      { name: "health-scan.md", when: "General repo/site health scan" },
      { name: "security-scan.md", when: "Security and dependency review" },
    ],
    related: ["standard", "access", "include", "seo"],
  },
  {
    id: "kit",
    name: "187KIT",
    tagline: "Templates + starter kits",
    color: "#84cc16",
    description:
      "The equipping layer of 187WEB: design-system tokens, industry templates, archetype scaffolds, pre-ship checklists, and install scripts.",
    triggers: ["/187kit", "187KIT", "kit", "tpl", "template", "starter kit", "scaffold", "boilerplate"],
    useCases: [
      "Finding or generating starter kits and scaffolds",
      "Applying industry templates and design tokens",
      "Using pre-ship checklists and install scripts",
      "Generating archetype starter repos",
    ],
    outputs: [
      "Kit selection",
      "Template files or scaffold commands",
      "Design-token map",
      "Pre-ship checklist",
      "Install instructions",
      "Adapter and customization notes",
    ],
    routesTo: [
      { name: "187craft", when: "the kit needs UI/UX customization" },
      { name: "187repo", when: "the kit becomes a generated repo" },
      { name: "187standard", when: "the kit must pass quality gates" },
    ],
    templates: [
      { name: "kit-spec.md", when: "Specifying a new starter kit" },
      { name: "template-card.md", when: "Documenting a reusable template" },
    ],
    related: ["craft", "repo", "standard"],
  },
  {
    id: "standard",
    name: "187STANDARD",
    tagline: "Quality standards engine",
    color: "#d946ef",
    description:
      "Scores work against 187WEB quality standards, conventions, governance rules, SOPs, and checklists before handoff or release.",
    triggers: ["/187standard", "187STANDARD", "std", "qual", "standard", "quality gate", "convention check", "SOP"],
    useCases: [
      "Scoring against 187WEB standards and conventions",
      "Quality-gate checks before release",
      "Governance and SOP compliance",
      "Checklist-driven reviews",
    ],
    outputs: [
      "Standard scope",
      "Score or pass/fail per gate",
      "Non-conformance findings",
      "Remediation plan",
      "Evidence and references",
      "Approval recommendation",
    ],
    routesTo: [
      { name: "187scan", when: "the standard check requires an inspection pass" },
      { name: "187ACCESS+", when: "standards touch accessibility" },
      { name: "187publish", when: "standard checks gate a public release" },
    ],
    templates: [
      { name: "standard-checklist.md", when: "Running a quality-gate checklist" },
      { name: "conformance-report.md", when: "Documenting standard compliance" },
    ],
    related: ["scan", "access", "publish"],
  },
  {
    id: "flow",
    name: "187FLOW",
    tagline: "Workflow automation",
    color: "#f59e0b",
    description:
      "Turns goals into scoped, multi-skill workflows with clean handoffs, sequencing, and pipeline automation.",
    triggers: ["/187flow", "187FLOW", "flow", "go", "workflow", "pipeline", "sequence", "handoff", "chain"],
    useCases: [
      "Turning a goal into a scoped workflow",
      "Chaining skills in a predefined order",
      "CI/CD glue and pipeline automation",
      "Multi-surface coordination",
    ],
    outputs: [
      "Workflow scope",
      "Skill sequence",
      "Handoff criteria",
      "Inputs/outputs per step",
      "Automation hooks",
      "Execution checklist",
    ],
    routesTo: [
      { name: "187command", when: "the workflow starts from an ambiguous request" },
      { name: "187launch", when: "the workflow supports a product launch" },
      { name: "187publish", when: "the workflow ends in a release sync" },
    ],
    templates: [
      { name: "workflow-spec.md", when: "Documenting a multi-skill workflow" },
      { name: "handoff-checklist.md", when: "Verifying clean skill handoffs" },
    ],
    related: ["command", "launch", "publish"],
  },
  {
    id: "repo",
    name: "187REPO",
    tagline: "Repo + deploy orchestrator",
    color: "#3b82f6",
    description:
      "Short-name orchestrator for repo generation, GitHub deployment, installer sites, archetype scaffolds, and routing across the 187SKILLS suite.",
    triggers: ["/187repo", "187REPO", "repo", "generate repo", "deploy to GitHub", "GitHub Pages", "installer", "187"],
    useCases: [
      "Generating repos from archetype scaffolds",
      "Deploying to GitHub and GitHub Pages",
      "Creating installer pages and scripts",
      "Routing requests across 187SKILLS short names",
    ],
    outputs: [
      "Mode and archetype",
      "Commands to run",
      "Files created or changed",
      "Deployment steps",
      "Next actions and approvals",
      "Power-mode notes",
    ],
    routesTo: [
      { name: "187version", when: "tag and release verification" },
      { name: "187publish", when: "final synchronization gate" },
      { name: "187craft", when: "the repo needs UI/UX work" },
      { name: "187kit", when: "using a starter kit or template" },
    ],
    templates: [
      { name: "repo-spec.md", when: "Capturing repo scaffold decisions" },
      { name: "deploy-runbook.md", when: "Documenting GitHub deploy steps" },
    ],
    related: ["version", "publish", "craft", "kit"],
  },
  {
    id: "craft",
    name: "187CRAFT",
    tagline: "Design + frontend craft",
    color: "#0d9488",
    description:
      "Short-name entry point for design, UX, frontend components, design systems, color palettes, font pairings, and pre-ship audits.",
    triggers: [
      "/187craft",
      "187CRAFT",
      "craft",
      "ui",
      "design this",
      "UX audit",
      "component library",
      "color palette",
      "polish this page",
    ],
    useCases: [
      "Building or redesigning public-facing pages",
      "Art-directing hero and landing sections",
      "Generating design systems and component libraries",
      "Running pre-ship UI/UX audits",
    ],
    outputs: ["Mode", "Design direction and tokens", "Component plan", "Accessibility notes", "Audit findings", "Next actions"],
    routesTo: [
      { name: "187ACCESS+", when: "accessibility-only reviews" },
      { name: "187INCLUDE+", when: "inclusion-only language reviews" },
      { name: "187seo", when: "SEO implications arise" },
      { name: "187launch", when: "launch copy is needed" },
    ],
    templates: [
      { name: "design-direction.md", when: "Capturing a design decision" },
      { name: "pre-ship-audit.md", when: "Running a baseline pre-ship checklist" },
    ],
    related: ["access", "include", "seo", "launch"],
  },
  {
    id: "create",
    name: "187CREATE",
    tagline: "Growth-first creation",
    color: "#39FF14",
    description:
      "187CREATE is Kali's growth-first creation skill. It builds landing pages, ad creatives, influencer kits, and conversion-focused surfaces that plug directly into the 187WEB suite.",
    triggers: [
      "create a landing page",
      "spin up ad creative",
      "design an influencer kit",
      "optimize a conversion surface",
      "build a growth MVP",
    ],
    useCases: [
      "Rapid landing pages for campaigns and launches",
      "Ad creative variants and conversion copy",
      "Influencer / partner asset kits",
      "Growth MVPs that later hand off to 187CRAFT for systemization",
    ],
    outputs: [
      "Shipped growth page or component set",
      "Campaign brief with copy and asset checklist",
      "Conversion checklist and A/B candidate list",
      "Handoff notes for 187CRAFT / 187PUBLISH",
    ],
    related: ["craft", "vibe", "launch", "publish", "seo", "revenue"],
    routesTo: [
      { name: "187CRAFT", when: "Systemize a successful MVP into a design system" },
      { name: "187PUBLISH", when: "Run the publish gate before going live" },
      { name: "187SEO", when: "Optimize discoverability of the growth surface" },
    ],
    templates: [
      {
        name: "Landing page MVP",
        when:
          "Create a one-section landing page for [offer] targeting [audience]. Include headline, subhead, social proof placeholder, CTA, and accessibility checks.",
      },
      {
        name: "Ad creative brief",
        when:
          "Generate three ad-creative variants for [channel] promoting [offer]. Each variant needs headline, hook, visual direction, and CTA.",
      },
    ],
  },
  {
    id: "vibe",
    name: "187VIBE",
    tagline: "Delight + community",
    color: "#c026d3",
    description:
      "Short-name entry point for delight, onboarding, retention, community UX, micro-interactions, copy sharpening, and safe execution.",
    triggers: ["/187vibe", "187VIBE", "vibe", "delight", "whimsy", "onboarding", "retention", "community", "micro-interactions"],
    useCases: [
      "Adding delight and micro-interactions",
      "Building onboarding flows and retention loops",
      "Building community tools",
      "Sharpening copy and tuning inference",
    ],
    outputs: ["Mode", "Delight plan", "Community/retention mechanics", "Safety notes", "Next actions"],
    routesTo: [
      { name: "187research", when: "research-grade sources are needed" },
      { name: "187launch", when: "go-to-market strategy is involved" },
      { name: "187seo", when: "SEO questions arise" },
      { name: "187revenue", when: "revenue architecture is involved" },
    ],
    templates: [
      { name: "delight-plan.md", when: "Planning a delight moment" },
      { name: "onboarding-flow.md", when: "Mapping an onboarding sequence" },
    ],
    related: ["research", "launch", "seo", "revenue"],
  },
  {
    id: "launch",
    name: "187LAUNCH",
    tagline: "Go-to-market intelligence",
    color: "#ea580c",
    description:
      "Go-to-market layer for product launches, early-user acquisition, distribution playbooks, and campaign planning.",
    triggers: ["/187launch", "187LAUNCH", "launch", "ship", "go to market", "Product Hunt", "early users", "validation", "cold outreach"],
    useCases: [
      "Planning product launches and re-launches",
      "Finding early users and beta testers",
      "Building go-to-market strategy",
      "Creating launch content, outreach, and ads",
    ],
    outputs: ["Mode", "Launch strategy", "Asset plan", "Timeline", "Risk/compliance notes", "Next actions"],
    routesTo: [
      { name: "187seo", when: "SEO/AEO/GEO work is needed" },
      { name: "187revenue", when: "pricing or revenue systems are involved" },
      { name: "187docs", when: "documentation and launch copy are needed" },
      { name: "187write", when: "polishing campaign copy" },
    ],
    templates: [
      { name: "launch-checklist.md", when: "Launch day checklist" },
      { name: "icp-builder.md", when: "Ideal customer profile worksheet" },
      { name: "launch-timeline.md", when: "4–6 week launch timeline" },
    ],
    related: ["seo", "revenue", "docs", "write"],
  },
  {
    id: "write",
    name: "187WRITE",
    tagline: "Suite-wide editorial engine",
    color: "#4f46e5",
    description:
      "Suite-wide content writing and editorial engine for copy, scripts, tutorials, SEO drafts, accessible language, and claim-safe rewrites.",
    triggers: [
      "/187write",
      "187WRITE",
      "write this",
      "polish this",
      "content brief",
      "editorial style",
      "voice guide",
      "plain language",
      "claim-safe rewrite",
    ],
    useCases: [
      "Drafting or refining public-facing copy",
      "Creating content briefs",
      "Unifying voice and tone",
      "Rewriting complex content into plain, claim-safe language",
    ],
    outputs: [
      "Mode",
      "Audience/channel",
      "Voice and tone",
      "Draft content",
      "Claim review",
      "Plain-language notes",
      "SEO considerations",
      "Access and inclusion notes",
      "Next actions",
    ],
    routesTo: [
      { name: "187docs", when: "document structure or docs architecture is needed" },
      { name: "187seo", when: "search-targeted content is needed" },
      { name: "187launch", when: "campaign copy is needed" },
      { name: "187INCLUDE+", when: "inclusion or identity language review is needed" },
    ],
    templates: [
      { name: "content-brief.md", when: "Before drafting long-form content" },
      { name: "plain-language-rewrite.md", when: "Simplifying complex prose" },
      { name: "landing-page-copy.md", when: "Writing public landing-page sections" },
    ],
    related: ["docs", "seo", "launch", "include"],
  },
  {
    id: "include",
    name: "187INCLUDE+",
    tagline: "Inclusion + neurodivergence + identity safety",
    color: "rainbow",
    description:
      "Broad inclusion engine for neurodivergence (Autism, ADHD, OCD, dyslexia, dyspraxia, Tourette’s), identity safety (LGBTQ+, pronouns), anti-bias, plain language, sensory safety, predictable interfaces, cognitive-load reduction, and emotional safety.",
    triggers: [
      "/187INCLUDE+",
      "187INCLUDE+",
      "include",
      "neurodivergent",
      "autism friendly",
      "ADHD friendly",
      "OCD friendly",
      "sensory safe",
      "plain language",
      "cognitive load",
      "executive function",
      "dyslexia friendly",
      "identity safe",
      "pronouns",
      "inclusive language",
      "anti-bias",
      "deadname check",
      "gender inclusive",
      "LGBTQ inclusion",
      "pronoun review",
      "gender inclusive forms",
    ],
    useCases: [
      "Autism/ADHD/OCD-friendly UX review",
      "Sensory-safe design and motion reviews",
      "Plain-language rewrite and cognitive-load reduction",
      "Predictable navigation and executive-function support",
      "Identity-safe forms, pronouns, and name handling",
      "Anti-bias copy review and deadname/misgendering risk checks",
      "Community safety language and inclusive style guides",
    ],
    outputs: [
      "Inclusion mode",
      "Scope",
      "Neurodivergent review",
      "Sensory profile",
      "Plain-language score",
      "Identity field design",
      "Pronoun handling",
      "Deadname/misgendering risk",
      "Inclusive rewrite",
      "Cognitive-load map",
      "Community safety notes",
      "Prioritized recommendations",
      "Validation steps",
    ],
    routesTo: [
      { name: "187ACCESS+", when: "forms or auth touch disability access and identity data" },
      { name: "187docs", when: "updating inclusion statements and style guides" },
      { name: "187write", when: "final copy polish after inclusion edits" },
      { name: "187publish", when: "gating a public page before release" },
    ],
    templates: [
      { name: "inclusion-review-report.md", when: "Structured findings for a page or form" },
      { name: "gender-inclusive-form-template.md", when: "Designing identity fields" },
      { name: "community-safety-plan.md", when: "Code of conduct and support response language" },
      { name: "neurodivergent-ux-checklist.md", when: "Autism/ADHD/OCD-friendly review" },
      { name: "plain-language-rewrite.md", when: "Simplifying public copy" },
    ],
    related: ["access", "docs", "write", "publish"],
  },
];

export const skillShowcaseIndex = new Map(skillShowcases.map((s) => [s.id, s]));

/**
 * Helpers for the special `rainbow` color used by 187INCLUDE+.
 * Returns a concrete hex fallback for inline style props (box-shadow, borders,
 * solid backgrounds) and a Tailwind gradient class for text/background accents.
 */
export function skillColorValue(color: string): string {
  return color === "rainbow" ? "#ec4899" : color;
}

export function skillIsRainbow(color: string): boolean {
  return color === "rainbow";
}

export function skillRainbowClass(): string {
  return "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500";
}

export function skillRainbowTextClass(): string {
  return `${skillRainbowClass()} bg-clip-text text-transparent`;
}
