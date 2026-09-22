import type { StackState } from "@/lib/stack/stack-defaults";

import StackBuilder from "@/components/stack-builder/stack-builder";

export function StackBuilderPage({ initialStack }: { initialStack?: StackState }) {
  return (
    // Full height: the site navbar does not render on the builder, which carries its own bar.
    <div className="grid h-dvh w-full flex-1 grid-cols-1 overflow-hidden">
      <StackBuilder initialStack={initialStack} />
    </div>
  );
}
