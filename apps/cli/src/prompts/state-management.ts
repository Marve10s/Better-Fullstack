import type { Frontend, StateManagement } from "../types";

import { splitFrontends } from "../utils/compatibility-rules";
import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

type StateManagementPromptContext = {
  stateManagement?: StateManagement;
  frontends?: Frontend[];
};

export function resolveStateManagementPrompt(
  context: StateManagementPromptContext = {},
): PromptSingleResolution<StateManagement> {
  if (context.stateManagement !== undefined) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: context.stateManagement,
    };
  }

  const { web } = splitFrontends(context.frontends);
  if (web.length === 0) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  const isReact = web.some((f) =>
    ["tanstack-router", "react-router", "react-vite", "tanstack-start", "next", "redwood"].includes(f),
  );
  const isFresh = web.includes("fresh");
  const options: Array<{ value: StateManagement; label: string; hint: string }> = [];

  if (isReact) {
    options.push(
      {
        value: "zustand" as const,
        label: "Zustand",
        hint: "Lightweight state management with simple API",
      },
      {
        value: "jotai" as const,
        label: "Jotai",
        hint: "Primitive and flexible atomic state",
      },
      {
        value: "redux-toolkit" as const,
        label: "Redux Toolkit",
        hint: "Enterprise-standard state with excellent TS support",
      },
      {
        value: "valtio" as const,
        label: "Valtio",
        hint: "Proxy-based state management",
      },
      {
        value: "legend-state" as const,
        label: "Legend State",
        hint: "High-performance observable state for React",
      },
      {
        value: "mobx" as const,
        label: "MobX",
        hint: "Observable-based reactive state management",
      },
    );
  }

  if (!isFresh) {
    options.push(
      {
        value: "nanostores" as const,
        label: "Nanostores",
        hint: "Tiny state manager (1KB) for all frameworks",
      },
      {
        value: "xstate" as const,
        label: "XState",
        hint: "State machines and statecharts for complex logic",
      },
      {
        value: "tanstack-store" as const,
        label: "TanStack Store",
        hint: "Framework-agnostic store powering TanStack ecosystem",
      },
    );
  }

  options.push({
    value: "none" as const,
    label: "None",
    hint: "Skip state management setup",
  });

  return {
    shouldPrompt: true,
    mode: "single",
    options,
    initialValue: "none",
  };
}

export async function getStateManagementChoice(
  stateManagement?: StateManagement,
  frontends?: Frontend[],
) {
  const resolution = resolveStateManagementPrompt({ stateManagement, frontends });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<StateManagement>({
    message: "Select state management",
    options: resolution.options,
    initialValue: resolution.initialValue as StateManagement,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
