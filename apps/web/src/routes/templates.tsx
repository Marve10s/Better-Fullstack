import { createFileRoute } from "@tanstack/react-router";

import Footer from "@/components/home/footer";
import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_ROBOTS,
  SITE_NAME,
  SITE_URL,
  canonicalUrl,
} from "@/lib/seo";
import { getPublishedStackPages } from "@/lib/stack-pages/source";
import type { GeneratedStackPage } from "@/lib/stack-pages/types";

const TEMPLATE_IMAGE = canonicalUrl("/search-media/stack-decisions-1200x630.png");
const ECOSYSTEM_ORDER = ["typescript", "python", "go", "rust"] as const;
const ECOSYSTEM_LABELS: Record<string, string> = {
  typescript: "TypeScript",
  python: "Python",
  go: "Go",
  rust: "Rust",
};

function templateIndexJsonLd(pages: GeneratedStackPage[]) {
  const url = canonicalUrl("/templates");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Fullstack Starter Templates",
        description:
          "Compatibility-checked starter templates generated from Better Fullstack's canonical stack schema.",
        url,
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: pages.length,
          itemListElement: pages.map((page, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: page.title,
            url: canonicalUrl(`/stack/${page.slug}`),
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Templates", item: url },
        ],
      },
    ],
  };
}

export const Route = createFileRoute("/templates")({
  head: () => {
    const title = `Fullstack Starter Templates | ${SITE_NAME}`;
    const description =
      "Browse compatibility-checked fullstack starter templates for TanStack Start, Next.js, Hono, FastAPI, Go, Rust, databases, ORMs, auth, and API layers.";
    const url = canonicalUrl("/templates");
    const pages = getPublishedStackPages();

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: DEFAULT_ROBOTS },
        {
          name: "keywords",
          content:
            "fullstack starter templates, tanstack start starter, nextjs starter, hono starter, fastapi starter",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: TEMPLATE_IMAGE },
        { property: "og:image:alt", content: DEFAULT_OG_IMAGE_ALT },
        { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
        { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: TEMPLATE_IMAGE },
        { "script:ld+json": templateIndexJsonLd(pages) },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: TemplatesPage,
});

function TemplateCard({ page, ordinal }: { page: GeneratedStackPage; ordinal: number }) {
  const technologies = page.canonicalParts
    .filter((part) => part.id !== "none")
    .slice(0, 5)
    .map((part) => part.label);

  return (
    <a
      href={`/stack/${page.slug}`}
      className="group grid min-h-56 content-between border-border/80 border-t px-1 py-6 transition-colors hover:border-foreground/50 sm:px-5"
    >
      <div>
        <div className="flex items-center justify-between gap-4 font-mono text-[0.66rem] uppercase tracking-[0.18em]">
          <span className="text-muted-foreground">Template {String(ordinal).padStart(2, "0")}</span>
          <span className="text-muted-foreground transition-colors group-hover:text-foreground">
            {page.output.layout === "workspace" ? "Workspace" : "Single project"}
          </span>
        </div>
        <h3 className="mt-5 max-w-xl text-balance font-mono font-bold text-lg leading-7 tracking-tight sm:text-xl">
          {page.title}
        </h3>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground leading-6">
          {page.description}
        </p>
      </div>
      <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
        <ul className="flex flex-wrap gap-1.5" aria-label="Included technologies">
          {technologies.map((technology) => (
            <li key={technology} className="border border-border/80 px-2 py-1 font-mono text-[0.68rem]">
              {technology}
            </li>
          ))}
        </ul>
        <span className="font-mono text-xs text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground">
          Inspect output →
        </span>
      </div>
    </a>
  );
}

function TemplatesPage() {
  const pages = getPublishedStackPages().sort(
    (left, right) => right.priority - left.priority || left.title.localeCompare(right.title),
  );

  return (
    <>
      <main className="relative overflow-hidden border-border border-t bg-background text-foreground">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] opacity-45 [background-image:linear-gradient(to_right,color-mix(in_oklab,var(--border)_45%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--border)_45%,transparent)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />

        <div className="relative mx-auto w-full max-w-[86rem] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <header className="grid gap-10 border-border/70 border-b pb-14 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
            <div className="max-w-4xl">
              <p className="font-mono text-[0.7rem] text-muted-foreground uppercase tracking-[0.22em]">
                Generated catalog / {pages.length} verified selections
              </p>
              <h1 className="mt-6 text-balance font-mono font-bold text-4xl tracking-[-0.04em] sm:text-6xl">
                Fullstack starter templates, with the wiring exposed.
              </h1>
            </div>
            <div className="border-border border-l pl-5 text-sm text-muted-foreground leading-7">
              <p>
                Every page below is produced from a real generator selection. It records the exact
                command, generated file shape, compatibility result, and a link back to the builder.
              </p>
              <a href="/new" className="mt-5 inline-block font-mono text-foreground underline underline-offset-4">
                Build a custom stack →
              </a>
            </div>
          </header>

          {ECOSYSTEM_ORDER.map((ecosystem) => {
            const ecosystemPages = pages.filter((page) => page.ecosystem === ecosystem);
            if (!ecosystemPages.length) return null;

            return (
              <section key={ecosystem} className="grid gap-8 py-14 lg:grid-cols-[13rem_minmax(0,1fr)]">
                <div>
                  <p className="font-mono text-[0.68rem] text-muted-foreground uppercase tracking-[0.2em]">
                    Ecosystem
                  </p>
                  <h2 className="mt-2 font-mono font-bold text-2xl">
                    {ECOSYSTEM_LABELS[ecosystem] ?? ecosystem}
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">{ecosystemPages.length} templates</p>
                </div>
                <div className="grid md:grid-cols-2">
                  {ecosystemPages.map((page, index) => (
                    <TemplateCard key={page.slug} page={page} ordinal={index + 1} />
                  ))}
                </div>
              </section>
            );
          })}

          <section className="border-border border-t py-12 text-center">
            <h2 className="font-mono font-bold text-2xl">Need the decision context?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-7">
              The guides explain implementation details. The blog compares architectural choices.
              The builder turns the final selection into a reproducible command.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href="/guides" className="border border-border px-4 py-2 font-mono text-sm hover:bg-muted/40">
                Read guides
              </a>
              <a href="/blog" className="border border-border px-4 py-2 font-mono text-sm hover:bg-muted/40">
                Compare choices
              </a>
              <a href="/new" className="bg-foreground px-4 py-2 font-mono text-background text-sm hover:bg-foreground/90">
                Open builder
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
