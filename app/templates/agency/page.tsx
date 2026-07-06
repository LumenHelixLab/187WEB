import type { Metadata } from "next";
import { TemplateBar } from "@/components/templates/TemplateBar";
import { Marquee } from "@/components/showcase/primitives";

export const metadata: Metadata = { title: "STUDIO/187 — Agency template" };

const work = [
  { n: "01", client: "Voltaic", type: "Brand + Site", year: "2026" },
  { n: "02", client: "Mertens Studio", type: "Art Direction", year: "2025" },
  { n: "03", client: "Hexa Foods", type: "Packaging + Web", year: "2025" },
  { n: "04", client: "North Atlas", type: "Design System", year: "2024" },
];

export default function AgencyTemplate() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <TemplateBar name="STUDIO/187 — Creative agency" tone="dark" />

      <header className="px-6 pb-10 pt-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-[clamp(2.6rem,1rem+10vw,9rem)] font-extrabold uppercase leading-[0.82] tracking-tighter">
            We make
            <br />
            brands <span className="text-[#C6FF00]">loud.</span>
          </h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t-2 border-white pt-6">
            <p className="max-w-md text-lg text-white/70">
              An independent design studio for companies that refuse to blend in. Strategy, identity,
              and websites with teeth.
            </p>
            <a className="rounded-none bg-[#C6FF00] px-7 py-4 text-sm font-bold uppercase tracking-wide text-[#0A0A0A]">
              Start a project
            </a>
          </div>
        </div>
      </header>

      <div className="border-y-2 border-white py-4 text-[#C6FF00]">
        <Marquee items={["BRANDING", "ART DIRECTION", "WEB DESIGN", "MOTION", "TYPE", "STRATEGY"]} speed={26} />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-8 font-mono text-xs uppercase tracking-widest text-white/40">Selected work</p>
        <ul>
          {work.map((w) => (
            <li key={w.n} className="group grid grid-cols-[auto,1fr,auto] items-center gap-6 border-t border-white/15 py-6 transition-colors hover:bg-white/[0.03] sm:py-8">
              <span className="font-mono text-sm text-white/40">{w.n}</span>
              <span className="text-2xl font-bold uppercase tracking-tight transition-colors group-hover:text-[#C6FF00] sm:text-4xl">{w.client}</span>
              <span className="text-right text-sm text-white/50">{w.type} · {w.year}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-wrap gap-x-10 gap-y-3 text-sm font-semibold uppercase tracking-wide text-white/50">
          <span>Awwwards · SOTD ×3</span>
          <span>CSS Design Awards</span>
          <span>FWA of the Day</span>
          <span>Webby Nominee</span>
        </div>
      </section>

      <footer className="border-t border-white/15 px-6 py-8 text-center text-sm text-white/40">
        STUDIO/187 — a 187webDESIGN template. <a href="/templates" className="underline">All templates</a>
      </footer>
    </div>
  );
}
