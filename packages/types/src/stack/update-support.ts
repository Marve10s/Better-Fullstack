export const UPDATE_SUPPORT_POLICY_SCHEMA_VERSION = 1 as const;

export type UpdateSupportPolicyStatus = "qualification" | "active";

export type UpdateSupportPolicy = {
  schemaVersion: typeof UPDATE_SUPPORT_POLICY_SCHEMA_VERSION;
  status: UpdateSupportPolicyStatus;
  manifestVersion: "2";
  window: {
    kind: "consecutive-manifest-v2-releases";
    maximumSourceReleases: number;
    supportedReleases: readonly string[];
    supportedFrom: string | null;
    supportedTo: string | null;
  };
  qualification: {
    requiredConsecutiveReleases: number;
    qualifiedConsecutiveReleases: number;
  };
  outsideWindow: {
    automaticApply: false;
    outcome: "manual-review-required";
    lineageClaim: "unverified";
  };
};

export const UPDATE_SUPPORT_POLICY = {
  schemaVersion: UPDATE_SUPPORT_POLICY_SCHEMA_VERSION,
  status: "qualification",
  manifestVersion: "2",
  window: {
    kind: "consecutive-manifest-v2-releases",
    maximumSourceReleases: 2,
    supportedReleases: [],
    supportedFrom: null,
    supportedTo: null,
  },
  qualification: {
    requiredConsecutiveReleases: 2,
    qualifiedConsecutiveReleases: 0,
  },
  outsideWindow: {
    automaticApply: false,
    outcome: "manual-review-required",
    lineageClaim: "unverified",
  },
} as const satisfies UpdateSupportPolicy;

export type UpdateSupportReasonCode =
  | "same-release"
  | "supported-window"
  | "policy-invalid"
  | "manifest-v2-required"
  | "verified-lineage-required"
  | "source-version-missing"
  | "window-not-qualified"
  | "target-outside-policy"
  | "source-outside-window";

export type UpdateSupportEligibility = {
  schemaVersion: typeof UPDATE_SUPPORT_POLICY_SCHEMA_VERSION;
  policyStatus: UpdateSupportPolicyStatus;
  supportedFrom: string | null;
  supportedTo: string | null;
  sourceVersion: string | null;
  targetVersion: string;
  eligibility: "same-release" | "supported" | "manual-review-required";
  eligible: boolean;
  historicalUpgrade: boolean;
  requiresManualReview: boolean;
  reasonCode: UpdateSupportReasonCode;
  reason: string;
};

export type UpdateSupportInput = {
  sourceVersion: string | null;
  targetVersion: string;
  manifestVersion: string | null;
  provenanceVerified: boolean;
};

const EXACT_VERSION = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

export function validateUpdateSupportPolicy(policy: UpdateSupportPolicy): string[] {
  const errors: string[] = [];
  const releases = policy.window.supportedReleases;
  const uniqueReleases = new Set(releases);

  if (policy.schemaVersion !== UPDATE_SUPPORT_POLICY_SCHEMA_VERSION) {
    errors.push("Unsupported update support policy schema version.");
  }
  if (policy.manifestVersion !== "2") {
    errors.push("The supported update window must require manifest v2.");
  }
  if (
    !Number.isInteger(policy.window.maximumSourceReleases) ||
    policy.window.maximumSourceReleases < 1
  ) {
    errors.push("maximumSourceReleases must be a positive integer.");
  }
  if (uniqueReleases.size !== releases.length) {
    errors.push("Supported releases must be unique.");
  }
  if (releases.some((version) => !EXACT_VERSION.test(version))) {
    errors.push("Supported releases must use exact stable semantic versions.");
  }
  if (releases.length > policy.window.maximumSourceReleases) {
    errors.push("The supported release list exceeds maximumSourceReleases.");
  }
  if (
    policy.qualification.qualifiedConsecutiveReleases !== releases.length ||
    policy.qualification.requiredConsecutiveReleases < 2
  ) {
    errors.push("Qualification counts do not match the supported release list.");
  }

  if (policy.status === "qualification") {
    if (
      releases.length >= policy.qualification.requiredConsecutiveReleases ||
      policy.window.supportedFrom !== null ||
      policy.window.supportedTo !== null
    ) {
      errors.push("A qualification policy cannot advertise a supported historical window.");
    }
  } else {
    if (releases.length < policy.qualification.requiredConsecutiveReleases) {
      errors.push("An active policy requires the declared consecutive release qualification.");
    }
    if (
      policy.window.supportedFrom !== releases[0] ||
      policy.window.supportedTo !== releases.at(-1)
    ) {
      errors.push("Active window bounds must match the ordered supported release list.");
    }
  }

  return errors;
}

