#!/usr/bin/env bun
import { createHash } from "node:crypto";
import { lstat, mkdtemp, rename, rm } from "node:fs/promises";
import { resolve } from "node:path";

import { historicalEvent } from "./historical-event";

async function main() {
  const backup = process.env.CONVEX_BACKUP_ZIP;
  const deployment = process.env.CONVEX_SOURCE_DEPLOYMENT;
  const output = process.env.BFS_ANALYTICS_ARCHIVE_DIRECTORY;
  if (!backup || !deployment || !output)
    throw new Error(
      "Set CONVEX_BACKUP_ZIP, CONVEX_SOURCE_DEPLOYMENT and BFS_ANALYTICS_ARCHIVE_DIRECTORY",
    );

  // Read only the analytics table. Other tables and environment backups never enter the archive.
  const child = Bun.spawn(["unzip", "-p", resolve(backup), "analyticsEvents/documents.jsonl"], {
    stdout: "pipe",
    stderr: "pipe",
  });
  const [contents, , exit] = await Promise.all([
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
    child.exited,
  ]);
  if (exit !== 0) throw new Error(`Backup analytics extraction failed with exit code ${exit}`);

  await writeAnalyticsArchive(contents, deployment, output);
}

export async function writeAnalyticsArchive(contents: string, deployment: string, output: string) {
  const destination = resolve(output);
  try {
    await lstat(destination);
    throw new Error("Archive destination already exists");
  } catch (error) {
    if (!(error && typeof error === "object" && "code" in error && error.code === "ENOENT"))
      throw error;
  }
  const directory = await mkdtemp(`${destination}.partial-`);
  try {
    const temporary = resolve(directory, "posthog-events.jsonl.partial");
    const writer = Bun.file(temporary).writer();
    const ids = new Set<string>();
    const monthly: Record<string, { events: number; projectCreated: number }> = {};
    const digest = createHash("sha256");
    let first: string | undefined;
    let last: string | undefined;
    try {
      for (const line of contents.split("\n")) {
        if (!line.trim()) continue;
        let row: unknown;
        try {
          row = JSON.parse(line);
        } catch {
          throw new Error("Backup contains invalid JSON; archive remains partial");
        }
        const event = historicalEvent(row, deployment);
        if (ids.has(event.uuid)) throw new Error("Duplicate source event; archive remains partial");
        ids.add(event.uuid);
        first = first === undefined || event.timestamp < first ? event.timestamp : first;
        last = last === undefined || event.timestamp > last ? event.timestamp : last;
        const month = event.timestamp.slice(0, 7);
        const totals = (monthly[month] ??= { events: 0, projectCreated: 0 });
        totals.events++;
        if (event.event === "project_created") totals.projectCreated++;
        const encoded = JSON.stringify(event) + "\n";
        digest.update(encoded);
        writer.write(encoded);
      }
    } finally {
      await writer.end();
    }
    if (!ids.size) throw new Error("Backup contains no analytics events; archive remains partial");
    await rename(temporary, resolve(directory, "posthog-events.jsonl"));
    const manifest = {
      format: "better-fullstack-analytics-archive-v1",
      conversionVersion: 2,
      sourceDeployment: deployment,
      createdAt: new Date().toISOString(),
      events: ids.size,
      first,
      last,
      sha256: digest.digest("hex"),
      monthly,
      projectCreatedMeaning:
        "Recorded creation events, including failed and unknown historical outcomes",
      importedIntoPostHog: false,
    };
    await Bun.write(resolve(directory, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
    await rename(directory, destination);
    console.log(JSON.stringify(manifest));
    return manifest;
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

if (import.meta.main) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : "Archive failed; no raw events logged");
    process.exitCode = 1;
  });
}
