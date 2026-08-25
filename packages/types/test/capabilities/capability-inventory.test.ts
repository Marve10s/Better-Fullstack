import { describe, expect, it } from "bun:test";

import {
  CAPABILITY_EVIDENCE_SCHEMA_VERSION,
  CAPABILITY_RECEIPT_SCHEMA_VERSION,
  GOLDEN_RUNTIME_RECIPES,
  OPTION_CATEGORY_METADATA,
  getCapabilityInventory,
  getCapabilityMaintenanceCosts,
  getCategoryOrderForEcosystem,
  type CapabilityEvidenceReceipt,
  type CapabilityQuarantineEntry,
} from "@/";

const NOW = new Date("2026-08-23T12:00:00.000Z");
const PRODUCER_FINGERPRINT = "a".repeat(64);

function receipt(overrides: Partial<CapabilityEvidenceReceipt> = {}): CapabilityEvidenceReceipt {
  return {
    schemaVersion: CAPABILITY_RECEIPT_SCHEMA_VERSION,
    evidenceSchemaVersion: CAPABILITY_EVIDENCE_SCHEMA_VERSION,
    receiptType: "better-fullstack/capability-runtime",
    sourceSha: "b".repeat(40),
    catalogVersion: "2.6.1",
    producerFingerprint: PRODUCER_FINGERPRINT,
    createdAt: NOW.toISOString(),
    toolchains: { bun: "1.3.12" },
    recipes: GOLDEN_RUNTIME_RECIPES.map((recipe) => ({
      id: recipe.id,
      definitionVersion: recipe.definitionVersion,
      success: true,
      startedAt: "2026-08-23T11:00:00.000Z",
      completedAt: "2026-08-23T11:05:00.000Z",
      flakyRuns: 0,
      repairMinutes: 0,
      dependencyChanges: 0,
      maintainerPresent: true,
    })),
    ...overrides,
  };
}

describe("capability inventory", () => {
  it("gives every public option an owner, maturity, freshness, and limitation", () => {
    const records = getCapabilityInventory();
    const expected = [
      "typescript",
      "react-native",
      "rust",
      "python",
      "go",
      "java",
      "dotnet",
      "elixir",
    ].reduce(
      (total, ecosystem) =>
        total +
        getCategoryOrderForEcosystem(ecosystem).reduce(
          (categoryTotal, category) =>
            categoryTotal +
            OPTION_CATEGORY_METADATA[category].options.filter((option) => option.id !== "none")
              .length,
          0,
        ),
      0,
    );

    expect(records).toHaveLength(expected);
    expect(
      records.every(
        (record) =>
          record.maintenanceOwner.length > 0 &&
          record.maturity.length > 0 &&
          record.freshness === "unverified" &&
          record.limitation.length > 0 &&
          record.evidenceLevel === "listed" &&
          record.lastVerifiedVersion === null,
      ),
    ).toBe(true);
  });

  it("promotes only options covered by current passing recipe receipts", () => {
    const records = getCapabilityInventory({
      receipt: receipt(),
      catalogVersion: "2.6.1",
      producerFingerprint: PRODUCER_FINGERPRINT,
      now: NOW,
    });
    const axum = records.find((record) => record.id === "rust:rustWebFramework:axum");
    const actix = records.find((record) => record.id === "rust:rustWebFramework:actix-web");
    const nativeFrontend = records.find(
      (record) => record.id === "react-native:nativeFrontend:native-bare",
    );
    const mobileNavigation = records.find(
      (record) => record.id === "react-native:mobileNavigation:expo-router",
    );

    expect(axum).toMatchObject({
      evidenceLevel: "runtime-verified",
      freshness: "current",
      lastVerifiedVersion: "2.6.1",
      maturity: "stable",
    });
    expect(actix).toMatchObject({
      evidenceLevel: "listed",
      freshness: "current",
      lastVerifiedVersion: null,
      maturity: "experimental",
    });
    for (const mobileOption of [nativeFrontend, mobileNavigation]) {
      expect(mobileOption).toMatchObject({
        declaredEvidenceLevel: "build-verified",
        evidenceLevel: "build-verified",
        freshness: "current",
        lastVerifiedVersion: "2.6.1",
        maturity: "stable",
      });
      expect(mobileOption?.limitation).toContain("does not launch a native device UI");
    }
  });

  it("downgrades stale, mismatched, and failed receipts", () => {
    const stale = getCapabilityInventory({
      receipt: receipt({ createdAt: "2026-06-01T00:00:00.000Z" }),
      catalogVersion: "2.6.1",
      producerFingerprint: PRODUCER_FINGERPRINT,
      now: NOW,
    }).find((record) => record.id === "go:goWebFramework:gin");
    expect(stale).toMatchObject({ evidenceLevel: "listed", freshness: "stale" });

    const mismatched = getCapabilityInventory({
      receipt: receipt(),
      catalogVersion: "2.6.2",
      producerFingerprint: PRODUCER_FINGERPRINT,
      now: NOW,
    }).find((record) => record.id === "go:goWebFramework:gin");
    expect(mismatched).toMatchObject({
      evidenceLevel: "listed",
      freshness: "producer-mismatch",
    });

    const failedReceipt = receipt();
    failedReceipt.recipes = failedReceipt.recipes.map((recipe) =>
      recipe.id === "go" ? { ...recipe, success: false } : recipe,
    );
    const failed = getCapabilityInventory({
      receipt: failedReceipt,
      catalogVersion: "2.6.1",
      producerFingerprint: PRODUCER_FINGERPRINT,
      now: NOW,
    }).find((record) => record.id === "go:goWebFramework:gin");
    expect(failed).toMatchObject({ evidenceLevel: "listed", freshness: "failed" });
  });

  it("hides quarantined options and preserves their restoration record", () => {
    const quarantine: CapabilityQuarantineEntry[] = [
      {
        ecosystem: "rust",
        category: "rustWebFramework",
        optionId: "axum",
        reason: "The runtime recipe is failing.",
        maintenanceOwner: "@runtime-owner",
        restorationRecipeId: "rust",
        visibility: "hidden",
      },
    ];
    expect(
      getCapabilityInventory({ quarantine }).some(
        (record) => record.id === "rust:rustWebFramework:axum",
      ),
    ).toBe(false);
    expect(
      getCapabilityInventory({ quarantine, includeHidden: true }).find(
        (record) => record.id === "rust:rustWebFramework:axum",
      ),
    ).toMatchObject({
      maturity: "quarantined",
      public: false,
      evidenceLevel: "listed",
      freshness: "quarantined",
      limitation: "The runtime recipe is failing.",
    });
  });

  it("reports recurring recipe maintenance costs", () => {
    const value = receipt();
    value.recipes[0] = {
      ...value.recipes[0]!,
      flakyRuns: 2,
      repairMinutes: 15,
      dependencyChanges: 3,
      maintainerPresent: false,
    };
    expect(getCapabilityMaintenanceCosts(value)[0]).toMatchObject({
      recipeId: "typescript",
      recurringCostScore: 47,
    });
  });
});
