import { describe, expect, it } from "bun:test";
import * as BunContext from "@effect/platform-bun/BunContext";
import * as Effect from "effect/Effect";
import { existsSync } from "node:fs";
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import type { ScaffbenchOptions } from "@/types";

import { SCAFFBENCH_2_SPECS } from "@/specs";
import { runValidationCommand } from "@/validation/executor";
import { validateProjectCached } from "@/validation/cache";
import { validateCargoProject, validateProject } from "@/validation";

const goSpec = SCAFFBENCH_2_SPECS.find((spec) => spec.id === "go-realtime-api")!;

const options = (outDir: string): ScaffbenchOptions => ({
  command: "run",
  model: "executor-test",
  efforts: ["high"],
  paths: ["prompt"],
  specs: [goSpec.id],
  repeats: 1,
  outDir,
  maxBudgetUsd: "1",
  skipValidation: false,
  generateOnly: false,
  validateExisting: false,
  forceRevalidate: false,
  qualityGate: false,
  doctorCheck: false,
  routeCheck: false,
  promptStyle: "explicit",
  listSpecs: false,
  writeMatrixOnly: false,
  repair: false,
});

function alive(pid: number) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

describe("ScaffBench validation executor", () => {
  it("kills the whole process group on timeout, including detached children", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "sb-exec-kill-"));
    const pidFile = path.join(dir, "child.pid");
    try {
      const result = await runValidationCommand(
        "sh",
        ["-c", `sleep 600 & echo $! > ${JSON.stringify(pidFile)}; sleep 600`],
        dir,
        700,
      );
      expect(result.timedOut).toBe(true);
      expect(result.exitCode).toBeNull();

      const childPid = Number((await readFile(pidFile, "utf8")).trim());
      expect(Number.isInteger(childPid)).toBe(true);
      const deadline = Date.now() + 5_000;
      while (alive(childPid) && Date.now() < deadline) await Bun.sleep(100);
      expect(alive(childPid)).toBe(false);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }, 15_000);

  it("terminates commands whose output exceeds the limit and records the overflow", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "sb-exec-limit-"));
    try {
      const result = await runValidationCommand(
        "sh",
        ["-c", "yes overflow | head -c 20000000; sleep 120"],
        dir,
        60_000,
      );
      expect(result.timedOut).toBe(false);
      expect(result.exitCode).toBe(1);
      expect(result.stderrTail).toContain("output exceeded");
      expect(result.durationMs).toBeLessThan(30_000);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }, 40_000);

  it("kills the running process tree when the project validation deadline fires", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "sb-exec-deadline-"));
    const project = path.join(dir, "project");
    const bin = path.join(dir, "bin");
    const pidFile = path.join(dir, "child.pid");
    try {
      await mkdir(project);
      await mkdir(bin);
      await writeFile(path.join(project, "go.mod"), "module example.com/deadline-test\n");
      await writeFile(
        path.join(bin, "go"),
        `#!/bin/sh\nsleep 600 &\necho $! > ${JSON.stringify(pidFile)}\nsleep 600\n`,
      );
      await chmod(path.join(bin, "go"), 0o755);

      const previousPath = process.env.PATH;
      process.env.PATH = `${bin}${path.delimiter}${previousPath ?? ""}`;
      try {
        const validation = await validateProject(goSpec, project, options(dir), {
          deadlineMs: 1_500,
        }).pipe(Effect.runPromise);
        expect(validation.steps["unvalidated:deadline"]).toBeDefined();
      } finally {
        process.env.PATH = previousPath;
      }

      const childPid = Number((await readFile(pidFile, "utf8")).trim());
      expect(Number.isInteger(childPid)).toBe(true);
      const deadline = Date.now() + 5_000;
      while (alive(childPid) && Date.now() < deadline) await Bun.sleep(100);
      expect(alive(childPid)).toBe(false);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }, 20_000);

  it("records planned quality gates as not-run once an earlier gate fails", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "sb-exec-not-run-"));
    const project = path.join(dir, "project");
    const bin = path.join(dir, "bin");
    const ranLog = path.join(dir, "cargo-ran.log");
    try {
      await mkdir(project);
      await mkdir(bin);
      await writeFile(path.join(project, "Cargo.toml"), '[package]\nname = "not-run-test"\n');
      await writeFile(
        path.join(bin, "cargo"),
        `#!/bin/sh\necho "$1" >> ${JSON.stringify(ranLog)}\nif [ "$1" = "fmt" ]; then exit 1; fi\nexit 0\n`,
      );
      await chmod(path.join(bin, "cargo"), 0o755);

      const previousPath = process.env.PATH;
      process.env.PATH = `${bin}${path.delimiter}${previousPath ?? ""}`;
      const steps = await validateCargoProject(project, {
        ...options(dir),
        qualityGate: true,
      })
        .pipe(Effect.runPromise)
        .finally(() => {
          process.env.PATH = previousPath;
        });

      expect(steps.cargoCheck?.exitCode).toBe(0);
      expect(steps.format?.exitCode).toBe(1);
      expect(steps.lint).toBeUndefined();
      expect(steps.test).toBeUndefined();
      expect(steps["not-run:lint"]?.status).toBe("skip");
      expect(steps["not-run:test"]?.status).toBe("skip");
      expect((await readFile(ranLog, "utf8")).trim().split("\n")).toEqual(["check", "fmt"]);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }, 20_000);

  it("scrubs credential-shaped variables from the validation environment", async () => {
    process.env.SB_EXEC_TEST_TOKEN = "supersecret";
    process.env.SB_EXEC_TEST_PLAIN = "visible";
    try {
      const result = await runValidationCommand(
        "sh",
        ["-c", 'echo "token=${SB_EXEC_TEST_TOKEN:-absent} plain=${SB_EXEC_TEST_PLAIN:-absent}"'],
        os.tmpdir(),
        10_000,
      );
      expect(result.exitCode).toBe(0);
      expect(result.stdoutTail).toContain("token=absent");
      expect(result.stdoutTail).toContain("plain=visible");
    } finally {
      delete process.env.SB_EXEC_TEST_TOKEN;
      delete process.env.SB_EXEC_TEST_PLAIN;
    }
  });

  it("validates a disposable clone: the archive stays pristine and revalidation hits the cache", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "sb-exec-clone-"));
    const project = path.join(dir, "project");
    const bin = path.join(dir, "bin");
    try {
      await mkdir(project);
      await mkdir(bin);
      await writeFile(path.join(project, "go.mod"), "module example.com/clone-test\n");
      await writeFile(
        path.join(bin, "go"),
        '#!/bin/sh\nset -eu\necho polluted > "$PWD/polluted.txt"\nexit 0\n',
      );
      await chmod(path.join(bin, "go"), 0o755);

      const previousPath = process.env.PATH;
      process.env.PATH = `${bin}${path.delimiter}${previousPath ?? ""}`;
      try {
        const first = await validateProjectCached(goSpec, project, options(dir)).pipe(
          Effect.provide(BunContext.layer),
          Effect.runPromise,
        );
        expect(first.cacheHit).toBe(false);
        expect(first.steps.build?.exitCode).toBe(0);
        expect(existsSync(path.join(project, "polluted.txt"))).toBe(false);
        expect(existsSync(`${project}.validate-tmp`)).toBe(false);

        const second = await validateProjectCached(goSpec, project, options(dir)).pipe(
          Effect.provide(BunContext.layer),
          Effect.runPromise,
        );
        expect(second.cacheHit).toBe(true);

        const forced = await validateProjectCached(goSpec, project, {
          ...options(dir),
          forceRevalidate: true,
        }).pipe(Effect.provide(BunContext.layer), Effect.runPromise);
        expect(forced.cacheHit).toBe(false);
        expect(forced.steps.build?.exitCode).toBe(0);

        const afterForced = await validateProjectCached(goSpec, project, options(dir)).pipe(
          Effect.provide(BunContext.layer),
          Effect.runPromise,
        );
        expect(afterForced.cacheHit).toBe(true);
      } finally {
        process.env.PATH = previousPath;
      }
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  }, 30_000);
});
