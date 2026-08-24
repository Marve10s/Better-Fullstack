import { afterEach, describe, expect, it } from "bun:test";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path from "node:path";

import { getLatestCLIVersion } from "../src/utils/get-latest-cli-version";
import { getProjectRecoveryCommand } from "../src/utils/lifecycle-command";
import {
  beginProjectTransaction,
  commitProjectTransaction,
  getProjectRecoveryPoint,
  listProjectRecoveryPoints,
  markProjectTransactionWrite,
  journalProjectTransactionWrites,
  pruneProjectRecoveryPoints,
  RECOVERY_ROOT,
  recoverProjectTransaction,
  rollbackProjectTransaction,
  verifyProjectRecoveryPoint,
  writeProjectTransactionFile,
} from "../src/utils/project-transaction";
import { manageProjectRecovery } from "../src/utils/recovery-management";
import { hashContent } from "../src/utils/scaffold-manifest";

const roots: string[] = [];

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => fs.remove(root)));
});

async function makeProject(): Promise<string> {
  const projectDir = await fs.mkdtemp(path.join(tmpdir(), "bfs-transaction-"));
  roots.push(projectDir);
  return projectDir;
}

async function readLatestTransactionLock(projectDir: string): Promise<{
  id: string;
  pid: number;
  phase: string;
  generation: number;
  path: string;
}> {
  const recoveryRoot = path.join(projectDir, RECOVERY_ROOT);
  const generations = (await fs.readdir(recoveryRoot))
    .flatMap((fileName) => {
      if (fileName === "active.lock") return [{ fileName, generation: 0 }];
      const match = /^active\.lock\.(\d{12})$/.exec(fileName);
      return match ? [{ fileName, generation: Number(match[1]) }] : [];
    })
    .sort((left, right) => left.generation - right.generation);
  const latest = generations.at(-1);
  if (!latest) throw new Error("Expected a lifecycle transaction lock generation.");
  const lockPath = path.join(recoveryRoot, latest.fileName);
  return {
    ...(await fs.readJson(lockPath)),
    generation: latest.generation,
    path: lockPath,
  };
}

async function simulateStoppedTransactionOwner(projectDir: string): Promise<void> {
  const current = await readLatestTransactionLock(projectDir);
  const lock = await fs.readJson(current.path);
  lock.pid = 2_147_483_647;
  await fs.writeJson(current.path, lock);
}

async function writeCompetingLockSuccessor(
  projectDir: string,
  phase: "active" | "recovering",
): Promise<void> {
  const current = await readLatestTransactionLock(projectDir);
  const successorPath = path.join(
    projectDir,
    RECOVERY_ROOT,
    `active.lock.${String(current.generation + 1).padStart(12, "0")}`,
  );
  await fs.writeJson(successorPath, {
    version: 1,
    id: current.id,
    pid: process.pid,
    createdAt: new Date().toISOString(),
    phase,
  });
}

