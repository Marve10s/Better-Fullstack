#!/usr/bin/env bun

import { mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import type { Ecosystem } from "@better-fullstack/types";

import { readFileSync } from "node:fs";

import { generateBatch } from "./lib/generate-combos/options";
import { createSeededRandom, seedFromString } from "./lib/generate-combos/seed-random";
import type { ComboCandidate, GeneratorArgs, HistoricalLedger } from "./lib/generate-combos/types";
import { buildMajorDepCombos, buildMajorDepCombosFromDiff, type MajorDepInfo } from "./lib/major-dep-combos";
import { getPresetCombos } from "./lib/presets";
import { getVerifier, type VerifyResult } from "./lib/verify";

// ── Types ───────────────────────────────────────────────────────────────

interface SmokeTestArgs {
  seed: string;
  ecosystem?: Ecosystem;
  count: number;
  output: string;
  devCheck: boolean;
  strict?: boolean;
  routeCheck: boolean;
  preset?: string;
  majorDeps?: boolean;
  majorDepsPackages?: string;
  majorDepsDiff?: string;
}

// ── Arg Parsing ─────────────────────────────────────────────────────────

function parseArgs(argv: string[]): SmokeTestArgs {
  const args: SmokeTestArgs = {
    seed: Date.now().toString(),
    count: 14,
    output: resolve(process.cwd(), "testing/.smoke-output"),
    devCheck: false,
    routeCheck: false,
  };

  let countExplicit = false;

  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    const next = argv[i + 1];

    switch (token) {
      case "--seed":
        if (next) args.seed = next;
        i++;
        break;
      case "--ecosystem":
        if (next && ["typescript", "rust", "python", "go"].includes(next)) {
          args.ecosystem = next as Ecosystem;
        }
        i++;
        break;
      case "--count":
        if (next) {
          const parsed = Number(next);
          if (Number.isFinite(parsed) && parsed > 0) {
            args.count = Math.floor(parsed);
            countExplicit = true;
          }
        }
        i++;
        break;
      case "--output":
        if (next) args.output = resolve(process.cwd(), next);
        i++;
        break;
      case "--dev-check":
        args.devCheck = true;
        break;
      case "--strict":
        args.strict = true;
        break;
      case "--route-check":
        args.routeCheck = true;
        args.devCheck = true; // route-check implies dev-check
        break;
      case "--preset":
        if (next) args.preset = next;
        i++;
        break;
      case "--major-deps":
        args.majorDeps = true;
        break;
      case "--major-deps-packages":
        if (next) args.majorDepsPackages = next;
        args.majorDeps = true;
        i++;
        break;
      case "--major-deps-diff":
        if (next) args.majorDepsDiff = next;
        args.majorDeps = true;
        i++;
        break;
    }
  }

  if ((args.preset || args.majorDeps) && !countExplicit) {
    args.count = 0;
  }

  return args;
}

// ── Combo Generation ────────────────────────────────────────────────────

function generateCombos(args: SmokeTestArgs) {
  const rng = createSeededRandom(seedFromString(args.seed));

  const emptyHistory: HistoricalLedger = {
    fingerprintKeys: new Set(),
    legacyNames: new Set(),
    historyCount: 0,
  };

  const generatorArgs: GeneratorArgs = {
    count: args.count,
    ecosystems: args.ecosystem ? [args.ecosystem] : ["typescript", "rust", "python", "go"],
    installMode: "no-install",
    rng,
  };

  return generateBatch(generatorArgs, emptyHistory);
}

// ── Project Scaffolding ─────────────────────────────────────────────────

const CLI_PATH = resolve(import.meta.dir, "../apps/cli/dist/cli.mjs");

interface ScaffoldInput {
  name: string;
  command: string;
}

function buildCliArgs(input: ScaffoldInput): string[] {
  // Parse the command: `bun create better-fullstack@latest <name> ...flags`
  // into args for: `node cli.mjs create <name> ...flags --no-install --no-git`
  const parts = input.command.split(" ");
  const nameIndex = parts.indexOf(input.name);
  if (nameIndex === -1) {
    throw new Error(`Could not find project name "${input.name}" in command: ${input.command}`);
  }
  const flags = parts.slice(nameIndex);

  // Override install/git flags: strip existing, force no-install and no-git
  const filtered = flags.filter(
    (f) => f !== "--install" && f !== "--no-install" && f !== "--git" && f !== "--no-git",
  );

  return ["create", ...filtered, "--no-install", "--no-git"];
}

