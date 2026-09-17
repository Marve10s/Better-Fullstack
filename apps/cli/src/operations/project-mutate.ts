import {
  type AddInput,
  AddonsSchema,
  PackageManagerSchema,
  type ProjectConfig,
  ServerDeploySchema,
  WebDeploySchema,
} from "@better-fullstack/types";
import { z } from "zod";

import { readBtsConfig } from "@/config/bts-config";
import {
  genMutationOutputSchema,
  partRemovalOutputSchema,
  projectAdoptionOutputSchema,
  projectUpdateOutputSchema,
  registryMutationOutputSchema,
} from "@/mcp/mcp-lifecycle-output-schemas";
import {
  defineOperation,
  errorMessage,
  projectDirInput,
  sanitizePath,
} from "@/operations/operation";
import {
  addFeatureOutputSchema,
  configDriftRepairOutputSchema,
  planAdditionOutputSchema,
  stackUpdateOutputSchema,
} from "@/operations/output-schemas";
import {
  compatibilityWarningsForStackUpdate,
  diffAddedCapabilities,
  getInstallCommand,
  getMcpGraphPreview,
  mergeLegacyAddonParts,
  projectPartRemovalPayload,
  WORKSPACE_RUNNERS,
} from "@/operations/stack-helpers";
import { MCP_STACK_UPDATE_SCHEMA } from "@/operations/stack-input";
import { trackEvent } from "@/telemetry/analytics";

export const planDoctorFixOperation = defineOperation({
  name: "plan_doctor_fix",
  title: "Plan doctor config repair",
  description:
    "Plans canonical bts.jsonc Stack Graph and compatibility-cache repair. It reports exact fields and a current-state review token without writing.",
  input: z.object({ projectDir: projectDirInput }),
  output: configDriftRepairOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  run: async (input) => {
    const { planConfigDriftRepair } = await import("@/config/config-drift-repair.js");
    return planConfigDriftRepair(sanitizePath(input.projectDir));
  },
});

export const applyDoctorFixOperation = defineOperation({
  name: "apply_doctor_fix",
  title: "Apply doctor config repair",
  description:
    "Applies one unchanged bfs_plan_doctor_fix result to bts.jsonc inside a recovery transaction. A missing or stale token fails before the config write.",
  input: z.object({
    projectDir: projectDirInput,
    reviewToken: z
      .string()
      .length(64)
      .describe("Exact reviewToken returned by bfs_plan_doctor_fix"),
  }),
  output: configDriftRepairOutputSchema,
  safety: "action",
  idempotent: false,
  openWorld: false,
  run: async (input) => {
    const { applyConfigDriftRepair } = await import("@/config/config-drift-repair.js");
    return applyConfigDriftRepair(sanitizePath(input.projectDir), input.reviewToken);
  },
});

const genKindInput = z.enum(["resource", "route"]).default("resource");

export const planGenOperation = defineOperation({
  name: "plan_gen",
  title: "Plan in-project generation",
  description:
    "Plans an in-project resource generator operation. It returns every exact file body, router-index edit, preimage hash, and a review token. It never writes.",
  input: z.object({
    projectDir: projectDirInput,
    kind: genKindInput,
    name: z.string().min(1).describe("Resource name, for example post"),
  }),
  output: genMutationOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  run: async (input) => {
    const { planGen } = await import("@/commands/generation/gen.js");
    return planGen({ dir: sanitizePath(input.projectDir), kind: input.kind, name: input.name });
  },
});

export const applyGenOperation = defineOperation({
  name: "apply_gen",
  title: "Apply reviewed in-project generation",
  description:
    "Applies an unchanged bfs_plan_gen result in one filesystem recovery transaction. A stale anchor, file, or token fails before writes.",
  input: z.object({
    projectDir: projectDirInput,
    kind: genKindInput,
    name: z.string().min(1).describe("Resource name from the reviewed plan"),
    reviewToken: z.string().length(64).describe("Exact token returned by bfs_plan_gen"),
  }),
  output: genMutationOutputSchema,
  safety: "destructive",
  idempotent: false,
  openWorld: false,
  run: async (input) => {
    const { applyGen } = await import("@/commands/generation/gen.js");
    return applyGen(
      { dir: sanitizePath(input.projectDir), kind: input.kind, name: input.name },
      input.reviewToken,
    );
  },
});

