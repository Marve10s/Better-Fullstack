import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";

import {
  CROSS_VERSION_UPGRADE_EVIDENCE_TYPE,
  runCrossVersionUpgradeQualification,
} from "@scripts/release/cross-version-upgrade";
import {
  REQUIRED_UPGRADE_FIXTURE_CASE_IDS,
  UPGRADE_FIXTURE_TYPE,
  validateUpgradeFixtureBundle,
  type UpgradeFixtureBundle,
  type UpgradeFixtureFile,
} from "@scripts/release/release-fixture";
import { RELEASE_TOOLCHAINS, type ReleaseManifest, type ReleasePackage } from "@scripts/release/release-state";

const SOURCE_VERSION = "2.0.0";
const SOURCE_SHA = "a".repeat(40);
const TARGET_VERSION = "3.0.0";
const TARGET_SHA = "b".repeat(40);

function digest(bytes: Uint8Array, algorithm: "sha1" | "sha256" | "sha512") {
  return createHash(algorithm)
    .update(bytes)
    .digest(algorithm === "sha512" ? "base64" : "hex");
}

function fixtureFile(path: string, content: string): UpgradeFixtureFile {
  const bytes = Buffer.from(content);
  return {
    contentBase64: bytes.toString("base64"),
    mode: 0o644,
    path,
    sha256: digest(bytes, "sha256"),
  };
}

function sourceBundle(createdAt: string): UpgradeFixtureBundle {
  const lifecycle = {
    cli: SOURCE_VERSION,
    generator: SOURCE_VERSION,
    schema: "1",
    templateSet: SOURCE_VERSION,
  };
  const packageProvenance = [
    {
      integrity: `sha512-${Buffer.from("generator").toString("base64")}`,
      name: "@better-fullstack/template-generator",
      sha256: "1".repeat(64),
      version: SOURCE_VERSION,
    },
    {
      integrity: `sha512-${Buffer.from("cli").toString("base64")}`,
      name: "create-better-fullstack",
      sha256: "2".repeat(64),
      version: SOURCE_VERSION,
    },
  ];
  return validateUpgradeFixtureBundle({
    cases: REQUIRED_UPGRADE_FIXTURE_CASE_IDS.map((id) => {
      const user = fixtureFile("a-user.ts", `export const source = "${id}";\n`);
      const managed = fixtureFile("z-managed.ts", `export const generated = "old-${id}";\n`);
      const config = fixtureFile(
        "bts.jsonc",
        `${JSON.stringify({ version: SOURCE_VERSION, ecosystem: id })}\n`,
      );
      const manifest = fixtureFile(
        "bts.lock.json",
        `${JSON.stringify({
          version: "2",
          provenance: { state: "verified", createdWith: lifecycle, current: lifecycle },
          history: [],
          hashes: { "a-user.ts": user.sha256, "z-managed.ts": managed.sha256 },
        })}\n`,
      );
      return {
        command: [`create-better-fullstack@${SOURCE_VERSION}`, `fixture-${id}`],
        configSha256: config.sha256,
        ecosystem: id,
        files: [user, config, manifest, managed].sort((left, right) =>
          left.path.localeCompare(right.path),
        ),
        id,
        lifecycle,
        manifestSha256: manifest.sha256,
        projectName: `fixture-${id}`,
        stackParts: [`backend:${id}:fixture`],
      };
    }),
    createdAt,
    fixtureType: UPGRADE_FIXTURE_TYPE,
    release: { packages: packageProvenance, sourceSha: SOURCE_SHA, version: SOURCE_VERSION },
    schemaVersion: 1,
  });
}

const FAKE_CLI = `
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const args = process.argv.slice(2);
const action = args[0];
const projectDir = action === "recovery" ? args[args.indexOf("--project-dir") + 1] : args[1];
const token = "c".repeat(64);
const recoveryId = "123e4567-e89b-42d3-a456-426614174000";

if (action === "update" && !args.includes("--apply")) {
  console.log(JSON.stringify({
    ok: true,
    actionable: ["z-managed.ts"],
    conflicts: [],
    manual: [],
    reviewToken: token,
    summary: { drift: 1, userEdited: 1 },
    userEdited: ["a-user.ts"],
    lifecycle: {
      provenance: {
        source: { cli: "${SOURCE_VERSION}" },
        target: { cli: "${TARGET_VERSION}" },
        verified: true,
      },
    },
  }));
} else if (action === "update") {
  const recoveryDir = join(projectDir, ".bts", "recovery", recoveryId);
  await mkdir(recoveryDir, { recursive: true });
  await writeFile(join(recoveryDir, "z-managed.ts"), await readFile(join(projectDir, "z-managed.ts")));
  await writeFile(join(projectDir, "z-managed.ts"), "export const generated = \\"target\\";\\n");
  console.log(JSON.stringify({ ok: true, recoveryId }));
} else if (action === "recovery" && args[1] === "apply") {
  const recoveryDir = join(projectDir, ".bts", "recovery", recoveryId);
  await writeFile(join(projectDir, "z-managed.ts"), await readFile(join(recoveryDir, "z-managed.ts")));
  console.log(JSON.stringify({ ok: true }));
} else {
  console.error("unsupported fake CLI command");
  process.exit(1);
}
`;

