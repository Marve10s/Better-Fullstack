import type { Ecosystem, ProjectConfig } from "@better-fullstack/types";

import { readFileSync, existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

import { runDevCheck, startDevServer, stopDevServer, isDbDependentProject } from "./dev-check";
import { runRouteCheck } from "./route-check";

const STEP_TIMEOUT_MS = 300_000; // 5 minutes per step
const NUXT_INSTALL_TIMEOUT_MS = 900_000; // Nuxt dependency resolution is materially heavier.

export type StepResult = {
  step: string;
  success: boolean;
  durationMs: number;
  stdout?: string;
  stderr?: string;
  exitCode?: number;
  timedOut?: boolean;
  skipped?: boolean;
  advisory?: boolean;
  classification?: "environment" | "template" | "unknown";
};

type RunStepOptions = {
  timeoutMs?: number;
};

export type VerifyOptions = {
  devCheck?: boolean;
  strict?: boolean;
  routeCheck?: boolean;
  qualityGate?: boolean;
  doctorCheck?: boolean;
  doctorCliPath?: string;
  outputDir?: string;
  config?: ProjectConfig;
};

export type VerifyResult = {
  ecosystem: Ecosystem;
  comboName: string;
  projectDir: string;
  overallSuccess: boolean;
  steps: StepResult[];
  totalDurationMs: number;
};

const ENVIRONMENT_PATTERNS = [
  /ENOTFOUND/,
  /ETIMEDOUT/,
  /ECONNREFUSED/,
  /ECONNRESET/,
  /fetch failed/i,
  /command not found/i,
  /Executable not found/i,
  /No such file or directory.*\/bin\//,
  /error: could not find/i,
  /Failed to spawn/i,
  /network/i,
  /qwik.*MODULE_NOT_FOUND/is,
  /registry/i,
  /certificate/i,
];

const TEMPLATE_PATTERNS = [
  /error\[E\d+\]/, // Rust compiler errors
  /\*\* \(CompileError\)/,
  /SyntaxError/,
  /TypeError/,
  /ReferenceError/,
  /Cannot find module/,
  /Module not found/,
  /Could not resolve/,
  /Unexpected token/,
  /expected.*found/i,
  /undeclared type/i,
  /undefined:/,
  /not assignable to/,
  /has no exported member/,
  /Import .* is not found/i,
  /unresolved import/i,
  /No version matching/i,
  /failed to resolve/i,
  /is not exported by/i,
];

function classifyError(stderr: string, stdout: string): StepResult["classification"] {
  const combined = `${stderr}\n${stdout}`;
  for (const pattern of ENVIRONMENT_PATTERNS) {
    if (pattern.test(combined)) return "environment";
  }
  for (const pattern of TEMPLATE_PATTERNS) {
    if (pattern.test(combined)) return "template";
  }
  return "unknown";
}

async function runStep(
  step: string,
  command: string,
  args: string[],
  cwd: string,
  options?: RunStepOptions,
): Promise<StepResult> {
  const start = Date.now();
  const timeoutMs = options?.timeoutMs ?? STEP_TIMEOUT_MS;

  try {
    const proc = Bun.spawn([command, ...args], {
      cwd,
      stdout: "pipe",
      stderr: "pipe",
      env: process.env,
    });

    let timedOut = false;
    const timeoutId = setTimeout(() => {
      timedOut = true;
      try {
        proc.kill();
      } catch {}
    }, timeoutMs);

    const [stdout, stderr] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
    ]);
    const exitCode = await proc.exited;

    clearTimeout(timeoutId);

    const success = exitCode === 0 && !timedOut;
    const timeoutSuffix = timedOut
      ? `\nProcess timed out after ${Math.round(timeoutMs / 1000)}s.`
      : "";
    return {
      step,
      success,
      durationMs: Date.now() - start,
      stdout: stdout.slice(-4000),
      stderr: `${stderr}${timeoutSuffix}`.slice(-4000),
      exitCode,
      timedOut,
      classification: success
        ? undefined
        : timedOut
          ? "environment"
          : classifyError(stderr, stdout),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      step,
      success: false,
      durationMs: Date.now() - start,
      stderr: message.slice(-4000),
      exitCode: -1,
      classification: classifyError(message, ""),
    };
  }
}

