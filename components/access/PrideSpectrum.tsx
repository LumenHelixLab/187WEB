"use client";

import Link from "next/link";
import { useEffect, useRef, type RefObject } from "react";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { useClientMounted } from "@/lib/motion/useClientMounted";

/**
 * Pride spectrum tokens — green is the bridge uniting Access+ and Include+.
 * Access+: red → orange → yellow → green (warm half)
 * Include+: green → blue → indigo → purple (cool half)
 * Full: classic six-band pride
 */
export const PRIDE = {
  red: "#E40303",
  orange: "#FF8C00",
  yellow: "#FFED00",
  /** Uniting green (classic pride green) */
  green: "#008026",
  brandGreen: "#39FF14",
  blue: "#24408E",
  indigo: "#3B4CCA",
  purple: "#732982",
} as const;

export const GRAD_ACCESS = `linear-gradient(105deg, ${PRIDE.red} 0%, ${PRIDE.orange} 32%, ${PRIDE.yellow} 62%, ${PRIDE.green} 100%)`;
export const GRAD_INCLUDE = `linear-gradient(105deg, ${PRIDE.green} 0%, ${PRIDE.blue} 38%, ${PRIDE.indigo} 68%, ${PRIDE.purple} 100%)`;
export const GRAD_PRIDE_FULL = `linear-gradient(105deg, ${PRIDE.red}, ${PRIDE.orange}, ${PRIDE.yellow}, ${PRIDE.green}, ${PRIDE.blue}, ${PRIDE.purple})`;

type Spectrum = "access" | "include" | "full";

const SPECTRUM_GRAD: Record<Spectrum, string> = {
  access: GRAD_ACCESS,
  include: GRAD_INCLUDE,
  full: GRAD_PRIDE_FULL,
};

/**
 * Rainbow infinity / woven-lemniscate mark (neurodiversity-aligned).
 * Replaces the outdated puzzle-piece symbol. Spectrum half or full pride stroke.
 */
export function InfinityMark({
  spectrum = "full",
  className = "h-6 w-6",
  decorative = false,
}: {
  spectrum?: Spectrum;
  className?: string;
  decorative?: boolean;
}) {
  const gradId = `inf-${spectrum}-${decorative ? "d" : "l"}`;
  const stops =
    spectrum === "access"
      ? [
          [0, PRIDE.red],
          [0.35, PRIDE.orange],
          [0.65, PRIDE.yellow],
          [1, PRIDE.green],
        ]
      : spectrum === "include"
        ? [
            [0, PRIDE.green],
            [0.35, PRIDE.blue],
            [0.7, PRIDE.indigo],
            [1, PRIDE.purple],
          ]
        : [
            [0, PRIDE.red],
            [0.2, PRIDE.orange],
            [0.4, PRIDE.yellow],
            [0.55, PRIDE.green],
            [0.75, PRIDE.blue],
            [1, PRIDE.purple],
          ];

  return (
    <svg
      viewBox="0 0 64 40"
      className={className}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Rainbow infinity mark — neurodiversity and inclusion"}
      focusable="false"
    >
      {!decorative ? <title>Rainbow infinity mark</title> : null}
      <defs>
        <linearGradient id={gradId} x1="0%" y1="50%" x2="100%" y2="50%">
          {stops.map(([o, c]) => (
            <stop key={String(o)} offset={`${Number(o) * 100}%`} stopColor={String(c)} />
          ))}
        </linearGradient>
      </defs>
      {/* Lemniscate (∞) path — thick stroke, woven ends */}
      <path
        d="M8 20c0-7 6-12 14-12 6 0 10 3 10 12 0 9-4 12-10 12-8 0-14-5-14-12zm28 0c0 7 6 12 14 12 6 0 10-3 10-12 0-9-4-12-10-12-8 0-14 5-14 12z"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 20c0-4 2.5-7 6-7s6 3 6 7-2.5 7-6 7-6-3-6-7z"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="3"
        opacity="0.55"
      />
    </svg>
  );
}

/** @deprecated Use InfinityMark — alias for older imports. */
export const AutismPuzzleIcon = InfinityMark;

type PrideCtaProps = {
  href: string;
  spectrum: Spectrum;
  children: React.ReactNode;
  variant?: "filled" | "outline";
  className?: string;
  showPuzzle?: boolean;
  showMark?: boolean;
  "data-hero-cta"?: boolean | string;
};

/**
 * Pride-spectrum CTA with infinity mark + GSAP hover lift.
 * Filled: solid gradient + near-black text for WCAG contrast on bright stops.
 */
export function PrideCta({
  href,
  spectrum,
  children,
  variant = "filled",
  className = "",
  showPuzzle,
  showMark = true,
  ...rest
}: PrideCtaProps) {
  const mark = showMark && showPuzzle !== false;
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const mounted = useClientMounted();
  const filled = variant === "filled";
  const grad = SPECTRUM_GRAD[spectrum];

  useEffect(() => {
    if (!mounted || reduced || !ref.current) return;
    registerGsap();
    const el = ref.current;
    const enter = () => gsap.to(el, { y: -2, scale: 1.02, duration: 0.22, ease: "power2.out" });
    const leave = () => gsap.to(el, { y: 0, scale: 1, duration: 0.28, ease: "power2.out" });
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("focus", enter);
    el.addEventListener("blur", leave);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("focus", enter);
      el.removeEventListener("blur", leave);
    };
  }, [mounted, reduced]);

  return (
    <Link
      ref={ref}
      href={href}
      className={[
        "pride-cta inline-flex h-12 min-h-[44px] items-center justify-center gap-2.5 rounded-xl px-5 text-sm font-semibold will-change-transform",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        filled ? "pride-cta--filled text-[#0a0a0a]" : "pride-cta--outline text-white",
        className,
      ].join(" ")}
      style={
        filled
          ? { backgroundImage: grad }
          : {
              backgroundImage: `linear-gradient(#0A0C14, #0A0C14), ${grad}`,
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              border: "2px solid transparent",
            }
      }
      {...rest}
    >
      {mark ? <InfinityMark spectrum={spectrum} className="h-5 w-5 shrink-0 drop-shadow-sm" decorative /> : null}
      <span className={filled ? "text-[#0a0a0a]" : "text-white"}>{children}</span>
    </Link>
  );
}

/** Decorative spectrum rail — green seam unites Access+ and Include+. */
export function PrideUnityRail({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-2 w-full overflow-hidden rounded-full ${className}`}
      role="img"
      aria-label="Pride spectrum: red to green for Access+, green to purple for Include+, united by green"
    >
      <span className="h-full flex-1" style={{ background: GRAD_ACCESS }} />
      <span className="h-full w-2 shrink-0 bg-[#39FF14]" title="Uniting green" />
      <span className="h-full flex-1" style={{ background: GRAD_INCLUDE }} />
    </div>
  );
}

/** Soft entrance stagger for pride CTAs in a container. */
export function usePrideCtaEntrance(containerRef: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion();
  const mounted = useClientMounted();

  useEffect(() => {
    if (!mounted || reduced || !containerRef.current) return;
    registerGsap();
    const nodes = containerRef.current.querySelectorAll(".pride-cta");
    if (!nodes.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        nodes,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [mounted, reduced, containerRef]);
}
