import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { TbArrowRight as ArrowRight } from "react-icons/tb";

import Footer from "@/components/home/footer";
import {
  getCompetitorComparison,
  competitorComparisonHead,
  type CompetitorComparison,
} from "@/lib/builder/compare-tools";

export const Route = createFileRoute("/compare_/$slug")({
  loader: ({ params }) => {
    const comparison = getCompetitorComparison(params.slug);
    if (!comparison) throw notFound();
    return { slug: comparison.slug };
  },
  head: ({ loaderData }) => {
    const comparison = loaderData ? getCompetitorComparison(loaderData.slug) : undefined;
    return comparison ? competitorComparisonHead(comparison) : {};
  },
  component: CompetitorComparisonPage,
});

function CompetitorComparisonPage() {
  const { slug } = Route.useLoaderData();
  const comparison = getCompetitorComparison(slug);
  if (!comparison) throw notFound();
  return <ComparisonContent comparison={comparison} />;
}

function ComparisonContent({ comparison }: { comparison: CompetitorComparison }) {
  return (
    <main className="min-h-svh">
      <div className="mx-auto max-w-5xl border-x border-border">
        {/* Hero */}
        <div className="border-b border-border px-4 pt-12 pb-8 sm:pt-16">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              <Link to="/compare" className="hover:underline">
                Compare
              </Link>
            </p>
            <h1 className="mt-2 font-mono text-2xl font-bold tracking-tight sm:text-4xl">
              {comparison.heading}
            </h1>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground sm:text-base">
              {comparison.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground/70">
              Facts about {comparison.competitorName} checked against{" "}
              <a
                href={comparison.competitorRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                its public repository
              </a>{" "}
              and{" "}
              <a
                href={comparison.competitorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                documentation
              </a>{" "}
              on {comparison.factsCheckedOn}.
            </p>
          </div>
        </div>

        {/* At-a-glance table */}
        <div className="border-b border-border">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    At a glance
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">
                    Better Fullstack
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    {comparison.competitorName}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.dimension} className="border-t border-border/50 hover:bg-muted/30">
                    <td className="px-4 py-2.5 font-medium text-foreground">{row.dimension}</td>
                    <td className="px-4 py-2.5 text-foreground">{row.betterFullstack}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Prose sections */}
        <div className="border-b border-border px-4 py-10">
          <div className="mx-auto max-w-3xl space-y-8">
            {comparison.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-mono text-lg font-bold sm:text-xl">{section.heading}</h2>
                <div className="mt-3 space-y-3 text-sm text-muted-foreground sm:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="border-b border-border px-4 py-10">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-mono text-lg font-bold sm:text-xl">Frequently asked questions</h2>
            <div className="mt-4 space-y-6">
              {comparison.faqs.map((faq) => (
                <section key={faq.question}>
                  <h3 className="text-sm font-semibold text-foreground sm:text-base">
                    {faq.question}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">{faq.answer}</p>
                </section>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border-b border-border px-4 py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-mono text-xl font-bold sm:text-2xl">Try it in the builder</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Configure any stack visually and get a ready-to-run command - every combination is
              compatibility-checked.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/new"
                search={{ view: "command", file: "" }}
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Open the builder
                <ArrowRight className="h-4 w-4" />
              </Link>
              <code className="rounded-lg border border-border bg-muted px-4 py-2 text-xs sm:text-sm">
                bun create better-fullstack@latest
              </code>
            </div>
            <p className="mt-6 text-xs text-muted-foreground/70">
              See how Better Fullstack compares to other tools on the{" "}
              <Link to="/compare" className="underline hover:text-foreground">
                full comparison page
              </Link>
              .
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
