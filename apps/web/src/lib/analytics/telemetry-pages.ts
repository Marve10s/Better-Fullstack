import { locales } from "@/paraglide/runtime.js";

// Only published content paths become page identifiers. Query strings, shared
// stack encodings, and unknown URLs never enter telemetry.
const publishedContent = import.meta.glob("/content/{docs,blog,guides}/**/*.mdx");
const pages = new Map<string, string>([
  ["/", "home"],
  ["/new", "builder"],
  ["/stack", "shared-builder"],
  ["/compare", "compare"],
  ["/templates", "templates"],
  ["/benchmark", "benchmark"],
  ["/mcp", "mcp"],
  ["/run-before-you-clone", "run-before-you-clone"],
  ["/docs", "docs"],
  ["/blog", "blog"],
  ["/guides", "guides"],
]);
for (const file of Object.keys(publishedContent)) {
  const path = file
    .replace(/^\/content/, "")
    .replace(/\.mdx$/, "")
    .replace(/\/index$/, "");
  pages.set(path, path.slice(1).replaceAll("/", ":"));
}

export const TELEMETRY_PAGES: ReadonlySet<string> = new Set([
  ...pages.values(),
  "stack-detail",
  "comparison",
  "shared-stack",
]);

export function telemetryPage(pathname: string, routeId?: string): string | undefined {
  const segments = pathname.split("/").filter(Boolean);
  if (locales.some((locale) => locale === segments[0])) segments.shift();
  const path = `/${segments.join("/")}`;
  const page = pages.get(path);
  if (page) return page;
  if (routeId === "/stack_/$comboSlug") return "stack-detail";
  if (routeId === "/compare_/$slug") return "comparison";
  if (routeId === "/$stackShare") return "shared-stack";
  return undefined;
}
