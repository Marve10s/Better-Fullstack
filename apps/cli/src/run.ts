import {
  CAPABILITY_EVIDENCE_LEVEL_IDS,
  STARTER_TRACK_AUTH_IDS,
  STARTER_TRACK_DATABASE_IDS,
  STARTER_TRACK_DEPLOYMENT_TARGET_IDS,
  STARTER_TRACK_IDS,
  STARTER_TRACK_PACKAGE_MANAGER_IDS,
  STARTER_TRACK_RUNTIME_IDS,
  STARTER_TRACK_WORKSPACE_SHAPE_IDS,
  type StarterTrackFilters,
} from "@better-fullstack/types";
import { intro, log } from "@clack/prompts";
import { createRouterClient, os } from "@orpc/server";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import pc from "picocolors";
import { createCli } from "trpc-cli";
import z from "zod";

import type { AddResult } from "@/helpers/core/add-handler";
import type { TelemetrySource } from "@/telemetry/analytics";

import { getCompatibilityExplanationResult } from "@/commands/stack/compatibility";
import {
  getStarterTrackRecommendation,
  getStarterTracksResult,
} from "@/commands/stack/starter-tracks";
import { historyHandler } from "@/commands/system/history";
import { telemetryHandler } from "@/commands/system/telemetry";
import { BUILDER_URL } from "@/constants";
import { CreateCommandInputSchema, CreateCommandOptionsSchema } from "@/create-command-input";
import { createProjectHandler } from "@/helpers/core/command-handlers";
import { getLatestCLIVersion } from "@/platform/get-latest-cli-version";
import { openUrl } from "@/platform/open-url";
import { CLIError, handleError } from "@/presentation/errors";
import { renderTitle } from "@/presentation/render-title";
import { displaySponsors, fetchSponsors } from "@/presentation/sponsors";
import { getCapabilityEvidenceReport } from "@/project/capability-evidence";
import { getExpectedCapabilityProducerFingerprint } from "@/project/capability-producer";
import { statusFromCommandResult, withCommandTelemetry } from "@/telemetry/analytics";
import {
  type AddInput,
  AISchema,
  type API,
  APISchema,
  AstroIntegrationSchema,
  type Auth,
  AuthSchema,
  type Backend,
  BackendSchema,
  type BetterTStackConfig,
  type CreateInput,
  type CSSFramework,
  CSSFrameworkSchema,
  type Database,
  DatabaseSchema,
  type DatabaseSetup,
  DatabaseSetupSchema,
  type DirectoryConflict,
  DirectoryConflictSchema,
  type Ecosystem,
  EcosystemSchema,
  type Effect,
  EffectSchema,
  EmailSchema,
  type Examples,
  FileUploadSchema,
  ExamplesSchema,
  FormsSchema,
  type Frontend,
  FrontendSchema,
  type InitResult,
  type ORM,
  ORMSchema,
  type PackageManager,
  PackageManagerSchema,
  VersionChannelSchema,
  type Payments,
  PaymentsSchema,
  type ProjectConfig,
  ProjectNameSchema,
  type Runtime,
  RuntimeSchema,
  type ServerDeploy,
  ServerDeploySchema,
  StateManagementSchema,
  type Template,
  TemplateSchema,
  TestingSchema,
  type UILibrary,
  UILibrarySchema,
  ValidationSchema,
  type WebDeploy,
  WebDeploySchema,
  RealtimeSchema,
  type Realtime,
  JobQueueSchema,
  AnimationSchema,
  type Animation,
  LoggingSchema,
  type Logging,
  ObservabilitySchema,
  FeatureFlagsSchema,
  AnalyticsSchema,
  type Analytics,
  CMSSchema,
  type CMS,
  CachingSchema,
  type Caching,
  I18nSchema,
  type I18n,
  SearchSchema,
  FileStorageSchema,
  RustWebFrameworkSchema,
  type RustWebFramework,
  RustFrontendSchema,
  type RustFrontend,
  RustOrmSchema,
  type RustOrm,
  RustApiSchema,
  type RustApi,
  RustCliSchema,
  type RustCli,
  RustLibrariesSchema,
  type RustLibraries,
  RustLoggingSchema,
  type RustLogging,
  RustErrorHandlingSchema,
  RustCachingSchema,
  RustAuthSchema,
  type RustErrorHandling,
  type RustCaching,
  type RustAuth,
  PythonWebFrameworkSchema,
  type PythonWebFramework,
  PythonOrmSchema,
  type PythonOrm,
  PythonValidationSchema,
  type PythonValidation,
  PythonAiSchema,
  type PythonAi,
  PythonAuthSchema,
  type PythonAuth,
  PythonTaskQueueSchema,
  type PythonTaskQueue,
  PythonGraphqlSchema,
  type PythonGraphql,
  PythonQualitySchema,
  type PythonQuality,
  GoWebFrameworkSchema,
  type GoWebFramework,
  GoOrmSchema,
  type GoOrm,
  GoApiSchema,
  type GoApi,
  GoCliSchema,
  type GoCli,
  GoLoggingSchema,
  type GoLogging,
  GoAuthSchema,
  type GoAuth,
  JavaWebFrameworkSchema,
  type JavaWebFramework,
  JavaBuildToolSchema,
  type JavaBuildTool,
  JavaLibrariesSchema,
  type JavaLibraries,
  JavaOrmSchema,
  type JavaOrm,
  JavaAuthSchema,
  type JavaAuth,
  JavaTestingLibrariesSchema,
  type JavaTestingLibraries,
  type ElixirWebFramework,
  type ElixirOrm,
  type ElixirAuth,
  type ElixirApi,
  type ElixirRealtime,
  type ElixirJobs,
  type ElixirValidation,
  type ElixirHttp,
  type ElixirJson,
  type ElixirEmail,
  type ElixirCaching,
  type ElixirObservability,
  type ElixirTesting,
  type ElixirQuality,
  type ElixirDeploy,
  OPTION_CATEGORY_METADATA,
  AiDocsSchema,
  type AiDocs,
  ShadcnBaseSchema,
  ShadcnStyleSchema,
  ShadcnIconLibrarySchema,
  ShadcnColorThemeSchema,
  ShadcnBaseColorSchema,
  ShadcnFontSchema,
  ShadcnRadiusSchema,
} from "@/types";

