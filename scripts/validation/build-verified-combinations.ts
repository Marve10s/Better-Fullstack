import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { getPresetCombos } from "@testing/lib/presets";
import {
  evaluatePublishedPackageEvidence,
  evaluateReleaseGuardEvidence,
  evaluateScaffbenchEvidence,
  evaluateSmokeEvidence,
  REQUIRED_MANAGERS,
  SOURCE_EVIDENCE_MAX_AGE_MS,
  type SourceEvidenceContext,
} from "@scripts/verified-combinations/evidence";

type SmokeStep = {
  step: string;
  success: boolean;
  skipped?: boolean;
  advisory?: boolean;
  classification?: string;
};

type SmokeResult = {
  ecosystem: string;
  comboName: string;
  overallSuccess: boolean;
  steps: SmokeStep[];
  totalDurationMs?: number;
};

type ScaffbenchSpec = {
  id: string;
  title: string;
  family?: string;
  canonicalFlags?: string[];
};

type ScaffbenchStep = {
  command: string;
  exitCode: number | null;
  status?: "ran" | "skip" | "na";
  timedOut?: boolean;
};

type ScaffbenchResult = {
  specId: string;
  specTitle?: string;
  path?: string;
  trial?: number;
  validation?: {
    projectExists?: boolean;
    deferred?: boolean;
    install?: ScaffbenchStep;
    build?: ScaffbenchStep;
    checkTypes?: ScaffbenchStep;
    lint?: ScaffbenchStep;
    format?: ScaffbenchStep;
    test?: ScaffbenchStep;
    doctor?: ScaffbenchStep;
    route?: ScaffbenchStep;
    steps?: Record<string, ScaffbenchStep>;
  };
  stackScore?: {
    matched: number;
    total: number;
    percent: number;
  };
  failureTags?: string[];
};

type ScaffbenchSummary = {
  generatedAt?: string;
  options?: {
    specs?: string[];
    paths?: string[];
    qualityGate?: boolean;
    doctorCheck?: boolean;
    routeCheck?: boolean;
  };
  metadata?: {
    evidenceSchemaVersion?: number;
    gitHead?: string;
    gitBranch?: string;
    workspaceClean?: boolean;
    bfGeneratorVersion?: string;
    environmentQualified?: boolean;
    generatorSource?: string;
    generatorGitHead?: string;
  };
  specs?: ScaffbenchSpec[];
  results?: ScaffbenchResult[];
};

type ReleaseGuardStep = {
  command: string;
  durationMs?: number;
  exitCode: number | null;
  status: "pass" | "fail" | "skipped";
};

type ReleaseGuardSummary = {
  generatedAt?: string;
  gitBranch?: string;
  gitHead?: string;
  overallSuccess: boolean;
  steps: ReleaseGuardStep[];
};

type PublishedPackageSmokeResult = {
  manager: "bun" | "npm" | "pnpm";
  status: "pass" | "fail";
  command: string[];
  durationMs?: number;
  exitCode: number | null;
  expectedPaths?: string[];
  missingPaths?: string[];
  failureMessage?: string;
};

type PublishedPackageSmokeSummary = {
  generatedAt?: string;
  packageName: string;
  specifier: string;
  packageSpec: string;
  registry: string;
  overallSuccess: boolean;
  managers: Array<"bun" | "npm" | "pnpm">;
  results: PublishedPackageSmokeResult[];
};

type ActionLink = {
  label: string;
  href: string;
};

const OUTPUT_PATH = "docs/verified-combinations.md";
const WEB_DATA_OUTPUT_PATH = "apps/web/src/lib/docs/verified-combinations-data.ts";
const REPOSITORY_BLOB_BASE = "https://github.com/Marve10s/Better-Fullstack/blob/main";
const RELEASE_GUARD_INPUT = "testing/.release-guard/summary.json";
const PUBLISHED_PACKAGE_INPUT = "testing/.published-package/summary.json";
type SmokeInput = { label: string; path: string; preset?: string; supplementalPaths?: string[] };

const SMOKE_INPUTS: SmokeInput[] = [
  {
    label: "PR core smoke",
    path: "testing/.smoke-output/core/smoke-results.json",
    preset: "pr-core",
  },
];
const SCAFFBENCH_INPUTS = [
  {
    label: "ScaffBench 2",
    path: "testing/.tmp-scaffbench-2/summary.json",
    expectedSpecIds: ["ai-search-workbench"],
  },
];

async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    return JSON.parse(await readFile(filePath, "utf8")) as T;
  } catch (error) {
    if (isMissingFileError(error)) {
      return null;
    }

    throw error;
  }
}

async function runText(command: string): Promise<string | undefined> {
  const proc = Bun.spawn(["/bin/sh", "-c", command], {
    stdout: "pipe",
    stderr: "ignore",
  });
  const output = await new Response(proc.stdout).text();
  const exitCode = await proc.exited;

  if (exitCode !== 0) return undefined;
  return output.trim() || undefined;
}

function isMissingFileError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as NodeJS.ErrnoException).code === "ENOENT"
  );
}

function escapeTableCell(value: unknown): string {
  return String(value ?? "")
    .replaceAll("\\", "\\\\")
    .replaceAll("|", "\\|")
    .replaceAll("\n", "<br>");
}

function code(value: string): string {
  return `\`${value.replaceAll("`", "\\`")}\``;
}

type EvidenceStatus = "pass" | "partial-pass" | "fail" | "matrix-only" | "configured" | "missing";

