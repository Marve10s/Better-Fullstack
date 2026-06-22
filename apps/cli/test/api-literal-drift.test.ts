import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "bun:test";

/**
 * API-literal drift guard.
 *
 * These templates embed third-party API literals directly in generated code.
 * When the underlying SDK changes its expected shape, these literals must be
 * bumped *intentionally* — a silent drift produces projects that compile but
 * talk to the wrong API surface.
 *
 * Each expected value below is asserted against the literal currently shipped
 * in the template. If you deliberately bump a literal (e.g. a Stripe API
 * version), update the matching constant here in the same change so the guard
 * stays meaningful. The test FAILS if a literal changes without that update.
 */

const TEMPLATES_DIR = resolve(
  import.meta.dir,
  "..",
  "..",
  "..",
  "packages",
  "template-generator",
  "templates",
);

const STRIPE_LIB_TEMPLATE = resolve(
  TEMPLATES_DIR,
  "payments",
  "stripe",
  "server",
  "base",
  "src",
  "lib",
  "stripe.ts.hbs",
);

const DRIZZLE_MYSQL_TEMPLATE = resolve(
  TEMPLATES_DIR,
  "db",
  "drizzle",
  "mysql",
  "src",
  "index.ts.hbs",
);

// Bumping this requires an intentional template change (see file header).
const EXPECTED_STRIPE_API_VERSION = "2026-05-27.dahlia";

// Drizzle's mysql2 driver expects a flat connection string plus `mode`.
// The old, broken shape was `connection: { uri: env.DATABASE_URL }`.
const EXPECTED_DRIZZLE_MYSQL_CONNECTION = "connection: env.DATABASE_URL";
const EXPECTED_DRIZZLE_MYSQL_MODE = /mode:\s*"default"/;
const FORBIDDEN_DRIZZLE_MYSQL_URI_FORM = /connection:\s*\{\s*uri\s*:/;

describe("API-literal drift guard", () => {
  it("keeps the Stripe apiVersion literal pinned", async () => {
    const source = await readFile(STRIPE_LIB_TEMPLATE, "utf8");
    const match = source.match(/apiVersion:\s*"([^"]+)"/);

    expect(match).not.toBeNull();
    // Equality (not substring) so any change to the literal fails the guard.
    expect(match?.[1]).toBe(EXPECTED_STRIPE_API_VERSION);
  });

  it("keeps the Drizzle MySQL connection in the flat `mode`-based shape", async () => {
    const source = await readFile(DRIZZLE_MYSQL_TEMPLATE, "utf8");

    // New shape must be present...
    expect(source).toContain(EXPECTED_DRIZZLE_MYSQL_CONNECTION);
    expect(source).toMatch(EXPECTED_DRIZZLE_MYSQL_MODE);

    // ...and the regressed object/`uri` shape must NOT come back.
    expect(source).not.toMatch(FORBIDDEN_DRIZZLE_MYSQL_URI_FORM);
    expect(source).not.toContain("uri:");
  });
});
