import { createHash } from "node:crypto";
import { Node, Project } from "ts-morph";

const EMPTY_HASH = createHash("sha256").update("").digest("hex");

type ManagedRegion = {
  body: string;
  markerStart: number;
  markerEnd: number;
  declaredHash: string;
  indent: string;
};

export type ManagedRegionResult =
  | { success: true; content: string; changed: boolean; bodyHash: string }
  | { success: false; reason: string };

function digest(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function lineMarkers(id: string, hash = EMPTY_HASH, indent = ""): string {
  return (
    `${indent}// <better-fullstack:${id} sha256=${hash}>\n\n` +
    `${indent}// </better-fullstack:${id}>`
  );
}

function findLineRegion(content: string, id: string): ManagedRegion | null {
  const escaped = escapeRegex(id);
  const pattern = new RegExp(
    `(^[ \\t]*)// <better-fullstack:${escaped} sha256=([0-9a-f]{64})>\\r?\\n([\\s\\S]*?)\\r?\\n\\1// </better-fullstack:${escaped}>`,
    "m",
  );
  const match = pattern.exec(content);
  if (!match || match.index === undefined) return null;
  const full = match[0];
  const indent = match[1] ?? "";
  const declaredHash = match[2] ?? "";
  const body = match[3] ?? "";
  return {
    body,
    markerStart: match.index,
    markerEnd: match.index + full.length,
    declaredHash,
    indent,
  };
}

function findHtmlRegion(content: string, id: string): ManagedRegion | null {
  const escaped = escapeRegex(id);
  const pattern = new RegExp(
    `<!-- <better-fullstack:${escaped} sha256=([0-9a-f]{64})> -->\\r?\\n([\\s\\S]*?)\\r?\\n<!-- </better-fullstack:${escaped}> -->`,
  );
  const match = pattern.exec(content);
  if (!match || match.index === undefined) return null;
  const full = match[0];
  const declaredHash = match[1] ?? "";
  const body = match[2] ?? "";
  return {
    body,
    markerStart: match.index,
    markerEnd: match.index + full.length,
    declaredHash,
    indent: "",
  };
}

function validateRegion(region: ManagedRegion, id: string): string | null {
  const actual = digest(region.body);
  return actual === region.declaredHash
    ? null
    : `Managed region '${id}' was edited outside Better Fullstack. Restore it or review the change manually before generating.`;
}

export function getManagedRegionHash(content: string, id: string): string | null {
  const region = findLineRegion(content, id) ?? findHtmlRegion(content, id);
  if (!region || validateRegion(region, id)) return null;
  return digest(region.body);
}

export function getManagedRegionBody(content: string, id: string): string | null {
  const region = findLineRegion(content, id) ?? findHtmlRegion(content, id);
  if (!region || validateRegion(region, id)) return null;
  return region.body;
}

export function appendManagedRegionLine(
  content: string,
  id: string,
  line: string,
): ManagedRegionResult {
  const region = findLineRegion(content, id);
  if (!region) return { success: false, reason: `Managed region '${id}' is missing.` };
  const invalid = validateRegion(region, id);
  if (invalid) return { success: false, reason: invalid };
  const lines = region.body.length > 0 ? region.body.split(/\r?\n/) : [];
  if (lines.includes(line)) {
    return { success: true, content, changed: false, bodyHash: region.declaredHash };
  }
  const body = [...lines, line].sort().join("\n");
  const bodyHash = digest(body);
  const replacement = `${lineMarkers(id, bodyHash, region.indent).split("\n")[0]}\n${body}\n${region.indent}// </better-fullstack:${id}>`;
  return {
    success: true,
    content: `${content.slice(0, region.markerStart)}${replacement}${content.slice(region.markerEnd)}`,
    changed: true,
    bodyHash,
  };
}

export function replaceMarkdownManagedRegion(
  content: string,
  id: string,
  body: string,
): ManagedRegionResult {
  const existing = findHtmlRegion(content, id);
  const bodyHash = digest(body);
  const replacement = `<!-- <better-fullstack:${id} sha256=${bodyHash}> -->\n${body}\n<!-- </better-fullstack:${id}> -->`;
  if (!existing) {
    const separator = content.endsWith("\n") ? "\n" : "\n\n";
    return {
      success: true,
      content: `${content}${separator}${replacement}\n`,
      changed: true,
      bodyHash,
    };
  }
  const invalid = validateRegion(existing, id);
  if (invalid) return { success: false, reason: invalid };
  if (existing.body === body) return { success: true, content, changed: false, bodyHash };
  return {
    success: true,
    content: `${content.slice(0, existing.markerStart)}${replacement}${content.slice(existing.markerEnd)}`,
    changed: true,
    bodyHash,
  };
}

function inMemorySource(content: string) {
  const project = new Project({ useInMemoryFileSystem: true, skipAddingFilesFromTsConfig: true });
  return project.createSourceFile("managed.ts", content, { overwrite: true });
}

export function ensureRouterManagedRegions(content: string): ManagedRegionResult {
  const importRegion = findLineRegion(content, "recipe-imports");
  const registrationRegion = findLineRegion(content, "recipe-registrations");
  if (importRegion && registrationRegion) {
    const importError = validateRegion(importRegion, "recipe-imports");
    const registrationError = validateRegion(registrationRegion, "recipe-registrations");
    if (importError || registrationError) {
      return { success: false, reason: importError ?? registrationError ?? "Invalid region." };
    }
    return { success: true, content, changed: false, bodyHash: digest("") };
  }
  if (importRegion || registrationRegion) {
    return {
      success: false,
      reason: "The router contains only part of the Better Fullstack managed-region contract.",
    };
  }

  const source = inMemorySource(content);
  const declaration = source.getVariableDeclaration("appRouter");
  const initializer = declaration?.getInitializer();
  const objectLiteral = Node.isObjectLiteralExpression(initializer)
    ? initializer
    : Node.isCallExpression(initializer)
      ? initializer.getArguments().find(Node.isObjectLiteralExpression)
      : undefined;
  if (!objectLiteral) {
    return {
      success: false,
      reason: "Could not find an object-literal appRouter through the TypeScript syntax tree.",
    };
  }
  const imports = source.getImportDeclarations();
  const importPosition = imports.at(-1)?.getEnd() ?? 0;
  const registrationPosition = objectLiteral.getStart() + 1;
  const insertions = [
    {
      position: registrationPosition,
      value: `\n${lineMarkers("recipe-registrations", EMPTY_HASH, "  ")}\n`,
    },
    {
      position: importPosition,
      value: `${importPosition === 0 ? "" : "\n\n"}${lineMarkers("recipe-imports")}\n`,
    },
  ].sort((left, right) => right.position - left.position);
  let next = content;
  for (const insertion of insertions) {
    next = `${next.slice(0, insertion.position)}${insertion.value}${next.slice(insertion.position)}`;
  }
  return { success: true, content: next, changed: true, bodyHash: EMPTY_HASH };
}

export function ensureSchemaManagedRegion(content: string): ManagedRegionResult {
  const existing = findLineRegion(content, "recipe-schema-exports");
  if (existing) {
    const invalid = validateRegion(existing, "recipe-schema-exports");
    return invalid
      ? { success: false, reason: invalid }
      : { success: true, content, changed: false, bodyHash: existing.declaredHash };
  }
  const source = inMemorySource(content);
  const exports = source.getExportDeclarations();
  const position = exports.at(-1)?.getEnd() ?? content.length;
  const prefix = position === 0 || content.slice(0, position).endsWith("\n") ? "" : "\n";
  const suffix = content.slice(position).startsWith("\n") ? "" : "\n";
  const markers = lineMarkers("recipe-schema-exports");
  const next = `${content.slice(0, position)}${prefix}${markers}${suffix}${content.slice(position)}`;
  return { success: true, content: next, changed: true, bodyHash: EMPTY_HASH };
}
