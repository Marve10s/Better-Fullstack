import type { VirtualDirectory } from "@better-fullstack/template-generator/browser";

import { describe, expect, it } from "bun:test";
import { strFromU8, unzipSync } from "fflate";

import { createProjectArchive } from "../src/lib/project-download";

function projectTree(): VirtualDirectory {
  return {
    type: "directory",
    path: "",
    name: "my project",
    children: [
      {
        type: "file",
        path: "README.md",
        name: "README.md",
        extension: "md",
        content: "# My project\n",
      },
      {
        type: "directory",
        path: "apps",
        name: "apps",
        children: [
          {
            type: "file",
            path: "apps/web/favicon.ico",
            name: "favicon.ico",
            extension: "ico",
            content: "[Binary file]",
            sourcePath: "frontend/nuxt/public/favicon.ico",
          },
        ],
      },
    ],
  };
}

describe("createProjectArchive", () => {
  it("creates a project-rooted ZIP with text and binary files", async () => {
    const binaryBytes = new Uint8Array([0, 1, 2, 255]);
    const requestedBinaryPaths: string[] = [];
    const archive = await createProjectArchive(projectTree(), async (sourcePath) => {
      requestedBinaryPaths.push(sourcePath);
      return binaryBytes;
    });
    const files = unzipSync(archive.bytes);

    expect(archive.fileName).toBe("my-project.zip");
    expect(strFromU8(files["my-project/README.md"]!)).toBe("# My project\n");
    expect(files["my-project/apps/web/favicon.ico"]).toEqual(binaryBytes);
    expect(requestedBinaryPaths).toEqual(["frontend/nuxt/public/favicon.ico"]);
  });

  it("rejects generated paths that could escape the archive root", async () => {
    const tree = projectTree();
    const file = tree.children[0];
    if (file?.type === "file") file.path = "../README.md";

    await expect(createProjectArchive(tree, async () => new Uint8Array())).rejects.toThrow(
      "Unsafe generated project path",
    );
  });

  it("rejects empty generated projects", async () => {
    const tree: VirtualDirectory = {
      type: "directory",
      path: "",
      name: "empty",
      children: [],
    };

    await expect(createProjectArchive(tree, async () => new Uint8Array())).rejects.toThrow(
      "does not contain any files",
    );
  });
});