const OPTION_ENTRY_COUNT = Object.values(OPTION_CATEGORY_METADATA).reduce(
  (sum, metadata) => sum + metadata.options.length,
  0,
);

const AddCommandInputSchema = CreateCommandOptionsSchema.omit({
  template: true,
  shape: true,
  fromHistory: true,
  config: true,
  yes: true,
  yolo: true,
  verbose: true,
  verify: true,
  git: true,
  directoryConflict: true,
  renderTitle: true,
  disableAnalytics: true,
  manualDb: true,
  // Workspace shape is a create-time structural choice, not a stack update.
  workspaceShape: true,
}).extend({
  projectDir: z.string().optional().describe("Project directory (defaults to current)"),
  json: z.boolean().optional().default(false).describe("Output the result as JSON"),
  acknowledgeArchitectureChange: z
    .boolean()
    .optional()
    .describe(
      "Acknowledge that this update replaces an existing database/orm/auth/api/backend/runtime choice (data/schema migration required)",
    ),
});

const ProjectCheckInputSchema = z.tuple([
  z.string().optional().describe("Project directory to diagnose (defaults to current directory)"),
  z.object({
    skipChecks: z
      .boolean()
      .optional()
      .default(false)
      .describe("Skip the ecosystem build/type checks (config + deps + env only)"),
    runChecks: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        "With --json: execute the ecosystem checks (slower; failures change the exit code)",
      ),
    json: z.boolean().optional().default(false).describe("Output the diagnosis as JSON"),
    supportBundle: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        "Output a privacy-safe support bundle without project paths, filenames, raw errors, code, prompts, URLs, or secrets",
      ),
    fix: z
      .boolean()
      .optional()
      .default(false)
      .describe("Plan canonical graph/config drift repair without writing"),
    apply: z
      .boolean()
      .optional()
      .default(false)
      .describe("With --fix: apply the reviewed repair in a recovery transaction"),
    reviewToken: z
      .string()
      .optional()
      .describe("With --fix --apply: exact token emitted by the current repair plan"),
  }),
]);

