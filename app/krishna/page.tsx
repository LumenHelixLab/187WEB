import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";
import { KrishnaSkillChains } from "@/components/launch/KrishnaSkillChains";

const agent: AgentConfig = {
  slug: "krishna",
  name: "KRISHNA",
  tagline: "Knowledge + validation + SkillChains",
  color: "#3b82f6",
  skillIds: ["free", "docs", "learn", "test", "version", "natasha"],
  overview:
    "KRISHNA curates knowledge, validates releases, and controls versions. He assists NATASHA and YELENA with security-flavored research, and any agent can appeal to him to provide or create a SkillChain — an end-to-end combination of 1st, 2nd, and 3rd class skills that produces a real artifact.",
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
