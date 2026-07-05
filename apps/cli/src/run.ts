import { intro, log } from "@clack/prompts";
import { createRouterClient, os } from "@orpc/server";
import pc from "picocolors";
import { createCli } from "trpc-cli";
import z from "zod";

import type { AddResult } from "./helpers/core/add-handler";

import { historyHandler } from "./commands/history";
import { telemetryHandler } from "./commands/telemetry";
import { CreateCommandInputSchema, CreateCommandOptionsSchema } from "./create-command-input";
import { createProjectHandler } from "./helpers/core/command-handlers";
import {
  type AddInput,
  type Addons,
  AddonsSchema,
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
      const result = await createProjectHandler(combinedInput);

      if (options.verbose) {
        return result;
      }
    }),
  sponsors: os.meta({ description: "Show Better Fullstack sponsors" }).handler(async () => {
    try {
      renderTitle();
      intro(pc.magenta("Better Fullstack Sponsors"));
      const sponsors = await fetchSponsors();
      displaySponsors(sponsors);
    } catch (error) {
      handleError(error, "Failed to display sponsors");
    }
  }),
  docs: os.meta({ description: "Open Better Fullstack documentation" }).handler(async () => {
    const DOCS_URL = "https://better-fullstack-web.vercel.app/docs";
    try {
      await openUrl(DOCS_URL);
      log.success(pc.blue("Opened docs in your default browser."));
    } catch {
      log.message(`Please visit ${DOCS_URL}`);
    }
  }),
  builder: os
    .meta({ description: "Open the interactive web-based stack builder at better-fullstack.dev" })
    .handler(async () => {
      const BUILDER_URL = "https://better-fullstack-web.vercel.app/new";
      try {
        await openUrl(BUILDER_URL);
        log.success(pc.blue("Opened builder in your default browser."));
      } catch {
        log.message(`Please visit ${BUILDER_URL}`);
      }
    }),
  add: os
    .meta({
      description:
        "Add addons, deploy targets, or stack capabilities to an existing Better Fullstack project using its bts.jsonc config",
    })
    .input(AddCommandInputSchema)
    .handler(async ({ input }) => {
      const { addHandler } = await import("./helpers/core/add-handler.js");
      await addHandler(input as AddInput);
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
      await historyHandler(input);
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
      await telemetryHandler({ action, json: options.json });
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
      await updateDepsHandler({
        check: input.check,
        patch: input.patch,
        all: input.all,
        ecosystem: input.ecosystem,
      });
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
      await genCommand({ kind, name, dir: options.dir, dryRun: options.dryRun });
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
      await registryHandler({
        action,
        source,
        projectDir: options.projectDir,
        json: options.json,
        dryRun: options.dryRun,
      });
    }),
  update: os
    .meta({
      description:
        "Re-apply the current bundled templates to an existing Better Fullstack project, classifying template drift vs. your local edits from the bts.lock.json scaffold baseline. Default is a dry-run plan; `--apply` writes safe drift patches + new files. Distinct from the maintainer `update-deps` command.",
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
            .describe("Write safe template-drift patches and new files, refreshing the baseline"),
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
              "Adopt the current on-disk state as the scaffold baseline (for projects created before the update engine)",
            ),
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
      await doctorCommand({ projectDir, ...options });
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
      await doctorCommand({ projectDir, ...options });
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
      const result = recommendStackFromBrief(
        input.brief,
        input.ecosystem as Parameters<typeof recommendStackFromBrief>[1],
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
  return createCli({
    router,
    name: "create-better-fullstack",
    version: getLatestCLIVersion(),
  });
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

export async function add(input: AddInput): Promise<AddResult | undefined> {
  const { addHandler } = await import("./helpers/core/add-handler.js");
  return addHandler(input, { silent: true });
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
  options?: { skipChecks?: boolean; json?: boolean },
) {
  return caller.doctor([
    projectDir,
    { skipChecks: options?.skipChecks ?? false, json: options?.json ?? false },
  ]);
}

export async function check(
  projectDir?: string,
  options?: { skipChecks?: boolean; json?: boolean },
) {
  return caller.check([
    projectDir,
    { skipChecks: options?.skipChecks ?? false, json: options?.json ?? false },
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
    },
  ]);
}
