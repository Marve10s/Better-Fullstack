import fs from "fs-extra";
import { randomUUID } from "node:crypto";
import path from "node:path";

import type { LifecycleOperation } from "./lifecycle-contract";

import { hashContent } from "./scaffold-manifest";

export const RECOVERY_ROOT = ".bts/recovery";
const RECOVERY_METADATA_FILE = "transaction.json";
const RECOVERY_VERSION = 1;

export type RecoveryFile =
  | { path: string; state: "absent" }
  | { path: string; state: "file"; sha256: string };

export type RecoveryMetadata = {
  version: typeof RECOVERY_VERSION;
  id: string;
  operation: LifecycleOperation;
  createdAt: string;
  completedAt?: string;
  status: "pending" | "applied" | "rolled-back" | "recovered";
  files: RecoveryFile[];
};

export type ProjectTransaction = {
  id: string;
  projectDir: string;
  recoveryDir: string;
  metadata: RecoveryMetadata;
  writes: Map<string, string>;
};

function isPortableProjectPath(relativePath: string): boolean {
  return (
    relativePath.length > 0 &&
    !path.posix.isAbsolute(relativePath) &&
    !path.win32.isAbsolute(relativePath) &&
    !relativePath.split(/[\\/]/).includes("..") &&
    relativePath !== ".bts" &&
    !relativePath.startsWith(".bts/") &&
    !relativePath.startsWith(".bts\\")
  );
}

function recoveryPath(projectDir: string, transactionId: string): string {
  if (!/^[0-9a-f-]+$/.test(transactionId)) {
    throw new Error("Recovery transaction ID is invalid.");
  }
  return path.join(projectDir, RECOVERY_ROOT, transactionId);
}

async function assertSafeTarget(projectDir: string, relativePath: string): Promise<string> {
  if (!isPortableProjectPath(relativePath)) {
    throw new Error(`Unsafe transaction path: ${relativePath}`);
  }
  const projectRealpath = await fs.realpath(projectDir);
  const target = path.resolve(projectRealpath, relativePath);
  const relative = path.relative(projectRealpath, target);
  if (relative === ".." || relative.startsWith(`..${path.sep}`)) {
    throw new Error(`Transaction path escapes the project: ${relativePath}`);
  }

  let current = projectRealpath;
  for (const segment of relative.split(path.sep).filter(Boolean)) {
    current = path.join(current, segment);
    const stats = await fs.lstat(current).catch(() => null);
    if (!stats) break;
    if (stats.isSymbolicLink()) {
      throw new Error(`Refusing to transact through a symlink: ${relativePath}`);
    }
  }
  return target;
}

async function writeMetadata(transaction: ProjectTransaction): Promise<void> {
  await fs.writeJson(
    path.join(transaction.recoveryDir, RECOVERY_METADATA_FILE),
    transaction.metadata,
    { spaces: 2 },
  );
}

export async function beginProjectTransaction(
  projectDirInput: string,
  operation: LifecycleOperation,
  relativePaths: Iterable<string>,
): Promise<ProjectTransaction> {
  const projectDir = await fs.realpath(path.resolve(projectDirInput));
  const id = randomUUID();
  const recoveryDir = recoveryPath(projectDir, id);
  const files: RecoveryFile[] = [];

  try {
    await fs.ensureDir(path.join(recoveryDir, "files"));
    for (const relativePath of [...new Set(relativePaths)].sort()) {
      // oxlint-disable-next-line no-await-in-loop -- snapshots bind one observed filesystem state
      const target = await assertSafeTarget(projectDir, relativePath);
      // oxlint-disable-next-line no-await-in-loop
      const stats = await fs.lstat(target).catch(() => null);
      if (!stats) {
        files.push({ path: relativePath, state: "absent" });
        continue;
      }
      if (!stats.isFile()) {
        throw new Error(`Transaction target is not a regular file: ${relativePath}`);
      }
      // oxlint-disable-next-line no-await-in-loop
      const bytes = await fs.readFile(target);
      const backupPath = path.join(recoveryDir, "files", relativePath);
      // oxlint-disable-next-line no-await-in-loop
      await fs.ensureDir(path.dirname(backupPath));
      // oxlint-disable-next-line no-await-in-loop
      await fs.writeFile(backupPath, bytes);
      files.push({ path: relativePath, state: "file", sha256: hashContent(bytes) });
    }

    const transaction: ProjectTransaction = {
      id,
      projectDir,
      recoveryDir,
      writes: new Map(),
      metadata: {
        version: RECOVERY_VERSION,
        id,
        operation,
        createdAt: new Date().toISOString(),
        status: "pending",
        files,
      },
    };
    await writeMetadata(transaction);
    return transaction;
  } catch (error) {
    await fs.remove(recoveryDir).catch(() => undefined);
    throw error;
  }
}

export function markProjectTransactionWrite(
  transaction: ProjectTransaction,
  relativePath: string,
  expectedSha256: string,
): void {
  if (!transaction.metadata.files.some((file) => file.path === relativePath)) {
    throw new Error(`Transaction write is not bound to its recovery snapshot: ${relativePath}`);
  }
  transaction.writes.set(relativePath, expectedSha256);
}

