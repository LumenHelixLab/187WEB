import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";

const agent: AgentConfig = {
  slug: "natasha",
  name: "NATASHA",
  tagline: "Security + red-team ethos",
  color: "#f43f5e",
  skillIds: ["natasha", "chain", "test", "access-plus", "include"],
  overview:
    "NATASHA is the 187WEB red-team / security function. She audits threat surfaces, assures contracts and tests, reviews access and inclusion gates, and researches risks with source-backed claim discipline. She shares safety gates with CHARLOTTE.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function NatashaPage() {
  return <AgentPage agent={agent} />;
}
