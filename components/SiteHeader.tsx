import Link from "next/link";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/lib/content";

const nav = [
  { href: "#rubric", label: "Rubric" },
  { href: "#principles", label: "Principles" },
  { href: "#workflow", label: "Workflow" },
  { href: "#checklist", label: "Checklist" },
];

/**
 * Sticky header. Desktop shows inline nav; mobile uses a native <details>
 * disclosure so the menu works with zero JavaScript and stays accessible.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" aria-label={`${siteConfig.name} home`} className="rounded-sm">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={siteConfig.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              GitHub
            </a>
            <ButtonLink href="#start" size="sm">
              Get started
            </ButtonLink>
          </div>

          {/* Mobile: JS-free disclosure menu */}
          <details className="group relative md:hidden">
            <summary
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-sm text-ink [&::-webkit-details-marker]:hidden"
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </summary>
            <div className="absolute right-0 top-full mt-2 w-56 rounded-md border border-line bg-surface p-2 shadow-lift">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex min-h-11 items-center rounded-sm px-3 text-sm font-medium text-ink hover:bg-ink/[0.04]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={siteConfig.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="flex min-h-11 items-center rounded-sm px-3 text-sm font-medium text-ink hover:bg-ink/[0.04]"
              >
                GitHub
              </a>
              <a
                href="#start"
                className="mt-1 flex min-h-11 items-center justify-center rounded-sm bg-accent px-3 text-sm font-medium text-accent-ink"
              >
                Get started
              </a>
            </div>
          </details>
        </div>
      </Container>
    </header>
  );
}
