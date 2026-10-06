import {
  FrontendSchema,
  GoAuthSchema,
  ORMSchema,
  OPTION_CATEGORY_METADATA,
  getCategoryOrderForEcosystem,
} from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";
import { resolve } from "node:path";

import { listOptionsOperation, searchOptionsOperation } from "@/operations/catalog";
import { catalogListOutputSchema, catalogSearchOutputSchema } from "@/operations/output-schemas";

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

describe("list command", () => {
  it.each([
    ["orm", "typescript", "--orm", ORMSchema.options],
    ["goAuth", "go", "--go-auth", GoAuthSchema.options],
  ] as const)(
    "lists exactly the schema values of %s for %s with their flag",
    async (category, ecosystem, flag, schemaValues) => {
      const json = await runJson(["list", category, "--ecosystem", ecosystem]);
      const result = catalogListOutputSchema.parse(json);

      expect(result).toEqual(json);
      expect(result.ecosystem).toBe(ecosystem);
      expect(result.category?.flag).toBe(flag);
      expect(result.category?.ecosystems).toContain(ecosystem);
      expect(result.options?.map((option) => option.id)).toEqual([...schemaValues]);
      for (const option of result.options ?? []) expect(option.flag).toBe(`${flag} ${option.id}`);
      expect(json).toEqual((await listOptionsOperation.invoke({ category, ecosystem })).output);
    },
  );

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
