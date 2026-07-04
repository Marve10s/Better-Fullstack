import { describe, expect, it } from "bun:test";

import { createVirtual } from "../src/index";
import { validateConfigForProgrammaticUse } from "../src/utils/config-validation";
import {
  expectError,
  runTRPCTest,
} from "./test-utils";
import { readVirtualFileContent as getFileContent } from "./virtual-tree-utils";

describe("Cross-ecosystem search services", () => {
  it("wires Meilisearch for Python projects", async () => {
    const result = await createVirtual({
      projectName: "python-meili",
      ecosystem: "python",
      pythonWebFramework: "fastapi",
      search: "meilisearch",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(getFileContent(root, "pyproject.toml")).toContain('"meilisearch>=0.41.0"');
    expect(getFileContent(root, "src/app/search.py")).toContain("meilisearch.Client");
    expect(getFileContent(root, ".env.example")).toContain("MEILISEARCH_HOST=");
    expect(getFileContent(root, ".env.example")).toContain("MEILISEARCH_API_KEY=");
  });

  it("wires Meilisearch for Go projects", async () => {
    const result = await createVirtual({
      projectName: "go-meili",
      ecosystem: "go",
      goWebFramework: "gin",
      search: "meilisearch",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(getFileContent(root, "go.mod")).toContain(
      "github.com/meilisearch/meilisearch-go v0.36.2",
    );
    expect(getFileContent(root, "internal/search/meilisearch.go")).toContain(
      "meilisearch.New",
    );
    expect(getFileContent(root, ".env.example")).toContain("MEILISEARCH_HOST=");
  });

  it("wires Meilisearch for Rust projects", async () => {
    const result = await createVirtual({
      projectName: "rust-meili",
      ecosystem: "rust",
      rustWebFramework: "axum",
      search: "meilisearch",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(getFileContent(root, "Cargo.toml")).toContain('meilisearch-sdk = "0.33.0"');
    expect(getFileContent(root, "crates/server/Cargo.toml")).toContain(
      "meilisearch-sdk.workspace = true",
    );
    expect(getFileContent(root, "crates/server/src/meilisearch.rs")).toContain(
      "Client::new",
    );
    expect(getFileContent(root, ".env.example")).toContain("MEILISEARCH_HOST=");
  });

  it("initializes Meilisearch for Rust Actix and Rocket projects", async () => {
    for (const rustWebFramework of ["actix-web", "rocket"] as const) {
      const result = await createVirtual({
        projectName: `rust-meili-${rustWebFramework}`,
        ecosystem: "rust",
        rustWebFramework,
        search: "meilisearch",
      });

      expect(result.success).toBe(true);
      const main = getFileContent(result.tree!.root, "crates/server/src/main.rs");
      expect(main).toContain("mod meilisearch;");
      expect(main).toContain("meilisearch::create_client()");
    }
  });

  it("wires Meilisearch for Java projects", async () => {
    const result = await createVirtual({
      projectName: "java-meili",
      ecosystem: "java",
      javaWebFramework: "spring-boot",
      javaBuildTool: "maven",
      search: "meilisearch",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(getFileContent(root, "pom.xml")).toContain("<artifactId>meilisearch-java</artifactId>");
    expect(
      getFileContent(root, "src/main/java/com/example/javameili/search/MeilisearchClient.java"),
    ).toContain("new Client(new Config");
    expect(getFileContent(root, ".env.example")).toContain("MEILISEARCH_HOST=");
  });

  it("rejects Java Meilisearch without a build tool", async () => {
    const result = await runTRPCTest({
      projectName: "java-meili-no-build",
      ecosystem: "java",
      javaWebFramework: "none",
      javaBuildTool: "none",
      search: "meilisearch",
    });

    expectError(
      result,
      "Meilisearch search for Java requires Maven or Gradle to manage the SDK dependency",
    );
  });

  it("allows TypeScript search providers when ecosystem defaults to TypeScript", () => {
    expect(() =>
      validateConfigForProgrammaticUse({
        backend: "hono",
        frontend: ["tanstack-router"],
        search: "opensearch",
      }),
    ).not.toThrow();
  });

  it("rejects non-TypeScript search providers that are not implemented cross-ecosystem", async () => {
    const result = await runTRPCTest({
      projectName: "python-typesense",
      ecosystem: "python",
      pythonWebFramework: "fastapi",
      search: "typesense",
    });

    expectError(result, "Only Meilisearch search is available for non-TypeScript ecosystems");
  });

  it("allows native ecosystem search: Elasticsearch for Python and Bleve for Go", () => {
    expect(() =>
      validateConfigForProgrammaticUse({
        ecosystem: "python",
        pythonWebFramework: "fastapi",
        search: "elasticsearch",
      }),
    ).not.toThrow();

    expect(() =>
      validateConfigForProgrammaticUse({
        ecosystem: "go",
        goWebFramework: "gin",
        search: "bleve",
      }),
    ).not.toThrow();
  });
});
