export type GeminiFetchOptions = RequestInit & {
  fetchImpl?: typeof fetch;
  sleep?: (ms: number) => Promise<void>;
  random?: () => number;
  maxRetries?: number;
  initialDelayMs?: number;
  jitterRatio?: number;
};

const defaultSleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const withJitter = (baseMs: number, jitterRatio: number, random: () => number) => {
  if (jitterRatio <= 0) return baseMs;
  const spread = baseMs * jitterRatio;
  const jitter = (random() * 2 - 1) * spread;
  return Math.max(0, Math.round(baseMs + jitter));
};

export function parseRetryAfterSeconds(value: string | null, nowMs: number = Date.now()): number | null {
  if (!value) return null;

  const asNumber = Number.parseFloat(value.trim());
  if (Number.isFinite(asNumber) && asNumber >= 0) {
    return Math.ceil(asNumber);
  }

  const targetMs = Date.parse(value);
  if (Number.isNaN(targetMs)) return null;

  const deltaSeconds = (targetMs - nowMs) / 1000;
  return Math.max(0, Math.ceil(deltaSeconds));
}

export async function geminiFetchWithBackoff(url: string, options: GeminiFetchOptions = {}): Promise<Response> {
  const {
    fetchImpl = fetch,
    sleep = defaultSleep,
    random = Math.random,
    maxRetries = 5,
    initialDelayMs = 2000,
    jitterRatio = 0.1,
    ...requestInit
  } = options;

  const sanitizedMaxRetries = Math.max(0, Math.floor(maxRetries));
  const sanitizedInitialDelayMs = Math.max(1, Math.floor(initialDelayMs));
  const sanitizedJitterRatio = clamp(jitterRatio, 0, 1);

  let response = await fetchImpl(url, requestInit);
  if (response.status !== 429) return response;

  let retries = 0;
  let backoffDelayMs = sanitizedInitialDelayMs;

  while (response.status === 429 && retries < sanitizedMaxRetries) {
    const retryAfterSeconds = parseRetryAfterSeconds(response.headers.get("Retry-After"));
    const useRetryAfter = retryAfterSeconds !== null && retries === 0;
    const waitMs = useRetryAfter
      ? retryAfterSeconds * 1000
      : withJitter(backoffDelayMs, sanitizedJitterRatio, random);

    await sleep(waitMs);

    response = await fetchImpl(url, requestInit);
    retries += 1;

    if (response.status !== 429) {
      return response;
    }

    if (!useRetryAfter) {
      backoffDelayMs *= 2;
    }
  }

  if (response.status === 429) {
    throw new Error(`Gemini API rate limited: max retries (${sanitizedMaxRetries}) exhausted.`);
  }

  return response;
}
