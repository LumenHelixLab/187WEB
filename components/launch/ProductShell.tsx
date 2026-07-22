"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { brandAssets } from "@/lib/brand-assets";
import { WebHiveBackground } from "./WebHiveBackground";
import { WebHiveNetworkOverlay } from "./WebHiveNetworkOverlay";
import { WebHiveTelemetryOverlay } from "./WebHiveTelemetryOverlay";
import { WebHiveHoloMascot } from "./WebHiveHoloMascot";
import { SiteNav } from "./SiteNav";
import { SiteVersionBadge } from "@/components/version/SiteVersionBadge";
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
      <div className="container-x flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-end">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
            {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
            <img
              src={brandAssets.bulb}
              alt="LumenHelix Lab"
              className="h-14 w-14 object-contain drop-shadow-[0_0_20px_rgba(57,255,20,0.25)] sm:h-16 sm:w-16"
            />
            {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
            <img src={brandAssets.labWordmark} alt="LumenHelix Lab" className="h-6 w-auto opacity-95 sm:h-7" />
            {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
            <img src={brandAssets.orb} alt="" className="h-10 w-10 rounded-full object-contain opacity-90" />
            {/* eslint-disable-next-line @next/next/no-img-element -- basePath-safe static export */}
            <img src={brandAssets.knotstoreLogo} alt="KNOTstore" className="h-7 w-auto opacity-90" />
          </div>
          <p className="text-center text-sm text-white/50 sm:text-left">
            © {COPYRIGHT_YEAR} LumenHelix Lab · 187WEB · Custom Noncommercial License with Reserved
            Knotstore IP
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link href="/187" className="text-sm text-white/50 transition hover:text-[#39FF14]">
            /187
          </Link>
          <Link href="/about" className="text-sm text-white/50 transition hover:text-[#39FF14]">
            About
          </Link>
          <Link href="/brain" className="text-sm text-white/50 transition hover:text-[#39FF14]">
            Brain
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
          <SiteVersionBadge />
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
      {/* Dim the 3D/network layers first so the holo spider stays readable */}
      <div className="absolute inset-0 bg-[#050608]/35 backdrop-brightness-[0.85]" />
      <WebHiveHoloMascot />
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
