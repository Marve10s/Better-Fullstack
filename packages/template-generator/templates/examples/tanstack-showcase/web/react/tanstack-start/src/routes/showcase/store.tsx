import { createFileRoute, Link } from "@tanstack/react-router";
import { Store } from "@tanstack/store";
import { useStore } from "@tanstack/react-store";
import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

export const Route = createFileRoute("/showcase/store")({
  component: StoreShowcase,
});

// ── Traditional: useContext + useReducer ──────────────────────────────
type TraditionalState = { count: number; theme: "light" | "dark" };
type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "toggleTheme" };

function reducer(state: TraditionalState, action: Action): TraditionalState {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "toggleTheme":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
  }
}

const StateCtx = createContext<TraditionalState>({ count: 0, theme: "light" });
const DispatchCtx = createContext<React.Dispatch<Action>>(() => {});

function TraditionalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { count: 0, theme: "light" });
  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={dispatch}>{children}</DispatchCtx.Provider>
    </StateCtx.Provider>
  );
}

function TraditionalCounter() {
  const { count } = useContext(StateCtx);
  const dispatch = useContext(DispatchCtx);
  return (
    <div className="flex items-center gap-3 rounded-md border border-border p-3">
      <span className="text-sm font-medium">Component A</span>
      <button
        onClick={() => dispatch({ type: "decrement" })}
        className="rounded border border-border px-2 py-0.5 text-sm hover:bg-muted"
      >
        −
      </button>
      <span className="min-w-[2ch] text-center text-lg font-bold">{count}</span>
      <button
        onClick={() => dispatch({ type: "increment" })}
        className="rounded border border-border px-2 py-0.5 text-sm hover:bg-muted"
      >
        +
      </button>
    </div>
  );
}

function TraditionalThemeToggle() {
  const { theme } = useContext(StateCtx);
  const dispatch = useContext(DispatchCtx);
  return (
    <div className="flex items-center gap-3 rounded-md border border-border p-3">
      <span className="text-sm font-medium">Component B</span>
      <button
        onClick={() => dispatch({ type: "toggleTheme" })}
        className="rounded border border-border px-3 py-0.5 text-sm hover:bg-muted"
      >
        Theme: {theme}
      </button>
    </div>
  );
}

function TraditionalDemo() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Requires Provider wrapper, useReducer, 2 contexts
      </p>
      <TraditionalProvider>
        <TraditionalCounter />
        <TraditionalThemeToggle />
      </TraditionalProvider>
    </div>
  );
}

// ── TanStack Store ───────────────────────────────────────────────────
const appStore = new Store({ count: 0, theme: "light" as "light" | "dark" });

function StoreCounter() {
  const count = useStore(appStore, (s) => s.count);
  return (
    <div className="flex items-center gap-3 rounded-md border border-primary/20 bg-primary/5 p-3">
      <span className="text-sm font-medium">Component A</span>
      <button
        onClick={() => appStore.setState((s) => ({ ...s, count: s.count - 1 }))}
        className="rounded border border-primary/30 px-2 py-0.5 text-sm text-primary hover:bg-primary/10"
      >
        −
      </button>
      <span className="min-w-[2ch] text-center text-lg font-bold text-primary">
        {count}
      </span>
      <button
        onClick={() => appStore.setState((s) => ({ ...s, count: s.count + 1 }))}
        className="rounded border border-primary/30 px-2 py-0.5 text-sm text-primary hover:bg-primary/10"
      >
        +
      </button>
    </div>
  );
}

function StoreThemeToggle() {
  const theme = useStore(appStore, (s) => s.theme);
  return (
    <div className="flex items-center gap-3 rounded-md border border-primary/20 bg-primary/5 p-3">
      <span className="text-sm font-medium">Component B</span>
      <button
        onClick={() =>
          appStore.setState((s) => ({
            ...s,
            theme: s.theme === "light" ? "dark" : "light",
          }))
        }
        className="rounded border border-primary/30 px-3 py-0.5 text-sm text-primary hover:bg-primary/10"
      >
        Theme: {theme}
      </button>
    </div>
  );
}

function StoreDemo() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        No providers — import the store, read with useStore
      </p>
      <StoreCounter />
      <StoreThemeToggle />
    </div>
  );
}

// ── Page layout ──────────────────────────────────────────────────────
function StoreShowcase() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link
        to="/showcase"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to Showcase
      </Link>
      <h1 className="mb-2 text-3xl font-bold">TanStack Store</h1>
      <p className="mb-8 text-muted-foreground">
        Framework-agnostic reactive state — no providers, no context drilling.
        Sibling components share state by importing the same store.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <div className="mb-3 rounded-t-lg border border-red-500/20 bg-red-500/10 px-4 py-2">
            <h2 className="text-sm font-semibold text-red-600 dark:text-red-400">
              Traditional: Context + useReducer
            </h2>
          </div>
          <div className="rounded-b-lg border border-t-0 border-border p-4 opacity-75">
            <TraditionalDemo />
          </div>
        </section>

        <section>
          <div className="mb-3 rounded-t-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
            <h2 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              TanStack Store
            </h2>
          </div>
          <div className="rounded-b-lg border border-t-0 border-primary/20 p-4">
            <StoreDemo />
          </div>
        </section>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        <strong className="text-foreground">Why TanStack Store?</strong> React
        Context requires a Provider tree, causes unnecessary re-renders of the
        entire subtree, and mixes dispatch logic with state shape. TanStack Store
        is a simple reactive container — create it outside React, read slices
        with selector-based useStore, and update with setState. Zero providers,
        surgical re-renders, framework-portable.
      </div>
    </div>
  );
}
