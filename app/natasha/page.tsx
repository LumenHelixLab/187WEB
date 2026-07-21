import type { Metadata } from "next";
import { AgentPage } from "@/components/launch/AgentPage";
import { natashaKit } from "@/lib/agents/natasha-kit";

export const metadata: Metadata = {
  title: `${natashaKit.name} — 187WEB Agent`,
  description: natashaKit.overview,
};

export default function NatashaPage() {
  return <AgentPage agent={natashaKit} />;
}
