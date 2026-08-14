import { afterEach, describe, expect, it, mock } from "bun:test";
import fs from "fs-extra";
import os from "node:os";
import path from "node:path";

import {
  applyDependencyVersionChannel,
  collectPackageJsonPaths,
  compareVersions,
  parseVersion,
  selectRegistryVersionForChannel,
} from "../src/utils/dependency-version-channel";

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  mock.restore();
});

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
          versions: ["1.170.18", "1.171.19"],
        },
        "@tanstack/router-plugin": {
          latest: "1.167.25",
          versions: ["1.167.25", "1.168.23"],
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

    expect(packageJson.dependencies["@tanstack/react-router"]).toBe("1.170.18");
    expect(packageJson.devDependencies["@tanstack/router-plugin"]).toBe("1.168.23");
    expect(packageJson.dependencies.react).toBe("^19.3.0");
  });

  it("does not downgrade stable dependencies to older prereleases for beta channel", async () => {
    const projectDir = await fs.mkdtemp(path.join(os.tmpdir(), "bfs-version-channel-beta-floor-"));

    await fs.writeJson(
      path.join(projectDir, "package.json"),
      {
        name: "beta-floor-test",
        devDependencies: {
          turbo: "^2.10.0",
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

    expect(packageJson.devDependencies.turbo).toBe("^2.10.0");
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
