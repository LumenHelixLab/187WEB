import { describe, it, expect, vi } from "vitest";
import { geminiFetchWithBackoff, parseRetryAfterSeconds } from "../gemini-client";

describe("parseRetryAfterSeconds", () => {
  it("parses integer Retry-After seconds", () => {
    expect(parseRetryAfterSeconds("7", Date.now())).toBe(7);
  });

  it("parses date Retry-After into rounded-up seconds", () => {
    const now = Date.parse("2026-07-22T00:00:00.000Z");
    const retryDate = new Date(now + 2100).toUTCString();
    expect(parseRetryAfterSeconds(retryDate, now)).toBe(2);
  });

  it("returns null for invalid Retry-After", () => {
    expect(parseRetryAfterSeconds("not-a-date", Date.now())).toBeNull();
  });
});

describe("geminiFetchWithBackoff", () => {
  it("uses Retry-After first, then exponential backoff with jitter for repeated 429s", async () => {
    const sleeps: number[] = [];
    const sleep = vi.fn(async (ms: number) => {
      sleeps.push(ms);
    });

    const random = vi.fn<() => number>().mockReturnValueOnce(0.0).mockReturnValueOnce(1.0);

    const r429WithHeader = new Response("rate", {
      status: 429,
      headers: { "Retry-After": "3" },
    });
    const r429NoHeader = new Response("rate", { status: 429 });
    const ok = new Response("ok", { status: 200 });

    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(r429WithHeader)
      .mockResolvedValueOnce(r429NoHeader)
      .mockResolvedValueOnce(r429NoHeader)
      .mockResolvedValueOnce(ok);

    const response = await geminiFetchWithBackoff("https://example.test", {
      fetchImpl,
      sleep,
      random,
      initialDelayMs: 2000,
      jitterRatio: 0.1,
      maxRetries: 5,
    });

    expect(response.status).toBe(200);
    expect(fetchImpl).toHaveBeenCalledTimes(4);

    // 1) Retry-After exact wait: 3s
    expect(sleeps[0]).toBe(3000);
    // 2) Exponential step starts at 2s, with 10% jitter and random=0.0 => -10%
    expect(sleeps[1]).toBe(1800);
    // 3) Next exponential doubles to 4s, random=1.0 => +10%
    expect(sleeps[2]).toBe(4400);
  });

  it("throws after max retries are exhausted on repeated 429", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response("rate", { status: 429 }));

    await expect(
      geminiFetchWithBackoff("https://example.test", {
        fetchImpl,
        sleep: async () => undefined,
        random: () => 0.5,
        initialDelayMs: 2000,
        maxRetries: 2,
      }),
    ).rejects.toThrow(/max retries/i);

    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });

  it("does not retry non-429 failures", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response("oops", { status: 500 }));

    const response = await geminiFetchWithBackoff("https://example.test", {
      fetchImpl,
      sleep: async () => undefined,
      random: () => 0.5,
    });

    expect(response.status).toBe(500);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });
});
