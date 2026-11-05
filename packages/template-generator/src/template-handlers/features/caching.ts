import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { type TemplateData, processTemplatesFromPrefix } from "@/template-handlers/core/utils";

export async function processCachingTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (!config.caching || config.caching === "none") return;
  if (config.backend === "none" || config.backend === "convex") return;

  const targetDir = config.backend === "self" ? "apps/web" : "apps/server";

  processTemplatesFromPrefix(
    vfs,
    templates,
    `caching/${config.caching}/server/base`,
    targetDir,
    config,
  );
}
