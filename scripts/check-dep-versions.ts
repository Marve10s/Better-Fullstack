#!/usr/bin/env bun
/**
 * check-dep-versions.ts
 *
 * Audits hardcoded dependency versions across all ecosystems (npm, Rust, Go, Python, Java)
 * and optionally updates them in-place.
 *
 * Usage:
 *   bun run scripts/check-dep-versions.ts                  # audit all ecosystems
 *   bun run scripts/check-dep-versions.ts --ecosystem rust  # audit one ecosystem
 *   bun run scripts/check-dep-versions.ts --update          # update stale versions in-place
 *   bun run scripts/check-dep-versions.ts --json            # JSON output for CI
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// ── types ──────────────────────────────────────────────────────────────────

type Ecosystem = "npm" | "rust" | "go" | "python" | "java";

type DepEntry = {
  ecosystem: Ecosystem;
  file: string;
  name: string;
  current: string; // raw version from file
  currentNorm: string; // normalised semver (no ^, >=, v prefix)
  sourceKind?: "gradle-coordinate" | "gradle-plugin" | "maven-block" | "maven-property";
  sourceKey?: string;
};

type CheckedDep = DepEntry & {
  latest: string;
  outdated: boolean;
  majorBump: boolean;
  error?: string;
};

// ── CLI args ───────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const ecosystemFilter = args.includes("--ecosystem")
  ? (args[args.indexOf("--ecosystem") + 1] as Ecosystem)
  : undefined;
const shouldUpdate = args.includes("--update");
const jsonOutput = args.includes("--json");

// ── paths ──────────────────────────────────────────────────────────────────

const ROOT = resolve(import.meta.dir, "..");
const NPM_MAP = resolve(ROOT, "packages/template-generator/src/utils/add-deps.ts");
const RUST_CARGO = resolve(ROOT, "packages/template-generator/templates/rust-base/Cargo.toml.hbs");
const GO_MOD = resolve(ROOT, "packages/template-generator/templates/go-base/go.mod.hbs");
const PYTHON_PYPROJECT = resolve(
  ROOT,
  "packages/template-generator/templates/python-base/pyproject.toml.hbs",
);
const JAVA_POM = resolve(ROOT, "packages/template-generator/templates/java-base/pom.xml.hbs");
const JAVA_GRADLE = resolve(
  ROOT,
  "packages/template-generator/templates/java-base/build.gradle.kts.hbs",
);

const JAVA_PROPERTY_ARTIFACTS: Record<string, string> = {
  "springdoc.version": "org.springdoc:springdoc-openapi-starter-webmvc-ui",
  "lombok.version": "org.projectlombok:lombok",
  "mapstruct.version": "org.mapstruct:mapstruct",
  "assertj.version": "org.assertj:assertj-core",
  "rest-assured.version": "io.rest-assured:rest-assured",
  "wiremock.version": "org.wiremock:wiremock",
  "awaitility.version": "org.awaitility:awaitility",
  "archunit.version": "com.tngtech.archunit:archunit-junit5",
  "jqwik.version": "net.jqwik:jqwik",
  "junit.version": "org.junit:junit-bom",
  "mockito.version": "org.mockito:mockito-junit-jupiter",
  "testcontainers.version": "org.testcontainers:testcontainers-bom",
};

const JAVA_GRADLE_PLUGIN_ARTIFACTS: Record<string, string> = {
  "org.springframework.boot": "org.springframework.boot:spring-boot-gradle-plugin",
};

// ── parsers ────────────────────────────────────────────────────────────────

function normVersion(v: string): string {
  return v.replace(/^[\^~>=v]+/, "").trim();
}

/** Compare two normalised semver strings; returns true if latest > current at any segment. */
function isNewer(current: string, latest: string): boolean {
  const c = current.split(".").map(Number);
  const l = latest.split(".").map(Number);
  for (let i = 0; i < Math.max(c.length, l.length); i++) {
    const cv = c[i] ?? 0;
    const lv = l[i] ?? 0;
    if (lv > cv) return true;
    if (lv < cv) return false;
  }
  return false;
}

