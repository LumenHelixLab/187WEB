"use client";

import { useState } from "react";

/** Accessible single-open FAQ accordion, themeable via `accent` (any CSS color). Reused across templates. */
export function FaqAccordion({
  items,
  accent,
  tone = "dark",
}: {
  items: Array<{ q: string; a: string }>;
  accent: string;
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState(0);
  const dark = tone === "dark";
  return (
    <div className={`divide-y rounded-2xl border ${dark ? "divide-white/10 border-white/10" : "divide-black/10 border-black/10"}`}>
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(expanded ? -1 : i)}
              aria-expanded={expanded}
              className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-inset ${dark ? "text-white" : "text-[#11131A]"}`}
              style={{ ["--tw-ring-color" as string]: accent }}
            >
              {item.q}
              <span aria-hidden className={`shrink-0 transition-transform duration-200 ${expanded ? "rotate-45" : ""}`} style={{ color: accent }}>
                +
              </span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className={`px-5 pb-4 text-sm leading-relaxed ${dark ? "text-white/60" : "text-[#5B6170]"}`}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
