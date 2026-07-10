import { intro, log, note, outro } from "@clack/prompts";
import consola from "consola";
import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";

import type { CreateInput, DirectoryConflict, ProjectConfig } from "../../types";

import { BUILDER_URL, getDefaultConfig } from "../../constants";
import { CreateCommandOptionsSchema } from "../../create-command-input";
import { gatherConfig } from "../../prompts/config-prompts";
import { isCancel, isGoBack, navigableSelect } from "../../prompts/navigable";
import { getProjectName } from "../../prompts/project-name";
import { getVersionChannelChoice } from "../../prompts/version-channel";
import { getKotlinJavaIncompatibilityReason } from "../../types";
import {
  maybeShowTelemetryNotice,
  type TelemetrySource,
  trackEvent,
  trackProjectCreation,
} from "../../utils/analytics";
import { resolveCreateConfigBase } from "../../utils/config-source";
import { isSilent, runWithContextAsync } from "../../utils/context";
import { displayConfig } from "../../utils/display-config";
import { CLIError, UserCancelledError, exitCancelled } from "../../utils/errors";
import { generateReproducibleCommand } from "../../utils/generate-reproducible-command";
import { runGeneratedChecks } from "../../utils/generated-checks";
import { openUrl } from "../../utils/open-url";
import { displayPreflightWarnings } from "../../utils/preflight-display";
import { handleDirectoryConflict, setupProjectDirectory } from "../../utils/project-directory";
import { addToHistory } from "../../utils/project-history";
import { canPromptInteractively } from "../../utils/prompt-environment";
import { renderTitle } from "../../utils/render-title";
import { getTemplateConfig, getTemplateDescription } from "../../utils/templates";
import {
  getProvidedFlags,
  processAndValidateFlags,
  processProvidedFlagsWithoutValidation,
  validateConfigCompatibility,
} from "../../validation";
import { createProject } from "./create-project";

interface CreateHandlerOptions {
  silent?: boolean;
}

type BuilderPromptEnvironment = {
  npmConfigUserAgent?: string;
  forceBuilderPrompt?: string;
  skipBuilderPrompt?: string;
  silent?: boolean;
  stdinIsTTY?: boolean;
  stdoutIsTTY?: boolean;
  ci?: string;
};

type BuilderPromptGateInput = Pick<CreateInput, "yes" | "part" | "template"> &
  Partial<ProjectConfig> & {
    config?: string;
    fromHistory?: number;
    yolo?: boolean;
    manualDb?: boolean;
    dryRun?: boolean;
  };

// Keys that don't express a stack choice; booleans with zod defaults
// (yes/yolo/manualDb/...) are always present in parsed input, so their truthy
// forms are handled explicitly in the gate instead.
const NON_STACK_CREATE_OPTION_KEYS = new Set([
  "template",
  "fromHistory",
  "config",
  "yes",
  "yolo",
  "manualDb",
  "part",
  "verbose",
  "dryRun",
  "verify",
  "versionChannel",
  "directoryConflict",
  "renderTitle",
  "disableAnalytics",
]);

const CREATE_STACK_FLAG_KEYS = new Set(
  Object.keys(CreateCommandOptionsSchema.shape).filter(
    (key) => !NON_STACK_CREATE_OPTION_KEYS.has(key),
  ),
);

function hasCreateStackFlags(input: BuilderPromptGateInput): boolean {
  return Object.entries(input).some(([key, value]) => {
    if (value === undefined) return false;
    if (key === "template" && value === "none") return false;
    return CREATE_STACK_FLAG_KEYS.has(key);
  });
}

export function shouldShowBuilderRecommendationPrompt({
  input,
  hasConfigBase,
  environment = {},
}: {
  input: BuilderPromptGateInput;
  hasConfigBase: boolean;
  environment?: BuilderPromptEnvironment;
}): boolean {
  if (environment.skipBuilderPrompt === "1") return false;
  if (
    !canPromptInteractively({
      silent: environment.silent,
      stdinIsTTY: environment.stdinIsTTY,
      stdoutIsTTY: environment.stdoutIsTTY,
      ci: environment.ci,
    })
  ) {
    return false;
  }
  if (
    input.yes ||
    input.yolo ||
    input.manualDb ||
    input.dryRun ||
    input.part?.length ||
    hasConfigBase ||
    input.config ||
    input.fromHistory ||
    (input.template && input.template !== "none")
  ) {
    return false;
  }
  if (hasCreateStackFlags(input)) return false;
  if (environment.forceBuilderPrompt === "1") return true;
  return Boolean(environment.npmConfigUserAgent);
}

