import { defineDevframe } from "devframe";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { z } from "zod";

import { allOperations, operationToolId } from "@/operations";
import { getLatestCLIVersion } from "@/platform/get-latest-cli-version";

export const DEVTOOLS_ID = "better-fullstack";
export const DEVTOOLS_SCOPE = "bfs";

export type DevtoolsDefinitionOptions = {
  /** The project the panel and every read operation default to. */
  projectDir?: string;
};

/** Catalog reads baked into a static build even though they take no project directory. */
const SNAPSHOT_CATALOG_OPERATIONS = new Set(["get_guidance", "get_capability_evidence"]);

/**
 * The built panel lives next to the bundled CLI in the published package and
 * under packages/devtools-ui when running from source. Without either the
 * server still serves RPC and MCP (Devframe's bridge mode).
 */
export function resolveClientAssets(): string | undefined {
  const candidates = [
    new URL("./devtools-ui/", import.meta.url),
    new URL("../../../../packages/devtools-ui/dist/", import.meta.url),
  ];
  for (const candidate of candidates) {
    const dir = fileURLToPath(candidate);
    if (existsSync(dir)) return dir;
  }
  return undefined;
}

// Same target, direction, and output `$ref` reuse as the stdio MCP server, so
// both projections advertise identical schemas.
function toMcpJsonSchema(schema: z.ZodType, io: "input" | "output") {
  const jsonSchema = z.toJSONSchema(schema, {
    target: "draft-2020-12",
    io,
    ...(io === "output" ? { reused: "ref" } : {}),
  });
  // A discriminated union has no root `type`; the SDK adds `object` when every
  // member is object shaped, and MCP clients reject output schemas without it.
  return jsonSchema.type === undefined && isProvablyObjectShapedRoot(jsonSchema)
    ? { type: "object", ...jsonSchema }
    : jsonSchema;
}

function isProvablyObjectShapedRoot(schema: Record<string, unknown>): boolean {
  if (
    "properties" in schema ||
    "patternProperties" in schema ||
    "additionalProperties" in schema ||
    "required" in schema
  ) {
    return true;
  }
  for (const key of ["oneOf", "anyOf", "allOf"]) {
    const members = schema[key];
    if (Array.isArray(members) && members.length > 0) {
      return members.every(
        (member: unknown) =>
          typeof member === "object" &&
          member !== null &&
          ((member as { type?: unknown }).type === "object" ||
            isProvablyObjectShapedRoot(member as Record<string, unknown>)),
      );
    }
  }
  return false;
}

/**
 * The Better Fullstack devframe: one definition that serves the project
 * panel RPC, the HTTP MCP route, and the static report. The build adapter
 * passes no flags, so the project directory is bound when the definition is
 * created rather than read from `setup` flags.
 */
export function createDevtoolsDefinition(options: DevtoolsDefinitionOptions = {}) {
  return defineDevframe({
    id: DEVTOOLS_ID,
    name: "Better Fullstack",
    version: getLatestCLIVersion(),
    packageName: "create-better-fullstack",
    importMetaUrl: import.meta.url,
    homepage: "https://better-fullstack.dev",
    description: "Inspect, check, and change a Better Fullstack project while it runs.",
    icon: "ph:stack-duotone",
    clientAssets: resolveClientAssets(),
    async setup(ctx) {
      const projectDir = options.projectDir ?? ctx.cwd;
      const scope = ctx.scope(DEVTOOLS_SCOPE);

      // The panel learns the project it is looking at from this slot.
      await scope.rpc.sharedState("project", { initialValue: { projectDir } });

      for (const operation of allOperations) {
        const takesProjectDir =
          operation.input instanceof z.ZodObject && "projectDir" in operation.input.shape;
        const snapshot =
          ctx.mode === "build" &&
          operation.safety === "read" &&
          (takesProjectDir || SNAPSHOT_CATALOG_OPERATIONS.has(operation.name)) &&
          operation.input.safeParse({ projectDir }).success;

        // Panel-facing RPC. The project directory defaults to the served project
        // so a static build can bake the no-argument call of every read.
        scope.rpc.register({
          name: operation.name,
          type: operation.safety === "read" ? "query" : "action",
          jsonSerializable: true,
          ...(snapshot ? { snapshot: true } : {}),
          handler: async (input?: Record<string, unknown>) =>
            (
              await operation.invoke({
                ...input,
                ...(takesProjectDir && !input?.projectDir ? { projectDir } : {}),
              })
            ).output,
        });

        // Agent-facing tool with explicit JSON schemas so the input stays the
        // flat object the stdio MCP server advertises, not positional `arg0`.
        ctx.agent.registerTool({
          id: operationToolId(operation),
          title: operation.title,
          description: operation.description,
          safety: operation.safety,
          inputSchema: toMcpJsonSchema(operation.input, "input"),
          ...(operation.output
            ? { outputSchema: toMcpJsonSchema(operation.output, "output") }
            : {}),
          handler: async (input: unknown) => (await operation.invoke(input)).output,
        });
      }
    },
  });
}

/** Definition bound to the current working directory, for tests and tooling. */
export const devtoolsDefinition = createDevtoolsDefinition();
