import { Suspense, lazy } from "react";

import type { StackState } from "@/lib/stack-defaults";

const StackBuilder = lazy(() => import("@/components/stack-builder/stack-builder"));
const MultiEcosystemUpdateModal = lazy(async () => {
  const mod = await import("@/components/multi-ecosystem-update-modal");
  return { default: mod.MultiEcosystemUpdateModal };
});

const builderFallback = (
  <div className="flex h-[calc(100vh-64px)] items-center justify-center">Loading...</div>
);

export function StackBuilderPage({ initialStack }: { initialStack?: StackState }) {
  return (
    <>
      <Suspense fallback={builderFallback}>
        <div className="grid h-[calc(100vh-64px)] w-full flex-1 grid-cols-1 overflow-hidden">
          <StackBuilder initialStack={initialStack} />
        </div>
      </Suspense>
      <Suspense fallback={null}>
        <MultiEcosystemUpdateModal />
      </Suspense>
    </>
  );
}
