import { MobileLibrariesSchema } from "@better-fullstack/types";
import { log } from "@clack/prompts";
import { runTRPCTest, type TestConfig } from "@test/support/test-utils";
import { readVirtualFileContent as getFile } from "@test/support/virtual-tree-utils";
import { afterAll, afterEach, describe, expect, it, mock, spyOn } from "bun:test";
import fs from "fs-extra";
import os from "node:os";
import path from "node:path";
import { parse as parseYaml } from "yaml";

import { applyScaffoldUpgrade, planScaffoldUpgrade } from "@/helpers/core/scaffold-upgrade";
import { applyStackUpdate, planStackUpdate } from "@/helpers/core/stack-update";
import { createVirtual } from "@/index";
import {
  applyDependencyVersionChannel,
  clearRegistryVersionCache,
  collectPackageJsonPaths,
  compareVersions,
  parseVersion,
  planDependencyVersionChannel,
  selectRegistryVersionForChannel,
} from "@/lifecycle/dependency-version-channel";
import {
  hashContent,
  readScaffoldManifest,
  writeScaffoldManifest,
} from "@/lifecycle/scaffold-manifest";

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  clearRegistryVersionCache();
  mock.restore();
});

type RegistryFixture = Record<string, { tags: Record<string, string>; versions: string[] }>;

function mockRegistry(registry: RegistryFixture, fallback?: RegistryFixture[string]) {
  global.fetch = mock(async (input: string | URL | Request) => {
    const packageInfo =
      registry[decodeURIComponent(String(input).split("/").pop() ?? "")] ?? fallback;
    if (!packageInfo) return new Response("{}", { status: 404 });
    return Response.json({
      "dist-tags": packageInfo.tags,
      versions: Object.fromEntries(packageInfo.versions.map((version) => [version, {}])),
    });
  }) as unknown as typeof fetch;
}

describe("parseVersion", () => {
  it("parses standard semver", () => {
    expect(parseVersion("1.2.3")).toEqual({
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [],
    });
  });

  it("strips leading non-digit characters (caret, tilde)", () => {
    expect(parseVersion("^1.2.3")).toEqual({
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: [],
    });
    expect(parseVersion("~4.5.6")).toEqual({
      major: 4,
      minor: 5,
      patch: 6,
      prerelease: [],
    });
  });

  it("parses prerelease identifiers", () => {
    expect(parseVersion("3.0.0-beta.2")).toEqual({
      major: 3,
      minor: 0,
      patch: 0,
      prerelease: ["beta", 2],
    });

    expect(parseVersion("1.0.0-alpha.1")).toEqual({
      major: 1,
      minor: 0,
      patch: 0,
      prerelease: ["alpha", 1],
    });

    expect(parseVersion("2.0.0-rc.1")).toEqual({
      major: 2,
      minor: 0,
      patch: 0,
      prerelease: ["rc", 1],
    });
  });

  it("parses compound prerelease tags", () => {
    expect(parseVersion("5.0.0-beta.1.2")).toEqual({
      major: 5,
      minor: 0,
      patch: 0,
      prerelease: ["beta", 1, 2],
    });
  });

  it("handles missing minor and patch", () => {
    expect(parseVersion("5")).toEqual({
      major: 5,
      minor: 0,
      patch: 0,
      prerelease: [],
    });

    expect(parseVersion("5.1")).toEqual({
      major: 5,
      minor: 1,
      patch: 0,
      prerelease: [],
    });
  });

  it("handles non-numeric segments as zero", () => {
    expect(parseVersion("abc")).toEqual({
      major: 0,
      minor: 0,
      patch: 0,
      prerelease: [],
    });
  });
});

describe("compareVersions", () => {
  it("compares major versions", () => {
    expect(compareVersions("2.0.0", "1.0.0")).toBeGreaterThan(0);
    expect(compareVersions("1.0.0", "2.0.0")).toBeLessThan(0);
    expect(compareVersions("1.0.0", "1.0.0")).toBe(0);
  });

  it("compares minor versions", () => {
    expect(compareVersions("1.2.0", "1.1.0")).toBeGreaterThan(0);
    expect(compareVersions("1.1.0", "1.2.0")).toBeLessThan(0);
  });

  it("compares patch versions", () => {
    expect(compareVersions("1.0.2", "1.0.1")).toBeGreaterThan(0);
    expect(compareVersions("1.0.1", "1.0.2")).toBeLessThan(0);
  });

  it("stable releases sort higher than prereleases", () => {
    expect(compareVersions("1.0.0", "1.0.0-beta.1")).toBeGreaterThan(0);
    expect(compareVersions("1.0.0-beta.1", "1.0.0")).toBeLessThan(0);
  });

  it("compares prerelease identifiers", () => {
    expect(compareVersions("1.0.0-beta.2", "1.0.0-beta.1")).toBeGreaterThan(0);
    expect(compareVersions("1.0.0-beta.1", "1.0.0-beta.2")).toBeLessThan(0);
    expect(compareVersions("1.0.0-beta.1", "1.0.0-beta.1")).toBe(0);
  });

  it("compares different prerelease tags alphabetically", () => {
    expect(compareVersions("1.0.0-alpha", "1.0.0-beta")).toBeLessThan(0);
    expect(compareVersions("1.0.0-beta", "1.0.0-alpha")).toBeGreaterThan(0);
  });

  it("numeric prerelease parts sort lower than string parts", () => {
    expect(compareVersions("1.0.0-1", "1.0.0-alpha")).toBeLessThan(0);
    expect(compareVersions("1.0.0-alpha", "1.0.0-1")).toBeGreaterThan(0);
  });

  it("shorter prerelease sorts lower when prefix matches", () => {
    expect(compareVersions("1.0.0-beta", "1.0.0-beta.1")).toBeLessThan(0);
    expect(compareVersions("1.0.0-beta.1", "1.0.0-beta")).toBeGreaterThan(0);
  });
});

