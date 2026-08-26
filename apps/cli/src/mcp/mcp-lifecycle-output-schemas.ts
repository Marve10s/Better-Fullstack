import { z } from "zod";

const lifecycleVersionsOutputSchema = z.object({
  cli: z.string(),
  generator: z.string(),
  templateSet: z.string(),
  schema: z.string(),
});

export const lifecycleResultOutputSchema = z.object({
  contractVersion: z.literal("2"),
  operation: z.enum([
    "create",
    "add",
    "remove",
    "replace",
    "doctor-fix",
    "stack-update",
    "template-update",
    "gen",
    "registry-add",
    "recover",
  ]),
  status: z.enum(["planned", "applied", "blocked", "failed", "rolled-back", "recovered"]),
  projectDir: z.string(),
  changes: z.object({
    added: z.number(),
    patched: z.number(),
    merged: z.number(),
    removed: z.number(),
    manual: z.number(),
  }),
  warnings: z.array(z.string()),
  blockers: z.array(z.string()),
  provenance: z.object({
    source: lifecycleVersionsOutputSchema.nullable(),
    target: lifecycleVersionsOutputSchema.nullable(),
    verified: z.boolean(),
  }),
  recovery: z.object({
    available: z.boolean(),
    transactionId: z.string().optional(),
    command: z.string().optional(),
    automaticRollback: z.boolean().optional(),
  }),
  affected: z.object({
    stackParts: z.array(z.string()),
    files: z.array(
      z.object({
        path: z.string(),
        action: z.enum(["create", "update", "merge", "remove"]),
        stackPartId: z.string().optional(),
      }),
    ),
    dependencies: z.array(
      z.object({
        name: z.string(),
        action: z.enum(["add", "update", "remove"]),
        version: z.string().optional(),
        target: z.string().optional(),
        dev: z.boolean().optional(),
      }),
    ),
  }),
  compatibilityDecisions: z.array(
    z.object({
      code: z.string(),
      message: z.string(),
      alternatives: z.array(z.string()),
    }),
  ),
  manualReviewReasons: z.array(z.string()),
  checks: z.array(
    z.object({
      id: z.string(),
      status: z.enum(["pass", "warn", "fail", "pending"]),
      message: z.string().optional(),
    }),
  ),
  sideEffects: z.array(
    z.object({
      kind: z.enum(["filesystem", "package-manager", "toolchain"]),
      status: z.enum(["planned", "applied", "failed", "restored", "manual", "not-run"]),
      description: z.string(),
      compensatingAction: z.string().optional(),
    }),
  ),
  history: z.object({
    recorded: z.boolean(),
    recoveryId: z.string().optional(),
  }),
  nextActions: z.array(z.string()),
});

const lifecyclePlanOutputSchema = lifecycleResultOutputSchema.extend({
  status: z.enum(["planned", "blocked"]),
  review: z.object({
    required: z.boolean(),
    token: z.string().optional(),
  }),
  preconditions: z.array(lifecycleResultOutputSchema.shape.checks.element),
});

const genPlannedFileOutputSchema = z.object({
  path: z.string(),
  action: z.enum(["create", "update"]),
  content: z.string(),
  preimageSha256: z.string().nullable(),
  postimageSha256: z.string(),
});

export const genMutationOutputSchema = z.object({
  success: z.boolean(),
  status: z.enum(["planned", "created", "blocked", "unsupported", "rolled-back", "failed"]),
  message: z.string(),
  projectDir: z.string().optional(),
  recipeId: z.string().optional(),
  adapterId: z.string().optional(),
  adapterVersion: z.number().int().positive().optional(),
  maintenanceOwner: z.string().optional(),
  persistent: z.boolean().optional(),
  resourceFile: z.string().optional(),
  routerIndexFile: z.string().optional(),
  registered: z.boolean().optional(),
  files: z.array(genPlannedFileOutputSchema).optional(),
  checks: z
    .array(
      z.object({
        id: z.string(),
        command: z.string().optional(),
        description: z.string(),
      }),
    )
    .optional(),
  migrationGuidance: z.array(z.string()).optional(),
  reviewToken: z.string().optional(),
  operationPlan: lifecyclePlanOutputSchema.optional(),
  lifecycle: lifecycleResultOutputSchema.optional(),
  recoveryId: z.string().optional(),
});