export const router = os.router({
  create: os
    .meta({
      description: `Scaffold a new Better Fullstack project from ${OPTION_ENTRY_COUNT} compatible stack options`,
      default: true,
      negateBooleans: true,
    })
    .input(CreateCommandInputSchema)
    .handler(async ({ input }) => {
      const [projectName, options] = input;
      const combinedInput = {
        projectName,
        ...options,
      };
      const telemetrySource =
        options.yes || options.part?.length || options.config || options.fromHistory !== undefined
          ? "cli-flags"
          : "cli-interactive";
      const result = await withCommandTelemetry(
        "create",
        () => createProjectHandler(combinedInput),
        {
          source: telemetrySource,
          mode: options.dryRun ? "dry-run" : options.yes ? "defaults" : "create",
          dimensions: {
            decision_stage: "create",
            selected_evidence_level: "listed",
            selection_problem: "reliability",
          },
          disableAnalytics: options.disableAnalytics,
          resultStatus: statusFromCommandResult,
        },
      );

      if (options.verbose) {
        return result;
      }
    }),
  sponsors: os.meta({ description: "Show Better Fullstack sponsors" }).handler(async () => {
    await withCommandTelemetry(
      "sponsors",
      async () => {
        try {
          renderTitle();
          intro(pc.magenta("Better Fullstack Sponsors"));
          const sponsors = await fetchSponsors();
          displaySponsors(sponsors);
        } catch (error) {
          handleError(error, "Failed to display sponsors");
        }
      },
      { source: "cli-flags" },
    );
  }),
  docs: os.meta({ description: "Open Better Fullstack documentation" }).handler(async () => {
    const DOCS_URL = "https://better-fullstack.dev/docs";
    await withCommandTelemetry(
      "docs",
      async () => {
        try {
          await openUrl(DOCS_URL);
          log.success(pc.blue("Opened docs in your default browser."));
        } catch {
          log.message(`Please visit ${DOCS_URL}`);
        }
      },
      { source: "cli-flags" },
    );
  }),
  builder: os
    .meta({ description: "Open the interactive web-based stack builder at better-fullstack.dev" })
    .handler(async () => {
      await withCommandTelemetry(
        "builder",
        async () => {
          try {
            await openUrl(BUILDER_URL);
            log.success(pc.blue("Opened builder in your default browser."));
          } catch {
            log.message(`Please visit ${BUILDER_URL}`);
          }
        },
        { source: "cli-flags" },
      );
    }),
  add: os
    .meta({
      description:
        "Add deployment targets or typed stack capabilities to an existing Better Fullstack project using its bts.jsonc config",
    })
    .input(AddCommandInputSchema)
    .handler(async ({ input }) => {
      const { addHandler } = await import("@/helpers/core/add-handler.js");
      const hasExplicitSelection = Object.entries(input).some(([key, value]) => {
        if (["projectDir", "install", "dryRun", "json"].includes(key)) return false;
        if (value === undefined || value === false) return false;
        return !Array.isArray(value) || value.length > 0;
      });
      await withCommandTelemetry(
        "add",
        async () => {
          const result = await addHandler(input as AddInput, { silent: input.json });
          if (input.json) console.log(JSON.stringify(result, null, 2));
          return result;
        },
        {
          source: hasExplicitSelection || input.dryRun ? "cli-flags" : "cli-interactive",
          mode: (input as { dryRun?: boolean }).dryRun ? "dry-run" : "apply",
          resultStatus: statusFromCommandResult,
          resultDetails: (commandResult) => ({
            capabilityCount: commandResult?.addedAddons.length,
            warningCount: commandResult?.setupWarnings?.length,
          }),
        },
      );
    }),
  status: os
    .meta({
      description:
        "Report project health, lifecycle provenance/recovery readiness, and current-template upgrade status without executing toolchains",
    })
    .input(
      z.tuple([
        z.string().optional().describe("Project directory to inspect (defaults to current)"),
        z.object({
          json: z.boolean().optional().default(false).describe("Output the report as JSON"),
        }),
      ]),
    )
    .handler(async ({ input }) => {
      const [projectDir, options] = input;
      const { statusCommand } = await import("@/commands/lifecycle/status.js");
      await withCommandTelemetry(
        "status",
        () => statusCommand({ projectDir, json: options.json }),
        {
          source: "cli-flags",
          mode: options.json ? "json" : "human",
          resultStatus: statusFromCommandResult,
          resultDetails: (result) => ({
            issueCount: result.success ? result.summary.fail : 1,
            warningCount: result.success ? result.summary.warn : 0,
          }),
        },
      );
    }),
  remove: os
    .meta({
      description:
        "Plan or apply removal of one exact selected non-primary Stack Part with a review token and transactional recovery",
    })
    .input(
      z.tuple([
        z
          .string()
          .describe("Exact selected Stack Part spec or ID, as shown by status/MCP project status"),
        z.object({
          projectDir: z.string().optional().describe("Project directory (defaults to current)"),
          apply: z.boolean().optional().default(false).describe("Apply the reviewed removal"),
          reviewToken: z.string().optional().describe("Exact token emitted by the latest plan"),
          acknowledgeArchitectureChange: z
            .boolean()
            .optional()
            .default(false)
            .describe("Acknowledge migration steps for architecture-sensitive capability removal"),
          json: z.boolean().optional().default(false).describe("Output the result as JSON"),
        }),
      ]),
    )
    .handler(async ({ input }) => {
      const [target, options] = input;
      const { removeCommand } = await import("@/commands/stack/remove.js");
      await withCommandTelemetry("remove", () => removeCommand({ target, ...options }), {
        source: "cli-flags",
        mode: options.apply ? "apply" : "dry-run",
        resultStatus: statusFromCommandResult,
        resultDetails: (result) => ({
          changedFileCount: result.success
            ? result.filesToAdd.length + result.filesToPatch.length + result.filesToRemove.length
            : 0,
          manualReviewCount: result.success ? result.manualReviewBlockers.length : 0,
        }),
      });
    }),
  replace: os
    .meta({
      description:
        "Plan or apply replacement of one exact Primary Role Stack Part with dependent-owner rewiring, migration warnings, a review token, and transactional recovery",
    })
    .input(
      z.tuple([
        z
          .string()
          .describe("Exact selected Primary Role Stack Part spec or ID, as shown by status"),
        z
          .string()
          .describe(
            "Replacement Primary Role spec with the same role, such as frontend:typescript:next",
          ),
        z.object({
          projectDir: z.string().optional().describe("Project directory (defaults to current)"),
          apply: z.boolean().optional().default(false).describe("Apply the reviewed replacement"),
          reviewToken: z.string().optional().describe("Exact token emitted by the latest plan"),
          acknowledgeArchitectureChange: z
            .boolean()
            .optional()
            .default(false)
            .describe(
              "Acknowledge the migration checklist, including application-data and schema boundaries",
            ),
          json: z.boolean().optional().default(false).describe("Output the result as JSON"),
        }),
      ]),
    )
    .handler(async ({ input }) => {
      const [target, replacement, options] = input;
      const { replaceCommand } = await import("@/commands/stack/replace.js");
      await withCommandTelemetry(
        "replace",
        () => replaceCommand({ target, replacement, ...options }),
        {
          source: "cli-flags",
          mode: options.apply ? "apply" : "dry-run",
          resultStatus: statusFromCommandResult,
          resultDetails: (result) => ({
            changedFileCount: result.success
              ? result.filesToAdd.length + result.filesToPatch.length + result.filesToRemove.length
              : 0,
            manualReviewCount: result.success ? result.manualReviewBlockers.length : 0,
          }),
        },
      );
    }),
  history: os
    .meta({ description: "Show history of scaffolded projects with reproducible commands" })
    .input(
      z.object({
        limit: z.number().optional().default(10).describe("Number of entries to show"),
        clear: z.boolean().optional().default(false).describe("Clear all history"),
        json: z.boolean().optional().default(false).describe("Output as JSON"),
      }),
    )
    .handler(async ({ input }) => {
      await withCommandTelemetry("history", () => historyHandler(input), {
        source: "cli-flags",
        mode: input.clear ? "clear" : input.json ? "json" : "list",
      });
    }),
  telemetry: os
    .meta({
      description:
        "View or change anonymous usage telemetry collection (status | enable | disable)",
    })
    .input(
      z.tuple([
        z
          .enum(["status", "enable", "disable"])
          .optional()
          .default("status")
          .describe("Action to perform: status (default), enable, or disable"),
        z.object({
          json: z.boolean().optional().default(false).describe("Output status as JSON"),
        }),
      ]),
    )
    .handler(async ({ input }) => {
      const [action, options] = input;
      await withCommandTelemetry(
        "telemetry",
        () => telemetryHandler({ action, json: options.json }),
        { source: "cli-flags", mode: action },
      );
    }),
  "update-deps": os
    .meta({ description: "Check and update dependency versions in add-deps.ts" })
    .input(
      z.object({
        check: z.boolean().default(false).describe("Report only, no changes"),
        patch: z.boolean().default(false).describe("Apply patch/minor updates only"),
        all: z.boolean().default(false).describe("Interactive mode for all updates"),
        ecosystem: z
          .string()
          .optional()
          .describe("Filter by ecosystem (effect, tanstack, prisma, etc.)"),
        "list-ecosystems": z.boolean().default(false).describe("List available ecosystems"),
      }),
    )
    .handler(async ({ input }) => {
      const { updateDepsHandler, showEcosystems } = await import("@/commands/stack/update-deps.js");
      if (input["list-ecosystems"]) {
        showEcosystems();
        return;
      }
      await withCommandTelemetry(
        "update-deps",
        () =>
          updateDepsHandler({
            check: input.check,
            patch: input.patch,
            all: input.all,
            ecosystem: input.ecosystem,
          }),
        {
          source: "cli-flags",
          mode: input.check ? "check" : input.patch ? "patch" : input.all ? "all" : "update",
          dimensions: { targetEcosystem: input.ecosystem },
        },
      );
    }),
  gen: os
    .meta({
      description:
        "Plan or apply a registered, recoverable in-project recipe (for example `gen resource <name>`)",
    })
    .input(
      z.tuple([
        z.enum(["resource", "route"]).describe("What to generate: resource (alias: route)"),
        z.string().describe("Name of the resource/route (e.g. post)"),
        z.object({
          dir: z.string().optional().describe("Project directory (defaults to current)"),
          dryRun: z
            .boolean()
            .default(false)
            .describe("Print the planned changes without writing any files"),
          apply: z.boolean().default(false).describe("Apply the current plan with --review-token"),
          reviewToken: z
            .string()
            .optional()
            .describe("Exact review token returned by the current gen plan"),
          json: z.boolean().default(false).describe("Output the plan or result as JSON"),
        }),
      ]),
    )
    .handler(async ({ input }) => {
      const [kind, name, options] = input;
      const { genCommand } = await import("@/commands/generation/gen.js");
      const result = await withCommandTelemetry(
        "gen",
        () =>
          genCommand({
            kind,
            name,
            dir: options.dir,
            dryRun: options.dryRun,
            apply: options.apply,
            reviewToken: options.reviewToken,
            json: options.json,
          }),
        {
          source: "cli-flags",
          mode: options.apply ? "apply" : "plan",
          dimensions: { generatorKind: kind },
          resultStatus: (commandResult) => (commandResult.success ? "succeeded" : "failed"),
          resultDetails: (commandResult) => ({
            changedFileCount:
              commandResult.status === "created" ? (commandResult.files?.length ?? 0) : 0,
            manualReviewCount: commandResult.status === "blocked" ? 1 : 0,
          }),
        },
      );
      if (!result.success) throw new CLIError(result.message);
    }),
  context: os
    .meta({
      description:
        "Return bounded, versioned project roles, capabilities, evidence, owning Stack Parts, commands, and safe next actions without exposing code",
    })
    .input(
      z.tuple([
        z.string().optional().describe("Project directory (defaults to current)"),
        z.object({
          json: z.boolean().optional().default(false).describe("Output the context as JSON"),
        }),
      ]),
    )
    .handler(async ({ input }) => {
      const [dir, options] = input;
      const { contextCommand } = await import("@/commands/system/context.js");
      await contextCommand({ dir, json: options.json });
    }),
  recipes: os
    .meta({
      description:
        "Check recipe-owned artifacts or correlate applied recipes with recovery history",
    })
    .input(
      z.tuple([
        z.enum(["check", "history"]).optional().default("check"),
        z.string().optional().describe("Optional recipe name or recipe ID for check"),
        z.object({
          dir: z.string().optional().describe("Project directory (defaults to current)"),
          json: z.boolean().optional().default(false).describe("Output the result as JSON"),
        }),
      ]),
    )
    .handler(async ({ input }) => {
      const [action, name, options] = input;
      const { recipesCommand } = await import("@/commands/generation/recipes.js");
      const result = await recipesCommand({ action, name, dir: options.dir, json: options.json });
      if (!result.success) throw new CLIError("Recipe verification failed.");
    }),
  registry: os
    .meta({
      description:
        "Manage community/private capability packs for an existing Better Fullstack project (`registry add <source>` installs a pack from a local path or file:// URL; `registry list` shows installed packs)",
    })
    .input(
      z.tuple([
        z
          .enum(["add", "list"])
          .optional()
          .default("list")
          .describe("Action to perform: add (install a pack) or list (default)"),
        z
          .string()
          .optional()
          .describe("Pack source: a local path or file:// URL (required for `add`)"),
        z.object({
          projectDir: z.string().optional().describe("Project directory (defaults to current)"),
          json: z.boolean().optional().default(false).describe("Output the result as JSON"),
          dryRun: z
            .boolean()
            .optional()
            .default(false)
            .describe("Preview the install without writing any files"),
          apply: z
            .boolean()
            .optional()
            .default(false)
            .describe("Apply the reviewed local pack plan"),
          reviewToken: z
            .string()
            .optional()
            .describe("Exact review token returned by registry add"),
        }),
      ]),
    )
    .handler(async ({ input }) => {
      const [action, source, options] = input;
      const { registryHandler } = await import("@/commands/generation/registry.js");
      await withCommandTelemetry(
        "registry",
        () =>
          registryHandler({
            action,
            source,
            projectDir: options.projectDir,
            json: options.json,
            dryRun: options.dryRun,
            apply: options.apply,
            reviewToken: options.reviewToken,
          }),
        {
          source: "cli-flags",
          mode: action === "list" ? "list" : options.apply ? "apply" : "plan",
          dimensions: { registryAction: action },
        },
      );
    }),
  update: os
    .meta({
      description:
        "Plan or apply current-template drift from a versioned manifest. Apply requires the exact review token, creates a recovery point, and rolls back automatically on failure. Distinct from the maintainer `update-deps` command.",
    })
    .input(
      z.tuple([
        z
          .string()
          .optional()
          .describe("Project directory to update (defaults to current directory)"),
        z.object({
          dryRun: z
            .boolean()
            .optional()
            .default(false)
            .describe("Preview the plan without writing (default behavior)"),
          apply: z
            .boolean()
            .optional()
            .default(false)
            .describe(
              "Apply the reviewed template changes transactionally; requires the exact review token",
            ),
          reviewToken: z
            .string()
            .length(64)
            .optional()
            .describe("Exact token emitted by the update plan being applied"),
          acknowledgeUnprovenManifestV1: z
            .boolean()
            .optional()
            .default(false)
            .describe(
              "Required only for migrated/adopted manifests whose original generator lineage is unverified",
            ),
          check: z
            .boolean()
            .optional()
            .default(false)
            .describe("Exit non-zero when actionable template drift exists (CI gate)"),
          json: z.boolean().optional().default(false).describe("Output the plan as JSON"),
          recordBaseline: z
            .boolean()
            .optional()
            .default(false)
            .describe(
              "Deprecated safety stop; use the read-only adopt plan and its exact confirmation token",
            ),
          recover: z
            .string()
            .uuid()
            .optional()
            .describe("Restore every file bound to a successful or interrupted transaction"),
        }),
      ]),
    )
    .handler(async ({ input }) => {
      const [projectDir, options] = input;
      const { updateCommand } = await import("@/commands/lifecycle/update.js");
      await updateCommand({ projectDir, ...options });
    }),
  adopt: os
    .meta({
      description:
        "Inspect likely Stack Parts and current-template evidence without writing, then create an unverified-lineage baseline only with the exact confirmation token",
    })
    .input(
      z.tuple([
        z
          .string()
          .optional()
          .describe("Project directory to adopt (defaults to current directory)"),
        z.object({
          confirmToken: z
            .string()
            .length(64)
            .optional()
            .describe("Exact token emitted by the read-only adoption plan"),
          json: z.boolean().optional().default(false).describe("Output the result as JSON"),
        }),
      ]),
    )
    .handler(async ({ input }) => {
      const [projectDir, options] = input;
      const { adoptCommand } = await import("@/commands/lifecycle/adopt.js");
      await adoptCommand({ projectDir, ...options });
    }),
  recovery: os
    .meta({
      description:
        "Discover, verify, restore, or safely prune lifecycle recovery points (list | show | verify | apply | prune)",
    })
    .input(
      z.tuple([
        z
          .enum(["list", "show", "verify", "apply", "prune"])
          .optional()
          .default("list")
          .describe("Recovery action; list is read-only and is the default"),
        z.string().uuid().optional().describe("Transaction ID required by show, verify, and apply"),
        z.object({
          projectDir: z.string().optional().describe("Project directory (defaults to current)"),
          olderThanDays: z
            .number()
            .int()
            .min(0)
            .optional()
            .default(30)
            .describe("For prune: only consider terminal points at least this old"),
          keep: z
            .number()
            .int()
            .min(0)
            .optional()
            .default(5)
            .describe("For prune: always retain this many newest valid points"),
          apply: z
            .boolean()
            .optional()
            .default(false)
            .describe("For prune: delete the previewed candidates; omitted means preview only"),
          json: z.boolean().optional().default(false).describe("Output the result as JSON"),
        }),
      ]),
    )
    .handler(async ({ input }) => {
      const [action, transactionId, options] = input;
      const { recoveryCommand } = await import("@/commands/lifecycle/recovery.js");
      await withCommandTelemetry(
        "recovery",
        () => recoveryCommand({ action, transactionId, ...options }),
        {
          source: "cli-flags",
          mode: action === "prune" && options.apply ? "prune-apply" : action,
          resultStatus: statusFromCommandResult,
          resultDetails: (result) => ({
            changedFileCount:
              result.action === "apply"
                ? result.transaction?.files.length
                : result.prune?.pruned.length,
            warningCount:
              result.verification?.errors.length ??
              result.points?.reduce((count, point) => count + point.errors.length, 0),
          }),
        },
      );
    }),
  mcp: os
    .meta({
      description:
        "Start the Better Fullstack MCP server so AI agents can inspect the schema, plan stacks, and scaffold projects over stdio",
    })
    .handler(async () => {
      log.message("MCP server is started via the 'mcp' subcommand intercepted in cli.ts.");
      log.message("Run: create-better-fullstack mcp");
    }),
  doctor: os
    .meta({
      description:
        "Diagnose a scaffolded Better Fullstack project: verify its bts.jsonc, installed dependencies, required env vars, and run ecosystem build/type checks",
    })
    .input(ProjectCheckInputSchema)
    .handler(async ({ input }) => {
      const [projectDir, options] = input;
      const { doctorCommand } = await import("@/commands/lifecycle/doctor.js");
      await doctorCommand({ projectDir, ...options, commandName: "doctor" });
    }),
  check: os
    .meta({
      description:
        "Check a scaffolded Better Fullstack project for config, dependency, env, and generated build/type drift",
    })
    .input(ProjectCheckInputSchema)
    .handler(async ({ input }) => {
      const [projectDir, options] = input;
      const { doctorCommand } = await import("@/commands/lifecycle/doctor.js");
      await doctorCommand({ projectDir, ...options, commandName: "check" });
    }),
  evidence: os
    .meta({
      description:
        "Explain the public capability evidence levels and what each level does and does not prove",
    })
    .input(
      z.object({
        json: z
          .boolean()
          .optional()
          .default(false)
          .describe("Output the evidence contract as JSON"),
        receipt: z.string().optional().describe("Path to a SHA-bound capability-runtime receipt"),
        ecosystem: EcosystemSchema.optional().describe("Filter the inventory by ecosystem"),
        category: z.string().optional().describe("Filter by canonical option category"),
        option: z.string().optional().describe("Filter by exact option ID"),
      }),
    )
    .handler(async ({ input }) => {
      if (input.category && !(input.category in OPTION_CATEGORY_METADATA)) {
        throw new Error(`Unknown option category: ${input.category}`);
      }
      const receipt = input.receipt
        ? JSON.parse(await readFile(resolve(input.receipt), "utf8"))
        : undefined;
      const report = getCapabilityEvidenceReport({
        receipt,
        catalogVersion: getLatestCLIVersion(),
        producerFingerprint: getExpectedCapabilityProducerFingerprint(receipt),
        ecosystem: input.ecosystem,
        category: input.category as keyof typeof OPTION_CATEGORY_METADATA | undefined,
        optionId: input.option,
      });
      if (input.json) {
        process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
        return;
      }
      for (const level of report.levels) {
        log.message(`${level.label} (${level.id})`);
        log.message(`  Proves: ${level.proves}`);
        log.message(`  Does not prove: ${level.doesNotProve}`);
      }
      log.message("");
      log.message(
        `Inventory: ${report.summary.totalOptions} options, ${report.summary.evidence["runtime-verified"]} runtime verified`,
      );
      for (const recipe of report.recipes) {
        log.message(
          `  ${recipe.id}: ${recipe.name} (${recipe.runtime.name}; ${recipe.maintainer})`,
        );
      }
      if (input.ecosystem || input.category || input.option) {
        log.message("");
        for (const record of report.inventory) {
          log.message(
            `${record.id}: ${record.evidenceLevel}, ${record.freshness}, ${record.maturity}`,
          );
          log.message(`  ${record.limitation}`);
        }
      }
    }),
  tracks: os
    .meta({
      description:
        "List schema-valid starter tracks with exact editable Stack Parts and fail-closed capability evidence",
    })
    .input(
      z.object({
        id: z.enum(STARTER_TRACK_IDS).optional().describe("Return one exact starter track"),
        ecosystem: EcosystemSchema.optional().describe("Filter by language ecosystem"),
        evidence: z.enum(CAPABILITY_EVIDENCE_LEVEL_IDS).optional(),
        runtime: z.enum(STARTER_TRACK_RUNTIME_IDS).optional(),
        deploymentTarget: z.enum(STARTER_TRACK_DEPLOYMENT_TARGET_IDS).optional(),
        packageManager: z.enum(STARTER_TRACK_PACKAGE_MANAGER_IDS).optional(),
        database: z.enum(STARTER_TRACK_DATABASE_IDS).optional(),
        auth: z.enum(STARTER_TRACK_AUTH_IDS).optional(),
        workspaceShape: z.enum(STARTER_TRACK_WORKSPACE_SHAPE_IDS).optional(),
        receipt: z.string().optional().describe("Path to a capability evidence receipt JSON file"),
        json: z.boolean().default(false).describe("Output the catalog as JSON"),
      }),
    )
    .handler(async ({ input }) => {
      const receipt = input.receipt
        ? JSON.parse(await readFile(resolve(input.receipt), "utf8"))
        : undefined;
      const filters: StarterTrackFilters = {
        evidence: input.evidence,
        runtime: input.runtime,
        deploymentTarget: input.deploymentTarget,
        packageManager: input.packageManager,
        database: input.database,
        auth: input.auth,
        workspaceShape: input.workspaceShape,
      };
      const result = getStarterTracksResult({
        ecosystem: input.ecosystem,
        filters,
        receipt,
        catalogVersion: getLatestCLIVersion(),
        producerFingerprint: getExpectedCapabilityProducerFingerprint(receipt),
        trackId: input.id,
      });

      if (input.json) {
        process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
        return;
      }

      if (result.tracks.length === 0) {
        log.warn("No schema-valid starter track matches these filters.");
        return;
      }
      for (const track of result.tracks) {
        log.message(`${track.name} (${track.id})`);
        log.message(`  ${track.description}`);
        log.message(`  Evidence: ${track.evidence.level} (${track.evidence.freshness})`);
        log.message(`  Stack Parts: ${track.stackPartSpecs.join(", ")}`);
      }
    }),
  compatibility: os
    .meta({
      description:
        "Explain whether one capability fits a canonical starter track, including alternatives and the owning Stack Part",
    })
    .input(
      z.object({
        track: z.enum(STARTER_TRACK_IDS).describe("Canonical starter track ID"),
        category: z.string().describe("Canonical option category"),
        option: z.string().describe("Exact option ID to evaluate"),
        json: z.boolean().default(false).describe("Output the structured explanation as JSON"),
      }),
    )
    .handler(async ({ input }) => {
      if (!(input.category in OPTION_CATEGORY_METADATA)) {
        throw new Error(`Unknown option category: ${input.category}`);
      }
      const track = getStarterTracksResult({ trackId: input.track }).tracks[0];
      if (!track) throw new Error(`Unknown starter track: ${input.track}`);
      const result = getCompatibilityExplanationResult(
        track.selection,
        input.category as keyof typeof OPTION_CATEGORY_METADATA,
        input.option,
      );

      if (input.json) {
        process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
        return;
      }
      if (result.compatible) {
        log.success(`${input.option} is compatible with ${track.name}.`);
        return;
      }
      log.warn(result.message ?? `${input.option} is not compatible with ${track.name}.`);
      if (result.explanation?.owner.stackPart) {
        log.message(`Owner: ${result.explanation.owner.stackPart.id}`);
      } else if (result.explanation) {
        log.message(`Capability: ${result.explanation.capability.id}`);
      }
    }),
  recommend: os
    .meta({
      description:
        "Recommend a stack from a natural-language brief (prompt-to-stack): prints the suggested config, the rationale, and a ready-to-run create command",
    })
    .input(
      z.object({
        brief: z
          .string()
          .min(1)
          .describe('Natural-language description, e.g. "a SaaS with Postgres, auth and payments"'),
        ecosystem: z
          .string()
          .optional()
          .describe("Force an ecosystem (typescript, react-native, rust, go, python, java, ...)"),
        json: z.boolean().default(false).describe("Output the recommendation as JSON"),
      }),
    )
    .handler(async ({ input }) => {
      const result = await withCommandTelemetry(
        "recommend",
        async () =>
          getStarterTrackRecommendation({
            brief: input.brief,
            ecosystem: input.ecosystem as ProjectConfig["ecosystem"] | undefined,
          }),
        {
          source: "cli-flags",
          mode: input.json ? "json" : "human",
          dimensions: { targetEcosystem: input.ecosystem },
        },
      );

      if (input.json) {
        process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
        return;
      }

      log.message(`Recommended track: ${result.track.name} (${result.track.id})`);
      log.message(`  ${result.rationale}`);
      for (const constraint of result.constraints) log.message(`  ${constraint}`);
      log.message(`\nReview, then scaffold with:\n${result.reproducibleCommand}`);
    }),
});