export const planRegistryAddOperation = defineOperation({
  name: "plan_registry_add",
  title: "Plan local capability pack install",
  description:
    "Plans installation of a local capability pack. It returns exact file bodies, dependency changes, metadata merges, side-effect boundaries, and a review token. Remote sources are rejected.",
  input: z.object({
    projectDir: projectDirInput,
    source: z.string().describe("Local path or file:// URL to a capability pack"),
  }),
  output: registryMutationOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  run: async (input) => {
    const { planPackInstall } = await import("@/helpers/core/registry-handler.js");
    return planPackInstall({ projectDir: sanitizePath(input.projectDir), source: input.source });
  },
});

export const applyRegistryAddOperation = defineOperation({
  name: "apply_registry_add",
  title: "Apply reviewed local capability pack",
  description:
    "Applies an unchanged local capability-pack plan in one filesystem recovery transaction. It edits dependency manifests but never runs a package manager.",
  input: z.object({
    projectDir: projectDirInput,
    source: z.string().describe("Local path or file:// URL from the reviewed plan"),
    reviewToken: z
      .string()
      .regex(/^v2\.[A-Za-z0-9_-]+\.[0-9a-f]{64}$/)
      .describe("Exact token returned by bfs_plan_registry_add"),
  }),
  output: registryMutationOutputSchema,
  safety: "destructive",
  idempotent: false,
  openWorld: false,
  run: async (input) => {
    const { applyPackInstall } = await import("@/helpers/core/registry-handler.js");
    return applyPackInstall(
      { projectDir: sanitizePath(input.projectDir), source: input.source },
      input.reviewToken,
    );
  },
});

export const planPartRemovalOperation = defineOperation({
  name: "plan_part_removal",
  title: "Plan stack part removal",
  description:
    "Plans removal of one exact non-primary stack part and returns a review token bound to the resulting config and generated-file operations.",
  input: z.object({
    projectDir: projectDirInput,
    target: z
      .string()
      .describe("Exact stack part spec or ID, for example backend.auth:typescript:better-auth"),
  }),
  output: partRemovalOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  run: async (input) => {
    const { planMcpPartRemoval } = await import("@/mcp/mcp-project-lifecycle.js");
    return projectPartRemovalPayload(
      await planMcpPartRemoval(sanitizePath(input.projectDir), input.target),
    );
  },
});

export const applyPartRemovalOperation = defineOperation({
  name: "apply_part_removal",
  title: "Apply reviewed stack part removal",
  description:
    "Applies an exact reviewed stack-part removal in a recoverable transaction. Architecture-sensitive removals require explicit acknowledgement.",
  input: z.object({
    projectDir: projectDirInput,
    target: z.string().describe("Exact stack part spec or ID returned by the removal plan"),
    reviewToken: z
      .string()
      .min(64)
      .max(64)
      .describe("Exact reviewToken returned by bfs_plan_part_removal"),
    acknowledgeArchitectureChange: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        "Required when the plan reports an architecture-sensitive removal; data and schema are not migrated automatically.",
      ),
  }),
  output: partRemovalOutputSchema,
  safety: "destructive",
  idempotent: false,
  openWorld: false,
  run: async (input) => {
    const { applyMcpPartRemoval } = await import("@/mcp/mcp-project-lifecycle.js");
    return projectPartRemovalPayload(
      await applyMcpPartRemoval(
        sanitizePath(input.projectDir),
        input.target,
        input.reviewToken,
        input.acknowledgeArchitectureChange,
      ),
    );
  },
});

export const planProjectAdoptionOperation = defineOperation({
  name: "plan_project_adoption",
  title: "Plan project adoption",
  description:
    "Builds a read-only adoption plan for a project without bts.lock.json. It reports likely Stack Parts, current-template evidence, explicit uncertainty, and a token bound to the exact config and project bytes.",
  input: z.object({ projectDir: projectDirInput }),
  output: projectAdoptionOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  run: async (input) => {
    const { planMcpProjectAdoption } = await import("@/mcp/mcp-project-lifecycle.js");
    return planMcpProjectAdoption(sanitizePath(input.projectDir));
  },
});