type VerifiedClaimSummary = {
  generatedAt: string;
  expiresAt: string;
  gitHead?: string;
  expectedTotals: {
    releaseGuard: number;
    publishedPackage: number;
  };
  smoke: Array<{
    label: string;
    sources: string[];
    pass: number;
    total: number;
    current?: boolean;
    reasons?: string[];
    ownerArea: string;
    actionLinks: ActionLink[];
    rerunCommand: string;
    failureHint: string;
  }>;
  scaffbench: Array<{
    label: string;
    source: string;
    pass: number;
    total: number;
    current?: boolean;
    reasons?: string[];
    environmentQualified?: boolean;
    ownerArea: string;
    actionLinks: ActionLink[];
    rerunCommand: string;
    failureHint: string;
  }>;
  releaseGuard: {
    source: string;
    pass: number;
    total: number;
    current?: boolean;
    reasons?: string[];
    overallSuccess: boolean;
    generatedAt?: string;
    gitBranch?: string;
    gitHead?: string;
    ownerArea: string;
    actionLinks: ActionLink[];
    rerunCommand: string;
    failureHint: string;
  } | null;
  publishedPackage: {
    source: string;
    packageSpec?: string;
    generatedAt?: string;
    pass: number;
    total: number;
    current?: boolean;
    reasons?: string[];
    overallSuccess: boolean;
    ownerArea: string;
    actionLinks: ActionLink[];
    rerunCommand: string;
    failureHint: string;
  } | null;
};

function repoUrl(filePath: string): string {
  return `${REPOSITORY_BLOB_BASE}/${filePath}`;
}

function isLocalEvidencePath(filePath: string): boolean {
  return filePath.startsWith("testing/.");
}

function repoActionLink(label: string, filePath: string): ActionLink | null {
  if (isLocalEvidencePath(filePath)) return null;
  return { label, href: repoUrl(filePath) };
}

function compactActionLinks(links: Array<ActionLink | null>): ActionLink[] {
  return links.filter((link): link is ActionLink => Boolean(link));
}

function markdownLink(label: string, href: string): string {
  return `[${label}](${href})`;
}

function actionLinksCell(links: ActionLink[], rerunCommand?: string): string {
  const parts = links.map((link) => markdownLink(link.label, link.href));
  if (rerunCommand) {
    parts.push(`rerun: ${code(rerunCommand)}`);
  }
  return parts.join("<br>");
}

function statusLabel(status: EvidenceStatus): string {
  return {
    pass: "Pass",
    "partial-pass": "Partial pass",
    fail: "Fail",
    "matrix-only": "Matrix-only",
    configured: "Configured",
    missing: "Missing evidence",
  }[status];
}

function releaseGuardStatusLabel(status: ReleaseGuardStep["status"]): string {
  return {
    fail: "Fail",
    pass: "Pass",
    skipped: "Skipped",
  }[status];
}

export function releaseGuardEvidenceStatus(
  status: ReleaseGuardStep["status"],
  current: boolean,
): ReleaseGuardStep["status"] {
  return current ? status : "fail";
}

export function releaseGuardResultText(pass: number, total: number, current: boolean): string {
  return `Result: ${current ? pass : 0}/${total} gates passing.`;
}

function isFreshGitHead(
  recordedHead: string | undefined,
  currentHead: string | undefined,
): boolean {
  return Boolean(recordedHead && currentHead && recordedHead === currentHead);
}

function ownerAreaForEcosystem(ecosystem: string): string {
  const ownerAreas: Record<string, string> = {
    dotnet: "packages/template-generator/templates/dotnet-base",
    elixir: "packages/template-generator/templates/elixir-base",
    go: "packages/template-generator/templates/go-base",
    java: "packages/template-generator/templates/java-base",
    "multi-ecosystem": "packages/template-generator/src/stack-graph",
    python: "packages/template-generator/templates/python-base",
    "react-native": "packages/template-generator/templates/frontend/native",
    rust: "packages/template-generator/templates/rust-base",
    typescript: "packages/template-generator/templates",
  };

  return ownerAreas[ecosystem] ?? "packages/template-generator/templates";
}

function formatSmokeSteps(steps: SmokeStep[]): string {
  return steps
    .map((step) => {
      if (step.skipped) {
        return `${step.step}: skipped`;
      }

      const outcome = step.success ? "pass" : "fail";
      const suffix = step.classification
        ? ` (${step.classification})`
        : step.advisory
          ? " (advisory)"
          : "";
      return `${step.step}: ${outcome}${suffix}`;
    })
    .join("<br>");
}

function smokeStatus(result: SmokeResult): EvidenceStatus {
  if (!result.overallSuccess) {
    return "fail";
  }

  return result.steps.some((step) => !step.success && !step.skipped) ? "partial-pass" : "pass";
}

function formatScaffbenchSteps(result: ScaffbenchResult): string {
  const validation = result.validation;
  if (!validation) {
    return "no validation payload";
  }

  const orderedSteps: Array<readonly [string, ScaffbenchStep | undefined]> = validation.steps
    ? Object.entries(validation.steps)
    : [
        ["install", validation.install],
        ["build", validation.build],
        ["typecheck", validation.checkTypes],
        ["lint", validation.lint],
        ["format", validation.format],
        ["test", validation.test],
        ["doctor", validation.doctor],
        ["route", validation.route],
      ];

  return orderedSteps
    .filter(([, step]) => Boolean(step))
    .map(([name, step]) => {
      if (step?.status === "na") {
        return `${name}: n/a`;
      }

      if (step?.status === "skip") {
        return `${name}: skipped`;
      }

      if (step?.timedOut) {
        return `${name}: timed out`;
      }

      return `${name}: ${step?.exitCode === 0 ? "pass" : "fail"}`;
    })
    .join("<br>");
}