const registryPlannedFileOutputSchema = z.object({
  path: z.string(),
  action: z.enum(["create", "update"]),
  content: z.string(),
  preimageSha256: z.string().nullable(),
  postimageSha256: z.string(),
});

export const registryMutationOutputSchema = z.object({
  success: z.boolean(),
  mode: z.enum(["plan", "applied", "blocked", "rolled-back", "failed"]),
  pack: z.object({ name: z.string(), version: z.string() }),
  source: z.string(),
  filesWritten: z.array(z.string()),
  filesSkipped: z.array(z.string()),
  dependencies: z.array(
    z.object({
      dir: z.string(),
      name: z.string(),
      version: z.string(),
      dev: z.boolean(),
    }),
  ),
  envKeys: z.array(z.string()),
  envFile: z.string().optional(),
  dryRun: z.boolean(),
  files: z.array(registryPlannedFileOutputSchema),
  reviewToken: z.string().optional(),
  operationPlan: lifecyclePlanOutputSchema.optional(),
  lifecycle: lifecycleResultOutputSchema,
  recoveryId: z.string().optional(),
  error: z.string().optional(),
});

const projectCheckOutputSchema = z.object({
  label: z.string(),
  status: z.enum(["pass", "warn", "fail"]),
  detail: z.string().optional(),
  targetId: z.string().optional(),
});

const generatedCommandOutputSchema = z.object({
  command: z.string(),
  args: z.array(z.string()),
  display: z.string(),
});

const generatedTargetOutputSchema = z.object({
  id: z.string(),
  role: z.enum(["frontend", "backend", "mobile", "database", "workspace"]),
  ecosystem: z.string(),
  toolId: z.string(),
  projectDir: z.string(),
  sourcePartId: z.string().optional(),
  status: z.enum(["pass", "fail"]),
  executed: z.boolean(),
  toolchain: z.string(),
  commands: z.array(generatedCommandOutputSchema),
  executedCommands: z.array(z.string()),
  reason: z.string(),
});

const lifecyclePrerequisitesOutputSchema = z.object({
  manifest: z.object({
    present: z.boolean(),
    state: z.enum(["missing", "valid", "invalid"]),
    version: z.string().optional(),
    error: z.string().optional(),
    currentContractSupported: z.boolean(),
  }),
  config: z.object({
    version: z.string().optional(),
    currentVersion: z.string(),
    exactCurrentVersion: z.boolean(),
  }),
  wave1: z.object({
    ready: z.boolean(),
    generatorProvenance: z.enum(["verified", "unverified"]),
    recovery: z.enum(["available", "unavailable"]),
    blockers: z.array(z.string()),
  }),
});

const projectInspectionOutputShape = {
  success: z.boolean(),
  projectDir: z.string(),
  ok: z.boolean(),
  error: z.string().optional(),
  ecosystem: z.string().optional(),
  graphSummary: z.string().optional(),
  stackPartSpecs: z.array(z.string()).optional(),
  verification: z
    .object({
      requested: z.boolean(),
      complete: z.boolean(),
      expectedTargets: z.number(),
      executedTargets: z.number(),
      failedTargets: z.number(),
    })
    .optional(),
  summary: z.record(z.string(), z.number()).optional(),
  checks: z.array(projectCheckOutputSchema).optional(),
  targets: z.array(generatedTargetOutputSchema).optional(),
  prerequisites: lifecyclePrerequisitesOutputSchema.optional(),
};

const projectUpgradeOutputSchema = z.object({
  available: z.boolean(),
  actionable: z.boolean(),
  applyAllowed: z.boolean(),
  guarantee: z
    .enum(["verified-manifest-v2-recoverable", "unverified-origin-recoverable"])
    .optional(),
  requiresFullReview: z.boolean(),
  summary: z
    .object({
      drift: z.number(),
      merged: z.number(),
      newFiles: z.number(),
      localEdits: z.number(),
      conflicts: z.number(),
      manualReview: z.number(),
      removedByTemplate: z.number(),
    })
    .optional(),
  error: z.string().optional(),
  blockers: z.array(z.string()),
});

const updateSupportOutputSchema = z.object({
  schemaVersion: z.literal(1),
  policyStatus: z.enum(["qualification", "active"]),
  supportedFrom: z.string().nullable(),
  supportedTo: z.string().nullable(),
  sourceVersion: z.string().nullable(),
  targetVersion: z.string(),
  eligibility: z.enum(["same-release", "supported", "manual-review-required"]),
  eligible: z.boolean(),
  historicalUpgrade: z.boolean(),
  requiresManualReview: z.boolean(),
  reasonCode: z.enum([
    "same-release",
    "supported-window",
    "policy-invalid",
    "manifest-v2-required",
    "verified-lineage-required",
    "source-version-missing",
    "window-not-qualified",
    "target-outside-policy",
    "source-outside-window",
  ]),
  reason: z.string(),
});

