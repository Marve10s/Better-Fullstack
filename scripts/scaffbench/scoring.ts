import { existsSync } from "node:fs";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { walk, parseJsonc } from "@/validation/shared";
import type { BenchmarkSpec, CommandDisciplineCheck, CommandResult, CreationPath, FailureTag, ProjectIndex, PromptStyle, RunOutcome, RunResult, ScaffbenchOptions, StackScore, StepResult, ToolCompliance } from "@/types";

export function typecheckGate(
  scripts: Record<string, string>,
  hasTsconfig: boolean,
): "check-types" | "typecheck" | "tsc" | null {
  if (scripts["check-types"]) return "check-types";
  if (scripts.typecheck) return "typecheck";
  if (hasTsconfig) return "tsc";
  return null;
}

/**
 * Score the libraries actually wired into the generated tree (dependency
 * declarations + source imports + required files). This is the primary
 * "right libs" signal for EVERY creation path, so a broken or empty generated
 * package (e.g. a db package that declares nothing and is imported nowhere) no
 * longer earns full stack credit on the strength of bts.jsonc alone.
 */
export async function scoreArtifact(spec: BenchmarkSpec, projectDir: string): Promise<StackScore> {
  return scoreMarkers(spec, await collectProjectIndex(projectDir));
}

/**
 * Two complementary stack signals:
 * - `artifact`: what is actually wired in the emitted project (primary).
 * - `faithfulness`: assisted paths only — whether Better-Fullstack's own
 *   bts.jsonc echoes the requested stack. A generator-honesty diagnostic, not
 *   the capability metric. A high faithfulness with a low artifact score is the
 *   signature of a generator that recorded a library it never wired.
 */
export async function scoreProject(
  spec: BenchmarkSpec,
  projectDir: string,
  promptStyle: PromptStyle = "explicit",
): Promise<{ artifact: StackScore; faithfulness?: StackScore; acceptance?: StackScore }> {
  const index = await collectProjectIndex(projectDir);
  const artifact = scoreMarkers(spec, index);
  const btsPath = path.join(projectDir, "bts.jsonc");
  const faithfulness = existsSync(btsPath)
    ? scoreBts(spec, await readFile(btsPath, "utf8"))
    : undefined;
  // Discovery lane only: how many capabilities are satisfied by ANY accepted
  // library, so reasonable alternatives are credited (vs. the strict markers).
  const acceptance =
    promptStyle === "natural" && spec.acceptanceSets
      ? scoreAcceptance(spec.acceptanceSets, index)
      : undefined;
  return { artifact, faithfulness, acceptance };
}

function scoreAcceptance(
  acceptanceSets: Record<string, readonly string[]>,
  index: ProjectIndex,
): StackScore {
  const deps = [...index.dependencies];
  const files = [...index.files];
  const capabilities = Object.entries(acceptanceSets);
  const misses: string[] = [];
  let matched = 0;
  for (const [capability, accepted] of capabilities) {
    const satisfied = accepted.some((pattern) => acceptancePatternMatch(pattern, deps, files));
    if (satisfied) matched += 1;
    else misses.push(capability);
  }
  return scoreFromCounts(matched, capabilities.length, misses);
}

/**
 * Match an acceptance pattern precisely — NOT a substring over all project text,
 * which would credit `ai` from `tailwindcss` or `vite` from `vitest`. A path-like
 * pattern (starts with `.`) matches a file path; otherwise it matches a dependency
 * exactly or as a scoped-package prefix (`@ai-sdk` → `@ai-sdk/react`).
 */
function acceptancePatternMatch(
  pattern: string,
  deps: readonly string[],
  files: readonly string[],
): boolean {
  if (pattern.startsWith(".")) {
    return files.some((file) => file === pattern || file.includes(`${pattern}/`));
  }
  // A pattern already ending in "/" is an explicit scope prefix (e.g. "@auth/"
  // → "@auth/core"); don't append a second slash.
  const prefix = pattern.endsWith("/") ? pattern : `${pattern}/`;
  return deps.some((dep) => dep === pattern || dep.startsWith(prefix));
}

