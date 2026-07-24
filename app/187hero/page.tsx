import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";
import { HeroShowcase } from "@/components/hero-lab/HeroShowcase";

const skill = skillShowcaseIndex.get("hero");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187HERO"} — Full-screen immersive 3D hero systems`,
  description:
    skill?.description ??
    "Full-screen immersive hero sections with WebGL/R3F backgrounds, parallax layers, and scroll-linked CTAs.",
};

export default function HeroSkillPage() {
  if (!skill) notFound();
  return (
    <SkillShowcase skill={skill}>
      <HeroShowcase />
    </SkillShowcase>
  );
}
