import { z } from "zod";

import {
  projectContextOutputSchema,
  projectStatusOutputSchema,
  projectVerificationOutputSchema,
  recipesOutputSchema,
} from "@/mcp/mcp-lifecycle-output-schemas";
import { defineOperation, projectDirInput, sanitizePath } from "@/operations/operation";

export const getProjectStatusOperation = defineOperation({
  name: "get_project_status",
  title: "Get project status",
  description:
    "Returns Better Fullstack project status and explicit lifecycle prerequisites without executing generated toolchains.",
  input: z.object({ projectDir: projectDirInput }),
  output: projectStatusOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  run: async (input) => {
    const { getMcpProjectStatus } = await import("@/mcp/mcp-project-lifecycle.js");
    return getMcpProjectStatus(sanitizePath(input.projectDir));
  },
});

export const checkProjectOperation = defineOperation({
  name: "check_project",
  title: "Check project",
  description:
    "Executes the same complete multi-target checks as CLI check and reports every expected target, command/toolchain, status, and reason. Missing targets or toolchains fail. Build tools may fetch dependencies and write local caches, locks, generated code, or build artifacts.",
  input: z.object({ projectDir: projectDirInput }),
  output: projectVerificationOutputSchema,
  safety: "action",
  idempotent: true,
  openWorld: true,
  run: async (input) => {
    const { checkMcpProject } = await import("@/mcp/mcp-project-lifecycle.js");
    return checkMcpProject(sanitizePath(input.projectDir));
  },
  // Declared after `run` so the output type is inferred from the handler.
  isFailure: (output) => !output.success || !output.ok,
});

export const checkRecipesOperation = defineOperation({
  name: "check_recipes",
  title: "Check generated recipes",
  description:
    "Checks each recipe-owned file and exact managed-region entry against its deterministic local record. It reads files but does not execute generated code or mutate the project.",
  input: z.object({
    projectDir: projectDirInput,
    name: z.string().optional().describe("Optional recipe name or recipe ID"),
  }),
  output: recipesOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  run: async (input) => {
    const { getRecipesResult } = await import("@/commands/generation/recipes.js");
    return getRecipesResult({
      action: "check",
      dir: sanitizePath(input.projectDir),
      name: input.name,
    });
  },
});

export const getRecipeHistoryOperation = defineOperation({
  name: "get_recipe_history",
  title: "Get recipe history",
  description:
    "Correlates deterministic recipe records with their project recovery transactions. It does not modify the project.",
  input: z.object({ projectDir: projectDirInput }),
  output: recipesOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  isFailure: () => false,
  run: async (input) => {
    const { getRecipesResult } = await import("@/commands/generation/recipes.js");
    return getRecipesResult({ action: "history", dir: sanitizePath(input.projectDir) });
  },
});

export const getProjectContextOperation = defineOperation({
  name: "get_project_context",
  title: "Get project context",
  description:
    "Returns the bounded project roles, capabilities, evidence, owning Stack Parts, compatibility issues, installed-version references, recipes, commands, and safe next actions without exposing source code.",
  input: z.object({ projectDir: projectDirInput }),
  output: projectContextOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  isFailure: () => false,
  run: async (input) => {
    const { getProjectContext } = await import("@/project/project-context.js");
    return getProjectContext(sanitizePath(input.projectDir));
  },
});
