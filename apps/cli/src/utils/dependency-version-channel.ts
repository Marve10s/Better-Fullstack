import fs from "fs-extra";
import path from "node:path";

import type { VersionChannel } from "../types";

type NpmPackageInfo = {
  "dist-tags"?: Record<string, string>;
  versions?: Record<string, unknown>;
};

const VERSION_CACHE = new Map<string, NpmPackageInfo>();
const PRERELEASE_TAG_PRIORITY = ["beta", "next", "rc", "canary", "alpha"] as const;

type ParsedVersion = {
  major: number;
  minor: number;
  patch: number;
  prerelease: Array<number | string>;
};

function parseVersion(value: string): ParsedVersion {
  const normalized = value.replace(/^[^\d]*/, "");
  const [base, prerelease = ""] = normalized.split("-", 2);
  const [major = "0", minor = "0", patch = "0"] = base.split(".");

  return {
    major: Number(major) || 0,
    minor: Number(minor) || 0,
    patch: Number(patch) || 0,
    prerelease: prerelease
      ? prerelease.split(/[.-]/).map((part) => (/^\d+$/.test(part) ? Number(part) : part))
      : [],
  };
}

function compareVersions(a: string, b: string): number {
  const left = parseVersion(a);
  const right = parseVersion(b);

  if (left.major !== right.major) return left.major - right.major;
  if (left.minor !== right.minor) return left.minor - right.minor;
  if (left.patch !== right.patch) return left.patch - right.patch;

  if (left.prerelease.length === 0 && right.prerelease.length === 0) return 0;
  if (left.prerelease.length === 0) return 1;
  if (right.prerelease.length === 0) return -1;

  const maxLength = Math.max(left.prerelease.length, right.prerelease.length);
  for (let index = 0; index < maxLength; index++) {
    const leftPart = left.prerelease[index];
    const rightPart = right.prerelease[index];

    if (leftPart === undefined) return -1;
    if (rightPart === undefined) return 1;
    if (leftPart === rightPart) continue;

    if (typeof leftPart === "number" && typeof rightPart === "number") {
      return leftPart - rightPart;
    }

    if (typeof leftPart === "number") return -1;
    if (typeof rightPart === "number") return 1;

    return leftPart.localeCompare(rightPart);
  }

  return 0;
}

function isPrerelease(version: string): boolean {
  return /-(alpha|beta|rc|next|canary)/i.test(version);
}

function getVersionPrefix(version: string): string {
  const match = version.match(/^[^\d]*/);
  return match?.[0] ?? "";
}

function applyVersionPrefix(currentVersion: string, resolvedVersion: string): string {
  return `${getVersionPrefix(currentVersion)}${resolvedVersion}`;
}

function isRegistrySemverSpec(version: string): boolean {
  return /^[~^]?\d/.test(version);
}

async function fetchPackageInfo(packageName: string): Promise<NpmPackageInfo> {
  const cached = VERSION_CACHE.get(packageName);
  if (cached) return cached;

  const encodedName = encodeURIComponent(packageName).replace("%40", "@");
  const response = await fetch(`https://registry.npmjs.org/${encodedName}`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Package ${packageName} not found (${response.status})`);
  }

  const data = (await response.json()) as NpmPackageInfo;
  VERSION_CACHE.set(packageName, data);
  return data;
}

export function selectRegistryVersionForChannel(
  packageInfo: NpmPackageInfo,
  channel: Exclude<VersionChannel, "stable">,
): string | null {
  const tags = packageInfo["dist-tags"] ?? {};

  if (channel === "latest") {
    return tags.latest ?? null;
  }

  for (const tag of PRERELEASE_TAG_PRIORITY) {
    if (tags[tag]) return tags[tag]!;
  }

  const prereleases = Object.keys(packageInfo.versions ?? {}).filter(isPrerelease);
  if (prereleases.length > 0) {
    return prereleases.sort((left, right) => compareVersions(right, left))[0] ?? null;
  }

  return tags.latest ?? null;
}

async function resolveRegistryVersion(
  packageName: string,
  channel: Exclude<VersionChannel, "stable">,
): Promise<string> {
  const packageInfo = await fetchPackageInfo(packageName);
  const version = selectRegistryVersionForChannel(packageInfo, channel);

  if (!version) {
    throw new Error(`No ${channel} version available for ${packageName}`);
  }

  return version;
}

async function collectPackageJsonPaths(projectDir: string): Promise<string[]> {
  const results: string[] = [];

  async function walk(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === "node_modules" || entry.name === ".git" || entry.name === ".turbo") {
        continue;
      }

      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }

      if (entry.isFile() && entry.name === "package.json") {
        results.push(fullPath);
      }
    }
  }

  await walk(projectDir);

  return results.sort();
}

export async function applyDependencyVersionChannel(
  projectDir: string,
  channel: VersionChannel,
): Promise<void> {
  if (channel === "stable") return;

  const packageJsonPaths = await collectPackageJsonPaths(projectDir);
  if (packageJsonPaths.length === 0) return;

  const packageNames = new Set<string>();

  for (const packageJsonPath of packageJsonPaths) {
    const packageJson = await fs.readJson(packageJsonPath);

    for (const [depName, depVersion] of Object.entries(packageJson.dependencies ?? {})) {
      if (typeof depVersion === "string" && isRegistrySemverSpec(depVersion)) {
        packageNames.add(depName);
      }
    }

    for (const [depName, depVersion] of Object.entries(packageJson.devDependencies ?? {})) {
      if (typeof depVersion === "string" && isRegistrySemverSpec(depVersion)) {
        packageNames.add(depName);
      }
    }
  }

  if (packageNames.size === 0) return;

  const resolvedVersions = new Map<string, string>();

  await Promise.all(
    [...packageNames].map(async (packageName) => {
      try {
        const resolvedVersion = await resolveRegistryVersion(packageName, channel);
        resolvedVersions.set(packageName, resolvedVersion);
      } catch (error) {
        console.warn(
          `Warning: Failed to resolve ${channel} version for ${packageName}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    }),
  );

  if (resolvedVersions.size === 0) return;

  for (const packageJsonPath of packageJsonPaths) {
    const packageJson = await fs.readJson(packageJsonPath);
    let changed = false;

    for (const sectionName of ["dependencies", "devDependencies"] as const) {
      const section = packageJson[sectionName] as Record<string, string> | undefined;
      if (!section) continue;

      for (const [packageName, currentVersion] of Object.entries(section)) {
        if (!isRegistrySemverSpec(currentVersion)) continue;

        const resolvedVersion = resolvedVersions.get(packageName);
        if (!resolvedVersion) continue;

        const nextVersion = applyVersionPrefix(currentVersion, resolvedVersion);
        if (nextVersion !== currentVersion) {
          section[packageName] = nextVersion;
          changed = true;
        }
      }
    }

    if (changed) {
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    }
  }
}
