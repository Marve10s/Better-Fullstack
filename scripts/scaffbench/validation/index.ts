import { createHash } from "node:crypto";
import { existsSync, readdirSync } from "node:fs";
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { bfSpec, HARNESS_VERSION, VALIDATION_CACHE_VERSION, VALIDATION_TIMEOUT_MS } from "../constants";
import { runCommand, tail } from "../agents/command";
import { typecheckGate } from "../scoring";
import { parseJsonc, walk } from "./shared";
import type { BenchmarkSpec, CommandResult, ProjectValidation, RunResult, ScaffbenchOptions, StepResult } from "../types";

// Every manifest the validators understand — Java/Gradle, Elixir, and .NET
// included, so a real backend project is never scored project-not-found just
// because a stray sibling directory forced disambiguation.
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
    return readdirSync(dir).some((name) => name.endsWith(".csproj") || name.endsWith(".sln"));
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

  // Multiple (or zero) candidate dirs: disambiguate by manifest presence so a
  // stray directory the agent created does not shadow the real project, and an
  // ambiguous tree resolves to null rather than a wrong guess.
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

/** Copy the generated project source (excluding heavy build/dependency dirs)
 * from the isolated workspace into the durable grading tree. */
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

// Prompt-path agents choose their own layout, so a manifest is NOT guaranteed to
// sit at the project root (frontend/ + backend/ splits are common). Discover the
// manifest roots for one ecosystem anywhere in the tree (walk() skips
// node_modules/vendor dirs). Sorted shallowest-first so the container root wins.
async function findManifestRoots(projectDir: string, manifests: readonly string[]) {
  const roots = new Set<string>();
  await walk(projectDir, async (filePath) => {
    if (manifests.includes(path.basename(filePath))) roots.add(path.dirname(filePath));
  });
  return [...roots].sort((a, b) => a.length - b.length || a.localeCompare(b));
}

// Keep only roots not contained in another kept root: for workspace-based
// ecosystems (bun/cargo/uv) the shallowest manifest drives its members' builds,
// so validating members separately would double-count the workspace.
function dropNestedRoots(roots: string[]) {
  const kept: string[] = [];
  for (const root of roots) {
    if (!kept.some((k) => root === k || root.startsWith(k + path.sep))) kept.push(root);
  }
  return kept;
}

// Sub-roots beyond the first get their steps namespaced "<rel>:<step>" so one
// ecosystem's verdict can never clobber another's (pre-fix, Object.assign let a
// later ecosystem's install/build keys silently overwrite an earlier one's).
const SUBROOT_CAP = 3;

