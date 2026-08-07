import { describe, expect, it } from "bun:test";

import {
  getTelemetryPageAccess,
  isTelemetryPageRequest,
  telemetryAuthFailureResponse,
  withPrivateTelemetryHeaders,
} from "../src/lib/telemetry-auth.server";

const SECRET = "owner-only-telemetry-secret-0123456789";

function telemetryRequest(credentials?: string, path = "/telemetry"): Request {
  const headers = credentials ? { Authorization: `Basic ${btoa(credentials)}` } : undefined;
  return new Request(`https://better-fullstack.dev${path}`, { headers });
}

describe("telemetry page access", () => {
  it("matches only the private telemetry page", () => {
    expect(isTelemetryPageRequest(telemetryRequest())).toBe(true);
    expect(isTelemetryPageRequest(telemetryRequest(undefined, "/telemetry/"))).toBe(true);
    expect(isTelemetryPageRequest(telemetryRequest(undefined, "/telemetry-export"))).toBe(false);
    expect(isTelemetryPageRequest(telemetryRequest(undefined, "/"))).toBe(false);
  });

  it("fails closed when the secret is missing or too short", () => {
    expect(getTelemetryPageAccess(telemetryRequest("owner:anything"), undefined)).toBe(
      "unconfigured",
    );
    expect(getTelemetryPageAccess(telemetryRequest("owner:anything"), "too-short")).toBe(
      "unconfigured",
    );
  });

  it("allows only the owner username with the configured secret", () => {
    expect(getTelemetryPageAccess(telemetryRequest(), SECRET)).toBe("unauthorized");
    expect(getTelemetryPageAccess(telemetryRequest(`someone:${SECRET}`), SECRET)).toBe(
      "unauthorized",
    );
    expect(getTelemetryPageAccess(telemetryRequest("owner:wrong-password"), SECRET)).toBe(
      "unauthorized",
    );
    expect(getTelemetryPageAccess(telemetryRequest(`owner:${SECRET}`), SECRET)).toBe("authorized");
  });

  it("challenges unauthorized requests and never caches telemetry responses", () => {
    const challenge = telemetryAuthFailureResponse("unauthorized");
    expect(challenge.status).toBe(401);
    expect(challenge.headers.get("WWW-Authenticate")).toContain("Basic");
    expect(challenge.headers.get("Cache-Control")).toBe("private, no-store");
    expect(challenge.headers.get("X-Robots-Tag")).toContain("noindex");

    const unconfigured = telemetryAuthFailureResponse("unconfigured");
    expect(unconfigured.status).toBe(503);
    expect(unconfigured.headers.has("WWW-Authenticate")).toBe(false);

    const privateResponse = withPrivateTelemetryHeaders(
      new Response("ok", { headers: { Vary: "Cookie" } }),
    );
    expect(privateResponse.headers.get("Vary")).toBe("Cookie, Authorization");
    expect(privateResponse.headers.get("Cache-Control")).toBe("private, no-store");
  });
});