const caller = createRouterClient(router, { context: {} });

export function createBtsCli() {
  const cli = createCli({
    router,
    name: "create-better-fullstack",
    version: getLatestCLIVersion(),
  });
  const buildProgram = cli.buildProgram.bind(cli);
  const hideLegacyOptions = (program: ReturnType<typeof buildProgram>) => {
    type CommandNode = {
      commands?: CommandNode[];
      options?: Array<{ long?: string; hideHelp?: () => void }>;
      configureHelp?: (configuration: {
        visibleOptions: (command: CommandNode) => Array<{ long?: string }>;
      }) => void;
    };
    const visit = (command: CommandNode) => {
      command.options?.find((option) => option.long === "--addons")?.hideHelp?.();
      command.configureHelp?.({
        visibleOptions: (target) =>
          (target.options ?? []).filter((option) => option.long !== "--addons"),
      });
      command.commands?.forEach(visit);
    };
    visit(program as CommandNode);
    return program;
  };

  return {
    ...cli,
    buildProgram: (params?: Parameters<typeof buildProgram>[0]) =>
      hideLegacyOptions(buildProgram(params)),
    run: async (
      params?: Parameters<typeof cli.run>[0],
      program?: Parameters<typeof cli.run>[1],
    ) => {
      const resolvedProgram = program ?? hideLegacyOptions(buildProgram(params));
      const argv = params?.argv ?? process.argv;
      const commandArguments = argv.slice(2);
      if (
        commandArguments.length === 1 &&
        (commandArguments[0] === "--help" || commandArguments[0] === "-h")
      ) {
        const commandTree = resolvedProgram as unknown as {
          commands: Array<{ name: () => string; outputHelp: () => void }>;
        };
        const createCommand = commandTree.commands.find((command) => command.name() === "create");
        createCommand?.outputHelp();
        return;
      }
      return cli.run(params, resolvedProgram);
    },
  };
}

