import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { type TemplateData, processTemplatesFromPrefix } from "@/template-handlers/core/utils";

export async function processAITemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (config.ai !== "openai-sdk" && config.ai !== "anthropic-sdk") return;
  if (config.backend === "none" || config.backend === "convex") return;

  const serverDir = config.backend === "self" ? "apps/web" : "apps/server";
  processTemplatesFromPrefix(vfs, templates, `ai/${config.ai}/server/base`, serverDir, config);
}
