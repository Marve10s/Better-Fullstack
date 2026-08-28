import type {
  BenchmarkSpec,
  CommandDisciplineCheck,
  CommandResult,
  CreationPath,
  FailureTag,
  ProjectIndex,
  PromptStyle,
  OutcomeEvidence,
  RunOutcome,
  RunOutcomeRollup,
  RunResult,
  ScaffbenchOptions,
  StackScore,
  StepResult,
  ToolCompliance,
} from "@scaffbench/types";

import { ESTIMATED_BUDGET_TOLERANCE, SCAFFBENCH_SPEC_SCORE_WEIGHTS } from "@scaffbench/constants";
import { isRecurringTransientFailure } from "@scaffbench/validation/classification";
import { walk, parseJsonc } from "@scaffbench/validation/shared";
import { existsSync } from "node:fs";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

export function typecheckGate(
  scripts: Record<string, string>,
  hasTsconfig: boolean,
): "check-types" | "typecheck" | "tsc" | null {
  if (scripts["check-types"]) return "check-types";
  if (scripts.typecheck) return "typecheck";
  if (hasTsconfig) return "tsc";
  return null;
}

export async function scoreArtifact(
  spec: BenchmarkSpec,
  projectDir: string,
  promptStyle: PromptStyle = "explicit",
): Promise<StackScore> {
  return scoreMarkers(spec, await collectProjectIndex(projectDir), promptStyle);
}

function scoredMarkers(spec: BenchmarkSpec, promptStyle: PromptStyle) {
  return promptStyle === "natural"
    ? spec.strictMarkers.filter((marker) => !marker.explicitOnly)
    : spec.strictMarkers;
}

