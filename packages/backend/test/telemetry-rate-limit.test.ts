import { expect, it } from "bun:test";

import { createTelemetryRateLimit, vercelRequestKey } from "../src/telemetry-rate-limit";

it("caps total forwarded requests independently of origin rotation and resets the window", () => {
  const accepts = createTelemetryRateLimit();
  for (let index = 0; index < 1_200; index++) expect(accepts(`origin-${index}`, 60_000)).toBe(true);
  expect(accepts("another-origin", 60_000)).toBe(false);
  expect(accepts("another-origin", 120_000)).toBe(true);
});

it("uses only Vercel's trusted address and never exposes the address as the bucket key", () => {
  const request = new Request("https://example.test", {
    headers: { "x-vercel-forwarded-for": "192.0.2.1" },
  });
  expect(vercelRequestKey(request, false)).toBeUndefined();
  expect(vercelRequestKey(request, true)).toMatch(/^[a-f0-9]{64}$/);
  expect(vercelRequestKey(request, true)).toBe(vercelRequestKey(request, true));
  expect(
    vercelRequestKey(
      new Request("https://example.test", {
        headers: { "x-vercel-forwarded-for": "private-label" },
      }),
      true,
    ),
  ).toBeUndefined();
});
