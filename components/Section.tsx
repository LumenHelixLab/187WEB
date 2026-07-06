import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

/**
 * A page section with consistent vertical rhythm and an optional header
 * (eyebrow + title + intro). Keeps spacing and heading hierarchy uniform so
 * the page reads as one crafted system rather than stitched-together blocks.
 */
export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 py-20 sm:py-28 ${className}`.trim()}>
      <Container>
        {(eyebrow || title || intro) && (
          <Reveal className="mx-auto mb-12 max-w-prose sm:mb-16">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            {title && (
              <h2 className="text-headline font-semibold tracking-tight text-ink">{title}</h2>
            )}
            {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