function scaffbenchResultStatus(result: ScaffbenchResult): "pass" | "fail" {
  if (result.failureTags && result.failureTags.length > 0) {
    return "fail";
  }

  if (result.validation?.deferred || result.validation?.projectExists === false) {
    return "fail";
  }

  const steps = result.validation?.steps
    ? Object.values(result.validation.steps)
    : [
        result.validation?.install,
        result.validation?.build,
        result.validation?.checkTypes,
        result.validation?.lint,
        result.validation?.format,
        result.validation?.test,
        result.validation?.doctor,
        result.validation?.route,
      ].filter(Boolean);

  return steps.length > 0 &&
    steps.every((step) => step?.status === "ran" && step.exitCode === 0 && step.timedOut !== true)
    ? "pass"
    : "fail";
}

function smokeCommandMap(): Map<string, string> {
  const commands = new Map<string, string>();

  for (const preset of ["pr-core", "pr-broad", "all"]) {
    for (const combo of getPresetCombos(preset)) {
      commands.set(combo.name, combo.command);
    }
  }

  return commands;
}

export async function readSmokeResults(input: SmokeInput): Promise<{
  results: SmokeResult[];
  sources: string[];
} | null> {
  const sourcePaths = [input.path, ...(input.supplementalPaths ?? [])];
  const resultByName = new Map<string, SmokeResult>();
  const sources: string[] = [];

  for (const sourcePath of sourcePaths) {
    const raw = await readJson<unknown>(sourcePath);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) continue;
    const envelope = raw as { schemaVersion?: unknown; evidenceType?: unknown; results?: unknown };
    if (envelope.schemaVersion !== 1 || envelope.evidenceType !== "better-fullstack/smoke")
      continue;
    const rawResults = envelope.results;
    if (!Array.isArray(rawResults)) continue;
    const results = rawResults as SmokeResult[];

    sources.push(sourcePath);
    for (const result of results) {
      resultByName.set(result.comboName, result);
    }
  }

  if (sources.length === 0) {
    return null;
  }

  const expectedNames = input.preset
    ? getPresetCombos(input.preset).map((combo) => combo.name)
    : Array.from(resultByName.keys());
  const orderedResults = expectedNames
    .map((name) => resultByName.get(name))
    .filter((result): result is SmokeResult => Boolean(result));
  const expectedNameSet = new Set(expectedNames);
  const extraResults = Array.from(resultByName.values()).filter(
    (result) => !expectedNameSet.has(result.comboName),
  );

  return { results: [...orderedResults, ...extraResults], sources };
}

function commandFromScaffbenchSpec(spec: ScaffbenchSpec): string {
  const flags = spec.canonicalFlags?.join(" ") ?? "";
  return `bun create better-fullstack@latest ${spec.id} ${flags}`.trim();
}

function releaseGuardOwner(command: string): string {
  if (command.includes("validate-plugin-bundle")) {
    return "Plugin bundle packaging";
  }

  if (command.includes("test:plugin-bundle")) {
    return "Plugin bundle packaging";
  }

  if (command.includes("packages/types")) {
    return "Stack schema and option metadata";
  }

  if (command.includes("packages/template-generator")) {
    return "Template generator";
  }

  if (command.includes("template-snapshots")) {
    return "Generated template snapshots";
  }

  if (command.includes("test:ai-examples")) {
    return "Generated AI docs/examples";
  }

  if (command.includes("cli-builder-sync")) {
    return "CLI and builder parity";
  }

  if (command.includes("apps/web/test")) {
    return "Web stack builder";
  }

  if (
    command.includes("generate-reproducible-command") ||
    command.includes("add-history-commands")
  ) {
    return "CLI reproducible commands";
  }

  if (command.includes("validate:tech-links")) {
    return "Web documentation links";
  }

  return "Release guard";
}

function releaseGuardOwnerPath(command: string): string | null {
  if (command.includes("validate-plugin-bundle") || command.includes("test:plugin-bundle")) {
    return "scripts/validation/validate-plugin-bundle.ts";
  }

  if (command.includes("packages/types")) {
    return "packages/types";
  }

  if (command.includes("packages/template-generator")) {
    return "packages/template-generator";
  }

  if (command.includes("template-snapshots")) {
    return "apps/cli/test/support/template-snapshots.test.ts";
  }

  if (command.includes("test:ai-examples")) {
    return "apps/cli/test/generation/examples.test.ts";
  }

  if (command.includes("cli-builder-sync")) {
    return "apps/cli/test/recommendations/cli-builder-sync.test.ts";
  }

  if (command.includes("apps/web/test")) {
    const match = command.match(/apps\/web\/test\/[^\s]+/);
    return match?.[0] ?? "apps/web/test";
  }

  if (command.includes("generate-reproducible-command")) {
    return "apps/cli/test/generation/generate-reproducible-command.test.ts";
  }

  if (command.includes("add-history-commands")) {
    return "apps/cli/test/lifecycle/add-history-commands.test.ts";
  }

  if (command.includes("validate:tech-links")) {
    return "apps/web/src/lib/stack/tech-resource-links.ts";
  }

  return null;
}

function releaseGuardSteps(script: string): string[] {
  return script
    .split("&&")
    .map((step) => step.trim())
    .filter(Boolean);
}