const recipeArtifactCheckOutputSchema = z.object({
  id: z.string(),
  status: z.enum(["pass", "fail"]),
  path: z.string().optional(),
  message: z.string(),
});

const recipeRecoveryPointSummaryOutputSchema = z.object({
  id: z.string(),
  valid: z.boolean(),
  recoverable: z.boolean(),
  operation: z.string().optional(),
  status: z.string().optional(),
  createdAt: z.string().optional(),
  completedAt: z.string().optional(),
  fileCount: z.number().optional(),
  errors: z.array(z.string()),
});

export const recipesOutputSchema = z.discriminatedUnion("action", [
  z.object({
    schemaVersion: z.literal(1),
    action: z.literal("check"),
    success: z.boolean(),
    recipes: z.array(
      z.object({
        recipeId: z.string(),
        adapterId: z.string(),
        ok: z.boolean(),
        checks: z.array(recipeArtifactCheckOutputSchema),
      }),
    ),
  }),
  z.object({
    schemaVersion: z.literal(1),
    action: z.literal("history"),
    success: z.literal(true),
    recipes: z.array(
      z.object({
        recipeId: z.string(),
        name: z.string(),
        adapterId: z.string(),
        persistent: z.boolean(),
        recoveryPoints: z.array(recipeRecoveryPointSummaryOutputSchema),
      }),
    ),
  }),
]);

const selectedEvidenceOutputSchema = z.object({
  level: z.enum(["listed", "generated", "build-verified", "runtime-verified"]),
  declaredLevel: z.enum(["listed", "generated", "build-verified", "runtime-verified"]),
  maturity: z.enum(["stable", "experimental", "quarantined"]),
  freshness: z.enum([
    "unverified",
    "current",
    "stale",
    "producer-mismatch",
    "failed",
    "quarantined",
  ]),
  maintenanceOwner: z.string(),
  limitation: z.string(),
  recipeIds: z.array(z.string()),
});

const contextStackPartOutputSchema = z.object({
  id: z.string(),
  spec: z.string(),
  role: z.string(),
  ecosystem: z.string(),
  toolId: z.string(),
  source: z.string(),
  ownerPartId: z.string().nullable(),
  ownerPartSpec: z.string().nullable(),
  targetPath: z.string().nullable(),
  evidence: selectedEvidenceOutputSchema.nullable(),
});

export const projectContextOutputSchema = z.object({
  schemaVersion: z.literal(1),
  documentType: z.literal("better-fullstack/project-context"),
  project: z.object({
    configVersion: z.string(),
    currentCliVersion: z.string(),
    ecosystem: z.string(),
    packageManager: z.string(),
    workspaceShape: z.string(),
    versionChannel: z.string(),
    installedVersionReferences: z.array(z.string()),
  }),
  roles: z.array(contextStackPartOutputSchema),
  capabilities: z.array(contextStackPartOutputSchema),
  compatibility: z.object({
    valid: z.boolean(),
    issues: z.array(
      z.object({
        code: z.string(),
        message: z.string(),
        partId: z.string().nullable(),
        role: z.string().nullable(),
        toolId: z.string().nullable(),
        alternatives: z.array(z.string()),
      }),
    ),
  }),
  evidence: z.object({
    inventorySchemaVersion: z.literal(1),
    selected: z.array(
      z.object({
        partId: z.string(),
        evidence: selectedEvidenceOutputSchema.nullable(),
      }),
    ),
  }),
  recipes: z.array(
    z.object({
      recipeId: z.string(),
      adapterId: z.string(),
      adapterVersion: z.number().int().positive(),
      maintenanceOwner: z.string(),
      persistent: z.boolean(),
      ownerPartId: z.string().nullable(),
      ownerPartSpec: z.string().nullable(),
      ownedPaths: z.array(z.string()),
      checks: z.array(
        z.object({ id: z.string(), command: z.string().optional(), description: z.string() }),
      ),
    }),
  ),
  updateSupport: updateSupportOutputSchema,
  commands: z.array(z.object({ id: z.string(), command: z.string(), mutates: z.literal(false) })),
  safeNextActions: z.array(z.object({ id: z.string(), command: z.string(), reason: z.string() })),
});

