import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";

const agent: AgentConfig = {
  slug: "yelena",
  name: "YELENA",
  tagline: "Security + blue-team operations",
  color: "#f97316",
  skillIds: ["natasha", "chain", "test", "access-plus", "include"],
  overview:
    "YELENA shares security and safety duties with NATASHA. She runs blue-team operations: access gates, inclusion checks, test-driven assurance, and chain-of-custody validation. She is the disciplined safety net behind every public surface.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function YelenaPage() {
  return <AgentPage agent={agent} />;
}
