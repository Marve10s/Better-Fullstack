import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { addPackageDependency } from "@/dependencies/add-deps";
import { getServerDependencyTarget } from "@/platform/server-dependency-target";

export function processLoggingDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const { logging } = config;
  if (!logging || logging === "none") return;

  const targetPath = getServerDependencyTarget(vfs, config);
  if (!targetPath) return;

  // Add Pino for pino option
  if (logging === "pino") {
    addPackageDependency({
      vfs,
      packagePath: targetPath,
      dependencies: ["pino", "pino-http"],
      devDependencies: ["pino-pretty"],
    });
  }

  // Add Winston for winston option
  if (logging === "winston") {
    addPackageDependency({
      vfs,
      packagePath: targetPath,
      dependencies: ["winston"],
    });
  }

  if (logging === "evlog") {
    addPackageDependency({
      vfs,
      packagePath: targetPath,
      dependencies: ["evlog"],
    });
  }
}
