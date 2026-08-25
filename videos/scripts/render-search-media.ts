import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

import { SEARCH_MEDIA_SPECS } from "@/search-media/specs";

const entry = resolve(import.meta.dir, "../src/index.ts");
const videoRoot = resolve(import.meta.dir, "..");
const outputDirectory = resolve(import.meta.dir, "../../apps/web/public/search-media");
const remotion = resolve(import.meta.dir, "../node_modules/.bin/remotion");

await mkdir(outputDirectory, { recursive: true });

async function render(args: string[], label: string) {
  const process = Bun.spawn([remotion, ...args], {
    cwd: videoRoot,
    stdout: "inherit",
    stderr: "inherit",
  });
  const exitCode = await process.exited;
  if (exitCode !== 0) throw new Error(`Failed to render ${label}`);
}

async function renderSpec(index: number): Promise<void> {
  const spec = SEARCH_MEDIA_SPECS[index];
  if (!spec) return;

  await render(
    ["still", entry, spec.stillId, resolve(outputDirectory, `${spec.fileName}.png`), "--overwrite"],
    spec.stillId,
  );
  await render(
    [
      "render",
      entry,
      spec.id,
      resolve(outputDirectory, `${spec.fileName}.mp4`),
      "--codec=h264",
      "--crf=20",
      "--overwrite",
    ],
    spec.id,
  );

  await renderSpec(index + 1);
}

await renderSpec(0);