function isMajorBump(current: string, latest: string, ecosystem?: Ecosystem): boolean {
  const cParts = current.split(".").map(Number);
  const lParts = latest.split(".").map(Number);
  const cMajor = cParts[0] ?? 0;
  const lMajor = lParts[0] ?? 0;
  if (lMajor > cMajor) return true;
  // For Rust 0.x crates, a minor bump is effectively a breaking change
  if (ecosystem === "rust" && cMajor === 0) {
    const cMinor = cParts[1] ?? 0;
    const lMinor = lParts[1] ?? 0;
    if (lMinor > cMinor) return true;
  }
  return false;
}

function parseNpmMap(): DepEntry[] {
  const src = readFileSync(NPM_MAP, "utf-8");
  const entries: DepEntry[] = [];
  // Match:  "package-name": "^1.2.3",
  const re = /^\s*"([^"]+)":\s*"([^"]+)"/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const [, name, ver] = m;
    if (!name || !ver) continue;
    entries.push({
      ecosystem: "npm",
      file: NPM_MAP,
      name,
      current: ver,
      currentNorm: normVersion(ver),
    });
  }
  return entries;
}

function parseRustCargo(): DepEntry[] {
  const src = readFileSync(RUST_CARGO, "utf-8");
  const entries: DepEntry[] = [];
  // Skip workspace metadata fields (version, edition, etc.)
  const SKIP_FIELDS = new Set(["version", "edition", "license", "repository", "resolver"]);
  // Match: crate-name = "0.8"  or  crate-name = { version = "1.43", ... }
  const reSimple = /^([a-z][a-z0-9_-]+)\s*=\s*"([0-9][^"]+)"/gm;
  const reTable = /^([a-z][a-z0-9_-]+)\s*=\s*\{\s*version\s*=\s*"([0-9][^"]+)"/gm;
  for (const re of [reSimple, reTable]) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(src)) !== null) {
      const [, name, ver] = m;
      if (!name || !ver || SKIP_FIELDS.has(name)) continue;
      entries.push({
        ecosystem: "rust",
        file: RUST_CARGO,
        name,
        current: ver,
        currentNorm: normVersion(ver),
      });
    }
  }
  return entries;
}

function parseGoMod(): DepEntry[] {
  const src = readFileSync(GO_MOD, "utf-8");
  const entries: DepEntry[] = [];
  // Match: \tgithub.com/foo/bar v1.2.3
  const re = /^\t([\w./-]+)\s+(v[\d.]+)/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    const [, name, ver] = m;
    if (!name || !ver) continue;
    entries.push({
      ecosystem: "go",
      file: GO_MOD,
      name,
      current: ver,
      currentNorm: normVersion(ver),
    });
  }
  return entries;
}

function parsePythonPyproject(): DepEntry[] {
  const src = readFileSync(PYTHON_PYPROJECT, "utf-8");
  const entries: DepEntry[] = [];
  // Match: "package-name>=1.2.3"  or  "package[extra]>=1.2.3"
  const re = /"([a-zA-Z][a-zA-Z0-9_-]+)(?:\[[^\]]+\])?>=([0-9][^"]+)"/gm;
  let m: RegExpExecArray | null;
  const seen = new Set<string>();
  while ((m = re.exec(src)) !== null) {
    const [, name, ver] = m;
    if (!name || !ver || seen.has(name)) continue;
    seen.add(name);
    entries.push({
      ecosystem: "python",
      file: PYTHON_PYPROJECT,
      name,
      current: `>=${ver}`,
      currentNorm: normVersion(ver),
    });
  }
  return entries;
}

function addJavaEntry(entries: DepEntry[], seen: Set<string>, entry: DepEntry) {
  const key = `${entry.file}|${entry.name}|${entry.current}|${entry.sourceKind ?? ""}|${entry.sourceKey ?? ""}`;
  if (seen.has(key)) return;
  seen.add(key);
  entries.push(entry);
}

