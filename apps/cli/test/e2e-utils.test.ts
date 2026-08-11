import { afterEach, describe, expect, it } from "bun:test";
import { execa } from "execa";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { findTypecheckTargets, terminateProcessTree, typecheckProject } from "./e2e/e2e-utils";

const temporaryDirectories: string[] = [];

async function makeTemporaryDirectory(): Promise<string> {
  const directory = await mkdtemp(join(tmpdir(), "bfs-e2e-utils-"));
  temporaryDirectories.push(directory);
  return directory;
}

async function writeJson(path: string, value: unknown): Promise<void> {
  await writeFile(path, JSON.stringify(value, null, 2));
}

function isProcessAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

async function readPid(path: string, deadline = Date.now() + 5_000): Promise<number> {
  const content = await readFile(path, "utf8").catch(() => "");
  const pid = Number.parseInt(content, 10);
  if (Number.isInteger(pid) && pid > 0) return pid;
  if (Date.now() >= deadline) throw new Error("Timed out waiting for descendant pid");
  await new Promise((resolve) => setTimeout(resolve, 25));
  return readPid(path, deadline);
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { recursive: true, force: true })),
  );
});

describe("E2E typecheck command detection", () => {
  it("prefers the root workspace check-types script", async () => {
    const projectDir = await makeTemporaryDirectory();
    const webDir = join(projectDir, "apps", "web");
    await mkdir(webDir, { recursive: true });
    await writeJson(join(projectDir, "package.json"), {
      scripts: { "check-types": "bun run typecheck-marker.ts" },
    });
    await writeFile(
      join(projectDir, "typecheck-marker.ts"),
      'console.log("root-typecheck-ran");\n',
    );
    await writeJson(join(webDir, "package.json"), {
      scripts: { "check-types": "bun run missing-script.ts" },
    });

    expect(await findTypecheckTargets(projectDir)).toEqual([
      { dir: projectDir, script: "check-types" },
    ]);
    const result = await typecheckProject(projectDir);
    expect(result.ok).toBe(true);
    expect(result.stdout).toContain("root-typecheck-ran");
  });

  it("ignores a tsconfig when its package has no typecheck script", async () => {
    const projectDir = await makeTemporaryDirectory();
    const webDir = join(projectDir, "apps", "web");
    const serverDir = join(projectDir, "apps", "server");
    await mkdir(webDir, { recursive: true });
    await mkdir(serverDir, { recursive: true });
    await writeJson(join(projectDir, "package.json"), {});
    await writeJson(join(webDir, "package.json"), {});
    await writeJson(join(webDir, "tsconfig.json"), {});
    await writeJson(join(serverDir, "package.json"), {
      scripts: { typecheck: "bun run typecheck-marker.ts" },
    });
    await writeFile(
      join(serverDir, "typecheck-marker.ts"),
      'console.log("server-typecheck-ran");\n',
    );

    expect(await findTypecheckTargets(projectDir)).toEqual([
      { dir: serverDir, script: "typecheck" },
    ]);
    const result = await typecheckProject(projectDir);
    expect(result.ok).toBe(true);
    expect(result.stdout).toContain("server-typecheck-ran");
  });
  it("fails when a required typecheck target is missing", async () => {
    const projectDir = await makeTemporaryDirectory();
    await writeJson(join(projectDir, "package.json"), {});
    const result = await typecheckProject(projectDir, { requireTarget: true });
    expect(result.ok).toBe(false);
    expect(result.stderr).toContain("No typecheck script found");
  });
});

const processTreeTest = process.platform === "win32" ? it.skip : it;

describe("E2E process cleanup", () => {
  processTreeTest(
    "terminates a stubborn descendant process",
    async () => {
      const projectDir = await makeTemporaryDirectory();
      const pidPath = join(projectDir, "grandchild.pid");
      await writeFile(
        join(projectDir, "grandchild.ts"),
        ['process.on("SIGTERM", () => {});', "await new Promise(() => {});"].join("\n"),
      );
      await writeFile(
        join(projectDir, "launcher.ts"),
        [
          'const child = Bun.spawn(["bun", "run", "grandchild.ts"], {',
          "  cwd: import.meta.dir,",
          "  env: { ...Bun.env },",
          '  stdout: "ignore",',
          '  stderr: "ignore",',
          "});",
          'await Bun.write("grandchild.pid", String(child.pid));',
          'process.on("SIGTERM", () => {});',
          "await child.exited;",
        ].join("\n"),
      );

      const launcher = execa("bun", ["run", "launcher.ts"], {
        cwd: projectDir,
        detached: true,
        reject: false,
        stdio: "ignore",
      });
      let grandchildPid: number | null = null;
      try {
        grandchildPid = await readPid(pidPath);
        expect(isProcessAlive(grandchildPid)).toBe(true);

        await terminateProcessTree(launcher);
        expect(isProcessAlive(grandchildPid)).toBe(false);
      } finally {
        await terminateProcessTree(launcher);
        if (grandchildPid && isProcessAlive(grandchildPid)) {
          process.kill(grandchildPid, "SIGKILL");
        }
      }
    },
    15_000,
  );
});
