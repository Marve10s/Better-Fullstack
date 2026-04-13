import {
  createCliDefaultProjectConfigBase,
  type CliDefaultProjectConfigBase,
  type PackageManager,
} from "@better-fullstack/types";

import { TECH_OPTIONS } from "@/lib/constant";
import { stackStateToProjectConfig } from "@/lib/preview-config";
import { DEFAULT_STACK, type StackState } from "@/lib/stack-defaults";
import { createStackSearchParams } from "@/lib/stack-url-state.shared";

const PACKAGE_MANAGER_COMMANDS = {
  npm: "npx create-better-fullstack@latest",
  pnpm: "pnpm create better-fullstack@latest",
  yarn: "yarn create better-fullstack@latest",
  default: "bun create better-fullstack@latest",
};

// TypeScript ecosystem category order
const TYPESCRIPT_CATEGORY_ORDER: Array<keyof typeof TECH_OPTIONS> = [
  "webFrontend",
  "nativeFrontend",
  "astroIntegration",
  "cssFramework",
  "uiLibrary",
  "shadcnBase",
  "shadcnStyle",
  "shadcnIconLibrary",
  "shadcnColorTheme",
  "shadcnBaseColor",
  "shadcnFont",
  "shadcnRadius",
  "backend",
  "backendLibraries",
  "runtime",
  "api",
  "database",
  "orm",
  "dbSetup",
  "webDeploy",
  "serverDeploy",
  "auth",
  "payments",
  "email",
  "fileUpload",
  "logging",
  "observability",
  "featureFlags",
  "analytics",
  "ai",
  "stateManagement",
  "forms",
  "validation",
  "testing",
  "realtime",
  "jobQueue",
  "caching",
  "i18n",
  "search",
  "fileStorage",
  "animation",
  "cms",
  "codeQuality",
  "documentation",
  "appPlatforms",
  "packageManager",
  "examples",
  "aiDocs",
  "versionChannel",
  "git",
  "install",
];

// Rust ecosystem category order
const RUST_CATEGORY_ORDER: Array<keyof typeof TECH_OPTIONS> = [
  "rustWebFramework",
  "rustFrontend",
  "rustOrm",
  "rustApi",
  "rustCli",
  "rustLibraries",
  "rustLogging",
  "rustErrorHandling",
  "rustCaching",
  "rustAuth",
  "aiDocs",
  "git",
  "install",
];

// Python ecosystem category order
const PYTHON_CATEGORY_ORDER: Array<keyof typeof TECH_OPTIONS> = [
  "pythonWebFramework",
  "pythonOrm",
  "pythonValidation",
  "pythonAi",
  "pythonAuth",
  "pythonTaskQueue",
  "pythonGraphql",
  "pythonQuality",
  "aiDocs",
  "git",
  "install",
];

// Go ecosystem category order
const GO_CATEGORY_ORDER: Array<keyof typeof TECH_OPTIONS> = [
  "goWebFramework",
  "goOrm",
  "goApi",
  "goCli",
  "goLogging",
  "goAuth",
  "auth",
  "aiDocs",
  "git",
  "install",
];

// Combined category order for backwards compatibility
const CATEGORY_ORDER = [
  ...new Set([
    ...TYPESCRIPT_CATEGORY_ORDER,
    ...RUST_CATEGORY_ORDER,
    ...PYTHON_CATEGORY_ORDER,
    ...GO_CATEGORY_ORDER,
  ]),
] as Array<keyof typeof TECH_OPTIONS>;

const RUST_CONFIG_KEYS = [
  "rustWebFramework",
  "rustFrontend",
  "rustOrm",
  "rustApi",
  "rustCli",
  "rustLibraries",
  "rustLogging",
  "rustErrorHandling",
  "rustCaching",
] as const satisfies readonly (keyof CliDefaultProjectConfigBase)[];

const PYTHON_CONFIG_KEYS = [
  "pythonWebFramework",
  "pythonOrm",
  "pythonValidation",
  "pythonAi",
  "pythonAuth",
  "pythonTaskQueue",
  "pythonGraphql",
  "pythonQuality",
] as const satisfies readonly (keyof CliDefaultProjectConfigBase)[];