describe("selectRegistryVersionForChannel", () => {
  it("uses the latest dist-tag for the latest channel", () => {
    expect(
      selectRegistryVersionForChannel(
        {
          "dist-tags": {
            latest: "2.3.4",
            beta: "3.0.0-beta.2",
          },
        },
        "latest",
      ),
    ).toBe("2.3.4");
  });

  it("returns null when no latest dist-tag exists", () => {
    expect(
      selectRegistryVersionForChannel(
        {
          "dist-tags": {},
        },
        "latest",
      ),
    ).toBeNull();
  });

  it("prefers beta dist-tags and falls back to prereleases", () => {
    expect(
      selectRegistryVersionForChannel(
        {
          "dist-tags": {
            latest: "2.3.4",
            beta: "3.0.0-beta.2",
          },
          versions: {
            "2.3.4": {},
            "3.0.0-beta.1": {},
            "3.0.0-beta.2": {},
          },
        },
        "beta",
      ),
    ).toBe("3.0.0-beta.2");

    expect(
      selectRegistryVersionForChannel(
        {
          "dist-tags": {
            latest: "2.3.4",
          },
          versions: {
            "2.3.4": {},
            "4.0.0-next.1": {},
            "4.0.0-next.3": {},
          },
        },
        "beta",
      ),
    ).toBe("4.0.0-next.3");
  });

  it("prefers rc over canary and alpha for beta channel", () => {
    expect(
      selectRegistryVersionForChannel(
        {
          "dist-tags": {
            latest: "1.0.0",
            rc: "1.1.0-rc.1",
            canary: "1.1.0-canary.5",
            alpha: "1.1.0-alpha.10",
          },
          versions: {},
        },
        "beta",
      ),
    ).toBe("1.1.0-rc.1");
  });

  it("treats any semver prerelease identifier as a prerelease", () => {
    expect(
      selectRegistryVersionForChannel(
        {
          "dist-tags": { latest: "1.7.8" },
          versions: { "1.7.8": {}, "1.8.0-preview.1": {}, "1.8.0+build.5": {} },
        },
        "beta",
      ),
    ).toBe("1.8.0-preview.1");
  });

  it("falls back to latest when no beta/prerelease exists", () => {
    expect(
      selectRegistryVersionForChannel(
        {
          "dist-tags": {
            latest: "1.0.0",
          },
          versions: {
            "1.0.0": {},
          },
        },
        "beta",
      ),
    ).toBe("1.0.0");
  });
});

