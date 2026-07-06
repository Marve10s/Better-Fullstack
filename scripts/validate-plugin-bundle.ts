#!/usr/bin/env bun

import { existsSync, readFileSync, statSync } from "node:fs";
import { join, normalize } from "node:path";

type JsonObject = Record<string, unknown>;

const rootDir = process.cwd();
const pluginDir = join(rootDir, "plugin");
const codexManifestPath = join(pluginDir, ".codex-plugin", "plugin.json");
const claudeManifestPath = join(pluginDir, ".claude-plugin", "plugin.json");
const mcpPath = join(pluginDir, ".mcp.json");
const cliPackageJsonPath = join(rootDir, "apps", "cli", "package.json");
const codexMarketplacePath = join(rootDir, ".agents", "plugins", "marketplace.json");
const claudeMarketplacePath = join(rootDir, ".claude-plugin", "marketplace.json");

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

function assertPathInsideRoot(relativePath: unknown, name: string) {
  assertString(relativePath, name);
  const normalized = normalize(relativePath);
  assert(!normalized.startsWith(".."), `${name} must stay inside repo root: ${relativePath}`);
  const absolutePath = join(rootDir, normalized);
  assert(existsSync(absolutePath), `${name} points to a missing path: ${relativePath}`);
  return absolutePath;
}

function assertSkillFile(path: string) {
  const skillText = readFileSync(path, "utf8");
  assert(skillText.startsWith("---\n"), `${path} must start with YAML frontmatter`);
  const frontmatterEnd = skillText.indexOf("\n---", 4);
  assert(frontmatterEnd > 0, `${path} must close YAML frontmatter`);
  const frontmatter = skillText.slice(4, frontmatterEnd);
  // Claude Code silently drops ALL frontmatter fields when the YAML fails to
  // parse (the skill then never auto-triggers), so parse it for real.
  let parsed: unknown;
  try {
    parsed = Bun.YAML.parse(frontmatter);
  } catch (error) {
    throw new Error(
      `${path} frontmatter is not valid YAML — Claude Code would load this skill with empty metadata: ${(error as Error).message}`,
      { cause: error },
    );
  }
  assert(parsed && typeof parsed === "object", `${path} frontmatter must be a YAML mapping`);
  const meta = parsed as JsonObject;
  assertString(meta.name, `${path} frontmatter name`);
  assertString(meta.description, `${path} frontmatter description`);
}

function assertManifestBasics(manifest: JsonObject, prefix: string) {
  assertString(manifest.name, `${prefix}.name`);
  assertString(manifest.version, `${prefix}.version`);
  assert(/^\d+\.\d+\.\d+/.test(manifest.version as string), `${prefix}.version must start with semver`);
  assertString(manifest.description, `${prefix}.description`);
}

function assertPluginComponents(manifest: JsonObject, prefix: string) {
  const skillsDir = assertPathInsidePlugin(manifest.skills, `${prefix}.skills`);
  assert(statSync(skillsDir).isDirectory(), `${prefix}.skills must point to a directory`);
  assert(
    assertPathInsidePlugin(manifest.mcpServers, `${prefix}.mcpServers`) === mcpPath,
    `${prefix}.mcpServers must point to ./.mcp.json`,
  );
  return skillsDir;
}

const codexManifest = readJson(codexManifestPath);
assertManifestBasics(codexManifest, "codexPlugin");
assert(
  typeof codexManifest.author === "object" && codexManifest.author !== null,
  "codexPlugin.author must be an object",
);
assertString((codexManifest.author as JsonObject).name, "codexPlugin.author.name");

const skillsDir = assertPluginComponents(codexManifest, "codexPlugin");
const skillFiles = ["scaffold-project", "add-to-project"].map((name) =>
  join(skillsDir, name, "SKILL.md"),
);
for (const skillFile of skillFiles) {
  assert(existsSync(skillFile), `Missing plugin skill file: ${skillFile}`);
  assertSkillFile(skillFile);
}

const claudeManifest = readJson(claudeManifestPath);
assertManifestBasics(claudeManifest, "claudePlugin");
assertPluginComponents(claudeManifest, "claudePlugin");
assert(codexManifest.version === claudeManifest.version, "Codex and Claude plugin versions must match");

const cliPackageJson = readJson(cliPackageJsonPath);
assertString(cliPackageJson.version, "cliPackage.version");
assert(
  codexManifest.version === cliPackageJson.version,
  "plugin manifest versions must match apps/cli/package.json version",
);

const pluginInterface = codexManifest.interface as JsonObject | undefined;
assert(pluginInterface && typeof pluginInterface === "object", "codexPlugin.interface must be an object");
assertString(pluginInterface.displayName, "codexPlugin.interface.displayName");
assertString(pluginInterface.shortDescription, "codexPlugin.interface.shortDescription");
assertPathInsidePlugin(pluginInterface.composerIcon, "codexPlugin.interface.composerIcon");
assertPathInsidePlugin(pluginInterface.logo, "codexPlugin.interface.logo");
assert(Array.isArray(pluginInterface.capabilities), "codexPlugin.interface.capabilities must be an array");
for (const capability of ["Interactive", "Write", "MCP"]) {
  assert(
    (pluginInterface.capabilities as unknown[]).includes(capability),
    `codexPlugin.interface.capabilities must include ${capability}`,
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

const codexMarketplace = readJson(codexMarketplacePath);
assert(codexMarketplace.name === codexManifest.name, "Codex marketplace.name must match plugin.name");
const plugins = codexMarketplace.plugins as JsonObject[] | undefined;
assert(Array.isArray(plugins), "marketplace.plugins must be an array");
const entry = plugins.find((plugin) => plugin.name === codexManifest.name);
assert(entry, "marketplace.plugins must include the plugin");
assert((entry.source as JsonObject | undefined)?.source === "local", "marketplace plugin source must be local");
assert((entry.source as JsonObject | undefined)?.path === "./plugin", "marketplace plugin path must be ./plugin");
assert((entry.policy as JsonObject | undefined)?.installation === "AVAILABLE", "marketplace plugin must be installable");

const claudeMarketplace = readJson(claudeMarketplacePath);
assert(claudeMarketplace.name === claudeManifest.name, "Claude marketplace.name must match plugin.name");
const claudePlugins = claudeMarketplace.plugins as JsonObject[] | undefined;
assert(Array.isArray(claudePlugins), "Claude marketplace.plugins must be an array");
const claudeEntry = claudePlugins[0];
assert(claudeEntry, "Claude marketplace.plugins must include the plugin");
assert(claudeEntry.name === claudeManifest.name, "Claude marketplace plugin name must match manifest name");
assert(
  assertPathInsideRoot(claudeEntry.source, "claudeMarketplace.plugins[0].source") === pluginDir,
  "Claude marketplace plugin source must resolve to plugin/",
);

console.log("Plugin bundle validation passed");
