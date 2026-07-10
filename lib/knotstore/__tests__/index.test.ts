import { describe, it, expect, afterEach } from "vitest";
import { KNOTstore } from "../index";
import { existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

function cleanup(p: string) {
  if (existsSync(p)) unlinkSync(p);
}

describe("KNOTstore factory", () => {
  const paths: string[] = [];

  afterEach(() => {
    for (const p of paths) cleanup(p);
    paths.length = 0;
  });

  it("creates a sqlite backend with explicit path", () => {
    const path = join(tmpdir(), `ks-sqlite-${randomUUID()}.db`);
    paths.push(path);
    const store = KNOTstore({ backend: "sqlite", path });
    store.open();
    store.close();
    expect(existsSync(path)).toBe(true);
  });

  it("creates a sqlite backend with default path", () => {
    const cwd = process.cwd();
    const expected = join(cwd, "knotstore.db");
    paths.push(expected);
    cleanup(expected);
    const store = KNOTstore({ backend: "sqlite" });
    store.open();
    store.close();
    expect(existsSync(expected)).toBe(true);
  });

  it("creates a knot-points backend with explicit path", () => {
    const path = join(tmpdir(), `ks-kp-${randomUUID()}.jsonl`);
    const linksPath = path.replace(/\.jsonl$/, ".links.jsonl");
    paths.push(path, linksPath);
    const store = KNOTstore({ backend: "knot-points", path });
    store.open();
    store.close();
    expect(existsSync(path)).toBe(true);
  });

  it("creates a knot-points backend with default path", () => {
    const cwd = process.cwd();
    const expected = join(cwd, "knotstore.jsonl");
    const linksPath = expected.replace(/\.jsonl$/, ".links.jsonl");
    paths.push(expected, linksPath);
    cleanup(expected);
    cleanup(linksPath);
    const store = KNOTstore({ backend: "knot-points" });
    store.open();
    store.close();
    expect(existsSync(expected)).toBe(true);
  });

  it("creates a hybrid backend", () => {
    const base = join(tmpdir(), `ks-hybrid-${randomUUID()}`);
    const dbPath = base + ".db";
    const kpPath = base + ".jsonl";
    const linksPath = kpPath.replace(/\.jsonl$/, ".links.jsonl");
    paths.push(dbPath, kpPath, linksPath);
    const store = KNOTstore({ backend: "hybrid", path: base });
    store.open();
    store.close();
    expect(existsSync(dbPath)).toBe(true);
    expect(existsSync(kpPath)).toBe(true);
  });

  it("creates a hybrid backend with default path", () => {
    const cwd = process.cwd();
    const dbPath = join(cwd, "knotstore.db");
    const kpPath = join(cwd, "knotstore.jsonl");
    const linksPath = kpPath.replace(/\.jsonl$/, ".links.jsonl");
    paths.push(dbPath, kpPath, linksPath);
    cleanup(dbPath);
    cleanup(kpPath);
    cleanup(linksPath);
    const store = KNOTstore({ backend: "hybrid" });
    store.open();
    store.close();
    expect(existsSync(dbPath)).toBe(true);
    expect(existsSync(kpPath)).toBe(true);
  });
});
