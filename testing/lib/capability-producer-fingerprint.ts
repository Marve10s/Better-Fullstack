import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const CAPABILITY_PRODUCER_PATHS = [
  "bun.lock",
  "apps/cli/tsdown.config.ts",
  "packages/types/src",
  "packages/template-generator/src",
  "packages/template-generator/templates",
  "testing/generated-project-proof.ts",
  "testing/lib/capability-producer-fingerprint.ts",
  "testing/lib/generated-project-proof-matrix.ts",
  "testing/lib/presets.ts",
] as const;

export function capabilityProducerFingerprint(repoRoot: string): {
  files: string[];
  sha256: string;
} {
  const files = execFileSync("git", ["ls-files", ...CAPABILITY_PRODUCER_PATHS], {
    cwd: repoRoot,
    encoding: "utf8",
  })
    .trim()
    .split("\n")
    .filter(Boolean)
    .sort();
  const hash = createHash("sha256");
  for (const file of files) {
    hash.update(`${file}\0`);
    hash.update(readFileSync(resolve(repoRoot, file)));
    hash.update("\0");
  }
  return { files, sha256: hash.digest("hex") };
}
