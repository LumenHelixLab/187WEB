import Link from "next/link";
import { NatashaBlueprint } from "@/components/BrandMark";
import { CopyButton } from "@/components/CopyButton";
import { Reveal } from "@/components/Reveal";
import { ProductShell } from "@/components/launch/ProductShell";
import { skillShowcaseIndex, type SkillShowcaseData, skillColorValue, skillIsRainbow, skillRainbowTextClass } from "@/lib/skill-showcase-data";

function relatedHref(id: string): string | null {
  if (skillShowcaseIndex.has(id)) return `/187${id}`;
  if (id === "repo") return "/187repo";
  return null;
}

function relatedLabel(id: string): string {
  const found = skillShowcaseIndex.get(id);
  if (found) return found.name;
  const map: Record<string, string> = {
    repo: "187REPO",
    craft: "187CRAFT",
    vibe: "187VIBE",
    launch: "187LAUNCH",
    write: "187WRITE",
    include: "187INCLUDE+",
  };
  return map[id] ?? id;
}

function SkillHero({ skill }: { skill: SkillShowcaseData }) {
  const solidColor = skillColorValue(skill.color);
  return (
    <section className="relative overflow-hidden border-b border-white/10 px-6 pb-16 pt-12 sm:pb-24 sm:pt-20">
      <div className="container-x relative">
        <div className="mx-auto max-w-4xl text-center">
          <div
            className="mx-auto mb-10 max-w-3xl overflow-hidden rounded-2xl border p-2 shadow-[0_0_60px_rgba(57,255,20,0.12)]"
            style={{ borderColor: `${solidColor}40`, boxShadow: `0 0 60px ${solidColor}20` }}
          >
            <div className="relative overflow-hidden rounded-xl bg-black/40">
              <NatashaBlueprint priority className="rounded-xl opacity-90 grayscale-[0.2]" />
              <div
                className="absolute inset-0 opacity-60"
                style={{ backgroundColor: solidColor, mixBlendMode: "color" }}
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{ backgroundColor: solidColor, mixBlendMode: "overlay" }}
              />
            </div>
          </div>

          <p
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: solidColor }}
          >
            <span className="h-px w-6" style={{ backgroundColor: solidColor }} aria-hidden="true" />
            {skill.name} skill
          </p>
          <h1 className="mt-6 text-[clamp(2.5rem,1.5rem+5vw,5rem)] font-bold leading-[0.98] tracking-tight text-white">
            {skill.name} —{" "}
            <span className={skillIsRainbow(skill.color) ? skillRainbowTextClass() : ""} style={skillIsRainbow(skill.color) ? undefined : { color: solidColor }}>
              {skill.tagline}.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
            {skill.description}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/showcase"
              className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              ← Back to all skills
            </Link>
            <Link
              href="/187"
              className="inline-flex h-12 items-center justify-center rounded border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              /187 reference
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SkillShowcase({
  skill,
  children,
}: {
  skill: SkillShowcaseData;
  children?: React.ReactNode;
}) {
  return (
    <ProductShell>
      <SkillHero skill={skill} />

      <section id="triggers" className="px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-prose text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              Triggers
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              How to invoke {skill.name}
            </h2>
          </Reveal>

          <Reveal>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-[#d6deeb]">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Trigger</th>
                    <th className="px-5 py-3" aria-label="Copy" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {skill.triggers.map((trigger) => (
                    <tr key={trigger} className="group text-[#d6deeb]/80">
                      <td className="px-5 py-3.5 font-mono text-white">{trigger}</td>
                      <td className="px-5 py-3.5 text-right">
                        <CopyButton text={trigger} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="use-cases" className="border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-prose text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              Use cases
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              When to route to {skill.name}
            </h2>
          </Reveal>

          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {skill.useCases.map((useCase, i) => (
              <Reveal key={useCase} delay={i * 80}>
                <div
                  className="h-full rounded-xl border border-white/10 bg-[#05060A] p-6 transition hover:-translate-y-1"
                  style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -24px ${skillColorValue(skill.color)}22` }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: skillColorValue(skill.color), boxShadow: `0 0 10px ${skillColorValue(skill.color)}` }}
                      aria-hidden="true"
                    />
                    <p className="leading-relaxed text-white/80">{useCase}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="outputs" className="px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-prose text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              Output contract
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              What {skill.name} delivers
            </h2>
          </Reveal>

          <div className="mx-auto max-w-3xl">
            <ol className="space-y-4">
              {skill.outputs.map((output, i) => (
                <Reveal key={output} delay={i * 60}>
                  <li className="flex items-start gap-4 rounded-xl border border-white/10 bg-[#0A0C14] p-5">
                    <span
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-[#050608]"
                      style={{ backgroundColor: skillColorValue(skill.color) }}
                    >
                      {i + 1}
                    </span>
                    <span className="leading-relaxed text-white/80">{output}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {skill.routesTo && (
        <section className="border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
          <div className="container-x">
            <Reveal className="mx-auto mb-14 max-w-prose text-center">
              <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
                <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
                Routing
              </p>
              <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
                When to hand off to another skill
              </h2>
            </Reveal>

            <Reveal>
              <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-[#d6deeb]">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Route to</th>
                      <th className="px-5 py-3 font-semibold">When</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {skill.routesTo.map((route) => (
                      <tr key={route.name} className="text-[#d6deeb]/80">
                        <td className="px-5 py-4 font-semibold text-white">{route.name}</td>
                        <td className="px-5 py-4">{route.when}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {skill.templates && (
        <section id="templates" className="px-6 py-20 sm:py-28">
          <div className="container-x">
            <Reveal className="mx-auto mb-14 max-w-prose text-center">
              <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
                <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
                Templates
              </p>
              <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
                Artifacts {skill.name} produces
              </h2>
            </Reveal>

            <Reveal>
              <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-[#d6deeb]">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Template</th>
                      <th className="px-5 py-3 font-semibold">When to use</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {skill.templates.map((template) => (
                      <tr key={template.name} className="text-[#d6deeb]/80">
                        <td className="px-5 py-4 font-mono text-[#39FF14]">{template.name}</td>
                        <td className="px-5 py-4">{template.when}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section id="related" className="border-y border-white/10 bg-[#0A0C14] px-6 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto mb-14 max-w-prose text-center">
            <p className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              <span className="h-px w-6 bg-[#39FF14]" aria-hidden="true" />
              Related skills
            </p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.2rem+2.6vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-white">
              Commonly paired with {skill.name}
            </h2>
          </Reveal>

          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
            {skill.related.map((id) => {
              const href = relatedHref(id);
              const label = relatedLabel(id);
              const classes =
                "inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 text-sm font-medium text-white transition hover:bg-white/10";
              return href ? (
                <Link key={id} href={href} className={classes}>
                  {label}
                </Link>
              ) : (
                <span key={id} className={classes}>
                  {label}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {children}
    </ProductShell>
  );
}
