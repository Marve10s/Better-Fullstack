import { execa } from "execa";
import * as JSONC from "jsonc-parser";
import { createHash, randomUUID } from "node:crypto";
import { constants, existsSync } from "node:fs";
import {
  access,
  copyFile,
  lstat,
  mkdir,
  readFile,
  readdir,
  realpath,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import { homedir } from "node:os";
import { delimiter, dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const INSTALL_AGENT_IDS = [
  "claude",
  "codex",
  "gemini",
  "opencode",
  "cursor",
  "windsurf",
  "zed",
] as const;

export const INSTALL_AGENT_INPUT_IDS = [...INSTALL_AGENT_IDS, "claude-code", "gemini-cli"] as const;

export type InstallAgentId = (typeof INSTALL_AGENT_IDS)[number];
export type InstallAgentInputId = (typeof INSTALL_AGENT_INPUT_IDS)[number];
export type InstallOnly = "mcp" | "skills";

export interface InstallCommandInput {
  only?: InstallOnly;
  agents?: InstallAgentInputId[];
  dryRun?: boolean;
  uninstall?: boolean;
}

export type InstallTargetStatus =
  | "installed"
  | "uninstalled"
  | "unchanged"
  | "planned"
  | "failed"
  | "cancelled";

export interface InstallOperation {
  type: "backup" | "command" | "write" | "remove";
  value: string;
}

export interface InstallTargetReceipt {
  id: string;
  name: string;
  capability: "mcp" | "skill" | "state" | "selection";
  status: InstallTargetStatus;
  changed: boolean;
  detected?: boolean;
  path?: string;
  backupPath?: string;
  command?: string[];
  message: string;
  operations: InstallOperation[];
}

export interface InstallReceipt {
  schemaVersion: 1;
  command: "install";
  action: "install" | "uninstall";
  dryRun: boolean;
  success: boolean;
  selection: {
    only: InstallOnly | "all";
    agents: InstallAgentId[];
  };
  targets: InstallTargetReceipt[];
  summary: {
    requested: number;
    changed: number;
    unchanged: number;
    failed: number;
  };
  tryPrompt: string;
}

interface DetectedAgent {
  id: InstallAgentId;
  name: string;
  detected: boolean;
  binaryPath?: string;
}

interface OwnedCommandTarget {
  kind: "command";
  agent: InstallAgentId;
  signature: string[];
}

interface OwnedJsonTarget {
  kind: "json";
  agent: InstallAgentId;
  path: string;
  parentKey: string;
  createdFile: boolean;
  createdParent: boolean;
  valueHash: string;
}

interface OwnedSkillTarget {
  kind: "skill";
  path: string;
  contentHash: string;
}

type OwnedTarget = OwnedCommandTarget | OwnedJsonTarget | OwnedSkillTarget;

interface InstallState {
  schemaVersion: 1;
  targets: Record<string, OwnedTarget>;
}

interface CommandDefinition {
  id: "claude" | "codex" | "gemini";
  name: string;
  configPath: (homeDir: string) => string;
  configFormat: "json" | "toml";
  addArgs: string[];
  removeArgs: string[];
}

interface JsonDefinition {
  id: "opencode" | "cursor" | "windsurf" | "zed";
  name: string;
  path: (environment: ResolvedInstallEnvironment) => string;
  parentKey: string;
  value: Record<string, unknown>;
}

interface SkillDefinition {
  id: "scaffold-project" | "add-to-project";
  installedName: string;
}

export interface InstallEnvironmentOverrides {
  homeDir?: string;
  path?: string;
  platform?: NodeJS.Platform;
  moduleDir?: string;
  now?: () => Date;
  stdinIsTTY?: boolean;
  skillSourceDir?: string;
  runCommand?: (command: string, args: string[]) => Promise<void>;
  confirm?: (summary: string) => Promise<boolean>;
}

interface ResolvedInstallEnvironment {
  homeDir: string;
  path: string;
  platform: NodeJS.Platform;
  now: () => Date;
  stdinIsTTY: boolean;
  skillSourceDir: string;
  runCommand: (command: string, args: string[]) => Promise<void>;
  confirm?: (summary: string) => Promise<boolean>;
}

const MCP_COMMAND = ["npx", "-y", "create-better-fullstack@latest", "mcp"] as const;
const STATE_RELATIVE_PATH = ".config/better-fullstack/install-state.json";
const TRY_PROMPT = "Create a Better Fullstack app with Next.js, Hono, and PostgreSQL.";

const COMMAND_DEFINITIONS: readonly CommandDefinition[] = [
  {
    id: "claude",
    name: "Claude Code",
    configPath: (homeDir) => join(homeDir, ".claude.json"),
    configFormat: "json",
    addArgs: ["mcp", "add", "--scope", "user", "better-fullstack", "--", ...MCP_COMMAND],
    removeArgs: ["mcp", "remove", "--scope", "user", "better-fullstack"],
  },
  {
    id: "codex",
    name: "Codex CLI",
    configPath: (homeDir) => join(homeDir, ".codex", "config.toml"),
    configFormat: "toml",
    addArgs: ["mcp", "add", "better-fullstack", "--", ...MCP_COMMAND],
    removeArgs: ["mcp", "remove", "better-fullstack"],
  },
  {
    id: "gemini",
    name: "Gemini CLI",
    configPath: (homeDir) => join(homeDir, ".gemini", "settings.json"),
    configFormat: "json",
    addArgs: ["mcp", "add", "--scope", "user", "better-fullstack", ...MCP_COMMAND],
    removeArgs: ["mcp", "remove", "--scope", "user", "better-fullstack"],
  },
] as const;

const JSON_DEFINITIONS: readonly JsonDefinition[] = [
  {
    id: "opencode",
    name: "OpenCode",
    path: ({ homeDir }) => join(homeDir, ".config", "opencode", "opencode.json"),
    parentKey: "mcp",
    value: {
      type: "local",
      command: [...MCP_COMMAND],
      enabled: true,
    },
  },
  {
    id: "cursor",
    name: "Cursor",
    path: ({ homeDir }) => join(homeDir, ".cursor", "mcp.json"),
    parentKey: "mcpServers",
    value: {
      command: "npx",
      args: MCP_COMMAND.slice(1),
    },
  },
  {
    id: "windsurf",
    name: "Windsurf",
    path: ({ homeDir }) => join(homeDir, ".codeium", "windsurf", "mcp_config.json"),
    parentKey: "mcpServers",
    value: {
      command: "npx",
      args: MCP_COMMAND.slice(1),
    },
  },
  {
    id: "zed",
    name: "Zed",
    path: zedSettingsPath,
    parentKey: "context_servers",
    value: {
      command: "npx",
      args: MCP_COMMAND.slice(1),
    },
  },
] as const;

const SKILL_DEFINITIONS: readonly SkillDefinition[] = [
  { id: "scaffold-project", installedName: "better-fullstack-scaffold-project" },
  { id: "add-to-project", installedName: "better-fullstack-add-to-project" },
] as const;

const SKILL_AGENT_IDS = new Set<InstallAgentId>(["claude", "codex", "opencode", "cursor"]);

function normalizeAgentId(id: InstallAgentInputId): InstallAgentId {
  if (id === "claude-code") return "claude";
  if (id === "gemini-cli") return "gemini";
  return id;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hashesEqual(left: unknown, right: unknown): boolean {
  return hashValue(left) === hashValue(right);
}

function hashValue(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await lstat(path);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw error;
  }
}

function isWithin(parent: string, child: string): boolean {
  const pathFromParent = relative(parent, child);
  return pathFromParent === "" || (!pathFromParent.startsWith("..") && !isAbsolute(pathFromParent));
}

async function assertWritePathInHome(homeDir: string, targetPath: string): Promise<void> {
  const lexicalHome = resolve(homeDir);
  const lexicalTarget = resolve(targetPath);
  if (!isWithin(lexicalHome, lexicalTarget)) {
    throw new Error("Refusing to write outside the configured home directory.");
  }

  const realHome = await realpath(lexicalHome);
  let existingAncestor = lexicalTarget;
  const missingParts: string[] = [];
  while (!(await pathExists(existingAncestor))) {
    missingParts.unshift(existingAncestor.slice(dirname(existingAncestor).length + 1));
    existingAncestor = dirname(existingAncestor);
  }
  const resolvedAncestor = await realpath(existingAncestor);
  const projectedTarget = resolve(resolvedAncestor, ...missingParts);
  if (!isWithin(realHome, projectedTarget)) {
    throw new Error("Refusing to follow a config path outside the configured home directory.");
  }
}

async function findExecutable(name: string, searchPath: string, platform: NodeJS.Platform) {
  const extensions = platform === "win32" ? [".exe", ".cmd", ".bat", ""] : [""];
  for (const directory of searchPath.split(delimiter).filter(Boolean)) {
    for (const extension of extensions) {
      const candidate = join(directory, `${name}${extension}`);
      try {
        await access(candidate, platform === "win32" ? constants.F_OK : constants.X_OK);
        if ((await stat(candidate)).isFile()) return candidate;
      } catch {
        // Continue searching PATH.
      }
    }
  }
  return undefined;
}

function zedSettingsPath(environment: ResolvedInstallEnvironment): string {
  const legacyOrLinuxPath = join(environment.homeDir, ".config", "zed", "settings.json");
  const macPath = join(environment.homeDir, ".zed", "settings.json");
  if (environment.platform === "darwin") {
    if (existsSync(macPath) || !existsSync(legacyOrLinuxPath)) return macPath;
  }
  return legacyOrLinuxPath;
}

async function anyPathExists(paths: string[]) {
  for (const path of paths) {
    if (await pathExists(path)) return true;
  }
  return false;
}

export async function detectInstallAgents(
  overrides: Pick<InstallEnvironmentOverrides, "homeDir" | "path" | "platform"> = {},
): Promise<DetectedAgent[]> {
  const homeDir = resolve(overrides.homeDir ?? homedir());
  const searchPath = overrides.path ?? process.env.PATH ?? "";
  const platform = overrides.platform ?? process.platform;
  const binaries = await Promise.all(
    ["claude", "codex", "gemini", "opencode", "cursor", "windsurf", "zed"].map((name) =>
      findExecutable(name, searchPath, platform),
    ),
  );
  const [claude, codex, gemini, opencode, cursor, windsurf, zed] = binaries;
  const applications =
    platform === "darwin" ? ["/Applications", join(homeDir, "Applications")] : [];

  return [
    { id: "claude", name: "Claude Code", detected: Boolean(claude), binaryPath: claude },
    { id: "codex", name: "Codex CLI", detected: Boolean(codex), binaryPath: codex },
    { id: "gemini", name: "Gemini CLI", detected: Boolean(gemini), binaryPath: gemini },
    {
      id: "opencode",
      name: "OpenCode",
      detected:
        Boolean(opencode) ||
        (await pathExists(join(homeDir, ".config", "opencode", "opencode.json"))),
      binaryPath: opencode,
    },
    {
      id: "cursor",
      name: "Cursor",
      detected:
        Boolean(cursor) ||
        (await anyPathExists([
          join(homeDir, ".cursor"),
          ...applications.map((directory) => join(directory, "Cursor.app")),
        ])),
      binaryPath: cursor,
    },
    {
      id: "windsurf",
      name: "Windsurf",
      detected:
        Boolean(windsurf) ||
        (await anyPathExists([
          join(homeDir, ".codeium", "windsurf"),
          ...applications.map((directory) => join(directory, "Windsurf.app")),
        ])),
      binaryPath: windsurf,
    },
    {
      id: "zed",
      name: "Zed",
      detected:
        Boolean(zed) ||
        (await anyPathExists([
          join(homeDir, ".zed"),
          join(homeDir, ".config", "zed"),
          ...applications.map((directory) => join(directory, "Zed.app")),
        ])),
      binaryPath: zed,
    },
  ];
}

function defaultSkillSourceDir(
  moduleDirectory = dirname(fileURLToPath(import.meta.url)),
) {
  const bundled = join(moduleDirectory, "skills");
  const repository = resolve(moduleDirectory, "../../../../../plugin/skills");
  return { bundled, repository };
}

async function resolveEnvironment(
  overrides: InstallEnvironmentOverrides,
): Promise<ResolvedInstallEnvironment> {
  const homeDir = resolve(overrides.homeDir ?? homedir());
  const sourceCandidates = defaultSkillSourceDir(overrides.moduleDir);
  const skillSourceDir = overrides.skillSourceDir
    ? resolve(overrides.skillSourceDir)
    : (await pathExists(sourceCandidates.bundled))
      ? sourceCandidates.bundled
      : sourceCandidates.repository;

  return {
    homeDir,
    path: overrides.path ?? process.env.PATH ?? "",
    platform: overrides.platform ?? process.platform,
    now: overrides.now ?? (() => new Date()),
    stdinIsTTY: overrides.stdinIsTTY ?? Boolean(process.stdin.isTTY),
    skillSourceDir,
    runCommand:
      overrides.runCommand ??
      (async (command, args) => {
        await execa(command, args, { stdin: "ignore" });
      }),
    confirm: overrides.confirm,
  };
}

function statePath(environment: ResolvedInstallEnvironment) {
  return join(environment.homeDir, STATE_RELATIVE_PATH);
}

function relativeToHome(environment: ResolvedInstallEnvironment, path: string) {
  return relative(environment.homeDir, path);
}

async function readState(environment: ResolvedInstallEnvironment): Promise<InstallState> {
  const path = statePath(environment);
  if (!(await pathExists(path))) return { schemaVersion: 1, targets: {} };
  await assertWritePathInHome(environment.homeDir, path);
  let parsed: unknown;
  try {
    parsed = JSON.parse(await readFile(path, "utf8"));
  } catch {
    throw new Error(`The Better Fullstack install receipt is not valid JSON: ${path}`);
  }
  if (!isRecord(parsed) || parsed.schemaVersion !== 1 || !isRecord(parsed.targets)) {
    throw new Error(`The Better Fullstack install receipt has an unsupported shape: ${path}`);
  }
  return parsed as unknown as InstallState;
}

function stateIsEmpty(state: InstallState) {
  return Object.keys(state.targets).length === 0;
}

async function writeState(environment: ResolvedInstallEnvironment, state: InstallState) {
  const path = statePath(environment);
  await assertWritePathInHome(environment.homeDir, path);
  if (stateIsEmpty(state)) {
    if (await pathExists(path)) await rm(path);
    return;
  }
  await mkdir(dirname(path), { recursive: true });
  const temporaryPath = `${path}.tmp`;
  await assertWritePathInHome(environment.homeDir, temporaryPath);
  await writeFile(temporaryPath, `${JSON.stringify(state, null, 2)}\n`, { mode: 0o600 });
  await rename(temporaryPath, path);
}

async function preflightStateWrite(environment: ResolvedInstallEnvironment) {
  const path = statePath(environment);
  await assertWritePathInHome(environment.homeDir, path);
  const directory = dirname(path);
  await mkdir(directory, { recursive: true });
  const temporaryPath = join(directory, `.install-state-preflight-${randomUUID()}.tmp`);
  await assertWritePathInHome(environment.homeDir, temporaryPath);
  let created = false;
  try {
    await writeFile(temporaryPath, "", { flag: "wx", mode: 0o600 });
    created = true;
  } finally {
    if (created) await rm(temporaryPath);
  }
}

function timestampSuffix(date: Date) {
  return date.toISOString().replaceAll(":", "-");
}

async function backupPath(path: string, environment: ResolvedInstallEnvironment) {
  const base = `${path}.better-fullstack-backup-${timestampSuffix(environment.now())}`;
  let candidate = base;
  let suffix = 2;
  while (await pathExists(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

async function validateJsonFile(path: string) {
  if (!(await pathExists(path))) return;
  try {
    parseConfigObject(await readFile(path, "utf8"), path);
  } catch {
    throw new Error(`Config is not valid JSON; left it unchanged: ${path}`);
  }
}

type CommandConfigEntryState = "matching" | "missing" | "modified";

function managedCommandMatches(value: unknown) {
  if (!isRecord(value) || value.command !== MCP_COMMAND[0] || !Array.isArray(value.args)) {
    return false;
  }
  return hashesEqual(value.args, MCP_COMMAND.slice(1));
}

function parseTomlString(value: string) {
  if (value.startsWith("'")) return value.slice(1, -1);
  try {
    const parsed: unknown = JSON.parse(value);
    return typeof parsed === "string" ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function parseTomlStringArray(value: string) {
  const inner = value.slice(1, -1);
  const tokens = [...inner.matchAll(/"(?:\\.|[^"\\])*"|'[^']*'/g)];
  const remainder = inner
    .replace(/"(?:\\.|[^"\\])*"|'[^']*'/g, "")
    .replace(/#[^\r\n]*/g, "");
  if (!/^[\s,]*$/.test(remainder)) return undefined;
  const parsed = tokens.map((token) => parseTomlString(token[0]));
  return parsed.every((item): item is string => item !== undefined) ? parsed : undefined;
}

function codexConfigEntryState(content: string): CommandConfigEntryState {
  const header = /^[ \t]*\[[ \t]*mcp_servers[ \t]*\.[ \t]*(?:better-fullstack|"better-fullstack"|'better-fullstack')[ \t]*\][ \t]*(?:#.*)?\r?$/gm.exec(
    content,
  );
  if (!header) return "missing";
  const following = content.slice(header.index + header[0].length);
  const nextHeader = /^[ \t]*\[{1,2}[^\r\n]+/m.exec(following);
  const body = following.slice(0, nextHeader?.index);
  const commandMatches = [
    ...body.matchAll(
      /^[ \t]*command[ \t]*=[ \t]*("(?:\\.|[^"\\])*"|'[^']*')[ \t]*(?:#.*)?\r?$/gm,
    ),
  ];
  const argsMatches = [
    ...body.matchAll(
      /^[ \t]*args[ \t]*=[ \t]*(\[(?:[^\]"']|"(?:\\.|[^"\\])*"|'[^']*')*\])[ \t]*(?:#.*)?\r?$/gm,
    ),
  ];
  if (commandMatches.length !== 1 || argsMatches.length !== 1) return "modified";
  const command = parseTomlString(commandMatches[0]?.[1] ?? "");
  const args = parseTomlStringArray(argsMatches[0]?.[1] ?? "");
  return command === MCP_COMMAND[0] && hashesEqual(args, MCP_COMMAND.slice(1))
    ? "matching"
    : "modified";
}

async function commandConfigEntryState(
  definition: CommandDefinition,
  path: string,
): Promise<CommandConfigEntryState> {
  let content: string;
  try {
    content = await readFile(path, "utf8");
  } catch {
    return "missing";
  }
  if (definition.configFormat === "toml") return codexConfigEntryState(content);
  try {
    const parsed = parseConfigObject(content, path);
    const servers = parsed.mcpServers;
    if (!isRecord(servers) || !Object.hasOwn(servers, "better-fullstack")) return "missing";
    return managedCommandMatches(servers["better-fullstack"]) ? "matching" : "modified";
  } catch {
    return "modified";
  }
}

async function createBackup(
  path: string,
  environment: ResolvedInstallEnvironment,
  dryRun: boolean,
) {
  if (!(await pathExists(path))) return undefined;
  await assertWritePathInHome(environment.homeDir, path);
  const target = await backupPath(path, environment);
  await assertWritePathInHome(environment.homeDir, target);
  if (!dryRun) await copyFile(path, target, constants.COPYFILE_EXCL);
  return target;
}

function formattingOptions(content: string): JSONC.FormattingOptions {
  const eol = content.includes("\r\n") ? "\r\n" : "\n";
  const indentMatch = content.match(/\n([ \t]+)\S/);
  const indent = indentMatch?.[1] ?? "  ";
  return {
    insertSpaces: !indent.includes("\t"),
    tabSize: indent.includes("\t") ? 1 : indent.length,
    eol,
  };
}

function indentationUnit(content: string) {
  const options = formattingOptions(content);
  return options.insertSpaces ? " ".repeat(options.tabSize ?? 2) : "\t";
}

function lineIndentAt(content: string, offset: number) {
  const lineStart = content.lastIndexOf("\n", Math.max(0, offset - 1)) + 1;
  return content.slice(lineStart, offset).match(/^[ \t]*/)?.[0] ?? "";
}

function formatProperty(key: string, value: unknown, indent: string) {
  const valueLines = JSON.stringify(value, null, indent).split("\n");
  return valueLines
    .map((line, index) => (index === 0 ? `${JSON.stringify(key)}: ${line}` : line))
    .join("\n");
}

function insertObjectProperty(
  content: string,
  objectNode: JSONC.Node,
  key: string,
  value: unknown,
) {
  const eol = formattingOptions(content).eol;
  const unit = indentationUnit(content);
  const closeOffset = objectNode.offset + objectNode.length - 1;
  const closingIndent = lineIndentAt(content, closeOffset);
  const properties = objectNode.children ?? [];
  const propertyIndent = properties[0]
    ? lineIndentAt(content, properties[0].offset)
    : `${closingIndent}${unit}`;
  const property = formatProperty(key, value, unit)
    .split("\n")
    .map((line, index) => (index === 0 ? line : `${propertyIndent}${line}`))
    .join(eol);

  if (properties.length === 0) {
    return `${content.slice(0, objectNode.offset + 1)}${eol}${propertyIndent}${property}${eol}${closingIndent}${content.slice(closeOffset)}`;
  }

  const lastProperty = properties.at(-1);
  if (!lastProperty) throw new Error("Could not locate the last JSON property.");
  const insertionOffset = lastProperty.offset + lastProperty.length;
  const closingGap = content.slice(insertionOffset, closeOffset);
  const suffix = closingGap.includes("\n") ? closingGap : `${eol}${closingIndent}`;
  return `${content.slice(0, insertionOffset)},${eol}${propertyIndent}${property}${suffix}${content.slice(closeOffset)}`;
}

function removeObjectProperty(content: string, objectNode: JSONC.Node, key: string) {
  const properties = objectNode.children ?? [];
  const propertyIndex = properties.findIndex((property) => property.children?.[0]?.value === key);
  if (propertyIndex === -1) return content;
  const property = properties[propertyIndex];
  if (!property) return content;
  const closeOffset = objectNode.offset + objectNode.length - 1;

  if (properties.length === 1) {
    return `${content.slice(0, objectNode.offset + 1)}${content.slice(closeOffset)}`;
  }
  if (propertyIndex > 0) {
    const previous = properties[propertyIndex - 1];
    if (!previous) return content;
    const removalStart = previous.offset + previous.length;
    return `${content.slice(0, removalStart)}${content.slice(property.offset + property.length)}`;
  }

  const next = properties[1];
  if (!next) return content;
  return `${content.slice(0, property.offset)}${content.slice(next.offset)}`;
}

const jsoncParseOptions: JSONC.ParseOptions = {
  allowTrailingComma: true,
  disallowComments: false,
};

function invalidJsonConfig(path: string) {
  return new Error(`Config is not valid JSON; left it unchanged: ${path}`);
}

function parseConfigObject(content: string, path: string): Record<string, unknown> {
  const errors: JSONC.ParseError[] = [];
  const parsed: unknown = JSONC.parse(content, errors, jsoncParseOptions);
  if (errors.length > 0 || !isRecord(parsed)) throw invalidJsonConfig(path);
  return parsed;
}

function parseConfigTree(content: string, path: string) {
  const errors: JSONC.ParseError[] = [];
  const root = JSONC.parseTree(content, errors, jsoncParseOptions);
  if (errors.length > 0 || !root || root.type !== "object") {
    throw invalidJsonConfig(path);
  }
  return root;
}

function addJsonEntry(
  content: string,
  path: string,
  parentKey: string,
  value: Record<string, unknown>,
) {
  const parsed = parseConfigObject(content, path);
  const parent = parsed[parentKey];
  if (parent !== undefined && !isRecord(parent)) {
    throw new Error(`Config key "${parentKey}" is not an object; left ${path} unchanged.`);
  }
  const existing = isRecord(parent) ? parent["better-fullstack"] : undefined;
  if (existing !== undefined) {
    if (hashesEqual(existing, value)) return { content, changed: false, createdParent: false };
    throw new Error(`A different better-fullstack entry already exists in ${path}.`);
  }
  const createdParent = parent === undefined;
  const rootNode = parseConfigTree(content, path);
  const parentNode = createdParent ? rootNode : JSONC.findNodeAtLocation(rootNode, [parentKey]);
  if (!parentNode || parentNode.type !== "object") {
    throw new Error(`Config key "${parentKey}" is not an object; left ${path} unchanged.`);
  }
  const next = insertObjectProperty(
    content,
    parentNode,
    createdParent ? parentKey : "better-fullstack",
    createdParent ? { "better-fullstack": value } : value,
  );
  return { content: next, changed: true, createdParent };
}

function removeJsonEntry(
  content: string,
  path: string,
  ownership: OwnedJsonTarget,
  expectedValue: Record<string, unknown>,
) {
  const parsed = parseConfigObject(content, path);
  const parent = parsed[ownership.parentKey];
  if (parent === undefined) return { content, changed: false, removeFile: false };
  if (!isRecord(parent)) {
    throw new Error(
      `Config key "${ownership.parentKey}" is not an object; left ${path} unchanged.`,
    );
  }
  const existing = parent["better-fullstack"];
  if (existing === undefined) return { content, changed: false, removeFile: false };
  if (!hashesEqual(existing, expectedValue) || hashValue(existing) !== ownership.valueHash) {
    throw new Error(
      `The better-fullstack entry in ${path} changed after install; left it unchanged.`,
    );
  }

  const rootNode = parseConfigTree(content, path);
  const parentNode = JSONC.findNodeAtLocation(rootNode, [ownership.parentKey]);
  if (!parentNode || parentNode.type !== "object") {
    throw new Error(`Config is not valid JSON; left it unchanged: ${path}`);
  }
  let next = removeObjectProperty(content, parentNode, "better-fullstack");
  let nextParsed = parseConfigObject(next, path);
  const nextParent = nextParsed[ownership.parentKey];
  if (ownership.createdParent && isRecord(nextParent) && Object.keys(nextParent).length === 0) {
    const nextRoot = parseConfigTree(next, path);
    next = removeObjectProperty(next, nextRoot, ownership.parentKey);
    nextParsed = parseConfigObject(next, path);
  }
  return {
    content: next,
    changed: true,
    removeFile: ownership.createdFile && Object.keys(nextParsed).length === 0,
  };
}

async function writeConfig(path: string, content: string, environment: ResolvedInstallEnvironment) {
  await assertWritePathInHome(environment.homeDir, path);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
}

function operationMessage(operations: InstallOperation[]) {
  return operations.map((operation) => operation.value).join("; ");
}

function failureReceipt(
  id: string,
  name: string,
  capability: InstallTargetReceipt["capability"],
  error: unknown,
  detected?: boolean,
  details: Partial<
    Pick<InstallTargetReceipt, "path" | "backupPath" | "command" | "operations">
  > = {},
): InstallTargetReceipt {
  const message = error instanceof Error ? error.message : String(error);
  const operations = details.operations ?? [];
  return {
    id,
    name,
    capability,
    status: "failed",
    changed: false,
    detected,
    ...details,
    message: operations.length > 0 ? `${message}; ${operationMessage(operations)}` : message,
    operations,
  };
}

async function commandTarget(
  definition: CommandDefinition,
  detected: DetectedAgent,
  state: InstallState,
  environment: ResolvedInstallEnvironment,
  input: InstallCommandInput,
): Promise<InstallTargetReceipt> {
  const stateKey = `mcp:${definition.id}`;
  const ownership = state.targets[stateKey];
  const uninstall = input.uninstall ?? false;
  const configPath = definition.configPath(environment.homeDir);
  const args = uninstall ? definition.removeArgs : definition.addArgs;
  let failureDetails: Partial<
    Pick<InstallTargetReceipt, "path" | "backupPath" | "command" | "operations">
  > = { path: configPath };
  let readding = false;

  if (uninstall && ownership === undefined) {
    return {
      id: stateKey,
      name: `${definition.name} MCP`,
      capability: "mcp",
      status: "unchanged",
      changed: false,
      detected: detected.detected,
      message: "not installed by bfs install",
      operations: [],
    };
  }
  if (ownership !== undefined) {
    if (ownership.kind !== "command") {
      return failureReceipt(
        stateKey,
        `${definition.name} MCP`,
        "mcp",
        `Install ownership for ${definition.name} is inconsistent.`,
        detected.detected,
      );
    }
    const entryState = await commandConfigEntryState(definition, configPath);
    if (entryState === "modified") {
      return failureReceipt(
        stateKey,
        `${definition.name} MCP`,
        "mcp",
        `The better-fullstack entry in ${configPath} was modified by the user; left it unchanged.`,
        detected.detected,
        { path: configPath },
      );
    }
    if (entryState === "missing" && uninstall) {
      delete state.targets[stateKey];
      return {
        id: stateKey,
        name: `${definition.name} MCP`,
        capability: "mcp",
        status: "unchanged",
        changed: false,
        detected: detected.detected,
        path: configPath,
        message: "entry was already absent; removed stale ownership",
        operations: [],
      };
    }
    if (entryState === "matching" && !uninstall) {
      return {
        id: stateKey,
        name: `${definition.name} MCP`,
        capability: "mcp",
        status: "unchanged",
        changed: false,
        detected: detected.detected,
        path: configPath,
        message: "already installed",
        operations: [],
      };
    }
    readding = entryState === "missing";
  }
  if (!detected.binaryPath) {
    return failureReceipt(
      stateKey,
      `${definition.name} MCP`,
      "mcp",
      `${definition.name} CLI was not found on PATH.`,
      detected.detected,
    );
  }

  try {
    await assertWritePathInHome(environment.homeDir, configPath);
    if (definition.configFormat === "json") await validateJsonFile(configPath);
    const backup = await createBackup(configPath, environment, input.dryRun ?? false);
    const command = [detected.binaryPath, ...args];
    const operations: InstallOperation[] = [];
    if (backup) operations.push({ type: "backup", value: `backup ${backup}` });
    operations.push({ type: "command", value: command.join(" ") });
    failureDetails = { path: configPath, backupPath: backup, command, operations };
    if (!(input.dryRun ?? false)) {
      await environment.runCommand(detected.binaryPath, args);
    }
    if (uninstall) {
      delete state.targets[stateKey];
    } else {
      state.targets[stateKey] = {
        kind: "command",
        agent: definition.id,
        signature: definition.addArgs,
      };
    }
    return {
      id: stateKey,
      name: `${definition.name} MCP`,
      capability: "mcp",
      status: input.dryRun ? "planned" : uninstall ? "uninstalled" : "installed",
      changed: true,
      detected: detected.detected,
      path: configPath,
      backupPath: backup,
      command,
      message: readding ? `re-added; ${operationMessage(operations)}` : operationMessage(operations),
      operations,
    };
  } catch (error) {
    return failureReceipt(
      stateKey,
      `${definition.name} MCP`,
      "mcp",
      error,
      detected.detected,
      failureDetails,
    );
  }
}

function emptyConfigContent(parentKey: string, value: Record<string, unknown>) {
  return `${JSON.stringify({ [parentKey]: { "better-fullstack": value } }, null, 2)}\n`;
}

async function jsonTarget(
  definition: JsonDefinition,
  detected: DetectedAgent,
  state: InstallState,
  environment: ResolvedInstallEnvironment,
  input: InstallCommandInput,
): Promise<InstallTargetReceipt> {
  const stateKey = `mcp:${definition.id}`;
  const ownership = state.targets[stateKey];
  const uninstall = input.uninstall ?? false;
  const path =
    ownership?.kind === "json"
      ? resolve(environment.homeDir, ownership.path)
      : definition.path(environment);
  let failureDetails: Partial<Pick<InstallTargetReceipt, "path" | "backupPath" | "operations">> = {
    path,
  };

  if (uninstall && ownership === undefined) {
    return {
      id: stateKey,
      name: `${definition.name} MCP`,
      capability: "mcp",
      status: "unchanged",
      changed: false,
      detected: detected.detected,
      path,
      message: "not installed by bfs install",
      operations: [],
    };
  }

  try {
    await assertWritePathInHome(environment.homeDir, path);
    const exists = await pathExists(path);
    if (uninstall) {
      if (!ownership || ownership.kind !== "json") {
        throw new Error(`Install ownership for ${definition.name} is inconsistent.`);
      }
      if (!exists) {
        delete state.targets[stateKey];
        return {
          id: stateKey,
          name: `${definition.name} MCP`,
          capability: "mcp",
          status: "unchanged",
          changed: false,
          detected: detected.detected,
          path,
          message: "entry was already absent",
          operations: [],
        };
      }
      const current = await readFile(path, "utf8");
      const result = removeJsonEntry(current, path, ownership, definition.value);
      if (!result.changed) {
        delete state.targets[stateKey];
        return {
          id: stateKey,
          name: `${definition.name} MCP`,
          capability: "mcp",
          status: "unchanged",
          changed: false,
          detected: detected.detected,
          path,
          message: "entry was already absent",
          operations: [],
        };
      }
      const backup = await createBackup(path, environment, input.dryRun ?? false);
      const operations: InstallOperation[] = [];
      if (backup) operations.push({ type: "backup", value: `backup ${backup}` });
      operations.push({
        type: "remove",
        value: result.removeFile ? `remove ${path}` : `remove better-fullstack from ${path}`,
      });
      failureDetails = { path, backupPath: backup, operations };
      if (!input.dryRun) {
        if (result.removeFile) await rm(path);
        else await writeConfig(path, result.content, environment);
      }
      delete state.targets[stateKey];
      return {
        id: stateKey,
        name: `${definition.name} MCP`,
        capability: "mcp",
        status: input.dryRun ? "planned" : "uninstalled",
        changed: true,
        detected: detected.detected,
        path,
        backupPath: backup,
        message: operationMessage(operations),
        operations,
      };
    }

    const createdFile = !exists;
    const current = exists ? await readFile(path, "utf8") : undefined;
    const result = current
      ? addJsonEntry(current, path, definition.parentKey, definition.value)
      : {
          content: emptyConfigContent(definition.parentKey, definition.value),
          changed: true,
          createdParent: true,
        };
    if (!result.changed) {
      return {
        id: stateKey,
        name: `${definition.name} MCP`,
        capability: "mcp",
        status: "unchanged",
        changed: false,
        detected: detected.detected,
        path,
        message: ownership ? "already installed" : "matching entry already existed",
        operations: [],
      };
    }
    const backup = await createBackup(path, environment, input.dryRun ?? false);
    const operations: InstallOperation[] = [];
    if (backup) operations.push({ type: "backup", value: `backup ${backup}` });
    operations.push({ type: "write", value: `write ${path}` });
    failureDetails = { path, backupPath: backup, operations };
    if (!input.dryRun) {
      await writeConfig(path, result.content, environment);
    }
    state.targets[stateKey] = {
      kind: "json",
      agent: definition.id,
      path: relativeToHome(environment, path),
      parentKey: definition.parentKey,
      createdFile,
      createdParent: result.createdParent,
      valueHash: hashValue(definition.value),
    };
    return {
      id: stateKey,
      name: `${definition.name} MCP`,
      capability: "mcp",
      status: input.dryRun ? "planned" : "installed",
      changed: true,
      detected: detected.detected,
      path,
      backupPath: backup,
      message: operationMessage(operations),
      operations,
    };
  } catch (error) {
    return failureReceipt(
      stateKey,
      `${definition.name} MCP`,
      "mcp",
      error,
      detected.detected,
      failureDetails,
    );
  }
}

interface SkillFile {
  relativePath: string;
  content: Buffer;
  mode: number;
}

async function readSkillFiles(
  sourceDirectory: string,
  installedName?: string,
  currentDirectory = sourceDirectory,
): Promise<SkillFile[]> {
  const entries = await readdir(currentDirectory, { withFileTypes: true });
  const files: SkillFile[] = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const path = join(currentDirectory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Skill source contains a symbolic link: ${path}`);
    if (entry.isDirectory()) {
      files.push(...(await readSkillFiles(sourceDirectory, installedName, path)));
      continue;
    }
    if (!entry.isFile()) continue;
    const relativePath = relative(sourceDirectory, path);
    let content = await readFile(path);
    if (relativePath === "SKILL.md" && installedName) {
      const text = content.toString("utf8");
      content = Buffer.from(text.replace(/^name:\s*[^\n]+/m, `name: ${installedName}`));
    }
    files.push({ relativePath, content, mode: (await stat(path)).mode });
  }
  return files;
}

function hashSkillFiles(files: SkillFile[]) {
  const hash = createHash("sha256");
  for (const file of files) {
    hash.update(file.relativePath);
    hash.update("\0");
    hash.update(file.content);
    hash.update("\0");
  }
  return hash.digest("hex");
}

async function installedSkillHash(path: string): Promise<string> {
  const files = await readSkillFiles(path);
  return hashSkillFiles(files);
}

async function writeSkillFiles(
  path: string,
  files: SkillFile[],
  environment: ResolvedInstallEnvironment,
) {
  await assertWritePathInHome(environment.homeDir, path);
  await mkdir(path, { recursive: true });
  for (const file of files) {
    const target = join(path, file.relativePath);
    await assertWritePathInHome(environment.homeDir, target);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, file.content, { mode: file.mode });
  }
}

async function installSkillFiles(
  path: string,
  files: SkillFile[],
  environment: ResolvedInstallEnvironment,
  replacing: boolean,
) {
  const temporaryPath = `${path}.better-fullstack-tmp-${randomUUID()}`;
  const previousPath = `${path}.better-fullstack-previous-${randomUUID()}`;
  await assertWritePathInHome(environment.homeDir, temporaryPath);
  await assertWritePathInHome(environment.homeDir, previousPath);
  try {
    await writeSkillFiles(temporaryPath, files, environment);
    if (!replacing) {
      await rename(temporaryPath, path);
      return;
    }
    await rename(path, previousPath);
    try {
      await rename(temporaryPath, path);
    } catch (error) {
      await rename(previousPath, path);
      throw error;
    }
    await rm(previousPath, { recursive: true });
  } finally {
    if (await pathExists(temporaryPath)) await rm(temporaryPath, { recursive: true });
  }
}

async function skillTarget(
  definition: SkillDefinition,
  rootName: ".agents" | ".claude",
  state: InstallState,
  environment: ResolvedInstallEnvironment,
  input: InstallCommandInput,
): Promise<InstallTargetReceipt> {
  const stateKey = `skill:${rootName.slice(1)}:${definition.id}`;
  const ownership = state.targets[stateKey];
  const path = join(environment.homeDir, rootName, "skills", definition.installedName);
  const source = join(environment.skillSourceDir, definition.id);
  const uninstall = input.uninstall ?? false;
  const name = `${definition.installedName} (${rootName}/skills)`;
  let failureDetails: Partial<Pick<InstallTargetReceipt, "path" | "operations">> = { path };

  if (uninstall && ownership === undefined) {
    return {
      id: stateKey,
      name,
      capability: "skill",
      status: "unchanged",
      changed: false,
      path,
      message: "not installed by bfs install",
      operations: [],
    };
  }

  try {
    await assertWritePathInHome(environment.homeDir, path);
    const targetExists = await pathExists(path);
    if (targetExists && (await lstat(path)).isSymbolicLink()) {
      throw new Error(`Skill destination is a symbolic link; left it unchanged: ${path}`);
    }

    if (uninstall) {
      if (!ownership || ownership.kind !== "skill") {
        throw new Error(`Install ownership for ${name} is inconsistent.`);
      }
      if (!targetExists) {
        delete state.targets[stateKey];
        return {
          id: stateKey,
          name,
          capability: "skill",
          status: "unchanged",
          changed: false,
          path,
          message: "skill folder was already absent",
          operations: [],
        };
      }
      const currentHash = await installedSkillHash(path);
      if (currentHash !== ownership.contentHash) {
        throw new Error(`Skill files changed after install; left them unchanged: ${path}`);
      }
      const operations: InstallOperation[] = [{ type: "remove", value: `remove ${path}` }];
      failureDetails = { path, operations };
      if (!input.dryRun) {
        await rm(path, { recursive: true });
      }
      delete state.targets[stateKey];
      return {
        id: stateKey,
        name,
        capability: "skill",
        status: input.dryRun ? "planned" : "uninstalled",
        changed: true,
        path,
        message: operationMessage(operations),
        operations,
      };
    }

    if (!(await pathExists(source))) throw new Error(`Bundled skill source is missing: ${source}`);
    const files = await readSkillFiles(source, definition.installedName);
    const expectedHash = hashSkillFiles(files);
    let updating = false;
    if (targetExists) {
      const currentHash = await installedSkillHash(path);
      if (currentHash === expectedHash) {
        return {
          id: stateKey,
          name,
          capability: "skill",
          status: "unchanged",
          changed: false,
          path,
          message: ownership ? "already installed" : "matching skill folder already existed",
          operations: [],
        };
      }
      if (!ownership || ownership.kind !== "skill") {
        throw new Error(`A different skill folder already exists; left it unchanged: ${path}`);
      }
      if (currentHash !== ownership.contentHash) {
        throw new Error(`Skill files changed after install; left them unchanged: ${path}`);
      }
      updating = true;
    }
    const operations: InstallOperation[] = [
      { type: "write", value: `${updating ? "update" : "write"} ${path}` },
    ];
    failureDetails = { path, operations };
    if (!input.dryRun) {
      await installSkillFiles(path, files, environment, updating);
    }
    state.targets[stateKey] = {
      kind: "skill",
      path: relativeToHome(environment, path),
      contentHash: expectedHash,
    };
    return {
      id: stateKey,
      name,
      capability: "skill",
      status: input.dryRun ? "planned" : "installed",
      changed: true,
      path,
      message: updating ? `updated; ${operationMessage(operations)}` : operationMessage(operations),
      operations,
    };
  } catch (error) {
    return failureReceipt(stateKey, name, "skill", error, undefined, failureDetails);
  }
}

function ownedAgentIds(state: InstallState, only?: InstallOnly) {
  const ids = new Set<InstallAgentId>();
  if (only === "skills") return ids;
  for (const [key, target] of Object.entries(state.targets)) {
    if (!key.startsWith("mcp:")) continue;
    if (target.kind === "command" || target.kind === "json") ids.add(target.agent);
  }
  return ids;
}

function shouldInstallSkills(
  selectedAgents: InstallAgentId[],
  state: InstallState,
  input: InstallCommandInput,
) {
  if (input.only === "mcp") return false;
  if (input.uninstall) {
    const ownsSkills = Object.keys(state.targets).some((key) => key.startsWith("skill:"));
    const hasAgentFilter = (input.agents?.length ?? 0) > 0;
    return (
      ownsSkills && (!hasAgentFilter || selectedAgents.some((agent) => SKILL_AGENT_IDS.has(agent)))
    );
  }
  return selectedAgents.some((agent) => SKILL_AGENT_IDS.has(agent));
}

function stateTargetReceipt(
  environment: ResolvedInstallEnvironment,
  input: InstallCommandInput,
  before: InstallState,
  after: InstallState,
): InstallTargetReceipt | undefined {
  if (JSON.stringify(before) === JSON.stringify(after)) return undefined;
  const path = statePath(environment);
  const removing = input.uninstall && stateIsEmpty(after);
  const operations: InstallOperation[] = [
    { type: removing ? "remove" : "write", value: `${removing ? "remove" : "write"} ${path}` },
  ];
  return {
    id: "state",
    name: "Install ownership receipt",
    capability: "state",
    status: input.dryRun ? "planned" : input.uninstall ? "uninstalled" : "installed",
    changed: true,
    path,
    message: operationMessage(operations),
    operations,
  };
}

function cloneState(state: InstallState): InstallState {
  return JSON.parse(JSON.stringify(state)) as InstallState;
}

function selectionSummary(agents: DetectedAgent[], input: InstallCommandInput) {
  const action = input.uninstall ? "Remove" : "Install";
  const surfaces = input.only ?? "MCP and skills";
  const names = agents.map((agent) => agent.name).join(", ");
  return `${action} ${surfaces} for ${names || "the detected agents"}?`;
}

export async function runInstall(
  input: InstallCommandInput,
  overrides: InstallEnvironmentOverrides = {},
): Promise<InstallReceipt> {
  const environment = await resolveEnvironment(overrides);
  let state: InstallState;
  try {
    state = await readState(environment);
  } catch (error) {
    const target = failureReceipt("state", "Install ownership receipt", "state", error);
    return buildReceipt(input, [], [target]);
  }
  const initialState = cloneState(state);
  const detected = await detectInstallAgents(environment);
  const requestedAgentIds = [...new Set((input.agents ?? []).map(normalizeAgentId))];
  const ownedIds = ownedAgentIds(state, input.only);
  const selected = detected.filter((agent) => {
    if (requestedAgentIds.length > 0) return requestedAgentIds.includes(agent.id);
    if (input.uninstall && ownedIds.has(agent.id)) return true;
    return agent.detected;
  });
  const selectedAgentIds = selected.map((agent) => agent.id);
  const installsSkills = shouldInstallSkills(selectedAgentIds, state, input);

  if (!input.dryRun && environment.stdinIsTTY && environment.confirm) {
    const confirmed = await environment.confirm(selectionSummary(selected, input));
    if (!confirmed) {
      const target: InstallTargetReceipt = {
        id: "selection",
        name: "Installation",
        capability: "selection",
        status: "cancelled",
        changed: false,
        message: "cancelled",
        operations: [],
      };
      return buildReceipt(
        input,
        selectedAgentIds,
        [target],
      );
    }
  }

  const hasTargetWork = (input.only !== "skills" && selected.length > 0) || installsSkills;
  if (!input.dryRun && hasTargetWork) {
    try {
      await preflightStateWrite(environment);
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      const target = failureReceipt(
        "state-preflight",
        "Install ownership receipt",
        "state",
        `Cannot prepare the install ownership receipt. No targets were changed. ${reason}`,
        undefined,
        { path: statePath(environment) },
      );
      return buildReceipt(input, selectedAgentIds, [target]);
    }
  }

  const targets: InstallTargetReceipt[] = [];
  if (input.only !== "skills") {
    for (const definition of COMMAND_DEFINITIONS) {
      const agent = selected.find((candidate) => candidate.id === definition.id);
      if (!agent) continue;
      targets.push(await commandTarget(definition, agent, state, environment, input));
    }
    for (const definition of JSON_DEFINITIONS) {
      const agent = selected.find((candidate) => candidate.id === definition.id);
      if (!agent) continue;
      targets.push(await jsonTarget(definition, agent, state, environment, input));
    }
  }

  if (installsSkills) {
    for (const definition of SKILL_DEFINITIONS) {
      targets.push(await skillTarget(definition, ".agents", state, environment, input));
      targets.push(await skillTarget(definition, ".claude", state, environment, input));
    }
  }

  if (targets.length === 0) {
    targets.push(
      failureReceipt(
        "selection",
        "Agent detection",
        "selection",
        input.only === "skills"
          ? "No selected or detected agent supports these skill locations."
          : "No requested agent was detected. Use --agent to target one explicitly.",
      ),
    );
  }

  const stateChanged = JSON.stringify(initialState) !== JSON.stringify(state);
  if (stateChanged) {
    const stateReceipt = stateTargetReceipt(environment, input, initialState, state);
    if (stateReceipt) targets.push(stateReceipt);
    if (!input.dryRun) {
      try {
        await writeState(environment, state);
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        const backupPaths = [
          ...new Set(
            targets.flatMap((target) => (target.backupPath ? [target.backupPath] : [])),
          ),
        ];
        targets.push(
          failureReceipt(
            "state-write",
            "Install ownership receipt",
            "state",
            `Could not save install ownership after changing targets. Backups created in this run: ${backupPaths.length > 0 ? backupPaths.join(", ") : "none"}. ${reason}`,
          ),
        );
      }
    }
  }

  return buildReceipt(
    input,
    selectedAgentIds,
    targets,
  );
}

function buildReceipt(
  input: InstallCommandInput,
  agents: InstallAgentId[],
  targets: InstallTargetReceipt[],
): InstallReceipt {
  const actionable = targets.filter(
    (target) =>
      target.capability === "mcp" ||
      target.capability === "skill" ||
      target.capability === "selection" ||
      target.status === "failed",
  );
  const failed = actionable.filter((target) => target.status === "failed").length;
  const cancelled = actionable.some((target) => target.status === "cancelled");
  const requested = actionable.filter((target) => target.status !== "cancelled").length;
  const changed = actionable.filter((target) => target.changed).length;
  const unchanged = actionable.filter((target) => target.status === "unchanged").length;
  const stateWriteFailed = targets.some(
    (target) => target.id === "state-write" && target.status === "failed",
  );
  return {
    schemaVersion: 1,
    command: "install",
    action: input.uninstall ? "uninstall" : "install",
    dryRun: input.dryRun ?? false,
    success: !stateWriteFailed && (cancelled || requested === 0 || failed < requested),
    selection: {
      only: input.only ?? "all",
      agents,
    },
    targets,
    summary: { requested, changed, unchanged, failed },
    tryPrompt: TRY_PROMPT,
  };
}
