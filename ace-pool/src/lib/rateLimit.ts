/**
 * Rate limiting utility using Upstash Redis.
 * Falls back gracefully (allow through) if env vars are not configured.
 * Use on all public-facing API routes.
 */

import { NextRequest } from "next/server";

interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export async function rateLimit(
  req: NextRequest,
  options: {
    limit?: number;
    window?: number; // seconds
    identifier?: string;
  } = {}
): Promise<RateLimitResult> {
  const { limit = 10, window = 60, identifier = "default" } = options;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    // No Redis configured — skip rate limiting in dev / unconfigured envs
    console.warn("[rateLimit] Upstash Redis not configured. Rate limiting disabled.");
    return { success: true, remaining: limit, reset: Date.now() + window * 1000 };
  }

  const ip = getClientIp(req);
  const key = `rate_limit:${identifier}:${ip}`;

  try {
    // Increment counter
    const incrementRes = await fetch(`${url}/incr/${key}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const incrementData = await incrementRes.json();
    const count = incrementData.result as number;

    // Set TTL on first request
    if (count === 1) {
      await fetch(`${url}/expire/${key}/${window}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    const remaining = Math.max(0, limit - count);
    const reset = Date.now() + window * 1000;

    return {
      success: count <= limit,
      remaining,
      reset,
    };
  } catch (err) {
    console.error("[rateLimit] Redis error:", err);
    // On Redis error, allow through to avoid blocking legitimate users
    return { success: true, remaining: limit, reset: Date.now() + window * 1000 };
  }
}
