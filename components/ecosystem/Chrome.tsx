import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Shared header/footer chrome for the dark-green "ecosystem" pages
 * (/install, /187repo). One implementation instead of a near-verbatim copy
 * per page; pages differ only in nav items and the primary CTA target.
 */

const REPO_URL = "https://github.com/lumenhelixsolutions/187webDESIGN";

type NavItem = { href: string; label: string };
type Cta = { href: string; label: string };

/** Internal routes go through next/link (client nav + basePath); anchors and
 *  external URLs stay plain. */
function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className={className}
    >
      {children}
    </a>
  );
}

export function EcosystemHeader({
  navLabel,
  nav,
  cta,
}: {
  navLabel: string;
  nav: NavItem[];
  cta: Cta;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05060A]/80 backdrop-blur">
      <div className="container-x">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="187SUITE home"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-white"
          >
            <span className="grid h-7 w-7 place-items-center rounded-md bg-[#39FF14] text-xs text-[#05060A]">
              187
            </span>
            <span className="hidden sm:inline">SUITE</span>
          </Link>

          <nav aria-label={navLabel} className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#d6deeb]/70 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm font-medium text-[#d6deeb]/70 transition-colors hover:text-white"
            >
              GitHub
            </a>
            <SmartLink
              href={cta.href}
              className="inline-flex h-11 items-center justify-center rounded bg-[#39FF14] px-5 text-sm font-semibold text-[#05060A] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#39FF14]/50"
            >
              {cta.label}
            </SmartLink>
          </div>

          <details className="group relative md:hidden">
            <summary
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded text-white [&::-webkit-details-marker]:hidden"
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
            <div className="absolute right-0 top-full mt-2 w-56 rounded-md border border-white/10 bg-[#0A0C14] p-2 shadow-xl">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex min-h-11 items-center rounded px-3 text-sm font-medium text-[#d6deeb] hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="flex min-h-11 items-center rounded px-3 text-sm font-medium text-[#d6deeb] hover:bg-white/5"
              >
                GitHub
              </a>
              <SmartLink
                href={cta.href}
                className="mt-1 flex min-h-11 items-center justify-center rounded bg-[#39FF14] px-3 text-sm font-semibold text-[#05060A]"
              >
                {cta.label}
              </SmartLink>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export function EcosystemFooter({ secondary }: { secondary: Cta }) {
  return (
    <footer className="border-t border-white/10 bg-[#0A0C14]">
      <div className="container-x py-12">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-[#d6deeb]/50">
            © {new Date().getFullYear()} Lumen Helix Solutions · MIT License
          </p>
          <div className="flex items-center gap-6">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-[#d6deeb]/50 transition hover:text-white"
            >
              GitHub
            </a>
            <SmartLink
              href={secondary.href}
              className="text-sm text-[#d6deeb]/50 transition hover:text-white"
            >
              {secondary.label}
            </SmartLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
