import { describe, expect, it } from "bun:test";

import {
  CapabilityPackManifestSchema,
  REGISTRY_LOCK_VERSION,
  RegistryLockSchema,
} from "../src/registry";

describe("CapabilityPackManifestSchema", () => {
  it("parses a valid manifest and applies defaults", () => {
    const parsed = CapabilityPackManifestSchema.parse({
      name: "@acme/rate-limit",
      version: "1.0.0",
      description: "Token-bucket rate limiting",
      files: [{ path: "apps/server/src/lib/rate-limit.ts", content: "export const x = 1;\n" }],
      dependencies: { "apps/server": { "@acme/limiter": "^1.2.0" } },
      env: [{ key: "RATE_LIMIT_MAX", value: "100", description: "Requests per window" }],
      addons: ["rate-limit"],
    });

    // File-level defaults are filled in.
    expect(parsed.files[0]?.template).toBe(false);
    expect(parsed.files[0]?.overwrite).toBe(false);
    expect(parsed.dependencies?.["apps/server"]?.["@acme/limiter"]).toBe("^1.2.0");
    expect(parsed.env[0]?.key).toBe("RATE_LIMIT_MAX");
  });

  it("defaults files/env to empty arrays when omitted", () => {
    const parsed = CapabilityPackManifestSchema.parse({ name: "minimal", version: "0.0.1" });
    expect(parsed.files).toEqual([]);
    expect(parsed.env).toEqual([]);
  });

  it("rejects a manifest missing required fields", () => {
    const result = CapabilityPackManifestSchema.safeParse({ description: "no name/version" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path.join("."));
      expect(paths).toContain("name");
      expect(paths).toContain("version");
    }
  });

  it("rejects a file entry with a non-string path", () => {
    const result = CapabilityPackManifestSchema.safeParse({
      name: "bad",
      version: "1.0.0",
      files: [{ path: 123, content: "x" }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects an env key that is not a valid identifier", () => {
    const result = CapabilityPackManifestSchema.safeParse({
      name: "bad-env",
      version: "1.0.0",
      env: [{ key: "not a key" }],
    });
    expect(result.success).toBe(false);
  });
});

describe("RegistryLockSchema", () => {
  it("defaults to the current version with no packs", () => {
    const parsed = RegistryLockSchema.parse({});
    expect(parsed.version).toBe(REGISTRY_LOCK_VERSION);
    expect(parsed.packs).toEqual([]);
  });

  it("parses a lockfile with installed packs", () => {
    const parsed = RegistryLockSchema.parse({
      version: REGISTRY_LOCK_VERSION,
      packs: [
        {
          name: "@acme/rate-limit",
          version: "1.0.0",
          source: "/tmp/sample-pack/registry.json",
          files: ["apps/server/src/lib/rate-limit.ts"],
          installedAt: new Date().toISOString(),
        },
      ],
    });
    expect(parsed.packs).toHaveLength(1);
    expect(parsed.packs[0]?.name).toBe("@acme/rate-limit");
  });
});
