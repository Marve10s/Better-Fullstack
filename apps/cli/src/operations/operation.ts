import { z } from "zod";

/** Prefix shared by every agent-facing tool name: the MCP server advertises `bfs_<name>`. */
export const OPERATION_TOOL_PREFIX = "bfs";

export type OperationSafety = "read" | "action" | "destructive";

export type JsonObject = Record<string, unknown>;

export type OperationSpec<Input extends JsonObject, Output extends object> = {
  name: string;
  title: string;
  description: string;
  input: z.ZodType<Input>;
  /** Advertised output schema, enforced by each transport. Omit for unstructured tools. */
  output?: z.ZodType<JsonObject>;
  safety: OperationSafety;
  idempotent: boolean;
  /** Whether the handler reaches outside the project (toolchains, network). */
  openWorld: boolean;
  /** Text prefix for a thrown error. Defaults to `<title> failed`. */
  failurePrefix?: string;
  /** Marks a returned payload as a failed call. Defaults to `success === false`. */
  isFailure?: (output: NoInfer<Output>) => boolean;
  run: (input: Input) => Promise<Output>;
};

/**
 * One lifecycle operation declared once and projected onto the MCP stdio
 * server. The generic spec is erased so heterogeneous operations share one list.
 */
export type ProjectOperation = Omit<
  OperationSpec<JsonObject, object>,
  "isFailure" | "run" | "failurePrefix"
> & {
  failurePrefix: string;
  invoke: (rawInput: unknown) => Promise<{ output: JsonObject; failed: boolean }>;
};

export function operationToolName(operation: { name: string }): string {
  return `${OPERATION_TOOL_PREFIX}_${operation.name}`;
}

export function defineOperation<Input extends JsonObject, Output extends object>(
  spec: OperationSpec<Input, Output>,
): ProjectOperation {
  const { isFailure, run, failurePrefix, ...declared } = spec;
  const failed =
    isFailure ?? ((output: Output) => (output as { success?: unknown }).success === false);
  return {
    ...declared,
    failurePrefix: failurePrefix ?? `${spec.title} failed`,
    invoke: async (rawInput) => {
      const output = await run(spec.input.parse(rawInput));
      // Handlers return typed contracts; transports advertise `output` and
      // validate against it, so the erased projection is a plain JSON object.
      return { output: output as JsonObject, failed: failed(output) };
    },
  };
}

export function sanitizePath(input: string): string {
  for (const ch of input) {
    if (ch.charCodeAt(0) < 0x20) {
      throw new Error("Path contains control characters");
    }
  }
  if (input.split(/[/\\]/).includes("..")) {
    throw new Error("Path must not contain '..' components");
  }
  return input;
}

export function sanitizeProjectName(input: string): string {
  const projectName = sanitizePath(input);
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(projectName) || projectName === ".") {
    throw new Error("Project name must be one portable directory name");
  }
  return projectName;
}

export const projectDirInput = z.string().describe("Path to the existing Better Fullstack project");

export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
