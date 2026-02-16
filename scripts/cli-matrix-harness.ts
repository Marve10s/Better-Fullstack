#!/usr/bin/env bun

import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dir, "..");
const TEMP_ROOT = path.join(os.tmpdir(), "bfs-matrix-runs", "current");
const REPORTS_DIR = path.join(REPO_ROOT, "reports");
const CLI_SOURCE = path.join(REPO_ROOT, "apps/cli/src/cli.ts");

const USE_PROD = process.argv.includes("--prod");
const VERBOSE = process.argv.includes("--verbose");
const TIMEOUT_CREATE = 120_000;
const TIMEOUT_INSTALL = 180_000;

interface MatrixEntry {
  name: string;
  description: string;
  ecosystem: string;
  flags: Record<string, string | string[] | boolean>;
  expectedFiles: string[];
  installCmd?: string;
}

interface StepResult {
  success: boolean;
  durationMs: number;
  error?: string;
  skipped: boolean;
}

interface ProjectResult {
  name: string;
  description: string;
  ecosystem: string;
  flags: Record<string, string | string[] | boolean>;
  creation: StepResult & { output?: string };
  structure: { success: boolean; missingFiles: string[]; foundFiles: string[] };
  install: StepResult;
  overall: "pass" | "fail" | "partial";
}

interface CycleReport {
  timestamp: string;
  mode: "prod" | "local";
  tempRoot: string;
  totalProjects: number;
  passed: number;
  failed: number;
  partial: number;
  durationMs: number;
  projects: ProjectResult[];
}

