import { parseStackPartSpecs, type ProjectConfig } from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";

import type { VirtualFile, VirtualNode } from "../src/types";

import { generateVirtualProject } from "../src/generator";
import { EMBEDDED_TEMPLATES } from "../src/templates.generated";
import { dependencyVersionMap } from "../src/utils/add-deps";
import { makeConfig } from "./_fixtures/config-factory";

function listFiles(node: VirtualNode): VirtualFile[] {
  return node.type === "file" ? [node] : node.children.flatMap(listFiles);
}

const ECOSYSTEM_CONFIGS = [
  makeConfig({ ecosystem: "typescript" }),
  makeConfig({
    ecosystem: "react-native",
    frontend: ["native-bare"],
    backend: "none",
    runtime: "none",
    database: "none",
    orm: "none",
    api: "none",
  }),
  makeConfig({ ecosystem: "rust", rustWebFramework: "axum" }),
  makeConfig({ ecosystem: "python", pythonWebFramework: "fastapi" }),
  makeConfig({ ecosystem: "go", goWebFramework: "gin" }),
  makeConfig({ ecosystem: "java", javaWebFramework: "spring-boot", javaBuildTool: "maven" }),
  makeConfig({
    ecosystem: "dotnet",
    dotnetWebFramework: "aspnet-minimal",
    dotnetOrm: "ef-core",
    dotnetAuth: "aspnet-identity",
    dotnetApi: "minimal-api",
  }),
  makeConfig({
    ecosystem: "elixir",
    elixirWebFramework: "phoenix",
    elixirOrm: "ecto-sql",
    elixirApi: "rest",
  }),
] satisfies ProjectConfig[];

