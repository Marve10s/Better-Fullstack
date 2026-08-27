#!/usr/bin/env bun

// oxlint-disable no-await-in-loop -- Release transitions preserve package dependency order.

import { createHash } from "node:crypto";
import { lstat, mkdir, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import { basename, dirname, join, relative, resolve } from "node:path";

export const RELEASE_TOOLCHAINS = {
  bun: "1.3.12",
  node: "24.11.1",
  npm: "11.6.2",
  pnpm: "10.20.0",
} as const;

const MANIFEST_SCHEMA_VERSION = 1;
const DEFAULT_REGISTRY = "https://registry.npmjs.org";
const PACKAGE_VERSION = /^[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.-]+)?$/;
const SHA = /^[0-9a-f]{40}$/;

export type ReleasePackage = {
  directory: string;
  filename: string;
  integrity: string;
  name: string;
  sha256: string;
  shasum: string;
  version: string;
};

export type ReleaseManifest = {
  packages: ReleasePackage[];
  releaseVersion: string;
  schemaVersion: typeof MANIFEST_SCHEMA_VERSION;
  sourceSha: string;
  toolchains: typeof RELEASE_TOOLCHAINS;
};

export type RegistryPackageState =
  | { kind: "absent" }
  | { kind: "matching" }
  | { actualIntegrity: string; actualShasum: string; kind: "conflict" };

export type PublicationState = {
  phase: "prepared" | "partially-published" | "packages-published" | "blocked";
  packages: Array<ReleasePackage & { registry: RegistryPackageState }>;
};

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  name?: string;
  private?: boolean;
  scripts?: Record<string, string>;
  version?: string;
  workspaces?: string[];
};

type WorkspacePackage = { directory: string; json: PackageJson };

type PublishableWorkspacePackage = {
  directory: string;
  json: PackageJson & { name: string; version: string };
};

export type ReleaseBuildPlan = {
  privateDependencies: WorkspacePackage[];
  publishable: PublishableWorkspacePackage[];
};

export type CommandResult = { exitCode: number; stderr: string; stdout: string };
export type CommandRunner = (command: string[], cwd?: string) => Promise<CommandResult>;

const runCommand: CommandRunner = async (command, cwd) => {
  const process = Bun.spawn(command, {
    cwd,
    env: processEnv(),
    stderr: "pipe",
    stdout: "pipe",
  });
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(process.stdout).text(),
    new Response(process.stderr).text(),
    process.exited,
  ]);
  return { exitCode, stderr, stdout };
};

function processEnv(): Record<string, string | undefined> {
  return {
    ...process.env,
    BTS_TELEMETRY: "0",
    NO_COLOR: "1",
  };
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function stringField(value: unknown, field: string): string {
  const result = record(value)[field];
  if (typeof result !== "string" || !result) throw new Error(`Missing ${field}`);
  return result;
}

async function jsonFile<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, "utf8")) as T;
}

function hash(buffer: Uint8Array, algorithm: "sha1" | "sha256" | "sha512"): string {
  return createHash(algorithm)
    .update(buffer)
    .digest(algorithm === "sha512" ? "base64" : "hex");
}

function packageArchiveName(index: number, name: string, version: string): string {
  const safeName = name.replace(/^@/, "").replaceAll("/", "-");
  return `${String(index + 1).padStart(2, "0")}-${safeName}-${version}.tgz`;
}

async function workspacePackageDirectories(root: string): Promise<string[]> {
  const rootPackage = await jsonFile<PackageJson>(join(root, "package.json"));
  const workspaces = rootPackage.workspaces;
  if (!Array.isArray(workspaces)) throw new Error("package.json must define workspaces");

  const directories: string[] = [];
  const resolved = await Promise.all(
    workspaces.map(async (workspace) => {
      if (!workspace.endsWith("/*")) return [join(root, workspace)];
      const parent = join(root, workspace.slice(0, -2));
      const entries = await readdir(parent, { withFileTypes: true });
      return entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => join(parent, entry.name));
    }),
  );
  directories.push(...resolved.flat());
  return directories.sort();
}

