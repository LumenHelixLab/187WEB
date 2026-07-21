"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { skillShowcaseIndex, type SkillShowcaseData } from "@/lib/skill-showcase-data";
import { FIRST_CLASS_SKILLS, SUBSKILLS, type SuiteSkill } from "@/lib/first-class-skills";
import { natashaKit, yelenaKit, charlotteKit, kaliKit, xavierKit, type AgentKit } from "@/lib/agents";
import { AgentMascotStack } from "./AgentMascot";
import { gsap, registerGsap } from "@/lib/motion/gsap";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Top-level 187WEB agent ecosystem.
 *
 * Agent → skill mapping:
 * - NATASHA: natasha, chain, test (external / post-launch security + applications)
 * - YELENA: natasha, test, access-plus, include (pre-launch internal security + safety gates + applications)
 * - CHARLOTTE: repo, craft, vibe, launch, write, research (application orchestration)
 * - KALI: seo, revenue, publish, create, repo, vibe (growth + create assist)
 * - XAVIER: docs, version, publish, launch, natasha, test (final creation / production + council)
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
      className="group flex h-full min-h-[28rem] flex-col rounded-2xl border border-white/10 bg-[#0A0C14]/90 p-1 will-change-transform"
      style={{ borderColor: `${agent.color}33` }}
    >
      <div
        className="flex flex-1 flex-col rounded-[0.9rem] px-5 pb-6 pt-8 sm:px-6"
        style={{
          background: `linear-gradient(180deg, ${agent.color}12 0%, transparent 42%)`,
        }}
      >
        <div data-agent-mascot className="flex items-center justify-center py-4">
          <AgentMascotStack color={agent.color} name={agent.name} size="lg" showWordmark={false} />
        </div>

        <div className="mt-2 flex flex-1 flex-col">
          <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{agent.name}</h3>
          <p className="mt-1 text-sm font-medium" style={{ color: agent.color }}>
            {agent.tagline}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/60 line-clamp-4">{agent.overview}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {skills.map(({ skill }) => (
              <span
                key={skill.id}
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: `${agent.color}18`,
                  color: agent.color,
                  border: `1px solid ${agent.color}30`,
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>

          <div
            className="mt-auto flex items-center gap-1 pt-6 text-sm font-semibold"
            style={{ color: agent.color }}
          >
            <span>Open {agent.name}</span>
            <svg
              data-agent-arrow
              className="h-4 w-4"
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
      // Staggered hive entrance
      gsap.fromTo(
        cards,
        { opacity: 0, y: 48, scale: 0.92, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "rotateX",
        }
      );

      // Soft idle float on mascots (desynced)
      cards.forEach((card, i) => {
        const mascot = card.querySelector<HTMLElement>("[data-agent-mascot]");
        if (!mascot) return;
        gsap.to(mascot, {
          y: -6,
          duration: 2.2 + i * 0.15,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.2,
        });
      });

      // Hover: lift card + nudge mascot + arrow slide
      cards.forEach((card) => {
        const mascot = card.querySelector<HTMLElement>("[data-agent-mascot]");
        const arrow = card.querySelector<HTMLElement>("[data-agent-arrow]");
        const color = getComputedStyle(card).borderColor;

        const onEnter = () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            boxShadow: `0 28px 60px -28px ${color}`,
            borderColor: color,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
          if (mascot) {
            gsap.to(mascot, { scale: 1.06, duration: 0.35, ease: "power2.out", overwrite: "auto" });
          }
          if (arrow) {
            gsap.to(arrow, { x: 6, duration: 0.3, ease: "power2.out", overwrite: "auto" });
          }
        };

        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 0 0 0 transparent",
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
          if (mascot) {
            gsap.to(mascot, { scale: 1, duration: 0.4, ease: "power2.out", overwrite: "auto" });
          }
          if (arrow) {
            gsap.to(arrow, { x: 0, duration: 0.35, ease: "power2.out", overwrite: "auto" });
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
    <section id="agents" className="relative border-y border-white/10 bg-[#080808]/80 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto w-full max-w-[90rem]">
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

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-5 xl:gap-6"
          style={{ perspective: "1200px" }}
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
