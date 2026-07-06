import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getPrisma } from "@/lib/db";
import { leadSchema } from "@/lib/validation";

/**
 * POST /api/lead — validate and persist a lead.
 * Degrades to "preview mode" (HTTP 200, not persisted) when no DATABASE_URL
 * is set, so the demo always responds with useful, honest feedback.
 */
export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Expected a JSON body." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid input.";
    return NextResponse.json(
      { ok: false, error: firstError, issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const prisma = getPrisma();
  if (!prisma) {
    return NextResponse.json({
      ok: true,
      preview: true,
      message: "You're on the list — preview mode. Configure DATABASE_URL to persist leads.",
    });
  }

  try {
    await prisma.lead.create({
      data: {
        email: parsed.data.email,
        message: parsed.data.message ?? null,
        source: parsed.data.source ?? "demo",
      },
    });
    return NextResponse.json({ ok: true, message: "You're on the list. Talk soon." });
  } catch (err) {
    // Unique email -> treat as success (idempotent from the user's view).
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json({ ok: true, message: "You're already on the list." });
    }
    console.error("POST /api/lead failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong saving that. Try again shortly." },
      { status: 500 },
    );
  }
}

/** GET /api/lead — count, for the social-proof counter. Null when no DB. */
export async function GET() {
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ count: null });
  try {
    const count = await prisma.lead.count();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: null });
  }
}
