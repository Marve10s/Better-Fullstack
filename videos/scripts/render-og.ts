import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

import { OG_CARD_OUTPUTS } from "../src/campaign/og-outputs";

const entry = resolve(import.meta.dir, "../src/index.ts");
const videoRoot = resolve(import.meta.dir, "..");
const outputDirectory = resolve(import.meta.dir, "../../apps/web/public/og");
await mkdir(outputDirectory, { recursive: true });

for (const card of OG_CARD_OUTPUTS) {
  const output = resolve(outputDirectory, card.fileName);
  const process = Bun.spawn(
    [
      resolve(import.meta.dir, "../node_modules/.bin/remotion"),
      "still",
      entry,
      card.id,
      output,
      "--overwrite",
    ],
    {
      cwd: videoRoot,
      stdout: "inherit",
      stderr: "inherit",
    },
  );
  const exitCode = await process.exited;
  if (exitCode !== 0) {
    throw new Error(`Failed to render ${card.id}`);
  }
}
