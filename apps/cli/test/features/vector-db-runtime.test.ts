import { readVirtualFileContent } from "@test/support/virtual-tree-utils";
import { expect, test } from "bun:test";
import { runInNewContext } from "node:vm";

import { createVirtual } from "@/index";

type VectorRecord = {
  id: string;
  vector: number[];
  attributes?: Record<string, string | number | boolean>;
};

type VectorModule = {
  getVectorClient: () => Promise<unknown>;
  upsertVectors: (records: VectorRecord[], name?: string) => Promise<void>;
};

async function loadVectorModule(
  vectorDb: "weaviate" | "lancedb" | "turbopuffer",
  bindings: Record<string, unknown>,
) {
  const result = await createVirtual({ backend: "hono", runtime: "bun", vectorDb });
  expect(result.error).toBeUndefined();
  const source = readVirtualFileContent(result.tree!.root, "apps/server/src/lib/vector.ts");
  const executable = new Bun.Transpiler({ loader: "ts" }).transformSync(
    source.replace(/^import .*;\n/gm, "").replace(/^export /gm, ""),
  );
  const exports: unknown = runInNewContext(
    `${executable}\n({ upsertVectors, getVectorClient: typeof getVectorClient === "undefined" ? undefined : getVectorClient });`,
    { ...bindings, process: { env: {} }, URL, Error },
  );
  return exports as VectorModule;
}

test("turbopuffer preserves record identity and embedding when attributes use reserved keys", async () => {
  const rows: VectorRecord[] = [];
  class Turbopuffer {
    namespace() {
      return {
        async write(input: { upsert_rows: VectorRecord[] }) {
          rows.push(...input.upsert_rows);
        },
      };
    }
  }
  const module = await loadVectorModule("turbopuffer", { Turbopuffer });
  await module.upsertVectors([
    { id: "document-1", vector: [1, 0], attributes: { id: "customer-1", vector: 42 } },
  ]);
  expect(rows).toEqual([{ id: "document-1", vector: [1, 0] }]);
});

for (const vectorDb of ["weaviate", "lancedb"] as const) {
  test(`${vectorDb} reconnects after a transient connection failure`, async () => {
    const client = {};
    let unavailable = true;
    const connect = async () => {
      if (unavailable) throw new Error("starting");
      return client;
    };
    const module = await loadVectorModule(vectorDb, {
      weaviate: { connectToLocal: connect, connectToWeaviateCloud: connect },
      lancedb: { connect },
    });
    await expect(module.getVectorClient()).rejects.toThrow("starting");
    unavailable = false;
    expect(await module.getVectorClient()).toBe(client);
  });
}

function weaviateBindings(insertMany: (rows: VectorRecord[]) => Promise<unknown>) {
  const collections = new Set<string>();
  return {
    generateUuid5: (id: string) => id,
    weaviate: {
      configure: { vectors: { selfProvided: () => ({}) } },
      connectToLocal: async () => ({
        collections: {
          exists: async (name: string) => collections.has(name),
          create: async ({ name }: { name: string }) => {
            await Promise.resolve();
            if (collections.has(name)) throw new Error("already exists");
            collections.add(name);
          },
          get: () => ({ data: { insertMany } }),
        },
      }),
    },
  };
}

test("Weaviate concurrent first writes both persist", async () => {
  const ids = new Set<string>();
  const module = await loadVectorModule(
    "weaviate",
    weaviateBindings(async (rows) => {
      for (const row of rows) ids.add(row.id);
      return { hasErrors: false };
    }),
  );
  await Promise.all([
    module.upsertVectors([{ id: "first", vector: [1, 0] }]),
    module.upsertVectors([{ id: "second", vector: [0, 1] }]),
  ]);
  expect([...ids].sort()).toEqual(["first", "second"]);
});

test("LanceDB concurrent first writes both persist", async () => {
  const tables = new Map<string, Map<string, VectorRecord>>();
  const openTable = async (name: string) => ({
    mergeInsert: () => ({
      whenMatchedUpdateAll: () => ({
        whenNotMatchedInsertAll: () => ({
          execute: async (rows: VectorRecord[]) => {
            for (const row of rows) tables.get(name)!.set(row.id, row);
          },
        }),
      }),
    }),
  });
  const module = await loadVectorModule("lancedb", {
    lancedb: {
      connect: async () => ({
        tableNames: async () => [...tables.keys()],
        openTable,
        createTable: async (
          name: string,
          rows: VectorRecord[],
          options?: { existOk?: boolean },
        ) => {
          await Promise.resolve();
          if (tables.has(name)) {
            if (!options?.existOk) throw new Error("already exists");
          } else {
            tables.set(name, new Map(rows.map((row) => [row.id, row])));
          }
          return openTable(name);
        },
      }),
    },
  });
  await Promise.all([
    module.upsertVectors([{ id: "first", vector: [1, 0] }]),
    module.upsertVectors([{ id: "second", vector: [0, 1] }]),
  ]);
  expect([...tables.get("embeddings")!.keys()].sort()).toEqual(["first", "second"]);
});

test("Weaviate write failures retain the server error and failed record", async () => {
  const errors = {
    0: { message: "invalid vector dimensions", object: { id: "document-1", vectors: [1] } },
  };
  const module = await loadVectorModule(
    "weaviate",
    weaviateBindings(async () => ({ hasErrors: true, errors })),
  );
  const error = await module
    .upsertVectors([{ id: "document-1", vector: [1] }])
    .catch((failure: unknown) => failure);
  expect(error).toBeInstanceOf(Error);
  expect((error as Error).cause).toEqual(errors);
});