export function scoreBts(spec: BenchmarkSpec, raw: string): StackScore {
  const config = parseJsonc(raw);
  if (!config) return emptyScore(spec);

  if (spec.expectedParts?.length) {
    return scoreStackParts(spec, config);
  }

  const misses: string[] = [];
  let matched = 0;
  let total = 0;

  for (const [key, expected] of Object.entries(spec.expectedConfig ?? {})) {
    const expectedValues = Array.isArray(expected) ? expected : [expected];
    const actual = config[key];
    total += expectedValues.length;
    if (Array.isArray(actual)) {
      for (const expectedValue of expectedValues) {
        if (actual.includes(expectedValue)) matched += 1;
        else misses.push(`${key}: missing ${expectedValue}`);
      }
    } else {
      const expectedValue = expectedValues[0];
      if (actual === expectedValue) matched += 1;
      else misses.push(`${key}: expected ${expectedValue}, got ${String(actual)}`);
    }
  }

  for (const addon of spec.expectedAddons ?? []) {
    total += 1;
    if (Array.isArray(config.addons) && config.addons.includes(addon)) matched += 1;
    else misses.push(`addons: missing ${addon}`);
  }

  return scoreFromCounts(matched, total, misses);
}

function scoreStackParts(spec: BenchmarkSpec, config: Record<string, any>): StackScore {
  const actualParts = new Set(formatConfigStackParts(config.stackParts ?? []));
  const misses: string[] = [];
  let matched = 0;
  let total = 0;

  for (const expectedPart of spec.expectedParts ?? []) {
    total += 1;
    if (actualParts.has(expectedPart)) matched += 1;
    else misses.push(`stackParts: missing ${expectedPart}`);
  }

  for (const addon of spec.expectedAddons ?? []) {
    total += 1;
    if (Array.isArray(config.addons) && config.addons.includes(addon)) matched += 1;
    else misses.push(`addons: missing ${addon}`);
  }

  return scoreFromCounts(matched, total, misses);
}

function formatConfigStackParts(stackParts: readonly Record<string, any>[]) {
  const byId = new Map(stackParts.map((part) => [part.id, part]));
  return stackParts
    .filter((part) => part.source !== "provided")
    .map((part) => {
      if (!part.ownerPartId) return `${part.role}:${part.ecosystem}:${part.toolId}`;
      const owner = byId.get(part.ownerPartId);
      const ownerRole = owner?.role ?? part.ownerPartId.split(":")[0] ?? "backend";
      return `${ownerRole}.${part.role}:${part.ecosystem}:${part.toolId}`;
    });
}

function scoreMarkers(spec: BenchmarkSpec, index: ProjectIndex): StackScore {
  const misses: string[] = [];
  let matched = 0;

  for (const marker of spec.strictMarkers) {
    const depsMatch = !marker.deps || marker.deps.every((dep) => index.dependencies.has(dep));
    const sourceMatch =
      !marker.source || marker.source.every((pattern) => index.sourceText.includes(pattern));
    const textMatch =
      !marker.text || marker.text.every((pattern) => index.allText.includes(pattern));
    const filesMatch = !marker.files || marker.files.every((filePath) => index.files.has(filePath));
    const forbiddenDepsMatch =
      !marker.forbiddenDeps || marker.forbiddenDeps.every((dep) => !index.dependencies.has(dep));
    const forbiddenTextMatch =
      !marker.forbiddenText ||
      marker.forbiddenText.every((pattern) => !index.allText.includes(pattern));

    if (
      depsMatch &&
      sourceMatch &&
      textMatch &&
      filesMatch &&
      forbiddenDepsMatch &&
      forbiddenTextMatch
    ) {
      matched += 1;
    } else {
      misses.push(marker.id);
    }
  }

  return scoreFromCounts(matched, spec.strictMarkers.length, misses);
}

function scoreFromCounts(matched: number, total: number, misses: string[]): StackScore {
  return {
    matched,
    total,
    percent: total > 0 ? Math.round((matched / total) * 100) : 0,
    misses,
  };
}

export function emptyArtifactScore(spec: BenchmarkSpec): StackScore {
  return {
    matched: 0,
    total: spec.strictMarkers.length,
    percent: 0,
    misses: ["project not found or unscorable"],
  };
}

