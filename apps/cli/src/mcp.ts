import type z from "zod";

import { EcosystemSchema, OPTION_CATEGORY_METADATA } from "@better-fullstack/types";
import { type CallToolResult, McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { renderCompatibilityGuide } from "@/mcp/mcp-compatibility-guide";
import { allOperations, errorMessage, operationToolName } from "@/operations";
import { getSchemaOptions } from "@/operations/stack-helpers";
import { getLatestCLIVersion } from "@/platform/get-latest-cli-version";
import { getCapabilityEvidenceReport } from "@/project/capability-evidence";
import { withCommandTelemetry } from "@/telemetry/analytics";

// Re-exported for tests and tooling that predate the operations table.
export { MCP_PLAN_CREATE_SCHEMA, MCP_STACK_UPDATE_SCHEMA } from "@/operations/stack-input";
export {
  buildMcpCompatibilityInput,
  getMcpGraphPreview,
  recommendStackFromBrief,
  validateMcpProjectConfigCompatibility,
} from "@/operations/stack-helpers";

const OPTION_ENTRY_COUNT = Object.values(OPTION_CATEGORY_METADATA).reduce(
  (sum, metadata) => sum + metadata.options.length,
  0,
);
const ECOSYSTEM_LIST = EcosystemSchema.options.join(", ");

const referenceOptimizedSchemas = new WeakMap<z.ZodType, z.ZodType>();

function reuseLocalOutputSchemaDefinitions<Schema extends z.ZodType>(schema: Schema): Schema {
  const cached = referenceOptimizedSchemas.get(schema);
  if (cached) return cached as Schema;

  const standard = schema["~standard"];
  const jsonSchema = standard.jsonSchema;
  // MCP advertises each tool schema independently, so references must stay local.
  // Output shapes benefit from reuse; the broad input enums grow when referenced.
  const optimizedStandard = {
    ...standard,
    jsonSchema: {
      ...jsonSchema,
      output: (params: Parameters<typeof jsonSchema.output>[0]) =>
        jsonSchema.output({
          ...params,
          libraryOptions: { ...params?.libraryOptions, reused: "ref" },
        }),
    },
  };
  const optimized = new Proxy(schema, {
    get(target, property, receiver) {
      return property === "~standard" ? optimizedStandard : Reflect.get(target, property, receiver);
    },
  });
  referenceOptimizedSchemas.set(schema, optimized);
  return optimized as Schema;
}

const INSTRUCTIONS = `Better-Fullstack scaffolds fullstack projects across ${ECOSYSTEM_LIST} ecosystems with ${OPTION_ENTRY_COUNT} configurable options.

RECOMMENDED WORKFLOW:
1. Call bfs_get_guidance to understand field semantics, required fields, and workflow rules.
2. Read the "docs://compatibility-rules" resource for valid stack combinations.
3. Call bfs_check_compatibility to validate your planned stack before creating.
4. Call bfs_plan_project to preview (dry-run) - no files are written.
5. Call bfs_create_project to scaffold the project on disk.

For existing projects:
1. Call bfs_get_project_status, then bfs_check_project for truthful target verification.
2. If bts.lock.json is missing, call bfs_plan_project_adoption. Review its likely Stack Parts and uncertainty, then pass its exact token to bfs_confirm_project_adoption only with user approval.
3. Call bfs_plan_project_update to review current-template drift. Only a valid manifest v2 baseline returns a reviewToken.
4. Pass that exact reviewToken to bfs_apply_project_update, adding acknowledgeUnprovenManifestV1: true only when the plan reports unverified provenance. Apply creates its own recovery point.
5. For removal, call bfs_plan_part_removal with one exact non-primary stack part, review the result, then pass its unchanged token to bfs_apply_part_removal.
6. Use bfs_plan_stack_update / bfs_apply_stack_update for provider changes.
7. Use bfs_plan_addition / bfs_add_feature for owner-scoped tooling Stack Parts and deploy targets.
8. Use bfs_list_project_recovery_points when a recovery ID is unknown, then show or verify the point before restore. Pruning is a dry run unless apply is true.
9. For in-project generation, call bfs_plan_gen, review every exact file and managed-region change, then call bfs_apply_gen with its unchanged token. Run the declared migration and integration checks, then call bfs_check_recipes.
10. For a local capability pack, call bfs_plan_registry_add, review all files and dependency metadata, then call bfs_apply_registry_add with its unchanged token.

CRITICAL RULES:
- Dependency installation is ALWAYS skipped in MCP mode (timeout risk). After scaffolding, tell the user to run install manually.
- bfs_check_project executes project build tools. Those tools may write local caches, lock metadata, generated code, or build artifacts even though Better Fullstack does not edit source directly.
- Tooling is expressed with canonical "part" bindings. Use bfs_get_schema to discover dedicated toolchain, runner, quality, hooks, analysis, documentation, platform, testing, data, CI, and utility categories.
- Array fields include "part", "frontend", "examples", "aiDocs", and the ecosystem library/testing collections. Most provider fields are strings.
- "none" means "skip this feature entirely", not "use the default".
- Always specify "ecosystem" first - it determines which other fields are relevant.
- TypeScript web-specific fields (web frontend, backend, orm, etc.) are IGNORED for react-native/rust/python/go/java/dotnet/elixir ecosystems.
- The compatibility engine auto-adjusts invalid combinations - always call bfs_check_compatibility first to see adjustments.`;

const GETTING_STARTED_MD = `# Getting Started with Better-Fullstack MCP

## Quick Start - TypeScript Project
1. Call bfs_create_project with:
   - projectName: "my-app"
   - ecosystem: "typescript"
   - frontend: ["tanstack-router"]
   - backend: "hono"
   - runtime: "bun"
   - database: "sqlite"
   - orm: "drizzle"
2. Tell the user to run: cd my-app && bun install && bun run dev

## Quick Start - Rust Project
1. Call bfs_create_project with:
   - projectName: "my-rust-app"
   - ecosystem: "rust"
   - rustWebFramework: "axum"
   - rustOrm: "sqlx"
   - email: "resend" (optional)
   - observability: "sentry" (optional)
2. Tell the user to run: cd my-rust-app && cargo build

## Quick Start - Python Project
1. Call bfs_create_project with:
   - projectName: "my-python-app"
   - ecosystem: "python"
   - pythonWebFramework: "fastapi"
   - pythonOrm: "sqlalchemy"
   - pythonObservability: "signoz" (optional)
   - pythonLogging: "structlog" or "loguru" (optional)
   - email: "resend" (optional)
   - observability: "sentry" (optional)
2. Tell the user to run: cd my-python-app && uv sync --extra dev

## Quick Start - Go Project
1. Call bfs_create_project with:
   - projectName: "my-go-app"
   - ecosystem: "go"
   - goWebFramework: "gin"
   - goOrm: "gorm"
   - goObservability: "signoz" (optional)
   - email: "resend" (optional)
   - observability: "sentry" (optional)
2. Tell the user to run: cd my-go-app && go mod tidy && go run cmd/server/main.go

## Quick Start - Java Project
1. Call bfs_create_project with:
   - projectName: "my-java-app"
   - ecosystem: "java"
   - javaWebFramework: "spring-boot"
   - javaBuildTool: "maven"
   - email: "resend" (optional)
   - observability: "sentry" (optional)
2. Tell the user to run: cd my-java-app && ./mvnw test && ./mvnw spring-boot:run

## Quick Start - PHP Project
1. Call bfs_create_project with projectName, ecosystem: "php", phpWebFramework: "slim", "laravel" or "symfony", and database: "none". Optional phpOrm: "eloquent" (Slim or Laravel), "doctrine" (Slim or Symfony) or "cycle" (Slim) persists notes in SQLite. Optional phpAuth: "firebase-jwt" or "lcobucci-jwt" (any framework) or "symfony-security" (Symfony) protects GET /api/me with HS256 bearer tokens. phpTesting picks "phpunit" (default), "pest", "codeception" or "none". Optional phpValidation: "symfony-validator" or "respect-validation" (any framework) or "laravel-validation" (Laravel) validates the greeting payload with that library. Optional phpCache: "symfony-cache", "laminas-cache" or "predis" (any framework, Predis needs REDIS_URL) or "laravel-cache" (Laravel) serves GET /api/cached-time from that cache. Optional phpJobQueue: "symfony-messenger" or "enqueue-fs" (any framework) or "laravel-queue" (Laravel) adds POST /api/jobs and a composer run queue:work worker. Optional phpEmail: "symfony-mailer" or "phpmailer" (any framework) or "laravel-mail" (Laravel) adds a composer run mail:send command that sends over SMTP. Optional phpLogging follows the framework: "monolog" (Slim), "laravel-log" (Laravel) or "symfony-monolog" (Symfony) writes JSON greeting logs to stderr. Optional phpHttpClient: "guzzle", "symfony-http-client" or "httplug-curl" (any framework) adds GET /api/upstream fetching UPSTREAM_URL.
2. Run composer install --no-interaction, composer run build, composer test and composer run proof:http from the generated service directory.
3. Start local development with composer run dev. PHP.md describes the validated JSON route and extension boundaries.
4. Treat this recipe as experimental until those native checks pass. With phpOrm, run composer run db:setup before composer run dev. With phpAuth, set JWT_SECRET; tokens come from your identity provider. Deployment adapters are not generated. For composition use backend:php:slim, backend:php:laravel or backend:php:symfony with a frontend Stack Part.

## Quick Start - Elixir Project
1. Call bfs_create_project with:
   - projectName: "my-elixir-app"
   - ecosystem: "elixir"
   - elixirWebFramework: "phoenix"
   - elixirOrm: "ecto-sql"
   - elixirApi: "rest"
   - elixirRealtime: "channels"
2. Tell the user to run: cd my-elixir-app && mix deps.get && mix phx.server

## Adding Features to Existing Projects
1. Call bfs_plan_stack_update with projectDir and any stack fields to add or change.
2. Review filesToAdd, filesToPatch, dependencyChanges, envChanges, and manualReviewBlockers.
3. If there are no blockers, call bfs_apply_stack_update with the same arguments.
4. Use bfs_plan_addition / bfs_add_feature for owner-scoped tooling Stack Parts and deploy targets.
`;

type McpToolAnnotations = {
  title?: string;
  readOnlyHint?: boolean;
  destructiveHint?: boolean;
  idempotentHint?: boolean;
  openWorldHint?: boolean;
};

export function createMcpServer(): McpServer {
  const server = new McpServer(
    { name: "better-fullstack", version: getLatestCLIVersion() },
    {
      instructions: INSTRUCTIONS,
      cacheHints: {
        "tools/list": { ttlMs: 300_000, cacheScope: "public" },
        "resources/list": { ttlMs: 300_000, cacheScope: "public" },
      },
    },
  );

  const registerTool = (
    name: string,
    config: {
      description: string;
      inputSchema: z.ZodType<Record<string, unknown>>;
      outputSchema?: z.ZodType;
      annotations?: McpToolAnnotations;
    },
    cb: (input: Record<string, unknown>) => CallToolResult | Promise<CallToolResult>,
  ): void => {
    server.registerTool(
      name,
      {
        ...config,
        inputSchema: config.inputSchema,
        outputSchema: config.outputSchema
          ? reuseLocalOutputSchemaDefinitions(config.outputSchema)
          : undefined,
      },
      async (input) =>
        withCommandTelemetry(
          name,
          async () => {
            const result = await cb(input);
            if (result.isError || !config.outputSchema) return result;

            // The SDK validates output but sends the original, unparsed object.
            // Project both representations to the schema advertised to clients.
            const structuredContent = config.outputSchema.parse(result.structuredContent);
            return {
              ...result,
              content: [
                { type: "text" as const, text: JSON.stringify(structuredContent, null, 2) },
              ],
              structuredContent,
            };
          },
          {
            source: "mcp",
            mode: config.annotations?.readOnlyHint ? "read" : "write",
            resultStatus: (result) => (result.isError ? "failed" : "succeeded"),
          },
        ),
    );
  };

  // Every tool is a projection of the operations table; see docs/guidelines/lifecycle-commands-and-mcp.md.
  for (const operation of allOperations) {
    registerTool(
      operationToolName(operation),
      {
        description: operation.description,
        inputSchema: operation.input,
        outputSchema: operation.output,
        annotations: {
          title: operation.title,
          readOnlyHint: operation.safety === "read",
          ...(operation.safety !== "read"
            ? { destructiveHint: operation.safety === "destructive" }
            : {}),
          idempotentHint: operation.idempotent,
          openWorldHint: operation.openWorld,
        },
      },
      async (input) => {
        try {
          const { output, failed } = await operation.invoke(input);
          return {
            content: [{ type: "text", text: JSON.stringify(output, null, 2) }],
            ...(operation.output ? { structuredContent: output } : {}),
            ...(failed ? { isError: true } : {}),
          };
        } catch (error) {
          return {
            content: [{ type: "text", text: `${operation.failurePrefix}: ${errorMessage(error)}` }],
            isError: true,
          };
        }
      },
    );
  }

  server.registerResource(
    "capability-evidence-levels",
    "docs://capability-evidence-levels",
    {
      description:
        "The shared listed, generated, build-verified, and runtime-verified capability evidence contract.",
      mimeType: "application/json",
      cacheHint: { ttlMs: 300_000, cacheScope: "public" },
    },
    async () => ({
      contents: [
        {
          uri: "docs://capability-evidence-levels",
          text: JSON.stringify(
            getCapabilityEvidenceReport({ catalogVersion: getLatestCLIVersion() }),
            null,
            2,
          ),
        },
      ],
    }),
  );

  server.registerResource(
    "compatibility-rules",
    "docs://compatibility-rules",
    {
      description:
        "Stack compatibility rules - which frontend/backend/API/ORM combinations are valid. Read this BEFORE scaffolding.",
      mimeType: "text/markdown",
      cacheHint: { ttlMs: 300_000, cacheScope: "public" },
    },
    async () => ({
      contents: [{ uri: "docs://compatibility-rules", text: renderCompatibilityGuide() }],
    }),
  );

  server.registerResource(
    "stack-options",
    "docs://stack-options",
    {
      description: "All available technology options per category for every ecosystem.",
      mimeType: "application/json",
      cacheHint: { ttlMs: 300_000, cacheScope: "public" },
    },
    async () => ({
      contents: [
        { uri: "docs://stack-options", text: JSON.stringify(getSchemaOptions(), null, 2) },
      ],
    }),
  );

  server.registerResource(
    "getting-started",
    "docs://getting-started",
    {
      description: "Quick start guide for scaffolding projects with Better-Fullstack MCP.",
      mimeType: "text/markdown",
      cacheHint: { ttlMs: 300_000, cacheScope: "public" },
    },
    async () => ({
      contents: [{ uri: "docs://getting-started", text: GETTING_STARTED_MD }],
    }),
  );

  return server;
}

export async function startMcpServer() {
  await serveStdio(createMcpServer);
}
