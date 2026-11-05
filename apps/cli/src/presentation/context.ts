import { AsyncLocalStorage } from "node:async_hooks";

import type { PromptDriver, PromptStep } from "@/prompts/core/prompt-driver";

type NavigationState = {
  isFirstPrompt: boolean;
  lastPromptShownUI: boolean;
  step?: PromptStep;
};

type CLIContext = {
  navigation: NavigationState;
  silent: boolean;
  promptDriver?: PromptDriver;
  outputCaptured?: boolean;
};

const cliStorage = new AsyncLocalStorage<CLIContext>();

function defaultContext(): CLIContext {
  return {
    navigation: {
      isFirstPrompt: false,
      lastPromptShownUI: false,
    },
    silent: false,
  };
}

function getContext(): CLIContext {
  const ctx = cliStorage.getStore();
  if (!ctx) {
    return defaultContext();
  }
  return ctx;
}

function tryGetContext(): CLIContext | undefined {
  return cliStorage.getStore();
}

export function isSilent(): boolean {
  return getContext().silent;
}

export function isFirstPrompt(): boolean {
  return getContext().navigation.isFirstPrompt;
}

export function didLastPromptShowUI(): boolean {
  return getContext().navigation.lastPromptShownUI;
}

export function setIsFirstPrompt(value: boolean): void {
  const ctx = tryGetContext();
  if (ctx) {
    ctx.navigation.isFirstPrompt = value;
  }
}

export function setLastPromptShownUI(value: boolean): void {
  const ctx = tryGetContext();
  if (ctx) {
    ctx.navigation.lastPromptShownUI = value;
  }
}

export function getPromptStep(): PromptStep | undefined {
  return getContext().navigation.step;
}

export function setPromptStep(step: PromptStep | undefined): void {
  const ctx = tryGetContext();
  if (ctx) {
    ctx.navigation.step = step;
  }
}

export function getPromptDriver(): PromptDriver | undefined {
  return tryGetContext()?.promptDriver;
}

export function setPromptDriver(driver: PromptDriver | undefined): void {
  const ctx = tryGetContext();
  if (ctx) {
    ctx.promptDriver = driver;
  }
}

export function setOutputCaptured(value: boolean): void {
  const ctx = tryGetContext();
  if (ctx) {
    ctx.outputCaptured = value;
  }
}

export function childStderr(): "pipe" | ["inherit", "pipe"] {
  return tryGetContext()?.outputCaptured ? "pipe" : ["inherit", "pipe"];
}

type ContextOptions = {
  silent?: boolean;
};

export function runWithContext<T>(options: ContextOptions, fn: () => T): T {
  const ctx: CLIContext = {
    navigation: {
      isFirstPrompt: false,
      lastPromptShownUI: false,
    },
    silent: options.silent ?? false,
  };

  return cliStorage.run(ctx, fn);
}

export async function runWithContextAsync<T>(
  options: ContextOptions,
  fn: () => Promise<T>,
): Promise<T> {
  const ctx: CLIContext = {
    navigation: {
      isFirstPrompt: false,
      lastPromptShownUI: false,
    },
    silent: options.silent ?? false,
  };

  return cliStorage.run(ctx, fn);
}
