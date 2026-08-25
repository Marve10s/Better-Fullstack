import { hashContent } from "@/crypto/hash";

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value === null || typeof value !== "object") return value;

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, entry]) => [key, canonicalize(entry)]),
  );
}

export function createReviewToken(scope: string, payload: unknown, context?: string): string {
  const digest = hashContent(JSON.stringify({ context, scope, payload: canonicalize(payload) }));
  if (context === undefined) return digest;
  return `v2.${Buffer.from(context, "utf-8").toString("base64url")}.${digest}`;
}

export function getReviewTokenContext(token: string | undefined): string | undefined {
  if (!token) return undefined;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v2" || !parts[1]) return undefined;
  try {
    return Buffer.from(parts[1], "base64url").toString("utf-8");
  } catch {
    return undefined;
  }
}
