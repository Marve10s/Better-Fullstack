import type { PackageManager } from "../types";

import { exitCancelled } from "../utils/errors";
import { getUserPkgManager } from "../utils/get-package-manager";
import { isCancel, navigableSelect } from "./navigable";

export async function getPackageManagerChoice(packageManager?: PackageManager) {
  if (packageManager !== undefined) return packageManager;

  const detectedPackageManager = getUserPkgManager();

  const response = await navigableSelect<PackageManager>({
    message: "Choose package manager",
    options: [
      { value: "npm", label: "npm", hint: "not recommended" },
      {
        value: "pnpm",
        label: "pnpm",
        hint: "Fast, disk space efficient package manager",
      },
      {
        value: "bun",
        label: "bun",
        hint: "All-in-one JavaScript runtime & toolkit",
      },
      {
        value: "yarn",
        label: "yarn",
        hint: "Yarn Berry (v4) with PnP or node_modules",
      },
    ],
    initialValue: detectedPackageManager,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
