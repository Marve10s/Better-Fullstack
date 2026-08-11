import { describe, expect, it } from "bun:test";

import {
  type VerifiedBadgeSummary,
  verifiedCombinationsBadgePayload,
} from "../src/lib/docs/verified-combinations-badge";

const NOW = new Date("2026-08-09T12:00:00.000Z");

const current: VerifiedBadgeSummary = {
  expiresAt: "2026-08-10T00:00:00.000Z",
  expectedTotals: { releaseGuard: 17, publishedPackage: 3 },
  smoke: [{ pass: 12, total: 12, current: true }],
  scaffbench: [{ pass: 1, total: 1, current: true }],
  releaseGuard: { pass: 3, total: 3, current: true },
  publishedPackage: { pass: 3, total: 3, current: true },
};

describe("verified-combinations badge", () => {
  it("is green only when every required lane is current and passing", () => {
    expect(verifiedCombinationsBadgePayload(current, NOW).color).toBe("brightgreen");
  });

  it("is red when a required lane is missing", () => {
    expect(verifiedCombinationsBadgePayload({ ...current, releaseGuard: null }, NOW).color).toBe(
      "red",
    );
  });

  it("counts the full expected release-guard denominator when evidence is missing", () => {
    const badge = verifiedCombinationsBadgePayload({ ...current, releaseGuard: null }, NOW);

    expect(badge.message).toBe("16/33 passing");
  });

  it("counts the full expected published-package denominator when evidence is missing", () => {
    const badge = verifiedCombinationsBadgePayload({ ...current, publishedPackage: null }, NOW);

    expect(badge.message).toBe("16/19 passing");
  });

  it("is red when a passing lane is stale", () => {
    const badge = verifiedCombinationsBadgePayload(
      {
        ...current,
        smoke: [{ pass: 12, total: 12, current: false }],
      },
      NOW,
    );

    expect(badge.color).toBe("red");
    expect(badge.message).toBe("7/19 passing");
  });

  it("is red once the whole summary passes its expiry", () => {
    const badge = verifiedCombinationsBadgePayload(current, new Date("2026-08-10T00:00:01.000Z"));

    expect(badge.color).toBe("red");
    expect(badge.message).toBe("0/19 passing");
  });

  it("fails closed when the summary declares no expiry", () => {
    const badge = verifiedCombinationsBadgePayload({ ...current, expiresAt: undefined }, NOW);

    expect(badge.color).toBe("red");
    expect(badge.message).toBe("0/19 passing");
  });
});
