import type { Dirent } from "node:fs";

import fs from "fs-extra";
import path from "node:path";

import type { BetterTStackConfig, ProjectConfig } from "@/types";

import { formatStackPartSpec, legacyProjectConfigToStackParts } from "@/types";
import { readBtsConfig } from "@/config/bts-config";
import {
  configForGeneratedTarget,
  discoverGeneratedCheckTargets,
  runGeneratedChecks,
  type GeneratedCheckDependencies,
  type GeneratedCheckResult,
  type GeneratedCheckTarget,
} from "@/project/generated-checks";
import { getLatestCLIVersion } from "@/platform/get-latest-cli-version";
import { readScaffoldManifestResult } from "@/lifecycle/scaffold-manifest";

export type ProjectCheckStatus = "pass" | "warn" | "fail";

export type ProjectCheck = {
  label: string;
  status: ProjectCheckStatus;
  detail?: string;
  targetId?: string;
};

export type LifecyclePrerequisites = {
  manifest: {
    present: boolean;
    state: "missing" | "valid" | "invalid";
    version?: string;
    error?: string;
    currentContractSupported: boolean;
  };
  config: {
    version?: string;
    currentVersion: string;
    exactCurrentVersion: boolean;
  };
  wave1: {
    ready: boolean;
    generatorProvenance: "verified" | "unverified";
    recovery: "available" | "unavailable";
    blockers: string[];
  };
};

export type ProjectStatusResult = {
  success: true;
  projectDir: string;
  ecosystem: BetterTStackConfig["ecosystem"];
  graphSummary?: string;
  stackPartSpecs: string[];
  ok: boolean;
  verification: {
    requested: boolean;
    complete: boolean;
    expectedTargets: number;
    executedTargets: number;
    failedTargets: number;
  };
  summary: Record<ProjectCheckStatus, number>;
  checks: ProjectCheck[];
  targets: GeneratedCheckResult[];
  prerequisites: LifecyclePrerequisites;
};

export type ProjectStatusFailure = {
  success: false;
  projectDir: string;
  ok: false;
  error: string;
};

export type InspectProjectOptions = {
  runChecks?: boolean;
  generatedChecks?: GeneratedCheckDependencies;
  generatedCheckRunner?: (
    config: ProjectConfig,
    dependencies?: GeneratedCheckDependencies,
  ) => Promise<GeneratedCheckResult[]>;
};

const IGNORED_DIRECTORIES = new Set([
  "node_modules",
  ".git",
  ".bts",
  "dist",
  "build",
  ".next",
  ".expo",
  ".turbo",
  "target",
  ".venv",
  "deps",
  "_build",
]);

const JS_LOCKFILES = ["bun.lock", "bun.lockb", "pnpm-lock.yaml", "package-lock.json", "yarn.lock"];

async function checkInstalledDependencies(
  projectDir: string,
  config: BetterTStackConfig,
): Promise<ProjectCheck[]> {
  if (!(await fs.pathExists(path.join(projectDir, "package.json")))) return [];

  const lockfile = JS_LOCKFILES.find((name) => fs.existsSync(path.join(projectDir, name)));
  const nodeModulesExists = await fs.pathExists(path.join(projectDir, "node_modules"));
  return [
    lockfile
      ? { label: "Lockfile", status: "pass", detail: lockfile }
      : {
          label: "Lockfile",
          status: "warn",
          detail: "No JavaScript lockfile found at the project root",
        },
    nodeModulesExists
      ? { label: "node_modules", status: "pass" }
      : {
          label: "node_modules",
          status: "fail",
          detail: `Dependencies are not installed. Run \`${config.packageManager ?? "npm"} install\`.`,
        },
  ];
}

function targetCheck(
  target: GeneratedCheckTarget,
  label: string,
  status: ProjectCheckStatus,
  detail?: string,
): ProjectCheck {
  return { label: `${target.id}: ${label}`, status, detail, targetId: target.id };
}

