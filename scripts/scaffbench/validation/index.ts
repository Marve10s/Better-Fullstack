import * as Effect from "effect/Effect";
import * as Duration from "effect/Duration";
import * as Option from "effect/Option";
import { existsSync, readdirSync } from "node:fs";
import { cp, mkdir, mkdtemp, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import type {
  BenchmarkSpec,
  CommandResult,
  ProjectValidation,
  RunResult,
  ScaffbenchOptions,
  StepResult,
} from "@/types";

import { runCommand, tail } from "@/agents/command";
import {
  bfSpec,
  VALIDATION_PROJECT_TIMEOUT_MS,
  VALIDATION_ROOT_CAP,
  VALIDATION_TIMEOUT_MS,
} from "@/constants";
import { typecheckGate } from "@/scoring";
import { hasTransientNetworkSignature } from "@/validation/classification";
import { parseJsonc, walk } from "@/validation/shared";

function fromPromise<A>(evaluate: () => Promise<A>) {
  return Effect.tryPromise({ try: evaluate, catch: (cause) => cause });
}

type CommandStepOptions = {
  retryTransientNetwork?: boolean;
  env?: Record<string, string>;
};

export function commandStep(
  command: string,
  args: readonly string[],
  cwd: string,
  options: CommandStepOptions = {},
) {
  return Effect.gen(function* () {
    const first = toStep(
      yield* runCommand(command, args, cwd, VALIDATION_TIMEOUT_MS, { env: options.env }),
    );
    if (
      !options.retryTransientNetwork ||
      first.exitCode === 0 ||
      !hasTransientNetworkSignature(first)
    ) {
      return first;
    }
    const retry = toStep(
      yield* runCommand(command, args, cwd, VALIDATION_TIMEOUT_MS, { env: options.env }),
    );
    return {
      ...retry,
      durationMs: first.durationMs + retry.durationMs,
      retryCount: 1,
      transientNetwork:
        retry.exitCode !== 0 && hasTransientNetworkSignature(retry) ? true : undefined,
    };
  });
}

const PROJECT_MANIFESTS = [
  "package.json",
  "Cargo.toml",
  "go.mod",
  "pyproject.toml",
  "bts.jsonc",
  "pom.xml",
  "build.gradle",
  "build.gradle.kts",
  "mix.exs",
  "global.json",
];

function hasDotnetManifest(dir: string) {
  try {
    return readdirSync(dir).some(
      (name) => name.endsWith(".csproj") || name.endsWith(".sln") || name.endsWith(".slnx"),
    );
  } catch {
    return false;
  }
}

export async function findProjectDir(runDir: string, projectName: string) {
  const expected = path.join(runDir, projectName);
  if (existsSync(expected)) return expected;

  const entries = await readdir(runDir, { withFileTypes: true });
  const dirs = entries.filter(
    (entry) => entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules",
  );
  if (dirs.length === 1 && dirs[0]) return path.join(runDir, dirs[0].name);

  const withManifest = dirs.filter(
    (dir) =>
      PROJECT_MANIFESTS.some((manifest) => existsSync(path.join(runDir, dir.name, manifest))) ||
      hasDotnetManifest(path.join(runDir, dir.name)),
  );
  if (withManifest.length === 1 && withManifest[0]) {
    return path.join(runDir, withManifest[0].name);
  }
  return null;
}

export async function archiveProjectSource(srcDir: string, destDir: string) {
  const skip = new Set([
    "node_modules",
    ".git",
    "dist",
    "build",
    ".next",
    ".turbo",
    "coverage",
    "target",
    ".venv",
    "bin",
    "obj",
  ]);
  await rm(destDir, { recursive: true, force: true });
  await cp(srcDir, destDir, {
    recursive: true,
    force: true,
    filter: (source) => !skip.has(path.basename(source)),
  });
}

async function findManifestRoots(projectDir: string, manifests: readonly string[]) {
  const roots = new Set<string>();
  await walk(projectDir, async (filePath) => {
    if (manifests.includes(path.basename(filePath))) roots.add(path.dirname(filePath));
  });
  return [...roots].sort((a, b) => a.length - b.length || a.localeCompare(b));
}

function dropNestedRoots(roots: string[]) {
  const kept: string[] = [];
  for (const root of roots) {
    if (!kept.some((k) => root === k || root.startsWith(k + path.sep))) kept.push(root);
  }
  return kept;
}

function isNestedRoot(parent: string, candidate: string) {
  return candidate !== parent && candidate.startsWith(`${parent}${path.sep}`);
}

function expandBraces(pattern: string): string[] {
  const match = pattern.match(/\{([^{}]+)\}/);
  if (!match || match.index === undefined) return [pattern];
  return match[1]!.split(",").flatMap((choice) =>
    expandBraces(
      `${pattern.slice(0, match.index)}${choice}${pattern.slice(match.index! + match[0].length)}`,
    ),
  );
}

function workspaceGlobMatches(pattern: string, relativeRoot: string) {
  const normalizedPattern = pattern.replace(/^\.\//, "").replace(/\/$/, "");
  const normalizedRoot = relativeRoot.split(path.sep).join("/").replace(/^\.\//, "");
  let source = "";
  for (let index = 0; index < normalizedPattern.length; index += 1) {
    const character = normalizedPattern[index]!;
    if (character === "*") {
      if (normalizedPattern[index + 1] === "*") {
        index += 1;
        if (normalizedPattern[index + 1] === "/") {
          index += 1;
          source += "(?:.*/)?";
        } else {
          source += ".*";
        }
      } else {
        source += "[^/]*";
      }
    } else if (character === "?") {
      source += "[^/]";
    } else {
      source += character.replace(/[|\\{}()[\]^$+?.-]/g, "\\$&");
    }
  }
  return new RegExp(`^${source}$`).test(normalizedRoot);
}

function workspacePatternsCover(patterns: readonly string[], relativeRoot: string) {
  let covered = false;
  for (const rawPattern of patterns) {
    const excluded = rawPattern.startsWith("!");
    const pattern = excluded ? rawPattern.slice(1) : rawPattern;
    if (expandBraces(pattern).some((candidate) => workspaceGlobMatches(candidate, relativeRoot))) {
      covered = !excluded;
    }
  }
  return covered;
}

async function bunWorkspacePatterns(root: string) {
  const packageJson = await readPackageJson(path.join(root, "package.json"));
  const workspaces = Array.isArray(packageJson.workspaces)
    ? packageJson.workspaces
    : packageJson.workspaces?.packages;
  return Array.isArray(workspaces)
    ? workspaces.filter((entry): entry is string => typeof entry === "string")
    : [];
}

async function cargoWorkspacePatterns(root: string) {
  const manifest = await readOptional(path.join(root, "Cargo.toml"));
  if (!manifest) return [];
  const workspace = manifest.match(
    /^\s*\[workspace\]\s*$([\s\S]*?)(?=^\s*\[[^\]]+\]\s*$|(?![\s\S]))/m,
  )?.[1];
  if (!workspace) return [];
  const values = (field: "members" | "exclude") => {
    const body = workspace.match(new RegExp(`\\b${field}\\s*=\\s*\\[([\\s\\S]*?)\\]`))?.[1] ?? "";
    return [...body.matchAll(/["']([^"']+)["']/g)].map((match) => match[1]!);
  };
  return [...values("members"), ...values("exclude").map((entry) => `!${entry}`)];
}

const MANIFEST_FIELDS = ["name", "scripts", "dependencies", "devDependencies", "workspaces"];

async function isRealBunManifest(root: string) {
  const packageJson = await readPackageJson(path.join(root, "package.json"));
  return MANIFEST_FIELDS.some((field) => packageJson[field] !== undefined);
}

async function findBunManifestRoots(projectDir: string) {
  const roots = await findManifestRoots(projectDir, ["package.json"]);
  const real = await Promise.all(roots.map(isRealBunManifest));
  return roots.filter((_, index) => real[index]);
}

async function membershipAwareRoots(
  roots: readonly string[],
  patternsFor: (root: string) => Promise<readonly string[]>,
) {
  const patterns = new Map<string, readonly string[]>();
  for (const root of roots) patterns.set(root, await patternsFor(root));
  return roots.filter(
    (candidate) =>
      !roots.some((parent) => {
        if (!isNestedRoot(parent, candidate)) return false;
        return workspacePatternsCover(
          patterns.get(parent) ?? [],
          path.relative(parent, candidate),
        );
      }),
  );
}

async function coveredWorkspaceMembers(
  parent: string,
  roots: readonly string[],
  patternsFor: (root: string) => Promise<readonly string[]>,
) {
  const patterns = await patternsFor(parent);
  return roots.filter(
    (candidate) =>
      isNestedRoot(parent, candidate) &&
      workspacePatternsCover(patterns, path.relative(parent, candidate)),
  );
}

export type ValidationLimits = {
  deadlineMs?: number;
  rootCap?: number;
};

export function validateProject(
  spec: BenchmarkSpec,
  projectDir: string | null,
  options: ScaffbenchOptions,
  limits: ValidationLimits = {},
) {
  const qualityGateRequested = options.qualityGate;
  if (!projectDir) {
    return Effect.succeed({
      projectExists: false,
      qualityGateRequested,
      steps: {},
    } as ProjectValidation);
  }
  const steps: Record<string, StepResult | undefined> = {};
  const rootCap = limits.rootCap ?? VALIDATION_ROOT_CAP;
  let rootsUsed = 0;

  const validation = Effect.gen(function* () {
    const prefixFor = (root: string) =>
      root === projectDir ? "" : path.relative(projectDir, root).split(path.sep).join("/");
    const merge = (
      incoming: Record<string, StepResult | undefined>,
      prefix: string,
      eco: string,
    ) => {
      let merged = 0;
      for (const [key, step] of Object.entries(incoming)) {
        if (!step) continue;
        const target = prefix ? `${prefix}:${key}` : key;
        steps[steps[target] === undefined ? target : `${eco}:${key}`] = step;
        merged += 1;
      }
      if (merged === 0) {
        steps[`unvalidated:${eco}:${prefix || "."}`] = unvalidatedStep(
          `${eco} manifest discovered at ${prefix || "."} but no validator step ran`,
        );
      }
    };
    const takeRoots = (roots: readonly string[], eco: string) => {
      const accepted: string[] = [];
      for (const root of roots) {
        if (rootsUsed < rootCap) {
          rootsUsed += 1;
          accepted.push(root);
          continue;
        }
        const relative = prefixFor(root) || ".";
        steps[`unvalidated:${eco}:${relative}`] = unvalidatedStep(
          `${eco} root ${relative} exceeded validation root cap ${rootCap}`,
        );
      }
      return accepted;
    };
    const subOptions = { ...options, doctorCheck: false, routeCheck: false };

    for (const [index, prerequisite] of (spec.prerequisiteCommands ?? []).entries()) {
      const [command, ...args] = prerequisite;
      const key = `prerequisite:${String(index + 1).padStart(2, "0")}:${command ?? "missing"}`;
      steps[key] = command
        ? yield* commandStep(command, args, projectDir)
        : skipStep("empty prerequisite command");
      if (!steps[key] || !stepGreen(steps[key])) {
        return buildProjectValidation(steps, qualityGateRequested);
      }
    }
    const prerequisiteStepCount = Object.keys(steps).length;

    const allBunRoots = yield* fromPromise(() => findBunManifestRoots(projectDir));
    const bunRoots = yield* fromPromise(() =>
      membershipAwareRoots(allBunRoots, bunWorkspacePatterns),
    );
    for (const root of takeRoots(bunRoots, "bun")) {
      const isRoot = root === projectDir;
      const bunSteps = yield* validateBunProject(root, isRoot ? options : subOptions);
      merge(bunSteps, prefixFor(root), "bun");
      if (isRoot && bunSteps.install?.exitCode === 0 && !bunSteps.build && !bunSteps.typecheck) {
        const members = yield* fromPromise(() =>
          coveredWorkspaceMembers(root, allBunRoots, bunWorkspacePatterns),
        );
        for (const member of takeRoots(members, "bun")) {
          merge(yield* validateBunProject(member, subOptions), prefixFor(member), "bun");
        }
      }
    }

    const nativeProfiles = new Set(spec.validationProfile.native ?? []);
    const allCargoRoots = yield* fromPromise(() => findManifestRoots(projectDir, ["Cargo.toml"]));
    const cargoRoots = yield* fromPromise(() =>
      membershipAwareRoots(allCargoRoots, cargoWorkspacePatterns),
    );
    for (const root of takeRoots(cargoRoots, "cargo")) {
      merge(
        yield* validateCargoProject(root, root === projectDir ? options : subOptions),
        prefixFor(root),
        "cargo",
      );
    }
    const pythonRoots = dropNestedRoots(
      yield* fromPromise(() => findManifestRoots(projectDir, ["pyproject.toml"])),
    );
    for (const root of takeRoots(pythonRoots, "python")) {
      merge(
        yield* validatePythonProject(root, root === projectDir ? options : subOptions),
        prefixFor(root),
        "python",
      );
    }
    const goRoots = yield* fromPromise(() => findManifestRoots(projectDir, ["go.mod"]));
    for (const root of takeRoots(goRoots, "go")) {
      merge(
        yield* validateGoProject(root, root === projectDir ? options : subOptions),
        prefixFor(root),
        "go",
      );
    }
    if (nativeProfiles.has("dotnet") || (yield* fromPromise(() => hasDotnetProject(projectDir)))) {
      merge(
        yield* validateDotnetProject(projectDir, options, {
          targetCap: Math.max(0, rootCap - rootsUsed),
        }),
        "",
        "dotnet",
      );
    }
    if (nativeProfiles.has("java")) {
      merge(yield* validateJavaProject(projectDir, options), "", "java");
    }
    if (nativeProfiles.has("elixir")) {
      merge(yield* validateElixirProject(projectDir, options), "", "elixir");
    }

    if (Object.keys(steps).length === prerequisiteStepCount) {
      steps["unvalidated:project"] = unvalidatedStep(
        "project directory has no recognized build manifest",
      );
    }
    return buildProjectValidation(steps, qualityGateRequested);
  });

  return validation.pipe(
    Effect.timeoutOption(Duration.millis(limits.deadlineMs ?? VALIDATION_PROJECT_TIMEOUT_MS)),
    Effect.map(
      Option.getOrElse(() => {
        steps["unvalidated:deadline"] = unvalidatedStep(
          `project validation exceeded ${limits.deadlineMs ?? VALIDATION_PROJECT_TIMEOUT_MS}ms deadline`,
        );
        return buildProjectValidation(steps, qualityGateRequested);
      }),
    ),
  );
}

export function validateBunProject(projectDir: string, options: ScaffbenchOptions) {
  return Effect.gen(function* () {
    const steps: Record<string, StepResult | undefined> = {};
    const packageJsonPath = path.join(projectDir, "package.json");
    if (!existsSync(packageJsonPath)) return steps;

    const bun = existsSync(`${process.env.HOME}/.bun/bin/bun`)
      ? `${process.env.HOME}/.bun/bin/bun`
      : "bun";
    steps.install = yield* commandStep(bun, ["install"], projectDir, {
      retryTransientNetwork: true,
    });
    if (steps.install.exitCode !== 0 || steps.install.timedOut) return steps;

    const packageJson = yield* fromPromise(() => readPackageJson(packageJsonPath));
    const scripts = (packageJson.scripts ?? {}) as Record<string, string>;
    const expoCommand = expoExportCommand(packageJson);
    if (expoCommand) {
      steps.build = yield* commandStep(expoCommand.command, expoCommand.args, projectDir, {
        env: { CI: "1", EXPO_NO_TELEMETRY: "1" },
      });
    } else if (scripts.build) {
      steps.build = yield* commandStep(bun, ["run", "build"], projectDir);
    }
    const gate = typecheckGate(scripts, existsSync(path.join(projectDir, "tsconfig.json")));
    if (gate === "tsc") {
      const bunx = existsSync(`${process.env.HOME}/.bun/bin/bunx`)
        ? `${process.env.HOME}/.bun/bin/bunx`
        : "bunx";
      steps.typecheck = yield* commandStep(bunx, ["tsc", "--build"], projectDir);
    } else if (gate) {
      steps.typecheck = yield* commandStep(bun, ["run", gate], projectDir);
    }
    if (options.qualityGate || scripts.lint) {
      const biomeBin = localBin(projectDir, "biome");
      const eslintBin = localBin(projectDir, "eslint");
      steps.lint = scripts.lint
        ? yield* commandStep(bun, ["run", "lint"], projectDir)
        : biomeBin
          ? yield* commandStep(biomeBin, ["lint", "."], projectDir)
          : eslintBin
            ? yield* commandStep(eslintBin, ["."], projectDir)
            : skipStep("lint (no linter configured)");
    }
    if (options.qualityGate) {
      const biomeBin = localBin(projectDir, "biome");
      const prettierBin = localBin(projectDir, "prettier");
      steps.format = biomeBin
        ? yield* commandStep(biomeBin, ["format", "."], projectDir)
        : prettierBin
          ? yield* commandStep(prettierBin, ["--check", "."], projectDir)
          : skipStep("format (no formatter configured)");
      steps.test = scripts.test
        ? yield* commandStep(bun, ["run", "test"], projectDir)
        : naStep("test (no test script)");
    }
    if (options.doctorCheck) {
      const bunx = existsSync(`${process.env.HOME}/.bun/bin/bunx`)
        ? `${process.env.HOME}/.bun/bin/bunx`
        : "bunx";
      steps.doctor = yield* commandStep(
        bunx,
        [bfSpec("create-better-fullstack"), "doctor", ".", "--skip-checks", "--json"],
        projectDir,
      );
    }
    if (options.routeCheck) {
      steps.route = scripts.dev
        ? yield* fromPromise(() => runProjectRouteCheck(projectDir, options.outDir))
        : naStep("route-check (no dev script)");
    }

    return steps;
  });
}

async function runProjectRouteCheck(projectDir: string, outDir: string): Promise<StepResult> {
  const config = await readRouteCheckConfig(projectDir);
  if (!config) return naStep("route-check (missing Better-Fullstack route metadata)");

  const start = Date.now();
  let handle: any = null;
  try {
    const devCheck = await import("../../../testing/lib/dev-check");
    const routeCheck = await import("../../../testing/lib/route-check");
    handle = await devCheck.startDevServer(projectDir, config);
    const result = await routeCheck.runRouteCheck(
      handle,
      path.join(outDir, "route-check", path.basename(projectDir)),
    );
    return verifyStepToHarnessStep(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      command: "route-check",
      exitCode: 1,
      timedOut: false,
      durationMs: Date.now() - start,
      stdoutTail: tail(handle?.stdoutBuf?.() ?? ""),
      stderrTail: tail(`${message}\n${handle?.stderrBuf?.() ?? ""}`),
    };
  } finally {
    if (handle) {
      try {
        const devCheck = await import("../../../testing/lib/dev-check");
        await devCheck.stopDevServer(handle);
      } catch {}
    }
  }
}

async function readRouteCheckConfig(projectDir: string) {
  const btsPath = path.join(projectDir, "bts.jsonc");
  if (!existsSync(btsPath)) return null;

  const parsed = parseJsonc(await readFile(btsPath, "utf8"));
  if (!parsed) return null;

  const frontend = inferFrontend(parsed);
  if (frontend.every((entry) => entry === "none")) return null;

  return {
    ...parsed,
    projectName: parsed.projectName ?? path.basename(projectDir),
    projectDir,
    relativePath: parsed.relativePath ?? ".",
    frontend,
  };
}

function inferFrontend(config: Record<string, any>): string[] {
  if (Array.isArray(config.frontend)) return config.frontend.filter(Boolean);
  if (typeof config.frontend === "string" && config.frontend) return [config.frontend];

  if (Array.isArray(config.stackParts)) {
    const frontendPart = config.stackParts.find(
      (part: Record<string, any>) => part.role === "frontend" && typeof part.toolId === "string",
    );
    if (frontendPart?.toolId) return [frontendPart.toolId];
  }

  return [];
}

function verifyStepToHarnessStep(result: any): StepResult {
  return {
    command: result.step ?? "route-check",
    exitCode: result.success || result.skipped ? 0 : (result.exitCode ?? 1),
    timedOut: Boolean(result.timedOut),
    durationMs: result.durationMs ?? 0,
    stdoutTail: tail(result.stdout ?? ""),
    stderrTail: tail(result.stderr ?? ""),
  };
}

export function validateCargoProject(projectDir: string, options: ScaffbenchOptions) {
  return Effect.gen(function* () {
    const steps: Record<string, StepResult | undefined> = {};
    if (!existsSync(path.join(projectDir, "Cargo.toml"))) return steps;
    steps.cargoCheck = yield* commandStep(
      "cargo",
      ["check", "--workspace", "--all-targets"],
      projectDir,
    );
    if (options.qualityGate) {
      steps.format = yield* commandStep("cargo", ["fmt", "--check"], projectDir);
      steps.lint = yield* commandStep("cargo", ["clippy", "--", "-D", "warnings"], projectDir);
      steps.test = yield* commandStep("cargo", ["test"], projectDir);
    }
    return steps;
  });
}

export function validatePythonProject(projectDir: string, options: ScaffbenchOptions) {
  return Effect.gen(function* () {
    const steps: Record<string, StepResult | undefined> = {};
    if (!existsSync(path.join(projectDir, "pyproject.toml"))) return steps;
    steps.install =
      steps.install ??
      (yield* commandStep("uv", ["sync", "--all-extras"], projectDir, {
        retryTransientNetwork: true,
      }));
    if (steps.install.exitCode !== 0 || steps.install.timedOut) return steps;
    const srcDir = existsSync(path.join(projectDir, "src")) ? "src/" : ".";
    steps.compile = yield* commandStep(
      "uv",
      ["run", "python", "-m", "compileall", "-q", srcDir],
      projectDir,
    );
    const typechecker = yield* fromPromise(() => configuredPythonTypechecker(projectDir));
    if (typechecker === "mypy") {
      const mypyArguments = (yield* fromPromise(() => pythonMypyHasConfiguredTargets(projectDir)))
        ? []
        : ["."];
      steps.typecheck = yield* commandStep("uv", ["run", "mypy", ...mypyArguments], projectDir);
    } else if (typechecker === "pyright") {
      steps.typecheck = yield* commandStep("uv", ["run", "pyright"], projectDir);
    } else {
      const entryTarget = yield* fromPromise(() => findPythonEntryTarget(projectDir));
      steps.typecheck = entryTarget
        ? yield* commandStep(
            "uv",
            ["run", "python", "-c", pythonFileImportCommand(entryTarget)],
            projectDir,
          )
        : skipStep("python import smoke (no importable package found)");
    }
    if (options.qualityGate) {
      steps.lint = yield* commandStep("uv", ["run", "ruff", "check", "."], projectDir);
      steps.format = yield* commandStep(
        "uv",
        ["run", "ruff", "format", "--check", "."],
        projectDir,
      );
      const pytest = yield* commandStep("uv", ["run", "pytest"], projectDir);
      steps.test = pytest.exitCode === 5 ? naStep("pytest (no tests collected)") : pytest;
    }
    return steps;
  });
}

export function validateGoProject(projectDir: string, options: ScaffbenchOptions) {
  return Effect.gen(function* () {
    const steps: Record<string, StepResult | undefined> = {};
    if (!existsSync(path.join(projectDir, "go.mod"))) return steps;
    steps.install =
      steps.install ??
      (yield* commandStep("go", ["mod", "download"], projectDir, {
        retryTransientNetwork: true,
      }));
    if (steps.install.exitCode !== 0 || steps.install.timedOut) return steps;
    steps.build = steps.build ?? (yield* commandStep("go", ["build", "./..."], projectDir));
    steps.tidy = yield* runGoTidyAdvisory(projectDir);
    if (options.qualityGate) {
      steps.lint = yield* commandStep("go", ["vet", "./..."], projectDir);
      const gofmt = yield* runCommand("gofmt", ["-l", "."], projectDir, VALIDATION_TIMEOUT_MS);
      const unformatted = gofmt.stdout.trim();
      steps.format = toStep(
        gofmt.exitCode === 0 && unformatted
          ? {
              ...gofmt,
              exitCode: 1,
              stderr: `gofmt: ${unformatted.split("\n").filter(Boolean).length} file(s) need formatting:\n${unformatted}`,
            }
          : gofmt,
      );
      steps.test = yield* commandStep("go", ["test", "./..."], projectDir);
    }
    return steps;
  });
}

export function validateDotnetProject(
  projectDir: string,
  options: ScaffbenchOptions,
  limits: { targetCap?: number } = {},
) {
  return Effect.gen(function* () {
    const steps: Record<string, StepResult | undefined> = {};
    const targets = yield* fromPromise(() => dotnetValidationTargets(projectDir));
    const targetCap = limits.targetCap ?? Number.POSITIVE_INFINITY;
    let targetsUsed = 0;
    const acceptTarget = (target: string) => {
      if (targetsUsed < targetCap) {
        targetsUsed += 1;
        return true;
      }
      const namespace = target.endsWith(".csproj")
        ? dotnetStepNamespace(projectDir, target)
        : path.relative(projectDir, target).split(path.sep).join("/");
      steps[`unvalidated:dotnet:${namespace}`] = unvalidatedStep(
        `dotnet target ${namespace} exceeded validation root cap ${targetCap}`,
      );
      return false;
    };
    if (targets.kind === "solution") {
      const solution = targets.targets[0]!;
      if (acceptTarget(solution)) {
        const root = path.dirname(solution);
        const target = path.basename(solution);
        steps.dotnetRestore = yield* commandStep("dotnet", ["restore", target], root, {
          retryTransientNetwork: true,
        });
        if (stepGreen(steps.dotnetRestore)) {
          steps.dotnetBuild = yield* commandStep(
            "dotnet",
            ["build", target, "--no-restore"],
            root,
          );
          if (options.qualityGate && stepGreen(steps.dotnetBuild)) {
            steps.test = yield* commandStep("dotnet", ["test", target, "--no-build"], root);
          }
        }
      }
    }

    const projects =
      targets.kind === "solution" ? targets.uncoveredProjects : targets.targets;
    for (const project of projects) {
      if (!acceptTarget(project)) continue;
      const root = path.dirname(project);
      const target = path.basename(project);
      const namespace = dotnetStepNamespace(projectDir, project);
      const restoreKey = `${namespace}:dotnetRestore`;
      const buildKey = `${namespace}:dotnetBuild`;
      steps[restoreKey] = yield* commandStep("dotnet", ["restore", target], root, {
        retryTransientNetwork: true,
      });
      if (!stepGreen(steps[restoreKey])) continue;
      steps[buildKey] = yield* commandStep("dotnet", ["build", target, "--no-restore"], root);
      if (options.qualityGate) {
        steps[`${namespace}:test`] = yield* commandStep(
          "dotnet",
          ["test", target, "--no-build"],
          root,
        );
      }
    }
    return steps;
  });
}

export async function findBuildRoot(
  projectDir: string,
  manifests: readonly string[],
): Promise<string | null> {
  const roots = new Set<string>();
  await walk(projectDir, async (filePath) => {
    if (manifests.includes(path.basename(filePath))) roots.add(path.dirname(filePath));
  });
  if (roots.size === 0) return null;
  const list = [...roots];
  return (
    list.find((root) => root.endsWith(path.join("apps", "server"))) ??
    list.sort((a, b) => a.length - b.length)[0] ??
    null
  );
}

export function validateJavaProject(projectDir: string, options: ScaffbenchOptions) {
  return Effect.gen(function* () {
    const steps: Record<string, StepResult | undefined> = {};
    const root = yield* fromPromise(() =>
      findBuildRoot(projectDir, ["pom.xml", "build.gradle", "build.gradle.kts"]),
    );
    if (!root) return steps;
    const hasPom = existsSync(path.join(root, "pom.xml"));
    const wrapper = hasPom ? "mvnw" : "gradlew";
    const usesWrapper = existsSync(path.join(root, wrapper));
    const [bin, buildArgs, testArgs] = hasPom
      ? ([
          usesWrapper ? "./mvnw" : "mvn",
          ["-q", "-B", "-DskipTests", "compile"],
          ["-q", "-B", "test"],
        ] as const)
      : ([
          usesWrapper ? "./gradlew" : "gradle",
          ["compileJava", "-x", "test", "--console=plain"],
          ["test", "--console=plain"],
        ] as const);
    steps.build = yield* commandStep(bin, [...buildArgs], root);
    if (steps.build.exitCode !== 0 || steps.build.timedOut) return steps;
    if (options.qualityGate) {
      steps.test = yield* commandStep(bin, [...testArgs], root);
    }
    return steps;
  });
}

export function validateElixirProject(projectDir: string, options: ScaffbenchOptions) {
  return Effect.gen(function* () {
    const steps: Record<string, StepResult | undefined> = {};
    const root = yield* fromPromise(() => findBuildRoot(projectDir, ["mix.exs"]));
    if (!root) return steps;
    steps.install = yield* commandStep("mix", ["deps.get"], root, {
      retryTransientNetwork: true,
    });
    if (steps.install.exitCode !== 0 || steps.install.timedOut) return steps;
    steps.build = yield* commandStep("mix", ["compile"], root);
    if (steps.build.exitCode !== 0 || steps.build.timedOut) return steps;
    if (options.qualityGate) {
      steps.format = yield* commandStep("mix", ["format", "--check-formatted"], root);
      steps.test = yield* commandStep("mix", ["test"], root);
    }
    return steps;
  });
}

async function hasDotnetProject(projectDir: string) {
  return (
    (await findDotnetProjects(projectDir)).length > 0 ||
    (await findDotnetSolutions(projectDir)).length > 0
  );
}

export async function findDotnetRoots(projectDir: string) {
  return [...new Set((await findDotnetProjects(projectDir)).map(path.dirname))];
}

export async function findDotnetProjects(projectDir: string) {
  const projects: string[] = [];
  await walk(projectDir, async (filePath) => {
    if (filePath.endsWith(".csproj")) projects.push(filePath);
  });
  return projects.sort((a, b) => a.localeCompare(b));
}

export async function findDotnetSolutions(projectDir: string) {
  const solutions: string[] = [];
  await walk(projectDir, async (filePath) => {
    if (filePath.endsWith(".sln") || filePath.endsWith(".slnx")) solutions.push(filePath);
  });
  return solutions.sort(
    (a, b) =>
      path.relative(projectDir, a).split(path.sep).length -
        path.relative(projectDir, b).split(path.sep).length || a.localeCompare(b),
  );
}

export async function dotnetValidationTargets(projectDir: string) {
  const solutions = await findDotnetSolutions(projectDir);
  if (solutions.length > 0) {
    const solution = solutions[0]!;
    const covered = await dotnetSolutionProjects(solution);
    const uncoveredProjects = (await findDotnetProjects(projectDir)).filter(
      (project) => !covered.has(path.resolve(project)),
    );
    return { kind: "solution" as const, targets: [solution], uncoveredProjects };
  }
  return { kind: "projects" as const, targets: await findDotnetProjects(projectDir) };
}

async function dotnetSolutionProjects(solution: string) {
  const text = await readOptional(solution);
  const projects = new Set<string>();
  if (!text) return projects;
  const root = path.dirname(solution);
  const references = solution.endsWith(".slnx")
    ? [...text.matchAll(/<Project\b[^>]*\bPath=["']([^"']+\.csproj)["']/gi)].map(
        (match) => match[1]!,
      )
    : [...text.matchAll(/Project\([^)]*\)\s*=\s*"[^"]*"\s*,\s*"([^"]+\.csproj)"/gi)].map(
        (match) => match[1]!,
      );
  for (const reference of references) {
    projects.add(path.resolve(root, reference.replace(/[\\/]+/g, path.sep)));
  }
  return projects;
}

function dotnetStepNamespace(projectDir: string, project: string) {
  const relative = path.relative(projectDir, project).split(path.sep).join("/");
  return relative.replace(/\.csproj$/i, "");
}

function toStep(result: CommandResult): StepResult {
  const { stdout: _stdout, stderr: _stderr, ...step } = result;
  return step;
}

function stepGreen(step: StepResult | undefined) {
  return Boolean(
    step && step.status !== "skip" && step.exitCode === 0 && !step.timedOut && !step.spawnError,
  );
}

function buildProjectValidation(
  steps: Record<string, StepResult | undefined>,
  qualityGateRequested: boolean,
): ProjectValidation {
  const firstByBase = (...names: string[]) =>
    Object.entries(steps).find(
      ([key, step]) => step && names.includes(key.slice(key.lastIndexOf(":") + 1)),
    )?.[1];
  return {
    projectExists: true,
    qualityGateRequested,
    steps,
    install: steps.install ?? firstByBase("install", "dotnetRestore"),
    build: steps.build ?? firstByBase("build", "dotnetBuild", "cargoCheck", "compile"),
    checkTypes: steps.typecheck ?? firstByBase("typecheck"),
    lint: steps.lint ?? firstByBase("lint"),
    format: steps.format ?? firstByBase("format"),
    test: steps.test ?? firstByBase("test"),
    doctor: steps.doctor,
    route: steps.route,
  };
}

function skipStep(command: string): StepResult {
  return {
    command,
    exitCode: null,
    timedOut: false,
    status: "skip",
    durationMs: 0,
    stdoutTail: "skipped (tool not configured)",
    stderrTail: "",
  };
}

function unvalidatedStep(command: string): StepResult {
  return {
    command,
    exitCode: 1,
    timedOut: false,
    status: "ran",
    durationMs: 0,
    stdoutTail: "",
    stderrTail: command,
  };
}

function naStep(command: string): StepResult {
  return {
    command,
    exitCode: null,
    timedOut: false,
    status: "na",
    durationMs: 0,
    stdoutTail: "n/a",
    stderrTail: "",
  };
}

function localBin(projectDir: string, name: string): string | null {
  const p = path.join(projectDir, "node_modules", ".bin", name);
  return existsSync(p) ? p : null;
}

async function readPackageScripts(packageJsonPath: string) {
  return ((await readPackageJson(packageJsonPath)).scripts ?? {}) as Record<string, string>;
}

async function readPackageJson(packageJsonPath: string): Promise<Record<string, any>> {
  try {
    return JSON.parse(await readFile(packageJsonPath, "utf8"));
  } catch {
    return {};
  }
}

export function isExpoPackage(packageJson: Record<string, any>) {
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  return typeof dependencies.expo === "string";
}

export function expoWebConfigured(packageJson: Record<string, any>, _projectDir?: string) {
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  return Boolean(dependencies["react-dom"] || dependencies["react-native-web"]);
}

export function expoExportCommand(packageJson: Record<string, any>) {
  if (!isExpoPackage(packageJson)) return null;
  return {
    command: "npx",
    args: expoWebConfigured(packageJson)
      ? ["expo", "export", "--platform", "web"]
      : ["expo", "export"],
    env: { CI: "1", EXPO_NO_TELEMETRY: "1" },
  } as const;
}

export async function configuredPythonTypechecker(
  projectDir: string,
): Promise<"mypy" | "pyright" | null> {
  if (
    existsSync(path.join(projectDir, "mypy.ini")) ||
    existsSync(path.join(projectDir, ".mypy.ini"))
  ) {
    return "mypy";
  }
  if (existsSync(path.join(projectDir, "pyrightconfig.json"))) return "pyright";
  const pyprojectPath = path.join(projectDir, "pyproject.toml");
  const pyproject = existsSync(pyprojectPath) ? await readFile(pyprojectPath, "utf8") : "";
  if (/^\s*\[tool\.mypy\]\s*$/m.test(pyproject)) return "mypy";
  if (/^\s*\[tool\.pyright\]\s*$/m.test(pyproject)) return "pyright";
  return null;
}

export async function pythonMypyHasConfiguredTargets(projectDir: string): Promise<boolean> {
  const targetPattern = /^\s*(files|packages|modules)\s*=/m;
  for (const name of ["mypy.ini", ".mypy.ini"]) {
    const iniPath = path.join(projectDir, name);
    if (existsSync(iniPath) && targetPattern.test(await readFile(iniPath, "utf8"))) return true;
  }
  const pyprojectPath = path.join(projectDir, "pyproject.toml");
  if (!existsSync(pyprojectPath)) return false;
  const pyproject = await readFile(pyprojectPath, "utf8");
  const headerMatch = /^\s*\[tool\.mypy\]\s*$/m.exec(pyproject);
  if (!headerMatch) return false;
  const afterHeader = pyproject.slice(headerMatch.index + headerMatch[0].length);
  const nextTable = afterHeader.search(/^\s*\[/m);
  const section = nextTable === -1 ? afterHeader : afterHeader.slice(0, nextTable);
  return targetPattern.test(section);
}

export async function findPythonEntryModule(projectDir: string): Promise<string | null> {
  return (await findPythonEntryTarget(projectDir))?.moduleName ?? null;
}

type PythonEntryTarget = {
  moduleName: string;
  filePath: string;
  importRoot: string;
  packageDirectory?: string;
};

async function findPythonEntryTarget(projectDir: string): Promise<PythonEntryTarget | null> {
  const root = existsSync(path.join(projectDir, "src")) ? path.join(projectDir, "src") : projectDir;
  const entries = (await readdir(root, { withFileTypes: true })).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  for (const entry of entries) {
    if (!entry.isDirectory() || !/^[A-Za-z_]\w*$/.test(entry.name)) continue;
    const init = path.join(root, entry.name, "__init__.py");
    if (existsSync(init)) {
      const entryModule = ["main.py", "app.py", "__main__.py"].find((name) =>
        existsSync(path.join(root, entry.name, name)),
      );
      if (entryModule) {
        return {
          moduleName: `${entry.name}.${entryModule.slice(0, -3)}`,
          filePath: path.join(root, entry.name, entryModule),
          importRoot: root,
          packageDirectory: path.dirname(init),
        };
      }
      return {
        moduleName: entry.name,
        filePath: init,
        importRoot: root,
        packageDirectory: path.dirname(init),
      };
    }
  }
  for (const entry of entries) {
    if (!/^[A-Za-z_]\w*$/.test(entry.name.replace(/\.py$/, ""))) continue;
    if (
      entry.isFile() &&
      entry.name.endsWith(".py") &&
      !/^(__init__|setup|conftest)\.py$/.test(entry.name)
    ) {
      return {
        moduleName: entry.name.slice(0, -3),
        filePath: path.join(root, entry.name),
        importRoot: root,
      };
    }
    if (entry.isDirectory()) {
      const module = (await readdir(path.join(root, entry.name)))
        .filter((name) => /^[A-Za-z_]\w*\.py$/.test(name) && name !== "__init__.py")
        .sort()[0];
      if (module) {
        return {
          moduleName: `${entry.name}_${module.slice(0, -3)}`,
          filePath: path.join(root, entry.name, module),
          importRoot: path.join(root, entry.name),
        };
      }
    }
  }
  return null;
}

function pythonFileImportCommand(target: PythonEntryTarget) {
  const moduleName = JSON.stringify(target.moduleName);
  const filePath = JSON.stringify(target.filePath);
  const importRoot = JSON.stringify(target.importRoot);
  if (target.moduleName.includes(".")) {
    return [
      "import importlib, sys",
      `sys.path.insert(0, ${importRoot})`,
      `importlib.import_module(${moduleName})`,
    ].join("; ");
  }
  const packageLocations = target.packageDirectory
    ? `, submodule_search_locations=[${JSON.stringify(target.packageDirectory)}]`
    : "";
  return [
    "import importlib.util, pathlib, sys",
    `p = pathlib.Path(${filePath})`,
    `sys.path.insert(0, ${importRoot})`,
    `s = importlib.util.spec_from_file_location(${moduleName}, p${packageLocations})`,
    "assert s is not None and s.loader is not None",
    "m = importlib.util.module_from_spec(s)",
    `sys.modules[${moduleName}] = m`,
    "s.loader.exec_module(m)",
  ].join("; ");
}

function runGoTidyAdvisory(projectDir: string) {
  return Effect.gen(function* () {
    const tempRoot = yield* fromPromise(() =>
      mkdtemp(path.join(os.tmpdir(), "scaffbench-go-tidy-")),
    );
    const copyDir = path.join(tempRoot, "project");
    const cleanup = fromPromise(() => rm(tempRoot, { recursive: true, force: true })).pipe(
      Effect.ignore,
    );
    return yield* Effect.gen(function* () {
      yield* fromPromise(() =>
        cp(projectDir, copyDir, {
          recursive: true,
          filter: (source) => ![".git", "vendor", "node_modules"].includes(path.basename(source)),
        }),
      );
      const beforeMod = yield* fromPromise(() => readOptional(path.join(copyDir, "go.mod")));
      const beforeSum = yield* fromPromise(() => readOptional(path.join(copyDir, "go.sum")));
      const tidy = yield* commandStep("go", ["mod", "tidy"], copyDir);
      const afterMod = yield* fromPromise(() => readOptional(path.join(copyDir, "go.mod")));
      const afterSum = yield* fromPromise(() => readOptional(path.join(copyDir, "go.sum")));
      if (!stepGreen(tidy)) return { ...tidy, command: "go mod tidy (advisory diff)" };
      if (beforeMod !== afterMod || beforeSum !== afterSum) {
        return {
          ...tidy,
          command: "go mod tidy (advisory diff)",
          exitCode: 1,
          stderrTail: tail("go mod tidy would change go.mod/go.sum"),
        };
      }
      return { ...tidy, command: "go mod tidy (advisory diff)" };
    }).pipe(Effect.ensuring(cleanup));
  });
}

async function readOptional(filePath: string) {
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

