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
    const gettingStartedMeta = await readJson<{ pages: string[] }>("getting-started/meta.json");
    const recipesMeta = await readJson<{ pages: string[] }>("recipes/meta.json");

    expect(rootMeta.pages).toContain("sections");
    expect(rootMeta.pages).toContain("recipes");
    expect(rootMeta.pages).not.toContain("deployment");
    const ecosystemsMeta = await readJson<{ pages: string[] }>("ecosystems/meta.json");
    const optionsMeta = await readJson<{ pages: string[] }>("reference/options/meta.json");
    expect(cliMeta.pages).toEqual([
      "index",
      "create",
      "add",
      "update",
      "check",
      "gen",
      "registry",
      "recommend",
      "history",
      "mcp",
      "telemetry",
      "utilities",
    ]);
    expect(sectionsMeta.pages).toContain("deployment");
    expect(sectionsMeta.pages).toContain("frontend-and-apps");
    expect(ecosystemsMeta.pages).toContain("multi-ecosystem");
    expect(referenceMeta.pages).toContain("compatibility");
    expect(referenceMeta.pages).toContain("versioning");
    expect(optionsMeta.pages).toContain("elixir");
    expect(optionsMeta.pages).toContain("dotnet");
    expect(aiMeta.pages).toContain("skills");
    expect(aiMeta.pages).toContain("mcp-tools");
    expect(gettingStartedMeta.pages).toContain("lifecycle");
    expect(recipesMeta.pages).toHaveLength(7);
  });

  it("keeps linked milestone docs backed by MDX files", async () => {
    await expectDocPage("reference/compatibility.mdx");
    await expectDocPage("reference/options/elixir.mdx");
    await expectDocPage("reference/options/dotnet.mdx");
    await expectDocPage("reference/versioning.mdx");
    await expectDocPage("sections/index.mdx");
    await expectDocPage("sections/deployment.mdx");
    await expectDocPage("sections/backend-and-api.mdx");
    await expectDocPage("cli/index.mdx");
    await expectDocPage("cli/check.mdx");
    await expectDocPage("cli/update.mdx");
    await expectDocPage("cli/gen.mdx");
    await expectDocPage("cli/registry.mdx");
    await expectDocPage("cli/recommend.mdx");
    await expectDocPage("cli/telemetry.mdx");
    await expectDocPage("cli/utilities.mdx");
    await expectDocPage("cli/history.mdx");
    await expectDocPage("cli/mcp.mdx");
    await expectDocPage("ecosystems/multi-ecosystem.mdx");
    await expectDocPage("ecosystems/native-mobile.mdx");
    await expectDocPage("web-builder/edit-and-run.mdx");
    await expectDocPage("web-builder/download-and-share.mdx");
    await expectDocPage("ai/skills.mdx");
    await expectDocPage("ai/mcp-tools.mdx");
    await expectDocPage("getting-started/lifecycle.mdx");
    await expectDocPage("recipes/default-typescript-web.mdx");
    await expectDocPage("recipes/nextjs-self-backend.mdx");
    await expectDocPage("recipes/python-api.mdx");
    await expectDocPage("recipes/dotnet-service.mdx");
    await expectDocPage("recipes/multi-ecosystem-product.mdx");
    await expectDocPage("recipes/browser-zip-workflow.mdx");
  });
});
