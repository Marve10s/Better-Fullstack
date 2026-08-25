import { getLatestChannelPinnedVersion } from "@better-fullstack/template-generator";
import { log } from "@clack/prompts";
import fs from "fs-extra";
import path from "node:path";

import type { VersionChannel } from "@/types";

import { hashContent } from "@/lifecycle/scaffold-manifest";

type NpmPackageInfo = {
  "dist-tags"?: Record<string, string>;
  versions?: Record<string, unknown>;
};

const VERSION_CACHE = new Map<string, NpmPackageInfo>();
const PRERELEASE_TAG_PRIORITY = ["beta", "next", "rc", "canary", "alpha"] as const;
const REGISTRY_FETCH_TIMEOUT_MS = 10_000;
const REGISTRY_CONCURRENCY = 10;
const SYNCHRONIZED_VERSION_FAMILIES = [
  {
    name: "oRPC",
    packages: [
      "@orpc/server",
      "@orpc/client",
      "@orpc/openapi",
      "@orpc/zod",
      "@orpc/tanstack-query",
    ],
  },
] as const;

function mapWithConcurrency<T, R>(
  items: T[],
  fn: (item: T, index: number) => Promise<R>,
  concurrency: number,
): Promise<R[]> {
  const results: R[] = Array.from({ length: items.length }) as R[];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i]!, i);
    }
  }

  return Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  ).then(() => results);
}

type ParsedVersion = {
  major: number;
  minor: number;
  patch: number;
  prerelease: Array<number | string>;
};

type PackageJsonVersionSection = Record<string, string>;

export type DependencyVersionChannelRewrite = {
  packageJsonPath: string;
  content: string;
  sha256: string;
};

function getVersionSections(packageJson: Record<string, unknown>): PackageJsonVersionSection[] {
  const sections: PackageJsonVersionSection[] = [];

  for (const sectionName of ["dependencies", "devDependencies"] as const) {
    const section = packageJson[sectionName];
    if (section && typeof section === "object" && !Array.isArray(section)) {
      sections.push(section as PackageJsonVersionSection);
    }
  }

  const workspaces = packageJson.workspaces;
  if (workspaces && typeof workspaces === "object" && !Array.isArray(workspaces)) {
    const catalog = (workspaces as Record<string, unknown>).catalog;
    if (catalog && typeof catalog === "object" && !Array.isArray(catalog)) {
      sections.push(catalog as PackageJsonVersionSection);
    }
  }

  return sections;
}