const MATRIX: MatrixEntry[] = [
  {
    name: "ts-tanstack-hono-drizzle",
    description: "TanStack Router + Hono + SQLite/Drizzle + tRPC (default stack)",
    ecosystem: "typescript",
    flags: {
      frontend: ["tanstack-router"],
      backend: "hono",
      database: "sqlite",
      orm: "drizzle",
      api: "trpc",
      runtime: "bun",
      cssFramework: "tailwind",
      uiLibrary: "shadcn-ui",
      testing: "vitest",
      validation: "zod",
      packageManager: "bun",
    },
    expectedFiles: ["package.json", "tsconfig.json"],
    installCmd: "bun install --frozen-lockfile 2>/dev/null || bun install",
  },
  {
    name: "ts-next-self-prisma",
    description: "Next.js self-hosted + Postgres/Prisma (fullstack framework)",
    ecosystem: "typescript",
    flags: {
      frontend: ["next"],
      backend: "self",
      database: "postgres",
      orm: "prisma",
      api: "trpc",
      cssFramework: "tailwind",
      uiLibrary: "shadcn-ui",
      testing: "vitest",
      validation: "zod",
      packageManager: "bun",
    },
    expectedFiles: ["package.json", "tsconfig.json"],
    installCmd: "bun install --frozen-lockfile 2>/dev/null || bun install",
  },
  {
    name: "ts-rr-express-orpc",
    description: "React Router + Express + Postgres/Drizzle + oRPC + Node runtime",
    ecosystem: "typescript",
    flags: {
      frontend: ["react-router"],
      backend: "express",
      database: "postgres",
      orm: "drizzle",
      api: "orpc",
      runtime: "node",
      cssFramework: "tailwind",
      uiLibrary: "shadcn-ui",
      testing: "vitest",
      validation: "zod",
      packageManager: "bun",
    },
    expectedFiles: ["package.json", "tsconfig.json"],
    installCmd: "bun install --frozen-lockfile 2>/dev/null || bun install",
  },
  {
    name: "ts-svelte-fastify",
    description: "Svelte + Fastify + MySQL/Prisma + oRPC",
    ecosystem: "typescript",
    flags: {
      frontend: ["svelte"],
      backend: "fastify",
      database: "mysql",
      orm: "prisma",
      api: "orpc",
      runtime: "bun",
      cssFramework: "tailwind",
      uiLibrary: "daisyui",
      testing: "vitest",
      validation: "zod",
      packageManager: "bun",
    },
    expectedFiles: ["package.json"],
    installCmd: "bun install --frozen-lockfile 2>/dev/null || bun install",
  },
  {
    name: "ts-solid-elysia",
    description: "Solid + Elysia + SQLite/Drizzle + oRPC (Bun-native)",
    ecosystem: "typescript",
    flags: {
      frontend: ["solid"],
      backend: "elysia",
      database: "sqlite",
      orm: "drizzle",
      api: "orpc",
      runtime: "bun",
      cssFramework: "tailwind",
      uiLibrary: "daisyui",
      testing: "vitest",
      validation: "zod",
      packageManager: "bun",
    },
    expectedFiles: ["package.json"],
    installCmd: "bun install --frozen-lockfile 2>/dev/null || bun install",
  },
  {
    name: "ts-nuxt-nitro",
    description: "Nuxt + Nitro + Postgres/Drizzle + oRPC",
    ecosystem: "typescript",
    flags: {
      frontend: ["nuxt"],
      backend: "nitro",
      database: "postgres",
      orm: "drizzle",
      api: "orpc",
      runtime: "bun",
      cssFramework: "tailwind",
      uiLibrary: "daisyui",
      testing: "vitest",
      validation: "zod",
      packageManager: "bun",
    },
    expectedFiles: ["package.json"],
    installCmd: "bun install --frozen-lockfile 2>/dev/null || bun install",
  },
  {
    name: "ts-angular-standalone",
    description: "Angular standalone (built-in server, no external backend)",
    ecosystem: "typescript",
    flags: {
      frontend: ["angular"],
      backend: "none",
      database: "none",
      orm: "none",
      api: "none",
      cssFramework: "tailwind",
      uiLibrary: "daisyui",
      testing: "vitest",
      validation: "zod",
      packageManager: "bun",
    },
    expectedFiles: ["package.json"],
    installCmd: "bun install --frozen-lockfile 2>/dev/null || bun install",
  },
  {
    name: "rust-axum-leptos",
    description: "Rust: Axum + Leptos + SeaORM + Tonic gRPC",
    ecosystem: "rust",
    flags: {
      rustWebFramework: "axum",
      rustFrontend: "leptos",
      rustOrm: "sea-orm",
      rustApi: "tonic",
      rustCli: "clap",
    },
    expectedFiles: ["Cargo.toml"],
  },
  {
    name: "python-fastapi-sqla",
    description: "Python: FastAPI + SQLAlchemy + Pydantic + Ruff",
    ecosystem: "python",
    flags: {
      pythonWebFramework: "fastapi",
      pythonOrm: "sqlalchemy",
      pythonValidation: "pydantic",
      pythonQuality: "ruff",
    },
    expectedFiles: ["pyproject.toml"],
  },
  {
    name: "go-gin-gorm",
    description: "Go: Gin + GORM + gRPC + Zap logging",
    ecosystem: "go",
    flags: {
      goWebFramework: "gin",
      goOrm: "gorm",
      goApi: "grpc-go",
      goLogging: "zap",
    },
    expectedFiles: ["go.mod"],
  },
];

const TS_DEFAULT_FLAGS: Record<string, string> = {
  auth: "none",
  payments: "none",
  email: "none",
  fileUpload: "none",
  effect: "none",
  stateManagement: "none",
  forms: "none",
  ai: "none",
  realtime: "none",
  jobQueue: "none",
  animation: "none",
  logging: "none",
  observability: "none",
  analytics: "none",
  cms: "none",
  caching: "none",
  search: "none",
  fileStorage: "none",
  addons: "none",
  examples: "none",
  webDeploy: "none",
  serverDeploy: "none",
  dbSetup: "none",
};

function log(msg: string) {
  const ts = new Date().toISOString().slice(11, 19);
  console.log(`[${ts}] ${msg}`);
}

