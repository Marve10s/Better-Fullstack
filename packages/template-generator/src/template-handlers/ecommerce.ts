import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { type TemplateData, processTemplatesFromPrefix } from "./utils";

export async function processEcommerceTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (config.ecommerce !== "medusa") return;
  if (config.backend === "none" || config.backend === "convex") return;

  const destination = config.backend === "self" ? "apps/web" : "apps/server";
  processTemplatesFromPrefix(vfs, templates, "ecommerce/medusa/server/base", destination, config);
}
