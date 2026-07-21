/**
 * Canonical first-class 187WEB skills.
 *
 * Keep in sync with scripts/lib/suite-constants.mjs and docs/ROUTING.md.
 * This TypeScript copy exists so client components can import the roster
 * without pulling in the Node-only .mjs script entry point.
 */

export type SuiteSkill = {
  id: string;
  name: string;
  route: string | null;
  docs: string | null;
};

export const FIRST_CLASS_SKILLS: SuiteSkill[] = [
  { id: "repo", name: "187REPO", route: null, docs: null },
  { id: "craft", name: "187CRAFT", route: null, docs: null },
  { id: "create", name: "187CREATE", route: "create", docs: "187CREATE" },
  { id: "vibe", name: "187VIBE", route: null, docs: null },
  { id: "launch", name: "187LAUNCH", route: null, docs: null },
  { id: "free", name: "187FREE", route: "free", docs: "187FREE" },
  { id: "research", name: "187RESEARCH", route: "research", docs: "187RESEARCH" },
  { id: "seo", name: "187SEO", route: "seo", docs: "187SEO" },
  { id: "revenue", name: "187REVENUE", route: "revenue", docs: "187REVENUE" },
  { id: "docs", name: "187DOCS", route: "docs", docs: "187DOCS" },
  { id: "learn", name: "187LEARN", route: "learn", docs: "187LEARN" },
  { id: "test", name: "187TEST", route: "test", docs: "187TEST" },
  { id: "access-plus", name: "187ACCESS+", route: "access", docs: "187ACCESS" },
  { id: "version", name: "187VERSION", route: "version", docs: "187VERSION" },
  { id: "publish", name: "187PUBLISH", route: "publish", docs: "187PUBLISH" },
  { id: "natasha", name: "187NATASHA", route: "natasha", docs: "187NATASHA" },
  { id: "chain", name: "187CHAIN", route: "chain", docs: "187CHAIN" },
  { id: "gsap", name: "187GSAP", route: "gsap", docs: "187GSAP" },
  { id: "type", name: "187TYPE", route: "type", docs: "187TYPE" },
  { id: "model", name: "187MODEL", route: "model", docs: "187MODEL" },
  { id: "scroll", name: "187SCROLL", route: "scroll", docs: "187SCROLL" },
  { id: "audio", name: "187AUDIO", route: "audio", docs: "187AUDIO" },
  { id: "viz", name: "187VIZ", route: "viz", docs: "187VIZ" },
  { id: "motion", name: "187MOTION", route: "motion", docs: "187MOTION" },
  { id: "hero", name: "187HERO", route: "hero", docs: "187HERO" },
  { id: "theme", name: "187THEME", route: "theme", docs: "187THEME" },
];

export const SUBSKILLS: SuiteSkill[] = [
  { id: "write", name: "187WRITE", docs: "187WRITE" },
  { id: "include", name: "187INCLUDE+", docs: "187INCLUDE" },
] as SuiteSkill[];

export const PUBLIC_SKILLS: SuiteSkill[] = [...FIRST_CLASS_SKILLS, ...SUBSKILLS];

export const ROUTED_SKILLS: SuiteSkill[] = FIRST_CLASS_SKILLS.filter((s) => s.route);
