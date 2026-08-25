import type { PackageManager } from "@/types";

import { exitCancelled } from "@/presentation/errors";
import { getUserPkgManager } from "@/platform/get-package-manager";
import { canPromptInteractively } from "@/presentation/prompt-environment";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";

export async function getPackageManagerChoice(packageManager?: PackageManager) {
  if (packageManager !== undefined) return packageManager;

  const detectedPackageManager = getUserPkgManager();
  if (!canPromptInteractively()) return detectedPackageManager;

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
