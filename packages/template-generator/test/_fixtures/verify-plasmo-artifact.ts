import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function strings(value: unknown): string[] {
  assert(Array.isArray(value) && value.every((entry) => typeof entry === "string"), "Expected a string array");
  return value;
}

const projectDir = process.argv[2];
assert(projectDir, "Pass the staged project directory after building the extension");
const artifactDir = resolve(projectDir, "apps/extension/build/chrome-mv3-prod");
const manifest: unknown = JSON.parse(await readFile(join(artifactDir, "manifest.json"), "utf8"));
assert(isRecord(manifest), "Manifest must be an object");
assert.equal(manifest.manifest_version, 3);
for (const key of ["permissions", "host_permissions", "optional_permissions", "optional_host_permissions"]) {
  assert.deepEqual(strings(manifest[key] ?? []), [], `${key} must be empty`);
}
assert.equal(manifest.externally_connectable, undefined);
assert(isRecord(manifest.content_security_policy));
assert.equal(manifest.content_security_policy.extension_pages, "script-src 'self'; object-src 'self'");
assert(isRecord(manifest.action));
assert(isRecord(manifest.background));
assert.equal(manifest.background.scripts, undefined);

async function localFile(value: unknown) {
  assert(typeof value === "string" && value.length > 0, "Expected a local artifact reference");
  assert(!/^[a-z][a-z\d+.-]*:|^\/\/|[\\?#]/i.test(value), `Non-local artifact reference: ${value}`);
  const absolute = resolve(artifactDir, value);
  assert(absolute.startsWith(`${artifactDir}${sep}`), `Artifact reference escapes output: ${value}`);
  assert((await stat(absolute)).isFile(), `Missing referenced artifact: ${value}`);
  return absolute;
}

const popupPath = await localFile(manifest.action.default_popup);
await localFile(manifest.background.service_worker);
assert(isRecord(manifest.icons) && Object.keys(manifest.icons).length > 0, "Production icons are required");
for (const icon of Object.values(manifest.icons)) await localFile(icon);
if (isRecord(manifest.action.default_icon)) {
  for (const icon of Object.values(manifest.action.default_icon)) await localFile(icon);
} else if (manifest.action.default_icon !== undefined) {
  await localFile(manifest.action.default_icon);
}
assert(Array.isArray(manifest.content_scripts) && manifest.content_scripts.length === 1);
const content: unknown = manifest.content_scripts[0];
assert(isRecord(content));
assert.deepEqual(strings(content.matches), ["https://example.com/*"]);
assert.equal(content.all_frames ?? false, false);
assert.equal(content.run_at, "document_idle");
assert.notEqual(content.world, "MAIN");
assert(strings(content.js).length > 0);
for (const script of strings(content.js)) await localFile(script);
for (const stylesheet of strings(content.css ?? [])) await localFile(stylesheet);
const accessibleResources: unknown = manifest.web_accessible_resources ?? [];
assert(Array.isArray(accessibleResources));
for (const resource of accessibleResources) {
  assert(isRecord(resource));
  assert.deepEqual(strings(resource.matches), ["https://example.com/*"]);
  for (const file of strings(resource.resources)) await localFile(file);
}
const popup = await readFile(popupPath, "utf8");
assert(/<script\b/i.test(popup), "Popup must load its bundled entrypoint");

async function inspectDirectory(directory: string): Promise<void> {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = join(directory, entry.name);
    if (entry.isDirectory()) {
      await inspectDirectory(absolute);
      continue;
    }
    if (![".js", ".mjs", ".html", ".css"].includes(extname(entry.name))) continue;
    const source = await readFile(absolute, "utf8");
    assert(!/\beval\s*\(|\bnew\s+Function\s*\(/.test(source), `Dynamic code in ${absolute}`);
    assert(!/\b(?:importScripts|import)\s*\(\s*["'](?:https?:)?\/\//.test(source), `Remote script in ${absolute}`);
    assert(!/\bfrom\s*["'](?:https?:)?\/\//.test(source), `Remote import in ${absolute}`);
    assert(!/localhost:\d+|wss?:\/\/localhost|__plasmo_hmr|__plasmo_live_reload__/i.test(source), `Development code in ${absolute}`);
    if ([".js", ".mjs"].includes(extname(entry.name))) {
      const imports = [
        ...source.matchAll(/\b(?:importScripts|import)\s*\(\s*["']([^"']+)["']/g),
        ...source.matchAll(/\b(?:import|export)\s+(?:[^;"']*?\s+from\s*)?["']([^"']+)["']/g),
      ];
      for (const dependency of imports) {
        assert(dependency[1]);
        await localFile(join(directory.slice(artifactDir.length), dependency[1]).replace(/^\//, ""));
      }
    }
    if (extname(entry.name) === ".html") {
      for (const tag of source.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
        const script = /\bsrc=["']([^"']+)["']/i.exec(tag[1] ?? "");
        assert(script?.[1], `Inline script in ${absolute}`);
        await localFile(join(directory.slice(artifactDir.length), script[1]).replace(/^\//, ""));
        assert.equal(tag[2]?.trim(), "", `Inline code in ${absolute}`);
      }
      for (const tag of source.matchAll(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)) {
        assert(tag[1]);
        await localFile(join(directory.slice(artifactDir.length), tag[1]).replace(/^\//, ""));
      }
    }
    if (extname(entry.name) === ".css") {
      assert(!/@import\s+(?:url\()?\s*["']?(?:https?:)?\/\//i.test(source), `Remote stylesheet in ${absolute}`);
    }
  }
}

await inspectDirectory(artifactDir);
console.log(`Verified Chrome MV3 production artifact: ${artifactDir}`);