export function emptyAcceptanceScore(spec: BenchmarkSpec): StackScore {
  return {
    matched: 0,
    total: Object.keys(spec.acceptanceSets ?? {}).length,
    percent: 0,
    misses: ["project not found"],
  };
}

function emptyScore(spec: BenchmarkSpec): StackScore {
  const total =
    (spec.expectedParts?.length ?? 0) +
    Object.values(spec.expectedConfig ?? {}).reduce(
      (sum, value) => sum + (Array.isArray(value) ? value.length : 1),
      0,
    ) +
    (spec.expectedAddons?.length ?? 0);
  return {
    matched: 0,
    total: total || spec.strictMarkers.length,
    percent: 0,
    misses: ["project not found or unscorable"],
  };
}

async function collectProjectIndex(projectDir: string): Promise<ProjectIndex> {
  const index: ProjectIndex = {
    dependencies: new Set(),
    files: new Set(),
    packageText: "",
    sourceText: "",
    configText: "",
    allText: "",
  };

  await walk(projectDir, async (filePath) => {
    const relativePath = path.relative(projectDir, filePath);
    index.files.add(relativePath);
    if (
      !/(package\.json|Cargo\.toml|go\.mod|pyproject\.toml|pom\.xml|mix\.exs|\.csproj|\.gradle|\.kts|\.ts|\.tsx|\.js|\.jsx|\.mjs|\.cjs|\.rs|\.go|\.py|\.cs|\.java|\.kt|\.exs|\.ex|\.heex|\.json|\.toml|\.yml|\.yaml)$/.test(
        filePath,
      )
    ) {
      return;
    }
    const info = await stat(filePath);
    if (info.size > 250_000) return;
    const content = await readFile(filePath, "utf8");
    index.allText += `\n${content}`;

    if (path.basename(filePath) === "package.json") {
      index.packageText += `\n${content}`;
      collectPackageDependencies(index.dependencies, content);
      return;
    }

    if (/\.(ts|tsx|js|jsx|mjs|cjs|rs|go|py|cs)$/.test(filePath)) {
      index.sourceText += `\n${content}`;
      return;
    }

    index.configText += `\n${content}`;
  });

  return index;
}

function collectPackageDependencies(target: Set<string>, rawPackageJson: string) {
  try {
    const parsed = JSON.parse(rawPackageJson);
    for (const section of [
      "dependencies",
      "devDependencies",
      "peerDependencies",
      "optionalDependencies",
    ]) {
      for (const dep of Object.keys(parsed[section] ?? {})) {
        target.add(dep);
      }
    }
  } catch {}
}

/** Extract the agent's tool calls from a stream-json transcript (assistant
 * `tool_use` blocks). Returns [] for non-stream output, so callers degrade to
 * the bts.jsonc safety net rather than crashing. */
export function extractToolUses(stdout: string): { name: string; command?: string }[] {
  const uses: { name: string; command?: string }[] = [];
  for (const line of stdout.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("{")) continue;
    let event: any;
    try {
      event = JSON.parse(trimmed);
    } catch {
      continue;
    }
    // Claude stream-json: message.content[] blocks of type "tool_use".
    const content = event?.message?.content;
    if (Array.isArray(content)) {
      for (const block of content) {
        if (block?.type === "tool_use" && typeof block.name === "string") {
          const command =
            typeof block.input?.command === "string" ? block.input.command : undefined;
          uses.push({ name: block.name, command });
        }
      }
    }
    // Codex JSONL: item.completed events carry mcp_tool_call (name in `tool`) and
    // command_execution (shell string in `command`) items.
    if (event?.type === "item.completed" && event.item) {
      const item = event.item;
      if (item.type === "mcp_tool_call" && typeof item.tool === "string") {
        uses.push({ name: item.tool });
      } else if (item.type === "command_execution" && typeof item.command === "string") {
        uses.push({ name: "bash", command: item.command });
      }
    }
    // opencode / Kilo Code JSONL: a part of type "tool" carries the tool name
    // (part.tool, e.g. "bash" or "better-fullstack_bfs_create_project") and, for
    // the bash tool, the shell command in state.input.command.
    if (event?.part?.type === "tool" && typeof event.part.tool === "string") {
      const command =
        typeof event.part.state?.input?.command === "string"
          ? event.part.state.input.command
          : undefined;
      uses.push({ name: event.part.tool, command });
    }
  }
  return uses;
}

