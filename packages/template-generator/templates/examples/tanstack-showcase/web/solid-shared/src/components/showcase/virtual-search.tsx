import { createDebouncedSignal } from "@tanstack/solid-pacer";
import { useStore } from "@tanstack/solid-store";
import { createVirtualizer } from "@tanstack/solid-virtual";
import { createEffect, createMemo, For, on } from "solid-js";

import { showcaseStore } from "./store";

const ROWS = Array.from({ length: 10_000 }, (_, index) => ({
  id: index + 1,
  label: `Row ${index + 1} · ${(index * 7919) % 10_000}`,
}));

export default function VirtualSearch() {
  let scrollElement: HTMLDivElement | undefined;
  const [query, setQuery] = createDebouncedSignal("", { wait: 250 });
  const density = useStore(showcaseStore, (state) => state.density);

  const rows = createMemo(() => {
    const needle = query().trim().toLowerCase();
    return needle ? ROWS.filter((row) => row.label.toLowerCase().includes(needle)) : ROWS;
  });

  const virtualizer = createVirtualizer({
    get count() {
      return rows().length;
    },
    getScrollElement: () => scrollElement ?? null,
    estimateSize: () => (density() === "compact" ? 28 : 40),
    overscan: 8,
  });

  createEffect(on(density, () => virtualizer.measure(), { defer: true }));

  return (
    <div class="space-y-3">
      <input
        type="search"
        placeholder="Filter 10,000 rows (debounced)"
        class="w-full rounded border border-neutral-700 bg-transparent p-2 text-sm"
        onInput={(event) => setQuery(event.currentTarget.value)}
      />
      <p class="text-xs text-neutral-400">
        {rows().length.toLocaleString()} {rows().length === 1 ? "match" : "matches"},{" "}
        {virtualizer.getVirtualItems().length} rendered
      </p>
      <div ref={scrollElement} class="h-72 overflow-auto rounded border border-neutral-800">
        <div class="relative w-full" style={{ height: `${virtualizer.getTotalSize()}px` }}>
          <For each={virtualizer.getVirtualItems()}>
            {(item) => (
              <div
                class="absolute left-0 flex w-full items-center border-b border-neutral-900 px-3 text-sm"
                style={{ height: `${item.size}px`, transform: `translateY(${item.start}px)` }}
              >
                {rows()[item.index]?.label}
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
