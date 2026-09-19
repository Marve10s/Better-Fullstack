import { EMBEDDED_TEMPLATES, generateVirtualProject } from "@better-fullstack/template-generator";
import { writeTreeToFilesystem } from "@better-fullstack/template-generator/fs-writer";
import { createCliDefaultProjectConfigBase, type ProjectConfig } from "@better-fullstack/types";
import { afterAll, describe, expect, it } from "bun:test";
import { execa, type ResultPromise } from "execa";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path from "node:path";
import { type Browser, chromium } from "playwright-core";

import { buildBtsConfigForPersistence, writeBtsConfig } from "@/config/bts-config";
import { buildDevtoolsReport } from "@/devtools/serve";
import { recordScaffoldManifest } from "@/lifecycle/scaffold-manifest";

const shouldRunE2E = process.env.E2E === "1";
const describeE2E = shouldRunE2E ? describe : describe.skip;

const PORT = 47393;
const roots: string[] = [];
let server: ResultPromise | undefined;
let browser: Browser | undefined;
let staticServer: ReturnType<typeof Bun.serve> | undefined;
let serverOutput = "";

afterAll(async () => {
  await browser?.close();
  await staticServer?.stop(true);
  if (server) {
    server.kill("SIGINT");
    await server.catch(() => undefined);
  }
  await Promise.all(roots.splice(0).map((root) => fs.remove(root)));
});

async function scaffoldProject(projectDir: string) {
  const config = {
    ...createCliDefaultProjectConfigBase(),
    projectName: path.basename(projectDir),
    projectDir,
    relativePath: ".",
    git: false,
    install: false,
  } as ProjectConfig;
  const persisted = buildBtsConfigForPersistence(config);
  const normalized = { ...config, ...persisted, projectDir, relativePath: "." } as ProjectConfig;
  const generated = await generateVirtualProject({
    config: normalized,
    templates: EMBEDDED_TEMPLATES,
  });
  if (!generated.success || !generated.tree)
    throw new Error(generated.error ?? "generation failed");
  await writeTreeToFilesystem(generated.tree, projectDir);
  await writeBtsConfig(normalized, { version: persisted.version, createdAt: persisted.createdAt });
  await recordScaffoldManifest(projectDir);
}

function stripAnsi(text: string): string {
  // oxlint-disable-next-line no-control-regex -- terminal colour codes are exactly what we strip.
  return text.replace(/\u001b\[[0-9;]*m/g, "");
}

async function waitFor<T>(probe: () => T | undefined, timeoutMs: number, what: string): Promise<T> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const value = probe();
    if (value !== undefined) return value;
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Timed out waiting for ${what}. Server output:\n${serverOutput}`);
}

describeE2E("devtools panel", () => {
  it(
    "authorizes with the terminal code, shows the project report, and plans an update",
    async () => {
      const root = await fs.mkdtemp(path.join(tmpdir(), "bfs-devtools-panel-"));
      roots.push(root);
      const projectDir = path.join(root, "project");
      await scaffoldProject(projectDir);

      server = execa(
        process.execPath,
        [
          path.join(import.meta.dir, "../../src/cli.ts"),
          "devtools",
          "--project-dir",
          projectDir,
          "--port",
          String(PORT),
        ],
        { env: { ...process.env, BTS_TELEMETRY_DISABLED: "1", FORCE_COLOR: "0" }, reject: false },
      );
      const collect = (chunk: Buffer | string) => {
        serverOutput += chunk.toString();
      };
      server.stdout?.on("data", collect);
      server.stderr?.on("data", collect);
      await waitFor(
        () => (serverOutput.includes("devtools ready") ? true : undefined),
        60_000,
        "server start",
      );

      browser = await chromium.launch();
      const page = await browser.newPage();
      const pageLog: string[] = [];
      page.on("console", (message) => pageLog.push(`[${message.type()}] ${message.text()}`));
      page.on("pageerror", (error) => pageLog.push(`[pageerror] ${error.message}`));
      const explain = async (step: string) =>
        `${step}\nPage log:\n${pageLog.join("\n")}\nBody:\n${await page.textContent("body")}\nServer output:\n${serverOutput}`;
      await page.goto(`http://localhost:${PORT}/`);

      // Auth is on by default: the panel asks the server to print a one-time code.
      const codeInput = page.getByLabel("Authorization code");
      await codeInput.waitFor({ timeout: 30_000 });
      const code = await waitFor(
        () => stripAnsi(serverOutput).match(/auth code\s+(\d{6})/)?.[1],
        30_000,
        "the one-time code in the terminal",
      );
      await codeInput.fill(code);
      await page.getByRole("button", { name: "Continue" }).click();

      // The overview loads the live project report.
      await page
        .getByTestId("health")
        .waitFor({ timeout: 60_000 })
        .catch(async (error: unknown) => {
          throw new Error(await explain(`health did not render: ${String(error)}`));
        });
      await expect(page.getByTestId("project-dir").textContent()).resolves.toContain("project");
      await expect(page.getByTestId("health").textContent()).resolves.toMatch(
        /Ready|Needs attention/,
      );

      // Plan a template update from the panel.
      await page.getByRole("tab", { name: "Update" }).click();
      await page.locator('[data-action="plan-update"]').click();
      const plan = page.getByTestId("update-plan");
      await plan.waitFor({ timeout: 120_000 });
      await expect(plan.textContent()).resolves.toMatch(/Plan ready|Plan blocked/);
    },
    { timeout: 300_000 },
  );

  it(
    "renders the baked report from a static directory with no server",
    async () => {
      const root = await fs.mkdtemp(path.join(tmpdir(), "bfs-devtools-static-"));
      roots.push(root);
      const projectDir = path.join(root, "project");
      await scaffoldProject(projectDir);
      const outDir = await buildDevtoolsReport({ projectDir, outDir: path.join(root, "report") });

      staticServer = Bun.serve({
        port: 0,
        fetch: async (request) => {
          const pathname = new URL(request.url).pathname;
          const file = Bun.file(path.join(outDir, pathname === "/" ? "index.html" : pathname));
          return (await file.exists())
            ? new Response(file)
            : new Response("not found", { status: 404 });
        },
      });

      browser ??= await chromium.launch();
      const page = await browser.newPage();
      await page.goto(`http://localhost:${staticServer.port}/`);
      await page.getByTestId("health").waitFor({ timeout: 60_000 });
      await expect(page.getByText("static report").textContent()).resolves.toBe("static report");
      await expect(page.getByTestId("project-dir").textContent()).resolves.toContain("project");
      // Mutations are unavailable without a live server.
      await page.getByRole("tab", { name: "Checks" }).click();
      await expect(page.getByRole("button", { name: "Run checks" }).isDisabled()).resolves.toBe(
        true,
      );
      // Plans are not baked either, so planning stays off as well.
      await page.getByRole("tab", { name: "Update" }).click();
      await expect(page.locator('[data-action="plan-update"]').isDisabled()).resolves.toBe(true);
    },
    { timeout: 300_000 },
  );
});