export async function validateProject(
  spec: BenchmarkSpec,
  projectDir: string | null,
  options: ScaffbenchOptions,
): Promise<ProjectValidation> {
  if (!projectDir) return { projectExists: false, steps: {} };
  const steps: Record<string, StepResult | undefined> = {};

  const prefixFor = (root: string) =>
    root === projectDir ? "" : path.relative(projectDir, root).split(path.sep).join("/");
  const merge = (incoming: Record<string, StepResult | undefined>, prefix: string, eco: string) => {
    for (const [key, step] of Object.entries(incoming)) {
      if (!step) continue;
      const target = prefix ? `${prefix}:${key}` : key;
      // Same-directory ecosystem collision (e.g. root package.json + root
      // Cargo.toml both produce "build"): namespace by ecosystem instead of
      // overwriting the earlier verdict.
      steps[steps[target] === undefined ? target : `${eco}:${key}`] = step;
    }
  };
  // Sub-roots never run the project-level doctor/route checks (bfs metadata and
  // the dev server are root concerns).
  const subOptions = { ...options, doctorCheck: false, routeCheck: false };
  // Roots beyond the cap are disclosed as "na" marker steps (visible in the
  // step record, excluded from scoring) instead of being silently ignored.
  const capRoots = (roots: string[], eco: string) => {
    for (const dropped of roots.slice(SUBROOT_CAP)) {
      steps[`${prefixFor(dropped)}:unvalidated`] = naStep(
        `${eco} root over the ${SUBROOT_CAP}-root cap — not validated`,
      );
    }
    return roots.slice(0, SUBROOT_CAP);
  };

  // TS/bun — workspace-shaped: the shallowest package.json drives its members.
  const bunRoots = capRoots(
    dropNestedRoots(await findManifestRoots(projectDir, ["package.json"])),
    "bun",
  );
  for (const root of bunRoots) {
    const isRoot = root === projectDir;
    const bunSteps = await validateBunProject(root, isRoot ? options : subOptions);
    merge(bunSteps, prefixFor(root), "bun");
    // A root whose validation is install-only (no build script, no typecheck
    // surface) measures ~nothing — the near-vacuous-pass shape. Descend into the
    // member apps so the verdict reflects code, not the root manifest's scripts.
    if (isRoot && bunSteps.install?.exitCode === 0 && !bunSteps.build && !bunSteps.typecheck) {
      const members = dropNestedRoots(
        (await findManifestRoots(projectDir, ["package.json"])).filter((r) => r !== projectDir),
      ).slice(0, SUBROOT_CAP);
      for (const member of members) {
        merge(await validateBunProject(member, subOptions), prefixFor(member), "bun");
      }
    }
  }

  const nativeProfiles = new Set(spec.validationProfile.native ?? []);
  // Rust/Python — workspace-shaped like bun: shallowest manifest wins.
  const cargoRoots = capRoots(
    dropNestedRoots(await findManifestRoots(projectDir, ["Cargo.toml"])),
    "cargo",
  );
  for (const root of cargoRoots) {
    merge(
      await validateCargoProject(root, root === projectDir ? options : subOptions),
      prefixFor(root),
      "cargo",
    );
  }
  const pythonRoots = capRoots(
    dropNestedRoots(await findManifestRoots(projectDir, ["pyproject.toml"])),
    "python",
  );
  for (const root of pythonRoots) {
    merge(
      await validatePythonProject(root, root === projectDir ? options : subOptions),
      prefixFor(root),
      "python",
    );
  }
  // Go — every go.mod is an independent module: `go build ./...` in a parent
  // module never descends into a nested module, so validate each root.
  const goRoots = capRoots(await findManifestRoots(projectDir, ["go.mod"]), "go");
  for (const root of goRoots) {
    merge(
      await validateGoProject(root, root === projectDir ? options : subOptions),
      prefixFor(root),
      "go",
    );
  }
  if (nativeProfiles.has("dotnet") || (await hasDotnetProject(projectDir))) {
    merge(await validateDotnetProject(projectDir, options), "", "dotnet");
  }
  // Java/Elixir run ONLY on an explicit native profile — NOT file autodetect.
  // A React Native app ships an Android `build.gradle` (apps/native/android), and
  // a loose gradle autodetect would wrongly run `gradlew compileJava` on a
  // TS/bun project and clobber its bun validation. Every Java/Elixir spec
  // declares validationProfile.native, so the explicit gate is sufficient.
  if (nativeProfiles.has("java")) {
    merge(await validateJavaProject(projectDir, options), "", "java");
  }
  if (nativeProfiles.has("elixir")) {
    merge(await validateElixirProject(projectDir, options), "", "elixir");
  }

  const validation: ProjectValidation = {
    projectExists: true,
    steps,
    install: steps.install ?? steps.dotnetRestore,
    build: steps.build ?? steps.dotnetBuild ?? steps.cargoCheck,
    checkTypes: steps.typecheck,
    lint: steps.lint,
    format: steps.format,
    test: steps.test,
    doctor: steps.doctor,
    route: steps.route,
  };
  return validation;
}