export async function releaseBuildPlan(root: string): Promise<ReleaseBuildPlan> {
  const candidates = await workspacePackageDirectories(root);
  const inspected = await Promise.all(
    candidates.map(async (directory) => ({
      directory,
      json: await jsonFile<PackageJson>(join(directory, "package.json")),
    })),
  );
  const publishable = publishablePackages(root, inspected);
  return { privateDependencies: privateBuildDependencies(inspected, publishable), publishable };
}

function privateBuildDependencies(
  all: WorkspacePackage[],
  publishable: PublishableWorkspacePackage[],
): WorkspacePackage[] {
  const byName = new Map(all.flatMap((pkg) => (pkg.json.name ? [[pkg.json.name, pkg]] : [])));
  const publishableNames = new Set(publishable.map((pkg) => pkg.json.name));
  const result: WorkspacePackage[] = [];
  const visited = new Set<string>();

  function visit(pkg: WorkspacePackage) {
    const dependencies = { ...pkg.json.dependencies, ...pkg.json.devDependencies };
    for (const dependency of Object.keys(dependencies)) {
      const internal = byName.get(dependency);
      if (!internal || publishableNames.has(dependency) || visited.has(dependency)) continue;
      visited.add(dependency);
      visit(internal);
      if (internal.json.scripts?.build) result.push(internal);
    }
  }

  for (const pkg of publishable) visit(pkg);
  return result;
}

function publishablePackages(
  root: string,
  inspected: WorkspacePackage[],
): PublishableWorkspacePackage[] {
  const packages = inspected
    .filter((pkg) => pkg.json.private !== true)
    .map((pkg) => {
      if (!pkg.json.name || !pkg.json.version) {
        throw new Error(
          `${relative(root, pkg.directory)}/package.json lacks a publishable name or version`,
        );
      }
      if (!PACKAGE_VERSION.test(pkg.json.version)) {
        throw new Error(`${pkg.json.name} has unsupported version ${pkg.json.version}`);
      }
      return pkg as PublishableWorkspacePackage;
    });

  const names = new Set<string>();
  for (const pkg of packages) {
    if (names.has(pkg.json.name)) throw new Error(`Duplicate package name ${pkg.json.name}`);
    names.add(pkg.json.name);
  }
  return topologicalPackages(packages);
}

function topologicalPackages(
  packages: PublishableWorkspacePackage[],
): PublishableWorkspacePackage[] {
  const byName = new Map(packages.map((pkg) => [pkg.json.name, pkg]));
  const result: PublishableWorkspacePackage[] = [];
  const visiting = new Set<string>();
  const visited = new Set<string>();

  function visit(pkg: PublishableWorkspacePackage) {
    const name = pkg.json.name;
    if (visited.has(name)) return;
    if (visiting.has(name)) throw new Error(`Publishable package dependency cycle at ${name}`);
    visiting.add(name);
    for (const dependency of Object.keys(pkg.json.dependencies ?? {})) {
      const internal = byName.get(dependency);
      if (internal) visit(internal);
    }
    visiting.delete(name);
    visited.add(name);
    result.push(pkg);
  }

  for (const pkg of packages) visit(pkg);
  return result;
}

async function requireSuccess(
  command: string[],
  cwd?: string,
  runner: CommandRunner = runCommand,
): Promise<CommandResult> {
  const result = await runner(command, cwd);
  if (result.exitCode !== 0) {
    throw new Error(`Command failed (${command.join(" ")}):\n${result.stderr || result.stdout}`);
  }
  return result;
}

function parseNpmJson(output: string): unknown {
  try {
    return JSON.parse(output);
  } catch {
    const start = output.indexOf("[");
    const objectStart = output.indexOf("{");
    const index = [start, objectStart].filter((value) => value >= 0).sort((a, b) => a - b)[0];
    if (index === undefined) throw new Error(`npm did not return JSON:\n${output}`);
    return JSON.parse(output.slice(index));
  }
}

