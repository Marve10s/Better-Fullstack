import fs from "fs-extra";
import { randomUUID } from "node:crypto";
import { open } from "node:fs/promises";
import path from "node:path";

import type { LifecycleOperation } from "./lifecycle-contract";

import { hashContent } from "./scaffold-manifest";

export const RECOVERY_ROOT = ".bts/recovery";
const RECOVERY_METADATA_FILE = "transaction.json";
const ACTIVE_TRANSACTION_LOCK_FILE = "active.lock";
const ACTIVE_TRANSACTION_LOCK_GENERATION_WIDTH = 12;
const MAX_ACTIVE_TRANSACTION_LOCK_GENERATION = 999_999_999_999;
const RECOVERY_VERSION = 1;
const RECOVERY_WRITE_FORMAT = 2;
const RECOVERY_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type RecoveryFile =
  | { path: string; state: "absent" }
  | { path: string; state: "file"; sha256: string; mode?: number };

export type RecoveryOutputState = { sha256: null; mode?: never } | { sha256: string; mode: number };

type ExpectedOutputState = {
  sha256: string | null;
  mode?: number;
};

export type RecoveryMetadata = {
  version: typeof RECOVERY_VERSION;
  writeFormat?: typeof RECOVERY_WRITE_FORMAT;
  id: string;
  operation: LifecycleOperation;
  createdAt: string;
  completedAt?: string;
  status: "pending" | "applied" | "rolled-back" | "recovered";
  files: RecoveryFile[];
  outputs?: Record<string, string | null>;
  outputModes?: Record<string, number>;
  outputHistory?: Record<string, RecoveryOutputState[]>;
  stagingFiles?: Record<string, string>;
};

export type ProjectTransaction = {
  id: string;
  projectDir: string;
  recoveryDir: string;
  metadata: RecoveryMetadata;
  writes: Map<string, string | null>;
  lock?: ActiveTransactionLockState;
};