async function packPackage(
  root: string,
  artifactDirectory: string,
  name: string,
  files: Record<string, string>,
): Promise<ReleasePackage> {
  const packageRoot = join(root, name.replaceAll("/", "-").replace("@", ""));
  await mkdir(packageRoot, { recursive: true });
  const packageJson = {
    name,
    version: TARGET_VERSION,
    type: "module",
    ...(name === "create-better-fullstack"
      ? { bin: { "create-better-fullstack": "dist/cli.mjs" } }
      : {}),
  };
  await writeFile(join(packageRoot, "package.json"), `${JSON.stringify(packageJson)}\n`);
  for (const [path, content] of Object.entries(files)) {
    const target = join(packageRoot, path);
    await mkdir(join(target, ".."), { recursive: true });
    await writeFile(target, content);
  }
  const subprocess = Bun.spawn(
    ["npm", "pack", "--ignore-scripts", "--json", "--pack-destination", artifactDirectory],
    { cwd: packageRoot, stderr: "pipe", stdout: "pipe" },
  );
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(subprocess.stdout).text(),
    new Response(subprocess.stderr).text(),
    subprocess.exited,
  ]);
  if (exitCode !== 0) throw new Error(stderr || stdout);
  const packed = JSON.parse(stdout) as Array<{ filename: string }>;
  const filename = packed[0]?.filename;
  if (!filename) throw new Error("npm pack returned no filename");
  const bytes = await readFile(join(artifactDirectory, basename(filename)));
  return {
    directory: name,
    filename: basename(filename),
    integrity: `sha512-${digest(bytes, "sha512")}`,
    name,
    sha256: digest(bytes, "sha256"),
    shasum: digest(bytes, "sha1"),
    version: TARGET_VERSION,
  };
}

async function targetManifest(root: string): Promise<{ manifest: ReleaseManifest; path: string }> {
  const artifactDirectory = join(root, "target-artifacts");
  await mkdir(artifactDirectory);
  const packages = [
    await packPackage(root, artifactDirectory, "@better-fullstack/template-generator", {}),
    await packPackage(root, artifactDirectory, "create-better-fullstack", {
      "dist/cli.mjs": FAKE_CLI,
    }),
  ];
  const manifest: ReleaseManifest = {
    packages,
    releaseVersion: TARGET_VERSION,
    schemaVersion: 1,
    sourceSha: TARGET_SHA,
    toolchains: RELEASE_TOOLCHAINS,
  };
  const path = join(artifactDirectory, "release-manifest.json");
  await writeFile(path, `${JSON.stringify(manifest, null, 2)}\n`);
  return { manifest, path };
}

describe("cross-version upgrade qualification", () => {
  test("uses a receipt-bound source fixture and exact target package to prove recovery", async () => {
    const root = await mkdtemp(join(tmpdir(), "bfs-cross-version-test-"));
    try {
      const bundle = sourceBundle(new Date(Date.now() - 60_000).toISOString());
      const fixturePath = join(root, "upgrade-fixture.v1.json");
      const fixtureBytes = Buffer.from(`${JSON.stringify(bundle, null, 2)}\n`);
      await writeFile(fixturePath, fixtureBytes);
      const receipt = {
        receiptType: "better-fullstack/release-verification",
        release: { version: SOURCE_VERSION },
        requiredCi: { conclusion: "success", headSha: SOURCE_SHA },
        upgradeFixture: {
          caseIds: [...REQUIRED_UPGRADE_FIXTURE_CASE_IDS],
          fixtureType: UPGRADE_FIXTURE_TYPE,
          releaseVersion: SOURCE_VERSION,
          sha256: digest(fixtureBytes, "sha256"),
          sourceSha: SOURCE_SHA,
        },
      };
      const receiptPath = join(root, "verification-receipt.v1.json");
      await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
      const target = await targetManifest(root);
      const outputPath = join(root, "cross-version-report.json");

      const report = await runCrossVersionUpgradeQualification({
        outputPath,
        sourceFixturePath: fixturePath,
        sourceReceiptPath: receiptPath,
        targetManifestPath: target.path,
        verifyBuilds: false,
      });

      expect(report.evidenceType).toBe(CROSS_VERSION_UPGRADE_EVIDENCE_TYPE);
      expect(report.overallSuccess).toBe(true);
      expect(report.recoveredCaseCount).toBe(8);
      expect(report.cases.every((entry) => entry.userEdit?.protectedAs === "user-edited")).toBe(
        true,
      );
      expect(report.cases.every((entry) => entry.build.verified === false)).toBe(true);
      expect(JSON.parse(await readFile(outputPath, "utf8"))).toEqual(report);
    } finally {
      await rm(root, { force: true, recursive: true });
    }
  }, 30_000);

  test("rejects a source fixture not bound to the release receipt", async () => {
    const root = await mkdtemp(join(tmpdir(), "bfs-cross-version-receipt-test-"));
    try {
      const bundle = sourceBundle(new Date().toISOString());
      const fixturePath = join(root, "upgrade-fixture.v1.json");
      await writeFile(fixturePath, `${JSON.stringify(bundle)}\n`);
      const receiptPath = join(root, "verification-receipt.v1.json");
      await writeFile(
        receiptPath,
        JSON.stringify({
          receiptType: "better-fullstack/release-verification",
          release: { version: SOURCE_VERSION },
          requiredCi: { conclusion: "success", headSha: SOURCE_SHA },
          upgradeFixture: {
            caseIds: [...REQUIRED_UPGRADE_FIXTURE_CASE_IDS],
            fixtureType: UPGRADE_FIXTURE_TYPE,
            releaseVersion: SOURCE_VERSION,
            sha256: "0".repeat(64),
            sourceSha: SOURCE_SHA,
          },
        }),
      );
      const target = await targetManifest(root);
      await expect(
        runCrossVersionUpgradeQualification({
          outputPath: join(root, "report.json"),
          sourceFixturePath: fixturePath,
          sourceReceiptPath: receiptPath,
          targetManifestPath: target.path,
          verifyBuilds: false,
        }),
      ).rejects.toThrow("not bound");
    } finally {
      await rm(root, { force: true, recursive: true });
    }
  });
});
