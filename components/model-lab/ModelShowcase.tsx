"use client";

import { Reveal } from "@/components/Reveal";
import { RadialCarousel, CylCarousel, CubeFlip, Tornado, TiltCard, PhysicsCascade } from "./demos";

const DEMOS = [TiltCard, RadialCarousel, CubeFlip, CylCarousel, Tornado, PhysicsCascade];

export function ModelShowcase() {
  return (
    <section id="model-lab" className="relative border-t border-white/10 bg-[#050608] px-6 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#22d3ee]">
            <span className="h-px w-6 bg-[#22d3ee]" aria-hidden />
            Model lab
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
            {DEMOS.length} live 3D object systems
          </h2>
          <p className="mt-4 leading-relaxed text-white/60">
            Every 187MODEL pattern built as a real, GPU-accelerated CSS-3D demo you can grab and spin — orbital and
            cylindrical carousels, a hardware cube, a helical tornado, pointer-tilt cards, and a physics cascade. Each
            labelled with its <code className="text-[#67e8f9]">/187…</code> command; all honour{" "}
            <code className="text-[#67e8f9]">prefers-reduced-motion</code>.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DEMOS.map((Demo, i) => (
            <Reveal key={i} delay={(i % 3) * 60}>
              <Demo />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