/**
 * Programmatic API to create a new Better Fullstack project.
 * Returns pure JSON - no console output, no interactive prompts.
 *
 * @example
 * ```typescript
 * import { create } from "create-better-fullstack";
 *
 * const result = await create("my-app", {
 *   frontend: ["tanstack-router"],
 *   backend: "hono",
 *   runtime: "bun",
 *   database: "sqlite",
 *   orm: "drizzle",
 * });
 *
 * if (result.success) {
 *   console.log(`Project created at: ${result.projectDirectory}`);
 * }
 * ```
 */
export async function create(
  projectName?: string,
  options?: Partial<CreateInput>,
): Promise<InitResult> {
  const input = {
    ...options,
    projectName,
    renderTitle: false,
    verbose: true,
    disableAnalytics: options?.disableAnalytics ?? true,
    directoryConflict: options?.directoryConflict ?? "error",
  } as CreateInput & { projectName?: string };

  try {
    return (await createProjectHandler(input, { silent: true })) as InitResult;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      projectConfig: {} as ProjectConfig,
      reproducibleCommand: "",
      timeScaffolded: new Date().toISOString(),
      elapsedTimeMs: 0,
      projectDirectory: "",
      relativePath: "",
    };
  }
}

export async function sponsors() {
  return caller.sponsors();
}

