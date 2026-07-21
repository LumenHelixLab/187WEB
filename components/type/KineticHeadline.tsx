"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

type KineticHeadlineProps = {
  /** Plain text; words are staggered. Use `accent` for gradient words. */
  text: string;
  /** Optional trailing phrase with sc-grad-text treatment */
  accent?: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Letter-spacing oscillates slowly for a variable-font feel */
  variable?: boolean;
  align?: "left" | "center";
};

/**
 * 187TYPE-style kinetic headline: staggered word entrance + optional gradient accent.
 * Reduced-motion: static render, no timeline.
 */
export function KineticHeadline({
  text,
  accent,
  as: Tag = "h2",
  className = "",
  variable = true,
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

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordEls,
        { y: "0.55em", opacity: 0, rotateX: 18 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.85,
          stagger: 0.06,
          ease: "power3.out",
          clearProps: "rotateX",
        }
      );

      if (accentEl) {
        gsap.fromTo(
          accentEl,
          { y: "0.4em", opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, delay: 0.25, ease: "power3.out" }
        );
      }

      if (variable) {
        gsap.to(root, {
          letterSpacing: "0.02em",
          duration: 4.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, root);

    return () => ctx.revert();
  }, [reduced, text, accent, variable]);

  return (
    <Tag
      ref={rootRef as React.RefObject<HTMLHeadingElement>}
      className={`kinetic-headline ${align === "center" ? "text-center" : "text-left"} ${className}`.trim()}
      style={{ perspective: "800px" }}
    >
      <span className="inline">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
            <span data-kword className="inline-block will-change-transform">
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        ))}
        {accent ? (
          <>
            {" "}
            <span className="inline-block overflow-hidden align-bottom">
              <span data-kaccent className="sc-grad-text inline-block will-change-transform">
                {accent}
              </span>
            </span>
          </>
        ) : null}
      </span>
    </Tag>
  );
}