export function parseVersion(value: string): ParsedVersion {
  const normalized = value.replace(/^[^\d]*/, "");
  const dashIdx = normalized.indexOf("-");
  const base = dashIdx === -1 ? normalized : normalized.slice(0, dashIdx);
  const prerelease = dashIdx === -1 ? "" : normalized.slice(dashIdx + 1);
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

export function compareVersions(a: string, b: string): number {
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

function shouldApplyResolvedVersion(
  currentVersion: string,
  resolvedVersion: string,
  channel: Exclude<VersionChannel, "stable">,
): boolean {
  if (channel !== "beta") return true;

  return compareVersions(resolvedVersion, currentVersion) >= 0;
}

function isRegistrySemverSpec(version: string): boolean {
  return /^[~^]?\d/.test(version);
}

async function fetchPackageInfo(packageName: string): Promise<NpmPackageInfo> {
  const cached = VERSION_CACHE.get(packageName);
  if (cached) return cached;

  const encodedName = encodeURIComponent(packageName).replace("%40", "@");
  const response = await fetch(`https://registry.npmjs.org/${encodedName}`, {
    headers: { Accept: "application/vnd.npm.install-v1+json" },
    signal: AbortSignal.timeout(REGISTRY_FETCH_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Package ${packageName} not found (${response.status})`);
  }

  const raw = (await response.json()) as Record<string, unknown>;
  const data: NpmPackageInfo = {
    "dist-tags": raw["dist-tags"] as Record<string, string> | undefined,
    versions: raw["versions"] as Record<string, unknown> | undefined,
  };
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

function getVersionsForChannel(
  packageInfo: NpmPackageInfo,
  channel: Exclude<VersionChannel, "stable">,
): string[] {
  const versions = Object.keys(packageInfo.versions ?? {});

  if (channel === "latest") {
    return versions.filter((version) => !isPrerelease(version));
  }

  const prereleases = versions.filter(isPrerelease);
  return prereleases.length > 0
    ? prereleases
    : versions.filter((version) => !isPrerelease(version));
}

function resolveSharedFamilyVersion(
  packageInfos: NpmPackageInfo[],
  channel: Exclude<VersionChannel, "stable">,
): string | null {
  if (packageInfos.length === 0) return null;

  const firstInfo = packageInfos[0];
  if (!firstInfo) return null;

  let commonVersions = new Set(getVersionsForChannel(firstInfo, channel));
  const remainingInfos = packageInfos.slice(1);

  for (const packageInfo of remainingInfos) {
    const availableVersions = new Set(getVersionsForChannel(packageInfo, channel));
    commonVersions = new Set(
      [...commonVersions].filter((version) => availableVersions.has(version)),
    );
  }

  return [...commonVersions].sort((left, right) => compareVersions(right, left))[0] ?? null;
}

function applySynchronizedFamilyVersions(
  resolvedVersions: Map<string, string>,
  packageInfos: Map<string, NpmPackageInfo>,
  channel: Exclude<VersionChannel, "stable">,
): void {
  for (const family of SYNCHRONIZED_VERSION_FAMILIES) {
    const selectedPackages = family.packages.filter((packageName) =>
      resolvedVersions.has(packageName),
    );
    if (selectedPackages.length < 2) continue;

    const selectedPackageInfos = selectedPackages.flatMap((packageName) => {
      const packageInfo = packageInfos.get(packageName);
      return packageInfo ? [packageInfo] : [];
    });
    if (selectedPackageInfos.length !== selectedPackages.length) continue;

    const sharedVersion = resolveSharedFamilyVersion(selectedPackageInfos, channel);

    if (!sharedVersion) {
      log.warn(`Failed to resolve shared ${channel} version for ${family.name} packages`);
      continue;
    }

    for (const packageName of selectedPackages) {
      resolvedVersions.set(packageName, sharedVersion);
    }
  }
}

export async function collectPackageJsonPaths(projectDir: string): Promise<string[]> {
  const results: string[] = [];

  async function walk(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".git" ||
        entry.name === ".turbo" ||
        entry.name === ".bts"
      ) {
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

export async function planDependencyVersionChannel(
  projectDir: string,
  channel: VersionChannel,
  projectedPackageJsonContents: ReadonlyMap<string, string | null> = new Map(),
): Promise<DependencyVersionChannelRewrite[]> {
  if (channel === "stable") return [];

  const packageJsonPaths = [
    ...new Set([
      ...(await collectPackageJsonPaths(projectDir)),
      ...projectedPackageJsonContents.keys(),
    ]),
  ]
    .filter((packageJsonPath) => projectedPackageJsonContents.get(packageJsonPath) !== null)
    .sort();
  if (packageJsonPaths.length === 0) return [];

  const readPackageJson = async (packageJsonPath: string): Promise<Record<string, unknown>> => {
    const projectedContent = projectedPackageJsonContents.get(packageJsonPath);
    if (typeof projectedContent === "string")
      return JSON.parse(projectedContent) as Record<string, unknown>;
    return fs.readJson(packageJsonPath) as Promise<Record<string, unknown>>;
  };

  const packageNames = new Set<string>();

  for (const packageJsonPath of packageJsonPaths) {
    const packageJson = await readPackageJson(packageJsonPath);

    for (const section of getVersionSections(packageJson)) {
      for (const [depName, depVersion] of Object.entries(section)) {
        if (typeof depVersion === "string" && isRegistrySemverSpec(depVersion)) {
          packageNames.add(depName);
        }
      }
    }
  }

  if (packageNames.size === 0) return [];

  const resolvedVersions = new Map<string, string>();
  const packageInfos = new Map<string, NpmPackageInfo>();
  const latestChannelHolds = new Map<string, string>();

  await mapWithConcurrency(
    [...packageNames],
    async (packageName) => {
      try {
        const packageInfo = await fetchPackageInfo(packageName);
        const heldVersion =
          channel === "latest" ? getLatestChannelPinnedVersion(packageName) : undefined;
        const normalizedHeldVersion = heldVersion?.replace(/^[^\d]*/, "");

        if (normalizedHeldVersion && !packageInfo.versions?.[normalizedHeldVersion]) {
          throw new Error(
            `Reviewed latest-channel version ${normalizedHeldVersion} is unavailable for ${packageName}`,
          );
        }

        const resolvedVersion =
          normalizedHeldVersion ?? selectRegistryVersionForChannel(packageInfo, channel);
        if (!resolvedVersion) {
          throw new Error(`No ${channel} version available for ${packageName}`);
        }
        if (normalizedHeldVersion) {
          latestChannelHolds.set(packageName, normalizedHeldVersion);
        }
        packageInfos.set(packageName, packageInfo);
        resolvedVersions.set(packageName, resolvedVersion);
      } catch (error) {
        log.warn(
          `Failed to resolve ${channel} version for ${packageName}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    },
    REGISTRY_CONCURRENCY,
  );

  if (latestChannelHolds.size > 0) {
    const heldPackages = [...latestChannelHolds]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([packageName, version]) => `${packageName}@${version}`)
      .join(", ");
    log.warn(
      `Using reviewed versions for ${heldPackages}; the corresponding npm latest tags are not fully installable.`,
    );
  }

  if (resolvedVersions.size === 0) return [];

  applySynchronizedFamilyVersions(resolvedVersions, packageInfos, channel);
  const rewrites: DependencyVersionChannelRewrite[] = [];

  for (const packageJsonPath of packageJsonPaths) {
    const packageJson = await readPackageJson(packageJsonPath);
    let changed = false;

    for (const section of getVersionSections(packageJson)) {
      for (const [packageName, currentVersion] of Object.entries(section)) {
        if (!isRegistrySemverSpec(currentVersion)) continue;

        const resolvedVersion = resolvedVersions.get(packageName);
        if (!resolvedVersion) continue;
        if (!shouldApplyResolvedVersion(currentVersion, resolvedVersion, channel)) continue;

        const nextVersion = latestChannelHolds.has(packageName)
          ? resolvedVersion
          : applyVersionPrefix(currentVersion, resolvedVersion);
        if (nextVersion !== currentVersion) {
          section[packageName] = nextVersion;
          changed = true;
        }
      }
    }

    if (changed) {
      const content = `${JSON.stringify(packageJson, null, 2)}\n`;
      rewrites.push({ packageJsonPath, content, sha256: hashContent(Buffer.from(content)) });
    }
  }
  return rewrites;
}

export async function applyDependencyVersionChannel(
  projectDir: string,
  channel: VersionChannel,
  onWrite?: (packageJsonPath: string, sha256: string) => void | Promise<void>,
  options: {
    rewrites?: readonly DependencyVersionChannelRewrite[];
    writeFile?: (rewrite: DependencyVersionChannelRewrite) => void | Promise<void>;
  } = {},
): Promise<string[]> {
  const rewrites = options.rewrites ?? (await planDependencyVersionChannel(projectDir, channel));

  for (const rewrite of rewrites) {
    if (onWrite) {
      // oxlint-disable-next-line no-await-in-loop -- bind each rewrite before its first byte changes
      await onWrite(rewrite.packageJsonPath, rewrite.sha256);
    }
    if (options.writeFile) {
      // oxlint-disable-next-line no-await-in-loop -- persist reviewed rewrites in transaction order
      await options.writeFile(rewrite);
    } else {
      // oxlint-disable-next-line no-await-in-loop -- persist reviewed rewrites in transaction order
      await fs.writeFile(rewrite.packageJsonPath, rewrite.content, "utf-8");
    }
  }

  return rewrites.map((rewrite) => rewrite.packageJsonPath);
}
