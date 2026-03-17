import { createFileRoute, Link } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useState } from "react";

// ── Mock data ────────────────────────────────────────────────────────
const TOTAL_ITEMS = 10_000;
const items = Array.from({ length: TOTAL_ITEMS }, (_, i) => ({
  id: i,
  label: `Item #${i + 1}`,
  value: Math.round(Math.random() * 1000),
}));

export const Route = createFileRoute("/showcase/virtual")({
  component: VirtualShowcase,
});

// ── Traditional: render all items ────────────────────────────────────
function TraditionalList() {
  const [rendered, setRendered] = useState(0);

  // Count DOM nodes after mount
  const containerRef = useRef<HTMLDivElement>(null);
  const countNodes = () => {
    if (containerRef.current) {
      setRendered(containerRef.current.childElementCount);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Rendering all {TOTAL_ITEMS.toLocaleString()} items</span>
        <button
          onClick={countNodes}
          className="rounded border border-border px-2 py-1 text-xs hover:bg-muted"
        >
          Count DOM nodes: {rendered > 0 ? rendered.toLocaleString() : "—"}
        </button>
      </div>
      <div
        ref={containerRef}
        className="h-[300px] overflow-auto rounded-md border border-border"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b border-border/30 px-3 py-2 text-sm"
          >
            <span>{item.label}</span>
            <span className="text-muted-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TanStack Virtual ─────────────────────────────────────────────────
function VirtualList() {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 37,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{TOTAL_ITEMS.toLocaleString()} items total</span>
        <span className="rounded border border-primary/30 bg-primary/5 px-2 py-1 text-xs text-primary">
          {virtualItems.length} DOM nodes mounted
        </span>
      </div>
      <div
        ref={parentRef}
        className="h-[300px] overflow-auto rounded-md border border-primary/20"
      >
        <div className="relative w-full" style={{ height: totalHeight }}>
          {virtualItems.map((virtualItem) => {
            const item = items[virtualItem.index];
            return (
              <div
                key={virtualItem.key}
                className="absolute left-0 top-0 flex w-full justify-between border-b border-primary/10 px-3 py-2 text-sm"
                style={{
                  height: virtualItem.size,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <span>{item.label}</span>
                <span className="text-primary/70">{item.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Page layout ──────────────────────────────────────────────────────
function VirtualShowcase() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link
        to="/showcase"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to Showcase
      </Link>
      <h1 className="mb-2 text-3xl font-bold">TanStack Virtual</h1>
      <p className="mb-8 text-muted-foreground">
        Virtualize lists, tables, and grids — only mount visible DOM nodes for
        silky-smooth 60fps scrolling even with 10,000+ items.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <div className="mb-3 rounded-t-lg border border-red-500/20 bg-red-500/10 px-4 py-2">
            <h2 className="text-sm font-semibold text-red-600 dark:text-red-400">
              Traditional: render everything
            </h2>
          </div>
          <div className="rounded-b-lg border border-t-0 border-border p-4 opacity-75">
            <TraditionalList />
          </div>
        </section>

        <section>
          <div className="mb-3 rounded-t-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
            <h2 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              TanStack Virtual
            </h2>
          </div>
          <div className="rounded-b-lg border border-t-0 border-primary/20 p-4">
            <VirtualList />
          </div>
        </section>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Why TanStack Virtual?</strong> The
        traditional approach mounts {TOTAL_ITEMS.toLocaleString()} DOM nodes — the
        browser becomes sluggish, memory usage spikes, and initial render blocks
        the main thread. TanStack Virtual only mounts ~15-20 visible items plus a
        small overscan buffer, keeping the DOM lightweight at any scale.
      </div>
    </div>
  );
}
