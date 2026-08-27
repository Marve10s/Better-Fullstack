import type { VirtualDirectory, VirtualFile } from "@better-fullstack/template-generator/browser";
import type { FileSystemTree } from "@webcontainer/api";

import type { StackState } from "@/lib/stack/stack-defaults";

import { stackStateToProjectConfig } from "@/lib/builder/preview-config";
import { getStackRunSupport } from "@/lib/project/run-support";

export interface RunnableProject {
  files: FileSystemTree;
  tree: VirtualDirectory;
  sourceFiles: RunnableSourceFile[];
  script: "dev:web" | "dev";
  workspace: string | null;
}

export interface RunnableSourceFile {
  path: string;
  name: string;
  extension: string;
  content: string;
  editable: boolean;
}

type BinaryTemplateLoader = (sourcePath: string) => Promise<Uint8Array>;

async function fileContents(
  file: VirtualFile,
  loadBinaryTemplate: BinaryTemplateLoader,
): Promise<string | Uint8Array> {
  return file.sourcePath ? loadBinaryTemplate(file.sourcePath) : file.content;
}

export async function virtualDirectoryToWebContainerTree(
  directory: VirtualDirectory,
  loadBinaryTemplate: BinaryTemplateLoader,
): Promise<FileSystemTree> {
  const entries = await Promise.all(
    directory.children.map(async (node) => {
      if (node.type === "directory") {
        return [
          node.name,
          { directory: await virtualDirectoryToWebContainerTree(node, loadBinaryTemplate) },
        ] as const;
      }

      return [
        node.name,
        { file: { contents: await fileContents(node, loadBinaryTemplate) } },
      ] as const;
    }),
  );

  return Object.fromEntries(entries);
}

export function collectRunnableSourceFiles(directory: VirtualDirectory): RunnableSourceFile[] {
  return directory.children.flatMap((node) => {
    if (node.type === "directory") return collectRunnableSourceFiles(node);

    return [
      {
        path: node.path,
        name: node.name,
        extension: node.extension,
        content: node.content,
        editable: !node.sourcePath,
      },
    ];
  });
}

export function getDefaultRunnableFile(files: RunnableSourceFile[]): RunnableSourceFile | null {
  const editableFiles = files.filter((file) => file.editable);
  const preferredPatterns = [
    /(?:^|\/)src\/routes\/index\.[cm]?[jt]sx?$/,
    /(?:^|\/)src\/app\/(?:page|home)\.[cm]?[jt]sx?$/,
    /(?:^|\/)src\/(?:App|app)\.[cm]?[jt]sx?$/,
    /(?:^|\/)src\/pages\/index\.[cm]?[jt]sx?$/,
  ];

  for (const pattern of preferredPatterns) {
    const preferredFile = editableFiles.find((file) => pattern.test(file.path));
    if (preferredFile) return preferredFile;
  }

  return (
    editableFiles.find((file) => ["tsx", "jsx", "vue", "svelte"].includes(file.extension)) ??
    editableFiles[0] ??
    null
  );
}

export function hasDependencyManifestChanges(
  currentFiles: RunnableSourceFile[],
  previouslySyncedContents: Readonly<Record<string, string>>,
): boolean {
  return currentFiles.some(
    (file) =>
      file.editable &&
      file.name === "package.json" &&
      previouslySyncedContents[file.path] !== file.content,
  );
}

function findVirtualFile(directory: VirtualDirectory, path: string): VirtualFile | null {
  for (const node of directory.children) {
    if (node.type === "file" && node.path === path) return node;
    if (node.type === "directory") {
      const found = findVirtualFile(node, path);
      if (found) return found;
    }
  }
  return null;
}

export function getDevelopmentTarget(root: VirtualDirectory): {
  script: "dev:web" | "dev";
  workspace: string | null;
} {
  const webPackageFile = findVirtualFile(root, "apps/web/package.json");
  if (webPackageFile) {
    const webPackageJson = JSON.parse(webPackageFile.content) as {
      scripts?: Record<string, string>;
    };
    if (webPackageJson.scripts?.dev) return { script: "dev", workspace: "apps/web" };
  }

  const packageFile = findVirtualFile(root, "package.json");

  if (!packageFile) {
    throw new Error("The generated project does not contain a root package.json.");
  }

  const packageJson = JSON.parse(packageFile.content) as {
    scripts?: Record<string, string>;
  };

  if (packageJson.scripts?.["dev:web"]) return { script: "dev:web", workspace: null };
  if (packageJson.scripts?.dev) return { script: "dev", workspace: null };
  throw new Error("The generated project does not expose a web development script.");
}

export async function createRunnableProject(stack: StackState): Promise<RunnableProject> {
  const support = getStackRunSupport(stack);
  if (!support.supported) {
    throw new Error("This stack is not supported by the browser runtime.");
  }

  const [{ generateVirtualProject, EMBEDDED_TEMPLATES }, { loadBinaryTemplate }] =
    await Promise.all([
      import("@better-fullstack/template-generator/browser"),
      import("@/lib/project/project-binary-assets"),
    ]);
  const config = {
    ...stackStateToProjectConfig(stack),
    // WebContainers provide Node and npm. This affects only the disposable
    // execution copy; downloads keep the user's selected package manager.
    packageManager: "npm" as const,
  };
  const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });

  if (!result.success || !result.tree) {
    throw new Error(result.error || "The runnable project could not be generated.");
  }

  const developmentTarget = getDevelopmentTarget(result.tree.root);
  return {
    files: await virtualDirectoryToWebContainerTree(result.tree.root, loadBinaryTemplate),
    tree: result.tree.root,
    sourceFiles: collectRunnableSourceFiles(result.tree.root),
    ...developmentTarget,
  };
}