function parseJavaTemplates(): DepEntry[] {
  const entries: DepEntry[] = [];
  const seen = new Set<string>();

  const pom = readFileSync(JAVA_POM, "utf-8");
  const gradle = readFileSync(JAVA_GRADLE, "utf-8");

  const propertyRe = /<([a-zA-Z0-9.-]+\.version)>([0-9][^<]+)<\/\1>/g;
  let propertyMatch: RegExpExecArray | null;
  while ((propertyMatch = propertyRe.exec(pom)) !== null) {
    const [, propertyName, version] = propertyMatch;
    if (!propertyName || !version) continue;
    const artifact = JAVA_PROPERTY_ARTIFACTS[propertyName];
    if (!artifact) continue;
    addJavaEntry(entries, seen, {
      ecosystem: "java",
      file: JAVA_POM,
      name: artifact,
      current: version,
      currentNorm: normVersion(version),
      sourceKind: "maven-property",
      sourceKey: propertyName,
    });
  }

  const blockRe = /<(parent|dependency|plugin)>\s*([\s\S]*?)\s*<\/\1>/g;
  let blockMatch: RegExpExecArray | null;
  while ((blockMatch = blockRe.exec(pom)) !== null) {
    const [, , block] = blockMatch;
    if (!block) continue;
    const groupId = block.match(/<groupId>([^<]+)<\/groupId>/)?.[1];
    const artifactId = block.match(/<artifactId>([^<]+)<\/artifactId>/)?.[1];
    const version = block.match(/<version>([^<]+)<\/version>/)?.[1];
    if (!groupId || !artifactId || !version || version.startsWith("${")) continue;
    if (artifactId === "{{javaArtifactId}}") continue;
    addJavaEntry(entries, seen, {
      ecosystem: "java",
      file: JAVA_POM,
      name: `${groupId}:${artifactId}`,
      current: version,
      currentNorm: normVersion(version),
      sourceKind: "maven-block",
    });
  }

  const gradleCoordinateRe = /["']([a-zA-Z0-9_.-]+):([a-zA-Z0-9_.-]+):([0-9][^"']+)["']/g;
  let gradleMatch: RegExpExecArray | null;
  while ((gradleMatch = gradleCoordinateRe.exec(gradle)) !== null) {
    const [, groupId, artifactId, version] = gradleMatch;
    if (!groupId || !artifactId || !version) continue;
    addJavaEntry(entries, seen, {
      ecosystem: "java",
      file: JAVA_GRADLE,
      name: `${groupId}:${artifactId}`,
      current: version,
      currentNorm: normVersion(version),
      sourceKind: "gradle-coordinate",
    });
  }

  const gradlePluginRe = /id\("([^"]+)"\)\s+version\s+"([0-9][^"]+)"/g;
  let pluginMatch: RegExpExecArray | null;
  while ((pluginMatch = gradlePluginRe.exec(gradle)) !== null) {
    const [, pluginId, version] = pluginMatch;
    if (!pluginId || !version) continue;
    const artifact = JAVA_GRADLE_PLUGIN_ARTIFACTS[pluginId];
    if (!artifact) continue;
    addJavaEntry(entries, seen, {
      ecosystem: "java",
      file: JAVA_GRADLE,
      name: artifact,
      current: version,
      currentNorm: normVersion(version),
      sourceKind: "gradle-plugin",
      sourceKey: pluginId,
    });
  }

  return entries;
}

// ── registry fetchers ──────────────────────────────────────────────────────

const CONCURRENCY = 12;
const CRATES_IO_DELAY_MS = 120; // crates.io asks for max ~1 req/s; we do ~8/s

async function fetchLatestNpm(name: string): Promise<string> {
  const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(name)}/latest`);
  if (!res.ok) throw new Error(`npm ${res.status}`);
  const data = (await res.json()) as { version: string };
  return data.version;
}

async function fetchLatestCrate(name: string): Promise<string> {
  await new Promise((r) => setTimeout(r, CRATES_IO_DELAY_MS));
  const res = await fetch(`https://crates.io/api/v1/crates/${name}`, {
    headers: { "User-Agent": "better-fullstack-dep-checker/1.0" },
  });
  if (!res.ok) throw new Error(`crates.io ${res.status}`);
  const data = (await res.json()) as { crate: { newest_version: string } };
  return data.crate.newest_version;
}

async function fetchLatestGo(module: string): Promise<string> {
  const res = await fetch(`https://proxy.golang.org/${module}/@latest`);
  if (!res.ok) throw new Error(`go proxy ${res.status}`);
  const data = (await res.json()) as { Version: string };
  return normVersion(data.Version);
}

