import type { VirtualFile, VirtualNode } from "@better-fullstack/template-generator";

import { describe, expect, it } from "bun:test";

import { createVirtual } from "../src/index";
import { expectError, runTRPCTest } from "./test-utils";

function findFile(node: VirtualNode, path: string): VirtualFile | undefined {
  if (node.type === "file") {
    const normalizedNodePath = node.path.replace(/^\/+/, "");
    const normalizedPath = path.replace(/^\/+/, "");
    return normalizedNodePath === normalizedPath ? node : undefined;
  }

  for (const child of node.children) {
    const found = findFile(child, path);
    if (found) return found;
  }
  return undefined;
}

function getFileContent(node: VirtualNode, path: string): string {
  const file = findFile(node, path);
  expect(file).toBeDefined();
  return file?.content ?? "";
}

describe("Cross-ecosystem observability services", () => {
  it("wires Sentry for Python projects", async () => {
    const result = await createVirtual({
      projectName: "python-sentry",
      ecosystem: "python",
      pythonWebFramework: "fastapi",
      observability: "sentry",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(getFileContent(root, "pyproject.toml")).toContain('"sentry-sdk>=2.59.0"');
    expect(getFileContent(root, "src/app/observability.py")).toContain("sentry_sdk.init");
    expect(getFileContent(root, "src/app/main.py")).toContain("init_sentry()");
    expect(getFileContent(root, ".env.example")).toContain("SENTRY_DSN=");
  });

  it("wires Sentry for Go projects", async () => {
    const result = await createVirtual({
      projectName: "go-sentry",
      ecosystem: "go",
      goWebFramework: "gin",
      observability: "sentry",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(getFileContent(root, "go.mod")).toContain("github.com/getsentry/sentry-go v0.46.2");
    expect(getFileContent(root, "internal/observability/sentry.go")).toContain("sentry.Init");
    expect(getFileContent(root, "cmd/server/main.go")).toContain("appobservability.InitSentry()");
    expect(getFileContent(root, ".env.example")).toContain("SENTRY_DSN=");
  });

  it("wires Sentry for Rust projects", async () => {
    const result = await createVirtual({
      projectName: "rust-sentry",
      ecosystem: "rust",
      rustWebFramework: "axum",
      observability: "sentry",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(getFileContent(root, "Cargo.toml")).toContain('sentry = "0.48.1"');
    expect(getFileContent(root, "crates/server/Cargo.toml")).toContain("sentry.workspace = true");
    expect(getFileContent(root, "crates/server/src/observability.rs")).toContain("sentry::init");
    expect(getFileContent(root, "crates/server/src/main.rs")).toContain(
      "observability::init_sentry()",
    );
    expect(getFileContent(root, ".env.example")).toContain("SENTRY_DSN=");
  });

  it("initializes Sentry for Rust Actix and Rocket projects", async () => {
    for (const rustWebFramework of ["actix-web", "rocket"] as const) {
      const result = await createVirtual({
        projectName: `rust-sentry-${rustWebFramework}`,
        ecosystem: "rust",
        rustWebFramework,
        observability: "sentry",
      });

      expect(result.success).toBe(true);
      const main = getFileContent(result.tree!.root, "crates/server/src/main.rs");
      expect(main).toContain("mod observability;");
      expect(main).toContain("observability::init_sentry()");
    }
  });

  it("wires Sentry for Java projects", async () => {
    const result = await createVirtual({
      projectName: "java-sentry",
      ecosystem: "java",
      javaWebFramework: "spring-boot",
      javaBuildTool: "maven",
      observability: "sentry",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(getFileContent(root, "pom.xml")).toContain("<artifactId>sentry</artifactId>");
    expect(getFileContent(root, "src/main/java/com/example/javasentry/Application.java"))
      .toContain("Sentry.init");
    expect(getFileContent(root, ".env.example")).toContain("SENTRY_DSN=");
  });

  it("rejects Java Sentry without a build tool", async () => {
    const result = await runTRPCTest({
      projectName: "java-sentry-no-build",
      ecosystem: "java",
      javaWebFramework: "none",
      javaBuildTool: "none",
      observability: "sentry",
    });

    expectError(
      result,
      "Sentry observability for Java requires Maven or Gradle to manage the SDK dependency",
    );
  });

  it("rejects unsupported non-TypeScript observability providers", async () => {
    const result = await runTRPCTest({
      projectName: "python-otel",
      ecosystem: "python",
      pythonWebFramework: "fastapi",
      observability: "opentelemetry",
    });

    expectError(result, "Only Sentry observability is available for non-TypeScript ecosystems");
  });
});
