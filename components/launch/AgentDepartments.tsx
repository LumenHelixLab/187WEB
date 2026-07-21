"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { skillShowcaseIndex, type SkillShowcaseData } from "@/lib/skill-showcase-data";
import { FIRST_CLASS_SKILLS, SUBSKILLS, type SuiteSkill } from "@/lib/first-class-skills";
import { natashaKit, yelenaKit, charlotteKit, kaliKit, xavierKit, type AgentKit } from "@/lib/agents";
import { AgentMascot } from "./AgentMascot";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Agent department grid — portrait cards matching the reference layout:
 * large color wireframe spider, ghost name behind, tagline + body, 187* pills, Open CTA.
 */

const AGENTS: AgentKit[] = [natashaKit, yelenaKit, charlotteKit, kaliKit, xavierKit];

const skillById = new Map([...FIRST_CLASS_SKILLS, ...SUBSKILLS].map((s) => [s.id, s]));

function skillMeta(id: string): SkillShowcaseData | undefined {
  return skillShowcaseIndex.get(id);
}

function AgentCard({
  agent,
  cardRef,
}: {
  agent: AgentKit;
  cardRef: (el: HTMLAnchorElement | null) => void;
}) {
  const skills = agent.skills
    .map((id) => ({ skill: skillById.get(id), meta: skillMeta(id) }))
    .filter((item): item is { skill: SuiteSkill; meta: SkillShowcaseData | undefined } => Boolean(item.skill));

  return (
    <Link
      ref={cardRef}
      href={`/${agent.slug}`}
      data-agent-card
      className="group relative flex h-full min-h-[36rem] flex-col overflow-hidden rounded-2xl border will-change-transform"
      style={{
        borderColor: `${agent.color}55`,
        background: `
          radial-gradient(ellipse 120% 55% at 50% 0%, ${agent.color}22 0%, transparent 55%),
          linear-gradient(180deg, #0c0e14 0%, #080a10 100%)
        `,
      }}
    >
      {/* Ghost agent name — large outline behind the spider (reference treatment) */}
      <span
        data-agent-ghost
        aria-hidden
        className="pointer-events-none absolute inset-x-[-8%] top-[22%] z-0 select-none text-center font-black uppercase leading-none tracking-tighter"
        style={{
          color: "transparent",
          WebkitTextStroke: `1.25px ${agent.color}48`,
          fontSize: "clamp(2.4rem, 0.6rem + 2.8vw, 3.4rem)",
        }}
      >
        {agent.name}
      </span>

      {/* Mascot band */}
      <div
        data-agent-mascot
        className="relative z-10 flex items-center justify-center px-3 pb-1 pt-10 sm:pt-12"
      >
        <AgentMascot color={agent.color} name={agent.name} size="card" />
      </div>

      {/* Copy band */}
      <div className="relative z-10 flex flex-1 flex-col px-5 pb-6 pt-2 sm:px-5">
        <h3
          data-agent-title
          className="text-[1.15rem] font-bold tracking-tight text-white sm:text-xl"
        >
          {agent.name}
        </h3>
        <p className="mt-1 text-[0.8rem] font-semibold leading-snug" style={{ color: agent.color }}>
          {agent.tagline}
        </p>

        <p className="mt-3 text-[0.8rem] leading-relaxed text-white/55 line-clamp-4">
          {agent.overview}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {skills.map(({ skill }) => (
            <span
              key={skill.id}
              className="rounded-full px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide"
              style={{
                color: agent.color,
                border: `1px solid ${agent.color}55`,
                backgroundColor: `${agent.color}12`,
              }}
            >
              {skill.name}
            </span>
          ))}
        </div>

        <div
          className="mt-auto flex items-center gap-1.5 pt-6 text-[0.8rem] font-semibold"
          style={{ color: agent.color }}
        >
          <span>Open {agent.name}</span>
          <svg
            data-agent-arrow
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export function AgentDepartments() {
  const reducedMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    registerGsap();
    const cards = cardEls.current.filter(Boolean) as HTMLAnchorElement[];
    if (cards.length === 0) return;

    if (reducedMotion) {
      gsap.set(cards, { clearProps: "all", opacity: 1, y: 0, scale: 1 });
      return;
    }

    const listenerCleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.14,
          ease: "power2.out",
        }
      );

      cards.forEach((card, i) => {
        const ghost = card.querySelector<HTMLElement>("[data-agent-ghost]");
        const mascot = card.querySelector<HTMLElement>("[data-agent-mascot]");

        if (ghost) {
          gsap.to(ghost, {
            y: -5,
            duration: 6 + i * 0.3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.35,
          });
        }

        if (mascot) {
          gsap.to(mascot, {
            y: -3,
            duration: 5.2 + i * 0.25,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.3,
          });
        }
      });

      cards.forEach((card) => {
        const mascot = card.querySelector<HTMLElement>("[data-agent-mascot]");
        const arrow = card.querySelector<HTMLElement>("[data-agent-arrow]");
        const color = getComputedStyle(card).borderColor;

        const onEnter = () => {
          gsap.to(card, {
            y: -5,
            boxShadow: `0 22px 48px -28px ${color}`,
            duration: 0.7,
            ease: "power2.out",
            overwrite: "auto",
          });
          if (mascot) {
            gsap.to(mascot, { scale: 1.03, duration: 0.75, ease: "power2.out", overwrite: "auto" });
          }
          if (arrow) {
            gsap.to(arrow, { x: 4, duration: 0.6, ease: "power2.out", overwrite: "auto" });
          }
        };

        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "0 0 0 0 transparent",
            duration: 0.85,
            ease: "power2.out",
            overwrite: "auto",
          });
          if (mascot) {
            gsap.to(mascot, { scale: 1, duration: 0.85, ease: "power2.out", overwrite: "auto" });
          }
          if (arrow) {
            gsap.to(arrow, { x: 0, duration: 0.7, ease: "power2.out", overwrite: "auto" });
          }
        };

        card.addEventListener("pointerenter", onEnter);
        card.addEventListener("pointerleave", onLeave);
        listenerCleanups.push(() => {
          card.removeEventListener("pointerenter", onEnter);
          card.removeEventListener("pointerleave", onLeave);
        });
      });
    }, gridRef);

    return () => {
      listenerCleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section id="agents" className="relative z-10 border-y border-white/10 bg-[#080808]/92 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto w-full max-w-[92rem]">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">First-class agents</p>
          <h2 className="mt-4 text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-bold tracking-tight text-white">
            Five agents. One web hive.
          </h2>
          <p className="mt-4 text-white/60">
            Each agent routes related skills into a coherent crew. Click through to see modules, triggers, and skill
            pages.
          </p>
        </Reveal>

        {/* Equal-height portrait columns — matches reference row of five */}
        <div
          ref={gridRef}
          className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5 xl:gap-3 2xl:gap-4"
        >
          {AGENTS.map((agent, i) => (
            <AgentCard
              key={agent.slug}
              agent={agent}
              cardRef={(el) => {
                cardEls.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