export async function docs() {
  return caller.docs();
}

export async function builder() {
  return caller.builder();
}

export async function add(
  input: AddInput,
  options?: { telemetrySource?: TelemetrySource },
): Promise<AddResult | undefined> {
  const { addHandler } = await import("@/helpers/core/add-handler.js");
  return addHandler(input, {
    silent: true,
    telemetrySource: options?.telemetrySource ?? "programmatic",
  });
}

export async function history(options?: { limit?: number; clear?: boolean; json?: boolean }) {
  return caller.history({
    limit: options?.limit ?? 10,
    clear: options?.clear ?? false,
    json: options?.json ?? false,
  });
}

export async function telemetry(
  action: "status" | "enable" | "disable" = "status",
  options?: { json?: boolean },
) {
  return caller.telemetry([action, { json: options?.json ?? false }]);
}

export async function doctor(
  projectDir?: string,
  options?: {
    skipChecks?: boolean;
    runChecks?: boolean;
    json?: boolean;
    supportBundle?: boolean;
    fix?: boolean;
    apply?: boolean;
    reviewToken?: string;
  },
) {
  return caller.doctor([
    projectDir,
    {
      skipChecks: options?.skipChecks ?? false,
      runChecks: options?.runChecks ?? false,
      json: options?.json ?? false,
      supportBundle: options?.supportBundle ?? false,
      fix: options?.fix ?? false,
      apply: options?.apply ?? false,
      reviewToken: options?.reviewToken,
    },
  ]);
}

