import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";

const agent: AgentConfig = {
  slug: "natasha",
  name: "NATASHA",
  tagline: "Security + red-team ethos",
  color: "#f43f5e",
  skillIds: ["natasha", "chain", "test"],
  overview:
    "NATASHA is the 187WEB red-team / offensive security function. She audits threat surfaces, assures contracts, and drives test-driven validation. She shares security duties with YELENA, freeing CHARLOTTE and KALI for application work. She can call CHARLOTTE, KALI, or KRISHNA for SkillChain support.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function NatashaPage() {
  return <AgentPage agent={agent} />;
}
