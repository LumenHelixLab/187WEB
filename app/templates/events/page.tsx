import type { Metadata } from "next";
import { TemplateBar } from "@/components/templates/TemplateBar";

export const metadata: Metadata = { title: "Frequency — Events template" };

const schedule = [
  ["09:00", "Registration + coffee"],
  ["10:00", "Keynote — The next interface"],
  ["11:30", "Workshop tracks (3 rooms)"],
  ["13:00", "Lunch + demos"],
  ["14:30", "Panel — Designing with AI"],
  ["16:00", "Lightning talks"],
];
const speakers = ["A. Mensah", "L. Park", "R. Díaz", "S. Okafor", "J. Wei", "M. Haddad"];

export default function EventsTemplate() {
  return (
    <div className="min-h-screen bg-[#0A0613] text-white">
      <TemplateBar name="Frequency — Events / Conference" tone="dark" />

      <header className="relative overflow-hidden px-6 pb-12 pt-16 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[40vw] w-[40vw] rounded-full bg-[#FF4D8D]/25 blur-[120px]" />
          <div className="absolute right-1/4 top-10 h-[34vw] w-[34vw] rounded-full bg-[#22D3EE]/20 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#22D3EE]">Apr 18–19, 2026 · Berlin</p>
          <h1 className="mt-5 text-[clamp(2.6rem,1.4rem+6vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight">
            FREQUENCY
            <span className="block bg-gradient-to-r from-[#FF4D8D] to-[#22D3EE] bg-clip-text text-transparent">/26</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-white/65">Two days on the future of interface, motion, and AI-assisted design.</p>
          <div className="mt-7 flex justify-center gap-3">
            {[["02", "days"], ["14", "hrs"], ["37", "min"]].map(([n, l]) => (
              <div key={l} className="rounded-xl bg-white/5 px-5 py-3 ring-1 ring-white/10">
                <div className="text-2xl font-bold tabular-nums">{n}</div>
                <div className="text-[0.65rem] uppercase tracking-widest text-white/45">{l}</div>
              </div>
            ))}
          </div>
          <a className="mt-7 inline-block rounded-full bg-gradient-to-r from-[#FF4D8D] to-[#22D3EE] px-7 py-3 text-sm font-bold text-[#0A0613]">Get tickets</a>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-[#FF4D8D]">Day one</h2>
        <ul className="space-y-px overflow-hidden rounded-2xl">
          {schedule.map(([time, title]) => (
            <li key={time} className="flex items-center gap-5 bg-white/[0.03] px-5 py-4">
              <span className="font-mono text-sm text-[#22D3EE]">{time}</span>
              <span className="font-medium">{title}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-[#FF4D8D]">Speakers</h2>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {speakers.map((s, i) => (
            <div key={s} className="text-center">
              <div className="mx-auto aspect-square rounded-2xl bg-gradient-to-br from-[#FF4D8D] to-[#22D3EE]" style={{ filter: `hue-rotate(${i * 40}deg)` }} />
              <p className="mt-2 text-sm font-medium">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/40">
        Frequency — a 187webDESIGN template. <a href="/templates" className="underline">All templates</a>
      </footer>
    </div>
  );
}
