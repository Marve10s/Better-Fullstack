import type { OperationState } from "@/lib/use-operation";

export function StatusLine({ state, idle }: { state: OperationState<unknown>; idle: string }) {
  if (state.status === "loading") return <p className="text-xs text-muted-foreground">Working…</p>;
  if (state.status === "error")
    return (
      <p role="alert" className="text-xs text-destructive">
        {state.message}
      </p>
    );
  if (state.status === "idle") return <p className="text-xs text-muted-foreground">{idle}</p>;
  return null;
}