function runCommand(
  cmd: string,
  options: { cwd?: string; timeout?: number } = {},
): { success: boolean; output: string; durationMs: number } {
  const start = Date.now();
  try {
    const output = execSync(cmd, {
      cwd: options.cwd ?? process.cwd(),
      timeout: options.timeout ?? 60_000,
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
      env: { ...process.env, CI: "1", NO_COLOR: "1" },
    });
    return { success: true, output: output ?? "", durationMs: Date.now() - start };
  } catch (error: unknown) {
    const e = error as { stdout?: string; stderr?: string; message?: string };
    const output = [e.stdout, e.stderr, e.message].filter(Boolean).join("\n");
    return { success: false, output: output.trim(), durationMs: Date.now() - start };
  }
}

function toKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function buildCliCommand(entry: MatrixEntry, projectName: string): string {
  const args: string[] = [];

  if (USE_PROD) {
    args.push("bun", "create", "better-fullstack@latest", projectName);
  } else {
    args.push("bun", CLI_SOURCE, projectName);
  }

  if (entry.ecosystem !== "typescript") {
    args.push("--yes");
  }
  args.push("--no-git", "--no-install", "--disable-analytics");
  args.push("--directory-conflict", "error");
  args.push("--manual-db");
  args.push("--ecosystem", entry.ecosystem);
  args.push("--ai-docs", "none");

  if (entry.ecosystem === "typescript") {
    for (const [key, def] of Object.entries(TS_DEFAULT_FLAGS)) {
      if (!(key in entry.flags)) {
        args.push(`--${toKebab(key)}`, def);
      }
    }
  }

  for (const [key, value] of Object.entries(entry.flags)) {
    const flag = toKebab(key);
    if (Array.isArray(value)) {
      for (const v of value) {
        args.push(`--${flag}`, String(v));
      }
    } else if (typeof value === "boolean") {
      args.push(value ? `--${flag}` : `--no-${flag}`);
    } else {
      args.push(`--${flag}`, String(value));
    }
  }

  return args.join(" ");
}

function checkProjectStructure(
  projectDir: string,
  expectedFiles: string[],
): { success: boolean; missingFiles: string[]; foundFiles: string[] } {
  const foundFiles: string[] = [];
  const missingFiles: string[] = [];

  if (!fs.existsSync(projectDir)) {
    return { success: false, missingFiles: expectedFiles, foundFiles: [] };
  }

  for (const file of expectedFiles) {
    if (fs.existsSync(path.join(projectDir, file))) {
      foundFiles.push(file);
    } else {
      missingFiles.push(file);
    }
  }

  try {
    for (const item of fs.readdirSync(projectDir)) {
      if (!foundFiles.includes(item)) {
        foundFiles.push(item);
      }
    }
  } catch {
    // directory might not exist
  }

  return { success: missingFiles.length === 0, missingFiles, foundFiles };
}

function ensureWorkspaceBuild(): void {
  if (USE_PROD) return;

  log("Ensuring workspace packages are built...");
  const build = runCommand("turbo build --filter=create-better-fullstack", {
    cwd: REPO_ROOT,
    timeout: 120_000,
  });

  if (!build.success) {
    console.error("Failed to build workspace packages:\n", build.output.slice(-600));
    process.exit(2);
  }
  log(`Build OK (${(build.durationMs / 1000).toFixed(1)}s)`);
}

function formatDuration(ms: number): string {
  return `${(ms / 1000).toFixed(1)}s`;
}

