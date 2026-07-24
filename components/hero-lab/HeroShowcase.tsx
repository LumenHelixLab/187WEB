"use client";

import type { ComponentType } from "react";
import { Reveal } from "@/components/Reveal";
import { SplashLoader, LogoMorph, FaceTracker, MiniGame, CenterNav, ShaderWipe, VolumeFog, HoloDeconstruct } from "./demos";

type Group = { id: string; label: string; blurb: string; demos: ComponentType[] };

const GROUPS: Group[] = [
  {
    id: "immersive",
    label: "Immersive & interactive",
    blurb: "The first-impression set — a playable canvas mini-game, a volumetric fog cursor, holographic deconstruction, and a GLSL-style dissolve.",
    demos: [MiniGame, VolumeFog, HoloDeconstruct, ShaderWipe, CenterNav],
  },
  {
    id: "splash",
    label: "Splash & mascot",
    blurb: "Loaders and brand-mascot moments — a walking splash loader, a morphing logo intro, and a pointer-tracking mascot face.",
    demos: [FaceTracker, SplashLoader, LogoMorph],
  },
];

const TOTAL = GROUPS.reduce((n, g) => n + g.demos.length, 0);

export function HeroShowcase() {
  return (
    <section id="hero-lab" className="relative border-t border-white/10 bg-[#050608] px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
            <span className="h-px w-6 bg-[#39FF14]" aria-hidden />
            Hero lab
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
            {TOTAL} live hero systems
          </h2>
          <p className="mt-4 leading-relaxed text-white/60">
            Every 187HERO pattern as a real, interactive demo — SVG mascots, a canvas endless-runner you can actually
            play, and the WebGL-flavoured cursor/transition effects rebuilt on canvas for cross-device resilience. Each
            labelled with its <code className="text-[#7dff5c]">/187…</code> command; all honour{" "}
            <code className="text-[#7dff5c]">prefers-reduced-motion</code>.
          </p>
        </Reveal>

        {GROUPS.map((group) => (
          <div key={group.id} className="mb-14 last:mb-0">
            <div className="mb-6 flex flex-col gap-1">
              <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] text-white/80">
                {group.label}
                <span className="h-px flex-1 bg-white/10" />
                <span className="tabular-nums text-white/40">{group.demos.length}</span>
              </h3>
              <p className="max-w-2xl text-sm text-white/45">{group.blurb}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.demos.map((Demo, i) => (
                <Reveal key={i} delay={(i % 3) * 60}>
                  <Demo />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
