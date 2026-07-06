import type { Metadata } from "next";
import { TemplateBar } from "@/components/templates/TemplateBar";

export const metadata: Metadata = { title: "The Dispatch — Editorial template" };

const articles = [
  { cat: "Technology", title: "The quiet return of the static site", hue: "from-[#cbd5e1] to-[#475569]" },
  { cat: "Culture", title: "Why everyone is suddenly typesetting again", hue: "from-[#fecaca] to-[#b91c1c]" },
  { cat: "Science", title: "Inside the lab verifying math at scale", hue: "from-[#bbf7d0] to-[#15803d]" },
  { cat: "Business", title: "Design systems grow up and get budgets", hue: "from-[#fde68a] to-[#b45309]" },
];

export default function EditorialTemplate() {
  return (
    <div className="min-h-screen bg-[#F7F3E8] font-serif text-[#11131A]">
      <TemplateBar name="The Dispatch — News / Editorial" tone="light" />

      <header className="border-b-2 border-[#11131A]">
        <div className="mx-auto max-w-5xl px-6 py-6 text-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#B91C1C]">Tuesday · June 30, 2026 · No. 1,872</p>
          <h1 className="mt-2 text-[clamp(2.4rem,1.4rem+5vw,5rem)] font-black tracking-tight">The Dispatch</h1>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[#11131A]/55">Design · Technology · Culture</p>
        </div>
      </header>

      <article className="mx-auto max-w-5xl px-6 py-10">
        <p className="font-mono text-xs uppercase tracking-widest text-[#B91C1C]">Lead story</p>
        <h2 className="mt-2 text-[clamp(1.8rem,1.2rem+2.6vw,3.2rem)] font-bold leading-[1.05]">
          The web rediscovers craft, one hairline at a time
        </h2>
        <p className="mt-2 text-sm italic text-[#11131A]/60">By A. Reporter · Senior correspondent</p>
        <div className="mt-5 gap-8 sm:columns-2 [&>p]:mb-4">
          <p className="leading-relaxed">
            After a decade of templated sameness, studios are returning to the slow disciplines —
            measured grids, real typography, motion that means something. The shift is less a trend
            than a correction.
          </p>
          <p className="leading-relaxed">
            Performance budgets and accessibility law have done what taste alone could not: forced
            teams to ship less, but better. The result reads quieter and loads faster.
          </p>
          <p className="leading-relaxed">
            &ldquo;The constraint is the brief,&rdquo; one director said. &ldquo;When every element
            has to earn its place, the page gets sharper.&rdquo;
          </p>
        </div>
      </article>

      <section className="mx-auto max-w-5xl border-t border-[#11131A]/20 px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((a) => (
            <article key={a.title} className="group">
              <div className={`aspect-[3/2] bg-gradient-to-br ${a.hue}`} />
              <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-widest text-[#B91C1C]">{a.cat}</p>
              <h3 className="mt-1 text-lg font-bold leading-snug group-hover:underline">{a.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t-2 border-[#11131A] px-6 py-8 text-center font-mono text-xs text-[#11131A]/55">
        The Dispatch — a 187webDESIGN template. <a href="/templates" className="underline">All templates</a>
      </footer>
    </div>
  );
}
