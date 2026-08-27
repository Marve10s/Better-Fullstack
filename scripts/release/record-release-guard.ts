import { mkdir, readFile, writeFile } from "node:fs/promises";

import { EVIDENCE_SCHEMA_VERSION } from "@scripts/verified-combinations/evidence";

type ReleaseGuardStep = {
  command: string;
  durationMs: number;
  exitCode: number | null;
  status: "pass" | "fail" | "skipped";
};

type ReleaseGuardSummary = {
  schemaVersion: typeof EVIDENCE_SCHEMA_VERSION;
  workspaceClean: boolean;
  generatedAt: string;
  gitBranch?: string;
  gitHead?: string;
  script: string;
  overallSuccess: boolean;
  steps: ReleaseGuardStep[];
};

const OUTPUT_PATH = "testing/.release-guard/summary.json";

async function readReleaseScript(): Promise<string> {
  const packageJson = JSON.parse(await readFile("package.json", "utf8")) as {
    scripts?: Record<string, string>;
  };
  const releaseScript = packageJson.scripts?.["test:release"];

  if (!releaseScript) {
    throw new Error("Missing package.json#scripts.test:release");
  }

  return releaseScript;
}

function releaseGuardSteps(script: string): string[] {
  return script
    .split("&&")
    .map((step) => step.trim())
    .filter(Boolean);
}

async function runText(command: string): Promise<string | undefined> {
  const proc = Bun.spawn(["/bin/sh", "-c", command], {
    stdout: "pipe",
    stderr: "ignore",
  });
  const output = await new Response(proc.stdout).text();
  const exitCode = await proc.exited;

  if (exitCode !== 0) {
    return undefined;
  }

  return output.trim() || undefined;
}

async function runReleaseStep(command: string): Promise<ReleaseGuardStep> {
  const startedAt = Date.now();
  const proc = Bun.spawn(["/bin/sh", "-c", command], {
    stdout: "inherit",
    stderr: "inherit",
  });
  const exitCode = await proc.exited;

  return {
    command,
    durationMs: Date.now() - startedAt,
    exitCode,
    status: exitCode === 0 ? "pass" : "fail",
  };
}

async function workspaceIsClean(): Promise<boolean> {
  const proc = Bun.spawn(["git", "status", "--porcelain"], { stdout: "pipe", stderr: "ignore" });
  const output = await new Response(proc.stdout).text();
  return (await proc.exited) === 0 && output.trim() === "";
}

async function main(): Promise<void> {
  const script = await readReleaseScript();
  const commands = releaseGuardSteps(script);
  const steps: ReleaseGuardStep[] = [];

  for (const command of commands) {
    const step = await runReleaseStep(command);
    steps.push(step);

    if (step.status === "fail") {
      const remaining = commands.slice(steps.length);
      for (const skippedCommand of remaining) {
        steps.push({
          command: skippedCommand,
          durationMs: 0,
          exitCode: null,
          status: "skipped",
        });
      }
      break;
    }
  }

  const summary: ReleaseGuardSummary = {
    schemaVersion: EVIDENCE_SCHEMA_VERSION,
    workspaceClean: await workspaceIsClean(),
    generatedAt: new Date().toISOString(),
    gitBranch: await runText("git rev-parse --abbrev-ref HEAD"),
    gitHead: await runText("git rev-parse HEAD"),
    script,
    overallSuccess: steps.every((step) => step.status === "pass"),
    steps,
  };

  await mkdir("testing/.release-guard", { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
  console.log(`Wrote ${OUTPUT_PATH}`);

  if (!summary.overallSuccess) {
    process.exitCode = 1;
  }
}

await main();
