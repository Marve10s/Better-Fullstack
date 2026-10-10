import {
  DEFAULT_STACK_SELECTION,
  analyzeStackCompatibility,
  normalizeStackSelection,
  createStackSelectionSearchParams,
  generateStackSelectionCommand,
  legacyProjectConfigToStackParts,
  parseStackSelectionFromSearch,
  stackSelectionToProjectConfig,
  validateStackParts,
} from "@better-fullstack/types";
import { filterStackPartsForSelectedEcosystem } from "@scripts/generate-stack-pages";
import { describe, expect, it } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { StackCombinationPage } from "@/components/stack-pages/stack-combination-page";
import { deriveArchitecture, deriveCanonicalParts } from "@/lib/stack-pages/facts";
import { PUBLISHED_STACK_SEEDS } from "@/lib/stack-pages/seeds";
import {
  getPublishedStackPages,
  getRelatedStackPages,
  getStackPage,
} from "@/lib/stack-pages/source";
import { TemplateCatalogSections } from "@/routes/templates";

function deriveSeedFacts(slug: string) {
  const seed = PUBLISHED_STACK_SEEDS.find((candidate) => candidate.slug === slug);
  if (!seed) throw new Error(`Missing seed: ${slug}`);
  const normalized = normalizeStackSelection({ ...DEFAULT_STACK_SELECTION, ...seed.selection });
  const selection = normalizeStackSelection({
    ...normalized,
    ...analyzeStackCompatibility(normalized).adjustedStack,
  });
  const config = stackSelectionToProjectConfig(selection, {
    projectDir: "/virtual/my-app",
    relativePath: "my-app",
    install: true,
  });
  const parts = filterStackPartsForSelectedEcosystem(
    legacyProjectConfigToStackParts(config),
    selection.ecosystem,
  );
  const canonicalParts = deriveCanonicalParts(selection, parts, seed);
  return { canonicalParts, architecture: deriveArchitecture(selection, canonicalParts, parts) };
}

describe("programmatic stack pages", () => {
  const pages = getPublishedStackPages();

  it("publishes 58 unique, compatibility-checked combinations", () => {
    expect(pages).toHaveLength(58);
    expect(new Set(pages.map((page) => page.slug)).size).toBe(58);
    expect(new Set(pages.map((page) => page.contentHash)).size).toBe(58);

    for (const page of pages) {
      expect(page.status).toBe("published");
      expect(page.compatibility.graphIssueCount).toBe(0);
      expect(page.compatibility.selectedOptionIssueCount).toBe(0);
      expect(page.output.fileCount).toBeGreaterThan(0);
      expect(page.output.representativeFiles.length).toBeGreaterThan(0);
      expect(page.relatedSlugs).toHaveLength(3);
    }
  });

  it("covers the priority search clusters with distinct generated selections", () => {
    const requiredSlugs = [
      "tanstack-start-postgres-drizzle-better-auth",
      "tanstack-router-hono-openapi-drizzle",
      "nextjs-hono-openapi-drizzle",
      "python-fastapi-postgres-sqlmodel",
      "go-echo-postgres-sqlc",
    ];

    for (const slug of requiredSlugs) expect(getStackPage(slug)).toBeDefined();
    expect(new Set(requiredSlugs.map((slug) => getStackPage(slug)?.contentHash)).size).toBe(
      requiredSlugs.length,
    );
  });

  it("gives every page a unique description that names its selected services", () => {
    expect(new Set(pages.map((page) => page.description)).size).toBe(pages.length);

    for (const page of pages) {
      const partIds = page.canonicalParts.map((part) => part.id);
      for (const service of [page.selection.payments, page.selection.email]) {
        if (service !== "none") expect(partIds).toContain(service);
      }
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

  it("covers Java, .NET, Elixir, and React Native stacks", () => {
    const ecosystems = new Set(pages.map((page) => page.ecosystem));
    for (const ecosystem of ["java", "dotnet", "elixir"]) expect(ecosystems).toContain(ecosystem);

    for (const slug of ["expo-hono-trpc-drizzle-better-auth", "expo-convex"]) {
      const page = deriveSeedFacts(slug);
      expect(page.canonicalParts).toContainEqual(
        expect.objectContaining({ category: "nativeFrontend", ownership: "Primary mobile app" }),
      );
      expect(page.architecture.facts).toContain(
        "The frontend and backend are separate primary stack parts.",
      );
    }
  });

  it("describes server-rendered Blazor and LiveView apps as having a browser UI", () => {
    for (const slug of ["dotnet-blazor-efcore-identity-sqlite", "elixir-phoenix-liveview-ecto"]) {
      const page = deriveSeedFacts(slug);
      expect(page.architecture.shape).toBe("server-rendered-app");
      expect(page.architecture.facts).toContain(
        "The backend framework renders the browser UI on the server.",
      );
      expect(getStackPage(slug)?.description).not.toContain("backend service");
    }
  });

  it("renders every published starter in the template catalog", () => {
    const html = renderToStaticMarkup(createElement(TemplateCatalogSections, { pages }));
    for (const page of pages) expect(html).toContain(`href="/stack/${page.slug}"`);
    for (const label of ["Java / Kotlin", ".NET", "Elixir"]) expect(html).toContain(label);
  });

  it("includes selected Java libraries in the derived page facts", () => {
    const seed = PUBLISHED_STACK_SEEDS.find(
      (candidate) =>
        "javaLibraries" in candidate.selection && candidate.selection.javaLibraries.includes("flyway"),
    );
    if (!seed || !("javaLibraries" in seed.selection)) throw new Error("Missing Flyway seed");
    const { canonicalParts } = deriveSeedFacts(seed.slug);
    for (const id of seed.selection.javaLibraries) {
      expect(canonicalParts).toContainEqual(
        expect.objectContaining({ category: "javaLibraries", id }),
      );
    }
  });

  it("keeps copied commands faithful to the selected database", () => {
    for (const page of pages.filter((candidate) => candidate.ecosystem !== "typescript")) {
      expect(page.command).toContain(`--database ${page.selection.database}`);
    }
  });

  it("removes inert TypeScript defaults from non-TypeScript commands and URLs", () => {
    for (const page of pages.filter((candidate) => candidate.ecosystem !== "typescript")) {
      expect(page.command).not.toContain("--auth better-auth");
      expect(page.builderUrl).not.toContain("auth=better-auth");
      expect(page.selection.auth).toBe("none");
    }
  });

  it("filters inert cross-ecosystem parts before generating Rust stack pages", () => {
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

    expect(validateStackParts(unfilteredParts).issues).toEqual([]);
    expect(filteredParts.length).toBeLessThan(unfilteredParts.length);
    expect(filteredParts.some((part) => part.ecosystem === "typescript")).toBe(false);
    expect(validateStackParts(filteredParts).issues).toEqual([]);
    expect(page.compatibility.graphIssueCount).toBe(0);
  });

  it("renders substantive TypeScript, Rust, and Elixir HTML without client execution", () => {
    for (const slug of [
      "nextjs-hono-drizzle-better-auth",
      "rust-axum-leptos-seaorm",
      "elixir-phoenix-liveview-ecto",
    ]) {
      const page = getStackPage(slug);
      expect(page).toBeDefined();
      if (!page) continue;

      const related = getRelatedStackPages(page).map(({ slug: relatedSlug, title }) => ({
        slug: relatedSlug,
        title,
      }));
      const html = renderToStaticMarkup(createElement(StackCombinationPage, { page, related }));
      for (const link of related) expect(html).toContain(`href="/stack/${link.slug}"`);
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