export const projectStatusOutputSchema = z.object({
  ...projectInspectionOutputShape,
  updateSupport: updateSupportOutputSchema.optional(),
  upgrade: projectUpgradeOutputSchema.optional(),
});

export const projectVerificationOutputSchema = z.object(projectInspectionOutputShape);

const architectureChangeOutputSchema = z.object({
  key: z.string(),
  from: z.string(),
  to: z.string(),
});

export const partRemovalOutputSchema = z.object({
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
  architectureChanges: z.array(architectureChangeOutputSchema).optional(),
  migrationSteps: z.array(z.string()).optional(),
  requiresArchitectureAck: z.boolean().optional(),
  compatibilityAdjustments: z.array(z.string()).optional(),
  installCommand: z.string().optional(),
  graphSummary: z.string().optional(),
  effectiveStack: z.record(z.string(), z.string()).optional(),
  stackPartSpecs: z.array(z.string()).optional(),
  removal: z
    .object({
      target: z.string(),
      selectedPart: z.string(),
      configKeys: z.array(z.string()),
    })
    .optional(),
  applyAllowed: z.boolean().optional(),
  reviewToken: z.string().optional(),
  recoveryId: z.string().optional(),
  lifecycle: lifecycleResultOutputSchema.optional(),
});

const reviewContentOutputSchema = z.union([
  z.object({
    status: z.literal("complete"),
    contentBytes: z.number(),
    contentSha256: z.string(),
  }),
  z.object({
    status: z.literal("withheld-oversize"),
    contentBytes: z.number(),
    contentSha256: z.string(),
    contentLimitBytes: z.number(),
  }),
  z.object({ status: z.literal("withheld-unavailable") }),
]);

const upgradeFileOutputSchema = z.object({
  path: z.string(),
  category: z.enum([
    "unchanged",
    "drift",
    "user-edited",
    "conflict",
    "manual",
    "merged",
    "new-file",
    "removed",
  ]),
  reason: z.string().optional(),
  preserveBaseline: z.boolean().optional(),
  mergedContent: z.string().optional(),
  dependencyChanges: lifecycleResultOutputSchema.shape.affected.shape.dependencies.optional(),
  reviewContent: reviewContentOutputSchema.optional(),
});

const upgradePlanOutputSchema = z.object({
  success: z.literal(true),
  projectDir: z.string(),
  projectRealpath: z.string(),
  configHash: z.string(),
  manifestHash: z.string().nullable(),
  hasBaseline: z.boolean(),
  manifestState: z.enum(["missing", "valid", "invalid"]),
  manifestError: z.string().optional(),
  manifestVersion: z.string().optional(),
  baselineCreatedAt: z.string().optional(),
  files: z.array(upgradeFileOutputSchema),
  unchanged: z.array(z.string()),
  drift: z.array(z.string()),
  userEdited: z.array(z.string()),
  conflicts: z.array(z.string()),
  manual: z.array(upgradeFileOutputSchema),
  merged: z.array(z.string()),
  newFiles: z.array(z.string()),
  removed: z.array(z.string()),
  actionable: z.array(z.string()),
  actionableHashes: z.record(z.string(), z.string()),
  actionablePreimages: z.record(z.string(), z.string()),
  lifecycle: lifecycleResultOutputSchema,
});

export const projectUpdateOutputSchema = z.object({
  ...upgradePlanOutputSchema.partial().shape,
  success: z.boolean(),
  projectDir: z.string().optional(),
  error: z.string().optional(),
  blockers: z.array(z.string()).optional(),
  plan: upgradePlanOutputSchema.optional(),
  reviewToken: z.string().optional(),
  applyAllowed: z.boolean().optional(),
  requiresUnprovenManifestV1Acknowledgement: z.boolean().optional(),
  guarantee: z
    .enum(["verified-manifest-v2-recoverable", "unverified-origin-recoverable"])
    .optional(),
  applied: z
    .object({
      patched: z.array(z.string()),
      added: z.array(z.string()),
      merged: z.array(z.string()),
    })
    .optional(),
  recoveryId: z.string().optional(),
});

