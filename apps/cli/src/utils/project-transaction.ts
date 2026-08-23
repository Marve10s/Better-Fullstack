import fs from "fs-extra";
import { randomUUID } from "node:crypto";
import path from "node:path";

import type { LifecycleOperation } from "./lifecycle-contract";

import { hashContent } from "./scaffold-manifest";

export const RECOVERY_ROOT = ".bts/recovery";
const RECOVERY_METADATA_FILE = "transaction.json";
const RECOVERY_VERSION = 1;
const RECOVERY_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type RecoveryFile =
  | { path: string; state: "absent" }
  | { path: string; state: "file"; sha256: string; mode?: number };

export type RecoveryMetadata = {
  version: typeof RECOVERY_VERSION;
  id: string;
  operation: LifecycleOperation;
  createdAt: string;
  completedAt?: string;
  status: "pending" | "applied" | "rolled-back" | "recovered";
  files: RecoveryFile[];
  outputs?: Record<string, string | null>;
  outputModes?: Record<string, number>;
};

export type ProjectTransaction = {
  id: string;
  projectDir: string;
  recoveryDir: string;
  metadata: RecoveryMetadata;
  writes: Map<string, string | null>;
};

export type RecoveryPointVerification = {
  id: string;
  valid: boolean;
  recoverable: boolean;
  errors: string[];
  metadata?: RecoveryMetadata;
};

export type RecoveryPointSummary = {
  id: string;
  valid: boolean;
  recoverable: boolean;
  operation?: LifecycleOperation;
  status?: RecoveryMetadata["status"];
  createdAt?: string;
  completedAt?: string;
  fileCount?: number;
  errors: string[];
};

export type PruneRecoveryPointsOptions = {
  olderThanDays: number;
  keep: number;
  apply: boolean;
  now?: Date;
};

export type PruneRecoveryPointsResult = {
  projectDir: string;
  applied: boolean;
  candidates: string[];
  pruned: string[];
  retained: string[];
  invalid: string[];
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
  if (!RECOVERY_ID.test(transactionId)) {
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
    // oxlint-disable-next-line no-await-in-loop -- each ancestor must be checked in path order
    const stats = await fs.lstat(current).catch(() => null);
    if (!stats) break;
    if (stats.isSymbolicLink()) {
      throw new Error(`Refusing to transact through a symlink: ${relativePath}`);
    }
  }
  return target;
}

