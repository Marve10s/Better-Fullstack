import { describe, expect, it } from "bun:test";

import { processCSSAndUILibraryDeps } from "../../src/processors/css-ui-deps";
import { makeConfig } from "../_fixtures/config-factory";
import { createSeededVFS, getDeps } from "../_fixtures/vfs-factory";

function expectIncludesAll(actual: readonly string[], expected: readonly string[]): void {
  for (const item of expected) {
    expect(actual).toContain(item);
  }
}

describe("processCSSAndUILibraryDeps", () => {
  it("adds CSS preprocessor dev dependencies for web frontends", () => {
    const scssVfs = createSeededVFS(["apps/web/package.json"]);
    const lessVfs = createSeededVFS(["apps/web/package.json"]);

    processCSSAndUILibraryDeps(
      scssVfs,
      makeConfig({
        frontend: ["react-router"],
        cssFramework: "scss",
      }),
    );
    processCSSAndUILibraryDeps(
      lessVfs,
      makeConfig({
        frontend: ["react-router"],
        cssFramework: "less",
      }),
    );

    expect(getDeps(scssVfs, "apps/web/package.json").devDeps).toEqual(["sass"]);
    expect(getDeps(lessVfs, "apps/web/package.json").devDeps).toEqual(["less"]);
  });

  it("adds icon dependencies for React web templates even when uiLibrary is none", () => {
    const vfs = createSeededVFS(["apps/web/package.json"]);

    processCSSAndUILibraryDeps(
      vfs,
      makeConfig({
        frontend: ["react-vite"],
        uiLibrary: "none",
        shadcnIconLibrary: "tabler",
      }),
    );

    expect(getDeps(vfs, "apps/web/package.json").deps).toEqual(["@tabler/icons-react"]);
  });

  it("adds shadcn-ui dependencies with base-ui, icon, and font selections", () => {
    const vfs = createSeededVFS(["apps/web/package.json"]);

    processCSSAndUILibraryDeps(
      vfs,
      makeConfig({
        frontend: ["next"],
        uiLibrary: "shadcn-ui",
        shadcnBase: "base",
        shadcnIconLibrary: "phosphor",
        shadcnFont: "geist-mono",
      }),
    );

    expectIncludesAll(getDeps(vfs, "apps/web/package.json").deps, [
      "shadcn",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "tw-animate-css",
      "@base-ui-components/react",
      "@phosphor-icons/react",
      "geist",
    ]);
  });

  it("adds daisyui as a dev dependency", () => {
    const vfs = createSeededVFS(["apps/web/package.json"]);

    processCSSAndUILibraryDeps(
      vfs,
      makeConfig({
        frontend: ["react-router"],
        uiLibrary: "daisyui",
      }),
    );

    expect(getDeps(vfs, "apps/web/package.json").devDeps).toEqual(["daisyui"]);
  });

  it("adds framework-specific headless-ui and ark-ui packages", () => {
    const nuxtVfs = createSeededVFS(["apps/web/package.json"]);
    const astroSolidVfs = createSeededVFS(["apps/web/package.json"]);
    const astroSvelteVfs = createSeededVFS(["apps/web/package.json"]);

    processCSSAndUILibraryDeps(
      nuxtVfs,
      makeConfig({
        frontend: ["nuxt"],
        uiLibrary: "headless-ui",
      }),
    );
    processCSSAndUILibraryDeps(
      astroSolidVfs,
      makeConfig({
        frontend: ["astro"],
        astroIntegration: "solid",
        uiLibrary: "park-ui",
      }),
    );
    processCSSAndUILibraryDeps(
      astroSvelteVfs,
      makeConfig({
        frontend: ["astro"],
        astroIntegration: "svelte",
        uiLibrary: "ark-ui",
      }),
    );

    expect(getDeps(nuxtVfs, "apps/web/package.json").deps).toEqual(["@headlessui/vue"]);
    expectIncludesAll(getDeps(astroSolidVfs, "apps/web/package.json").deps, [
      "@park-ui/panda-preset",
      "@ark-ui/solid",
    ]);
    expect(getDeps(astroSvelteVfs, "apps/web/package.json").deps).toEqual(["@ark-ui/svelte"]);
  });

  it("adds React-only UI libraries to React-capable frontends", () => {
    const chakraVfs = createSeededVFS(["apps/web/package.json"]);
    const nextUiVfs = createSeededVFS(["apps/web/package.json"]);
    const mantineVfs = createSeededVFS(["apps/web/package.json"]);
    const baseUiVfs = createSeededVFS(["apps/web/package.json"]);
    const reactAriaVfs = createSeededVFS(["apps/web/package.json"]);

    processCSSAndUILibraryDeps(
      chakraVfs,
      makeConfig({
        frontend: ["react-router"],
        uiLibrary: "chakra-ui",
      }),
    );
    processCSSAndUILibraryDeps(
      nextUiVfs,
      makeConfig({
        frontend: ["react-router"],
        uiLibrary: "nextui",
      }),
    );
    processCSSAndUILibraryDeps(
      mantineVfs,
      makeConfig({
        frontend: ["react-router"],
        uiLibrary: "mantine",
      }),
    );
    processCSSAndUILibraryDeps(
      baseUiVfs,
      makeConfig({
        frontend: ["react-router"],
        uiLibrary: "base-ui",
      }),
    );
    processCSSAndUILibraryDeps(
      reactAriaVfs,
      makeConfig({
        frontend: ["react-router"],
        uiLibrary: "react-aria",
      }),
    );

    expectIncludesAll(getDeps(chakraVfs, "apps/web/package.json").deps, [
      "lucide-react",
      "@chakra-ui/react",
      "@emotion/react",
    ]);
    expectIncludesAll(getDeps(nextUiVfs, "apps/web/package.json").deps, [
      "lucide-react",
      "@heroui/react",
      "framer-motion",
    ]);
    expectIncludesAll(getDeps(mantineVfs, "apps/web/package.json").deps, [
      "lucide-react",
      "@mantine/core",
      "@mantine/hooks",
    ]);
    expectIncludesAll(getDeps(baseUiVfs, "apps/web/package.json").deps, [
      "lucide-react",
      "@base-ui-components/react",
    ]);
    expectIncludesAll(getDeps(reactAriaVfs, "apps/web/package.json").deps, [
      "lucide-react",
      "react-aria-components",
    ]);
  });
});
