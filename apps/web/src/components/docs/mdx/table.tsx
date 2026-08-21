import type { ComponentPropsWithoutRef } from "react";

/**
 * Reference pages carry tables wider than the reading column. The wrapper
 * gives them their own horizontal scroll so the page body never scrolls
 * sideways.
 */
export function DocsTable(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="docs-table-scroll">
      <table {...props} />
    </div>
  );
}
