import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, Download, ExternalLink, Github, Package } from "lucide-react";
import { useState } from "react";

import Footer from "@/components/home/footer";
import { ECOSYSTEM_COUNT_LABEL, ECOSYSTEM_NAMES, OPTION_COUNT_LABEL } from "@/lib/project-stats";
import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_ROBOTS,
  canonicalUrl,
} from "@/lib/seo";
import { cn } from "@/lib/utils";

const SHORT_DESCRIPTION = `Better Fullstack is an open-source visual builder and CLI that turns stack choices into preconfigured, compatibility-aware fullstack starters across ${ECOSYSTEM_COUNT_LABEL} language ecosystems.`;

const BOILERPLATE = `Better Fullstack is an open-source visual builder, CLI, and MCP server for scaffolding fullstack projects without hand-wiring the stack. Developers choose from ${OPTION_COUNT_LABEL} configurable options across ${ECOSYSTEM_NAMES.join(", ")}, including frontend frameworks, backends, databases, authentication, payments, AI, and deployment. Compatibility rules filter invalid combinations, while verified reference stacks are tested end to end. Better Fullstack is MIT licensed and can be used interactively in the browser, from the terminal, or through coding agents.`;

const ASSETS = [
  {
    title: "Builder launch card",
    description: "1200 × 630 · social posts, launch pages, and community submissions",
    href: "/press/better-fullstack-builder-card.svg",
    format: "SVG",
  },
  {
    title: "Agent workflow card",
    description: "1200 × 630 · MCP, AI-agent, and benchmark announcements",
    href: "/press/better-fullstack-agent-card.svg",
    format: "SVG",
  },
  {
    title: "Dark wordmark",
    description: "1600 × 400 · articles, presentations, and sponsor listings",
    href: "/press/better-fullstack-wordmark-dark.svg",
    format: "SVG",
  },
  {
    title: "Builder social preview",
    description: "1200 × 630 · general-purpose raster preview",
    href: "/press/better-fullstack-builder-card.png",
    format: "PNG",
  },
] as const;

export const Route = createFileRoute("/press")({
  head: () => {
    const title = "Press Kit | Better Fullstack";
    const description =
      "Official Better Fullstack descriptions, project facts, brand assets, and launch-ready social previews.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: DEFAULT_ROBOTS },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl("/press") },
        { property: "og:image", content: DEFAULT_OG_IMAGE_URL },
        { property: "og:image:alt", content: DEFAULT_OG_IMAGE_ALT },
        { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
        { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: DEFAULT_OG_IMAGE_URL },
      ],
      links: [{ rel: "canonical", href: canonicalUrl("/press") }],
    };
  },
  component: PressPage,
});

function CopyButton({ label, text, source }: { label: string; text: string; source: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be unavailable in embedded browsers.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      data-analytics-event="press_copy_copied"
      data-analytics-source={source}
      className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
    >
      {copied ? <Check className="size-3.5 text-brand" /> : <Copy className="size-3.5" />}
      {copied ? "Copied" : label}
    </button>
  );
}

