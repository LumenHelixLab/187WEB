import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";
import { ModelShowcase } from "@/components/model-lab/ModelShowcase";

const skill = skillShowcaseIndex.get("model");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187MODEL"} — 3D product showcase / configurator`,
  description:
    skill?.description ??
    "Interactive 3D product viewers with model loading, material variants, camera presets, and configurator UX.",
};

export default function ModelSkillPage() {
  if (!skill) notFound();
  return (
    <SkillShowcase skill={skill}>
      <ModelShowcase />
    </SkillShowcase>
  );
}
