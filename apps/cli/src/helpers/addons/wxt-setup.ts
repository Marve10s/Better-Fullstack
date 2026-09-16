import { log, spinner } from "@clack/prompts";
import { $ } from "execa";
import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";

import type { ProjectConfig } from "@/types";

import { selectAddonOptionOrDefault } from "@/helpers/addons/interactive-selection";
import { getPackageExecutionArgs } from "@/platform/package-runner";

type WxtTemplate = "vanilla" | "vue" | "react" | "solid" | "svelte";

const TEMPLATES = {
  vanilla: {
    label: "Vanilla",
    hint: "Vanilla JavaScript template",
  },
  vue: {
    label: "Vue",
    hint: "Vue.js template",
  },
  react: {
    label: "React",
    hint: "React template",
  },
  solid: {
    label: "Solid",
    hint: "SolidJS template",
  },
  svelte: {
    label: "Svelte",
    hint: "Svelte template",
  },
} as const;

export async function setupWxt(config: Pick<ProjectConfig, "packageManager" | "projectDir">) {
  const { packageManager, projectDir } = config;
  const extensionDir = path.join(projectDir, "apps", "extension");
  const packageJsonPath = path.join(extensionDir, "package.json");

  // The wxt addon template already generates a complete extension app, and
  // `wxt init` aborts on a non-empty directory. Only scaffold when nothing
  // generated the app.
  if (await fs.pathExists(packageJsonPath)) {
    return;
  }

  log.info("Setting up WXT...");

  const template = await selectAddonOptionOrDefault<WxtTemplate>({
    addonName: "WXT",
    message: "Choose a template",
    options: Object.entries(TEMPLATES).map(([key, template]) => ({
      value: key as WxtTemplate,
      label: template.label,
      hint: template.hint,
    })),
    defaultValue: "react",
  });

  const commandWithArgs = `wxt@latest init extension --template ${template} --pm ${packageManager}`;
  const args = getPackageExecutionArgs(packageManager, commandWithArgs);

  const appsDir = path.join(projectDir, "apps");
  await fs.ensureDir(appsDir);

  const s = spinner();
  s.start("Running WXT init command...");

  try {
    await $({ cwd: appsDir, env: { CI: "true" } })`${args}`;
  } catch (error) {
    // A spinner that is never stopped keeps the event loop alive, so the CLI
    // would hang after a failed init instead of exiting.
    s.stop(pc.red("Failed to set up WXT"));
    if (error instanceof Error) {
      console.error(pc.red(error.message));
    }
    return;
  }

  if (await fs.pathExists(packageJsonPath)) {
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = "extension";

    if (packageJson.scripts?.dev) {
      packageJson.scripts.dev = `${packageJson.scripts.dev} --port 5555`;
    }

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
  }

  s.stop("WXT setup complete!");
}