describe("generated output cleanliness", () => {
  for (const config of ECOSYSTEM_CONFIGS) {
    it(`does not emit empty template files for ${config.ecosystem}`, async () => {
      const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });

      expect(result.success).toBe(true);
      expect(result.tree).toBeDefined();

      const emptyFiles = listFiles(result.tree!.root)
        .filter((file) => file.content.trim() === "")
        .map((file) => file.path);

      expect(emptyFiles).toEqual([]);
    });
  }

  it("renders graph-native Blazor and Kotlin application templates", async () => {
    const config = makeConfig({
      stackParts: parseStackPartSpecs([
        "frontend:dotnet:blazor-webassembly",
        "mobile:kotlin:jetpack-compose",
        "backend:go:gin",
        "backend.api:go:rest",
      ]),
    });
    const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });

    expect(result.success).toBe(true);
    const files = listFiles(result.tree!.root);
    const paths = files.map((file) => file.path);
    expect(paths.some((path) => path.endsWith("apps/web/Program.cs"))).toBe(true);
    expect(paths.some((path) => path.endsWith("apps/web/Pages/Home.razor"))).toBe(true);
    expect(
      paths.some((path) =>
        path.endsWith("apps/native/app/src/main/java/com/betterfullstack/app/MainActivity.kt"),
      ),
    ).toBe(true);
    expect(paths.some((path) => path.endsWith("apps/native/gradlew"))).toBe(true);
    expect(paths.some((path) => path.endsWith("apps/web/Shared/GraphBackendStatus.razor"))).toBe(
      true,
    );
    expect(files.find((file) => file.path.endsWith("apps/web/Program.cs"))?.content).toContain(
      'AddHttpClient("GraphBackend"',
    );
    expect(
      files.find((file) =>
        file.path.endsWith("apps/native/app/src/main/java/com/betterfullstack/app/GraphBackend.kt"),
      )?.content,
    ).toContain("10.0.2.2:8080");
    expect(files.find((file) => file.path.endsWith("apps/server/.env.example"))?.content).toContain(
      "CORS_ORIGIN=http://localhost:5173",
    );
  });

  it("renders a standalone Rust frontend beside a different backend ecosystem", async () => {
    const config = makeConfig({
      stackParts: parseStackPartSpecs([
        "frontend:rust:leptos",
        "backend:go:gin",
        "backend.api:go:rest",
      ]),
    });
    const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });

    expect(result.success).toBe(true);
    const files = listFiles(result.tree!.root);
    const paths = files.map((file) => file.path);
    expect(paths.some((path) => path.endsWith("apps/web/crates/client/src/lib.rs"))).toBe(true);
    expect(paths.some((path) => path.includes("apps/web/crates/server/"))).toBe(false);
    expect(paths.some((path) => path.endsWith("apps/server/cmd/server/main.go"))).toBe(true);
    expect(files.find((file) => file.path.endsWith("apps/web/Cargo.toml"))?.content).not.toContain(
      '"crates/server"',
    );
  });

  it("renders Blazor Web App and Compose Multiplatform variants", async () => {
    const config = makeConfig({
      stackParts: parseStackPartSpecs([
        "frontend:dotnet:blazor-web-app",
        "mobile:kotlin:compose-multiplatform",
      ]),
    });
    const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });

    expect(result.success).toBe(true);
    const paths = listFiles(result.tree!.root).map((file) => file.path);
    expect(paths.some((path) => path.endsWith("apps/web/Components/App.razor"))).toBe(true);
    expect(
      paths.some((path) =>
        path.endsWith(
          "apps/native/composeApp/src/commonMain/kotlin/com/betterfullstack/app/App.kt",
        ),
      ),
    ).toBe(true);
    expect(paths.some((path) => path.endsWith("apps/native/androidApp/build.gradle.kts"))).toBe(
      true,
    );
    expect(
      paths.some((path) =>
        path.endsWith(
          "apps/native/androidApp/src/main/kotlin/com/betterfullstack/app/MainActivity.kt",
        ),
      ),
    ).toBe(true);
    const sharedGradle = listFiles(result.tree!.root).find((file) =>
      file.path.endsWith("apps/native/composeApp/build.gradle.kts"),
    )?.content;
    expect(sharedGradle).toContain('id("com.android.kotlin.multiplatform.library")');
    expect(sharedGradle).not.toContain('id("com.android.application")');
  });

  it("renders Kotlin mobile library selections into Gradle dependencies", async () => {
    const config = makeConfig({
      stackParts: parseStackPartSpecs([
        "mobile:kotlin:jetpack-compose:android",
        "android.libraries:kotlin:koin",
        "android.libraries:kotlin:ktor-client",
        "android.libraries:kotlin:mockk",
      ]),
    });
    const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });

    expect(result.success).toBe(true);
    const gradle = listFiles(result.tree!.root).find((file) =>
      file.path.endsWith("apps/native/app/build.gradle.kts"),
    )?.content;
    expect(gradle).toContain("koin-androidx-compose");
    expect(gradle).toContain("ktor-client-okhttp");
    expect(gradle).toContain("io.mockk:mockk");
    expect(gradle).toContain("org.jetbrains.kotlin.plugin.serialization");
  });

  it("renders SwiftUI and Flutter graph-native mobile apps into separate targets", async () => {
    const config = makeConfig({
      stackParts: parseStackPartSpecs(["mobile:swift:swiftui:ios", "mobile:dart:flutter:flutter"]),
    });
    const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });

    expect(result.success).toBe(true);
    const paths = listFiles(result.tree!.root).map((file) => file.path);
    expect(paths.some((path) => path.endsWith("apps/ios/Sources/ContentView.swift"))).toBe(true);
    expect(paths.some((path) => path.endsWith("apps/flutter/lib/main.dart"))).toBe(true);
  });

  it("renders a Kotlin Ktor backend and named repeated services", async () => {
    const config = makeConfig({
      javaLanguage: "kotlin",
      javaBuildTool: "gradle",
      stackParts: parseStackPartSpecs([
        "backend:java:ktor:gateway",
        "backend:go:gin:api",
        "gateway.language:java:kotlin",
        "gateway.buildTool:java:gradle",
        "api.api:go:rest",
      ]),
    });
    const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });

    expect(result.success).toBe(true);
    const files = listFiles(result.tree!.root);
    const paths = files.map((file) => file.path);
    expect(
      paths.some((path) =>
        path.endsWith("services/gateway/src/main/kotlin/com/betterfullstack/server/Application.kt"),
      ),
    ).toBe(true);
    expect(paths.some((path) => path.endsWith("services/api/cmd/server/main.go"))).toBe(true);
    expect(
      files.find((file) => pathEndsWith(file.path, "services/gateway/build.gradle.kts"))?.content,
    ).toContain("ktor-server-netty");
    const rootPackage = files.find((file) => pathEndsWith(file.path, "package.json"))?.content;
    expect(rootPackage).toContain('"dev:gateway"');
    expect(rootPackage).toContain('"dev:api"');
    expect(rootPackage).toContain("PORT=8081 go run cmd/server/main.go");
    expect(paths.some((path) => path.endsWith("GRAPH_SERVICES.md"))).toBe(true);
  });

  it("fails explicitly for repeated TypeScript backends instead of overwriting output", async () => {
    const config = makeConfig({
      stackParts: parseStackPartSpecs([
        "backend:typescript:hono:public-api",
        "backend:typescript:elysia:admin-api",
      ]),
    });

    const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });

    expect(result.success).toBe(false);
    expect(result.error).toContain("Only one TypeScript backend is currently supported");
  });

  it("rejects Vite+ when a Stack Graph has no JavaScript workspace root", async () => {
    for (const specs of [
      ["backend:go:gin", "toolchain:universal:vite-plus"],
      ["backend:go:gin", "codeQuality:typescript:knip", "toolchain:universal:vite-plus"],
    ]) {
      const config = makeConfig({
        addons: ["vite-plus"],
        stackParts: parseStackPartSpecs(specs),
      });

      const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });

      expect(result.success).toBe(false);
      expect(result.error).toContain("requires a generated TypeScript web frontend");
    }
  });

  it("generates a complete Vite+ toolchain profile", async () => {
    const config = makeConfig({
      frontend: ["react-vite"],
      addons: ["vite-plus", "github-actions"],
    });

    const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });

    expect(result.success).toBe(true);
    expect(result.tree).toBeDefined();
    if (!result.success || !result.tree) return;
    const files = listFiles(result.tree.root);
    const getFile = (path: string) => files.find((file) => file.path === path)?.content;
    const rootPackage = JSON.parse(getFile("package.json") ?? "{}") as {
      scripts?: Record<string, string>;
      devDependencies?: Record<string, string>;
      overrides?: Record<string, string>;
    };
    expect(rootPackage.scripts).toMatchObject({
      check: "vp run -r check",
      lint: "vp run -r lint",
      format: "vp run -r format",
      test: "vp run -r test",
      prepare: "vp config --no-agent --hooks-dir .vite-hooks",
    });
    expect(rootPackage.devDependencies).toMatchObject({
      "vite-plus": dependencyVersionMap["vite-plus"],
      "@voidzero-dev/vite-plus-core": dependencyVersionMap["@voidzero-dev/vite-plus-core"],
    });
    expect(rootPackage.overrides).toMatchObject({
      vite: `npm:@voidzero-dev/vite-plus-core@${dependencyVersionMap["@voidzero-dev/vite-plus-core"]}`,
      vitest: "4.1.10",
    });
    const webPackage = JSON.parse(getFile("apps/web/package.json") ?? "{}") as {
      scripts?: Record<string, string>;
    };
    expect(webPackage.scripts).toMatchObject({
      lint: "vp lint --no-error-on-unmatched-pattern",
      format: "vp fmt",
      check: "vp check --no-error-on-unmatched-pattern",
    });
    expect(getFile(".vite-hooks/pre-commit")).toContain("vpr check");
    expect(getFile(".gitignore")).toContain(".vite-hooks/_");
    const workflow = getFile(".github/workflows/ci.yml") ?? "";
    expect(workflow).toContain("voidzero-dev/setup-vp@v1.17.0");
    expect(workflow).toContain("vp install");
    expect(workflow).toContain("vp run -r build");
  });
});

function pathEndsWith(path: string, suffix: string) {
  return path.endsWith(suffix);
}
