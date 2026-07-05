import { afterAll, describe, expect, it } from "bun:test";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import * as JSONC from "jsonc-parser";

import {
  createCliDefaultProjectConfigBase,
  parseStackPartSpecs,
  type BetterTStackConfig,
  type ProjectConfig,
} from "@better-fullstack/types";

import {
  readBtsConfig,
  readBtsConfigFromFile,
  updateBtsConfig,
  writeBtsConfig,
} from "../src/utils/bts-config";

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

  it("persists workspaceShape so a single-app project isn't re-rendered as a monorepo", async () => {
    const config = await makeProjectConfig({ workspaceShape: "single-app" });
    await writeBtsConfig(config);
    const readBack = await readBtsConfig(config.projectDir);
    // Without this, bfs update / stack-update would reconstruct workspaceShape as
    // the monorepo default and re-render the flat app with apps/*+packages/* files.
    expect(readBack?.workspaceShape).toBe("single-app");
  });

  it("lets stackParts win over stale top-level cache fields", async () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "frontend.css:typescript:scss",
      "frontend.ui:typescript:none",
      "mobile:react-native:native-bare",
      "mobile.push:react-native:expo-notifications",
      "mobile.ota:react-native:expo-updates",
      "mobile.deepLinking:react-native:expo-linking",
      "backend:go:gin",
      "backend.orm:go:gorm",
    ]);
    const config = await makeProjectConfig({
      stackParts,
      frontend: ["svelte"],
      cssFramework: "tailwind",
      mobilePush: "none",
      mobileOTA: "none",
      mobileDeepLinking: "none",
      backend: "hono",
      goWebFramework: "none",
      goOrm: "none",
    });

    await writeBtsConfig(config);

    const { parsed } = await readJsonc(config.projectDir);

    expect(parsed.frontend).toEqual(["next", "native-bare"]);
    expect(parsed.cssFramework).toBe("scss");
    expect(parsed.backend).toBe("none");
    expect(parsed.goWebFramework).toBe("gin");
    expect(parsed.goOrm).toBe("gorm");
    expect(parsed.mobilePush).toBe("expo-notifications");
    expect(parsed.mobileOTA).toBe("expo-updates");
    expect(parsed.mobileDeepLinking).toBe("expo-linking");
    expect(parsed.effectiveStack).toMatchObject({
      frontend: "typescript:next",
      "frontend.css": "typescript:scss",
      mobile: "react-native:native-bare",
      "mobile.push": "react-native:expo-notifications",
      "mobile.ota": "react-native:expo-updates",
      "mobile.deepLinking": "react-native:expo-linking",
      backend: "go:gin",
      "backend.orm": "go:gorm",
    });
    expect(parsed.effectiveStack).not.toHaveProperty("frontend.ui");

    const readBack = await readBtsConfig(config.projectDir);
    expect(readBack?.frontend).toEqual(["next", "native-bare"]);
    expect(readBack?.cssFramework).toBe("scss");
    expect(readBack?.goWebFramework).toBe("gin");
    expect(readBack?.goOrm).toBe("gorm");
    expect(readBack?.mobilePush).toBe("expo-notifications");
    expect(readBack?.mobileOTA).toBe("expo-updates");
    expect(readBack?.mobileDeepLinking).toBe("expo-linking");
  });

  it("normalizes stale non-selected cache fields when reading stackParts", async () => {
    const stackParts = parseStackPartSpecs([
      "frontend:typescript:next",
      "frontend.css:typescript:scss",
      "mobile:react-native:native-bare",
      "mobile.navigation:react-native:none",
      "mobile.push:react-native:none",
      "mobile.ota:react-native:none",
      "mobile.deepLinking:react-native:none",
      "backend:typescript:hono",
    ]);
    const config = await makeProjectConfig({ stackParts });

    await writeBtsConfig(config);

    const configPath = join(config.projectDir, "bts.jsonc");
    let staleContent = await readFile(configPath, "utf8");
    for (const [key, value] of Object.entries({
      graphSummary: "Stale graph summary",
      effectiveStack: { backend: "go:gin" },
      goWebFramework: "gin",
      goOrm: "gorm",
      javaWebFramework: "spring-boot",
      elixirJson: "jason",
      mobileNavigation: "expo-router",
      mobilePush: "expo-notifications",
      mobileOTA: "expo-updates",
      mobileDeepLinking: "expo-linking",
    })) {
      const edit = JSONC.modify(staleContent, [key], value, {
        formattingOptions: {
          tabSize: 2,
          insertSpaces: true,
          eol: "\n",
        },
      });
      staleContent = JSONC.applyEdits(staleContent, edit);
    }
    await writeFile(configPath, staleContent, "utf8");

    const readBack = await readBtsConfig(config.projectDir);

    expect(readBack?.graphSummary).not.toBe("Stale graph summary");
    expect(readBack?.effectiveStack).toMatchObject({
      frontend: "typescript:next",
      "frontend.css": "typescript:scss",
      backend: "typescript:hono",
    });
    expect(readBack?.goWebFramework).toBe("none");
    expect(readBack?.goOrm).toBe("none");
    expect(readBack?.javaWebFramework).toBe("none");
    expect(readBack?.elixirJson).toBe("none");
    expect(readBack?.mobileNavigation).toBe("none");
    expect(readBack?.mobilePush).toBe("none");
    expect(readBack?.mobileOTA).toBe("none");
    expect(readBack?.mobileDeepLinking).toBe("none");
    expect(readBack?.effectiveStack).not.toHaveProperty("mobile.push");
    expect(readBack?.effectiveStack).not.toHaveProperty("mobile.ota");
    expect(readBack?.effectiveStack).not.toHaveProperty("mobile.deepLinking");
  });

  it("normalizes stale mobile cache fields when reading a config file source", async () => {
    const stackParts = parseStackPartSpecs([
      "mobile:react-native:native-bare",
      "mobile.push:react-native:none",
      "mobile.ota:react-native:none",
      "mobile.deepLinking:react-native:none",
    ]);
    const config = await makeProjectConfig({ stackParts });

    await writeBtsConfig(config);

    const configPath = join(config.projectDir, "bts.jsonc");
    let staleContent = await readFile(configPath, "utf8");
    for (const [key, value] of Object.entries({
      mobilePush: "expo-notifications",
      mobileOTA: "expo-updates",
      mobileDeepLinking: "expo-linking",
    })) {
      const edit = JSONC.modify(staleContent, [key], value, {
        formattingOptions: {
          tabSize: 2,
          insertSpaces: true,
          eol: "\n",
        },
      });
      staleContent = JSONC.applyEdits(staleContent, edit);
    }
    await writeFile(configPath, staleContent, "utf8");

    for (const sourcePath of [configPath, config.projectDir]) {
      const readBack = await readBtsConfigFromFile(sourcePath);

      expect(readBack?.mobilePush).toBe("none");
      expect(readBack?.mobileOTA).toBe("none");
      expect(readBack?.mobileDeepLinking).toBe("none");
      expect(readBack?.effectiveStack).toMatchObject({
        mobile: "react-native:native-bare",
      });
      expect(readBack?.effectiveStack).not.toHaveProperty("mobile.push");
      expect(readBack?.effectiveStack).not.toHaveProperty("mobile.ota");
      expect(readBack?.effectiveStack).not.toHaveProperty("mobile.deepLinking");
    }
  });

  it("refreshes graph metadata and derived cache when updating bts config", async () => {
    const config = await makeProjectConfig();
    await writeBtsConfig(config);

    await updateBtsConfig(config.projectDir, {
      addons: ["turborepo", "pwa"],
      webDeploy: "netlify",
      serverDeploy: "railway",
    });

    const { parsed } = await readJsonc(config.projectDir);
    const stackPartSpecs = parsed.stackParts?.map((part) => {
      const owner = parsed.stackParts?.find((candidate) => candidate.id === part.ownerPartId);
      return owner
        ? `${owner.role}.${part.role}:${part.ecosystem}:${part.toolId}`
        : `${part.role}:${part.ecosystem}:${part.toolId}`;
    });

    expect(parsed.addons).toEqual(["turborepo", "pwa"]);
    expect(parsed.webDeploy).toBe("netlify");
    expect(parsed.serverDeploy).toBe("railway");
    expect(stackPartSpecs).toEqual(
      expect.arrayContaining([
        "frontend.appPlatform:typescript:pwa",
        "frontend.deploy:typescript:netlify",
        "backend.deploy:typescript:railway",
      ]),
    );
    expect(parsed.effectiveStack).toMatchObject({
      "frontend.appPlatform": "typescript:pwa",
      "frontend.deploy": "typescript:netlify",
      "backend.deploy": "typescript:railway",
    });

    const readBack = await readBtsConfig(config.projectDir);
    expect(readBack?.addons).toEqual(["turborepo", "pwa"]);
    expect(readBack?.webDeploy).toBe("netlify");
    expect(readBack?.serverDeploy).toBe("railway");
  });
});
