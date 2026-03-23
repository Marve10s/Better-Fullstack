import { afterEach, describe, expect, it, mock } from "bun:test";
import fs from "fs-extra";
import os from "node:os";
import path from "node:path";

import {
  applyDependencyVersionChannel,
  selectRegistryVersionForChannel,
} from "../src/utils/dependency-version-channel";

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  mock.restore();
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
});

describe("applyDependencyVersionChannel", () => {
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
    }) as typeof fetch;

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
});