async function showBuilderRecommendationPrompt() {
  note(
    `The Web Builder walks the full stack visually — every option, live compatibility checks — and hands you back a single command to run.\n\n${BUILDER_URL}`,
    "Prefer a visual builder?",
  );

  const response = await navigableSelect<"open" | "continue">({
    message: "How would you like to continue?",
    options: [
      {
        value: "open",
        label: "Open the Web Builder",
        hint: "recommended — opens in your browser",
      },
      {
        value: "continue",
        label: "Continue in the CLI",
      },
    ],
    initialValue: "open",
  });

  if (isCancel(response) || isGoBack(response)) return exitCancelled("Operation cancelled");

  if (response === "open") {
    try {
      await openUrl(BUILDER_URL);
      log.success(pc.blue("Opened Web Builder in your browser."));
    } catch {
      log.message(`Please visit ${BUILDER_URL}`);
    }
    outro(pc.magenta("Web Builder is ready when you are."));
    return "opened" as const;
  }

  return "continue" as const;
}

function getYesBaseConfig(flagConfig: Partial<ProjectConfig>): ProjectConfig {
  const baseConfig = getDefaultConfig();

  if (flagConfig.ecosystem !== "react-native") {
    return baseConfig;
  }

  return {
    ...baseConfig,
    backend: "none",
    runtime: "none",
    frontend: ["native-bare"],
    addons: [],
    examples: [],
    auth: "none",
    payments: "none",
    email: "none",
    fileUpload: "none",
    effect: "none",
    dbSetup: "none",
    api: "none",
    webDeploy: "none",
    serverDeploy: "none",
    cssFramework: "none",
    uiLibrary: "none",
    stateManagement: "none",
    forms: "none",
    testing: "none",
    realtime: "none",
    jobQueue: "none",
    animation: "none",
    logging: "none",
    observability: "none",
    featureFlags: "none",
    analytics: "none",
    cms: "none",
    caching: "none",
    rateLimit: "none",
    i18n: "none",
    search: "none",
    vectorDb: "none",
    fileStorage: "none",
    mobileNavigation: "expo-router",
    mobileUI: "none",
    mobileStorage: "none",
    mobileTesting: "none",
    mobilePush: "none",
    mobileOTA: "none",
    mobileDeepLinking: "none",
  };
}

function shouldPromptForVersionChannel(
  input: CreateInput & { projectName?: string },
  hasConfigBase: boolean,
): boolean {
  if (
    input.yes ||
    input.part?.length ||
    hasConfigBase ||
    input.versionChannel !== undefined ||
    isSilent()
  ) {
    return false;
  }

  return canPromptInteractively();
}

// Kotlin (javaLanguage) is only wired for a subset of the Java option surface.
// Interactive prompts filter the incompatible options up front, but flag-driven
// and config-file runs bypass those prompts — and the create path does not run
// analyzeStackCompatibility — so re-check here and fall back to Java loudly
// instead of letting the template generator do it silently.
export function normalizeKotlinJavaSelection(config: ProjectConfig) {
  const hasJavaGraphBackend = config.stackParts?.some(
    (part) =>
      part.role === "backend" &&
      part.ecosystem === "java" &&
      !part.ownerPartId &&
      part.source !== "provided",
  );
  if ((!hasJavaGraphBackend && config.ecosystem !== "java") || config.javaLanguage !== "kotlin") {
    return;
  }
  const kotlinBlocker = getKotlinJavaIncompatibilityReason(config);
  if (!kotlinBlocker) return;
  config.javaLanguage = "java";
  if (config.stackParts) {
    config.stackParts = config.stackParts.filter(
      (part) =>
        !(
          part.role === "language" &&
          part.ecosystem === "java" &&
          part.toolId === "kotlin" &&
          part.source !== "provided"
        ),
    );
  }
  if (!isSilent()) {
    log.warn(pc.yellow(`JVM language set to Java: ${kotlinBlocker}`));
  }
}

