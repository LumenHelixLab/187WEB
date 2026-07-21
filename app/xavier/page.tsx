import type { Metadata } from "next";
import { AgentPage } from "@/components/launch/AgentPage";
import { xavierKit } from "@/lib/agents/xavier-kit";

export const metadata: Metadata = {
  title: `${xavierKit.name} — 187WEB Agent`,
  description: xavierKit.overview,
};

export default function XavierPage() {
  return <AgentPage agent={xavierKit} />;
}