function getTypeScriptInstallTimeoutMs(config?: ProjectConfig): number {
  const frontend = Array.isArray(config?.frontend) ? config.frontend : [];
  return frontend.includes("nuxt") ? NUXT_INSTALL_TIMEOUT_MS : STEP_TIMEOUT_MS;
}

function hasPackageScript(projectDir: string, scriptName: string): boolean {
  return getPackageScript(projectDir, scriptName) !== null;
}

function getPackageScript(projectDir: string, scriptName: string): string | null {
  try {
    const pkgPath = join(projectDir, "package.json");
    if (!existsSync(pkgPath)) return null;
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    const script = pkg.scripts?.[scriptName];
    return typeof script === "string" && script.length > 0 ? script : null;
  } catch {
    return null;
  }
}

function fileContains(projectDir: string, filename: string, needle: string): boolean {
  try {
    const filePath = join(projectDir, filename);
    if (!existsSync(filePath)) return false;
    return readFileSync(filePath, "utf-8").includes(needle);
  } catch {
    return false;
  }
}

function wrapResult(
  ecosystem: Ecosystem,
  comboName: string,
  projectDir: string,
  steps: StepResult[],
): VerifyResult {
  return {
    ecosystem,
    comboName,
    projectDir,
    overallSuccess: steps.every((s) => s.success || s.skipped || s.advisory),
    steps,
    totalDurationMs: steps.reduce((sum, s) => sum + s.durationMs, 0),
  };
}

function skippedStep(step: string): StepResult {
  return { step, success: true, durationMs: 0, skipped: true };
}

function templateFailure(step: string, stderr: string): StepResult {
  return {
    step,
    success: false,
    durationMs: 0,
    stderr,
    classification: "template",
  };
}

async function runAdvisoryStep(
  step: string,
  command: string,
  args: string[],
  cwd: string,
  options?: RunStepOptions,
): Promise<StepResult> {
  const result = await runStep(step, command, args, cwd, options);
  return { ...result, advisory: true };
}

async function runMaybeAdvisoryStep(
  step: string,
  command: string,
  args: string[],
  cwd: string,
  advisory: boolean,
  options?: RunStepOptions,
): Promise<StepResult> {
  const result = await runStep(step, command, args, cwd, options);
  return advisory ? { ...result, advisory: true } : result;
}

async function runTypeScriptQualityGate(
  projectDir: string,
  blocking: boolean,
): Promise<StepResult[]> {
  const steps: StepResult[] = [];

  if (hasPackageScript(projectDir, "lint")) {
    steps.push(await runMaybeAdvisoryStep("lint", "bun", ["run", "lint"], projectDir, !blocking));
  } else {
    steps.push(skippedStep("lint"));
  }

  if (!blocking) {
    return steps;
  }

  if (hasPackageScript(projectDir, "format")) {
    steps.push(await runStep("format", "bun", ["run", "format"], projectDir));
  } else if (hasPackageScript(projectDir, "check")) {
    steps.push(await runStep("check", "bun", ["run", "check"], projectDir));
  } else {
    steps.push(skippedStep("format"));
  }

  return steps;
}

