import fs from "fs-extra";
import path from "node:path";

import type { AvailableDependencies } from "../constants";

export const addPackageDependency = async (opts: {
  dependencies?: AvailableDependencies[];
  devDependencies?: AvailableDependencies[];
  customDependencies?: Record<string, string>;
  customDevDependencies?: Record<string, string>;
  projectDir: string;
}) => {
  const {
    dependencies = [],
    devDependencies = [],
    customDependencies = {},
    customDevDependencies = {},
    projectDir,
  } = opts;

  // Loaded lazily: the version map lives in the template-generator bundle,
  // which is too heavy to import at CLI startup.
  const { dependencyVersionMap } = await import("@better-fullstack/template-generator");

  const pkgJsonPath = path.join(projectDir, "package.json");

  const pkgJson = await fs.readJson(pkgJsonPath);

  if (!pkgJson.dependencies) pkgJson.dependencies = {};
  if (!pkgJson.devDependencies) pkgJson.devDependencies = {};

  for (const pkgName of dependencies) {
    const version = dependencyVersionMap[pkgName];
    if (version) {
      pkgJson.dependencies[pkgName] = version;
    } else {
      console.warn(`Warning: Dependency ${pkgName} not found in version map.`);
    }
  }

  for (const pkgName of devDependencies) {
    const version = dependencyVersionMap[pkgName];
    if (version) {
      pkgJson.devDependencies[pkgName] = version;
    } else {
      console.warn(`Warning: Dev dependency ${pkgName} not found in version map.`);
    }
  }

  for (const [pkgName, version] of Object.entries(customDependencies)) {
    pkgJson.dependencies[pkgName] = version;
  }

  for (const [pkgName, version] of Object.entries(customDevDependencies)) {
    pkgJson.devDependencies[pkgName] = version;
  }

  await fs.writeJson(pkgJsonPath, pkgJson, {
    spaces: 2,
  });
};
