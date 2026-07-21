"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brandAssets } from "@/lib/brand-assets";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useClientMounted } from "@/lib/motion/useClientMounted";

const REPO = "https://github.com/LumenHelixLab/187WEB";

type NavLink = { href: string; label: string; hint?: string };

/** Primary nav — expanded for craft/motion operators + brain */
const PRIMARY: NavLink[] = [
  { href: "/#skills", label: "Skills", hint: "Filterable skill cards" },
  { href: "/#agents", label: "Agents", hint: "Crew control plane" },
  { href: "/187", label: "/187", hint: "Slash command reference" },
  { href: "/brain", label: "Brain", hint: "Local brain + Obsidian" },
  { href: "/showcase", label: "Showcase", hint: "Motion lab demos" },
];

const MORE: NavLink[] = [
  { href: "/187craft", label: "Craft", hint: "UI / UX / design system" },
  { href: "/187motion", label: "Motion", hint: "R3F + GSAP hooks" },
  { href: "/187hero", label: "Hero", hint: "Immersive WebGL heroes" },
  { href: "/187theme", label: "Theme", hint: "Palettes & tokens" },
  { href: "/187type", label: "Type", hint: "Kinetic headlines" },
  { href: "/install", label: "Install", hint: "CLI + skill packs" },
  { href: "/187gsap", label: "GSAP", hint: "Timelines & ScrollTrigger" },
];

function isActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return pathname === "/" || pathname === "";
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname() ?? "/";
  const reduced = useReducedMotion();
  const mounted = useClientMounted();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Entrance + underline jazz
  useEffect(() => {
    if (!mounted || reduced || !navRef.current || !barRef.current) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" }
      );
      const links = barRef.current?.querySelectorAll("[data-nav-link]");
      if (links?.length) {
        gsap.fromTo(
          links,
          { y: -8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, delay: 0.15, ease: "power2.out" }
        );
      }
    }, navRef);
    return () => ctx.revert();
  }, [mounted, reduced]);

  // Mobile drawer animation
  useEffect(() => {
    if (!drawerRef.current || reduced) return;
    registerGsap();
    if (open) {
      gsap.fromTo(
        drawerRef.current,
        { y: -12, opacity: 0, height: 0 },
        { y: 0, opacity: 1, height: "auto", duration: 0.35, ease: "power2.out" }
      );
      const items = drawerRef.current.querySelectorAll("[data-drawer-item]");
      gsap.fromTo(
        items,
        { x: -10, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.03, delay: 0.05, ease: "power2.out" }
      );
    }
  }, [open, reduced]);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  const linkClass = (href: string) => {
    const active = isActive(pathname, href);
    return `relative px-1 py-1 text-sm transition ${
      active ? "text-[#39FF14]" : "text-white/60 hover:text-white"
    }`;
  };

  return (
    <header ref={navRef} className="fixed inset-x-0 top-0 z-50">
      <div
        ref={barRef}
        className="mx-3 mt-3 max-w-7xl rounded-2xl border border-white/10 bg-[#050608]/85 px-3 py-2 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:mx-auto sm:px-4"
      >
        <nav className="flex items-center justify-between gap-2" aria-label="Primary">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5 font-bold tracking-tight text-white"
            data-nav-link
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
            <img
              src={brandAssets.orb}
              alt=""
              className="h-8 w-8 rounded-full object-cover drop-shadow-[0_0_12px_rgba(57,255,20,0.5)] transition group-hover:scale-105"
            />
            <span className="hidden sm:inline">187WEB</span>
          </Link>

          {/* Desktop primary links */}
          <div className="hidden items-center gap-4 lg:flex xl:gap-5">
            {PRIMARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                title={item.hint}
                data-nav-link
                className={`group/nav ${linkClass(item.href)}`}
              >
                {item.label}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -bottom-0.5 mx-auto h-px w-0 bg-gradient-to-r from-transparent via-[#39FF14] to-transparent transition-all duration-300 group-hover/nav:w-full"
                />
              </Link>
            ))}

            {/* More menu — craft / motion / theme / install */}
            <div className="relative" data-nav-link>
              <button
                type="button"
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                onClick={() => setMoreOpen((v) => !v)}
                className="flex items-center gap-1 px-1 py-1 text-sm text-white/60 transition hover:text-white"
              >
                More
                <svg
                  className={`h-3.5 w-3.5 transition ${moreOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M5.25 7.5 10 12.25 14.75 7.5" />
                </svg>
              </button>
              {moreOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-[60] mt-2 min-w-[14.5rem] rounded-xl border border-white/15 bg-[#0A0C14] p-2 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.95)] ring-1 ring-black/80"
                  style={{ backgroundColor: "#0A0C14", opacity: 1 }}
                >
                  {MORE.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      onClick={() => setMoreOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm text-white/80 transition hover:bg-white/10 hover:text-[#39FF14]"
                    >
                      <span className="font-semibold text-white">{item.label}</span>
                      {item.hint ? (
                        <span className="mt-0.5 block text-[11px] leading-snug text-white/55">{item.hint}</span>
                      ) : null}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/brain"
              data-nav-link
              className="hidden rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 px-3 py-1.5 text-xs font-semibold text-[#39FF14] transition hover:bg-[#39FF14]/20 sm:inline-flex"
              title="Local brain + Obsidian"
            >
              Obsidian brain
            </Link>
            <a
              href={REPO}
              target="_blank"
              rel="noreferrer noopener"
              data-nav-link
              className="hidden h-9 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 text-sm font-medium text-white transition hover:border-[#39FF14]/40 hover:text-[#39FF14] md:inline-flex"
            >
              GitHub
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
              aria-expanded={open}
              aria-controls="site-mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        {open && (
          <div
            id="site-mobile-nav"
            ref={drawerRef}
            className="mt-3 border-t border-white/10 pt-3 lg:hidden"
          >
            <div className="grid gap-1 pb-2">
              {[...PRIMARY, ...MORE].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-drawer-item
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-2.5 text-sm transition ${
                    isActive(pathname, item.href)
                      ? "bg-[#39FF14]/10 text-[#39FF14]"
                      : "text-white/75 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="font-medium">{item.label}</span>
                  {item.hint ? (
                    <span className="mt-0.5 block text-[11px] text-white/40">{item.hint}</span>
                  ) : null}
                </Link>
              ))}
              <a
                href={REPO}
                target="_blank"
                rel="noreferrer noopener"
                data-drawer-item
                className="rounded-xl px-3 py-2.5 text-sm text-white/75 hover:bg-white/5"
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