async function expectedFileCheck(
  target: GeneratedCheckTarget,
  relativePath: string,
  missingStatus: ProjectCheckStatus,
  missingDetail: string,
): Promise<ProjectCheck> {
  return (await fs.pathExists(path.join(target.projectDir, relativePath)))
    ? targetCheck(target, relativePath, "pass")
    : targetCheck(target, relativePath, missingStatus, missingDetail);
}

async function checkNativeTargetDependencies(
  config: ProjectConfig,
  target: GeneratedCheckTarget,
): Promise<ProjectCheck[]> {
  const projected = configForGeneratedTarget(config, target);
  switch (target.ecosystem) {
    case "rust":
      return [
        await expectedFileCheck(target, "Cargo.toml", "fail", "Generated Rust manifest is missing"),
        await expectedFileCheck(
          target,
          "Cargo.lock",
          "warn",
          "Run `cargo build` to resolve dependencies",
        ),
      ];
    case "go":
      return [
        await expectedFileCheck(
          target,
          "go.mod",
          "fail",
          "Generated Go module manifest is missing",
        ),
        await expectedFileCheck(
          target,
          "go.sum",
          "warn",
          "Run `go mod tidy` to resolve dependencies",
        ),
      ];
    case "python": {
      const manager = projected.pythonPackageManager;
      if (manager === "poetry") {
        return [
          await expectedFileCheck(
            target,
            "pyproject.toml",
            "fail",
            "Generated Python manifest is missing",
          ),
          await expectedFileCheck(
            target,
            "poetry.lock",
            "warn",
            "Run `poetry install` to resolve dependencies",
          ),
        ];
      }
      if (manager === "none") {
        return [
          await expectedFileCheck(
            target,
            "pyproject.toml",
            "fail",
            "Generated Python manifest is missing",
          ),
          await expectedFileCheck(
            target,
            ".venv",
            "warn",
            "Missing .venv — generated checks provision it, or create it and install project dependencies",
          ),
        ];
      }
      return [
        await expectedFileCheck(
          target,
          "pyproject.toml",
          "fail",
          "Generated Python manifest is missing",
        ),
        await expectedFileCheck(
          target,
          "uv.lock",
          "warn",
          "Run `uv sync --extra dev` to resolve dependencies",
        ),
      ];
    }
    case "elixir":
      return [
        await expectedFileCheck(
          target,
          "mix.exs",
          "fail",
          "Generated Mix project manifest is missing",
        ),
        await expectedFileCheck(
          target,
          "mix.lock",
          "warn",
          "Run `mix deps.get` to resolve dependencies",
        ),
      ];
    case "java": {
      const buildTool = projected.javaBuildTool;
      if (buildTool === "gradle") {
        const descriptor = (await fs.pathExists(path.join(target.projectDir, "build.gradle.kts")))
          ? "build.gradle.kts"
          : "build.gradle";
        return [
          await expectedFileCheck(
            target,
            descriptor,
            "fail",
            "Generated Gradle build descriptor is missing",
          ),
          await expectedFileCheck(
            target,
            process.platform === "win32" ? "gradlew.bat" : "gradlew",
            "warn",
            "Gradle wrapper is missing; checks require an installed Gradle toolchain",
          ),
        ];
      }
      if (buildTool === "maven") {
        return [
          await expectedFileCheck(
            target,
            "pom.xml",
            "fail",
            "Generated Maven project descriptor is missing",
          ),
        ];
      }
      return [
        await expectedFileCheck(
          target,
          "src",
          "fail",
          "Generated Java source directory is missing",
        ),
      ];
    }
    case "dotnet": {
      const entries = await fs.readdir(target.projectDir).catch(() => [] as string[]);
      const projectFile = entries.find((entry) => entry.endsWith(".csproj"));
      return [
        projectFile
          ? targetCheck(target, projectFile, "pass")
          : targetCheck(target, "*.csproj", "fail", "Generated .NET project descriptor is missing"),
      ];
    }
    case "kotlin":
      return [
        await expectedFileCheck(
          target,
          "build.gradle.kts",
          "fail",
          "Generated Kotlin Gradle descriptor is missing",
        ),
        await expectedFileCheck(
          target,
          process.platform === "win32" ? "gradlew.bat" : "gradlew",
          "fail",
          "Generated Kotlin Gradle wrapper is missing",
        ),
      ];
    default:
      return [];
  }
}

