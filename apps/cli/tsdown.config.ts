import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsdown";

import { capabilityProducerFingerprint } from "../../testing/lib/capability-producer-fingerprint.ts";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const producerFingerprint = capabilityProducerFingerprint(repoRoot).sha256;

export default defineConfig({
  entry: ["src/index.ts", "src/cli.ts", "src/virtual.ts", "src/mcp-entry.ts", "src/testing.ts"],
  format: ["esm"],
  clean: true,
  shims: true,
  outDir: "dist",
  dts: true,
  outputOptions: {
    banner: "#!/usr/bin/env node",
  },
  env: {
    BTS_TELEMETRY: process.env.BTS_TELEMETRY || "0",
    CONVEX_INGEST_URL: process.env.CONVEX_INGEST_URL || "",
    BTS_CAPABILITY_PRODUCER_FINGERPRINT: producerFingerprint,
  },
});
