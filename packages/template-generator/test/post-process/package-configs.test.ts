import { describe, expect, it } from "bun:test";

import { cliInputToProjectConfigPartial } from "@better-fullstack/types";

import { processPackageConfigs } from "../../src/post-process/package-configs";
import { makeConfig } from "../_fixtures/config-factory";
import { createSeededVFS } from "../_fixtures/vfs-factory";

type PackageJson = {
  name?: string;
  scripts?: Record<string, string>;
  workspaces?: string[] | { packages?: string[]; catalog?: Record<string, string> };
  overrides?: Record<string, string>;
  resolutions?: Record<string, string>;
  pnpm?: { overrides?: Record<string, string> };
  packageManager?: string;
  exports?: Record<string, string>;
};

describe("processPackageConfigs", () => {
  it("updates root scripts, workspaces, package manager, and package names for standard backends", () => {
    const vfs = createSeededVFS();
    vfs.writeJson("package.json", {
      name: "starter",
      scripts: {},
      workspaces: { packages: ["packages/*"] },
    });

    processPackageConfigs(
      vfs,
      makeConfig({
        projectName: "demo-app",
        packageManager: "bun",
        addons: ["turborepo"],
        database: "postgres",
        orm: "prisma",
      }),
    );

    const root = vfs.readJson<PackageJson>("package.json");
    const db = vfs.readJson<PackageJson>("packages/db/package.json");
    const auth = vfs.readJson<PackageJson>("packages/auth/package.json");
    const api = vfs.readJson<PackageJson>("packages/api/package.json");
    const configPkg = vfs.readJson<PackageJson>("packages/config/package.json");
    const envPkg = vfs.readJson<PackageJson>("packages/env/package.json");
    const infraPkg = vfs.readJson<PackageJson>("packages/infra/package.json");

    expect(root?.name).toBe("demo-app");
    expect(root?.workspaces).toEqual(["packages/*", "apps/*"]);
    expect(root?.packageManager).toBe("bun@1.3.5");
    expect(root?.scripts).toMatchObject({
      dev: "turbo dev",
      build: "turbo build",
      "check-types": "turbo check-types",
      "dev:web": "turbo -F web dev",
      "dev:native": "turbo -F native dev",
      "dev:server": "turbo -F server dev",
      "db:push": "turbo -F @demo-app/db db:push",
      "db:generate": "turbo -F @demo-app/db db:generate",
      "db:migrate": "turbo -F @demo-app/db db:migrate",
    });

    expect(db?.name).toBe("@demo-app/db");
    expect(db?.scripts).toMatchObject({
      postinstall: "prisma generate",
      "db:push": "prisma db push",
      "db:generate": "prisma generate",
      "db:migrate": "prisma migrate dev",
      "db:studio": "prisma studio",
    });
    expect(auth?.name).toBe("@demo-app/auth");
    expect(api?.name).toBe("@demo-app/api");
    expect(configPkg?.name).toBe("@demo-app/config");
    expect(envPkg?.name).toBe("@demo-app/env");
    expect(infraPkg?.name).toBe("@demo-app/infra");
    expect(envPkg?.exports).toEqual({
      "./server": "./src/server.ts",
      "./web": "./src/web.ts",
    });
  });

  it("omits d1-specific db studio and migrate scripts for drizzle on Cloudflare", () => {
    const vfs = createSeededVFS();
    vfs.writeJson("package.json", {
      name: "starter",
      scripts: {},
      workspaces: [],
    });

    processPackageConfigs(
      vfs,
      makeConfig({
        projectName: "cloud-demo",
        packageManager: "pnpm",
        database: "sqlite",
        orm: "drizzle",
        dbSetup: "d1",
        serverDeploy: "cloudflare",
      }),
    );

    const root = vfs.readJson<PackageJson>("package.json");
    const db = vfs.readJson<PackageJson>("packages/db/package.json");

    expect(root?.packageManager).toBe("pnpm@10.17.1");
    expect(root?.scripts).toMatchObject({
      dev: "pnpm -r dev",
      build: "pnpm -r build",
      "db:push": "pnpm --filter @cloud-demo/db db:push",
      "db:generate": "pnpm --filter @cloud-demo/db db:generate",
    });
    expect(root?.scripts?.["db:studio"]).toBeUndefined();
    expect(root?.scripts?.["db:migrate"]).toBeUndefined();
    expect(root?.scripts?.["db:local"]).toBeUndefined();

    expect(db?.scripts).toMatchObject({
      "db:push": "drizzle-kit push",
      "db:generate": "drizzle-kit generate",
    });
    expect(db?.scripts?.["db:studio"]).toBeUndefined();
    expect(db?.scripts?.["db:migrate"]).toBeUndefined();
  });

  it("uses explicit Nx targets so db scripts with colons are not parsed as configurations", () => {
    const vfs = createSeededVFS();
    vfs.writeJson("package.json", {
      name: "starter",
      scripts: {},
      workspaces: [],
    });

    processPackageConfigs(
      vfs,
      makeConfig({
        projectName: "nx-demo",
        addons: ["nx"],
        database: "postgres",
        orm: "prisma",
      }),
    );

    expect(vfs.readJson<PackageJson>("package.json")?.scripts).toMatchObject({
      "dev:web": "nx run web --target=dev",
      "dev:native": "nx run native --target=dev",
      "dev:server": "nx run server --target=dev",
      "db:push": "nx run @nx-demo/db --target=db:push",
      "db:generate": "nx run @nx-demo/db --target=db:generate",
      "db:migrate": "nx run @nx-demo/db --target=db:migrate",
    });
  });

  it("pins Better Auth's Kysely peer with the package-manager override field", () => {
    for (const [packageManager, expected] of [
      ["bun", { overrides: { kysely: "0.28.17" } }],
      ["npm", { overrides: { kysely: "0.28.17" } }],
      ["pnpm", { pnpm: { overrides: { kysely: "0.28.17" } } }],
      ["yarn", { resolutions: { kysely: "0.28.17" } }],
    ] as const) {
      const vfs = createSeededVFS();
      vfs.writeJson("package.json", {
        name: "starter",
        scripts: {},
        workspaces: [],
      });

      processPackageConfigs(
        vfs,
        makeConfig({
          projectName: `better-auth-${packageManager}`,
          packageManager,
          auth: "better-auth",
        }),
      );

      expect(vfs.readJson<PackageJson>("package.json")).toMatchObject(expected);
    }
  });

  it("handles convex workspaces and backend naming", () => {
    const vfs = createSeededVFS(["package.json", "packages/backend/package.json"]);
    vfs.writeJson("package.json", {
      name: "starter",
      scripts: {},
      workspaces: ["packages/*"],
    });

    processPackageConfigs(
      vfs,
      makeConfig({
        projectName: "convex-demo",
        backend: "convex",
        frontend: ["next"],
      }),
    );

    const root = vfs.readJson<PackageJson>("package.json");
    const backend = vfs.readJson<PackageJson>("packages/backend/package.json");

    expect(root?.workspaces).toEqual(["packages/*", "apps/*"]);
    expect(root?.scripts).toMatchObject({
      "dev:setup": "bun run --filter @convex-demo/backend dev:setup",
    });
    expect(backend?.name).toBe("@convex-demo/backend");
  });

  it("adds docker db scripts and native env exports when needed", () => {
    const vfs = createSeededVFS();
    vfs.writeJson("package.json", {
      name: "starter",
      scripts: {},
      workspaces: [],
    });

    processPackageConfigs(
      vfs,
      makeConfig({
        projectName: "docker-demo",
        database: "postgres",
        orm: "drizzle",
        dbSetup: "docker",
        frontend: ["tanstack-router", "native-bare"],
      }),
    );

    const root = vfs.readJson<PackageJson>("package.json");
    const db = vfs.readJson<PackageJson>("packages/db/package.json");
    const envPkg = vfs.readJson<PackageJson>("packages/env/package.json");

    expect(root?.scripts).toMatchObject({
      "db:start": "bun run --filter @docker-demo/db db:start",
      "db:watch": "bun run --filter @docker-demo/db db:watch",
      "db:stop": "bun run --filter @docker-demo/db db:stop",
      "db:down": "bun run --filter @docker-demo/db db:down",
    });
    expect(db?.scripts).toMatchObject({
      "db:start": "docker compose up -d",
      "db:watch": "docker compose up",
      "db:stop": "docker compose stop",
      "db:down": "docker compose down",
    });
    expect(envPkg?.exports).toEqual({
      "./server": "./src/server.ts",
      "./web": "./src/web.ts",
      "./native": "./src/native.ts",
    });
  });

  it("only exposes root dev scripts for generated app workspaces", () => {
    const webOnly = createSeededVFS([
      "package.json",
      "apps/web/package.json",
      "packages/config/package.json",
      "packages/env/package.json",
    ]);
    webOnly.writeJson("package.json", {
      name: "starter",
      scripts: {},
      workspaces: {
        packages: ["apps/*", "packages/*"],
        catalog: {
          react: "^19.0.0",
        },
      },
    });

    processPackageConfigs(
      webOnly,
      makeConfig({
        projectName: "web-only",
        frontend: ["react-vite"],
        backend: "none",
        addons: ["turborepo"],
      }),
    );

    expect(webOnly.readJson<PackageJson>("package.json")?.scripts).toMatchObject({
      "dev:web": "turbo -F web dev",
    });
    expect(webOnly.readJson<PackageJson>("package.json")?.workspaces).toMatchObject({
      catalog: {
        react: "^19.0.0",
      },
    });
    expect(webOnly.readJson<PackageJson>("package.json")?.scripts?.["dev:native"]).toBeUndefined();

    const nativeOnly = createSeededVFS([
      "package.json",
      "apps/native/package.json",
      "packages/config/package.json",
      "packages/env/package.json",
    ]);
    nativeOnly.writeJson("package.json", {
      name: "starter",
      scripts: {},
      workspaces: ["apps/*", "packages/*"],
    });

    processPackageConfigs(
      nativeOnly,
      makeConfig({
        projectName: "native-only",
        ecosystem: "react-native",
        frontend: ["native-uniwind"],
        backend: "none",
        runtime: "none",
        api: "none",
        database: "none",
        orm: "none",
        addons: ["turborepo"],
      }),
    );

    expect(nativeOnly.readJson<PackageJson>("package.json")?.scripts).toMatchObject({
      "dev:native": "turbo -F native dev",
    });
    expect(nativeOnly.readJson<PackageJson>("package.json")?.scripts?.["dev:web"]).toBeUndefined();
  });

  it("uses npm --if-present for workspace-wide scripts so utility packages can omit scripts", () => {
    const vfs = createSeededVFS([
      "package.json",
      "apps/native/package.json",
      "packages/config/package.json",
      "packages/env/package.json",
    ]);
    vfs.writeJson("package.json", {
      name: "starter",
      scripts: {},
      workspaces: ["apps/*", "packages/*"],
    });

    processPackageConfigs(
      vfs,
      makeConfig({
        projectName: "npm-native",
        packageManager: "npm",
        ecosystem: "react-native",
        frontend: ["native-uniwind"],
        backend: "none",
        runtime: "none",
        api: "none",
        database: "none",
        orm: "none",
        addons: [],
      }),
    );

    expect(vfs.readJson<PackageJson>("package.json")?.scripts).toMatchObject({
      dev: "npm run dev --workspaces --if-present",
      build: "npm run build --workspaces --if-present",
      "check-types": "npm run check-types --workspaces --if-present",
      "dev:native": "npm run dev --workspace native",
    });
  });

  it("uses backend scripts as the primary root commands for backend-only graph projects", () => {
    const backendOnly = createSeededVFS([
      "package.json",
      "apps/server/go.mod",
      "packages/db/README.md",
    ]);
    backendOnly.writeJson("package.json", {
      name: "starter",
      scripts: {},
      workspaces: ["apps/*", "packages/*"],
    });

    processPackageConfigs(
      backendOnly,
      makeConfig({
        projectName: "backend-only",
        ecosystem: "go",
        frontend: [],
        backend: "none",
        runtime: "bun",
        api: "none",
        database: "postgres",
        orm: "none",
        goWebFramework: "gin",
        goOrm: "gorm",
        addons: ["turborepo"],
        stackParts: cliInputToProjectConfigPartial({
          part: ["backend:go:gin", "database:universal:postgres", "backend.orm:go:gorm"],
        }).stackParts,
      }),
    );

    const scripts = backendOnly.readJson<PackageJson>("package.json")?.scripts;
    expect(scripts).toMatchObject({
      dev: "cd apps/server && go run cmd/server/main.go",
      "setup:server": "cd apps/server && go mod tidy",
      "dev:server": "cd apps/server && go run cmd/server/main.go",
      "check:server": "cd apps/server && go mod tidy && go test ./...",
      "test:server": "cd apps/server && go mod tidy && go test ./...",
    });
    expect(scripts?.["dev:web"]).toBeUndefined();
    expect(scripts?.["dev:native"]).toBeUndefined();
  });
});
