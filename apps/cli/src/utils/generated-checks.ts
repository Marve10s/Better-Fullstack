import { $ } from "execa";
import fs from "fs-extra";
import path from "node:path";

import type { ProjectConfig, StackPart, StackPartEcosystem } from "../types";

import { stackGraphToLegacyProjectConfigForEcosystem } from "../types";
import { commandExists } from "./command-exists";

export type GeneratedCheckCommand = {
  command: string;
  args: string[];
  display: string;
};

export type GeneratedCheckTarget = {
  id: string;
  role: "frontend" | "backend" | "mobile" | "database";
  ecosystem: StackPartEcosystem;
  toolId: string;
  projectDir: string;
  sourcePartId?: string;
};

export type GeneratedCheckResult = GeneratedCheckTarget & {
  status: "pass" | "fail";
  executed: boolean;
  toolchain: string;
  commands: GeneratedCheckCommand[];
  executedCommands: string[];
  reason: string;
};

export type GeneratedCheckExecution = {
  exitCode: number;
  signal?: string;
};

export type GeneratedCheckDependencies = {
  commandExists?: (command: string) => Promise<boolean>;
  execute?: (command: GeneratedCheckCommand & { cwd: string }) => Promise<GeneratedCheckExecution>;
  output?: "inherit" | "ignore";
};

const GENERATED_PRIMARY_ROLES = new Set(["frontend", "backend", "mobile", "database"]);
const SELF_BACKENDS = new Set([
  "self",
  "self-next",
  "self-vinext",
  "self-tanstack-start",
  "self-astro",
  "self-nuxt",
  "self-svelte",
  "self-solid-start",
]);

function isExecutableDatabasePart(config: ProjectConfig, part: StackPart): boolean {
  if (part.role !== "database") return true;
  // Mirrors template-generator/src/generator.ts: EdgeDB and Redis emit a DB
  // package without an ORM; other standalone databases receive README only.
  if (part.toolId === "edgedb" || part.toolId === "redis") return true;
  return (config.stackParts ?? []).some(
    (candidate) =>
      candidate.source !== "provided" &&
      candidate.role === "orm" &&
      candidate.toolId !== "none" &&
      candidate.ecosystem === "typescript",
  );
}

function isExecutablePrimaryPart(config: ProjectConfig, part: StackPart): boolean {
  if (part.ownerPartId || part.source === "provided" || part.toolId === "none") return false;
  if (!GENERATED_PRIMARY_ROLES.has(part.role)) return false;
  if (
    part.role === "backend" &&
    part.ecosystem === "typescript" &&
    SELF_BACKENDS.has(part.toolId)
  ) {
    return false;
  }
  return isExecutableDatabasePart(config, part);
}

function targetProjectDir(
  config: ProjectConfig,
  part: Pick<StackPart, "role" | "toolId" | "targetPath">,
  primaryCount: number,
): string {
  // Convex is generated as a workspace package, not the normal apps/server target.
  if (part.role === "backend" && part.toolId === "convex") {
    return path.join(config.projectDir, "packages/backend");
  }
  if (config.workspaceShape === "single-app" && primaryCount === 1) {
    return config.projectDir;
  }
  return path.join(config.projectDir, part.targetPath ?? ".");
}

/**
 * Enumerate every generated primary application target. Scoped graph parts are
 * capabilities owned by one of these targets and are checked with their owner.
 * Provided targets are intentionally excluded because Better Fullstack did not
 * generate their source.
 */
export function discoverGeneratedCheckTargets(config: ProjectConfig): GeneratedCheckTarget[] {
  const primary = (config.stackParts ?? []).filter((part) => isExecutablePrimaryPart(config, part));

  if ((config.stackParts ?? []).length > 0) {
    return primary
      .map((part) => ({
        id: part.id,
        role: part.role as GeneratedCheckTarget["role"],
        ecosystem: part.ecosystem,
        toolId: part.toolId,
        projectDir: targetProjectDir(config, part, primary.length),
        sourcePartId: part.id,
      }))
      .sort((a, b) => a.id.localeCompare(b.id));
  }

  return [
    {
      id: `project:${config.ecosystem}`,
      role: config.ecosystem === "react-native" ? "mobile" : "backend",
      ecosystem: config.ecosystem,
      toolId: config.ecosystem,
      projectDir: config.projectDir,
    },
  ];
}

