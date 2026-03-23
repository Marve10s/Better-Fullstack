import type { StackState } from "@/lib/constant";
import { DEFAULT_STACK } from "@/lib/stack-defaults";
import { normalizeStackStateSelections } from "@/lib/stack-option-normalization";

const SAVED_STACKS_STORAGE_KEY = "betterFullstackSavedStacks";
const LEGACY_SAVED_STACK_KEY = "betterFullstackPreference";
const STORAGE_VERSION = 1;

interface SavedStackStoragePayload {
  version: number;
  entries: SavedStackEntry[];
}

export interface SavedStackEntry {
  id: string;
  name: string;
  stack: StackState;
  createdAt: string;
  updatedAt: string;
}

function canUseLocalStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function createSavedStackId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `saved-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeSavedStackEntry(entry: Partial<SavedStackEntry>): SavedStackEntry | null {
  if (!entry || typeof entry.name !== "string" || !entry.stack) {
    return null;
  }

  const now = new Date().toISOString();

  return {
    id: typeof entry.id === "string" && entry.id.length > 0 ? entry.id : createSavedStackId(),
    name: entry.name.trim() || "Untitled preset",
    stack: normalizeStackStateSelections({
      ...DEFAULT_STACK,
      ...(entry.stack as Partial<StackState>),
    }),
    createdAt:
      typeof entry.createdAt === "string" && entry.createdAt.length > 0 ? entry.createdAt : now,
    updatedAt:
      typeof entry.updatedAt === "string" && entry.updatedAt.length > 0 ? entry.updatedAt : now,
  };
}

function parseSavedStacks(raw: string | null): SavedStackEntry[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as SavedStackStoragePayload | SavedStackEntry[];
    const entries = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed.entries)
        ? parsed.entries
        : [];

    return entries
      .map((entry) => normalizeSavedStackEntry(entry))
      .filter((entry): entry is SavedStackEntry => entry !== null)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } catch (error) {
    console.error("Failed to parse saved stacks", error);
    return [];
  }
}

function persistSavedStacks(entries: SavedStackEntry[]) {
  if (!canUseLocalStorage()) return;

  const payload: SavedStackStoragePayload = {
    version: STORAGE_VERSION,
    entries,
  };

  localStorage.setItem(SAVED_STACKS_STORAGE_KEY, JSON.stringify(payload));
}

export function loadSavedStacks(): SavedStackEntry[] {
  if (!canUseLocalStorage()) return [];

  const entries = parseSavedStacks(localStorage.getItem(SAVED_STACKS_STORAGE_KEY));
  const legacyRaw = localStorage.getItem(LEGACY_SAVED_STACK_KEY);

  if (!legacyRaw) {
    return entries;
  }

  try {
    const legacyStack = normalizeStackStateSelections({
      ...DEFAULT_STACK,
      ...(JSON.parse(legacyRaw) as Partial<StackState>),
    });
    const alreadyMigrated = entries.some(
      (entry) => JSON.stringify(entry.stack) === JSON.stringify(legacyStack),
    );

    if (alreadyMigrated) {
      localStorage.removeItem(LEGACY_SAVED_STACK_KEY);
      return entries;
    }

    const now = new Date().toISOString();
    const migratedEntry: SavedStackEntry = {
      id: createSavedStackId(),
      name: legacyStack.projectName?.trim() || "Migrated saved stack",
      stack: legacyStack,
      createdAt: now,
      updatedAt: now,
    };
    const nextEntries = [migratedEntry, ...entries];
    persistSavedStacks(nextEntries);
    localStorage.removeItem(LEGACY_SAVED_STACK_KEY);
    return nextEntries;
  } catch (error) {
    console.error("Failed to migrate legacy saved stack", error);
    localStorage.removeItem(LEGACY_SAVED_STACK_KEY);
    return entries;
  }
}

export function saveSavedStacks(entries: SavedStackEntry[]) {
  persistSavedStacks(
    [...entries].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
  );
}

export function buildSavedStackEntry(name: string, stack: StackState): SavedStackEntry {
  const now = new Date().toISOString();

  return {
    id: createSavedStackId(),
    name: name.trim() || stack.projectName?.trim() || "Untitled preset",
    stack,
    createdAt: now,
    updatedAt: now,
  };
}
