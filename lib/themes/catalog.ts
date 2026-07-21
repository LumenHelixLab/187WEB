import type { ThemeContract } from "./types";

/**
 * Native 187THEME catalog.
 * Starter set maps to 187WEB brand poles + conceptual Theme Factory slots.
 * Vendor Theme Factory files under third_party/anthropic/theme-factory/ when available.
 */
export const THEME_CATALOG: ThemeContract[] = [
  {
    id: "abyssal-killer",
    name: "Abyssal Killer",
    description: "Default 187WEB dark surface: near-black void, neon green primary, violet accent.",
    colors: {
      background: "#050608",
      surface: "#0A0C14",
      text: "#ECEDF7",
      muted: "#9aa1bd",
      primary: "#39FF14",
      secondary: "#a855f7",
      accent: "#22d3ee",
    },
    typography: {
      display: "var(--font-display), system-ui, sans-serif",
      body: "var(--font-sans), system-ui, sans-serif",
      mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
    },
    usage: ["Product shell", "Showcase", "Agent pages", "Motion lab"],
    source: {
      repository: "LumenHelixLab/187WEB",
      commit: "native",
      license: "SEE LICENSE IN LICENSE",
    },
  },
  {
    id: "warm-blueprint",
    name: "Warm Blueprint",
    description: "Paper + ink marketing pole: warm off-white, deep slate, electric blueprint blue.",
    colors: {
      background: "#fafaf7",
      surface: "#ffffff",
      text: "#11131a",
      muted: "#5b6170",
      primary: "#2440e6",
      secondary: "#c8c6b2",
      accent: "#2440e6",
    },
    typography: {
      display: "var(--font-display), system-ui, sans-serif",
      body: "var(--font-sans), system-ui, sans-serif",
    },
    usage: ["Marketing templates", "Print-adjacent docs", "Calm product UI"],
    source: {
      repository: "LumenHelixLab/187WEB",
      commit: "native",
      license: "SEE LICENSE IN LICENSE",
    },
  },
  {
    id: "neon-security",
    name: "Neon Security",
    description: "NATASHA-forward palette: rose primary on deep carbon for threat and audit surfaces.",
    colors: {
      background: "#0a0608",
      surface: "#140a0f",
      text: "#fce7f3",
      muted: "#c4a0b0",
      primary: "#f43f5e",
      secondary: "#facc15",
      accent: "#39FF14",
    },
    typography: {
      display: "var(--font-display), system-ui, sans-serif",
      body: "var(--font-sans), system-ui, sans-serif",
      mono: "ui-monospace, monospace",
    },
    usage: ["Security gates", "Threat reports", "Red-team demos"],
    source: {
      repository: "LumenHelixLab/187WEB",
      commit: "native",
      license: "SEE LICENSE IN LICENSE",
    },
  },
  {
    id: "motion-lab",
    name: "Motion Lab",
    description: "Cyan and lime highlights for GSAP/R3F demos and kinetic type samples.",
    colors: {
      background: "#050810",
      surface: "#0a1018",
      text: "#e8f4ff",
      muted: "#7a93a8",
      primary: "#22d3ee",
      secondary: "#85c918",
      accent: "#a78bfa",
    },
    typography: {
      display: "var(--font-display), system-ui, sans-serif",
      body: "var(--font-sans), system-ui, sans-serif",
    },
    usage: ["Motion lab", "187TYPE / 187HERO demos", "Showcase motion cards"],
    source: {
      repository: "LumenHelixLab/187WEB",
      commit: "native",
      license: "SEE LICENSE IN LICENSE",
    },
  },
  {
    id: "cinematic-launch",
    name: "Cinematic Launch",
    description: "High-contrast launch deck: black stage, white type, electric accents for scroll heroes.",
    colors: {
      background: "#000000",
      surface: "#0c0c0c",
      text: "#f5f5f5",
      muted: "#a3a3a3",
      primary: "#ffffff",
      secondary: "#39FF14",
      accent: "#7c3aed",
    },
    typography: {
      display: "var(--font-display), system-ui, sans-serif",
      body: "var(--font-sans), system-ui, sans-serif",
    },
    usage: ["Launch landings", "Cinematic Launch SkillChain", "Product Hunt one-pagers"],
    source: {
      repository: "LumenHelixLab/187WEB",
      commit: "native",
      license: "SEE LICENSE IN LICENSE",
    },
  },
];

export function getTheme(id: string): ThemeContract | undefined {
  return THEME_CATALOG.find((t) => t.id === id);
}

export function listThemeIds(): string[] {
  return THEME_CATALOG.map((t) => t.id);
}