export async function validateProjectCached(
  spec: BenchmarkSpec,
  projectDir: string,
  options: ScaffbenchOptions,
): Promise<ProjectValidation> {
  const sourceHash = await hashProjectSource(projectDir);
  const cacheKey = validationCacheKey(spec, options, sourceHash);
  const cacheDir = path.join(options.outDir, "validation-cache");
  const cachePath = path.join(cacheDir, `${cacheKey}.json`);

  if (existsSync(cachePath)) {
    try {
      const cached = JSON.parse(await readFile(cachePath, "utf8"));
      if (cached?.validation?.projectExists) {
        return {
          ...cached.validation,
          sourceHash,
          cacheKey,
          cacheHit: true,
          deferred: false,
        };
      }
    } catch {}
  }

  const validation = await validateProject(spec, projectDir, options);
  const withCacheMeta: ProjectValidation = {
    ...validation,
    sourceHash,
    cacheKey,
    cacheHit: false,
    deferred: false,
  };
  if (cacheableValidation(withCacheMeta)) {
    await mkdir(cacheDir, { recursive: true });
    await writeFile(
      cachePath,
      `${JSON.stringify(
        {
          version: VALIDATION_CACHE_VERSION,
          createdAt: new Date().toISOString(),
          specId: spec.id,
          validation: withCacheMeta,
        },
        null,
        2,
      )}\n`,
    );
  }
  return withCacheMeta;
}

function cacheableValidation(validation: ProjectValidation) {
  return !Object.values(validation.steps).some((step) => step?.timedOut || step?.spawnError);
}

function validationCacheKey(spec: BenchmarkSpec, options: ScaffbenchOptions, sourceHash: string) {
  const hash = createHash("sha256");
  hash.update(
    JSON.stringify({
      version: VALIDATION_CACHE_VERSION,
      harnessVersion: HARNESS_VERSION,
      specId: spec.id,
      sourceHash,
      qualityGate: options.qualityGate,
      doctorCheck: options.doctorCheck,
      routeCheck: options.routeCheck,
    }),
  );
  return hash.digest("hex");
}

async function hashProjectSource(projectDir: string) {
  const hash = createHash("sha256");
  for (const filePath of await listHashableFiles(projectDir)) {
    const relative = path.relative(projectDir, filePath).split(path.sep).join("/");
    hash.update(relative);
    hash.update("\0");
    hash.update(await readFile(filePath));
    hash.update("\0");
  }
  return hash.digest("hex");
}

async function listHashableFiles(root: string) {
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
  const files: string[] = [];

  async function walk(dir: string) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (skip.has(entry.name)) continue;
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(entryPath);
      } else if (entry.isFile()) {
        files.push(entryPath);
      }
    }
  }

  await walk(root);
  return files.sort();
}

