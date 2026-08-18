import path from "node:path";

import type { CLIInput, ProjectConfig } from "./types";

import {
  SHAPE_ECOSYSTEMS,
  shapeControlledFlags,
  shapeSupportsEcosystem,
} from "./prompts/project-shape";
import { ProjectNameSchema } from "./types";
import {
  applyEffectBackendDefaults,
  getProvidedFlags,
  processFlags,
  validateArrayOptions,
} from "./utils/config-processing";
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

function isSameStackValue(provided: unknown, offValue: unknown) {
  const normalize = (value: unknown) =>
    Array.isArray(value) ? value.filter((entry) => entry !== "none") : value === "none" ? [] : value;
  const left = normalize(provided);
  const right = normalize(offValue);
  if (Array.isArray(left) && Array.isArray(right)) return left.length === right.length;
  return left === right;
}

function toFlagName(configKey: string) {
  return `--${configKey.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
}

export function assertShapeInputIsUsable(
  options: CLIInput & { config?: string; fromHistory?: number },
  providedFlags: Set<string>,
) {
  const shape = options.shape;
  if (!shape || shape === "fullstack") return;

  if (options.config || options.fromHistory !== undefined || options.part?.length) {
    exitWithError(
      `Cannot combine --shape ${shape} with a complete stack (--config, --from-history, or --part). ` +
        "Those already answer what --shape would ask. Remove one of them.",
    );
  }

  const controlled = Object.entries(shapeControlledFlags(shape)).filter(
    ([key, offValue]) =>
      providedFlags.has(key) &&
      !isSameStackValue(options[key as keyof CLIInput], offValue),
  );
  if (controlled.length > 0) {
    exitWithError(
      `--shape ${shape} conflicts with ${controlled.map(([key]) => toFlagName(key)).join(", ")}. ` +
        `A ${shape} project switches those off. Remove them or drop --shape.`,
    );
  }

  if (options.ecosystem && !shapeSupportsEcosystem(shape, options.ecosystem)) {
    exitWithError(
      `--shape ${shape} does not support --ecosystem ${options.ecosystem}. ` +
        `Supported: ${SHAPE_ECOSYSTEMS[shape].join(", ")}.`,
    );
  }

  if (!options.yes) return;

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

function validateYesFlagCombination(options: CLIInput, providedFlags: Set<string>) {
  if (!options.yes) return;

  if (options.template && options.template !== "none") {
    return;
  }

  // A shape expands into stack flags of its own, so they are not user-provided.
  if (options.shape && options.shape !== "fullstack") {
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
    applyEffectBackendDefaults(cfg, getProvidedFlags(options));
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
  applyEffectBackendDefaults(config, providedFlags);

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

  const providedFlags = getProvidedFlags(options);
  const config = processFlags(options, projectName);
  applyEffectBackendDefaults(config, providedFlags);

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
