export type CommandStatus = "core" | "selector" | "module" | "research" | "optional-pack" | "legacy";

export type CommandEntry = {
  category: string;
  cmd: string;
  alias: string;
  id: string;
  status: CommandStatus;
  purpose: string;
};

export const COMMANDS: CommandEntry[] = [
  {
    "category": "Front Door",
    "cmd": "/187",
    "alias": "187",
    "id": "187COMMAND",
    "status": "core",
    "purpose": "Open the universal 187WEB command surface."
  },
  {
    "category": "Front Door",
    "cmd": "/187 menu",
    "alias": "menu",
    "id": "187MENU",
    "status": "selector",
    "purpose": "Interactive tool breakdown."
  },
  {
    "category": "Front Door",
    "cmd": "/187 sel",
    "alias": "sel",
    "id": "187SELECT",
    "status": "selector",
    "purpose": "Select skills, agents, abilities, profiles, or packs."
  },
  {
    "category": "Front Door",
    "cmd": "/187 ac",
    "alias": "ac",
    "id": "187AUTO",
    "status": "selector",
    "purpose": "Autocomplete and command suggestions."
  },
  {
    "category": "Front Door",
    "cmd": "/187 pre",
    "alias": "pre",
    "id": "187PREFLIGHT",
    "status": "selector",
    "purpose": "Run install/onboarding preflight."
  },
  {
    "category": "Front Door",
    "cmd": "/187 cap",
    "alias": "cap",
    "id": "187CAP",
    "status": "selector",
    "purpose": "Detect local capability and runtime status."
  },
  {
    "category": "Front Door",
    "cmd": "/187 pack <name>",
    "alias": "pack",
    "id": "187PACK",
    "status": "selector",
    "purpose": "Explain or install a curated pack."
  },
  {
    "category": "Front Door",
    "cmd": "/187 install <alias|pack>",
    "alias": "install",
    "id": "187PACK",
    "status": "selector",
    "purpose": "Install one skill, agent, ability, module, profile, pack, or full suite after a plan."
  },
  {
    "category": "Front Door",
    "cmd": "/187 doctor",
    "alias": "doctor",
    "id": "187CAP",
    "status": "selector",
    "purpose": "Check repo, docs, adapters, build, and capability health."
  },
  {
    "category": "Control Plane",
    "cmd": "/187 cmd",
    "alias": "cmd",
    "id": "187COMMAND",
    "status": "core",
    "purpose": "Route ambiguous or universal requests."
  },
  {
    "category": "Control Plane",
    "cmd": "/187 rpt",
    "alias": "rpt",
    "id": "187REPORT",
    "status": "core",
    "purpose": "Create a compact report, audit, or approval artifact."
  },
  {
    "category": "Control Plane",
    "cmd": "/187 scan",
    "alias": "scan",
    "id": "187SCAN",
    "status": "core",
    "purpose": "Inspect repo, site, docs, app, or external surface."
  },
  {
    "category": "Control Plane",
    "cmd": "/187 kit",
    "alias": "kit",
    "id": "187KIT",
    "status": "core",
    "purpose": "Use templates, prefab demos, and reusable kits."
  },
  {
    "category": "Control Plane",
    "cmd": "/187 std",
    "alias": "std",
    "id": "187STANDARD",
    "status": "core",
    "purpose": "Score against 187WEB quality standards."
  },
  {
    "category": "Control Plane",
    "cmd": "/187 flow",
    "alias": "flow",
    "id": "187FLOW",
    "status": "core",
    "purpose": "Turn a goal into a scoped workflow."
  },
  {
    "category": "Control Plane",
    "cmd": "/187 kern",
    "alias": "kern",
    "id": "187KERNEL",
    "status": "core",
    "purpose": "Show the shared lifecycle contract."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 repo",
    "alias": "repo",
    "id": "187REPO",
    "status": "core",
    "purpose": "Repo structure, orchestration, installers, deployment, GitHub Pages."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 craft",
    "alias": "craft",
    "id": "187CRAFT",
    "status": "core",
    "purpose": "Design, UX, frontend, components, polish. Routes palette/fonts to 187THEME."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 theme",
    "alias": "theme",
    "id": "187THEME",
    "status": "core",
    "purpose": "List, preview, apply, create, audit, export palettes and font tokens."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 hero",
    "alias": "hero",
    "id": "187HERO",
    "status": "core",
    "purpose": "Immersive WebGL/R3F hero systems and scroll-linked CTAs."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 gsap",
    "alias": "gsap",
    "id": "187GSAP",
    "status": "core",
    "purpose": "GSAP timelines, ScrollTrigger, and reduced-motion-safe motion."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 vibe",
    "alias": "vibe",
    "id": "187VIBE",
    "status": "core",
    "purpose": "Onboarding, delight, retention, community UX."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 ship",
    "alias": "ship",
    "id": "187LAUNCH",
    "status": "core",
    "purpose": "Launch strategy, campaign planning, outreach."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 free",
    "alias": "free",
    "id": "187FREE",
    "status": "core",
    "purpose": "Free-tier and open-source solution planning."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 res",
    "alias": "res",
    "id": "187RESEARCH",
    "status": "core",
    "purpose": "Research, source maps, evidence collection."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 seo",
    "alias": "seo",
    "id": "187SEO",
    "status": "core",
    "purpose": "Search visibility, metadata, content readiness."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 rev",
    "alias": "rev",
    "id": "187REVENUE",
    "status": "core",
    "purpose": "Pricing, revenue ops, offers, commerce workflows."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 docs",
    "alias": "docs",
    "id": "187DOCS",
    "status": "core",
    "purpose": "README, SOP, API docs, implementation docs."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 write",
    "alias": "write",
    "id": "187WRITE",
    "status": "core",
    "purpose": "Copywriting, editing, plain language, content structure."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 learn",
    "alias": "learn",
    "id": "187LEARN",
    "status": "core",
    "purpose": "Courses, lessons, study paths, education flows."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 test",
    "alias": "test",
    "id": "187TEST",
    "status": "core",
    "purpose": "Tests, quizzes, rubrics, QA checks."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 ax",
    "alias": "ax",
    "id": "187ACCESS+",
    "status": "core",
    "purpose": "Accessibility, disability access, inclusive UX."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 inc",
    "alias": "inc",
    "id": "187INCLUDE+",
    "status": "core",
    "purpose": "Neurodivergence-friendly UX, identity-safe copy, inclusive language, and community safety."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 ver",
    "alias": "ver",
    "id": "187VERSION",
    "status": "core",
    "purpose": "SemVer, changelog, release notes, migration notes."
  },
  {
    "category": "Core Suite",
    "cmd": "/187 pub",
    "alias": "pub",
    "id": "187PUBLISH",
    "status": "core",
    "purpose": "Sync README, docs, demo, adapters, public launch surface."
  },
  {
    "category": "Modules",
    "cmd": "/187 th",
    "alias": "th",
    "id": "THREAD",
    "status": "module",
    "purpose": "Prompt shaping, intent extraction, rewrite/refactor."
  },
  {
    "category": "Modules",
    "cmd": "/187 tu",
    "alias": "tu",
    "id": "TUNE",
    "status": "module",
    "purpose": "Output profile and model behavior tuning."
  },
  {
    "category": "Modules",
    "cmd": "/187 co",
    "alias": "co",
    "id": "CORD",
    "status": "module",
    "purpose": "Expert role dispatch and specialist routing."
  },
  {
    "category": "Modules",
    "cmd": "/187 ch",
    "alias": "ch",
    "id": "CHAR",
    "status": "module",
    "purpose": "Charlotte assisted research with compact Q&A stop."
  },
  {
    "category": "Modules",
    "cmd": "/187 lb",
    "alias": "lb",
    "id": "LAB",
    "status": "module",
    "purpose": "Local action box for commands, tests, and isolated runs."
  },
  {
    "category": "Research Lab",
    "cmd": "/187 sci",
    "alias": "sci",
    "id": "187SCI",
    "status": "research",
    "purpose": "Scientific claim discipline and release gates."
  },
  {
    "category": "Research Lab",
    "cmd": "/187 labs",
    "alias": "labs",
    "id": "187LABS",
    "status": "research",
    "purpose": "Experiment protocols, lab templates, run logs."
  },
  {
    "category": "Research Lab",
    "cmd": "/187 data",
    "alias": "data",
    "id": "187DATA",
    "status": "research",
    "purpose": "Dataset cards, schemas, provenance, public DB workflows."
  },
  {
    "category": "Research Lab",
    "cmd": "/187 api",
    "alias": "api",
    "id": "187API",
    "status": "research",
    "purpose": "OpenAPI, public endpoints, examples, health/version routes."
  },
  {
    "category": "Research Lab",
    "cmd": "/187 bench",
    "alias": "bench",
    "id": "187BENCH",
    "status": "research",
    "purpose": "Benchmarks, evals, reproducibility tests."
  },
  {
    "category": "Research Lab",
    "cmd": "/187 nb",
    "alias": "nb",
    "id": "187NB",
    "status": "research",
    "purpose": "Notebook protocol and release checks."
  },
  {
    "category": "Research Lab",
    "cmd": "/187 colab",
    "alias": "colab",
    "id": "187COLAB",
    "status": "research",
    "purpose": "Google Colab execution profiles and notebook templates."
  },
  {
    "category": "Research Lab",
    "cmd": "/187 gap",
    "alias": "gap",
    "id": "187GAP",
    "status": "research",
    "purpose": "GAP computational algebra workflows."
  },
  {
    "category": "Research Lab",
    "cmd": "/187 meta",
    "alias": "meta",
    "id": "187META",
    "status": "research",
    "purpose": "Metadata, citation, identifiers, CodeMeta/DataCite spine."
  },
  {
    "category": "Research Lab",
    "cmd": "/187 prov",
    "alias": "prov",
    "id": "187PROV",
    "status": "research",
    "purpose": "Provenance, run lineage, source-to-result trace."
  },
  {
    "category": "Research Lab",
    "cmd": "/187 crate",
    "alias": "crate",
    "id": "187CRATE",
    "status": "research",
    "purpose": "RO-Crate and Research Release Packet packaging."
  },
  {
    "category": "Research Lab",
    "cmd": "/187 rrp",
    "alias": "rrp",
    "id": "RRP",
    "status": "research",
    "purpose": "Create a Research Release Packet."
  },
  {
    "category": "Local Brain",
    "cmd": "/187 vault",
    "alias": "vault",
    "id": "187VAULT",
    "status": "optional-pack",
    "purpose": "Open the Local Brain / Obsidian + Claudian kit."
  },
  {
    "category": "Local Brain",
    "cmd": "/187 vault init",
    "alias": "vault init",
    "id": "187VAULT",
    "status": "optional-pack",
    "purpose": "Create starter Obsidian vault structure."
  },
  {
    "category": "Local Brain",
    "cmd": "/187 vault sync",
    "alias": "vault sync",
    "id": "187VAULT",
    "status": "optional-pack",
    "purpose": "Sync templates, reports, docs, and bridge files."
  }
] as CommandEntry[];

export const COMMAND_GRAMMAR = "/187 <alias|command> [target] [mode] [depth]";

export const COMMAND_CATEGORIES = Array.from(new Set(COMMANDS.map((command) => command.category)));

export function findCommandSuggestions(input: string) {
  const normalized = input.replace(/^\/187\s*/i, "").replace(/^187\s*/i, "").trim().toLowerCase();
  if (!normalized) return COMMANDS.slice(0, 8);
  return COMMANDS.filter((command) =>
    command.alias.toLowerCase().startsWith(normalized) ||
    command.id.toLowerCase().includes(normalized) ||
    command.cmd.toLowerCase().includes(normalized) ||
    command.purpose.toLowerCase().includes(normalized) ||
    command.category.toLowerCase().includes(normalized)
  ).slice(0, 8);
}