export async function validateBunProject(projectDir: string, options: ScaffbenchOptions) {
  const steps: Record<string, StepResult | undefined> = {};
  const packageJsonPath = path.join(projectDir, "package.json");
  if (!existsSync(packageJsonPath)) return steps;

  const bun = existsSync(`${process.env.HOME}/.bun/bin/bun`)
    ? `${process.env.HOME}/.bun/bin/bun`
    : "bun";
  steps.install = toStep(await runCommand(bun, ["install"], projectDir, VALIDATION_TIMEOUT_MS));
  if (steps.install.exitCode !== 0 || steps.install.timedOut) return steps;

  const scripts = await readPackageScripts(packageJsonPath);
  if (scripts.build)
    steps.build = toStep(
      await runCommand(bun, ["run", "build"], projectDir, VALIDATION_TIMEOUT_MS),
    );
  const gate = typecheckGate(scripts, existsSync(path.join(projectDir, "tsconfig.json")));
  if (gate === "tsc") {
    // No typecheck script shipped: fall back to `tsc --build` so a TS project
    // cannot dodge type-checking by omitting the script. `--build` (unlike
    // `--noEmit`) descends into project references, so a root tsconfig with
    // `files: []` + `references` still type-checks the referenced app/packages.
    const bunx = existsSync(`${process.env.HOME}/.bun/bin/bunx`)
      ? `${process.env.HOME}/.bun/bin/bunx`
      : "bunx";
    steps.typecheck = toStep(
      await runCommand(bunx, ["tsc", "--build"], projectDir, VALIDATION_TIMEOUT_MS),
    );
  } else if (gate) {
    steps.typecheck = toStep(
      await runCommand(bun, ["run", gate], projectDir, VALIDATION_TIMEOUT_MS),
    );
  }
  // Quality gate — every check is READ-ONLY (never mutates the scaffold) and runs
  // the project-LOCAL, version-pinned tool (node_modules/.bin/*) after install, so
  // the verdict is reproducible and a step can't launder a real problem into a
  // pass by auto-fixing it. A missing tool is a `skipStep` (disqualifies Full),
  // never a silent exit-0 pass — that exit-0 skip + the `biome check --write`
  // fallback were the Finding-1 inflation that made Full == Core for TS cells.
  if (options.qualityGate || scripts.lint) {
    const biomeBin = localBin(projectDir, "biome");
    const eslintBin = localBin(projectDir, "eslint");
    steps.lint = scripts.lint
      ? toStep(await runCommand(bun, ["run", "lint"], projectDir, VALIDATION_TIMEOUT_MS))
      : biomeBin
        ? toStep(await runCommand(biomeBin, ["lint", "."], projectDir, VALIDATION_TIMEOUT_MS))
        : eslintBin
          ? toStep(await runCommand(eslintBin, ["."], projectDir, VALIDATION_TIMEOUT_MS))
          : skipStep("lint (no linter configured)");
  }
  if (options.qualityGate) {
    // Read-only format check — deliberately NOT the project's `format`/`check`
    // scripts: generated BFS projects ship `check: biome check --write .`, which
    // auto-fixes and always exits 0. `biome format` (no --write) / `prettier
    // --check` report formatting drift without writing. NOTE: Biome 2.5.1 removed
    // the `--check` flag ("--check is not expected in this context"); the default
    // `biome format` is already read-only and exits non-zero on unformatted code.
    const biomeBin = localBin(projectDir, "biome");
    const prettierBin = localBin(projectDir, "prettier");
    steps.format = biomeBin
      ? toStep(await runCommand(biomeBin, ["format", "."], projectDir, VALIDATION_TIMEOUT_MS))
      : prettierBin
        ? toStep(await runCommand(prettierBin, ["--check", "."], projectDir, VALIDATION_TIMEOUT_MS))
        : skipStep("format (no formatter configured)");
    // A scaffold with no test script is genuinely testless -> n/a (excluded from
    // Full), neither a free pass nor a failure.
    steps.test = scripts.test
      ? toStep(await runCommand(bun, ["run", "test"], projectDir, VALIDATION_TIMEOUT_MS))
      : naStep("test (no test script)");
  }
  if (options.doctorCheck) {
    const bunx = existsSync(`${process.env.HOME}/.bun/bin/bunx`)
      ? `${process.env.HOME}/.bun/bin/bunx`
      : "bunx";
    steps.doctor = toStep(
      await runCommand(
        bunx,
        [bfSpec("create-better-fullstack"), "doctor", ".", "--skip-checks", "--json"],
        projectDir,
        VALIDATION_TIMEOUT_MS,
      ),
    );
  }
  if (options.routeCheck) {
    steps.route = scripts.dev
      ? await runProjectRouteCheck(projectDir, options.outDir)
      : naStep("route-check (no dev script)");
  }

  return steps;
}