function renderCommandDetails(
  title: string,
  commands: Array<{ label: string; command: string }>,
): string {
  if (commands.length === 0) {
    return "";
  }

  const blocks = commands.map(
    (entry) => `<details>
<summary>${code(entry.label)} command</summary>

\`\`\`sh
${entry.command}
\`\`\`

</details>`,
  );

  return [`### ${title}`, ...blocks].join("\n\n");
}

async function renderSmokeSection(claimSummary: VerifiedClaimSummary): Promise<string> {
  const commandMap = smokeCommandMap();
  const sections: string[] = ["## Smoke Preset Evidence"];
  const commandDetails: Array<{ label: string; command: string }> = [];

  for (const [inputIndex, input] of SMOKE_INPUTS.entries()) {
    const claim = claimSummary.smoke[inputIndex];
    const evidence = await readSmokeResults(input);
    if (!evidence) {
      sections.push(`### ${input.label}`);
      sections.push(`No smoke evidence found at ${code(input.path)}.`);
      continue;
    }

    const { results, sources } = evidence;
    const expectedCombos = input.preset ? getPresetCombos(input.preset) : [];
    const resultByName = new Map(results.map((result) => [result.comboName, result]));
    const rows =
      expectedCombos.length > 0
        ? expectedCombos.map((combo) => ({
            comboName: combo.name,
            result: resultByName.get(combo.name),
          }))
        : results.map((result) => ({ comboName: result.comboName, result }));
    const passed = claim?.pass ?? 0;
    sections.push(`### ${input.label}`);
    sections.push(
      `Sources: ${sources.map(code).join(", ")}. Result: ${passed}/${rows.length} combinations passing.`,
    );
    sections.push(
      [
        "| Status | Combination | Ecosystem | Owner area | Validation steps | Action links |",
        "| --- | --- | --- | --- | --- | --- |",
        ...rows
          .map(({ comboName, result }) => {
            const command = commandMap.get(comboName);
            if (command) {
              commandDetails.push({ label: comboName, command });
            }

            if (!result) {
              return [
                statusLabel("missing"),
                code(comboName),
                "n/a",
                code("n/a"),
                "no smoke result in listed sources",
                actionLinksCell(
                  compactActionLinks([
                    { label: "preset", href: repoUrl("testing/lib/presets.ts") },
                    { label: "smoke harness", href: repoUrl("testing/smoke-test.ts") },
                  ]),
                  "bun run test:smoke:pr-core",
                ),
              ]
                .map(escapeTableCell)
                .join(" | ");
            }

            const status = claim?.current === true ? smokeStatus(result) : "fail";
            const ownerArea = ownerAreaForEcosystem(result.ecosystem);
            return [
              statusLabel(status),
              code(result.comboName),
              result.ecosystem,
              code(ownerArea),
              formatSmokeSteps(result.steps),
              actionLinksCell(
                compactActionLinks([
                  { label: "owner", href: repoUrl(ownerArea) },
                  { label: "preset", href: repoUrl("testing/lib/presets.ts") },
                  ...sources.map((source, index) =>
                    repoActionLink(sources.length === 1 ? "source" : `source ${index + 1}`, source),
                  ),
                ]),
                "bun run test:smoke:pr-core",
              ),
            ]
              .map(escapeTableCell)
              .join(" | ");
          })
          .map((row) => `| ${row} |`),
      ].join("\n"),
    );
  }

  sections.push(renderCommandDetails("Smoke Commands", commandDetails));
  return sections.filter(Boolean).join("\n\n");
}

async function renderScaffbenchSection(claimSummary: VerifiedClaimSummary): Promise<string> {
  const sections: string[] = ["## ScaffBench Evidence"];

  for (const [inputIndex, input] of SCAFFBENCH_INPUTS.entries()) {
    const claim = claimSummary.scaffbench[inputIndex];
    const summary = await readJson<ScaffbenchSummary>(input.path);
    if (!summary) {
      sections.push(`No ScaffBench evidence found at ${code(input.path)}.`);
      continue;
    }

    const runCount = summary.results?.length ?? 0;
    const specCount = summary.specs?.length ?? 0;
    const metadata = summary.metadata;
    const sourceSummary = [
      `Source: ${code(input.path)}.`,
      `Specs: ${specCount}.`,
      `Runs: ${runCount}.`,
      metadata?.gitHead ? `Git head: ${code(metadata.gitHead.slice(0, 12))}.` : "",
      metadata?.bfGeneratorVersion ? `Generator: ${code(metadata.bfGeneratorVersion)}.` : "",
      typeof metadata?.environmentQualified === "boolean"
        ? `Environment qualified: ${metadata.environmentQualified ? "yes" : "no"}.`
        : "",
    ]
      .filter(Boolean)
      .join(" ");

    sections.push(`### ${input.label}`);
    sections.push(sourceSummary);

    if (runCount > 0) {
      sections.push(
        [
          "| Status | Spec | Path | Trial | Owner area | Stack score | Validation steps | Failure tags | Action links |",
          "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
          ...(summary.results ?? [])
            .map((result) => {
              const spec = summary.specs?.find((candidate) => candidate.id === result.specId);
              const family = spec?.family ?? "multi-ecosystem";
              const ownerArea = ownerAreaForEcosystem(family);
              const status = claim?.current === true ? scaffbenchResultStatus(result) : "fail";
              const stackScore = result.stackScore
                ? `${result.stackScore.matched}/${result.stackScore.total} (${result.stackScore.percent}%)`
                : "n/a";

              return [
                statusLabel(status),
                code(result.specId),
                result.path ?? "n/a",
                result.trial ?? "n/a",
                code(ownerArea),
                stackScore,
                formatScaffbenchSteps(result),
                result.failureTags?.join(", ") || "none",
                actionLinksCell(
                  compactActionLinks([
                    repoActionLink("source", input.path),
                    { label: "owner", href: repoUrl(ownerArea) },
                    { label: "runner", href: repoUrl("scripts/benchmarks/scaffbench-v2.ts") },
                  ]),
                  "bun run scaffbench:2:canonical",
                ),
              ]
                .map(escapeTableCell)
                .join(" | ");
            })
            .map((row) => `| ${row} |`),
        ].join("\n"),
      );
    }

    const matrixSpecs = summary.specs ?? [];
    if (matrixSpecs.length > 0) {
      sections.push("### ScaffBench Spec Matrix");
      sections.push(
        runCount === 0
          ? "These rows are matrix-only evidence: they prove the benchmark has a spec and canonical command, not that validation passed."
          : "These rows list the canonical commands backing the benchmark specs.",
      );
      sections.push(
        [
          "| Status | Spec | Family | Owner area | Command |",
          "| --- | --- | --- | --- | --- |",
          ...matrixSpecs
            .map((spec) => {
              const status = runCount === 0 ? "matrix-only" : "configured";
              const family = spec.family ?? "multi-ecosystem";
              return [
                statusLabel(status),
                code(spec.id),
                family,
                code(ownerAreaForEcosystem(family)),
                code(commandFromScaffbenchSpec(spec)),
              ]
                .map(escapeTableCell)
                .join(" | ");
            })
            .map((row) => `| ${row} |`),
        ].join("\n"),
      );
    }
  }

  return sections.join("\n\n");
}

