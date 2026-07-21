import { describe, it, expect } from "vitest";
import {
  BROOD_CONCURRENCY_CAP,
  createAuditEvent,
  formatAuditExport,
} from "../xavier-audit";

describe("xavier-audit", () => {
  it("uses a default brood concurrency cap of 5", () => {
    expect(BROOD_CONCURRENCY_CAP).toBe(5);
  });

  it("creates events with id, kind, timestamp, and summary", () => {
    const e = createAuditEvent("council", "Ship decision", "detail line");
    expect(e.kind).toBe("council");
    expect(e.summary).toBe("Ship decision");
    expect(e.detail).toBe("detail line");
    expect(e.id).toMatch(/^xa-/);
    expect(e.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("formats empty export with honest empty state", () => {
    const md = formatAuditExport([]);
    expect(md).toContain("Xavier audit ledger");
    expect(md).toContain("No events recorded");
  });

  it("formats non-empty export with event sections", () => {
    const e = createAuditEvent("brood_spawn", "Spawned natasha-1");
    const md = formatAuditExport([e]);
    expect(md).toContain("brood_spawn");
    expect(md).toContain("Spawned natasha-1");
    expect(md).toContain("Events: 1");
  });
});
