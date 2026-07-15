import { getLocalWebDevPort, type Frontend, type ProjectConfig } from "@better-fullstack/types";

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
  if (frontend.includes("nuxt") || frontend.includes("vue")) return `@tanstack/vue-${lib}`;
  if (frontend.includes("svelte")) return `@tanstack/svelte-${lib}`;
  if (frontend.includes("solid") || frontend.includes("solid-start"))
    return `@tanstack/solid-${lib}`;
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
  if (frontend.includes("nuxt") || frontend.includes("vue")) return "@tanstack/vue-db";
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
  if (frontend.includes("nuxt") || frontend.includes("vue")) {
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
    if (astroIntegration === "react")
      return ["@tanstack/react-query", "@tanstack/react-query-devtools"];
    if (astroIntegration === "vue") return ["@tanstack/vue-query", "@tanstack/vue-query-devtools"];
    if (astroIntegration === "svelte")
      return ["@tanstack/svelte-query", "@tanstack/svelte-query-devtools"];
    if (astroIntegration === "solid")
      return ["@tanstack/solid-query", "@tanstack/solid-query-devtools"];
  }
  return [];
}

export function processAddonsDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  if (!config.addons || config.addons.length === 0) return;

  const hasViteReactFrontend =
    config.frontend.includes("react-router") ||
    config.frontend.includes("react-vite") ||
    config.frontend.includes("tanstack-router") ||
    config.frontend.includes("vinext");
  const hasReactFrontend = config.frontend.some((f) => REACT_FRONTENDS.includes(f));
  const hasAstroReact = config.frontend.includes("astro") && config.astroIntegration === "react";
  const hasAstroSolid = config.frontend.includes("astro") && config.astroIntegration === "solid";
  const hasSolidFrontend =
    config.frontend.includes("solid") || config.frontend.includes("solid-start");
  const hasPwaCompatibleFrontend =
    hasViteReactFrontend ||
    hasSolidFrontend ||
    config.frontend.includes("vanilla-vite") ||
    config.frontend.includes("vue");

  const webPkgPath = getWebPackagePath(config.frontend, config.backend);
  const serverPkgPath = getServerPackagePath(config.frontend, config.backend);

  if (config.addons.includes("turborepo")) {
    addPackageDependency({ vfs, packagePath: "package.json", devDependencies: ["turbo"] });
  }

  if (config.addons.includes("nx")) {
    addPackageDependency({ vfs, packagePath: "package.json", devDependencies: ["nx"] });
  }

  if (config.addons.includes("eslint")) {
    addPackageDependency({
      vfs,
      packagePath: "package.json",
      devDependencies: ["eslint", "@eslint/js", "typescript-eslint", "globals"],
    });
    const rootPkg = vfs.readJson<PackageJson>("package.json");
    if (rootPkg) {
      rootPkg.scripts = {
        ...rootPkg.scripts,
        "lint:eslint": "eslint .",
      };
      vfs.writeJson("package.json", rootPkg);
    }
  }

  if (config.addons.includes("prettier")) {
    addPackageDependency({ vfs, packagePath: "package.json", devDependencies: ["prettier"] });
    const rootPkg = vfs.readJson<PackageJson>("package.json");
    if (rootPkg) {
      rootPkg.scripts = {
        ...rootPkg.scripts,
        "format:prettier": "prettier --write .",
        "format:prettier:check": "prettier --check .",
      };
      vfs.writeJson("package.json", rootPkg);
    }
  }

  if (config.addons.includes("axios") && vfs.exists(webPkgPath)) {
    addPackageDependency({ vfs, packagePath: webPkgPath, dependencies: ["axios"] });
  }

  if (config.addons.includes("firebase") && vfs.exists(webPkgPath)) {
    addPackageDependency({ vfs, packagePath: webPkgPath, dependencies: ["firebase"] });
  }

  if (config.addons.includes("graphql-codegen") && vfs.exists(webPkgPath)) {
    addPackageDependency({
      vfs,
      packagePath: webPkgPath,
      devDependencies: ["@graphql-codegen/cli", "@graphql-codegen/client-preset", "graphql"],
    });
    const webPkg = vfs.readJson<PackageJson>(webPkgPath);
    if (webPkg) {
      webPkg.scripts = { ...webPkg.scripts, codegen: "graphql-codegen --config codegen.ts" };
      vfs.writeJson(webPkgPath, webPkg);
    }
  }

  if (config.addons.includes("openapi-typescript") && vfs.exists(webPkgPath)) {
    vfs.writeFile(webPkgPath.replace("package.json", "src/lib/.gitkeep"), "");
    addPackageDependency({
      vfs,
      packagePath: webPkgPath,
      devDependencies: ["openapi-typescript"],
    });
    const webPkg = vfs.readJson<PackageJson>(webPkgPath);
    if (webPkg) {
      webPkg.scripts = {
        ...webPkg.scripts,
        "codegen:openapi":
          "openapi-typescript ${OPENAPI_SCHEMA_URL:-http://localhost:3000/openapi.json} -o src/lib/api-schema.d.ts",
      };
      vfs.writeJson(webPkgPath, webPkg);
    }
  }

  if (config.addons.includes("apollo-client") && vfs.exists(webPkgPath)) {
    addPackageDependency({
      vfs,
      packagePath: webPkgPath,
      dependencies: ["@apollo/client", "graphql"],
    });
  }

  if (config.addons.includes("electron") && vfs.exists(webPkgPath)) {
    addPackageDependency({
      vfs,
      packagePath: webPkgPath,
      devDependencies: ["electron", "electron-builder", "concurrently", "cross-env", "wait-on"],
    });
    const webPkg = vfs.readJson<PackageJson>(webPkgPath);
    if (webPkg) {
      webPkg.main = "electron/main.mjs";
      const rendererUrl = `http://localhost:${getLocalWebDevPort(config.frontend)}`;
      const devCommand = `${config.packageManager} run dev`;
      const electronDev = `concurrently -k "${devCommand}" "wait-on ${rendererUrl} && cross-env ELECTRON_RENDERER_URL=${rendererUrl} electron electron/main.mjs"`;
      const electronBuild = `${config.packageManager} run build && electron-builder`;
      webPkg.scripts = {
        ...webPkg.scripts,
        "electron:dev": electronDev,
        "electron:build": electronBuild,
        ...(!config.addons.includes("tauri") && {
          "desktop:dev": electronDev,
          "desktop:build": electronBuild,
        }),
      };
      vfs.writeJson(webPkgPath, webPkg);
    }
  }

  if (config.addons.includes("capacitor") && vfs.exists(webPkgPath)) {
    addPackageDependency({
      vfs,
      packagePath: webPkgPath,
      dependencies: ["@capacitor/core"],
      devDependencies: ["@capacitor/cli", "@capacitor/ios", "@capacitor/android"],
    });
    const webPkg = vfs.readJson<PackageJson>(webPkgPath);
    if (webPkg) {
      webPkg.scripts = {
        ...webPkg.scripts,
        "mobile:sync": "cap sync",
        "mobile:ios": "cap add ios || true && cap open ios",
        "mobile:android": "cap add android || true && cap open android",
      };
      vfs.writeJson(webPkgPath, webPkg);
    }
  }

  if (config.addons.includes("ultracite")) {
    addPackageDependency({
      vfs,
      packagePath: "package.json",
      devDependencies: ["@biomejs/biome", "ultracite"],
    });

    const rootPkg = vfs.readJson<PackageJson>("package.json");
    if (rootPkg) {
      rootPkg.scripts = {
        ...rootPkg.scripts,
        lint: rootPkg.scripts?.lint ?? "ultracite check",
        format: rootPkg.scripts?.format ?? "ultracite fix",
        "lint:doctor": rootPkg.scripts?.["lint:doctor"] ?? "ultracite doctor",
      };
      vfs.writeJson("package.json", rootPkg);
    }
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
          "tauri:dev": "tauri dev",
          "tauri:build": "tauri build",
          ...(!config.addons.includes("electron") && {
            "desktop:dev": "tauri dev",
            "desktop:build": "tauri build",
          }),
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
        // @storybook/react must be installed explicitly: @storybook/nextjs
        // re-exports its types (Meta/StoryObj) and isolated installs (bun)
        // don't hoist it for the app's type-checker.
        devDeps.push("@storybook/nextjs", "@storybook/react");
      } else if (hasReactVite || hasSolid) {
        // Solid can use React Storybook with adapter, but for now use React-Vite
        devDeps.push("@storybook/react-vite", "@storybook/react");
      } else if (hasVue) {
        devDeps.push("@storybook/vue3-vite", "@storybook/vue3");
      } else if (hasSvelte) {
        devDeps.push("@storybook/svelte-vite", "@storybook/svelte");
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
  if (config.addons.includes("swr")) {
    if (vfs.exists(webPkgPath) && (hasReactFrontend || hasAstroReact)) {
      addPackageDependency({ vfs, packagePath: webPkgPath, dependencies: ["swr"] });
    }
  }

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
        addPackageDependency({
          vfs,
          packagePath: webPkgPath,
          dependencies: ["@tanstack/react-pacer"],
        });
      } else if (hasSolidFrontend || hasAstroSolid) {
        addPackageDependency({
          vfs,
          packagePath: webPkgPath,
          dependencies: ["@tanstack/solid-pacer"],
        });
      } else {
        // Core package for Vue, Svelte, Angular (no framework-specific adapter yet)
        addPackageDependency({ vfs, packagePath: webPkgPath, dependencies: ["@tanstack/pacer"] });
      }
    }
  }
}
