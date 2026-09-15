#!/usr/bin/env bun
// oxlint-disable no-await-in-loop -- Checkpoints advance only after a page is acknowledged.
import { createHash } from "node:crypto";
import { rename } from "node:fs/promises";
import { resolve } from "node:path";

import { capturePosthog, posthogEvent, posthogHost } from "../../packages/backend/src/posthog";

const backendDirectory = resolve(import.meta.dir, "../../packages/backend");
const namespace = Buffer.from("3c41d010260a4ae6af03659c6bb88d39", "hex");

export function historicalEventId(deployment: string, id: string) {
  const bytes = createHash("sha1")
    .update(namespace)
    .update(`${deployment}:${id}`)
    .digest()
    .subarray(0, 16);
  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x50;
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function historicalEvent(value: unknown, deployment: string) {
  if (
    !record(value) ||
    typeof value._id !== "string" ||
    typeof value._creationTime !== "number" ||
    !Number.isFinite(value._creationTime)
  ) {
    throw new Error("Invalid source event metadata; checkpoint was not advanced");
  }
  return posthogEvent(value, {
    eventId: historicalEventId(deployment, value._id),
    timestamp: value._creationTime,
    historical: true,
  });
}

type Checkpoint = {
  deployment: string;
  destination: string;
  before: number;
  cursor: string | null;
  count: number;
  complete: boolean;
};

function checkpoint(value: unknown): value is Checkpoint {
  return (
    record(value) &&
    typeof value.deployment === "string" &&
    typeof value.destination === "string" &&
    typeof value.before === "number" &&
    Number.isFinite(value.before) &&
    (value.cursor === null || typeof value.cursor === "string") &&
    typeof value.count === "number" &&
    typeof value.complete === "boolean"
  );
}

async function readPage(deployment: string, before: number, cursor: string | null) {
  const query = `await ctx.db.query("analyticsEvents").withIndex("by_creation_time", q => q.lt("_creationTime", ${before})).order("asc").paginate(${JSON.stringify({ cursor, numItems: 100 })})`;
  const child = Bun.spawn(
    [
      resolve(backendDirectory, "node_modules/.bin/convex"),
      "run",
      "--deployment",
      deployment,
      "--typecheck",
      "disable",
      "--codegen",
      "disable",
      "--inline-query",
      query,
    ],
    {
      cwd: backendDirectory,
      stdout: "pipe",
      stderr: "pipe",
    },
  );
  const [stdout, , exit] = await Promise.all([
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
    child.exited,
  ]);
  if (exit !== 0)
    throw new Error(`Convex read failed with exit code ${exit}; no checkpoint advance`);
  const page: unknown = JSON.parse(stdout);
  if (
    !record(page) ||
    !Array.isArray(page.page) ||
    typeof page.continueCursor !== "string" ||
    typeof page.isDone !== "boolean"
  ) {
    throw new Error("Invalid Convex page response");
  }
  return {
    events: page.page.map((event: unknown) => historicalEvent(event, deployment)),
    cursor: page.continueCursor,
    complete: page.isDone,
  };
}

async function main() {
  const apply = Bun.argv.includes("--apply");
  const deployment = process.env.CONVEX_SOURCE_DEPLOYMENT;
  if (!deployment)
    throw new Error("Set CONVEX_SOURCE_DEPLOYMENT to the reviewed team:project:prod selection");
  const host = posthogHost(process.env.POSTHOG_HOST);
  const token = process.env.POSTHOG_PROJECT_TOKEN;
  const file = process.env.BFS_ANALYTICS_IMPORT_CHECKPOINT;
  if (apply && (!host || !token || !file))
    throw new Error(
      "Apply requires POSTHOG_HOST, POSTHOG_PROJECT_TOKEN and BFS_ANALYTICS_IMPORT_CHECKPOINT",
    );
  const before = Date.parse(process.env.BFS_ANALYTICS_IMPORT_BEFORE ?? "");
  if (!Number.isFinite(before))
    throw new Error(
      "Set BFS_ANALYTICS_IMPORT_BEFORE to the bridge cutover timestamp in ISO UTC format",
    );
  if (apply && before > Date.now() - 48 * 60 * 60 * 1000)
    throw new Error("Historical imports require a cutoff at least 48 hours in the past");
  const destination = apply
    ? createHash("sha256").update(`${host}:${token}`).digest("hex")
    : "dry-run";
  let state: Checkpoint = {
    deployment,
    destination,
    before,
    cursor: null,
    count: 0,
    complete: false,
  };
  if (apply && file && (await Bun.file(file).exists())) {
    const saved: unknown = await Bun.file(file).json();
    if (
      !checkpoint(saved) ||
      saved.deployment !== deployment ||
      saved.destination !== destination ||
      saved.before !== before
    )
      throw new Error("Checkpoint does not match this source, destination and cutover time");
    state = saved;
  }
  const maxPagesArg = Bun.argv.find((arg) => arg.startsWith("--max-pages="));
  const maxPages = maxPagesArg ? Number(maxPagesArg.split("=")[1]) : Infinity;
  if (!(maxPages > 0)) throw new Error("--max-pages must be positive");
  const monthly: Record<string, number> = {};
  for (let pageNumber = 0; !state.complete && pageNumber < maxPages; pageNumber++) {
    const page = await readPage(deployment, before, state.cursor);
    if (!page.complete && page.cursor === state.cursor)
      throw new Error("Convex cursor did not advance");
    if (apply && host && token && page.events.length)
      await capturePosthog(page.events, {
        host,
        token,
        historical: true,
        signal: AbortSignal.timeout(30_000),
      });
    for (const event of page.events) {
      const month = event.timestamp.slice(0, 7);
      monthly[month] = (monthly[month] ?? 0) + 1;
    }
    state = {
      ...state,
      cursor: page.cursor,
      count: state.count + page.events.length,
      complete: page.complete,
    };
    if (apply && file) {
      const temporary = `${file}.tmp`;
      await Bun.write(temporary, JSON.stringify(state, null, 2));
      await rename(temporary, file);
    }
    console.log(
      JSON.stringify({
        mode: apply ? "import" : "dry-run",
        count: state.count,
        complete: state.complete,
      }),
    );
  }
  console.log(JSON.stringify({ monthlyEventsProcessed: monthly }));
}

if (import.meta.main) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : "Import failed; no raw events logged");
    process.exitCode = 1;
  });
}
