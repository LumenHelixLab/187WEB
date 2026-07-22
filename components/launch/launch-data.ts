export type NatashaModule = {
  id: string;
  alias: string;
  legacy?: string;
  purpose: string;
  color: string;
};

export const charlotteModules: NatashaModule[] = [
  {
    id: "THREAD",
    alias: "th",
    legacy: "widow-weaver",
    purpose: "Prompt shaping, intent extraction, rewrite, refactor",
    color: "#39FF14",
  },
  {
    id: "COMPRESS",
    alias: "cmp",
    purpose: "Loss-bounded token and context distillation",
    color: "#22d3ee",
  },
  {
    id: "TENSION",
    alias: "tu",
    legacy: "neuro-toxin / TUNE",
    purpose: "Inference profile and model behavior tuning",
    color: "#f43f5e",
  },
  {
    id: "SPARK",
    alias: "brainstorm",
    purpose: "Bounded divergent ideation and decision records",
    color: "#f59e0b",
  },
  {
    id: "CORD",
    alias: "co",
    legacy: "swarm-mind",
    purpose: "Expert role dispatch and specialist routing",
    color: "#a855f7",
  },
  {
    id: "SCOUT",
    alias: "ch",
    purpose: "Compliant web, source, and repository research",
    color: "#3b82f6",
  },
  {
    id: "LAB",
    alias: "lb",
    legacy: "silk-sandbox",
    purpose: "Isolated execution and test workspace",
    color: "#06b6d4",
  },
  {
    id: "FUSE",
    alias: "fuse",
    purpose: "Evidence-weighted synthesis and conflict resolution",
    color: "#ec4899",
  },
];

export const quickStats = [
  { label: "Premier access systems", value: "2" },
  { label: "Unified sweep", value: "/187++" },
  { label: "First-class skills", value: "27+" },
  { label: "Command grammar", value: "/187" },
];

export const installSnippets = {
  macos: "npm install\nnpm run db:push\nnpm run db:seed\nnpm run dev",
  windows: "npm install\nnpm run db:push\nnpm run db:seed\nnpm run dev",
  wsl: "npm install\nnpm run db:push\nnpm run db:seed\nnpm run dev",
} as const;
