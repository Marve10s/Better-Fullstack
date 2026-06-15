import { Suspense, lazy } from "react";

import type { StackState } from "@/lib/stack-defaults";
import { m } from "@/paraglide/messages.js";

const StackBuilder = lazy(() => import("@/components/stack-builder/stack-builder"));

function BuilderFallback() {
  return (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center">
      {m.builderLoading()}
    </div>
  );
}

export function StackBuilderPage({ initialStack }: { initialStack?: StackState }) {
  return (
    <>
      <Suspense fallback={<BuilderFallback />}>
        <div className="grid h-[calc(100vh-64px)] w-full flex-1 grid-cols-1 overflow-hidden">
          <StackBuilder initialStack={initialStack} />
        </div>
      </Suspense>
    </>
  );
}
