import {
  CAPABILITY_EVIDENCE_LEVELS,
  CAPABILITY_EVIDENCE_SCHEMA_VERSION,
  CAPABILITY_INVENTORY_SCHEMA_VERSION,
  GOLDEN_RUNTIME_RECIPES,
  getCapabilityInventory,
  getCapabilityMaintenanceCosts,
  type CapabilityEvidenceLevel,
  type CapabilityFreshness,
  type OptionCategory,
  type OptionCategoryEcosystem,
} from "@better-fullstack/types";

function countBy<T extends string>(
  values: readonly T[],
  selected: readonly T[],
): Record<T, number> {
  return Object.fromEntries(
    values.map((value) => [value, selected.filter((entry) => entry === value).length]),
  ) as Record<T, number>;
}

export type CapabilityEvidenceReportOptions = {
  receipt?: unknown;
  catalogVersion?: string;
  producerFingerprint?: string;
  now?: Date;
  ecosystem?: OptionCategoryEcosystem;
  category?: OptionCategory;
  optionId?: string;
};

export function getCapabilityEvidenceReport(options: CapabilityEvidenceReportOptions = {}) {
  const inventory = getCapabilityInventory(options).filter(
    (record) =>
      (!options.ecosystem || record.ecosystem === options.ecosystem) &&
      (!options.category || record.category === options.category) &&
      (!options.optionId || record.optionId === options.optionId),
  );
  return {
    schemaVersion: CAPABILITY_EVIDENCE_SCHEMA_VERSION,
    inventorySchemaVersion: CAPABILITY_INVENTORY_SCHEMA_VERSION,
    levels: CAPABILITY_EVIDENCE_LEVELS,
    summary: {
      totalOptions: inventory.length,
      evidence: countBy(
        ["listed", "generated", "build-verified", "runtime-verified"] as const,
        inventory.map((record) => record.evidenceLevel as CapabilityEvidenceLevel),
      ),
      freshness: countBy(
        ["unverified", "current", "stale", "producer-mismatch", "failed", "quarantined"] as const,
        inventory.map((record) => record.freshness as CapabilityFreshness),
      ),
    },
    recipes: GOLDEN_RUNTIME_RECIPES,
    maintenanceCosts:
      options.receipt === undefined ? [] : getCapabilityMaintenanceCosts(options.receipt),
    inventory,
  };
}