async function fetchLatestPyPI(name: string): Promise<string> {
  const res = await fetch(`https://pypi.org/pypi/${name}/json`);
  if (!res.ok) throw new Error(`pypi ${res.status}`);
  const data = (await res.json()) as { info: { version: string } };
  return data.info.version;
}

async function fetchLatestMaven(name: string): Promise<string> {
  const [groupId, artifactId] = name.split(":");
  if (!groupId || !artifactId) {
    throw new Error(`invalid Maven coordinate ${name}`);
  }
  const groupPath = groupId.replaceAll(".", "/");
  const res = await fetch(
    `https://repo.maven.apache.org/maven2/${groupPath}/${artifactId}/maven-metadata.xml`,
  );
  if (!res.ok) throw new Error(`maven central ${res.status}`);
  const xml = await res.text();
  const candidates = Array.from(xml.matchAll(/<version>([^<]+)<\/version>/g))
    .map((match) => match[1])
    .filter((version): version is string => Boolean(version))
    .filter((version) => !/alpha|beta|rc|cr|dev|pre|snapshot|milestone|[-.]m\d/i.test(version))
    .sort((a, b) =>
      isNewer(normVersion(b), normVersion(a))
        ? -1
        : isNewer(normVersion(a), normVersion(b))
          ? 1
          : 0,
    );
  const latest =
    candidates[0] ??
    xml.match(/<release>([^<]+)<\/release>/)?.[1] ??
    xml.match(/<latest>([^<]+)<\/latest>/)?.[1];
  if (!latest) throw new Error("no release version found");
  return latest;
}

function getFetcher(eco: Ecosystem): (name: string) => Promise<string> {
  switch (eco) {
    case "npm":
      return fetchLatestNpm;
    case "rust":
      return fetchLatestCrate;
    case "go":
      return fetchLatestGo;
    case "python":
      return fetchLatestPyPI;
    case "java":
      return fetchLatestMaven;
  }
}

async function checkAll(entries: DepEntry[]): Promise<CheckedDep[]> {
  const results: CheckedDep[] = [];
  // Process in batches to respect rate limits
  for (let i = 0; i < entries.length; i += CONCURRENCY) {
    const batch = entries.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(async (dep) => {
        const fetcher = getFetcher(dep.ecosystem);
        try {
          const latest = await fetcher(dep.name);
          const latestNorm = normVersion(latest);
          // Skip pre-release versions (alpha, beta, rc)
          if (/alpha|beta|rc|dev|pre/i.test(latestNorm)) {
            return { ...dep, latest: latestNorm, outdated: false, majorBump: false };
          }
          return {
            ...dep,
            latest: latestNorm,
            outdated: isNewer(dep.currentNorm, latestNorm),
            majorBump: isMajorBump(dep.currentNorm, latestNorm, dep.ecosystem),
          };
        } catch (err) {
          return {
            ...dep,
            latest: "?",
            outdated: false,
            majorBump: false,
            error: err instanceof Error ? err.message : String(err),
          };
        }
      }),
    );
    results.push(...batchResults);
  }
  return results;
}

// ── updaters ───────────────────────────────────────────────────────────────

function updateNpmMap(outdated: CheckedDep[]): number {
  let src = readFileSync(NPM_MAP, "utf-8");
  let count = 0;
  for (const dep of outdated) {
    if (dep.majorBump) continue; // skip major bumps — need manual review
    const escaped = dep.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`("${escaped}":\\s*")\\^[^"]+(")`);
    const replacement = `$1^${dep.latest}$2`;
    const updated = src.replace(re, replacement);
    if (updated !== src) {
      src = updated;
      count++;
    }
  }
  if (count > 0) writeFileSync(NPM_MAP, src);
  return count;
}

function updateRustCargo(outdated: CheckedDep[]): number {
  let src = readFileSync(RUST_CARGO, "utf-8");
  let count = 0;
  for (const dep of outdated) {
    if (dep.majorBump) continue;
    const escaped = dep.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Update simple format: name = "x.y"
    const reSimple = new RegExp(
      `(${escaped}\\s*=\\s*")${dep.current.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(")`,
    );
    // Update table format: name = { version = "x.y", ... }
    const reTable = new RegExp(
      `(${escaped}\\s*=\\s*\\{\\s*version\\s*=\\s*")${dep.current.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(")`,
    );
    // Use major.minor for Rust (no patch)
    const parts = dep.latest.split(".");
    const rustVer = parts.length >= 2 ? `${parts[0]}.${parts[1]}` : dep.latest;
    for (const re of [reSimple, reTable]) {
      const updated = src.replace(re, `$1${rustVer}$2`);
      if (updated !== src) {
        src = updated;
        count++;
        break;
      }
    }
  }
  if (count > 0) writeFileSync(RUST_CARGO, src);
  return count;
}

