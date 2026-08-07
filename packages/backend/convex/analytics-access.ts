export const MIN_TELEMETRY_SECRET_LENGTH = 32;

export type TelemetryDashboardAccess = "authorized" | "unconfigured" | "unauthorized";

function normalizeSecret(secret: string | undefined): string | undefined {
  const normalized = secret?.trim();
  return normalized && normalized.length >= MIN_TELEMETRY_SECRET_LENGTH ? normalized : undefined;
}

function constantTimeEqual(left: string, right: string): boolean {
  let equal = left.length === right.length;
  const comparisons = Math.max(left.length, right.length);

  for (let index = 0; index < comparisons; index += 1) {
    if (left.charCodeAt(index) !== right.charCodeAt(index)) equal = false;
  }

  return equal;
}

export function getTelemetryDashboardAccess(
  authorization: string | null,
  secret: string | undefined,
): TelemetryDashboardAccess {
  const configuredSecret = normalizeSecret(secret);
  if (!configuredSecret) return "unconfigured";

  const token = authorization?.match(/^Bearer ([^\s]+)$/i)?.[1];
  if (!token) return "unauthorized";

  return constantTimeEqual(token, configuredSecret) ? "authorized" : "unauthorized";
}
