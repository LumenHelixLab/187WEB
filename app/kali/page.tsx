import type { Metadata } from "next";
import { AgentPage, type AgentConfig } from "@/components/launch/AgentPage";

const agent: AgentConfig = {
  slug: "kali",
  name: "KALI",
  tagline: "Growth + design/dev assist",
  color: "#a855f7",
  skillIds: ["seo", "revenue", "publish", "craft", "repo", "vibe"],
  overview:
    "KALI drives growth and assists CHARLOTTE with direct web design and development: SEO, revenue systems, publish gate, craft, repo, and vibe. With security handled by NATASHA and YELENA, she is free for application work and can appeal to KRISHNA for SkillChains.",
};

export const metadata: Metadata = {
  title: `${agent.name} — 187WEB Agent`,
  description: agent.overview,
};

export default function KaliPage() {
  return <AgentPage agent={agent} />;
}
