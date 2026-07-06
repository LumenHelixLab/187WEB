import type { Metadata } from "next";
import { TemplateBar } from "@/components/templates/TemplateBar";

export const metadata: Metadata = { title: "Maya Chen — Portfolio template" };

const projects = [
  { name: "Field Notes", year: "2026", role: "Product design", hue: "from-[#c7d2fe] to-[#2440E6]" },
  { name: "Cadence", year: "2025", role: "Brand + web", hue: "from-[#fbcfe8] to-[#db2777]" },
  { name: "Atlas Mobile", year: "2025", role: "iOS app", hue: "from-[#bbf7d0] to-[#059669]" },
  { name: "Press Play", year: "2024", role: "Design system", hue: "from-[#fde68a] to-[#d97706]" },
];

export default function PortfolioTemplate() {
  return (
    <div className="min-h-screen bg-[#F4F2EC] text-[#11131A]">
      <TemplateBar name="Maya Chen — Portfolio" tone="light" />

      <header className="mx-auto max-w-4xl px-6 pb-12 pt-20">
        <p className="text-sm font-medium text-[#2440E6]">Product designer · San Francisco</p>
        <h1 className="mt-4 text-[clamp(2.2rem,1.4rem+4vw,4rem)] font-semibold leading-[1.05] tracking-tight">
          I design calm, useful products for complex problems.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#11131A]/65">
          Ten years across fintech, health, and developer tools. Currently designing systems at a
          Series B startup and taking select freelance work.
        </p>
      </header>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <a key={p.name} className="group block">
              <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${p.hue} transition-transform duration-300 group-hover:-translate-y-1`} />
              <div className="mt-3 flex items-baseline justify-between">
                <h2 className="font-semibold">{p.name}</h2>
                <span className="text-sm text-[#11131A]/45">{p.year}</span>
              </div>
              <p className="text-sm text-[#11131A]/55">{p.role}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="rounded-2xl border border-[#11131A]/10 bg-white p-8 sm:p-10">
          <h2 className="text-xl font-semibold tracking-tight">Let us work together</h2>
          <p className="mt-2 max-w-md text-[#11131A]/60">Open to product and design-systems roles, and a couple of freelance engagements per quarter.</p>
          <a className="mt-5 inline-block rounded-full bg-[#11131A] px-6 py-3 text-sm font-semibold text-white">hello@mayachen.design</a>
        </div>
      </section>

      <footer className="border-t border-[#11131A]/10 px-6 py-8 text-center text-sm text-[#11131A]/50">
        Maya Chen — a 187webDESIGN template. <a href="/templates" className="underline">All templates</a>
      </footer>
    </div>
  );
}
