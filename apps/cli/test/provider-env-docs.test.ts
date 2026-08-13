import type { ProjectConfig } from "@better-fullstack/types";

import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { createVirtual } from "../src/index";
import { listVirtualTreeFiles } from "./virtual-tree-utils";

const ENV_DOCS_PATH = resolve(
  import.meta.dir,
  "../../web/content/docs/provider-setup/environment-variables.mdx",
);

type ProviderEnvContract = {
  id: string;
  baseline: Partial<Omit<ProjectConfig, "projectDir" | "relativePath">>;
  config: Partial<Omit<ProjectConfig, "projectDir" | "relativePath">>;
  keys: string[];
};

const CONTRACTS: ProviderEnvContract[] = [
  {
    id: "better-auth",
    baseline: { auth: "none", database: "sqlite", orm: "drizzle" },
    config: { auth: "better-auth", database: "sqlite", orm: "drizzle" },
    keys: ["BETTER_AUTH_SECRET", "BETTER_AUTH_URL"],
  },
  {
    id: "stripe",
    baseline: { auth: "better-auth", database: "sqlite", orm: "drizzle", payments: "none" },
    config: { auth: "better-auth", database: "sqlite", orm: "drizzle", payments: "stripe" },
    keys: ["VITE_STRIPE_PUBLISHABLE_KEY", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"],
  },
  {
    id: "resend",
    baseline: { email: "none" },
    config: { email: "resend" },
    keys: ["RESEND_API_KEY", "RESEND_FROM_EMAIL"],
  },
  {
    id: "sentry",
    baseline: { observability: "none" },
    config: { observability: "sentry" },
    keys: [
      "SENTRY_DSN",
      "SENTRY_ENVIRONMENT",
      "SENTRY_TRACES_SAMPLE_RATE",
      "SENTRY_PROFILES_SAMPLE_RATE",
    ],
  },
  {
    id: "upstash-redis",
    baseline: { caching: "none" },
    config: { caching: "upstash-redis" },
    keys: ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "UPSTASH_REDIS_URL"],
  },
  {
    id: "s3",
    baseline: { fileStorage: "none" },
    config: { fileStorage: "s3" },
    keys: [
      "AWS_S3_REGION",
      "AWS_S3_ACCESS_KEY_ID",
      "AWS_S3_SECRET_ACCESS_KEY",
      "AWS_S3_BUCKET_NAME",
    ],
  },
  {
    id: "r2",
    baseline: { fileStorage: "none" },
    config: { fileStorage: "r2" },
    keys: ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET_NAME"],
  },
];

function envKeysForTree(tree: NonNullable<Awaited<ReturnType<typeof createVirtual>>["tree"]>) {
  return new Set(
    listVirtualTreeFiles(tree)
      .filter((file) => /(^|\/)\.env(?:\.example|\.local)?$/.test(file.path))
      .flatMap((file) =>
        file.content.split("\n").flatMap((line) => line.match(/^([A-Z][A-Z0-9_]*)=/)?.[1] ?? []),
      ),
  );
}

describe("provider environment documentation", () => {
  it("matches exact generated keys for documented provider selections", async () => {
    const docs = readFileSync(ENV_DOCS_PATH, "utf8");
    const results = await Promise.all(
      CONTRACTS.map(async (contract) => ({
        contract,
        baseline: await createVirtual({
          projectName: `env-docs-${contract.id}-baseline`,
          ...contract.baseline,
        }),
        generated: await createVirtual({
          projectName: `env-docs-${contract.id}`,
          ...contract.config,
        }),
      })),
    );

    for (const { contract, baseline, generated } of results) {
      expect(baseline.success, `${contract.id} baseline: ${baseline.error}`).toBe(true);
      expect(baseline.tree).toBeDefined();
      expect(generated.success, `${contract.id}: ${generated.error}`).toBe(true);
      expect(generated.tree).toBeDefined();
      const baselineKeys = envKeysForTree(baseline.tree!);
      const generatedKeys = envKeysForTree(generated.tree!);
      const providerKeys = [...generatedKeys].filter((key) => !baselineKeys.has(key)).sort();

      expect(docs).toContain(`{/* env-contract:${contract.id} ${contract.keys.join(",")} */}`);
      expect(providerKeys, `${contract.id} generated-key delta`).toEqual([...contract.keys].sort());
    }
  });
});