async function runProjectRouteCheck(projectDir: string, outDir: string): Promise<StepResult> {
  const config = await readRouteCheckConfig(projectDir);
  if (!config) return naStep("route-check (missing Better-Fullstack route metadata)");

  const start = Date.now();
  let handle: any = null;
  try {
    const devCheck = await import("../testing/lib/dev-check");
    const routeCheck = await import("../testing/lib/route-check");
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
        const devCheck = await import("../testing/lib/dev-check");
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

export async function validateCargoProject(projectDir: string, options: ScaffbenchOptions) {
  const steps: Record<string, StepResult | undefined> = {};
  if (!existsSync(path.join(projectDir, "Cargo.toml"))) return steps;
  steps.cargoCheck = toStep(
    await runCommand("cargo", ["check"], projectDir, VALIDATION_TIMEOUT_MS),
  );
  if (options.qualityGate) {
    steps.format = toStep(
      await runCommand("cargo", ["fmt", "--check"], projectDir, VALIDATION_TIMEOUT_MS),
    );
    steps.lint = toStep(
      await runCommand(
        "cargo",
        ["clippy", "--", "-D", "warnings"],
        projectDir,
        VALIDATION_TIMEOUT_MS,
      ),
    );
    steps.test = toStep(await runCommand("cargo", ["test"], projectDir, VALIDATION_TIMEOUT_MS));
  }
  return steps;
}

export async function validatePythonProject(projectDir: string, options: ScaffbenchOptions) {
  const steps: Record<string, StepResult | undefined> = {};
  if (!existsSync(path.join(projectDir, "pyproject.toml"))) return steps;
  steps.install =
    steps.install ??
    toStep(await runCommand("uv", ["sync", "--all-extras"], projectDir, VALIDATION_TIMEOUT_MS));
  if (steps.install.exitCode !== 0 || steps.install.timedOut) return steps;
  const srcDir = existsSync(path.join(projectDir, "src")) ? "src/" : ".";
  steps.typecheck = toStep(
    await runCommand(
      "uv",
      ["run", "python", "-m", "compileall", "-q", srcDir],
      projectDir,
      VALIDATION_TIMEOUT_MS,
    ),
  );
  if (options.qualityGate) {
    steps.lint = toStep(
      await runCommand("uv", ["run", "ruff", "check", "."], projectDir, VALIDATION_TIMEOUT_MS),
    );
    // Read-only format check, for parity with the TS/Rust/Go gates (was missing).
    steps.format = toStep(
      await runCommand(
        "uv",
        ["run", "ruff", "format", "--check", "."],
        projectDir,
        VALIDATION_TIMEOUT_MS,
      ),
    );
    // pytest exit 5 = "no tests collected": a genuinely testless scaffold -> n/a
    // (excluded from Full), not a failure (the old bare pytest would fail it) and
    // not a pass. Any other non-zero stays a real test failure.
    const pytest = toStep(
      await runCommand("uv", ["run", "pytest"], projectDir, VALIDATION_TIMEOUT_MS),
    );
    steps.test = pytest.exitCode === 5 ? naStep("pytest (no tests collected)") : pytest;
  }
  return steps;
}

export async function validateGoProject(projectDir: string, options: ScaffbenchOptions) {
  const steps: Record<string, StepResult | undefined> = {};
  if (!existsSync(path.join(projectDir, "go.mod"))) return steps;
  steps.install =
    steps.install ??
    toStep(await runCommand("go", ["mod", "tidy"], projectDir, VALIDATION_TIMEOUT_MS));
  if (steps.install.exitCode !== 0 || steps.install.timedOut) return steps;
  steps.build =
    steps.build ??
    toStep(await runCommand("go", ["build", "./..."], projectDir, VALIDATION_TIMEOUT_MS));
  if (options.qualityGate) {
    steps.lint = toStep(
      await runCommand("go", ["vet", "./..."], projectDir, VALIDATION_TIMEOUT_MS),
    );
    // Read-only format check, for parity with the other gates (was missing).
    // `gofmt -l .` lists unformatted files but exits 0 regardless, so treat any
    // listed file as a failure.
    const gofmt = await runCommand("gofmt", ["-l", "."], projectDir, VALIDATION_TIMEOUT_MS);
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
    // go test reports "no test files" and exits 0 for a testless scaffold, which
    // is an acceptable trivially-green test step (cf. cargo test). (TS/Python map
    // their testless idioms to n/a; the Full outcome is the same either way.)
    steps.test = toStep(
      await runCommand("go", ["test", "./..."], projectDir, VALIDATION_TIMEOUT_MS),
    );
  }
  return steps;
}

export async function validateDotnetProject(projectDir: string, options: ScaffbenchOptions) {
  const steps: Record<string, StepResult | undefined> = {};
  const roots = await findDotnetRoots(projectDir);
  if (roots.length === 0) return steps;

  const serverRoot = roots.find((root) => root.endsWith(path.join("apps", "server"))) ?? roots[0];
  steps.dotnetRestore = toStep(
    await runCommand("dotnet", ["restore"], serverRoot, VALIDATION_TIMEOUT_MS),
  );
  if (steps.dotnetRestore.exitCode !== 0 || steps.dotnetRestore.timedOut) return steps;
  steps.dotnetBuild = toStep(
    await runCommand("dotnet", ["build", "--no-restore"], serverRoot, VALIDATION_TIMEOUT_MS),
  );
  if (options.qualityGate) {
    steps.test = toStep(
      await runCommand("dotnet", ["test", "--no-build"], serverRoot, VALIDATION_TIMEOUT_MS),
    );
  }
  return steps;
}

// Locate the build root for a non-TS ecosystem by its manifest file. Prefers a
// backend under apps/server (multi-ecosystem graph layout), else the shallowest
// match. Returns null when no manifest is present (the validator then no-ops).
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
    list.sort((a, b) => a.length - b.length)[0]
  );
}

