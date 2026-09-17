import {
  EcosystemSchema,
  PackageManagerSchema,
  STARTER_TRACK_AUTH_IDS,
  STARTER_TRACK_DATABASE_IDS,
  STARTER_TRACK_DEPLOYMENT_TARGET_IDS,
  STARTER_TRACK_IDS,
  STARTER_TRACK_PACKAGE_MANAGER_IDS,
  STARTER_TRACK_RUNTIME_IDS,
  STARTER_TRACK_WORKSPACE_SHAPE_IDS,
} from "@better-fullstack/types";
import z from "zod";

import { lifecycleResultOutputSchema } from "@/mcp/mcp-lifecycle-output-schemas";

export const guidanceOutputSchema = z.object({
  lifecycleContract: z.object({
    currentVersion: z.literal("2"),
    supportedVersions: z.array(z.literal("2")),
    unknownVersionBehavior: z.string(),
  }),
  workflow: z.array(z.string()),
  ecosystems: z.record(z.string(), z.string()),
  fieldRules: z.record(z.string(), z.string()),
  ambiguityRules: z.array(z.string()),
  criticalConstraints: z.array(z.string()),
});

export const schemaOutputSchema = z.object({
  category: z.string().optional(),
  options: z.array(z.string()).optional(),
  categories: z.record(z.string(), z.array(z.string())).optional(),
  error: z.string().optional(),
});

export const compatibilityCapabilityReferenceOutputSchema = z.object({
  id: z.string(),
  category: z.string(),
  optionId: z.string(),
});

export const compatibilityExplanationOutputSchema = z.object({
  schemaVersion: z.literal(1),
  ruleId: z.string(),
  reason: z.string(),
  message: z.string(),
  capability: compatibilityCapabilityReferenceOutputSchema,
  owner: z.object({
    kind: z.enum(["stack-part", "capability"]),
    capability: compatibilityCapabilityReferenceOutputSchema,
    stackPart: z
      .object({
        id: z.string(),
        role: z.string(),
        ecosystem: z.string(),
        toolId: z.string(),
      })
      .nullable(),
  }),
  candidateStackPart: z
    .object({
      role: z.string(),
      ecosystem: z.string(),
    })
    .nullable(),
  alternatives: z.array(compatibilityCapabilityReferenceOutputSchema),
});

export const compatibilityIssueOutputSchema = z.object({
  code: z.string(),
  message: z.string(),
  category: z.string().optional(),
  optionId: z.string().optional(),
  provided: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  suggestions: z.array(z.string()).optional(),
  explanation: compatibilityExplanationOutputSchema.optional(),
});

export const compatibilityOutputSchema = z.object({
  adjustedStack: z.record(z.string(), z.unknown()).nullable(),
  changes: z.array(z.object({ category: z.string(), message: z.string() })),
  issues: z.array(compatibilityIssueOutputSchema),
  hasIssues: z.boolean(),
});

export const starterTrackOutputSchema = z.object({
  id: z.enum(STARTER_TRACK_IDS),
  name: z.string(),
  intent: z.string(),
  description: z.string(),
  presetId: z.string(),
  ecosystem: EcosystemSchema,
  icon: z.string(),
  guideHref: z.string(),
  docsHref: z.string(),
  highlights: z.array(z.string()),
  audience: z.string(),
  outcome: z.string(),
  ctaLabel: z.string(),
  selection: z.record(z.string(), z.unknown()),
  stackPartSpecs: z.array(z.string()),
  compatibility: z.object({
    valid: z.boolean(),
    issues: z.array(z.record(z.string(), z.unknown())),
  }),
  evidence: z.record(z.string(), z.unknown()),
  facets: z.object({
    runtimes: z.array(z.enum(STARTER_TRACK_RUNTIME_IDS)),
    deploymentTargets: z.array(z.enum(STARTER_TRACK_DEPLOYMENT_TARGET_IDS)),
    packageManagers: z.array(z.enum(STARTER_TRACK_PACKAGE_MANAGER_IDS)),
    databases: z.array(z.enum(STARTER_TRACK_DATABASE_IDS)),
    auth: z.array(z.enum(STARTER_TRACK_AUTH_IDS)),
    workspaceShapes: z.array(z.enum(STARTER_TRACK_WORKSPACE_SHAPE_IDS)),
  }),
});

export const starterTrackCatalogOutputSchema = z.object({
  schemaVersion: z.number(),
  filters: z.record(z.string(), z.string().optional()),
  ecosystem: EcosystemSchema.nullable(),
  trackId: z.enum(STARTER_TRACK_IDS).nullable(),
  total: z.number(),
  tracks: z.array(starterTrackOutputSchema),
});

export const starterTrackRecommendationOutputSchema = z.object({
  schemaVersion: z.literal(1),
  recommendationMode: z.literal("deterministic"),
  modelUsed: z.literal(false),
  track: starterTrackOutputSchema,
  matchedTerms: z.array(z.string()),
  score: z.number(),
  rationale: z.string(),
  constraints: z.array(z.string()),
  projectName: z.string(),
  reproducibleCommand: z.string(),
});

