import { describe, expect, it } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const TEMPLATES_DIR = path.resolve(
  import.meta.dir,
  "../../../packages/template-generator/templates",
);

/**
 * Generated workspace packages that intentionally do NOT ship a `check-types`
 * script. Every entry needs a documented reason. When adding a new generated
 * package, prefer giving it a real `check-types` script over allowlisting it —
 * a package that is never type-checked is exactly how drift (e.g. the
 * heroui-native and stripe apiVersion regressions) shipped silently.
 */
const CHECK_TYPES_ALLOWLIST = new Map<string, string>([
  [
    "base/package.json.hbs",
    "Root workspace package; check-types is injected as `turbo check-types` by post-process/package-configs.ts",
  ],
  [
    "packages/config/package.json.hbs",
    "Stub package with no TypeScript source; `tsc --noEmit` would fail with TS18003 (no inputs found)",
  ],
  [
    "packages/env/package.json.hbs",
    "Source is fully conditional; deferred pending per-config validation",
  ],
  ["packages/infra/package.json.hbs", "Alchemy IaC package with no tsconfig"],
  [
    "backend/convex/packages/backend/package.json.hbs",
    "Convex codegen-managed types; needs `convex codegen` before tsc",
  ],
  [
    "frontend/redwood/package.json.hbs",
    "RedwoodJS/CedarJS uses its own framework-managed type-check",
  ],
  ["frontend/redwood/web/package.json.hbs", "RedwoodJS/CedarJS framework-managed type-check"],
  ["frontend/redwood/api/package.json.hbs", "RedwoodJS/CedarJS framework-managed type-check"],
  [
    "frontend/react/tanstack-start/package.json.hbs",
    "Needs `tsr generate` + @tanstack/router-cli before tsc (follow-up, mirror tanstack-router)",
  ],
  ["frontend/nuxt/package.json.hbs", "Needs `nuxt typecheck` + vue-tsc (follow-up)"],
  ["frontend/astro/package.json.hbs", "Needs `astro check` + @astrojs/check (follow-up)"],
  [
    "frontend/angular/package.json.hbs",
    "Needs Angular compiler-based type-check, not plain tsc (follow-up)",
  ],
]);

function findPackageJsonHbs(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      findPackageJsonHbs(full, acc);
    } else if (entry === "package.json.hbs") {
      acc.push(full);
    }
  }
  return acc;
}

function hasCheckTypes(file: string): boolean {
  return readFileSync(file, "utf8").includes('"check-types"');
}

describe("generated package check-types coverage", () => {
  const files = findPackageJsonHbs(TEMPLATES_DIR);

  it("discovers the generated package.json templates", () => {
    expect(files.length).toBeGreaterThan(30);
  });

  it("every generated package defines check-types or is explicitly allowlisted", () => {
    const offenders = files
      .map((file) => path.relative(TEMPLATES_DIR, file))
      .filter((rel) => !CHECK_TYPES_ALLOWLIST.has(rel))
      .filter((rel) => !hasCheckTypes(path.join(TEMPLATES_DIR, rel)));

    // A non-empty list means a package would be generated without ever being
    // type-checked. Add a `check-types` script, or allowlist it with a reason.
    expect(offenders).toEqual([]);
  });

  it("keeps the allowlist honest (no missing or already-fixed entries)", () => {
    const stale: string[] = [];
    for (const rel of CHECK_TYPES_ALLOWLIST.keys()) {
      const full = path.join(TEMPLATES_DIR, rel);
      let content: string;
      try {
        content = readFileSync(full, "utf8");
      } catch {
        stale.push(`${rel} (file no longer exists)`);
        continue;
      }
      if (content.includes('"check-types"')) {
        stale.push(`${rel} (now defines check-types — remove from allowlist)`);
      }
    }
    expect(stale).toEqual([]);
  });
});
