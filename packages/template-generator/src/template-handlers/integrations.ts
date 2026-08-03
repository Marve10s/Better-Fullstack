import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { type TemplateData, processTemplatesFromPrefix } from "./utils";

export async function processIntegrationsTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (config.integrations !== "nango") return;
  if (config.backend === "none" || config.backend === "convex") return;
  if (config.runtime === "workers") return;
  if (config.backend === "self" && config.webDeploy === "cloudflare") return;

  const destination = config.backend === "self" ? "apps/web" : "apps/server";
  processTemplatesFromPrefix(vfs, templates, "integrations/nango/server/base", destination, config);
}