async function renderReleaseGuardSection(
  claimSummary: VerifiedClaimSummary,
  currentGitHead?: string,
): Promise<string> {
  const packageJson = await readJson<{ scripts?: Record<string, string> }>("package.json");
  const releaseScript = packageJson?.scripts?.["test:release"];
  const releaseSummary = await readJson<ReleaseGuardSummary>(RELEASE_GUARD_INPUT);

  const sections = ["## Release Guard"];
  if (!releaseScript) {
    sections.push("No release guard script found at `package.json#scripts.test:release`.");
    return sections.join("\n\n");
  }

  if (releaseSummary && !isFreshGitHead(releaseSummary.gitHead, currentGitHead)) {
    sections.push(
      [
        `Stale release guard evidence found at ${code(RELEASE_GUARD_INPUT)}.`,
        releaseSummary.gitHead
          ? `Recorded git head: ${code(releaseSummary.gitHead.slice(0, 12))}.`
          : "",
        currentGitHead ? `Current git head: ${code(currentGitHead.slice(0, 12))}.` : "",
        `Run ${code("bun run test:release:record")} to refresh pass/fail evidence for this section.`,
      ]
        .filter(Boolean)
        .join(" "),
    );
  } else if (releaseSummary) {
    const sourceSummary = [
      `Source: ${code(RELEASE_GUARD_INPUT)}.`,
      releaseGuardResultText(
        claimSummary.releaseGuard?.pass ?? 0,
        releaseSummary.steps.length,
        claimSummary.releaseGuard?.current === true,
      ),
      releaseSummary.gitHead ? `Git head: ${code(releaseSummary.gitHead.slice(0, 12))}.` : "",
      releaseSummary.gitBranch ? `Branch: ${code(releaseSummary.gitBranch)}.` : "",
      releaseSummary.generatedAt ? `Recorded: ${releaseSummary.generatedAt}.` : "",
    ]
      .filter(Boolean)
      .join(" ");

    sections.push(sourceSummary);
    sections.push(
      [
        "| Status | Gate | Owner area | Duration | Action links |",
        "| --- | --- | --- | --- | --- |",
        ...releaseSummary.steps
          .map((step) => {
            const ownerPath = releaseGuardOwnerPath(step.command);
            return [
              releaseGuardStatusLabel(
                releaseGuardEvidenceStatus(
                  step.status,
                  claimSummary.releaseGuard?.current === true,
                ),
              ),
              code(step.command),
              releaseGuardOwner(step.command),
              typeof step.durationMs === "number" ? `${step.durationMs}ms` : "n/a",
              actionLinksCell(
                compactActionLinks([
                  repoActionLink("source", RELEASE_GUARD_INPUT),
                  ...(ownerPath ? [{ label: "owner", href: repoUrl(ownerPath) }] : []),
                  { label: "recorder", href: repoUrl("scripts/release/record-release-guard.ts") },
                ]),
                "bun run test:release:record",
              ),
            ]
              .map(escapeTableCell)
              .join(" | ");
          })
          .map((row) => `| ${row} |`),
      ].join("\n"),
    );

    return sections.join("\n\n");
  }

  const steps = releaseGuardSteps(releaseScript);
  sections.push(
    `These rows are configured release gates from ${code("package.json#scripts.test:release")}. Run ${code("bun run test:release:record")} to record pass/fail evidence for this section.`,
  );
  sections.push(
    [
      "| Status | Gate | Owner area | Action links |",
      "| --- | --- | --- | --- |",
      ...steps
        .map((step) =>
          [
            statusLabel("configured"),
            code(step),
            releaseGuardOwner(step),
            actionLinksCell(
              [{ label: "package script", href: repoUrl("package.json") }],
              "bun run test:release:record",
            ),
          ]
            .map(escapeTableCell)
            .join(" | "),
        )
        .map((row) => `| ${row} |`),
    ].join("\n"),
  );

  return sections.join("\n\n");
}

