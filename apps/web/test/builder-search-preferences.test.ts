import { describe, expect, it } from "bun:test";

import {
  buildBuilderSearchLookup,
  createBuilderSearchIndex,
  findBuilderSearchResults,
  getBuilderSearchScope,
  loadBuilderSearchPreferences,
  matchesBuilderSearch,
  matchesBuilderSearchIndex,
  normalizeBuilderSearchText,
  parseBuilderSearchPreferences,
  saveBuilderSearchPreferences,
} from "../src/lib/builder-search-preferences";

describe("builder search preferences", () => {
  it("keeps Java and Kotlin searches in separate scopes", () => {
    expect(getBuilderSearchScope("java", "java")).toBe("java");
    expect(getBuilderSearchScope("java", "kotlin")).toBe("kotlin");
    expect(getBuilderSearchScope("rust", "java")).toBe("rust");
  });

  it("loads and saves one query per ecosystem", () => {
    let value: string | null = null;
    const storage = {
      getItem: () => value,
      setItem: (_key: string, nextValue: string) => {
        value = nextValue;
      },
    };

    saveBuilderSearchPreferences({ typescript: "auth", rust: "axum" }, storage);
    expect(loadBuilderSearchPreferences(storage)).toEqual({ typescript: "auth", rust: "axum" });
  });

  it("ignores malformed stored values", () => {
    expect(parseBuilderSearchPreferences("not-json")).toEqual({});
    expect(parseBuilderSearchPreferences('{"typescript":"auth","rust":4}')).toEqual({
      typescript: "auth",
    });
  });

  it("matches section and library text case-insensitively", () => {
    expect(matchesBuilderSearch("AUTH", ["Authentication", "Clerk"])).toBe(true);
    expect(matchesBuilderSearch("tanstack", ["Web Frontend", "TanStack Router"])).toBe(true);
    expect(matchesBuilderSearch("redis", ["Database", "Drizzle"])).toBe(false);
  });

  it("reuses normalized indexes without normalizing every candidate per query", () => {
    const index = createBuilderSearchIndex(["Web Frontend", "TanStack Router"]);

    expect(matchesBuilderSearchIndex(normalizeBuilderSearchText("TANSTACK"), index)).toBe(true);
    expect(matchesBuilderSearchIndex(normalizeBuilderSearchText("router"), index)).toBe(true);
    expect(matchesBuilderSearchIndex(normalizeBuilderSearchText("axum"), index)).toBe(false);
  });

  it("uses a bounded trigram lookup for substring searches", () => {
    const lookup = buildBuilderSearchLookup([
      { id: "auth", searchIndex: createBuilderSearchIndex(["Authentication"]) },
      { id: "tanstack", searchIndex: createBuilderSearchIndex(["TanStack Router"]) },
      { id: "clerk", searchIndex: createBuilderSearchIndex(["Clerk"]) },
      { id: "repeated", searchIndex: createBuilderSearchIndex(["Aaaa Toolkit"]) },
    ]);

    expect(findBuilderSearchResults(lookup, "stack").map((entry) => entry.id)).toEqual([
      "tanstack",
    ]);
    expect(findBuilderSearchResults(lookup, "clerk", 1).map((entry) => entry.id)).toEqual([
      "clerk",
    ]);
    expect(findBuilderSearchResults(lookup, "aaaa").map((entry) => entry.id)).toEqual(["repeated"]);
    expect(findBuilderSearchResults(lookup, "missing")).toEqual([]);
  });

  it("limits short-query results without collecting the entire match set", () => {
    const lookup = buildBuilderSearchLookup(
      Array.from({ length: 100 }, (_, index) => ({
        id: index,
        searchIndex: createBuilderSearchIndex([`Library ${index}`]),
      })),
    );

    expect(findBuilderSearchResults(lookup, "l", 3).map((entry) => entry.id)).toEqual([0, 1, 2]);
  });
});
