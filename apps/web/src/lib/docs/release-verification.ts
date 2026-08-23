import {
  CapabilityEvidenceReceiptSchema,
  GOLDEN_RUNTIME_RECIPES,
  capCapabilityEvidenceLevel,
  getCapabilityInventory,
  type CapabilityInventoryRecord,
  type CapabilityEvidenceLevel,
} from "@better-fullstack/types";
import { z } from "zod";

import { PUBLIC_VERIFICATION_CASE_IDS } from "./release-verification-cases";

export { PUBLIC_VERIFICATION_CASE_IDS } from "./release-verification-cases";

export const VERIFICATION_RECEIPT_URL =
  "https://github.com/Marve10s/Better-Fullstack/releases/latest/download/verification-receipt.v1.json";

const fullGitSha = /^[0-9a-f]{40}$/i;
const sha256 = /^[0-9a-f]{64}$/i;
const PUBLIC_RECEIPT_VALIDITY_MS = 30 * 24 * 60 * 60 * 1_000;

type Fetcher = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

const matrixCaseSchema = z.object({
  completedAt: z.string(),
  ecosystems: z.array(z.string()).min(1),
  id: z.string(),
  requiredStages: z.array(z.string()).min(1),
  result: z.literal("pass"),
  runtimeLimitation: z.string().min(1),
  stackParts: z.array(z.string()).min(1),
  startedAt: z.string(),
});

const verificationReceiptSchema = z.object({
  capabilityEvidence: CapabilityEvidenceReceiptSchema,
  createdAt: z.string(),
  generatedProjectProof: z.object({
    cases: z.array(matrixCaseSchema),
    expectedCaseIds: z.array(z.string()),
    generatedAt: z.string(),
    matrixToolchains: z.array(
      z.object({
        command: z.array(z.string()),
        executable: z.string(),
        name: z.string(),
        version: z.string(),
      }),
    ),
    sha256: z.string().regex(sha256),
  }),
  projectVersions: z.object({
    cli: z.string(),
    generator: z.string(),
    projectSchema: z.literal("1"),
    scaffoldManifest: z.literal("2"),
    templateSet: z.string(),
  }),
  receiptType: z.literal("better-fullstack/release-verification"),
  release: z.object({
    actualToolchains: z.record(z.string(), z.string()),
    manifestSha256: z.string().regex(sha256),
    packages: z.array(
      z.object({
        filename: z.string(),
        integrity: z.string(),
        name: z.string(),
        sha256: z.string().regex(sha256),
        shasum: z.string(),
        version: z.string(),
      }),
    ),
    pinnedToolchains: z.record(z.string(), z.string()),
    version: z.string(),
  }),
  requiredCi: z.object({
    conclusion: z.literal("success"),
    headSha: z.string().regex(fullGitSha),
    name: z.literal("Lint, Test & Build"),
    runId: z.string().regex(/^\d+$/),
    url: z.string().url(),
  }),
  schemaVersion: z.literal(1),
  validUntil: z.string(),
});

export type PublicVerificationCase = {
  ecosystems: string[];
  id: (typeof PUBLIC_VERIFICATION_CASE_IDS)[number];
  requiredStages: string[];
  result: "pass" | "not-run";
  runtimeLimitation: string | null;
  stackParts: string[];
};

export type PublicVerificationReport = {
  schemaVersion: 1;
  status: "verified" | "unavailable" | "invalid" | "stale" | "revision-mismatch";
  current: boolean;
  evidenceLevel: CapabilityEvidenceLevel | null;
  maximumEvidenceLevel: "runtime-verified";
  reason: string;
  receiptUrl: string;
  commit?: string;
  version?: string;
  createdAt?: string;
  validUntil?: string;
  ageSeconds?: number;
  requiredCiUrl?: string;
  toolchains: Array<{ name: string; version: string }>;
  cases: PublicVerificationCase[];
};

function unavailableCases(): PublicVerificationCase[] {
  return PUBLIC_VERIFICATION_CASE_IDS.map((id) => ({
    ecosystems: [],
    id,
    requiredStages: [],
    result: "not-run",
    runtimeLimitation: null,
    stackParts: [],
  }));
}

