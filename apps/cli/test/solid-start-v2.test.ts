import { describe, expect, it } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { expectSuccess, runTRPCTest, type TestConfig } from "./test-utils";

const baseConfig: TestConfig = {
  projectName: "solid-start-v2",
  frontend: ["solid-start"],
  backend: "self",
  runtime: "none",
  database: "sqlite",
  orm: "drizzle",
  auth: "better-auth",
  api: "orpc",
  cssFramework: "tailwind",
  uiLibrary: "none",
  addons: ["none"],
  examples: ["none"],
  dbSetup: "none",
  install: false,
};

describe("SolidStart v2", () => {
  it("generates the Vite 8 and Nitro v3 application shape", async () => {
    const result = await runTRPCTest(baseConfig);
    expectSuccess(result);

    const webDir = join(result.projectDir!, "apps", "web");
    const packageJson = readFileSync(join(webDir, "package.json"), "utf8");
    const tsconfig = readFileSync(join(webDir, "tsconfig.json"), "utf8");
    const viteConfig = readFileSync(join(webDir, "vite.config.ts"), "utf8");

    expect(existsSync(join(webDir, "app.config.ts"))).toBe(false);
    expect(packageJson).toContain('"@solidjs/start": "^2.0.0"');
    expect(packageJson).toContain('"nitro": "^3.0.260610-beta"');
    expect(packageJson).toContain('"vite": "^8.2.0"');
    expect(packageJson).toContain('"node": ">=24"');
    expect(packageJson).not.toContain("vinxi");
    expect(packageJson).not.toContain("vite-tsconfig-paths");
    expect(tsconfig).toContain('"types": ["@solidjs/start/env"]');
    expect(viteConfig).toContain('import { solidStart } from "@solidjs/start/config"');
    expect(viteConfig).toContain('import { nitro } from "nitro/vite"');
    expect(viteConfig).toContain("tsconfigPaths: true");
    expect(viteConfig).toContain('preset: "node_server"');
  });

  it.each([
    ["netlify", "netlify"],
    ["vercel", "vercel"],
  ] as const)("uses the %s Nitro preset", async (webDeploy, preset) => {
    const result = await runTRPCTest({
      ...baseConfig,
      projectName: `solid-start-v2-${webDeploy}`,
      webDeploy,
    });
    expectSuccess(result);

    const webDir = join(result.projectDir!, "apps", "web");
    const viteConfig = readFileSync(join(webDir, "vite.config.ts"), "utf8");
    expect(viteConfig).toContain(`preset: "${preset}"`);

    if (webDeploy === "vercel") {
      const vercelConfig = readFileSync(join(webDir, "vercel.json"), "utf8");
      expect(vercelConfig).not.toContain("outputDirectory");
    }
  });
});
