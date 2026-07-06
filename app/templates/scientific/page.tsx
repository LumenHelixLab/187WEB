import type { Metadata } from "next";
import { TemplateBar } from "@/components/templates/TemplateBar";

export const metadata: Metadata = { title: "Lattice Lab — Scientific template" };

const figure = [42, 61, 55, 78, 70, 91, 88];

export default function ScientificTemplate() {
  return (
    <div className="min-h-screen bg-[#eef2f7] font-serif text-[#0B1F3A]">
      <TemplateBar name="Lattice Lab — Scientific / Research" tone="light" />

      <header className="border-b border-[#0B1F3A]/15 bg-white">
        <div className="mx-auto flex max-w-3xl items-baseline justify-between px-6 py-4 font-mono text-xs uppercase tracking-widest text-[#1E6F9F]">
          <span>Journal of Reversible Computation</span>
          <span>Vol. 12 · No. 3 · 2026</span>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-12">
        <p className="font-mono text-xs uppercase tracking-widest text-[#1E6F9F]">Research article · Open access</p>
        <h1 className="mt-3 text-[clamp(1.8rem,1.2rem+2.4vw,3rem)] font-bold leading-tight">
          A norm-obstruction bound for quaternionic lattice maps
        </h1>
        <p className="mt-4 text-sm text-[#0B1F3A]/70">
          M. Rivera<sup>1</sup>, K. Osei<sup>1</sup>, L. Petrova<sup>2</sup>
        </p>
        <p className="font-mono text-xs text-[#0B1F3A]/50">
          <sup>1</sup> Lattice Lab, Institute for Advanced Computation · <sup>2</sup> Dept. of Mathematics, Northbridge University
        </p>

        <section className="mt-8 rounded-lg border border-[#0B1F3A]/15 bg-white p-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[#1E6F9F]">Abstract</h2>
          <p className="mt-3 leading-relaxed">
            We establish a tight upper bound on the norm obstruction of a family of quaternionic
            lattice maps and verify it empirically to n ≤ 10⁹. The result connects the algebraic
            structure of the map to an observable spectral gap, with implications for
            post-quantum primitives. We provide a reproducible pipeline and a frozen dataset.
          </p>
        </section>

        <figure className="mt-10">
          <div className="flex h-56 items-end gap-2 rounded-lg border border-[#0B1F3A]/15 bg-white p-5">
            {figure.map((v, i) => (
              <div key={i} className="flex-1 rounded-t bg-[#1E6F9F]" style={{ height: `${v}%` }} />
            ))}
          </div>
          <figcaption className="mt-3 font-mono text-xs text-[#0B1F3A]/60">
            Figure 1. Observed spectral gap by dimension (n = 2…2⁷). Error bars omitted for clarity.
          </figcaption>
        </figure>

        <h2 className="mt-10 text-xl font-bold">1. Introduction</h2>
        <p className="mt-3 leading-relaxed text-[#0B1F3A]/85">
          Reversible computation imposes algebraic constraints that, while restrictive, yield
          structure exploitable for security. We formalize the obstruction, prove the bound in
          Section 3, and report verification in Section 4.
        </p>

        <div className="mt-10 rounded-lg bg-[#0B1F3A] p-5 font-mono text-xs leading-relaxed text-[#E8EEF5]">
          <p className="text-[#7fd3ff]">Cite this article</p>
          <p className="mt-2">Rivera, M., Osei, K., &amp; Petrova, L. (2026). A norm-obstruction bound for quaternionic lattice maps. <em>J. Rev. Comput.</em>, 12(3), 211–238. https://doi.org/10.1187/jrc.2026.0312</p>
        </div>

        <h2 className="mt-10 text-xl font-bold">References</h2>
        <ol className="mt-3 space-y-2 font-mono text-xs text-[#0B1F3A]/70">
          <li>[1] Conway, J. H., &amp; Sloane, N. J. A. (1999). Sphere Packings, Lattices and Groups.</li>
          <li>[2] Petrova, L. (2024). Spectral gaps in reversible automata. Proc. RC.</li>
          <li>[3] Osei, K. (2025). Empirical verification at scale. Trans. Comp.</li>
        </ol>
      </article>

      <footer className="border-t border-[#0B1F3A]/15 px-6 py-8 text-center font-mono text-xs text-[#0B1F3A]/50">
        Lattice Lab — a 187webDESIGN template. <a href="/templates" className="underline">All templates</a>
      </footer>
    </div>
  );
}