export const confirmProjectAdoptionOperation = defineOperation({
  name: "confirm_project_adoption",
  title: "Confirm project adoption",
  description:
    "Creates bts.lock.json only when the exact token from bfs_plan_project_adoption still matches. The baseline records adopted-unverified lineage and cannot establish historical upgrade support.",
  input: z.object({
    projectDir: projectDirInput,
    confirmationToken: z
      .string()
      .length(64)
      .describe("Exact confirmationToken returned by bfs_plan_project_adoption"),
  }),
  output: projectAdoptionOutputSchema,
  safety: "action",
  idempotent: false,
  openWorld: false,
  run: async (input) => {
    const { confirmMcpProjectAdoption } = await import("@/mcp/mcp-project-lifecycle.js");
    return confirmMcpProjectAdoption(sanitizePath(input.projectDir), input.confirmationToken);
  },
});

export const planProjectUpdateOperation = defineOperation({
  name: "plan_project_update",
  title: "Plan project update",
  description:
    "Plans current-template drift. Exact structured-merge content is returned up to 32 KiB per file; oversized content is withheld with size/hash metadata and no token. Manifest v2 provenance and transactional recovery eligibility are returned in the lifecycle contract.",
  input: z.object({ projectDir: projectDirInput }),
  output: projectUpdateOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  run: async (input) => {
    const { planMcpProjectUpdate } = await import("@/mcp/mcp-project-lifecycle.js");
    return planMcpProjectUpdate(sanitizePath(input.projectDir));
  },
});

export const applyProjectUpdateOperation = defineOperation({
  name: "apply_project_update",
  title: "Apply reviewed project update",
  description:
    "Applies actionable template files bound to a reviewed token in a recoverable transaction. Verified manifest-v2 projects need no lineage acknowledgement; migrated/adopted projects do.",
  input: z.object({
    projectDir: projectDirInput,
    reviewToken: z
      .string()
      .min(64)
      .max(64)
      .describe("Exact reviewToken returned by bfs_plan_project_update"),
    acknowledgeUnprovenManifestV1: z
      .boolean()
      .optional()
      .default(false)
      .describe("Required only when the plan reports unverified migrated/adopted lineage"),
  }),
  output: projectUpdateOutputSchema,
  safety: "destructive",
  idempotent: false,
  openWorld: false,
  run: async (input) => {
    const { applyMcpProjectUpdate } = await import("@/mcp/mcp-project-lifecycle.js");
    return applyMcpProjectUpdate(
      sanitizePath(input.projectDir),
      input.reviewToken,
      input.acknowledgeUnprovenManifestV1,
    );
  },
});

function withoutOperations<T extends { operations?: unknown; filesUnchanged?: unknown }>(
  result: T,
): Omit<T, "operations" | "filesUnchanged"> {
  const { operations: _operations, filesUnchanged: _filesUnchanged, ...payload } = result;
  return payload;
}

export const planPrimaryRoleReplacementOperation = defineOperation({
  name: "plan_primary_role_replacement",
  title: "Plan Primary Role replacement",
  description:
    "Plans replacement of one exact frontend, backend, mobile, or database Primary Role. It preserves stable custom identity, rewires compatible owner-scoped parts, and never writes.",
  input: z.object({
    projectDir: projectDirInput,
    target: z.string().describe("Exact selected Primary Role spec or stable ID"),
    replacement: z.string().describe("Replacement Stack Part spec with the same Primary Role"),
  }),
  output: stackUpdateOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  run: async (input) => {
    const { planPrimaryRoleReplacement } =
      await import("@/helpers/core/primary-role-replacement.js");
    const result = await planPrimaryRoleReplacement(
      sanitizePath(input.projectDir),
      input.target,
      input.replacement,
    );
    return result.success ? withoutOperations(result) : result;
  },
});

export const applyPrimaryRoleReplacementOperation = defineOperation({
  name: "apply_primary_role_replacement",
  title: "Apply Primary Role replacement",
  description:
    "Applies one reviewed Primary Role replacement with its exact token and migration acknowledgement. Cross-ecosystem owner capabilities remain outside the automatic boundary.",
  input: z.object({
    projectDir: projectDirInput,
    target: z.string().describe("Exact target from the reviewed replacement plan"),
    replacement: z.string().describe("Exact replacement from the reviewed plan"),
    reviewToken: z
      .string()
      .length(64)
      .describe("Exact reviewToken returned by bfs_plan_primary_role_replacement"),
    acknowledgeArchitectureChange: z
      .boolean()
      .default(false)
      .describe("Acknowledge the complete migration and application-data checklist"),
  }),
  output: stackUpdateOutputSchema,
  safety: "destructive",
  idempotent: false,
  openWorld: false,
  run: async (input) => {
    const { applyPrimaryRoleReplacement } =
      await import("@/helpers/core/primary-role-replacement.js");
    const result = await applyPrimaryRoleReplacement(
      sanitizePath(input.projectDir),
      input.target,
      input.replacement,
      input.reviewToken,
      input.acknowledgeArchitectureChange,
    );
    return result.success ? withoutOperations(result) : result;
  },
});

