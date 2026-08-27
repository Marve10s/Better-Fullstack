import { describe, expect, it } from "bun:test";

import { getLocalWebDevPort } from "@/platform/local-dev";

describe("getLocalWebDevPort", () => {
  it("uses Vite's port for all Electron-compatible SPA frontends", () => {
    for (const frontend of ["tanstack-router", "react-vite", "vanilla-vite", "vue", "solid"]) {
      expect(getLocalWebDevPort([frontend])).toBe(5173);
    }
  });
});
