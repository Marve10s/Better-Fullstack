/**
 * `add` command – add addons to an existing Better Fullstack project.
 *
 * Reads bts.jsonc, detects the current stack, presents compatible addons,
 * installs dependencies, and updates the config. All logic uses the Result
 * type so errors are handled structurally, not via try/catch.
 */

import { intro, log, spinner } from "@clack/prompts";
import { $ } from "execa";
import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";

import type { Addons, BetterTStackConfig, Frontend, PackageManager } from "../types";

import { AddonsSchema } from "../types";
import { readBtsConfig, updateBtsConfig } from "../utils/bts-config";
import { getCompatibleAddons, validateAddonCompatibility } from "../utils/compatibility-rules";
import { isSilent } from "../utils/context";
import { type Result, err, ok, tryCatchAsync } from "../utils/result";
import { AddErrors, type AddError, displayAddError } from "./add-errors";

// ---------------------------------------------------------------------------
// Addon dependency map – what packages each addon needs
// ---------------------------------------------------------------------------

type AddonDeps = {
  /** Packages to add to the root package.json as devDependencies */
  rootDev?: string[];
  /** Packages to add to apps/web/package.json as devDependencies */
  webDev?: string[];
  /** Packages to add to apps/web/package.json as dependencies */
  webDeps?: string[];
  /** Packages to add to apps/server/package.json as devDependencies */
  serverDev?: string[];
};

const ADDON_PACKAGES: Record<Exclude<Addons, "none">, AddonDeps> = {
  turborepo: { rootDev: ["turbo"] },
  biome: { rootDev: ["@biomejs/biome"] },
  oxlint: { rootDev: ["oxlint"] },
  ultracite: { rootDev: ["ultracite"] },
  lefthook: { rootDev: ["lefthook"] },
  husky: { rootDev: ["husky"] },
  ruler: { rootDev: ["@AiRuler/cli"] },
  pwa: { webDev: ["@vite-pwa/assets-generator"], webDeps: ["vite-plugin-pwa"] },
  tauri: { webDev: ["@tauri-apps/cli"] },
  starlight: { rootDev: ["@astrojs/starlight"] },
  fumadocs: { rootDev: ["fumadocs-core", "fumadocs-ui"] },
  opentui: { rootDev: ["@anthropic-ai/claude-code"] },
  wxt: { webDev: ["wxt"] },
  msw: { webDev: ["msw"], serverDev: ["msw"] },
  storybook: {
    webDev: [
      "storybook",
      "@storybook/addon-essentials",
      "@storybook/addon-interactions",
      "@storybook/test",
      "@storybook/react-vite",
    ],
  },
};

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type AddCommandInput = {
  /** Addons to add (skips interactive prompt when provided) */
  addons?: Addons[];
  /** Project directory (defaults to cwd) */
  cwd?: string;
  /** Skip dependency installation */
  skipInstall?: boolean;
};

export type AddCommandResult = {
  addedAddons: Addons[];
  projectDir: string;
};

// ---------------------------------------------------------------------------
// Core logic (pure Result-based, no process.exit)
// ---------------------------------------------------------------------------

export async function loadProjectConfig(
  dir: string,
): Promise<Result<BetterTStackConfig, AddError>> {
  const config = await readBtsConfig(dir);
  if (!config) {
    // Distinguish missing file from parse error
    const configPath = path.join(dir, "bts.jsonc");
    if (!(await fs.pathExists(configPath))) {
      return err(AddErrors.configNotFound(dir));
    }
    return err(AddErrors.configParseError(dir, "Could not parse bts.jsonc"));
  }
  return ok(config);
}

export function resolveAvailableAddons(config: BetterTStackConfig): Result<Addons[], AddError> {
  if (config.ecosystem !== "typescript") {
    return err(AddErrors.unsupportedEcosystem(config.ecosystem));
  }

  const existingAddons = config.addons ?? [];
  const frontends: Frontend[] = config.frontend ?? [];
  const allAddons = AddonsSchema.options.filter((a): a is Exclude<Addons, "none"> => a !== "none");
  const available = getCompatibleAddons(allAddons, frontends, existingAddons, config.auth);

  if (available.length === 0) {
    return err(
      AddErrors.noAddonsAvailable(
        existingAddons.length > 0
          ? "All compatible addons are already installed."
          : "No addons are compatible with your current stack.",
      ),
    );
  }

  return ok(available);
}

export function validateSelectedAddons(
  selected: Addons[],
  config: BetterTStackConfig,
): Result<Addons[], AddError> {
  const frontends: Frontend[] = config.frontend ?? [];
  for (const addon of selected) {
    if (addon === "none") continue;
    const { isCompatible, reason } = validateAddonCompatibility(addon, frontends, config.auth);
    if (!isCompatible) {
      return err(AddErrors.incompatibleAddon(addon, reason ?? "Unknown incompatibility"));
    }
  }
  return ok(selected);
}

// ---------------------------------------------------------------------------
// Dependency installation
// ---------------------------------------------------------------------------

function getAddCommand(pm: PackageManager): string[] {
  switch (pm) {
    case "pnpm":
      return ["pnpm", "add"];
    case "bun":
      return ["bun", "add"];
    default:
      return ["npm", "install"];
  }
}

