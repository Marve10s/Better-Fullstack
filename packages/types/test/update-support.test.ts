import { describe, expect, it } from "bun:test";

import {
  UPDATE_SUPPORT_POLICY,
  type UpdateSupportPolicy,
  evaluateUpdateSupport,
  validateUpdateSupportPolicy,
} from "../src/update-support";

const verifiedInput = {
  sourceVersion: "2.6.1",
  targetVersion: "2.6.1",
  manifestVersion: "2",
  provenanceVerified: true,
};

describe("update support policy", () => {
  it("does not advertise a historical window before qualification", () => {
    expect(validateUpdateSupportPolicy(UPDATE_SUPPORT_POLICY)).toEqual([]);
    expect(UPDATE_SUPPORT_POLICY).toMatchObject({
      status: "qualification",
      window: { supportedFrom: null, supportedTo: null, supportedReleases: [] },
      qualification: { requiredConsecutiveReleases: 2, qualifiedConsecutiveReleases: 0 },
    });
    expect(evaluateUpdateSupport({ ...verifiedInput, sourceVersion: "2.5.0" })).toMatchObject({
      eligible: false,
      eligibility: "manual-review-required",
      reasonCode: "window-not-qualified",
      requiresManualReview: true,
    });
  });

  it("distinguishes same-release reconciliation from historical support", () => {
    expect(evaluateUpdateSupport(verifiedInput)).toMatchObject({
      eligible: true,
      eligibility: "same-release",
      historicalUpgrade: false,
      reasonCode: "same-release",
      supportedFrom: null,
      supportedTo: null,
    });
  });

  it("fails closed without manifest-v2 verified lineage", () => {
    expect(evaluateUpdateSupport({ ...verifiedInput, manifestVersion: null })).toMatchObject({
      reasonCode: "manifest-v2-required",
      eligible: false,
    });
    expect(evaluateUpdateSupport({ ...verifiedInput, provenanceVerified: false })).toMatchObject({
      reasonCode: "verified-lineage-required",
      eligible: false,
    });
  });

  it("accepts only an active, internally consistent consecutive window", () => {
    const active = {
      ...UPDATE_SUPPORT_POLICY,
      status: "active",
      window: {
        ...UPDATE_SUPPORT_POLICY.window,
        supportedReleases: ["2.7.0", "2.8.0"],
        supportedFrom: "2.7.0",
        supportedTo: "2.8.0",
      },
      qualification: {
        ...UPDATE_SUPPORT_POLICY.qualification,
        qualifiedConsecutiveReleases: 2,
      },
    } satisfies UpdateSupportPolicy;

    expect(validateUpdateSupportPolicy(active)).toEqual([]);
    expect(
      evaluateUpdateSupport(
        {
          sourceVersion: "2.7.0",
          targetVersion: "2.8.0",
          manifestVersion: "2",
          provenanceVerified: true,
        },
        active,
      ),
    ).toMatchObject({
      eligible: true,
      eligibility: "supported",
      reasonCode: "supported-window",
      historicalUpgrade: true,
    });

    expect(
      validateUpdateSupportPolicy({
        ...active,
        status: "qualification",
      }),
    ).toContain("A qualification policy cannot advertise a supported historical window.");
  });
});
