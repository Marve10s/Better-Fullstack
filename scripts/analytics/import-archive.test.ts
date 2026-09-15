import { afterEach, expect, it } from "bun:test";
import { createHash } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { historicalEvent } from "./historical-event";
import { importArchive, readArchive } from "./import-archive";

const directories: string[] = [];
afterEach(async () => {
  await Promise.all(
    directories.splice(0).map((path) => rm(path, { recursive: true, force: true })),
  );
});

async function fixture(count = 1) {
  const directory = await mkdtemp(join(tmpdir(), "bfs-archive-test-"));
  directories.push(directory);
  const events = Array.from({ length: count }, (_, index) =>
    historicalEvent(
      {
        _id: `row-${index}`,
        _creationTime: Date.UTC(2026, 0, 1) + index,
        eventType: "project_created",
        machineId: "a161dd43-c485-4bdb-9906-acbd1087c8b0",
        stack: { backend: "hono", ecosystem: "typescript" },
      },
      "source:project:prod",
    ),
  );
  const contents = events.map((event) => JSON.stringify(event) + "\n").join("");
  await Bun.write(join(directory, "posthog-events.jsonl"), contents);
  await Bun.write(
    join(directory, "manifest.json"),
    JSON.stringify({
      format: "better-fullstack-analytics-archive-v1",
      events: count,
      sha256: createHash("sha256").update(contents).digest("hex"),
    }),
  );
  return { directory, events };
}

it("reads independent history with identical identity, time and canonical choices, and rejects corruption", async () => {
  const { directory, events } = await fixture();
  expect((await readArchive(directory)).events).toEqual(events);
  await Bun.write(join(directory, "posthog-events.jsonl"), "{}\n");
  await expect(readArchive(directory)).rejects.toThrow("checksum");
});

it("resumes only acknowledged batches and refuses changed destinations", async () => {
  const { directory, events } = await fixture(205);
  const archive = await readArchive(directory);
  const checkpointFile = join(directory, "checkpoint.json");
  const options = {
    archive,
    destination: "destination-one",
    checkpointFile,
    now: Date.UTC(2026, 2, 1),
  };
  const accepted: string[] = [];
  await expect(
    importArchive({
      ...options,
      send: async (batch) => {
        if (accepted.length === 100) throw new Error("upstream unavailable");
        accepted.push(...batch.map((event) => event.uuid));
      },
    }),
  ).rejects.toThrow("upstream unavailable");
  expect((await Bun.file(checkpointFile).json()).count).toBe(100);
  const send = async (batch: typeof events) => {
    accepted.push(...batch.map((event) => event.uuid));
  };
  await expect(importArchive({ ...options, destination: "destination-two", send })).rejects.toThrow(
    "Checkpoint",
  );
  expect(await importArchive({ ...options, send })).toBe(205);
  expect(accepted).toEqual(events.map((event) => event.uuid));
  await importArchive({ ...options, send });
  expect(accepted.length).toBe(205);
});

it("rejects recent history before sending or recording progress", async () => {
  const { directory } = await fixture();
  const archive = await readArchive(directory);
  const checkpointFile = join(directory, "checkpoint.json");
  await expect(
    importArchive({
      archive,
      destination: "destination",
      checkpointFile,
      now: Date.UTC(2026, 0, 2),
      send: async () => {
        throw new Error("must not send recent data");
      },
    }),
  ).rejects.toThrow("48 hours");
  expect(await Bun.file(checkpointFile).exists()).toBe(false);
});
