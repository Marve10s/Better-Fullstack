#!/usr/bin/env bun

import { createHash } from "node:crypto";
import { chmod, copyFile, lstat, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { basename, dirname, join, relative, resolve, sep } from "node:path";

import { loadAndVerifyManifest, type ReleaseManifest, type ReleasePackage } from "@scripts/release/release-state";

export const UPGRADE_FIXTURE_SCHEMA_VERSION = 1;
export const UPGRADE_FIXTURE_TYPE = "better-fullstack/executable-upgrade-fixture";
export const UPGRADE_FIXTURE_FILENAME = "upgrade-fixture.v1.json";
export const REQUIRED_UPGRADE_FIXTURE_CASE_IDS = [
  "typescript",
  "react-native",
  "rust",
  "python",
  "go",
  "java",
  "elixir",
  "dotnet",
] as const;

type FixtureLifecycleVersions = {
  cli: string;
  generator: string;
  schema: string;
  templateSet: string;
};

type FixturePackage = Pick<ReleasePackage, "integrity" | "name" | "sha256" | "version">;

export type UpgradeFixtureFile = {
  contentBase64: string;
  mode: number;
  path: string;
  sha256: string;
};

export type UpgradeFixtureCase = {
  command: string[];
  configSha256: string;
  ecosystem: string;
  files: UpgradeFixtureFile[];
  id: string;
  lifecycle: FixtureLifecycleVersions;
  manifestSha256: string;
  projectName: string;
  stackParts: string[];
};

export type UpgradeFixtureBundle = {
  cases: UpgradeFixtureCase[];
  createdAt: string;
  fixtureType: typeof UPGRADE_FIXTURE_TYPE;
  release: {
    packages: FixturePackage[];
    sourceSha: string;
    version: string;
  };
  schemaVersion: typeof UPGRADE_FIXTURE_SCHEMA_VERSION;
};

export type FixtureProjectInput = {
  command: string[];
  ecosystem: string;
  id: string;
  projectDir: string;
  projectName: string;
  stackParts: string[];
};

const SHA256 = /^[0-9a-f]{64}$/;
const SHA = /^[0-9a-f]{40}$/;
const VERSION = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const EXCLUDED_DIRECTORIES = new Set([".bts", ".git", "node_modules"]);

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function hash(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function exactJson(left: unknown, right: unknown, label: string): void {
  if (JSON.stringify(left) !== JSON.stringify(right)) throw new Error(`${label} mismatch`);
}

function safeRelativePath(value: string): boolean {
  return (
    value.length > 0 &&
    !value.startsWith("/") &&
    !/^[A-Za-z]:[\\/]/.test(value) &&
    !value.split(/[\\/]/).includes("..")
  );
}

function packageIdentity(pkg: ReleasePackage): FixturePackage {
  return {
    integrity: pkg.integrity,
    name: pkg.name,
    sha256: pkg.sha256,
    version: pkg.version,
  };
}

async function collectFixtureFiles(root: string): Promise<UpgradeFixtureFile[]> {
  const files: UpgradeFixtureFile[] = [];

  async function visit(directory: string): Promise<void> {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
      if (entry.isDirectory() && EXCLUDED_DIRECTORIES.has(entry.name)) continue;
      const absolute = join(directory, entry.name);
      const relativePath = relative(root, absolute).split(sep).join("/");
      if (entry.isDirectory()) {
        // oxlint-disable-next-line no-await-in-loop -- fixture traversal is ordered for stable bytes
        await visit(absolute);
        continue;
      }
      if (!entry.isFile()) {
        throw new Error(`Fixture contains a non-regular entry: ${relativePath}`);
      }
      // oxlint-disable-next-line no-await-in-loop -- each file is captured with its observed mode
      const [bytes, stats] = await Promise.all([readFile(absolute), lstat(absolute)]);
      files.push({
        contentBase64: bytes.toString("base64"),
        mode: stats.mode & 0o7777,
        path: relativePath,
        sha256: hash(bytes),
      });
    }
  }

  await visit(root);
  return files.sort((left, right) => left.path.localeCompare(right.path));
}

function requiredFile(files: UpgradeFixtureFile[], path: string): UpgradeFixtureFile {
  const file = files.find((candidate) => candidate.path === path);
  if (!file) throw new Error(`Fixture is missing ${path}`);
  return file;
}

function decode(file: UpgradeFixtureFile): Buffer {
  const bytes = Buffer.from(file.contentBase64, "base64");
  if (bytes.toString("base64") !== file.contentBase64 || hash(bytes) !== file.sha256) {
    throw new Error(`Fixture file bytes do not match their digest: ${file.path}`);
  }
  return bytes;
}

function lifecycleFromManifest(
  manifestFile: UpgradeFixtureFile,
  release: UpgradeFixtureBundle["release"],
): FixtureLifecycleVersions {
  let manifest: Record<string, unknown>;
  try {
    manifest = record(JSON.parse(decode(manifestFile).toString("utf8")));
  } catch {
    throw new Error("Fixture bts.lock.json is malformed");
  }
  const provenance = record(manifest.provenance);
  const createdWith = record(provenance.createdWith);
  const lifecycle = {
    cli: String(createdWith.cli ?? ""),
    generator: String(createdWith.generator ?? ""),
    schema: String(createdWith.schema ?? ""),
    templateSet: String(createdWith.templateSet ?? ""),
  };
  const generatorVersion = release.packages.find(
    (pkg) => pkg.name === "@better-fullstack/template-generator",
  )?.version;
  if (
    manifest.version !== "2" ||
    provenance.state !== "verified" ||
    lifecycle.cli !== release.version ||
    lifecycle.generator !== generatorVersion ||
    lifecycle.templateSet !== release.version ||
    lifecycle.schema !== "1"
  ) {
    throw new Error("Fixture lifecycle provenance does not match the release packages");
  }
  exactJson(provenance.current, createdWith, "Fixture current lifecycle provenance");
  return lifecycle;
}

function configVersion(configFile: UpgradeFixtureFile): string {
  const match = decode(configFile)
    .toString("utf8")
    .match(/"version"\s*:\s*"([^"]+)"/);
  if (!match?.[1]) throw new Error("Fixture bts.jsonc has no version");
  return match[1];
}

