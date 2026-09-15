#!/usr/bin/env bun
// oxlint-disable no-await-in-loop -- Acknowledged batches advance the durable checkpoint in order.
import { createHash } from "node:crypto";
import { rename } from "node:fs/promises";
import { resolve } from "node:path";

import {
  capturePosthog,
  posthogEvent,
  posthogHost,
  type PostHogEvent,
} from "@web/lib/telemetry/posthog";

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export async function readArchive(directory: string) {
  const file = Bun.file(resolve(directory, "posthog-events.jsonl"));
  if (file.size > 256 * 1024 * 1024) throw new Error("Archive exceeds the 256 MiB import limit");
  const contents = await file.text();
  const sha256 = createHash("sha256").update(contents).digest("hex");
  const manifest: unknown = await Bun.file(resolve(directory, "manifest.json")).json();
  if (
    !record(manifest) ||
    manifest.format !== "better-fullstack-analytics-archive-v1" ||
    manifest.conversionVersion !== 2 ||
    manifest.sha256 !== sha256
  ) {
    throw new Error(
      "Archive manifest or checksum is invalid; rebuild older conversions from the original backup",
    );
  }
  const ids = new Set<string>();
  const events = contents
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => {
      const value: unknown = JSON.parse(line);
      if (
        !record(value) ||
        typeof value.uuid !== "string" ||
        !/^[a-f0-9]{8}-[a-f0-9]{4}-5[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(value.uuid) ||
        typeof value.timestamp !== "string" ||
        !Number.isFinite(Date.parse(value.timestamp)) ||
        !record(value.properties) ||
        value.properties.historical_import !== true ||
        ids.has(value.uuid)
      ) {
        throw new Error("Invalid or duplicate archive event");
      }
      ids.add(value.uuid);
      // Reapply the ingestion allowlist before upload, even for a checksum-verified local archive.
      const event = posthogEvent(
        { ...value.properties, machineId: value.properties.distinct_id },
        {
          eventId: value.uuid,
          timestamp: Date.parse(value.timestamp),
          historical: true,
        },
      );
      if (event.event !== value.event)
        throw new Error("Archive event name does not match its canonical properties");
      return event;
    });
  if (!events.length || events.length !== manifest.events)
    throw new Error("Archive event count does not match its manifest");
  return { sha256, events };
}

export async function importArchive(options: {
  archive: Awaited<ReturnType<typeof readArchive>>;
  destination: string;
  checkpointFile: string;
  send: (events: PostHogEvent[]) => Promise<void>;
  now?: number;
}) {
  const { archive, destination, checkpointFile, send } = options;
  const latestAllowed = (options.now ?? Date.now()) - 48 * 60 * 60 * 1000;
  if (archive.events.some((event) => Date.parse(event.timestamp) > latestAllowed)) {
    throw new Error("Every historical event must be at least 48 hours old");
  }
  let count = 0;
  if (await Bun.file(checkpointFile).exists()) {
    const saved: unknown = await Bun.file(checkpointFile).json();
    if (
      !record(saved) ||
      saved.archive !== archive.sha256 ||
      saved.destination !== destination ||
      typeof saved.count !== "number" ||
      !Number.isSafeInteger(saved.count) ||
      saved.count < 0 ||
      saved.count > archive.events.length
    ) {
      throw new Error("Checkpoint does not match this archive and destination");
    }
    count = saved.count;
  }
  while (count < archive.events.length) {
    const batch = archive.events.slice(count, count + 100);
    await send(batch);
    count += batch.length;
    const temporary = `${checkpointFile}.tmp`;
    await Bun.write(
      temporary,
      JSON.stringify({ archive: archive.sha256, destination, count }, null, 2),
    );
    await rename(temporary, checkpointFile);
  }
  return count;
}

async function main() {
  const directory = process.env.BFS_ANALYTICS_ARCHIVE_DIRECTORY;
  if (!directory) throw new Error("Set BFS_ANALYTICS_ARCHIVE_DIRECTORY to a verified archive");
  const archive = await readArchive(directory);
  const monthly: Record<string, number> = {};
  for (const event of archive.events) {
    const month = event.timestamp.slice(0, 7);
    monthly[month] = (monthly[month] ?? 0) + 1;
  }
  if (Bun.argv.includes("--apply")) {
    const host = posthogHost(process.env.POSTHOG_HOST);
    const token = process.env.POSTHOG_PROJECT_TOKEN;
    const checkpointFile = process.env.BFS_ANALYTICS_IMPORT_CHECKPOINT;
    if (!host || !token || !checkpointFile)
      throw new Error(
        "Apply requires POSTHOG_HOST, POSTHOG_PROJECT_TOKEN and BFS_ANALYTICS_IMPORT_CHECKPOINT",
      );
    if (
      ["manifest.json", "posthog-events.jsonl"].some(
        (name) => resolve(directory, name) === resolve(checkpointFile),
      )
    ) {
      throw new Error("Checkpoint must not overwrite archive files");
    }
    await importArchive({
      archive,
      destination: createHash("sha256").update(`${host}:${token}`).digest("hex"),
      checkpointFile,
      send: (events) =>
        capturePosthog(events, {
          host,
          token,
          historical: true,
          signal: AbortSignal.timeout(30_000),
        }),
    });
  }
  console.log(
    JSON.stringify({
      mode: Bun.argv.includes("--apply") ? "import" : "dry-run",
      events: archive.events.length,
      sha256: archive.sha256,
      monthly,
    }),
  );
}

if (import.meta.main) {
  main().catch(() => {
    console.error(
      "Archive import failed. Check the archive, checkpoint and destination configuration; no raw events were logged.",
    );
    process.exitCode = 1;
  });
}
