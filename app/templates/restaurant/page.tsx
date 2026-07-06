import type { Metadata } from "next";
import { TemplateBar } from "@/components/templates/TemplateBar";

export const metadata: Metadata = { title: "Ember & Oak — Restaurant template" };

const menu = {
  Starters: [
    ["Charred leek, hazelnut, brown butter", "16"],
    ["Cured trout, fennel, crème fraîche", "19"],
    ["Wood-roast beets, whipped goat cheese", "15"],
  ],
  Mains: [
    ["Dry-aged ribeye, bone marrow, watercress", "54"],
    ["Hearth-roast chicken, garlic, jus", "34"],
    ["King oyster mushroom, barley, sage", "29"],
  ],
  Desserts: [
    ["Burnt honey tart, crème fraîche", "13"],
    ["Dark chocolate, olive oil, sea salt", "14"],
  ],
};

export default function RestaurantTemplate() {
  return (
    <div className="min-h-screen bg-[#1A1410] font-serif text-[#F3EAD8]">
      <TemplateBar name="Ember &amp; Oak — Restaurant" tone="dark" />

      <header className="px-6 pb-14 pt-20 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#C8A24B]">Wood-fired · Seasonal</p>
        <h1 className="mt-5 text-[clamp(2.6rem,1.4rem+6vw,5.5rem)] leading-none">Ember &amp; Oak</h1>
        <p className="mx-auto mt-5 max-w-md text-[#F3EAD8]/70">
          A hearth-driven kitchen in the old quarter. Live fire, local growers, an unhurried table.
        </p>
        <a className="mt-7 inline-block border border-[#C8A24B] px-7 py-3 text-sm font-medium uppercase tracking-widest text-[#C8A24B] transition-colors hover:bg-[#C8A24B] hover:text-[#1A1410]">
          Reserve a table
        </a>
      </header>

      <section className="mx-auto max-w-2xl px-6 py-10">
        {Object.entries(menu).map(([section, items]) => (
          <div key={section} className="mb-10">
            <h2 className="mb-5 text-center font-mono text-xs uppercase tracking-[0.3em] text-[#C8A24B]">{section}</h2>
            <ul className="space-y-4">
              {items.map(([name, price]) => (
                <li key={name} className="flex items-baseline gap-3">
                  <span className="text-[#F3EAD8]">{name}</span>
                  <span className="h-px flex-1 self-end border-b border-dotted border-[#C8A24B]/40" />
                  <span className="text-[#C8A24B]">{price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="border-t border-[#C8A24B]/20 px-6 py-12 text-center">
        <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-3 font-mono text-sm">
          <div>
            <p className="text-[#C8A24B]">Hours</p>
            <p className="mt-2 text-[#F3EAD8]/70">Wed–Sun<br />5pm – 11pm</p>
          </div>
          <div>
            <p className="text-[#C8A24B]">Find us</p>
            <p className="mt-2 text-[#F3EAD8]/70">14 Kiln Lane<br />Old Quarter</p>
          </div>
          <div>
            <p className="text-[#C8A24B]">Reserve</p>
            <p className="mt-2 text-[#F3EAD8]/70">(0) 20 7946<br />book@emberoak.co</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#C8A24B]/20 px-6 py-8 text-center font-mono text-xs text-[#F3EAD8]/40">
        Ember &amp; Oak — a 187webDESIGN template. <a href="/templates" className="underline">All templates</a>
      </footer>
    </div>
  );
}
