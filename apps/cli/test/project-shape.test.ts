import { afterAll, describe, expect, test } from "bun:test";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { create, createVirtual } from "../src/index";
import { gatherConfig } from "../src/prompts/config-prompts";
import {
  mobilePlatformFromFlags,
  mobilePlatformsFromFlags,
  nativeMobilePartSpecs,
  shapeControlledFlags,
  shapeFlagsForEcosystem,
  shapeSupportsEcosystem,
} from "../src/prompts/project-shape";
import { findVirtualFile as findFile } from "./virtual-tree-utils";

const baseOptions = { dryRun: true, install: false, git: false, packageManager: "bun" } as const;

describe("project shape flags", () => {
  test("frontend shape switches off the backend half per ecosystem", () => {
    expect(shapeFlagsForEcosystem("frontend", "typescript")).toEqual({
      ecosystem: "typescript",
      backend: "none",
      runtime: "none",
      api: "none",
      database: "none",
      orm: "none",
      auth: "none",
    });
    expect(shapeFlagsForEcosystem("frontend", "rust")).toEqual({
      ecosystem: "rust",
      rustWebFramework: "none",
    });
    // .NET is not an accepted frontend ecosystem, so it contributes nothing.
    expect(shapeFlagsForEcosystem("frontend", "dotnet")).toEqual({ ecosystem: "dotnet" });
  });

  test("backend shape switches off the frontend half per ecosystem", () => {
    expect(shapeFlagsForEcosystem("backend", "typescript")).toEqual({
      ecosystem: "typescript",
      frontend: ["none"],
      uiLibrary: "none",
      cssFramework: "none",
    });
    expect(shapeFlagsForEcosystem("backend", "rust")).toEqual({
      ecosystem: "rust",
      rustFrontend: "none",
    });
  });

  test("backend-only ecosystems carry no frontend override to switch off", () => {
    for (const ecosystem of ["go", "python", "java", "elixir"] as const) {
      expect(shapeFlagsForEcosystem("backend", ecosystem)).toEqual({ ecosystem });
    }
  });

  test("platform flags answer the mobile platform question without a prompt", () => {
    expect(mobilePlatformFromFlags({ kotlinMobile: "compose-multiplatform" })).toBe("kotlin");
    expect(mobilePlatformFromFlags({ swiftMobile: "swiftui" })).toBe("swift");
    expect(mobilePlatformFromFlags({ dartMobile: "flutter" })).toBe("dart");
    expect(mobilePlatformFromFlags({ ecosystem: "react-native" })).toBe("react-native");
    expect(mobilePlatformFromFlags({ frontend: ["native-uniwind"] })).toBe("react-native");
    expect(mobilePlatformFromFlags({ kotlinMobile: "none" })).toBeUndefined();
    expect(mobilePlatformFromFlags({})).toBeUndefined();
  });

  test("frontend shape picks a frontend for ecosystems that default to none", () => {
    // Without prompts nothing else selects the "on" half, and Rust/.NET both
    // default to no frontend, which would otherwise scaffold an empty project.
    expect(shapeFlagsForEcosystem("frontend", "rust", { withoutPrompts: true })).toEqual({
      ecosystem: "rust",
      rustWebFramework: "none",
      rustFrontend: "leptos",
    });
    expect(shapeFlagsForEcosystem("frontend", "typescript", { withoutPrompts: true })).toEqual(
      shapeFlagsForEcosystem("frontend", "typescript"),
    );
  });

  test("each shape accepts only the ecosystems that can express it", () => {
    expect(shapeSupportsEcosystem("frontend", "go")).toBe(false);
    expect(shapeSupportsEcosystem("frontend", "typescript")).toBe(true);
    // A frontend-only .NET project renders no Blazor app, so it is not offered.
    expect(shapeSupportsEcosystem("frontend", "dotnet")).toBe(false);
    expect(shapeSupportsEcosystem("backend", "react-native")).toBe(false);
    expect(shapeSupportsEcosystem("backend", "elixir")).toBe(true);
    expect(shapeSupportsEcosystem("mobile", "react-native")).toBe(true);
    expect(shapeSupportsEcosystem("mobile", "python")).toBe(false);
  });

  test("reports every platform a flag set matches, deduplicated", () => {
    expect(mobilePlatformsFromFlags({ kotlinMobile: "jetpack-compose" })).toEqual(["kotlin"]);
    expect(
      mobilePlatformsFromFlags({ kotlinMobile: "jetpack-compose", dartMobile: "flutter" }),
    ).toEqual(["kotlin", "dart"]);
    // Both signals name React Native, so this is one platform, not an ambiguity.
    expect(
      mobilePlatformsFromFlags({ ecosystem: "react-native", frontend: ["native-bare"] }),
    ).toEqual(["react-native"]);
  });

  test("controlled flags span every ecosystem the shape supports", () => {
    expect(Object.keys(shapeControlledFlags("frontend")).sort()).toEqual([
      "api",
      "auth",
      "backend",
      "database",
      "orm",
      "runtime",
      "rustWebFramework",
    ]);
    expect(Object.keys(shapeControlledFlags("backend")).sort()).toEqual([
      "cssFramework",
      "dotnetFrontend",
      "frontend",
      "rustFrontend",
      "uiLibrary",
    ]);
  });

  test("kotlin part specs carry the selected app and libraries", () => {
    expect(nativeMobilePartSpecs("kotlin", "compose-multiplatform", ["koin", "none"])).toEqual([
      "mobile:kotlin:compose-multiplatform",
      "mobile.libraries:kotlin:koin",
    ]);
    expect(nativeMobilePartSpecs("swift", "none")).toEqual(["mobile:swift:swiftui"]);
    expect(nativeMobilePartSpecs("dart", "none")).toEqual(["mobile:dart:flutter"]);
  });
});

