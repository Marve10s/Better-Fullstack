import type { StackState } from "@/lib/constant";

import { createStackSearchParams, parseStackFromUrlRecord } from "./stack-url-state.shared";

export function loadStackParams(
  searchParams:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>,
): Promise<StackState> | StackState {
  const parseSync = (params: Record<string, string | string[] | undefined>): StackState =>
    parseStackFromUrlRecord(params);

  if (searchParams instanceof Promise) {
    return searchParams.then(parseSync);
  }

  return parseSync(searchParams);
}

export function serializeStackParams(basePath: string, stack: StackState): string {
  const params = createStackSearchParams(stack);
  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

export type LoadedStackState = StackState;
