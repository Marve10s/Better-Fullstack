import { describe, expect, it } from "bun:test";

import {
  getChangelogInteractionStorageKey,
  markChangelogReleaseInteracted,
  shouldShowChangelogRelease,
} from "../src/lib/changelog-visibility";

function createStorage(initial: Record<string, string> = {}) {
  const entries = new Map(Object.entries(initial));

  return {
    getItem(key: string) {
      return entries.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      entries.set(key, value);
    },
  };
}

describe("changelog visibility", () => {
  it("shows a new release even when the legacy visit flag exists", () => {
    const storage = createStorage({ "better-fullstack.has-visited": "true" });

    expect(shouldShowChangelogRelease(storage, "v2.0.3")).toBe(true);
  });

  it("hides only the release version the visitor interacted with", () => {
    const storage = createStorage();

    markChangelogReleaseInteracted(storage, "v2.0.3", "closed");

    expect(storage.getItem(getChangelogInteractionStorageKey("v2.0.3"))).toBe("closed");
    expect(shouldShowChangelogRelease(storage, "v2.0.3")).toBe(false);
    expect(shouldShowChangelogRelease(storage, "v2.0.4")).toBe(true);
  });

  it("does not show when there is no release version", () => {
    expect(shouldShowChangelogRelease(createStorage(), undefined)).toBe(false);
  });
});
