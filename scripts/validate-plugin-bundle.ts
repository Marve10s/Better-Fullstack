#!/usr/bin/env bun

import { existsSync, readFileSync, statSync } from "node:fs";
import { join, normalize } from "node:path";

type JsonObject = Record<string, unknown>;

const rootDir = process.cwd();
const pluginDir = join(rootDir, "plugin");
const manifestPath = join(pluginDir, ".codex-plugin", "plugin.json");
const mcpPath = join(pluginDir, ".mcp.json");
const marketplacePath = join(rootDir, ".agents", "plugins", "marketplace.json");

function readJson(path: string): JsonObject {
  try {
    return JSON.parse(readFileSync(path, "utf8")) as JsonObject;
  } catch (error) {
    throw new Error(`Failed to read JSON at ${path}: ${(error as Error).message}`, { cause: error });
  }
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function assertString(value: unknown, name: string) {
  assert(typeof value === "string" && value.trim().length > 0, `${name} must be a non-empty string`);
}

function assertPathInsidePlugin(relativePath: unknown, name: string) {
  assertString(relativePath, name);
  const normalized = normalize(relativePath);
  assert(!normalized.startsWith(".."), `${name} must stay inside plugin/: ${relativePath}`);
  const absolutePath = join(pluginDir, normalized);
  assert(existsSync(absolutePath), `${name} points to a missing path: ${relativePath}`);
  return absolutePath;
}

function assertSkillFile(path: string) {
  const skillText = readFileSync(path, "utf8");
  assert(skillText.startsWith("---\n"), `${path} must start with YAML frontmatter`);
  const frontmatterEnd = skillText.indexOf("\n---", 4);
  assert(frontmatterEnd > 0, `${path} must close YAML frontmatter`);
  const frontmatter = skillText.slice(4, frontmatterEnd);
  assert(/^name:\s*\S+/m.test(frontmatter), `${path} must declare a skill name`);
  assert(/^description:\s*.+/m.test(frontmatter), `${path} must declare a skill description`);
}

const manifest = readJson(manifestPath);
assertString(manifest.name, "plugin.name");
assertString(manifest.version, "plugin.version");
assert(/^\d+\.\d+\.\d+/.test(manifest.version as string), "plugin.version must start with semver");
assertString(manifest.description, "plugin.description");
assert(typeof manifest.author === "object" && manifest.author !== null, "plugin.author must be an object");
assertString((manifest.author as JsonObject).name, "plugin.author.name");

const skillsDir = assertPathInsidePlugin(manifest.skills, "plugin.skills");
assert(statSync(skillsDir).isDirectory(), "plugin.skills must point to a directory");
const skillFiles = ["scaffold-project", "add-to-project"].map((name) =>
  join(skillsDir, name, "SKILL.md"),
);
for (const skillFile of skillFiles) {
  assert(existsSync(skillFile), `Missing plugin skill file: ${skillFile}`);
  assertSkillFile(skillFile);
}

assert(assertPathInsidePlugin(manifest.mcpServers, "plugin.mcpServers") === mcpPath, "plugin.mcpServers must point to ./.mcp.json");

const pluginInterface = manifest.interface as JsonObject | undefined;
assert(pluginInterface && typeof pluginInterface === "object", "plugin.interface must be an object");
assertString(pluginInterface.displayName, "plugin.interface.displayName");
assertString(pluginInterface.shortDescription, "plugin.interface.shortDescription");
assertPathInsidePlugin(pluginInterface.composerIcon, "plugin.interface.composerIcon");
assertPathInsidePlugin(pluginInterface.logo, "plugin.interface.logo");
assert(Array.isArray(pluginInterface.capabilities), "plugin.interface.capabilities must be an array");
for (const capability of ["Interactive", "Write", "MCP"]) {
  assert(
    (pluginInterface.capabilities as unknown[]).includes(capability),
    `plugin.interface.capabilities must include ${capability}`,
  );
}

const mcp = readJson(mcpPath);
const mcpServers = mcp.mcpServers as JsonObject | undefined;
const server = mcpServers?.["better-fullstack"] as JsonObject | undefined;
assert(server && typeof server === "object", "plugin .mcp.json must declare mcpServers.better-fullstack");
assert(server.command === "npx", "better-fullstack MCP command must use npx");
assert(Array.isArray(server.args), "better-fullstack MCP args must be an array");
assert(
  (server.args as unknown[]).join(" ") === "-y create-better-fullstack@latest mcp",
  "better-fullstack MCP args must run create-better-fullstack@latest mcp",
);

const marketplace = readJson(marketplacePath);
assert(marketplace.name === manifest.name, "marketplace.name must match plugin.name");
const plugins = marketplace.plugins as JsonObject[] | undefined;
assert(Array.isArray(plugins), "marketplace.plugins must be an array");
const entry = plugins.find((plugin) => plugin.name === manifest.name);
assert(entry, "marketplace.plugins must include the plugin");
assert((entry.source as JsonObject | undefined)?.source === "local", "marketplace plugin source must be local");
assert((entry.source as JsonObject | undefined)?.path === "./plugin", "marketplace plugin path must be ./plugin");
assert((entry.policy as JsonObject | undefined)?.installation === "AVAILABLE", "marketplace plugin must be installable");

console.log("Plugin bundle validation passed");