async function writeMetadata(transaction: ProjectTransaction): Promise<void> {
  const metadataPath = path.join(transaction.recoveryDir, RECOVERY_METADATA_FILE);
  const stagingPath = `${metadataPath}.tmp`;
  await fs.writeJson(stagingPath, transaction.metadata, { spaces: 2 });
  await fs.rename(stagingPath, metadataPath);
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
      files.push({
        path: relativePath,
        state: "file",
        sha256: hashContent(bytes),
        mode: stats.mode & 0o7777,
      });
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

export const UNVERIFIED_WRITE = "unverified";

export function bindProjectTransactionWrite(
  transaction: ProjectTransaction,
  relativePath: string,
): void {
  if (transaction.writes.has(relativePath)) return;
  markProjectTransactionWrite(transaction, relativePath, UNVERIFIED_WRITE);
}

export async function journalProjectTransactionWrites(
  transaction: ProjectTransaction,
  relativePaths?: Iterable<string>,
): Promise<void> {
  for (const relativePath of relativePaths ?? []) {
    bindProjectTransactionWrite(transaction, relativePath);
  }
  transaction.metadata.outputs = Object.fromEntries(transaction.writes);
  await writeMetadata(transaction);
}

export function markProjectTransactionWrite(
  transaction: ProjectTransaction,
  relativePath: string,
  expectedSha256: string | null,
): void {
  if (!transaction.metadata.files.some((file) => file.path === relativePath)) {
    throw new Error(`Transaction write is not bound to its recovery snapshot: ${relativePath}`);
  }
  transaction.writes.set(relativePath, expectedSha256);
}

async function restoreFiles(
  transaction: ProjectTransaction,
  files: RecoveryFile[],
  expectedCurrentHashes?: Map<string, string | null>,
  expectedCurrentModes?: Map<string, number>,
): Promise<void> {
  const concurrentChanges: string[] = [];
  const restorations: Array<{
    file: RecoveryFile;
    target: string;
    backup?: Buffer;
    skip: boolean;
  }> = [];

  for (const file of files) {
    // oxlint-disable-next-line no-await-in-loop -- recovery preflights one bounded path at a time
    const target = await assertSafeTarget(transaction.projectDir, file.path);
    // oxlint-disable-next-line no-await-in-loop -- recovery preflights one bounded path at a time
    const currentStats = await fs.lstat(target).catch(() => null);
    if (currentStats && !currentStats.isFile()) {
      throw new Error(`Recovery target is no longer a regular file: ${file.path}`);
    }
    // oxlint-disable-next-line no-await-in-loop -- recovery preflights one bounded path at a time
    const current = currentStats ? await fs.readFile(target) : null;
    const currentHash = current ? hashContent(current) : null;
    let backup: Buffer | undefined;
    if (file.state === "file") {
      const backupPath = path.join(transaction.recoveryDir, "files", file.path);
      // oxlint-disable-next-line no-await-in-loop -- all backups must pass before any restore begins
      backup = await fs.readFile(backupPath);
      if (hashContent(backup) !== file.sha256) {
        throw new Error(`Recovery backup failed integrity validation: ${file.path}`);
      }
    }

    const hasExpectedCurrentHash = expectedCurrentHashes?.has(file.path) ?? false;
    const expectedCurrentHash = expectedCurrentHashes?.get(file.path);
    if (hasExpectedCurrentHash) {
      const stillAtPreimage =
        (file.state === "absent" && current === null) ||
        (file.state === "file" &&
          currentHash === file.sha256 &&
          (file.mode === undefined || ((currentStats?.mode ?? -1) & 0o7777) === file.mode));
      if (stillAtPreimage) {
        restorations.push({ file, target, backup, skip: true });
        continue;
      }
      if (expectedCurrentHash === UNVERIFIED_WRITE) {
        concurrentChanges.push(file.path);
        continue;
      }
      const expectedCurrentMode = expectedCurrentModes?.get(file.path);
      if (
        currentHash !== expectedCurrentHash ||
        (expectedCurrentMode !== undefined &&
          ((currentStats?.mode ?? -1) & 0o7777) !== expectedCurrentMode)
      ) {
        concurrentChanges.push(file.path);
        continue;
      }
    }
    restorations.push({ file, target, backup, skip: false });
  }
  if (concurrentChanges.length > 0) {
    throw new Error(
      `Refused to overwrite files changed after the transaction: ${concurrentChanges.join(", ")}`,
    );
  }

  for (const restoration of restorations) {
    if (restoration.skip) continue;
    if (restoration.file.state === "absent") {
      // oxlint-disable-next-line no-await-in-loop -- complete preflight precedes ordered restoration
      await fs.remove(restoration.target);
      continue;
    }
    if (!restoration.backup) {
      throw new Error(`Recovery backup is unavailable after validation: ${restoration.file.path}`);
    }
    // oxlint-disable-next-line no-await-in-loop -- complete preflight precedes ordered restoration
    await fs.ensureDir(path.dirname(restoration.target));
    // oxlint-disable-next-line no-await-in-loop -- complete preflight precedes ordered restoration
    await fs.writeFile(restoration.target, restoration.backup);
    if (restoration.file.mode !== undefined) {
      // oxlint-disable-next-line no-await-in-loop -- restore each captured file mode after its bytes
      await fs.chmod(restoration.target, restoration.file.mode);
    }
  }
}

async function readWriteModes(transaction: ProjectTransaction): Promise<Record<string, number>> {
  const modes: Record<string, number> = {};
  for (const relativePath of transaction.writes.keys()) {
    // oxlint-disable-next-line no-await-in-loop -- one bounded stat per written path
    const target = await assertSafeTarget(transaction.projectDir, relativePath);
    // oxlint-disable-next-line no-await-in-loop
    const stats = await fs.lstat(target).catch(() => null);
    if (stats?.isFile()) {
      modes[relativePath] = stats.mode & 0o7777;
    }
  }
  return modes;
}

export async function commitProjectTransaction(transaction: ProjectTransaction): Promise<void> {
  transaction.metadata.outputs = Object.fromEntries(transaction.writes);
  transaction.metadata.outputModes = await readWriteModes(transaction);
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
    ![
      "create",
      "add",
      "remove",
      "replace",
      "doctor-fix",
      "stack-update",
      "template-update",
      "gen",
      "registry-add",
      "recover",
    ].includes(metadata.operation) ||
    typeof metadata.createdAt !== "string" ||
    !["pending", "applied", "rolled-back", "recovered"].includes(metadata.status ?? "")
  ) {
    throw new Error("Recovery metadata is malformed.");
  }
  if (metadata.outputs !== undefined) {
    if (
      !metadata.outputs ||
      typeof metadata.outputs !== "object" ||
      Array.isArray(metadata.outputs) ||
      Object.entries(metadata.outputs).some(
        ([outputPath, hash]) =>
          !isPortableProjectPath(outputPath) ||
          (hash !== null &&
            hash !== UNVERIFIED_WRITE &&
            (typeof hash !== "string" || !/^[0-9a-f]{64}$/.test(hash))),
      )
    ) {
      throw new Error("Recovery metadata contains an invalid output entry.");
    }
  }
  if (metadata.outputModes !== undefined) {
    if (
      !metadata.outputModes ||
      typeof metadata.outputModes !== "object" ||
      Array.isArray(metadata.outputModes) ||
      Object.entries(metadata.outputModes).some(
        ([outputPath, mode]) =>
          !isPortableProjectPath(outputPath) ||
          typeof mode !== "number" ||
          !Number.isInteger(mode) ||
          mode < 0 ||
          mode > 0o7777,
      )
    ) {
      throw new Error("Recovery metadata contains an invalid output mode entry.");
    }
  }
  const filePaths = new Set<string>();
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
          !/^[0-9a-f]{64}$/.test(file.sha256) ||
          ("mode" in file &&
            (typeof file.mode !== "number" ||
              !Number.isInteger(file.mode) ||
              file.mode < 0 ||
              file.mode > 0o7777))))
    ) {
      throw new Error("Recovery metadata contains an invalid file entry.");
    }
    if (filePaths.has(file.path)) {
      throw new Error("Recovery metadata contains duplicate file entries.");
    }
    filePaths.add(file.path);
  }
  if (
    Object.keys(metadata.outputs ?? {}).some((outputPath) => !filePaths.has(outputPath)) ||
    Object.keys(metadata.outputModes ?? {}).some(
      (outputPath) => !filePaths.has(outputPath) || !(outputPath in (metadata.outputs ?? {})),
    )
  ) {
    throw new Error("Recovery metadata contains an output that is not bound to a file snapshot.");
  }
  return metadata as RecoveryMetadata;
}

