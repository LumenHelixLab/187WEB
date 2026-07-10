import { describe, it, expect } from "vitest";
import { KNOTRecordSchema, KNOTLinkSchema, KNOTStatsSchema } from "../types";

describe("KNOTRecordSchema", () => {
  it("accepts a minimal record", () => {
    const result = KNOTRecordSchema.safeParse({
      id: "rec-1",
      kind: "entity",
      createdAt: "2026-07-09T00:00:00.000Z",
      updatedAt: "2026-07-09T00:00:00.000Z",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an unknown kind", () => {
    const result = KNOTRecordSchema.safeParse({
      id: "rec-1",
      kind: "unknown",
      createdAt: "2026-07-09T00:00:00.000Z",
      updatedAt: "2026-07-09T00:00:00.000Z",
    });
    expect(result.success).toBe(false);
  });
});
