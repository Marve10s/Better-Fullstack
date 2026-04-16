import { describe, expect, it } from "bun:test";

import { VirtualFileSystem } from "../../src/core/virtual-fs";
import type { VirtualDirectory, VirtualFile } from "../../src/types";

function findFile(node: VirtualDirectory, path: string): VirtualFile | undefined {
  for (const child of node.children) {
    if (child.type === "file" && child.path === path) {
      return child;
    }
    if (child.type === "directory") {
      const nested = findFile(child, path);
      if (nested) return nested;
    }
  }
  return undefined;
}

describe("VirtualFileSystem", () => {
  it("writes files and JSON while creating parent directories", () => {
    const vfs = new VirtualFileSystem();

    vfs.writeFile("apps/web/src/index.ts", "export const ready = true;");
    vfs.writeJson("apps/web/package.json", { name: "web", private: true });
    const pkgJson = vfs.readJson<{ name: string; private: boolean }>("apps/web/package.json");

    expect(vfs.readFile("apps/web/src/index.ts")).toBe("export const ready = true;");
    expect(pkgJson).toEqual({ name: "web", private: true });
    expect(vfs.directoryExists("apps")).toBe(true);
    expect(vfs.directoryExists("apps/web")).toBe(true);
    expect(vfs.directoryExists("apps/web/src")).toBe(true);
  });

  it("tracks file and directory existence independently", () => {
    const vfs = new VirtualFileSystem();

    vfs.mkdir("packages");
    vfs.writeFile("/packages/api/index.ts", "export {};");

    expect(vfs.exists("packages")).toBe(true);
    expect(vfs.directoryExists("/packages")).toBe(true);
    expect(vfs.fileExists("packages")).toBe(false);
    expect(vfs.exists("packages/api/index.ts")).toBe(true);
    expect(vfs.fileExists("/packages/api/index.ts")).toBe(true);
    expect(vfs.directoryExists("packages/api/index.ts")).toBe(false);
  });

  it("lists directories and returns sorted file paths without leading slashes", () => {
    const vfs = new VirtualFileSystem();

    vfs.writeFile("apps/web/src/index.ts", "");
    vfs.writeFile("apps/web/package.json", "{}");
    vfs.writeFile("apps/server/src/index.ts", "");

    expect(vfs.listDir("apps")).toEqual(["server", "web"]);
    expect(vfs.listDir("apps/web")).toEqual(["package.json", "src"]);
    expect(vfs.getAllFiles()).toEqual([
      "apps/server/src/index.ts",
      "apps/web/package.json",
      "apps/web/src/index.ts",
    ]);
  });

  it("builds a nested tree and preserves binary source paths", () => {
    const vfs = new VirtualFileSystem();

    vfs.writeFile("apps/web/public/logo.png", "[Binary file]", "frontend/react/web-base/logo.png");
    vfs.writeFile("apps/web/src/main.ts", "console.log('ok');");

    const tree = vfs.toTree("demo");
    const logo = findFile(tree, "apps/web/public/logo.png");
    const main = findFile(tree, "apps/web/src/main.ts");

    expect(tree.name).toBe("demo");
    expect(logo?.sourcePath).toBe("frontend/react/web-base/logo.png");
    expect(logo?.extension).toBe("png");
    expect(main?.extension).toBe("ts");
  });

  it("deletes files and clears the full filesystem state", () => {
    const vfs = new VirtualFileSystem();

    vfs.writeFile("apps/web/src/index.ts", "export {};");
    expect(vfs.deleteFile("apps/web/src/index.ts")).toBe(true);
    expect(vfs.fileExists("apps/web/src/index.ts")).toBe(false);
    expect(vfs.deleteFile("apps/web/src/index.ts")).toBe(false);

    vfs.writeFile("apps/web/src/app.ts", "export {};");
    expect(vfs.getFileCount()).toBe(1);
    expect(vfs.getDirectoryCount()).toBeGreaterThan(0);

    vfs.clear();

    expect(vfs.getFileCount()).toBe(0);
    expect(vfs.getDirectoryCount()).toBe(0);
    expect(vfs.getAllFiles()).toEqual([]);
  });
});
