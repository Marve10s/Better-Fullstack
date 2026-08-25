import {
  formatStackPartSpec,
  legacyProjectConfigToStackParts,
  type BetterTStackConfig,
} from "@better-fullstack/types";
import fs from "fs-extra";
import path from "node:path";

import type {
  RecipeAdapter,
  RecipeAdapterContext,
  RecipeAdapterPlan,
  RecipePlannedFile,
} from "@/recipes/types";

import { hashContent } from "@/lifecycle/scaffold-manifest";
import {
  appendManagedRegionLine,
  ensureRouterManagedRegions,
  ensureSchemaManagedRegion,
} from "@/recipes/managed-region";

const ROUTER_INDEX_CANDIDATES = [
  "packages/api/src/routers/index.ts",
  "apps/server/src/routers/index.ts",
];

function plannedFile(
  relativePath: string,
  action: RecipePlannedFile["action"],
  content: string,
  preimage: string | null,
): RecipePlannedFile {
  return {
    path: relativePath,
    action,
    content,
    preimageSha256: preimage === null ? null : hashContent(preimage),
    postimageSha256: hashContent(content),
  };
}

async function findRouterIndex(projectDir: string): Promise<string | null> {
  for (const candidate of ROUTER_INDEX_CANDIDATES) {
    const full = path.join(projectDir, candidate);
    if (await fs.pathExists(full)) return full;
  }
  for (const workspace of ["apps", "packages"]) {
    const workspaceDir = path.join(projectDir, workspace);
    if (!(await fs.pathExists(workspaceDir))) continue;
    const entries = await fs.readdir(workspaceDir).catch(() => []);
    for (const entry of entries) {
      const full = path.join(workspaceDir, entry, "src", "routers", "index.ts");
      if (await fs.pathExists(full)) return full;
    }
  }
  return null;
}