function validateReleaseIdentity(
  release: UpgradeFixtureBundle["release"],
  expectedManifest?: ReleaseManifest,
): void {
  if (!SHA.test(release.sourceSha) || !VERSION.test(release.version)) {
    throw new Error("Fixture release identity is malformed");
  }
  if (!Array.isArray(release.packages) || release.packages.length === 0) {
    throw new Error("Fixture has no package provenance");
  }
  const names = new Set<string>();
  for (const pkg of release.packages) {
    if (
      !pkg ||
      typeof pkg.name !== "string" ||
      !VERSION.test(pkg.version) ||
      !SHA256.test(pkg.sha256) ||
      typeof pkg.integrity !== "string" ||
      !pkg.integrity.startsWith("sha512-") ||
      names.has(pkg.name)
    ) {
      throw new Error("Fixture package provenance is malformed or duplicated");
    }
    names.add(pkg.name);
  }
  if (!names.has("create-better-fullstack") || !names.has("@better-fullstack/template-generator")) {
    throw new Error("Fixture package provenance lacks the CLI or generator");
  }
  if (!expectedManifest) return;
  if (
    release.sourceSha !== expectedManifest.sourceSha ||
    release.version !== expectedManifest.releaseVersion
  ) {
    throw new Error("Fixture release identity does not match the release manifest");
  }
  exactJson(
    release.packages,
    expectedManifest.packages.map(packageIdentity),
    "Fixture package provenance",
  );
}

export function validateUpgradeFixtureBundle(
  value: unknown,
  expectedManifest?: ReleaseManifest,
): UpgradeFixtureBundle {
  const bundle = value as Partial<UpgradeFixtureBundle>;
  if (
    !bundle ||
    bundle.schemaVersion !== UPGRADE_FIXTURE_SCHEMA_VERSION ||
    bundle.fixtureType !== UPGRADE_FIXTURE_TYPE ||
    typeof bundle.createdAt !== "string" ||
    !Number.isFinite(Date.parse(bundle.createdAt)) ||
    !bundle.release ||
    !Array.isArray(bundle.cases)
  ) {
    throw new Error("Upgrade fixture bundle is malformed or unsupported");
  }
  validateReleaseIdentity(bundle.release, expectedManifest);
  const caseIds = bundle.cases.map((fixture) => fixture.id);
  exactJson(caseIds, REQUIRED_UPGRADE_FIXTURE_CASE_IDS, "Upgrade fixture case set");

  for (const fixture of bundle.cases) {
    if (
      !fixture ||
      typeof fixture.ecosystem !== "string" ||
      typeof fixture.projectName !== "string" ||
      !Array.isArray(fixture.command) ||
      fixture.command.some((token) => typeof token !== "string") ||
      !Array.isArray(fixture.stackParts) ||
      fixture.stackParts.length === 0 ||
      fixture.stackParts.some((part) => typeof part !== "string") ||
      !Array.isArray(fixture.files) ||
      fixture.files.length === 0
    ) {
      throw new Error(`Upgrade fixture case ${fixture?.id ?? "unknown"} is malformed`);
    }
    const paths = new Set<string>();
    for (const file of fixture.files) {
      if (
        !file ||
        typeof file.path !== "string" ||
        !safeRelativePath(file.path) ||
        !SHA256.test(file.sha256) ||
        !Number.isInteger(file.mode) ||
        file.mode < 0 ||
        file.mode > 0o7777 ||
        typeof file.contentBase64 !== "string" ||
        paths.has(file.path)
      ) {
        throw new Error(`Upgrade fixture ${fixture.id} has an unsafe or duplicate file`);
      }
      paths.add(file.path);
      decode(file);
    }
    const config = requiredFile(fixture.files, "bts.jsonc");
    const manifest = requiredFile(fixture.files, "bts.lock.json");
    if (
      config.sha256 !== fixture.configSha256 ||
      manifest.sha256 !== fixture.manifestSha256 ||
      configVersion(config) !== bundle.release.version
    ) {
      throw new Error(`Upgrade fixture ${fixture.id} has mismatched config or manifest identity`);
    }
    exactJson(
      fixture.lifecycle,
      lifecycleFromManifest(manifest, bundle.release),
      `Upgrade fixture ${fixture.id} lifecycle`,
    );
  }
  return bundle as UpgradeFixtureBundle;
}

