import type { Request, Response, NextFunction } from "express";

interface Bucket {
  count: number;
  resetAt: number;
}

export const buckets = new Map<string, Bucket>();

export function __resetRateLimitForTests() {
  buckets.clear();
}

function cleanup() {
  const now = Date.now();
  for (const [k, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(k);
  }
}

const cleanupHandle = setInterval(cleanup, 60_000);
// Do not keep the process alive solely for cleanup.
cleanupHandle.unref?.();

export interface RateLimitOptions {
  windowMs: number;
  max: number;
  keyBy?: (req: Request) => string;
}

export function rateLimit(opts: RateLimitOptions) {
  const { windowMs, max, keyBy } = opts;
  const getKey = keyBy ?? ((req: Request) => req.ip ?? "unknown");

  return (req: Request, res: Response, next: NextFunction) => {
    const key = getKey(req);
    const now = Date.now();
    const bucket = buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    bucket.count += 1;
    if (bucket.count > max) {
      const retryAfter = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
      res.setHeader("Retry-After", String(retryAfter));
      return res.status(429).json({ message: "Too many requests" });
    }
    next();
  };
}