async function runCycle(): Promise<CycleReport> {
  const cycleStart = Date.now();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);

  log(`=== CLI Matrix Harness ===`);
  log(`Mode: ${USE_PROD ? "prod (bun create better-fullstack@latest)" : "local (repo source)"}`);
  log(`Temp root: ${TEMP_ROOT}`);
  log(`Projects: ${MATRIX.length}`);

  ensureWorkspaceBuild();

  if (fs.existsSync(TEMP_ROOT)) {
    log("Cleaning previous cycle folders...");
    fs.rmSync(TEMP_ROOT, { recursive: true, force: true });
  }
  fs.mkdirSync(TEMP_ROOT, { recursive: true });

  const results: ProjectResult[] = [];

  for (let i = 0; i < MATRIX.length; i++) {
    const entry = MATRIX[i]!;
    const projectDir = path.join(TEMP_ROOT, entry.name);

    log(`\n--- [${i + 1}/${MATRIX.length}] ${entry.name} ---`);
    log(`  ${entry.description}`);

    const cmd = buildCliCommand(entry, entry.name);
    if (VERBOSE) log(`  CMD: ${cmd}`);

    const creationRun = runCommand(cmd, { cwd: TEMP_ROOT, timeout: TIMEOUT_CREATE });
    log(
      `  Create: ${creationRun.success ? "PASS" : "FAIL"} (${formatDuration(creationRun.durationMs)})`,
    );

    if (!creationRun.success) {
      const errorLines = creationRun.output.split("\n").slice(-8).join("\n");
      log(`  Error tail:\n${errorLines}`);
    }

    const structure = checkProjectStructure(projectDir, entry.expectedFiles);
    if (structure.success) {
      log(`  Structure: PASS (${structure.foundFiles.length} items found)`);
    } else {
      log(`  Structure: FAIL (missing: ${structure.missingFiles.join(", ")})`);
    }

    const install: StepResult = { success: false, durationMs: 0, skipped: true };
    if (creationRun.success && structure.success && entry.installCmd) {
      install.skipped = false;
      log(`  Installing deps...`);
      const installRun = runCommand(entry.installCmd, {
        cwd: projectDir,
        timeout: TIMEOUT_INSTALL,
      });
      install.success = installRun.success;
      install.durationMs = installRun.durationMs;
      if (!installRun.success) {
        install.error = installRun.output.slice(-800);
      }
      log(
        `  Install: ${install.success ? "PASS" : "FAIL"} (${formatDuration(install.durationMs)})`,
      );
    }

    let overall: "pass" | "fail" | "partial" = "pass";
    if (!creationRun.success || !structure.success) {
      overall = "fail";
    } else if (!install.skipped && !install.success) {
      overall = "partial";
    }

    results.push({
      name: entry.name,
      description: entry.description,
      ecosystem: entry.ecosystem,
      flags: entry.flags,
      creation: {
        success: creationRun.success,
        durationMs: creationRun.durationMs,
        error: creationRun.success ? undefined : creationRun.output.slice(-800),
        output: VERBOSE ? creationRun.output.slice(-2000) : undefined,
        skipped: false,
      },
      structure,
      install,
      overall,
    });
  }

  return {
    timestamp,
    mode: USE_PROD ? "prod" : "local",
    tempRoot: TEMP_ROOT,
    totalProjects: MATRIX.length,
    passed: results.filter((r) => r.overall === "pass").length,
    failed: results.filter((r) => r.overall === "fail").length,
    partial: results.filter((r) => r.overall === "partial").length,
    durationMs: Date.now() - cycleStart,
    projects: results,
  };
}