async function installAddonDeps(
  addon: Addons,
  projectDir: string,
  packageManager: PackageManager,
): Promise<Result<void, AddError>> {
  if (addon === "none") return ok(undefined);
  const deps = ADDON_PACKAGES[addon];
  if (!deps) return ok(undefined);

  const addCmd = getAddCommand(packageManager);
  const addDevCmd = [...addCmd, "-D"];

  const tasks: Promise<void>[] = [];

  if (deps.rootDev && deps.rootDev.length > 0) {
    tasks.push($({ cwd: projectDir })`${[...addDevCmd, ...deps.rootDev]}`.then(() => undefined));
  }

  const webDir = path.join(projectDir, "apps", "web");
  const webExists = await fs.pathExists(webDir);
  if (webExists) {
    if (deps.webDeps && deps.webDeps.length > 0) {
      tasks.push($({ cwd: webDir })`${[...addCmd, ...deps.webDeps]}`.then(() => undefined));
    }
    if (deps.webDev && deps.webDev.length > 0) {
      tasks.push($({ cwd: webDir })`${[...addDevCmd, ...deps.webDev]}`.then(() => undefined));
    }
  }

  const serverDir = path.join(projectDir, "apps", "server");
  const serverExists = await fs.pathExists(serverDir);
  if (serverExists && deps.serverDev && deps.serverDev.length > 0) {
    tasks.push($({ cwd: serverDir })`${[...addDevCmd, ...deps.serverDev]}`.then(() => undefined));
  }

  return tryCatchAsync(
    () => Promise.all(tasks).then(() => undefined),
    (e) => AddErrors.installFailed(addon, e instanceof Error ? e.message : String(e)),
  );
}

// ---------------------------------------------------------------------------
// Config update
// ---------------------------------------------------------------------------

async function persistAddons(
  projectDir: string,
  newAddons: Addons[],
  existingAddons: Addons[],
): Promise<Result<void, AddError>> {
  const merged = [...existingAddons.filter((a) => a !== "none"), ...newAddons];
  return tryCatchAsync(
    () => updateBtsConfig(projectDir, { addons: merged }),
    (e) => AddErrors.configWriteError(e instanceof Error ? e.message : String(e)),
  );
}

// ---------------------------------------------------------------------------
// Orchestrator (called from CLI handler or programmatic API)
// ---------------------------------------------------------------------------

export async function addHandler(
  input: AddCommandInput,
): Promise<Result<AddCommandResult, AddError>> {
  const projectDir = input.cwd ?? process.cwd();

  // 1. Load config
  const configResult = await loadProjectConfig(projectDir);
  if (!configResult.ok) return configResult;
  const config = configResult.value;

  // 2. Resolve available addons
  const availableResult = resolveAvailableAddons(config);
  if (!availableResult.ok) return availableResult;

  // 3. Pick addons (from flags or interactive)
  let selected: Addons[];
  if (input.addons !== undefined) {
    // Flags were provided (possibly empty) – no interactive prompt
    selected = input.addons.filter((a) => a !== "none");
  } else {
    // Interactive mode – import dynamically to avoid loading clack in programmatic path
    const { getAddonsToAdd } = await import("../prompts/addons");
    const picked = await getAddonsToAdd(config.frontend ?? [], config.addons ?? [], config.auth);
    selected = (picked ?? []).filter((a): a is Addons => a !== "none");
  }

  if (selected.length === 0) {
    return err(AddErrors.noAddonsSelected());
  }

  // 4. Validate
  const validResult = validateSelectedAddons(selected, config);
  if (!validResult.ok) return validResult;

  // 5. Install dependencies
  if (!input.skipInstall) {
    const pm = config.packageManager ?? "bun";
    const silent = isSilent();
    const s = silent ? null : spinner();

    for (const addon of selected) {
      if (!silent) s?.start(`Installing ${addon}...`);
      const installResult = await installAddonDeps(addon, projectDir, pm);
      if (!installResult.ok) {
        if (!silent) s?.stop(pc.red(`Failed to install ${addon}`));
        return installResult;
      }
      if (!silent) s?.stop(`Installed ${pc.green(addon)}`);
    }
  }

  // 6. Update config
  const persistResult = await persistAddons(projectDir, selected, config.addons ?? []);
  if (!persistResult.ok) return persistResult;

  return ok({ addedAddons: selected, projectDir });
}

// ---------------------------------------------------------------------------
// CLI entry point (renders output, calls process.exit on error)
// ---------------------------------------------------------------------------

export async function addCliHandler(input: AddCommandInput): Promise<void> {
  if (!isSilent()) {
    intro(pc.magenta("Better Fullstack - Add Addons"));
  }

  const result = await addHandler(input);

  if (!result.ok) {
    displayAddError(result.error);
    if (!isSilent()) process.exit(1);
    return;
  }

  if (!isSilent()) {
    const { addedAddons } = result.value;
    log.success(
      pc.green(
        `Added ${addedAddons.length} addon${addedAddons.length === 1 ? "" : "s"}: ${addedAddons.join(", ")}`,
      ),
    );
  }
}