export async function scoreToolCompliance(
  pathMode: CreationPath,
  projectDir: string | null,
  claude: CommandResult,
): Promise<ToolCompliance> {
  const toolUses = extractToolUses(claude.stdout);
  const hasBtsConfig = projectDir ? existsSync(path.join(projectDir, "bts.jsonc")) : false;

  // Grounded in the actual tool trajectory, not a grep of the result envelope.
  const usedBfsCreate = toolUses.some((use) => /bfs_create_project/i.test(use.name));
  const usedAnyBfsTool = toolUses.some((use) => /bfs_/i.test(use.name));
  const bashCommands = toolUses
    .filter((use) => /(^|_)bash$/i.test(use.name))
    .map((use) => (use.command ?? "").toLowerCase());
  const isBfsCli = (cmd: string) => /create\s+better-fullstack|create-better-fullstack/.test(cmd);
  const ranBfsCli = bashCommands.some(isBfsCli);
  // Order matters: the FIRST real scaffold invocation must be the dry-run, so a
  // transcript that writes for real and only dry-runs afterward fails the check.
  // --help/--version probes inspect flags without scaffolding, so they don't count.
  const bfsScaffoldCommands = bashCommands.filter(
    (cmd) => isBfsCli(cmd) && !/--help|--version/.test(cmd),
  );
  const dryRanFirst =
    bfsScaffoldCommands.length > 0 && bfsScaffoldCommands[0].includes("--dry-run");

  const checks: CommandDisciplineCheck[] = [];
  if (pathMode === "prompt") {
    checks.push({
      id: "no-bf-config",
      status: hasBtsConfig ? "fail" : "pass",
      detail: "prompt-only must not produce bts.jsonc",
    });
    checks.push({
      id: "no-bf-tool",
      status: usedAnyBfsTool || ranBfsCli ? "fail" : "pass",
      detail: "prompt-only must not call a Better-Fullstack MCP tool or CLI",
    });
  } else if (pathMode === "cli") {
    checks.push({
      id: "used-cli",
      status: ranBfsCli || hasBtsConfig ? "pass" : "fail",
      detail: "CLI path must run bun create better-fullstack",
    });
    checks.push({
      id: "dry-run-first",
      status: dryRanFirst ? "pass" : "fail",
      detail: "CLI path must dry-run before writing",
    });
    checks.push({
      id: "no-mcp",
      status: usedBfsCreate ? "fail" : "pass",
      detail: "CLI path must not use MCP creation",
    });
  } else {
    checks.push({
      id: "used-mcp",
      status: usedBfsCreate || hasBtsConfig ? "pass" : "fail",
      detail: "MCP path must call bfs_create_project",
    });
    checks.push({
      id: "no-cli-create",
      status: ranBfsCli ? "fail" : "pass",
      detail: "MCP path must not run bun create better-fullstack",
    });
  }

  // Every check is now definitive (pass/fail) — none are dropped from the score.
  const score = checks.filter((check) => check.status === "pass").length;
  return { score, total: checks.length, checks };
}

// A step is "advisory" (quality tier) when it measures polish rather than
// whether the project works: lint/format/test/doctor/route. These mirror the
// solvability gate's ADVISORY_STEPS. CORE steps (install/build/typecheck/native
// compile) decide whether a scaffold actually builds and runs — a formatting
// nit or a style-lint warning must never read as a broken project.
const ADVISORY_STEP_KEYS = new Set(["lint", "format", "test", "doctor", "route"]);
// Step keys may be namespaced "<subroot>:<step>" (multi-root projects); the
// advisory/core split is decided by the base step name after the last ":".
export function stepBaseName(name: string) {
  return name.slice(name.lastIndexOf(":") + 1);
}
function isAdvisoryStep(name: string) {
  return ADVISORY_STEP_KEYS.has(stepBaseName(name));
}

