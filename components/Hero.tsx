import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { checklistTotal } from "@/lib/content";

const stats = [
  { k: "40·30·20·10", v: "award rubric" },
  { k: "12", v: "core principles" },
  { k: `${checklistTotal}-pt`, v: "pre-ship audit" },
];

/**
 * The hero is a thesis (skill #1): what / who / why in one view, one primary
 * CTA, and a signature "blueprint" motif tying the visual to the subject —
 * design as precise, measured craft. The LCP element is text, not an image,
 * so it paints fast. The headline rises in on load (CSS only; reduced-motion
 * disables it).
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div className="blueprint absolute inset-0 -z-10" aria-hidden="true" />
      <Container>
        <div className="max-w-4xl py-24 sm:py-32 lg:py-40">
          <p className="eyebrow rise">Award-grade by default</p>
          <h1 className="mt-6 text-display font-semibold tracking-tight text-ink">
            <span className="rise inline-block" style={{ animationDelay: "0.05s" }}>
              Make&nbsp;
            </span>
            <span className="rise inline-block text-accent" style={{ animationDelay: "0.15s" }}>
              killer&nbsp;
            </span>
            <span className="rise inline-block" style={{ animationDelay: "0.25s" }}>
              websites.
            </span>
          </h1>
          <p
            className="rise mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
            style={{ animationDelay: "0.35s" }}
          >
            A full-stack starter that ships the 187WEBdesign skill — the rubric, the craft, the
            pre-ship audit — and proves it. Everything you&rsquo;re looking at was built to its own
            rules.
          </p>
          <div
            className="rise mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "0.45s" }}
          >
            <ButtonLink href="#start" size="lg">
              Get started
            </ButtonLink>
            <ButtonLink href="#rubric" variant="ghost" size="lg">
              See the rubric
            </ButtonLink>
          </div>
          <dl
            className="rise mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-8"
            style={{ animationDelay: "0.55s" }}
          >
            {stats.map((s) => (
              <div key={s.v}>
                <dt className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  {s.k}
                </dt>
                <dd className="mt-1 text-sm text-muted">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