async function renderPublishedPackageSection(
  claimSummary: VerifiedClaimSummary,
  expectedPackageVersion: string,
): Promise<string> {
  const summary = await readJson<PublishedPackageSmokeSummary>(PUBLISHED_PACKAGE_INPUT);
  const sections = ["## Published Package Smoke"];
  const rerunCommand = `bun run test:published-package --specifier ${expectedPackageVersion}`;

  if (!summary) {
    sections.push(
      `No published-package smoke evidence found at ${code(PUBLISHED_PACKAGE_INPUT)}. Run ${code(rerunCommand)} after publishing a preview/canary package to record Bun, npm, and pnpm install evidence outside the source checkout.`,
    );
    sections.push(
      [
        "| Status | Package manager | Package spec | Action links |",
        "| --- | --- | --- | --- |",
        ...(["bun", "npm", "pnpm"] as const)
          .map((manager) =>
            [
              statusLabel("missing"),
              code(manager),
              code("n/a"),
              actionLinksCell(
                [
                  { label: "runner", href: repoUrl("scripts/release/published-package-smoke.ts") },
                  { label: "package script", href: repoUrl("package.json") },
                ],
                rerunCommand,
              ),
            ]
              .map(escapeTableCell)
              .join(" | "),
          )
          .map((row) => `| ${row} |`),
      ].join("\n"),
    );
    return sections.join("\n\n");
  }

  const passed = claimSummary.publishedPackage?.pass ?? 0;
  sections.push(
    [
      `Source: ${code(PUBLISHED_PACKAGE_INPUT)}.`,
      `Package: ${code(summary.packageSpec)}.`,
      `Result: ${passed}/${summary.results.length} package-manager installs passing.`,
      summary.generatedAt ? `Recorded: ${summary.generatedAt}.` : "",
    ]
      .filter(Boolean)
      .join(" "),
  );
  sections.push(
    [
      "| Status | Package manager | Command | Duration | Expected files | Missing files | Action links |",
      "| --- | --- | --- | --- | --- | --- | --- |",
      ...summary.results
        .map((result) =>
          [
            statusLabel(claimSummary.publishedPackage?.current === true ? result.status : "fail"),
            code(result.manager),
            code(result.command.join(" ")),
            typeof result.durationMs === "number" ? `${result.durationMs}ms` : "n/a",
            result.expectedPaths?.map(code).join("<br>") || "n/a",
            result.missingPaths && result.missingPaths.length > 0
              ? result.missingPaths.map(code).join("<br>")
              : "none",
            actionLinksCell(
              compactActionLinks([
                repoActionLink("source", PUBLISHED_PACKAGE_INPUT),
                { label: "runner", href: repoUrl("scripts/release/published-package-smoke.ts") },
                { label: "package script", href: repoUrl("package.json") },
                { label: "cli package", href: repoUrl("apps/cli/package.json") },
              ]),
              rerunCommand,
            ),
          ]
            .map(escapeTableCell)
            .join(" | "),
        )
        .map((row) => `| ${row} |`),
    ].join("\n"),
  );

  return sections.join("\n\n");
}