export async function verifyTypeScript(
  comboName: string,
  projectDir: string,
  options?: VerifyOptions,
): Promise<VerifyResult> {
  const steps: StepResult[] = [];

  // Convex projects require `convex codegen` before build/typecheck can work
  const isConvex = existsSync(join(projectDir, "packages", "backend", "convex"));

  steps.push(
    await runStep("install", "bun", ["install"], projectDir, {
      timeoutMs: getTypeScriptInstallTimeoutMs(options?.config),
    }),
  );
  if (!steps.at(-1)!.success) return wrapResult("typescript", comboName, projectDir, steps);

  if (options?.devCheck && options?.config) {
    if (options.routeCheck) {
      // Start server, run dev-check validation, then route-check, then stop
      const isDbDep = isDbDependentProject(options.config);
      try {
        const handle = await startDevServer(projectDir, options.config);
        try {
          const devStep: StepResult = {
            step: "dev-check",
            success: true,
            durationMs: Date.now() - handle.startTime,
            stdout: `${handle.serverUrl} → server started`,
            advisory: options.strict ? false : isDbDep,
          };
          steps.push(devStep);
          steps.push(await runRouteCheck(handle, options.outputDir));
        } finally {
          await stopDevServer(handle);
        }
      } catch (error) {
        const err = error as Error & { stdoutBuf?: string; stderrBuf?: string };
        steps.push({
          step: "dev-check",
          success: false,
          durationMs: 0,
          stderr: `${err.message}\n${err.stderrBuf?.slice(-2000) ?? ""}`,
          classification: "unknown",
          advisory: options.strict ? false : isDbDep,
        });
        steps.push(skippedStep("route-check"));
      }
    } else {
      const devCheckResult = await runDevCheck(projectDir, options.config);
      if (options.strict) {
        devCheckResult.advisory = false;
      }
      steps.push(devCheckResult);
    }
  }
  if (isConvex) {
    steps.push(skippedStep("build"));
  } else if (hasPackageScript(projectDir, "build")) {
    const buildResult = await runStep("build", "bun", ["run", "build"], projectDir);
    // Native-only projects have no web packages to build — treat as skip
    if (
      !buildResult.success &&
      /No packages matched the filter/i.test(`${buildResult.stderr}\n${buildResult.stdout}`)
    ) {
      steps.push({ ...buildResult, success: true, skipped: true });
    } else {
      steps.push(buildResult);
    }
  } else {
    steps.push(skippedStep("build"));
  }

  steps.push(...(await runTypeScriptQualityGate(projectDir, Boolean(options?.qualityGate))));

  const typecheckScript = hasPackageScript(projectDir, "check-types")
    ? "check-types"
    : hasPackageScript(projectDir, "typecheck")
      ? "typecheck"
      : null;

  if (isConvex) {
    steps.push(skippedStep("typecheck"));
  } else if (typecheckScript) {
    steps.push(await runStep("typecheck", "bun", ["run", typecheckScript], projectDir));
  } else {
    steps.push(skippedStep("typecheck"));
  }

  if (options?.doctorCheck) {
    if (options.doctorCliPath) {
      steps.push(
        await runStep(
          "doctor",
          "node",
          [options.doctorCliPath, "doctor", projectDir, "--json"],
          projectDir,
        ),
      );
    } else {
      steps.push(templateFailure("doctor", "Missing CLI path for generated project doctor check"));
    }
  }

  return wrapResult("typescript", comboName, projectDir, steps);
}

export async function verifyReactNative(
  comboName: string,
  projectDir: string,
  options?: VerifyOptions,
): Promise<VerifyResult> {
  const steps: StepResult[] = [];
  const nativeDir = join(projectDir, "apps", "native");

  if (!existsSync(nativeDir)) {
    steps.push(templateFailure("structure", "Expected React Native app at apps/native"));
    return wrapResult("react-native", comboName, projectDir, steps);
  }

  for (const requiredFile of ["package.json", "app.json", "tsconfig.json"]) {
    if (!existsSync(join(nativeDir, requiredFile))) {
      steps.push(templateFailure("structure", `Expected apps/native/${requiredFile}`));
      return wrapResult("react-native", comboName, projectDir, steps);
    }
  }

  steps.push(await runStep("install", "bun", ["install"], projectDir));
  if (!steps.at(-1)!.success) return wrapResult("react-native", comboName, projectDir, steps);

  steps.push(
    await runStep(
      "typecheck",
      "bunx",
      ["tsc", "-p", "apps/native/tsconfig.json", "--noEmit"],
      projectDir,
    ),
  );
  if (!steps.at(-1)!.success) return wrapResult("react-native", comboName, projectDir, steps);

  // Metro/Babel bundle. Call `expo export` DIRECTLY rather than `bun run build`:
  // the native package has a `prebuild` lifecycle script (`expo prebuild`) that
  // `bun run build` would trigger first, and that runs CocoaPods — macOS-only, so
  // it fails on the Linux CI runner. `expo export` is a pure JS/Metro bundle (no
  // native prebuild), so it runs on Linux and still exercises the Babel transform.
  // Typecheck alone does NOT: the 2026-06 `@babel/core` ^8 pin broke the Metro
  // bundle (react-native-gesture-handler SyntaxError) while typecheck stayed green.
  steps.push(await runStep("build", "bunx", ["expo", "export"], nativeDir));
  if (!steps.at(-1)!.success) return wrapResult("react-native", comboName, projectDir, steps);

  if (
    hasPackageScript(nativeDir, "test") &&
    (options?.config?.mobileTesting === "react-native-testing-library" ||
      options?.config?.mobileTesting === "maestro-react-native-testing-library")
  ) {
    steps.push(await runStep("test", "bun", ["run", "test", "--runInBand"], nativeDir));
  } else {
    steps.push(skippedStep("test"));
  }

  steps.push(skippedStep("simulator"));

  return wrapResult("react-native", comboName, projectDir, steps);
}

