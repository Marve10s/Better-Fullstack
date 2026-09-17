import { useEffect, useState } from "react";

import { AuthGate } from "@/components/auth-gate";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type Connection,
  ConnectionContext,
  type Session,
  connect,
  describeProject,
  errorText,
} from "@/lib/devframe";
import { ChecksView } from "@/views/checks";
import { EvidenceView } from "@/views/evidence";
import { OverviewView } from "@/views/overview";
import { RecoveryView } from "@/views/recovery";
import { UpdateView } from "@/views/update";

type Phase =
  | { kind: "connecting" }
  | { kind: "failed"; message: string }
  | { kind: "auth"; session: Session }
  | { kind: "ready"; connection: Connection };

export function App() {
  const [phase, setPhase] = useState<Phase>({ kind: "connecting" });

  useEffect(() => {
    let cancelled = false;
    const ready = async (session: Session) => {
      const connection = await describeProject(session);
      if (!cancelled) setPhase({ kind: "ready", connection });
    };
    const start = async () => {
      const session = await connect();
      if (cancelled) return;
      const trusted = session.isStatic || session.client.isTrusted === true;
      if (trusted) await ready(session);
      else setPhase({ kind: "auth", session });
    };
    start().catch((error: unknown) => {
      if (!cancelled) setPhase({ kind: "failed", message: errorText(error) });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (phase.kind === "connecting") {
    return (
      <main className="p-6 text-xs text-muted-foreground">Connecting to the devtools server…</main>
    );
  }
  if (phase.kind === "failed") {
    return (
      <main className="p-6">
        <p role="alert" className="text-xs text-destructive">
          Could not connect: {phase.message}
        </p>
      </main>
    );
  }
  if (phase.kind === "auth") {
    return (
      <AuthGate
        client={phase.session.client}
        onTrusted={() => {
          describeProject(phase.session)
            .then((connection) => setPhase({ kind: "ready", connection }))
            .catch((error: unknown) => setPhase({ kind: "failed", message: errorText(error) }));
        }}
      />
    );
  }

  const { connection } = phase;
  return (
    <ConnectionContext.Provider value={connection}>
      <main className="mx-auto flex max-w-4xl flex-col gap-4 p-4 sm:p-6">
        <header className="flex flex-wrap items-center gap-2">
          <h1 className="text-sm font-semibold tracking-tight">Better Fullstack devtools</h1>
          {connection.isStatic ? (
            <Badge variant="outline">static report</Badge>
          ) : (
            <Badge variant="success">live</Badge>
          )}
          <span
            className="ml-auto truncate font-mono text-[11px] text-muted-foreground"
            data-testid="project-dir"
          >
            {connection.projectDir}
          </span>
        </header>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="checks">Checks</TabsTrigger>
            <TabsTrigger value="update">Update</TabsTrigger>
            <TabsTrigger value="recovery">Recovery</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <OverviewView />
          </TabsContent>
          <TabsContent value="checks">
            <ChecksView />
          </TabsContent>
          <TabsContent value="update">
            <UpdateView />
          </TabsContent>
          <TabsContent value="recovery">
            <RecoveryView />
          </TabsContent>
          <TabsContent value="evidence">
            <EvidenceView />
          </TabsContent>
        </Tabs>
      </main>
    </ConnectionContext.Provider>
  );
}
