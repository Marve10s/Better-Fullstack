import type { Dirent } from "node:fs";

import { intro, log, spinner } from "@clack/prompts";
import { $ } from "execa";
import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";

import type { BetterTStackConfig, ProjectConfig } from "../types";

import { readBtsConfig } from "../utils/bts-config";
import { handleError } from "../utils/errors";
import { runGeneratedChecks } from "../utils/generated-checks";
import { renderTitle } from "../utils/render-title";

export type DoctorCommandInput = {
  projectDir?: string;
  skipChecks?: boolean;
  json?: boolean;
};

type CheckStatus = "pass" | "warn" | "fail";

type DoctorCheck = {
  label: string;
  status: CheckStatus;
  detail?: string;
};

const NON_TS_BACKEND_ECOSYSTEMS = new Set(["go", "rust", "python", "elixir", "java", "dotnet"]);

const IGNORED_DIRECTORIES = new Set([
  "node_modules",
  ".git",
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

const NATIVE_LOCKFILES: Record<string, { file: string; hint: string }> = {
  rust: { file: "Cargo.lock", hint: "cargo build" },
  go: { file: "go.sum", hint: "go mod tidy" },
  python: { file: "uv.lock", hint: "uv sync" },
  elixir: { file: "mix.lock", hint: "mix deps.get" },
};

function statusIcon(status: CheckStatus): string {
  switch (status) {
    case "pass":
      return pc.green("✓");
    case "warn":
      return pc.yellow("!");
    case "fail":
      return pc.red("✗");
  }
}

function hasNativeChecks(config: Pick<ProjectConfig, "ecosystem" | "stackParts">): boolean {
  if (NON_TS_BACKEND_ECOSYSTEMS.has(config.ecosystem)) {
    return true;
  }
  return (config.stackParts ?? []).some(
    (part) =>
      part.source !== "provided" &&
      part.role === "backend" &&
      NON_TS_BACKEND_ECOSYSTEMS.has(part.ecosystem),
  );
}

async function checkInstalledDependencies(
  projectDir: string,
  config: BetterTStackConfig,
): Promise<DoctorCheck[]> {
  const checks: DoctorCheck[] = [];

  if (await fs.pathExists(path.join(projectDir, "package.json"))) {
    const lockfile = JS_LOCKFILES.find((name) => fs.existsSync(path.join(projectDir, name)));
    checks.push(
      lockfile
        ? { label: "Lockfile", status: "pass", detail: lockfile }
        : {
            label: "Lockfile",
            status: "warn",
            detail: "No JavaScript lockfile found at the project root",
          },
    );

    const nodeModulesExists = await fs.pathExists(path.join(projectDir, "node_modules"));
    checks.push(
      nodeModulesExists
        ? { label: "node_modules", status: "pass" }
        : {
            label: "node_modules",
            status: "fail",
            detail: `Dependencies are not installed. Run \`${config.packageManager ?? "npm"} install\`.`,
          },
    );
  }

  const native = NATIVE_LOCKFILES[config.ecosystem];
  if (native) {
    const exists =
      (await fs.pathExists(path.join(projectDir, native.file))) ||
      (await fs.pathExists(path.join(projectDir, "apps/server", native.file)));
    checks.push(
      exists
        ? { label: native.file, status: "pass" }
        : {
            label: native.file,
            status: "warn",
            detail: `Not found. Run \`${native.hint}\` to fetch dependencies.`,
          },
    );
  }

  return checks;
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
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    if (key) {
      map.set(key, line.slice(eq + 1).trim());
    }
  }
  return map;
}

async function checkEnvFiles(projectDir: string): Promise<DoctorCheck[]> {
  const checks: DoctorCheck[] = [];
  const exampleFiles = await findEnvExampleFiles(projectDir);

  for (const examplePath of exampleFiles) {
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
    const missing: string[] = [];
    for (const key of exampleKeys.keys()) {
      const value = envKeys.get(key);
      if (value === undefined || value === "") {
        missing.push(key);
      }
    }

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

async function runBuildChecks(config: ProjectConfig, json: boolean): Promise<DoctorCheck[]> {
  const checks: DoctorCheck[] = [];
  const projectDir = config.projectDir;

  const rootPackageJsonPath = path.join(projectDir, "package.json");
  if (await fs.pathExists(rootPackageJsonPath)) {
    const pkg = (await fs.readJson(rootPackageJsonPath).catch(() => ({}))) as {
      scripts?: Record<string, string>;
    };
    if (pkg.scripts?.["check-types"]) {
      const pm = config.packageManager ?? "npm";
      const s = json ? null : spinner();
      s?.start("Running type checks (check-types)...");
      const result = await $({
        cwd: projectDir,
        reject: false,
        stdout: json ? "ignore" : "inherit",
        stderr: json ? "ignore" : "inherit",
      })`${pm} run check-types`;
      if (result.exitCode === 0) {
        s?.stop("Type checks passed");
        checks.push({ label: "check-types", status: "pass" });
      } else {
        s?.stop(pc.red("Type checks failed"));
        checks.push({
          label: "check-types",
          status: "fail",
          detail: `\`${pm} run check-types\` exited with code ${result.exitCode ?? `signal ${result.signal}`}`,
        });
      }
    }
  }

  if (hasNativeChecks(config)) {
    if (json) {
      checks.push({
        label: "ecosystem build checks",
        status: "warn",
        detail: "Skipped in --json mode. Re-run without --json to execute native build checks.",
      });
    } else {
      try {
        await runGeneratedChecks(config);
        checks.push({ label: "ecosystem build checks", status: "pass" });
      } catch (error) {
        checks.push({
          label: "ecosystem build checks",
          status: "fail",
          detail: error instanceof Error ? error.message : String(error),
        });
      }
    }
  }

  return checks;
}

export async function doctorCommand(input: DoctorCommandInput): Promise<void> {
  const projectDir = path.resolve(input.projectDir || process.cwd());
  const json = input.json ?? false;

  const btsConfig = await readBtsConfig(projectDir);
  if (!btsConfig) {
    if (json) {
      console.log(
        JSON.stringify(
          {
            projectDir,
            ok: false,
            error: "No Better Fullstack project found (bts.jsonc missing or invalid).",
          },
          null,
          2,
        ),
      );
      // Exit synchronously: trpc-cli calls process.exit(0) after the handler
      // resolves, which would override process.exitCode and break doctor as a gate.
      process.exit(1);
    }
    handleError(`No Better Fullstack project found in ${projectDir}. Make sure bts.jsonc exists.`);
  }

  const config = { ...btsConfig, projectDir } as unknown as ProjectConfig;

  if (!json) {
    renderTitle();
    intro(pc.magenta(`Diagnosing ${pc.cyan(path.basename(projectDir))}`));
    log.info(pc.dim(`Path: ${projectDir}`));
    log.info(pc.dim(`Ecosystem: ${btsConfig.ecosystem}`));
    if (btsConfig.graphSummary) {
      log.info(pc.dim(`Stack: ${btsConfig.graphSummary}`));
    }
  }

  const checks: DoctorCheck[] = [
    { label: "bts.jsonc", status: "pass", detail: `version ${btsConfig.version}` },
  ];
  checks.push(...(await checkInstalledDependencies(projectDir, btsConfig)));
  checks.push(...(await checkEnvFiles(projectDir)));

  if (!input.skipChecks) {
    checks.push(...(await runBuildChecks(config, json)));
  }

  const counts: Record<CheckStatus, number> = { pass: 0, warn: 0, fail: 0 };
  for (const check of checks) {
    counts[check.status] += 1;
  }

  if (json) {
    console.log(
      JSON.stringify(
        {
          projectDir,
          ecosystem: btsConfig.ecosystem,
          ok: counts.fail === 0,
          summary: counts,
          checks,
        },
        null,
        2,
      ),
    );
  } else {
    log.message("");
    for (const check of checks) {
      log.message(
        `${statusIcon(check.status)} ${check.label}${
          check.detail ? pc.dim(` — ${check.detail}`) : ""
        }`,
      );
    }
    log.message("");
    const summaryLine = `${pc.green(`${counts.pass} passed`)}, ${pc.yellow(
      `${counts.warn} warnings`,
    )}, ${pc.red(`${counts.fail} failed`)}`;
    if (counts.fail > 0) {
      log.error(`Diagnosis complete: ${summaryLine}`);
    } else if (counts.warn > 0) {
      log.warn(`Diagnosis complete: ${summaryLine}`);
    } else {
      log.success(`Diagnosis complete: ${summaryLine}`);
    }
  }

  // Exit synchronously on failure: trpc-cli calls process.exit(0) after the
  // handler resolves, which would override process.exitCode and let CI pipelines
  // (e.g. `bfs doctor && deploy`) proceed despite a failed diagnosis.
  if (counts.fail > 0) {
    process.exit(1);
  }
}
