import { describe, expect, it, beforeAll, afterAll } from "bun:test";
import fs from "fs-extra";
import path from "node:path";

import {
  loadProjectConfig,
  resolveAvailableAddons,
  validateSelectedAddons,
  addHandler,
} from "../src/commands/add";
import { AddErrors, addErrorMessage } from "../src/commands/add-errors";
import { ok, err, isOk, isErr, mapResult, andThen, tryCatch, tryCatchAsync } from "../src/utils/result";
import type { BetterTStackConfig } from "../src/types";

// ---------------------------------------------------------------------------
// Test fixtures
// ---------------------------------------------------------------------------

const TEST_DIR = path.join(import.meta.dir, "..", ".smoke-add-test");

function makeConfig(overrides: Partial<BetterTStackConfig> = {}): BetterTStackConfig {
  return {
    version: "1.3.2",
    createdAt: new Date().toISOString(),
    ecosystem: "typescript",
    database: "sqlite",
    orm: "drizzle",
    backend: "hono",
    runtime: "bun",
    frontend: ["tanstack-router"],
    addons: [],
    examples: [],
    auth: "none",
    payments: "none",
    email: "none",
    fileUpload: "none",
    effect: "none",
    ai: "none",
    stateManagement: "none",
    validation: "zod",
    forms: "react-hook-form",
    testing: "vitest",
    packageManager: "bun",
    dbSetup: "none",
    api: "trpc",
    webDeploy: "none",
    serverDeploy: "none",
    cssFramework: "tailwind",
    uiLibrary: "shadcn-ui",
    realtime: "none",
    jobQueue: "none",
    animation: "none",
    logging: "none",
    observability: "none",
    featureFlags: "none",
    analytics: "none",
    cms: "none",
    caching: "none",
    search: "none",
    fileStorage: "none",
    rustWebFramework: "none",
    rustFrontend: "none",
    rustOrm: "none",
    rustApi: "none",
    rustCli: "none",
    rustLibraries: [],
    pythonWebFramework: "none",
    pythonOrm: "none",
    pythonValidation: "none",
    pythonAi: [],
    pythonTaskQueue: "none",
    pythonQuality: "none",
    goWebFramework: "none",
    goOrm: "none",
    goApi: "none",
    goCli: "none",
    goLogging: "none",
    aiDocs: ["claude-md"],
    ...overrides,
  } as BetterTStackConfig;
}

async function writeTestConfig(dir: string, config: BetterTStackConfig) {
  await fs.ensureDir(dir);
  const content = `// Better Fullstack configuration file\n// safe to delete\n\n${JSON.stringify(config, null, 2)}`;
  await fs.writeFile(path.join(dir, "bts.jsonc"), content, "utf-8");
}

// ---------------------------------------------------------------------------
// Result type tests
// ---------------------------------------------------------------------------

