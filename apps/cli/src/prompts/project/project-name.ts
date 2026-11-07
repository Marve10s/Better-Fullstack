import { text } from "@clack/prompts";
import consola from "consola";
import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";

import { DEFAULT_CONFIG } from "@/constants";
import { ProjectNameSchema } from "@/types";
import { getPromptDriver } from "@/presentation/context";
import { exitCancelled } from "@/presentation/errors";
import type { NavigableTextOptions } from "@/prompts/core/navigable";

function isPathWithinCwd(targetPath: string) {
  const resolved = path.resolve(targetPath);
  const rel = path.relative(process.cwd(), resolved);
  return !rel.startsWith("..") && !path.isAbsolute(rel);
}

function validateDirectoryName(name: string) {
  if (name === ".") return undefined;

  const result = ProjectNameSchema.safeParse(name);
  if (!result.success) {
    return result.error.issues[0]?.message || "Invalid project name";
  }
  return undefined;
}

export async function getProjectName(initialName?: string) {
  if (initialName) {
    if (initialName === ".") {
      return initialName;
    }
    const finalDirName = path.basename(initialName);
    const validationError = validateDirectoryName(finalDirName);
    if (!validationError) {
      const projectDir = path.resolve(process.cwd(), initialName);
      if (isPathWithinCwd(projectDir)) {
        return initialName;
      }
      consola.error(pc.red("Project path must be within current directory"));
    }
  }

  let isValid = false;
  let projectPath = "";
  let defaultName: string = DEFAULT_CONFIG.projectName;
  let counter = 1;

  while (
    (await fs.pathExists(path.resolve(process.cwd(), defaultName))) &&
    (await fs.readdir(path.resolve(process.cwd(), defaultName))).length > 0
  ) {
    defaultName = `${DEFAULT_CONFIG.projectName}-${counter}`;
    counter++;
  }

  while (!isValid) {
    const textOptions: NavigableTextOptions = {
      message: "Enter your project name or path (relative to current directory)",
      placeholder: defaultName,
      initialValue: initialName,
      defaultValue: defaultName,
      validate: (value) => {
        const nameToUse = String(value ?? "").trim() || defaultName;

        const finalDirName = path.basename(nameToUse);
        const validationError = validateDirectoryName(finalDirName);
        if (validationError) return validationError;

        if (nameToUse !== ".") {
          const projectDir = path.resolve(process.cwd(), nameToUse);
          if (!isPathWithinCwd(projectDir)) {
            return "Project path must be within current directory";
          }
        }

        return undefined;
      },
    };
    const driver = getPromptDriver();
    const response = driver
      ? await driver.text(textOptions, { canGoBack: false, stepKey: "projectName" })
      : await text(textOptions);

    if (typeof response === "symbol") return exitCancelled("Operation cancelled.");

    projectPath = response || defaultName;
    isValid = true;
  }

  return projectPath;
}
