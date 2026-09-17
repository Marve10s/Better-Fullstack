import { useCallback, useState } from "react";

import { type Connection, callOperation, errorText } from "@/lib/devframe";

export type OperationState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; data: T }
  | { status: "error"; message: string };

/** Runs one operation on demand and tracks its lifecycle for the view. */
export function useOperation<T>(connection: Connection, name: string) {
  const [state, setState] = useState<OperationState<T>>({ status: "idle" });
  const run = useCallback(
    async (input: Record<string, unknown> = {}) => {
      setState({ status: "loading" });
      try {
        const data = await callOperation<T>(connection, name, input);
        setState({ status: "done", data });
        return data;
      } catch (error) {
        setState({ status: "error", message: errorText(error) });
        return undefined;
      }
    },
    [connection, name],
  );
  return { state, run };
}
