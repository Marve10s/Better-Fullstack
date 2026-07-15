const BUILDER_SEARCH_STORAGE_KEY = "betterFullstackBuilderSearches";

export type BuilderSearchPreferences = Record<string, string>;

type SearchStorage = Pick<Storage, "getItem" | "setItem">;

function getBrowserStorage(): SearchStorage | null {
  if (typeof window === "undefined" || typeof window.localStorage === "undefined") return null;
  return window.localStorage;
}

export function parseBuilderSearchPreferences(raw: string | null): BuilderSearchPreferences {
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed).filter(
        (entry): entry is [string, string] =>
          typeof entry[1] === "string" && entry[1].trim().length > 0,
      ),
    );
  } catch {
    return {};
  }
}

export function loadBuilderSearchPreferences(
  storage: SearchStorage | null = getBrowserStorage(),
): BuilderSearchPreferences {
  if (!storage) return {};
  return parseBuilderSearchPreferences(storage.getItem(BUILDER_SEARCH_STORAGE_KEY));
}

export function saveBuilderSearchPreferences(
  preferences: BuilderSearchPreferences,
  storage: SearchStorage | null = getBrowserStorage(),
) {
  if (!storage) return;
  storage.setItem(BUILDER_SEARCH_STORAGE_KEY, JSON.stringify(preferences));
}

export function getBuilderSearchScope(ecosystem: string, javaLanguage: string) {
  return ecosystem === "java" ? javaLanguage : ecosystem;
}

export function normalizeBuilderSearchText(value: string) {
  return value.trim().toLocaleLowerCase();
}

export function createBuilderSearchIndex(values: Array<string | null | undefined>) {
  return normalizeBuilderSearchText(values.filter(Boolean).join("\u0000"));
}

export function matchesBuilderSearchIndex(normalizedQuery: string, indexedText: string) {
  return !normalizedQuery || indexedText.includes(normalizedQuery);
}

export type BuilderSearchIndexedEntry = { searchIndex: string };

export type BuilderSearchLookup<T extends BuilderSearchIndexedEntry> = {
  entries: readonly T[];
  trigrams: Map<string, Set<number>>;
};

function getSearchTrigrams(value: string) {
  const trigrams = new Set<string>();
  for (let index = 0; index <= value.length - 3; index += 1) {
    trigrams.add(value.slice(index, index + 3));
  }
  return trigrams;
}

export function buildBuilderSearchLookup<T extends BuilderSearchIndexedEntry>(
  entries: readonly T[],
): BuilderSearchLookup<T> {
  const trigrams = new Map<string, Set<number>>();

  entries.forEach((entry, entryIndex) => {
    for (const trigram of getSearchTrigrams(entry.searchIndex)) {
      const matchingEntries = trigrams.get(trigram);
      if (matchingEntries) {
        matchingEntries.add(entryIndex);
      } else {
        trigrams.set(trigram, new Set([entryIndex]));
      }
    }
  });

  return { entries, trigrams };
}

export function findBuilderSearchResults<T extends BuilderSearchIndexedEntry>(
  lookup: BuilderSearchLookup<T>,
  query: string,
  limit = 12,
) {
  const normalizedQuery = normalizeBuilderSearchText(query);
  if (!normalizedQuery || limit <= 0) return [];

  if (normalizedQuery.length < 3) {
    const results: T[] = [];
    for (const entry of lookup.entries) {
      if (!entry.searchIndex.includes(normalizedQuery)) continue;

      results.push(entry);
      if (results.length === limit) break;
    }
    return results;
  }

  const candidateSets: Set<number>[] = [];
  for (const trigram of getSearchTrigrams(normalizedQuery)) {
    const candidates = lookup.trigrams.get(trigram);
    if (!candidates) return [];
    candidateSets.push(candidates);
  }
  candidateSets.sort((left, right) => left.size - right.size);

  if (candidateSets.length === 0) return [];

  const [smallestCandidateSet, ...remainingCandidateSets] = candidateSets;
  const results: T[] = [];
  for (const entryIndex of smallestCandidateSet) {
    if (!remainingCandidateSets.every((candidateSet) => candidateSet.has(entryIndex))) continue;

    const entry = lookup.entries[entryIndex];
    if (!entry.searchIndex.includes(normalizedQuery)) continue;

    results.push(entry);
    if (results.length === limit) break;
  }

  return results;
}

export function matchesBuilderSearch(query: string, values: Array<string | null | undefined>) {
  return matchesBuilderSearchIndex(
    normalizeBuilderSearchText(query),
    createBuilderSearchIndex(values),
  );
}
