import { AddonsSchema, CreateInputSchema, PackageManagerSchema } from "@better-fullstack/types";
import { z } from "zod";

export const MCP_PLAN_CREATE_SCHEMA = {
  ...CreateInputSchema.omit({
    template: true,
    shape: true,
    yes: true,
    yolo: true,
    verbose: true,
    dryRun: true,
    verify: true,
    git: true,
    install: true,
    directoryConflict: true,
    renderTitle: true,
    disableAnalytics: true,
    manualDb: true,
  }).shape,
  projectName: z.string().optional().describe("Project name (kebab-case)"),
  addons: z.array(AddonsSchema).optional().describe("Deprecated alias for tooling part bindings"),
  packageManager: PackageManagerSchema.optional().describe("Package manager (default: bun)"),
};

const {
  addons: _createOnlyAddonsAlias,
  workspaceShape: _createOnlyWorkspaceShape,
  ...MCP_STACK_UPDATE_BASE_SCHEMA
} = MCP_PLAN_CREATE_SCHEMA;

export const MCP_STACK_UPDATE_SCHEMA = {
  ...MCP_STACK_UPDATE_BASE_SCHEMA,
  projectDir: z.string().describe("Absolute path to the existing Better-Fullstack project"),
  acknowledgeArchitectureChange: z
    .boolean()
    .optional()
    .describe(
      "Acknowledge that this update replaces an existing database/orm/auth/api/backend/runtime choice. Required to apply architecture-changing updates; data and schema are NOT migrated automatically.",
    ),
};