async function loadProjectRecoveryPoint(
  projectDirInput: string,
  transactionId: string,
): Promise<ProjectTransaction> {
  const projectDir = await fs.realpath(path.resolve(projectDirInput));
  const recoveryDir = recoveryPath(projectDir, transactionId);
  const metadata = validateRecoveryMetadata(
    await fs.readJson(path.join(recoveryDir, RECOVERY_METADATA_FILE)),
    transactionId,
  );
  return {
    id: transactionId,
    projectDir,
    recoveryDir,
    metadata,
    writes: new Map(),
  };
}

async function verifyRecoveryBackups(transaction: ProjectTransaction): Promise<string[]> {
  const errors: string[] = [];
  for (const file of transaction.metadata.files) {
    const backupPath = path.join(transaction.recoveryDir, "files", file.path);
    // oxlint-disable-next-line no-await-in-loop -- every declared backup receives an integrity check
    const stats = await fs.lstat(backupPath).catch(() => null);
    if (file.state === "absent") {
      if (stats) errors.push(`Unexpected backup exists for absent preimage: ${file.path}`);
      continue;
    }
    if (!stats?.isFile() || stats.isSymbolicLink()) {
      errors.push(`Recovery backup is missing or is not a regular file: ${file.path}`);
      continue;
    }
    // oxlint-disable-next-line no-await-in-loop -- hash each bounded backup before reporting validity
    const backup = await fs.readFile(backupPath);
    if (hashContent(backup) !== file.sha256) {
      errors.push(`Recovery backup failed integrity validation: ${file.path}`);
    }
  }
  return errors;
}

