import { afterEach, describe, expect, it } from "bun:test";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path from "node:path";

import { getLatestCLIVersion } from "../src/utils/get-latest-cli-version";
import { getProjectRecoveryCommand } from "../src/utils/lifecycle-command";
import {
  beginProjectTransaction,
  commitProjectTransaction,
  markProjectTransactionWrite,
  journalProjectTransactionWrites,
  recoverProjectTransaction,
  rollbackProjectTransaction,
} from "../src/utils/project-transaction";
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

    markProjectTransactionWrite(transaction, "existing.txt", hashContent("after\n"));
    markProjectTransactionWrite(transaction, "created.txt", hashContent("created\n"));
    await fs.writeFile(path.join(projectDir, "existing.txt"), "after\n");
    await fs.writeFile(path.join(projectDir, "created.txt"), "created\n");
    await commitProjectTransaction(transaction);

    const recovered = await recoverProjectTransaction(projectDir, transaction.id);
    expect(recovered.status).toBe("recovered");
    expect(await fs.readFile(path.join(projectDir, "existing.txt"), "utf-8")).toBe("before\n");
    expect(await fs.pathExists(path.join(projectDir, "created.txt"))).toBe(false);
    await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
      "not applied or interrupted",
    );
  });

  it("refuses recovery over edits made after the transaction was applied", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "existing.txt"), "before\n");
    const transaction = await beginProjectTransaction(projectDir, "template-update", [
      "existing.txt",
    ]);

    markProjectTransactionWrite(transaction, "existing.txt", hashContent("after\n"));
    await fs.writeFile(path.join(projectDir, "existing.txt"), "after\n");
    await commitProjectTransaction(transaction);

    await fs.writeFile(path.join(projectDir, "existing.txt"), "hand edited\n");

    await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
      "Refused to overwrite files changed after the transaction",
    );
    expect(await fs.readFile(path.join(projectDir, "existing.txt"), "utf-8")).toBe("hand edited\n");
  });

  it("refuses recovery over edits to files an interrupted transaction never journaled", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "file.txt"), "before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    await fs.writeFile(path.join(projectDir, "file.txt"), "hand edited\n");

    await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
      "Refused to overwrite files changed after the transaction",
    );
    expect(await fs.readFile(path.join(projectDir, "file.txt"), "utf-8")).toBe("hand edited\n");
  });

  it("recovers an interrupted pending transaction", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "file.txt"), "before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    await journalProjectTransactionWrites(transaction, ["file.txt"]);
    await fs.writeFile(path.join(projectDir, "file.txt"), "partial write\n");

    const recovered = await recoverProjectTransaction(projectDir, transaction.id);
    expect(recovered.status).toBe("recovered");
    expect(await fs.readFile(path.join(projectDir, "file.txt"), "utf-8")).toBe("before\n");
  });

  it("restores executable file modes", async () => {
    const projectDir = await makeProject();
    const executable = path.join(projectDir, "run.sh");
    await fs.writeFile(executable, "#!/bin/sh\necho before\n", { mode: 0o755 });
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["run.sh"]);
    markProjectTransactionWrite(transaction, "run.sh", hashContent("echo after\n"));
    await fs.writeFile(executable, "echo after\n", { mode: 0o644 });
    await fs.chmod(executable, 0o644);
    await commitProjectTransaction(transaction);

    await recoverProjectTransaction(projectDir, transaction.id);
    expect((await fs.stat(executable)).mode & 0o777).toBe(0o755);
  });

  it("rolls back only writes owned by the failed operation", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "owned.txt"), "before\n");
    await fs.writeFile(path.join(projectDir, "concurrent.txt"), "before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", [
      "owned.txt",
      "concurrent.txt",
    ]);

    markProjectTransactionWrite(transaction, "owned.txt", hashContent("after\n"));
    await fs.writeFile(path.join(projectDir, "owned.txt"), "after\n");
    await fs.writeFile(path.join(projectDir, "concurrent.txt"), "external change\n");
    await rollbackProjectTransaction(transaction);

    expect(await fs.readFile(path.join(projectDir, "owned.txt"), "utf-8")).toBe("before\n");
    expect(await fs.readFile(path.join(projectDir, "concurrent.txt"), "utf-8")).toBe(
      "external change\n",
    );
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
    markProjectTransactionWrite(transaction, "file.txt", hashContent("after\n"));
    await fs.writeFile(path.join(projectDir, "file.txt"), "after\n");
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
    markProjectTransactionWrite(transaction, "a.txt", hashContent("a-after\n"));
    markProjectTransactionWrite(transaction, "z.txt", hashContent("z-after\n"));
    await fs.writeFile(path.join(projectDir, "a.txt"), "a-after\n");
    await fs.writeFile(path.join(projectDir, "z.txt"), "z-after\n");
    await commitProjectTransaction(transaction);
    await fs.writeFile(path.join(transaction.recoveryDir, "files/z.txt"), "tampered\n");

    await expect(recoverProjectTransaction(projectDir, transaction.id)).rejects.toThrow(
      "integrity validation",
    );
    expect(await fs.readFile(path.join(projectDir, "a.txt"), "utf-8")).toBe("a-after\n");
    expect(await fs.readFile(path.join(projectDir, "z.txt"), "utf-8")).toBe("z-after\n");
  });
});
