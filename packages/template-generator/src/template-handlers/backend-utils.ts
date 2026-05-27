import type { ProjectConfig } from "@better-fullstack/types";
import type { VirtualFileSystem } from "../core/virtual-fs";
import { type TemplateData, processTemplatesFromPrefix } from "./utils";

/**
 * Scaffolds the asyncHandler, ApiResponse, and global error handling middleware.
 */
export async function processBackendUtilsTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (!config.backendUtils || config.backendUtils === "none") return;
  if (config.backend === "none" || config.backend === "convex") return;

  const targetDir = config.backend === "self" ? "apps/web" : "apps/server";

  // Scaffold standard server utility files
  processTemplatesFromPrefix(
    vfs,
    templates,
    `backend-utils/${config.backendUtils}/server/base`,
    targetDir,
    config,
  );
}
