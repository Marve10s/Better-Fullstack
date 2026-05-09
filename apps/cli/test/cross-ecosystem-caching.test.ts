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

describe("Cross-ecosystem caching services", () => {
  it("wires Upstash Redis for Python projects", async () => {
    const result = await createVirtual({
      projectName: "python-upstash",
      ecosystem: "python",
      pythonWebFramework: "fastapi",
      caching: "upstash-redis",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(getFileContent(root, "pyproject.toml")).toContain('"upstash-redis>=1.7.0"');
    expect(getFileContent(root, "src/app/cache.py")).toContain("Redis.from_env()");
    expect(getFileContent(root, ".env.example")).toContain("UPSTASH_REDIS_REST_URL=");
    expect(getFileContent(root, ".env.example")).toContain("UPSTASH_REDIS_REST_TOKEN=");
  });

  it("wires Upstash Redis for Go projects", async () => {
    const result = await createVirtual({
      projectName: "go-upstash",
      ecosystem: "go",
      goWebFramework: "gin",
      caching: "upstash-redis",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(getFileContent(root, "go.mod")).toContain("github.com/redis/go-redis/v9 v9.19.0");
    expect(getFileContent(root, "internal/cache/redis.go")).toContain("redis.ParseURL");
    expect(getFileContent(root, ".env.example")).toContain("UPSTASH_REDIS_URL=");
  });

  it("wires Upstash Redis for Rust projects", async () => {
    const result = await createVirtual({
      projectName: "rust-upstash",
      ecosystem: "rust",
      rustWebFramework: "axum",
      caching: "upstash-redis",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(getFileContent(root, "Cargo.toml")).toContain('redis = { version = "1.2.1"');
    expect(getFileContent(root, "crates/server/Cargo.toml")).toContain("redis.workspace = true");
    expect(getFileContent(root, "crates/server/src/upstash_cache.rs")).toContain(
      "UPSTASH_REDIS_URL",
    );
    expect(getFileContent(root, ".env.example")).toContain("UPSTASH_REDIS_URL=");
  });

  it("emits one Rust Redis workspace dependency when shared and Rust caching both use Redis", async () => {
    const result = await createVirtual({
      projectName: "rust-upstash-local-redis",
      ecosystem: "rust",
      rustWebFramework: "axum",
      caching: "upstash-redis",
      rustCaching: "redis",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    const cargoContent = getFileContent(root, "Cargo.toml");
    const serverCargoContent = getFileContent(root, "crates/server/Cargo.toml");

    expect(cargoContent.match(/^redis = /gm)).toHaveLength(1);
    expect(serverCargoContent.match(/^redis\.workspace = true/gm)).toHaveLength(1);
  });

  it("initializes Upstash Redis for Rust Actix and Rocket projects", async () => {
    for (const rustWebFramework of ["actix-web", "rocket"] as const) {
      const result = await createVirtual({
        projectName: `rust-upstash-${rustWebFramework}`,
        ecosystem: "rust",
        rustWebFramework,
        caching: "upstash-redis",
      });

      expect(result.success).toBe(true);
      const main = getFileContent(result.tree!.root, "crates/server/src/main.rs");
      expect(main).toContain("mod upstash_cache;");
      expect(main).toContain("upstash_cache::create_client()");
    }
  });

  it("wires Upstash Redis for Java projects", async () => {
    const result = await createVirtual({
      projectName: "java-upstash",
      ecosystem: "java",
      javaWebFramework: "spring-boot",
      javaBuildTool: "maven",
      caching: "upstash-redis",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(getFileContent(root, "pom.xml")).toContain("<artifactId>jedis</artifactId>");
    expect(getFileContent(root, "src/main/java/com/example/javaupstash/cache/UpstashRedisClient.java"))
      .toContain("new JedisPooled");
    expect(getFileContent(root, ".env.example")).toContain("UPSTASH_REDIS_URL=");
  });

  it("rejects Java Upstash Redis without a build tool", async () => {
    const result = await runTRPCTest({
      projectName: "java-upstash-no-build",
      ecosystem: "java",
      javaWebFramework: "none",
      javaBuildTool: "none",
      caching: "upstash-redis",
    });

    expectError(
      result,
      "Upstash Redis caching for Java requires Maven or Gradle to manage the Redis client dependency",
    );
  });
});
