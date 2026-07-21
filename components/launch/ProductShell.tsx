"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { brandAssets } from "@/lib/brand-assets";
import { WebHiveBackground } from "./WebHiveBackground";
import { WebHiveNetworkOverlay } from "./WebHiveNetworkOverlay";
import { WebHiveTelemetryOverlay } from "./WebHiveTelemetryOverlay";
import { SiteNav } from "./SiteNav";
import { useClientMounted } from "@/lib/motion/useClientMounted";

const REPO = "https://github.com/LumenHelixLab/187WEB";
/** Freeze year for SSR/client parity (avoid Date() hydration drift near year boundaries). */
const COPYRIGHT_YEAR = 2026;

const WebHiveThreeBackground = dynamic(
  () => import("./WebHiveThreeBackground").then((mod) => mod.WebHiveThreeBackground),
  { ssr: false }
);

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
          <Link href="/brain" className="text-sm text-white/50 transition hover:text-[#39FF14]">
            Brain / Obsidian
          </Link>
          <Link href="/showcase" className="text-sm text-white/50 transition hover:text-[#39FF14]">
            Showcase
          </Link>
          <Link href="/187motion" className="text-sm text-white/50 transition hover:text-[#39FF14]">
            Motion
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
      <SiteNav />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}