async function findEnvExampleFiles(rootDir: string): Promise<string[]> {
  const results: string[] = [];

  async function walk(dir: string, depth: number): Promise<void> {
    if (depth > 5) return;
    let entries: Dirent[];
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (IGNORED_DIRECTORIES.has(entry.name)) continue;
        await walk(path.join(dir, entry.name), depth + 1);
      } else if (entry.name === ".env.example") {
        results.push(path.join(dir, entry.name));
      }
    }
  }

  await walk(rootDir, 0);
  return results;
}

function parseEnvKeys(content: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const equals = line.indexOf("=");
    if (equals === -1) continue;
    const key = line.slice(0, equals).trim();
    if (key) map.set(key, line.slice(equals + 1).trim());
  }
  return map;
}

async function checkEnvFiles(projectDir: string): Promise<ProjectCheck[]> {
  const checks: ProjectCheck[] = [];
  for (const examplePath of await findEnvExampleFiles(projectDir)) {
    const envPath = examplePath.replace(/\.example$/, "");
    const relExample = path.relative(projectDir, examplePath) || ".env.example";
    const exampleKeys = parseEnvKeys(await fs.readFile(examplePath, "utf-8"));
    if (exampleKeys.size === 0) continue;

    if (!(await fs.pathExists(envPath))) {
      checks.push({
        label: relExample,
        status: "warn",
        detail: `Missing ${path.relative(projectDir, envPath)} (copy from .env.example and fill in values)`,
      });
      continue;
    }

    const envKeys = parseEnvKeys(await fs.readFile(envPath, "utf-8"));
    const missing = [...exampleKeys.keys()].filter((key) => !envKeys.get(key));
    checks.push(
      missing.length > 0
        ? {
            label: path.relative(projectDir, envPath),
            status: "warn",
            detail: `Missing or empty: ${missing.join(", ")}`,
          }
        : { label: path.relative(projectDir, envPath), status: "pass" },
    );
  }
  return checks;
}

export async function getLifecyclePrerequisites(
  projectDir: string,
): Promise<LifecyclePrerequisites> {
  const [manifestResult, config] = await Promise.all([
    readScaffoldManifestResult(projectDir),
    readBtsConfig(projectDir),
  ]);
  const currentVersion = getLatestCLIVersion();
  const manifest = manifestResult.status === "valid" ? manifestResult.manifest : null;
  const migratedFromV1 =
    manifestResult.status === "valid" && manifestResult.migratedFromVersion === "1";
  const provenanceVerified =
    manifest?.provenance.state === "verified" && manifest.provenance.current !== null;
  const blockers = [
    ...(manifestResult.status === "missing"
      ? ["A versioned scaffold manifest is required for lifecycle apply and recovery."]
      : []),
    ...(manifestResult.status === "invalid" ? [manifestResult.error] : []),
    ...(migratedFromV1
      ? [
          "Manifest v1 was migrated deterministically, but its original generator lineage remains unverified.",
        ]
      : []),
    ...(manifest && !migratedFromV1 && !provenanceVerified
      ? ["This project was adopted without cryptographically trustworthy generator lineage."]
      : []),
  ];
  return {
    manifest: {
      present: manifestResult.status !== "missing",
      state: manifestResult.status,
      version: manifestResult.status === "valid" ? manifestResult.manifest.version : undefined,
      error: manifestResult.status === "invalid" ? manifestResult.error : undefined,
      currentContractSupported:
        manifestResult.status === "valid" && manifestResult.manifest.version === "2",
    },
    config: {
      version: config?.version,
      currentVersion,
      exactCurrentVersion: config?.version === currentVersion,
    },
    wave1: {
      ready: manifest !== null && blockers.length === 0,
      generatorProvenance: provenanceVerified ? "verified" : "unverified",
      recovery: manifest === null ? "unavailable" : "available",
      blockers,
    },
  };
}

