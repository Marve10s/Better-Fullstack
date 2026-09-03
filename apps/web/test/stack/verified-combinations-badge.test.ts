import {
  CAPABILITY_EVIDENCE_SCHEMA_VERSION,
  CAPABILITY_RECEIPT_SCHEMA_VERSION,
  GOLDEN_RUNTIME_RECIPES,
} from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";

import {
  evaluatePublicVerificationReceipt,
  fetchPublicCapabilityEvidenceReport,
  PUBLIC_VERIFICATION_CASE_IDS,
} from "@/lib/docs/release-verification";
import { verifiedCombinationsBadgePayload } from "@/lib/docs/verified-combinations-badge";

const NOW = new Date("2026-08-23T12:00:00.000Z");
const DEPLOYED_GIT_HEAD = "a".repeat(40);

function receipt() {
  const createdAt = new Date(NOW.getTime() - 60_000).toISOString();
  const generatedAt = new Date(NOW.getTime() - 120_000).toISOString();
  return {
    capabilityEvidence: {
      schemaVersion: CAPABILITY_RECEIPT_SCHEMA_VERSION,
      evidenceSchemaVersion: CAPABILITY_EVIDENCE_SCHEMA_VERSION,
      receiptType: "better-fullstack/capability-runtime",
      sourceSha: DEPLOYED_GIT_HEAD,
      catalogVersion: "2.9.0",
      producerFingerprint: "f".repeat(64),
      createdAt: generatedAt,
      toolchains: { bun: "1.3.12" },
      recipes: GOLDEN_RUNTIME_RECIPES.map((recipe, index) => ({
        id: recipe.id,
        definitionVersion: recipe.definitionVersion,
        success: true,
        startedAt: new Date(NOW.getTime() - (4 + index) * 60_000).toISOString(),
        completedAt: new Date(NOW.getTime() - (3 + index) * 60_000).toISOString(),
        flakyRuns: 0,
        repairMinutes: 0,
        dependencyChanges: 0,
        maintainerPresent: true,
      })),
    },
    createdAt,
    validUntil: new Date(Date.parse(createdAt) + 30 * 24 * 60 * 60 * 1_000).toISOString(),
    schemaVersion: 1,
    receiptType: "better-fullstack/release-verification",
    requiredCi: {
      name: "Lint, Test & Build",
      conclusion: "success",
      headSha: DEPLOYED_GIT_HEAD,
      runId: "12345",
      url: "https://github.com/Marve10s/Better-Fullstack/actions/runs/12345",
    },
    release: {
      version: "2.9.0",
      manifestSha256: "b".repeat(64),
      actualToolchains: { bun: "1.3.12" },
      pinnedToolchains: { bun: "1.3.12" },
      packages: [
        {
          filename: "packages/create-better-fullstack.tgz",
          integrity: "sha512-package",
          name: "create-better-fullstack",
          sha256: "c".repeat(64),
          shasum: "d".repeat(40),
          version: "2.9.0",
        },
      ],
    },
    projectVersions: {
      cli: "2.9.0",
      generator: "2.9.0",
      projectSchema: "1",
      scaffoldManifest: "2",
      templateSet: "2.9.0",
    },
    generatedProjectProof: {
      expectedCaseIds: [...PUBLIC_VERIFICATION_CASE_IDS],
      generatedAt,
      sha256: "e".repeat(64),
      matrixToolchains: [
        {
          command: ["bun", "--version"],
          executable: "/usr/local/bin/bun",
          name: "bun",
          version: "1.3.12",
        },
      ],
      cases: PUBLIC_VERIFICATION_CASE_IDS.map((id, index) => ({
        completedAt: new Date(NOW.getTime() - (3 + index) * 60_000).toISOString(),
        ecosystems: [id],
        id,
        requiredStages: ["scaffold", "build", "runtime"],
        result: "pass",
        runtimeLimitation: GOLDEN_RUNTIME_RECIPES[index]!.runtime.limitation,
        stackParts: [`backend:${id}:verified`],
        startedAt: new Date(NOW.getTime() - (4 + index) * 60_000).toISOString(),
      })),
    },
  };
}

describe("public verification receipt and badge", () => {
  it("is green only for the current complete eight-case runtime receipt", () => {
    const verification = evaluatePublicVerificationReceipt(receipt(), DEPLOYED_GIT_HEAD, NOW);
    const badge = verifiedCombinationsBadgePayload(verification);

    expect(verification).toMatchObject({
      status: "verified",
      current: true,
      evidenceLevel: "runtime-verified",
      maximumEvidenceLevel: "runtime-verified",
      version: "2.9.0",
    });
    expect(badge).toMatchObject({ color: "brightgreen", message: "8/8 runtime verified" });
    expect(verification.cases[1]?.runtimeLimitation).toContain("native device UI");
    expect(JSON.stringify(badge).toLowerCase()).not.toContain("fixproof");
  });

  it("fails closed when the receipt is missing or malformed", () => {
    for (const value of [null, {}, { schemaVersion: 1 }]) {
      const verification = evaluatePublicVerificationReceipt(value, DEPLOYED_GIT_HEAD, NOW);
      expect(verification.status).toBe("invalid");
      expect(verification.cases.every((entry) => entry.result === "not-run")).toBe(true);
      expect(verifiedCombinationsBadgePayload(verification).color).toBe("red");
    }
  });

  it("fails closed for a different deployed commit", () => {
    const verification = evaluatePublicVerificationReceipt(receipt(), "f".repeat(40), NOW);
    expect(verification).toMatchObject({
      status: "revision-mismatch",
      current: false,
      evidenceLevel: null,
    });
    expect(verifiedCombinationsBadgePayload(verification).message).toBe("0/8 revision-mismatch");
  });

  it("fails closed after receipt expiry", () => {
    const verification = evaluatePublicVerificationReceipt(
      receipt(),
      DEPLOYED_GIT_HEAD,
      new Date("2026-09-23T12:00:00.000Z"),
    );
    expect(verification.status).toBe("stale");
    expect(verifiedCombinationsBadgePayload(verification).color).toBe("red");
  });

  it("rejects a self-consistent but reduced case matrix", () => {
    const partial = receipt();
    partial.generatedProjectProof.expectedCaseIds.pop();
    partial.generatedProjectProof.cases.pop();

    const verification = evaluatePublicVerificationReceipt(partial, DEPLOYED_GIT_HEAD, NOW);
    expect(verification.status).toBe("invalid");
    expect(verification.evidenceLevel).toBeNull();
  });

  it("projects current option evidence and keeps uncovered options experimental", async () => {
    const report = await fetchPublicCapabilityEvidenceReport(
      DEPLOYED_GIT_HEAD,
      async () => Response.json(receipt()),
      NOW,
    );

    expect(report).toMatchObject({ status: "verified", current: true, version: "2.9.0" });
    expect(
      report.inventory.find((record) => record.id === "rust:rustWebFramework:axum"),
    ).toMatchObject({
      evidenceLevel: "runtime-verified",
      freshness: "current",
      maturity: "stable",
    });
    expect(
      report.inventory.find((record) => record.id === "rust:rustWebFramework:actix-web"),
    ).toMatchObject({ evidenceLevel: "listed", maturity: "experimental" });
  });
});
