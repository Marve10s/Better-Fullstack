const MIN_TELEMETRY_SECRET_LENGTH = 32;

export const TELEMETRY_OWNER_USERNAME = "owner";

export type TelemetryPageAccess = "authorized" | "unconfigured" | "unauthorized";

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

function decodeBasicCredentials(authorization: string | null): [string, string] | undefined {
  const encoded = authorization?.match(/^Basic ([A-Za-z0-9+/]+={0,2})$/i)?.[1];
  if (!encoded) return undefined;

  try {
    const decoded = atob(encoded);
    const separator = decoded.indexOf(":");
    if (separator < 0) return undefined;
    return [decoded.slice(0, separator), decoded.slice(separator + 1)];
  } catch {
    return undefined;
  }
}

export function isTelemetryPageRequest(request: Request): boolean {
  const pathname = new URL(request.url).pathname;
  return pathname === "/telemetry" || pathname === "/telemetry/";
}

export function getTelemetryPageAccess(
  request: Request,
  secret: string | undefined,
): TelemetryPageAccess {
  const configuredSecret = normalizeSecret(secret);
  if (!configuredSecret) return "unconfigured";

  const credentials = decodeBasicCredentials(request.headers.get("Authorization"));
  if (!credentials) return "unauthorized";

  const [username, password] = credentials;
  return constantTimeEqual(username, TELEMETRY_OWNER_USERNAME) &&
    constantTimeEqual(password, configuredSecret)
    ? "authorized"
    : "unauthorized";
}

export function telemetryAuthFailureResponse(
  access: Exclude<TelemetryPageAccess, "authorized">,
): Response {
  const unconfigured = access === "unconfigured";
  const headers = new Headers({
    "Cache-Control": "private, no-store",
    "Content-Type": "text/plain; charset=utf-8",
    Vary: "Authorization",
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
  });
  if (!unconfigured) {
    headers.set("WWW-Authenticate", 'Basic realm="Better Fullstack telemetry", charset="UTF-8"');
  }

  return new Response(
    unconfigured ? "Telemetry dashboard is not configured." : "Authentication required.",
    { status: unconfigured ? 503 : 401, headers },
  );
}

export function withPrivateTelemetryHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  const vary = new Set(
    headers
      .get("Vary")
      ?.split(",")
      .map((value) => value.trim())
      .filter(Boolean) ?? [],
  );
  vary.add("Authorization");
  headers.set("Cache-Control", "private, no-store");
  headers.set("Vary", [...vary].join(", "));
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
