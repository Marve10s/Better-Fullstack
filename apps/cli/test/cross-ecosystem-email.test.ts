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

describe("Cross-ecosystem email services", () => {
  it("wires Resend for Python projects", async () => {
    const result = await createVirtual({
      projectName: "python-resend",
      ecosystem: "python",
      pythonWebFramework: "fastapi",
      email: "resend",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(getFileContent(root, "pyproject.toml")).toContain('"resend>=2.29.0"');
    expect(getFileContent(root, "src/app/email.py")).toContain("resend.Emails.send");
    expect(getFileContent(root, ".env.example")).toContain("RESEND_API_KEY=");
  });

  it("wires Resend for Go projects", async () => {
    const result = await createVirtual({
      projectName: "go-resend",
      ecosystem: "go",
      goWebFramework: "gin",
      email: "resend",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(getFileContent(root, "go.mod")).toContain("github.com/resend/resend-go/v3 v3.4.1");
    expect(getFileContent(root, "internal/email/resend.go")).toContain("resend.NewClient");
    expect(getFileContent(root, ".env.example")).toContain("RESEND_API_KEY=");
  });

  it("wires Resend for Rust projects", async () => {
    const result = await createVirtual({
      projectName: "rust-resend",
      ecosystem: "rust",
      rustWebFramework: "axum",
      email: "resend",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(getFileContent(root, "Cargo.toml")).toContain("resend-rs");
    expect(getFileContent(root, "crates/server/src/main.rs")).toContain("mod email;");
    expect(getFileContent(root, "crates/server/src/email.rs")).toContain("Resend::default");
    expect(getFileContent(root, "crates/server/src/email.rs")).toContain("Ok(sent.id.to_string())");
    expect(getFileContent(root, ".env.example")).toContain("RESEND_API_KEY=");
  });

  it("wires Resend for Java projects", async () => {
    const result = await createVirtual({
      projectName: "java-resend",
      ecosystem: "java",
      javaWebFramework: "spring-boot",
      javaBuildTool: "maven",
      email: "resend",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(getFileContent(root, "pom.xml")).toContain("<artifactId>resend-java</artifactId>");
    expect(getFileContent(root, "src/main/java/com/example/javaresend/service/EmailService.java"))
      .toContain("new Resend");
    expect(getFileContent(root, ".env.example")).toContain("RESEND_API_KEY=");
  });

  it("rejects Java Resend without a build tool", async () => {
    const result = await runTRPCTest({
      projectName: "java-resend-no-build",
      ecosystem: "java",
      javaWebFramework: "none",
      javaBuildTool: "none",
      email: "resend",
    });

    expectError(
      result,
      "Resend email for Java requires Maven or Gradle to manage the SDK dependency",
    );
  });

  it("rejects unsupported non-TypeScript email providers", async () => {
    const result = await runTRPCTest({
      projectName: "python-sendgrid",
      ecosystem: "python",
      pythonWebFramework: "fastapi",
      email: "sendgrid",
    });

    expectError(result, "Only Resend email is available for non-TypeScript ecosystems");
  });
});
