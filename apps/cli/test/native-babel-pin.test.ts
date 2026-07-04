import { describe, expect, it } from "bun:test";

import type { ProjectConfig } from "../src/types";

import { createVirtual } from "../src/index";
import { getVirtualFileContent } from "./virtual-tree-utils";

/**
 * RN toolchain lock: the Expo / React Native stack (metro, babel-preset-expo,
 * react-native-gesture-handler, @babel/preset-typescript) requires **Babel 7**.
 * A major bump of `@babel/core` / `@babel/runtime` to ^8 breaks the Metro bundle
 * at build time — see the 2026-06 regression where an automated dep update pinned
 * `@babel/core: ^8.0.1` and `expo export` failed with a gesture-handler
 * SyntaxError while typecheck stayed green.
 *
 * This guard fails fast if any native variant's Babel deps drift off the 7.x line
 * again (manual edit OR an automated dep bump), regardless of whether the heavier
 * Metro build (verifyReactNative) runs for that variant. Keep it in lockstep with
 * the native templates: bumping to Babel 8 is only safe once Expo/RN ship Babel 8
 * support, at which point update this expectation deliberately.
 */
const NATIVE_VARIANTS = ["native-bare", "native-uniwind", "native-unistyles"] as const;
const BABEL_LOCKED = ["@babel/core", "@babel/runtime"] as const;

const BASE_CONFIG: Partial<ProjectConfig> = {
  ecosystem: "typescript",
  runtime: "bun",
  backend: "none",
  api: "none",
  database: "none",
  orm: "none",
  auth: "none",
  payments: "none",
  addons: ["none"],
  examples: ["none"],
  dbSetup: "none",
  webDeploy: "none",
  serverDeploy: "none",
  cssFramework: "none",
  uiLibrary: "none",
  effect: "none",
  email: "none",
  fileUpload: "none",
  stateManagement: "none",
  forms: "none",
  testing: "none",
  validation: "none",
  realtime: "none",
  animation: "none",
  logging: "none",
  observability: "none",
  caching: "none",
  cms: "none",
  ai: "none",
  jobQueue: "none",
  mobileNavigation: "expo-router",
  mobileUI: "none",
  mobileStorage: "none",
  mobileTesting: "none",
  mobilePush: "none",
  mobileOTA: "none",
  mobileDeepLinking: "none",
};

describe("native templates — RN toolchain version lock", () => {
  for (const frontend of NATIVE_VARIANTS) {
    it(`${frontend}: Babel stays on the 7.x line (RN toolchain requires Babel 7)`, async () => {
      const result = await createVirtual({
        projectName: `native-babel-${frontend}`,
        ...BASE_CONFIG,
        frontend: [frontend],
      });

      expect(result.success).toBe(true);
      const pkgRaw = getVirtualFileContent(result.tree!.root, "apps/native/package.json");
      expect(pkgRaw, `${frontend}: apps/native/package.json should be generated`).toBeDefined();

      const pkg = JSON.parse(pkgRaw!) as {
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
      };
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };

      // At least one Babel dep must be declared and locked (guards against a
      // silent removal of the pin as well as a version drift).
      const declared = BABEL_LOCKED.filter((name) => deps[name] !== undefined);
      expect(declared.length, `${frontend}: expected a pinned Babel dep`).toBeGreaterThan(0);

      for (const name of BABEL_LOCKED) {
        const range = deps[name];
        if (range === undefined) continue;
        expect(range, `${frontend}: ${name}=${range} must be Babel 7 (^7.x), not a major bump`).toMatch(
          /^\^?7\./,
        );
      }
    });
  }
});
