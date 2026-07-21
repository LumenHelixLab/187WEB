import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";

const agent: AgentConfig = {
  slug: "charlotte",
  name: "CHARLOTTE",
  tagline: "Orchestrate + solve + recycle",
  color: "#39FF14",
  skillIds: ["repo", "craft", "vibe", "launch", "write", "research", "access-plus", "include", "test"],
  overview:
    "CHARLOTTE threads intent into retrievable info, recycled and upcycled solutions, design-system hybrids, launch plans, and conflict-resolved public copy. She shares security and safety gates with NATASHA and is the green-team counterweight to NATASHA's red team.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function CharlottePage() {
  return <AgentPage agent={agent} />;
}