function generateMarkdownReport(report: CycleReport): string {
  const lines: string[] = [];

  lines.push(`# CLI Matrix Harness Report`);
  lines.push(``);
  lines.push(`**Timestamp:** ${report.timestamp}`);
  lines.push(`**Mode:** ${report.mode}`);
  lines.push(`**Duration:** ${formatDuration(report.durationMs)}`);
  lines.push(`**Temp Root:** \`${report.tempRoot}\``);
  lines.push(``);
  lines.push(`## Summary`);
  lines.push(``);
  lines.push(`| Metric | Count |`);
  lines.push(`|--------|-------|`);
  lines.push(`| Total Projects | ${report.totalProjects} |`);
  lines.push(`| Passed | ${report.passed} |`);
  lines.push(`| Failed | ${report.failed} |`);
  lines.push(`| Partial | ${report.partial} |`);
  lines.push(``);

  lines.push(`## Results`);
  lines.push(``);
  lines.push(`| # | Project | Ecosystem | Create | Structure | Install | Overall |`);
  lines.push(`|---|---------|-----------|--------|-----------|---------|---------|`);

  for (let i = 0; i < report.projects.length; i++) {
    const p = report.projects[i]!;
    const create = p.creation.success ? "PASS" : "FAIL";
    const struct = p.structure.success ? "PASS" : "FAIL";
    const inst = p.install.skipped ? "N/A" : p.install.success ? "PASS" : "FAIL";
    const ov = p.overall.toUpperCase();
    lines.push(
      `| ${i + 1} | ${p.name} | ${p.ecosystem} | ${create} | ${struct} | ${inst} | **${ov}** |`,
    );
  }

  lines.push(``);
  lines.push(`## Project Details`);

  for (const p of report.projects) {
    lines.push(``);
    lines.push(`### ${p.name}`);
    lines.push(``);
    lines.push(`> ${p.description}`);
    lines.push(``);
    lines.push(`- **Ecosystem:** ${p.ecosystem}`);
    lines.push(`- **Overall:** ${p.overall.toUpperCase()}`);
    lines.push(
      `- **Creation:** ${p.creation.success ? "PASS" : "FAIL"} (${formatDuration(p.creation.durationMs)})`,
    );
    lines.push(`- **Structure:** ${p.structure.success ? "PASS" : "FAIL"}`);

    if (p.structure.missingFiles.length > 0) {
      lines.push(`  - Missing: ${p.structure.missingFiles.join(", ")}`);
    }
    if (p.structure.foundFiles.length > 0) {
      lines.push(`  - Found: ${p.structure.foundFiles.join(", ")}`);
    }

    if (!p.install.skipped) {
      lines.push(
        `- **Install:** ${p.install.success ? "PASS" : "FAIL"} (${formatDuration(p.install.durationMs)})`,
      );
      if (p.install.error) {
        lines.push("  ```");
        lines.push(`  ${p.install.error.slice(0, 400)}`);
        lines.push("  ```");
      }
    }

    if (p.creation.error) {
      lines.push(`- **Error:**`);
      lines.push("  ```");
      lines.push(`  ${p.creation.error.slice(0, 600)}`);
      lines.push("  ```");
    }

    const flagStr = Object.entries(p.flags)
      .map(([k, v]) => {
        if (Array.isArray(v)) return v.map((x) => `--${k} ${x}`).join(" ");
        if (typeof v === "boolean") return v ? `--${k}` : `--no-${k}`;
        return `--${k} ${v}`;
      })
      .join(" ");
    lines.push(`- **Flags:** \`--ecosystem ${p.ecosystem} ${flagStr}\``);
  }

  lines.push(``);
  lines.push(`---`);
  lines.push(`*Generated by cli-matrix-harness.ts*`);

  return lines.join("\n");
}

async function main() {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });

  const report = await runCycle();

  const jsonPath = path.join(REPORTS_DIR, `cli-matrix-${report.timestamp}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  log(`\nJSON report: ${jsonPath}`);

  const mdPath = path.join(REPORTS_DIR, `cli-matrix-${report.timestamp}.md`);
  fs.writeFileSync(mdPath, generateMarkdownReport(report));
  log(`Markdown report: ${mdPath}`);

  log(`\n=== CYCLE SUMMARY ===`);
  log(
    `Total: ${report.totalProjects} | Pass: ${report.passed} | Fail: ${report.failed} | Partial: ${report.partial}`,
  );
  log(`Duration: ${formatDuration(report.durationMs)}`);

  if (report.failed > 0) {
    log(`\nFailed projects:`);
    for (const p of report.projects.filter((p) => p.overall === "fail")) {
      log(`  - ${p.name}: ${p.creation.error?.slice(0, 200) ?? "structure check failed"}`);
    }
  }

  if (report.partial > 0) {
    log(`\nPartial projects (created but install failed):`);
    for (const p of report.projects.filter((p) => p.overall === "partial")) {
      log(`  - ${p.name}: ${p.install.error?.slice(0, 200) ?? "install issue"}`);
    }
  }

  process.exit(report.failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(2);
});
