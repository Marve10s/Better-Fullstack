import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { addPackageDependency, type AvailableDependencies } from "../utils/add-deps";

export function processI18nDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const { i18n, frontend, backend } = config;

  // Skip if not selected or set to "none"
  if (!i18n || i18n === "none") return;

  if (i18n === "next-intl") {
    // next-intl goes into the web package only (Next.js frontend)
    const webPath = "apps/web/package.json";
    if (vfs.exists(webPath)) {
      addPackageDependency({
        vfs,
        packagePath: webPath,
        dependencies: ["next-intl"],
      });
    }
    return;
  }

  if (i18n === "i18next") {
    // i18next goes into the web package for all frontends
    const webPath = "apps/web/package.json";
    if (vfs.exists(webPath)) {
      const deps: AvailableDependencies[] = [
        "i18next",
        "i18next-browser-languagedetector",
        "i18next-http-backend",
      ];

      // Add React bindings for React-based frontends
      const hasReactWeb = frontend.some((f) =>
        ["next", "tanstack-router", "react-router", "tanstack-start", "react-vite"].includes(f),
      );

      if (hasReactWeb) {
        deps.push("react-i18next");
      }

      addPackageDependency({
        vfs,
        packagePath: webPath,
        dependencies: deps,
      });
    }

    // Also add to server if there is a standalone backend
    if (backend !== "none" && backend !== "convex" && backend !== "self") {
      const serverPath = "apps/server/package.json";
      if (vfs.exists(serverPath)) {
        addPackageDependency({
          vfs,
          packagePath: serverPath,
          dependencies: ["i18next"],
        });
      }
    }
  }
}
