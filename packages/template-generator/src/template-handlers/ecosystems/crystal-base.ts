import type { ProjectConfig } from "@better-fullstack/types";
import type { VirtualFileSystem } from "@/core/virtual-fs";
import { renderTemplateTree, type TemplateData } from "@/template-handlers/core/utils";

export async function processCrystalBaseTemplate(vfs: VirtualFileSystem, templates: TemplateData, config: ProjectConfig, targetPath = "") {
  const shardName = `app_${config.projectName.toLowerCase().replace(/[^a-z0-9_]/g, "_")}`;
  const context = { ...config, shardName, hasKemal: config.crystalWebFramework === "kemal" };
  await renderTemplateTree(vfs, templates, { prefix: "crystal-base/", targetPath, context });
}
