import { geminiFetchWithBackoff, type GeminiFetchOptions } from "./gemini-client";

type GeminiPart = { text: string };
type GeminiContent = { role?: "user" | "model"; parts: GeminiPart[] };

type GenerateContentRequest = {
  contents: GeminiContent[];
  generationConfig?: Record<string, unknown>;
  safetySettings?: Array<Record<string, unknown>>;
  systemInstruction?: { parts: GeminiPart[] };
};

export type GeminiGenerateContentOptions = {
  apiKey?: string;
  model?: string;
  baseUrl?: string;
  fetchOptions?: Omit<GeminiFetchOptions, "method" | "headers" | "body">;
};

export async function geminiGenerateContent(
  request: GenerateContentRequest,
  options: GeminiGenerateContentOptions = {},
): Promise<Response> {
  const apiKey = options.apiKey ?? process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing Gemini API key. Set GEMINI_API_KEY or GOOGLE_API_KEY.");
  }

  const model = options.model ?? "gemini-2.0-flash";
  const baseUrl = options.baseUrl ?? "https://generativelanguage.googleapis.com/v1beta";
  const url = `${baseUrl}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  return geminiFetchWithBackoff(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
    ...options.fetchOptions,
  });
}
