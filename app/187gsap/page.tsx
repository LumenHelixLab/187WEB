import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";
import { MotionRegistryBrowser } from "@/components/registry/MotionRegistryBrowser";

const skill = skillShowcaseIndex.get("gsap");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187GSAP"} — GSAP timeline + ScrollTrigger foundation`,
  description:
    skill?.description ??
    "Animation choreography with GSAP timelines, ScrollTrigger pinning/scrubbing, and performance-safe motion patterns.",
};

export default function GsapSkillPage() {
  if (!skill) notFound();
  return (
    <SkillShowcase skill={skill}>
      <div id="registry">
        <MotionRegistryBrowser />
      </div>
    </SkillShowcase>
  );
}
