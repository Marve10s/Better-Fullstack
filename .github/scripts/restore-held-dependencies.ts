#!/usr/bin/env bun

import { execFileSync } from "node:child_process";

type DependencyMap = Record<string, string>;

type PackageManifest = {
  dependencies?: DependencyMap;
  devDependencies?: DependencyMap;
};

export const HELD_DEPENDENCIES: Readonly<Record<string, Readonly<Record<string, string>>>> = {
  "apps/web/package.json": {
    "@tanstack/react-start":
      "TanStack Start 1.169 declares peer vite >=8.0.0, and the website builds with Vite 7.",
    "@tanstack/react-router":
      "Must equal the exact router version the held TanStack Start depends on, or Bun installs a second router.",
  },
};

const DEPENDENCY_FIELDS = ["dependencies", "devDependencies"] as const;

export function restoreHeldVersions(
  original: PackageManifest,
  current: PackageManifest,
  heldPackages: readonly string[],
): string[] {
  const restored: string[] = [];
  for (const field of DEPENDENCY_FIELDS) {
    const originalDependencies = original[field] ?? {};
    const currentDependencies = current[field];
    if (!currentDependencies) continue;
    for (const name of heldPackages) {
      const version = originalDependencies[name];
      if (version === undefined || currentDependencies[name] === version) continue;
      currentDependencies[name] = version;
      restored.push(`${name}@${version}`);
    }
  }
  return restored;
}

if (import.meta.main) {
  for (const [manifestPath, heldPackages] of Object.entries(HELD_DEPENDENCIES)) {
    const original: PackageManifest = JSON.parse(
      execFileSync("git", ["show", `HEAD:${manifestPath}`], { encoding: "utf8" }),
    );
    const current: PackageManifest = await Bun.file(manifestPath).json();
    const restored = restoreHeldVersions(original, current, Object.keys(heldPackages));
    if (restored.length === 0) continue;
    await Bun.write(manifestPath, `${JSON.stringify(current, null, 2)}\n`);
    for (const entry of restored) console.log(`Held ${entry} in ${manifestPath}`);
  }
}