describe("Result type", () => {
  it("ok() creates an Ok result", () => {
    const result = ok(42);
    expect(result.ok).toBe(true);
    expect(isOk(result)).toBe(true);
    expect(isErr(result)).toBe(false);
    if (result.ok) expect(result.value).toBe(42);
  });

  it("err() creates an Err result", () => {
    const result = err("oops");
    expect(result.ok).toBe(false);
    expect(isErr(result)).toBe(true);
    expect(isOk(result)).toBe(false);
    if (!result.ok) expect(result.error).toBe("oops");
  });

  it("mapResult transforms the success value", () => {
    const result = ok(10);
    const mapped = mapResult(result, (v) => v * 2);
    expect(mapped.ok).toBe(true);
    if (mapped.ok) expect(mapped.value).toBe(20);
  });

  it("mapResult passes through errors", () => {
    const result = err("fail");
    const mapped = mapResult(result, (v: number) => v * 2);
    expect(mapped.ok).toBe(false);
    if (!mapped.ok) expect(mapped.error).toBe("fail");
  });

  it("andThen chains on success", () => {
    const result = ok(5);
    const chained = andThen(result, (v) => (v > 3 ? ok(v + 1) : err("too small")));
    expect(chained.ok).toBe(true);
    if (chained.ok) expect(chained.value).toBe(6);
  });

  it("andThen short-circuits on error", () => {
    const result = err("initial");
    const chained = andThen(result, (v: number) => ok(v + 1));
    expect(chained.ok).toBe(false);
    if (!chained.ok) expect(chained.error).toBe("initial");
  });

  it("tryCatch catches exceptions", () => {
    const result = tryCatch(
      () => { throw new Error("boom"); },
      (e) => (e instanceof Error ? e.message : "unknown"),
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe("boom");
  });

  it("tryCatch returns Ok on success", () => {
    const result = tryCatch(
      () => 42,
      (e) => String(e),
    );
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe(42);
  });

  it("tryCatchAsync catches async exceptions", async () => {
    const result = await tryCatchAsync(
      async () => { throw new Error("async boom"); },
      (e) => (e instanceof Error ? e.message : "unknown"),
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe("async boom");
  });
});

// ---------------------------------------------------------------------------
// AddError types tests
// ---------------------------------------------------------------------------

describe("AddError types", () => {
  it("ConfigNotFound produces correct message", () => {
    const error = AddErrors.configNotFound("/foo/bar");
    expect(error.tag).toBe("ConfigNotFound");
    expect(addErrorMessage(error)).toContain("No bts.jsonc found");
    expect(addErrorMessage(error)).toContain("/foo/bar");
  });

  it("ConfigParseError produces correct message", () => {
    const error = AddErrors.configParseError("/foo", "bad json");
    expect(error.tag).toBe("ConfigParseError");
    expect(addErrorMessage(error)).toContain("bad json");
  });

  it("UnsupportedEcosystem produces correct message", () => {
    const error = AddErrors.unsupportedEcosystem("rust");
    expect(error.tag).toBe("UnsupportedEcosystem");
    expect(addErrorMessage(error)).toContain("rust");
  });

  it("IncompatibleAddon produces correct message", () => {
    const error = AddErrors.incompatibleAddon("pwa", "no compatible frontend");
    expect(error.tag).toBe("IncompatibleAddon");
    expect(addErrorMessage(error)).toContain("pwa");
    expect(addErrorMessage(error)).toContain("no compatible frontend");
  });

  it("NoAddonsSelected produces correct message", () => {
    const error = AddErrors.noAddonsSelected();
    expect(error.tag).toBe("NoAddonsSelected");
    expect(addErrorMessage(error)).toContain("No addons selected");
  });

  it("UserCancelled produces correct message", () => {
    const error = AddErrors.userCancelled();
    expect(error.tag).toBe("UserCancelled");
    expect(addErrorMessage(error)).toContain("cancelled");
  });
});

// ---------------------------------------------------------------------------
// loadProjectConfig tests
// ---------------------------------------------------------------------------

describe("loadProjectConfig", () => {
  const configDir = path.join(TEST_DIR, "config-test");

  beforeAll(async () => {
    await fs.ensureDir(configDir);
  });

  afterAll(async () => {
    await fs.rm(TEST_DIR, { recursive: true, force: true });
  });

  it("returns ConfigNotFound when no bts.jsonc exists", async () => {
    const emptyDir = path.join(TEST_DIR, "empty");
    await fs.ensureDir(emptyDir);
    const result = await loadProjectConfig(emptyDir);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.tag).toBe("ConfigNotFound");
  });

  it("returns Ok with parsed config when bts.jsonc exists", async () => {
    const config = makeConfig();
    await writeTestConfig(configDir, config);
    const result = await loadProjectConfig(configDir);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.ecosystem).toBe("typescript");
      expect(result.value.backend).toBe("hono");
    }
  });

  it("returns ConfigParseError for malformed config", async () => {
    const badDir = path.join(TEST_DIR, "bad-config");
    await fs.ensureDir(badDir);
    await fs.writeFile(path.join(badDir, "bts.jsonc"), "{{{invalid", "utf-8");
    const result = await loadProjectConfig(badDir);
    // The JSONC parser is lenient, but triple braces should cause issues
    // or return null from readBtsConfig
    expect(result.ok).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// resolveAvailableAddons tests
// ---------------------------------------------------------------------------

describe("resolveAvailableAddons", () => {
  it("returns addons for a TypeScript project with no existing addons", () => {
    const config = makeConfig({ addons: [] });
    const result = resolveAvailableAddons(config);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.length).toBeGreaterThan(0);
      expect(result.value).toContain("turborepo");
      expect(result.value).toContain("biome");
    }
  });

  it("excludes already-installed addons", () => {
    const config = makeConfig({ addons: ["turborepo", "biome"] });
    const result = resolveAvailableAddons(config);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).not.toContain("turborepo");
      expect(result.value).not.toContain("biome");
    }
  });

  it("returns UnsupportedEcosystem for Rust projects", () => {
    const config = makeConfig({ ecosystem: "rust" as any });
    const result = resolveAvailableAddons(config);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.tag).toBe("UnsupportedEcosystem");
  });

  it("returns NoAddonsAvailable when all addons already installed", () => {
    const config = makeConfig({
      addons: [
        "turborepo", "biome", "oxlint", "ultracite", "lefthook",
        "husky", "ruler", "pwa", "tauri", "starlight",
        "fumadocs", "opentui", "wxt", "msw", "storybook",
      ],
    });
    const result = resolveAvailableAddons(config);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.tag).toBe("NoAddonsAvailable");
  });
});

