import { getLocalWebDevPort, type ProjectConfig } from "@better-fullstack/types";

/** Ports used by the generated JavaScript server and Expo Metro processes. */
export function getGraphJavaScriptServicePorts(config: ProjectConfig) {
  const ports = new Set<number>();
  for (const part of config.stackParts ?? []) {
    if (part.ownerPartId || part.source === "provided" || part.toolId === "none") continue;
    if (
      part.role === "backend" &&
      part.ecosystem === "typescript" &&
      part.toolId !== "convex" &&
      !part.toolId.startsWith("self-")
    )
      ports.add(3000);
    if (part.role === "mobile" && part.ecosystem === "react-native") ports.add(8081);
  }
  return ports;
}

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
  const used = getGraphJavaScriptServicePorts(config);
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