export const capabilityEvidenceOutputSchema = z.object({
  schemaVersion: z.number(),
  inventorySchemaVersion: z.number(),
  levels: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      proves: z.string(),
      doesNotProve: z.string(),
      requiredEvidence: z.array(z.string()),
    }),
  ),
  summary: z.object({
    totalOptions: z.number(),
    evidence: z.record(z.string(), z.number()),
    freshness: z.record(z.string(), z.number()),
  }),
  recipes: z.array(z.record(z.string(), z.unknown())),
  maintenanceCosts: z.array(
    z.object({
      recipeId: z.string(),
      flakyRuns: z.number(),
      repairMinutes: z.number(),
      dependencyChanges: z.number(),
      maintainerPresent: z.boolean(),
      recurringCostScore: z.number(),
    }),
  ),
  inventory: z.array(
    z.object({
      id: z.string(),
      ecosystem: z.string(),
      category: z.string(),
      optionId: z.string(),
      label: z.string(),
      maintenanceOwner: z.string(),
      maturity: z.string(),
      public: z.boolean(),
      declaredEvidenceLevel: z.string(),
      evidenceLevel: z.string(),
      freshness: z.string(),
      lastVerifiedVersion: z.string().nullable(),
      lastVerifiedAt: z.string().nullable(),
      limitation: z.string(),
      recipeIds: z.array(z.string()),
    }),
  ),
});

export const graphPreviewOutputShape = {
  graphSummary: z.string().optional(),
  effectiveStack: z.record(z.string(), z.string()).optional(),
  stackPartSpecs: z.array(z.string()).optional(),
};

export const planProjectOutputSchema = z.object({
  success: z.boolean(),
  fileCount: z.number().optional(),
  directoryCount: z.number().optional(),
  files: z.array(z.string()).optional(),
  ...graphPreviewOutputShape,
});

export const createProjectOutputSchema = z.object({
  success: z.boolean(),
  projectDirectory: z.string().optional(),
  fileCount: z.number().optional(),
  capabilityWarnings: z.array(z.string()).optional(),
  addonWarnings: z.array(z.string()).optional().describe("Deprecated alias of capabilityWarnings"),
  message: z.string().optional(),
  lifecycle: lifecycleResultOutputSchema.optional(),
  ...graphPreviewOutputShape,
});

export const addFeatureOutputSchema = z.object({
  success: z.boolean(),
  addedCapabilities: z.array(z.string()).optional(),
  projectDir: z.string().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
  lifecycle: lifecycleResultOutputSchema.optional(),
  recoveryId: z.string().optional(),
  ...graphPreviewOutputShape,
});

export const stackUpdateOutputSchema = z.object({
  success: z.boolean(),
  projectDir: z.string().optional(),
  error: z.string().optional(),
  requestedChanges: z.record(z.string(), z.unknown()).optional(),
  proposedConfig: z.record(z.string(), z.unknown()).optional(),
  filesToAdd: z.array(z.string()).optional(),
  filesToPatch: z.array(z.string()).optional(),
  filesToRemove: z.array(z.string()).optional(),
  dependencyChanges: z.record(z.string(), z.record(z.string(), z.string())).optional(),
  scriptChanges: z.record(z.string(), z.array(z.string())).optional(),
  envChanges: z.record(z.string(), z.array(z.string())).optional(),
  manualReviewBlockers: z.array(z.string()).optional(),
  architectureChanges: z
    .array(z.object({ key: z.string(), from: z.string(), to: z.string() }))
    .optional(),
  migrationSteps: z.array(z.string()).optional(),
  requiresArchitectureAck: z.boolean().optional(),
  compatibilityAdjustments: z.array(z.string()).optional(),
  compatibilityWarnings: z.array(z.string()).optional(),
  installCommand: z.string().optional(),
  message: z.string().optional(),
  lifecycle: lifecycleResultOutputSchema.optional(),
  recoveryId: z.string().optional(),
  applyAllowed: z.boolean().optional(),
  reviewToken: z.string().optional(),
  primaryReplacement: z
    .object({
      target: z.string(),
      replacement: z.string(),
      before: z.string(),
      after: z.string(),
      rewiredDependentParts: z.array(z.string()),
      configKeys: z.array(z.string()),
    })
    .optional(),
  ...graphPreviewOutputShape,
});

export const planAdditionOutputSchema = stackUpdateOutputSchema.extend({
  requestedParts: z.array(z.string()).optional(),
});

export const configDriftRepairOutputSchema = z.object({
  success: z.boolean(),
  mode: z.enum(["plan", "applied"]).optional(),
  projectDir: z.string(),
  packageManager: PackageManagerSchema.optional(),
  changed: z.boolean().optional(),
  changes: z
    .array(
      z.object({
        path: z.string(),
        action: z.enum(["add", "update", "remove"]),
        reason: z.string(),
      }),
    )
    .optional(),
  reviewToken: z.string().optional(),
  recoveryId: z.string().optional(),
  error: z.string().optional(),
  lifecycle: lifecycleResultOutputSchema.optional(),
});
