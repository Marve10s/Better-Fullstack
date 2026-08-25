import { z } from "zod";

export const CAPABILITY_EVIDENCE_SCHEMA_VERSION = 1 as const;

export const CAPABILITY_EVIDENCE_LEVEL_IDS = [
  "listed",
  "generated",
  "build-verified",
  "runtime-verified",
] as const;

export const CapabilityEvidenceLevelSchema = z.enum(CAPABILITY_EVIDENCE_LEVEL_IDS);
export type CapabilityEvidenceLevel = z.infer<typeof CapabilityEvidenceLevelSchema>;

export type CapabilityEvidenceLevelDefinition = {
  id: CapabilityEvidenceLevel;
  label: string;
  proves: string;
  doesNotProve: string;
  requiredEvidence: readonly string[];
};

export const CAPABILITY_EVIDENCE_LEVELS = [
  {
    id: "listed",
    label: "Listed",
    proves: "The Stack Part exists in the canonical schema and can be checked for compatibility.",
    doesNotProve:
      "The generator emits files or that a generated project installs, builds, or runs.",
    requiredEvidence: ["Canonical schema entry", "Executable compatibility coverage"],
  },
  {
    id: "generated",
    label: "Generated",
    proves:
      "The current generator emits the declared files and structural assertions pass for an exact version.",
    doesNotProve: "Dependencies install or that the generated project builds or runs.",
    requiredEvidence: ["Listed evidence", "SHA-bound generator receipt", "Structural assertions"],
  },
  {
    id: "build-verified",
    label: "Build verified",
    proves:
      "A clean generated project installs dependencies and completes its declared compile, build, type-check, or test stages on recorded toolchains.",
    doesNotProve: "A server starts or that a user-visible protocol and behavior work at runtime.",
    requiredEvidence: [
      "Generated evidence",
      "Clean install",
      "Declared build stages",
      "Exact commit and toolchain receipt",
    ],
  },
  {
    id: "runtime-verified",
    label: "Runtime verified",
    proves:
      "A build-verified project starts and passes declared live protocol and behavior assertions.",
    doesNotProve: "Behavior outside the recorded recipe, assertions, environment, or evidence age.",
    requiredEvidence: [
      "Build-verified evidence",
      "Live process or device exercise",
      "Declared protocol assertions",
      "Declared behavior assertions",
    ],
  },
] as const satisfies readonly CapabilityEvidenceLevelDefinition[];

export type CapabilityEvidenceProof = {
  listed: boolean;
  generated: boolean;
  buildVerified: boolean;
  runtimeVerified: boolean;
};

export function capabilityEvidenceLevel(
  proof: CapabilityEvidenceProof,
): CapabilityEvidenceLevel | null {
  if (!proof.listed) return null;
  if (!proof.generated) return "listed";
  if (!proof.buildVerified) return "generated";
  if (!proof.runtimeVerified) return "build-verified";
  return "runtime-verified";
}

export function capCapabilityEvidenceLevel(
  claimed: CapabilityEvidenceLevel | null,
  allowed: CapabilityEvidenceLevel | null,
): CapabilityEvidenceLevel | null {
  if (!claimed || !allowed) return null;
  const claimedIndex = CAPABILITY_EVIDENCE_LEVEL_IDS.indexOf(claimed);
  const allowedIndex = CAPABILITY_EVIDENCE_LEVEL_IDS.indexOf(allowed);
  return CAPABILITY_EVIDENCE_LEVEL_IDS[Math.min(claimedIndex, allowedIndex)] ?? null;
}

export function capabilityEvidenceAtLeast(
  actual: CapabilityEvidenceLevel | null,
  required: CapabilityEvidenceLevel,
): boolean {
  return (
    actual !== null &&
    CAPABILITY_EVIDENCE_LEVEL_IDS.indexOf(actual) >= CAPABILITY_EVIDENCE_LEVEL_IDS.indexOf(required)
  );
}
