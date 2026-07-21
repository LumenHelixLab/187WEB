/** In-memory audit event types for XAVIER council / brood controls (Phase 4 UI). */

export type XavierAuditKind =
  | "council"
  | "brood_spawn"
  | "brood_pause"
  | "brood_resume"
  | "brood_kill"
  | "brood_kill_all"
  | "dispatch";

export type XavierAuditEvent = {
  id: string;
  kind: XavierAuditKind;
  timestamp: string;
  summary: string;
  detail?: string;
};

export const BROOD_CONCURRENCY_CAP = 5;

export function createAuditEvent(
  kind: XavierAuditKind,
  summary: string,
  detail?: string
): XavierAuditEvent {
  return {
    id: `xa-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    kind,
    timestamp: new Date().toISOString(),
    summary,
    detail,
  };
}

export function formatAuditExport(events: XavierAuditEvent[]): string {
  if (events.length === 0) {
    return "# Xavier audit ledger\n\n_No events recorded in this session._\n";
  }
  const lines = [
    "# Xavier audit ledger",
    "",
    `Exported: ${new Date().toISOString()}`,
    `Events: ${events.length}`,
    "",
    ...events.map(
      (e) =>
        `## ${e.timestamp} · ${e.kind}\n\n${e.summary}${e.detail ? `\n\n${e.detail}` : ""}\n`
    ),
  ];
  return lines.join("\n");
}
