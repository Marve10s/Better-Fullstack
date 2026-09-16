import { expect, it } from "bun:test";
import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { writeAnalyticsArchive } from "./archive-convex";
import { readArchive } from "./import-archive";

it("publishes complete archives and permits retry after a failed conversion", async () => {
  const parent = await mkdtemp(join(tmpdir(), "bfs-archive-finalization-"));
  const destination = join(parent, "history");
  const row = JSON.stringify({ _id: "one", _creationTime: 1 });
  try {
    await expect(
      writeAnalyticsArchive(`${row}\ninvalid-json`, "source", destination),
    ).rejects.toThrow();
    expect(await readdir(parent)).toEqual([]);
    await writeAnalyticsArchive(row, "source", destination);
    expect((await readArchive(destination)).events.length).toBe(1);
    await expect(writeAnalyticsArchive(row, "source", destination)).rejects.toThrow(
      "already exists",
    );
    expect((await readArchive(destination)).events.length).toBe(1);
  } finally {
    await rm(parent, { recursive: true, force: true });
  }
});