function manualReview(
  policy: UpdateSupportPolicy,
  input: UpdateSupportInput,
  reasonCode: Exclude<UpdateSupportReasonCode, "same-release" | "supported-window">,
  reason: string,
): UpdateSupportEligibility {
  return {
    schemaVersion: UPDATE_SUPPORT_POLICY_SCHEMA_VERSION,
    policyStatus: policy.status,
    supportedFrom: policy.window.supportedFrom,
    supportedTo: policy.window.supportedTo,
    sourceVersion: input.sourceVersion,
    targetVersion: input.targetVersion,
    eligibility: "manual-review-required",
    eligible: false,
    historicalUpgrade: input.sourceVersion !== null && input.sourceVersion !== input.targetVersion,
    requiresManualReview: true,
    reasonCode,
    reason,
  };
}

export function evaluateUpdateSupport(
  input: UpdateSupportInput,
  policy: UpdateSupportPolicy = UPDATE_SUPPORT_POLICY,
): UpdateSupportEligibility {
  const policyErrors = validateUpdateSupportPolicy(policy);
  if (policyErrors.length > 0) {
    return manualReview(policy, input, "policy-invalid", policyErrors.join(" "));
  }
  if (input.manifestVersion !== policy.manifestVersion) {
    return manualReview(
      policy,
      input,
      "manifest-v2-required",
      "A valid manifest-v2 baseline is required before release compatibility can be evaluated.",
    );
  }
  if (!input.provenanceVerified) {
    return manualReview(
      policy,
      input,
      "verified-lineage-required",
      "The source generator lineage is unverified, so no historical support claim can be made.",
    );
  }
  if (!input.sourceVersion) {
    return manualReview(
      policy,
      input,
      "source-version-missing",
      "The verified manifest does not identify an exact source CLI release.",
    );
  }
  if (input.sourceVersion === input.targetVersion) {
    return {
      schemaVersion: UPDATE_SUPPORT_POLICY_SCHEMA_VERSION,
      policyStatus: policy.status,
      supportedFrom: policy.window.supportedFrom,
      supportedTo: policy.window.supportedTo,
      sourceVersion: input.sourceVersion,
      targetVersion: input.targetVersion,
      eligibility: "same-release",
      eligible: true,
      historicalUpgrade: false,
      requiresManualReview: false,
      reasonCode: "same-release",
      reason:
        "The project and update engine use the same exact release. This is current-template reconciliation, not a historical upgrade claim.",
    };
  }
  if (policy.status !== "active") {
    return manualReview(
      policy,
      input,
      "window-not-qualified",
      "Historical updates are not advertised until two consecutive manifest-v2 releases pass the executable qualification matrix.",
    );
  }
  if (input.targetVersion !== policy.window.supportedTo) {
    return manualReview(
      policy,
      input,
      "target-outside-policy",
      "This CLI release is not the target of the active supported update window.",
    );
  }
  if (!policy.window.supportedReleases.includes(input.sourceVersion)) {
    return manualReview(
      policy,
      input,
      "source-outside-window",
      "The source release is outside the active supported update window.",
    );
  }

  return {
    schemaVersion: UPDATE_SUPPORT_POLICY_SCHEMA_VERSION,
    policyStatus: policy.status,
    supportedFrom: policy.window.supportedFrom,
    supportedTo: policy.window.supportedTo,
    sourceVersion: input.sourceVersion,
    targetVersion: input.targetVersion,
    eligibility: "supported",
    eligible: true,
    historicalUpgrade: true,
    requiresManualReview: false,
    reasonCode: "supported-window",
    reason: "The verified source release is inside the active executable update window.",
  };
}
