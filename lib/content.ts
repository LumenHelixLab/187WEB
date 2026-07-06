/**
 * Content as design material (skill principle #10): the page's substance lives
 * here as typed data, so the showcase, the docs, and the QA story all stay in
 * sync with one source of truth. Edit copy here, not scattered through JSX.
 */

export type RubricAxis = {
  key: string;
  label: string;
  weight: number;
  blurb: string;
};

/** The Awwwards-style scoring lens the skill designs to. Weights sum to 100. */
export const rubric: RubricAxis[] = [
  {
    key: "design",
    label: "Design",
    weight: 40,
    blurb: "Composition, typography, color, imagery, consistency, attention to detail.",
  },
  {
    key: "usability",
    label: "Usability / UX",
    weight: 30,
    blurb: "Navigation clarity, responsiveness, speed, intuitiveness, accessibility.",
  },
  {
    key: "creativity",
    label: "Creativity",
    weight: 20,
    blurb: "One fresh idea or signature moment — something not templated.",
  },
  {
    key: "content",
    label: "Content",
    weight: 10,
    blurb: "Copy quality, relevance, and how tightly it's integrated with the design.",
  },
];

export type Principle = {
  n: number;
  title: string;
  body: string;
};

/** The twelve "kill shots" — condensed from the skill's core principles. */
export const principles: Principle[] = [
  {
    n: 1,
    title: "Win the first 5 seconds",
    body: "The hero is a thesis: what is this, who is it for, why care. One unmistakable CTA. Lead with the most characteristic thing, not generic stock.",
  },
  {
    n: 2,
    title: "Hierarchy is the message",
    body: "Exactly one focal point per view; everything else supports it. Squint — the most important thing should still be obvious.",
  },
  {
    n: 3,
    title: "Typography carries personality",
    body: "A modular scale, 2 families / 2–3 weights, 50–75 char lines, ≥16px body. Make the type itself memorable.",
  },
  {
    n: 4,
    title: "Color with intent & contrast",
    body: "60-30-10, accent reserved for action. ≥4.5:1 body / ≥3:1 large & UI. Semantic tokens, not scattered hex.",
  },
  {
    n: 5,
    title: "Layout, grid & whitespace",
    body: "A 12-col grid and an 8px spacing scale. Whitespace is active — generous space signals quality. Align everything.",
  },
  {
    n: 6,
    title: "Motion that serves",
    body: "One orchestrated moment over scattered effects. 150–300ms, eased. Honor prefers-reduced-motion. Never scroll-jack.",
  },
  {
    n: 7,
    title: "Responsive, mobile-first",
    body: "Design small first, then enhance. Fluid type/space with clamp(). Tap targets ≥44px. Reflow, don't shrink.",
  },
  {
    n: 8,
    title: "Accessibility is design quality",
    body: "Semantic HTML, logical headings, visible focus, full keyboard use, alt text, labeled inputs. Color is never the only signal.",
  },
  {
    n: 9,
    title: "Speed is a feature",
    body: "LCP < 2.5s · INP < 200ms · CLS < 0.1. Modern image formats, lazy-load below the fold, font-display: swap.",
  },
  {
    n: 10,
    title: "Content & copy are design material",
    body: "Write from the user's side. Lead with the benefit; be specific over clever. Plain, active CTAs. Empty/error states give direction.",
  },
  {
    n: 11,
    title: "Convert, don't just impress",
    body: "One primary action per view, social proof near decisions, short forms. Narrative: hook → value → proof → objections → CTA.",
  },
  {
    n: 12,
    title: "Craft details & anti-generic",
    body: "Awards live in the last 10%: consistent radii, every interactive state, real content. Spend boldness on one signature element.",
  },
];

export type WorkflowStep = {
  n: number;
  title: string;
  body: string;
};

export const workflow: WorkflowStep[] = [
  { n: 1, title: "Brief & research", body: "Pin the subject, audience, and the page's single job. Gather real content and 3–5 best-in-class references." },
  { n: 2, title: "Direction", body: "Choose one concept and a signature moment. Write a compact token plan: colors, type, layout, the memorable element." },
  { n: 3, title: "Critique the plan", body: "Before building, kill anything that reads like the generic default you'd produce for any similar page." },
  { n: 4, title: "Wireframe", body: "Prove the hierarchy in grayscale first — structure before color and imagery." },
  { n: 5, title: "Build to tokens", body: "Define tokens once. Mobile-first. Mind specificity so utilities don't cancel each other out." },
  { n: 6, title: "Critique as you go", body: "Screenshot, squint, compare to the bar. Remove one thing before you ship." },
  { n: 7, title: "QA", body: "Run the pre-ship checklist — responsive, a11y, performance, states, copy — before calling it done." },
];

export type ChecklistCategory = {
  label: string;
  count: number;
};

/** Mirrors references/CHECKLIST.md so the showcase reports the real audit. */
export const checklistCategories: ChecklistCategory[] = [
  { label: "First impression", count: 4 },
  { label: "Visual design & hierarchy", count: 9 },
  { label: "Content & copy", count: 5 },
  { label: "Conversion", count: 4 },
  { label: "Usability & navigation", count: 4 },
  { label: "Responsive", count: 4 },
  { label: "Motion", count: 4 },
  { label: "Accessibility (WCAG 2.2 AA)", count: 6 },
  { label: "Performance (Core Web Vitals)", count: 6 },
  { label: "Final pass", count: 4 },
];

export const checklistTotal = checklistCategories.reduce((sum, c) => sum + c.count, 0);

export const siteConfig = {
  name: "187WEBdesign",
  tagline: "Make killer websites.",
  description:
    "A full-stack Next.js starter that ships the 187WEBdesign skill and proves it — an opinionated playbook for websites that win awards and convert.",
  repo: "https://github.com/lumenhelixsolutions/187webDESIGN",
  url: "https://github.com/lumenhelixsolutions/187webDESIGN",
};
