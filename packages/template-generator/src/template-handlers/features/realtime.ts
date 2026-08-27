import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { type TemplateData, processTemplatesFromPrefix } from "@/template-handlers/core/utils";

export async function processRealtimeTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (config.realtime !== "ws") return;
  if (config.backend !== "express") return;

  processTemplatesFromPrefix(vfs, templates, "realtime/ws/server/base", "apps/server", config);

  if (vfs.exists("apps/web/package.json")) {
    processTemplatesFromPrefix(vfs, templates, "realtime/ws/web/base", "apps/web", config);
  }
}
