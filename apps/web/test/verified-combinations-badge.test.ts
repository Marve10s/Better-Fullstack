import { describe, expect, it } from "bun:test";

import {
  type VerifiedBadgeSummary,
  verifiedCombinationsBadgePayload,
} from "../src/lib/docs/verified-combinations-badge";

const current: VerifiedBadgeSummary = {
  smoke: [{ pass: 12, total: 12, current: true }],
  scaffbench: [{ pass: 1, total: 1, current: true }],
  releaseGuard: { pass: 3, total: 3, current: true },
  publishedPackage: { pass: 3, total: 3, current: true },
};

describe("verified-combinations badge", () => {
  it("is green only when every required lane is current and passing", () => {
    expect(verifiedCombinationsBadgePayload(current).color).toBe("brightgreen");
  });

  it("is red when a required lane is missing", () => {
    expect(verifiedCombinationsBadgePayload({ ...current, releaseGuard: null }).color).toBe("red");
  });

  it("is red when a passing lane is stale", () => {
    const badge = verifiedCombinationsBadgePayload({
      ...current,
      smoke: [{ pass: 12, total: 12, current: false }],
    });

    expect(badge.color).toBe("red");
    expect(badge.message).toBe("7/19 passing");
  });
});
