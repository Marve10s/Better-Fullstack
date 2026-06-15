import { describe, expect, it } from "bun:test";

const DOCS_ROOT = new URL("../content/docs/", import.meta.url);

async function readJson<T>(path: string): Promise<T> {
  return Bun.file(new URL(path, DOCS_ROOT)).json() as Promise<T>;
}

async function expectDocPage(path: string) {
  const file = Bun.file(new URL(path, DOCS_ROOT));
  expect(await file.exists()).toBe(true);

  const content = await file.text();
  expect(content).toContain("title:");
}

describe("docs navigation", () => {
  it("registers the trust milestone docs in sidebar metadata", async () => {
    const rootMeta = await readJson<{ pages: string[] }>("meta.json");
    const cliMeta = await readJson<{ pages: string[] }>("cli/meta.json");
    const sectionsMeta = await readJson<{ pages: string[] }>("sections/meta.json");
    const referenceMeta = await readJson<{ pages: string[] }>("reference/meta.json");
    const aiMeta = await readJson<{ pages: string[] }>("ai/meta.json");

    expect(rootMeta.pages).toContain("sections");
    expect(rootMeta.pages).not.toContain("deployment");
    const ecosystemsMeta = await readJson<{ pages: string[] }>("ecosystems/meta.json");
    const optionsMeta = await readJson<{ pages: string[] }>("reference/options/meta.json");
    expect(cliMeta.pages).toEqual(["index", "create", "add", "history", "mcp"]);
    expect(sectionsMeta.pages).toContain("deployment");
    expect(sectionsMeta.pages).toContain("frontend-and-apps");
    expect(ecosystemsMeta.pages).toContain("multi-ecosystem");
    expect(referenceMeta.pages).toContain("compatibility");
    expect(optionsMeta.pages).toContain("elixir");
    expect(aiMeta.pages).toContain("skills");
    expect(aiMeta.pages).toContain("mcp-tools");
  });

  it("keeps linked milestone docs backed by MDX files", async () => {
    await expectDocPage("reference/compatibility.mdx");
    await expectDocPage("reference/options/elixir.mdx");
    await expectDocPage("sections/index.mdx");
    await expectDocPage("sections/deployment.mdx");
    await expectDocPage("sections/backend-and-api.mdx");
    await expectDocPage("cli/index.mdx");
    await expectDocPage("cli/history.mdx");
    await expectDocPage("cli/mcp.mdx");
    await expectDocPage("ecosystems/multi-ecosystem.mdx");
    await expectDocPage("ai/skills.mdx");
    await expectDocPage("ai/mcp-tools.mdx");
  });
});
