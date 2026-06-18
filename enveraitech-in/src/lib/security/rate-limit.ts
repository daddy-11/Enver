import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Upstash Redis-backed rate limiter.
 *
 * Uses sliding window algorithm — more accurate than fixed window
 * for burst attack mitigation. Falls back gracefully if Redis is
 * unavailable (fail open, log the error — never block legit traffic
 * due to infrastructure failure).
 *
 * Separate limiters per route category:
 *   - api:         General API endpoints (100/min)
 *   - auth:        Auth endpoints — login/signup (10/min, hard)
 *   - contact:     Contact form submission (3/15min)
 *   - upload:      File upload endpoints (5/min)
 */

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn("[RateLimit] Upstash env vars not set — rate limiting disabled");
    return null;
  }
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  return redis;
}

// Sliding window limiters — created lazily
const limiters = new Map<string, Ratelimit>();

function getLimiter(key: string, requests: number, windowSeconds: number): Ratelimit | null {
  const r = getRedis();
  if (!r) return null;

  if (!limiters.has(key)) {
    limiters.set(
      key,
      new Ratelimit({
        redis: r,
        limiter: Ratelimit.slidingWindow(requests, `${windowSeconds} s`),
        analytics: true,
        prefix: `enver:rl:${key}`,
      })
    );
  }
  return limiters.get(key)!;
}

export type RateLimitResult =
  | { success: true }
  | { success: false; retryAfter: number; remaining: number };

/**
 * Get real client IP from request — handles Vercel, Cloudflare, plain proxies.
 * Falls back to a safe unknown string so we don't throw.
 */
export function getClientIp(req: Request): string {
  return (
    req.headers.get("cf-connecting-ip") ??          // Cloudflare
    req.headers.get("x-real-ip") ??                  // Nginx proxy
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? // Load balancer
    "unknown"
  );
}

export type RateLimitPreset = "api" | "auth" | "contact" | "upload" | "lounge" | "ai";

const PRESETS: Record<RateLimitPreset, { requests: number; windowSeconds: number }> = {
  api:     { requests: 100, windowSeconds: 60 },
  auth:    { requests: 10,  windowSeconds: 60 },
  contact: { requests: 3,   windowSeconds: 900 }, // 3 per 15 min
  upload:  { requests: 5,   windowSeconds: 60 },
  lounge:  { requests: 30,  windowSeconds: 60 },  // chat message posts
  ai:      { requests: 20,  windowSeconds: 60 },  // agent calls (cost control)
};

/**
 * Check rate limit for a given IP and preset.
 *
 * @example
 * const result = await checkRateLimit(getClientIp(req), "auth");
 * if (!result.success) {
 *   return new Response("Too Many Requests", {
 *     status: 429,
 *     headers: { "Retry-After": String(result.retryAfter) },
 *   });
 * }
 */
export async function checkRateLimit(
  identifier: string,
  preset: RateLimitPreset
): Promise<RateLimitResult> {
  const config = PRESETS[preset];
  const limiter = getLimiter(preset, config.requests, config.windowSeconds);

  // Fail open — if Redis is down, don't block users
  if (!limiter) return { success: true };

  try {
    const result = await limiter.limit(identifier);
    if (result.success) return { success: true };

    const retryAfter = Math.ceil((result.reset - Date.now()) / 1000);
    return {
      success: false,
      retryAfter: Math.max(retryAfter, 1),
      remaining: result.remaining,
    };
  } catch (err) {
    // Network/Redis failure — fail open, log for monitoring
    console.error("[RateLimit] Redis error, failing open:", err);
    return { success: true };
  }
}

/**
 * Build a 429 response with correct headers.
 */
export function rateLimitResponse(retryAfter: number): Response {
  return new Response(
    JSON.stringify({ error: "Too many requests", retryAfter }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(retryAfter),
        "X-RateLimit-Reset": String(Date.now() + retryAfter * 1000),
        // Tell CDNs not to cache 429s
        "Cache-Control": "no-store",
      },
    }
  );
}
