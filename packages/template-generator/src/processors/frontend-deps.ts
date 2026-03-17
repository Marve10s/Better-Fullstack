import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { addPackageDependency, type AvailableDependencies } from "../utils/add-deps";
import { getWebPackagePath } from "../utils/project-paths";

export function processFrontendDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const { frontend, backend } = config;

  // Process each frontend type
  if (frontend.includes("next")) processNextDeps(vfs, config);
  if (frontend.includes("tanstack-router")) processTanStackRouterDeps(vfs, config);
  if (frontend.includes("react-router")) processReactRouterDeps(vfs, config);
  if (frontend.includes("tanstack-start")) processTanStackStartDeps(vfs, config);
  if (frontend.includes("react-vite")) processReactViteDeps(vfs, config);
  if (frontend.includes("svelte")) processSvelteDeps(vfs, config);
  if (frontend.includes("nuxt")) processNuxtDeps(vfs, config);
  if (frontend.includes("solid")) processSolidDeps(vfs, config);
  if (frontend.includes("solid-start")) processSolidStartDeps(vfs, config);
  if (frontend.includes("astro")) processAstroDeps(vfs, config);
  if (frontend.includes("angular")) processAngularDeps(vfs, config);
  if (frontend.includes("qwik")) processQwikDeps(vfs, config);
  if (frontend.includes("redwood")) processRedwoodDeps(vfs, config);
  if (frontend.includes("native-bare")) processNativeBareDeps(vfs, config);
  if (frontend.includes("native-uniwind")) processNativeUniwindDeps(vfs, config);
  if (frontend.includes("native-unistyles")) processNativeUnistylesDeps(vfs, config);

  // Convex backend package deps
  if (backend === "convex") {
    const convexPath = "packages/backend/package.json";
    if (vfs.exists(convexPath)) {
      addPackageDependency({
        vfs,
        packagePath: convexPath,
        devDependencies: ["@types/node"],
      });
    }
  }
}

function processNextDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const webPath = getWebPackagePath(config.frontend, config.backend);
  if (!vfs.exists(webPath)) return;

  const deps: AvailableDependencies[] = [
    "next",
    "react",
    "react-dom",
    "babel-plugin-react-compiler",
    "@base-ui/react",
    "class-variance-authority",
    "clsx",
    "next-themes",
    "sonner",
    "tailwind-merge",
  ];

  const devDeps: AvailableDependencies[] = ["@types/react", "@types/react-dom", "typescript"];

  addPackageDependency({ vfs, packagePath: webPath, dependencies: deps, devDependencies: devDeps });

  if (config.cssFramework === "tailwind") {
    addPackageDependency({
      vfs,
      packagePath: webPath,
      devDependencies: ["@tailwindcss/postcss", "tailwindcss"],
    });
  }
}

function processTanStackRouterDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const webPath = getWebPackagePath(config.frontend, config.backend);
  if (!vfs.exists(webPath)) return;

  const deps: AvailableDependencies[] = [
    "react",
    "react-dom",
    "@tanstack/react-router",
    "@base-ui/react",
    "class-variance-authority",
    "clsx",
    "next-themes",
    "sonner",
    "tailwind-merge",
  ];

  const devDeps: AvailableDependencies[] = [
    "@tanstack/react-router-devtools",
    "@tanstack/router-cli",
    "@tanstack/router-plugin",
    "@types/react",
    "@types/react-dom",
    "@vitejs/plugin-react",
    "vite",
  ];

  addPackageDependency({ vfs, packagePath: webPath, dependencies: deps, devDependencies: devDeps });

  if (config.cssFramework === "tailwind") {
    addPackageDependency({
      vfs,
      packagePath: webPath,
      devDependencies: ["postcss", "tailwindcss", "@tailwindcss/vite"],
    });
  }
}

function processReactRouterDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const webPath = getWebPackagePath(config.frontend, config.backend);
  if (!vfs.exists(webPath)) return;

  const deps: AvailableDependencies[] = [
    "react",
    "react-dom",
    "react-router",
    "@react-router/fs-routes",
    "@react-router/node",
    "@react-router/serve",
    "isbot",
    "@base-ui/react",
    "class-variance-authority",
    "clsx",
    "next-themes",
    "sonner",
    "tailwind-merge",
  ];

  const devDeps: AvailableDependencies[] = [
    "@react-router/dev",
    "react-router-devtools",
    "@types/react",
    "@types/react-dom",
    "typescript",
    "vite",
    "vite-tsconfig-paths",
  ];

  addPackageDependency({ vfs, packagePath: webPath, dependencies: deps, devDependencies: devDeps });

  if (config.cssFramework === "tailwind") {
    addPackageDependency({
      vfs,
      packagePath: webPath,
      devDependencies: ["tailwindcss", "@tailwindcss/vite"],
    });
  }
}

function processTanStackStartDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const webPath = getWebPackagePath(config.frontend, config.backend);
  if (!vfs.exists(webPath)) return;

  const deps: AvailableDependencies[] = [
    "react",
    "react-dom",
    "@tanstack/react-query",
    "@tanstack/react-router",
    "@tanstack/react-router-with-query",
    "@tanstack/react-start",
    "@tanstack/router-plugin",
    "vite-tsconfig-paths",
    "@base-ui/react",
    "class-variance-authority",
    "clsx",
    "next-themes",
    "sonner",
    "tailwind-merge",
  ];

  const devDeps: AvailableDependencies[] = [
    "@tanstack/react-router-devtools",
    "@types/react",
    "@types/react-dom",
    "@vitejs/plugin-react",
    "vite",
    "web-vitals",
  ];

  addPackageDependency({ vfs, packagePath: webPath, dependencies: deps, devDependencies: devDeps });

  if (config.cssFramework === "tailwind") {
    addPackageDependency({
      vfs,
      packagePath: webPath,
      devDependencies: ["tailwindcss", "@tailwindcss/vite"],
    });
  }
}

function processReactViteDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const webPath = getWebPackagePath(config.frontend, config.backend);
  if (!vfs.exists(webPath)) return;

  const deps: AvailableDependencies[] = [
    "react",
    "react-dom",
    "react-router",
    "@base-ui/react",
    "class-variance-authority",
    "clsx",
    "next-themes",
    "sonner",
    "tailwind-merge",
    "zod",
  ];

  const devDeps: AvailableDependencies[] = [
    "@types/react",
    "@types/react-dom",
    "@vitejs/plugin-react",
    "typescript",
    "vite",
  ];

  addPackageDependency({ vfs, packagePath: webPath, dependencies: deps, devDependencies: devDeps });

  if (config.cssFramework === "tailwind") {
    addPackageDependency({
      vfs,
      packagePath: webPath,
      devDependencies: ["postcss", "tailwindcss", "@tailwindcss/vite"],
    });
  }
}

function processSvelteDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const webPath = getWebPackagePath(config.frontend, config.backend);
  if (!vfs.exists(webPath)) return;

  const deps: AvailableDependencies[] = ["@tanstack/svelte-form"];

  const devDeps: AvailableDependencies[] = [
    "@sveltejs/kit",
    "@sveltejs/vite-plugin-svelte",
    "@tailwindcss/vite",
    "svelte",
    "svelte-check",
    "tailwindcss",
    "vite",
  ];

  if (config.backend === "self") {
    devDeps.push("@sveltejs/adapter-node");
  } else {
    devDeps.push("@sveltejs/adapter-auto");
  }

  addPackageDependency({ vfs, packagePath: webPath, dependencies: deps, devDependencies: devDeps });
}

function processNuxtDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const webPath = getWebPackagePath(config.frontend, config.backend);
  if (!vfs.exists(webPath)) return;

  const deps: AvailableDependencies[] = [
    "nuxt",
    "vue",
    "vue-router",
    "@nuxt/content",
    "@nuxtjs/mdc",
  ];

  const devDeps: AvailableDependencies[] = ["tailwindcss", "@iconify-json/lucide"];

  addPackageDependency({
    vfs,
    packagePath: webPath,
    dependencies: deps,
    devDependencies: devDeps,
    customDependencies: { "@nuxt/ui": "4.2.1" },
  });
}

function processSolidDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const webPath = getWebPackagePath(config.frontend, config.backend);
  if (!vfs.exists(webPath)) return;

  const deps: AvailableDependencies[] = [
    "solid-js",
    "@tanstack/router-plugin",
    "@tanstack/solid-form",
    "@tanstack/solid-router",
    "lucide-solid",
    "@tailwindcss/vite",
    "tailwindcss",
  ];

  const devDeps: AvailableDependencies[] = ["vite", "vite-plugin-solid"];

  addPackageDependency({ vfs, packagePath: webPath, dependencies: deps, devDependencies: devDeps });
}

function processSolidStartDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const webPath = getWebPackagePath(config.frontend, config.backend);
  if (!vfs.exists(webPath)) return;

  const deps: AvailableDependencies[] = [
    "solid-js",
    "@solidjs/meta",
    "@solidjs/router",
    "@solidjs/start",
    "vinxi",
    "@tailwindcss/vite",
    "tailwindcss",
    "lucide-solid",
  ];

  const devDeps: AvailableDependencies[] = ["vite"];

  addPackageDependency({ vfs, packagePath: webPath, dependencies: deps, devDependencies: devDeps });
}

function processAstroDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const webPath = getWebPackagePath(config.frontend, config.backend);
  if (!vfs.exists(webPath)) return;

  const deps: AvailableDependencies[] = ["astro"];
  const devDeps: AvailableDependencies[] = ["@tailwindcss/vite", "tailwindcss"];

  // Astro integration deps
  if (config.astroIntegration === "react") {
    deps.push("@astrojs/react", "react", "react-dom");
    devDeps.push("@types/react", "@types/react-dom");
  } else if (config.astroIntegration === "vue") {
    deps.push("@astrojs/vue", "vue");
  } else if (config.astroIntegration === "svelte") {
    deps.push("@astrojs/svelte", "svelte");
  } else if (config.astroIntegration === "solid") {
    deps.push("@astrojs/solid-js", "solid-js");
  }

  // Backend/runtime deps
  if (config.backend === "self") {
    deps.push("@astrojs/node");
  }
  if (config.runtime === "workers") {
    deps.push("@astrojs/cloudflare");
  }

  addPackageDependency({ vfs, packagePath: webPath, dependencies: deps, devDependencies: devDeps });
}

function processAngularDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const webPath = getWebPackagePath(config.frontend, config.backend);
  if (!vfs.exists(webPath)) return;

  const deps: AvailableDependencies[] = [
    "@angular/animations",
    "@angular/common",
    "@angular/compiler",
    "@angular/core",
    "@angular/forms",
    "@angular/platform-browser",
    "@angular/platform-browser-dynamic",
    "@angular/router",
    "rxjs",
    "tslib",
    "zone.js",
  ];

  const devDeps: AvailableDependencies[] = [
    "@angular-devkit/build-angular",
    "@angular/cli",
    "@angular/compiler-cli",
  ];

  addPackageDependency({
    vfs,
    packagePath: webPath,
    dependencies: deps,
    devDependencies: devDeps,
    customDevDependencies: { typescript: "~5.7.0" },
  });
}

function processQwikDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const webPath = getWebPackagePath(config.frontend, config.backend);
  if (!vfs.exists(webPath)) return;

  const deps: AvailableDependencies[] = ["@builder.io/qwik", "@builder.io/qwik-city"];

  const devDeps: AvailableDependencies[] = [
    "@types/node",
    "typescript",
    "vite",
    "vite-tsconfig-paths",
  ];

  addPackageDependency({ vfs, packagePath: webPath, dependencies: deps, devDependencies: devDeps });
}

function processRedwoodDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  // Redwood root package.json
  const rootPath = "package.json";
  if (vfs.exists(rootPath)) {
    addPackageDependency({
      vfs,
      packagePath: rootPath,
      devDependencies: ["@redwoodjs/core"],
    });
  }

  // Redwood web package
  const webPath = getWebPackagePath(config.frontend, config.backend);
  if (vfs.exists(webPath)) {
    addPackageDependency({
      vfs,
      packagePath: webPath,
      dependencies: [
        "@redwoodjs/forms",
        "@redwoodjs/router",
        "@redwoodjs/web",
        "react",
        "react-dom",
      ],
      devDependencies: ["@redwoodjs/vite", "@types/react", "@types/react-dom", "typescript"],
    });
  }

  // Redwood api package
  const apiPath = "api/package.json";
  if (vfs.exists(apiPath)) {
    addPackageDependency({
      vfs,
      packagePath: apiPath,
      dependencies: ["@redwoodjs/api", "@redwoodjs/graphql-server"],
    });
  }
}

function processNativeBareDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const nativePath = "apps/native/package.json";
  if (!vfs.exists(nativePath)) return;

  const deps: AvailableDependencies[] = [
    "@expo/vector-icons",
    "@react-navigation/bottom-tabs",
    "@react-navigation/drawer",
    "@react-navigation/native",
    "@tanstack/react-form",
    "@tanstack/react-query",
    "expo",
    "react-native-gesture-handler",
    "react-native-safe-area-context",
    "react-native-screens",
    "react-native-web",
    "react-native-worklets",
  ];

  const devDeps: AvailableDependencies[] = ["@babel/core"];

  addPackageDependency({
    vfs,
    packagePath: nativePath,
    dependencies: deps,
    devDependencies: devDeps,
    customDependencies: {
      "expo-constants": "~18.0.10",
      "expo-crypto": "~15.0.6",
      "expo-linking": "~8.0.8",
      "expo-navigation-bar": "~5.0.8",
      "expo-network": "~8.0.7",
      "expo-router": "~6.0.14",
      "expo-secure-store": "~15.0.7",
      "expo-splash-screen": "~31.0.8",
      "expo-status-bar": "~3.0.8",
      "expo-system-ui": "~6.0.7",
      "expo-web-browser": "~15.0.6",
      react: "19.1.0",
      "react-dom": "19.1.0",
      "react-native": "0.81.5",
      "react-native-reanimated": "~4.1.1",
    },
    customDevDependencies: { "@types/react": "~19.1.10" },
  });

  // AI example deps
  if (config.examples?.includes("ai")) {
    addPackageDependency({
      vfs,
      packagePath: nativePath,
      dependencies: ["@stardazed/streams-text-encoding", "@ungap/structured-clone"],
    });
  }
}

function processNativeUniwindDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const nativePath = "apps/native/package.json";
  if (!vfs.exists(nativePath)) return;

  const deps: AvailableDependencies[] = [
    "@expo/vector-icons",
    "@react-navigation/drawer",
    "@react-navigation/elements",
    "@gorhom/bottom-sheet",
    "heroui-native",
    "react-native-gesture-handler",
    "react-native-safe-area-context",
    "react-native-screens",
    "react-native-web",
    "tailwind-merge",
    "tailwind-variants",
    "tailwindcss",
    "uniwind",
  ];

  addPackageDependency({
    vfs,
    packagePath: nativePath,
    dependencies: deps,
    customDependencies: {
      "@expo/metro-runtime": "~6.1.2",
      expo: "^54.0.23",
      "expo-constants": "~18.0.10",
      "expo-font": "~14.0.9",
      "expo-haptics": "^15.0.7",
      "expo-linking": "~8.0.8",
      "expo-network": "~8.0.7",
      "expo-router": "~6.0.14",
      "expo-secure-store": "~15.0.7",
      "expo-status-bar": "~3.0.8",
      react: "19.1.0",
      "react-dom": "19.1.0",
      "react-native": "0.81.5",
      "react-native-keyboard-controller": "1.18.5",
      "react-native-reanimated": "~4.1.1",
      "react-native-svg": "15.12.1",
      "react-native-worklets": "0.5.1",
    },
    customDevDependencies: { "@types/node": "^24.10.0", "@types/react": "~19.1.0" },
  });

  // AI example deps
  if (config.examples?.includes("ai")) {
    addPackageDependency({
      vfs,
      packagePath: nativePath,
      dependencies: ["@stardazed/streams-text-encoding", "@ungap/structured-clone"],
    });
  }
}

function processNativeUnistylesDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const nativePath = "apps/native/package.json";
  if (!vfs.exists(nativePath)) return;

  const deps: AvailableDependencies[] = [
    "@expo/vector-icons",
    "@react-navigation/bottom-tabs",
    "@react-navigation/drawer",
    "@react-navigation/native",
    "@tanstack/react-form",
    "react-native-edge-to-edge",
    "react-native-gesture-handler",
    "react-native-nitro-modules",
    "react-native-safe-area-context",
    "react-native-screens",
    "react-native-unistyles",
    "react-native-web",
    "react-native-worklets",
  ];

  const devDeps: AvailableDependencies[] = ["@babel/core", "ajv"];

  addPackageDependency({
    vfs,
    packagePath: nativePath,
    dependencies: deps,
    devDependencies: devDeps,
    customDependencies: {
      expo: "^54.0.23",
      "expo-constants": "~18.0.10",
      "expo-crypto": "~15.0.6",
      "expo-dev-client": "~6.0.11",
      "expo-linking": "~8.0.8",
      "expo-router": "~6.0.14",
      "expo-secure-store": "~15.0.7",
      "expo-splash-screen": "~31.0.8",
      "expo-status-bar": "~3.0.8",
      "expo-system-ui": "~6.0.7",
      "expo-web-browser": "~15.0.6",
      react: "19.1.0",
      "react-dom": "19.1.0",
      "react-native": "0.81.5",
      "react-native-reanimated": "~4.1.1",
    },
    customDevDependencies: { "@types/react": "~19.1.10" },
  });

  // AI example deps
  if (config.examples?.includes("ai")) {
    addPackageDependency({
      vfs,
      packagePath: nativePath,
      dependencies: ["@stardazed/streams-text-encoding", "@ungap/structured-clone"],
    });
  }
}
