import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/lib/db";

/** GET /api/health — liveness probe for deploys and uptime checks. */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    database: isDatabaseConfigured() ? "configured" : "preview",
    timestamp: new Date().toISOString(),
  });
}
