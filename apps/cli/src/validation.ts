import path from "node:path";

import type { CLIInput, ProjectConfig } from "./types";

import { ProjectNameSchema } from "./types";
import { getProvidedFlags, processFlags, validateArrayOptions } from "./utils/config-processing";
import { validateConfigForProgrammaticUse, validateFullConfig } from "./utils/config-validation";
import { exitWithError } from "./utils/errors";

const CORE_STACK_FLAGS = new Set([
  "database",
  "orm",
  "backend",
  "runtime",
  "frontend",
  "astroIntegration",
  "addons",
  "examples",
  "auth",
  "dbSetup",
  "payments",
  "email",
  "api",
  "webDeploy",
  "serverDeploy",
  "cssFramework",
  "uiLibrary",
  "effect",
]);

function validateYesFlagCombination(options: CLIInput, providedFlags: Set<string>) {
  if (!options.yes) return;

  if (options.template && options.template !== "none") {
    return;
  }

  const coreStackFlagsProvided = Array.from(providedFlags).filter((flag) =>
    CORE_STACK_FLAGS.has(flag),
  );

  if (coreStackFlagsProvided.length > 0) {
    exitWithError(
      `Cannot combine --yes with core stack configuration flags: ${coreStackFlagsProvided.map((f) => `--${f}`).join(", ")}. ` +
        "The --yes flag uses default configuration. Remove these flags or use --yes without them.",
    );
  }
}

function validateProjectName(name: string, throwOnError: boolean) {
  const result = ProjectNameSchema.safeParse(name);
  if (result.success) return;

  const message = `Invalid project name: ${result.error.issues[0]?.message || "Invalid project name"}`;
  if (throwOnError) {
    throw new Error(message);
  }
  exitWithError(message);
}

function extractAndValidateProjectName(
  projectName?: string,
  projectDirectory?: string,
  throwOnError = false,
) {
  const derivedName =
    projectName ||
    (projectDirectory ? path.basename(path.resolve(process.cwd(), projectDirectory)) : "");

  if (!derivedName) {
    return "";
  }

  validateProjectName(projectName ? path.basename(projectName) : derivedName, throwOnError);
  return projectName || derivedName;
}

export function processAndValidateFlags(
  options: CLIInput,
  providedFlags: Set<string>,
  projectName?: string,
) {
  if (options.yolo) {
    const cfg = processFlags(options, projectName);
    const validatedProjectName = extractAndValidateProjectName(
      projectName,
      options.projectDirectory,
      true,
    );
    if (validatedProjectName) {
      cfg.projectName = validatedProjectName;
    }
    return cfg;
  }

  validateYesFlagCombination(options, providedFlags);

  try {
    validateArrayOptions(options);
  } catch (error) {
    exitWithError(error instanceof Error ? error.message : String(error));
  }

  const config = processFlags(options, projectName);

  const validatedProjectName = extractAndValidateProjectName(
    projectName,
    options.projectDirectory,
    false,
  );
  if (validatedProjectName) {
    config.projectName = validatedProjectName;
  }

  validateFullConfig(config, providedFlags, options);

  return config;
}

export function processProvidedFlagsWithoutValidation(options: CLIInput, projectName?: string) {
  if (!options.yolo) {
    const providedFlags = getProvidedFlags(options);
    validateYesFlagCombination(options, providedFlags);

    try {
      validateArrayOptions(options);
    } catch (error) {
      exitWithError(error instanceof Error ? error.message : String(error));
    }
  }

  const config = processFlags(options, projectName);

  const validatedProjectName = extractAndValidateProjectName(
    projectName,
    options.projectDirectory,
    true,
  );
  if (validatedProjectName) {
    config.projectName = validatedProjectName;
  }

  return config;
}

export function validateConfigCompatibility(
  config: Partial<ProjectConfig>,
  providedFlags?: Set<string>,
  options?: CLIInput,
) {
  if (options?.yolo) return;
  if (options && providedFlags) {
    validateFullConfig(config, providedFlags, options);
  } else {
    validateConfigForProgrammaticUse(config);
  }
}

export { getProvidedFlags };
