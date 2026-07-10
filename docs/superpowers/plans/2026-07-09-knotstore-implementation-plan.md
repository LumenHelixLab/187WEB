# KNOTstore Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold `lib/knotstore/` as a pluggable, file-based agentic data layer with SQLite, KNOT-point, and hybrid backends, plus a Vault-style `/knotstore` preview page.

**Architecture:** A single `KNOTstore` class exposes `put/get/query/link/getLinks/stats`. Concrete backends implement a `KNOTstoreBackend` interface. `SqliteBackend` uses `better-sqlite3`, `KnotPointBackend` uses a JSON-lines file, and `HybridBackend` combines both. A Next.js page at `/knotstore` renders stat counters and a connection-health matrix.

**Tech Stack:** TypeScript, `better-sqlite3`, Zod, Vitest, Next.js 15 App Router, Tailwind CSS.

---

## File map

| File                                          | Responsibility                           |
| --------------------------------------------- | ---------------------------------------- |
| `lib/knotstore/types.ts`                      | Shared TypeScript types and Zod schemas. |
| `lib/knotstore/errors.ts`                     | `KNOTstoreError` typed exception.        |
| `lib/knotstore/backends/base.ts`              | Abstract `KNOTstoreBackend` interface.   |
| `lib/knotstore/backends/sqlite.ts`            | `better-sqlite3` backend.                |
| `lib/knotstore/backends/knot-points.ts`       | Hash-based KNOT point backend.           |
| `lib/knotstore/backends/hybrid.ts`            | Combined SQLite + KNOT point backend.    |
| `lib/knotstore/index.ts`                      | Public `KNOTstore` class and factory.    |
| `lib/knotstore/__tests__/sqlite.test.ts`      | SQLite backend tests.                    |
| `lib/knotstore/__tests__/knot-points.test.ts` | KNOT point backend tests.                |
| `lib/knotstore/__tests__/hybrid.test.ts`      | Hybrid backend tests.                    |
| `lib/knotstore/README.md`                     | Consumer usage guide.                    |
| `app/knotstore/page.tsx`                      | Vault-style preview page.                |
| `app/knotstore/layout.tsx`                    | Route metadata.                          |

---

### Task 1: Add dependencies and test script

**Files:**

- Modify: `package.json`

**Step 1: Install dependencies**

Run:

```bash
npm install better-sqlite3
npm install -D vitest @vitest/ui
```

Expected: packages install without errors. If `better-sqlite3` fails to compile on Windows, install Python + Visual Studio Build Tools or switch to `better-sqlite3` prebuilt by retrying `npm install better-sqlite3`.

**Step 2: Add test script**

Modify `package.json` scripts section:

```json
"test": "vitest run",
"test:watch": "vitest",
"test:ui": "vitest --ui"
```

**Step 3: Create Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
});
```

**Step 4: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "chore(deps): add better-sqlite3 and vitest for KNOTstore"
```

---

### Task 2: Write shared types and Zod schemas

**Files:**

- Create: `lib/knotstore/types.ts`

**Step 1: Write the failing test**

Create `lib/knotstore/__tests__/types.test.ts`:

```ts
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
```

**Step 2: Run test to verify it fails**

```bash
npm test -- lib/knotstore/__tests__/types.test.ts
```

Expected: module resolution error because `../types` does not exist.

**Step 3: Implement types**

Create `lib/knotstore/types.ts`:

```ts
import { z } from "zod";

export const RecordKindSchema = z.enum(["crawl", "entity", "stub", "knot-point"]);
export type RecordKind = z.infer<typeof RecordKindSchema>;

export const KNOTRecordSchema = z.object({
  id: z.string().min(1),
  kind: RecordKindSchema,
  source: z.string().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  tags: z.array(z.string()).optional(),
  knotHash: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  meta: z.record(z.unknown()).optional(),
});
export type KNOTRecord = z.infer<typeof KNOTRecordSchema>;

export const KNOTLinkSchema = z.object({
  sourceId: z.string().min(1),
  targetId: z.string().min(1),
  rel: z.string().optional(),
  createdAt: z.string().datetime(),
});
export type KNOTLink = z.infer<typeof KNOTLinkSchema>;

export const KNOTStatsSchema = z.object({
  totalRecords: z.number().int().min(0),
  crawlDepth: z.number().int().min(0),
  entitiesWoven: z.number().int().min(0),
  stubPages: z.number().int().min(0),
  links: z.number().int().min(0),
  knotPoints: z.number().int().min(0),
});
export type KNOTStats = z.infer<typeof KNOTStatsSchema>;

export const KNOTQuerySchema = z.object({
  kind: RecordKindSchema.optional(),
  source: z.string().optional(),
  tags: z.array(z.string()).optional(),
  search: z.string().optional(),
  limit: z.number().int().min(1).optional(),
});
export type KNOTQuery = z.infer<typeof KNOTQuerySchema>;

export interface KNOTstoreBackend {
  open(): void;
  close(): void;
  put(record: KNOTRecord): string;
  get(id: string): KNOTRecord | null;
  query(filter: KNOTQuery): KNOTRecord[];
  link(sourceId: string, targetId: string, meta?: { rel?: string }): void;
  getLinks(id: string): { outgoing: KNOTLink[]; incoming: KNOTLink[] };
  stats(): KNOTStats;
}

export interface KNOTstoreOptions {
  backend: "sqlite" | "knot-points" | "hybrid";
  path?: string;
}
```