async function scaffoldProject(
  input: ScaffoldInput,
  outputDir: string,
): Promise<{ success: boolean; projectDir: string; error?: string; durationMs: number }> {
  const start = Date.now();
  const projectDir = join(outputDir, input.name);

  await mkdir(outputDir, { recursive: true });

  const args = buildCliArgs(input);

  try {
    const proc = Bun.spawn(["node", CLI_PATH, ...args], {
      cwd: outputDir,
      stdout: "pipe",
      stderr: "pipe",
      env: {
        ...process.env,
        NO_COLOR: "1",
      },
    });

    const timeoutId = setTimeout(() => { try { proc.kill(); } catch {} }, 120_000); // 2 min scaffold timeout

    const [_stdout, stderr] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
    ]);
    const exitCode = await proc.exited;

    clearTimeout(timeoutId);

    const success = exitCode === 0 && existsSync(projectDir);
    return {
      success,
      projectDir,
      error: success ? undefined : `exit ${exitCode}: ${stderr.slice(-1000)}`,
      durationMs: Date.now() - start,
    };
  } catch (error) {
    return {
      success: false,
      projectDir,
      error: error instanceof Error ? error.message : String(error),
      durationMs: Date.now() - start,
    };
  }
}

// ── Reporting ───────────────────────────────────────────────────────────

function formatMarkdownSummary(
  seed: string,
  results: VerifyResult[],
  options?: { presetId?: string; devCheckEnabled?: boolean; majorDepInfo?: MajorDepInfo[] },
): string {
  const { presetId, devCheckEnabled, majorDepInfo: depInfo } = options ?? {};
  const passed = results.filter((r) => r.overallSuccess).length;
  const failed = results.filter((r) => !r.overallSuccess).length;

  let md = depInfo ? "## Major Dependency Smoke Test Results\n\n" : "## Smoke Test Results\n\n";

  if (depInfo && depInfo.length > 0) {
    const pkgList = depInfo.map((p) => `${p.name} ^${p.oldMajor}\u2192^${p.newMajor}`).join(", ");
    md += `**Packages tested:** ${pkgList}\n`;
  }

  md += `**Seed**: \`${seed}\`\n`;
  md += `**Total**: ${results.length} | **Passed**: ${passed} | **Failed**: ${failed}\n\n`;

  // Results table
  md += "| Ecosystem | Name | ";
  const allStepNames = [...new Set(results.flatMap((r) => r.steps.map((s) => s.step)))];
  md += allStepNames.join(" | ");
  md += " | Result |\n";
  md += "|-----------|------|";
  md += allStepNames.map(() => "---").join("|");
  md += "|--------|\n";

  for (const result of results) {
    const stepMap = new Map(result.steps.map((s) => [s.step, s]));
    md += `| ${result.ecosystem} | ${result.comboName} | `;
    md += allStepNames
      .map((name) => {
        const step = stepMap.get(name);
        if (!step) return "-";
        if (step.skipped) return "skip";
        return step.success ? "ok" : "FAIL";
      })
      .join(" | ");
    md += ` | ${result.overallSuccess ? "PASS" : "FAIL"} |\n`;
  }

  // Failure details
  const failures = results.filter((r) => !r.overallSuccess);
  if (failures.length > 0) {
    md += "\n### Failures\n\n";
    for (const result of failures) {
      md += `#### ${result.comboName} (${result.ecosystem})\n`;
      for (const step of result.steps.filter((s) => !s.success && !s.skipped)) {
        md += `- **${step.step}**: exit ${step.exitCode} [${step.classification ?? "unknown"}]\n`;
        if (step.stderr) {
          const snippet = step.stderr.trim().slice(-800);
          md += `  \`\`\`\n  ${snippet}\n  \`\`\`\n`;
        }
      }
    }
  }

  md += `\n### Reproduce locally\n\`\`\`bash\nbun run test:smoke -- --seed ${seed}\n\`\`\`\n`;

  if (presetId) {
    md += `\n\`\`\`bash\n# Preset mode:\nbun run test:smoke -- --preset ${presetId}${devCheckEnabled ? " --dev-check" : ""}\n\`\`\`\n`;
  }

  return md;
}

// ── Main ────────────────────────────────────────────────────────────────

const args = parseArgs(process.argv.slice(2));

let combos: ComboCandidate[];
let majorDepInfo: MajorDepInfo[] | undefined;

