import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import path from "node:path";

import { dependencyVersionMap } from "../src/utils/add-deps";

/**
 * Tier-2 "API-surface literal drift" guard.
 *
 * Some templates hard-code string literals that are really part of a
 * dependency's API surface and are version-coupled: the value is only valid
 * for a given MAJOR of the package it talks to. Examples we have shipped
 * regressions on: the Stripe `apiVersion`, the expo `app.json` `web.output`,
 * and the drizzle mysql2 `connection` shape.
 *
 * Plain text/version tests don't catch these because the literal lives in a
 * `.hbs` template while the version lives in `add-deps.ts`. This guard ties
 * the two together: each entry pins the EXPECTED literal per package major.
 * When the pinned dependency's major changes, the major drops out of the
 * expected map and the guard fails until a human re-verifies the literal
 * against the new major's API and updates the map. When the literal itself is
 * edited away from the expected value, the guard fails too.
 *
 * Keep this focused and low-false-positive: only literals that are genuinely
 * coupled to a package major belong here. Add new guards to API_LITERAL_GUARDS.
 */

const TEMPLATES_DIR = path.resolve(import.meta.dir, "../templates");

type DependencyName = keyof typeof dependencyVersionMap;

interface ApiLiteralGuard {
  /** Human label used in test names. */
  readonly label: string;
  /** Dependency in dependencyVersionMap that owns this API surface. */
  readonly dependency: DependencyName;
  /** Template file (relative to templates/) containing the literal. */
  readonly templateFile: string;
  /**
   * Extracts the hard-coded literal from the template source. Returns null
   * when the literal can no longer be found (template was restructured) so the
   * guard fails loudly instead of silently passing.
   */
  readonly extractLiteral: (source: string) => string | null;
  /**
   * Expected literal value keyed by the dependency's MAJOR version. When the
   * pinned major is missing here the guard fails, forcing a human to verify
   * the literal against the new major and extend the map.
   */
  readonly expectedByMajor: Readonly<Record<number, string>>;
}

const API_LITERAL_GUARDS: readonly ApiLiteralGuard[] = [
  {
    label: "stripe apiVersion",
    dependency: "stripe",
    templateFile: "payments/stripe/server/base/src/lib/stripe.ts.hbs",
    extractLiteral: (source) => source.match(/apiVersion:\s*"([^"]+)"/)?.[1] ?? null,
    // Stripe's `apiVersion` string is tied to the major of the `stripe` SDK.
    // Verify the pinned value against https://docs.stripe.com/api/versioning
    // whenever the major below changes, then add the new entry.
    expectedByMajor: {
      22: "2026-05-27.dahlia",
    },
  },
];

function majorOf(versionSpec: string): number {
  const cleaned = versionSpec.replace(/^[\^~>=<\s]+/, "");
  const major = Number.parseInt(cleaned.split(".")[0] ?? "", 10);
  return major;
}

function readTemplate(templateFile: string): string {
  return readFileSync(path.join(TEMPLATES_DIR, templateFile), "utf8");
}

describe("API-surface literal drift", () => {
  for (const guard of API_LITERAL_GUARDS) {
    describe(guard.label, () => {
      const versionSpec = dependencyVersionMap[guard.dependency];
      const major = majorOf(versionSpec);

      it(`pins a parseable major for ${guard.dependency} (${versionSpec})`, () => {
        expect(Number.isNaN(major)).toBe(false);
      });

      it(`tracks an expected literal for ${guard.dependency} major ${major}`, () => {
        if (!(major in guard.expectedByMajor)) {
          throw new Error(
            `${guard.dependency} is pinned to ${versionSpec} (major ${major}) but ` +
              `no expected ${guard.label} literal is registered for that major. ` +
              `Verify the literal in ${guard.templateFile} against the new major's ` +
              `API surface, then add ${major} -> "<value>" to expectedByMajor.`,
          );
        }
        expect(guard.expectedByMajor[major]).toBeDefined();
      });

      it(`matches the hard-coded literal in ${guard.templateFile}`, () => {
        const source = readTemplate(guard.templateFile);
        const actual = guard.extractLiteral(source);

        if (actual === null) {
          throw new Error(
            `Could not locate the ${guard.label} literal in ${guard.templateFile}. ` +
              `The template was likely restructured; update extractLiteral for this guard.`,
          );
        }

        const expected = guard.expectedByMajor[major];
        if (expected === undefined) {
          // Covered by the dedicated test above; skip the value comparison here.
          return;
        }

        expect(actual).toBe(expected);
      });
    });
  }
});
