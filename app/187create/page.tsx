import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";

const skill = skillShowcaseIndex.get("create");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187CREATE"} — 187WEB Skill`,
  description:
    skill?.description ??
    "187CREATE is Kali's growth-first creation skill for landing pages, ad creatives, influencer kits, and conversion-focused surfaces.",
};

export default function CreateSkillPage() {
  if (!skill) notFound();
  return <SkillShowcase skill={skill} />;
}