// Applicable steps (a real check that should be judged) whose key matches the
// predicate. "na" steps (e.g. a genuinely testless scaffold) are excluded —
// neither pass nor fail.
function applicableSteps(result: RunResult, predicate: (name: string) => boolean): StepResult[] {
  return Object.entries(result.validation.steps)
    .filter((entry): entry is [string, StepResult] => Boolean(entry[1]))
    .filter(([name, step]) => step.status !== "na" && predicate(name))
    .map(([, step]) => step);
}

// A "skip" (a check that should have run but no tool was configured) is NOT a
// pass — it disqualifies the tier. (Pre-fix, skips carried exitCode 0 and passed
// silently: the Finding-1 inflation.)
function stepsAllGreen(steps: readonly StepResult[]) {
  return steps.every(
    (step) => step.status !== "skip" && step.exitCode === 0 && !step.timedOut && !step.spawnError,
  );
}

/**
 * Core pass — the headline "does it actually build and run?" signal, and the
 * basis of the reported pass rate / classifyOutcome. Requires every applicable
 * CORE step (install/build/typecheck/native compile) to be a real green run;
 * advisory polish checks (lint/format/test/doctor/route) are excluded, so a
 * project that builds and runs but is mis-formatted is NOT scored as broken.
 * This matches the solvability gate's contract exactly.
 */
export function validationPassed(result: RunResult) {
  if (result.validation.deferred) return false;
  if (!result.validation.projectExists) return false;
  const core = applicableSteps(result, (name) => !isAdvisoryStep(name));
  // A run with zero applicable CORE steps must NOT pass vacuously (`[].every(...)`
  // is true): the agent left a directory but no recognizable manifest, so no
  // build/typecheck validator fired — an unbuildable project, not a success.
  if (core.length === 0) return false;
  return stepsAllGreen(core);
}

/**
 * Quality pass — the stricter, advisory tier: core passed AND every applicable
 * lint/format/test/doctor/route check is green. Reported as a SEPARATE signal
 * (qualityPassRate); it never demotes the core pass rate, so formatting is a
 * quality metric rather than a brokenness verdict.
 */
export function qualityPassed(result: RunResult) {
  if (!validationPassed(result)) return false;
  return stepsAllGreen(applicableSteps(result, isAdvisoryStep));
}

function isBudgetExhausted(terminalReason: string | undefined) {
  return terminalReason ? /budget|cost[_-]?limit|max[_-]?cost|spend/i.test(terminalReason) : false;
}

/**
 * Three-way run outcome so the headline pass rate reflects model capability,
 * not the test machine. An "infra-inconclusive" run is one where the harness or
 * environment — not the model — prevented a clean measurement (a missing
 * toolchain binary, a validation step that timed out, an exhausted token
 * budget, or a generation that crashed without producing anything). These are
 * excluded from the pass-rate denominator by `aggregateBy`.
 */
export function classifyOutcome(result: RunResult): RunOutcome {
  if (result.validation.deferred) return "infra-inconclusive";
  if (isInfraInconclusive(result)) return "infra-inconclusive";
  return validationPassed(result) ? "success" : "model-failure";
}

function isInfraInconclusive(result: RunResult): boolean {
  // NOTE: a generation timeout (claude.timedOut) is intentionally NOT here — an
  // agent that cannot finish within the generous gen budget is a real failure
  // (cf. SWE-bench, which scores agent-loop timeouts as unresolved). Only
  // environment/harness problems below are excluded from the pass denominator.
  if (isBudgetExhausted(result.claude.terminalReason)) return true;
  // claude crashed/blipped (e.g. MCP startup failure) without producing anything
  if (
    result.claude.exitCode !== 0 &&
    !result.validation.projectExists &&
    !result.claude.outputTokens
  ) {
    return true;
  }
  let sdkGap = false;
  for (const step of Object.values(result.validation.steps)) {
    if (!step) continue;
    if (step.timedOut) return true;
    if (step.spawnError) return true; // validator binary itself could not be spawned
    // dotnet SDK-version resolution failure: the muxer exists but the SDK pinned
    // by the project's global.json is not installed on this machine — a missing
    // toolchain (environment gap), not a model-authored break.
    if (isDotnetSdkNotFound(step)) sdkGap = true;
  }
  if (sdkGap) {
    // Inconclusive only when the SDK gap is the SOLE blocker: a run whose other
    // core steps already failed on their own is broken regardless of the missing
    // SDK, and excluding it from the denominator would flatter the model.
    const otherCoreFailure = Object.entries(result.validation.steps).some(
      ([name, step]) =>
        step &&
        !isAdvisoryStep(name) &&
        step.status !== "na" &&
        !isDotnetSdkNotFound(step) &&
        step.exitCode !== null &&
        step.exitCode !== 0,
    );
    if (!otherCoreFailure) return true;
  }
  return false;
}