**Step 4: Run test to verify it passes**

```bash
npm test -- lib/knotstore/__tests__/types.test.ts
```

Expected: PASS.

**Step 5: Commit**

```bash
git add lib/knotstore/types.ts lib/knotstore/__tests__/types.test.ts
git commit -m "feat(knotstore): add shared types and zod schemas"
```

---

### Task 3: Add typed error class

**Files:**

- Create: `lib/knotstore/errors.ts`
- Modify: `lib/knotstore/types.ts` (add error codes if needed — not necessary)

**Step 1: Write the failing test**

Create `lib/knotstore/__tests__/errors.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { KNOTstoreError } from "../errors";

describe("KNOTstoreError", () => {
  it("carries a code and message", () => {
    const err = new KNOTstoreError("ENOENT", "missing record");
    expect(err.code).toBe("ENOENT");
    expect(err.message).toBe("missing record");
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- lib/knotstore/__tests__/errors.test.ts
```

Expected: module error.

**Step 3: Implement error class**

Create `lib/knotstore/errors.ts`:

```ts
export type KNOTstoreErrorCode = "ENOENT" | "ECONFLICT" | "EINVALID" | "ECLOSED" | "EUNKNOWN";

export class KNOTstoreError extends Error {
  code: KNOTstoreErrorCode;

  constructor(code: KNOTstoreErrorCode, message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "KNOTstoreError";
    this.code = code;
  }
}
```

**Step 4: Run test to verify it passes**

```bash
npm test -- lib/knotstore/__tests__/errors.test.ts
```

Expected: PASS.

**Step 5: Commit**

```bash
git add lib/knotstore/errors.ts lib/knotstore/__tests__/errors.test.ts
git commit -m "feat(knotstore): add typed KNOTstoreError"
```

---

### Task 4: Implement SQLite backend

**Files:**

- Create: `lib/knotstore/backends/sqlite.ts`
- Create: `lib/knotstore/backends/base.ts`

**Step 1: Write the failing test**

Create `lib/knotstore/__tests__/sqlite.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { SqliteBackend } from "../backends/sqlite";
import { KNOTRecord } from "../types";
import { existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dbPath = join(tmpdir(), `knotstore-sqlite-test-${Date.now()}.db`);

describe("SqliteBackend", () => {
  let backend: SqliteBackend;

  beforeEach(() => {
    backend = new SqliteBackend(dbPath);
    backend.open();
  });

  afterEach(() => {
    backend.close();
    if (existsSync(dbPath)) unlinkSync(dbPath);
  });

  it("round-trips a record", () => {
    const record: KNOTRecord = {
      id: "r1",
      kind: "entity",
      title: "Entity One",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    backend.put(record);
    expect(backend.get("r1")?.title).toBe("Entity One");
  });

  it("queries by kind", () => {
    const now = new Date().toISOString();
    backend.put({ id: "a", kind: "entity", createdAt: now, updatedAt: now });
    backend.put({ id: "b", kind: "crawl", createdAt: now, updatedAt: now });
    expect(backend.query({ kind: "entity" }).map((r) => r.id)).toEqual(["a"]);
  });

  it("creates bidirectional links", () => {
    const now = new Date().toISOString();
    backend.put({ id: "x", kind: "entity", createdAt: now, updatedAt: now });
    backend.put({ id: "y", kind: "entity", createdAt: now, updatedAt: now });
    backend.link("x", "y", { rel: "cites" });
    const links = backend.getLinks("x");
    expect(links.outgoing).toHaveLength(1);
    expect(links.incoming).toHaveLength(0);
    expect(backend.getLinks("y").incoming).toHaveLength(1);
  });

  it("returns stats", () => {
    const now = new Date().toISOString();
    backend.put({ id: "a", kind: "crawl", createdAt: now, updatedAt: now });
    backend.put({ id: "b", kind: "entity", createdAt: now, updatedAt: now });
    backend.link("a", "b");
    const s = backend.stats();
    expect(s.totalRecords).toBe(2);
    expect(s.entitiesWoven).toBe(1);
    expect(s.links).toBe(1);
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- lib/knotstore/__tests__/sqlite.test.ts
```