export async function inspectProject(
  projectDirInput: string,
  options: InspectProjectOptions = {},
): Promise<ProjectStatusResult | ProjectStatusFailure> {
  const projectDir = path.resolve(projectDirInput);
  const btsConfig = await readBtsConfig(projectDir);
  if (!btsConfig) {
    return {
      success: false,
      projectDir,
      ok: false,
      error: "No Better Fullstack project found (bts.jsonc missing or invalid).",
    };
  }

  const checks: ProjectCheck[] = [
    { label: "bts.jsonc", status: "pass", detail: `version ${btsConfig.version}` },
    ...(await checkInstalledDependencies(projectDir, btsConfig)),
    ...(await checkEnvFiles(projectDir)),
  ];
  const config = { ...btsConfig, projectDir } as unknown as ProjectConfig;
  const stackParts =
    btsConfig.stackParts === undefined
      ? legacyProjectConfigToStackParts(btsConfig)
      : btsConfig.stackParts;
  const expectedTargets = await discoverGeneratedCheckTargets(config);
  for (const target of expectedTargets) {
    checks.push(...(await checkNativeTargetDependencies(config, target)));
  }
  const targets = options.runChecks
    ? await (options.generatedCheckRunner ?? runGeneratedChecks)(config, options.generatedChecks)
    : [];

  const expectedTargetIds = expectedTargets.map((target) => target.id);
  const returnedTargetIds = targets.map((target) => target.id);
  const targetMatrixMatches =
    expectedTargetIds.length === returnedTargetIds.length &&
    expectedTargetIds.every((targetId, index) => targetId === returnedTargetIds[index]);
  if (options.runChecks && expectedTargets.length === 0) {
    checks.push({
      label: "generated verification",
      status: "fail",
      detail: "The explicit stack graph has no executable generated target contract.",
    });
  } else if (options.runChecks && !targetMatrixMatches) {
    checks.push({
      label: "generated verification",
      status: "fail",
      detail: `Target matrix was incomplete. Expected [${expectedTargetIds.join(", ")}], received [${returnedTargetIds.join(", ")}].`,
    });
  }

  for (const target of targets) {
    checks.push({
      label: `generated target ${target.id}`,
      status: target.status,
      targetId: target.id,
      detail: `${target.toolchain}: ${target.reason}`,
    });
  }

  const summary: Record<ProjectCheckStatus, number> = { pass: 0, warn: 0, fail: 0 };
  for (const check of checks) summary[check.status] += 1;
  const executedTargets = targets.filter((target) => target.executed).length;
  const failedTargets = targets.filter((target) => target.status === "fail").length;
  const verificationComplete =
    Boolean(options.runChecks) &&
    expectedTargets.length > 0 &&
    targetMatrixMatches &&
    executedTargets === targets.length &&
    failedTargets === 0 &&
    targets.every(
      (target) =>
        target.commands.length > 0 && target.executedCommands.length === target.commands.length,
    );

  return {
    success: true,
    projectDir,
    ecosystem: btsConfig.ecosystem,
    graphSummary: btsConfig.graphSummary,
    stackPartSpecs: stackParts
      .filter((part) => part.source !== "provided" && part.toolId !== "none")
      .map((part) => formatStackPartSpec(part, stackParts))
      .sort(),
    ok: summary.fail === 0 && (!options.runChecks || verificationComplete),
    verification: {
      requested: Boolean(options.runChecks),
      complete: verificationComplete,
      expectedTargets: expectedTargets.length,
      executedTargets,
      failedTargets,
    },
    summary,
    checks,
    targets,
    prerequisites: await getLifecyclePrerequisites(projectDir),
  };
}
