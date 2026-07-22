import { describe, it, expect, vi } from "vitest";
import { geminiGenerateContent } from "../generate-content";

describe("geminiGenerateContent", () => {
  it("throws if no API key is available", async () => {
    await expect(
      geminiGenerateContent(
        { contents: [{ parts: [{ text: "hi" }] }] },
        {
          apiKey: "",
          fetchOptions: {
            fetchImpl: vi.fn<typeof fetch>(),
          },
        },
      ),
    ).rejects.toThrow(/missing gemini api key/i);
  });

  it("uses Gemini endpoint and survives 429 with Retry-After", async () => {
    const sleep = vi.fn(async () => undefined);
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(new Response("rate", { status: 429, headers: { "Retry-After": "1" } }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), { status: 200 }));

    const response = await geminiGenerateContent(
      {
        contents: [{ role: "user", parts: [{ text: "ping" }] }],
      },
      {
        apiKey: "test-key",
        model: "gemini-2.0-flash",
        fetchOptions: {
          fetchImpl,
          sleep,
          random: () => 0.5,
          maxRetries: 3,
          initialDelayMs: 2000,
        },
      },
    );

    expect(response.status).toBe(200);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(sleep).toHaveBeenCalledTimes(1);

    const [url, init] = fetchImpl.mock.calls[0];
    expect(String(url)).toContain("generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=test-key");
    expect(init?.method).toBe("POST");
    expect((init?.headers as Record<string, string>)["Content-Type"]).toBe("application/json");

    const body = JSON.parse(String(init?.body));
    expect(body.contents[0].parts[0].text).toBe("ping");
  });
});