describe("project shape scaffolding", () => {
  const temporaryDirectories: string[] = [];

  afterAll(async () => {
    await Promise.all(temporaryDirectories.map((dir) => rm(dir, { recursive: true, force: true })));
  });

  // The shape check is input-only, so it must run before any directory is
  // resolved, cleared, or created. Rejecting after the clear would have
  // destroyed the user's files and then exited without scaffolding.
  test("an invalid shape never costs the user their files", async () => {
    const parent = await mkdtemp(join(tmpdir(), "bfs-shape-"));
    temporaryDirectories.push(parent);
    const destination = join(parent, "victim");
    await mkdtemp(join(parent, "unused-"));
    await rm(destination, { recursive: true, force: true });
    await writeFile(join(parent, "keep.txt"), "precious").catch(() => {});

    const result = await create(destination, {
      ...baseOptions,
      shape: "frontend",
      backend: "hono",
      yes: true,
      directoryConflict: "overwrite",
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/--shape frontend conflicts with --backend/);
    await expect(readFile(join(parent, "keep.txt"), "utf8")).resolves.toBe("precious");
  });

  test("frontend shape scaffolds a web app with no server", async () => {
    const result = await create("shape-frontend", { ...baseOptions, shape: "frontend", yes: true });

    expect(result.success).toBe(true);
    expect(result.projectConfig.backend).toBe("none");
    expect(result.projectConfig.database).toBe("none");
    expect(result.projectConfig.api).toBe("none");
    expect(result.projectConfig.frontend).not.toEqual(["none"]);
  });

  test("backend shape scaffolds a server with no web frontend", async () => {
    const result = await create("shape-backend", { ...baseOptions, shape: "backend", yes: true });

    expect(result.success).toBe(true);
    expect(result.projectConfig.frontend.filter((entry) => entry !== "none")).toEqual([]);
    expect(result.projectConfig.backend).not.toBe("none");
    expect(result.projectConfig.uiLibrary).toBe("none");
  });

  test("backend shape honours a non-TypeScript ecosystem", async () => {
    const result = await create("shape-backend-go", {
      ...baseOptions,
      shape: "backend",
      ecosystem: "go",
      yes: true,
    });

    expect(result.success).toBe(true);
    expect(result.projectConfig.ecosystem).toBe("go");
  });

  test("mobile shape defaults to React Native", async () => {
    const result = await create("shape-mobile", { ...baseOptions, shape: "mobile", yes: true });

    expect(result.success).toBe(true);
    expect(result.projectConfig.ecosystem).toBe("react-native");
    expect(result.projectConfig.frontend).toEqual(["native-bare"]);
  });

  // The hero's mobile entry used to pin --ecosystem react-native, which made
  // every non-Expo mobile platform unreachable from a one-line command.
  test("mobile shape reaches Kotlin, Swift, and Flutter", async () => {
    const kotlin = await create("shape-mobile-kotlin", {
      ...baseOptions,
      shape: "mobile",
      kotlinMobile: "jetpack-compose",
      yes: true,
    });
    expect(kotlin.success).toBe(true);
    expect(kotlin.projectConfig.kotlinMobile).toBe("jetpack-compose");

    const swift = await create("shape-mobile-swift", {
      ...baseOptions,
      shape: "mobile",
      swiftMobile: "swiftui",
      yes: true,
    });
    expect(swift.success).toBe(true);
    expect(swift.projectConfig.swiftMobile).toBe("swiftui");

    const flutter = await create("shape-mobile-flutter", {
      ...baseOptions,
      shape: "mobile",
      dartMobile: "flutter",
      yes: true,
    });
    expect(flutter.success).toBe(true);
    expect(flutter.projectConfig.dartMobile).toBe("flutter");
  });

  test("rust backend shape scaffolds a server rather than an empty project", async () => {
    const result = await create("shape-backend-rust", {
      ...baseOptions,
      shape: "backend",
      ecosystem: "rust",
      yes: true,
    });

    expect(result.success).toBe(true);
    expect(result.projectConfig.rustWebFramework).toBe("axum");
    expect(result.projectConfig.rustFrontend).toBe("none");
  });

  test("a web frontend never counts as a mobile platform selector", async () => {
    const result = await create("shape-mobile-web-frontend", {
      ...baseOptions,
      shape: "mobile",
      ecosystem: "react-native",
      frontend: ["next"],
      yes: true,
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/Cannot combine --yes with core stack/);
  });

  test("a flag restating what the shape switches off is accepted with --yes", async () => {
    const result = await create("shape-redundant-yes", {
      ...baseOptions,
      shape: "backend",
      frontend: ["none"],
      yes: true,
    });

    expect(result.success).toBe(true);
    expect(result.projectConfig.backend).not.toBe("none");
  });

  test("rejects disabling the half the shape exists to build", async () => {
    const result = await create("shape-empty-half", {
      ...baseOptions,
      shape: "frontend",
      ecosystem: "rust",
      rustFrontend: "none",
      yes: true,
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/needs --rust-frontend, but it was set to none/);
  });

  test("a native frontend selector answers the mobile shape rather than fighting it", async () => {
    const result = await create("shape-mobile-native-frontend", {
      ...baseOptions,
      shape: "mobile",
      frontend: ["native-uniwind"],
      yes: true,
    });

    expect(result.success).toBe(true);
    expect(result.projectConfig.frontend).toEqual(["native-uniwind"]);
  });

  test("rust frontend shape scaffolds a frontend rather than an empty project", async () => {
    const result = await create("shape-frontend-rust", {
      ...baseOptions,
      shape: "frontend",
      ecosystem: "rust",
      yes: true,
    });

    expect(result.success).toBe(true);
    expect(result.projectConfig.rustFrontend).toBe("leptos");
    expect(result.projectConfig.rustWebFramework).toBe("none");
  });

  test("rejects shapes that contradict the rest of the input", async () => {
    const badEcosystem = await create("shape-bad-ecosystem", {
      ...baseOptions,
      shape: "frontend",
      ecosystem: "go",
      yes: true,
    });
    expect(badEcosystem.success).toBe(false);
    expect(badEcosystem.error).toMatch(/does not support --ecosystem go/);

    const contradictoryFlag = await create("shape-vs-core-flag", {
      ...baseOptions,
      shape: "frontend",
      backend: "hono",
      yes: true,
    });
    expect(contradictoryFlag.success).toBe(false);
    expect(contradictoryFlag.error).toMatch(/--shape frontend conflicts with --backend/);
  });

  test("rejects a shape that contradicts an ecosystem-specific flag", async () => {
    // Rust and .NET have their own frontend/backend keys, so a shape that only
    // guarded the TypeScript ones would silently scaffold both halves.
    const rustConflict = await create("shape-rust-conflict", {
      ...baseOptions,
      shape: "frontend",
      ecosystem: "rust",
      rustWebFramework: "axum",
      yes: true,
    });
    expect(rustConflict.success).toBe(false);
    expect(rustConflict.error).toMatch(/--shape frontend conflicts with --rust-web-framework/);
  });

  test("accepts a flag that merely restates what the shape switches off", async () => {
    const result = await create("shape-redundant-flag", {
      ...baseOptions,
      shape: "backend",
      frontend: ["none"],
    });

    expect(result.success).toBe(true);
    expect(result.projectConfig.backend).not.toBe("none");
  });

  test("rejects a shape alongside a complete stack graph", async () => {
    const result = await create("shape-vs-part", {
      ...baseOptions,
      shape: "frontend",
      part: ["backend:go:gin"],
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/Cannot combine --shape frontend with --part/);
  });

  // The CLI drives no Gradle/SwiftPM/Flutter install, so reporting success here
  // would claim dependencies that were never fetched.
  test("the guided mobile shape does not claim a native install", async () => {
    const config = await gatherConfig(
      {
        projectName: "kotlin-install",
        projectDir: "/tmp/kotlin-install",
        relativePath: "kotlin-install",
        kotlinMobile: "jetpack-compose",
        kotlinMobileLibraries: [],
        git: false,
        install: true,
      },
      "kotlin-install",
      "/tmp/kotlin-install",
      "kotlin-install",
      "mobile",
    );

    expect(config.install).toBe(false);
  });

  // The guided path guarded this from the start; the prompt-free branch built
  // its config separately and kept the TypeScript default of install: true.
  test("the prompt-free native path does not claim a native install either", async () => {
    const kotlin = await create("shape-yes-kotlin-install", {
      ...baseOptions,
      shape: "mobile",
      kotlinMobile: "jetpack-compose",
      install: true,
      yes: true,
    });

    expect(kotlin.success).toBe(true);
    expect(kotlin.projectConfig.install).toBe(false);
  });

  test("react native keeps its JavaScript install on the prompt-free path", async () => {
    const expo = await create("shape-yes-rn-install", {
      ...baseOptions,
      shape: "mobile",
      install: true,
      yes: true,
    });

    expect(expo.success).toBe(true);
    expect(expo.projectConfig.install).toBe(true);
  });

  test("the guided mobile shape keeps explicitly selected addons", async () => {
    const config = await gatherConfig(
      {
        projectName: "kotlin-addons",
        projectDir: "/tmp/kotlin-addons",
        relativePath: "kotlin-addons",
        kotlinMobile: "jetpack-compose",
        kotlinMobileLibraries: [],
        addons: ["skills"],
        git: false,
      },
      "kotlin-addons",
      "/tmp/kotlin-addons",
      "kotlin-addons",
      "mobile",
    );

    expect(config.addons).toEqual(["skills"]);
    expect(config.stackParts?.map((part) => part.toolId)).toContain("skills");
  });

  test("rejects a shape combined with a template preset", async () => {
    const result = await create("shape-vs-template", {
      ...baseOptions,
      shape: "frontend",
      template: "t3",
      yes: true,
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/Cannot combine --shape frontend with --template/);
  });

  test("rejects an ambiguous set of mobile platform selectors", async () => {
    const result = await create("shape-two-platforms", {
      ...baseOptions,
      shape: "mobile",
      kotlinMobile: "jetpack-compose",
      dartMobile: "flutter",
      yes: true,
    });

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/matches more than one platform/);
  });

  test("the guided mobile shape builds a Kotlin app that generates Kotlin sources", async () => {
    const config = await gatherConfig(
      {
        projectName: "guided-kotlin",
        projectDir: "/tmp/guided-kotlin",
        relativePath: "guided-kotlin",
        kotlinMobile: "compose-multiplatform",
        kotlinMobileLibraries: ["koin"],
        git: false,
      },
      "guided-kotlin",
      "/tmp/guided-kotlin",
      "guided-kotlin",
      "mobile",
    );

    expect(config.kotlinMobile).toBe("compose-multiplatform");
    expect(config.kotlinMobileLibraries).toEqual(["koin"]);
    expect(config.frontend).toEqual(["none"]);
    expect(config.backend).toBe("none");
    expect(config.stackParts?.map((part) => part.toolId)).toContain("compose-multiplatform");

    const generated = await createVirtual(config);

    expect(generated.success).toBe(true);
    expect(findFile(generated.tree!.root, "apps/native/settings.gradle.kts")).toBeDefined();
  });
});