const GO_CONFIG_KEYS = [
  "goWebFramework",
  "goOrm",
  "goApi",
  "goCli",
  "goLogging",
  "goAuth",
] as const satisfies readonly (keyof CliDefaultProjectConfigBase)[];

function formatArrayFlag(flag: string, values: readonly string[]) {
  const filteredValues = [...new Set(values.filter((value) => value !== "none"))];
  return `--${flag} ${filteredValues.join(" ") || "none"}`;
}

function areStringArraysEqual(left: readonly string[], right: readonly string[]) {
  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();

  return (
    sortedLeft.length === sortedRight.length &&
    sortedLeft.every((value, index) => value === sortedRight[index])
  );
}

function isCliDefaultStack(stack: StackState, projectName: string) {
  const comparableConfig: CliDefaultProjectConfigBase = {
    ...stackStateToProjectConfig({ ...stack, projectName }),
    relativePath: projectName,
    install: stack.install === "true",
  };
  const cliDefaults = {
    ...createCliDefaultProjectConfigBase(stack.packageManager as PackageManager),
    projectName,
    relativePath: projectName,
  };
  const ignoredKeys =
    stack.ecosystem === "typescript"
      ? new Set<keyof CliDefaultProjectConfigBase>([
          ...RUST_CONFIG_KEYS,
          ...PYTHON_CONFIG_KEYS,
          ...GO_CONFIG_KEYS,
        ])
      : new Set<keyof CliDefaultProjectConfigBase>();

  return (Object.keys(cliDefaults) as Array<keyof CliDefaultProjectConfigBase>).every((key) => {
    if (ignoredKeys.has(key)) {
      return true;
    }

    const currentValue = comparableConfig[key];
    const defaultValue = cliDefaults[key];

    if (Array.isArray(currentValue) && Array.isArray(defaultValue)) {
      return areStringArraysEqual(currentValue, defaultValue);
    }

    return currentValue === defaultValue;
  });
}

export function generateStackSummary(stack: StackState) {
  const selectedTechs = CATEGORY_ORDER.flatMap((category) => {
    const options = TECH_OPTIONS[category];
    const selectedValue = stack[category as keyof StackState];

    if (!options) return [];

    const getTechNames = (value: string | string[]) => {
      const values = Array.isArray(value) ? value : [value];
      return values
        .filter(
          (id) =>
            id !== "none" &&
            id !== "false" &&
            !(category === "versionChannel" && id === DEFAULT_STACK.versionChannel) &&
            !(["git", "install", "auth"].includes(category) && id === "true"),
        )
        .map((id) => options.find((opt) => opt.id === id)?.name)
        .filter(Boolean) as string[];
    };

    return selectedValue ? getTechNames(selectedValue) : [];
  });

  return selectedTechs.length > 0 ? selectedTechs.join(" • ") : "Custom stack";
}