export async function createProjectHandler(
  input: CreateInput & { projectName?: string; fromHistory?: number; config?: string },
  options: CreateHandlerOptions = {},
) {
  const { silent = false } = options;

  return runWithContextAsync({ silent }, async () => {
    const startTime = Date.now();
    const timeScaffolded = new Date().toISOString();
    let telemetrySource: TelemetrySource = silent ? "programmatic" : "cli-interactive";

    try {
      if (!isSilent() && input.renderTitle !== false) {
        renderTitle();
      }
      if (!isSilent()) intro(pc.magenta("Creating a new Better Fullstack project"));

      // One-time notice about anonymous telemetry (self-gated: interactive only,
      // skipped once a preference is persisted or an env override is set).
      await maybeShowTelemetryNotice();

      if (!isSilent() && input.yolo) {
        consola.fatal("YOLO mode enabled - skipping checks. Things may break!");
      }

      const configBase = await resolveCreateConfigBase(input);
      const hasConfigBase = configBase !== undefined;
      if (
        shouldShowBuilderRecommendationPrompt({
          input,
          hasConfigBase,
          environment: {
            npmConfigUserAgent: process.env.npm_config_user_agent,
            forceBuilderPrompt: process.env.BFS_FORCE_BUILDER_PROMPT,
            skipBuilderPrompt: process.env.BFS_SKIP_BUILDER_PROMPT,
          },
        })
      ) {
        const builderChoice = await showBuilderRecommendationPrompt();
        if (builderChoice === "opened") return;
      }

      if (hasConfigBase && !isSilent()) {
        log.info(
          pc.cyan(
            input.config
              ? `Using stack from config file: ${input.config}`
              : `Using stack from history entry #${input.fromHistory}`,
          ),
        );
      }

      // A config base (from history or a file) supplies a complete stack, so we
      // skip the interactive project-name prompt just like --yes does.
      const useDefaultsForName = Boolean(input.yes) || hasConfigBase;
      let currentPathInput: string;
      if (useDefaultsForName && input.projectName) {
        currentPathInput = input.projectName;
      } else if (useDefaultsForName) {
        const defaultConfig = getDefaultConfig();
        let defaultName: string = defaultConfig.relativePath;
        let counter = 1;
        while (
          (await fs.pathExists(path.resolve(process.cwd(), defaultName))) &&
          (await fs.readdir(path.resolve(process.cwd(), defaultName))).length > 0
        ) {
          defaultName = `${defaultConfig.projectName}-${counter}`;
          counter++;
        }
        currentPathInput = defaultName;
      } else {
        currentPathInput = await getProjectName(input.projectName);
      }

      const versionChannel = shouldPromptForVersionChannel(input, hasConfigBase)
        ? await getVersionChannelChoice()
        : (input.versionChannel ?? configBase?.versionChannel ?? "stable");

      let finalResolvedPath: string;
      let finalBaseName: string;

      if (input.dryRun) {
        finalBaseName = path.basename(currentPathInput);
        finalResolvedPath = path.resolve(process.cwd(), currentPathInput);
      } else {
        let finalPathInput: string;
        let shouldClearDirectory: boolean;

        try {
          if (input.directoryConflict) {
            const result = await handleDirectoryConflictProgrammatically(
              currentPathInput,
              input.directoryConflict,
            );
            finalPathInput = result.finalPathInput;
            shouldClearDirectory = result.shouldClearDirectory;
          } else {
            const result = await handleDirectoryConflict(currentPathInput);
            finalPathInput = result.finalPathInput;
            shouldClearDirectory = result.shouldClearDirectory;
          }
        } catch (error) {
          if (error instanceof UserCancelledError || error instanceof CLIError) {
            throw error;
          }
          const elapsedTimeMs = Date.now() - startTime;
          return {
            success: false,
            projectConfig: {
              projectName: "",
              projectDir: "",
              relativePath: "",
              ecosystem: "typescript",
              database: "none",
              orm: "none",
              backend: "none",
              runtime: "none",
              frontend: [],
              addons: [],
              examples: [],
              auth: "none",
              payments: "none",
              email: "none",
              fileUpload: "none",
              effect: "none",
              git: false,
              packageManager: "npm",
              versionChannel: "stable",
              install: false,
              dbSetup: "none",
              api: "none",
              webDeploy: "none",
              serverDeploy: "none",
              cssFramework: "none",
              uiLibrary: "none",
              ai: "none",
              stateManagement: "none",
              validation: "zod",
              forms: "react-hook-form",
              testing: "vitest",
              realtime: "none",
              jobQueue: "none",
              animation: "none",
              logging: "none",
              observability: "none",
              rustWebFramework: "none",
              rustFrontend: "none",
              rustOrm: "none",
              rustApi: "none",
              rustCli: "none",
              rustLibraries: [],
              rustLogging: "none",
              rustErrorHandling: "none",
              rustCaching: "none",
              rustAuth: "none",
              rustRealtime: "none",
              rustMessageQueue: "none",
              rustObservability: "none",
              rustTemplating: "none",
              cms: "none",
              caching: "none",
              rateLimit: "none",
              i18n: "none",
              search: "none",
              vectorDb: "none",
              featureFlags: "none",
              analytics: "none",
              fileStorage: "none",
              mobileNavigation: "none",
              mobileUI: "none",
              mobileStorage: "none",
              mobileTesting: "none",
              mobilePush: "none",
              mobileOTA: "none",
              mobileDeepLinking: "none",
              pythonWebFramework: "none",
              pythonOrm: "none",
              pythonValidation: "none",
              pythonAi: [],
              pythonAuth: "none",
              pythonApi: "none",
              pythonTaskQueue: "none",
              pythonGraphql: "none",
              pythonQuality: "none",
              pythonTesting: [],
              pythonCaching: "none",
              pythonRealtime: "none",
              pythonObservability: "none",
              pythonCli: [],
              goWebFramework: "none",
              goOrm: "none",
              goApi: "none",
              goCli: "none",
              goLogging: "none",
              goAuth: "none",
              goTesting: [],
              goRealtime: "none",
              goMessageQueue: "none",
              goCaching: "none",
              goConfig: "none",
              goObservability: "none",
              javaWebFramework: "none",
              javaBuildTool: "none",
              javaOrm: "none",
              javaAuth: "none",
              javaApi: "none",
              javaLogging: "none",
              javaLibraries: [],
              javaTestingLibraries: [],
              dotnetWebFramework: "none",
              dotnetOrm: "none",
              dotnetAuth: "none",
              dotnetApi: "none",
              dotnetTesting: [],
              dotnetJobQueue: "none",
              dotnetRealtime: "none",
              dotnetObservability: [],
              dotnetValidation: "none",
              dotnetCaching: "none",
              dotnetDeploy: "none",
              elixirWebFramework: "none",
              elixirOrm: "none",
              elixirAuth: "none",
              elixirApi: "none",
              elixirRealtime: "none",
              elixirJobs: "none",
              elixirValidation: "none",
              elixirHttp: "none",
              elixirJson: "none",
              elixirEmail: "none",
              elixirCaching: "none",
              elixirObservability: "none",
              elixirTesting: "none",
              elixirQuality: "none",
              elixirDeploy: "none",
              elixirLibraries: [],
              aiDocs: [],
            } satisfies ProjectConfig,
            reproducibleCommand: "",
            timeScaffolded,
            elapsedTimeMs,
            projectDirectory: "",
            relativePath: "",
            error: error instanceof Error ? error.message : String(error),
          };
        }

        const setupResult = await setupProjectDirectory(finalPathInput, shouldClearDirectory);
        finalResolvedPath = setupResult.finalResolvedPath;
        finalBaseName = setupResult.finalBaseName;
        currentPathInput = finalPathInput;
      }

      // Overlay any explicitly-passed flags on top of the config base so the
      // user can override individual options from a replayed/loaded config.
      const definedInput = Object.fromEntries(
        Object.entries(input).filter(([, value]) => value !== undefined),
      ) as typeof input;
      const explicitInput = {
        ...definedInput,
        projectDirectory: input.projectName,
      };
      const originalInput = {
        ...configBase,
        ...explicitInput,
      };

      // Only flags the user explicitly passed count as "provided" for strict
      // compatibility checks; config-base values are treated as defaults (the
      // same leniency --yes uses for a trusted config).
      const providedFlags = getProvidedFlags(explicitInput);

      let cliInput = originalInput;

      if (input.template && input.template !== "none") {
        const templateConfig = getTemplateConfig(input.template);
        if (templateConfig) {
          const templateName = input.template.toUpperCase();
          const templateDescription = getTemplateDescription(input.template);
          if (!isSilent()) {
            log.message(pc.bold(pc.cyan(`Using template: ${pc.white(templateName)}`)));
            log.message(pc.dim(`   ${templateDescription}`));
          }
          const userOverrides: Record<string, unknown> = {};
          for (const [key, value] of Object.entries(originalInput)) {
            if (value !== undefined) {
              userOverrides[key] = value;
            }
          }
          cliInput = {
            ...templateConfig,
            ...userOverrides,
            template: input.template,
            projectDirectory: originalInput.projectDirectory,
          };
        }
      }

      // Loaded here instead of at module top: the template-generator bundle
      // embeds all templates (~2.5 MB of source) and would slow CLI startup.
      const { validatePreflightConfig } = await import("@better-fullstack/template-generator");

      let config: ProjectConfig;
      if (cliInput.yes || cliInput.part?.length || hasConfigBase) {
        if (!silent) telemetrySource = "cli-flags";
        const flagConfig = processProvidedFlagsWithoutValidation(cliInput, finalBaseName);

        config = {
          ...getYesBaseConfig(flagConfig),
          ...flagConfig,
          projectName: finalBaseName,
          projectDir: finalResolvedPath,
          relativePath: currentPathInput,
          versionChannel,
        };

        validateConfigCompatibility(config, providedFlags, cliInput);

        const yesPreflight = validatePreflightConfig(config);
        if (yesPreflight.hasWarnings && !isSilent()) {
          displayPreflightWarnings(yesPreflight);
        }

        if (!isSilent()) {
          log.info(pc.yellow("Using default/flag options (config prompts skipped):"));
          log.message(displayConfig(config));
        }
      } else {
        const flagConfig = processAndValidateFlags(cliInput, providedFlags, finalBaseName);
        const { projectName: _projectNameFromFlags, ...otherFlags } = flagConfig;

        if (!isSilent() && Object.keys(otherFlags).length > 0) {
          log.info(pc.yellow("Using these pre-selected options:"));
          log.message(displayConfig(otherFlags));
          log.message("");
        }

        const gatheredConfig = await gatherConfig(
          flagConfig,
          finalBaseName,
          finalResolvedPath,
          currentPathInput,
        );
        config = { ...gatheredConfig, versionChannel };
        validateConfigCompatibility(config, providedFlags, cliInput);
      }

      normalizeKotlinJavaSelection(config);

      const preflight = validatePreflightConfig(config);
      if (preflight.hasWarnings && !isSilent()) {
        displayPreflightWarnings(preflight);
      }

      if (input.dryRun) {
        const { generateVirtualProject, EMBEDDED_TEMPLATES } =
          await import("@better-fullstack/template-generator");
        const result = await generateVirtualProject({
          config,
          templates: EMBEDDED_TEMPLATES,
        });

        if (!result.success || !result.tree) {
          throw new Error(result.error || "Failed to generate project templates");
        }

        const files: string[] = [];
        function walk(
          nodes: { type: string; name: string; children?: unknown[] }[],
          prefix: string,
        ) {
          for (const node of nodes) {
            const current = prefix ? `${prefix}/${node.name}` : node.name;
            if (node.type === "directory" && node.children) {
              walk(node.children as typeof nodes, current);
            } else {
              files.push(current);
            }
          }
        }
        walk(result.tree.root.children, "");

        if (!isSilent()) {
          log.info(
            pc.bold(
              pc.cyan(
                `Dry run complete — ${result.tree.fileCount} files in ${result.tree.directoryCount} directories`,
              ),
            ),
          );
          log.message("");
          log.message(pc.bold("Files that would be created:"));
          for (const file of files) {
            log.message(pc.dim(`  ${file}`));
          }
        }

        const reproducibleCommand = generateReproducibleCommand(config);
        if (!isSilent()) {
          log.message("");
          log.success(
            pc.blue(
              `You can reproduce this setup with the following command:\n${reproducibleCommand}`,
            ),
          );
        }

        const elapsedTimeMs = Date.now() - startTime;
        if (!isSilent()) {
          outro(pc.magenta("No files were written (dry run)."));
        }

        return {
          success: true,
          projectConfig: config,
          reproducibleCommand,
          timeScaffolded,
          elapsedTimeMs,
          projectDirectory: config.projectDir,
          relativePath: config.relativePath,
          dryRun: true,
          fileCount: result.tree.fileCount,
          directoryCount: result.tree.directoryCount,
          files,
        };
      }

      const createResult = await createProject(config, {
        manualDb: cliInput.manualDb ?? input.manualDb,
      });
      const setupFailures = createResult?.setupFailures ?? [];

      if (cliInput.verify ?? input.verify) {
        await runGeneratedChecks(config);
      }

      const reproducibleCommand = generateReproducibleCommand(config);
      if (!isSilent()) {
        log.success(
          pc.blue(
            `You can reproduce this setup with the following command:\n${reproducibleCommand}`,
          ),
        );
      }

      await trackProjectCreation(config, input.disableAnalytics, {
        source: telemetrySource,
        success: true,
        setupFailures: setupFailures.map((failure) => failure.step),
        durationMs: Date.now() - startTime,
      });
      try {
        await addToHistory(config, reproducibleCommand);
      } catch (historyError) {
        if (!isSilent()) {
          log.warn(
            pc.yellow(
              `Failed to write project history: ${historyError instanceof Error ? historyError.message : String(historyError)}`,
            ),
          );
        }
      }

      const elapsedTimeMs = Date.now() - startTime;
      if (!isSilent()) {
        const elapsedTimeInSeconds = (elapsedTimeMs / 1000).toFixed(2);
        if (setupFailures.length > 0) {
          const stepList = setupFailures.map((f) => f.step).join(", ");
          const installCmd =
            config.packageManager === "npm" ? "npm install" : `${config.packageManager} install`;
          log.warn(
            pc.yellow(
              `Project files were scaffolded in ${config.relativePath}, but ${setupFailures.length} setup step(s) did not complete: ${stepList}.\n` +
                `Review the errors above, then finish setup manually (for example, run '${installCmd}' inside the project).`,
            ),
          );
          outro(
            pc.yellow(
              `Project created with ${setupFailures.length} unfinished setup step(s) in ${pc.bold(elapsedTimeInSeconds)}s.`,
            ),
          );
        } else {
          outro(
            pc.magenta(`Project created successfully in ${pc.bold(elapsedTimeInSeconds)} seconds!`),
          );
        }
      }

      return {
        success: true,
        projectConfig: config,
        reproducibleCommand,
        timeScaffolded,
        elapsedTimeMs,
        projectDirectory: config.projectDir,
        relativePath: config.relativePath,
        setupFailures,
      };
    } catch (error) {
      if (error instanceof UserCancelledError) {
        if (isSilent()) {
          return {
            success: false,
            error: error.message,
            projectConfig: {} as ProjectConfig,
            reproducibleCommand: "",
            timeScaffolded,
            elapsedTimeMs: Date.now() - startTime,
            projectDirectory: "",
            relativePath: "",
          };
        }
        return;
      }
      // Only the error class name is sent — messages can contain paths.
      await trackEvent(
        "project_created",
        {},
        {
          source: telemetrySource,
          success: false,
          errorName: error instanceof Error ? error.name : "UnknownError",
          durationMs: Date.now() - startTime,
        },
        input.disableAnalytics,
      );
      if (error instanceof CLIError) {
        if (isSilent()) {
          return {
            success: false,
            error: error.message,
            projectConfig: {} as ProjectConfig,
            reproducibleCommand: "",
            timeScaffolded,
            elapsedTimeMs: Date.now() - startTime,
            projectDirectory: "",
            relativePath: "",
          };
        }
        throw error;
      }
      throw error;
    }
  });
}

