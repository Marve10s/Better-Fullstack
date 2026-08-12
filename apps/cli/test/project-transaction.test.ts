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
    expect(getProjectRecoveryCommand("/tmp/o'brien app", transactionId, "linux")).toBe(
      `npx --yes create-better-fullstack@${getLatestCLIVersion()} update '/tmp/o'"'"'brien app' --recover ${transactionId}`,
    );
    expect(getProjectRecoveryCommand("C:\\o'brien app", transactionId, "win32")).toBe(
      `npx --yes create-better-fullstack@${getLatestCLIVersion()} update 'C:\\o''brien app' --recover ${transactionId}`,
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

  it("recovers an interrupted pending transaction", async () => {
    const projectDir = await makeProject();
    await fs.writeFile(path.join(projectDir, "file.txt"), "before\n");
    const transaction = await beginProjectTransaction(projectDir, "stack-update", ["file.txt"]);
    await fs.writeFile(path.join(projectDir, "file.txt"), "partial write\n");

    const recovered = await recoverProjectTransaction(projectDir, transaction.id);
    expect(recovered.status).toBe("recovered");
    expect(await fs.readFile(path.join(projectDir, "file.txt"), "utf-8")).toBe("before\n");
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
});
