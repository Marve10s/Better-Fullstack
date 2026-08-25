import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { addPackageDependency } from "@/dependencies/add-deps";

export function processEcommerceDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  if (config.ecommerce !== "medusa") return;
  if (config.backend === "none" || config.backend === "convex") return;

  const packagePath =
    config.backend === "self" ? "apps/web/package.json" : "apps/server/package.json";
  if (!vfs.exists(packagePath)) return;

  addPackageDependency({
    vfs,
    packagePath,
    dependencies: ["@medusajs/js-sdk"],
  });
}
