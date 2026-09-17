import { z } from "zod";

import { defineOperation, sanitizePath, sanitizeProjectName } from "@/operations/operation";
import { createProjectOutputSchema, planProjectOutputSchema } from "@/operations/output-schemas";
import {
  buildProjectConfig,
  getInstallCommand,
  getMcpGraphPreview,
  summarizeTree,
} from "@/operations/stack-helpers";
import { MCP_PLAN_CREATE_SCHEMA } from "@/operations/stack-input";
import { runWithContextAsync } from "@/presentation/context";
import { trackEvent, trackProjectCreation } from "@/telemetry/analytics";

export const planProjectOperation = defineOperation({
  name: "plan_project",
  title: "Plan project (dry run)",
  description:
    "Dry-run: generates a project in-memory and returns the file tree WITHOUT writing to disk. Use this to preview what would be created.",
  input: z.object(MCP_PLAN_CREATE_SCHEMA),
  output: planProjectOutputSchema,
  safety: "read",
  idempotent: true,
  openWorld: false,
  failurePrefix: "Plan failed",
  run: async (input) => {
    const { generateVirtualProject, EMBEDDED_TEMPLATES } =
      await import("@better-fullstack/template-generator");
    const config = buildProjectConfig(input);
    const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
    if (!result.success || !result.tree) {
      throw new Error(result.error ?? "Unknown error");
    }
    return { success: true as const, ...summarizeTree(result.tree), ...getMcpGraphPreview(config) };
  },
});

export const createProjectOperation = defineOperation({
  name: "create_project",
  title: "Create project",
  description:
    "Creates a new fullstack project on disk. Dependencies are NOT installed (agent must tell user to install manually). Call bfs_plan_project first to preview.",
  input: z.object({
    ...MCP_PLAN_CREATE_SCHEMA,
    projectName: z
      .string()
      .regex(/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/)
      .refine((value) => value !== ".")
      .describe("Project name (kebab-case). Will be the directory name."),
    targetDir: z
      .string()
      .optional()
      .describe(
        "Absolute path to the parent directory in which to create the project folder (default: current working directory).",
      ),
  }),
  output: createProjectOutputSchema,
  safety: "action",
  idempotent: false,
  openWorld: false,
  failurePrefix: "Project creation failed",
  run: async (input) => {
    const startTime = Date.now();
    try {
      const path = await import("node:path");
      const projectName = sanitizeProjectName(input.projectName);
      const targetDir = input.targetDir ? sanitizePath(input.targetDir) : undefined;
      const projectDir = path.resolve(targetDir ?? process.cwd(), projectName);
      const config = buildProjectConfig(input, { projectDir });
      const { createProject } = await import("@/helpers/core/create-project.js");
      const result = await runWithContextAsync({ silent: true }, () =>
        createProject(config, { allowExistingDirectory: false }),
      );
      const installCmd = getInstallCommand(
        input.ecosystem ?? "typescript",
        projectName,
        input.packageManager,
        input.javaBuildTool,
        input.javaWebFramework,
        input.pythonPackageManager,
      );
      await trackProjectCreation(config, false, {
        source: "mcp",
        success: true,
        fileCount: result.fileCount,
        durationMs: Date.now() - startTime,
      });
      return {
        success: true as const,
        projectDirectory: projectDir,
        fileCount: result.fileCount,
        ...getMcpGraphPreview(config),
        ...(result.addonWarnings.length > 0
          ? { capabilityWarnings: result.addonWarnings, addonWarnings: result.addonWarnings }
          : {}),
        lifecycle: result.lifecycle,
        message: `Project created at ${projectDir}. Tell the user to run: ${installCmd}`,
      };
    } catch (error) {
      await trackEvent(
        "project_created",
        {},
        {
          source: "mcp",
          success: false,
          errorName: error instanceof Error ? error.name : "UnknownError",
          durationMs: Date.now() - startTime,
        },
      );
      throw error;
    }
  },
});