if (args.majorDeps) {
  // Major-dependency mode: build combos targeting specific package updates
  let majorPackageNames: string[];

  if (args.majorDepsPackages) {
    majorPackageNames = args.majorDepsPackages.split(",").map((s) => s.trim()).filter(Boolean);
    combos = buildMajorDepCombos(majorPackageNames);
  } else if (args.majorDepsDiff) {
    const diffText = readFileSync(args.majorDepsDiff, "utf-8");
    const result = buildMajorDepCombosFromDiff(diffText);
    majorDepInfo = result.packages;
    combos = result.combos;
    majorPackageNames = result.packages.map((p) => p.name);
  } else {
    // Auto-detect from git diff
    try {
      const proc = Bun.spawn(
        ["git", "diff", "HEAD~1", "--", "packages/template-generator/src/utils/add-deps.ts"],
        { stdout: "pipe", stderr: "pipe" },
      );
      const diffText = await new Response(proc.stdout).text();
      await proc.exited;
      const result = buildMajorDepCombosFromDiff(diffText);
      majorDepInfo = result.packages;
      combos = result.combos;
      majorPackageNames = result.packages.map((p) => p.name);
    } catch {
      console.error("Failed to auto-detect major deps from git diff. Use --major-deps-packages or --major-deps-diff.");
      process.exit(1);
    }
  }

  if (combos.length === 0) {
    console.log("No major-dep combos to test (no matching package rules found).");
    process.exit(0);
  }

  const flags = [args.devCheck && "dev-check", args.routeCheck && "route-check"].filter(Boolean).join(", ");
  console.log(`Running major-deps smoke test (${combos.length} combo(s) for ${majorPackageNames.length} package(s))${flags ? ` [${flags}]` : ""}\n`);
  if (majorDepInfo) {
    for (const p of majorDepInfo) {
      console.log(`  ${p.name}: ^${p.oldMajor} → ^${p.newMajor}`);
    }
    console.log();
  }
} else if (args.preset) {
  combos = getPresetCombos(args.preset);
  console.log(`Running smoke test for preset "${args.preset}" (${combos.length} combo(s))${args.devCheck ? " [dev-check enabled]" : ""}\n`);
} else {
  combos = generateCombos(args);
  console.log(`Running smoke test (seed: ${args.seed}, combos: ${combos.length})${args.devCheck ? " [dev-check enabled]" : ""}\n`);
}

await mkdir(args.output, { recursive: true });
const results: VerifyResult[] = [];

for (const combo of combos) {
  console.log(`\n${"─".repeat(60)}`);
  console.log(`[${combo.ecosystem}] ${combo.name}`);
  console.log(`  ${combo.command}\n`);

  const scaffoldResult = await scaffoldProject(combo, args.output);

  if (!scaffoldResult.success) {
    console.error(`  Scaffold failed: ${scaffoldResult.error}`);
    results.push({
      ecosystem: combo.ecosystem,
      comboName: combo.name,
      projectDir: scaffoldResult.projectDir,
      overallSuccess: false,
      steps: [
        {
          step: "scaffold",
          success: false,
          durationMs: scaffoldResult.durationMs,
          stderr: scaffoldResult.error,
          classification: "template",
        },
      ],
      totalDurationMs: scaffoldResult.durationMs,
    });
    continue;
  }

  console.log(`  Scaffolded (${scaffoldResult.durationMs}ms)`);

  const verify = getVerifier(combo.ecosystem);
  const result = await verify(combo.name, scaffoldResult.projectDir, {
    devCheck: args.devCheck,
    strict: args.strict,
    routeCheck: args.routeCheck,
    outputDir: args.output,
    config: combo.config,
  });
  results.push(result);

  for (const step of result.steps) {
    const icon = step.skipped ? "⊘" : step.success ? "✓" : "✗";
    console.log(`  ${icon} ${step.step} (${step.durationMs}ms)${step.classification ? ` [${step.classification}]` : ""}`);
    if (!step.success && !step.skipped && !step.advisory) {
      if (step.stdout) {
        const snippet = step.stdout.trim().split("\n").slice(-15).join("\n");
        console.log(`    stdout: ${snippet}`);
      }
      if (step.stderr) {
        const snippet = step.stderr.trim().split("\n").slice(-10).join("\n");
        console.log(`    stderr: ${snippet}`);
      }
    }
  }
  console.log(`  ${result.overallSuccess ? "PASSED" : "FAILED"}`);

  // Clean up successful projects to save disk
  if (result.overallSuccess && existsSync(scaffoldResult.projectDir)) {
    await rm(scaffoldResult.projectDir, { recursive: true, force: true });
  }
}

// Final report
console.log(`\n${"═".repeat(60)}`);
const passed = results.filter((r) => r.overallSuccess).length;
const failed = results.filter((r) => !r.overallSuccess).length;
console.log(`Results: ${passed} passed, ${failed} failed out of ${results.length}`);

await writeFile(join(args.output, "smoke-results.json"), JSON.stringify(results, null, 2));
await writeFile(
  join(args.output, "summary.md"),
  formatMarkdownSummary(args.seed, results, {
    presetId: args.preset,
    devCheckEnabled: args.devCheck,
    majorDepInfo,
  }),
);

const hasTemplateBug = results.some((r) =>
  r.steps.some((s) => !s.success && !s.skipped && s.classification === "template"),
);
if (hasTemplateBug) process.exitCode = 1;