describe("applyDependencyVersionChannel", () => {
  it("excludes internal recovery snapshots from package discovery", async () => {
    const projectDir = await fs.mkdtemp(path.join(os.tmpdir(), "bfs-version-channel-recovery-"));
    const livePackagePath = path.join(projectDir, "apps", "web", "package.json");
    const recoveryPackagePath = path.join(
      projectDir,
      ".bts",
      "recovery",
      "transaction",
      "files",
      "apps",
      "web",
      "package.json",
    );
    await fs.outputJson(livePackagePath, { dependencies: { react: "^19.0.0" } });
    await fs.outputJson(recoveryPackagePath, { dependencies: { react: "^18.0.0" } });

    expect(await collectPackageJsonPaths(projectDir)).toEqual([livePackagePath]);
  });

  it("rewrites npm semver dependencies for latest and preserves range prefixes", async () => {
    const projectDir = await fs.mkdtemp(path.join(os.tmpdir(), "bfs-version-channel-"));

    await fs.writeJson(
      path.join(projectDir, "package.json"),
      {
        name: "version-channel-test",
        dependencies: {
          next: "^16.1.1",
          react: "^19.2.4",
          tailwindcss: "^4.2.1",
          "@repo/config": "workspace:*",
        },
        devDependencies: {
          typescript: "^5",
          "local-package": "file:../local-package",
        },
      },
      { spaces: 2 },
    );

    const requestedPackages: string[] = [];
    global.fetch = mock(async (input: string | URL | Request) => {
      const url = String(input);
      const packageName = decodeURIComponent(url.split("/").pop() ?? "");
      requestedPackages.push(packageName);

      const versionsByPackage: Record<string, string> = {
        next: "16.2.0",
        react: "19.3.0",
        tailwindcss: "4.3.0",
        typescript: "5.9.4",
      };

      return new Response(
        JSON.stringify({
          "dist-tags": {
            latest: versionsByPackage[packageName],
          },
          versions: {
            [versionsByPackage[packageName]!]: {},
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }) as unknown as typeof fetch;

    await applyDependencyVersionChannel(projectDir, "latest");

    const packageJson = await fs.readJson(path.join(projectDir, "package.json"));

    expect(packageJson.dependencies.next).toBe("^16.2.0");
    expect(packageJson.dependencies.react).toBe("^19.3.0");
    expect(packageJson.dependencies.tailwindcss).toBe("^4.3.0");
    expect(packageJson.dependencies["@repo/config"]).toBe("workspace:*");
    expect(packageJson.devDependencies.typescript).toBe("^5.9.4");
    expect(packageJson.devDependencies["local-package"]).toBe("file:../local-package");
    expect(requestedPackages.sort()).toEqual(["next", "react", "tailwindcss", "typescript"]);
  });

  it("keeps oRPC packages on the newest shared latest version", async () => {
    const projectDir = await fs.mkdtemp(path.join(os.tmpdir(), "bfs-version-channel-orpc-"));

    await fs.writeJson(
      path.join(projectDir, "package.json"),
      {
        name: "orpc-version-channel-test",
        workspaces: {
          catalog: {
            "@orpc/server": "^1.14.6",
            "@orpc/client": "^1.14.6",
          },
        },
        dependencies: {
          "@orpc/tanstack-query": "^1.14.6",
          react: "^19.2.4",
        },
      },
      { spaces: 2 },
    );

    global.fetch = mock(async (input: string | URL | Request) => {
      const url = String(input);
      const packageName = decodeURIComponent(url.split("/").pop() ?? "");

      const versionsByPackage: Record<string, { latest: string; versions: string[] }> = {
        "@orpc/server": { latest: "1.14.7", versions: ["1.14.6", "1.14.7"] },
        "@orpc/client": { latest: "1.14.7", versions: ["1.14.6", "1.14.7"] },
        "@orpc/tanstack-query": { latest: "1.14.6", versions: ["1.14.6"] },
        react: { latest: "19.3.0", versions: ["19.2.4", "19.3.0"] },
      };
      const packageVersions = versionsByPackage[packageName];

      return new Response(
        JSON.stringify({
          "dist-tags": {
            latest: packageVersions?.latest,
          },
          versions: Object.fromEntries(
            (packageVersions?.versions ?? []).map((version) => [version, {}]),
          ),
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }) as unknown as typeof fetch;

    await applyDependencyVersionChannel(projectDir, "latest");

    const packageJson = await fs.readJson(path.join(projectDir, "package.json"));

    expect(packageJson.workspaces.catalog["@orpc/server"]).toBe("^1.14.6");
    expect(packageJson.workspaces.catalog["@orpc/client"]).toBe("^1.14.6");
    expect(packageJson.dependencies["@orpc/tanstack-query"]).toBe("^1.14.6");
    expect(packageJson.dependencies.react).toBe("^19.3.0");
  });

  describe("Better Auth family", () => {
    // The drizzle adapter's latest and beta tags lag one publish behind, and the mongo adapter
    // cannot be fetched. better-auth requires one exact core, so any split installs two cores.
    const registry: RegistryFixture = {
      "better-auth": {
        tags: { latest: "1.7.8", beta: "1.8.0-beta.3" },
        versions: ["1.6.22", "1.7.7", "1.7.8", "1.8.0-beta.2", "1.8.0-beta.3"],
      },
      "@better-auth/core": {
        tags: { latest: "1.7.8", beta: "1.8.0-beta.3" },
        versions: ["1.6.22", "1.7.7", "1.7.8", "1.8.0-beta.2", "1.8.0-beta.3"],
      },
      "@better-auth/expo": {
        tags: { latest: "1.7.8", beta: "1.8.0-beta.3" },
        versions: ["1.6.22", "1.7.7", "1.7.8", "1.8.0-beta.2", "1.8.0-beta.3"],
      },
      "@better-auth/drizzle-adapter": {
        tags: { latest: "1.7.7", beta: "1.8.0-beta.2" },
        versions: ["1.6.22", "1.7.7", "1.8.0-beta.2"],
      },
    };

    const writeProject = async (authDependencies: Record<string, string>) => {
      const projectDir = await fs.mkdtemp(path.join(os.tmpdir(), "bfs-version-channel-ba-"));
      const manifests: Record<string, Record<string, string>> = {
        "packages/auth": authDependencies,
        "apps/web": { "better-auth": "1.6.22" },
        "apps/native": {
          "better-auth": "1.6.22",
          "@better-auth/core": "1.6.22",
          "@better-auth/expo": "1.6.22",
        },
      };
      await fs.writeJson(path.join(projectDir, "package.json"), { name: "root" });
      for (const [dir, dependencies] of Object.entries(manifests)) {
        await fs.outputJson(path.join(projectDir, dir, "package.json"), {
          name: dir,
          dependencies,
        });
      }
      return projectDir;
    };

    const readFamilyVersions = async (projectDir: string) => {
      const versions = new Set<string>();
      for (const packageJsonPath of await collectPackageJsonPaths(projectDir)) {
        const { dependencies = {} } = (await fs.readJson(packageJsonPath)) as {
          dependencies?: Record<string, string>;
        };
        for (const [name, version] of Object.entries(dependencies)) {
          if (name === "better-auth" || name.startsWith("@better-auth/")) versions.add(version);
        }
      }
      return [...versions].sort();
    };

    const generatedAuthDependencies = {
      "better-auth": "1.6.22",
      "@better-auth/core": "1.6.22",
      "@better-auth/drizzle-adapter": "1.6.22",
      "@better-auth/expo": "1.6.22",
    };

    for (const [channel, expected] of [
      ["stable", "1.6.22"],
      ["latest", "1.7.7"],
      ["beta", "1.8.0-beta.2"],
    ] as const) {
      it(`moves every package to one ${channel} release`, async () => {
        mockRegistry(registry);
        const projectDir = await writeProject(generatedAuthDependencies);

        await applyDependencyVersionChannel(projectDir, channel);

        expect(await readFamilyVersions(projectDir)).toEqual([expected]);
      });
    }

    it("moves pnpm catalog entries with the rest of the family", async () => {
      mockRegistry(registry);
      const projectDir = await writeProject({
        ...generatedAuthDependencies,
        "better-auth": "catalog:",
      });
      await fs.writeFile(
        path.join(projectDir, "pnpm-workspace.yaml"),
        "packages:\n  - apps/*\n  - packages/*\ncatalog:\n  better-auth: 1.6.22\n  zod: ^4.0.0\n",
      );

      await applyDependencyVersionChannel(projectDir, "latest");

      expect(await readFamilyVersions(projectDir)).toEqual(["1.7.7", "catalog:"]);
      expect(await fs.readFile(path.join(projectDir, "pnpm-workspace.yaml"), "utf8")).toBe(
        "packages:\n  - apps/*\n  - packages/*\ncatalog:\n  better-auth: 1.7.7\n  zod: ^4.0.0\n",
      );
    });

    // A release with a prerelease identifier the old filter did not know is not a stable release,
    // whether it is published above the latest tags or tagged latest itself.
    for (const latestTag of ["1.7.8", "1.8.0-preview.1"]) {
      it(`never moves the latest channel to a preview release (latest tag ${latestTag})`, async () => {
        const previewRelease = {
          tags: { latest: latestTag },
          versions: ["1.6.22", "1.7.8", "1.8.0-preview.1"],
        };
        mockRegistry({
          "better-auth": previewRelease,
          "@better-auth/core": previewRelease,
          "@better-auth/expo": previewRelease,
          "@better-auth/drizzle-adapter": previewRelease,
        });
        const projectDir = await writeProject(generatedAuthDependencies);

        await applyDependencyVersionChannel(projectDir, "latest");

        expect(await readFamilyVersions(projectDir)).toEqual(["1.7.8"]);
      });
    }

    it("follows the latest tags rather than a newer untagged stable release", async () => {
      mockRegistry(
        Object.fromEntries(
          Object.entries(registry).map(([name, info]) => [
            name,
            { ...info, versions: [...info.versions, "1.9.0"] },
          ]),
        ),
      );
      const projectDir = await writeProject(generatedAuthDependencies);

      await applyDependencyVersionChannel(projectDir, "latest");

      expect(await readFamilyVersions(projectDir)).toEqual(["1.7.7"]);
    });

    it("keeps an unevenly edited family together on the beta channel", async () => {
      mockRegistry(registry);
      const warn = spyOn(log, "warn");
      const projectDir = await writeProject({
        ...generatedAuthDependencies,
        "better-auth": "1.8.0-beta.3",
      });

      await applyDependencyVersionChannel(projectDir, "beta");

      expect(await readFamilyVersions(projectDir)).toEqual(["1.6.22", "1.8.0-beta.3"]);
      expect(warn).toHaveBeenCalledWith(
        "Keeping Better Auth packages on their current versions: better-auth is newer than the shared beta version 1.8.0-beta.2",
      );
    });

    it("keeps the whole family when one package cannot be resolved", async () => {
      mockRegistry(registry);
      const projectDir = await writeProject({
        ...generatedAuthDependencies,
        "@better-auth/mongo-adapter": "1.6.22",
      });

      await applyDependencyVersionChannel(projectDir, "latest");

      expect(await readFamilyVersions(projectDir)).toEqual(["1.6.22"]);
    });
  });

  it("keeps compatibility-held packages installable on the latest channel", async () => {
    const projectDir = await fs.mkdtemp(path.join(os.tmpdir(), "bfs-version-channel-holds-"));

    await fs.writeJson(
      path.join(projectDir, "package.json"),
      {
        name: "version-channel-holds-test",
        dependencies: {
          "@tanstack/react-router": "^1.169.0",
          react: "^19.2.8",
        },
        devDependencies: {
          "@tanstack/router-plugin": "~1.167.0",
        },
      },
      { spaces: 2 },
    );

    global.fetch = mock(async (input: string | URL | Request) => {
      const url = String(input);
      const packageName = decodeURIComponent(url.split("/").pop() ?? "");

      const versionsByPackage: Record<string, { latest: string; versions: string[] }> = {
        "@tanstack/react-router": {
          latest: "1.171.19",
          versions: ["1.170.41", "1.171.19"],
        },
        "@tanstack/router-plugin": {
          latest: "1.167.25",
          versions: ["1.167.25", "1.168.42"],
        },
        react: { latest: "19.3.0", versions: ["19.2.8", "19.3.0"] },
      };
      const packageVersions = versionsByPackage[packageName];

      return new Response(
        JSON.stringify({
          "dist-tags": { latest: packageVersions?.latest },
          versions: Object.fromEntries(
            (packageVersions?.versions ?? []).map((version) => [version, {}]),
          ),
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }) as unknown as typeof fetch;

    await applyDependencyVersionChannel(projectDir, "latest");

    const packageJson = await fs.readJson(path.join(projectDir, "package.json"));

    expect(packageJson.dependencies["@tanstack/react-router"]).toBe("1.170.41");
    expect(packageJson.devDependencies["@tanstack/router-plugin"]).toBe("1.168.42");
    expect(packageJson.dependencies.react).toBe("^19.3.0");
  });

  it("keeps the Auth.js v5 prerelease pin when npm latest is an older major", async () => {
    const projectDir = await fs.mkdtemp(path.join(os.tmpdir(), "bfs-version-channel-next-auth-"));

    await fs.writeJson(
      path.join(projectDir, "package.json"),
      { name: "next-auth-hold-test", dependencies: { "next-auth": "5.0.0-beta.32" } },
      { spaces: 2 },
    );

    global.fetch = mock(
      async () =>
        new Response(
          JSON.stringify({
            "dist-tags": { latest: "4.24.15", beta: "5.0.0-beta.32" },
            versions: { "4.24.15": {}, "5.0.0-beta.32": {} },
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
    ) as unknown as typeof fetch;

    await applyDependencyVersionChannel(projectDir, "latest");

    const packageJson = await fs.readJson(path.join(projectDir, "package.json"));
    expect(packageJson.dependencies["next-auth"]).toBe("5.0.0-beta.32");
  });

  it("keeps template-pinned Redwood React peers on the latest channel", async () => {
    const projectDir = await fs.mkdtemp(path.join(os.tmpdir(), "bfs-version-channel-redwood-"));

    await fs.outputJson(
      path.join(projectDir, "web", "package.json"),
      {
        name: "web",
        dependencies: {
          "@redwoodjs/web": "^8.9.0",
          react: "18.3.1",
          "react-dom": "18.3.1",
        },
        devDependencies: {
          "@types/react": "^18.2.55",
        },
      },
      { spaces: 2 },
    );
    await fs.outputJson(
      path.join(projectDir, "api", "package.json"),
      { name: "api", dependencies: { react: "^18.3.1" } },
      { spaces: 2 },
    );

    global.fetch = mock(async (input: string | URL | Request) => {
      const packageName = decodeURIComponent(String(input).split("/").pop() ?? "");
      const latestByPackage: Record<string, string> = {
        "@redwoodjs/web": "8.9.0",
        react: "19.3.0",
        "react-dom": "19.3.0",
        "@types/react": "19.2.18",
      };
      const latest = latestByPackage[packageName];

      return new Response(
        JSON.stringify({ "dist-tags": { latest }, versions: latest ? { [latest]: {} } : {} }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }) as unknown as typeof fetch;

    await applyDependencyVersionChannel(projectDir, "latest");

    const webPackageJson = await fs.readJson(path.join(projectDir, "web", "package.json"));
    const apiPackageJson = await fs.readJson(path.join(projectDir, "api", "package.json"));

    expect(webPackageJson.dependencies).toMatchObject({
      "@redwoodjs/web": "^8.9.0",
      react: "18.3.1",
      "react-dom": "18.3.1",
    });
    expect(webPackageJson.devDependencies["@types/react"]).toBe("^18.2.55");
    expect(apiPackageJson.dependencies.react).toBe("^19.3.0");
  });

  it("does not downgrade stable dependencies to older prereleases for beta channel", async () => {
    const projectDir = await fs.mkdtemp(path.join(os.tmpdir(), "bfs-version-channel-beta-floor-"));

    await fs.writeJson(
      path.join(projectDir, "package.json"),
      {
        name: "beta-floor-test",
        devDependencies: {
          turbo: "2.10.11",
          vite: "^7.2.0",
        },
      },
      { spaces: 2 },
    );

    global.fetch = mock(async (input: string | URL | Request) => {
      const url = String(input);
      const packageName = decodeURIComponent(url.split("/").pop() ?? "");

      const versionsByPackage: Record<
        string,
        { latest: string; versions: string[]; tags?: Record<string, string> }
      > = {
        turbo: {
          latest: "2.10.0",
          versions: ["0.9.0-next.22", "2.10.0"],
          tags: { next: "0.9.0-next.22" },
        },
        vite: {
          latest: "7.2.0",
          versions: ["7.2.0", "8.0.0-beta.1"],
          tags: { beta: "8.0.0-beta.1" },
        },
      };
      const packageVersions = versionsByPackage[packageName];

      return new Response(
        JSON.stringify({
          "dist-tags": {
            latest: packageVersions?.latest,
            ...packageVersions?.tags,
          },
          versions: Object.fromEntries(
            (packageVersions?.versions ?? []).map((version) => [version, {}]),
          ),
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    }) as unknown as typeof fetch;

    await applyDependencyVersionChannel(projectDir, "beta");

    const packageJson = await fs.readJson(path.join(projectDir, "package.json"));

    expect(packageJson.devDependencies.turbo).toBe("2.10.11");
    expect(packageJson.devDependencies.vite).toBe("^8.0.0-beta.1");
  });

  it(
    "resolves latest channel from real npm registry",
    async () => {
      const projectDir = await fs.mkdtemp(path.join(os.tmpdir(), "bfs-version-channel-real-"));

      await fs.writeJson(
        path.join(projectDir, "package.json"),
        {
          name: "real-registry-test",
          dependencies: {
            "tiny-tarball": "^1.0.0",
          },
        },
        { spaces: 2 },
      );

      await applyDependencyVersionChannel(projectDir, "latest");

      const packageJson = await fs.readJson(path.join(projectDir, "package.json"));
      expect(packageJson.dependencies["tiny-tarball"]).toMatch(/^\^1\.\d+\.\d+$/);
    },
    { timeout: 20_000 },
  );

  it("skips stable channel without making any fetch calls", async () => {
    const projectDir = await fs.mkdtemp(path.join(os.tmpdir(), "bfs-version-channel-stable-"));

    await fs.writeJson(
      path.join(projectDir, "package.json"),
      {
        name: "stable-test",
        dependencies: { react: "^18.0.0" },
      },
      { spaces: 2 },
    );

    const fetchSpy = mock(() => {
      throw new Error("fetch should not be called for stable channel");
    });
    global.fetch = fetchSpy as unknown as typeof fetch;

    await applyDependencyVersionChannel(projectDir, "stable");

    expect(fetchSpy).not.toHaveBeenCalled();

    const packageJson = await fs.readJson(path.join(projectDir, "package.json"));
    expect(packageJson.dependencies.react).toBe("^18.0.0");
  });
});

describe("version channel lifecycle round trips", () => {
  // Every package resolves to one newer release, so each rewritten entry is easy to spot.
  const newerRelease = { tags: { latest: "99.0.0" }, versions: ["99.0.0"] };
  const projectDirs: string[] = [];

  afterAll(async () => {
    await Promise.all(projectDirs.map((projectDir) => fs.remove(projectDir)));
  });

  const createProject = async (projectName: string, config: Partial<TestConfig>) => {
    const result = await runTRPCTest({
      projectName,
      backend: "hono",
      runtime: "node",
      api: "orpc",
      database: "none",
      orm: "none",
      auth: "none",
      examples: ["none"],
      dbSetup: "none",
      webDeploy: "none",
      serverDeploy: "none",
      versionChannel: "latest",
      install: false,
      ...config,
    });
    expect(result.success, result.error).toBe(true);
    projectDirs.push(result.projectDir!);
    return result.projectDir!;
  };

  const readCatalog = async (projectDir: string) =>
    (
      parseYaml(await fs.readFile(path.join(projectDir, "pnpm-workspace.yaml"), "utf8")) as {
        catalog: Record<string, string>;
      }
    ).catalog;

  describe("pnpm workspace catalog rewritten at creation", () => {
    const createPnpmProject = async (projectName: string) => {
      mockRegistry({}, newerRelease);
      const projectDir = await createProject(projectName, {
        frontend: ["react-vite"],
        packageManager: "pnpm",
      });
      const catalog = await readCatalog(projectDir);
      expect(catalog["@orpc/server"]).toBe("^99.0.0");
      expect(catalog["@orpc/client"]).toBe("^99.0.0");
      return { projectDir, catalog };
    };

    it("lets add plan and apply without treating the catalog as a local edit", async () => {
      const { projectDir, catalog } = await createPnpmProject("version-channel-pnpm-add");

      const plan = await planStackUpdate(
        projectDir,
        { stateManagement: "zustand" },
        { includeVersionChannelPaths: true },
      );
      expect(plan.success).toBe(true);
      if (!plan.success) return;
      expect(plan.manualReviewBlockers).toEqual([]);

      const result = await applyStackUpdate(
        projectDir,
        { stateManagement: "zustand" },
        { operation: "add", applyVersionChannel: true },
      );
      expect(result.success, result.success ? undefined : result.error).toBe(true);
      expect(await readCatalog(projectDir)).toEqual(catalog);
    }, 120_000);

    it("keeps the catalog on the channel versions through update plan and apply", async () => {
      const { projectDir, catalog } = await createPnpmProject("version-channel-pnpm-update");

      const plan = await planScaffoldUpgrade(projectDir);
      expect(plan.success).toBe(true);
      if (!plan.success) return;
      expect(plan.files.find((file) => file.path === "pnpm-workspace.yaml")?.category).toBe(
        "user-edited",
      );
      expect(plan.actionable).not.toContain("pnpm-workspace.yaml");

      const result = await applyScaffoldUpgrade(projectDir);
      expect(result.success, result.success ? undefined : result.error).toBe(true);
      expect(await readCatalog(projectDir)).toEqual(catalog);
    }, 120_000);
  });

  describe("template update adding @better-auth/core", () => {
    const authStack: Partial<TestConfig> = {
      frontend: ["tanstack-router"],
      database: "sqlite",
      orm: "drizzle",
      auth: "better-auth",
      packageManager: "npm",
    };
    const authManifestPath = "packages/auth/package.json";

    // Projects generated before @better-auth/core was declared have neither the dependency nor
    // its baseline entry; the template update is what adds it.
    const simulateEarlierTemplate = async (projectDir: string, familyVersion?: string) => {
      const rewrite = (content: string) => {
        const manifest = JSON.parse(content) as { dependencies?: Record<string, string> };
        const dependencies = manifest.dependencies ?? {};
        delete dependencies["@better-auth/core"];
        for (const name of Object.keys(dependencies)) {
          if (familyVersion && (name === "better-auth" || name.startsWith("@better-auth/"))) {
            dependencies[name] = familyVersion;
          }
        }
        return `${JSON.stringify(manifest, null, 2)}\n`;
      };
      const manifest = (await readScaffoldManifest(projectDir))!;
      for (const manifestPath of await collectPackageJsonPaths(projectDir)) {
        const relativePath = path.relative(projectDir, manifestPath).split(path.sep).join("/");
        const diskContent = rewrite(await fs.readFile(manifestPath, "utf8"));
        await fs.writeFile(manifestPath, diskContent);
        manifest.hashes[relativePath] = hashContent(Buffer.from(diskContent));
        const baseline = manifest.baselines?.[relativePath];
        if (baseline !== undefined) manifest.baselines![relativePath] = rewrite(baseline);
      }
      await writeScaffoldManifest(projectDir, manifest);
    };

    const updateAndReadAuthDependencies = async (projectDir: string, coreVersion: string) => {
      const plan = await planScaffoldUpgrade(projectDir);
      expect(plan.success).toBe(true);
      if (!plan.success) return {};
      expect(
        plan.files.find((file) => file.path === authManifestPath)?.dependencyChanges,
      ).toContainEqual(
        expect.objectContaining({ name: "@better-auth/core", version: coreVersion }),
      );

      const result = await applyScaffoldUpgrade(projectDir);
      expect(result.success, result.success ? undefined : result.error).toBe(true);
      return (
        (await fs.readJson(path.join(projectDir, authManifestPath))) as {
          dependencies: Record<string, string>;
        }
      ).dependencies;
    };

    it("adds it at the release a family ahead of the template already uses", async () => {
      const familyRelease = { tags: { latest: "1.7.7" }, versions: ["1.6.22", "1.7.7"] };
      mockRegistry(
        {
          "better-auth": familyRelease,
          "@better-auth/core": familyRelease,
          "@better-auth/drizzle-adapter": familyRelease,
        },
        newerRelease,
      );
      const projectDir = await createProject("version-channel-family-ahead", authStack);
      await simulateEarlierTemplate(projectDir);

      expect(await updateAndReadAuthDependencies(projectDir, "1.7.7")).toMatchObject({
        "better-auth": "1.7.7",
        "@better-auth/core": "1.7.7",
        "@better-auth/drizzle-adapter": "1.7.7",
      });
    }, 120_000);

    it("adds it at the template release when the family follows the template", async () => {
      const projectDir = await createProject("version-channel-family-template", {
        ...authStack,
        versionChannel: "stable",
      });
      await simulateEarlierTemplate(projectDir, "1.6.20");

      expect(await updateAndReadAuthDependencies(projectDir, "1.6.22")).toMatchObject({
        "better-auth": "1.6.22",
        "@better-auth/core": "1.6.22",
        "@better-auth/drizzle-adapter": "1.6.22",
      });
    }, 120_000);
  });
});

/** A registry offering a newer major on latest and a newer prerelease on beta for every package. */
function mockRegistryAheadOfEveryPackage() {
  global.fetch = mock(async (input: string | URL | Request) => {
    const packageName = decodeURIComponent(String(input).split("/").pop() ?? "");
    const ahead = `${100 + packageName.length}.0.0`;
    const beta = `${200 + packageName.length}.0.0-beta.1`;
    return new Response(
      JSON.stringify({
        "dist-tags": { latest: ahead, beta },
        versions: { [ahead]: {}, [beta]: {} },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  }) as unknown as typeof fetch;
}

describe("planDependencyVersionChannel for generated native apps", () => {
  const nativeStacks = [
    { frontend: "native-bare", mobileUI: "gluestack-ui", mobileNavigation: "expo-router" },
    { frontend: "native-bare", mobileUI: "tamagui", mobileNavigation: "react-navigation" },
    { frontend: "native-uniwind", mobileUI: "uniwind", mobileNavigation: "expo-router" },
    { frontend: "native-unistyles", mobileUI: "unistyles", mobileNavigation: "expo-router" },
  ] as const;

  /** Generated native dependencies that no Expo or React Native release constrains. */
  const uncoupledPackages = new Set([
    "@tanstack/react-form",
    "@tanstack/react-query",
    "@types/node",
    "ajv",
    "dotenv",
    "zod",
  ]);

  for (const stack of nativeStacks) {
    it(`moves only uncoupled packages for ${stack.frontend} with ${stack.mobileUI} in every channel`, async () => {
      const result = await createVirtual({
        projectName: "native-channels",
        ecosystem: "react-native",
        frontend: [stack.frontend],
        backend: "none",
        runtime: "none",
        database: "none",
        orm: "none",
        api: "none",
        auth: "none",
        mobileUI: stack.mobileUI,
        mobileNavigation: stack.mobileNavigation,
        mobileStorage: "mmkv",
        mobileTesting: "react-native-testing-library",
        mobilePush: "expo-notifications",
        mobileOTA: "expo-updates",
        mobileDeepLinking: "expo-linking",
        mobileLibraries: MobileLibrariesSchema.options.filter((library) => library !== "none"),
        packageManager: "npm",
      });
      expect(result.success).toBe(true);
      const nativeContent = getFile(result.tree!.root, "apps/native/package.json");
      const generated = JSON.parse(nativeContent) as {
        dependencies: Record<string, string>;
        devDependencies: Record<string, string>;
      };
      const declared: Record<string, string> = {
        ...generated.dependencies,
        ...generated.devDependencies,
      };
      const registryPackages = Object.keys(declared)
        .filter((name) => /^[~^]?\d/.test(declared[name]!))
        .sort();
      const uncoupled = registryPackages.filter((name) => uncoupledPackages.has(name));
      expect(registryPackages).toEqual(expect.arrayContaining(["babel-preset-expo", "typescript"]));
      expect(uncoupled.length).toBeGreaterThan(0);

      const projectDir = await fs.mkdtemp(path.join(os.tmpdir(), "bfs-version-channel-native-"));
      const nativePackageJsonPath = path.join(projectDir, "apps", "native", "package.json");
      mockRegistryAheadOfEveryPackage();

      for (const channel of ["stable", "latest", "beta"] as const) {
        // oxlint-disable-next-line no-await-in-loop -- channels share one mocked registry
        const rewrites = await planDependencyVersionChannel(
          projectDir,
          channel,
          new Map([[nativePackageJsonPath, nativeContent]]),
        );
        const rewrite = rewrites.find(
          ({ packageJsonPath }) => packageJsonPath === nativePackageJsonPath,
        );
        const planned = JSON.parse(rewrite?.content ?? nativeContent) as typeof generated;
        const plannedVersions = { ...planned.dependencies, ...planned.devDependencies };
        const moved = registryPackages.filter((name) => plannedVersions[name] !== declared[name]);
        expect({ channel, moved }).toEqual({
          channel,
          moved: channel === "stable" ? [] : uncoupled,
        });
      }
    });
  }
});
