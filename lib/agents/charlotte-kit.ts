import type { AgentKit } from "./agent-kit";

export const charlotteKit: AgentKit = {
  slug: "charlotte",
  name: "CHARLOTTE",
  color: "#3b82f6",
  tagline: "Application orchestration",
  overview:
    "CHARLOTTE orchestrates application work: design systems, repo scaffolding, launch planning, plain-language copy, and research-backed recycling. Security is handled by NATASHA and YELENA, so she focuses on shipping and can appeal to XAVIER for final production decisions.",
  skills: ["repo", "craft", "gsap", "vibe", "launch", "write", "research"],
  prompts: [
    {
      id: "thread-intent",
      title: "Thread user intent into a build plan",
      whenToUse: "When a vague request needs to become a scoped set of tasks and deliverables.",
      body:
        "You are CHARLOTTE. Take the user's fuzzy intent and thread it into a clear build plan: goal, audience, constraints, success signal, first three actions, and the skill that owns each action. Ask one clarifying question if intent is ambiguous.",
    },
    {
      id: "craft-system",
      title: "Propose a design-system token set",
      whenToUse: "Before building UI so that colors, type, spacing, and components stay coherent.",
      body:
        "You are CHARLOTTE. Propose a minimal design-system token set (colors, typography, spacing, radius, shadows) for the described surface. Justify each choice with accessibility and brand-consistency notes. Output as a compact JSON token block plus usage rules.",
    },
    {
      id: "launch-checklist",
      title: "Draft a launch checklist",
      whenToUse: "When a feature or page is ready to ship and needs a coordinated launch plan.",
      body:
        "You are CHARLOTTE. Draft a launch checklist covering pre-launch validation, content freeze, SEO/meta, analytics, rollback plan, owner assignments, and post-launch verification. Include gates for NATASHA/YELENA if the surface is public.",
    },
    {
      id: "recycle-research",
      title: "Recycle research into reusable notes",
      whenToUse: "After research is complete and the team needs durable, citable artifacts.",
      body:
        "You are CHARLOTTE. Convert the attached research into a set of reusable notes: key claim, source, confidence, contradiction, and next action. Tag each note with the skill that should consume it next.",
    },
    {
      id: "gsap-choreograph",
      title: "Choreograph motion with GSAP",
      whenToUse: "When a page or component needs timeline, scroll, or stagger animation.",
      body:
        "You are CHARLOTTE. Scope the animation need: target elements, motion intent (entrance, scroll, micro-interaction), timing, easing, and reduced-motion fallback. Output a GSAP timeline spec or ScrollTrigger map, then route implementation to 187GSAP and 187MOTION.",
    },
    {
      id: "gsap-performance",
      title: "Audit animation performance",
      whenToUse: "When an animation feels janky or needs performance and accessibility review.",
      body:
        "You are CHARLOTTE. Audit the animation for transform-only properties, will-change usage, layout thrash, scroll-linked cost, and prefers-reduced-motion handling. Output a prioritized fix list and a reduced-motion fallback plan.",
    },
  ],
  tasks: [
    {
      id: "scaffold-repo",
      title: "Scaffold a new repo starter",
      steps: [
        "Run /187repo with the requested stack and framework.",
        "Apply CHARLOTTE design-system tokens via /187craft.",
        "Write README quickstart and CONTRIBUTING guardrails with /187write.",
        "Add CI, lint, and typecheck gates.",
      ],
      output: "A working local repo with CI green and a design-system baseline.",
    },
    {
      id: "ship-landing-page",
      title: "Ship a public landing page",
      steps: [
        "Draft page structure and copy with /187write.",
        "Build component tokens and layout with /187craft.",
        "Request NATASHA/YELENA security and access review.",
        "Run /187launch for the plan and /187publish for the gate.",
      ],
      output: "A shipped landing page with audit report and publish gate record.",
    },
    {
      id: "research-backfill",
      title: "Backfill research for a feature decision",
      steps: [
        "Frame the decision and confidence threshold.",
        "Run /187research to gather source-backed evidence.",
        "Compress findings into decision-ready notes.",
        "Record contradictions and recommended path.",
      ],
      output: "A decision memo with sources, confidence, and recommended next step.",
    },
    {
      id: "vibe-prototype",
      title: "Spin up a vibe-coded prototype",
      steps: [
        "Capture intent in natural language.",
        "Use /187vibe to generate the first runnable surface.",
        "Refine tokens and layout with /187craft.",
        "Tag output for review and version capture.",
      ],
      output: "A deployable prototype plus a refinement plan.",
    },
    {
      id: "gsap-hero-sequence",
      title: "Build a GSAP hero entrance sequence",
      steps: [
        "Identify hero elements and motion intent with /187craft.",
        "Design the GSAP timeline, easing, and stagger with /187gsap.",
        "Add reduced-motion and accessibility fallbacks with /187access-plus.",
        "Validate performance and ship through /187publish.",
      ],
      output: "A hero section with a GSAP entrance sequence and fallback plan.",
    },
    {
      id: "gsap-scroll-story",
      title: "Build a scroll-driven narrative section",
      steps: [
        "Map the narrative beats and scroll trigger points.",
        "Build ScrollTrigger pinning/scrub with /187gsap and /187scroll.",
        "Layer 3D or kinetic type with /187hero or /187type if needed.",
        "Run reduced-motion and performance checks before publish.",
      ],
      output: "A scroll-driven section with GSAP choreography and safety checks.",
    },
  ],
  triggers: [
    {
      id: "thread-request",
      condition: "User asks 'where do I start?' or gives a vague build request",
      action: "Invoke /187thread and produce a scoped build plan with skill owners.",
    },
    {
      id: "design-system-needed",
      condition: "A new public surface is being built without established tokens",
      action: "Invoke /187craft and emit a token set before components are written.",
    },
    {
      id: "launch-ready",
      condition: "A page or feature is code-complete and needs a launch plan",
      action: "Invoke /187launch and coordinate NATASHA/YELENA gates before publish.",
    },
    {
      id: "research-gap",
      condition: "A decision depends on external evidence or competitive context",
      action: "Invoke /187research and compress results into a decision memo.",
    },
    {
      id: "animation-request",
      condition: "User asks for animation, timeline, ScrollTrigger, stagger, or easing",
      action: "Invoke /187charlotte animate to scope a GSAP timeline and route to 187GSAP.",
    },
    {
      id: "motion-quality",
      condition: "Animation feels janky, slow, or lacks reduced-motion handling",
      action: "Invoke /187charlotte motion-audit and route fixes to 187GSAP and 187ACCESS+.",
    },
  ],
  commands: [
    { id: "plan", name: "/187 charlotte plan", description: "Turn intent into a build plan with skill owners." },
    { id: "craft", name: "/187 charlotte craft", description: "Emit or refine a design-system token set." },
    { id: "launch", name: "/187 charlotte launch", description: "Draft a launch checklist with gates." },
    { id: "research", name: "/187 charlotte research", description: "Backfill source-backed research for a decision." },
    { id: "animate", name: "/187 charlotte animate", description: "Scope a GSAP timeline or scroll choreography." },
    { id: "motion-audit", name: "/187 charlotte motion-audit", description: "Audit animation performance and reduced-motion safety." },
  ],
  skillChains: [
    {
      id: "secure-landing-page",
      name: "Secure Landing Page",
      tagline: "Design → audit → launch with gates",
      description:
        "A complete public landing page built with 187CRAFT, validated by 187NATASHA, and shipped through 187LAUNCH and 187PUBLISH.",
      classMix: "1st-class craft/launch + 2nd-class write/include + 3rd-class motion hooks",
      steps: [
        { skillId: "craft", action: "Design the page system and component tokens" },
        { skillId: "write", action: "Draft accessible, claim-safe landing copy" },
        { skillId: "natasha", action: "Run threat-surface and claim-discipline audit" },
        { skillId: "access-plus", action: "Check WCAG+ and inclusion gates" },
        { skillId: "include", action: "Review identity-safe language and forms" },
        { skillId: "launch", action: "Build launch plan and asset checklist" },
        { skillId: "publish", action: "Run final publish gate and surface sync" },
      ],
      artifact: "Shipped landing page + audit report + publish gate record",
      artifactExample: "/showcase",
    },
    {
      id: "research-lab",
      name: "Reproducible Research Lab",
      tagline: "Sources → free stack → docs → publish",
      description:
        "Turn a research question into a citable, reproducible public lab using 187RESEARCH, 187FREE, 187DOCS, and 187PUBLISH.",
      classMix: "1st-class research/docs + 2nd-class write + 3rd-class data utilities",
      steps: [
        { skillId: "research", action: "Route question to databases and evidence ladder" },
        { skillId: "free", action: "Pick no-cost hosting and tooling" },
        { skillId: "docs", action: "Write install guide, reference docs, and lab notebook" },
        { skillId: "write", action: "Polish public copy into plain language" },
        { skillId: "version", action: "Tag the lab artifact and changelog" },
        { skillId: "publish", action: "Sync docs, README, and Pages deploy" },
      ],
      artifact: "Public research lab page + source-backed report + versioned release",
      artifactExample: "/187research",
    },
    {
      id: "starter-repo",
      name: "Shipped Starter Repo",
      tagline: "Scaffold → UI → copy → version",
      description:
        "Generate a working starter repository from 187REPO, customize the UI with 187CRAFT, refine copy with 187WRITE, and version it with 187VERSION.",
      classMix: "1st-class repo/craft + 2nd-class write + 3rd-class lint/format hooks",
      steps: [
        { skillId: "repo", action: "Scaffold the repo and CI pipeline" },
        { skillId: "craft", action: "Apply design system and components" },
        { skillId: "write", action: "Write README, tagline, and quickstart copy" },
        { skillId: "test", action: "Add assessment and validation checklist" },
        { skillId: "version", action: "Set SemVer, changelog, and migration notes" },
        { skillId: "publish", action: "Push release sync and GitHub tag" },
      ],
      artifact: "Public GitHub repo + design system + versioned release",
      artifactExample: "https://github.com/LumenHelixLab/187WEB",
    },
    {
      id: "motion-hero",
      name: "Motion-Lab Hero",
      tagline: "3D hero → kinetic type → scroll narrative",
      description:
        "Build an immersive 3D hero section with 187HERO, add kinetic typography with 187TYPE, and choreograph scroll-driven camera moves with 187SCROLL.",
      classMix: "1st-class hero/type/scroll + 2nd-class craft + 3rd-class GSAP hooks",
      steps: [
        { skillId: "hero", action: "Design the immersive hero scene" },
        { skillId: "gsap", action: "Choreograph the hero entrance timeline and easing" },
        { skillId: "type", action: "Add 3D kinetic typography" },
        { skillId: "scroll", action: "Choreograph scroll-driven camera narrative" },
        { skillId: "craft", action: "Polish layout, glass panels, and responsive grid" },
        { skillId: "access-plus", action: "Add reduced-motion and vestibular safety checks" },
        { skillId: "publish", action: "Sync showcase and deploy to Pages" },
      ],
      artifact: "Live showcase section with 3D hero, type, and scroll narrative",
      artifactExample: "/showcase",
    },
    {
      id: "gsap-motion-system",
      name: "GSAP Motion System",
      tagline: "Timelines → scroll triggers → reduced-motion fallback",
      description:
        "Add production-safe motion to a UI surface with 187GSAP timelines, 187SCROLL triggers, 187MOTION hooks, and 187ACCESS+ safety checks, then ship through 187PUBLISH.",
      classMix: "1st-class gsap/scroll/motion + 2nd-class craft/access-plus + 3rd-class motion hooks",
      steps: [
        { skillId: "craft", action: "Identify UI elements that need motion polish" },
        { skillId: "gsap", action: "Build timeline, easing, and stagger specs" },
        { skillId: "scroll", action: "Add ScrollTrigger scrub or pin where needed" },
        { skillId: "motion", action: "Wrap reusable patterns into motion hooks" },
        { skillId: "access-plus", action: "Add reduced-motion and vestibular fallbacks" },
        { skillId: "test", action: "Run animation performance validation" },
        { skillId: "publish", action: "Ship the polished surface" },
      ],
      artifact: "UI surface with GSAP-driven motion and accessibility fallbacks",
      artifactExample: "/187gsap",
    },
  ],
};
