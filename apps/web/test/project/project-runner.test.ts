import type { VirtualDirectory } from "@better-fullstack/template-generator/browser";

import { describe, expect, it } from "bun:test";

import {
  collectRunnableSourceFiles,
  getDefaultRunnableFile,
  getDevelopmentTarget,
  hasDependencyManifestChanges,
  virtualDirectoryToWebContainerTree,
} from "@/lib/project/project-runner";
import { getStackRunSupport } from "@/lib/project/run-support";
import {
  mountRunnableProject,
  installRunnableProject,
  normalizeRuntimeOutput,
  syncRunnableSourceFiles,
} from "@/lib/project/webcontainer-runtime";
import { DEFAULT_STACK } from "@/lib/stack/stack-defaults";
import { getInitialBuilderState } from "@/lib/stack/stack-url-state";

describe("project runner", () => {
  it("supports solo TypeScript web stacks", () => {
    expect(getStackRunSupport(DEFAULT_STACK)).toEqual({ supported: true });
  });

  it("rejects native runtimes and stacks without a web frontend", () => {
    expect(getStackRunSupport({ ...DEFAULT_STACK, ecosystem: "rust" })).toEqual({
      supported: false,
      reason: "native-runtime",
    });
    expect(getStackRunSupport({ ...DEFAULT_STACK, webFrontend: ["none"] })).toEqual({
      supported: false,
      reason: "no-web-frontend",
    });
  });

  it("converts generated text and binary files into a WebContainer tree", async () => {
    const tree: VirtualDirectory = {
      type: "directory",
      path: "",
      name: "project",
      children: [
        {
          type: "file",
          path: "package.json",
          name: "package.json",
          extension: "json",
          content: '{"scripts":{"dev":"vite"}}',
        },
        {
          type: "directory",
          path: "public",
          name: "public",
          children: [
            {
              type: "file",
              path: "public/favicon.ico",
              name: "favicon.ico",
              extension: "ico",
              content: "[Binary file]",
              sourcePath: "frontend/nuxt/public/favicon.ico",
            },
          ],
        },
      ],
    };
    const binary = new Uint8Array([0, 1, 255]);
    const files = await virtualDirectoryToWebContainerTree(tree, async () => binary);

    expect(files.packageJson).toBeUndefined();
    expect(files["package.json"]).toEqual({
      file: { contents: '{"scripts":{"dev":"vite"}}' },
    });
    expect(files.public).toEqual({
      directory: {
        "favicon.ico": { file: { contents: binary } },
      },
    });
  });

  it("exposes generated text files for editing and keeps binary files read-only", () => {
    const tree: VirtualDirectory = {
      type: "directory",
      path: "",
      name: "project",
      children: [
        {
          type: "file",
          path: "src/App.tsx",
          name: "App.tsx",
          extension: "tsx",
          content: "export default function App() {}",
        },
        {
          type: "file",
          path: "public/logo.png",
          name: "logo.png",
          extension: "png",
          content: "[Binary file]",
          sourcePath: "assets/logo.png",
        },
      ],
    };

    const files = collectRunnableSourceFiles(tree);
    expect(files.map(({ path, editable }) => ({ path, editable }))).toEqual([
      { path: "src/App.tsx", editable: true },
      { path: "public/logo.png", editable: false },
    ]);
    expect(getDefaultRunnableFile(files)?.path).toBe("src/App.tsx");
  });

  it("detects dependency edits without reinstalling for ordinary source edits", () => {
    const files = [
      {
        path: "package.json",
        name: "package.json",
        extension: "json",
        content: '{"dependencies":{"react":"latest"}}',
        editable: true,
      },
      {
        path: "src/App.tsx",
        name: "App.tsx",
        extension: "tsx",
        content: "export default function App() { return <h1>Edited</h1> }",
        editable: true,
      },
    ];

    expect(
      hasDependencyManifestChanges(files, {
        "package.json": files[0].content,
        "src/App.tsx": "export default function App() { return <h1>Original</h1> }",
      }),
    ).toBe(false);
    expect(hasDependencyManifestChanges(files, { "package.json": "{}" })).toBe(true);
  });

  it("targets the web workspace instead of running the whole monorepo", () => {
    const tree: VirtualDirectory = {
      type: "directory",
      path: "",
      name: "project",
      children: [
        {
          type: "file",
          path: "package.json",
          name: "package.json",
          extension: "json",
          content: '{"scripts":{"dev:web":"turbo -F web dev"}}',
        },
        {
          type: "directory",
          path: "apps",
          name: "apps",
          children: [
            {
              type: "directory",
              path: "apps/web",
              name: "web",
              children: [
                {
                  type: "file",
                  path: "apps/web/package.json",
                  name: "package.json",
                  extension: "json",
                  content: '{"scripts":{"dev":"vite dev"}}',
                },
              ],
            },
          ],
        },
      ],
    };

    expect(getDevelopmentTarget(tree)).toEqual({ script: "dev", workspace: "apps/web" });
  });

  it("syncs edited text files into the mounted project and skips binary files", async () => {
    const writes: Array<[string, string]> = [];
    const runtime = {
      fs: {
        writeFile: async (path: string, content: string) => {
          writes.push([path, content]);
        },
      },
    };

    await syncRunnableSourceFiles(runtime as never, [
      {
        path: "src/App.tsx",
        name: "App.tsx",
        extension: "tsx",
        content: "edited",
        editable: true,
      },
      {
        path: "public/logo.png",
        name: "logo.png",
        extension: "png",
        content: "[Binary file]",
        editable: false,
      },
    ]);

    expect(writes).toEqual([["project/src/App.tsx", "edited"]]);
  });

  it("creates the WebContainer mount directory before mounting the project", async () => {
    const operations: string[] = [];
    const runtime = {
      fs: {
        rm: async () => operations.push("rm"),
        mkdir: async () => operations.push("mkdir"),
      },
      mount: async () => operations.push("mount"),
    };

    await mountRunnableProject(runtime as never, {});

    expect(operations).toEqual(["rm", "mkdir", "mount"]);
  });

  it("installs the full workspace root (npm 10 crashes on workspace-scoped installs)", async () => {
    let spawnedArguments: string[] = [];
    const runtime = {
      spawn: async (_command: string, arguments_: string[]) => {
        spawnedArguments = arguments_;
        return {
          output: new ReadableStream({
            start(controller) {
              controller.close();
            },
          }),
          exit: Promise.resolve(0),
        };
      },
    };

    await installRunnableProject(runtime as never, () => undefined);

    expect(spawnedArguments).toContain("install");
    expect(spawnedArguments).toContain("--legacy-peer-deps");
    expect(spawnedArguments.some((argument) => argument.startsWith("--workspace"))).toBe(false);
    expect(spawnedArguments).not.toContain("--include-workspace-root=false");
  });

  it("removes terminal control sequences from runtime output", () => {
    expect(normalizeRuntimeOutput("\u001B[32mVITE\u001B[39m ready\r\nLocal\rURL")).toBe(
      "VITE ready\nLocal\nURL",
    );
  });

  it("restores the Run tab from URL state", () => {
    const initial = getInitialBuilderState({ view: "run" });
    expect(initial.viewMode).toBe("run");
  });
});
