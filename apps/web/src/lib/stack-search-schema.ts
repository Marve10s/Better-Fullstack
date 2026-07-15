import type { STACK_SELECTION_URL_KEYS } from "@better-fullstack/types/stack-translation";

import type { StackState } from "./stack-defaults";

type StackUrlKeys = typeof STACK_SELECTION_URL_KEYS;
type StackValueForKey<K extends keyof StackUrlKeys> = K extends keyof StackState
  ? StackState[K] extends string[]
    ? string[]
    : string
  : never;
type StackSearchParamShape = {
  [K in keyof StackUrlKeys as StackUrlKeys[K]]: StackValueForKey<K>;
};

export type StackSearchParams = Partial<StackSearchParamShape> & {
  view?: "command" | "preview" | "presets" | "saved";
  file?: string;
  preset?: string;
  newOptions?: "1";
};