function updateGoMod(outdated: CheckedDep[]): number {
  let src = readFileSync(GO_MOD, "utf-8");
  let count = 0;
  for (const dep of outdated) {
    if (dep.majorBump) continue;
    const escaped = dep.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(\\t${escaped}\\s+)v[\\d.]+`);
    const updated = src.replace(re, `$1v${dep.latest}`);
    if (updated !== src) {
      src = updated;
      count++;
    }
  }
  if (count > 0) writeFileSync(GO_MOD, src);
  return count;
}

function updatePythonPyproject(outdated: CheckedDep[]): number {
  let src = readFileSync(PYTHON_PYPROJECT, "utf-8");
  let count = 0;
  for (const dep of outdated) {
    if (dep.majorBump) continue;
    const escaped = dep.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Match: "name>=old"  or  "name[extra]>=old"
    const re = new RegExp(`("${escaped}(?:\\[[^\\]]+\\])?)>=[^"]+(")`);
    const updated = src.replace(re, `$1>=${dep.latest}$2`);
    if (updated !== src) {
      src = updated;
      count++;
    }
  }
  if (count > 0) writeFileSync(PYTHON_PYPROJECT, src);
  return count;
}

function replaceMavenBlockVersion(src: string, dep: CheckedDep): string {
  const [groupId, artifactId] = dep.name
    .split(":")
    .map((part) => part?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!groupId || !artifactId) return src;
  const current = dep.current.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const blockRe = /<(parent|dependency|plugin)>\s*[\s\S]*?\s*<\/\1>/g;
  return src.replace(blockRe, (block) => {
    if (
      !new RegExp(`<groupId>${groupId}</groupId>`).test(block) ||
      !new RegExp(`<artifactId>${artifactId}</artifactId>`).test(block)
    ) {
      return block;
    }
    return block.replace(new RegExp(`(<version>)${current}(</version>)`), `$1${dep.latest}$2`);
  });
}

function updateJavaTemplates(outdated: CheckedDep[]): number {
  let pom = readFileSync(JAVA_POM, "utf-8");
  let gradle = readFileSync(JAVA_GRADLE, "utf-8");
  let count = 0;

  for (const dep of outdated) {
    if (dep.majorBump) continue;
    const beforePom = pom;
    const beforeGradle = gradle;

    if (dep.file === JAVA_POM && dep.sourceKind === "maven-property" && dep.sourceKey) {
      const property = dep.sourceKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const current = dep.current.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      pom = pom.replace(
        new RegExp(`(<${property}>)${current}(</${property}>)`, "g"),
        `$1${dep.latest}$2`,
      );
    } else if (dep.file === JAVA_POM && dep.sourceKind === "maven-block") {
      pom = replaceMavenBlockVersion(pom, dep);
    } else if (dep.file === JAVA_GRADLE && dep.sourceKind === "gradle-coordinate") {
      const [groupId, artifactId] = dep.name
        .split(":")
        .map((part) => part?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
      if (groupId && artifactId) {
        const current = dep.current.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        gradle = gradle.replace(
          new RegExp(`(${groupId}:${artifactId}:)${current}`, "g"),
          `$1${dep.latest}`,
        );
      }
    } else if (dep.file === JAVA_GRADLE && dep.sourceKind === "gradle-plugin" && dep.sourceKey) {
      const pluginId = dep.sourceKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const current = dep.current.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      gradle = gradle.replace(
        new RegExp(`(id\\("${pluginId}"\\)\\s+version\\s+")${current}(")`, "g"),
        `$1${dep.latest}$2`,
      );
    }

    if (pom !== beforePom || gradle !== beforeGradle) {
      count++;
    }
  }

  if (pom !== readFileSync(JAVA_POM, "utf-8")) writeFileSync(JAVA_POM, pom);
  if (gradle !== readFileSync(JAVA_GRADLE, "utf-8")) writeFileSync(JAVA_GRADLE, gradle);
  return count;
}

// ── main ───────────────────────────────────────────────────────────────────

async function main() {
  const ecosystems: Ecosystem[] = ecosystemFilter
    ? [ecosystemFilter]
    : ["npm", "rust", "go", "python", "java"];

  // 1. Parse all sources
  let entries: DepEntry[] = [];
  for (const eco of ecosystems) {
    switch (eco) {
      case "npm":
        entries.push(...parseNpmMap());
        break;
      case "rust":
        entries.push(...parseRustCargo());
        break;
      case "go":
        entries.push(...parseGoMod());
        break;
      case "python":
        entries.push(...parsePythonPyproject());
        break;
      case "java":
        entries.push(...parseJavaTemplates());
        break;
    }
  }

  if (!jsonOutput) {
    console.log(`\nChecking ${entries.length} dependencies across ${ecosystems.join(", ")}...\n`);
  }

  // 2. Check registries
  const results = await checkAll(entries);

  const outdated = results.filter((r) => r.outdated);
  const errors = results.filter((r) => r.error);
  const minorUpdates = outdated.filter((r) => !r.majorBump);
  const majorUpdates = outdated.filter((r) => r.majorBump);

  // 3. Report
  if (jsonOutput) {
    console.log(JSON.stringify({ total: results.length, outdated, errors }, null, 2));
    process.exit(outdated.length > 0 ? 1 : 0);
  }

  if (outdated.length === 0 && errors.length === 0) {
    console.log("✅ All dependencies are up to date.\n");
    return;
  }

  if (errors.length > 0) {
    console.log(`⚠️  ${errors.length} packages could not be checked:\n`);
    for (const e of errors) {
      console.log(`   ${e.ecosystem}  ${e.name}  — ${e.error}`);
    }
    console.log();
  }

  if (minorUpdates.length > 0) {
    console.log(`📦 ${minorUpdates.length} minor/patch updates available:\n`);
    const grouped = Object.groupBy(minorUpdates, (d) => d.ecosystem);
    for (const [eco, deps] of Object.entries(grouped)) {
      console.log(`  ${eco.toUpperCase()} (${deps!.length}):`);
      for (const d of deps!) {
        console.log(`    ${d.name.padEnd(45)} ${d.currentNorm.padEnd(12)} → ${d.latest}`);
      }
      console.log();
    }
  }

  if (majorUpdates.length > 0) {
    console.log(
      `🚨 ${majorUpdates.length} MAJOR version bumps (skipped in --update, need manual review):\n`,
    );
    for (const d of majorUpdates) {
      console.log(
        `    ${d.ecosystem.padEnd(8)} ${d.name.padEnd(45)} ${d.currentNorm.padEnd(12)} → ${d.latest}`,
      );
    }
    console.log();
  }

  // 4. Update in place if requested
  if (shouldUpdate && minorUpdates.length > 0) {
    let totalUpdated = 0;
    const npmOutdated = minorUpdates.filter((d) => d.ecosystem === "npm");
    const rustOutdated = minorUpdates.filter((d) => d.ecosystem === "rust");
    const goOutdated = minorUpdates.filter((d) => d.ecosystem === "go");
    const pyOutdated = minorUpdates.filter((d) => d.ecosystem === "python");
    const javaOutdated = minorUpdates.filter((d) => d.ecosystem === "java");

    if (npmOutdated.length > 0) totalUpdated += updateNpmMap(npmOutdated);
    if (rustOutdated.length > 0) totalUpdated += updateRustCargo(rustOutdated);
    if (goOutdated.length > 0) totalUpdated += updateGoMod(goOutdated);
    if (pyOutdated.length > 0) totalUpdated += updatePythonPyproject(pyOutdated);
    if (javaOutdated.length > 0) totalUpdated += updateJavaTemplates(javaOutdated);

    console.log(`\n✅ Updated ${totalUpdated} dependencies in place.`);
    if (majorUpdates.length > 0) {
      console.log(`   ${majorUpdates.length} major bumps were skipped — review manually.`);
    }
  } else if (!shouldUpdate && outdated.length > 0) {
    console.log(`Run with --update to apply minor/patch updates.\n`);
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
