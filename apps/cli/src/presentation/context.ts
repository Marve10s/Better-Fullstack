import { AsyncLocalStorage } from "node:async_hooks";

type NavigationState = {
  isFirstPrompt: boolean;
  lastPromptShownUI: boolean;
};

type CLIContext = {
  navigation: NavigationState;
  silent: boolean;
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