export async function validateJavaProject(projectDir: string, options: ScaffbenchOptions) {
  const steps: Record<string, StepResult | undefined> = {};
  const root = await findBuildRoot(projectDir, ["pom.xml", "build.gradle", "build.gradle.kts"]);
  if (!root) return steps;
  // Prefer the project's wrapper (pins the build-tool version and works even
  // when the system binary is absent — e.g. gradle via ./gradlew); else the
  // system binary. Tests stay an advisory step under the quality gate so the
  // build verdict reflects compilation, not test outcomes.
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
  steps.build = toStep(await runCommand(bin, [...buildArgs], root, VALIDATION_TIMEOUT_MS));
  if (steps.build.exitCode !== 0 || steps.build.timedOut) return steps;
  if (options.qualityGate) {
    steps.test = toStep(await runCommand(bin, [...testArgs], root, VALIDATION_TIMEOUT_MS));
  }
  return steps;
}

export async function validateElixirProject(projectDir: string, options: ScaffbenchOptions) {
  const steps: Record<string, StepResult | undefined> = {};
  const root = await findBuildRoot(projectDir, ["mix.exs"]);
  if (!root) return steps;
  steps.install = toStep(await runCommand("mix", ["deps.get"], root, VALIDATION_TIMEOUT_MS));
  if (steps.install.exitCode !== 0 || steps.install.timedOut) return steps;
  steps.build = toStep(await runCommand("mix", ["compile"], root, VALIDATION_TIMEOUT_MS));
  if (steps.build.exitCode !== 0 || steps.build.timedOut) return steps;
  if (options.qualityGate) {
    // Read-only format check, for parity with the other ecosystem gates.
    steps.format = toStep(
      await runCommand("mix", ["format", "--check-formatted"], root, VALIDATION_TIMEOUT_MS),
    );
    steps.test = toStep(await runCommand("mix", ["test"], root, VALIDATION_TIMEOUT_MS));
  }
  return steps;
}

async function hasDotnetProject(projectDir: string) {
  return (await findDotnetRoots(projectDir)).length > 0;
}

export async function findDotnetRoots(projectDir: string) {
  const roots = new Set<string>();
  await walk(projectDir, async (filePath) => {
    if (filePath.endsWith(".csproj")) roots.add(path.dirname(filePath));
  });
  return [...roots];
}

function toStep(result: CommandResult): StepResult {
  const { stdout: _stdout, stderr: _stderr, ...step } = result;
  return step;
}

// A quality-gate check that SHOULD have run but no tool was configured/detected.
// NOT a pass — it disqualifies a Full pass. exitCode null (never 0) so the
// steps.every(exitCode === 0) scoring can't read it as green (the Finding-1 bug).
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

// A check that is legitimately not applicable (e.g. a scaffold with genuinely no
// tests, or a route-check with no dev server). Excluded from scoring — neither
// pass nor fail. exitCode null so it can never read as a green run either.
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

// Resolve a project-local CLI binary (node_modules/.bin/<name>) so the gate runs
// the version the project pins, not a bunx-latest download (which drifts the
// verdict run-to-run). Returns null if the tool is not installed in the project.
function localBin(projectDir: string, name: string): string | null {
  const p = path.join(projectDir, "node_modules", ".bin", name);
  return existsSync(p) ? p : null;
}

async function readPackageScripts(packageJsonPath: string) {
  try {
    const parsed = JSON.parse(await readFile(packageJsonPath, "utf8"));
    return (parsed.scripts ?? {}) as Record<string, string>;
  } catch {
    return {};
  }
}

/** Decide how a TS project is type-checked: prefer its own script, else fall
 * back to a direct `tsc --noEmit` when a tsconfig exists, so a project cannot
 * dodge type-checking by omitting the script. Returns null when there is
 * genuinely nothing to type-check (no script and no tsconfig). */