async function buildVerifiedClaimSummary(
  generatedAt: string,
  expectedPackageVersion: string,
  releaseGuardCommands: readonly string[],
  currentGitHead?: string,
): Promise<VerifiedClaimSummary> {
  const smoke: VerifiedClaimSummary["smoke"] = [];
  const scaffbench: VerifiedClaimSummary["scaffbench"] = [];
  const evidenceTimestamps: number[] = [];
  const recordEvidenceTimestamp = (value: unknown) => {
    const parsed = typeof value === "string" ? Date.parse(value) : Number.NaN;
    if (Number.isFinite(parsed)) evidenceTimestamps.push(parsed);
  };

  for (const input of SMOKE_INPUTS) {
    const evidence = await readSmokeResults(input);
    if (evidence) {
      for (const sourcePath of evidence.sources) {
        recordEvidenceTimestamp(
          (await readJson<{ generatedAt?: string }>(sourcePath))?.generatedAt,
        );
      }
    }
    if (!evidence) {
      smoke.push({
        label: input.label,
        sources: [input.path, ...(input.supplementalPaths ?? [])],
        pass: 0,
        total: input.preset ? getPresetCombos(input.preset).length : 0,
        ownerArea: "testing",
        actionLinks: compactActionLinks([
          { label: "preset", href: repoUrl("testing/lib/presets.ts") },
          { label: "smoke harness", href: repoUrl("testing/smoke-test.ts") },
        ]),
        rerunCommand: "bun run test:smoke:pr-core",
        failureHint:
          "Run the smoke preset and inspect the generated smoke-results.json source files.",
      });
      continue;
    }

    const total = input.preset ? getPresetCombos(input.preset).length : evidence.results.length;
    const ownerArea = "packages/template-generator/templates";
    smoke.push({
      label: input.label,
      sources: evidence.sources,
      pass: evidence.results.filter((result) => smokeStatus(result) === "pass").length,
      total,
      ownerArea,
      actionLinks: compactActionLinks([
        repoActionLink("source", evidence.sources[0] ?? input.path),
        { label: "owner", href: repoUrl(ownerArea) },
        { label: "preset", href: repoUrl("testing/lib/presets.ts") },
      ]),
      rerunCommand: "bun run test:smoke:pr-core",
      failureHint:
        "Open the smoke source artifact, find the failing combination row, then inspect the listed owner area.",
    });
  }

  for (const input of SCAFFBENCH_INPUTS) {
    const summary = await readJson<ScaffbenchSummary>(input.path);
    if (summary) recordEvidenceTimestamp(summary.generatedAt);
    const results = summary?.results ?? [];
    const ownerArea = "packages/template-generator/templates";
    scaffbench.push({
      label: input.label,
      source: input.path,
      pass: results.filter((result) => scaffbenchResultStatus(result) === "pass").length,
      total: input.expectedSpecIds.length,
      environmentQualified: summary?.metadata?.environmentQualified,
      ownerArea,
      actionLinks: compactActionLinks([
        repoActionLink("source", input.path),
        { label: "runner", href: repoUrl("scripts/benchmarks/scaffbench-v2.ts") },
        { label: "owner", href: repoUrl(ownerArea) },
      ]),
      rerunCommand: "bun run scaffbench:2:canonical",
      failureHint:
        "Inspect failureTags and validation steps in the ScaffBench summary, then follow the owner area for the stack family.",
    });
  }

  const releaseSummary = await readJson<ReleaseGuardSummary>(RELEASE_GUARD_INPUT);
  const publishedPackageSummary =
    await readJson<PublishedPackageSmokeSummary>(PUBLISHED_PACKAGE_INPUT);
  if (releaseSummary) recordEvidenceTimestamp(releaseSummary.generatedAt);
  if (publishedPackageSummary) recordEvidenceTimestamp(publishedPackageSummary.generatedAt);
  const expiryBasis = Math.min(Date.parse(generatedAt), ...evidenceTimestamps);
  return {
    generatedAt,
    expiresAt: new Date(expiryBasis + SOURCE_EVIDENCE_MAX_AGE_MS).toISOString(),
    gitHead: currentGitHead,
    expectedTotals: {
      releaseGuard: releaseGuardCommands.length,
      publishedPackage: REQUIRED_MANAGERS.length,
    },
    smoke,
    scaffbench,
    releaseGuard: releaseSummary
      ? {
          source: RELEASE_GUARD_INPUT,
          pass: releaseSummary.steps.filter((step) => step.status === "pass").length,
          total: releaseSummary.steps.length,
          overallSuccess: releaseSummary.overallSuccess,
          generatedAt: releaseSummary.generatedAt,
          gitBranch: releaseSummary.gitBranch,
          gitHead: releaseSummary.gitHead,
          ownerArea: "release guard",
          actionLinks: compactActionLinks([
            repoActionLink("source", RELEASE_GUARD_INPUT),
            { label: "recorder", href: repoUrl("scripts/release/record-release-guard.ts") },
            { label: "package script", href: repoUrl("package.json") },
          ]),
          rerunCommand: "bun run test:release:record",
          failureHint:
            "Inspect the failing gate in the release summary, rerun the recorder, then follow the gate's owner area.",
        }
      : null,
    publishedPackage: publishedPackageSummary
      ? {
          source: PUBLISHED_PACKAGE_INPUT,
          packageSpec: publishedPackageSummary.packageSpec,
          generatedAt: publishedPackageSummary.generatedAt,
          pass: publishedPackageSummary.results.filter((result) => result.status === "pass").length,
          total: publishedPackageSummary.results.length,
          overallSuccess: publishedPackageSummary.overallSuccess,
          ownerArea: "published package",
          actionLinks: compactActionLinks([
            repoActionLink("source", PUBLISHED_PACKAGE_INPUT),
            { label: "runner", href: repoUrl("scripts/release/published-package-smoke.ts") },
            { label: "package script", href: repoUrl("package.json") },
            { label: "cli package", href: repoUrl("apps/cli/package.json") },
          ]),
          rerunCommand: `bun run test:published-package --specifier ${expectedPackageVersion}`,
          failureHint:
            "Inspect the package-manager row, confirm the preview/canary package is visible, then rerun the published-package smoke lane.",
        }
      : null,
  };
}

function renderCurrentClaim(summary: VerifiedClaimSummary): string {
  const summaryLines: string[] = [];

  for (const smoke of summary.smoke) {
    const pass = smoke.current === true ? smoke.pass : 0;
    summaryLines.push(`- ${smoke.label}: ${pass}/${smoke.total} combinations have Pass evidence.`);
  }

  if (summary.releaseGuard) {
    const pass = summary.releaseGuard.current === true ? summary.releaseGuard.pass : 0;
    summaryLines.push(
      `- Release guard: ${pass}/${summary.releaseGuard.total} gates have Pass evidence.`,
    );
  } else {
    summaryLines.push(`- Release guard: missing evidence at ${code(RELEASE_GUARD_INPUT)}.`);
  }

  if (summary.publishedPackage) {
    const pass = summary.publishedPackage.current === true ? summary.publishedPackage.pass : 0;
    summaryLines.push(
      `- Published package smoke: ${pass}/${summary.publishedPackage.total} package-manager installs have Pass evidence.`,
    );
  } else {
    summaryLines.push(
      `- Published package smoke: missing evidence at ${code(PUBLISHED_PACKAGE_INPUT)}.`,
    );
  }

  return [
    "## Product Evidence Inventory",
    "Only rows marked Pass below carry current product evidence. This repository ledger does not replace the SHA-bound release receipt or certify matrix-only and configured rows.",
    summaryLines.join("\n"),
  ].join("\n\n");
}