function unavailableReport(
  status: Exclude<PublicVerificationReport["status"], "verified">,
  reason: string,
): PublicVerificationReport {
  return {
    schemaVersion: 1,
    status,
    current: false,
    evidenceLevel: null,
    maximumEvidenceLevel: "runtime-verified",
    reason,
    receiptUrl: VERIFICATION_RECEIPT_URL,
    toolchains: [],
    cases: unavailableCases(),
  };
}

function unique(values: readonly string[]): boolean {
  return new Set(values).size === values.length;
}

export function evaluatePublicVerificationReceipt(
  input: unknown,
  deployedGitHead: string | undefined,
  now = new Date(),
): PublicVerificationReport {
  const parsed = verificationReceiptSchema.safeParse(input);
  if (!parsed.success) {
    return unavailableReport("invalid", "The latest release receipt is missing required fields.");
  }
  const receipt = parsed.data;
  const createdAt = Date.parse(receipt.createdAt);
  const validUntil = Date.parse(receipt.validUntil);
  const proofGeneratedAt = Date.parse(receipt.generatedProjectProof.generatedAt);
  if (
    !Number.isFinite(createdAt) ||
    !Number.isFinite(validUntil) ||
    !Number.isFinite(proofGeneratedAt) ||
    proofGeneratedAt > createdAt ||
    createdAt > now.getTime() + 5 * 60_000 ||
    validUntil !== createdAt + PUBLIC_RECEIPT_VALIDITY_MS
  ) {
    return unavailableReport("invalid", "The latest release receipt has invalid timestamps.");
  }
  if (now.getTime() > validUntil) {
    return unavailableReport("stale", "The latest release receipt has expired.");
  }
  if (!deployedGitHead || !fullGitSha.test(deployedGitHead)) {
    return unavailableReport(
      "revision-mismatch",
      "The deployed commit identity is unavailable, so receipt freshness cannot be proved.",
    );
  }
  if (receipt.requiredCi.headSha !== deployedGitHead) {
    return unavailableReport(
      "revision-mismatch",
      "The latest release receipt belongs to a different deployed commit.",
    );
  }
  if (
    receipt.capabilityEvidence.sourceSha !== deployedGitHead ||
    receipt.capabilityEvidence.catalogVersion !== receipt.release.version ||
    receipt.capabilityEvidence.createdAt !== receipt.generatedProjectProof.generatedAt ||
    receipt.capabilityEvidence.recipes.length !== GOLDEN_RUNTIME_RECIPES.length ||
    receipt.capabilityEvidence.recipes.some((result, index) => {
      const recipe = GOLDEN_RUNTIME_RECIPES[index];
      return (
        !recipe ||
        result.id !== recipe.id ||
        result.definitionVersion !== recipe.definitionVersion ||
        result.success !== true ||
        result.maintainerPresent !== true
      );
    })
  ) {
    return unavailableReport(
      "invalid",
      "The latest release receipt has incomplete or mismatched runtime evidence.",
    );
  }

  const expectedIds = receipt.generatedProjectProof.expectedCaseIds;
  const cases = receipt.generatedProjectProof.cases;
  const caseIds = cases.map((entry) => entry.id);
  if (
    JSON.stringify(expectedIds) !== JSON.stringify(PUBLIC_VERIFICATION_CASE_IDS) ||
    JSON.stringify(caseIds) !== JSON.stringify(PUBLIC_VERIFICATION_CASE_IDS) ||
    !unique(caseIds) ||
    cases.some((entry) => {
      const startedAt = Date.parse(entry.startedAt);
      const completedAt = Date.parse(entry.completedAt);
      return (
        !unique(entry.ecosystems) ||
        !unique(entry.stackParts) ||
        !unique(entry.requiredStages) ||
        !Number.isFinite(startedAt) ||
        !Number.isFinite(completedAt) ||
        startedAt > completedAt ||
        completedAt > proofGeneratedAt
      );
    })
  ) {
    return unavailableReport(
      "invalid",
      "The latest release receipt has an incomplete proof matrix.",
    );
  }

  const cliPackage = receipt.release.packages.find((pkg) => pkg.name === "create-better-fullstack");
  if (
    !cliPackage ||
    cliPackage.version !== receipt.release.version ||
    receipt.projectVersions.cli !== receipt.release.version ||
    receipt.projectVersions.templateSet !== receipt.release.version ||
    receipt.generatedProjectProof.matrixToolchains.length === 0 ||
    !receipt.requiredCi.url.endsWith(`/actions/runs/${receipt.requiredCi.runId}`)
  ) {
    return unavailableReport(
      "invalid",
      "The latest release receipt has mismatched package identity.",
    );
  }

  return {
    schemaVersion: 1,
    status: "verified",
    current: true,
    evidenceLevel: capCapabilityEvidenceLevel("runtime-verified", "runtime-verified"),
    maximumEvidenceLevel: "runtime-verified",
    reason: "All eight release recipes passed clean install, build, and live boundary assertions.",
    receiptUrl: VERIFICATION_RECEIPT_URL,
    commit: receipt.requiredCi.headSha,
    version: receipt.release.version,
    createdAt: receipt.createdAt,
    validUntil: receipt.validUntil,
    ageSeconds: Math.max(0, Math.floor((now.getTime() - createdAt) / 1_000)),
    requiredCiUrl: receipt.requiredCi.url,
    toolchains: receipt.generatedProjectProof.matrixToolchains.map(({ name, version }) => ({
      name,
      version,
    })),
    cases: cases.map((entry) => ({
      ecosystems: entry.ecosystems,
      id: entry.id as PublicVerificationCase["id"],
      requiredStages: entry.requiredStages,
      result: entry.result,
      runtimeLimitation: entry.runtimeLimitation,
      stackParts: entry.stackParts,
    })),
  };
}