export async function check(
  projectDir?: string,
  options?: {
    skipChecks?: boolean;
    runChecks?: boolean;
    json?: boolean;
    supportBundle?: boolean;
  },
) {
  return caller.check([
    projectDir,
    {
      skipChecks: options?.skipChecks ?? false,
      runChecks: options?.runChecks ?? false,
      json: options?.json ?? false,
      supportBundle: options?.supportBundle ?? false,
    },
  ]);
}

export async function evidence(options?: {
  json?: boolean;
  receipt?: string;
  ecosystem?: Ecosystem;
  category?: string;
  option?: string;
}) {
  return caller.evidence({
    json: options?.json ?? false,
    receipt: options?.receipt,
    ecosystem: options?.ecosystem,
    category: options?.category,
    option: options?.option,
  });
}

export async function registry(
  action: "add" | "list" = "list",
  source?: string,
  options?: { projectDir?: string; json?: boolean; dryRun?: boolean },
) {
  return caller.registry([
    action,
    source,
    {
      projectDir: options?.projectDir,
      json: options?.json ?? false,
      dryRun: options?.dryRun ?? false,
    },
  ]);
}

export async function update(
  projectDir?: string,
  options?: {
    dryRun?: boolean;
    apply?: boolean;
    check?: boolean;
    json?: boolean;
    recordBaseline?: boolean;
    acknowledgeUnprovenManifestV1?: boolean;
    reviewToken?: string;
    recover?: string;
  },
) {
  return caller.update([
    projectDir,
    {
      dryRun: options?.dryRun ?? false,
      apply: options?.apply ?? false,
      check: options?.check ?? false,
      json: options?.json ?? false,
      recordBaseline: options?.recordBaseline ?? false,
      acknowledgeUnprovenManifestV1: options?.acknowledgeUnprovenManifestV1 ?? false,
      reviewToken: options?.reviewToken,
      recover: options?.recover,
    },
  ]);
}

export async function adopt(
  projectDir?: string,
  options?: { confirmToken?: string; json?: boolean },
) {
  return caller.adopt([
    projectDir,
    {
      confirmToken: options?.confirmToken,
      json: options?.json ?? false,
    },
  ]);
}

export async function recovery(
  action: "list" | "show" | "verify" | "apply" | "prune" = "list",
  transactionId?: string,
  options?: {
    projectDir?: string;
    olderThanDays?: number;
    keep?: number;
    apply?: boolean;
    json?: boolean;
  },
) {
  return caller.recovery([
    action,
    transactionId,
    {
      projectDir: options?.projectDir,
      olderThanDays: options?.olderThanDays ?? 30,
      keep: options?.keep ?? 5,
      apply: options?.apply ?? false,
      json: options?.json ?? false,
    },
  ]);
}
