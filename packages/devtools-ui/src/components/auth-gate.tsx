import type { DevframeRpcClient } from "devframe/client";

import { type FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { errorText } from "@/lib/devframe";

/**
 * Devframe gates RPC behind a one-time code printed in the terminal that runs
 * `create-better-fullstack devtools`. The magic link on `--open` skips this.
 */
export function AuthGate({
  client,
  onTrusted,
}: {
  client: DevframeRpcClient;
  onTrusted: () => void;
}) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void client.requestAuthCode().catch((error: unknown) => setMessage(errorText(error)));
  }, [client]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      const trusted = await client.requestTrustWithCode(code.trim());
      if (trusted) onTrusted();
      else setMessage("That code was not accepted. Check the terminal for the current one.");
    } catch (error) {
      setMessage(errorText(error));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-4 p-6">
      <h1 className="text-base font-semibold">Authorize this browser</h1>
      <p className="text-xs text-muted-foreground">
        A six digit code was printed in the terminal running the devtools. Enter it once; this
        browser stays trusted afterwards.
      </p>
      <form onSubmit={submit} className="flex gap-2">
        <input
          aria-label="Authorization code"
          inputMode="numeric"
          pattern="[0-9]*"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          className="h-8 flex-1 border border-input bg-background px-2 font-mono text-sm outline-none focus-visible:border-ring"
          placeholder="123456"
        />
        <Button type="submit" disabled={busy || code.trim().length === 0}>
          Continue
        </Button>
      </form>
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="xs"
          onClick={() =>
            void client
              .requestAuthCode({ reissue: true })
              .catch((error: unknown) => setMessage(errorText(error)))
          }
        >
          Print a new code
        </Button>
        {message ? (
          <p role="alert" className="text-xs text-destructive">
            {message}
          </p>
        ) : null}
      </div>
    </main>
  );
}
