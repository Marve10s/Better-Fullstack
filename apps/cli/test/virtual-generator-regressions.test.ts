import { describe, expect, it } from "bun:test";

import { createVirtual } from "../src/index";

function readJsonFromTree(
  tree: NonNullable<Awaited<ReturnType<typeof createVirtual>>["tree"]>,
  targetPath: string,
) {
  const stack = [...tree.root.children];
  while (stack.length > 0) {
    const node = stack.pop()!;
    if (node.type === "file" && node.path === targetPath) {
      return JSON.parse(node.content) as {
        packageManager?: string;
        scripts?: Record<string, string>;
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
      };
    }
    if (node.type === "directory") {
      stack.push(...node.children);
    }
  }
  return undefined;
}

describe("Virtual Generator Regressions", () => {
  const packageManagers = ["npm", "pnpm", "bun", "yarn"] as const;

  for (const packageManager of packageManagers) {
    it(`writes a concrete ${packageManager} packageManager version`, async () => {
      const result = await createVirtual({
        projectName: `pm-${packageManager}`,
        packageManager,
        frontend: ["tanstack-router"],
        backend: "hono",
        api: "trpc",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
      });

      expect(result.success).toBe(true);

      const rootPackageJson = result.tree ? readJsonFromTree(result.tree, "package.json") : undefined;
      expect(rootPackageJson?.packageManager).toMatch(
        new RegExp(`^${packageManager}@\\d+\\.\\d+\\.\\d+(?:-.+)?$`),
      );
    });
  }

  const aiExamples = [
    { ai: "mastra", sdkPackage: "mastra" },
    { ai: "voltagent", sdkPackage: "@voltagent/core" },
    { ai: "openai-agents", sdkPackage: "@openai/agents" },
    { ai: "google-adk", sdkPackage: "@google/adk" },
  ] as const;

  for (const { ai, sdkPackage } of aiExamples) {
    it(`adds transport deps for ${ai} self-hosted AI examples`, async () => {
      const result = await createVirtual({
        projectName: `ai-${ai}`,
        frontend: ["tanstack-start"],
        backend: "self",
        runtime: "none",
        api: "trpc",
        database: "sqlite",
        orm: "drizzle",
        auth: "better-auth",
        examples: ["ai"],
        ai,
      });

      expect(result.success).toBe(true);

      const webPackageJson = result.tree ? readJsonFromTree(result.tree, "apps/web/package.json") : undefined;

      expect(
        webPackageJson?.dependencies?.[sdkPackage] ??
          webPackageJson?.devDependencies?.[sdkPackage],
      ).toBeDefined();
      expect(webPackageJson?.dependencies?.ai).toBeDefined();
      expect(webPackageJson?.dependencies?.["@ai-sdk/google"]).toBeDefined();
      expect(webPackageJson?.dependencies?.["@ai-sdk/devtools"]).toBeDefined();
      expect(webPackageJson?.dependencies?.["@ai-sdk/react"]).toBeDefined();
      expect(webPackageJson?.dependencies?.streamdown).toBeDefined();
    });
  }

  it("adds AI CLI command presets at the generated workspace root", async () => {
    const result = await createVirtual({
      projectName: "ai-cli-root",
      frontend: ["react-vite"],
      backend: "none",
      runtime: "none",
      api: "none",
      database: "none",
      orm: "none",
      auth: "none",
      ai: "ai-cli",
    });

    expect(result.success).toBe(true);

    const rootPackageJson = result.tree ? readJsonFromTree(result.tree, "package.json") : undefined;

    expect(rootPackageJson?.devDependencies?.["ai-cli"]).toBeDefined();
    expect(rootPackageJson?.scripts?.["ai:text"]).toBe("ai text");
    expect(rootPackageJson?.scripts?.["ai:image"]).toBe("ai image");
    expect(rootPackageJson?.scripts?.["ai:video"]).toBe("ai video");
    expect(rootPackageJson?.scripts?.["ai:models"]).toBe("ai models");
    expect(rootPackageJson?.scripts?.["ai:completions"]).toBe("ai completions");
  });
});
