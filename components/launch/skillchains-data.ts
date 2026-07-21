export type SkillChainStep = {
  skillId: string;
  action: string;
};

export type SkillChain = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  classMix: string;
  steps: SkillChainStep[];
  artifact: string;
  artifactExample: string;
};

export const skillChains: SkillChain[] = [
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
      { skillId: "access", action: "Check WCAG+ and inclusion gates" },
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
      { skillId: "type", action: "Add 3D kinetic typography" },
      { skillId: "scroll", action: "Choreograph scroll-driven camera narrative" },
      { skillId: "craft", action: "Polish layout, glass panels, and responsive grid" },
      { skillId: "access", action: "Add reduced-motion and vestibular safety checks" },
      { skillId: "publish", action: "Sync showcase and deploy to Pages" },
    ],
    artifact: "Live showcase section with 3D hero, type, and scroll narrative",
    artifactExample: "/showcase",
  },
];
