import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import {
  hasTemplatesWithPrefix,
  processTemplatesFromPrefix,
  type TemplateData,
} from "@/template-handlers/core/utils";

export async function processJobQueueTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (!config.jobQueue || config.jobQueue === "none") return;
  if (config.backend === "convex") return;
  if (config.backend === "none") return;

  processTemplatesFromPrefix(
    vfs,
    templates,
    `job-queue/${config.jobQueue}/server/base`,
    config.backend === "self" ? "apps/web" : "apps/server",
    config,
  );

  if (config.backend !== "self") return;
  const fullstackPrefix = config.frontend
    .map((frontend) => `job-queue/${config.jobQueue}/fullstack/${frontend}`)
    .find((prefix) => hasTemplatesWithPrefix(templates, prefix));
  if (fullstackPrefix) {
    processTemplatesFromPrefix(vfs, templates, fullstackPrefix, "apps/web", config);
  }
}