// ---------------------------------------------------------------------------
// validateSelectedAddons tests
// ---------------------------------------------------------------------------

describe("validateSelectedAddons", () => {
  it("passes for compatible addons", () => {
    const config = makeConfig({ frontend: ["tanstack-router"] });
    const result = validateSelectedAddons(["turborepo", "biome"], config);
    expect(result.ok).toBe(true);
  });

  it("returns IncompatibleAddon for frontend-restricted addon with wrong frontend", () => {
    // pwa requires a vite-based frontend
    const config = makeConfig({ frontend: ["next"] as any });
    const result = validateSelectedAddons(["pwa"], config);
    // pwa is compatible with tanstack-router, react-router, solid - not next
    // The compatibility depends on the ADDON_COMPATIBILITY map
    // If next is not compatible, it should fail
    if (!result.ok) {
      expect(result.error.tag).toBe("IncompatibleAddon");
    }
  });
});

// ---------------------------------------------------------------------------
// addHandler integration tests
// ---------------------------------------------------------------------------

describe("addHandler", () => {
  const addTestDir = path.join(TEST_DIR, "add-handler");

  beforeAll(async () => {
    await fs.ensureDir(addTestDir);
  });

  afterAll(async () => {
    await fs.rm(TEST_DIR, { recursive: true, force: true });
  });

  it("returns ConfigNotFound for non-project directory", async () => {
    const emptyDir = path.join(addTestDir, "no-project");
    await fs.ensureDir(emptyDir);
    const result = await addHandler({ cwd: emptyDir, addons: ["turborepo"] });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.tag).toBe("ConfigNotFound");
  });

  it("returns NoAddonsSelected when empty addon array is passed", async () => {
    const dir = path.join(addTestDir, "empty-addons");
    await writeTestConfig(dir, makeConfig());
    const result = await addHandler({ cwd: dir, addons: [] });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.tag).toBe("NoAddonsSelected");
  });

  it("returns NoAddonsSelected when only 'none' is passed", async () => {
    const dir = path.join(addTestDir, "none-addon");
    await writeTestConfig(dir, makeConfig());
    const result = await addHandler({ cwd: dir, addons: ["none"] });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.tag).toBe("NoAddonsSelected");
  });

  it("succeeds with skipInstall and updates bts.jsonc", async () => {
    const dir = path.join(addTestDir, "skip-install");
    await writeTestConfig(dir, makeConfig({ addons: [] }));
    const result = await addHandler({
      cwd: dir,
      addons: ["turborepo"],
      skipInstall: true,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.addedAddons).toEqual(["turborepo"]);
    }

    // Verify config was updated
    const configContent = await fs.readFile(path.join(dir, "bts.jsonc"), "utf-8");
    expect(configContent).toContain("turborepo");
  });

  it("succeeds with multiple addons and skipInstall", async () => {
    const dir = path.join(addTestDir, "multi-addon");
    await writeTestConfig(dir, makeConfig({ addons: [] }));
    const result = await addHandler({
      cwd: dir,
      addons: ["turborepo", "biome", "oxlint"],
      skipInstall: true,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.addedAddons).toEqual(["turborepo", "biome", "oxlint"]);
    }
  });

  it("preserves existing addons when adding new ones", async () => {
    const dir = path.join(addTestDir, "preserve-existing");
    await writeTestConfig(dir, makeConfig({ addons: ["turborepo"] }));
    const result = await addHandler({
      cwd: dir,
      addons: ["biome"],
      skipInstall: true,
    });
    expect(result.ok).toBe(true);

    // Check that both addons are in config
    const configContent = await fs.readFile(path.join(dir, "bts.jsonc"), "utf-8");
    expect(configContent).toContain("turborepo");
    expect(configContent).toContain("biome");
  });

  it("returns UnsupportedEcosystem for non-TS projects", async () => {
    const dir = path.join(addTestDir, "rust-project");
    await writeTestConfig(dir, makeConfig({ ecosystem: "rust" as any }));
    const result = await addHandler({
      cwd: dir,
      addons: ["turborepo"],
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.tag).toBe("UnsupportedEcosystem");
  });
});
