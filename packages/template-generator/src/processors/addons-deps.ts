import type { Frontend, ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { addPackageDependency, type AvailableDependencies } from "../utils/add-deps";
import { getWebPackagePath, getServerPackagePath } from "../utils/project-paths";

type PackageJson = {
  name?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  "lint-staged"?: Record<string, string | string[]>;
  [key: string]: unknown;
};

const REACT_FRONTENDS: Frontend[] = [
  "tanstack-router",
  "react-router",
  "react-vite",
  "tanstack-start",
  "next",
  "vinext",
  "redwood",
];

function getTanStackFrameworkAdapter(
  lib: "table" | "virtual",
  config: ProjectConfig,
): AvailableDependencies | null {
  const { frontend, astroIntegration } = config;

  if (frontend.some((f) => REACT_FRONTENDS.includes(f))) return `@tanstack/react-${lib}`;
  if (frontend.includes("nuxt")) return `@tanstack/vue-${lib}`;
  if (frontend.includes("svelte")) return `@tanstack/svelte-${lib}`;
  if (frontend.includes("solid") || frontend.includes("solid-start")) return `@tanstack/solid-${lib}`;
  if (frontend.includes("angular")) return `@tanstack/angular-${lib}`;
  if (frontend.includes("astro")) {
    if (astroIntegration === "react") return `@tanstack/react-${lib}`;
    if (astroIntegration === "vue") return `@tanstack/vue-${lib}`;
    if (astroIntegration === "svelte") return `@tanstack/svelte-${lib}`;
    if (astroIntegration === "solid") return `@tanstack/solid-${lib}`;
  }
  return null;
}

function getTanStackDBAdapter(config: ProjectConfig): AvailableDependencies | null {
  const { frontend, astroIntegration } = config;

  if (frontend.some((f) => REACT_FRONTENDS.includes(f))) return "@tanstack/react-db";
  if (frontend.includes("nuxt")) return "@tanstack/vue-db";
  if (frontend.includes("svelte")) return "@tanstack/svelte-db";
  if (frontend.includes("solid") || frontend.includes("solid-start")) return "@tanstack/solid-db";
  if (frontend.includes("astro")) {
    if (astroIntegration === "react") return "@tanstack/react-db";
    if (astroIntegration === "vue") return "@tanstack/vue-db";
    if (astroIntegration === "svelte") return "@tanstack/svelte-db";
    if (astroIntegration === "solid") return "@tanstack/solid-db";
  }
  return null;
}

function getTanStackQueryDeps(config: ProjectConfig): AvailableDependencies[] {
  const { frontend, astroIntegration } = config;

  if (frontend.some((f) => REACT_FRONTENDS.includes(f))) {
    return ["@tanstack/react-query", "@tanstack/react-query-devtools"];
  }
  if (frontend.includes("nuxt")) {
    return ["@tanstack/vue-query", "@tanstack/vue-query-devtools"];
  }
  if (frontend.includes("svelte")) {
    return ["@tanstack/svelte-query", "@tanstack/svelte-query-devtools"];
  }
  if (frontend.includes("solid") || frontend.includes("solid-start")) {
    return ["@tanstack/solid-query", "@tanstack/solid-query-devtools"];
  }
  if (frontend.includes("angular")) {
    return ["@tanstack/angular-query-experimental"];
  }
  if (frontend.includes("astro")) {
    if (astroIntegration === "react") return ["@tanstack/react-query", "@tanstack/react-query-devtools"];
    if (astroIntegration === "vue") return ["@tanstack/vue-query", "@tanstack/vue-query-devtools"];
    if (astroIntegration === "svelte") return ["@tanstack/svelte-query", "@tanstack/svelte-query-devtools"];
    if (astroIntegration === "solid") return ["@tanstack/solid-query", "@tanstack/solid-query-devtools"];
  }
  return [];
}

export function processAddonsDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  if (!config.addons || config.addons.length === 0) return;

  const hasViteReactFrontend =
    config.frontend.includes("react-router") ||
    config.frontend.includes("react-vite") ||
    config.frontend.includes("tanstack-router");
  const hasReactFrontend = config.frontend.some((f) => REACT_FRONTENDS.includes(f));
  const hasAstroReact = config.frontend.includes("astro") && config.astroIntegration === "react";
  const hasAstroSolid = config.frontend.includes("astro") && config.astroIntegration === "solid";
  const hasSolidFrontend =
    config.frontend.includes("solid") || config.frontend.includes("solid-start");
  const hasPwaCompatibleFrontend = hasViteReactFrontend || hasSolidFrontend;

  const webPkgPath = getWebPackagePath(config.frontend, config.backend);
  const serverPkgPath = getServerPackagePath(config.frontend, config.backend);

  if (config.addons.includes("turborepo")) {
    addPackageDependency({ vfs, packagePath: "package.json", devDependencies: ["turbo"] });
  }

  if (config.addons.includes("pwa") && hasPwaCompatibleFrontend) {
    if (vfs.exists(webPkgPath)) {
      addPackageDependency({
        vfs,
        packagePath: webPkgPath,
        dependencies: ["vite-plugin-pwa"],
        devDependencies: ["@vite-pwa/assets-generator"],
      });
      const webPkg = vfs.readJson<PackageJson>(webPkgPath);
      if (webPkg) {
        webPkg.scripts = { ...webPkg.scripts, "generate-pwa-assets": "pwa-assets-generator" };
        vfs.writeJson(webPkgPath, webPkg);
      }
    }
  }

  if (config.addons.includes("tauri")) {
    if (vfs.exists(webPkgPath)) {
      addPackageDependency({
        vfs,
        packagePath: webPkgPath,
        dependencies: ["@tauri-apps/api"],
        devDependencies: ["@tauri-apps/cli"],
      });
      const webPkg = vfs.readJson<PackageJson>(webPkgPath);
      if (webPkg) {
        webPkg.scripts = {
          ...webPkg.scripts,
          tauri: "tauri",
          "desktop:dev": "tauri dev",
          "desktop:build": "tauri build",
        };
        vfs.writeJson(webPkgPath, webPkg);
      }
    }
  }

  // MSW (Mock Service Worker) - API mocking for testing and development
  if (config.addons.includes("msw")) {
    // Add MSW to web package (for browser-based mocking)
    if (vfs.exists(webPkgPath)) {
      addPackageDependency({ vfs, packagePath: webPkgPath, devDependencies: ["msw"] });
    }

    // Add MSW to server package (for Node.js-based mocking in tests)
    if (vfs.exists(serverPkgPath)) {
      addPackageDependency({ vfs, packagePath: serverPkgPath, devDependencies: ["msw"] });
    }
  }

  // Storybook - Component development and testing
  if (config.addons.includes("storybook")) {
    if (vfs.exists(webPkgPath)) {
      // Determine framework-specific Storybook package
      const hasReactVite =
        config.frontend.includes("tanstack-router") ||
        config.frontend.includes("react-router") ||
        config.frontend.includes("react-vite");
      const hasNext = config.frontend.includes("next") || config.frontend.includes("vinext");
      const hasVue = config.frontend.includes("nuxt");
      const hasSvelte = config.frontend.includes("svelte");
      const hasSolid = config.frontend.includes("solid");

      // Base Storybook dependencies
      const devDeps: Parameters<typeof addPackageDependency>[0]["devDependencies"] = [
        "storybook",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/test",
      ];

      // Add framework-specific renderer
      if (hasNext) {
        devDeps.push("@storybook/nextjs");
      } else if (hasReactVite || hasSolid) {
        // Solid can use React Storybook with adapter, but for now use React-Vite
        devDeps.push("@storybook/react-vite", "@storybook/react");
      } else if (hasVue) {
        devDeps.push("@storybook/vue3-vite");
      } else if (hasSvelte) {
        devDeps.push("@storybook/svelte-vite");
      }

      addPackageDependency({ vfs, packagePath: webPkgPath, devDependencies: devDeps });

      // Add Storybook scripts
      const webPkg = vfs.readJson<PackageJson>(webPkgPath);
      if (webPkg) {
        webPkg.scripts = {
          ...webPkg.scripts,
          storybook: "storybook dev -p 6006",
          "build-storybook": "storybook build",
        };
        vfs.writeJson(webPkgPath, webPkg);
      }
    }
  }

  // TanStack Query (standalone - only when no API layer already bundles it)
  // tRPC, oRPC, and ts-rest all install @tanstack/*-query internally
  const apiProvidesQuery = ["trpc", "orpc", "ts-rest"].includes(config.api);
  if (config.addons.includes("tanstack-query") && !apiProvidesQuery) {
    if (vfs.exists(webPkgPath)) {
      const queryDeps = getTanStackQueryDeps(config);
      if (queryDeps.length > 0) {
        addPackageDependency({ vfs, packagePath: webPkgPath, dependencies: queryDeps });
      }
    }
  }

  // TanStack Table
  if (config.addons.includes("tanstack-table")) {
    if (vfs.exists(webPkgPath)) {
      const tableDep = getTanStackFrameworkAdapter("table", config);
      if (tableDep) {
        addPackageDependency({ vfs, packagePath: webPkgPath, dependencies: [tableDep] });
      }
    }
  }

  // TanStack Virtual
  if (config.addons.includes("tanstack-virtual")) {
    if (vfs.exists(webPkgPath)) {
      const virtualDep = getTanStackFrameworkAdapter("virtual", config);
      if (virtualDep) {
        addPackageDependency({ vfs, packagePath: webPkgPath, dependencies: [virtualDep] });
      }
    }
  }

  // TanStack DB
  if (config.addons.includes("tanstack-db")) {
    if (vfs.exists(webPkgPath)) {
      const dbDep = getTanStackDBAdapter(config);
      if (dbDep) {
        addPackageDependency({ vfs, packagePath: webPkgPath, dependencies: [dbDep] });
      } else {
        addPackageDependency({ vfs, packagePath: webPkgPath, dependencies: ["@tanstack/db"] });
      }
    }
  }

  // TanStack Pacer
  if (config.addons.includes("tanstack-pacer")) {
    if (vfs.exists(webPkgPath)) {
      if (hasReactFrontend || hasAstroReact) {
        addPackageDependency({ vfs, packagePath: webPkgPath, dependencies: ["@tanstack/react-pacer"] });
      } else if (hasSolidFrontend || hasAstroSolid) {
        addPackageDependency({ vfs, packagePath: webPkgPath, dependencies: ["@tanstack/solid-pacer"] });
      } else {
        // Core package for Vue, Svelte, Angular (no framework-specific adapter yet)
        addPackageDependency({ vfs, packagePath: webPkgPath, dependencies: ["@tanstack/pacer"] });
      }
    }
  }
}
