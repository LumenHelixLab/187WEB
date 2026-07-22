import { NextResponse } from "next/server";
import { z } from "zod";
import { geminiGenerateContent } from "@/lib/gemini/generate-content";

export const runtime = "nodejs";

const partSchema = z.object({ text: z.string().min(1) });
const contentSchema = z.object({
  role: z.enum(["user", "model"]).optional(),
  parts: z.array(partSchema).min(1),
});

const requestSchema = z.object({
  contents: z.array(contentSchema).min(1),
  model: z.string().trim().min(1).optional(),
  generationConfig: z.record(z.string(), z.unknown()).optional(),
  safetySettings: z.array(z.record(z.string(), z.unknown())).optional(),
  systemInstruction: z.object({ parts: z.array(partSchema).min(1) }).optional(),
});

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Expected a JSON body." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(raw);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid input.";
    return NextResponse.json(
      { ok: false, error: firstError, issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  try {
    const response = await geminiGenerateContent(
      {
        contents: parsed.data.contents,
        generationConfig: parsed.data.generationConfig,
        safetySettings: parsed.data.safetySettings,
        systemInstruction: parsed.data.systemInstruction,
      },
      {
        model: parsed.data.model,
      },
    );

    const payload = await response.json().catch(() => null);
    return NextResponse.json(
      {
        ok: response.ok,
        status: response.status,
        data: payload,
      },
      { status: response.ok ? 200 : response.status },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Gemini request failed.";
    const status = /missing gemini api key/i.test(message) ? 500 : 429;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
