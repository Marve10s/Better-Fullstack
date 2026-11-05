import { DEFAULT_STACK_SELECTION, getDisabledReason } from "@better-fullstack/types";
import { describe, expect, it } from "bun:test";

import {
  COMPATIBILITY_GUIDE_SECTIONS,
  renderCompatibilityGuide,
} from "@/mcp/mcp-compatibility-guide";

const rules = COMPATIBILITY_GUIDE_SECTIONS.flatMap((section) => section.rules);

describe("MCP compatibility guide", () => {
  it.each(rules.map((rule) => [rule.text, rule] as const))("holds: %s", (_text, rule) => {
    const mismatches = rule.probes.flatMap((probe) => {
      const reason = getDisabledReason(
        { ...DEFAULT_STACK_SELECTION, ...probe.stack },
        probe.category,
        probe.option,
      );
      return (reason === null) === probe.allowed
        ? []
        : [`${probe.category}=${probe.option}: ${reason ?? "allowed"}`];
    });
    expect(rule.probes.length).toBeGreaterThan(0);
    expect(mismatches).toEqual([]);
  });

  it("renders every rule into the docs resource", () => {
    const markdown = renderCompatibilityGuide();
    for (const rule of rules) expect(markdown).toContain(rule.text);
  });
});
