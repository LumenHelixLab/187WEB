"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { brandAssets } from "@/lib/brand-assets";
import { WebHiveBackground } from "./WebHiveBackground";
import { WebHiveNetworkOverlay } from "./WebHiveNetworkOverlay";
import { WebHiveTelemetryOverlay } from "./WebHiveTelemetryOverlay";
import { useClientMounted } from "@/lib/motion/useClientMounted";

const REPO = "https://github.com/LumenHelixLab/187WEB";
/** Freeze year for SSR/client parity (avoid Date() hydration drift near year boundaries). */
const COPYRIGHT_YEAR = 2026;

const WebHiveThreeBackground = dynamic(
  () => import("./WebHiveThreeBackground").then((mod) => mod.WebHiveThreeBackground),
  { ssr: false }
);

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-4 mt-4 flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#050608]/80 px-5 py-2.5 backdrop-blur-xl sm:mx-auto">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-white">
          {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
          <img
            src={brandAssets.orb}
            alt="187WEB"
            className="h-8 w-8 rounded-full object-cover drop-shadow-[0_0_12px_rgba(57,255,20,0.5)]"
          />
          <span className="hidden sm:inline">187WEB</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm text-white/60 md:flex">
          <Link href="/#skills" className="transition hover:text-[#39FF14]">
            Skills
          </Link>
          <Link href="/#agents" className="transition hover:text-[#39FF14]">
            Agents
          </Link>
          <Link href="/187" className="transition hover:text-[#39FF14]">
            /187
          </Link>
          <Link href="/showcase" className="transition hover:text-[#39FF14]">
            Showcase
          </Link>
          <Link href="/install" className="transition hover:text-[#39FF14]">
            Install
          </Link>
        </div>
        <a
          href={REPO}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-white transition hover:border-[#39FF14]/40 hover:text-[#39FF14]"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050608] px-6 py-12">
      <div className="container-x flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
            <img src={brandAssets.knotstoreLogo} alt="KNOTstore" className="h-6 w-auto" />
            {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
            <img src={brandAssets.labWordmark} alt="LumenHelix Lab" className="h-5 opacity-90" />
          </div>
          <p className="text-sm text-white/50">
            © {COPYRIGHT_YEAR} LumenHelix Lab · 187WEB · Custom Noncommercial License with Reserved
            Knotstore IP
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/187" className="text-sm text-white/50 transition hover:text-[#39FF14]">
            /187 Reference
          </Link>
          <Link href="/showcase" className="text-sm text-white/50 transition hover:text-[#39FF14]">
            Showcase
          </Link>
          <Link href="/install" className="text-sm text-white/50 transition hover:text-[#39FF14]">
            Install
          </Link>
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm text-white/50 transition hover:text-[#39FF14]"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

function HiveAtmosphere({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {reducedMotion ? <WebHiveBackground /> : <WebHiveThreeBackground />}
      {!reducedMotion && (
        <>
          <WebHiveNetworkOverlay />
          <WebHiveTelemetryOverlay />
        </>
      )}
      <div className="absolute inset-0 bg-[#050608]/35 backdrop-brightness-[0.85]" />
    </div>
  );
}

export function ProductShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mounted = useClientMounted();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className={`relative min-h-screen overflow-x-hidden bg-[#050608] text-[#ECEDF7] ${className}`.trim()}>
      {/*
        Decorative hive is client-only after mount so SVG float math / PRNG /
        media-query never diverge between SSR HTML and the first client paint.
      */}
      {mounted ? (
        <HiveAtmosphere reducedMotion={reducedMotion} />
      ) : (
        <div className="pointer-events-none fixed inset-0 z-0 bg-[#050608]" aria-hidden />
      )}
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
