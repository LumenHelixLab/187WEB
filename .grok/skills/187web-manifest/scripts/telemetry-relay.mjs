#!/usr/bin/env node
/**
 * 187web telemetry relay — SSE + REST bridge for OmniQube Render Matrix.
 * Zero dependencies. Node 18+.
 *
 *   node telemetry-relay.mjs [--port 18780]
 *
 * Endpoints:
 *   GET  /           → health
 *   GET  /last       → last compile JSON
 *   POST /compile    → ingest compiler output, broadcast to SSE clients
 *   GET  /events     → Server-Sent Events stream (OmniQube subscribes here)
 */
import http from "node:http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const PORT = Number(process.env.E187WEB_RELAY_PORT || process.argv.find((a, i) => process.argv[i - 1] === "--port") || 18780);
const STATE_DIR = join(homedir(), ".187web");
const LAST_FILE = join(STATE_DIR, "last-compile.json");

mkdirSync(STATE_DIR, { recursive: true });

/** @type {Set<import('node:http').ServerResponse>} */
const clients = new Set();
let lastPayload = null;

function loadLast() {
  if (!existsSync(LAST_FILE)) return null;
  try {
    return JSON.parse(readFileSync(LAST_FILE, "utf8"));
  } catch {
    return null;
  }
}

lastPayload = loadLast();

function broadcast(data) {
  const msg = `data: ${JSON.stringify(data)}\n\n`;
  for (const res of clients) {
    try {
      res.write(msg);
    } catch {
      clients.delete(res);
    }
  }
}

function ingest(body) {
  lastPayload = body;
  writeFileSync(LAST_FILE, JSON.stringify(body, null, 2), "utf8");
  broadcast({ type: "compile", ...body, relay_ts: new Date().toISOString() });
  return lastPayload;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${PORT}`);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (url.pathname === "/events" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write(": connected\n\n");
    if (lastPayload) {
      res.write(`data: ${JSON.stringify({ type: "compile", ...lastPayload })}\n\n`);
    }
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  if (url.pathname === "/last" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(lastPayload || { status: "empty" }));
    return;
  }

  if (url.pathname === "/compile" && req.method === "POST") {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      try {
        const body = JSON.parse(raw);
        ingest(body);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, clients: clients.size }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: String(e) }));
      }
    });
    return;
  }

  if (url.pathname === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        service: "187web-telemetry-relay",
        port: PORT,
        clients: clients.size,
        has_last: Boolean(lastPayload),
      }),
    );
    return;
  }

  res.writeHead(404);
  res.end("not found");
});

server.listen(PORT, () => {
  console.log(`[187web-relay] listening on http://localhost:${PORT}`);
  console.log(`[187web-relay] SSE: GET /events · ingest: POST /compile`);
});