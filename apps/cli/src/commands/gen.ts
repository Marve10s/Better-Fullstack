import { processTemplateString } from "@better-fullstack/template-generator";
import { log } from "@clack/prompts";
import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";

import type { ProjectConfig } from "../types";

import { readBtsConfig } from "../utils/bts-config";

export type GenKind = "resource" | "route";

export type GenCommandInput = {
  kind: GenKind;
  name: string;
  dir?: string;
  dryRun?: boolean;
};

export type GenStatus = "created" | "manual-wiring" | "unsupported";

export type GenResult = {
  status: GenStatus;
  message: string;
  resourceFile?: string;
  registered?: boolean;
};

/**
 * Inline resource template (rendered with the project's ProjectConfig via the
 * template-generator's Handlebars pipeline). Kept as a string constant so `gen`
 * works in a published CLI with no template directory / EMBEDDED_TEMPLATES
 * dependency. Branches on `api` (trpc | orpc) and `auth` (better-auth ->
 * protectedProcedure).
 */
const RESOURCE_TEMPLATE = `{{#if (eq api "trpc")}}
import { z } from "zod";

import { {{#if (isBetterAuth auth)}}protectedProcedure{{else}}publicProcedure{{/if}}, router } from "../index{{importExt}}";

export type {{ResourceName}} = {
  id: string;
  name: string;
  createdAt: string;
};

const {{resourceName}}Store: {{ResourceName}}[] = [];
let {{resourceName}}NextId = 1;

const {{resourceName}}Procedure = {{#if (isBetterAuth auth)}}protectedProcedure{{else}}publicProcedure{{/if}};

export const {{resourceName}}Router = router({
  list: {{resourceName}}Procedure.query(() => {
    return {{resourceName}}Store;
  }),
  byId: {{resourceName}}Procedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return {{resourceName}}Store.find((item) => item.id === input.id) ?? null;
  }),
  create: {{resourceName}}Procedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(({ input }) => {
      const item: {{ResourceName}} = {
        id: String({{resourceName}}NextId++),
        name: input.name,
        createdAt: new Date().toISOString(),
      };
      {{resourceName}}Store.push(item);
      return item;
    }),
  update: {{resourceName}}Procedure
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .mutation(({ input }) => {
      const item = {{resourceName}}Store.find((entry) => entry.id === input.id);
      if (!item) return null;
      item.name = input.name;
      return item;
    }),
  remove: {{resourceName}}Procedure.input(z.object({ id: z.string() })).mutation(({ input }) => {
    const index = {{resourceName}}Store.findIndex((entry) => entry.id === input.id);
    if (index === -1) return { success: false };
    {{resourceName}}Store.splice(index, 1);
    return { success: true };
  }),
});
{{else}}
import { z } from "zod";

import { {{#if (isBetterAuth auth)}}protectedProcedure{{else}}publicProcedure{{/if}} } from "../index{{importExt}}";

export type {{ResourceName}} = {
  id: string;
  name: string;
  createdAt: string;
};

const {{resourceName}}Store: {{ResourceName}}[] = [];
let {{resourceName}}NextId = 1;

const {{resourceName}}Procedure = {{#if (isBetterAuth auth)}}protectedProcedure{{else}}publicProcedure{{/if}};

export const {{resourceName}}Router = {
  list: {{resourceName}}Procedure.handler(() => {
    return {{resourceName}}Store;
  }),
  byId: {{resourceName}}Procedure
    .input(z.object({ id: z.string() }))
    .handler(({ input }) => {
      return {{resourceName}}Store.find((item) => item.id === input.id) ?? null;
    }),
  create: {{resourceName}}Procedure
    .input(z.object({ name: z.string().min(1) }))
    .handler(({ input }) => {
      const item: {{ResourceName}} = {
        id: String({{resourceName}}NextId++),
        name: input.name,
        createdAt: new Date().toISOString(),
      };
      {{resourceName}}Store.push(item);
      return item;
    }),
  update: {{resourceName}}Procedure
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .handler(({ input }) => {
      const item = {{resourceName}}Store.find((entry) => entry.id === input.id);
      if (!item) return null;
      item.name = input.name;
      return item;
    }),
  remove: {{resourceName}}Procedure
    .input(z.object({ id: z.string() }))
    .handler(({ input }) => {
      const index = {{resourceName}}Store.findIndex((entry) => entry.id === input.id);
      if (index === -1) return { success: false };
      {{resourceName}}Store.splice(index, 1);
      return { success: true };
    }),
};
{{/if}}
`;