export function assertGeneratedVerificationComplete(results: GeneratedCheckResult[]): void {
  const incomplete = results.filter(
    (result) =>
      result.status !== "pass" ||
      !result.executed ||
      result.commands.length === 0 ||
      result.executedCommands.length !== result.commands.length,
  );
  if (results.length === 0 || incomplete.length > 0) {
    const detail =
      results.length === 0
        ? "no generated targets were verified"
        : incomplete.map((result) => `${result.id}: ${result.reason}`).join("; ");
    throw new Error(`Generated project verification failed: ${detail}`);
  }
}

function display(command: string, args: string[]): GeneratedCheckCommand {
  return { command, args, display: [command, ...args].join(" ") };
}

function packageExec(packageManager: string, args: string[]): GeneratedCheckCommand {
  if (packageManager === "bun") return display("bun", ["x", ...args]);
  if (packageManager === "npm") return display("npm", ["exec", "--", ...args]);
  return display(packageManager, ["exec", ...args]);
}

export function configForGeneratedTarget(
  config: ProjectConfig,
  target: GeneratedCheckTarget,
): ProjectConfig {
  const projectable = new Set([
    "typescript",
    "react-native",
    "rust",
    "python",
    "go",
    "java",
    "elixir",
    "dotnet",
  ]);
  const source = (config.stackParts ?? []).find((part) => part.id === target.sourcePartId);
  if (!source || source.ownerPartId || !projectable.has(target.ecosystem)) return config;
  const excludedOwners = new Set(
    (config.stackParts ?? [])
      .filter(
        (part) =>
          part.role === source.role &&
          part.ecosystem === source.ecosystem &&
          !part.ownerPartId &&
          part.id !== source.id,
      )
      .map((part) => part.id),
  );
  const focused = {
    ...config,
    stackParts: (config.stackParts ?? []).filter(
      (part) => !excludedOwners.has(part.id) && !excludedOwners.has(part.ownerPartId ?? ""),
    ),
  };
  return projectable.has(target.ecosystem)
    ? stackGraphToLegacyProjectConfigForEcosystem(
        focused,
        target.ecosystem as Parameters<typeof stackGraphToLegacyProjectConfigForEcosystem>[1],
      )
    : config;
}

function pythonCommands(
  config: ProjectConfig,
  target: GeneratedCheckTarget,
): {
  toolchain: string;
  required: string[];
  commands: GeneratedCheckCommand[];
} {
  const projected = configForGeneratedTarget(config, target);
  const quality = projected.pythonQuality;
  const qualityArgs =
    quality === "ruff"
      ? ["ruff", "check", "."]
      : quality === "mypy"
        ? ["mypy"]
        : quality === "pyright"
          ? ["pyright"]
          : null;

  if (projected.pythonPackageManager === "poetry") {
    return {
      toolchain: "poetry",
      required: ["poetry"],
      commands: [
        display("poetry", ["run", "python", "-m", "compileall", "src"]),
        ...(qualityArgs ? [display("poetry", ["run", ...qualityArgs])] : []),
      ],
    };
  }
  if (projected.pythonPackageManager === "none") {
    const python = process.platform === "win32" ? ".venv\\Scripts\\python" : ".venv/bin/python";
    return {
      toolchain: "python virtual environment",
      required: [],
      commands: [
        display(python, ["-m", "compileall", "src"]),
        ...(qualityArgs ? [display(python, ["-m", qualityArgs[0]!, ...qualityArgs.slice(1)])] : []),
      ],
    };
  }
  return {
    toolchain: "uv",
    required: ["uv"],
    commands: [
      display("uv", ["run", "python", "-m", "compileall", "src"]),
      ...(qualityArgs ? [display("uv", ["run", ...qualityArgs])] : []),
    ],
  };
}

