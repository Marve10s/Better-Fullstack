import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { type TemplateData, processTemplatesFromPrefix } from "./utils";

export async function processRateLimitTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (!config.rateLimit || config.rateLimit === "none") return;
  if (config.backend === "none" || config.backend === "convex") return;

  const targetDir = config.backend === "self" ? "apps/web" : "apps/server";

  processTemplatesFromPrefix(
    vfs,
    templates,
    `rate-limit/${config.rateLimit}/server/base`,
    targetDir,
    config,
  );
}
