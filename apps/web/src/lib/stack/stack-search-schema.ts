import type { STARTER_TRACK_FILTER_URL_KEYS, StarterTrackFilters } from "@better-fullstack/types";
import type { STACK_SELECTION_URL_KEYS } from "@better-fullstack/types/stack-translation";

import type { StackState } from "@/lib/stack/stack-defaults";

type StackUrlKeys = typeof STACK_SELECTION_URL_KEYS;
type StackValueForKey<K extends keyof StackUrlKeys> = K extends keyof StackState
  ? StackState[K] extends string[]
    ? string[]
    : string
  : never;
type StackSearchParamShape = {
  [K in keyof StackUrlKeys as StackUrlKeys[K]]: StackValueForKey<K>;
};
type StarterTrackFilterUrlKeys = typeof STARTER_TRACK_FILTER_URL_KEYS;
type StarterTrackFilterSearchParamShape = {
  [K in keyof StarterTrackFilterUrlKeys as StarterTrackFilterUrlKeys[K]]: K extends keyof StarterTrackFilters
    ? StarterTrackFilters[K]
    : never;
};

export type StackSearchParams = Partial<
  StackSearchParamShape & StarterTrackFilterSearchParamShape
> & {
  view?: "command" | "preview" | "run" | "presets" | "saved";
  file?: string;
  preset?: string;
  campaign?: string;
  newOptions?: "1";
};
