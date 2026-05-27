import { describe, it, expect } from "bun:test";
import { readFile } from "node:fs/promises";
import { expectSuccess, runTRPCTest } from "./test-utils";

describe("Backend Utils Configuration", () => {
  it("should work with backend-utils + hono backend", async () => {
    const result = await runTRPCTest({
      projectName: "backend-utils-hono",
      backendUtils: "backend-utils",
      backend: "hono",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      auth: "none",
      frontend: ["tanstack-router"],
      addons: ["none"],
      examples: ["none"],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
      install: false,
    });

    expectSuccess(result);

    // Verify generated files exist and have correct Hono specific parts
    const apiResponse = await readFile(`${result.projectDir}/apps/server/src/lib/api-response.ts`, "utf-8");
    const asyncHandler = await readFile(`${result.projectDir}/apps/server/src/lib/async-handler.ts`, "utf-8");
    const errorHandler = await readFile(`${result.projectDir}/apps/server/src/lib/error-handler.ts`, "utf-8");

    expect(apiResponse).toContain("export class ApiResponse");
    expect(apiResponse).toContain("HttpStatus");
    
    expect(asyncHandler).toContain("Context");
    
    expect(errorHandler).toContain("export const errorHandler");
    expect(errorHandler).toContain("c.json");
    expect(errorHandler).toContain("Hono global error handler");
  });

  it("should work with backend-utils + express backend", async () => {
    const result = await runTRPCTest({
      projectName: "backend-utils-express",
      backendUtils: "backend-utils",
      backend: "express",
      runtime: "node",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      auth: "none",
      frontend: ["tanstack-router"],
      addons: ["none"],
      examples: ["none"],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
      install: false,
    });

    expectSuccess(result);

    // Verify generated files exist and have correct Express specific parts
    const apiResponse = await readFile(`${result.projectDir}/apps/server/src/lib/api-response.ts`, "utf-8");
    const asyncHandler = await readFile(`${result.projectDir}/apps/server/src/lib/async-handler.ts`, "utf-8");
    const errorHandler = await readFile(`${result.projectDir}/apps/server/src/lib/error-handler.ts`, "utf-8");

    expect(apiResponse).toContain("export class ApiResponse");
    expect(apiResponse).toContain("HttpStatus");
    
    expect(asyncHandler).toContain("Request");
    expect(asyncHandler).toContain("Response");
    
    expect(errorHandler).toContain("export const errorHandler");
    expect(errorHandler).toContain("NextFunction");
    expect(errorHandler).toContain("Express global error handling");
  });

  it("should work with backend-utils + fastify backend", async () => {
    const result = await runTRPCTest({
      projectName: "backend-utils-fastify",
      backendUtils: "backend-utils",
      backend: "fastify",
      runtime: "node",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      auth: "none",
      frontend: ["tanstack-router"],
      addons: ["none"],
      examples: ["none"],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
      install: false,
    });

    expectSuccess(result);

    const apiResponse = await readFile(`${result.projectDir}/apps/server/src/lib/api-response.ts`, "utf-8");
    const asyncHandler = await readFile(`${result.projectDir}/apps/server/src/lib/async-handler.ts`, "utf-8");
    const errorHandler = await readFile(`${result.projectDir}/apps/server/src/lib/error-handler.ts`, "utf-8");

    expect(apiResponse).toContain("export class ApiResponse");
    expect(asyncHandler).toContain("FastifyRequest");
    expect(errorHandler).toContain("FastifyReply");
    expect(errorHandler).toContain("Fastify global error handler hook");
  });

  it("should work with backend-utils + elysia backend", async () => {
    const result = await runTRPCTest({
      projectName: "backend-utils-elysia",
      backendUtils: "backend-utils",
      backend: "elysia",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      auth: "none",
      frontend: ["tanstack-router"],
      addons: ["none"],
      examples: ["none"],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
      install: false,
    });

    expectSuccess(result);

    const apiResponse = await readFile(`${result.projectDir}/apps/server/src/lib/api-response.ts`, "utf-8");
    const asyncHandler = await readFile(`${result.projectDir}/apps/server/src/lib/async-handler.ts`, "utf-8");
    const errorHandler = await readFile(`${result.projectDir}/apps/server/src/lib/error-handler.ts`, "utf-8");

    expect(apiResponse).toContain("export class ApiResponse");
    expect(asyncHandler).toContain("Elysia");
    expect(errorHandler).toContain("Elysia error lifecycle handler");
    expect(errorHandler).toContain("export const errorHandler");
  });

  it("should not generate backend-utils files when backend-utils is none", async () => {
    const result = await runTRPCTest({
      projectName: "backend-utils-none",
      backendUtils: "none",
      backend: "hono",
      runtime: "bun",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      auth: "none",
      frontend: ["tanstack-router"],
      addons: ["none"],
      examples: ["none"],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
      install: false,
    });

    expectSuccess(result);

    // Verify files do not exist
    let filesExist = true;
    try {
      await readFile(`${result.projectDir}/apps/server/src/lib/api-response.ts`, "utf-8");
    } catch {
      filesExist = false;
    }
    expect(filesExist).toBe(false);
  });
});
