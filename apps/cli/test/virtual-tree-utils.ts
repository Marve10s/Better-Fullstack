import type {
  VirtualFile,
  VirtualFileTree,
  VirtualNode,
} from "@better-fullstack/template-generator";

export function findVirtualFile(node: VirtualNode, path: string): VirtualFile | undefined {
  if (node.type === "file") {
    const normalizedNodePath = node.path.replace(/^\/+/, "");
    const normalizedPath = path.replace(/^\/+/, "");
    return normalizedNodePath === normalizedPath ? node : undefined;
  }

  for (const child of node.children) {
    const found = findVirtualFile(child, path);
    if (found) return found;
  }
  return undefined;
}

export function hasVirtualFile(node: VirtualNode, path: string): boolean {
  return findVirtualFile(node, path) !== undefined;
}

export function getVirtualFileContent(node: VirtualNode, path: string): string | undefined {
  return findVirtualFile(node, path)?.content;
}

export function readVirtualFileContent(node: VirtualNode, path: string): string {
  const content = getVirtualFileContent(node, path);
  if (content === undefined) {
    throw new Error(`Expected generated file at ${path}`);
  }
  return content;
}

function listVirtualFiles(node: VirtualNode): VirtualFile[] {
  if (node.type === "file") return [node];

  return node.children.flatMap((child) => listVirtualFiles(child));
}

export function listVirtualTreeFiles(tree: VirtualFileTree): VirtualFile[] {
  return listVirtualFiles(tree.root);
}

export function listVirtualTreeFilePaths(tree: VirtualFileTree): string[] {
  return listVirtualTreeFiles(tree).map((file) => file.path);
}

export function getVirtualTreeFileContent(
  tree: VirtualFileTree,
  path: string,
): string | undefined {
  return getVirtualFileContent(tree.root, path);
}
