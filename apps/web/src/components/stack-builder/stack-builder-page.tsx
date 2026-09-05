import type { StackState } from "@/lib/stack/stack-defaults";

import StackBuilder from "@/components/stack-builder/stack-builder";

export function StackBuilderPage({ initialStack }: { initialStack?: StackState }) {
  return (
    <div className="grid h-[calc(100vh-64px)] w-full flex-1 grid-cols-1 overflow-hidden">
      <StackBuilder initialStack={initialStack} />
    </div>
  );
}
