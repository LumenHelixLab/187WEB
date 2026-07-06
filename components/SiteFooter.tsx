import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { siteConfig } from "@/lib/content";

const columns = [
  {
    title: "The skill",
    links: [
      { href: `${siteConfig.repo}/blob/main/.claude/skills/187webdesign/SKILL.md`, label: "SKILL.md" },
      {
        href: `${siteConfig.repo}/blob/main/.claude/skills/187webdesign/references/CHECKLIST.md`,
        label: "Pre-ship checklist",
      },
    ],
  },
  {
    title: "Docs",
    links: [
      { href: `${siteConfig.repo}/blob/main/docs/GETTING-STARTED.md`, label: "Getting started" },
      { href: `${siteConfig.repo}/blob/main/docs/DESIGN-SYSTEM.md`, label: "Design system" },
      { href: `${siteConfig.repo}/blob/main/docs/ARCHITECTURE.md`, label: "Architecture" },
    ],
  },
  {
    title: "Build",
    links: [
      { href: "#start", label: "Get started" },
      { href: siteConfig.repo, label: "GitHub repo" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              An opinionated playbook for websites that win awards and convert — shipped as a
              reusable skill and proven by this page.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-ink">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => {
                  const external = /^https?:\/\//.test(link.href);
                  return (
                    <li key={link.label}>
                      {external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-sm text-muted transition-colors hover:text-ink"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <a
                          href={link.href}
                          className="text-sm text-muted transition-colors hover:text-ink"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Lumen Helix Solutions · MIT License</p>
          <p className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
            Built to its own pre-ship checklist.
          </p>
        </div>
      </Container>
    </footer>
  );
}
