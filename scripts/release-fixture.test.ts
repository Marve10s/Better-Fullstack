import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { chmod, mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { GENERATED_PROJECT_PROOF_CASES } from "../testing/lib/generated-project-proof-matrix";
import {
  createUpgradeFixtureBundle,
  loadAndVerifyUpgradeFixtureBundle,
  materializeUpgradeFixtureBundle,
  REQUIRED_UPGRADE_FIXTURE_CASE_IDS,
  UPGRADE_FIXTURE_TYPE,
  validateUpgradeFixtureBundle,
  type FixtureProjectInput,
  type UpgradeFixtureBundle,
} from "./release-fixture";
import { RELEASE_TOOLCHAINS, type ReleaseManifest, type ReleasePackage } from "./release-state";

const SHA = "a".repeat(40);
const VERSION = "3.0.0";

function digests(bytes: Uint8Array) {
  return {
    integrity: `sha512-${createHash("sha512").update(bytes).digest("base64")}`,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    shasum: createHash("sha1").update(bytes).digest("hex"),
  };
}

async function fixtureRoot() {
  const root = await mkdtemp(join(tmpdir(), "bfs-release-fixture-test-"));
  const artifactDirectory = join(root, "artifacts");
  await mkdir(join(artifactDirectory, "packages"), { recursive: true });
  const packageDefinitions = [
    ["@better-fullstack/types", "types"],
    ["@better-fullstack/template-generator", "generator"],
    ["create-better-fullstack", "cli"],
  ] as const;
  const packages: ReleasePackage[] = [];
  for (const [name, marker] of packageDefinitions) {
    const bytes = Buffer.from(marker);
    const filename = `packages/${marker}.tgz`;
    await writeFile(join(artifactDirectory, filename), bytes);
    packages.push({
      directory: marker,
      filename,
      name,
      version: VERSION,
      ...digests(bytes),
    });
  }
  const manifest: ReleaseManifest = {
    packages,
    releaseVersion: VERSION,
    schemaVersion: 1,
    sourceSha: SHA,
    toolchains: RELEASE_TOOLCHAINS,
  };
  const manifestPath = join(artifactDirectory, "release-manifest.json");
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  const projects: FixtureProjectInput[] = [];
  for (const entry of GENERATED_PROJECT_PROOF_CASES) {
    const projectDir = join(root, "projects", entry.id);
    await mkdir(join(projectDir, "src"), { recursive: true });
    const lifecycle = {
      cli: VERSION,
      generator: VERSION,
      templateSet: VERSION,
      schema: "1",
    };
    await writeFile(
      join(projectDir, "bts.jsonc"),
      `${JSON.stringify({ version: VERSION, ecosystem: entry.ecosystem }, null, 2)}\n`,
    );
    await writeFile(
      join(projectDir, "bts.lock.json"),
      `${JSON.stringify(
        {
          version: "2",
          createdAt: "2026-08-23T12:00:00.000Z",
          updatedAt: "2026-08-23T12:00:00.000Z",
          provenance: { state: "verified", createdWith: lifecycle, current: lifecycle },
          history: [],
          hashes: {},
        },
        null,
        2,
      )}\n`,
    );
    await writeFile(join(projectDir, "src", "fixture.txt"), `${entry.id}\n`);
    await chmod(join(projectDir, "src", "fixture.txt"), 0o744);
    projects.push({
      command: [`create-better-fullstack@${VERSION}`, entry.projectName],
      ecosystem: entry.ecosystem,
      id: entry.id,
      projectDir,
      projectName: entry.projectName,
      stackParts: [...entry.stackParts],
    });
  }
  return { artifactDirectory, manifest, manifestPath, projects, root };
}

describe("executable release fixtures", () => {
  test("captures, validates, and materializes all eight exact project byte sets", async () => {
    const fixture = await fixtureRoot();
    try {
      const outputPath = join(fixture.artifactDirectory, "upgrade-fixture.v1.json");
      const created = await createUpgradeFixtureBundle({
        manifestPath: fixture.manifestPath,
        outputPath,
        projects: fixture.projects,
      });
      expect(created.fixtureType).toBe(UPGRADE_FIXTURE_TYPE);
      expect(created.cases.map((entry) => entry.id)).toEqual([
        ...REQUIRED_UPGRADE_FIXTURE_CASE_IDS,
      ]);
      expect(created.release.packages).toHaveLength(fixture.manifest.packages.length);

      const loaded = await loadAndVerifyUpgradeFixtureBundle(outputPath, fixture.manifest);
      const materializedRoot = join(fixture.root, "materialized");
      const projects = await materializeUpgradeFixtureBundle(loaded, materializedRoot);
      expect(projects).toHaveLength(REQUIRED_UPGRADE_FIXTURE_CASE_IDS.length);
      expect(await readFile(join(materializedRoot, "go/src/fixture.txt"), "utf8")).toBe("go\n");
      expect((await stat(join(materializedRoot, "go/src/fixture.txt"))).mode & 0o7777).toBe(0o744);
    } finally {
      await rm(fixture.root, { force: true, recursive: true });
    }
  });

  test("fails closed for altered bytes, missing cases, unsafe paths, and package drift", async () => {
    const fixture = await fixtureRoot();
    try {
      const outputPath = join(fixture.artifactDirectory, "upgrade-fixture.v1.json");
      const original = await createUpgradeFixtureBundle({
        manifestPath: fixture.manifestPath,
        outputPath,
        projects: fixture.projects,
      });
      const mutations: Array<(bundle: UpgradeFixtureBundle) => void> = [
        (bundle) => {
          bundle.cases[0]!.files[0]!.contentBase64 = Buffer.from("altered").toString("base64");
        },
        (bundle) => {
          bundle.cases.pop();
        },
        (bundle) => {
          bundle.cases[0]!.files[0]!.path = "../escape";
        },
        (bundle) => {
          bundle.release.packages[0]!.sha256 = "0".repeat(64);
        },
      ];
      for (const mutate of mutations) {
        const bundle = structuredClone(original);
        mutate(bundle);
        expect(() => validateUpgradeFixtureBundle(bundle, fixture.manifest)).toThrow();
      }
    } finally {
      await rm(fixture.root, { force: true, recursive: true });
    }
  });

  test("stays aligned with the canonical generated-project ecosystem matrix", () => {
    expect(GENERATED_PROJECT_PROOF_CASES.map((entry) => entry.id)).toEqual([
      ...REQUIRED_UPGRADE_FIXTURE_CASE_IDS,
    ]);
    expect(new Set(GENERATED_PROJECT_PROOF_CASES.map((entry) => entry.ecosystem)).size).toBe(8);
  });
});
