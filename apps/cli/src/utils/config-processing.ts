import path from "node:path";

import {
  cliInputToProjectConfigPartial,
  processCliArrayOption,
} from "@better-fullstack/types/stack-translation";

import type { CLIInput } from "../types";

export function processArrayOption<T>(options: (T | "none")[] | undefined) {
  return processCliArrayOption(options);
}

export function deriveProjectName(projectName?: string, projectDirectory?: string) {
  if (projectName) {
    return projectName;
  }
  if (projectDirectory) {
    return path.basename(path.resolve(process.cwd(), projectDirectory));
  }
  return "";
}

export function processFlags(options: CLIInput, projectName?: string) {
  const derivedName = deriveProjectName(projectName, options.projectDirectory);
  return cliInputToProjectConfigPartial(options, projectName || derivedName);
}

export function getProvidedFlags(options: CLIInput) {
  return new Set(
    Object.keys(options).filter((key) => options[key as keyof CLIInput] !== undefined),
  );
}

export function validateNoneExclusivity<T>(
  options: (T | "none")[] | undefined,
  optionName: string,
) {
  if (!options || options.length === 0) return;

  if (options.includes("none" as T | "none") && options.length > 1) {
    throw new Error(`Cannot combine 'none' with other ${optionName}.`);
  }
}

export function validateArrayOptions(options: CLIInput) {
  validateNoneExclusivity(options.frontend, "frontend options");
  validateNoneExclusivity(options.addons, "addons");
  validateNoneExclusivity(options.examples, "examples");
  validateNoneExclusivity(options.aiDocs, "ai docs");
  validateNoneExclusivity(options.rustLibraries, "rust libraries");
  validateNoneExclusivity(options.pythonAi, "python ai libraries");
  validateNoneExclusivity(options.javaLibraries, "java libraries");
  validateNoneExclusivity(options.javaTestingLibraries, "java testing libraries");
}
