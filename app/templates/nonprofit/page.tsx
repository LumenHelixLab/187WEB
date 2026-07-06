import type { Metadata } from "next";
import { TemplateBar } from "@/components/templates/TemplateBar";
import { CountUp } from "@/components/showcase/primitives";

export const metadata: Metadata = { title: "Rootwork — Nonprofit template" };

const stories = [
  { place: "Kisumu, KE", text: "A community-run nursery now supplies 40 farms with drought-resilient seedlings." },
  { place: "Oaxaca, MX", text: "Restored terraces brought a dry hillside back into year-round cultivation." },
  { place: "Assam, IN", text: "Riverbank planting cut seasonal erosion by half in two seasons." },
];

export default function NonprofitTemplate() {
  return (
    <div className="min-h-screen bg-[#0E2A1E] text-[#F3EFE0]">
      <TemplateBar name="Rootwork — Nonprofit / Charity" tone="dark" />

      <header className="mx-auto max-w-4xl px-6 pb-12 pt-16 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#34D399]">Reforesting with communities</p>
        <h1 className="mx-auto mt-5 max-w-3xl text-[clamp(2.2rem,1.4rem+4vw,4rem)] font-bold leading-[1.04] tracking-tight">
          Plant roots. Grow futures.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[#F3EFE0]/70">
          We fund and train local growers to restore degraded land — measurable canopy, real
          livelihoods, no greenwashing.
        </p>
        <a className="mt-7 inline-block rounded-full bg-[#34D399] px-7 py-3 text-sm font-bold text-[#0E2A1E]">Donate</a>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="grid grid-cols-3 gap-6 rounded-3xl border border-[#34D399]/20 bg-[#34D399]/[0.05] p-8 text-center">
          <div><div className="text-3xl font-bold text-[#34D399] sm:text-4xl"><CountUp to={2} />.4M</div><p className="mt-1 text-xs text-[#F3EFE0]/55">trees planted</p></div>
          <div><div className="text-3xl font-bold text-[#34D399] sm:text-4xl"><CountUp to={38} /></div><p className="mt-1 text-xs text-[#F3EFE0]/55">communities</p></div>
          <div><div className="text-3xl font-bold text-[#34D399] sm:text-4xl"><CountUp to={92} />%</div><p className="mt-1 text-xs text-[#F3EFE0]/55">to programs</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {["$25 · a grove", "$60 · a grower kit", "$150 · a nursery"].map((tier, i) => (
            <button key={tier} className={`rounded-2xl px-5 py-4 text-sm font-semibold ${i === 1 ? "bg-[#34D399] text-[#0E2A1E]" : "ring-1 ring-[#F3EFE0]/20"}`}>
              {tier}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-[#34D399]">From the field</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {stories.map((s) => (
            <div key={s.place} className="rounded-2xl border border-[#F3EFE0]/10 p-6">
              <div className="mb-3 h-28 rounded-xl bg-gradient-to-br from-[#34D399]/40 to-[#0E2A1E]" />
              <p className="font-mono text-xs text-[#34D399]">{s.place}</p>
              <p className="mt-2 text-sm text-[#F3EFE0]/75">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#F3EFE0]/10 px-6 py-8 text-center text-sm text-[#F3EFE0]/45">
        Rootwork — a 187webDESIGN template. <a href="/templates" className="underline">All templates</a>
      </footer>
    </div>
  );
}
