import { getLocalWebDevPort, type ProjectConfig } from "@better-fullstack/types";

/** Reserve fixed JavaScript ports first, then allocate native frontend ports. */
export function getGraphFrontendPorts(config: ProjectConfig) {
  const frontends = (config.stackParts ?? []).filter(
    (part) =>
      part.role === "frontend" &&
      !part.ownerPartId &&
      part.source !== "provided" &&
      part.toolId !== "none",
  );
  const ports = new Map<string, number>();
  const used = new Set<number>();
  for (const part of frontends.filter((part) => part.ecosystem === "typescript")) {
    const port = getLocalWebDevPort([part.toolId] as ProjectConfig["frontend"]);
    ports.set(part.id, port);
    used.add(port);
  }
  for (const part of frontends.filter(
    (part) => part.ecosystem === "dotnet" || part.ecosystem === "rust",
  )) {
    let port = part.ecosystem === "dotnet" ? 5173 : 8080;
    while (used.has(port)) port += 1;
    ports.set(part.id, port);
    used.add(port);
  }
  return ports;
}
