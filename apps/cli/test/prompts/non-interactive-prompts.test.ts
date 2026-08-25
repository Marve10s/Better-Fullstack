import { describe, expect, it } from "bun:test";

import {
  navigableConfirm,
  navigableMultiselect,
  navigableSelect,
  navigableText,
} from "@/prompts/core/navigable";

describe("non-interactive prompt fallbacks", () => {
  it("select resolves to the initial value without a terminal", async () => {
    const value = await navigableSelect({
      message: "Select integrations platform",
      options: [
        { value: "nango", label: "Nango" },
        { value: "none", label: "None" },
      ],
      initialValue: "none",
    });
    expect(value).toBe("none");
  });

  it("select falls back to the first enabled option", async () => {
    const value = await navigableSelect({
      message: "Pick one",
      options: [
        { value: "a", disabled: true },
        { value: "b" },
      ],
    });
    expect(value).toBe("b");
  });

  it("select throws when no default exists", async () => {
    await expect(
      navigableSelect({ message: "Pick one", options: [{ value: "a", disabled: true }] }),
    ).rejects.toThrow("needs an interactive terminal");
  });

  it("multiselect resolves to initial values or empty", async () => {
    expect(
      await navigableMultiselect({
        message: "Pick many",
        options: [{ value: "a" }],
        initialValues: ["a"],
      }),
    ).toEqual(["a"]);
    expect(await navigableMultiselect({ message: "Pick many", options: [{ value: "a" }] })).toEqual(
      [],
    );
  });

  it("confirm resolves to its initial value", async () => {
    expect(await navigableConfirm({ message: "Continue?", initialValue: false })).toBe(false);
    expect(await navigableConfirm({ message: "Continue?" })).toBe(true);
  });

  it("text resolves to defaults and throws without one", async () => {
    expect(await navigableText({ message: "Name?", defaultValue: "my-app" })).toBe("my-app");
    await expect(navigableText({ message: "Name?" })).rejects.toThrow(
      "needs an interactive terminal",
    );
  });
});