const adoptionStackPartOutputSchema = z.object({
  spec: z.string(),
  id: z.string(),
  role: z.string(),
  ecosystem: z.string(),
  toolId: z.string(),
  declaredSource: z.enum(["selected", "defaulted", "provided", "legacy", "adjusted"]),
  confidence: z.enum(["medium", "low"]),
  basis: z.enum(["explicit-stack-graph", "legacy-config-inference"]),
  uncertainty: z.string(),
});

export const projectAdoptionOutputSchema = z.object({
  success: z.boolean(),
  projectDir: z.string(),
  error: z.string().optional(),
  schemaVersion: z.literal(1).optional(),
  mode: z.enum(["plan", "adopted"]).optional(),
  manifestState: z.literal("missing").optional(),
  adopted: z.boolean().optional(),
  provenanceState: z.literal("adopted-unverified").optional(),
  confirmationRequired: z.literal(true).optional(),
  confirmationToken: z.string().optional(),
  configHash: z.string().optional(),
  projectStateHash: z.string().optional(),
  likelyStackParts: z.array(adoptionStackPartOutputSchema).optional(),
  templateEvidence: z
    .object({
      expectedFiles: z.number(),
      presentFiles: z.number(),
      exactMatches: z.number(),
      divergentFiles: z.number(),
      missingFiles: z.number(),
      extraFiles: z.number(),
      exactMatchRatio: z.number(),
      divergentPaths: z.array(z.string()),
      missingPaths: z.array(z.string()),
      extraPaths: z.array(z.string()),
    })
    .optional(),
  uncertainty: z.array(z.string()).optional(),
  plannedWrites: z
    .array(z.object({ path: z.literal("bts.lock.json"), effect: z.literal("create") }))
    .optional(),
  manifest: z
    .object({
      version: z.literal("2"),
      provenanceState: z.literal("adopted-unverified"),
      fileCount: z.number(),
    })
    .optional(),
});

const recoveryFileOutputSchema = z.union([
  z.object({ path: z.string(), state: z.literal("absent") }),
  z.object({
    path: z.string(),
    state: z.literal("file"),
    sha256: z.string(),
    mode: z.number().optional(),
  }),
]);

const recoveryMetadataOutputSchema = z.object({
  version: z.literal(1),
  id: z.string(),
  operation: z.enum([
    "create",
    "add",
    "remove",
    "replace",
    "doctor-fix",
    "stack-update",
    "template-update",
    "gen",
    "registry-add",
    "recover",
  ]),
  createdAt: z.string(),
  completedAt: z.string().optional(),
  status: z.enum(["pending", "applied", "rolled-back", "recovered"]),
  files: z.array(recoveryFileOutputSchema),
  outputs: z.record(z.string(), z.string().nullable()).optional(),
  outputModes: z.record(z.string(), z.number()).optional(),
});

const recoveryPointVerificationOutputSchema = z.object({
  id: z.string(),
  valid: z.boolean(),
  recoverable: z.boolean(),
  errors: z.array(z.string()),
  metadata: recoveryMetadataOutputSchema.optional(),
});

const recoveryPointSummaryOutputSchema = z.object({
  id: z.string(),
  valid: z.boolean(),
  recoverable: z.boolean(),
  operation: lifecycleResultOutputSchema.shape.operation.optional(),
  status: recoveryMetadataOutputSchema.shape.status.optional(),
  createdAt: z.string().optional(),
  completedAt: z.string().optional(),
  fileCount: z.number().optional(),
  errors: z.array(z.string()),
});

const recoveryPruneOutputSchema = z.object({
  projectDir: z.string(),
  applied: z.boolean(),
  candidates: z.array(z.string()),
  pruned: z.array(z.string()),
  retained: z.array(z.string()),
  invalid: z.array(z.string()),
  reviewToken: z.string().optional(),
});

export const recoveryManagementOutputSchema = z.object({
  success: z.boolean(),
  action: z.enum(["list", "show", "verify", "apply", "prune"]),
  projectDir: z.string(),
  error: z.string().optional(),
  points: z.array(recoveryPointSummaryOutputSchema).optional(),
  verification: recoveryPointVerificationOutputSchema.optional(),
  prune: recoveryPruneOutputSchema.optional(),
  transaction: recoveryMetadataOutputSchema.optional(),
  lifecycle: lifecycleResultOutputSchema.optional(),
});

export const recoveryOutputSchema = z.object({
  success: z.boolean(),
  projectDir: z.string(),
  error: z.string().optional(),
  transaction: recoveryMetadataOutputSchema.optional(),
  lifecycle: lifecycleResultOutputSchema.optional(),
});