async function verifyRecoveryCurrentState(transaction: ProjectTransaction): Promise<string[]> {
  if (transaction.metadata.status !== "applied" && transaction.metadata.status !== "pending") {
    return [];
  }
  const errors: string[] = [];
  const outputs = transaction.metadata.outputs ?? {};
  const outputModes = transaction.metadata.outputModes ?? {};
  for (const file of transaction.metadata.files) {
    // oxlint-disable-next-line no-await-in-loop -- inspect every bounded restore target without writing
    const target = await assertSafeTarget(transaction.projectDir, file.path).catch((error) => {
      errors.push(error instanceof Error ? error.message : String(error));
      return null;
    });
    if (!target) continue;
    // oxlint-disable-next-line no-await-in-loop
    const stats = await fs.lstat(target).catch(() => null);
    if (stats && !stats.isFile()) {
      errors.push(`Recovery target is no longer a regular file: ${file.path}`);
      continue;
    }
    // oxlint-disable-next-line no-await-in-loop
    const current = stats ? await fs.readFile(target) : null;
    const currentHash = current ? hashContent(current) : null;
    const expectedHash =
      file.path in outputs ? outputs[file.path] : file.state === "file" ? file.sha256 : null;
    const expectedMode = outputModes[file.path];
    const stillAtPreimage =
      (file.state === "absent" && current === null) ||
      (file.state === "file" &&
        currentHash === file.sha256 &&
        (file.mode === undefined || ((stats?.mode ?? -1) & 0o7777) === file.mode));
    if (stillAtPreimage) continue;
    if (expectedHash === UNVERIFIED_WRITE) {
      errors.push(`Recovery target changed after the transaction: ${file.path}`);
      continue;
    }
    if (
      currentHash !== expectedHash ||
      (expectedMode !== undefined && ((stats?.mode ?? -1) & 0o7777) !== expectedMode)
    ) {
      errors.push(`Recovery target changed after the transaction: ${file.path}`);
    }
  }
  return errors;
}

