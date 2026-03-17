import { createFileRoute, Link } from "@tanstack/react-router";
import { useDebouncer } from "@tanstack/react-pacer";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Mock data ────────────────────────────────────────────────────────
const ITEMS = Array.from({ length: 200 }, (_, i) => ({
  id: i,
  name: `Item ${i + 1} — ${["Alpha", "Beta", "Gamma", "Delta", "Epsilon"][i % 5]} ${["Widget", "Gadget", "Tool", "Device", "Module"][Math.floor(i / 5) % 5]}`,
}));

export const Route = createFileRoute("/showcase/pacer")({
  component: PacerShowcase,
});

// ── Traditional: manual setTimeout debounce ──────────────────────────
function TraditionalDebounce() {
  const [rawInput, setRawInput] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [filterCount, setFilterCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedValue(rawInput);
      if (rawInput) setFilterCount((c) => c + 1);
    }, 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [rawInput]);

  const filtered = ITEMS.filter((item) =>
    item.name.toLowerCase().includes(debouncedValue.toLowerCase()),
  );

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Manual useEffect + useRef + clearTimeout
      </p>
      <input
        value={rawInput}
        onChange={(e) => setRawInput(e.target.value)}
        placeholder="Type to search..."
        className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:border-foreground focus:outline-none"
      />
      <div className="flex gap-3 text-xs text-muted-foreground">
        <span>Raw: &quot;{rawInput}&quot;</span>
        <span>Debounced: &quot;{debouncedValue}&quot;</span>
        <span>Filters run: {filterCount}</span>
      </div>
      <div className="h-[200px] overflow-auto rounded-md border border-border">
        {filtered.slice(0, 50).map((item) => (
          <div
            key={item.id}
            className="border-b border-border/30 px-3 py-1.5 text-sm"
          >
            {item.name}
          </div>
        ))}
        {filtered.length > 50 && (
          <div className="px-3 py-1.5 text-xs text-muted-foreground">
            ...and {filtered.length - 50} more
          </div>
        )}
      </div>
    </div>
  );
}

// ── TanStack Pacer ───────────────────────────────────────────────────
function PacerDebounce() {
  const [rawInput, setRawInput] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [filterCount, setFilterCount] = useState(0);

  const debouncer = useDebouncer(
    useCallback(
      (value: string) => {
        setDebouncedValue(value);
        if (value) setFilterCount((c) => c + 1);
      },
      [],
    ),
    { wait: 300 },
  );

  const handleChange = (value: string) => {
    setRawInput(value);
    debouncer.maybeExecute(value);
  };

  const filtered = ITEMS.filter((item) =>
    item.name.toLowerCase().includes(debouncedValue.toLowerCase()),
  );

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        One hook — useDebouncer with configurable wait
      </p>
      <input
        value={rawInput}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Type to search..."
        className="w-full rounded-md border border-primary/20 bg-background px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
      />
      <div className="flex gap-3 text-xs text-muted-foreground">
        <span>Raw: &quot;{rawInput}&quot;</span>
        <span className="text-primary">Debounced: &quot;{debouncedValue}&quot;</span>
        <span>Filters run: {filterCount}</span>
      </div>
      <div className="h-[200px] overflow-auto rounded-md border border-primary/20">
        {filtered.slice(0, 50).map((item) => (
          <div
            key={item.id}
            className="border-b border-primary/10 px-3 py-1.5 text-sm"
          >
            {item.name}
          </div>
        ))}
        {filtered.length > 50 && (
          <div className="px-3 py-1.5 text-xs text-muted-foreground">
            ...and {filtered.length - 50} more
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page layout ──────────────────────────────────────────────────────
function PacerShowcase() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link
        to="/showcase"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to Showcase
      </Link>
      <h1 className="mb-2 text-3xl font-bold">TanStack Pacer</h1>
      <p className="mb-8 text-muted-foreground">
        Debounce, throttle, rate-limit, queue, and retry — well-tested hooks that
        replace hand-rolled setTimeout patterns.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <div className="mb-3 rounded-t-lg border border-red-500/20 bg-red-500/10 px-4 py-2">
            <h2 className="text-sm font-semibold text-red-600 dark:text-red-400">
              Traditional: manual setTimeout debounce
            </h2>
          </div>
          <div className="rounded-b-lg border border-t-0 border-border p-4 opacity-75">
            <TraditionalDebounce />
          </div>
        </section>

        <section>
          <div className="mb-3 rounded-t-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
            <h2 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              TanStack Pacer
            </h2>
          </div>
          <div className="rounded-b-lg border border-t-0 border-primary/20 p-4">
            <PacerDebounce />
          </div>
        </section>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Why TanStack Pacer?</strong> The
        manual approach requires useEffect + useRef + clearTimeout for every
        debounced value, and it&apos;s easy to forget cleanup or introduce stale
        closure bugs. TanStack Pacer gives you useDebouncer, useThrottler,
        useRateLimiter, useQueuer, and more — each properly handling cleanup,
        cancellation, and async execution.
      </div>
    </div>
  );
}