async function commandsForTarget(
  config: ProjectConfig,
  target: GeneratedCheckTarget,
): Promise<{
  toolchain: string;
  required: string[];
  commands: GeneratedCheckCommand[];
  error?: string;
}> {
  switch (target.ecosystem) {
    case "typescript":
    case "react-native": {
      const packageJsonPath = path.join(target.projectDir, "package.json");
      const pkg = (await fs.readJson(packageJsonPath).catch(() => null)) as {
        scripts?: Record<string, string>;
      } | null;
      if (!pkg) {
        return {
          toolchain: config.packageManager ?? "bun",
          required: [],
          commands: [],
          error: `Expected generated package.json at ${packageJsonPath}`,
        };
      }
      if (target.role === "backend" && target.toolId === "convex") {
        const packageManager = config.packageManager ?? "bun";
        return {
          toolchain: packageManager,
          required: [packageManager],
          commands: [
            packageExec(packageManager, ["tsc", "--noEmit", "-p", "convex/tsconfig.json"]),
          ],
        };
      }
      if (!pkg.scripts?.["check-types"]) {
        return {
          toolchain: config.packageManager ?? "bun",
          required: [],
          commands: [],
          error: `Generated target ${target.id} has no check-types script`,
        };
      }
      const packageManager = config.packageManager ?? "bun";
      return {
        toolchain: packageManager,
        required: [packageManager],
        commands: [display(packageManager, ["run", "check-types"])],
      };
    }
    case "go":
      return {
        toolchain: "go",
        required: ["go"],
        commands: [display("go", ["test", "-mod=readonly", "./..."])],
      };
    case "rust":
      return {
        toolchain: "cargo",
        required: ["cargo"],
        commands: [
          display("cargo", [
            "check",
            ...((await fs.pathExists(path.join(target.projectDir, "Cargo.lock")))
              ? ["--locked"]
              : []),
          ]),
        ],
      };
    case "python":
      return pythonCommands(config, target);
    case "elixir":
      return {
        toolchain: "mix",
        required: ["mix"],
        commands: [display("mix", ["deps.get"]), display("mix", ["compile"])],
      };
    case "java": {
      const buildTool = configForGeneratedTarget(config, target).javaBuildTool;
      if (buildTool === "gradle") {
        const wrapper = process.platform === "win32" ? "gradlew.bat" : "./gradlew";
        const hasWrapper = await fs.pathExists(
          path.join(target.projectDir, process.platform === "win32" ? "gradlew.bat" : "gradlew"),
        );
        return {
          toolchain: hasWrapper ? "Java + Gradle wrapper" : "Java + Gradle",
          required: ["java", ...(hasWrapper ? [] : ["gradle"])],
          commands: [display(hasWrapper ? wrapper : "gradle", ["test"])],
        };
      }
      if (buildTool === "maven") {
        const wrapper = process.platform === "win32" ? "mvnw.cmd" : "./mvnw";
        const hasWrapper = await fs.pathExists(
          path.join(target.projectDir, process.platform === "win32" ? "mvnw.cmd" : "mvnw"),
        );
        return {
          toolchain: hasWrapper ? "Java + Maven wrapper" : "Java + Maven",
          required: ["java", ...(hasWrapper ? [] : ["mvn"])],
          commands: [display(hasWrapper ? wrapper : "mvn", ["test"])],
        };
      }
      return {
        toolchain: "Java build tool",
        required: [],
        commands: [],
        error: "The generated Java target has no configured Maven or Gradle build tool",
      };
    }
    case "dotnet":
      return {
        toolchain: ".NET SDK",
        required: ["dotnet"],
        commands: [display("dotnet", ["build"])],
      };
    case "kotlin": {
      const wrapperName = process.platform === "win32" ? "gradlew.bat" : "gradlew";
      const wrapper = process.platform === "win32" ? "gradlew.bat" : "./gradlew";
      if (!(await fs.pathExists(path.join(target.projectDir, wrapperName)))) {
        return {
          toolchain: "Java + Gradle wrapper",
          required: ["java"],
          commands: [],
          error: `Generated Kotlin target is missing its Gradle wrapper: ${wrapperName}`,
        };
      }
      return {
        toolchain: "Java + Gradle wrapper",
        required: ["java"],
        commands: [display(wrapper, ["check"])],
      };
    }
    case "swift":
      return {
        toolchain: "XcodeGen + Xcode",
        required: ["xcodegen", "xcodebuild"],
        commands: [
          display("xcodegen", ["generate"]),
          display("xcodebuild", [
            "-project",
            "BetterFullstackApp.xcodeproj",
            "-scheme",
            "BetterFullstackApp",
            "-configuration",
            "Debug",
            "build",
          ]),
        ],
      };
    case "dart":
      return {
        toolchain: "Flutter",
        required: ["flutter"],
        commands: [display("flutter", ["analyze"]), display("flutter", ["test"])],
      };
    case "universal":
      if (target.role === "database") {
        const packageJsonPath = path.join(target.projectDir, "package.json");
        const pkg = (await fs.readJson(packageJsonPath).catch(() => null)) as {
          scripts?: Record<string, string>;
        } | null;
        if (pkg?.scripts?.["check-types"]) {
          const packageManager = config.packageManager ?? "bun";
          return {
            toolchain: packageManager,
            required: [packageManager],
            commands: [display(packageManager, ["run", "check-types"])],
          };
        }
        return {
          toolchain: config.packageManager ?? "bun",
          required: [],
          commands: [],
          error: `Generated database target ${target.id} has no check-types script at ${packageJsonPath}`,
        };
      }
      return {
        toolchain: "none",
        required: [],
        commands: [],
        error: `No executable check contract exists for generated universal target ${target.id}`,
      };
  }
}

