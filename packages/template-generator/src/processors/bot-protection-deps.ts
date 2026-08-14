import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { addPackageDependency } from "../utils/add-deps";
import { getWebPackagePath } from "../utils/project-paths";

export function processBotProtectionDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  if (!config.botProtection || config.botProtection === "none") return;

  const webPackagePath = getWebPackagePath(config.frontend, config.backend);
  const hasReactWebFrontend = config.frontend.some((value) =>
    [
      "next",
      "vinext",
      "react-router",
      "react-vite",
      "tanstack-router",
      "tanstack-start",
      "redwood",
    ].includes(value),
  );
  if (vfs.exists(webPackagePath) && (config.botProtection === "botid" || hasReactWebFrontend)) {
    addPackageDependency({
      vfs,
      packagePath: webPackagePath,
      dependencies: config.botProtection === "botid" ? ["botid"] : ["@marsidev/react-turnstile"],
    });
  }

  if (config.botProtection === "botid" && vfs.exists("packages/auth/package.json")) {
    addPackageDependency({
      vfs,
      packagePath: "packages/auth/package.json",
      dependencies: ["botid"],
    });
  }
}
