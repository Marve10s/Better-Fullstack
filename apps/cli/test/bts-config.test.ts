import { afterAll, describe, expect, it } from "bun:test";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as JSONC from "jsonc-parser";

import {
  createCliDefaultProjectConfigBase,
  parseStackPartSpecs,
  type BetterTStackConfig,
  type ProjectConfig,
} from "@better-fullstack/types";

import { readBtsConfig, writeBtsConfig } from "../src/utils/bts-config";

const TEMP_ROOTS: string[] = [];

async function makeProjectConfig(
  overrides: Partial<ProjectConfig> = {},
): Promise<ProjectConfig> {
  const projectDir = await mkdtemp(join(tmpdir(), "bfs-bts-config-"));
  TEMP_ROOTS.push(projectDir);

  return {
    ...createCliDefaultProjectConfigBase(),
    projectName: "bts-config-app",
    relativePath: "bts-config-app",
    projectDir,
    ...overrides,
  } as ProjectConfig;
}

async function readJsonc(projectDir: string) {
  const raw = await readFile(join(projectDir, "bts.jsonc"), "utf8");
  const errors: JSONC.ParseError[] = [];
  const parsed = JSONC.parse(raw, errors, {
    allowTrailingComma: true,
    disallowComments: false,
  }) as BetterTStackConfig & { $schema?: string };

  if (errors.length > 0) {
    throw new Error(`Failed to parse bts.jsonc: ${JSON.stringify(errors)}`);
  }

  return { raw, parsed };
}

afterAll(async () => {
  await Promise.all(TEMP_ROOTS.map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("bts.jsonc graph persistence", () => {
  it("persists flat solo input as stackParts plus a derived compatibility cache", async () => {
    const config = await makeProjectConfig();

    await writeBtsConfig(config);

    const { raw, parsed } = await readJsonc(config.projectDir);

    expect(raw).toContain("stackParts is the source of truth");
    expect(parsed.stackParts?.length).toBeGreaterThan(0);
    expect(parsed.graphSummary).toContain("TanStack Router");
    expect(parsed.effectiveStack).toMatchObject({
      frontend: "typescript:tanstack-router",
      backend: "typescript:hono",
      database: "universal:sqlite",
      "frontend.css": "typescript:tailwind",
      "frontend.ui": "typescript:shadcn-ui",
      "backend.orm": "typescript:drizzle",
      "backend.api": "typescript:trpc",
      "backend.auth": "typescript:better-auth",
    });
    expect(parsed.rustWebFramework).toBe("none");
    expect(parsed.pythonWebFramework).toBe("none");
    expect(parsed.goWebFramework).toBe("none");
    expect(parsed.javaWebFramework).toBe("none");
    expect(parsed.elixirWebFramework).toBe("none");

    const readBack = await readBtsConfig(config.projectDir);
    expect(readBack?.frontend).toEqual(["tanstack-router"]);
    expect(readBack?.backend).toBe("hono");
    expect(readBack?.pythonWebFramework).toBe("none");
  });

  it("lets stackParts win over stale top-level cache fields", async () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "frontend.css:typescript:scss",
      "backend:go:gin",
      "backend.orm:go:gorm",
    ]);
    const config = await makeProjectConfig({
      stackParts,
      frontend: ["svelte"],
      cssFramework: "tailwind",
      backend: "hono",
      goWebFramework: "none",
      goOrm: "none",
    });

    await writeBtsConfig(config);

    const { parsed } = await readJsonc(config.projectDir);

    expect(parsed.frontend).toEqual(["next"]);
    expect(parsed.cssFramework).toBe("scss");
    expect(parsed.backend).toBe("none");
    expect(parsed.goWebFramework).toBe("gin");
    expect(parsed.goOrm).toBe("gorm");
    expect(parsed.effectiveStack).toMatchObject({
      frontend: "typescript:next",
      "frontend.css": "typescript:scss",
      backend: "go:gin",
      "backend.orm": "go:gorm",
    });

    const readBack = await readBtsConfig(config.projectDir);
    expect(readBack?.frontend).toEqual(["next"]);
    expect(readBack?.cssFramework).toBe("scss");
    expect(readBack?.goWebFramework).toBe("gin");
    expect(readBack?.goOrm).toBe("gorm");
  });
});
