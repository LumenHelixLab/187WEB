import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkillShowcase } from "@/components/showcase/SkillShowcase";
import { skillShowcaseIndex } from "@/lib/skill-showcase-data";
import { AgentUiShowcase } from "@/components/agent-ui-lab/AgentUiShowcase";

const skill = skillShowcaseIndex.get("agent-ui");

export const metadata: Metadata = {
  title: `${skill?.name ?? "187AGENT-UI"} — The frontend cockpit for AI agents`,
  description:
    skill?.description ??
    "Streaming-token DOM rendering, human-in-the-loop input mechanics, and pub/sub agent event buses.",
};

export default function AgentUiSkillPage() {
  if (!skill) notFound();
  return (
    <SkillShowcase skill={skill}>
      <AgentUiShowcase />
    </SkillShowcase>
  );
}
