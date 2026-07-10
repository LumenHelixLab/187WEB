import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { HybridBackend } from "../backends/hybrid";
import { existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

let dbPath: string;
let kpPath: string;

describe("HybridBackend", () => {
  let backend: HybridBackend;

  beforeEach(() => {
    dbPath = join(tmpdir(), `knotstore-hybrid-test-${randomUUID()}.db`);
    kpPath = join(tmpdir(), `knotstore-hybrid-kp-test-${randomUUID()}.jsonl`);
    backend = new HybridBackend(dbPath, kpPath);
    backend.open();
  });

  afterEach(() => {
    backend.close();
    if (existsSync(dbPath)) unlinkSync(dbPath);
    if (existsSync(kpPath)) unlinkSync(kpPath);
    if (existsSync(kpPath + ".links.jsonl")) unlinkSync(kpPath + ".links.jsonl");
  });

  it("stores a hybrid record with both SQL fields and a knotHash", () => {
    const now = new Date().toISOString();
    backend.put({
      id: "h1",
      kind: "entity",
      title: "Hybrid Entity",
      knotHash: "aGFzaA==",
      createdAt: now,
      updatedAt: now,
    });
    const got = backend.get("h1");
    expect(got?.title).toBe("Hybrid Entity");
    expect(got?.knotHash).toBe("aGFzaA==");
  });

  it("counts hybrid records and knot points in stats", () => {
    const now = new Date().toISOString();
    backend.put({ id: "a", kind: "entity", knotHash: "xA==", createdAt: now, updatedAt: now });
    backend.put({ id: "b", kind: "crawl", createdAt: now, updatedAt: now });
    const s = backend.stats();
    expect(s.totalRecords).toBe(2);
    expect(s.knotPoints).toBe(1);
  });

  it("deduplicates query results between backends", () => {
    const now = new Date().toISOString();
    backend.put({ id: "d1", kind: "knot-point", knotHash: "aA==", createdAt: now, updatedAt: now });
    const results = backend.query({ kind: "knot-point" });
    const ids = results.map((r) => r.id);
    expect(ids).toContain("d1");
    expect(ids.filter((id) => id === "d1")).toHaveLength(1);
  });

  it("persists links across close/reopen", () => {
    const now = new Date().toISOString();
    backend.put({ id: "src", kind: "entity", createdAt: now, updatedAt: now });
    backend.put({ id: "tgt", kind: "entity", createdAt: now, updatedAt: now });
    backend.link("src", "tgt", { rel: "references" });

    backend.close();
    backend = new HybridBackend(dbPath, kpPath);
    backend.open();

    const links = backend.getLinks("src");
    expect(links.outgoing).toHaveLength(1);
    expect(links.outgoing[0].targetId).toBe("tgt");
    expect(links.outgoing[0].rel).toBe("references");
  });

  it("falls back to SQLite when the point backend has no record", () => {
    const now = new Date().toISOString();
    backend.put({
      id: "sql-only",
      kind: "crawl",
      title: "SQL Only",
      createdAt: now,
      updatedAt: now,
    });
    const got = backend.get("sql-only");
    expect(got?.title).toBe("SQL Only");
    expect(got?.knotHash).toBeUndefined();
  });

  it("returns a knotHash-only record when SQLite is missing it", () => {
    const now = new Date().toISOString();
    backend.put({
      id: "kp-only",
      kind: "knot-point",
      knotHash: "eA==",
      title: "Knot Only",
      createdAt: now,
      updatedAt: now,
    });
    const got = backend.get("kp-only");
    expect(got?.title).toBe("Knot Only");
    expect(got?.knotHash).toBe("eA==");
  });

  it("updates both backends when overwriting an existing record", () => {
    const now = new Date().toISOString();
    backend.put({
      id: "upd",
      kind: "entity",
      title: "Original",
      knotHash: "b3JpZw==",
      createdAt: now,
      updatedAt: now,
    });

    backend.put({
      id: "upd",
      kind: "entity",
      title: "Updated",
      knotHash: "dXBk",
      createdAt: now,
      updatedAt: now,
    });

    const got = backend.get("upd");
    expect(got?.title).toBe("Updated");
    expect(got?.knotHash).toBe("dXBk");
  });
});