function PressPage() {
  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto max-w-[1480px] border-x border-border">
        <section className="relative overflow-hidden border-b border-border px-4 pb-16 pt-24 sm:px-8 sm:pb-24 sm:pt-32">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgba(242,238,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(242,238,238,0.04) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div className="relative grid grid-cols-12 gap-x-6 gap-y-12">
            <div className="col-span-12 lg:col-span-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink dark:text-brand">
                ✦ press room / field notes
              </p>
              <h1
                className="mt-5 max-w-[13ch] text-balance font-mono font-bold leading-[0.9] tracking-[-0.055em]"
                style={{ fontSize: "clamp(3.25rem, 10vw, 8rem)" }}
              >
                The stack,
                <br />
                <span className="italic text-muted-foreground">on the record.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-pretty text-base text-muted-foreground sm:text-xl">
                Official copy, facts, and launch-ready assets for writing about Better Fullstack.
                Everything here is reusable with attribution.
              </p>
            </div>

            <aside className="col-span-12 self-end border-l-2 border-brand pl-5 lg:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                preferred one-liner
              </p>
              <p className="mt-3 text-balance text-2xl font-semibold tracking-[-0.025em]">
                Pick your stack. Get the wiring.
              </p>
              <div className="mt-5">
                <CopyButton
                  label="Copy line"
                  text="Pick your stack. Get the wiring."
                  source="press_tagline"
                />
              </div>
            </aside>
          </div>
        </section>

        <section className="grid grid-cols-2 border-b border-border md:grid-cols-4">
          {[
            [OPTION_COUNT_LABEL, "configurable options"],
            [ECOSYSTEM_COUNT_LABEL, "language ecosystems"],
            ["MIT", "open-source license"],
            ["CLI · WEB · MCP", "three ways to build"],
          ].map(([value, label], index) => (
            <div
              key={label}
              className={cn(
                "min-h-36 p-5 sm:p-7",
                index > 0 && "border-l border-border",
                index === 2 && "border-l-0 border-t border-border md:border-l md:border-t-0",
                index === 3 && "border-t border-border md:border-t-0",
              )}
            >
              <p className="font-mono text-2xl font-bold tracking-[-0.04em] sm:text-4xl">{value}</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.17em] text-muted-foreground sm:text-[11px]">
                {label}
              </p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-12 border-b border-border">
          <div className="col-span-12 border-b border-border p-5 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink dark:text-brand">
              01 / approved copy
            </p>
            <h2 className="mt-4 max-w-[12ch] text-balance font-mono text-4xl font-bold tracking-[-0.045em] sm:text-5xl">
              Say what it does. Precisely.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Use “compatibility-aware” for the full surface. Reserve “verified” for reference
              stacks that pass the published validation gates.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <article className="border-b border-border p-5 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  short / 25 words
                </p>
                <CopyButton label="Copy short" text={SHORT_DESCRIPTION} source="press_short" />
              </div>
              <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed sm:text-2xl">
                {SHORT_DESCRIPTION}
              </p>
            </article>
            <article className="p-5 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  boilerplate / 80 words
                </p>
                <CopyButton
                  label="Copy boilerplate"
                  text={BOILERPLATE}
                  source="press_boilerplate"
                />
              </div>
              <p className="mt-6 max-w-4xl text-pretty leading-7 text-muted-foreground">
                {BOILERPLATE}
              </p>
            </article>
          </div>
        </section>

        <section className="border-b border-border px-4 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink dark:text-brand">
                02 / launch assets
              </p>
              <h2 className="mt-4 text-balance font-mono text-4xl font-bold tracking-[-0.045em] sm:text-6xl">
                Ready for the feed.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Dark, technical, and legible at social-card size. Do not stretch, recolor, or place
              the artwork over another background.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {ASSETS.map((asset) => (
              <article
                key={asset.href}
                className="overflow-hidden rounded-xl border border-border bg-muted/20"
              >
                <a
                  href={asset.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block border-b border-border bg-[#0c0c0e]"
                >
                  <img
                    src={asset.href}
                    alt={`${asset.title} preview`}
                    className="aspect-[1200/630] w-full object-contain"
                    loading="lazy"
                  />
                </a>
                <div className="flex flex-wrap items-center justify-between gap-4 p-5">
                  <div>
                    <h3 className="font-semibold">{asset.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{asset.description}</p>
                  </div>
                  <a
                    href={asset.href}
                    download
                    data-analytics-event="press_asset_downloaded"
                    data-analytics-source="press_assets"
                    data-analytics-target={asset.title}
                    data-analytics-format={asset.format.toLowerCase()}
                    className="inline-flex items-center gap-2 rounded-md bg-foreground px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-background transition-opacity hover:opacity-80"
                  >
                    <Download className="size-3.5" />
                    {asset.format}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-12 border-b border-border">
          <div className="col-span-12 border-b border-border p-5 sm:p-8 md:col-span-6 md:border-b-0 md:border-r">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink dark:text-brand">
              03 / project facts
            </p>
            <dl className="mt-8 divide-y divide-border border-y border-border">
              {[
                ["Project", "Better Fullstack"],
                ["Creator", "Ibrahim Elkamali"],
                ["Category", "Open-source developer tooling"],
                ["Interfaces", "Visual builder, CLI, MCP server, agent skill"],
                ["License", "MIT"],
                ["Canonical URL", "better-fullstack.dev"],
              ].map(([term, detail]) => (
                <div key={term} className="grid grid-cols-[8rem_1fr] gap-4 py-4 text-sm">
                  <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {term}
                  </dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="col-span-12 p-5 sm:p-8 md:col-span-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink dark:text-brand">
              04 / primary links
            </p>
            <div className="mt-8 grid gap-3">
              <a
                href="https://github.com/Marve10s/Better-Fullstack"
                target="_blank"
                rel="noreferrer"
                data-analytics-event="github_opened"
                data-analytics-source="press_links"
                className="group flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <span className="flex items-center gap-3">
                  <Github className="size-5" /> GitHub repository
                </span>
                <ExternalLink className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://www.npmjs.com/package/create-better-fullstack"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <span className="flex items-center gap-3">
                  <Package className="size-5" /> npm package
                </span>
                <ExternalLink className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://better-fullstack.dev/new"
                data-analytics-event="builder_opened"
                data-analytics-source="press_links"
                className="group flex items-center justify-between rounded-lg border border-brand/50 bg-brand/5 p-4 transition-colors hover:bg-brand/10"
              >
                <span>Open the visual builder</span>
                <ExternalLink className="size-4 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
