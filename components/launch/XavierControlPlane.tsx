"use client";

import { useCallback, useState } from "react";
import type { AgentKit } from "@/lib/agents/agent-kit";
import {
  createAuditEvent,
  type XavierAuditEvent,
  type XavierAuditKind,
} from "@/lib/agents/xavier-audit";
import { XavierAuditLedger } from "./XavierAuditLedger";
import { XavierBrood } from "./XavierBrood";
import { XavierCouncil } from "./XavierCouncil";

/**
 * Shared in-session state for XAVIER premium multi-agent controls.
 * Golden path: council → brood → audit export without backend.
 */
export function XavierControlPlane({ agent }: { agent: AgentKit }) {
  const [events, setEvents] = useState<XavierAuditEvent[]>([]);

  const appendAudit = useCallback((kind: XavierAuditKind, summary: string, detail?: string) => {
    setEvents((prev) => [createAuditEvent(kind, summary, detail), ...prev]);
  }, []);

  return (
    <>
      <XavierCouncil agent={agent} onAudit={appendAudit} />
      <XavierBrood agent={agent} onAudit={appendAudit} />
      <XavierAuditLedger agent={agent} events={events} />
    </>
  );
}
