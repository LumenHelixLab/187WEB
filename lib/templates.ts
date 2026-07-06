/**
 * Catalog for the template gallery. One entry per industry template; the gallery
 * renders from this and each template page links back via its slug. Showcases
 * the *range* of design languages + componentry the skill can produce.
 */
export type TemplateMeta = {
  slug: string;
  name: string;
  industry: string;
  blurb: string;
  tags: string[];
  colors: [string, string, string];
  tone: "light" | "dark";
};

export const templates: TemplateMeta[] = [
  {
    slug: "saas",
    name: "Nimbus",
    industry: "SaaS / Startup",
    blurb: "Conversion-first product launch — gradient hero, feature bento, pricing tiers.",
    tags: ["pricing", "bento", "logo cloud"],
    colors: ["#2440E6", "#7C3AED", "#22D3EE"],
    tone: "dark",
  },
  {
    slug: "commerce",
    name: "Marketplace",
    industry: "E-commerce / Retail",
    blurb: "Product-forward storefront with category filters, product grid, and cart cues.",
    tags: ["product grid", "filters", "cart"],
    colors: ["#111111", "#F59E0B", "#FFFFFF"],
    tone: "light",
  },
  {
    slug: "scientific",
    name: "Lattice Lab",
    industry: "Scientific / Research",
    blurb: "Journal-grade layout: abstract, captioned figure, authors, and a citation block.",
    tags: ["abstract", "figure", "citation"],
    colors: ["#0B1F3A", "#1E6F9F", "#E8EEF5"],
    tone: "light",
  },
  {
    slug: "agency",
    name: "STUDIO/187",
    industry: "Creative agency",
    blurb: "Brutalist editorial — oversized type, marquee, and a case-study index.",
    tags: ["marquee", "case studies", "awards"],
    colors: ["#0A0A0A", "#C6FF00", "#FFFFFF"],
    tone: "dark",
  },
  {
    slug: "portfolio",
    name: "Maya Chen",
    industry: "Portfolio / Personal",
    blurb: "Minimal personal site — restrained type, project grid, quiet confidence.",
    tags: ["project grid", "about", "contact"],
    colors: ["#F4F2EC", "#11131A", "#2440E6"],
    tone: "light",
  },
  {
    slug: "restaurant",
    name: "Ember & Oak",
    industry: "Restaurant / Hospitality",
    blurb: "Warm fine-dining — gold serif, à la carte menu, hours, and reservations.",
    tags: ["menu", "hours", "reserve"],
    colors: ["#1A1410", "#C8A24B", "#F3EAD8"],
    tone: "dark",
  },
  {
    slug: "fintech",
    name: "Vault",
    industry: "Fintech / Banking",
    blurb: "Trust-forward finance — stat cards, rates table, security, app mock.",
    tags: ["stat cards", "rates", "security"],
    colors: ["#071A2B", "#3DDC97", "#0E2A43"],
    tone: "dark",
  },
  {
    slug: "healthcare",
    name: "Wellspring",
    industry: "Healthcare / Clinic",
    blurb: "Calm, accessible clinic — services, credentials, appointment booking.",
    tags: ["services", "appointment", "trust"],
    colors: ["#F2FBF9", "#0E7C7B", "#0B3B3A"],
    tone: "light",
  },
  {
    slug: "education",
    name: "Curio",
    industry: "Education / Courses",
    blurb: "Bright course platform — curriculum, instructors, and an enroll CTA.",
    tags: ["curriculum", "instructors", "enroll"],
    colors: ["#FFFDF5", "#4F46E5", "#FACC15"],
    tone: "light",
  },
  {
    slug: "nonprofit",
    name: "Rootwork",
    industry: "Nonprofit / Charity",
    blurb: "Mission-driven — impact stats, donation tiers, and field stories.",
    tags: ["impact", "donate", "stories"],
    colors: ["#0E2A1E", "#34D399", "#F3EFE0"],
    tone: "dark",
  },
  {
    slug: "events",
    name: "Frequency",
    industry: "Events / Conference",
    blurb: "High-energy conference — countdown, schedule timeline, speaker grid, tickets.",
    tags: ["countdown", "schedule", "speakers"],
    colors: ["#0A0613", "#FF4D8D", "#22D3EE"],
    tone: "dark",
  },
  {
    slug: "realestate",
    name: "Maison",
    industry: "Real estate",
    blurb: "Premium listings — search bar, property cards, neighborhood, agent.",
    tags: ["listings", "search", "agent"],
    colors: ["#F5F1E8", "#2F5D43", "#1B1B1B"],
    tone: "light",
  },
  {
    slug: "devtool",
    name: "Forge API",
    industry: "Developer tool",
    blurb: "Terminal-styled dev tool — install command, code sample, API reference.",
    tags: ["code block", "install", "API"],
    colors: ["#05060A", "#3DDC84", "#7C3AED"],
    tone: "dark",
  },
  {
    slug: "editorial",
    name: "The Dispatch",
    industry: "News / Editorial",
    blurb: "Broadsheet magazine — masthead, lead story, and a multi-column article grid.",
    tags: ["masthead", "article grid", "feature"],
    colors: ["#F7F3E8", "#B91C1C", "#11131A"],
    tone: "light",
  },
];