export function generateStackCommand(stack: StackState) {
  const projectName = stack.projectName || "my-app";

  // Handle Rust ecosystem
  if (stack.ecosystem === "rust") {
    return generateRustCommand(stack, projectName);
  }

  // Handle Python ecosystem
  if (stack.ecosystem === "python") {
    return generatePythonCommand(stack, projectName);
  }

  // Handle Go ecosystem
  if (stack.ecosystem === "go") {
    return generateGoCommand(stack, projectName);
  }

  // TypeScript ecosystem
  const base =
    PACKAGE_MANAGER_COMMANDS[stack.packageManager as keyof typeof PACKAGE_MANAGER_COMMANDS] ||
    PACKAGE_MANAGER_COMMANDS.default;

  const isStackDefaultExceptProjectName = isCliDefaultStack(stack, projectName);

  if (isStackDefaultExceptProjectName) {
    return `${base} ${projectName} --yes`;
  }

  // Map web interface backend IDs to CLI backend flags
  const mapBackendToCli = (backend: string) => {
    if (
      backend === "self-next" ||
      backend === "self-tanstack-start" ||
      backend === "self-astro" ||
      backend === "self-nuxt" ||
      backend === "self-svelte" ||
      backend === "self-solid-start"
    ) {
      return "self";
    }
    return backend;
  };

  const flags = [
    `--ecosystem typescript`,
    `--frontend ${
      [...stack.webFrontend, ...stack.nativeFrontend]
        .filter((v, _, arr) => v !== "none" || arr.length === 1)
        .join(" ") || "none"
    }`,
    // Add astro-integration flag only when Astro is selected
    ...(stack.webFrontend.includes("astro") && stack.astroIntegration !== "none"
      ? [`--astro-integration ${stack.astroIntegration}`]
      : []),
    `--css-framework ${stack.cssFramework}`,
    `--ui-library ${stack.uiLibrary}`,
    // Add shadcn/ui sub-options only when shadcn-ui is selected
    ...(stack.uiLibrary === "shadcn-ui"
      ? [
          `--shadcn-base ${stack.shadcnBase}`,
          `--shadcn-style ${stack.shadcnStyle}`,
          `--shadcn-icon-library ${stack.shadcnIconLibrary}`,
          `--shadcn-color-theme ${stack.shadcnColorTheme}`,
          `--shadcn-base-color ${stack.shadcnBaseColor}`,
          `--shadcn-font ${stack.shadcnFont}`,
          `--shadcn-radius ${stack.shadcnRadius}`,
        ]
      : []),
    `--backend ${mapBackendToCli(stack.backend)}`,
    `--runtime ${
      mapBackendToCli(stack.backend) === "self" ||
      stack.backend === "convex" ||
      stack.backend === "none"
        ? "none"
        : stack.runtime
    }`,
    `--api ${stack.api}`,
    `--auth ${stack.auth}`,
    `--payments ${stack.payments}`,
    `--email ${stack.email}`,
    `--file-upload ${stack.fileUpload}`,
    `--logging ${stack.logging}`,
    `--observability ${stack.observability}`,
    `--realtime ${stack.realtime}`,
    `--job-queue ${stack.jobQueue}`,
    `--caching ${stack.caching}`,
    `--i18n ${stack.i18n}`,
    `--search ${stack.search}`,
    `--file-storage ${stack.fileStorage}`,
    `--cms ${stack.cms}`,
    `--effect ${stack.backendLibraries}`,
    `--ai ${stack.aiSdk}`,
    `--state-management ${stack.stateManagement}`,
    `--forms ${stack.forms}`,
    `--validation ${stack.validation}`,
    `--testing ${stack.testing}`,
    `--animation ${stack.animation}`,
    `--database ${stack.database}`,
    `--orm ${stack.orm}`,
    `--db-setup ${stack.dbSetup}`,
    `--package-manager ${stack.packageManager}`,
    ...(stack.versionChannel !== DEFAULT_STACK.versionChannel
      ? [`--version-channel ${stack.versionChannel}`]
      : []),
    stack.git === "false" ? "--no-git" : "--git",
    `--web-deploy ${stack.webDeploy}`,
    `--server-deploy ${stack.serverDeploy}`,
    stack.install === "false" ? "--no-install" : "--install",
    `--addons ${
      [...stack.codeQuality, ...stack.documentation, ...stack.appPlatforms].length > 0
        ? [...stack.codeQuality, ...stack.documentation, ...stack.appPlatforms]
            .filter((addon) =>
              [
                "pwa",
                "tauri",
                "starlight",
                "biome",
                "lefthook",
                "husky",
                "turborepo",
                "ultracite",
                "fumadocs",
                "oxlint",
                "ruler",
                "opentui",
                "mcp",
                "skills",
                "wxt",
                "msw",
                "storybook",
                "tanstack-query",
                "tanstack-table",
                "tanstack-virtual",
                "tanstack-db",
                "tanstack-pacer",
              ].includes(addon),
            )
            .join(" ") || "none"
        : "none"
    }`,
    formatArrayFlag("examples", stack.examples),
    formatArrayFlag("ai-docs", stack.aiDocs),
  ];

  if (stack.yolo === "true") {
    flags.push("--yolo");
  }

  return `${base} ${projectName} ${flags.join(" ")}`;
}

