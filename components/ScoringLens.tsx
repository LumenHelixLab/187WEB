import type { CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";
import { rubric } from "@/lib/content";

/**
 * The signature moment: the actual weighting awards juries use, drawn as
 * proportional bars that grow to their weight when scrolled into view. It ties
 * the page's one bold idea directly to its subject — you're looking at the
 * rubric the whole skill designs to. Everything around it stays quiet.
 */
export function ScoringLens() {
  return (
    <Reveal>
      <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line">
        {rubric.map((axis, i) => (
          <div key={axis.key} className="bg-surface p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="font-display text-title font-semibold tracking-tight text-ink">
                {axis.label}
              </dt>
              <dd className="font-display text-title font-semibold tabular-nums text-accent">
                {axis.weight}
                <span className="align-top text-base text-muted">%</span>
              </dd>
            </div>
            <dd className="mt-4">
              <div
                className="h-2.5 w-full overflow-hidden rounded-full bg-ink/[0.06]"
                role="presentation"
              >
                <div
                  className="lens-bar h-full rounded-full bg-accent"
                  style={
                    {
                      "--w": `${axis.weight}%`,
                      transitionDelay: `${i * 90}ms`,
                    } as CSSProperties
                  }
                />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{axis.blurb}</p>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-sm text-muted">
        Honorable-mention territory starts around a jury score of ~6.5/10. The gap between
        &ldquo;fine&rdquo; and &ldquo;award&rdquo; is craft details + one bold idea + fast,
        accessible execution &mdash; not more effects.
      </p>
    </Reveal>
  );
}