export async function scoreProject(
  spec: BenchmarkSpec,
  projectDir: string,
  promptStyle: PromptStyle = "explicit",
): Promise<{ artifact: StackScore; faithfulness?: StackScore; acceptance?: StackScore }> {
  const index = await collectProjectIndex(projectDir);
  const artifact = scoreMarkers(spec, index, promptStyle);
  const btsPath = path.join(projectDir, "bts.jsonc");
  const faithfulness = existsSync(btsPath)
    ? scoreBts(spec, await readFile(btsPath, "utf8"))
    : undefined;
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

function acceptancePatternMatch(
  pattern: string,
  deps: readonly string[],
  files: readonly string[],
): boolean {
  if (pattern.startsWith(".")) {
    return files.some((file) => file === pattern || file.includes(`${pattern}/`));
  }
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

function scoreMarkers(
  spec: BenchmarkSpec,
  index: ProjectIndex,
  promptStyle: PromptStyle = "explicit",
): StackScore {
  const misses: string[] = [];
  const markers = scoredMarkers(spec, promptStyle);
  let matched = 0;

  for (const marker of markers) {
    const depsMatch =
      !marker.deps || marker.deps.every((dep) => depMarkerMatches(index.dependencies, dep));
    const sourceMatch =
      !marker.source || marker.source.every((pattern) => index.sourceText.includes(pattern));
    const textMatch =
      !marker.text || marker.text.every((pattern) => index.allText.includes(pattern));
    const textAnyMatch =
      !marker.textAny || marker.textAny.some((pattern) => index.allText.includes(pattern));
    const filesMatch =
      !marker.files || marker.files.every((pattern) => fileMarkerMatches(index.files, pattern));
    const forbiddenDepsMatch =
      !marker.forbiddenDeps ||
      marker.forbiddenDeps.every((dep) => !depMarkerMatches(index.dependencies, dep));
    const forbiddenTextMatch =
      !marker.forbiddenText ||
      marker.forbiddenText.every((pattern) => !index.allText.includes(pattern));
    const forbiddenFilesMatch =
      !marker.forbiddenFiles ||
      marker.forbiddenFiles.every((pattern) => !fileMarkerMatches(index.files, pattern));

    if (
      depsMatch &&
      sourceMatch &&
      textMatch &&
      textAnyMatch &&
      filesMatch &&
      forbiddenDepsMatch &&
      forbiddenTextMatch &&
      forbiddenFilesMatch
    ) {
      matched += 1;
    } else {
      misses.push(marker.id);
    }
  }

  return scoreFromCounts(matched, markers.length, misses);
}

export function depMarkerMatches(dependencies: ReadonlySet<string>, pattern: string) {
  if (!pattern.endsWith("/")) return dependencies.has(pattern);
  for (const dep of dependencies) {
    if (dep.startsWith(pattern)) return true;
  }
  return false;
}

export function fileMarkerMatches(files: ReadonlySet<string>, pattern: string) {
  if (files.has(pattern)) return true;
  const matcher = fileMarkerPattern(pattern);
  for (const file of files) {
    if (matcher.test(file.split(path.sep).join("/"))) return true;
  }
  return false;
}

function fileMarkerPattern(pattern: string) {
  const source = pattern
    .split("/")
    .map((segment) =>
      segment
        .split("*")
        .map((literal) => literal.replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&"))
        .join("[^/]*"),
    )
    .join("/");
  return new RegExp(`(^|/)${source}$`);
}

function scoreFromCounts(matched: number, total: number, misses: string[]): StackScore {
  return {
    matched,
    total,
    percent: total > 0 ? Math.round((matched / total) * 100) : 0,
    misses,
  };
}

export function emptyArtifactScore(
  spec: BenchmarkSpec,
  promptStyle: PromptStyle = "explicit",
): StackScore {
  return {
    matched: 0,
    total: scoredMarkers(spec, promptStyle).length,
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
    if (path.basename(filePath) === "bts.jsonc") return;
    if (
      !/(package\.json|Cargo\.toml|go\.mod|pyproject\.toml|pom\.xml|mix\.exs|\.csproj|\.gradle|\.kts|\.ts|\.tsx|\.js|\.jsx|\.mjs|\.cjs|\.rs|\.go|\.py|\.cs|\.java|\.kt|\.exs|\.ex|\.heex|\.html|\.vue|\.svelte|\.json|\.jsonc|\.proto|\.toml|\.yml|\.yaml)$/.test(
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
    if (event?.type === "item.completed" && event.item) {
      const item = event.item;
      if (item.type === "mcp_tool_call" && typeof item.tool === "string") {
        uses.push({ name: item.tool });
      } else if (item.type === "command_execution" && typeof item.command === "string") {
        uses.push({ name: "bash", command: item.command });
      }
    }
    if (event?.part?.type === "tool" && typeof event.part.tool === "string") {
      const command =
        typeof event.part.state?.input?.command === "string"
          ? event.part.state.input.command
          : undefined;
      uses.push({ name: event.part.tool, command });
    }
    if (event?.type === "tool_execution_start" && typeof event.toolName === "string") {
      const command = typeof event.args?.command === "string" ? event.args.command : undefined;
      uses.push({ name: event.toolName, command });
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

  const usedBfsCreate = toolUses.some((use) => /bfs_create_project/i.test(use.name));
  const usedAnyBfsTool = toolUses.some((use) => /bfs_/i.test(use.name));
  const bashCommands = toolUses
    .filter((use) => /(^|_)bash$/i.test(use.name))
    .map((use) => (use.command ?? "").toLowerCase());
  const isBfsCli = (cmd: string) => /create\s+better-fullstack|create-better-fullstack/.test(cmd);
  const ranBfsCli = bashCommands.some(isBfsCli);

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

  const score = checks.filter((check) => check.status === "pass").length;
  return { score, total: checks.length, checks };
}

const ADVISORY_STEP_KEYS = new Set(["lint", "format", "test", "doctor", "route", "tidy"]);

export function stepBaseName(name: string) {
  return name.slice(name.lastIndexOf(":") + 1);
}
export function isAdvisoryStep(name: string) {
  return ADVISORY_STEP_KEYS.has(stepBaseName(name));
}

function applicableSteps(result: RunResult, predicate: (name: string) => boolean): StepResult[] {
  return Object.entries(result.validation.steps)
    .filter((entry): entry is [string, StepResult] => Boolean(entry[1]))
    .filter(([name, step]) => step.status !== "na" && predicate(name))
    .map(([, step]) => step);
}

function stepsAllGreen(steps: readonly StepResult[]) {
  return steps.every(
    (step) => step.status !== "skip" && step.exitCode === 0 && !step.timedOut && !step.spawnError,
  );
}

export function validationPassed(result: RunResult) {
  if (result.validation.deferred) return false;
  if (!result.validation.projectExists) return false;
  const core = applicableSteps(result, (name) => !isAdvisoryStep(name));
  if (core.length === 0) return false;
  return stepsAllGreen(core);
}

const QUALITY_TIER_STEPS = new Set(["lint", "format"]);

function isQualityTierStep(name: string) {
  return QUALITY_TIER_STEPS.has(stepBaseName(name));
}

export function specScore(result: RunResult) {
  const core = validationPassed(result) ? 1 : 0;
  const gates = applicableSteps(result, isQualityTierStep);
  const quality =
    core === 0 || gates.length === 0
      ? 0
      : gates.filter((gate) => stepsAllGreen([gate])).length / gates.length;
  const stack = result.stackScore.percent / 100;
  const weights = SCAFFBENCH_SPEC_SCORE_WEIGHTS;
  return {
    core,
    quality,
    stack,
    score: weights.core * core + weights.quality * quality + weights.stack * stack,
  };
}

export function qualityPassed(result: RunResult) {
  if (result.validation.skipped || result.validation.qualityGateRequested !== true) {
    return "na" as const;
  }
  if (!validationPassed(result)) return false;
  return stepsAllGreen(applicableSteps(result, isQualityTierStep));
}

const BUDGET_TERMINAL_REASON = /budget|cost[_-]?limit|max[_-]?cost|spend/i;

export function isBudgetExhausted(result: RunResult) {
  if (result.claude.terminalReason && BUDGET_TERMINAL_REASON.test(result.claude.terminalReason)) {
    return true;
  }
  const policy = result.budgetPolicy;
  return Boolean(
    policy &&
    !policy.budgetEnforced &&
    typeof result.claude.totalCostUsd === "number" &&
    result.claude.totalCostUsd > policy.maxBudgetUsd * ESTIMATED_BUDGET_TOLERANCE,
  );
}

export function outcomeEvidenceFor(result: RunResult): OutcomeEvidence | undefined {
  if (result.validation.skipped) return undefined;
  const policy = result.budgetPolicy;
  if (
    policy &&
    !policy.budgetEnforced &&
    !BUDGET_TERMINAL_REASON.test(result.claude.terminalReason ?? "") &&
    typeof result.claude.totalCostUsd === "number" &&
    result.claude.totalCostUsd > policy.maxBudgetUsd * ESTIMATED_BUDGET_TOLERANCE
  ) {
    return { budgetEstimated: true };
  }
  return undefined;
}

export function classifyOutcome(result: RunResult): RunOutcome {
  if (result.validation.skipped) return "skipped";
  if (isBudgetExhausted(result)) return "budget-exhausted";
  if (result.claude.timedOut) return "deadline-exhausted";
  if (result.claude.spawnError) return "harness-infra";
  if (result.validation.deferred) return "validation-infra";
  if (!validationPassed(result) && hasProviderInfraEvidence(result)) return "provider-infra";

  const coreEntries = Object.entries(result.validation.steps).filter(
    ([name, step]) => step && step.status !== "na" && !isAdvisoryStep(name),
  ) as [string, StepResult][];
  if (coreEntries.some(([name, step]) => isRecurringTransientFailure(name, step))) {
    return "validation-infra";
  }
  if (hasSoleHarnessBlocker(coreEntries)) return "harness-infra";
  return validationPassed(result) ? "success" : "model-failure";
}

export function rollupOutcome(outcome: RunOutcome): RunOutcomeRollup {
  if (outcome === "success") return "success";
  if (["provider-infra", "harness-infra", "validation-infra", "skipped"].includes(outcome)) {
    return "infra-inconclusive";
  }
  return "model-failure";
}

export function scoredOutcome(result: RunResult) {
  if (classifyOutcome(result) === "skipped") return false;
  return rollupOutcome(classifyOutcome(result)) !== "infra-inconclusive";
}

function hasProviderInfraEvidence(result: RunResult) {
  const reason = `${result.claude.terminalReason ?? ""}\n${result.claude.stderrTail ?? ""}`;
  if (/(?:opencode-unknown|pi)-zero-usage-no-tools/.test(reason) && !result.claude.outputTokens) {
    return true;
  }
  if (/opencode-unknown-zero-usage-step/.test(reason)) return true;
  const providerWithError =
    /\b(?:provider|upstream|endpoint|gateway)\b[^\n]{0,80}\b(?:error|fail(?:ed|ure)?|unavailable|timeout|timed out|rejected|denied)\b|\b(?:error|fail(?:ed|ure)?|unavailable|timeout|timed out|rejected|denied)\b[^\n]{0,80}\b(?:provider|upstream|endpoint|gateway)\b/i;
  const explicitInfraError =
    /\b(?:HTTP(?:\/\d(?:\.\d)?)?\s*429|status(?:\s+code)?\D{0,10}429|too many requests|rate.?limit(?:ed)?[\s:_-]+(?:error|exceeded|reached|hit)|unauthori[sz]ed|ECONNRESET|ETIMEDOUT)\b/i;
  const contextualCapacity =
    /\b(?:overloaded|capacity|authentication)\b[^\n]{0,40}\b(?:error|fail(?:ed|ure)?|unavailable|exhausted|exceeded|rejected|denied)\b|\b(?:error|fail(?:ed|ure)?|unavailable|exhausted|exceeded|rejected|denied)\b[^\n]{0,40}\b(?:overloaded|capacity|authentication)\b/i;
  return (
    providerWithError.test(reason) ||
    explicitInfraError.test(reason) ||
    contextualCapacity.test(reason)
  );
}

function hasSoleHarnessBlocker(core: readonly [string, StepResult][]) {
  const blockers = core.filter(([, step]) => step.spawnError || isDotnetSdkNotFound(step));
  if (blockers.length === 0) return false;
  return !core.some(
    ([, step]) =>
      !step.spawnError &&
      !isDotnetSdkNotFound(step) &&
      step.status !== "skip" &&
      step.exitCode !== null &&
      step.exitCode !== 0,
  );
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
  const outcome = classifyOutcome(result);
  if (outcome === "budget-exhausted") tags.add("budget-exhausted");
  if (outcome === "deadline-exhausted") tags.add("deadline-exhausted");
  if (outcome === "provider-infra") tags.add("provider-infra");
  if (outcome === "harness-infra") tags.add("harness-infra");
  if (outcome === "validation-infra") tags.add("validation-infra");
  if (result.claude.timeoutProgress) tags.add(result.claude.timeoutProgress);
  if (!result.validation.projectExists) tags.add("project-not-found");
  if (result.stackScore.matched < result.stackScore.total) tags.add("stack-mismatch");
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
    if (step.spawnError || isDotnetSdkNotFound(step)) {
      tags.add("toolchain-missing");
      continue;
    }
    if (isRecurringTransientFailure(name, step)) continue;
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

  if (
    !result.validation.deferred &&
    !validationPassed(result) &&
    rollupOutcome(outcome) === "model-failure"
  ) {
    tags.add("validation-failed");
  }
  return [...tags].sort();
}
