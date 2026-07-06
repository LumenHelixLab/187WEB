import type { Metadata } from "next";
import { TemplateBar } from "@/components/templates/TemplateBar";

export const metadata: Metadata = { title: "Wellspring — Healthcare template" };

const services = [
  { t: "Primary care", d: "Same-week visits with a dedicated physician." },
  { t: "Pediatrics", d: "Gentle, family-centered care for every age." },
  { t: "Dermatology", d: "Screenings, treatments, and tele-derm." },
  { t: "Telehealth", d: "Secure video visits from anywhere." },
];

export default function HealthcareTemplate() {
  return (
    <div className="min-h-screen bg-[#F2FBF9] text-[#0B3B3A]">
      <TemplateBar name="Wellspring — Healthcare" tone="light" />

      <header className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-12 pt-16 lg:grid-cols-2">
        <div>
          <span className="inline-flex rounded-full bg-[#0E7C7B]/10 px-3 py-1 text-xs font-semibold text-[#0E7C7B]">Accepting new patients</span>
          <h1 className="mt-5 text-[clamp(2.2rem,1.4rem+4vw,3.75rem)] font-bold leading-[1.05] tracking-tight">
            Care that listens, close to home.
          </h1>
          <p className="mt-4 max-w-md text-[#0B3B3A]/70">
            A modern clinic built around you — same-week appointments, transparent pricing, and
            doctors who remember your name.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a className="rounded-full bg-[#0E7C7B] px-6 py-3 text-sm font-semibold text-white">Book appointment</a>
            <a className="rounded-full px-6 py-3 text-sm font-semibold text-[#0E7C7B] ring-1 ring-[#0E7C7B]/30">Call (555) 010-2020</a>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#0B3B3A]/60">
            <span>★ 4.9 · 2,400 reviews</span><span>Board-certified</span><span>Most insurance accepted</span>
          </div>
        </div>

        <form className="rounded-3xl border border-[#0E7C7B]/15 bg-white p-6 shadow-sm sm:p-8" aria-label="Request an appointment">
          <h2 className="text-lg font-semibold">Request an appointment</h2>
          <div className="mt-4 grid gap-3">
            <label className="text-sm font-medium">Full name
              <input className="mt-1 h-11 w-full rounded-lg border border-[#0B3B3A]/15 px-3 outline-none focus-visible:border-[#0E7C7B]" placeholder="Alex Rivera" autoComplete="name" />
            </label>
            <label className="text-sm font-medium">Email
              <input type="email" inputMode="email" autoComplete="email" className="mt-1 h-11 w-full rounded-lg border border-[#0B3B3A]/15 px-3 outline-none focus-visible:border-[#0E7C7B]" placeholder="you@email.com" />
            </label>
            <label className="text-sm font-medium">Reason for visit
              <select className="mt-1 h-11 w-full rounded-lg border border-[#0B3B3A]/15 bg-white px-3 outline-none focus-visible:border-[#0E7C7B]">
                <option>Annual check-up</option><option>New concern</option><option>Follow-up</option>
              </select>
            </label>
            <button type="button" className="mt-2 h-11 rounded-lg bg-[#0E7C7B] font-semibold text-white">Request appointment</button>
          </div>
        </form>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.t} className="rounded-2xl border border-[#0E7C7B]/15 bg-white p-6">
              <div className="mb-3 h-9 w-9 rounded-lg bg-[#0E7C7B]/15" />
              <h3 className="font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm text-[#0B3B3A]/65">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#0E7C7B]/15 px-6 py-8 text-center text-sm text-[#0B3B3A]/50">
        Wellspring — a 187webDESIGN template. <a href="/templates" className="underline">All templates</a>
      </footer>
    </div>
  );
}