function generateRustCommand(stack: StackState, projectName: string) {
  const base =
    PACKAGE_MANAGER_COMMANDS[stack.packageManager as keyof typeof PACKAGE_MANAGER_COMMANDS] ||
    PACKAGE_MANAGER_COMMANDS.default;

  const flags: string[] = [
    `--ecosystem rust`,
    `--rust-web-framework ${stack.rustWebFramework}`,
    `--rust-frontend ${stack.rustFrontend}`,
    `--rust-orm ${stack.rustOrm}`,
    `--rust-api ${stack.rustApi}`,
    `--rust-cli ${stack.rustCli}`,
    formatArrayFlag("rust-libraries", stack.rustLibraries),
    `--rust-logging ${stack.rustLogging}`,
    `--rust-error-handling ${stack.rustErrorHandling}`,
    `--rust-caching ${stack.rustCaching}`,
  ];

  if (stack.rustAuth !== "none") {
    flags.push(`--rust-auth ${stack.rustAuth}`);
  }
  flags.push(formatArrayFlag("ai-docs", stack.aiDocs));
  if (stack.git === "false") {
    flags.push("--no-git");
  }
  if (stack.install === "false") {
    flags.push("--no-install");
  }

  return `${base} ${projectName} ${flags.join(" ")}`;
}

function generatePythonCommand(stack: StackState, projectName: string) {
  const base =
    PACKAGE_MANAGER_COMMANDS[stack.packageManager as keyof typeof PACKAGE_MANAGER_COMMANDS] ||
    PACKAGE_MANAGER_COMMANDS.default;

  const flags: string[] = [
    `--ecosystem python`,
    `--python-web-framework ${stack.pythonWebFramework}`,
    `--python-orm ${stack.pythonOrm}`,
    `--python-validation ${stack.pythonValidation}`,
  ];

  // Omitting this flag makes the CLI treat Python AI as unspecified and re-open the prompt.
  flags.push(formatArrayFlag("python-ai", stack.pythonAi));
  flags.push(`--python-auth ${stack.pythonAuth}`);
  flags.push(`--python-task-queue ${stack.pythonTaskQueue}`);
  flags.push(`--python-graphql ${stack.pythonGraphql}`);
  flags.push(`--python-quality ${stack.pythonQuality}`);
  flags.push(formatArrayFlag("ai-docs", stack.aiDocs));
  if (stack.git === "false") {
    flags.push("--no-git");
  }
  if (stack.install === "false") {
    flags.push("--no-install");
  }

  return `${base} ${projectName} ${flags.join(" ")}`;
}

function generateGoCommand(stack: StackState, projectName: string) {
  const base =
    PACKAGE_MANAGER_COMMANDS[stack.packageManager as keyof typeof PACKAGE_MANAGER_COMMANDS] ||
    PACKAGE_MANAGER_COMMANDS.default;

  const flags: string[] = [
    `--ecosystem go`,
    `--go-web-framework ${stack.goWebFramework}`,
    `--go-orm ${stack.goOrm}`,
    `--go-api ${stack.goApi}`,
    `--go-cli ${stack.goCli}`,
    `--go-logging ${stack.goLogging}`,
    `--go-auth ${stack.goAuth}`,
    `--auth ${stack.auth}`,
  ];

  if (stack.aiDocs.length > 0 && !stack.aiDocs.includes("none")) {
    flags.push(`--ai-docs ${stack.aiDocs.join(" ")}`);
  }
  if (stack.git === "false") {
    flags.push("--no-git");
  }
  if (stack.install === "false") {
    flags.push("--no-install");
  }

  return `${base} ${projectName} ${flags.join(" ")}`;
}

export function generateStackUrlFromState(stack: StackState, baseUrl?: string) {
  const origin = baseUrl || "https://better-fullstack-web.vercel.app";

  const stackParams = createStackSearchParams(stack, { includeDefaults: true });
  const searchString = stackParams.toString();
  return `${origin}/new${searchString ? `?${searchString}` : ""}`;
}

export function generateStackSharingUrl(stack: StackState, baseUrl?: string) {
  const origin = baseUrl || "https://better-fullstack-web.vercel.app";

  const stackParams = createStackSearchParams(stack, { includeDefaults: true });
  const searchString = stackParams.toString();
  return `${origin}/stack${searchString ? `?${searchString}` : ""}`;
}

export {
  CATEGORY_ORDER,
  TYPESCRIPT_CATEGORY_ORDER,
  RUST_CATEGORY_ORDER,
  PYTHON_CATEGORY_ORDER,
  GO_CATEGORY_ORDER,
};
