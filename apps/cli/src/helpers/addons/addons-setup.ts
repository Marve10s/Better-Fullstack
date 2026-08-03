import fs from "fs-extra";
import path from "node:path";
import { isMap, isSeq, parseDocument } from "yaml";

import type { ProjectConfig } from "../../types";

import { addPackageDependency } from "../../utils/add-package-deps";
import { setupFumadocs } from "./fumadocs-setup";
import { setupMcp } from "./mcp-setup";
import { setupOxlint } from "./oxlint-setup";
import { setupRuler } from "./ruler-setup";
import { setupSkills } from "./skills-setup";
import { setupStarlight } from "./starlight-setup";
import { setupTauri } from "./tauri-setup";
import { setupTui } from "./tui-setup";
import { setupUltracite } from "./ultracite-setup";
import { setupWxt } from "./wxt-setup";

export async function setupAddons(
  config: ProjectConfig,
  addonsToSetup: ProjectConfig["addons"] = config.addons,
): Promise<string[]> {
  const warnings: string[] = [];
  const { addons, frontend, projectDir } = config;
  const setupSet = new Set(addonsToSetup);
  const hasReactWebFrontend =
    frontend.includes("react-router") ||
    frontend.includes("react-vite") ||
    frontend.includes("tanstack-router") ||
    frontend.includes("next") ||
    frontend.includes("vinext");
  const hasNuxtFrontend = frontend.includes("nuxt");
  const hasSvelteFrontend = frontend.includes("svelte");
  const hasSolidFrontend = frontend.includes("solid");
  const hasNextFrontend = frontend.includes("next") || frontend.includes("vinext");

  if (
    setupSet.has("tauri") &&
    (hasReactWebFrontend ||
      hasNuxtFrontend ||
      hasSvelteFrontend ||
      hasSolidFrontend ||
      hasNextFrontend)
  ) {
    await setupTauri(config);
  }

  const hasUltracite = addons.includes("ultracite");
  const hasBiome = addons.includes("biome");
  const hasHusky = addons.includes("husky");
  const hasLefthook = addons.includes("lefthook");
  const hasOxlint = addons.includes("oxlint");
  const hasGitleaks = addons.includes("gitleaks");

  if (
    hasUltracite &&
    (setupSet.has("ultracite") || setupSet.has("husky") || setupSet.has("lefthook"))
  ) {
    const gitHooks: string[] = [];
    if (hasHusky) gitHooks.push("husky");
    if (hasLefthook) gitHooks.push("lefthook");
    await setupUltracite(config, gitHooks);
  } else if (!hasUltracite) {
    if (hasBiome && setupSet.has("biome")) {
      await setupBiome(projectDir);
    }

    if (hasOxlint && setupSet.has("oxlint")) {
      await setupOxlint(projectDir, config.packageManager);
    }

    let linter: "biome" | "oxlint" | undefined;
    if (hasOxlint) {
      linter = "oxlint";
    } else if (hasBiome) {
      linter = "biome";
    }
    if (
      hasHusky &&
      (setupSet.has("husky") || setupSet.has("biome") || setupSet.has("oxlint"))
    ) {
      await setupHusky(projectDir, linter, hasGitleaks);
    }
    if (hasLefthook && setupSet.has("lefthook")) {
      await setupLefthook(projectDir, hasGitleaks);
    }
  }

  if (hasGitleaks) {
    if (hasHusky && (setupSet.has("gitleaks") || setupSet.has("husky"))) {
      await ensureGitleaksHuskyHook(projectDir);
    }
    if (hasLefthook && (setupSet.has("gitleaks") || setupSet.has("lefthook"))) {
      await ensureGitleaksLefthookHook(projectDir);
    }
  }

  if (setupSet.has("starlight")) {
    await setupStarlight(config);
  }

  if (setupSet.has("fumadocs")) {
    await setupFumadocs(config);
  }

  if (setupSet.has("opentui")) {
    await setupTui(config);
  }

  if (setupSet.has("wxt")) {
    await setupWxt(config);
  }

  if (setupSet.has("ruler")) {
    await setupRuler(config);
  }

  if (setupSet.has("mcp")) {
    try {
      await setupMcp(config);
    } catch (error) {
      warnings.push(`MCP setup failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (setupSet.has("skills")) {
    try {
      await setupSkills(config);
    } catch (error) {
      warnings.push(
        `Skills setup failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  return warnings;
}

async function setupBiome(projectDir: string) {
  await addPackageDependency({
    devDependencies: ["@biomejs/biome"],
    projectDir,
  });

  const packageJsonPath = path.join(projectDir, "package.json");
  if (await fs.pathExists(packageJsonPath)) {
    const packageJson = await fs.readJson(packageJsonPath);

    packageJson.scripts = {
      ...packageJson.scripts,
      check: "biome check --write .",
    };

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
  }
}

async function setupHusky(projectDir: string, linter?: "biome" | "oxlint", hasGitleaks = false) {
  await addPackageDependency({
    devDependencies: ["husky", "lint-staged"],
    projectDir,
  });

  const packageJsonPath = path.join(projectDir, "package.json");
  if (await fs.pathExists(packageJsonPath)) {
    const packageJson = await fs.readJson(packageJsonPath);

    packageJson.scripts = {
      ...packageJson.scripts,
      prepare: "husky",
    };

    if (linter === "oxlint") {
      packageJson["lint-staged"] = {
        "*": ["oxlint", "oxfmt --write"],
      };
    } else if (linter === "biome") {
      packageJson["lint-staged"] = {
        "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}": ["biome check --write ."],
      };
    } else {
      packageJson["lint-staged"] = {
        "**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,vue,astro,svelte}": "",
      };
    }

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
  }

  if (hasGitleaks) {
    await ensureGitleaksHuskyHook(projectDir);
  }
}

async function setupLefthook(projectDir: string, hasGitleaks = false) {
  await addPackageDependency({
    devDependencies: ["lefthook"],
    projectDir,
  });
  // lefthook.yml is generated by template-generator from templates/addons/lefthook/
  if (hasGitleaks) {
    await ensureGitleaksLefthookHook(projectDir);
  }
}

const GITLEAKS_HOOK_COMMAND = "gitleaks git --pre-commit --redact --staged --verbose";

function hasActiveShellCommand(content: string, command: string): boolean {
  return content.split(/\r?\n/).some((line) => {
    const trimmed = line.trim();
    return trimmed !== "" && !trimmed.startsWith("#") && trimmed === command;
  });
}

function hasGitleaksLefthookCommand(content: string): boolean {
  const document = parseDocument(content);
  if (document.errors.length > 0) return false;

  const preCommit = document.get("pre-commit", true);
  if (!isMap(preCommit)) return false;

  const jobs = preCommit.get("jobs", true);
  if (
    isSeq(jobs) &&
    jobs.items.some((job) => isMap(job) && job.get("run") === GITLEAKS_HOOK_COMMAND)
  ) {
    return true;
  }

  const commands = preCommit.get("commands", true);
  return (
    isMap(commands) &&
    commands.items.some(
      (command) => isMap(command.value) && command.value.get("run") === GITLEAKS_HOOK_COMMAND,
    )
  );
}

export async function isGitleaksSetupComplete(
  projectDir: string,
  addons: ProjectConfig["addons"],
): Promise<boolean> {
  if (addons.includes("husky")) {
    const huskyPath = path.join(projectDir, ".husky", "pre-commit");
    if (!(await fs.pathExists(huskyPath))) return false;
    const husky = await fs.readFile(huskyPath, "utf8");
    if (!hasActiveShellCommand(husky, GITLEAKS_HOOK_COMMAND)) return false;
  }

  if (addons.includes("lefthook")) {
    const lefthookPath = path.join(projectDir, "lefthook.yml");
    if (!(await fs.pathExists(lefthookPath))) return false;
    const lefthook = await fs.readFile(lefthookPath, "utf8");
    if (!hasGitleaksLefthookCommand(lefthook)) return false;
  }

  return true;
}

async function ensureGitleaksHuskyHook(projectDir: string) {
  const hookPath = path.join(projectDir, ".husky", "pre-commit");
  if (!(await fs.pathExists(hookPath))) {
    await fs.ensureDir(path.dirname(hookPath));
    await fs.writeFile(hookPath, `#!/usr/bin/env sh\n${GITLEAKS_HOOK_COMMAND}\n`);
    await fs.chmod(hookPath, 0o755);
    return;
  }

  const content = await fs.readFile(hookPath, "utf8");
  if (hasActiveShellCommand(content, GITLEAKS_HOOK_COMMAND)) return;

  const nextContent = content.includes("\nlint-staged")
    ? content.replace("\nlint-staged", `\n${GITLEAKS_HOOK_COMMAND}\nlint-staged`)
    : `${content.trimEnd()}\n${GITLEAKS_HOOK_COMMAND}\n`;
  await fs.writeFile(hookPath, nextContent);
}

async function ensureGitleaksLefthookHook(projectDir: string) {
  const hookPath = path.join(projectDir, "lefthook.yml");
  if (!(await fs.pathExists(hookPath))) {
    await fs.writeFile(
      hookPath,
      `pre-commit:\n  parallel: true\n  jobs:\n    - name: gitleaks\n      run: ${GITLEAKS_HOOK_COMMAND}\n`,
    );
    return;
  }

  const content = await fs.readFile(hookPath, "utf8");
  const document = parseDocument(content);
  if (document.errors.length > 0) {
    throw new Error(`Cannot add Gitleaks to invalid Lefthook YAML: ${document.errors[0]?.message}`);
  }

  let preCommit = document.get("pre-commit", true);
  if (!isMap(preCommit)) {
    document.set("pre-commit", { parallel: true, jobs: [] });
    preCommit = document.get("pre-commit", true);
  }
  if (!isMap(preCommit)) return;

  if (hasGitleaksLefthookCommand(content)) return;

  const jobs = preCommit.get("jobs", true);
  if (isSeq(jobs)) {
    jobs.add({ name: "gitleaks", run: GITLEAKS_HOOK_COMMAND });
  } else {
    const commands = preCommit.get("commands", true);
    if (isMap(commands)) {
      commands.set("gitleaks", { run: GITLEAKS_HOOK_COMMAND });
    } else {
      preCommit.set("jobs", [{ name: "gitleaks", run: GITLEAKS_HOOK_COMMAND }]);
    }
  }

  await fs.writeFile(hookPath, document.toString());
}
