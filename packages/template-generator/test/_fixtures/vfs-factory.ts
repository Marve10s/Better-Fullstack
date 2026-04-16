import { dirname } from "pathe";

import { VirtualFileSystem } from "../../src/core/virtual-fs";

type PackageJson = {
  name?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

const DEFAULT_SEEDED_PATHS = [
  "package.json",
  "apps/web/package.json",
  "apps/server/package.json",
  "apps/native/package.json",
  "packages/api/package.json",
  "packages/db/package.json",
  "packages/auth/package.json",
  "packages/backend/package.json",
  "packages/config/package.json",
  "packages/env/package.json",
  "packages/infra/package.json",
];

function packageNameFromPath(path: string): string {
  if (path === "package.json") return "root";
  return path.replace(/\/package\.json$/, "").replace(/[/.]/g, "-");
}

function writeSeedPackageJson(vfs: VirtualFileSystem, path: string): void {
  vfs.writeJson(path, {
    name: packageNameFromPath(path),
    dependencies: {},
    devDependencies: {},
  });
}

export function createSeededVFS(paths: string[] = DEFAULT_SEEDED_PATHS): VirtualFileSystem {
  const vfs = new VirtualFileSystem();

  for (const path of paths) {
    if (path.endsWith("package.json")) {
      writeSeedPackageJson(vfs, path);
      continue;
    }

    if (!path.includes(".")) {
      vfs.mkdir(path);
      continue;
    }

    const parent = dirname(path);
    if (parent && parent !== ".") {
      vfs.mkdir(parent);
    }
    vfs.writeFile(path, "");
  }

  return vfs;
}

export function getDeps(vfs: VirtualFileSystem, path: string): {
  deps: string[];
  devDeps: string[];
} {
  const pkgJson = vfs.readJson<PackageJson>(path) ?? {};
  return {
    deps: Object.keys(pkgJson.dependencies ?? {}).sort(),
    devDeps: Object.keys(pkgJson.devDependencies ?? {}).sort(),
  };
}

export function getEnvVars(vfs: VirtualFileSystem, path: string): Record<string, string> {
  const content = vfs.readFile(path) ?? "";
  const entries = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"))
    .map((line) => {
      const [key, ...rest] = line.split("=");
      return [key, rest.join("=")] as const;
    });

  return Object.fromEntries(entries);
}