const stackUpdateInput = z.object(MCP_STACK_UPDATE_SCHEMA);

export const planStackUpdateOperation = defineOperation({
  name: "plan_stack_update",
  title: "Plan stack update",
  description:
    "Plans scaffold-time Stack Part and provider updates for an existing Better-Fullstack project. Supports the same fields as project creation and does not write files.",
  input: stackUpdateInput,
  output: stackUpdateOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  run: async (input) => {
    try {
      const safePath = sanitizePath(input.projectDir);
      const { projectDir: _projectDir, projectName: _projectName, ...requestedChanges } = input;
      const { planStackUpdate } = await import("@/helpers/core/stack-update.js");
      const plan = await planStackUpdate(safePath, requestedChanges);
      if (!plan.success) return plan;
      const compatibilityWarnings = compatibilityWarningsForStackUpdate(plan.proposedConfig);
      return {
        ...withoutOperations(plan),
        ...(plan.compatibilityAdjustments.length > 0
          ? { compatibilityAdjustments: plan.compatibilityAdjustments }
          : {}),
        ...(compatibilityWarnings ? { compatibilityWarnings } : {}),
        message:
          plan.manualReviewBlockers.length > 0
            ? "Plan created, but manual review is required before applying."
            : plan.requiresArchitectureAck
              ? `Plan created. This is an architecture change (${plan.architectureChanges
                  .map((change) => `${change.key}: ${change.from} -> ${change.to}`)
                  .join(
                    "; ",
                  )}); data and schema are NOT migrated automatically. Review migrationSteps, then call bfs_apply_stack_update with acknowledgeArchitectureChange: true, then run: ${plan.installCommand}`
              : `Plan created. If approved, call bfs_apply_stack_update, then run: ${plan.installCommand}`,
      };
    } catch (error) {
      return {
        success: false as const,
        projectDir: input.projectDir,
        error: `Plan stack update failed: ${errorMessage(error)}`,
      };
    }
  },
});

export const applyStackUpdateOperation = defineOperation({
  name: "apply_stack_update",
  title: "Apply stack update",
  description:
    "Applies a previously reviewed scaffold-time stack update to an existing Better-Fullstack project. Refuses to overwrite user-edited generated files and does not install dependencies.",
  input: stackUpdateInput,
  output: stackUpdateOutputSchema,
  safety: "action",
  idempotent: false,
  openWorld: false,
  run: async (input) => {
    const startTime = Date.now();
    const { projectDir: _projectDir, projectName: _projectName, ...requestedChanges } = input;
    try {
      const safePath = sanitizePath(input.projectDir);
      const { applyStackUpdate } = await import("@/helpers/core/stack-update.js");
      const result = await applyStackUpdate(safePath, requestedChanges);
      await trackEvent("stack_updated", requestedChanges, {
        source: "mcp",
        success: result.success,
        durationMs: Date.now() - startTime,
      });
      if (!result.success) return result;
      const compatibilityWarnings = compatibilityWarningsForStackUpdate(result.proposedConfig);
      return {
        ...withoutOperations(result),
        ...(result.compatibilityAdjustments.length > 0
          ? { compatibilityAdjustments: result.compatibilityAdjustments }
          : {}),
        ...(compatibilityWarnings ? { compatibilityWarnings } : {}),
        message: `Stack update applied. Dependencies were not installed; run: ${result.installCommand}`,
      };
    } catch (error) {
      await trackEvent("stack_updated", requestedChanges, {
        source: "mcp",
        success: false,
        errorName: error instanceof Error ? error.name : "UnknownError",
        durationMs: Date.now() - startTime,
      });
      return {
        success: false as const,
        projectDir: input.projectDir,
        error: `Apply stack update failed: ${errorMessage(error)}`,
      };
    }
  },
});

