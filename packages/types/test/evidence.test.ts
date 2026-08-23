import { describe, expect, it } from "bun:test";

import {
  CAPABILITY_EVIDENCE_LEVEL_IDS,
  CAPABILITY_EVIDENCE_LEVELS,
  capCapabilityEvidenceLevel,
  capabilityEvidenceAtLeast,
  capabilityEvidenceLevel,
} from "../src/evidence";

describe("capability evidence levels", () => {
  it("keeps one ordered definition for every public level", () => {
    expect(CAPABILITY_EVIDENCE_LEVELS.map((level) => level.id)).toEqual(
      CAPABILITY_EVIDENCE_LEVEL_IDS,
    );
    expect(
      CAPABILITY_EVIDENCE_LEVELS.every(
        (level) =>
          level.proves.length > 0 &&
          level.doesNotProve.length > 0 &&
          level.requiredEvidence.length > 0,
      ),
    ).toBe(true);
  });

  it("never skips a prerequisite when deriving a level", () => {
    expect(
      capabilityEvidenceLevel({
        listed: true,
        generated: false,
        buildVerified: true,
        runtimeVerified: true,
      }),
    ).toBe("listed");
    expect(
      capabilityEvidenceLevel({
        listed: true,
        generated: true,
        buildVerified: true,
        runtimeVerified: false,
      }),
    ).toBe("build-verified");
    expect(
      capabilityEvidenceLevel({
        listed: true,
        generated: true,
        buildVerified: true,
        runtimeVerified: true,
      }),
    ).toBe("runtime-verified");
  });

  it("caps a public claim at the receipt-backed level", () => {
    expect(capCapabilityEvidenceLevel("runtime-verified", "generated")).toBe("generated");
    expect(capCapabilityEvidenceLevel("listed", "build-verified")).toBe("listed");
    expect(capCapabilityEvidenceLevel("build-verified", null)).toBeNull();
    expect(capabilityEvidenceAtLeast("generated", "build-verified")).toBe(false);
    expect(capabilityEvidenceAtLeast("runtime-verified", "build-verified")).toBe(true);
  });
});
