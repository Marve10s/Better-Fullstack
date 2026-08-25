import path from "node:path";

import type { CLIInput, ProjectConfig } from "@/types";

import {
  applyEffectBackendDefaults,
  getProvidedFlags,
  processFlags,
  validateArrayOptions,
} from "@/config/config-processing";
import { validateConfigForProgrammaticUse, validateFullConfig } from "@/config/config-validation";
import { exitWithError } from "@/presentation/errors";
import {
  NATIVE_FRONTENDS,
  SHAPE_ECOSYSTEMS,
  mobilePlatformsFromFlags,
  shapeControlledFlags,
  shapeRequiredHalfKeys,
  shapeSupportsEcosystem,
} from "@/prompts/project/project-shape";
import { ProjectNameSchema } from "@/types";

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
    Array.isArray(value)
      ? value.filter((entry) => entry !== "none")
      : value === "none"
        ? []
        : value;
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

  const completeStackSource =
    options.config !== undefined
      ? "--config"
      : options.fromHistory !== undefined
        ? "--from-history"
        : options.part?.length
          ? "--part"
          : options.template && options.template !== "none"
            ? "--template"
            : undefined;

  if (completeStackSource) {
    exitWithError(
      `Cannot combine --shape ${shape} with ${completeStackSource}. ` +
        "That already answers what --shape would ask. Remove one of them.",
    );
  }

  if (shape === "mobile") {
    const platforms = mobilePlatformsFromFlags(options);
    if (platforms.length > 1) {
      exitWithError(
        `--shape mobile matches more than one platform: ${platforms.join(", ")}. ` +
          "Pass a selector for exactly one platform.",
      );
    }
  }

  const controlled = Object.entries(shapeControlledFlags(shape)).filter(
    ([key, offValue]) =>
      providedFlags.has(key) && !isSameStackValue(options[key as keyof CLIInput], offValue),
  );
  if (controlled.length > 0) {
    exitWithError(
      `--shape ${shape} conflicts with ${controlled.map(([key]) => toFlagName(key)).join(", ")}. ` +
        `A ${shape} project switches those off. Remove them or drop --shape.`,
    );
  }

  // Disabling the half the shape exists to build leaves an empty project. The
  // ecosystem may still be unchosen, so every half the shape could need counts.
  const disabledHalf = shapeRequiredHalfKeys(shape, options.ecosystem).find(
    (key) => providedFlags.has(key) && isSameStackValue(options[key as keyof CLIInput], "none"),
  );
  if (disabledHalf) {
    exitWithError(
      `--shape ${shape} needs ${toFlagName(disabledHalf)}, but it was set to none. ` +
        `That would generate an empty project. Pick a ${shape} or drop --shape.`,
    );
  }

  // A frontend or backend shape builds no mobile app, so a platform selector
  // would be dropped without a word.
  if (shape !== "mobile") {
    const strayPlatforms = mobilePlatformsFromFlags({
      kotlinMobile: options.kotlinMobile,
      swiftMobile: options.swiftMobile,
      dartMobile: options.dartMobile,
    });
    if (strayPlatforms.length > 0) {
      exitWithError(
        `--shape ${shape} builds no mobile app, so ${strayPlatforms.join(", ")} cannot be selected. ` +
          "Use --shape mobile, or add the app with --part mobile:<platform>:<tool>.",
      );
    }
  }

  // A frontend shape builds a web app; a native frontend is a mobile app.
  if (
    shape === "frontend" &&
    providedFlags.has("frontend") &&
    Array.isArray(options.frontend) &&
    options.frontend.some((entry) => NATIVE_FRONTENDS.has(entry))
  ) {
    exitWithError(
      "--shape frontend builds a web app, so --frontend cannot name a native frontend. " +
        "Use --shape mobile for a mobile app.",
    );
  }

  // A web frontend never names a mobile platform, on any path.
  if (
    shape === "mobile" &&
    providedFlags.has("frontend") &&
    Array.isArray(options.frontend) &&
    options.frontend.some((entry) => entry !== "none" && !NATIVE_FRONTENDS.has(entry))
  ) {
    exitWithError(
      "--shape mobile builds a mobile app, so --frontend must name a native frontend. " +
        "Drop --frontend or pass a native one.",
    );
  }

  if (options.ecosystem && !shapeSupportsEcosystem(shape, options.ecosystem)) {
    exitWithError(
      `--shape ${shape} does not support --ecosystem ${options.ecosystem}. ` +
        `Supported: ${SHAPE_ECOSYSTEMS[shape].join(", ")}.`,
    );
  }

  if (!options.yes) return;

  // A native frontend is how you name the React Native platform, so it answers
  // the mobile shape's question rather than contradicting it. A web frontend
  // never does, whatever else the flags say.
  // Native frontends already passed the platform check above.
  const frontendIsPlatformSelector = shape === "mobile" && providedFlags.has("frontend");

  const shapeOffValues = shapeControlledFlags(shape);

  const coreStackFlagsProvided = Array.from(providedFlags).filter((flag) => {
    if (!CORE_STACK_FLAGS.has(flag)) return false;
    if (flag === "frontend" && frontendIsPlatformSelector) return false;
    // A flag that merely restates what the shape already switches off adds
    // nothing to reject.
    if (flag in shapeOffValues) {
      return !isSameStackValue(options[flag as keyof CLIInput], shapeOffValues[flag]);
    }
    return true;
  });

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
