import type { VirtualDirectory, VirtualFile } from "@better-fullstack/template-generator/browser";

import { strToU8, zip, type Zippable } from "fflate";

import type { StackState } from "@/lib/constant";

import { stackStateToProjectConfig } from "@/lib/preview-config";

const DEFAULT_PROJECT_NAME = "better-fullstack-project";
const UNIX_OS = 3;
const FILE_MODE = 0o644 << 16;
const EXECUTABLE_MODE = 0o755 << 16;

export type BinaryTemplateLoader = (sourcePath: string) => Promise<Uint8Array>;

export interface ProjectArchive {
  bytes: Uint8Array;
  fileName: string;
}

function safeProjectName(value: string): string {
  const normalized = value
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^[.-]+|[.-]+$/g, "");

  return normalized || DEFAULT_PROJECT_NAME;
}

function safeArchivePath(value: string): string {
  const normalized = value.replace(/\\/g, "/").replace(/^\/+/, "");
  const segments = normalized.split("/");

  if (
    normalized.length === 0 ||
    segments.some((segment) => segment.length === 0 || segment === "." || segment === "..")
  ) {
    throw new Error(`Unsafe generated project path: ${value}`);
  }

  return normalized;
}

function isExecutableFile(file: VirtualFile): boolean {
  return file.content.startsWith("#!/");
}

async function addDirectoryFiles(
  directory: VirtualDirectory,
  projectName: string,
  files: Zippable,
  loadBinaryTemplate: BinaryTemplateLoader,
): Promise<void> {
  await Promise.all(
    directory.children.map(async (node) => {
      if (node.type === "directory") {
        await addDirectoryFiles(node, projectName, files, loadBinaryTemplate);
        return;
      }

      const relativePath = safeArchivePath(node.path);
      const archivePath = `${projectName}/${relativePath}`;
      const content = node.sourcePath
        ? await loadBinaryTemplate(node.sourcePath)
        : strToU8(node.content);

      files[archivePath] = [
        content,
        {
          os: UNIX_OS,
          attrs: isExecutableFile(node) ? EXECUTABLE_MODE : FILE_MODE,
        },
      ];
    }),
  );
}

function createZip(files: Zippable): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    zip(files, { level: 6 }, (error, bytes) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(bytes);
    });
  });
}

export async function createProjectArchive(
  root: VirtualDirectory,
  loadBinaryTemplate: BinaryTemplateLoader,
): Promise<ProjectArchive> {
  const projectName = safeProjectName(root.name);
  const files: Zippable = {};

  await addDirectoryFiles(root, projectName, files, loadBinaryTemplate);

  if (Object.keys(files).length === 0) {
    throw new Error("The generated project does not contain any files.");
  }

  return {
    bytes: await createZip(files),
    fileName: `${projectName}.zip`,
  };
}

export async function createStackProjectArchive(stack: StackState): Promise<ProjectArchive> {
  const [{ generateVirtualProject, EMBEDDED_TEMPLATES }, { loadBinaryTemplate }] =
    await Promise.all([
      import("@better-fullstack/template-generator/browser"),
      import("@/lib/project-binary-assets"),
    ]);
  const result = await generateVirtualProject({
    config: stackStateToProjectConfig(stack),
    templates: EMBEDDED_TEMPLATES,
  });

  if (!result.success || !result.tree) {
    throw new Error(result.error || "The project could not be generated.");
  }

  return createProjectArchive(result.tree.root, loadBinaryTemplate);
}

export function downloadProjectArchive(archive: ProjectArchive): void {
  const bytes = Uint8Array.from(archive.bytes);
  const url = URL.createObjectURL(new Blob([bytes.buffer], { type: "application/zip" }));
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = archive.fileName;
  anchor.hidden = true;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
