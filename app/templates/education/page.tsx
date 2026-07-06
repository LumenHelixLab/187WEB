import type { Metadata } from "next";
import { TemplateBar } from "@/components/templates/TemplateBar";

export const metadata: Metadata = { title: "Curio — Education template" };

const modules = [
  { n: 1, title: "Foundations of design", lessons: 8 },
  { n: 2, title: "Type, color, and layout", lessons: 11 },
  { n: 3, title: "Prototyping and motion", lessons: 9 },
  { n: 4, title: "Shipping and critique", lessons: 7 },
];
const instructors = [
  { name: "Dr. Amara Osei", role: "Lead instructor", hue: "from-[#4F46E5] to-[#a855f7]" },
  { name: "Ren Tanaka", role: "Motion + prototyping", hue: "from-[#f59e0b] to-[#FACC15]" },
  { name: "Priya Nair", role: "Design systems", hue: "from-[#10b981] to-[#34d399]" },
];

export default function EducationTemplate() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] text-[#1c1b29]">
      <TemplateBar name="Curio — Education / Courses" tone="light" />

      <header className="mx-auto max-w-5xl px-6 pb-12 pt-16 text-center">
        <span className="inline-flex rounded-full bg-[#FACC15] px-3 py-1 text-xs font-bold text-[#1c1b29]">Cohort 12 · starts Apr 6</span>
        <h1 className="mx-auto mt-5 max-w-3xl text-[clamp(2.2rem,1.4rem+4vw,4rem)] font-extrabold leading-[1.02] tracking-tight">
          Become a product designer in <span className="text-[#4F46E5]">12 weeks</span>.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[#1c1b29]/65">
          A project-based program with live critique, real briefs, and a portfolio you can ship.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a className="rounded-full bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white">Enroll now</a>
          <a className="rounded-full px-6 py-3 text-sm font-semibold ring-1 ring-[#1c1b29]/15">Download syllabus</a>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="mb-5 text-sm font-bold uppercase tracking-widest text-[#4F46E5]">Curriculum</h2>
        <div className="space-y-3">
          {modules.map((m) => (
            <div key={m.n} className="flex items-center gap-4 rounded-2xl border border-[#1c1b29]/10 bg-white p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#4F46E5]/10 font-bold text-[#4F46E5]">{m.n}</span>
              <span className="flex-1 font-semibold">{m.title}</span>
              <span className="text-sm text-[#1c1b29]/45">{m.lessons} lessons</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#4F46E5]">Your instructors</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {instructors.map((i) => (
            <div key={i.name} className="rounded-2xl border border-[#1c1b29]/10 bg-white p-6 text-center">
              <div className={`mx-auto h-16 w-16 rounded-full bg-gradient-to-br ${i.hue}`} />
              <h3 className="mt-3 font-semibold">{i.name}</h3>
              <p className="text-sm text-[#1c1b29]/55">{i.role}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#1c1b29]/10 px-6 py-8 text-center text-sm text-[#1c1b29]/50">
        Curio — a 187webDESIGN template. <a href="/templates" className="underline">All templates</a>
      </footer>
    </div>
  );
}