export type ProjectTransactionFileWriteOptions = {
  expectedSha256?: string;
  mode?: number;
  writeFile?: (stagingPath: string) => void | Promise<void>;
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

type ActiveTransactionLock = {
  version: 1;
  id: string;
  pid: number;
  createdAt: string;
  phase: "active" | "recovering" | "recovery-required" | "released";
};

type ActiveTransactionLockState = ActiveTransactionLock & {
  generation: number;
  path: string;
};

function isPortableProjectPath(relativePath: string): boolean {
  return (
    relativePath.length > 0 &&
    relativePath !== "." &&
    !relativePath.includes("\0") &&
    !path.posix.isAbsolute(relativePath) &&
    !path.win32.isAbsolute(relativePath) &&
    !relativePath.split(/[\\/]/).includes("..") &&
    relativePath !== ".bts" &&
    !relativePath.startsWith(".bts/") &&
    !relativePath.startsWith(".bts\\")
  );
}

function isCanonicalProjectPath(relativePath: string): boolean {
  return (
    isPortableProjectPath(relativePath) &&
    !relativePath.includes("\\") &&
    path.posix.normalize(relativePath) === relativePath
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function combineLifecycleErrors(primary: unknown, lockError: unknown): AggregateError {
  const primaryMessage = primary instanceof Error ? primary.message : String(primary);
  const lockMessage = lockError instanceof Error ? lockError.message : String(lockError);
  return new AggregateError(
    [primary, lockError],
    `${primaryMessage}; lifecycle lock update also failed: ${lockMessage}`,
  );
}

function isValidMode(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 0o7777;
}

function recoveryPath(projectDir: string, transactionId: string): string {
  if (!RECOVERY_ID.test(transactionId)) {
    throw new Error("Recovery transaction ID is invalid.");
  }
  return path.join(projectDir, RECOVERY_ROOT, transactionId);
}

function transactionStagingPath(relativePath: string, transactionId: string): string {
  const normalized = relativePath.replaceAll("\\", "/");
  const directory = path.posix.dirname(normalized);
  const fileName = `.bts-${transactionId}-${hashContent(normalized).slice(0, 16)}.tmp`;
  return directory === "." ? fileName : `${directory}/${fileName}`;
}

function filePreimageState(file: RecoveryFile): ExpectedOutputState {
  return file.state === "absent"
    ? { sha256: null }
    : { sha256: file.sha256, ...(file.mode === undefined ? {} : { mode: file.mode }) };
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

async function assertSafeRecoveryTarget(projectDir: string, targetInput: string): Promise<string> {
  const projectRealpath = await fs.realpath(projectDir);
  const target = path.resolve(targetInput);
  const relative = path.relative(projectRealpath, target);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error("Recovery path escapes the project.");
  }

  let current = projectRealpath;
  for (const segment of relative.split(path.sep).filter(Boolean)) {
    current = path.join(current, segment);
    // oxlint-disable-next-line no-await-in-loop -- recovery ancestors are checked in path order
    const stats = await fs.lstat(current).catch(() => null);
    if (!stats) break;
    if (stats.isSymbolicLink()) {
      throw new Error("Refusing to access recovery data through a symlink.");
    }
  }
  return target;
}

type ObservedFileState = { sha256: null; mode?: undefined } | { sha256: string; mode: number };

async function readObservedFileState(
  target: string,
  relativePath: string,
): Promise<ObservedFileState> {
  const stats = await fs.lstat(target).catch(() => null);
  if (!stats) return { sha256: null };
  if (!stats.isFile()) {
    throw new Error(`Transaction target is not a regular file: ${relativePath}`);
  }
  return {
    sha256: hashContent(await fs.readFile(target)),
    mode: stats.mode & 0o7777,
  };
}

function statesMatch(left: RecoveryOutputState, right: RecoveryOutputState): boolean {
  return left.sha256 === right.sha256 && left.mode === right.mode;
}

function hasOwn(record: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(record, key);
}

function getOwn<T>(record: Record<string, T> | undefined, key: string): T | undefined {
  return record && hasOwn(record, key) ? record[key] : undefined;
}

function setOwn<T>(record: Record<string, T>, key: string, value: T): void {
  Object.defineProperty(record, key, {
    configurable: true,
    enumerable: true,
    value,
    writable: true,
  });
}

function stateMatchesExpectation(
  observed: ObservedFileState,
  expected: ExpectedOutputState,
): boolean {
  return (
    observed.sha256 === expected.sha256 &&
    (expected.sha256 === null || expected.mode === undefined || observed.mode === expected.mode)
  );
}

function recordOutputHistory(
  transaction: ProjectTransaction,
  relativePath: string,
  state: RecoveryOutputState,
): void {
  const history = (transaction.metadata.outputHistory ??= Object.create(null) as Record<
    string,
    RecoveryOutputState[]
  >);
  let states = getOwn(history, relativePath);
  if (!states) {
    states = [];
    setOwn(history, relativePath, states);
  }
  if (states.some((candidate) => statesMatch(candidate, state))) return;
  if (states.length >= 64) {
    throw new Error(`Transaction output history is too large: ${relativePath}`);
  }
  states.push(state);
}

async function syncFile(filePath: string): Promise<void> {
  const handle = await open(filePath, "r");
  try {
    await handle.sync();
  } finally {
    await handle.close();
  }
}

async function syncDirectory(directoryPath: string): Promise<void> {
  try {
    await syncFile(directoryPath);
  } catch (error) {
    const code = error instanceof Error && "code" in error ? error.code : undefined;
    if (["EACCES", "EISDIR", "EINVAL", "ENOTSUP", "EPERM"].includes(String(code))) return;
    throw error;
  }
}

async function writeMetadata(transaction: ProjectTransaction): Promise<void> {
  const expectedRecoveryDir = recoveryPath(transaction.projectDir, transaction.id);
  if (path.resolve(transaction.recoveryDir) !== expectedRecoveryDir) {
    throw new Error("Recovery transaction directory is invalid.");
  }
  const metadataPath = await assertSafeRecoveryTarget(
    transaction.projectDir,
    path.join(transaction.recoveryDir, RECOVERY_METADATA_FILE),
  );
  const stagingPath = `${metadataPath}.tmp`;
  await assertSafeRecoveryTarget(transaction.projectDir, stagingPath);
  const staleStage = await fs.lstat(stagingPath).catch(() => null);
  if (staleStage) {
    if (!staleStage.isFile() || staleStage.isSymbolicLink()) {
      throw new Error("Recovery metadata staging path is not a regular file.");
    }
    await fs.unlink(stagingPath);
  }
  await fs.writeFile(stagingPath, `${JSON.stringify(transaction.metadata, null, 2)}\n`, {
    flag: "wx",
  });
  await syncFile(stagingPath);
  await fs.rename(stagingPath, metadataPath);
  await syncDirectory(transaction.recoveryDir);
}

function activeTransactionLockPath(projectDir: string): string {
  return path.join(projectDir, RECOVERY_ROOT, ACTIVE_TRANSACTION_LOCK_FILE);
}

function activeTransactionLockGenerationPath(projectDir: string, generation: number): string {
  if (generation === 0) return activeTransactionLockPath(projectDir);
  return path.join(
    projectDir,
    RECOVERY_ROOT,
    `${ACTIVE_TRANSACTION_LOCK_FILE}.${String(generation).padStart(
      ACTIVE_TRANSACTION_LOCK_GENERATION_WIDTH,
      "0",
    )}`,
  );
}

function parseActiveTransactionLockGeneration(fileName: string): number | null {
  if (fileName === ACTIVE_TRANSACTION_LOCK_FILE) return 0;
  const prefix = `${ACTIVE_TRANSACTION_LOCK_FILE}.`;
  if (!fileName.startsWith(prefix)) return null;
  const suffix = fileName.slice(prefix.length);
  if (suffix.length !== ACTIVE_TRANSACTION_LOCK_GENERATION_WIDTH || !/^\d+$/.test(suffix)) {
    return null;
  }
  const generation = Number(suffix);
  return generation > 0 && generation <= MAX_ACTIVE_TRANSACTION_LOCK_GENERATION ? generation : null;
}

async function listActiveTransactionLockGenerations(
  projectDir: string,
): Promise<Array<{ generation: number; path: string }>> {
  const root = await assertSafeRecoveryTarget(projectDir, path.join(projectDir, RECOVERY_ROOT));
  let entries: string[];
  try {
    entries = await fs.readdir(root);
  } catch (error) {
    const code = error instanceof Error && "code" in error ? error.code : undefined;
    if (code === "ENOENT") return [];
    throw error;
  }
  return entries
    .flatMap((fileName) => {
      const generation = parseActiveTransactionLockGeneration(fileName);
      return generation === null ? [] : [{ generation, path: path.join(root, fileName) }];
    })
    .sort((left, right) => left.generation - right.generation);
}

async function createDurableLockFile(
  projectDir: string,
  destinationInput: string,
  lock: ActiveTransactionLock,
): Promise<void> {
  const destination = await assertSafeRecoveryTarget(projectDir, destinationInput);
  const directory = path.dirname(destination);
  const stagingPath = await assertSafeRecoveryTarget(
    projectDir,
    path.join(directory, `${ACTIVE_TRANSACTION_LOCK_FILE}.stage-${randomUUID()}`),
  );
  try {
    await fs.writeFile(stagingPath, `${JSON.stringify(lock)}\n`, { flag: "wx", mode: 0o600 });
    await syncFile(stagingPath);
    await fs.link(stagingPath, destination);
    await syncDirectory(directory);
  } finally {
    const staging = await fs.lstat(stagingPath).catch(() => null);
    if (staging?.isFile() && !staging.isSymbolicLink()) {
      await fs.unlink(stagingPath).catch(() => undefined);
    }
  }
}

async function readActiveTransactionLockFile(
  projectDir: string,
  lockPathInput: string,
): Promise<ActiveTransactionLock | null> {
  const lockPath = await assertSafeRecoveryTarget(projectDir, lockPathInput);
  const stats = await fs.lstat(lockPath).catch(() => null);
  if (!stats) return null;
  if (!stats.isFile() || stats.isSymbolicLink() || stats.size > 1024) {
    throw new Error("Active lifecycle transaction lock is invalid.");
  }
  let value: unknown;
  try {
    value = JSON.parse(await fs.readFile(lockPath, "utf-8"));
  } catch {
    throw new Error("Active lifecycle transaction lock is invalid.");
  }
  if (
    !isRecord(value) ||
    value.version !== 1 ||
    typeof value.id !== "string" ||
    !RECOVERY_ID.test(value.id) ||
    typeof value.pid !== "number" ||
    !Number.isInteger(value.pid) ||
    value.pid <= 0 ||
    typeof value.createdAt !== "string" ||
    (value.phase !== undefined &&
      value.phase !== "active" &&
      value.phase !== "recovering" &&
      value.phase !== "recovery-required" &&
      value.phase !== "released") ||
    Object.keys(value).some((key) => !["version", "id", "pid", "createdAt", "phase"].includes(key))
  ) {
    throw new Error("Active lifecycle transaction lock is invalid.");
  }
  return { ...(value as Omit<ActiveTransactionLock, "phase">), phase: value.phase ?? "active" };
}

async function readActiveTransactionLock(
  projectDir: string,
): Promise<ActiveTransactionLockState | null> {
  const latest = (await listActiveTransactionLockGenerations(projectDir)).at(-1);
  if (!latest) return null;
  const lock = await readActiveTransactionLockFile(projectDir, latest.path);
  if (!lock) {
    throw new Error("The latest lifecycle transaction lock generation is missing.");
  }
  return { ...lock, generation: latest.generation, path: latest.path };
}

function isProcessRunning(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error instanceof Error && "code" in error && error.code === "EPERM";
  }
}

async function readLockOwnerStatus(
  projectDir: string,
  transactionId: string,
): Promise<RecoveryMetadata["status"] | null> {
  const metadataPath = await assertSafeRecoveryTarget(
    projectDir,
    path.join(recoveryPath(projectDir, transactionId), RECOVERY_METADATA_FILE),
  );
  const stats = await fs.lstat(metadataPath).catch(() => null);
  if (!stats) return null;
  if (!stats.isFile() || stats.isSymbolicLink() || stats.size > 1024 * 1024) {
    throw new Error("The active lifecycle transaction has invalid recovery metadata.");
  }
  let value: unknown;
  try {
    value = JSON.parse(await fs.readFile(metadataPath, "utf-8"));
  } catch {
    throw new Error("The active lifecycle transaction has invalid recovery metadata.");
  }
  return validateRecoveryMetadata(value, transactionId).status;
}

function activeTransactionLocksMatch(
  left: ActiveTransactionLockState,
  right: ActiveTransactionLockState,
): boolean {
  return (
    left.version === right.version &&
    left.id === right.id &&
    left.pid === right.pid &&
    left.createdAt === right.createdAt &&
    left.phase === right.phase &&
    left.generation === right.generation &&
    left.path === right.path
  );
}

async function appendActiveTransactionLockGeneration(
  projectDir: string,
  expected: ActiveTransactionLockState | null,
  lock: ActiveTransactionLock,
): Promise<ActiveTransactionLockState | null> {
  const latest = await readActiveTransactionLock(projectDir);
  if (
    expected === null
      ? latest !== null
      : latest === null || !activeTransactionLocksMatch(latest, expected)
  ) {
    return null;
  }
  const generation = (expected?.generation ?? -1) + 1;
  if (generation > MAX_ACTIVE_TRANSACTION_LOCK_GENERATION) {
    throw new Error("The lifecycle transaction lock generation limit was reached.");
  }
  const destination = activeTransactionLockGenerationPath(projectDir, generation);
  try {
    await createDurableLockFile(projectDir, destination, lock);
  } catch (error) {
    const code = error instanceof Error && "code" in error ? error.code : undefined;
    if (code === "EEXIST") return null;
    throw error;
  }
  const state = { ...lock, generation, path: destination };
  return state;
}

async function transitionActiveTransactionLock(
  projectDir: string,
  current: ActiveTransactionLockState,
  phase: ActiveTransactionLock["phase"],
): Promise<ActiveTransactionLockState> {
  const successor: ActiveTransactionLock = {
    version: 1,
    id: current.id,
    pid: current.pid,
    createdAt: current.createdAt,
    phase,
  };
  for (let attempt = 0; attempt < 4; attempt += 1) {
    // oxlint-disable-next-line no-await-in-loop -- contenders elect one deterministic successor
    const appended = await appendActiveTransactionLockGeneration(projectDir, current, successor);
    if (appended) return appended;
    // oxlint-disable-next-line no-await-in-loop -- an idempotent retry may observe its successor
    const latest = await readActiveTransactionLock(projectDir);
    if (
      latest &&
      latest.generation === current.generation + 1 &&
      latest.id === successor.id &&
      latest.pid === successor.pid &&
      latest.createdAt === successor.createdAt &&
      latest.phase === successor.phase
    ) {
      return latest;
    }
    throw new Error("The lifecycle transaction lock changed before its phase could be updated.");
  }
  throw new Error("Could not append the lifecycle transaction lock phase.");
}

async function releaseActiveTransactionLock(
  projectDir: string,
  current: ActiveTransactionLockState,
): Promise<ActiveTransactionLockState> {
  return transitionActiveTransactionLock(projectDir, current, "released");
}

async function acquireActiveTransactionLock(
  projectDir: string,
  transactionId: string,
): Promise<ActiveTransactionLockState> {
  const recoveryRoot = path.join(projectDir, RECOVERY_ROOT);
  await assertSafeRecoveryTarget(projectDir, recoveryRoot);
  await fs.ensureDir(recoveryRoot);
  const lock: ActiveTransactionLock = {
    version: 1,
    id: transactionId,
    pid: process.pid,
    createdAt: new Date().toISOString(),
    phase: "active",
  };

  for (let attempt = 0; attempt < 8; attempt += 1) {
    // oxlint-disable-next-line no-await-in-loop -- each contender rescans after losing one generation
    const active = await readActiveTransactionLock(projectDir);
    if (active && active.phase !== "released") {
      if (active.phase === "recovery-required" || isProcessRunning(active.pid)) {
        throw new Error(
          `Another lifecycle transaction is active or awaiting recovery: ${active.id}`,
        );
      }
      // oxlint-disable-next-line no-await-in-loop -- dead ownership is classified by durable metadata
      const ownerStatus = await readLockOwnerStatus(projectDir, active.id);
      if (ownerStatus === "pending" || ownerStatus === "applied") {
        throw new Error(
          `Another lifecycle transaction is active or awaiting recovery: ${active.id}`,
        );
      }
    }
    // oxlint-disable-next-line no-await-in-loop -- O_EXCL successor publication elects one owner
    const acquired = await appendActiveTransactionLockGeneration(projectDir, active, lock);
    if (acquired) return acquired;
  }
  throw new Error("Could not acquire the lifecycle transaction lock.");
}

async function assertActiveTransactionLock(transaction: ProjectTransaction): Promise<void> {
  if (
    !transaction.lock ||
    (transaction.lock.phase !== "active" && transaction.lock.phase !== "recovering")
  ) {
    throw new Error("The lifecycle transaction has no project lock ownership.");
  }
  const lock = await readActiveTransactionLock(transaction.projectDir);
  if (!lock || !activeTransactionLocksMatch(lock, transaction.lock)) {
    throw new Error("The lifecycle transaction no longer owns the project lock.");
  }
}

async function acquireRecoveryTransactionLock(
  projectDir: string,
  transactionId: string,
): Promise<ActiveTransactionLockState> {
  await fs.ensureDir(path.join(projectDir, RECOVERY_ROOT));
  const recovering: ActiveTransactionLock = {
    version: 1,
    id: transactionId,
    pid: process.pid,
    createdAt: new Date().toISOString(),
    phase: "recovering",
  };
  for (let attempt = 0; attempt < 8; attempt += 1) {
    // oxlint-disable-next-line no-await-in-loop -- recovery contenders rescan the elected generation
    const lock = await readActiveTransactionLock(projectDir);
    if (lock && lock.phase !== "released") {
      if (lock.id !== transactionId) {
        throw new Error(`Another lifecycle transaction owns the project lock: ${lock.id}`);
      }
      if (lock.id === transactionId && lock.phase === "active" && isProcessRunning(lock.pid)) {
        throw new Error(`Lifecycle transaction ${transactionId} is still active.`);
      }
      if (lock.id === transactionId && lock.phase === "recovering" && isProcessRunning(lock.pid)) {
        throw new Error(`Recovery transaction ${transactionId} is already active.`);
      }
    }
    // oxlint-disable-next-line no-await-in-loop -- the deterministic successor elects one recovery
    const acquired = await appendActiveTransactionLockGeneration(projectDir, lock, recovering);
    if (acquired) return acquired;
  }
  throw new Error("Could not acquire the recovery transaction lock.");
}

function getBoundRecoveryFile(transaction: ProjectTransaction, relativePath: string): RecoveryFile {
  const file = transaction.metadata.files.find((candidate) => candidate.path === relativePath);
  if (!file) {
    throw new Error(`Transaction write is not bound to its recovery snapshot: ${relativePath}`);
  }
  return file;
}

function getStagingRelativePath(transaction: ProjectTransaction, relativePath: string): string {
  const expected = transactionStagingPath(relativePath, transaction.id);
  const recorded = transaction.metadata.stagingFiles?.[relativePath];
  if (recorded !== undefined && recorded !== expected) {
    throw new Error(`Transaction staging path is invalid: ${relativePath}`);
  }
  return recorded ?? expected;
}

function transactionOwnsState(
  transaction: ProjectTransaction,
  relativePath: string,
  observed: ObservedFileState,
): boolean {
  const file = getBoundRecoveryFile(transaction, relativePath);
  if (stateMatchesExpectation(observed, filePreimageState(file))) return true;

  const expectedSha256 = transaction.writes.get(relativePath);
  if (
    expectedSha256 !== undefined &&
    expectedSha256 !== UNVERIFIED_WRITE &&
    stateMatchesExpectation(observed, {
      sha256: expectedSha256,
      ...(expectedSha256 !== null &&
      getOwn(transaction.metadata.outputModes, relativePath) !== undefined
        ? { mode: getOwn(transaction.metadata.outputModes, relativePath) }
        : {}),
    })
  ) {
    return true;
  }

  return (getOwn(transaction.metadata.outputHistory, relativePath) ?? []).some((state) =>
    stateMatchesExpectation(observed, state),
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
  const relativePathList = [...new Set(relativePaths)].sort();
  const invalidPath = relativePathList.find(
    (relativePath) => !isCanonicalProjectPath(relativePath),
  );
  if (invalidPath) {
    throw new Error(`Unsafe transaction path: ${invalidPath}`);
  }
  const filePaths = new Set(relativePathList);
  const stagingFiles = Object.fromEntries(
    relativePathList.map((relativePath) => [
      relativePath,
      transactionStagingPath(relativePath, id),
    ]),
  );
  const stagingPaths = Object.values(stagingFiles);

  if (
    new Set(stagingPaths).size !== stagingPaths.length ||
    stagingPaths.some((stagingPath) => filePaths.has(stagingPath))
  ) {
    throw new Error("Transaction paths conflict with reserved staging files.");
  }

  let lock: ActiveTransactionLockState | undefined;
  try {
    lock = await acquireActiveTransactionLock(projectDir, id);
    await fs.ensureDir(path.join(recoveryDir, "files"));
    await syncDirectory(path.dirname(recoveryDir));
    for (const stagingPath of stagingPaths) {
      // oxlint-disable-next-line no-await-in-loop -- every reserved sibling must be absent
      const target = await assertSafeTarget(projectDir, stagingPath);
      // oxlint-disable-next-line no-await-in-loop
      if (await fs.pathExists(target)) {
        throw new Error(`Transaction staging path already exists: ${stagingPath}`);
      }
    }
    for (const relativePath of relativePathList) {
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
      // oxlint-disable-next-line no-await-in-loop -- recovery metadata follows durable backup bytes
      await syncFile(backupPath);
      // oxlint-disable-next-line no-await-in-loop
      await syncDirectory(path.dirname(backupPath));
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
      lock,
      metadata: {
        version: RECOVERY_VERSION,
        writeFormat: RECOVERY_WRITE_FORMAT,
        id,
        operation,
        createdAt: new Date().toISOString(),
        status: "pending",
        files,
        stagingFiles,
      },
    };
    await writeMetadata(transaction);
    return transaction;
  } catch (error) {
    await fs.remove(recoveryDir).catch(() => undefined);
    if (lock) {
      try {
        await releaseActiveTransactionLock(projectDir, lock);
      } catch (lockError) {
        throw combineLifecycleErrors(error, lockError);
      }
    }
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
  await assertActiveTransactionLock(transaction);
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
  getBoundRecoveryFile(transaction, relativePath);
  if (
    expectedSha256 !== null &&
    expectedSha256 !== UNVERIFIED_WRITE &&
    !/^[0-9a-f]{64}$/.test(expectedSha256)
  ) {
    throw new Error(`Transaction output hash is invalid: ${relativePath}`);
  }
  if (transaction.metadata.outputModes) {
    delete transaction.metadata.outputModes[relativePath];
  }
  transaction.writes.set(relativePath, expectedSha256);
}

async function validateStagingOutput(
  stagingPath: string,
  relativePath: string,
  expectedSha256: string,
  expectedMode: number,
): Promise<void> {
  const stats = await fs.lstat(stagingPath).catch(() => null);
  if (!stats?.isFile() || stats.isSymbolicLink()) {
    throw new Error(`Transaction staging output is not a regular file: ${relativePath}`);
  }
  if (hashContent(await fs.readFile(stagingPath)) !== expectedSha256) {
    throw new Error(`Transaction staging output did not match its reviewed bytes: ${relativePath}`);
  }
  if ((stats.mode & 0o7777) !== expectedMode) {
    throw new Error(
      `Transaction staging output mode did not match its reviewed mode: ${relativePath}`,
    );
  }
}

async function replaceFileAtomically(
  target: string,
  content: Buffer,
  expectedSha256: string,
  options: Pick<ProjectTransactionFileWriteOptions, "mode" | "writeFile"> & {
    relativePath: string;
    stagingPath: string;
    beforeReplace?: () => void | Promise<void>;
  },
): Promise<void> {
  if (
    options.mode === undefined ||
    !Number.isInteger(options.mode) ||
    options.mode < 0 ||
    options.mode > 0o7777
  ) {
    throw new Error(`Transaction output mode is invalid: ${options.relativePath}`);
  }
  await fs.ensureDir(path.dirname(target));
  const stagingStats = await fs.lstat(options.stagingPath).catch(() => null);
  if (stagingStats) {
    throw new Error(`Transaction staging path already exists: ${options.relativePath}`);
  }

  let primaryError: unknown;
  try {
    if (options.writeFile) {
      await options.writeFile(options.stagingPath);
    } else {
      await fs.writeFile(options.stagingPath, content, { flag: "wx", mode: options.mode });
    }
    await fs.chmod(options.stagingPath, options.mode);
    await validateStagingOutput(
      options.stagingPath,
      options.relativePath,
      expectedSha256,
      options.mode,
    );
    await syncFile(options.stagingPath);
    await validateStagingOutput(
      options.stagingPath,
      options.relativePath,
      expectedSha256,
      options.mode,
    );
    await options.beforeReplace?.();
    await fs.rename(options.stagingPath, target);
    await syncDirectory(path.dirname(target));
  } catch (error) {
    primaryError = error;
  }
  try {
    const staging = await fs.lstat(options.stagingPath).catch(() => null);
    if (staging) await fs.unlink(options.stagingPath);
  } catch (cleanupError) {
    if (primaryError === undefined) primaryError = cleanupError;
  }
  if (primaryError !== undefined) throw primaryError;
}

export async function writeProjectTransactionFile(
  transaction: ProjectTransaction,
  relativePath: string,
  content: string | Buffer,
  options: ProjectTransactionFileWriteOptions = {},
): Promise<void> {
  const bytes = typeof content === "string" ? Buffer.from(content, "utf-8") : content;
  const contentSha256 = hashContent(bytes);
  const expectedSha256 = options.expectedSha256 ?? contentSha256;
  if (contentSha256 !== expectedSha256) {
    throw new Error(`Transaction content did not match its reviewed bytes: ${relativePath}`);
  }

  const target = await assertSafeTarget(transaction.projectDir, relativePath);
  const observed = await readObservedFileState(target, relativePath);
  if (!transactionOwnsState(transaction, relativePath, observed)) {
    throw new Error(`Transaction target changed before staging: ${relativePath}`);
  }
  const mode =
    options.mode ?? (observed.sha256 === null ? 0o666 & ~process.umask() : observed.mode);
  if (!Number.isInteger(mode) || mode < 0 || mode > 0o7777) {
    throw new Error(`Transaction output mode is invalid: ${relativePath}`);
  }
  const stagingRelativePath = getStagingRelativePath(transaction, relativePath);
  const stagingPath = await assertSafeTarget(transaction.projectDir, stagingRelativePath);
  if (await fs.pathExists(stagingPath)) {
    throw new Error(`Transaction staging path already exists: ${relativePath}`);
  }

  if (
    transaction.writes.has(relativePath) &&
    !stateMatchesExpectation(
      observed,
      filePreimageState(getBoundRecoveryFile(transaction, relativePath)),
    )
  ) {
    recordOutputHistory(transaction, relativePath, observed);
  }
  markProjectTransactionWrite(transaction, relativePath, expectedSha256);
  const outputModes = (transaction.metadata.outputModes ??= Object.create(null) as Record<
    string,
    number
  >);
  setOwn(outputModes, relativePath, mode);
  await journalProjectTransactionWrites(transaction, [relativePath]);
  await replaceFileAtomically(target, bytes, expectedSha256, {
    ...options,
    mode,
    relativePath,
    stagingPath,
    beforeReplace: async () => {
      await assertActiveTransactionLock(transaction);
      const safeTarget = await assertSafeTarget(transaction.projectDir, relativePath);
      const current = await readObservedFileState(safeTarget, relativePath);
      if (safeTarget !== target || !statesMatch(current, observed)) {
        throw new Error(`Transaction target changed while staging: ${relativePath}`);
      }
    },
  });
}

export async function removeProjectTransactionFile(
  transaction: ProjectTransaction,
  relativePath: string,
): Promise<void> {
  const target = await assertSafeTarget(transaction.projectDir, relativePath);
  const observed = await readObservedFileState(target, relativePath);
  if (!transactionOwnsState(transaction, relativePath, observed)) {
    throw new Error(`Transaction target changed before removal: ${relativePath}`);
  }
  if (
    transaction.writes.has(relativePath) &&
    !stateMatchesExpectation(
      observed,
      filePreimageState(getBoundRecoveryFile(transaction, relativePath)),
    )
  ) {
    recordOutputHistory(transaction, relativePath, observed);
  }
  markProjectTransactionWrite(transaction, relativePath, null);
  await journalProjectTransactionWrites(transaction, [relativePath]);

  await assertActiveTransactionLock(transaction);
  const safeTarget = await assertSafeTarget(transaction.projectDir, relativePath);
  const current = await readObservedFileState(safeTarget, relativePath);
  if (safeTarget !== target || !statesMatch(current, observed)) {
    throw new Error(`Transaction target changed while removing: ${relativePath}`);
  }
  if (current.sha256 !== null) {
    await fs.unlink(target);
    await syncDirectory(path.dirname(target));
  }
}

async function restoreFiles(
  transaction: ProjectTransaction,
  files: RecoveryFile[],
  expectedCurrentHashes: Map<string, string | null>,
  expectedCurrentModes: Map<string, number>,
  expectedCurrentHistory: Record<string, RecoveryOutputState[]>,
  beforeMutation?: (relativePath: string) => void | Promise<void>,
): Promise<void> {
  const concurrentChanges: string[] = [];
  const restorations: Array<{
    file: RecoveryFile;
    target: string;
    backup?: Buffer;
    observed: ObservedFileState;
    skip: boolean;
  }> = [];

  for (const file of files) {
    // oxlint-disable-next-line no-await-in-loop -- recovery preflights one bounded path at a time
    const target = await assertSafeTarget(transaction.projectDir, file.path);
    // oxlint-disable-next-line no-await-in-loop -- recovery preflights one bounded path at a time
    const observed = await readObservedFileState(target, file.path);
    let backup: Buffer | undefined;
    if (file.state === "file") {
      const backupPath = await assertSafeRecoveryTarget(
        transaction.projectDir,
        path.join(transaction.recoveryDir, "files", file.path),
      );
      // oxlint-disable-next-line no-await-in-loop -- all backups must pass before any restore begins
      backup = await fs.readFile(backupPath);
      if (hashContent(backup) !== file.sha256) {
        throw new Error(`Recovery backup failed integrity validation: ${file.path}`);
      }
    }

    if (stateMatchesExpectation(observed, filePreimageState(file))) {
      restorations.push({ file, target, backup, observed, skip: true });
      continue;
    }

    const expectedCurrentHash = expectedCurrentHashes.get(file.path);
    const matchesFinalOutput =
      expectedCurrentHashes.has(file.path) &&
      expectedCurrentHash !== UNVERIFIED_WRITE &&
      stateMatchesExpectation(observed, {
        sha256: expectedCurrentHash ?? null,
        ...(expectedCurrentHash !== null && expectedCurrentModes.has(file.path)
          ? { mode: expectedCurrentModes.get(file.path) }
          : {}),
      });
    const matchesIntermediate = (getOwn(expectedCurrentHistory, file.path) ?? []).some((state) =>
      stateMatchesExpectation(observed, state),
    );
    if (!matchesFinalOutput && !matchesIntermediate) {
      concurrentChanges.push(file.path);
      continue;
    }
    restorations.push({ file, target, backup, observed, skip: false });
  }
  if (concurrentChanges.length > 0) {
    throw new Error(
      `Refused to overwrite files changed after the transaction: ${concurrentChanges.join(", ")}`,
    );
  }

  await cleanupTransactionStagingFiles(transaction);

  for (const restoration of restorations) {
    if (restoration.skip) continue;
    if (restoration.file.state === "absent") {
      // oxlint-disable-next-line no-await-in-loop -- every target is revalidated immediately before mutation
      const safeTarget = await assertSafeTarget(transaction.projectDir, restoration.file.path);
      // oxlint-disable-next-line no-await-in-loop
      const current = await readObservedFileState(safeTarget, restoration.file.path);
      if (safeTarget !== restoration.target || !statesMatch(current, restoration.observed)) {
        throw new Error(`Recovery target changed during restoration: ${restoration.file.path}`);
      }
      if (current.sha256 !== null) {
        await beforeMutation?.(restoration.file.path);
        // oxlint-disable-next-line no-await-in-loop -- exact file removal follows complete preflight
        await fs.unlink(restoration.target);
        // oxlint-disable-next-line no-await-in-loop
        await syncDirectory(path.dirname(restoration.target));
      }
      continue;
    }
    if (!restoration.backup) {
      throw new Error(`Recovery backup is unavailable after validation: ${restoration.file.path}`);
    }
    // oxlint-disable-next-line no-await-in-loop -- complete preflight precedes ordered restoration
    const stagingRelativePath = getStagingRelativePath(transaction, restoration.file.path);
    // oxlint-disable-next-line no-await-in-loop -- restoration stages each bounded file separately
    const stagingPath = await assertSafeTarget(transaction.projectDir, stagingRelativePath);
    const mode =
      restoration.file.mode ??
      (restoration.observed.sha256 === null ? 0o666 & ~process.umask() : restoration.observed.mode);
    await replaceFileAtomically(restoration.target, restoration.backup, restoration.file.sha256, {
      mode,
      relativePath: restoration.file.path,
      stagingPath,
      beforeReplace: async () => {
        const safeTarget = await assertSafeTarget(transaction.projectDir, restoration.file.path);
        const current = await readObservedFileState(safeTarget, restoration.file.path);
        if (safeTarget !== restoration.target || !statesMatch(current, restoration.observed)) {
          throw new Error(`Recovery target changed during restoration: ${restoration.file.path}`);
        }
        await beforeMutation?.(restoration.file.path);
      },
    });
  }
}

async function ensureTransactionStagingFiles(transaction: ProjectTransaction): Promise<void> {
  if (transaction.metadata.stagingFiles !== undefined) return;
  const stagingFiles = Object.fromEntries(
    transaction.metadata.files.map((file) => [
      file.path,
      transactionStagingPath(file.path, transaction.id),
    ]),
  );
  for (const stagingRelativePath of Object.values(stagingFiles)) {
    // oxlint-disable-next-line no-await-in-loop -- legacy points reserve one recovery stage at a time
    const stagingPath = await assertSafeTarget(transaction.projectDir, stagingRelativePath);
    // oxlint-disable-next-line no-await-in-loop
    if (await fs.pathExists(stagingPath)) {
      throw new Error(`Recovery staging path already exists: ${stagingRelativePath}`);
    }
  }
  transaction.metadata.stagingFiles = stagingFiles;
  await writeMetadata(transaction);
}

async function cleanupTransactionStagingFiles(transaction: ProjectTransaction): Promise<void> {
  for (const [relativePath, stagingRelativePath] of Object.entries(
    transaction.metadata.stagingFiles ?? {},
  )) {
    // oxlint-disable-next-line no-await-in-loop -- cleanup is limited to journaled sibling paths
    const stagingPath = await assertSafeTarget(transaction.projectDir, stagingRelativePath);
    // oxlint-disable-next-line no-await-in-loop
    const stats = await fs.lstat(stagingPath).catch(() => null);
    if (!stats) continue;
    if (!stats.isFile() || stats.isSymbolicLink()) {
      throw new Error(`Transaction staging output is not a regular file: ${relativePath}`);
    }
    // oxlint-disable-next-line no-await-in-loop -- exact unlink cannot recurse into changed targets
    await fs.unlink(stagingPath);
    // oxlint-disable-next-line no-await-in-loop
    await syncDirectory(path.dirname(stagingPath));
  }
}

async function validateFinalWrites(
  transaction: ProjectTransaction,
): Promise<Record<string, number>> {
  const modes = Object.create(null) as Record<string, number>;
  for (const [relativePath, expectedSha256] of transaction.writes) {
    if (expectedSha256 === UNVERIFIED_WRITE) {
      throw new Error(`Transaction output was not verified: ${relativePath}`);
    }
    // oxlint-disable-next-line no-await-in-loop -- each journaled output is checked before commit
    const target = await assertSafeTarget(transaction.projectDir, relativePath);
    // oxlint-disable-next-line no-await-in-loop
    const observed = await readObservedFileState(target, relativePath);
    if (expectedSha256 === null) {
      if (observed.sha256 !== null) {
        throw new Error(`Transaction output changed before commit: ${relativePath}`);
      }
      continue;
    }
    const expectedMode = getOwn(transaction.metadata.outputModes, relativePath);
    if (
      expectedMode === undefined ||
      observed.sha256 !== expectedSha256 ||
      observed.mode !== expectedMode
    ) {
      throw new Error(`Transaction output changed before commit: ${relativePath}`);
    }
    setOwn(modes, relativePath, observed.mode);
  }
  for (const [relativePath, stagingRelativePath] of Object.entries(
    transaction.metadata.stagingFiles ?? {},
  )) {
    // oxlint-disable-next-line no-await-in-loop -- a committed transaction cannot retain a stage
    const stagingPath = await assertSafeTarget(transaction.projectDir, stagingRelativePath);
    // oxlint-disable-next-line no-await-in-loop
    if (await fs.pathExists(stagingPath)) {
      throw new Error(`Transaction staging output remains before commit: ${relativePath}`);
    }
  }
  return modes;
}

export async function commitProjectTransaction(transaction: ProjectTransaction): Promise<void> {
  await assertActiveTransactionLock(transaction);
  transaction.metadata.outputs = Object.fromEntries(transaction.writes);
  transaction.metadata.outputModes = await validateFinalWrites(transaction);
  transaction.metadata.status = "applied";
  transaction.metadata.completedAt = new Date().toISOString();
  await writeMetadata(transaction);
  if (!transaction.lock)
    throw new Error("The lifecycle transaction has no project lock ownership.");
  transaction.lock = await releaseActiveTransactionLock(transaction.projectDir, transaction.lock);
}

export async function rollbackProjectTransaction(transaction: ProjectTransaction): Promise<void> {
  let rolledBackMetadataDurable = false;
  try {
    await assertActiveTransactionLock(transaction);
    const writtenFiles = transaction.metadata.files.filter((file) =>
      transaction.writes.has(file.path),
    );
    await ensureTransactionStagingFiles(transaction);
    await restoreFiles(
      transaction,
      writtenFiles,
      transaction.writes,
      new Map(Object.entries(transaction.metadata.outputModes ?? {})),
      transaction.metadata.outputHistory ?? {},
    );
    transaction.metadata.status = "rolled-back";
    transaction.metadata.completedAt = new Date().toISOString();
    await writeMetadata(transaction);
    rolledBackMetadataDurable = true;
    if (!transaction.lock) {
      throw new Error("The lifecycle transaction has no project lock ownership.");
    }
    transaction.lock = await releaseActiveTransactionLock(transaction.projectDir, transaction.lock);
  } catch (error) {
    if (transaction.lock && transaction.lock.phase !== "released") {
      try {
        transaction.lock = await transitionActiveTransactionLock(
          transaction.projectDir,
          transaction.lock,
          rolledBackMetadataDurable ? "released" : "recovery-required",
        );
      } catch (lockError) {
        throw combineLifecycleErrors(error, lockError);
      }
    }
    throw error;
  }
}

function validateRecoveryMetadata(value: unknown, expectedId: string): RecoveryMetadata {
  if (!isRecord(value)) {
    throw new Error("Recovery metadata is malformed.");
  }
  const metadata = value as Partial<RecoveryMetadata>;
  const isCurrentWriteFormat = metadata.writeFormat === RECOVERY_WRITE_FORMAT;
  if (
    metadata.version !== RECOVERY_VERSION ||
    (metadata.writeFormat !== undefined && !isCurrentWriteFormat) ||
    metadata.id !== expectedId ||
    !Array.isArray(metadata.files) ||
    metadata.files.length > 10_000 ||
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
    (metadata.completedAt !== undefined && typeof metadata.completedAt !== "string") ||
    !["pending", "applied", "rolled-back", "recovered"].includes(metadata.status ?? "")
  ) {
    throw new Error("Recovery metadata is malformed.");
  }

  if (
    isCurrentWriteFormat &&
    Object.keys(value).some(
      (key) =>
        ![
          "version",
          "writeFormat",
          "id",
          "operation",
          "createdAt",
          "completedAt",
          "status",
          "files",
          "outputs",
          "outputModes",
          "outputHistory",
          "stagingFiles",
        ].includes(key),
    )
  ) {
    throw new Error("Recovery metadata contains an unknown field.");
  }
  if (metadata.outputs !== undefined) {
    if (
      !isRecord(metadata.outputs) ||
      Object.entries(metadata.outputs).some(
        ([outputPath, hash]) =>
          !(isCurrentWriteFormat
            ? isCanonicalProjectPath(outputPath)
            : isPortableProjectPath(outputPath)) ||
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
      !isRecord(metadata.outputModes) ||
      Object.entries(metadata.outputModes).some(
        ([outputPath, mode]) =>
          !(isCurrentWriteFormat
            ? isCanonicalProjectPath(outputPath)
            : isPortableProjectPath(outputPath)) || !isValidMode(mode),
      )
    ) {
      throw new Error("Recovery metadata contains an invalid output mode entry.");
    }
  }
  if (metadata.outputHistory !== undefined) {
    if (
      !isRecord(metadata.outputHistory) ||
      Object.entries(metadata.outputHistory).some(([outputPath, states]) => {
        if (
          !(isCurrentWriteFormat
            ? isCanonicalProjectPath(outputPath)
            : isPortableProjectPath(outputPath)) ||
          !Array.isArray(states) ||
          states.length === 0 ||
          states.length > 64
        ) {
          return true;
        }
        const seen = new Set<string>();
        return states.some((state) => {
          if (
            !isRecord(state) ||
            Object.keys(state).some((key) => key !== "sha256" && key !== "mode")
          ) {
            return true;
          }
          const sha256 = state.sha256;
          const mode = state.mode;
          const validAbsent = sha256 === null && mode === undefined;
          const validFile =
            typeof sha256 === "string" && /^[0-9a-f]{64}$/.test(sha256) && isValidMode(mode);
          if (!validAbsent && !validFile) return true;
          const key = `${sha256 ?? "absent"}:${mode ?? ""}`;
          if (seen.has(key)) return true;
          seen.add(key);
          return false;
        });
      })
    ) {
      throw new Error("Recovery metadata contains an invalid output history entry.");
    }
  }
  if (metadata.stagingFiles !== undefined) {
    if (
      !isRecord(metadata.stagingFiles) ||
      Object.entries(metadata.stagingFiles).some(
        ([outputPath, stagingPath]) =>
          !(isCurrentWriteFormat
            ? isCanonicalProjectPath(outputPath)
            : isPortableProjectPath(outputPath)) ||
          typeof stagingPath !== "string" ||
          !isCanonicalProjectPath(stagingPath) ||
          stagingPath !== transactionStagingPath(outputPath, expectedId),
      )
    ) {
      throw new Error("Recovery metadata contains an invalid staging file entry.");
    }
  }
  const filePaths = new Set<string>();
  const normalizedFilePaths = new Set<string>();
  for (const file of metadata.files) {
    if (
      !isRecord(file) ||
      typeof file.path !== "string" ||
      !(isCurrentWriteFormat
        ? isCanonicalProjectPath(file.path)
        : isPortableProjectPath(file.path)) ||
      (file.state !== "absent" && file.state !== "file") ||
      (file.state === "file" &&
        (typeof file.sha256 !== "string" ||
          !/^[0-9a-f]{64}$/.test(file.sha256) ||
          (isCurrentWriteFormat
            ? !isValidMode(file.mode)
            : file.mode !== undefined && !isValidMode(file.mode)))) ||
      (file.state === "absent" && ("sha256" in file || "mode" in file)) ||
      (isCurrentWriteFormat &&
        Object.keys(file).some((key) =>
          file.state === "file"
            ? !["path", "state", "sha256", "mode"].includes(key)
            : !["path", "state"].includes(key),
        ))
    ) {
      throw new Error("Recovery metadata contains an invalid file entry.");
    }
    const normalizedPath = file.path.replaceAll("\\", "/");
    if (filePaths.has(file.path) || normalizedFilePaths.has(normalizedPath)) {
      throw new Error("Recovery metadata contains duplicate file entries.");
    }
    filePaths.add(file.path);
    normalizedFilePaths.add(normalizedPath);
  }

  const outputs = metadata.outputs ?? {};
  const outputModes = metadata.outputModes ?? {};
  const outputHistory = metadata.outputHistory ?? {};
  const stagingFiles = metadata.stagingFiles ?? {};
  if (
    Object.keys(outputs).some((outputPath) => !filePaths.has(outputPath)) ||
    Object.keys(outputModes).some(
      (outputPath) => !filePaths.has(outputPath) || !hasOwn(outputs, outputPath),
    ) ||
    Object.keys(outputHistory).some(
      (outputPath) => !filePaths.has(outputPath) || !hasOwn(outputs, outputPath),
    ) ||
    Object.keys(stagingFiles).some((outputPath) => !filePaths.has(outputPath))
  ) {
    throw new Error("Recovery metadata contains an output that is not bound to a file snapshot.");
  }

  if (
    isCurrentWriteFormat &&
    Object.entries(outputs).some(([outputPath, output]) => {
      const mode = getOwn(metadata.outputModes, outputPath);
      return output === UNVERIFIED_WRITE
        ? mode !== undefined
        : output === null
          ? mode !== undefined
          : mode === undefined;
    })
  ) {
    throw new Error("Recovery metadata contains an output without an exact mode.");
  }

  if (metadata.stagingFiles !== undefined) {
    const stagingPaths = Object.values(metadata.stagingFiles);
    if (
      Object.keys(metadata.stagingFiles).length !== filePaths.size ||
      [...filePaths].some((filePath) => !hasOwn(metadata.stagingFiles ?? {}, filePath)) ||
      new Set(stagingPaths).size !== stagingPaths.length ||
      stagingPaths.some((stagingPath) => filePaths.has(stagingPath))
    ) {
      throw new Error("Recovery metadata staging files do not match the file snapshots.");
    }
  } else if (isCurrentWriteFormat) {
    throw new Error("Recovery metadata is missing its staging files.");
  }
  return metadata as RecoveryMetadata;
}

async function loadProjectRecoveryPoint(
  projectDirInput: string,
  transactionId: string,
): Promise<ProjectTransaction> {
  const projectDir = await fs.realpath(path.resolve(projectDirInput));
  const recoveryDir = recoveryPath(projectDir, transactionId);
  const metadataPath = await assertSafeRecoveryTarget(
    projectDir,
    path.join(recoveryDir, RECOVERY_METADATA_FILE),
  );
  const metadataStats = await fs.lstat(metadataPath).catch(() => null);
  if (!metadataStats?.isFile() || metadataStats.isSymbolicLink()) {
    throw new Error("Recovery metadata is missing or is not a regular file.");
  }
  const metadata = validateRecoveryMetadata(await fs.readJson(metadataPath), transactionId);
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
    // oxlint-disable-next-line no-await-in-loop -- backup ancestors must remain inside recovery
    const safeBackupPath = await assertSafeRecoveryTarget(transaction.projectDir, backupPath).catch(
      (error) => {
        errors.push(error instanceof Error ? error.message : String(error));
        return null;
      },
    );
    if (!safeBackupPath) continue;
    // oxlint-disable-next-line no-await-in-loop -- every declared backup receives an integrity check
    const stats = await fs.lstat(safeBackupPath).catch(() => null);
    if (file.state === "absent") {
      if (stats) errors.push(`Unexpected backup exists for absent preimage: ${file.path}`);
      continue;
    }
    if (!stats?.isFile() || stats.isSymbolicLink()) {
      errors.push(`Recovery backup is missing or is not a regular file: ${file.path}`);
      continue;
    }
    // oxlint-disable-next-line no-await-in-loop -- hash each bounded backup before reporting validity
    const backup = await fs.readFile(safeBackupPath);
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
  const outputHistory = transaction.metadata.outputHistory ?? {};
  for (const file of transaction.metadata.files) {
    // oxlint-disable-next-line no-await-in-loop -- inspect every bounded restore target without writing
    const target = await assertSafeTarget(transaction.projectDir, file.path).catch((error) => {
      errors.push(error instanceof Error ? error.message : String(error));
      return null;
    });
    if (!target) continue;
    const observed = await readObservedFileState(target, file.path).catch((error) => {
      errors.push(error instanceof Error ? error.message : String(error));
      return null;
    });
    if (!observed) continue;
    if (stateMatchesExpectation(observed, filePreimageState(file))) continue;

    const expectedHash = getOwn(outputs, file.path);
    const matchesFinalOutput =
      hasOwn(outputs, file.path) &&
      expectedHash !== UNVERIFIED_WRITE &&
      stateMatchesExpectation(observed, {
        sha256: expectedHash ?? null,
        ...(expectedHash !== null && getOwn(outputModes, file.path) !== undefined
          ? { mode: getOwn(outputModes, file.path) }
          : {}),
      });
    const matchesIntermediate = (getOwn(outputHistory, file.path) ?? []).some((state) =>
      stateMatchesExpectation(observed, state),
    );
    if (!matchesFinalOutput && !matchesIntermediate) {
      errors.push(`Recovery target changed after the transaction: ${file.path}`);
    }
  }
  for (const [relativePath, stagingRelativePath] of Object.entries(
    transaction.metadata.stagingFiles ?? {},
  )) {
    // oxlint-disable-next-line no-await-in-loop -- verification remains read-only for every stage
    const stagingPath = await assertSafeTarget(transaction.projectDir, stagingRelativePath).catch(
      (error) => {
        errors.push(error instanceof Error ? error.message : String(error));
        return null;
      },
    );
    if (!stagingPath) continue;
    // oxlint-disable-next-line no-await-in-loop
    const stats = await fs.lstat(stagingPath).catch(() => null);
    if (stats && (!stats.isFile() || stats.isSymbolicLink())) {
      errors.push(`Transaction staging output is not a regular file: ${relativePath}`);
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
    if (
      entry.name === ACTIVE_TRANSACTION_LOCK_FILE ||
      entry.name.startsWith(`${ACTIVE_TRANSACTION_LOCK_FILE}.`)
    ) {
      continue;
    }
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
  const pruneLockId = options.apply ? randomUUID() : null;
  let pruneLock: ActiveTransactionLockState | null = null;
  if (pruneLockId) pruneLock = await acquireActiveTransactionLock(projectDir, pruneLockId);
  try {
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
  } finally {
    if (pruneLock) await releaseActiveTransactionLock(projectDir, pruneLock);
  }
}

export async function recoverProjectTransaction(
  projectDirInput: string,
  transactionId: string,
  options: {
    beforeRestoreMutation?: (relativePath: string) => void | Promise<void>;
  } = {},
): Promise<RecoveryMetadata> {
  const loaded = await loadProjectRecoveryPoint(projectDirInput, transactionId);
  const { projectDir } = loaded;
  if (loaded.metadata.status !== "applied" && loaded.metadata.status !== "pending") {
    throw new Error(
      `Recovery transaction ${transactionId} is ${loaded.metadata.status}, not applied or interrupted.`,
    );
  }
  const recoveryLock = await acquireRecoveryTransactionLock(projectDir, transactionId);
  let transaction: ProjectTransaction | null = null;
  let startingStatus = loaded.metadata.status;
  let mutationStarted = false;
  let recoveredMetadataDurable = false;
  let releaseOnFailure = false;
  try {
    const current = await loadProjectRecoveryPoint(projectDir, transactionId);
    if (current.metadata.status !== "applied" && current.metadata.status !== "pending") {
      releaseOnFailure = true;
      throw new Error(
        `Recovery transaction ${transactionId} is ${current.metadata.status}, not applied or interrupted.`,
      );
    }
    startingStatus = current.metadata.status;
    const activeTransaction = { ...current, lock: recoveryLock };
    transaction = activeTransaction;
    const recordedOutputs = activeTransaction.metadata.outputs ?? {};
    const expectedCurrentHashes = new Map(
      activeTransaction.metadata.files.map((file) => [
        file.path,
        hasOwn(recordedOutputs, file.path)
          ? recordedOutputs[file.path]
          : file.state === "file"
            ? file.sha256
            : null,
      ]),
    );
    await assertActiveTransactionLock(activeTransaction);
    await ensureTransactionStagingFiles(activeTransaction);
    await restoreFiles(
      activeTransaction,
      activeTransaction.metadata.files,
      expectedCurrentHashes,
      new Map(Object.entries(activeTransaction.metadata.outputModes ?? {})),
      activeTransaction.metadata.outputHistory ?? {},
      async (relativePath) => {
        await options.beforeRestoreMutation?.(relativePath);
        await assertActiveTransactionLock(activeTransaction);
        mutationStarted = true;
      },
    );
    await assertActiveTransactionLock(activeTransaction);
    activeTransaction.metadata.status = "recovered";
    activeTransaction.metadata.completedAt = new Date().toISOString();
    await writeMetadata(activeTransaction);
    recoveredMetadataDurable = true;
    activeTransaction.lock = await releaseActiveTransactionLock(projectDir, activeTransaction.lock);
    return activeTransaction.metadata;
  } catch (error) {
    const currentLock = transaction?.lock ?? recoveryLock;
    if (currentLock.phase !== "released") {
      const phase =
        releaseOnFailure ||
        recoveredMetadataDurable ||
        (startingStatus === "applied" && !mutationStarted)
          ? "released"
          : "recovery-required";
      try {
        const transitioned = await transitionActiveTransactionLock(projectDir, currentLock, phase);
        if (transaction) transaction.lock = transitioned;
      } catch (lockError) {
        throw combineLifecycleErrors(error, lockError);
      }
    }
    throw error;
  }
}