describe("project lifecycle transactions", () => {
  it("emits executable recovery commands with platform-safe project paths", () => {
    const transactionId = "123e4567-e89b-42d3-a456-426614174000";
    expect(getProjectRecoveryCommand("/tmp/o'brien app", transactionId, "linux", "bun")).toBe(
      `bunx create-better-fullstack@${getLatestCLIVersion()} update '/tmp/o'"'"'brien app' --recover ${transactionId}`,
    );
    expect(getProjectRecoveryCommand("C:\\o'brien app", transactionId, "win32", "bun")).toBe(
      `bunx create-better-fullstack@${getLatestCLIVersion()} update 'C:\\o''brien app' --recover ${transactionId}`,
    );
    expect(getProjectRecoveryCommand("/tmp/app", transactionId, "linux", "npm")).toStartWith(
      "npx --yes ",
    );
    expect(getProjectRecoveryCommand("/tmp/app", transactionId, "linux", "pnpm")).toStartWith(
      "pnpm dlx ",
    );
    expect(getProjectRecoveryCommand("/tmp/app", transactionId, "linux", undefined)).toStartWith(
      "npx --yes ",
    );
  });

  it("recovers every committed preimage and removes files created by apply", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "existing.txt"), "before\n");
    const transaction = await beginProjectTransaction(projectDir, "template-update", [
      "existing.txt",
      "created.txt",
    ]);

    await writeProjectTransactionFile(transaction, "existing.txt", "after\n");
    await writeProjectTransactionFile(transaction, "created.txt", "created\n");
    await commitProjectTransaction(transaction);

    const recovered = await recoverProjectTransaction(projectDir, transaction.id);
    expect(recovered.status).toBe("recovered");
    expect(await fs.readFile(path.join(projectDir, "existing.txt"), "utf-8")).toBe("before\n");
    expect(await fs.pathExists(path.join(projectDir, "created.txt"))).toBe(false);
    await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
      "not applied or interrupted",
    );
  });

  it("rejects writes through a transaction after its lock is released", async () => {
    const projectDir = await makeProject();
    const transaction = await beginProjectTransaction(projectDir, "stack-update", [
      "first.txt",
      "late.txt",
    ]);
    await writeProjectTransactionFile(transaction, "first.txt", "committed\n");
    await commitProjectTransaction(transaction);

    await expect(
      writeProjectTransactionFile(transaction, "late.txt", "must not be written\n"),
    ).rejects.toThrow("no project lock ownership");
    expect(await fs.pathExists(path.join(projectDir, "late.txt"))).toBe(false);
  });

  it("serializes lifecycle transactions for one project", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "file.txt"), "before\n");
    const first = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);

    await expect(
      beginProjectTransaction(projectDir, "template-update", ["file.txt"]),
    ).rejects.toThrow(`Another lifecycle transaction is active or awaiting recovery: ${first.id}`);

    await rollbackProjectTransaction(first);
    const second = await beginProjectTransaction(projectDir, "template-update", ["file.txt"]);
    await rollbackProjectTransaction(second);
  });

  it("elects one normal owner when two begins advance a dead terminal lock", async () => {
    const projectDir = await makeProject();
    const completed = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    await rollbackProjectTransaction(completed);
    const previous = await readLatestTransactionLock(projectDir);
    const deadLock = await fs.readJson(previous.path);
    deadLock.pid = 2_147_483_647;
    deadLock.phase = "active";
    await fs.writeJson(previous.path, deadLock);

    const first = beginProjectTransaction(projectDir, "gen", ["first.txt"]);
    const second = beginProjectTransaction(projectDir, "registry-add", ["second.txt"]);
    const outcomes = await Promise.all([
      first.then(
        (value) => ({ status: "fulfilled" as const, value }),
        (reason: unknown) => ({ status: "rejected" as const, reason }),
      ),
      second.then(
        (value) => ({ status: "fulfilled" as const, value }),
        (reason: unknown) => ({ status: "rejected" as const, reason }),
      ),
    ]);

    const admitted = outcomes.find((outcome) => outcome.status === "fulfilled");
    expect(outcomes.filter((outcome) => outcome.status === "fulfilled")).toHaveLength(1);
    expect(outcomes.filter((outcome) => outcome.status === "rejected")).toHaveLength(1);
    if (!admitted || admitted.status !== "fulfilled") {
      throw new Error("Expected one normal lifecycle transaction to acquire the lock.");
    }
    expect(await readLatestTransactionLock(projectDir)).toMatchObject({
      id: admitted.value.id,
      phase: "active",
    });
    await rollbackProjectTransaction(admitted.value);
  });

  it("does not reclaim dead ownership from partially valid terminal metadata", async () => {
    const projectDir = await makeProject();
    const completed = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    await rollbackProjectTransaction(completed);
    await fs.writeJson(path.join(completed.recoveryDir, "transaction.json"), {
      id: completed.id,
      status: "rolled-back",
    });
    const previous = await readLatestTransactionLock(projectDir);
    const deadLock = await fs.readJson(previous.path);
    deadLock.pid = 2_147_483_647;
    deadLock.phase = "active";
    await fs.writeJson(previous.path, deadLock);

    await expect(beginProjectTransaction(projectDir, "gen", ["other.txt"])).rejects.toThrow(
      "Recovery metadata",
    );
    expect((await readLatestTransactionLock(projectDir)).generation).toBe(previous.generation);
  });

  it("does not let a normal begin replace a dead applied owner or an active recovery", async () => {
    const projectDir = await makeProject();
    const target = path.join(projectDir, "file.txt");
    await fs.writeFile(target, "before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    await writeProjectTransactionFile(transaction, "file.txt", "after\n");
    const metadataPath = path.join(transaction.recoveryDir, "transaction.json");
    const metadata = await fs.readJson(metadataPath);
    metadata.status = "applied";
    metadata.completedAt = new Date().toISOString();
    await fs.writeJson(metadataPath, metadata);
    await simulateStoppedTransactionOwner(projectDir);

    const deadOwner = await readLatestTransactionLock(projectDir);
    await expect(beginProjectTransaction(projectDir, "gen", ["other.txt"])).rejects.toThrow(
      `Another lifecycle transaction is active or awaiting recovery: ${transaction.id}`,
    );
    expect((await readLatestTransactionLock(projectDir)).generation).toBe(deadOwner.generation);

    let enteredRestore!: () => void;
    const restoreEntered = new Promise<void>((resolve) => {
      enteredRestore = resolve;
    });
    let resumeRestore!: () => void;
    const restoreGate = new Promise<void>((resolve) => {
      resumeRestore = resolve;
    });
    const recovery = recoverProjectTransaction(projectDir, transaction.id, {
      beforeRestoreMutation: async () => {
        enteredRestore();
        await restoreGate;
      },
    });
    await restoreEntered;
    const recovering = await readLatestTransactionLock(projectDir);
    expect(recovering).toMatchObject({ id: transaction.id, phase: "recovering" });
    try {
      await expect(beginProjectTransaction(projectDir, "gen", ["other.txt"])).rejects.toThrow(
        `Another lifecycle transaction is active or awaiting recovery: ${transaction.id}`,
      );
      expect((await readLatestTransactionLock(projectDir)).generation).toBe(recovering.generation);
    } finally {
      resumeRestore();
    }
    await recovery;
    expect(await fs.readFile(target, "utf-8")).toBe("before\n");
    expect(await readLatestTransactionLock(projectDir)).toMatchObject({ phase: "released" });
  });

  it("elects one recovery owner when two contenders take over the same dead lock", async () => {
    const projectDir = await makeProject();
    const target = path.join(projectDir, "file.txt");
    await fs.writeFile(target, "before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    await writeProjectTransactionFile(transaction, "file.txt", "after\n");
    await simulateStoppedTransactionOwner(projectDir);

    let enteredRestore!: () => void;
    const restoreEntered = new Promise<void>((resolve) => {
      enteredRestore = resolve;
    });
    let resumeRestore!: () => void;
    const restoreGate = new Promise<void>((resolve) => {
      resumeRestore = resolve;
    });
    const recover = () =>
      recoverProjectTransaction(projectDir, transaction.id, {
        beforeRestoreMutation: async () => {
          enteredRestore();
          await restoreGate;
        },
      });
    const first = recover();
    const second = recover();
    const firstOutcome = first.then(
      (value) => ({ status: "fulfilled" as const, value }),
      (reason: unknown) => ({ status: "rejected" as const, reason }),
    );
    const secondOutcome = second.then(
      (value) => ({ status: "fulfilled" as const, value }),
      (reason: unknown) => ({ status: "rejected" as const, reason }),
    );

    await restoreEntered;
    const firstSettled = await Promise.race([firstOutcome, secondOutcome]);
    expect(firstSettled.status).toBe("rejected");
    expect(await readLatestTransactionLock(projectDir)).toMatchObject({
      id: transaction.id,
      phase: "recovering",
    });
    resumeRestore();
    const outcomes = await Promise.all([firstOutcome, secondOutcome]);

    expect(outcomes.filter((outcome) => outcome.status === "fulfilled")).toHaveLength(1);
    expect(outcomes.filter((outcome) => outcome.status === "rejected")).toHaveLength(1);
    expect(await readLatestTransactionLock(projectDir)).toMatchObject({ phase: "released" });
    expect(await fs.readFile(target, "utf-8")).toBe("before\n");
  });

  it("does not recover an older point through another ID's nonreleased lock", async () => {
    const projectDir = await makeProject();
    const target = path.join(projectDir, "file.txt");
    await fs.writeFile(target, "before\n");
    const older = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    await writeProjectTransactionFile(older, "file.txt", "after\n");
    await commitProjectTransaction(older);

    const newer = await beginProjectTransaction(projectDir, "gen", ["other.txt"]);
    await rollbackProjectTransaction(newer);
    const newerLock = await readLatestTransactionLock(projectDir);
    const deadNonreleased = await fs.readJson(newerLock.path);
    deadNonreleased.pid = 2_147_483_647;
    deadNonreleased.phase = "active";
    await fs.writeJson(newerLock.path, deadNonreleased);

    await expect(recoverProjectTransaction(projectDir, older.id)).rejects.toThrow(
      `Another lifecycle transaction owns the project lock: ${newer.id}`,
    );
    expect((await readLatestTransactionLock(projectDir)).generation).toBe(newerLock.generation);
    expect(await fs.readFile(target, "utf-8")).toBe("after\n");
  });

  it("refuses to recover a pending transaction while its owner process is live", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "file.txt"), "before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    await writeProjectTransactionFile(transaction, "file.txt", "after\n");

    await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
      `Lifecycle transaction ${transaction.id} is still active.`,
    );
    expect(await fs.readFile(path.join(projectDir, "file.txt"), "utf-8")).toBe("after\n");
    await rollbackProjectTransaction(transaction);
  });

  it("refuses recovery over edits made after the transaction was applied", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "existing.txt"), "before\n");
    const transaction = await beginProjectTransaction(projectDir, "template-update", [
      "existing.txt",
    ]);

    await writeProjectTransactionFile(transaction, "existing.txt", "after\n");
    await commitProjectTransaction(transaction);

    await fs.writeFile(path.join(projectDir, "existing.txt"), "hand edited\n");

    await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
      "Refused to overwrite files changed after the transaction",
    );
    expect(await fs.readFile(path.join(projectDir, "existing.txt"), "utf-8")).toBe("hand edited\n");
    expect(await readLatestTransactionLock(projectDir)).toMatchObject({ phase: "released" });
  });

  it("keeps an interrupted applied recovery locked after its first restore", async () => {
    const projectDir = await makeProject();
    const firstTarget = path.join(projectDir, "a.txt");
    const secondTarget = path.join(projectDir, "z.txt");
    await fs.writeFile(firstTarget, "a-before\n");
    await fs.writeFile(secondTarget, "z-before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", [
      "a.txt",
      "z.txt",
    ]);
    await writeProjectTransactionFile(transaction, "a.txt", "a-after\n");
    await writeProjectTransactionFile(transaction, "z.txt", "z-after\n");
    await commitProjectTransaction(transaction);

    let firstRestorePhase: string | undefined;
    await expect(
      recoverProjectTransaction(projectDir, transaction.id, {
        beforeRestoreMutation: async (relativePath) => {
          if (relativePath === "a.txt") {
            firstRestorePhase = (await readLatestTransactionLock(projectDir)).phase;
          }
          if (relativePath === "z.txt") {
            throw new Error("injected failure after first restore");
          }
        },
      }),
    ).rejects.toThrow("injected failure after first restore");

    expect(firstRestorePhase).toBe("recovering");
    expect(await fs.readFile(firstTarget, "utf-8")).toBe("a-before\n");
    expect(await fs.readFile(secondTarget, "utf-8")).toBe("z-after\n");
    expect(await readLatestTransactionLock(projectDir)).toMatchObject({
      id: transaction.id,
      phase: "recovery-required",
    });
    await simulateStoppedTransactionOwner(projectDir);
    await expect(beginProjectTransaction(projectDir, "gen", ["other.txt"])).rejects.toThrow(
      `Another lifecycle transaction is active or awaiting recovery: ${transaction.id}`,
    );
  });

  it("surfaces both a restore failure and a failed recovery lock transition", async () => {
    const projectDir = await makeProject();
    const target = path.join(projectDir, "file.txt");
    await fs.writeFile(target, "before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    await writeProjectTransactionFile(transaction, "file.txt", "after\n");
    await commitProjectTransaction(transaction);

    await expect(
      recoverProjectTransaction(projectDir, transaction.id, {
        beforeRestoreMutation: async () => {
          await writeCompetingLockSuccessor(projectDir, "active");
          throw new Error("injected restore failure");
        },
      }),
    ).rejects.toThrow(
      "injected restore failure; lifecycle lock update also failed: The lifecycle transaction lock changed",
    );
    expect(await fs.readFile(target, "utf-8")).toBe("after\n");
  });

  it("refuses recovery over edits to files an interrupted transaction never journaled", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "file.txt"), "before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    await fs.writeFile(path.join(projectDir, "file.txt"), "hand edited\n");
    await simulateStoppedTransactionOwner(projectDir);

    await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
      "Refused to overwrite files changed after the transaction",
    );
    expect(await fs.readFile(path.join(projectDir, "file.txt"), "utf-8")).toBe("hand edited\n");
  });

  it("recovers an interrupted pending transaction", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "file.txt"), "before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    await writeProjectTransactionFile(transaction, "file.txt", "after\n");
    await simulateStoppedTransactionOwner(projectDir);

    const recovered = await recoverProjectTransaction(projectDir, transaction.id);
    expect(recovered.status).toBe("recovered");
    expect(await fs.readFile(path.join(projectDir, "file.txt"), "utf-8")).toBe("before\n");
  });

  it("refuses an interrupted write without an exact postimage", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "file.txt"), "before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    await journalProjectTransactionWrites(transaction, ["file.txt"]);
    await fs.writeFile(path.join(projectDir, "file.txt"), "partial write\n");
    await simulateStoppedTransactionOwner(projectDir);

    await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
      "Refused to overwrite files changed after the transaction",
    );
    expect(await fs.readFile(path.join(projectDir, "file.txt"), "utf-8")).toBe("partial write\n");
  });

  it("recovers interrupted gen and registry transactions after a process stop", async () => {
    for (const operation of ["gen", "registry-add"] as const) {
      const projectDir = await makeProject();
      await fs.writeFile(path.join(projectDir, "file.txt"), "before\n");
      const transaction = await beginProjectTransaction(projectDir, operation, ["file.txt"]);
      await writeProjectTransactionFile(transaction, "file.txt", "after\n");
      const persisted = await fs.readJson(path.join(transaction.recoveryDir, "transaction.json"));
      expect(persisted.outputs).toEqual({ "file.txt": hashContent("after\n") });
      await simulateStoppedTransactionOwner(projectDir);

      const recovered = await recoverProjectTransaction(projectDir, transaction.id);
      expect(recovered.status).toBe("recovered");
      expect(await fs.readFile(path.join(projectDir, "file.txt"), "utf-8")).toBe("before\n");
    }
  });

  it("refuses interrupted gen and registry recovery over a later edit", async () => {
    for (const operation of ["gen", "registry-add"] as const) {
      const projectDir = await makeProject();
      await fs.writeFile(path.join(projectDir, "file.txt"), "before\n");
      const transaction = await beginProjectTransaction(projectDir, operation, ["file.txt"]);
      await writeProjectTransactionFile(transaction, "file.txt", "after\n");
      await fs.writeFile(path.join(projectDir, "file.txt"), "hand edited\n");
      await simulateStoppedTransactionOwner(projectDir);

      await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
        "Refused to overwrite files changed after the transaction",
      );
      expect(await fs.readFile(path.join(projectDir, "file.txt"), "utf-8")).toBe("hand edited\n");
    }
  });

  it("restores executable file modes", async () => {
    const projectDir = await makeProject();
    const executable = path.join(projectDir, "run.sh");
    await fs.writeFile(executable, "#!/bin/sh\necho before\n", { mode: 0o755 });
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["run.sh"]);
    await writeProjectTransactionFile(transaction, "run.sh", "echo after\n", { mode: 0o644 });
    await commitProjectTransaction(transaction);

    await recoverProjectTransaction(projectDir, transaction.id);
    expect((await fs.stat(executable)).mode & 0o777).toBe(0o755);
  });

  it("refuses recovery over a mode change made after the transaction was applied", async () => {
    const projectDir = await makeProject();
    const executable = path.join(projectDir, "run.sh");
    await fs.writeFile(executable, "echo before\n", { mode: 0o644 });
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["run.sh"]);
    await writeProjectTransactionFile(transaction, "run.sh", "echo after\n", { mode: 0o644 });
    await commitProjectTransaction(transaction);

    await fs.chmod(executable, 0o755);

    await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
      "Refused to overwrite files changed after the transaction",
    );
    expect((await fs.stat(executable)).mode & 0o777).toBe(0o755);
    expect(await fs.readFile(executable, "utf-8")).toBe("echo after\n");
  });

  it("rolls back only writes owned by the failed operation", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "owned.txt"), "before\n");
    await fs.writeFile(path.join(projectDir, "concurrent.txt"), "before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", [
      "owned.txt",
      "concurrent.txt",
    ]);

    await writeProjectTransactionFile(transaction, "owned.txt", "after\n");
    await fs.writeFile(path.join(projectDir, "concurrent.txt"), "external change\n");
    await rollbackProjectTransaction(transaction);

    expect(await fs.readFile(path.join(projectDir, "owned.txt"), "utf-8")).toBe("before\n");
    expect(await fs.readFile(path.join(projectDir, "concurrent.txt"), "utf-8")).toBe(
      "external change\n",
    );
  });

  it("keeps durable pending ownership when rollback metadata cannot be committed", async () => {
    const projectDir = await makeProject();
    const target = path.join(projectDir, "file.txt");
    await fs.writeFile(target, "before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    await writeProjectTransactionFile(transaction, "file.txt", "after\n");
    await fs.ensureDir(path.join(transaction.recoveryDir, "transaction.json.tmp"));

    await expect(rollbackProjectTransaction(transaction)).rejects.toThrow(
      "Recovery metadata staging path is not a regular file",
    );
    expect(await fs.readFile(target, "utf-8")).toBe("before\n");
    expect(await fs.readJson(path.join(transaction.recoveryDir, "transaction.json"))).toMatchObject(
      { status: "pending" },
    );
    expect(await readLatestTransactionLock(projectDir)).toMatchObject({
      id: transaction.id,
      phase: "recovery-required",
    });
    await expect(beginProjectTransaction(projectDir, "gen", ["other.txt"])).rejects.toThrow(
      `Another lifecycle transaction is active or awaiting recovery: ${transaction.id}`,
    );
  });

  it("allows explicit same-process recovery after an automatic rollback fails", async () => {
    const projectDir = await makeProject();
    const target = path.join(projectDir, "file.txt");
    await fs.writeFile(target, "before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    await writeProjectTransactionFile(transaction, "file.txt", "after\n");
    await fs.writeFile(target, "concurrent edit\n");

    await expect(rollbackProjectTransaction(transaction)).rejects.toThrow(
      "Refused to overwrite files changed after the transaction",
    );
    expect(await readLatestTransactionLock(projectDir)).toMatchObject({
      id: transaction.id,
      pid: process.pid,
      phase: "recovery-required",
    });

    await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
      "Refused to overwrite files changed after the transaction",
    );
    expect(await readLatestTransactionLock(projectDir)).toMatchObject({
      id: transaction.id,
      phase: "recovery-required",
    });
    await expect(beginProjectTransaction(projectDir, "gen", ["other.txt"])).rejects.toThrow(
      `Another lifecycle transaction is active or awaiting recovery: ${transaction.id}`,
    );
    expect(await fs.readFile(target, "utf-8")).toBe("concurrent edit\n");

    await fs.writeFile(target, "after\n");
    await recoverProjectTransaction(projectDir, transaction.id);
    expect(await readLatestTransactionLock(projectDir)).toMatchObject({ phase: "released" });
    expect(await fs.readFile(target, "utf-8")).toBe("before\n");
  });

  it("surfaces both ownership loss and a failed rollback lock transition", async () => {
    const projectDir = await makeProject();
    const target = path.join(projectDir, "file.txt");
    await fs.writeFile(target, "before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    await writeProjectTransactionFile(transaction, "file.txt", "after\n");
    await writeCompetingLockSuccessor(projectDir, "recovering");

    await expect(rollbackProjectTransaction(transaction)).rejects.toThrow(
      "The lifecycle transaction no longer owns the project lock.; lifecycle lock update also failed: The lifecycle transaction lock changed",
    );
    expect(await fs.readFile(target, "utf-8")).toBe("after\n");
  });

  it("ignores a marked output when its write never changed the preimage", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "file.txt"), "before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    markProjectTransactionWrite(transaction, "file.txt", hashContent("intended\n"));

    await rollbackProjectTransaction(transaction);
    expect(await fs.readFile(path.join(projectDir, "file.txt"), "utf-8")).toBe("before\n");
  });

  it("fails closed when a recovery backup is tampered with", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "file.txt"), "before\n");
    const transaction = await beginProjectTransaction(projectDir, "add", ["file.txt"]);
    await writeProjectTransactionFile(transaction, "file.txt", "after\n");
    await commitProjectTransaction(transaction);
    await fs.writeFile(path.join(transaction.recoveryDir, "files/file.txt"), "tampered\n");

    await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
      "integrity validation",
    );
    expect(await fs.readFile(path.join(projectDir, "file.txt"), "utf-8")).toBe("after\n");
  });

  it("preflights every backup before restoring any file", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "a.txt"), "a-before\n");
    await fs.writeFile(path.join(projectDir, "z.txt"), "z-before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", [
      "a.txt",
      "z.txt",
    ]);
    await writeProjectTransactionFile(transaction, "a.txt", "a-after\n");
    await writeProjectTransactionFile(transaction, "z.txt", "z-after\n");
    await commitProjectTransaction(transaction);
    await fs.writeFile(path.join(transaction.recoveryDir, "files/z.txt"), "tampered\n");

    await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
      "integrity validation",
    );
    expect(await fs.readFile(path.join(projectDir, "a.txt"), "utf-8")).toBe("a-after\n");
    expect(await fs.readFile(path.join(projectDir, "z.txt"), "utf-8")).toBe("z-after\n");
  });

  it("lists, shows, and verifies recovery points without changing files", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "file.txt"), "before\n");
    const transaction = await beginProjectTransaction(projectDir, "template-update", ["file.txt"]);
    await writeProjectTransactionFile(transaction, "file.txt", "after\n");
    await commitProjectTransaction(transaction);

    expect(await listProjectRecoveryPoints(projectDir)).toEqual([
      expect.objectContaining({
        id: transaction.id,
        operation: "template-update",
        status: "applied",
        valid: true,
        recoverable: true,
        fileCount: 1,
        errors: [],
      }),
    ]);
    expect(await getProjectRecoveryPoint(projectDir, transaction.id)).toMatchObject({
      id: transaction.id,
      valid: true,
      recoverable: true,
      metadata: { id: transaction.id, status: "applied" },
    });
    expect(await fs.readFile(path.join(projectDir, "file.txt"), "utf-8")).toBe("after\n");

    await fs.writeFile(path.join(projectDir, "file.txt"), "later user edit\n");
    expect(await verifyProjectRecoveryPoint(projectDir, transaction.id)).toMatchObject({
      valid: true,
      recoverable: false,
      errors: ["Recovery target changed after the transaction: file.txt"],
    });
  });

  it("retains pending and invalid recovery points and serializes destructive pruning", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "pending.txt"), "before\n");
    await fs.writeFile(path.join(projectDir, "applied.txt"), "before\n");
    const applied = await beginProjectTransaction(projectDir, "template-update", ["applied.txt"]);
    await writeProjectTransactionFile(applied, "applied.txt", "after\n");
    await commitProjectTransaction(applied);
    const pending = await beginProjectTransaction(projectDir, "stack-update", ["pending.txt"]);
    await fs.outputFile(
      path.join(projectDir, ".bts/recovery/not-a-transaction/transaction.json"),
      "{}",
    );

    const preview = await pruneProjectRecoveryPoints(projectDir, {
      olderThanDays: 0,
      keep: 0,
      apply: false,
    });
    expect(preview.candidates).toEqual([applied.id]);
    expect(preview.pruned).toEqual([]);
    expect(preview.retained).toEqual(
      expect.arrayContaining([pending.id, applied.id, "not-a-transaction"]),
    );

    await expect(
      pruneProjectRecoveryPoints(projectDir, {
        olderThanDays: 0,
        keep: 0,
        apply: true,
      }),
    ).rejects.toThrow(
      `Another lifecycle transaction is active or awaiting recovery: ${pending.id}`,
    );
    await rollbackProjectTransaction(pending);

    const result = await pruneProjectRecoveryPoints(projectDir, {
      olderThanDays: 0,
      keep: 1,
      apply: true,
    });
    expect(result.pruned).toEqual([applied.id]);
    expect(result.retained).toEqual(expect.arrayContaining([pending.id, "not-a-transaction"]));
    expect(await fs.pathExists(applied.recoveryDir)).toBe(false);
    expect(await verifyProjectRecoveryPoint(projectDir, pending.id)).toMatchObject({
      valid: true,
      recoverable: false,
      metadata: { status: "rolled-back" },
    });
  });

  it("recovers the exact preimage when a repeated staged write fails", async () => {
    const projectDir = await makeProject();
    const target = path.join(projectDir, "file.txt");
    await fs.writeFile(target, "before\n");
    const originalMode = (await fs.stat(target)).mode & 0o7777;
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);

    await writeProjectTransactionFile(transaction, "file.txt", "intermediate\n");
    await expect(
      writeProjectTransactionFile(transaction, "file.txt", "after\n", {
        writeFile: async (stagingPath) => {
          await fs.writeFile(stagingPath, "partial\n");
          throw new Error("simulated second-stage failure");
        },
      }),
    ).rejects.toThrow("simulated second-stage failure");

    const persisted = await fs.readJson(path.join(transaction.recoveryDir, "transaction.json"));
    expect(persisted.outputHistory["file.txt"]).toEqual([
      { sha256: hashContent("intermediate\n"), mode: originalMode },
    ]);
    expect(await verifyProjectRecoveryPoint(projectDir, transaction.id)).toMatchObject({
      valid: true,
      recoverable: true,
    });
    await simulateStoppedTransactionOwner(projectDir);

    await recoverProjectTransaction(projectDir, transaction.id);
    expect(await fs.readFile(target, "utf-8")).toBe("before\n");
    expect((await fs.stat(target)).mode & 0o7777).toBe(originalMode);
  });

  it("preserves a concurrent target edit made while bytes are staged", async () => {
    const projectDir = await makeProject();
    const target = path.join(projectDir, "file.txt");
    await fs.writeFile(target, "before\n");
    const transaction = await beginProjectTransaction(projectDir, "gen", ["file.txt"]);

    await expect(
      writeProjectTransactionFile(transaction, "file.txt", "after\n", {
        writeFile: async (stagingPath) => {
          await fs.writeFile(stagingPath, "after\n");
          await fs.writeFile(target, "concurrent edit\n");
        },
      }),
    ).rejects.toThrow("Transaction target changed while staging: file.txt");

    expect(await fs.readFile(target, "utf-8")).toBe("concurrent edit\n");
    expect(await verifyProjectRecoveryPoint(projectDir, transaction.id)).toMatchObject({
      valid: true,
      recoverable: false,
    });
    await simulateStoppedTransactionOwner(projectDir);
    await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
      "Refused to overwrite files changed after the transaction",
    );
    expect(await fs.readFile(target, "utf-8")).toBe("concurrent edit\n");
  });

  it("journals pending output modes and refuses a later chmod", async () => {
    const projectDir = await makeProject();
    const target = path.join(projectDir, "run.sh");
    await fs.writeFile(target, "echo before\n", { mode: 0o644 });
    const transaction = await beginProjectTransaction(projectDir, "gen", ["run.sh"]);

    await writeProjectTransactionFile(transaction, "run.sh", "echo after\n", { mode: 0o755 });
    expect(await fs.readJson(path.join(transaction.recoveryDir, "transaction.json"))).toMatchObject(
      { outputModes: { "run.sh": 0o755 } },
    );
    await fs.chmod(target, 0o700);

    expect(await verifyProjectRecoveryPoint(projectDir, transaction.id)).toMatchObject({
      valid: true,
      recoverable: false,
    });
    await simulateStoppedTransactionOwner(projectDir);
    await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
      "Refused to overwrite files changed after the transaction",
    );
    expect((await fs.stat(target)).mode & 0o7777).toBe(0o700);
    expect(await fs.readFile(target, "utf-8")).toBe("echo after\n");
  });

  it("cleans a journaled stage left by a stopped process", async () => {
    const projectDir = await makeProject();
    const target = path.join(projectDir, "file.txt");
    await fs.writeFile(target, "before\n");
    const transaction = await beginProjectTransaction(projectDir, "registry-add", ["file.txt"]);
    await writeProjectTransactionFile(transaction, "file.txt", "after\n");
    const persisted = await fs.readJson(path.join(transaction.recoveryDir, "transaction.json"));
    const stagingPath = path.join(projectDir, persisted.stagingFiles["file.txt"]);
    await fs.writeFile(stagingPath, "partial staged bytes\n");

    expect(await verifyProjectRecoveryPoint(projectDir, transaction.id)).toMatchObject({
      valid: true,
      recoverable: true,
    });
    await simulateStoppedTransactionOwner(projectDir);
    await recoverProjectTransaction(projectDir, transaction.id);

    expect(await fs.pathExists(stagingPath)).toBe(false);
    expect(await fs.readFile(target, "utf-8")).toBe("before\n");
  });

  it("refuses a non-file at a journaled staging path", async () => {
    const projectDir = await makeProject();
    const target = path.join(projectDir, "file.txt");
    await fs.writeFile(target, "before\n");
    const transaction = await beginProjectTransaction(projectDir, "gen", ["file.txt"]);
    await writeProjectTransactionFile(transaction, "file.txt", "after\n");
    const persisted = await fs.readJson(path.join(transaction.recoveryDir, "transaction.json"));
    const stagingPath = path.join(projectDir, persisted.stagingFiles["file.txt"]);
    await fs.ensureDir(stagingPath);

    expect(await verifyProjectRecoveryPoint(projectDir, transaction.id)).toMatchObject({
      valid: true,
      recoverable: false,
    });
    await simulateStoppedTransactionOwner(projectDir);
    await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
      "Transaction staging output is not a regular file: file.txt",
    );
    expect(await fs.pathExists(stagingPath)).toBe(true);
    expect(await fs.readFile(target, "utf-8")).toBe("after\n");

    await fs.remove(stagingPath);
    await recoverProjectTransaction(projectDir, transaction.id);
    expect(await fs.readFile(target, "utf-8")).toBe("before\n");
  });

  it("rejects a concurrent mode change before commit", async () => {
    const projectDir = await makeProject();
    const target = path.join(projectDir, "file.txt");
    await fs.writeFile(target, "before\n", { mode: 0o644 });
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    await writeProjectTransactionFile(transaction, "file.txt", "after\n", { mode: 0o644 });
    await fs.chmod(target, 0o755);

    await expect(commitProjectTransaction(transaction)).rejects.toThrow(
      "Transaction output changed before commit: file.txt",
    );
    expect(await fs.readJson(path.join(transaction.recoveryDir, "transaction.json"))).toMatchObject(
      { status: "pending", outputModes: { "file.txt": 0o644 } },
    );
  });

  it("recovers legacy v1 metadata without staging fields", async () => {
    const projectDir = await makeProject();
    const target = path.join(projectDir, "file.txt");
    await fs.writeFile(target, "before\n");
    const transaction = await beginProjectTransaction(projectDir, "template-update", ["file.txt"]);
    await writeProjectTransactionFile(transaction, "file.txt", "after\n");
    const metadataPath = path.join(transaction.recoveryDir, "transaction.json");
    const metadata = await fs.readJson(metadataPath);
    delete metadata.writeFormat;
    delete metadata.stagingFiles;
    await fs.writeJson(metadataPath, metadata);
    await simulateStoppedTransactionOwner(projectDir);

    await recoverProjectTransaction(projectDir, transaction.id);
    expect(await fs.readFile(target, "utf-8")).toBe("before\n");
  });

  it("refuses recovery metadata reached through a symlink", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "file.txt"), "before\n");
    const transaction = await beginProjectTransaction(projectDir, "template-update", ["file.txt"]);
    await writeProjectTransactionFile(transaction, "file.txt", "after\n");
    const metadataPath = path.join(transaction.recoveryDir, "transaction.json");
    const movedMetadataPath = path.join(projectDir, "moved-transaction.json");
    await fs.rename(metadataPath, movedMetadataPath);
    await fs.symlink(movedMetadataPath, metadataPath);

    expect(await verifyProjectRecoveryPoint(projectDir, transaction.id)).toMatchObject({
      valid: false,
      recoverable: false,
      errors: ["Refusing to access recovery data through a symlink."],
    });
    await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
      "Refusing to access recovery data through a symlink.",
    );
    expect(await fs.readFile(path.join(projectDir, "file.txt"), "utf-8")).toBe("after\n");
  });

  it("rejects recovery metadata outputs that are not bound to a snapshot", async () => {
    const projectDir = await makeProject();
    const transaction = await beginProjectTransaction(projectDir, "add", ["file.txt"]);
    const metadataPath = path.join(transaction.recoveryDir, "transaction.json");
    const metadata = await fs.readJson(metadataPath);
    metadata.outputs = { "unbound.txt": hashContent("bytes") };
    await fs.writeJson(metadataPath, metadata);

    expect(await verifyProjectRecoveryPoint(projectDir, transaction.id)).toMatchObject({
      valid: false,
      recoverable: false,
      errors: ["Recovery metadata contains an output that is not bound to a file snapshot."],
    });

    expect(
      await manageProjectRecovery({
        action: "verify",
        projectDir,
        transactionId: transaction.id,
      }),
    ).toMatchObject({
      success: false,
      action: "verify",
      verification: {
        valid: false,
        recoverable: false,
      },
      error: "Recovery metadata contains an output that is not bound to a file snapshot.",
    });
  });
});
