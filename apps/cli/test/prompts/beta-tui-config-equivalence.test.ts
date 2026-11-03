import { describe, expect, mock, test } from "bun:test";

import type { TuiController, TuiPrompt } from "@/tui/controller";

import { getPromptDriver, runWithContextAsync, setPromptDriver } from "@/presentation/context";
import * as navigable from "@/prompts/core/navigable";

type Script = Record<string, unknown>;

const real = { ...navigable };
let script: Script = {};

function scripted<T>(message: string, fallback: T): Promise<T> {
  return Promise.resolve((message in script ? script[message] : fallback) as T);
}

mock.module("@/prompts/core/navigable", () => ({
  ...real,
  navigableSelect: <T>(opts: navigable.NavigableSelectOptions<T>) =>
    getPromptDriver()
      ? real.navigableSelect(opts)
      : scripted(
          opts.message,
          opts.initialValue ?? opts.options.find((option) => !option.disabled)?.value,
        ),
  navigableMultiselect: <T>(opts: navigable.NavigableMultiselectOptions<T>) =>
    getPromptDriver()
      ? real.navigableMultiselect(opts)
      : scripted(opts.message, opts.initialValues ?? []),
  navigableConfirm: (opts: navigable.NavigableConfirmOptions) =>
    getPromptDriver()
      ? real.navigableConfirm(opts)
      : scripted(opts.message, opts.initialValue ?? true),
  navigableText: (opts: navigable.NavigableTextOptions) =>
    getPromptDriver()
      ? real.navigableText(opts)
      : scripted(opts.message, opts.initialValue ?? opts.defaultValue ?? ""),
}));

function moveTo(
  controller: TuiController,
  prompt: Exclude<TuiPrompt, { kind: "text" }>,
  value: unknown,
) {
  const index = prompt.options.findIndex((option) => option.value === value);
  if (index === -1) throw new Error(`"${prompt.message}" offers no ${String(value)}`);
  for (let step = 0; prompt.cursor !== index && step <= prompt.options.length; step++) {
    controller.handleKey({ name: "down" });
  }
}

function answer(controller: TuiController, prompt: TuiPrompt) {
  if (!(prompt.message in script)) return controller.handleKey({ name: "return" });
  const target = script[prompt.message];
  if (prompt.kind === "text") {
    for (const _ of prompt.input) controller.handleKey({ name: "backspace" });
    for (const char of String(target)) controller.handleKey({ name: char, sequence: char });
  } else if (prompt.kind === "multiselect") {
    const wanted = target as unknown[];
    for (const value of prompt.selected.filter((value) => !wanted.includes(value))) {
      moveTo(controller, prompt, value);
      controller.handleKey({ name: "space" });
    }
    for (const value of wanted.filter((value) => !prompt.selected.includes(value))) {
      moveTo(controller, prompt, value);
      controller.handleKey({ name: "space" });
    }
  } else {
    moveTo(controller, prompt, target);
  }
  controller.handleKey({ name: "return" });
}

async function gather(stack: Script) {
  script = stack;
  const { gatherConfig } = await import("@/prompts/core/config-prompts");
  return gatherConfig({}, "equivalence-app", "/virtual/equivalence-app", "equivalence-app");
}

async function gatherClassic(stack: Script) {
  return runWithContextAsync({}, () => gather(stack));
}

async function gatherWithTui(stack: Script) {
  const { TuiController } = await import("@/tui/controller");
  const controller = new TuiController();
  const answered = new WeakSet<TuiPrompt>();
  controller.subscribe(() => {
    const prompt = controller.prompt;
    if (!prompt || answered.has(prompt)) return;
    answered.add(prompt);
    queueMicrotask(() => answer(controller, prompt));
  });
  const config = await runWithContextAsync({}, () => {
    setPromptDriver(controller);
    return gather(stack);
  });
  return { config, prompts: controller.decisions.length };
}

const STACKS: Record<string, Script> = {
  "TypeScript, full scope": {
    "Select ecosystem": "typescript",
    "How much do you want to configure?": "full",
    "Select web framework": "next",
    "Select backend": "hono",
    "Select runtime": "node",
    "Select database": "postgres",
    "Select ORM": "prisma",
    "Generate AI documentation files?": ["agents-md"],
    "Initialize git repository?": false,
    "Install dependencies?": false,
  },
  "Rust, core scope": {
    "Select ecosystem": "rust",
    "How much do you want to configure?": "core",
    "Select Rust web framework": "actix-web",
    "Run cargo build?": false,
  },
  "Python, full scope": {
    "Select ecosystem": "python",
    "How much do you want to configure?": "full",
    "Select Python web framework": "django",
    "Select Python AI/ML frameworks": ["langchain", "openai-sdk"],
    "Run uv sync --extra dev?": false,
  },
};

describe("beta TUI config equivalence", () => {
  for (const [name, stack] of Object.entries(STACKS)) {
    test(`${name}: TUI selections produce the classic config`, async () => {
      const classic = await gatherClassic(stack);
      const { config, prompts } = await gatherWithTui(stack);

      expect(prompts).toBeGreaterThan(Object.keys(stack).length);
      expect(config).toEqual(classic);
    });
  }
});