async function writeWebData(summary: VerifiedClaimSummary): Promise<void> {
  const output = `// Generated by scripts/validation/build-verified-combinations.ts. Do not edit by hand.

export type VerifiedCombinationActionLink = {
  label: string;
  href: string;
};

export type VerifiedCombinationSummary = {
  generatedAt: string;
  expiresAt: string;
  gitHead?: string;
  expectedTotals: {
    releaseGuard: number;
    publishedPackage: number;
  };
  smoke: Array<{
    label: string;
    sources: string[];
    pass: number;
    total: number;
    current?: boolean;
    reasons?: string[];
    ownerArea: string;
    actionLinks: VerifiedCombinationActionLink[];
    rerunCommand: string;
    failureHint: string;
  }>;
  scaffbench: Array<{
    label: string;
    source: string;
    pass: number;
    total: number;
    current?: boolean;
    reasons?: string[];
    environmentQualified?: boolean;
    ownerArea: string;
    actionLinks: VerifiedCombinationActionLink[];
    rerunCommand: string;
    failureHint: string;
  }>;
  releaseGuard: {
    source: string;
    pass: number;
    total: number;
    current?: boolean;
    reasons?: string[];
    overallSuccess: boolean;
    generatedAt?: string;
    gitBranch?: string;
    gitHead?: string;
    ownerArea: string;
    actionLinks: VerifiedCombinationActionLink[];
    rerunCommand: string;
    failureHint: string;
  } | null;
  publishedPackage: {
    source: string;
    packageSpec?: string;
    generatedAt?: string;
    pass: number;
    total: number;
    current?: boolean;
    reasons?: string[];
    overallSuccess: boolean;
    ownerArea: string;
    actionLinks: VerifiedCombinationActionLink[];
    rerunCommand: string;
    failureHint: string;
  } | null;
};

export const verifiedCombinationsSummary: VerifiedCombinationSummary = ${JSON.stringify(summary, null, 2)};
`;
  await mkdir(path.dirname(WEB_DATA_OUTPUT_PATH), { recursive: true });
  await writeFile(WEB_DATA_OUTPUT_PATH, output, "utf8");
}

async function currentWorkspaceIsClean(): Promise<boolean> {
  const proc = Bun.spawn(["git", "status", "--porcelain"], { stdout: "pipe", stderr: "ignore" });
  const output = await new Response(proc.stdout).text();
  return (await proc.exited) === 0 && output.trim() === "";
}

async function enforceCurrentEvidence(
  summary: VerifiedClaimSummary,
  context: SourceEvidenceContext,
  expectedPackageVersion: string,
  releaseGuardCommands: readonly string[],
): Promise<void> {
  for (const [index, input] of SMOKE_INPUTS.entries()) {
    const expected = input.preset ? getPresetCombos(input.preset).map((combo) => combo.name) : [];
    const verdict = evaluateSmokeEvidence(await readJson<unknown>(input.path), expected, context);
    Object.assign(summary.smoke[index]!, verdict);
  }
  for (const [index, input] of SCAFFBENCH_INPUTS.entries()) {
    const raw = await readJson<ScaffbenchSummary>(input.path);
    const expected = input.expectedSpecIds;
    const verdict = evaluateScaffbenchEvidence(raw, expected, context);
    Object.assign(summary.scaffbench[index]!, verdict);
  }
  if (summary.releaseGuard) {
    Object.assign(
      summary.releaseGuard,
      evaluateReleaseGuardEvidence(
        await readJson<unknown>(RELEASE_GUARD_INPUT),
        releaseGuardCommands,
        context,
      ),
    );
  }
  if (summary.publishedPackage) {
    Object.assign(
      summary.publishedPackage,
      evaluatePublishedPackageEvidence(await readJson<unknown>(PUBLISHED_PACKAGE_INPUT), {
        now: context.now,
        expectedVersion: expectedPackageVersion,
        maxAgeMs: context.maxAgeMs,
      }),
    );
  }
}

async function main(): Promise<void> {
  const generatedAt = new Date().toISOString();
  const currentGitHead = await runText("git rev-parse HEAD");
  const cliPackage = await readJson<{ version?: string }>("apps/cli/package.json");
  const expectedPackageVersion = cliPackage?.version ?? "";
  const rootPackageJson = await readJson<{ scripts?: Record<string, string> }>("package.json");
  const releaseGuardCommands = releaseGuardSteps(rootPackageJson?.scripts?.["test:release"] ?? "");
  const claimSummary = await buildVerifiedClaimSummary(
    generatedAt,
    expectedPackageVersion,
    releaseGuardCommands,
    currentGitHead,
  );
  await enforceCurrentEvidence(
    claimSummary,
    {
      currentGitHead,
      currentWorkspaceClean: await currentWorkspaceIsClean(),
      currentPackageVersion: cliPackage?.version,
      now: new Date(generatedAt),
    },
    expectedPackageVersion,
    releaseGuardCommands,
  );
  const sections = [
    "# Verified Combinations",
    [
      `Generated by ${code("bun run build:verified-combinations")}.`,
      `Last generated: ${generatedAt}.`,
    ].join(" "),
    "A row marked Pass has green evidence in the generated input file. Partial pass means the smoke harness reported an overall pass while one or more non-gating steps failed. Failed rows are intentionally visible. Matrix-only and Configured rows are coverage commitments, not green merge claims. ScaffBench is a separate model benchmark and never contributes to product release verification.",
    renderCurrentClaim(claimSummary),
    await renderSmokeSection(claimSummary),
    await renderScaffbenchSection(claimSummary),
    await renderReleaseGuardSection(claimSummary, currentGitHead),
    await renderPublishedPackageSection(claimSummary, expectedPackageVersion),
  ];

  const output = `${sections.join("\n\n")}\n`;
  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, output, "utf8");
  await writeWebData(claimSummary);
  console.log(`Wrote ${OUTPUT_PATH}`);
  console.log(`Wrote ${WEB_DATA_OUTPUT_PATH}`);
}

if (import.meta.main) await main();
