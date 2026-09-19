import { useCallback, useRef, useState } from "react";

import { type Connection, callOperation, errorText } from "@/lib/devframe";

export type OperationState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; data: T }
  | { status: "error"; message: string };

/** Runs one operation on demand and tracks its lifecycle for the view. */
export function useOperation<T>(connection: Connection, name: string) {
  const [state, setState] = useState<OperationState<T>>({ status: "idle" });
  const latest = useRef(0);
  const run = useCallback(
    async (input: Record<string, unknown> = {}) => {
      // An older call that settles last must not overwrite the newer result.
      const call = ++latest.current;
      setState({ status: "loading" });
      try {
        const data = await callOperation<T>(connection, name, input);
        if (call === latest.current) setState({ status: "done", data });
        return data;
      } catch (error) {
        if (call === latest.current) setState({ status: "error", message: errorText(error) });
        return undefined;
      }
    },
    [connection, name],
  );
  return { state, run };
}
