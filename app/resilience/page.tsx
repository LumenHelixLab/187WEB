import type { Metadata } from "next";
import { TemplateBar } from "@/components/templates/TemplateBar";
import { OfflineBanner } from "@/components/resilience/OfflineBanner";
import { ResilienceDemo } from "@/components/resilience/ResilienceDemo";

export const metadata: Metadata = {
  title: "Resilience — designing the unhappy path",
  description:
    "Live demos of prebuilt redundancy: skeletons, error boundaries, image fallbacks, empty/offline states — robustness baked into the 187webDESIGN system.",
};

const matrix: [string, string][] = [
  ["Slow network", "Skeletons + reserved space, route loading.tsx, font swap"],
  ["Offline / drop", "OfflineBanner (navigator.onLine), cached static shell"],
  ["Request fails", "ErrorState + retry, fetch timeout + fallback copy"],
  ["No data / empty", "EmptyState with a primary next action"],
  ["JS disabled / fails", "Server/static HTML first, <noscript> reveal"],
  ["Render crash", "app/error.tsx + ErrorBoundary with reset"],
  ["Image fails", "ImageWithFallback, width/height to avoid CLS"],
  ["Reduced motion", "prefers-reduced-motion honored; canvases draw 1 frame"],
  ["Low-end / INP", "Small islands, pause rAF offscreen, throttle"],
  ["404 / wrong URL", "Designed not-found.tsx with routes back"],
];

export default function ResiliencePage() {
  return (
    <div className="showcase min-h-screen">
      <OfflineBanner />
      <TemplateBar name="Resilience — the unhappy path" tone="dark" backHref="/" backLabel="Showcase" />

      <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#22D3EE]">
          <span className="h-px w-6 bg-[#22D3EE]" /> Robustness, prebuilt
        </span>
        <h1 className="max-w-3xl text-balance text-[clamp(2rem,1.3rem+3vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-white">
          Award demos show the happy path. <span className="sc-grad-text">Products survive everything else.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-white/60">
          Every surface here designs its loading, empty, error, and offline state — and the core
          content survives a missing script, a slow radio, or a failed image. Try the live failures
          below.
        </p>

        <div className="mt-12">
          <ResilienceDemo />
        </div>

        <h2 className="mb-5 mt-16 text-xl font-bold tracking-tight text-white">The unhappy-path matrix</h2>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-white/50">
              <tr>
                <th className="px-5 py-3 font-semibold">Scenario</th>
                <th className="px-5 py-3 font-semibold">Prebuilt redundancy</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map(([s, fix], i) => (
                <tr key={s} className={i % 2 ? "bg-white/[0.02]" : ""}>
                  <td className="px-5 py-3 font-medium text-white">{s}</td>
                  <td className="px-5 py-3 text-white/60">{fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <noscript>
          <p className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
            JavaScript is off — and you can still read this. The content is server-rendered/static
            first; the interactive demos above are progressive enhancement.
          </p>
        </noscript>

        <p className="mt-10 text-sm text-white/50">
          Full write-up:{" "}
          <a
            className="underline hover:text-white"
            href="https://github.com/lumenhelixsolutions/187webDESIGN/blob/main/.claude/skills/187webdesign/references/RESILIENCE.md"
          >
            RESILIENCE.md
          </a>
        </p>
      </main>
    </div>
  );
}