const DOTNET_SDK_NOT_FOUND =
  /A compatible \.NET SDK was not found|Install the \[[^\]]*\] \.NET SDK/;
function isDotnetSdkNotFound(step: StepResult) {
  if (step.exitCode === 0 || step.exitCode === null) return false;
  return (
    DOTNET_SDK_NOT_FOUND.test(step.stderrTail ?? "") ||
    DOTNET_SDK_NOT_FOUND.test(step.stdoutTail ?? "")
  );
}

export function deriveFailureTags(result: RunResult): FailureTag[] {
  const tags = new Set<FailureTag>();
  if (result.validation.deferred) tags.add("validation-deferred");
  if (result.claude.timedOut) tags.add("claude-timeout");
  if (result.claude.exitCode !== 0) tags.add("claude-error");
  if (isBudgetExhausted(result.claude.terminalReason)) tags.add("budget-exhausted");
  if (!result.validation.projectExists) tags.add("project-not-found");
  if (result.stackScore.matched < result.stackScore.total) tags.add("stack-mismatch");
  // bts.jsonc records the full stack but the artifact does not wire it (e.g. an
  // empty generated package): the generator claimed more than it produced.
  if (
    result.generatorFaithfulness &&
    result.generatorFaithfulness.percent === 100 &&
    result.stackScore.percent < 100
  ) {
    tags.add("stack-unwired");
  }
  if (result.toolCompliance.checks.some((check) => check.status === "fail")) {
    tags.add("tool-violation");
    tags.add("command-discipline");
  }

  for (const [name, step] of Object.entries(result.validation.steps)) {
    if (!step || (step.exitCode === 0 && !step.timedOut)) continue;
    // Each failing step gets its specific tag below (lint-failed/format-failed/…)
    // for visibility, but the generic "validation-failed" (= broken) is added
    // ONCE, at the end, keyed strictly to a CORE failure — so a cosmetic
    // lint/format failure is surfaced without flagging the project as broken.
    if (step.spawnError || isDotnetSdkNotFound(step)) {
      // The validator binary itself could not be spawned (e.g. cargo/uv/go/dotnet
      // not on PATH), or the .NET SDK pinned by global.json is not installed: an
      // environment problem, not a model-authored break. A child process that ran
      // and exited 127 (e.g. a generated `bun run build` whose script references
      // a missing bin) is NOT this — it falls through below.
      tags.add("toolchain-missing");
      continue;
    }
    // Match on the lowercased base name (after any "<subroot>:" namespace) so
    // camelCase keys tag correctly — pre-fix, "dotnetBuild" never matched
    // "build" and .NET build breaks were untagged.
    const base = stepBaseName(name).toLowerCase();
    if (base.includes("install") || base.includes("restore")) tags.add("install-failed");
    if (base.includes("build") || base.includes("cargocheck")) tags.add("build-failed");
    if (base.includes("typecheck")) tags.add("typecheck-failed");
    if (base.includes("lint")) tags.add("lint-failed");
    if (base.includes("format")) tags.add("format-failed");
    if (base.includes("test")) tags.add("test-failed");
    if (base.includes("doctor")) tags.add("doctor-failed");
    if (base.includes("route")) tags.add("route-failed");
  }

  if (!result.validation.deferred && !validationPassed(result)) tags.add("validation-failed");
  return [...tags].sort();
}

