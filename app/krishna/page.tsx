import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";
import { KrishnaSkillChains } from "@/components/launch/KrishnaSkillChains";

const agent: AgentConfig = {
  slug: "krishna",
  name: "KRISHNA",
  tagline: "Knowledge + security assist + SkillChains",
  color: "#3b82f6",
  skillIds: ["free", "docs", "learn", "test", "version", "natasha"],
  overview:
    "KRISHNA curates knowledge, assists NATASHA with security validation, designs learning experiences, builds assessments, controls release versions, and builds SkillChains — end-to-end combinations of 1st, 2nd, and 3rd class skills that produce real artifacts.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function KrishnaPage() {
  return (
    <>
      <AgentPage agent={agent} />
      <KrishnaSkillChains />
    </>
  );
}
