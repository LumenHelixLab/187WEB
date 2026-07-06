import type { Metadata } from "next";
import { TemplateBar } from "@/components/templates/TemplateBar";

export const metadata: Metadata = { title: "Maison — Real estate template" };

const listings = [
  { price: "$1,250,000", place: "Hillcrest, 4 bd · 3 ba · 2,800 sqft", hue: "from-[#d6e4d9] to-[#2F5D43]" },
  { price: "$865,000", place: "Old Town, 3 bd · 2 ba · 1,900 sqft", hue: "from-[#e7ded0] to-[#9c7a4d]" },
  { price: "$2,400,000", place: "Marina, 5 bd · 4 ba · 3,600 sqft", hue: "from-[#cfe0ea] to-[#3a6b8a]" },
];

export default function RealEstateTemplate() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] font-serif text-[#1B1B1B]">
      <TemplateBar name="Maison — Real estate" tone="light" />

      <header className="mx-auto max-w-5xl px-6 pb-10 pt-16 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#2F5D43]">Boutique residential</p>
        <h1 className="mx-auto mt-5 max-w-3xl text-[clamp(2.2rem,1.4rem+4vw,4rem)] leading-[1.05]">
          Find a place that feels like yours.
        </h1>
        <div className="mx-auto mt-7 flex max-w-xl flex-col gap-2 rounded-2xl border border-[#1B1B1B]/15 bg-white p-2 sm:flex-row">
          <input className="h-12 flex-1 rounded-xl px-4 font-sans text-sm outline-none" placeholder="City, neighborhood, or ZIP" aria-label="Search location" />
          <select className="h-12 rounded-xl bg-[#F5F1E8] px-3 font-sans text-sm" aria-label="Price range"><option>Any price</option><option>$500k+</option><option>$1M+</option></select>
          <button className="h-12 rounded-xl bg-[#2F5D43] px-6 font-sans text-sm font-semibold text-white">Search</button>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-6 sm:grid-cols-3">
          {listings.map((l) => (
            <div key={l.place} className="overflow-hidden rounded-2xl border border-[#1B1B1B]/10 bg-white">
              <div className={`aspect-[4/3] bg-gradient-to-br ${l.hue}`} />
              <div className="p-5">
                <p className="text-xl font-semibold">{l.price}</p>
                <p className="mt-1 font-sans text-sm text-[#1B1B1B]/60">{l.place}</p>
                <button className="mt-4 w-full rounded-full border border-[#2F5D43] py-2 font-sans text-sm font-semibold text-[#2F5D43] transition-colors hover:bg-[#2F5D43] hover:text-white">
                  Schedule a tour
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-[#2F5D43] p-8 text-center text-[#F5F1E8] sm:flex-row sm:text-left">
          <div className="h-20 w-20 shrink-0 rounded-full bg-[#F5F1E8]/20" />
          <div className="flex-1">
            <p className="font-mono text-xs uppercase tracking-widest text-[#F5F1E8]/70">Your agent</p>
            <h2 className="mt-1 text-xl font-semibold">Eleanor Voss</h2>
            <p className="font-sans text-sm text-[#F5F1E8]/75">18 years in the district · 300+ closings · responds within the hour.</p>
          </div>
          <a className="rounded-full bg-[#F5F1E8] px-6 py-3 font-sans text-sm font-semibold text-[#2F5D43]">Contact Eleanor</a>
        </div>
      </section>

      <footer className="border-t border-[#1B1B1B]/10 px-6 py-8 text-center font-sans text-sm text-[#1B1B1B]/50">
        Maison — a 187webDESIGN template. <a href="/templates" className="underline">All templates</a>
      </footer>
    </div>
  );
}
