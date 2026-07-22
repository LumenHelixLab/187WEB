import { beforeEach, describe, expect, it, vi } from "vitest";

const geminiGenerateContentMock = vi.fn();

vi.mock("@/lib/gemini/generate-content", () => ({
  geminiGenerateContent: geminiGenerateContentMock,
}));

describe("POST /api/gemini/generate", () => {
  beforeEach(() => {
    geminiGenerateContentMock.mockReset();
  });

  it("returns 400 for invalid JSON", async () => {
    const { POST } = await import("@/app/api/gemini/generate/route");
    const req = new Request("http://localhost/api/gemini/generate", {
      method: "POST",
      body: "{",
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 422 for invalid payload", async () => {
    const { POST } = await import("@/app/api/gemini/generate/route");
    const req = new Request("http://localhost/api/gemini/generate", {
      method: "POST",
      body: JSON.stringify({ contents: [] }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    expect(res.status).toBe(422);
  });

  it("passes through successful Gemini responses", async () => {
    geminiGenerateContentMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: "ok" }] } }] }), {
        status: 200,
      }),
    );

    const { POST } = await import("@/app/api/gemini/generate/route");
    const req = new Request("http://localhost/api/gemini/generate", {
      method: "POST",
      body: JSON.stringify({
        model: "gemini-2.0-flash",
        contents: [{ role: "user", parts: [{ text: "hello" }] }],
      }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.data.candidates[0].content.parts[0].text).toBe("ok");
    expect(geminiGenerateContentMock).toHaveBeenCalledTimes(1);
  });

  it("maps thrown rate limit errors to 429", async () => {
    geminiGenerateContentMock.mockRejectedValueOnce(new Error("Gemini API rate limited: max retries (5) exhausted."));

    const { POST } = await import("@/app/api/gemini/generate/route");
    const req = new Request("http://localhost/api/gemini/generate", {
      method: "POST",
      body: JSON.stringify({ contents: [{ parts: [{ text: "hello" }] }] }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await POST(req);
    expect(res.status).toBe(429);
  });
});
