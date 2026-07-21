"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

type KineticHeadlineProps = {
  text: string;
  accent?: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  align?: "left" | "center";
};

/**
 * 187TYPE / 187HERO headline: futuristic clip-reveal + neon scan on accent.
 * Never animates letter-spacing or width — layout box stays fixed.
 * Reduced-motion: static text, no timeline.
 */
export function KineticHeadline({
  text,
  accent,
  as: Tag = "h2",
  className = "",
  align = "center",
}: KineticHeadlineProps) {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const words = text.trim().split(/\s+/).filter(Boolean);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    registerGsap();

    const wordEls = root.querySelectorAll<HTMLElement>("[data-kword]");
    const accentEl = root.querySelector<HTMLElement>("[data-kaccent]");
    const scan = root.querySelector<HTMLElement>("[data-kscan]");

    const ctx = gsap.context(() => {
      gsap.set(wordEls, { clipPath: "inset(0 0 100% 0)", yPercent: 12, opacity: 0.35 });
      gsap.to(wordEls, {
        clipPath: "inset(0 0 0% 0)",
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.05,
        ease: "power3.out",
      });

      if (accentEl) {
        gsap.fromTo(
          accentEl,
          { clipPath: "inset(0 100% 0 0)", opacity: 0.4 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 0.85,
            delay: 0.15,
            ease: "power2.out",
          }
        );
      }

      if (scan) {
        gsap.fromTo(
          scan,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.9,
            delay: 0.35,
            ease: "power2.out",
          }
        );
        gsap.to(scan, {
          opacity: 0.45,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.2,
        });
      }
    }, root);

    return () => ctx.revert();
  }, [reduced, text, accent]);

  return (
    <Tag
      ref={rootRef as React.RefObject<HTMLHeadingElement>}
      className={`kinetic-headline ${align === "center" ? "text-center" : "text-left"} ${className}`.trim()}
    >
      <span className="inline">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.06em]">
            <span data-kword className="inline-block will-change-[clip-path,transform,opacity]">
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        ))}
        {accent ? (
          <>
            {" "}
            <span className="relative inline-block overflow-hidden align-bottom pb-[0.12em]">
              <span
                data-kaccent
                className="sc-grad-text relative z-[1] inline-block will-change-[clip-path,opacity]"
              >
                {accent}
              </span>
              <span
                data-kscan
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-transparent via-[#39FF14] to-[#a855f7] shadow-[0_0_12px_rgba(57,255,20,0.55)]"
              />
            </span>
          </>
        ) : null}
      </span>
    </Tag>
  );
}
