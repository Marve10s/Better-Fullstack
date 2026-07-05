import { describe, expect, it } from "bun:test";

import {
  flattenSingleApp,
  qualifiesForSingleApp,
} from "../../src/post-process/flatten-single-app";
import { VirtualFileSystem } from "../../src/core/virtual-fs";
import { makeConfig } from "../_fixtures/config-factory";

/**
 * Builds a minimal but realistic thin-self-app monorepo tree (Next.js + self,
 * everything else "none") the way the generator would emit it right before the
 * flatten post-process runs: apps/web + packages/config + packages/env, a root
 * package.json carrying the bun catalog, and workspace-protocol deps.
 */
function seedThinSelfMonorepo(projectName = "flatapp"): VirtualFileSystem {
  const vfs = new VirtualFileSystem();

  vfs.writeJson("package.json", {
    name: projectName,
    private: true,
    type: "module",
    workspaces: {
      packages: ["apps/*", "packages/*"],
      catalog: {
        dotenv: "^17.4.2",
        zod: "^4.4.3",
        "@types/node": "^26.0.1",
      },
    },
    scripts: { dev: "bun run --filter '*' dev" },
    packageManager: "bun@1.3.5",
    dependencies: { dotenv: "catalog:", zod: "catalog:", [`@${projectName}/env`]: "workspace:*" },
    devDependencies: {
      typescript: "^6.0.3",
      "@types/node": "catalog:",
      [`@${projectName}/config`]: "workspace:*",
    },
  });

  vfs.writeFile("bunfig.toml", '[install]\nlinker = "isolated"\n');
  vfs.writeFile("tsconfig.json", `{\n  "extends": "@${projectName}/config/tsconfig.base.json",\n}\n`);
  vfs.writeFile("README.md", "# flatapp\n");

  vfs.writeJson("apps/web/package.json", {
    name: "web",
    version: "0.1.0",
    private: true,
    scripts: { "check-types": "tsc --noEmit", dev: "next dev --port 3001", build: "next build" },
    dependencies: {
      next: "^16.2.9",
      react: "^19.2.7",
      dotenv: "catalog:",
      zod: "catalog:",
      [`@${projectName}/env`]: "workspace:*",
    },
    devDependencies: {
      typescript: "^5",
      "@types/node": "catalog:",
      [`@${projectName}/config`]: "workspace:*",
    },
  });
  vfs.writeFile(
    "apps/web/next.config.ts",
    `import "@${projectName}/env/web";\nimport type { NextConfig } from "next";\n\nexport default {} satisfies NextConfig;\n`,
  );
  vfs.writeFile("apps/web/next-env.d.ts", '/// <reference types="next" />\n');
  vfs.writeFile(
    "apps/web/src/app/page.tsx",
    `import { env } from "@${projectName}/env/web";\n\nexport default function Home() {\n  return <div>{String(env)}</div>;\n}\n`,
  );
  vfs.writeFile(
    "apps/web/tsconfig.json",
    '{\n  "compilerOptions": { "paths": { "@/*": ["./src/*"] } },\n  "include": ["./**/*.ts", "./**/*.tsx"]\n}\n',
  );
  vfs.writeFile("apps/web/.gitignore", "/node_modules\n/.next/\n");

  vfs.writeJson("packages/config/package.json", { name: `@${projectName}/config`, private: true });
  vfs.writeFile("packages/config/tsconfig.base.json", '{\n  "compilerOptions": { "strict": true }\n}\n');

  vfs.writeJson("packages/env/package.json", {
    name: `@${projectName}/env`,
    version: "0.0.0",
    private: true,
    type: "module",
    exports: { "./server": "./src/server.ts", "./web": "./src/web.ts" },
    dependencies: {
      dotenv: "catalog:",
      zod: "catalog:",
      "@t3-oss/env-nextjs": "^0.13.11",
      "@t3-oss/env-core": "^0.13.11",
    },
    devDependencies: {
      typescript: "^6.0.3",
      "@types/node": "catalog:",
      [`@${projectName}/config`]: "workspace:*",
    },
  });
  vfs.writeFile(
    "packages/env/src/web.ts",
    'import { createEnv } from "@t3-oss/env-nextjs";\n\nexport const env = createEnv({ client: {}, runtimeEnv: {}, emptyStringAsUndefined: true });\n',
  );
  vfs.writeFile(
    "packages/env/src/server.ts",
    'import "dotenv/config";\nimport { createEnv } from "@t3-oss/env-core";\n\nexport const env = createEnv({ server: {}, runtimeEnv: process.env, emptyStringAsUndefined: true });\n',
  );
  vfs.writeFile("packages/env/tsconfig.json", `{\n  "extends": "@${projectName}/config/tsconfig.base.json",\n}\n`);

  return vfs;
}

const SINGLE_APP_NEXT = {
  projectName: "flatapp",
  workspaceShape: "single-app" as const,
  backend: "self" as const,
  frontend: ["next" as const],
  api: "none" as const,
  database: "none" as const,
  orm: "none" as const,
  auth: "none" as const,
  cssFramework: "tailwind" as const,
  uiLibrary: "none" as const,
  addons: [],
  examples: [],
};