export async function verifyProjectRecoveryPoint(
  projectDirInput: string,
  transactionId: string,
): Promise<RecoveryPointVerification> {
  try {
    const transaction = await loadProjectRecoveryPoint(projectDirInput, transactionId);
    const integrityErrors = await verifyRecoveryBackups(transaction);
    const currentStateErrors = await verifyRecoveryCurrentState(transaction);
    const eligibleStatus =
      transaction.metadata.status === "applied" || transaction.metadata.status === "pending";
    return {
      id: transactionId,
      valid: integrityErrors.length === 0,
      recoverable:
        eligibleStatus && integrityErrors.length === 0 && currentStateErrors.length === 0,
      errors: [...integrityErrors, ...currentStateErrors],
      metadata: transaction.metadata,
    };
  } catch (error) {
    return {
      id: transactionId,
      valid: false,
      recoverable: false,
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
}

export async function getProjectRecoveryPoint(
  projectDirInput: string,
  transactionId: string,
): Promise<RecoveryPointVerification> {
  return verifyProjectRecoveryPoint(projectDirInput, transactionId);
}

export async function listProjectRecoveryPoints(
  projectDirInput: string,
): Promise<RecoveryPointSummary[]> {
  const projectDir = await fs.realpath(path.resolve(projectDirInput));
  const root = path.join(projectDir, RECOVERY_ROOT);
  const entries = await fs.readdir(root, { withFileTypes: true }).catch(() => []);
  const points: RecoveryPointSummary[] = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    if (!entry.isDirectory() || !RECOVERY_ID.test(entry.name)) {
      points.push({
        id: entry.name,
        valid: false,
        recoverable: false,
        errors: ["Recovery entry is not a valid transaction directory."],
      });
      continue;
    }
    // oxlint-disable-next-line no-await-in-loop -- each independent recovery point is bounded
    const verification = await verifyProjectRecoveryPoint(projectDir, entry.name);
    points.push({
      id: entry.name,
      valid: verification.valid,
      recoverable: verification.recoverable,
      operation: verification.metadata?.operation,
      status: verification.metadata?.status,
      createdAt: verification.metadata?.createdAt,
      completedAt: verification.metadata?.completedAt,
      fileCount: verification.metadata?.files.length,
      errors: verification.errors,
    });
  }
  return points.sort((left, right) => (right.createdAt ?? "").localeCompare(left.createdAt ?? ""));
}

export async function pruneProjectRecoveryPoints(
  projectDirInput: string,
  options: PruneRecoveryPointsOptions,
): Promise<PruneRecoveryPointsResult> {
  if (!Number.isInteger(options.olderThanDays) || options.olderThanDays < 0) {
    throw new Error("olderThanDays must be a non-negative integer.");
  }
  if (!Number.isInteger(options.keep) || options.keep < 0) {
    throw new Error("keep must be a non-negative integer.");
  }
  const projectDir = await fs.realpath(path.resolve(projectDirInput));
  const points = await listProjectRecoveryPoints(projectDir);
  const invalid = points.filter((point) => !point.valid).map((point) => point.id);
  const valid = points.filter(
    (
      point,
    ): point is RecoveryPointSummary & {
      createdAt: string;
      status: RecoveryMetadata["status"];
    } => point.valid && point.createdAt !== undefined && point.status !== undefined,
  );
  const cutoff = (options.now ?? new Date()).getTime() - options.olderThanDays * 86_400_000;
  const retainedByCount = new Set(valid.slice(0, options.keep).map((point) => point.id));
  const candidates = valid
    .filter(
      (point) =>
        point.status !== "pending" &&
        !retainedByCount.has(point.id) &&
        Number.isFinite(Date.parse(point.createdAt)) &&
        Date.parse(point.createdAt) <= cutoff,
    )
    .map((point) => point.id);
  const pruned: string[] = [];

  if (options.apply) {
    for (const transactionId of candidates) {
      // oxlint-disable-next-line no-await-in-loop -- revalidate immediately before each bounded deletion
      const verification = await verifyProjectRecoveryPoint(projectDir, transactionId);
      if (!verification.valid || verification.metadata?.status === "pending") continue;
      // oxlint-disable-next-line no-await-in-loop -- explicit, validated recovery-point deletion
      await fs.remove(recoveryPath(projectDir, transactionId));
      pruned.push(transactionId);
    }
  }

  return {
    projectDir,
    applied: options.apply,
    candidates,
    pruned,
    retained: points
      .map((point) => point.id)
      .filter((transactionId) => !pruned.includes(transactionId)),
    invalid,
  };
}

export async function recoverProjectTransaction(
  projectDirInput: string,
  transactionId: string,
): Promise<RecoveryMetadata> {
  const loaded = await loadProjectRecoveryPoint(projectDirInput, transactionId);
  const { projectDir, recoveryDir, metadata } = loaded;
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
  const recordedOutputs = metadata.outputs ?? {};
  const expectedCurrentHashes = new Map(
    metadata.files.map((file) => [
      file.path,
      file.path in recordedOutputs
        ? recordedOutputs[file.path]
        : file.state === "file"
          ? file.sha256
          : null,
    ]),
  );
  await restoreFiles(
    transaction,
    metadata.files,
    expectedCurrentHashes,
    new Map(Object.entries(metadata.outputModes ?? {})),
  );
  metadata.status = "recovered";
  metadata.completedAt = new Date().toISOString();
  await writeMetadata(transaction);
  return metadata;
}
