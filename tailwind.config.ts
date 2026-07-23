import type { Config } from "tailwindcss";

/**
 * Tailwind is wired to the design tokens declared in `app/globals.css`.
 * Colors are stored as space-separated RGB channels so they compose with
 * Tailwind's `<alpha-value>` (e.g. `bg-accent/10`). Spacing intentionally
 * stays on Tailwind's default 4/8px-based scale, which matches the 8px
 * rhythm the 187WEBdesign skill prescribes.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          ink: "rgb(var(--accent-ink) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
        },
        success: "rgb(var(--success) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        sc: {
          void: "rgb(var(--sc-void) / <alpha-value>)",
          panel: "rgb(var(--sc-panel) / <alpha-value>)",
          primary: "rgb(var(--sc-primary) / <alpha-value>)",
          secondary: "rgb(var(--sc-secondary) / <alpha-value>)",
          cyan: "rgb(var(--sc-cyan) / <alpha-value>)",
          rose: "rgb(var(--sc-rose) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      fontSize: {
        // Fluid display sizes (mobile-first, scale up via clamp).
        display: ["clamp(2.75rem, 1.6rem + 5.6vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        headline: ["clamp(2rem, 1.3rem + 3.4vw, 3.5rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        title: ["clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        prose: "68ch",
        container: "75rem",
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        card: "0 1px 2px rgb(var(--ink) / 0.04), 0 8px 24px -12px rgb(var(--ink) / 0.18)",
        lift: "0 2px 4px rgb(var(--ink) / 0.06), 0 24px 48px -20px rgb(var(--ink) / 0.28)",
        focus: "0 0 0 3px rgb(var(--accent) / 0.35)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  variants: {
    extend: {
      animation: ["motion-safe", "motion-reduce"],
    },
  },
  plugins: [],
};

export default config;
