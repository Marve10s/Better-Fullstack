import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import {
  type TemplateData,
  processSingleTemplate,
  processTemplatesFromPrefix,
} from "@/template-handlers/core/utils";

export async function processBackendTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (config.backend === "none") return;

  if (config.backend === "convex") {
    processTemplatesFromPrefix(
      vfs,
      templates,
      "backend/convex/packages/backend",
      "packages/backend",
      config,
    );
    return;
  }

  if (config.backend === "self") return;

  if (config.backend === "encore") {
    processTemplatesFromPrefix(vfs, templates, "backend/server/encore", "apps/server", config);
    return;
  }

  if (config.backend === "adonisjs") {
    processTemplatesFromPrefix(vfs, templates, "backend/server/adonisjs", "apps/server", config);
    return;
  }

  if (config.backend === "nitro") {
    const excludes: string[] = [];
    if (config.api !== "trpc") excludes.push("backend/server/nitro/routes/trpc/");
    if (config.api !== "orpc")
      excludes.push(
        "backend/server/nitro/routes/rpc/",
        "backend/server/nitro/routes/api-reference/",
      );
    processTemplatesFromPrefix(
      vfs,
      templates,
      "backend/server/nitro",
      "apps/server",
      config,
      excludes,
    );
    return;
  }

  if (config.backend === "fets") {
    processTemplatesFromPrefix(vfs, templates, "backend/server/base", "apps/server", config);
    processTemplatesFromPrefix(vfs, templates, "backend/server/fets", "apps/server", config);
    return;
  }

  processTemplatesFromPrefix(vfs, templates, "backend/server/base", "apps/server", config);
  processTemplatesFromPrefix(
    vfs,
    templates,
    `backend/server/${config.backend}`,
    "apps/server",
    config,
  );
}

/**
 * One server image for every container deploy target and the Docker Compose addon. It is built
 * from the repository root because the server resolves workspace and catalog dependencies.
 */
export function processServerImageTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): void {
  processSingleTemplate(
    vfs,
    templates,
    "backend/docker/Dockerfile",
    "apps/server/Dockerfile",
    config,
  );
  processSingleTemplate(vfs, templates, "backend/docker/.dockerignore", ".dockerignore", config);
}
