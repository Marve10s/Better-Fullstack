import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { addPackageDependency, type AvailableDependencies } from "../utils/add-deps";

export function processVectorDbDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const { vectorDb, backend } = config;

  // Skip if not selected or set to "none"
  if (!vectorDb || vectorDb === "none") return;

  // Skip if no backend to host the vector store (convex has built-in vector search)
  if (backend === "none" || backend === "convex") return;

  const deps = getVectorDbDeps(vectorDb);
  if (deps.length === 0) return;

  // Add server-side vector database dependencies
  const serverPath = "apps/server/package.json";
  if (vfs.exists(serverPath)) {
    addPackageDependency({ vfs, packagePath: serverPath, dependencies: deps });
  }

  // For fullstack frameworks (self), add to the web package
  if (backend === "self") {
    const webPath = "apps/web/package.json";
    if (vfs.exists(webPath)) {
      addPackageDependency({ vfs, packagePath: webPath, dependencies: deps });
    }
  }
}

function getVectorDbDeps(vectorDb: ProjectConfig["vectorDb"]): AvailableDependencies[] {
  switch (vectorDb) {
    case "pgvector":
      return ["postgres"];
    case "qdrant":
      return ["@qdrant/js-client-rest"];
    case "chroma":
      return ["chromadb"];
    case "pinecone":
      return ["@pinecone-database/pinecone"];
    default:
      return [];
  }
}
