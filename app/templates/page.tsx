import type { Metadata } from "next";
import { TemplateBar } from "@/components/templates/TemplateBar";
import { templates } from "@/lib/templates";

export const metadata: Metadata = {
  title: "Template gallery — a dozen+ industries",
  description:
    "Fourteen completely different web templates — SaaS, e-commerce, scientific, agency, fintech, healthcare and more — showing the range of design languages and componentry the 187webDESIGN skill produces.",
};

export default function TemplateGallery() {
  return (
    <div className="showcase min-h-screen">
      <TemplateBar name="Template gallery" tone="dark" backHref="/" backLabel="Showcase" />

      <main className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#7C3AED]">
          <span className="h-px w-6 bg-[#7C3AED]" /> {templates.length} industries · {templates.length} design languages
        </span>
        <h1 className="max-w-3xl text-balance text-[clamp(2rem,1.3rem+3vw,3.5rem)] font-bold leading-[1.05] tracking-tight text-white">
          One skill, <span className="sc-grad-text">many worlds</span>
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-white/60">
          Each template is a completely different design language and component set — proof the skill
          adapts the rubric to the brief instead of stamping one look on everything. All static, all
          accessible, all built to the same bar.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <a
              key={t.slug}
              href={`/templates/${t.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="flex h-28 w-full">
                {t.colors.map((c) => (
                  <div key={c} className="flex-1 transition-[flex] duration-300 group-hover:first:flex-[2]" style={{ background: c }} />
                ))}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold tracking-tight text-white">{t.name}</h2>
                  <span className="text-xs text-white/40">{t.tone}</span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#22D3EE]">{t.industry}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{t.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {t.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/5 px-2.5 py-1 text-[0.7rem] text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="mt-4 text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
                  View template →
                </span>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
