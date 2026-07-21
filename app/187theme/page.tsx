import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";
import { ThemeCatalogSection } from "@/components/theme/ThemeCatalogSection";

const skill = skillShowcaseIndex.get("theme");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187THEME"} — Palettes, fonts, semantic tokens`,
  description:
    skill?.description ??
    "List, preview, apply, create, audit, and export design themes for 187WEB surfaces.",
};

export default function ThemeSkillPage() {
  if (!skill) notFound();
  return (
    <SkillShowcase skill={skill}>
      <ThemeCatalogSection />
    </SkillShowcase>
  );
}