export async function loadAndVerifyUpgradeFixtureBundle(
  bundlePath: string,
  expectedManifest?: ReleaseManifest,
): Promise<UpgradeFixtureBundle> {
  let value: unknown;
  try {
    value = JSON.parse(await readFile(resolve(bundlePath), "utf8"));
  } catch {
    throw new Error("Upgrade fixture bundle is missing or malformed");
  }
  return validateUpgradeFixtureBundle(value, expectedManifest);
}

export async function createUpgradeFixtureBundle(options: {
  manifestPath: string;
  outputPath: string;
  projects: FixtureProjectInput[];
}): Promise<UpgradeFixtureBundle> {
  const manifest = await loadAndVerifyManifest(resolve(options.manifestPath));
  const release = {
    packages: manifest.packages.map(packageIdentity),
    sourceSha: manifest.sourceSha,
    version: manifest.releaseVersion,
  };
  const projectsById = new Map(options.projects.map((project) => [project.id, project]));
  const cases: UpgradeFixtureCase[] = [];
  for (const id of REQUIRED_UPGRADE_FIXTURE_CASE_IDS) {
    const project = projectsById.get(id);
    if (!project) throw new Error(`Missing generated fixture project ${id}`);
    // oxlint-disable-next-line no-await-in-loop -- capture preserves canonical case order
    const files = await collectFixtureFiles(resolve(project.projectDir));
    const config = requiredFile(files, "bts.jsonc");
    const scaffoldManifest = requiredFile(files, "bts.lock.json");
    cases.push({
      command: project.command,
      configSha256: config.sha256,
      ecosystem: project.ecosystem,
      files,
      id,
      lifecycle: lifecycleFromManifest(scaffoldManifest, release),
      manifestSha256: scaffoldManifest.sha256,
      projectName: project.projectName,
      stackParts: project.stackParts,
    });
  }
  const bundle: UpgradeFixtureBundle = {
    cases,
    createdAt: new Date().toISOString(),
    fixtureType: UPGRADE_FIXTURE_TYPE,
    release,
    schemaVersion: UPGRADE_FIXTURE_SCHEMA_VERSION,
  };
  validateUpgradeFixtureBundle(bundle, manifest);
  const outputPath = resolve(options.outputPath);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(bundle, null, 2)}\n`);
  await copyFile(import.meta.path, join(dirname(outputPath), basename(import.meta.path)));
  return bundle;
}

export async function materializeUpgradeFixtureBundle(
  bundle: UpgradeFixtureBundle,
  outputDirectory: string,
): Promise<string[]> {
  validateUpgradeFixtureBundle(bundle);
  const root = resolve(outputDirectory);
  await mkdir(root, { recursive: true });
  if ((await readdir(root)).length > 0) {
    throw new Error(`Fixture output directory must be empty: ${root}`);
  }
  const projectDirectories: string[] = [];
  for (const fixture of bundle.cases) {
    const projectDirectory = join(root, fixture.id);
    projectDirectories.push(projectDirectory);
    for (const file of fixture.files) {
      const target = resolve(projectDirectory, file.path);
      if (!target.startsWith(`${projectDirectory}${sep}`)) {
        throw new Error(`Fixture path escapes its project: ${file.path}`);
      }
      // oxlint-disable-next-line no-await-in-loop -- materialization preserves exact file order and modes
      await mkdir(dirname(target), { recursive: true });
      // oxlint-disable-next-line no-await-in-loop
      await writeFile(target, decode(file));
      // oxlint-disable-next-line no-await-in-loop
      await chmod(target, file.mode);
    }
  }
  return projectDirectories;
}

function argument(name: string): string {
  const index = process.argv.indexOf(name);
  const value = index >= 0 ? process.argv[index + 1] : undefined;
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

async function main(): Promise<void> {
  const command = process.argv[2];
  const bundlePath = argument("--bundle");
  const manifestIndex = process.argv.indexOf("--manifest");
  const manifestPath = manifestIndex >= 0 ? process.argv[manifestIndex + 1] : undefined;
  const manifest = manifestPath ? await loadAndVerifyManifest(resolve(manifestPath)) : undefined;
  const bundle = await loadAndVerifyUpgradeFixtureBundle(bundlePath, manifest);
  if (command === "verify") {
    console.log(
      `Verified ${bundle.cases.length} executable fixtures for ${bundle.release.version}.`,
    );
    return;
  }
  if (command === "materialize") {
    const projects = await materializeUpgradeFixtureBundle(bundle, argument("--output-dir"));
    console.log(JSON.stringify({ projects, release: bundle.release }, null, 2));
    return;
  }
  throw new Error("Usage: release-fixture.ts <verify|materialize> --bundle <path>");
}

if (import.meta.main) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
}
