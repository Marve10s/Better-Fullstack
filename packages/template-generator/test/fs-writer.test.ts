import { describe, expect, it } from "bun:test";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { VirtualFileSystem } from "../src/core/virtual-fs";
import { writeSelectedFiles } from "../src/fs-writer";
import type { VirtualFileTree } from "../src/types";

describe("fs-writer", () => {
  it("writes selected files using paths relative to the virtual project root", async () => {
    const vfs = new VirtualFileSystem();
    vfs.writeFile("apps/server/pyproject.toml", "[project]\nname = \"app\"\n");
    vfs.writeFile("apps/web/package.json", "{}\n");

    const tree: VirtualFileTree = {
      root: vfs.toTree("app"),
      fileCount: vfs.getFileCount(),
      directoryCount: vfs.getDirectoryCount(),
      config: {} as VirtualFileTree["config"],
    };
    const projectDir = await mkdtemp(join(tmpdir(), "bfs-fs-writer-"));

    const written = await writeSelectedFiles(
      tree,
      projectDir,
      (filePath) => filePath === "apps/server/pyproject.toml",
    );

    expect(written).toEqual(["apps/server/pyproject.toml"]);
    await expect(readFile(join(projectDir, "apps/server/pyproject.toml"), "utf-8")).resolves.toContain(
      "name = \"app\"",
    );
  });
});
