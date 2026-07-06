import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "Page not found",
};

/** A designed 404 — edge pages get craft too (checklist: "404 is designed"). */
export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="blueprint absolute inset-0 -z-10" aria-hidden="true" />
      <Container>
        <div className="flex min-h-[70vh] max-w-xl flex-col justify-center py-24">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-6 text-display font-semibold tracking-tight text-ink">
            Off the <span className="text-accent">grid</span>.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            That page doesn&rsquo;t exist — or it never shipped. Let&rsquo;s get you back to
            something that did.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/" size="lg">
              Back home
            </ButtonLink>
            <ButtonLink href="/#start" variant="ghost" size="lg">
              Get started
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