/** Candidate roots (relative to the project) that may hold a routers/index.ts. */
const ROUTER_INDEX_CANDIDATES = [
  "packages/api/src/routers/index.ts",
  "apps/server/src/routers/index.ts",
];

function splitWords(raw: string): string[] {
  return raw
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^a-zA-Z0-9]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function toCamelCase(raw: string): string {
  const words = splitWords(raw);
  return words
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join("");
}

function toPascalCase(raw: string): string {
  const camel = toCamelCase(raw);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

/**
 * Scans for an existing routers/index.ts to register the new resource in.
 * Checks the well-known locations first, then any `<root>/src/routers/index.ts`
 * under apps/* and packages/* (robust across hono/express/elysia split backends
 * and the packages/api layout).
 */
async function findRouterIndex(projectDir: string): Promise<string | null> {
  for (const candidate of ROUTER_INDEX_CANDIDATES) {
    const full = path.join(projectDir, candidate);
    if (await fs.pathExists(full)) return full;
  }

  for (const workspace of ["apps", "packages"]) {
    const workspaceDir = path.join(projectDir, workspace);
    if (!(await fs.pathExists(workspaceDir))) continue;
    let entries: string[];
    try {
      entries = await fs.readdir(workspaceDir);
    } catch {
      continue;
    }
    for (const entry of entries) {
      const full = path.join(workspaceDir, entry, "src", "routers", "index.ts");
      if (await fs.pathExists(full)) return full;
    }
  }

  return null;
}

/** Mirrors the relative-import extension used by the existing routers/index.ts. */
function detectImportExtension(indexContent: string): string {
  return /from\s+["']\.\.\/index\.js["']/.test(indexContent) ? ".js" : "";
}

type Injection = { ok: true; content: string } | { ok: false; reason: string };

function injectResource(
  indexContent: string,
  api: "trpc" | "orpc",
  resourceName: string,
  importExt: string,
): Injection {
  const anchor =
    api === "trpc" ? "export const appRouter = router({" : "export const appRouter = {";

  const lines = indexContent.split("\n");
  const anchorIdx = lines.findIndex((line) => line.includes(anchor));
  if (anchorIdx === -1) {
    return { ok: false, reason: `Could not find the appRouter anchor (\`${anchor}\`)` };
  }

  const registrationKey = `${resourceName}:`;
  const alreadyRegistered = lines.some(
    (line, idx) => idx > anchorIdx && line.trim().startsWith(registrationKey),
  );
  if (alreadyRegistered) {
    return { ok: false, reason: `\`${resourceName}\` is already registered in appRouter` };
  }

  const importLine = `import { ${resourceName}Router } from "./${resourceName}${importExt}";`;
  const registrationLine = `  ${resourceName}: ${resourceName}Router,`;

  // Insert the import after the last top-of-file import line (before the anchor).
  let lastImportIdx = -1;
  for (let i = 0; i < anchorIdx; i += 1) {
    const line = lines[i];
    if (line !== undefined && line.trimStart().startsWith("import ")) {
      lastImportIdx = i;
    }
  }
  lines.splice(lastImportIdx + 1, 0, importLine);

  // Anchor moved down by one after the import insert; re-find it.
  const newAnchorIdx = lines.findIndex((line) => line.includes(anchor));
  lines.splice(newAnchorIdx + 1, 0, registrationLine);

  return { ok: true, content: lines.join("\n") };
}

export async function genCommand(input: GenCommandInput): Promise<GenResult> {
  const projectDir = path.resolve(input.dir || process.cwd());
  const dryRun = input.dryRun ?? false;

  const btsConfig = await readBtsConfig(projectDir);
  if (!btsConfig) {
    throw new Error(
      `No Better Fullstack project found in ${projectDir}. Make sure bts.jsonc exists.`,
    );
  }

  const resourceName = toCamelCase(input.name);
  const ResourceName = toPascalCase(input.name);
  if (!resourceName || !/^[a-z]/i.test(resourceName)) {
    throw new Error(
      `Invalid resource name "${input.name}". Use a name that starts with a letter, e.g. "post".`,
    );
  }

  const ecosystem = btsConfig.ecosystem;
  const api = btsConfig.api;

  // Scope guard: only TypeScript + trpc/orpc is supported for now. Everything
  // else prints an honest "not yet supported" message and writes nothing.
  if (ecosystem !== "typescript" || (api !== "trpc" && api !== "orpc")) {
    const stack = `${ecosystem}${api && api !== "none" ? ` + ${api}` : ""}`;
    const message = `\`gen ${input.kind}\` is not yet supported for this stack (${stack}). Currently supported: TypeScript projects with a trpc or orpc API.`;
    log.warn(pc.yellow(message));
    return { status: "unsupported", message };
  }

  const routerIndexPath = await findRouterIndex(projectDir);
  if (!routerIndexPath) {
    const message = `Could not locate a \`routers/index.ts\` in this project. Is this a trpc/orpc project? No files were written.`;
    log.warn(pc.yellow(message));
    return { status: "unsupported", message };
  }

  const routersDir = path.dirname(routerIndexPath);
  const resourceFile = path.join(routersDir, `${resourceName}.ts`);
  const relResourceFile = path.relative(projectDir, resourceFile);

  // Idempotency: never overwrite an existing resource file.
  if (await fs.pathExists(resourceFile)) {
    throw new Error(
      `Resource "${resourceName}" already exists at ${relResourceFile}. Delete it first or choose another name.`,
    );
  }

  const indexContent = await fs.readFile(routerIndexPath, "utf-8");
  const importExt = detectImportExtension(indexContent);

  const templateContext = {
    ...btsConfig,
    resourceName,
    ResourceName,
    importExt,
  } as unknown as ProjectConfig;

  const resourceContent = processTemplateString(RESOURCE_TEMPLATE, templateContext).trimStart();

  const injection = injectResource(indexContent, api, resourceName, importExt);

  if (dryRun) {
    log.info(pc.cyan(`[dry run] Would create ${relResourceFile}`));
    log.message(resourceContent);
    if (injection.ok) {
      log.info(
        pc.cyan(
          `[dry run] Would register \`${resourceName}: ${resourceName}Router\` in ${path.relative(
            projectDir,
            routerIndexPath,
          )}`,
        ),
      );
    } else {
      log.warn(pc.yellow(`[dry run] Manual wiring required: ${injection.reason}`));
    }
    return {
      status: injection.ok ? "created" : "manual-wiring",
      message: "dry run",
      resourceFile,
      registered: injection.ok,
    };
  }

  await fs.writeFile(resourceFile, resourceContent, "utf-8");

  if (!injection.ok) {
    const relIndex = path.relative(projectDir, routerIndexPath);
    const message = `Created ${relResourceFile}, but could not auto-register it: ${injection.reason}. Wire it manually.`;
    log.warn(pc.yellow(message));
    log.message(
      [
        `Add these two lines to ${relIndex}:`,
        pc.dim(`  import { ${resourceName}Router } from "./${resourceName}${importExt}";`),
        pc.dim(`  ${resourceName}: ${resourceName}Router,   // inside appRouter`),
      ].join("\n"),
    );
    return { status: "manual-wiring", message, resourceFile, registered: false };
  }

  await fs.writeFile(routerIndexPath, injection.content, "utf-8");

  const relIndex = path.relative(projectDir, routerIndexPath);
  const message = `Created ${relResourceFile} and registered \`${resourceName}: ${resourceName}Router\` in ${relIndex}.`;
  log.success(pc.green(message));
  return { status: "created", message, resourceFile, registered: true };
}