const additionInput = {
  projectDir: z.string().describe("Absolute path to the existing project directory"),
  part: z.array(z.string()).optional().describe("Canonical Stack Part bindings to add"),
  addons: z.array(AddonsSchema).optional().describe("Deprecated alias for tooling part bindings"),
  webDeploy: WebDeploySchema.optional().describe("Web deployment option"),
  serverDeploy: ServerDeploySchema.optional().describe("Server deployment option"),
};

export const planAdditionOperation = defineOperation({
  name: "plan_addition",
  title: "Plan feature addition",
  description:
    "Plans owner-scoped tooling capabilities and deployment changes for an existing project without writing files.",
  input: z.object(additionInput),
  output: planAdditionOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  failurePrefix: "Plan addition failed",
  run: async ({ projectDir, part, addons, webDeploy, serverDeploy }) => {
    const safePath = sanitizePath(projectDir);
    const requestedParts = mergeLegacyAddonParts(part, addons);
    const requestedRunner = (requestedParts ?? [])
      .map((spec) => spec.split(":")[2])
      .find((toolId) => toolId !== undefined && WORKSPACE_RUNNERS.has(toolId));
    const existingAddons = (await readBtsConfig(safePath))?.addons ?? [];
    const replacesWorkspaceRunner =
      requestedRunner !== undefined &&
      existingAddons.some((addon) => WORKSPACE_RUNNERS.has(addon) && addon !== requestedRunner);
    const { planStackUpdate } = await import("@/helpers/core/stack-update.js");
    const plan = await planStackUpdate(
      safePath,
      { part: requestedParts, webDeploy, serverDeploy },
      {
        includeVersionChannelPaths: true,
        removeObsoleteGeneratedArtifacts: replacesWorkspaceRunner,
      },
    );
    if (!plan.success) return plan;
    return {
      ...withoutOperations(plan),
      requestedParts: requestedParts ?? [],
      compatibilityWarnings: compatibilityWarningsForStackUpdate(plan.proposedConfig),
    };
  },
});

export const addFeatureOperation = defineOperation({
  name: "add_feature",
  title: "Add feature",
  description:
    "Adds owner-scoped tooling capabilities or deployment targets to an existing Better-Fullstack project. Dependencies are not installed. Call bfs_plan_addition first.",
  input: z.object({
    ...additionInput,
    packageManager: PackageManagerSchema.optional().describe("Package manager to use"),
  }),
  output: addFeatureOutputSchema,
  safety: "action",
  idempotent: false,
  openWorld: false,
  failurePrefix: "Add feature failed",
  run: async (input) => {
    const safePath = sanitizePath(input.projectDir);
    const { add } = await import("@/index.js");
    const configBefore = await readBtsConfig(safePath);
    const requestedParts = mergeLegacyAddonParts(input.part, input.addons);
    const addInput: AddInput = {
      part: requestedParts,
      webDeploy: input.webDeploy,
      serverDeploy: input.serverDeploy,
      projectDir: safePath,
      install: false,
      packageManager: input.packageManager,
    };
    const result = await add(addInput, { telemetrySource: "mcp" });
    if (!result?.success) {
      return {
        success: false as const,
        error: result?.error ?? "Add command returned no result",
        lifecycle: result?.lifecycle,
        recoveryId: result?.recoveryId,
      };
    }
    const existingConfig = await readBtsConfig(safePath);
    const graphPreview = existingConfig ? getMcpGraphPreview(existingConfig) : undefined;
    const ecosystem: ProjectConfig["ecosystem"] = existingConfig?.ecosystem ?? "typescript";
    const dirName = safePath.split("/").pop() ?? "project";
    const installCmd = getInstallCommand(
      ecosystem,
      dirName,
      input.packageManager,
      existingConfig?.javaBuildTool,
      existingConfig?.javaWebFramework,
      existingConfig?.pythonPackageManager,
    );
    return {
      success: true as const,
      addedCapabilities: diffAddedCapabilities(configBefore, existingConfig),
      projectDir: result.projectDir,
      lifecycle: result.lifecycle,
      recoveryId: result.recoveryId,
      ...graphPreview,
      message: `Applied the requested tooling capabilities. Tell the user to run: ${installCmd}`,
    };
  },
});
