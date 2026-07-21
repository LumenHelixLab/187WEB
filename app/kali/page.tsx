import type { Metadata } from "next";
import { AgentPage } from "@/components/launch/AgentPage";
import { kaliKit } from "@/lib/agents/kali-kit";

export const metadata: Metadata = {
  title: `${kaliKit.name} — 187WEB Agent`,
  description: kaliKit.overview,
};

export default function KaliPage() {
  return <AgentPage agent={kaliKit} />;
}