async function restoreFiles(
  transaction: ProjectTransaction,
  files: RecoveryFile[],
  expectedCurrentHashes?: Map<string, string>,
): Promise<void> {
  const concurrentChanges: string[] = [];
  for (const file of files) {
    // oxlint-disable-next-line no-await-in-loop -- recovery must validate and restore each bound path
    const target = await assertSafeTarget(transaction.projectDir, file.path);
    const expectedCurrentHash = expectedCurrentHashes?.get(file.path);
    if (expectedCurrentHash) {
      // oxlint-disable-next-line no-await-in-loop
      const current = await fs.readFile(target).catch(() => null);
      const currentHash = current ? hashContent(current) : null;
      const stillAtPreimage =
        (file.state === "absent" && current === null) ||
        (file.state === "file" && currentHash === file.sha256);
      if (stillAtPreimage) continue;
      if (currentHash !== expectedCurrentHash) {
        concurrentChanges.push(file.path);
        continue;
      }
    }
    if (file.state === "absent") {
      // oxlint-disable-next-line no-await-in-loop
      const currentStats = await fs.lstat(target).catch(() => null);
      if (currentStats && !currentStats.isFile()) {
        throw new Error(`Recovery target is no longer a regular file: ${file.path}`);
      }
      // oxlint-disable-next-line no-await-in-loop
      await fs.remove(target);
      continue;
    }

    const backupPath = path.join(transaction.recoveryDir, "files", file.path);
    // oxlint-disable-next-line no-await-in-loop
    const bytes = await fs.readFile(backupPath);
    if (hashContent(bytes) !== file.sha256) {
      throw new Error(`Recovery backup failed integrity validation: ${file.path}`);
    }
    // oxlint-disable-next-line no-await-in-loop
    await fs.ensureDir(path.dirname(target));
    // oxlint-disable-next-line no-await-in-loop
    await fs.writeFile(target, bytes);
  }
  if (concurrentChanges.length > 0) {
    throw new Error(
      `Rollback refused to overwrite concurrently changed files: ${concurrentChanges.join(", ")}`,
    );
  }
}

export async function commitProjectTransaction(transaction: ProjectTransaction): Promise<void> {
  transaction.metadata.status = "applied";
  transaction.metadata.completedAt = new Date().toISOString();
  await writeMetadata(transaction);
}

export async function rollbackProjectTransaction(transaction: ProjectTransaction): Promise<void> {
  const writtenFiles = transaction.metadata.files.filter((file) =>
    transaction.writes.has(file.path),
  );
  await restoreFiles(transaction, writtenFiles, transaction.writes);
  transaction.metadata.status = "rolled-back";
  transaction.metadata.completedAt = new Date().toISOString();
  await writeMetadata(transaction);
}

function validateRecoveryMetadata(value: unknown, expectedId: string): RecoveryMetadata {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Recovery metadata is malformed.");
  }
  const metadata = value as Partial<RecoveryMetadata>;
  if (
    metadata.version !== RECOVERY_VERSION ||
    metadata.id !== expectedId ||
    !Array.isArray(metadata.files) ||
    typeof metadata.operation !== "string" ||
    !["create", "add", "stack-update", "template-update", "recover"].includes(metadata.operation) ||
    typeof metadata.createdAt !== "string" ||
    !["pending", "applied", "rolled-back", "recovered"].includes(metadata.status ?? "")
  ) {
    throw new Error("Recovery metadata is malformed.");
  }
  for (const file of metadata.files) {
    if (
      !file ||
      typeof file !== "object" ||
      !("path" in file) ||
      typeof file.path !== "string" ||
      !isPortableProjectPath(file.path) ||
      !("state" in file) ||
      (file.state !== "absent" && file.state !== "file") ||
      (file.state === "file" &&
        (!("sha256" in file) ||
          typeof file.sha256 !== "string" ||
          !/^[0-9a-f]{64}$/.test(file.sha256)))
    ) {
      throw new Error("Recovery metadata contains an invalid file entry.");
    }
  }
  return metadata as RecoveryMetadata;
}

export async function recoverProjectTransaction(
  projectDirInput: string,
  transactionId: string,
): Promise<RecoveryMetadata> {
  const projectDir = await fs.realpath(path.resolve(projectDirInput));
  const recoveryDir = recoveryPath(projectDir, transactionId);
  const metadata = validateRecoveryMetadata(
    await fs.readJson(path.join(recoveryDir, RECOVERY_METADATA_FILE)),
    transactionId,
  );
  if (metadata.status !== "applied" && metadata.status !== "pending") {
    throw new Error(
      `Recovery transaction ${transactionId} is ${metadata.status}, not applied or interrupted.`,
    );
  }
  const transaction: ProjectTransaction = {
    id: transactionId,
    projectDir,
    recoveryDir,
    metadata,
    writes: new Map(),
  };
  await restoreFiles(transaction, metadata.files);
  metadata.status = "recovered";
  metadata.completedAt = new Date().toISOString();
  await writeMetadata(transaction);
  return metadata;
}
