import { intro, log } from "@clack/prompts";
import { createRouterClient, os } from "@orpc/server";
import pc from "picocolors";
import { createCli } from "trpc-cli";
import z from "zod";

import type { AddResult } from "./helpers/core/add-handler";
import type { TelemetrySource } from "./utils/analytics";

import { historyHandler } from "./commands/history";
import { telemetryHandler } from "./commands/telemetry";
import { BUILDER_URL } from "./constants";
import { CreateCommandInputSchema, CreateCommandOptionsSchema } from "./create-command-input";
import { createProjectHandler } from "./helpers/core/command-handlers";
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
} from "./types";
import { statusFromCommandResult, withCommandTelemetry } from "./utils/analytics";
import { handleError } from "./utils/errors";
import { getLatestCLIVersion } from "./utils/get-latest-cli-version";
import { openUrl } from "./utils/open-url";
import { renderTitle } from "./utils/render-title";
import { displaySponsors, fetchSponsors } from "./utils/sponsors";

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
      const { addHandler } = await import("./helpers/core/add-handler.js");
      const hasExplicitSelection = Object.entries(input).some(([key, value]) => {
        if (["projectDir", "install", "dryRun"].includes(key)) return false;
        if (value === undefined || value === false) return false;
        return !Array.isArray(value) || value.length > 0;
      });
      await withCommandTelemetry("add", () => addHandler(input as AddInput), {
        source: hasExplicitSelection || input.dryRun ? "cli-flags" : "cli-interactive",
        mode: (input as { dryRun?: boolean }).dryRun ? "dry-run" : "apply",
        resultStatus: statusFromCommandResult,
        resultDetails: (commandResult) => ({
          capabilityCount: commandResult?.addedAddons.length,
          warningCount: commandResult?.setupWarnings?.length,
        }),
      });
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
      const { statusCommand } = await import("./commands/status.js");
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
      const { removeCommand } = await import("./commands/remove.js");
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
      const { updateDepsHandler, showEcosystems } = await import("./commands/update-deps.js");
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
        "Generate in-project code for an existing Better Fullstack project (e.g. `gen resource <name>` / `gen route <name>` for a new trpc/orpc API resource router)",
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
        }),
      ]),
    )
    .handler(async ({ input }) => {
      const [kind, name, options] = input;
      const { genCommand } = await import("./commands/gen.js");
      await withCommandTelemetry(
        "gen",
        () => genCommand({ kind, name, dir: options.dir, dryRun: options.dryRun }),
        {
          source: "cli-flags",
          mode: options.dryRun ? "dry-run" : "apply",
          dimensions: { generatorKind: kind },
          resultStatus: (commandResult) =>
            commandResult.status === "unsupported" ? "failed" : "succeeded",
          resultDetails: (commandResult) => ({
            changedFileCount: commandResult.status === "created" && !options.dryRun ? 1 : 0,
            manualReviewCount: commandResult.status === "manual-wiring" ? 1 : 0,
          }),
        },
      );
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
        }),
      ]),
    )
    .handler(async ({ input }) => {
      const [action, source, options] = input;
      const { registryHandler } = await import("./commands/registry.js");
      await withCommandTelemetry(
        "registry",
        () =>
          registryHandler({
            action,
            source,
            projectDir: options.projectDir,
            json: options.json,
            dryRun: options.dryRun,
          }),
        {
          source: "cli-flags",
          mode: action === "list" ? "list" : options.dryRun ? "dry-run" : "add",
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
              "Manually adopt current on-disk bytes as a baseline; this does not prove generator release lineage",
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
      const { updateCommand } = await import("./commands/update.js");
      await updateCommand({ projectDir, ...options });
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
      const { doctorCommand } = await import("./commands/doctor.js");
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
      const { doctorCommand } = await import("./commands/doctor.js");
      await doctorCommand({ projectDir, ...options, commandName: "check" });
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
      const { recommendStackFromBrief } = await import("./mcp.js");
      const result = await withCommandTelemetry(
        "recommend",
        async () =>
          recommendStackFromBrief(
            input.brief,
            input.ecosystem as Parameters<typeof recommendStackFromBrief>[1],
          ),
        {
          source: "cli-flags",
          mode: input.json ? "json" : "human",
          dimensions: { targetEcosystem: input.ecosystem },
        },
      );

      if (input.json) {
        log.message(JSON.stringify(result, null, 2));
        return;
      }

      log.message("Recommended stack:");
      for (const line of result.rationale) log.message(`  • ${line}`);
      log.message(`\nConfig: ${JSON.stringify(result.input)}`);
      if (result.matchedPreset) {
        log.message(`Nearest preset: ${result.matchedPreset}`);
      }
      log.message("\nReview, then scaffold with: create-better-fullstack create <name> [flags]");
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
  const { addHandler } = await import("./helpers/core/add-handler.js");
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
  options?: { skipChecks?: boolean; runChecks?: boolean; json?: boolean },
) {
  return caller.doctor([
    projectDir,
    {
      skipChecks: options?.skipChecks ?? false,
      runChecks: options?.runChecks ?? false,
      json: options?.json ?? false,
    },
  ]);
}

export async function check(
  projectDir?: string,
  options?: { skipChecks?: boolean; runChecks?: boolean; json?: boolean },
) {
  return caller.check([
    projectDir,
    {
      skipChecks: options?.skipChecks ?? false,
      runChecks: options?.runChecks ?? false,
      json: options?.json ?? false,
    },
  ]);
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
