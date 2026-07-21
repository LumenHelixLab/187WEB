import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";

const agent: AgentConfig = {
  slug: "charlotte",
  name: "CHARLOTTE",
  tagline: "Orchestrate + solve + recycle",
  color: "#39FF14",
  skillIds: ["repo", "craft", "vibe", "launch", "write", "research"],
  overview:
    "CHARLOTTE threads intent into retrievable info, recycled and upcycled solutions, design-system hybrids, launch plans, and conflict-resolved public copy. With NATASHA and YELENA owning security, she focuses on orchestrating application work, assigning subagents, and appealing to KRISHNA for SkillChains.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function CharlottePage() {
  return <AgentPage agent={agent} />;
}
