import type { AgentKit } from "./agent-kit";

export const kaliKit: AgentKit = {
  slug: "kali",
  name: "KALI",
  color: "#39FF14",
  tagline: "Growth + create assist",
  overview:
    "KALI drives growth and assists CHARLOTTE with direct web creation: SEO, revenue architecture, publish gate, and the 187CREATE skill for landing pages and campaign assets. She appeals to NATASHA/YELENA for security gates and to XAVIER for final ship calls.",
  skills: ["seo", "revenue", "publish", "create", "repo", "vibe"],
  prompts: [
    {
      id: "growth-landing",
      title: "Build a growth landing page",
      whenToUse: "When the user needs a conversion-focused landing page fast.",
      body:
        "You are KALI. Build a growth landing page brief: target audience, hero claim, supporting proof, CTA hierarchy, SEO target phrase, and conversion event. Recommend 187CREATE for the surface and 187SEO for the keyword strategy.",
    },
    {
      id: "ad-creative",
      title: "Spin up ad creative variants",
      whenToUse: "When a campaign needs headline/copy/creative variants for testing.",
      body:
        "You are KALI. Generate 3–5 ad creative variants (headline, body, CTA, visual direction) for the described campaign. Include a variant testing plan with primary metric and audience split. Tag output for 187CREATE assembly.",
    },
    {
      id: "seo-sprint",
      title: "Run a focused SEO sprint",
      whenToUse: "When a page is underperforming in search or needs keyword targeting.",
      body:
        "You are KALI. Run a focused SEO sprint: audit current page, pick 1 primary and 2–3 secondary keywords, rewrite title/meta/headers, propose internal links, and define a 30-day measurement plan.",
    },
    {
      id: "revenue-model",
      title: "Draft a revenue architecture map",
      whenToUse: "When a product needs pricing, funnel, or monetization logic.",
      body:
        "You are KALI. Draft a revenue architecture map for the described offer: pricing tiers, funnel stages, conversion events, payment handoff, and post-conversion retention signal. Note any NATASHA/YELENA compliance gates.",
    },
  ],
  tasks: [
    {
      id: "create-landing-page",
      title: "Ship a growth landing page",
      steps: [
        "Write the brief with audience, claim, proof, and CTA.",
        "Use /187create to generate the page surface.",
        "Run /187seo for keyword targets and meta copy.",
        "Send public surface to NATASHA/YELENA for review before /187publish.",
      ],
      output: "A live growth landing page with SEO targets and conversion events.",
    },
    {
      id: "influencer-kit",
      title: "Assemble an influencer kit",
      steps: [
        "Define creator tier, talking points, and usage rights.",
        "Generate asset briefs (graphics, captions, links) with /187create.",
        "Build a tracking link and UTM scheme.",
        "Package everything into a shareable kit page or doc.",
      ],
      output: "A creator-ready influencer kit with assets, copy, and tracking.",
    },
    {
      id: "ad-creative-sprint",
      title: "Produce ad creative variants",
      steps: [
        "Extract campaign goal, audience, and platform constraints.",
        "Generate 3–5 headline/body/CTA variants.",
        "Add visual direction and accessibility notes.",
        "Define test plan and primary success metric.",
      ],
      output: "A variant pack ready for ad-platform upload and A/B testing.",
    },
    {
      id: "seo-rank-recovery",
      title: "Recover a page's search ranking",
      steps: [
        "Audit current title, meta, headers, and internal links.",
        "Select keyword targets and search intent match.",
        "Rewrite on-page elements with /187write and /187seo.",
        "Set a 30-day measurement cadence.",
      ],
      output: "A revised page with an SEO measurement plan.",
    },
  ],
  triggers: [
    {
      id: "landing-page-request",
      condition: "User says 'build a landing page', 'campaign page', or 'growth page'",
      action: "Invoke /187create and /187seo to ship a conversion-focused landing page.",
    },
    {
      id: "ad-creative-request",
      condition: "User asks for ads, creative variants, or campaign assets",
      action: "Invoke /187create to generate headline/copy/visual variants and a test plan.",
    },
    {
      id: "seo-slump",
      condition: "User reports a drop in traffic or wants to rank for a keyword",
      action: "Invoke /187seo for a focused sprint with keyword targets and measurement.",
    },
    {
      id: "monetization-question",
      condition: "User asks about pricing, revenue, or funnel design",
      action: "Invoke /187revenue and map the architecture to 187CREATE surfaces.",
    },
  ],
  commands: [
    { id: "create", name: "/187 kali create", description: "Build a growth-first landing page or campaign asset." },
    { id: "seo", name: "/187 kali seo", description: "Run a focused SEO sprint with keyword targets." },
    { id: "ads", name: "/187 kali ads", description: "Generate ad creative variants and a test plan." },
    { id: "revenue", name: "/187 kali revenue", description: "Draft a revenue architecture map." },
  ],
  skillChains: [
    {
      id: "growth-landing-page",
      name: "Growth Landing Page",
      tagline: "Brief → page → SEO → publish",
      description:
        "A conversion-focused landing page built with 187CREATE, optimized with 187SEO, and shipped through 187PUBLISH.",
      classMix: "1st-class create/seo/publish + 2nd-class write + 3rd-class analytics hooks",
      steps: [
        { skillId: "write", action: "Draft audience, claim, proof, and CTA copy" },
        { skillId: "create", action: "Generate the landing page surface" },
        { skillId: "craft", action: "Polish tokens and responsive layout" },
        { skillId: "seo", action: "Target keywords and rewrite meta" },
        { skillId: "natasha", action: "Run public-surface threat audit" },
        { skillId: "publish", action: "Run publish gate and deploy" },
      ],
      artifact: "Live growth landing page + SEO brief + publish record",
      artifactExample: "/showcase",
    },
    {
      id: "ad-creative-pack",
      name: "Ad Creative",
      tagline: "Variants → visuals → test plan",
      description:
        "A full ad creative pack: headline/copy variants from 187WRITE, visual direction from 187CREATE, and a test plan routed through 187REVENUE.",
      classMix: "1st-class create/revenue + 2nd-class write + 3rd-class platform hooks",
      steps: [
        { skillId: "write", action: "Generate headline, body, and CTA variants" },
        { skillId: "create", action: "Produce visual direction and asset sizes" },
        { skillId: "revenue", action: "Define audience split and primary metric" },
        { skillId: "publish", action: "Package kit and sync to campaign folder" },
      ],
      artifact: "Ad creative variant pack + test plan + asset folder",
      artifactExample: "/showcase",
    },
    {
      id: "influencer-kit",
      name: "Influencer Kit",
      tagline: "Creator brief → assets → tracking",
      description:
        "A creator-ready influencer kit built with 187CREATE, 187WRITE, and 187REVENUE tracking links.",
      classMix: "1st-class create/revenue + 2nd-class write + 3rd-class UTM hooks",
      steps: [
        { skillId: "write", action: "Draft talking points, captions, and CTAs" },
        { skillId: "create", action: "Build graphics and story asset sizes" },
        { skillId: "revenue", action: "Create tracking links and UTM scheme" },
        { skillId: "publish", action: "Publish shareable kit page" },
      ],
      artifact: "Shareable influencer kit with assets, copy, and tracking",
      artifactExample: "/showcase",
    },
    {
      id: "seo-sprint",
      name: "SEO Sprint",
      tagline: "Audit → keywords → rewrite → measure",
      description:
        "A 30-day search-recovery sprint using 187SEO, 187WRITE, and 187VERSION to track changes.",
      classMix: "1st-class seo/version + 2nd-class write + 3rd-class rank hooks",
      steps: [
        { skillId: "seo", action: "Audit current page and pick keyword targets" },
        { skillId: "write", action: "Rewrite title, meta, headers, and body copy" },
        { skillId: "version", action: "Tag baseline and revision" },
        { skillId: "publish", action: "Deploy and schedule measurement check" },
      ],
      artifact: "Revised page + keyword brief + 30-day measurement plan",
      artifactExample: "/187seo",
    },
  ],
};