export async function verifyRust(comboName: string, projectDir: string): Promise<VerifyResult> {
  const steps: StepResult[] = [];

  // Step 1: cargo check
  steps.push(await runStep("check", "cargo", ["check"], projectDir));
  if (!steps.at(-1)!.success) return wrapResult("rust", comboName, projectDir, steps);

  // Step 2: cargo clippy (advisory — doesn't affect overall pass/fail)
  steps.push(
    await runAdvisoryStep("clippy", "cargo", ["clippy", "--", "-D", "warnings"], projectDir),
  );

  return wrapResult("rust", comboName, projectDir, steps);
}

export async function verifyPython(comboName: string, projectDir: string): Promise<VerifyResult> {
  const steps: StepResult[] = [];

  // Step 1: uv sync (--all-extras to include dev optional dependencies like ruff, pytest)
  steps.push(await runStep("install", "uv", ["sync", "--all-extras"], projectDir));
  if (!steps.at(-1)!.success) return wrapResult("python", comboName, projectDir, steps);

  // Step 2: compile check
  const srcDir = existsSync(join(projectDir, "src")) ? "src/" : ".";
  steps.push(
    await runStep(
      "compile-check",
      "uv",
      ["run", "python", "-m", "compileall", "-q", srcDir],
      projectDir,
    ),
  );

  // Step 3: ruff lint (advisory — doesn't affect overall pass/fail)
  if (fileContains(projectDir, "pyproject.toml", "ruff")) {
    steps.push(await runAdvisoryStep("lint", "uv", ["run", "ruff", "check", "."], projectDir));
  } else {
    steps.push(skippedStep("lint"));
  }

  return wrapResult("python", comboName, projectDir, steps);
}

export async function verifyGo(comboName: string, projectDir: string): Promise<VerifyResult> {
  const steps: StepResult[] = [];

  // Step 1: go mod tidy
  steps.push(await runStep("mod-tidy", "go", ["mod", "tidy"], projectDir));
  if (!steps.at(-1)!.success) return wrapResult("go", comboName, projectDir, steps);

  // Step 2: go build
  steps.push(await runStep("build", "go", ["build", "./..."], projectDir));

  // Step 3: go vet (advisory — doesn't affect overall pass/fail)
  steps.push(await runAdvisoryStep("vet", "go", ["vet", "./..."], projectDir));

  return wrapResult("go", comboName, projectDir, steps);
}

async function listJavaSources(dir: string): Promise<string[]> {
  if (!existsSync(dir)) return [];

  const entries = await readdir(dir, { withFileTypes: true });
  const sources = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        return listJavaSources(entryPath);
      }
      return entry.isFile() && entry.name.endsWith(".java") ? [entryPath] : [];
    }),
  );

  return sources.flat();
}

