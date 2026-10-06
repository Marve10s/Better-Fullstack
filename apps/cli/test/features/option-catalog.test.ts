import {
  CLI_FLAG_GROUP_DEFINITIONS,
  ExamplesSchema,
  FrontendSchema,
  OPTION_CATEGORY_METADATA,
  getCategoryOrderForEcosystem,
} from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";
import { resolve } from "node:path";
import z from "zod";

import { CreateCommandOptionsSchema } from "@/create-command-input";
import { listOptionsOperation, searchOptionsOperation } from "@/operations/catalog";
import { listCatalogOptions } from "@/operations/option-catalog";
import { catalogListOutputSchema, catalogSearchOutputSchema } from "@/operations/output-schemas";
import { getSchemaOptions } from "@/operations/stack-helpers";

const CLI_ENTRY = resolve(import.meta.dir, "../../src/cli.ts");

async function runCli(args: string[]) {
  const child = Bun.spawn([process.execPath, CLI_ENTRY, ...args], {
    env: { ...process.env, BTS_TELEMETRY_DISABLED: "1" },
    stdin: "ignore",
    stdout: "pipe",
    stderr: "pipe",
  });
  const [exitCode, stdout, stderr] = await Promise.all([
    child.exited,
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
  ]);
  return { exitCode, stdout, stderr };
}

async function runJson(args: string[]) {
  const result = await runCli([...args, "--json"]);
  expect(result.stderr).toBe("");
  expect(result.exitCode).toBe(0);
  return JSON.parse(result.stdout) as unknown;
}

const createFields: Record<string, z.ZodType> = CreateCommandOptionsSchema.shape;
const createFieldByFlag = new Map(
  CLI_FLAG_GROUP_DEFINITIONS.flatMap((group) => group.flags).flatMap(({ flag, configKey }) =>
    configKey ? [[`--${flag}`, configKey] as const] : [],
  ),
);

function acceptedValues(schema: z.ZodType): string[] {
  if (schema instanceof z.ZodOptional || schema instanceof z.ZodDefault) {
    return acceptedValues(schema.unwrap());
  }
  if (schema instanceof z.ZodArray) return acceptedValues(schema.element);
  if (schema instanceof z.ZodEnum) return schema.options.map(String);
  if (schema instanceof z.ZodBoolean) return ["true", "false"];
  throw new Error(`No value list for create option schema ${schema.constructor.name}`);
}

const listed = (category?: string) =>
  catalogListOutputSchema.parse(listCatalogOptions({ category }));

function flagValue(flag: string, optionFlag: string | null) {
  if (optionFlag === `--no-${flag.slice(2)}`) return "false";
  if (optionFlag === flag) return "true";
  return optionFlag?.slice(flag.length + 1);
}

describe("list command", () => {
  it("lists exactly the values create accepts for every category's flag", () => {
    const valuesByFlag = new Map<string, Set<string | undefined>>();
    for (const { id, flag } of listed().categories ?? []) {
      // Categories without a dedicated flag are selected with --part role:ecosystem:tool, which the
      // create schema takes as free text, so there is no value list to compare against.
      if (!flag) {
        expect(createFields).not.toHaveProperty(id);
        continue;
      }
      const values = valuesByFlag.get(flag) ?? new Set();
      for (const option of listed(id).options ?? []) values.add(flagValue(flag, option.flag));
      valuesByFlag.set(flag, values);
    }

    // --frontend and --effect each select two categories, so compare the union per flag.
    for (const [flag, values] of valuesByFlag) {
      const field = createFieldByFlag.get(flag);
      expect(field, flag).toBeDefined();
      expect({ flag, values: [...values].sort() }).toEqual({
        flag,
        values: acceptedValues(createFields[field ?? ""]).sort(),
      });
    }
  });

  it("lists every example create accepts, matching the MCP tool", async () => {
    const json = await runJson(["list", "examples"]);
    const result = catalogListOutputSchema.parse(json);

    expect(result).toEqual(json);
    expect(result.category?.flag).toBe("--examples");
    expect(result.options?.map((option) => option.id)).toEqual([...ExamplesSchema.options]);
    expect(result.options?.find((option) => option.id === "tanstack-showcase")?.flag).toBe(
      "--examples tanstack-showcase",
    );
    expect(json).toEqual((await listOptionsOperation.invoke({ category: "examples" })).output);
  });

  it("names the bfs_get_schema category for each catalog category", () => {
    const categories = listed().categories ?? [];

    expect(categories.find((category) => category.id === "webFrontend")?.schemaCategory).toBe(
      "frontend",
    );
    expect(categories.find((category) => category.id === "backendLibraries")?.schemaCategory).toBe(
      "effect",
    );
    for (const { id, schemaCategory } of categories) {
      if (schemaCategory === null) {
        expect(getSchemaOptions(id), id).toHaveProperty("error");
        continue;
      }
      expect(getSchemaOptions(schemaCategory), id).toMatchObject({ category: schemaCategory });
    }
  });

  it("lists one ecosystem's categories in catalog order", async () => {
    const result = catalogListOutputSchema.parse(await runJson(["list", "--ecosystem", "go"]));

    expect(result.categories?.map((category) => category.id)).toEqual([
      ...getCategoryOrderForEcosystem("go"),
    ]);
    expect(result.categories?.find((category) => category.id === "goAuth")).toMatchObject({
      flag: "--go-auth",
      optionCount: OPTION_CATEGORY_METADATA.goAuth.options.length,
    });
  });

  it.each([
    [["list", "not-a-category"], 'Unknown option category "not-a-category"'],
    [["list", "go-auth"], 'Did you mean "goAuth"?'],
    [["list", "orm", "--ecosystem", "go"], 'Category "orm" is not part of the go ecosystem'],
  ])("rejects %j with a non-zero exit", async (args, message) => {
    const result = await runCli([...args, "--json"]);

    expect(result.exitCode).not.toBe(0);
    expect(result.stdout).toBe("");
    expect(result.stderr).toContain(message);
  });
});

describe("search command", () => {
  it("finds an option by alias with its category, ecosystem, and flag", async () => {
    const json = await runJson(["search", "sveltekit"]);
    const result = catalogSearchOutputSchema.parse(json);

    expect(result).toEqual(json);
    expect(FrontendSchema.options).toContain("svelte");
    expect(result.matches[0]).toEqual({
      id: "svelte",
      label: expect.any(String),
      aliases: ["sveltekit"],
      flag: "--frontend svelte",
      category: "webFrontend",
      categoryLabel: expect.any(String),
      ecosystems: ["typescript"],
    });
    expect(json).toEqual((await searchOptionsOperation.invoke({ query: "sveltekit" })).output);
  });

  it("finds drizzle under the TypeScript ORM category", async () => {
    const result = catalogSearchOutputSchema.parse(
      await runJson(["search", "Drizzle", "--ecosystem", "typescript"]),
    );

    expect(result.matches[0]).toMatchObject({
      id: "drizzle",
      category: "orm",
      flag: "--orm drizzle",
      ecosystems: ["typescript"],
    });
  });

  it("returns an empty match list for text that matches nothing", async () => {
    const result = catalogSearchOutputSchema.parse(
      await runJson(["search", "zz-no-such-option-zz"]),
    );

    expect(result.matches).toEqual([]);
  });
});