async function handleDirectoryConflictProgrammatically(
  currentPathInput: string,
  strategy: DirectoryConflict,
) {
  const currentPath = path.resolve(process.cwd(), currentPathInput);

  if (!(await fs.pathExists(currentPath))) {
    return { finalPathInput: currentPathInput, shouldClearDirectory: false };
  }

  const dirContents = await fs.readdir(currentPath);
  const isNotEmpty = dirContents.length > 0;

  if (!isNotEmpty) {
    return { finalPathInput: currentPathInput, shouldClearDirectory: false };
  }

  switch (strategy) {
    case "overwrite":
      return { finalPathInput: currentPathInput, shouldClearDirectory: true };

    case "merge":
      return { finalPathInput: currentPathInput, shouldClearDirectory: false };

    case "increment": {
      let counter = 1;
      const baseName = currentPathInput;
      let finalPathInput = `${baseName}-${counter}`;

      while (
        (await fs.pathExists(path.resolve(process.cwd(), finalPathInput))) &&
        (await fs.readdir(path.resolve(process.cwd(), finalPathInput))).length > 0
      ) {
        counter++;
        finalPathInput = `${baseName}-${counter}`;
      }

      return { finalPathInput, shouldClearDirectory: false };
    }

    case "error":
      throw new Error(
        `Directory "${currentPathInput}" already exists and is not empty. Use directoryConflict: "overwrite", "merge", or "increment" to handle this.`,
      );

    default:
      throw new Error(`Unknown directory conflict strategy: ${strategy}`);
  }
}
