import type { Metadata } from "next";
import { TemplateBar } from "@/components/templates/TemplateBar";

export const metadata: Metadata = { title: "Marketplace — E-commerce template" };

const products = [
  { name: "Aero Runner", price: "$129", tag: "New", hue: "from-[#fde68a] to-[#f59e0b]" },
  { name: "Linen Overshirt", price: "$88", tag: "", hue: "from-[#bae6fd] to-[#0ea5e9]" },
  { name: "Canvas Tote", price: "$42", tag: "Sale", hue: "from-[#fecaca] to-[#ef4444]" },
  { name: "Field Cap", price: "$28", tag: "", hue: "from-[#bbf7d0] to-[#22c55e]" },
  { name: "Trail Bottle", price: "$24", tag: "", hue: "from-[#ddd6fe] to-[#8b5cf6]" },
  { name: "Wool Beanie", price: "$34", tag: "Low stock", hue: "from-[#fed7aa] to-[#fb923c]" },
];

export default function CommerceTemplate() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111]">
      <div className="bg-[#111] py-2 text-center text-xs font-medium tracking-wide text-white">
        Free shipping over $75 · Spring sale: up to 30% off
      </div>
      <TemplateBar name="Marketplace — E-commerce" tone="light" />

      <header className="mx-auto max-w-6xl px-6 pb-10 pt-12">
        <div className="grid items-center gap-8 rounded-3xl bg-[#111] p-8 text-white sm:grid-cols-2 sm:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#F59E0B]">Spring 2026</p>
            <h1 className="mt-3 text-[clamp(2rem,1.3rem+3vw,3.5rem)] font-bold leading-[1.02] tracking-tight">
              Built for the long way round.
            </h1>
            <p className="mt-4 max-w-sm text-white/70">Durable goods for everyday expeditions. Made to be repaired, not replaced.</p>
            <a className="mt-6 inline-block rounded-full bg-[#F59E0B] px-6 py-3 text-sm font-semibold text-[#111]">Shop the collection</a>
          </div>
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#fb923c]" />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap gap-2">
          {["All", "New", "Apparel", "Accessories", "Sale"].map((c, i) => (
            <button key={c} className={`rounded-full px-4 py-1.5 text-sm font-medium ${i === 0 ? "bg-[#111] text-white" : "bg-black/5 text-[#111] hover:bg-black/10"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.name} className="group overflow-hidden rounded-2xl border border-black/5 bg-white">
              <div className={`relative aspect-square bg-gradient-to-br ${p.hue}`}>
                {p.tag ? <span className="absolute left-3 top-3 rounded-full bg-[#111] px-2.5 py-1 text-[0.7rem] font-semibold text-white">{p.tag}</span> : null}
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-black/50">{p.price}</p>
                </div>
                <button className="rounded-full bg-[#111] px-4 py-2 text-xs font-semibold text-white transition-transform group-hover:-translate-y-0.5">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-black/10 px-6 py-8 text-center text-sm text-black/50">
        Marketplace — a 187webDESIGN template. <a href="/templates" className="underline">All templates</a>
      </footer>
    </div>
  );
}