Expected: module error.

**Step 3: Implement base interface and SQLite backend**

Create `lib/knotstore/backends/base.ts`:

```ts
import { KNOTstoreBackend } from "../types";

export abstract class BaseBackend implements KNOTstoreBackend {
  abstract open(): void;
  abstract close(): void;
  abstract put(record: import("../types").KNOTRecord): string;
  abstract get(id: string): import("../types").KNOTRecord | null;
  abstract query(filter: import("../types").KNOTQuery): import("../types").KNOTRecord[];
  abstract link(sourceId: string, targetId: string, meta?: { rel?: string }): void;
  abstract getLinks(id: string): {
    outgoing: import("../types").KNOTLink[];
    incoming: import("../types").KNOTLink[];
  };
  abstract stats(): import("../types").KNOTStats;
}
```

Create `lib/knotstore/backends/sqlite.ts`:

```ts
import Database from "better-sqlite3";
import { KNOTLink, KNOTQuery, KNOTRecord, KNOTStats } from "../types";
import { KNOTstoreError } from "../errors";

export class SqliteBackend {
  private db: Database.Database | null = null;

  constructor(private path: string) {}

  open(): void {
    this.db = new Database(this.path);
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS records (
        id TEXT PRIMARY KEY,
        kind TEXT NOT NULL,
        source TEXT,
        title TEXT,
        content TEXT,
        tags TEXT,
        knotHash TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        meta TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_records_kind ON records(kind);
      CREATE INDEX IF NOT EXISTS idx_records_source ON records(source);
      CREATE TABLE IF NOT EXISTS links (
        sourceId TEXT NOT NULL,
        targetId TEXT NOT NULL,
        rel TEXT,
        createdAt TEXT NOT NULL,
        PRIMARY KEY (sourceId, targetId)
      );
      CREATE INDEX IF NOT EXISTS idx_links_source ON links(sourceId);
      CREATE INDEX IF NOT EXISTS idx_links_target ON links(targetId);
    `);
  }

  close(): void {
    this.db?.close();
    this.db = null;
  }

  private ensureOpen(): Database.Database {
    if (!this.db) throw new KNOTstoreError("ECLOSED", "SQLite backend is not open");
    return this.db;
  }

  put(record: KNOTRecord): string {
    const db = this.ensureOpen();
    const stmt = db.prepare(`
      INSERT INTO records (id, kind, source, title, content, tags, knotHash, createdAt, updatedAt, meta)
      VALUES (@id, @kind, @source, @title, @content, @tags, @knotHash, @createdAt, @updatedAt, @meta)
      ON CONFLICT(id) DO UPDATE SET
        kind=excluded.kind,
        source=excluded.source,
        title=excluded.title,
        content=excluded.content,
        tags=excluded.tags,
        knotHash=excluded.knotHash,
        updatedAt=excluded.updatedAt,
        meta=excluded.meta
    `);
    stmt.run({
      id: record.id,
      kind: record.kind,
      source: record.source ?? null,
      title: record.title ?? null,
      content: record.content ?? null,
      tags: record.tags ? JSON.stringify(record.tags) : null,
      knotHash: record.knotHash ?? null,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      meta: record.meta ? JSON.stringify(record.meta) : null,
    });
    return record.id;
  }

  get(id: string): KNOTRecord | null {
    const db = this.ensureOpen();
    const row = db.prepare("SELECT * FROM records WHERE id = ?").get(id) as RecordRow | undefined;
    return row ? this.rowToRecord(row) : null;
  }

  query(filter: KNOTQuery): KNOTRecord[] {
    const db = this.ensureOpen();
    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (filter.kind) {
      conditions.push("kind = ?");
      params.push(filter.kind);
    }
    if (filter.source) {
      conditions.push("source = ?");
      params.push(filter.source);
    }
    if (filter.search) {
      conditions.push("(title LIKE ? OR content LIKE ?)");
      const like = `%${filter.search}%`;
      params.push(like, like);
    }

    let sql = "SELECT * FROM records";
    if (conditions.length) sql += " WHERE " + conditions.join(" AND ");
    sql += " ORDER BY updatedAt DESC";
    if (filter.limit) {
      sql += " LIMIT ?";
      params.push(filter.limit);
    }

    const rows = db.prepare(sql).all(...params) as RecordRow[];
    return rows.map((r) => this.rowToRecord(r));
  }

  link(sourceId: string, targetId: string, meta?: { rel?: string }): void {
    const db = this.ensureOpen();
    db.prepare(
      `INSERT INTO links (sourceId, targetId, rel, createdAt)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(sourceId, targetId) DO UPDATE SET rel=excluded.rel`,
    ).run(sourceId, targetId, meta?.rel ?? null, new Date().toISOString());
  }

  getLinks(id: string): { outgoing: KNOTLink[]; incoming: KNOTLink[] } {
    const db = this.ensureOpen();
    const outgoing = db.prepare("SELECT * FROM links WHERE sourceId = ?").all(id) as LinkRow[];
    const incoming = db.prepare("SELECT * FROM links WHERE targetId = ?").all(id) as LinkRow[];
    return {
      outgoing: outgoing.map(this.rowToLink),
      incoming: incoming.map(this.rowToLink),
    };
  }

  stats(): KNOTStats {
    const db = this.ensureOpen();
    const totalRecords = (db.prepare("SELECT COUNT(*) AS c FROM records").get() as { c: number }).c;
    const entitiesWoven = (
      db.prepare("SELECT COUNT(*) AS c FROM records WHERE kind = 'entity'").get() as { c: number }
    ).c;
    const stubPages = (
      db.prepare("SELECT COUNT(*) AS c FROM records WHERE kind = 'stub'").get() as { c: number }
    ).c;
    const links = (db.prepare("SELECT COUNT(*) AS c FROM links").get() as { c: number }).c;
    const knotPoints = (
      db.prepare("SELECT COUNT(*) AS c FROM records WHERE knotHash IS NOT NULL").get() as {
        c: number;
      }
    ).c;
    const crawlDepth =
      (
        db
          .prepare(
            "SELECT MAX(CAST(json_extract(meta, '$.depth') AS INTEGER)) AS d FROM records WHERE meta IS NOT NULL",
          )
          .get() as { d: number | null }
      ).d ?? 0;

    return {
      totalRecords,
      crawlDepth,
      entitiesWoven,
      stubPages,
      links,
      knotPoints,
    };
  }

  private rowToRecord(row: RecordRow): KNOTRecord {
    return {
      id: row.id,
      kind: row.kind as KNOTRecord["kind"],
      source: row.source ?? undefined,
      title: row.title ?? undefined,
      content: row.content ?? undefined,
      tags: row.tags ? JSON.parse(row.tags) : undefined,
      knotHash: row.knotHash ?? undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      meta: row.meta ? JSON.parse(row.meta) : undefined,
    };
  }

  private rowToLink(row: LinkRow): KNOTLink {
    return {
      sourceId: row.sourceId,
      targetId: row.targetId,
      rel: row.rel ?? undefined,
      createdAt: row.createdAt,
    };
  }
}

