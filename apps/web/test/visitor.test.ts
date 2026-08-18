import { describe, expect, test } from "bun:test";

import { registerVisit } from "../src/lib/visitor";

function createStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
  };
}

describe("returning visitor detection", () => {
  test("reports returning only from a session after the first visit", () => {
    const persistentStorage = createStorage();
    const firstSession = createStorage();

    expect(registerVisit(persistentStorage, firstSession)).toBe(false);
    expect(registerVisit(persistentStorage, firstSession)).toBe(false);

    const laterSession = createStorage();
    expect(registerVisit(persistentStorage, laterSession)).toBe(true);
    expect(registerVisit(persistentStorage, laterSession)).toBe(true);
  });

  test("treats a visitor carrying the persisted flag into a fresh session as returning", () => {
    const persistentStorage = createStorage({ "better-fullstack.has-visited": "true" });

    expect(registerVisit(persistentStorage, createStorage())).toBe(true);
  });

  test("stays hidden when storage is unavailable", () => {
    const throwingStorage = {
      getItem: () => {
        throw new Error("storage disabled");
      },
      setItem: () => {
        throw new Error("storage disabled");
      },
    };

    expect(registerVisit(throwingStorage, throwingStorage)).toBe(false);
    expect(registerVisit(null, null)).toBe(false);
  });
});
