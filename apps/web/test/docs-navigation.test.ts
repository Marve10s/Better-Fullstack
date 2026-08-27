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
    const aiMeta = await readJson<{ pages: string[] }>("ai/meta.json");
    const gettingStartedMeta = await readJson<{ pages: string[] }>("getting-started/meta.json");

    expect(rootMeta.pages).not.toContain("sections");
    expect(rootMeta.pages).not.toContain("recipes");
    expect(rootMeta.pages).not.toContain("deployment");
    expect(rootMeta.pages).toContain("verification");
    const ecosystemsMeta = await readJson<{ pages: string[] }>("ecosystems/meta.json");
    expect(cliMeta.pages).toEqual([
      "index",
      "create",
      "add",
      "update",
      "gen",
      "experimental",
      "telemetry",
    ]);
    expect(ecosystemsMeta.pages).toEqual(["index", "multi-ecosystem", "native-apps"]);
    expect(aiMeta.pages).toEqual(["overview", "mcp"]);
    expect(gettingStartedMeta.pages).toContain("lifecycle");
  });

  it("keeps linked milestone docs backed by MDX files", async () => {
    await expectDocPage("choosing-a-stack.mdx");
    await expectDocPage("cli/index.mdx");
    await expectDocPage("cli/update.mdx");
    await expectDocPage("cli/gen.mdx");
    await expectDocPage("cli/experimental.mdx");
    await expectDocPage("cli/telemetry.mdx");
    await expectDocPage("ecosystems/multi-ecosystem.mdx");
    await expectDocPage("ecosystems/native-apps.mdx");
    await expectDocPage("builder.mdx");
    await expectDocPage("ai/mcp.mdx");
    await expectDocPage("getting-started/lifecycle.mdx");
    await expectDocPage("verification.mdx");
  });
});
