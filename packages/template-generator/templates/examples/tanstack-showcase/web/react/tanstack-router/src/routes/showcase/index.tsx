import { createFileRoute, Link } from "@tanstack/react-router";

const showcases = [
  {
    title: "TanStack Query",
    path: "/showcase/query",
    description: "Replace useEffect + useState data fetching with declarative, cached queries",
    badge: "Data Fetching",
  },
  {
    title: "TanStack Table",
    path: "/showcase/table",
    description: "Headless table engine with sorting, filtering, and pagination built in",
    badge: "Tables",
  },
  {
    title: "TanStack Virtual",
    path: "/showcase/virtual",
    description: "Render 10,000 items at 60fps by only mounting visible DOM nodes",
    badge: "Performance",
  },
  {
    title: "TanStack Form",
    path: "/showcase/form",
    description: "Type-safe form state with field-level validation — no boilerplate",
    badge: "Forms",
  },
  {
    title: "TanStack Store",
    path: "/showcase/store",
    description: "Framework-agnostic reactive state — no providers, no context drilling",
    badge: "State",
  },
  {
    title: "TanStack Pacer",
    path: "/showcase/pacer",
    description: "Debounce, throttle, and rate-limit with one-liner hooks",
    badge: "Utilities",
  },
];

export const Route = createFileRoute("/showcase/")({
  component: ShowcaseIndex,
});

function ShowcaseIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight">
          TanStack Ecosystem Showcase
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Interactive side-by-side comparisons showing why TanStack libraries
          replace common patterns with better abstractions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {showcases.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <span className="mb-3 inline-block rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {item.badge}
            </span>
            <h2 className="mb-1.5 text-lg font-semibold group-hover:text-primary">
              {item.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
