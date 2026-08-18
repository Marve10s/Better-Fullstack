import { describe, expect, test } from "bun:test";

import { create, createVirtual } from "../src/index";
import { gatherConfig } from "../src/prompts/config-prompts";
import {
  mobilePlatformFromFlags,
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
    expect(shapeFlagsForEcosystem("frontend", "dotnet")).toEqual({
      ecosystem: "dotnet",
      dotnetWebFramework: "none",
    });
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
    expect(shapeFlagsForEcosystem("frontend", "dotnet", { withoutPrompts: true })).toEqual({
      ecosystem: "dotnet",
      dotnetWebFramework: "none",
      dotnetFrontend: "blazor-web-app",
    });
    expect(shapeFlagsForEcosystem("frontend", "typescript", { withoutPrompts: true })).toEqual(
      shapeFlagsForEcosystem("frontend", "typescript"),
    );
  });

  test("each shape accepts only the ecosystems that can express it", () => {
    expect(shapeSupportsEcosystem("frontend", "go")).toBe(false);
    expect(shapeSupportsEcosystem("frontend", "typescript")).toBe(true);
    expect(shapeSupportsEcosystem("backend", "react-native")).toBe(false);
    expect(shapeSupportsEcosystem("backend", "elixir")).toBe(true);
    expect(shapeSupportsEcosystem("mobile", "react-native")).toBe(true);
    expect(shapeSupportsEcosystem("mobile", "python")).toBe(false);
  });

  test("controlled flags span every ecosystem the shape supports", () => {
    expect(Object.keys(shapeControlledFlags("frontend")).sort()).toEqual([
      "api",
      "auth",
      "backend",
      "database",
      "dotnetWebFramework",
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
    expect(result.error).toMatch(/Cannot combine --shape frontend with a complete stack/);
  });

  test("the guided mobile shape honours an explicit install request", async () => {
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

    expect(config.install).toBe(true);
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