type RecordRow = {
  id: string;
  kind: string;
  source: string | null;
  title: string | null;
  content: string | null;
  tags: string | null;
  knotHash: string | null;
  createdAt: string;
  updatedAt: string;
  meta: string | null;
};

type LinkRow = {
  sourceId: string;
  targetId: string;
  rel: string | null;
  createdAt: string;
};
```

**Step 4: Run test to verify it passes**

```bash
npm test -- lib/knotstore/__tests__/sqlite.test.ts
```

Expected: PASS.

**Step 5: Commit**

```bash
git add lib/knotstore/backends/base.ts lib/knotstore/backends/sqlite.ts lib/knotstore/__tests__/sqlite.test.ts
git commit -m "feat(knotstore): add SQLite backend"
```

---

### Task 5: Implement KNOT point backend

**Files:**

- Create: `lib/knotstore/backends/knot-points.ts`

**Step 1: Write the failing test**

Create `lib/knotstore/__tests__/knot-points.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { KnotPointBackend } from "../backends/knot-points";
import { existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const path = join(tmpdir(), `knotstore-kp-test-${Date.now()}.jsonl`);

describe("KnotPointBackend", () => {
  let backend: KnotPointBackend;

  beforeEach(() => {
    backend = new KnotPointBackend(path);
    backend.open();
  });

  afterEach(() => {
    backend.close();
    if (existsSync(path)) unlinkSync(path);
  });

  it("stores and retrieves a knot point record", () => {
    const now = new Date().toISOString();
    backend.put({
      id: "kp1",
      kind: "knot-point",
      knotHash: "aGVsbG8=",
      createdAt: now,
      updatedAt: now,
    });
    const got = backend.get("kp1");
    expect(got?.knotHash).toBe("aGVsbG8=");
  });

  it("counts knot points in stats", () => {
    const now = new Date().toISOString();
    backend.put({
      id: "kp1",
      kind: "knot-point",
      knotHash: "aA==",
      createdAt: now,
      updatedAt: now,
    });
    backend.put({
      id: "kp2",
      kind: "knot-point",
      knotHash: "bA==",
      createdAt: now,
      updatedAt: now,
    });
    expect(backend.stats().knotPoints).toBe(2);
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- lib/knotstore/__tests__/knot-points.test.ts
```

Expected: module error.

**Step 3: Implement backend**

Create `lib/knotstore/backends/knot-points.ts`:

```ts
import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import { KNOTLink, KNOTQuery, KNOTRecord, KNOTStats } from "../types";
import { KNOTstoreError } from "../errors";

type StoredPoint = {
  id: string;
  knotHash: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

export class KnotPointBackend {
  private data = new Map<string, StoredPoint>();
  private links: KNOTLink[] = [];

  constructor(private path: string) {}

  open(): void {
    this.data.clear();
    this.links = [];
    if (!existsSync(this.path)) return;
    const text = readFileSync(this.path, "utf8");
    for (const line of text.split("\n")) {
      if (!line.trim()) continue;
      try {
        const obj = JSON.parse(line) as StoredPoint;
        this.data.set(obj.id, obj);
      } catch {
        // skip corrupt lines
      }
    }
  }

  close(): void {
    this.flush();
    this.data.clear();
    this.links = [];
  }

  private flush(): void {
    const lines: string[] = [];
    for (const point of this.data.values()) {
      lines.push(JSON.stringify(point));
    }
    writeFileSync(this.path, lines.join("\n") + (lines.length ? "\n" : ""));
  }

  private ensureOpen(): void {
    if (this.data === null) throw new KNOTstoreError("ECLOSED", "KNOT point backend is not open");
  }

  put(record: KNOTRecord): string {
    this.ensureOpen();
    if (!record.knotHash)
      throw new KNOTstoreError("EINVALID", "knot-point records require knotHash");
    const stored: StoredPoint = {
      id: record.id,
      knotHash: record.knotHash,
      meta: record.meta,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
    this.data.set(record.id, stored);
    appendFileSync(this.path, JSON.stringify(stored) + "\n");
    return record.id;
  }

  get(id: string): KNOTRecord | null {
    this.ensureOpen();
    const p = this.data.get(id);
    if (!p) return null;
    return this.toRecord(p);
  }

  query(filter: KNOTQuery): KNOTRecord[] {
    this.ensureOpen();
    const out: KNOTRecord[] = [];
    for (const p of this.data.values()) {
      const r = this.toRecord(p);
      if (filter.kind && r.kind !== filter.kind) continue;
      if (filter.search && !r.id.includes(filter.search) && !r.knotHash?.includes(filter.search))
        continue;
      out.push(r);
      if (filter.limit && out.length >= filter.limit) break;
    }
    return out;
  }

  link(sourceId: string, targetId: string, meta?: { rel?: string }): void {
    this.ensureOpen();
    this.links.push({
      sourceId,
      targetId,
      rel: meta?.rel,
      createdAt: new Date().toISOString(),
    });
  }

  getLinks(id: string): { outgoing: KNOTLink[]; incoming: KNOTLink[] } {
    this.ensureOpen();
    return {
      outgoing: this.links.filter((l) => l.sourceId === id),
      incoming: this.links.filter((l) => l.targetId === id),
    };
  }

  stats(): KNOTStats {
    this.ensureOpen();
    return {
      totalRecords: this.data.size,
      crawlDepth: 0,
      entitiesWoven: 0,
      stubPages: 0,
      links: this.links.length,
      knotPoints: this.data.size,
    };
  }

  private toRecord(p: StoredPoint): KNOTRecord {
    return {
      id: p.id,
      kind: "knot-point",
      knotHash: p.knotHash,
      meta: p.meta,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    };
  }
}
```

**Step 4: Run test to verify it passes**

```bash
npm test -- lib/knotstore/__tests__/knot-points.test.ts
```

Expected: PASS.

**Step 5: Commit**

```bash
git add lib/knotstore/backends/knot-points.ts lib/knotstore/__tests__/knot-points.test.ts
git commit -m "feat(knotstore): add KNOT point backend"
```

---

### Task 6: Implement hybrid backend

**Files:**

- Create: `lib/knotstore/backends/hybrid.ts`

**Step 1: Write the failing test**

Create `lib/knotstore/__tests__/hybrid.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { HybridBackend } from "../backends/hybrid";
import { existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dbPath = join(tmpdir(), `knotstore-hybrid-test-${Date.now()}.db`);
const kpPath = join(tmpdir(), `knotstore-hybrid-kp-test-${Date.now()}.jsonl`);

describe("HybridBackend", () => {
  let backend: HybridBackend;

  beforeEach(() => {
    backend = new HybridBackend(dbPath, kpPath);
    backend.open();
  });

  afterEach(() => {
    backend.close();
    if (existsSync(dbPath)) unlinkSync(dbPath);
    if (existsSync(kpPath)) unlinkSync(kpPath);
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
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- lib/knotstore/__tests__/hybrid.test.ts
```

Expected: module error.

**Step 3: Implement hybrid backend**

Create `lib/knotstore/backends/hybrid.ts`:

```ts
import { KNOTLink, KNOTQuery, KNOTRecord, KNOTStats } from "../types";
import { SqliteBackend } from "./sqlite";
import { KnotPointBackend } from "./knot-points";

export class HybridBackend {
  private sqlite: SqliteBackend;
  private points: KnotPointBackend;

  constructor(dbPath: string, pointsPath: string) {
    this.sqlite = new SqliteBackend(dbPath);
    this.points = new KnotPointBackend(pointsPath);
  }

  open(): void {
    this.sqlite.open();
    this.points.open();
  }

  close(): void {
    this.sqlite.close();
    this.points.close();
  }

  put(record: KNOTRecord): string {
    this.sqlite.put(record);
    if (record.knotHash) {
      this.points.put({
        ...record,
        kind: "knot-point",
      });
    }
    return record.id;
  }

  get(id: string): KNOTRecord | null {
    const sql = this.sqlite.get(id);
    const pt = this.points.get(id);
    if (!sql && !pt) return null;
    return {
      ...(sql ?? pt!),
      knotHash: pt?.knotHash ?? sql?.knotHash,
    };
  }

  query(filter: KNOTQuery): KNOTRecord[] {
    const sql = this.sqlite.query(filter);
    const ids = new Set(sql.map((r) => r.id));
    const pts = this.points.query(filter).filter((r) => !ids.has(r.id));
    return [...sql, ...pts];
  }

  link(sourceId: string, targetId: string, meta?: { rel?: string }): void {
    this.sqlite.link(sourceId, targetId, meta);
    this.points.link(sourceId, targetId, meta);
  }

  getLinks(id: string): { outgoing: KNOTLink[]; incoming: KNOTLink[] } {
    return this.sqlite.getLinks(id);
  }

  stats(): KNOTStats {
    const s1 = this.sqlite.stats();
    const s2 = this.points.stats();
    return {
      totalRecords: s1.totalRecords + s2.totalRecords,
      crawlDepth: s1.crawlDepth,
      entitiesWoven: s1.entitiesWoven,
      stubPages: s1.stubPages,
      links: s1.links,
      knotPoints: s2.knotPoints,
    };
  }
}
```

**Step 4: Run test to verify it passes**

```bash
npm test -- lib/knotstore/__tests__/hybrid.test.ts
```

Expected: PASS.

**Step 5: Commit**

```bash
git add lib/knotstore/backends/hybrid.ts lib/knotstore/__tests__/hybrid.test.ts
git commit -m "feat(knotstore): add hybrid backend"
```

---

### Task 7: Add public API and factory

**Files:**

- Create: `lib/knotstore/index.ts`

**Step 1: Write the failing test**

Create `lib/knotstore/__tests__/index.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { KNOTstore } from "../index";
import { existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const pathBase = join(tmpdir(), `knotstore-factory-test-${Date.now()}`);

describe("KNOTstore factory", () => {
  it("creates a sqlite backend", () => {
    const store = KNOTstore({ backend: "sqlite", path: pathBase + ".db" });
    expect(store).toBeDefined();
    store.open();
    store.close();
    if (existsSync(pathBase + ".db")) unlinkSync(pathBase + ".db");
  });
});
```

**Step 2: Run test to verify it fails**

```bash
npm test -- lib/knotstore/__tests__/index.test.ts
```

Expected: module error.

**Step 3: Implement public API**

Create `lib/knotstore/index.ts`:

```ts
import { KNOTstoreBackend, KNOTstoreOptions } from "./types";
import { SqliteBackend } from "./backends/sqlite";
import { KnotPointBackend } from "./backends/knot-points";
import { HybridBackend } from "./backends/hybrid";

export * from "./types";
export * from "./errors";

export function KNOTstore(options: KNOTstoreOptions): KNOTstoreBackend {
  switch (options.backend) {
    case "sqlite":
      return new SqliteBackend(options.path ?? "knotstore.db");
    case "knot-points":
      return new KnotPointBackend(options.path ?? "knotstore.jsonl");
    case "hybrid":
      return new HybridBackend(
        (options.path ?? "knotstore") + ".db",
        (options.path ?? "knotstore") + ".jsonl",
      );
    default:
      throw new Error(`Unknown backend: ${(options as KNOTstoreOptions).backend}`);
  }
}
```

**Step 4: Run test to verify it passes**

```bash
npm test -- lib/knotstore/__tests__/index.test.ts
```

Expected: PASS.

**Step 5: Commit**

```bash
git add lib/knotstore/index.ts lib/knotstore/__tests__/index.test.ts
git commit -m "feat(knotstore): add public factory API"
```

---

### Task 8: Add consumer README

**Files:**

- Create: `lib/knotstore/README.md`

**Step 1: Write README**

Create `lib/knotstore/README.md`:

````markdown
# KNOTstore

Local agentic data layer for 187WEB.

## Usage

```ts
import { KNOTstore } from "@/lib/knotstore";

const store = KNOTstore({ backend: "hybrid", path: "./data/knotstore" });
store.open();

store.put({
  id: "entity-1",
  kind: "entity",
  title: "Example entity",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const stats = store.stats();
console.log(stats);

store.close();
```
````

## Backends

- `sqlite` — structured records and links in a local SQLite file.
- `knot-points` — file-based key/value store for base64-encoded KNOT hashes.
- `hybrid` — combines both; records live in SQLite and KNOT hashes are mirrored to the point store.

````

**Step 2: Commit**

```bash
git add lib/knotstore/README.md
git commit -m "docs(knotstore): add consumer README"
````

---

### Task 9: Create the `/knotstore` preview page

**Files:**

- Create: `app/knotstore/layout.tsx`
- Create: `app/knotstore/page.tsx`

**Step 1: Create layout**

Create `app/knotstore/layout.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KNOTstore — 187WEB agent memory",
  description: "Vault-style preview of the 187WEB KNOTstore data layer.",
};

export default function KnotstoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

**Step 2: Create page**

Create `app/knotstore/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { KNOTstore } from "@/lib/knotstore";
import { KNOTRecord, KNOTStats } from "@/lib/knotstore/types";

export default function KnotstorePage() {
  const [stats, setStats] = useState<KNOTStats | null>(null);
  const [records, setRecords] = useState<KNOTRecord[]>([]);

  useEffect(() => {
    const store = KNOTstore({ backend: "hybrid", path: "/tmp/knotstore-preview" });
    store.open();
    setStats(store.stats());
    setRecords(store.query({ limit: 10 }));
    store.close();
  }, []);

  return (
    <div className="min-h-screen bg-[#071A2B] text-white">
      <header className="mx-auto max-w-6xl px-6 pb-12 pt-16">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#3DDC97]/10 px-3 py-1 text-xs font-semibold text-[#3DDC97] ring-1 ring-[#3DDC97]/30">
          Agentic memory layer
        </span>
        <h1 className="mt-5 text-[clamp(2.2rem,1.4rem+4vw,4rem)] font-bold leading-[1.02] tracking-tight">
          KNOTstore
        </h1>
        <p className="mt-4 max-w-md text-white/60">
          Local crawl storage, bidirectional wikilinks, connection health, and KNOT point anchors.
        </p>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats &&
            Object.entries(stats).map(([key, value]) => (
              <div key={key} className="rounded-2xl border border-white/10 bg-[#0E2A43] p-6">
                <p className="text-sm uppercase tracking-wider text-white/50">{key}</p>
                <p className="mt-2 text-3xl font-bold text-[#3DDC97]">{value}</p>
              </div>
            ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-6 text-xl font-semibold">Recent records</h2>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-white/50">
              <tr>
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Kind</th>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">KNOT hash</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td className="px-5 py-4 text-white/40" colSpan={4}>
                    No records yet. Seed the store from the CLI or tests.
                  </td>
                </tr>
              ) : (
                records.map((r) => (
                  <tr key={r.id} className="border-t border-white/10">
                    <td className="px-5 py-4 font-mono text-white/80">{r.id}</td>
                    <td className="px-5 py-4">{r.kind}</td>
                    <td className="px-5 py-4">{r.title ?? "—"}</td>
                    <td className="px-5 py-4 font-mono text-[#3DDC97]">{r.knotHash ?? "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
```

**Step 3: Run lint and typecheck**

```bash
npm run lint
npm run typecheck
```

Expected: no errors.

**Step 4: Commit**

```bash
git add app/knotstore/layout.tsx app/knotstore/page.tsx
git commit -m "feat(knotstore): add Vault-style /knotstore preview page"
```

---

### Task 10: Update project documentation

**Files:**

- Modify: `AGENTS.md`
- Modify: `PLAN.md`
- Modify: `README.md`

**Step 1: Update AGENTS.md current state**

Add to the current-state list:

```text
- `/knotstore` is the Vault-style KNOTstore preview page.
- `lib/knotstore/` is the pluggable agentic data layer (SQLite, KNOT point, hybrid backends).
```

**Step 2: Update PLAN.md**

Change Phase II step 4 status from `next` to `done` and step 5 from `pending` to `next`:

```markdown
| 4 | done | **Vault** (fintech) | KNOTstore DB — `lib/knotstore/` |
| 5 | next | **Vault** (fintech) | Silk-Sandbox pre-flight middleware |
```

Add a session log entry:

```markdown
### 2026-07-09

- **Phase II step 4 complete:** KNOTstore scaffold with SQLite, KNOT point, and hybrid backends, plus `/knotstore` preview page.
- **Next:** Phase II step 5 — Safety Sentinel pre-flight middleware.
```

**Step 3: Update README.md project structure**

Add under `lib/`:

```text
├─ lib/knotstore/               # pluggable agentic data layer
│  ├─ index.ts
│  ├─ types.ts
│  ├─ errors.ts
│  ├─ backends/
│  │  ├─ sqlite.ts
│  │  ├─ knot-points.ts
│  │  └─ hybrid.ts
│  └─ README.md
```

Add `/knotstore` to the app route list.

**Step 4: Commit**

```bash
git add AGENTS.md PLAN.md README.md
git commit -m "docs: update AGENTS, PLAN, README for KNOTstore"
```

---

### Task 11: Final verification

**Step 1: Run full test suite**

```bash
npm test
```

Expected: all backend tests pass.

**Step 2: Run build and validation gates**

```bash
npm run lint
npm run typecheck
npm run build
npm run skills:validate
npm run release:validate
npm run docs:drift
npm run showcase:sync
npm run adapters:drift
```

Expected: all pass.

**Step 3: Push branch**

```bash
git push origin claude/187skills-master-overseer-upgrade
```

Expected: branch pushed; PR #3 updated.

---

## Spec coverage check

| Spec requirement                            | Implementing task |
| ------------------------------------------- | ----------------- |
| Adapter pattern `KNOTstore` class           | Task 7            |
| SQLite backend for structured records/links | Task 4            |
| KNOT point backend for base64 hashes        | Task 5            |
| Hybrid backend combining both               | Task 6            |
| `put/get/query/link/getLinks/stats` API     | Tasks 4–7         |
| Zod-typed records                           | Task 2            |
| Vault-style `/knotstore` preview page       | Task 9            |
| Stat counters and connection health matrix  | Task 9            |
| Error handling                              | Tasks 3, 4–6      |
| Tests for each backend                      | Tasks 4–7         |
| README and docs updates                     | Tasks 8, 10       |

## Placeholder scan

No TBD/TODO/fill-in-later statements remain. Every step includes exact file paths, code, and expected command output.