function detectImportExtension(indexContent: string): string {
  return /from\s+["']\.\.\/index\.js["']/.test(indexContent) ? ".js" : "";
}

function ownerPartId(config: BetterTStackConfig): string | null {
  const parts = config.stackParts ?? legacyProjectConfigToStackParts(config);
  return (
    parts.find(
      (part) => part.role === "backend" && part.ecosystem === "typescript" && !part.ownerPartId,
    )?.id ?? null
  );
}

function ownerSpec(config: BetterTStackConfig): string | null {
  const parts = config.stackParts ?? legacyProjectConfigToStackParts(config);
  const owner = parts.find(
    (part) => part.role === "backend" && part.ecosystem === "typescript" && !part.ownerPartId,
  );
  return owner ? formatStackPartSpec(owner, parts) : null;
}

function memoryResource(context: RecipeAdapterContext, importExt: string): string {
  const { config, name, typeName } = context;
  const procedure = config.auth === "better-auth" ? "protectedProcedure" : "publicProcedure";
  if (config.api === "trpc") {
    return `import { z } from "zod";

import { ${procedure}, router } from "../index${importExt}";

export type ${typeName} = {
  id: string;
  name: string;
  createdAt: string;
};

const ${name}Store: ${typeName}[] = [];
let ${name}NextId = 1;
const ${name}Procedure = ${procedure};

export const ${name}Router = router({
  list: ${name}Procedure.query(() => ${name}Store),
  byId: ${name}Procedure.input(z.object({ id: z.string() })).query(({ input }) => {
    return ${name}Store.find((item) => item.id === input.id) ?? null;
  }),
  create: ${name}Procedure.input(z.object({ name: z.string().min(1) })).mutation(({ input }) => {
    const item = { id: String(${name}NextId++), name: input.name, createdAt: new Date().toISOString() };
    ${name}Store.push(item);
    return item;
  }),
  update: ${name}Procedure.input(z.object({ id: z.string(), name: z.string().min(1) })).mutation(({ input }) => {
    const item = ${name}Store.find((entry) => entry.id === input.id);
    if (!item) return null;
    item.name = input.name;
    return item;
  }),
  remove: ${name}Procedure.input(z.object({ id: z.string() })).mutation(({ input }) => {
    const index = ${name}Store.findIndex((entry) => entry.id === input.id);
    if (index === -1) return { success: false };
    ${name}Store.splice(index, 1);
    return { success: true };
  }),
});
`;
  }
  return `import { z } from "zod";

import { ${procedure} } from "../index${importExt}";

export type ${typeName} = {
  id: string;
  name: string;
  createdAt: string;
};

const ${name}Store: ${typeName}[] = [];
let ${name}NextId = 1;
const ${name}Procedure = ${procedure};

export const ${name}Router = {
  list: ${name}Procedure.handler(() => ${name}Store),
  byId: ${name}Procedure.input(z.object({ id: z.string() })).handler(({ input }) => {
    return ${name}Store.find((item) => item.id === input.id) ?? null;
  }),
  create: ${name}Procedure.input(z.object({ name: z.string().min(1) })).handler(({ input }) => {
    const item = { id: String(${name}NextId++), name: input.name, createdAt: new Date().toISOString() };
    ${name}Store.push(item);
    return item;
  }),
  update: ${name}Procedure.input(z.object({ id: z.string(), name: z.string().min(1) })).handler(({ input }) => {
    const item = ${name}Store.find((entry) => entry.id === input.id);
    if (!item) return null;
    item.name = input.name;
    return item;
  }),
  remove: ${name}Procedure.input(z.object({ id: z.string() })).handler(({ input }) => {
    const index = ${name}Store.findIndex((entry) => entry.id === input.id);
    if (index === -1) return { success: false };
    ${name}Store.splice(index, 1);
    return { success: true };
  }),
};
`;
}

function persistentSchema(context: RecipeAdapterContext): string {
  return `import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const ${context.name} = sqliteTable("${context.name}", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql\`(cast(unixepoch('subsecond') * 1000 as integer))\`)
    .notNull(),
});

export type ${context.typeName} = typeof ${context.name}.$inferSelect;
export type New${context.typeName} = typeof ${context.name}.$inferInsert;
`;
}

function persistentService(context: RecipeAdapterContext): string {
  return `import { eq } from "drizzle-orm";

import { db } from "../index";
import { ${context.name} } from "../schema/${context.name}";

export function list${context.typeName}Records() {
  return db.select().from(${context.name});
}

export async function get${context.typeName}Record(id: string) {
  const rows = await db.select().from(${context.name}).where(eq(${context.name}.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function create${context.typeName}Record(name: string) {
  const rows = await db.insert(${context.name}).values({ id: crypto.randomUUID(), name }).returning();
  return rows[0];
}

export async function update${context.typeName}Record(id: string, name: string) {
  const rows = await db.update(${context.name}).set({ name }).where(eq(${context.name}.id, id)).returning();
  return rows[0] ?? null;
}

export async function remove${context.typeName}Record(id: string) {
  const rows = await db.delete(${context.name}).where(eq(${context.name}.id, id)).returning({ id: ${context.name}.id });
  return rows.length > 0;
}
`;
}

function persistentRouter(context: RecipeAdapterContext, importExt: string): string {
  const packageName = `@${context.projectName}/db`;
  const procedure =
    context.config.auth === "better-auth" ? "protectedProcedure" : "publicProcedure";
  return `import {
  create${context.typeName}Record,
  get${context.typeName}Record,
  list${context.typeName}Records,
  remove${context.typeName}Record,
  update${context.typeName}Record,
} from "${packageName}/queries/${context.name}";
import { z } from "zod";

import { ${procedure}, router } from "../index${importExt}";

export const ${context.name}Router = router({
  list: ${procedure}.query(() => list${context.typeName}Records()),
  byId: ${procedure}.input(z.object({ id: z.string() })).query(({ input }) => get${context.typeName}Record(input.id)),
  create: ${procedure}.input(z.object({ name: z.string().min(1) })).mutation(({ input }) => create${context.typeName}Record(input.name)),
  update: ${procedure}.input(z.object({ id: z.string(), name: z.string().min(1) })).mutation(({ input }) => update${context.typeName}Record(input.id, input.name)),
  remove: ${procedure}.input(z.object({ id: z.string() })).mutation(async ({ input }) => ({ success: await remove${context.typeName}Record(input.id) })),
});
`;
}

function persistentIntegrationTest(context: RecipeAdapterContext): string {
  const callerContext =
    context.config.auth === "better-auth"
      ? `{ session: {} as NonNullable<Context["session"]> } as Context`
      : `{ session: null } as Context`;
  return `import { describe, expect, it } from "bun:test";

import type { Context } from "../context";
import { appRouter } from "./index";

const caller = appRouter.createCaller(${callerContext});

describe("${context.name} persistent recipe", () => {
  it("creates, reads, updates, and removes a record", async () => {
    const created = await caller.${context.name}.create({ name: "First" });
    expect(created?.name).toBe("First");
    expect(await caller.${context.name}.byId({ id: created?.id ?? "" })).toMatchObject({ name: "First" });
    expect(await caller.${context.name}.update({ id: created?.id ?? "", name: "Updated" })).toMatchObject({ name: "Updated" });
    expect(await caller.${context.name}.remove({ id: created?.id ?? "" })).toEqual({ success: true });
    expect(await caller.${context.name}.byId({ id: created?.id ?? "" })).toBeNull();
  });
});
`;
}

function recipeGuide(context: RecipeAdapterContext): string {
  const pm = context.config.packageManager;
  return `# ${context.typeName} persistence recipe

This recipe is owned by ${ownerSpec(context.config) ?? "the TypeScript backend"}.

## Migration

Review the generated schema at \`packages/db/src/schema/${context.name}.ts\`, then run:

\`\`\`bash
${pm} run db:generate
${pm} run db:migrate
\`\`\`

## Client example

Use the generated router through the project's existing tRPC client:

\`\`\`ts
const created = await trpc.${context.name}.create.mutate({ name: "First" });
const rows = await trpc.${context.name}.list.query();
await trpc.${context.name}.update.mutate({ id: created.id, name: "Updated" });
await trpc.${context.name}.remove.mutate({ id: created.id });
\`\`\`

## Verification

Run \`${pm} test packages/api/src/routers/${context.name}.integration.test.ts\` against a disposable SQLite database.
`;
}

async function planRouterFiles(
  context: RecipeAdapterContext,
  resourceContent: (importExtension: string) => string,
): Promise<{
  files: RecipePlannedFile[];
  routerIndex: string;
  resourcePath: string;
  importExtension: string;
}> {
  const routerIndexPath = await findRouterIndex(context.projectDir);
  if (!routerIndexPath) throw new Error("Could not locate a TypeScript API routers/index.ts.");
  const routersDir = path.dirname(routerIndexPath);
  const resourcePath = path.join(routersDir, `${context.name}.ts`);
  const relativeResource = path.relative(context.projectDir, resourcePath).replaceAll("\\", "/");
  const relativeRouter = path.relative(context.projectDir, routerIndexPath).replaceAll("\\", "/");
  if (await fs.pathExists(resourcePath)) {
    throw new Error(`Resource '${context.name}' already exists at ${relativeResource}.`);
  }
  const original = await fs.readFile(routerIndexPath, "utf-8");
  const importExtension = detectImportExtension(original);
  const ensured = ensureRouterManagedRegions(original);
  if (!ensured.success) throw new Error(ensured.reason);
  const withImport = appendManagedRegionLine(
    ensured.content,
    "recipe-imports",
    `import { ${context.name}Router } from "./${context.name}${importExtension}";`,
  );
  if (!withImport.success) throw new Error(withImport.reason);
  const withRegistration = appendManagedRegionLine(
    withImport.content,
    "recipe-registrations",
    `  ${context.name}: ${context.name}Router,`,
  );
  if (!withRegistration.success) throw new Error(withRegistration.reason);
  return {
    files: [
      plannedFile(relativeResource, "create", resourceContent(importExtension), null),
      plannedFile(relativeRouter, "update", withRegistration.content, original),
    ],
    routerIndex: relativeRouter,
    resourcePath: relativeResource,
    importExtension,
  };
}

export const typescriptPersistentResourceAdapter: RecipeAdapter = {
  id: "typescript-trpc-drizzle-sqlite-resource",
  version: 1,
  maintenanceOwner: "@Marve10s",
  verificationRecipe: "typescript-persistent-resource",
  demandEvidence:
    "Extends the shipped TypeScript resource generator with its selected persistence layer.",
  supports: ({ config }) =>
    config.ecosystem === "typescript" &&
    config.api === "trpc" &&
    config.database === "sqlite" &&
    config.orm === "drizzle" &&
    config.packageManager === "bun" &&
    (config.auth === "none" || config.auth === "better-auth") &&
    config.workspaceShape !== "single-app"
      ? { supported: true }
      : {
          supported: false,
          reason:
            "Persistent generation currently requires a Bun-managed TypeScript monorepo with tRPC, SQLite, Drizzle, and either no auth or Better Auth.",
        },
  plan: async (context): Promise<RecipeAdapterPlan> => {
    const router = await planRouterFiles(context, (importExtension) =>
      persistentRouter(context, importExtension),
    );
    const schemaIndexPath = path.join(context.projectDir, "packages/db/src/schema/index.ts");
    if (!(await fs.pathExists(schemaIndexPath))) {
      throw new Error("Could not locate packages/db/src/schema/index.ts for the Drizzle owner.");
    }
    const schemaPath = `packages/db/src/schema/${context.name}.ts`;
    if (await fs.pathExists(path.join(context.projectDir, schemaPath))) {
      throw new Error(`Schema '${context.name}' already exists at ${schemaPath}.`);
    }
    const schemaIndexOriginal = await fs.readFile(schemaIndexPath, "utf-8");
    const ensuredSchema = ensureSchemaManagedRegion(schemaIndexOriginal);
    if (!ensuredSchema.success) throw new Error(ensuredSchema.reason);
    const schemaExport = appendManagedRegionLine(
      ensuredSchema.content,
      "recipe-schema-exports",
      `export * from "./${context.name}";`,
    );
    if (!schemaExport.success) throw new Error(schemaExport.reason);
    const testPath = router.resourcePath.replace(/\.ts$/, ".integration.test.ts");
    const servicePath = `packages/db/src/queries/${context.name}.ts`;
    const guidePath = `docs/recipes/${context.name}.md`;
    const files = [
      ...router.files,
      plannedFile(schemaPath, "create", persistentSchema(context), null),
      plannedFile(servicePath, "create", persistentService(context), null),
      plannedFile(
        "packages/db/src/schema/index.ts",
        "update",
        schemaExport.content,
        schemaIndexOriginal,
      ),
      plannedFile(testPath, "create", persistentIntegrationTest(context), null),
      plannedFile(guidePath, "create", recipeGuide(context), null),
    ];
    return {
      adapterId: typescriptPersistentResourceAdapter.id,
      adapterVersion: typescriptPersistentResourceAdapter.version,
      maintenanceOwner: typescriptPersistentResourceAdapter.maintenanceOwner,
      recipeId: `typescript-resource:${context.name}`,
      name: context.name,
      summary: `Generate a persistent ${context.name} tRPC CRUD slice with Drizzle and SQLite.`,
      persistent: true,
      ownerPartId: ownerPartId(context.config),
      files,
      ownedArtifacts: [
        { path: router.resourcePath, ownership: "full" },
        {
          path: router.routerIndex,
          ownership: "managed-region",
          regionId: "recipe-imports",
          entry: `import { ${context.name}Router } from "./${context.name}${router.importExtension}";`,
        },
        {
          path: router.routerIndex,
          ownership: "managed-region",
          regionId: "recipe-registrations",
          entry: `  ${context.name}: ${context.name}Router,`,
        },
        { path: schemaPath, ownership: "full" },
        { path: servicePath, ownership: "full" },
        {
          path: "packages/db/src/schema/index.ts",
          ownership: "managed-region",
          regionId: "recipe-schema-exports",
          entry: `export * from "./${context.name}";`,
        },
        { path: testPath, ownership: "full" },
        { path: guidePath, ownership: "full" },
      ],
      checks: [
        {
          id: "migration",
          command: `${context.config.packageManager} run db:migrate`,
          description: "Apply the reviewed Drizzle migration to the target database.",
        },
        {
          id: "crud-integration",
          command: `${context.config.packageManager} test ${testPath}`,
          description: "Exercise create, read, update, and delete through the generated router.",
        },
      ],
      migrationGuidance: [
        `Review ${schemaPath}.`,
        `Run ${context.config.packageManager} run db:generate, then ${context.config.packageManager} run db:migrate.`,
      ],
    };
  },
};

export const typescriptMemoryResourceAdapter: RecipeAdapter = {
  id: "typescript-api-memory-resource",
  version: 1,
  maintenanceOwner: "@Marve10s",
  verificationRecipe: "typescript-memory-resource",
  demandEvidence: "Preserves the previously shipped TypeScript tRPC/oRPC resource workflow.",
  supports: ({ config }) =>
    config.ecosystem === "typescript" && (config.api === "trpc" || config.api === "orpc")
      ? { supported: true }
      : {
          supported: false,
          reason: "The memory resource adapter requires a TypeScript tRPC or oRPC project.",
        },
  plan: async (context): Promise<RecipeAdapterPlan> => {
    const router = await planRouterFiles(context, (importExtension) =>
      memoryResource(context, importExtension),
    );
    return {
      adapterId: typescriptMemoryResourceAdapter.id,
      adapterVersion: typescriptMemoryResourceAdapter.version,
      maintenanceOwner: typescriptMemoryResourceAdapter.maintenanceOwner,
      recipeId: `typescript-resource:${context.name}`,
      name: context.name,
      summary: `Generate an in-memory ${context.name} CRUD API resource.`,
      persistent: false,
      ownerPartId: ownerPartId(context.config),
      files: router.files,
      ownedArtifacts: [
        { path: router.resourcePath, ownership: "full" },
        {
          path: router.routerIndex,
          ownership: "managed-region",
          regionId: "recipe-imports",
          entry: `import { ${context.name}Router } from "./${context.name}${router.importExtension}";`,
        },
        {
          path: router.routerIndex,
          ownership: "managed-region",
          regionId: "recipe-registrations",
          entry: `  ${context.name}: ${context.name}Router,`,
        },
      ],
      checks: [
        {
          id: "project-check",
          command: `${context.config.packageManager} run check-types`,
          description: "Type-check the generated resource through the project workspace.",
        },
      ],
      migrationGuidance: [
        "This adapter is in-memory. Select the supported tRPC, SQLite, Drizzle, and unauthenticated boundary for persistence.",
      ],
    };
  },
};
