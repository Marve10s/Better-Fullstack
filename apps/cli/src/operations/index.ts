import type { ProjectOperation } from "@/operations/operation";

import {
  checkCompatibilityOperation,
  getCapabilityEvidenceOperation,
  getGuidanceOperation,
  getSchemaOperation,
  listPresetsOperation,
  listStarterTracksOperation,
  recommendStackOperation,
} from "@/operations/catalog";
import { createProjectOperation, planProjectOperation } from "@/operations/project-create";
import {
  addFeatureOperation,
  applyDoctorFixOperation,
  applyGenOperation,
  applyPartRemovalOperation,
  applyPrimaryRoleReplacementOperation,
  applyProjectUpdateOperation,
  applyRegistryAddOperation,
  applyStackUpdateOperation,
  confirmProjectAdoptionOperation,
  planAdditionOperation,
  planDoctorFixOperation,
  planGenOperation,
  planPartRemovalOperation,
  planPrimaryRoleReplacementOperation,
  planProjectAdoptionOperation,
  planProjectUpdateOperation,
  planRegistryAddOperation,
  planStackUpdateOperation,
} from "@/operations/project-mutate";
import {
  checkProjectOperation,
  checkRecipesOperation,
  getProjectContextOperation,
  getProjectStatusOperation,
  getRecipeHistoryOperation,
} from "@/operations/project-read";
import {
  getProjectRecoveryPointOperation,
  listProjectRecoveryPointsOperation,
  pruneProjectRecoveryPointsOperation,
  recoverProjectTransactionOperation,
  verifyProjectRecoveryPointOperation,
} from "@/operations/recovery";

export * from "@/operations/operation";

/** Every lifecycle operation, in the order the MCP server advertises them. */
export const allOperations: readonly ProjectOperation[] = [
  getGuidanceOperation,
  getSchemaOperation,
  listPresetsOperation,
  listStarterTracksOperation,
  recommendStackOperation,
  checkCompatibilityOperation,
  planProjectOperation,
  createProjectOperation,
  getProjectStatusOperation,
  checkProjectOperation,
  planDoctorFixOperation,
  applyDoctorFixOperation,
  planGenOperation,
  applyGenOperation,
  checkRecipesOperation,
  getRecipeHistoryOperation,
  getProjectContextOperation,
  planRegistryAddOperation,
  applyRegistryAddOperation,
  planPartRemovalOperation,
  applyPartRemovalOperation,
  planProjectAdoptionOperation,
  confirmProjectAdoptionOperation,
  planProjectUpdateOperation,
  applyProjectUpdateOperation,
  listProjectRecoveryPointsOperation,
  getProjectRecoveryPointOperation,
  verifyProjectRecoveryPointOperation,
  pruneProjectRecoveryPointsOperation,
  recoverProjectTransactionOperation,
  planPrimaryRoleReplacementOperation,
  applyPrimaryRoleReplacementOperation,
  planStackUpdateOperation,
  applyStackUpdateOperation,
  planAdditionOperation,
  addFeatureOperation,
  getCapabilityEvidenceOperation,
];

/** Operations that only read project or catalog state. */
export const readOperations = allOperations.filter((operation) => operation.safety === "read");
