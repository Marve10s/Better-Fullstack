import { connectDevframe, type DevframeRpcClient } from "devframe/client";
import { createContext, useContext } from "react";

export const SCOPE = "bfs";

export type Connection = {
  client: DevframeRpcClient;
  /** Baked reads only: no live server behind the page. */
  isStatic: boolean;
  projectDir: string;
};

export const ConnectionContext = createContext<Connection | null>(null);

export function useConnection(): Connection {
  const connection = useContext(ConnectionContext);
  if (!connection) throw new Error("useConnection must be used inside ConnectionContext");
  return connection;
}

export type Session = Pick<Connection, "client" | "isStatic">;

export async function connect(): Promise<Session> {
  const client = await connectDevframe();
  return { client, isStatic: client.transport === "static" };
}

/**
 * Reads the served project once the browser is trusted; shared state and RPC
 * are gated before that. Falls back to the status report's own directory.
 */
export async function describeProject(session: Session): Promise<Connection> {
  const scoped = session.client.scope(SCOPE).rpc;
  let projectDir = "";
  try {
    const state = await scoped.sharedState<{ projectDir?: string }>("project");
    projectDir = state.value().projectDir ?? "";
  } catch {
    projectDir = "";
  }
  if (!projectDir) {
    const status: unknown = await scoped.call("get_project_status", {});
    projectDir = (status as { projectDir?: string }).projectDir ?? "";
  }
  return { ...session, projectDir };
}

/** Call one lifecycle operation by its table name, for example `get_project_status`. */
export async function callOperation<T>(
  connection: Connection,
  name: string,
  input: Record<string, unknown> = {},
): Promise<T> {
  const payload = connection.projectDir ? { projectDir: connection.projectDir, ...input } : input;
  const result: unknown = await connection.client.scope(SCOPE).rpc.call(name, payload);
  return result as T;
}

export function errorText(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
