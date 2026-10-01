import { SMOKE_DIR } from "@test/support/setup";
import { describe, expect, it } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { createProjectHandler } from "@/helpers/core/command-handlers";

const VARIANTS = [
  { framework: "solid-start", effect: "app" },
  { framework: "solid-start", effect: "server" },
  { framework: "tanstack-start", effect: "app" },
  { framework: "tanstack-start", effect: "server" },
] as const;

async function generateVariant(framework: string, effect: string) {
  const projectDir = join(SMOKE_DIR, `future-stack-${framework}-${effect}`);
  const result = await createProjectHandler(
    {
      projectName: projectDir,
      template: "future-stack",
      presetOptions: { framework, effect },
      install: false,
      git: false,
      directoryConflict: "overwrite",
      disableAnalytics: true,
    },
    { silent: true },
  );
  expect(result?.success ? "" : result?.error).toBe("");
  return projectDir;
}

function read(projectDir: string, ...path: string[]) {
  return readFileSync(join(projectDir, ...path), "utf8");
}

describe("Future Stack preset", () => {
  it.each(VARIANTS)("generates the $framework variant with Effect in $effect", async (variant) => {
    const projectDir = await generateVariant(variant.framework, variant.effect);
    const webPackage = read(projectDir, "apps/web/package.json");

    for (const dependency of [
      "@tanstack/solid-query",
      "@tanstack/solid-db",
      "@tanstack/query-db-collection",
      "@tanstack/solid-form",
      "@tanstack/solid-table",
      "@tanstack/solid-virtual",
      "@tanstack/solid-pacer",
      "@tanstack/solid-store",
    ]) {
      expect(webPackage).toContain(`"${dependency}"`);
    }

    const tasksRouter = read(projectDir, "packages/api/src/routers/tasks.ts");
    expect(tasksRouter).toContain('Context.Tag("TaskRepository")');
    expect(tasksRouter).toContain("Schema.standardSchemaV1");
    expect(read(projectDir, "packages/api/src/routers/index.ts")).toContain("tasks: tasksRouter");

    expect(read(projectDir, "apps/web/src/components/sign-in-form.tsx")).toContain('from "effect"');
    expect(existsSync(join(projectDir, "apps/web/src/routes/showcase.tsx"))).toBe(true);
    expect(read(projectDir, "apps/web/src/components/header.tsx")).toContain("/showcase");

    const hasApiServer = existsSync(join(projectDir, "apps/server"));
    expect(hasApiServer).toBe(variant.effect === "server");

    if (variant.framework === "tanstack-start") {
      expect(read(projectDir, "apps/web/vite.config.ts")).toContain(
        "@tanstack/solid-start/plugin/vite",
      );
      expect(existsSync(join(projectDir, "apps/web/src/routes/api/rpc/$.ts"))).toBe(
        variant.effect === "app",
      );
    }
  });

  it("rejects an unknown option instead of creating the default variant", async () => {
    const result = await createProjectHandler(
      {
        projectName: join(SMOKE_DIR, "future-stack-invalid-option"),
        template: "future-stack",
        presetOptions: { framework: "tanstak-start" },
        install: false,
        git: false,
        directoryConflict: "overwrite",
        disableAnalytics: true,
      },
      { silent: true },
    );
    expect(result?.success).toBe(false);
    expect(result?.error).toContain("Unknown framework 'tanstak-start'");
  });
});