export async function verifyJava(
  comboName: string,
  projectDir: string,
  options?: VerifyOptions,
): Promise<VerifyResult> {
  const steps: StepResult[] = [];
  const buildTool = options?.config?.javaBuildTool;

  if (existsSync(join(projectDir, "pom.xml")) || buildTool === "maven") {
    steps.push(await runStep("test", "bash", ["./mvnw", "-q", "test"], projectDir));
    return wrapResult("java", comboName, projectDir, steps);
  }

  if (existsSync(join(projectDir, "build.gradle.kts")) || buildTool === "gradle") {
    steps.push(await runStep("test", "bash", ["./gradlew", "test", "--no-daemon"], projectDir));
    return wrapResult("java", comboName, projectDir, steps);
  }

  const sourceRoot = join(projectDir, "src", "main", "java");
  const sources = await listJavaSources(sourceRoot);
  if (sources.length === 0) {
    steps.push({
      step: "compile",
      success: false,
      durationMs: 0,
      stderr: "No Java source files found under src/main/java",
      classification: "template",
    });
    return wrapResult("java", comboName, projectDir, steps);
  }

  steps.push(await runStep("compile", "javac", ["-d", "out", ...sources], projectDir));
  return wrapResult("java", comboName, projectDir, steps);
}

export async function verifyElixir(
  comboName: string,
  projectDir: string,
  options?: VerifyOptions,
): Promise<VerifyResult> {
  const steps: StepResult[] = [];

  if (!existsSync(join(projectDir, "mix.exs"))) {
    steps.push(templateFailure("structure", "Expected Elixir project mix.exs"));
    return wrapResult("elixir", comboName, projectDir, steps);
  }

  steps.push(await runStep("setup-hex", "mix", ["local.hex", "--force"], projectDir));
  if (!steps.at(-1)!.success) return wrapResult("elixir", comboName, projectDir, steps);

  steps.push(await runStep("setup-rebar", "mix", ["local.rebar", "--force"], projectDir));
  if (!steps.at(-1)!.success) return wrapResult("elixir", comboName, projectDir, steps);

  steps.push(await runStep("install", "mix", ["deps.get"], projectDir));
  if (!steps.at(-1)!.success) return wrapResult("elixir", comboName, projectDir, steps);

  steps.push(await runStep("compile", "mix", ["compile", "--warnings-as-errors"], projectDir));
  if (!steps.at(-1)!.success) return wrapResult("elixir", comboName, projectDir, steps);

  steps.push(await runStep("test", "mix", ["test"], projectDir));

  return wrapResult("elixir", comboName, projectDir, steps);
}

export async function verifyDotnet(comboName: string, projectDir: string): Promise<VerifyResult> {
  const steps: StepResult[] = [];

  const entries = await readdir(projectDir, { withFileTypes: true });
  const rootProject = entries.find(
    (entry) => entry.isFile() && entry.name.endsWith(".csproj"),
  )?.name;
  if (!rootProject) {
    steps.push(templateFailure("structure", "Expected a .csproj in the .NET project root"));
    return wrapResult("dotnet", comboName, projectDir, steps);
  }

  const testsDir = entries.find((entry) => entry.isDirectory() && entry.name.endsWith(".Tests"));
  const testsProject = testsDir ? join(testsDir.name, `${testsDir.name}.csproj`) : undefined;
  const buildTarget =
    testsProject && existsSync(join(projectDir, testsProject)) ? testsProject : rootProject;

  steps.push(await runStep("restore", "dotnet", ["restore", buildTarget], projectDir));
  if (!steps.at(-1)!.success) return wrapResult("dotnet", comboName, projectDir, steps);

  steps.push(await runStep("build", "dotnet", ["build", buildTarget, "--no-restore"], projectDir));
  if (!steps.at(-1)!.success) return wrapResult("dotnet", comboName, projectDir, steps);

  if (buildTarget !== rootProject) {
    steps.push(await runStep("test", "dotnet", ["test", buildTarget, "--no-build"], projectDir));
  }

  return wrapResult("dotnet", comboName, projectDir, steps);
}

export function getVerifier(
  ecosystem: Ecosystem,
): (comboName: string, projectDir: string, options?: VerifyOptions) => Promise<VerifyResult> {
  switch (ecosystem) {
    case "typescript":
      return verifyTypeScript;
    case "react-native":
      return verifyReactNative;
    case "rust":
      return verifyRust;
    case "python":
      return verifyPython;
    case "go":
      return verifyGo;
    case "java":
      return verifyJava;
    case "elixir":
      return verifyElixir;
    case "dotnet":
      return verifyDotnet;
  }
}
