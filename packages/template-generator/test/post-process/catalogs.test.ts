import { describe, expect, it } from "bun:test";
import yaml from "yaml";

import { processCatalogs } from "../../src/post-process/catalogs";
import { makeConfig } from "../_fixtures/config-factory";
import { createSeededVFS } from "../_fixtures/vfs-factory";

type WorkspaceJson = {
  workspaces?: string[] | { packages?: string[]; catalog?: Record<string, string> };
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

describe("processCatalogs", () => {
  it("skips catalog processing for npm and yarn", () => {
    const npmVfs = createSeededVFS(["package.json", "apps/web/package.json", "apps/server/package.json"]);
    npmVfs.writeJson("package.json", {
      workspaces: ["apps/*", "packages/*"],
    });
    npmVfs.writeJson("apps/web/package.json", {
      dependencies: { react: "^19.0.0" },
    });
    npmVfs.writeJson("apps/server/package.json", {
      dependencies: { react: "^19.0.0" },
    });

    processCatalogs(
      npmVfs,
      makeConfig({
        packageManager: "npm",
      }),
    );

    expect(npmVfs.readJson<WorkspaceJson>("package.json")?.workspaces).toEqual([
      "apps/*",
      "packages/*",
    ]);
    expect(npmVfs.readFile("pnpm-workspace.yaml")).toBeUndefined();
  });

  it("creates bun workspace catalogs and rewrites duplicate dependencies to catalog references", () => {
    const vfs = createSeededVFS(["package.json", "apps/web/package.json", "apps/server/package.json"]);
    vfs.writeJson("package.json", {
      workspaces: ["apps/*", "packages/*"],
      dependencies: { react: "^19.0.0" },
    });
    vfs.writeJson("apps/web/package.json", {
      dependencies: {
        react: "^19.0.0",
        "@demo-app/config": "workspace:*",
        lodash: "^4.17.21",
      },
    });
    vfs.writeJson("apps/server/package.json", {
      dependencies: {
        react: "^19.0.0",
        lodash: "^4.17.20",
      },
      devDependencies: {
        typescript: "^5.9.3",
      },
    });
    vfs.writeJson("packages/api/package.json", {
      dependencies: {
        typescript: "^5.9.3",
      },
    });

    processCatalogs(
      vfs,
      makeConfig({
        projectName: "demo-app",
        packageManager: "bun",
      }),
    );

    const root = vfs.readJson<WorkspaceJson>("package.json");
    const web = vfs.readJson<WorkspaceJson>("apps/web/package.json");
    const server = vfs.readJson<WorkspaceJson>("apps/server/package.json");
    const api = vfs.readJson<WorkspaceJson>("packages/api/package.json");

    expect(root?.workspaces).toEqual({
      packages: ["apps/*", "packages/*"],
      catalog: {
        react: "^19.0.0",
        typescript: "^5.9.3",
      },
    });
    expect(web?.dependencies?.react).toBe("catalog:");
    expect(web?.dependencies?.["@demo-app/config"]).toBe("workspace:*");
    expect(web?.dependencies?.lodash).toBe("^4.17.21");
    expect(server?.dependencies?.react).toBe("catalog:");
    expect(server?.devDependencies?.typescript).toBe("catalog:");
    expect(api?.dependencies?.typescript).toBe("catalog:");
  });

  it("creates and updates pnpm-workspace catalogs", () => {
    const vfs = createSeededVFS(["package.json", "apps/web/package.json", "packages/api/package.json"]);
    vfs.writeJson("apps/web/package.json", {
      dependencies: {
        react: "^19.0.0",
      },
    });
    vfs.writeJson("packages/api/package.json", {
      devDependencies: {
        react: "^19.0.0",
      },
    });

    processCatalogs(
      vfs,
      makeConfig({
        packageManager: "pnpm",
      }),
    );

    const workspaceYaml = yaml.parse(vfs.readFile("pnpm-workspace.yaml") ?? "");
    const web = vfs.readJson<WorkspaceJson>("apps/web/package.json");
    const api = vfs.readJson<WorkspaceJson>("packages/api/package.json");

    expect(workspaceYaml.catalog).toEqual({
      react: "^19.0.0",
    });
    expect(web?.dependencies?.react).toBe("catalog:");
    expect(api?.devDependencies?.react).toBe("catalog:");
  });
});