async function defaultExecute(
  input: GeneratedCheckCommand & { cwd: string },
  output: "inherit" | "ignore",
): Promise<GeneratedCheckExecution> {
  const result = await $({
    cwd: input.cwd,
    reject: false,
    stdout: output,
    stderr: output,
  })`${input.command} ${input.args}`;
  return { exitCode: result.exitCode ?? 1, signal: result.signal };
}

export async function runGeneratedChecks(
  config: ProjectConfig,
  dependencies: GeneratedCheckDependencies = {},
): Promise<GeneratedCheckResult[]> {
  const targets = discoverGeneratedCheckTargets(config);
  const probe = dependencies.commandExists ?? commandExists;
  const execute =
    dependencies.execute ??
    ((command: GeneratedCheckCommand & { cwd: string }) =>
      defaultExecute(command, dependencies.output ?? "inherit"));

  async function checkTarget(target: GeneratedCheckTarget): Promise<GeneratedCheckResult> {
    if (!(await fs.pathExists(target.projectDir))) {
      return {
        ...target,
        status: "fail",
        executed: false,
        toolchain: "unknown",
        commands: [],
        executedCommands: [],
        reason: `Expected generated target directory is missing: ${target.projectDir}`,
      };
    }

    const plan = await commandsForTarget(config, target);
    if (plan.error) {
      return {
        ...target,
        status: "fail",
        executed: false,
        toolchain: plan.toolchain,
        commands: plan.commands,
        executedCommands: [],
        reason: plan.error,
      };
    }

    const missing: string[] = [];
    for (const tool of plan.required) {
      if (!(await probe(tool))) missing.push(tool);
    }
    if (target.ecosystem === "python" && plan.toolchain === "python virtual environment") {
      const python =
        process.platform === "win32" ? ".venv\\Scripts\\python.exe" : ".venv/bin/python";
      if (!(await fs.pathExists(path.join(target.projectDir, python)))) missing.push(python);
    }
    if (missing.length > 0) {
      return {
        ...target,
        status: "fail",
        executed: false,
        toolchain: plan.toolchain,
        commands: plan.commands,
        executedCommands: [],
        reason: `Required toolchain is unavailable: ${missing.join(", ")}`,
      };
    }

    const executedCommands: string[] = [];
    for (const command of plan.commands) {
      executedCommands.push(command.display);
      let result: GeneratedCheckExecution;
      try {
        result = await execute({ ...command, cwd: target.projectDir });
      } catch (error) {
        return {
          ...target,
          status: "fail",
          executed: true,
          toolchain: plan.toolchain,
          commands: plan.commands,
          executedCommands,
          reason: `${command.display} could not start: ${error instanceof Error ? error.message : String(error)}`,
        };
      }
      if (result.exitCode !== 0) {
        return {
          ...target,
          status: "fail",
          executed: true,
          toolchain: plan.toolchain,
          commands: plan.commands,
          executedCommands,
          reason: `${command.display} exited with code ${result.exitCode}${
            result.signal ? ` (${result.signal})` : ""
          }`,
        };
      }
    }

    return {
      ...target,
      status: "pass",
      executed: true,
      toolchain: plan.toolchain,
      commands: plan.commands,
      executedCommands,
      reason: `Executed ${executedCommands.join("; ")}`,
    };
  }

  const results: GeneratedCheckResult[] = [];
  // Deliberately serial: sorted target order is part of the check contract and
  // concurrent package/toolchain commands can contend for shared caches/files.
  for (const target of targets) {
    // eslint-disable-next-line no-await-in-loop -- deterministic isolation is required here
    results.push(await checkTarget(target));
  }
  return results;
}
