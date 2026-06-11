import { intro, log } from "@clack/prompts";
import { createRouterClient, os } from "@orpc/server";
import pc from "picocolors";
import { createCli } from "trpc-cli";
import z from "zod";

import { historyHandler } from "./commands/history";
import { CreateCommandInputSchema } from "./create-command-input";
import type { AddResult } from "./helpers/core/add-handler";
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
        "Add addons or deployment targets to an existing Better Fullstack project using its bts.jsonc config",
    })
    .input(
      z.object({
        addons: z.array(AddonsSchema).optional().describe("Addons to add"),
        webDeploy: WebDeploySchema.optional().describe("Web deployment option to set"),
        serverDeploy: ServerDeploySchema.optional().describe("Server deployment option to set"),
        install: z
          .boolean()
          .optional()
          .default(false)
          .describe("Install dependencies after adding"),
        packageManager: PackageManagerSchema.optional().describe("Package manager to use"),
        projectDir: z.string().optional().describe("Project directory (defaults to current)"),
      }),
    )
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
  mcp: os
    .meta({
      description:
        "Start the Better Fullstack MCP server so AI agents can inspect the schema, plan stacks, and scaffold projects over stdio",
    })
    .handler(async () => {
      log.message("MCP server is started via the 'mcp' subcommand intercepted in cli.ts.");
      log.message("Run: create-better-fullstack mcp");
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
