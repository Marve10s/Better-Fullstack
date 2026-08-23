import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { qualifyPreviousRelease } from "./qualify-previous-release";
import { RELEASE_TOOLCHAINS, type CommandRunner, type ReleaseManifest } from "./release-state";

async function targetManifest(root: string): Promise<string> {
  await mkdir(join(root, "packages"));
  const bytes = Buffer.from("cli");
  await writeFile(join(root, "packages/cli.tgz"), bytes);
  const manifest: ReleaseManifest = {
    packages: [
      {
        directory: "apps/cli",
        filename: "packages/cli.tgz",
        integrity: `sha512-${createHash("sha512").update(bytes).digest("base64")}`,
        name: "create-better-fullstack",
        sha256: createHash("sha256").update(bytes).digest("hex"),
        shasum: createHash("sha1").update(bytes).digest("hex"),
        version: "3.0.0",
      },
    ],
    releaseVersion: "3.0.0",
    schemaVersion: 1,
    sourceSha: "b".repeat(40),
    toolchains: RELEASE_TOOLCHAINS,
  };
  const path = join(root, "release-manifest.json");
  await writeFile(path, JSON.stringify(manifest));
  return path;
}

describe("previous release qualification discovery", () => {
  test("records an explicit qualification wait state before the first fixture-bearing release", async () => {
    const root = await mkdtemp(join(tmpdir(), "bfs-qualification-wait-"));
    try {
      const manifestPath = await targetManifest(root);
      const runner: CommandRunner = async () => ({
        exitCode: 0,
        stderr: "",
        stdout: JSON.stringify({ assets: [], tag_name: "v2.6.1" }),
      });
      const outputPath = join(root, "qualification.json");
      const report = await qualifyPreviousRelease({
        outputPath,
        repository: "Marve10s/Better-Fullstack",
        runner,
        targetManifestPath: manifestPath,
      });
      expect(report).toMatchObject({
        status: "awaiting-prior-fixture",
        reasonCode: "prior-release-has-no-executable-fixture",
        target: { version: "3.0.0" },
      });
      expect(JSON.parse(await readFile(outputPath, "utf8"))).toEqual(report);
    } finally {
      await rm(root, { force: true, recursive: true });
    }
  });

  test("fails closed when the previous release exposes only half of the evidence set", async () => {
    const root = await mkdtemp(join(tmpdir(), "bfs-qualification-partial-"));
    try {
      const manifestPath = await targetManifest(root);
      const runner: CommandRunner = async () => ({
        exitCode: 0,
        stderr: "",
        stdout: JSON.stringify({
          assets: [{ name: "upgrade-fixture.v1.json", url: "https://api.example/asset" }],
          tag_name: "v2.7.0",
        }),
      });
      await expect(
        qualifyPreviousRelease({
          outputPath: join(root, "qualification.json"),
          repository: "Marve10s/Better-Fullstack",
          runner,
          targetManifestPath: manifestPath,
        }),
      ).rejects.toThrow("partial executable-fixture evidence set");
    } finally {
      await rm(root, { force: true, recursive: true });
    }
  });
});
