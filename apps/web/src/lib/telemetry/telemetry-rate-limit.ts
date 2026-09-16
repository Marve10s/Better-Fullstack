import { createHmac, randomBytes } from "node:crypto";
import { isIP } from "node:net";

const key = randomBytes(32);

export function vercelRequestKey(request: Request, isVercel: boolean) {
  // Vercel overwrites this header. Never trust it on an arbitrary hosting adapter.
  // https://vercel.com/docs/headers/request-headers#x-vercel-forwarded-for
  const address = isVercel ? request.headers.get("x-vercel-forwarded-for")?.trim() : undefined;
  return address && isIP(address)
    ? createHmac("sha256", key).update(address).digest("hex")
    : undefined;
}

export function createTelemetryRateLimit() {
  const buckets = new Map<string, number>();
  let start = 0;
  let total = 0;
  return (trustedKey: string | undefined, now = Date.now()) => {
    if (now - start >= 60_000) {
      start = now;
      total = 0;
      buckets.clear();
    }
    const id = trustedKey ?? "unknown-origin";
    const count = buckets.get(id) ?? 0;
    // The total ceiling also bounds bucket allocation. Caller-selected machine IDs play no role.
    if (total >= 1_200 || count >= 120) return false;
    total++;
    buckets.set(id, count + 1);
    return true;
  };
}
