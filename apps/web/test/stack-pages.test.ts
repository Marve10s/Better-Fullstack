import { describe, expect, it } from "bun:test";
import {
  createStackSelectionSearchParams,
  generateStackSelectionCommand,
  legacyProjectConfigToStackParts,
  parseStackSelectionFromSearch,
  stackSelectionToProjectConfig,
  validateStackParts,
} from "@better-fullstack/types";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { filterStackPartsForSelectedEcosystem } from "../scripts/generate-stack-pages";
import { StackCombinationPage } from "../src/components/stack-pages/stack-combination-page";
import {
  getPublishedStackPages,
  getStackPage,
} from "../src/lib/stack-pages/source";

describe("programmatic stack pages", () => {
  const pages = getPublishedStackPages();

  it("publishes 15 unique, compatibility-checked combinations", () => {
    expect(pages).toHaveLength(15);
    expect(new Set(pages.map((page) => page.slug)).size).toBe(15);
    expect(new Set(pages.map((page) => page.contentHash)).size).toBe(15);

    for (const page of pages) {
      expect(page.status).toBe("published");
      expect(page.compatibility.graphIssueCount).toBe(0);
      expect(page.compatibility.selectedOptionIssueCount).toBe(0);
      expect(page.output.fileCount).toBeGreaterThan(0);
      expect(page.output.representativeFiles.length).toBeGreaterThan(0);
      expect(page.relatedSlugs).toHaveLength(3);
    }
  });

  it("uses the shared URL serializer and command generator", () => {
    for (const page of pages) {
      const expectedParams = createStackSelectionSearchParams(page.selection);
      expect(page.builderUrl).toBe(`/new?${expectedParams.toString()}`);
      expect(page.command).toBe(generateStackSelectionCommand(page.selection));

      const url = new URL(page.builderUrl, "https://better-fullstack.dev");
      expect(parseStackSelectionFromSearch(Object.fromEntries(url.searchParams))).toEqual(
        page.selection,
      );
    }
  });

  it("keeps copied commands faithful to the selected database", () => {
    for (const page of pages.filter((candidate) => candidate.ecosystem !== "typescript")) {
      expect(page.command).toContain(`--database ${page.selection.database}`);
    }
  });

  it("filters inert cross-ecosystem parts before graph validation for Rust", () => {
    const page = getStackPage("rust-axum-leptos-seaorm");
    expect(page).toBeDefined();
    if (!page) return;

    const config = stackSelectionToProjectConfig(page.selection, {
      projectDir: "/virtual/my-app",
      relativePath: "my-app",
      install: true,
    });
    const unfilteredParts = legacyProjectConfigToStackParts(config);
    const filteredParts = filterStackPartsForSelectedEcosystem(
      unfilteredParts,
      page.selection.ecosystem,
    );

    expect(validateStackParts(unfilteredParts).issues.length).toBeGreaterThan(0);
    expect(filteredParts.some((part) => part.ecosystem === "typescript")).toBe(false);
    expect(validateStackParts(filteredParts).issues).toEqual([]);
    expect(page.compatibility.graphIssueCount).toBe(0);
  });

  it("renders substantive TypeScript and Rust HTML without client execution", () => {
    for (const slug of [
      "nextjs-hono-drizzle-better-auth",
      "rust-axum-leptos-seaorm",
    ]) {
      const page = getStackPage(slug);
      expect(page).toBeDefined();
      if (!page) continue;

      const html = renderToStaticMarkup(createElement(StackCombinationPage, { page }));
      expect(html).toContain(`<h1`);
      expect(html).toContain(page.title);
      expect(html).toContain("<table");
      expect(html).toContain(page.command);
      expect(html).toContain("Compatibility checked");
      expect(html).toContain(page.builderUrl.replaceAll("&", "&amp;"));
      expect(html).toContain(`${page.output.fileCount} files`);
    }
  });

  it("keeps request-time route imports free of generator and TECH_OPTIONS data", async () => {
    const runtimeFiles = [
      "src/routes/stack_.$comboSlug.tsx",
      "src/components/stack-pages/stack-combination-page.tsx",
      "src/lib/stack-pages/source.ts",
    ];
    const sources = await Promise.all(runtimeFiles.map((path) => Bun.file(path).text()));
    const runtimeSource = sources.join("\n");

    expect(runtimeSource).not.toContain("@better-fullstack/template-generator");
    expect(runtimeSource).not.toContain("TECH_OPTIONS");
  });
});