export async function fetchPublicVerificationReport(
  deployedGitHead: string | undefined,
  fetcher: Fetcher = fetch,
  now = new Date(),
): Promise<PublicVerificationReport> {
  try {
    const response = await fetcher(VERIFICATION_RECEIPT_URL, {
      headers: { Accept: "application/json" },
      redirect: "follow",
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) {
      return unavailableReport("unavailable", "No current release receipt is available.");
    }
    return evaluatePublicVerificationReceipt(await response.json(), deployedGitHead, now);
  } catch {
    return unavailableReport("unavailable", "The current release receipt could not be loaded.");
  }
}

export type PublicCapabilityEvidenceReport = {
  schemaVersion: 1;
  status: PublicVerificationReport["status"];
  current: boolean;
  reason: string;
  receiptUrl: string;
  version?: string;
  createdAt?: string;
  inventory: CapabilityInventoryRecord[];
};

export async function fetchPublicCapabilityEvidenceReport(
  deployedGitHead: string | undefined,
  fetcher: Fetcher = fetch,
  now = new Date(),
): Promise<PublicCapabilityEvidenceReport> {
  try {
    const response = await fetcher(VERIFICATION_RECEIPT_URL, {
      headers: { Accept: "application/json" },
      redirect: "follow",
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) {
      const unavailable = unavailableReport(
        "unavailable",
        "No current release receipt is available.",
      );
      return {
        schemaVersion: 1,
        status: unavailable.status,
        current: false,
        reason: unavailable.reason,
        receiptUrl: VERIFICATION_RECEIPT_URL,
        inventory: getCapabilityInventory(),
      };
    }
    const value = await response.json();
    const verification = evaluatePublicVerificationReceipt(value, deployedGitHead, now);
    const parsed = verificationReceiptSchema.safeParse(value);
    if (verification.status !== "verified" || !parsed.success) {
      return {
        schemaVersion: 1,
        status: verification.status,
        current: false,
        reason: verification.reason,
        receiptUrl: VERIFICATION_RECEIPT_URL,
        inventory: getCapabilityInventory(),
      };
    }
    return {
      schemaVersion: 1,
      status: "verified",
      current: true,
      reason: verification.reason,
      receiptUrl: VERIFICATION_RECEIPT_URL,
      version: verification.version,
      createdAt: verification.createdAt,
      inventory: getCapabilityInventory({
        receipt: parsed.data.capabilityEvidence,
        catalogVersion: parsed.data.release.version,
        now,
      }),
    };
  } catch {
    return {
      schemaVersion: 1,
      status: "unavailable",
      current: false,
      reason: "The current release receipt could not be loaded.",
      receiptUrl: VERIFICATION_RECEIPT_URL,
      inventory: getCapabilityInventory(),
    };
  }
}
