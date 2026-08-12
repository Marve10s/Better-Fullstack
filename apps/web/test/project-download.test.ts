import type { VirtualDirectory } from "@better-fullstack/template-generator/browser";

import { describe, expect, it } from "bun:test";
import { strFromU8, unzipSync } from "fflate";
import { createHash } from "node:crypto";

import { stackStateToProjectConfig } from "../src/lib/preview-config";
import { createProjectArchive } from "../src/lib/project-download";
import { DEFAULT_STACK } from "../src/lib/stack-defaults";

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

  it("adds the canonical config and byte-accurate manifest-v2 baseline", async () => {
    const createdAt = "2026-08-10T09:00:00.000Z";
    const binaryBytes = new Uint8Array([0, 1, 2, 255]);
    const tree = projectTree();
    tree.children.push({
      type: "file",
      path: "package.json",
      name: "package.json",
      extension: "json",
      content: '{"scripts":{"build":"vite build"}}\n',
    });
    const archive = await createProjectArchive(tree, async () => binaryBytes, {
      config: stackStateToProjectConfig(DEFAULT_STACK),
      cliVersion: "2.5.0-test",
      createdAt,
    });
    const repeatedArchive = await createProjectArchive(tree, async () => binaryBytes, {
      config: stackStateToProjectConfig(DEFAULT_STACK),
      cliVersion: "2.5.0-test",
      createdAt,
    });
    const files = unzipSync(archive.bytes);
    const repeatedFiles = unzipSync(repeatedArchive.bytes);
    const configText = strFromU8(files["my-project/bts.jsonc"]!);
    const config = JSON.parse(configText.slice(configText.indexOf("{"))) as Record<string, unknown>;
    const manifest = JSON.parse(strFromU8(files["my-project/bts.lock.json"]!)) as {
      version: string;
      createdAt: string;
      updatedAt: string;
      provenance: {
        state: string;
        createdWith: Record<string, string>;
        current: Record<string, string>;
      };
      history: Array<{ operation: string; changes: { added: number } }>;
      hashes: Record<string, string>;
      baselines?: Record<string, string>;
    };

    expect(config.version).toBe("2.5.0-test");
    expect(config.createdAt).toBe(createdAt);
    expect(config.ecosystem).toBe("typescript");
    expect(config.projectDir).toBeUndefined();
    expect(config.install).toBeUndefined();
    expect(manifest.version).toBe("2");
    expect(manifest.createdAt).toBe(createdAt);
    expect(manifest.updatedAt).toBe(createdAt);
    expect(manifest.provenance).toEqual({
      state: "verified",
      createdWith: {
        cli: "2.5.0-test",
        generator: "2.5.0-test",
        templateSet: "2.5.0-test",
        schema: "1",
      },
      current: {
        cli: "2.5.0-test",
        generator: "2.5.0-test",
        templateSet: "2.5.0-test",
        schema: "1",
      },
    });
    expect(manifest.history).toMatchObject([{ operation: "create", changes: { added: 3 } }]);
    expect(manifest.hashes["README.md"]).toBe(
      createHash("sha256").update("# My project\n").digest("hex"),
    );
    expect(manifest.hashes["apps/web/favicon.ico"]).toBe(
      createHash("sha256").update(binaryBytes).digest("hex"),
    );
    expect(manifest.hashes["bts.jsonc"]).toBeUndefined();
    expect(manifest.baselines).toEqual({
      "package.json": '{"scripts":{"build":"vite build"}}\n',
    });
    expect(files["my-project/bts.lock.json"]).toEqual(repeatedFiles["my-project/bts.lock.json"]);
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