describe("qualifiesForSingleApp", () => {
  it("qualifies a thin self-next app with everything else 'none'", () => {
    expect(qualifiesForSingleApp(makeConfig(SINGLE_APP_NEXT))).toBe(true);
  });

  it("qualifies a thin self tanstack-start app", () => {
    expect(
      qualifiesForSingleApp(
        makeConfig({ ...SINGLE_APP_NEXT, frontend: ["tanstack-start"] }),
      ),
    ).toBe(true);
  });

  it("does NOT qualify when workspaceShape is monorepo (the default)", () => {
    expect(
      qualifiesForSingleApp(makeConfig({ ...SINGLE_APP_NEXT, workspaceShape: "monorepo" })),
    ).toBe(false);
  });

  it("does NOT qualify a non-self backend", () => {
    expect(
      qualifiesForSingleApp(
        makeConfig({ ...SINGLE_APP_NEXT, backend: "hono", frontend: ["tanstack-router"] }),
      ),
    ).toBe(false);
  });

  it("does NOT qualify when a sibling package capability is present (auth/db/api)", () => {
    expect(
      qualifiesForSingleApp(makeConfig({ ...SINGLE_APP_NEXT, auth: "better-auth" })),
    ).toBe(false);
    expect(
      qualifiesForSingleApp(makeConfig({ ...SINGLE_APP_NEXT, database: "postgres", orm: "drizzle" })),
    ).toBe(false);
    expect(qualifiesForSingleApp(makeConfig({ ...SINGLE_APP_NEXT, api: "trpc" }))).toBe(false);
  });

  it("does NOT qualify self-nuxt (deferred; different alias convention)", () => {
    expect(
      qualifiesForSingleApp(makeConfig({ ...SINGLE_APP_NEXT, frontend: ["nuxt"] })),
    ).toBe(false);
  });

  it("does NOT qualify when a native frontend is added", () => {
    expect(
      qualifiesForSingleApp(
        makeConfig({ ...SINGLE_APP_NEXT, frontend: ["next", "native-bare"] }),
      ),
    ).toBe(false);
  });
});

describe("flattenSingleApp", () => {
  it("collapses the monorepo into a flat root app", () => {
    const vfs = seedThinSelfMonorepo("flatapp");
    const flattened = flattenSingleApp(vfs, makeConfig(SINGLE_APP_NEXT));

    expect(flattened).toBe(true);

    const files = vfs.getAllFiles();
    expect(files.some((f) => f.startsWith("apps/"))).toBe(false);
    expect(files.some((f) => f.startsWith("packages/"))).toBe(false);
    expect(vfs.directoryExists("apps")).toBe(false);
    expect(vfs.directoryExists("packages")).toBe(false);

    // Web app is now at the root.
    expect(vfs.fileExists("next.config.ts")).toBe(true);
    expect(vfs.fileExists("src/app/page.tsx")).toBe(true);
    expect(vfs.fileExists("tsconfig.json")).toBe(true);

    // Only the imported env module is inlined into src/env (web is imported by
    // next.config + page; server is not, so it stays out of the flat app).
    expect(vfs.fileExists("src/env/web.ts")).toBe(true);
    expect(vfs.fileExists("src/env/server.ts")).toBe(false);
  });

  it("rewrites env imports to the local path alias", () => {
    const vfs = seedThinSelfMonorepo("flatapp");
    flattenSingleApp(vfs, makeConfig(SINGLE_APP_NEXT));

    // next.config.* uses a relative import (evaluated before path-alias resolution).
    const nextConfig = vfs.readFile("next.config.ts") ?? "";
    expect(nextConfig).toContain('import "./src/env/web"');
    expect(nextConfig).not.toContain("@flatapp/env");

    // App source uses the @/ alias.
    const page = vfs.readFile("src/app/page.tsx") ?? "";
    expect(page).toContain('from "@/env/web"');
    expect(page).not.toContain("@flatapp/env");
  });

  it("produces a flat root package.json without workspaces or workspace deps", () => {
    const vfs = seedThinSelfMonorepo("flatapp");
    flattenSingleApp(vfs, makeConfig(SINGLE_APP_NEXT));

    const pkg = vfs.readJson<{
      name: string;
      workspaces?: unknown;
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    }>("package.json");

    expect(pkg?.name).toBe("flatapp");
    expect(pkg?.workspaces).toBeUndefined();

    const deps = pkg?.dependencies ?? {};
    const devDeps = pkg?.devDependencies ?? {};

    // Workspace packages are dropped (inlined), not left dangling.
    expect(deps["@flatapp/env"]).toBeUndefined();
    expect(devDeps["@flatapp/config"]).toBeUndefined();

    // The env package's runtime deps are merged in.
    expect(deps["@t3-oss/env-nextjs"]).toBe("^0.13.11");

    // catalog: references are resolved to concrete versions.
    expect(deps.dotenv).toBe("^17.4.2");
    expect(deps.zod).toBe("^4.4.3");
    expect(devDeps["@types/node"]).toBe("^26.0.1");
    for (const version of [...Object.values(deps), ...Object.values(devDeps)]) {
      expect(version.startsWith("catalog:")).toBe(false);
      expect(version.startsWith("workspace:")).toBe(false);
    }
  });

  it("removes workspace tooling files", () => {
    const vfs = seedThinSelfMonorepo("flatapp");
    vfs.writeJson("turbo.json", { tasks: {} });
    vfs.writeFile("pnpm-workspace.yaml", "packages:\n  - apps/*\n");

    flattenSingleApp(vfs, makeConfig(SINGLE_APP_NEXT));

    expect(vfs.fileExists("turbo.json")).toBe(false);
    expect(vfs.fileExists("pnpm-workspace.yaml")).toBe(false);
  });

  it("bails (leaves the monorepo) when an unexpected workspace package exists", () => {
    const vfs = seedThinSelfMonorepo("flatapp");
    vfs.writeJson("packages/db/package.json", { name: "@flatapp/db" });

    const flattened = flattenSingleApp(vfs, makeConfig(SINGLE_APP_NEXT));

    expect(flattened).toBe(false);
    // The monorepo is left intact.
    expect(vfs.fileExists("apps/web/package.json")).toBe(true);
    expect(vfs.fileExists("packages/db/package.json")).toBe(true);
  });
});