export async function prepareRelease(options: {
  artifactDirectory: string;
  releaseVersion: string;
  root?: string;
  sourceSha: string;
}): Promise<ReleaseManifest> {
  const root = resolve(options.root ?? process.cwd());
  if (!SHA.test(options.sourceSha)) throw new Error(`Invalid source SHA ${options.sourceSha}`);
  if (!PACKAGE_VERSION.test(options.releaseVersion)) {
    throw new Error(`Invalid release version ${options.releaseVersion}`);
  }

  const { privateDependencies, publishable: packages } = await releaseBuildPlan(root);
  const cli = packages.find((pkg) => pkg.json.name === "create-better-fullstack");
  if (!cli) throw new Error("create-better-fullstack is not a publishable workspace package");
  if (cli.json.version !== options.releaseVersion) {
    throw new Error(
      `Release commit says ${options.releaseVersion}, but create-better-fullstack is ${cli.json.version}`,
    );
  }

  const artifactDirectory = resolve(options.artifactDirectory);
  if ([resolve("/"), resolve(homedir()), root].includes(artifactDirectory)) {
    throw new Error(`Refusing unsafe artifact directory ${artifactDirectory}`);
  }
  await rm(artifactDirectory, { force: true, recursive: true });
  await mkdir(join(artifactDirectory, "packages"), { recursive: true });

  for (const pkg of privateDependencies) {
    console.log(`Building private dependency ${pkg.json.name}`);
    await requireSuccess(["bun", "run", "build"], pkg.directory);
  }

  const artifacts: ReleasePackage[] = [];
  for (const [index, pkg] of packages.entries()) {
    const name = pkg.json.name;
    const version = pkg.json.version;
    if (pkg.json.scripts?.build) {
      console.log(`Building ${name}@${version}`);
      await requireSuccess(["bun", "run", "build"], pkg.directory);
    }

    console.log(`Packing ${name}@${version}`);
    const packed = await requireSuccess([
      "npm",
      "pack",
      "--ignore-scripts",
      "--json",
      "--pack-destination",
      join(artifactDirectory, "packages"),
      pkg.directory,
    ]);
    const packResults = parseNpmJson(packed.stdout);
    if (!Array.isArray(packResults) || packResults.length !== 1) {
      throw new Error(`npm pack returned an unexpected result for ${name}`);
    }
    const packResult = record(packResults[0]);
    if (
      stringField(packResult, "name") !== name ||
      stringField(packResult, "version") !== version
    ) {
      throw new Error(`npm packed the wrong identity for ${name}@${version}`);
    }

    const original = join(
      artifactDirectory,
      "packages",
      basename(stringField(packResult, "filename")),
    );
    const filename = packageArchiveName(index, name, version);
    const target = join(artifactDirectory, "packages", filename);
    await rename(original, target);
    const bytes = new Uint8Array(await readFile(target));
    artifacts.push({
      directory: relative(root, pkg.directory),
      filename: `packages/${filename}`,
      integrity: `sha512-${hash(bytes, "sha512")}`,
      name,
      sha256: hash(bytes, "sha256"),
      shasum: hash(bytes, "sha1"),
      version,
    });
  }

  const manifest: ReleaseManifest = {
    packages: artifacts,
    releaseVersion: options.releaseVersion,
    schemaVersion: MANIFEST_SCHEMA_VERSION,
    sourceSha: options.sourceSha,
    toolchains: RELEASE_TOOLCHAINS,
  };
  await writeFile(
    join(artifactDirectory, "release-manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  await writeFile(join(artifactDirectory, "release-state.ts"), await readFile(import.meta.path));
  return manifest;
}

export async function loadAndVerifyManifest(path: string): Promise<ReleaseManifest> {
  const manifest = await jsonFile<ReleaseManifest>(path);
  if (manifest.schemaVersion !== MANIFEST_SCHEMA_VERSION) {
    throw new Error(`Unsupported release manifest schema ${manifest.schemaVersion}`);
  }
  if (!SHA.test(manifest.sourceSha) || !PACKAGE_VERSION.test(manifest.releaseVersion)) {
    throw new Error("Release manifest has an invalid source SHA or release version");
  }
  if (JSON.stringify(manifest.toolchains) !== JSON.stringify(RELEASE_TOOLCHAINS)) {
    throw new Error("Release manifest toolchains do not match the release tool");
  }
  if (!Array.isArray(manifest.packages) || manifest.packages.length === 0) {
    throw new Error("Release manifest has no packages");
  }

  const names = new Set<string>();
  const files = new Set<string>();
  for (const pkg of manifest.packages) {
    if (names.has(pkg.name) || files.has(pkg.filename)) {
      throw new Error(`Duplicate package identity in release manifest: ${pkg.name}`);
    }
    names.add(pkg.name);
    files.add(pkg.filename);
    const archive = resolve(dirname(path), pkg.filename);
    if (!archive.startsWith(`${resolve(dirname(path))}/`)) {
      throw new Error(`Package archive escapes artifact directory: ${pkg.filename}`);
    }
    const archiveStat = await lstat(archive);
    if (!archiveStat.isFile() || archiveStat.isSymbolicLink()) {
      throw new Error(`Package archive is not a regular file: ${pkg.filename}`);
    }
    const bytes = new Uint8Array(await readFile(archive));
    const integrity = `sha512-${hash(bytes, "sha512")}`;
    const shasum = hash(bytes, "sha1");
    const sha256 = hash(bytes, "sha256");
    if (integrity !== pkg.integrity || shasum !== pkg.shasum || sha256 !== pkg.sha256) {
      throw new Error(`Artifact bytes changed for ${pkg.name}@${pkg.version}`);
    }
  }
  return manifest;
}

async function registryState(
  pkg: ReleasePackage,
  registry: string,
  runner: CommandRunner = runCommand,
): Promise<RegistryPackageState> {
  const result = await runner([
    "npm",
    "view",
    `${pkg.name}@${pkg.version}`,
    "dist",
    "--json",
    "--registry",
    registry,
  ]);
  if (result.exitCode !== 0) {
    if (/E404|404 Not Found|is not in this registry/i.test(`${result.stderr}\n${result.stdout}`)) {
      return { kind: "absent" };
    }
    throw new Error(
      `Could not preflight ${pkg.name}@${pkg.version}:\n${result.stderr || result.stdout}`,
    );
  }
  const dist = record(parseNpmJson(result.stdout));
  const actualIntegrity = stringField(dist, "integrity");
  const actualShasum = stringField(dist, "shasum");
  return actualIntegrity === pkg.integrity && actualShasum === pkg.shasum
    ? { kind: "matching" }
    : { actualIntegrity, actualShasum, kind: "conflict" };
}

export function publicationState(
  packages: Array<ReleasePackage & { registry: RegistryPackageState }>,
): PublicationState {
  const states = packages.map((pkg) => pkg.registry.kind);
  const phase = states.includes("conflict")
    ? "blocked"
    : states.every((state) => state === "matching")
      ? "packages-published"
      : states.some((state) => state === "matching")
        ? "partially-published"
        : "prepared";
  return { packages, phase };
}

export async function inspectPublication(
  manifest: ReleaseManifest,
  registry = DEFAULT_REGISTRY,
  runner: CommandRunner = runCommand,
): Promise<PublicationState> {
  const packages: PublicationState["packages"] = [];
  for (const pkg of manifest.packages) {
    packages.push({ ...pkg, registry: await registryState(pkg, registry, runner) });
  }
  return publicationState(packages);
}

function assertUnblocked(state: PublicationState): void {
  const conflicts = state.packages.filter((pkg) => pkg.registry.kind === "conflict");
  if (conflicts.length === 0) return;
  throw new Error(
    `Release is blocked because npm already has different bytes for: ${conflicts
      .map((pkg) => `${pkg.name}@${pkg.version}`)
      .join(
        ", ",
      )}. Resume the original workflow with Re-run failed jobs so it reuses the uploaded artifact set.`,
  );
}

function printState(state: PublicationState): void {
  console.log(`Publication state: ${state.phase}`);
  for (const pkg of state.packages) {
    console.log(`- ${pkg.name}@${pkg.version}: ${pkg.registry.kind}`);
  }
}

export async function preflightRelease(options: {
  manifestPath: string;
  registry?: string;
}): Promise<PublicationState> {
  const manifest = await loadAndVerifyManifest(options.manifestPath);
  const state = await inspectPublication(manifest, options.registry);
  printState(state);
  assertUnblocked(state);
  return state;
}

async function waitForMatchingPackage(
  pkg: ReleasePackage,
  registry: string,
  attempts = 12,
  runner: CommandRunner = runCommand,
): Promise<void> {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const state = await registryState(pkg, registry, runner);
    if (state.kind === "matching") return;
    if (state.kind === "conflict") {
      throw new Error(`npm returned different bytes after publishing ${pkg.name}@${pkg.version}`);
    }
    if (attempt === attempts) break;
    console.log(
      `Waiting for ${pkg.name}@${pkg.version} to become visible (${attempt}/${attempts})`,
    );
    await Bun.sleep(10_000);
  }
  throw new Error(`${pkg.name}@${pkg.version} did not become visible with the published bytes`);
}

export async function publishRelease(options: {
  manifestPath: string;
  registry?: string;
  runner?: CommandRunner;
}): Promise<void> {
  const registry = options.registry ?? DEFAULT_REGISTRY;
  const runner = options.runner ?? runCommand;
  const manifest = await loadAndVerifyManifest(options.manifestPath);
  const initial = await inspectPublication(manifest, registry, runner);
  printState(initial);
  assertUnblocked(initial);

  for (const pkg of initial.packages) {
    if (pkg.registry.kind === "matching") {
      console.log(`Already published with matching bytes: ${pkg.name}@${pkg.version}`);
      continue;
    }
    const archive = resolve(dirname(options.manifestPath), pkg.filename);
    console.log(`Publishing exact artifact ${pkg.filename}`);
    await requireSuccess(
      [
        "npm",
        "publish",
        archive,
        "--access",
        "public",
        "--provenance",
        "--ignore-scripts",
        "--registry",
        registry,
      ],
      undefined,
      runner,
    );
    await waitForMatchingPackage(pkg, registry, 12, runner);
  }

  const finalState = await inspectPublication(manifest, registry, runner);
  printState(finalState);
  assertUnblocked(finalState);
  if (finalState.phase !== "packages-published") {
    throw new Error(`Publish stopped in unexpected state ${finalState.phase}`);
  }
}

async function tagTargetSha(
  repository: string,
  object: Record<string, unknown>,
  runner: CommandRunner,
): Promise<string> {
  const type = stringField(object, "type");
  const sha = stringField(object, "sha");
  if (type === "commit") return sha;
  if (type !== "tag") throw new Error(`Unsupported Git tag target type ${type}`);

  const tagObject = await requireSuccess(
    ["gh", "api", `repos/${repository}/git/tags/${sha}`],
    undefined,
    runner,
  );
  const target = record(record(parseNpmJson(tagObject.stdout)).object);
  if (stringField(target, "type") !== "commit") {
    throw new Error("Nested annotated release tags are not supported");
  }
  return stringField(target, "sha");
}

function githubNotFound(result: CommandResult): boolean {
  return /release not found|HTTP 404|Not Found/i.test(`${result.stderr}\n${result.stdout}`);
}

async function githubTagTarget(
  repository: string,
  tag: string,
  runner: CommandRunner,
): Promise<string | undefined> {
  const result = await runner(["gh", "api", `repos/${repository}/git/ref/tags/${tag}`]);
  if (result.exitCode !== 0) {
    if (githubNotFound(result)) return undefined;
    throw new Error(`Could not inspect ${tag}:\n${result.stderr || result.stdout}`);
  }
  return tagTargetSha(repository, record(record(parseNpmJson(result.stdout)).object), runner);
}

async function githubRelease(
  repository: string,
  tag: string,
  runner: CommandRunner,
): Promise<Record<string, unknown> | undefined> {
  const result = await runner([
    "gh",
    "release",
    "view",
    tag,
    "--repo",
    repository,
    "--json",
    "assets,isDraft,tagName,targetCommitish",
  ]);
  if (result.exitCode !== 0) {
    if (githubNotFound(result)) return undefined;
    throw new Error(`Could not inspect GitHub release ${tag}:\n${result.stderr || result.stdout}`);
  }
  return record(parseNpmJson(result.stdout));
}

async function generatedReleaseNotes(
  repository: string,
  tag: string,
  sourceSha: string,
  runner: CommandRunner,
): Promise<string> {
  const result = await requireSuccess(
    [
      "gh",
      "api",
      "--method",
      "POST",
      `repos/${repository}/releases/generate-notes`,
      "-f",
      `tag_name=${tag}`,
      "-f",
      `target_commitish=${sourceSha}`,
    ],
    undefined,
    runner,
  );
  const body = record(parseNpmJson(result.stdout)).body;
  if (typeof body !== "string") throw new Error("Generated release notes have no body");
  return body;
}

export async function finalizeRelease(options: {
  assets?: string[];
  manifestPath: string;
  repository: string;
  runner?: CommandRunner;
  sourceSha: string;
}): Promise<void> {
  const runner = options.runner ?? runCommand;
  const manifest = await loadAndVerifyManifest(options.manifestPath);
  if (manifest.sourceSha !== options.sourceSha) {
    throw new Error(`Manifest SHA ${manifest.sourceSha} does not match ${options.sourceSha}`);
  }
  const state = await inspectPublication(manifest, DEFAULT_REGISTRY, runner);
  assertUnblocked(state);
  if (state.phase !== "packages-published") {
    throw new Error(`Cannot finalize release while package state is ${state.phase}`);
  }

  const assets = options.assets?.map((asset) => resolve(asset)) ?? [];
  const assetNames = assets.map((asset) => basename(asset));
  if (assets.length === 0 || new Set(assetNames).size !== assets.length) {
    throw new Error("Finalization requires uniquely named release assets");
  }
  const assetIdentities = await Promise.all(
    assets.map(async (asset) => {
      const assetStat = await lstat(asset);
      if (!assetStat.isFile() || assetStat.isSymbolicLink()) {
        throw new Error(`Release asset is not a regular file: ${asset}`);
      }
      const bytes = new Uint8Array(await readFile(asset));
      return {
        digest: `sha256:${hash(bytes, "sha256")}`,
        name: basename(asset),
        size: bytes.byteLength,
      };
    }),
  );
  const hasExactAssets = (value: unknown) => {
    const releaseAssets = Array.isArray(value) ? value.map(record) : [];
    return assetIdentities.every((expected) =>
      releaseAssets.some(
        (asset) =>
          asset.name === expected.name &&
          asset.size === expected.size &&
          asset.digest === expected.digest,
      ),
    );
  };

  const tag = `v${manifest.releaseVersion}`;
  const stagingTag = `${tag}-staging-${options.sourceSha}`;
  const finalTagTarget = await githubTagTarget(options.repository, tag, runner);
  if (finalTagTarget && finalTagTarget !== options.sourceSha) {
    throw new Error(`${tag} already exists but does not point to ${options.sourceSha}`);
  }

  const finalRelease = await githubRelease(options.repository, tag, runner);
  if (finalRelease && !finalTagTarget) {
    throw new Error(`GitHub release ${tag} exists without its tag`);
  }
  if (finalRelease) {
    if (finalRelease.isDraft !== false) {
      throw new Error(
        `GitHub release ${tag} is not public and cannot be resumed safely because final assets must be staged under ${stagingTag}`,
      );
    }
    if (!hasExactAssets(finalRelease.assets)) {
      throw new Error(`Public GitHub release ${tag} is missing required verification assets`);
    }
    console.log(`GitHub release ${tag} already exists with required assets`);
    return;
  }

  const stagingTagTarget = await githubTagTarget(options.repository, stagingTag, runner);
  if (stagingTagTarget && stagingTagTarget !== options.sourceSha) {
    throw new Error(`${stagingTag} already exists but does not point to ${options.sourceSha}`);
  }
  const stagingRelease = await githubRelease(options.repository, stagingTag, runner);
  if (stagingRelease) {
    if (stagingRelease.isDraft !== true) {
      throw new Error(`Staging GitHub release ${stagingTag} is not a draft`);
    }
    if (stagingRelease.targetCommitish !== options.sourceSha) {
      throw new Error(`Staging GitHub release ${stagingTag} targets a different source`);
    }
  } else {
    const notes = await generatedReleaseNotes(options.repository, tag, options.sourceSha, runner);
    await requireSuccess(
      [
        "gh",
        "release",
        "create",
        stagingTag,
        "--repo",
        options.repository,
        "--target",
        options.sourceSha,
        "--title",
        tag,
        "--notes",
        notes,
        "--draft",
      ],
      undefined,
      runner,
    );
  }

  await requireSuccess(
    ["gh", "release", "upload", stagingTag, ...assets, "--clobber", "--repo", options.repository],
    undefined,
    runner,
  );
  const verifiedStagingRelease = await githubRelease(options.repository, stagingTag, runner);
  if (
    verifiedStagingRelease?.isDraft !== true ||
    verifiedStagingRelease.targetCommitish !== options.sourceSha ||
    !hasExactAssets(verifiedStagingRelease.assets)
  ) {
    throw new Error(`Draft GitHub release ${stagingTag} is missing required verification assets`);
  }
  await requireSuccess(
    [
      "gh",
      "release",
      "edit",
      stagingTag,
      "--repo",
      options.repository,
      "--tag",
      tag,
      "--target",
      options.sourceSha,
      "--title",
      tag,
      "--draft=false",
    ],
    undefined,
    runner,
  );

  const publishedTagTarget = await githubTagTarget(options.repository, tag, runner);
  const publishedRelease = await githubRelease(options.repository, tag, runner);
  if (
    publishedTagTarget !== options.sourceSha ||
    publishedRelease?.isDraft !== false ||
    !hasExactAssets(publishedRelease.assets)
  ) {
    throw new Error(`Published GitHub release ${tag} failed final verification`);
  }
}

function argument(name: string): string {
  const index = process.argv.indexOf(name);
  const value = index >= 0 ? process.argv[index + 1] : undefined;
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function argumentsFor(name: string): string[] {
  return process.argv.flatMap((value, index, values) => {
    const next = values[index + 1];
    return value === name && next ? [next] : [];
  });
}

async function main(): Promise<void> {
  const command = process.argv[2];
  if (command === "prepare") {
    const manifest = await prepareRelease({
      artifactDirectory: argument("--artifact-dir"),
      releaseVersion: argument("--release-version"),
      sourceSha: argument("--sha"),
    });
    console.log(JSON.stringify(manifest, null, 2));
    return;
  }
  if (command === "preflight") {
    await preflightRelease({ manifestPath: resolve(argument("--manifest")) });
    return;
  }
  if (command === "publish") {
    await publishRelease({ manifestPath: resolve(argument("--manifest")) });
    return;
  }
  if (command === "verify-published") {
    const manifestPath = resolve(argument("--manifest"));
    const state = await preflightRelease({ manifestPath });
    if (state.phase !== "packages-published") {
      throw new Error(`Expected packages-published, found ${state.phase}`);
    }
    return;
  }
  if (command === "finalize") {
    await finalizeRelease({
      assets: argumentsFor("--asset"),
      manifestPath: resolve(argument("--manifest")),
      repository: argument("--repository"),
      sourceSha: argument("--sha"),
    });
    return;
  }
  throw new Error("Usage: release-state.ts <prepare|preflight|publish|verify-published|finalize>");
}

if (import.meta.main) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
}
