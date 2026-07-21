"use client";

import { THEME_CATALOG } from "@/lib/themes/catalog";

export function ThemeCatalogSection() {
  return (
    <section className="relative border-t border-white/10 px-6 py-16 sm:py-20">
      <div className="container-x">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">Catalog</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Native themes</h2>
          <p className="mt-3 text-sm text-white/55">
            From <code className="text-[#39FF14]">lib/themes/catalog.ts</code>. Commands:{" "}
            <code className="text-[#39FF14]">/187 theme list | preview | apply | audit | export</code>
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {THEME_CATALOG.map((theme) => (
            <article
              key={theme.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A0C14]"
            >
              <div className="flex h-16">
                {[
                  theme.colors.background,
                  theme.colors.surface,
                  theme.colors.primary,
                  theme.colors.secondary ?? theme.colors.accent ?? theme.colors.muted,
                  theme.colors.text,
                ].map((c, i) => (
                  <div key={i} className="flex-1" style={{ backgroundColor: c }} title={c} />
                ))}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white">{theme.name}</h3>
                <p className="mt-1 font-mono text-xs text-[#39FF14]">{theme.id}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{theme.description}</p>
                <p className="mt-3 text-xs text-white/40">{theme.usage.join(" · ")}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
