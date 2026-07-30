import type { GeneratedStackPage } from "@/lib/stack-pages/types";
import { getRelatedStackPages } from "@/lib/stack-pages/source";

const SHAPE_COPY: Record<GeneratedStackPage["architecture"]["shape"], string> = {
  "single-app": "one frontend framework owns the UI and server boundary",
  "split-app": "the frontend and backend are generated as separate primary parts",
  "backend-service": "the generated project is centered on a backend service",
  "rust-fullstack": "Rust owns both the browser frontend and backend",
};

const CHOOSE_COPY: Record<GeneratedStackPage["architecture"]["shape"], string> = {
  "single-app":
    "Choose this shape when one framework should own the UI, server routes, and application boundary.",
  "split-app":
    "Choose this shape when the browser frontend and API server should remain separate generated parts.",
  "backend-service":
    "Choose this shape when the generated project should expose backend functionality without a browser frontend.",
  "rust-fullstack":
    "Choose this shape when both the browser frontend and server should be represented by Rust stack parts.",
};

function StackSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-5 border-border/70 border-t py-10 lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-10">
      <div>
        <p className="font-mono text-[0.68rem] text-muted-foreground uppercase tracking-[0.22em]">
          {number}
        </p>
        <h2 className="mt-2 font-mono font-bold text-xl sm:text-2xl">{title}</h2>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export function StackCombinationPage({ page }: { page: GeneratedStackPage }) {
  const relatedPages = getRelatedStackPages(page);
  const selectedLabels = page.canonicalParts
    .filter((part) => part.id !== "none")
    .map((part) => part.label);
  const directAnswer = `${new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(selectedLabels.slice(0, 6))} form a ${page.architecture.shape.replaceAll("-", " ")} configuration where ${SHAPE_COPY[page.architecture.shape]}. Better Fullstack can scaffold this exact compatibility-checked selection.`;

  return (
    <main className="relative overflow-hidden border-border border-t bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] opacity-45 [background-image:linear-gradient(to_right,color-mix(in_oklab,var(--border)_45%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--border)_45%,transparent)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />

      <article className="relative mx-auto w-full max-w-[86rem] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <header className="grid gap-10 pb-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
          <div className="max-w-4xl">
            <a
              href="/templates"
              className="font-mono text-[0.7rem] text-muted-foreground uppercase tracking-[0.2em] hover:text-foreground"
            >
              Templates / {page.ecosystem}
            </a>
            <h1 className="mt-6 text-balance font-mono font-bold text-2xl tracking-tight sm:text-4xl">
              {page.title}
            </h1>
            <p className="mt-7 max-w-3xl text-pretty text-base text-muted-foreground leading-7 sm:text-lg">
              {directAnswer}
            </p>
          </div>

          <aside className="rounded-lg border border-border bg-muted/30 px-5 py-4">
            <p className="font-mono text-[0.68rem] text-muted-foreground uppercase tracking-[0.18em]">
              Generation record
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-xs">
              <div>
                <dt className="text-muted-foreground">Files</dt>
                <dd className="mt-1 text-lg text-foreground">{page.output.fileCount}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Directories</dt>
                <dd className="mt-1 text-lg text-foreground">{page.output.directoryCount}</dd>
              </div>
              <div className="col-span-2 border-border/70 border-t pt-3">
                <dt className="text-muted-foreground">Compatibility source</dt>
                <dd className="mt-1 text-foreground">
                  @better-fullstack/types {page.compatibility.typesPackageVersion}
                </dd>
              </div>
            </dl>
          </aside>
        </header>

        <StackSection number="01 / selection" title="Stack at a glance">
          <div className="overflow-x-auto border border-border/80">
            <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
              <thead className="bg-muted/40 font-mono text-[0.68rem] text-muted-foreground uppercase tracking-[0.14em]">
                <tr>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Technology</th>
                  <th className="px-4 py-3 font-medium">Repository description</th>
                  <th className="px-4 py-3 font-medium">Scope</th>
                </tr>
              </thead>
              <tbody>
                {page.canonicalParts.map((part) => (
                  <tr key={`${part.category}:${part.id}`} className="border-border/70 border-t">
                    <td className="px-4 py-4 font-mono text-xs text-muted-foreground">
                      {part.role}
                    </td>
                    <td className="px-4 py-4 font-medium">{part.label}</td>
                    <td className="max-w-md px-4 py-4 text-muted-foreground leading-6">
                      {part.description ?? "No repository-owned description is available."}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground">{part.ownership}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </StackSection>

        <StackSection number="02 / architecture" title="How the pieces fit">
          <ul className="grid gap-3 sm:grid-cols-2">
            {page.architecture.facts.map((fact) => (
              <li key={fact} className="border-border/70 border-l px-4 py-2 text-sm leading-6">
                {fact}
              </li>
            ))}
          </ul>
        </StackSection>

        <StackSection number="03 / output" title="What gets generated">
          <p className="text-muted-foreground leading-7">
            The virtual generator produced {page.output.fileCount} files across{" "}
            {page.output.directoryCount} directories. The output is a{" "}
            {page.output.layout === "workspace" ? "workspace" : "single-directory project"}.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-[0.16em]">
                Top-level entries
              </h3>
              <ul className="mt-3 divide-y divide-border/60 border-y border-border/60 font-mono text-sm">
                {page.output.topLevelEntries.map((entry) => (
                  <li key={entry} className="py-2.5">
                    ./<span className="text-foreground">{entry}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-[0.16em]">
                Representative files
              </h3>
              <ul className="mt-3 divide-y divide-border/60 border-y border-border/60 font-mono text-sm">
                {page.output.representativeFiles.map((file) => (
                  <li key={file} className="overflow-hidden text-ellipsis py-2.5 whitespace-nowrap">
                    {file}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </StackSection>

        <StackSection number="04 / create" title="Create command">
          <p className="mb-4 text-sm text-muted-foreground">
            This is the canonical Bun command generated for the selection.
          </p>
          <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-5 text-foreground">
            <code className="font-mono text-sm leading-7">{page.command}</code>
          </pre>
        </StackSection>

        <StackSection number="05 / builder" title="Open in the builder">
          <a
            href={page.builderUrl}
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 font-medium text-background text-sm transition-colors hover:bg-foreground/90"
          >
            Open this exact selection →
          </a>
          <dl className="mt-6 flex flex-wrap gap-2">
            {page.meaningfulParameters.map((parameter) => (
              <div
                key={parameter.key}
                className="flex border border-border/80 bg-muted/30 font-mono text-xs"
              >
                <dt className="border-border/80 border-r px-2.5 py-2 text-muted-foreground">
                  {parameter.key}
                </dt>
                <dd className="px-2.5 py-2">{parameter.value}</dd>
              </div>
            ))}
          </dl>
        </StackSection>

        <StackSection number="06 / checks" title="Compatibility notes">
          <div className="border-emerald-500/40 border-l-2 bg-emerald-500/[0.05] px-5 py-4">
            <p className="font-medium">
              Compatibility checked against Better Fullstack types version{" "}
              {page.compatibility.typesPackageVersion}.
            </p>
            <p className="mt-2 text-muted-foreground text-sm leading-6">
              The generated record has {page.compatibility.graphIssueCount} graph issues and{" "}
              {page.compatibility.selectedOptionIssueCount} disabled selected options. This is a
              compatibility check, not a claim that this exact scaffold received a runtime smoke
              verification.
            </p>
          </div>
          {page.compatibility.constraints.length ? (
            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-muted-foreground leading-6">
              {page.compatibility.constraints.map((constraint) => (
                <li key={constraint}>{constraint}</li>
              ))}
            </ul>
          ) : null}
        </StackSection>

        <StackSection number="07 / fit" title="When to choose this shape">
          <p className="max-w-3xl text-muted-foreground leading-7">
            {CHOOSE_COPY[page.architecture.shape]}
          </p>
        </StackSection>

        <StackSection number="08 / next" title="Related stacks and guide">
          <nav aria-label="Related stack templates" className="grid gap-3 md:grid-cols-3">
            {relatedPages.map((related) => (
              <a
                key={related.slug}
                href={`/stack/${related.slug}`}
                className="group rounded-lg border border-border/80 p-4 transition-colors hover:bg-muted/30"
              >
                <span className="font-mono text-[0.65rem] text-muted-foreground uppercase tracking-[0.16em]">
                  Alternative
                </span>
                <span className="mt-2 block font-medium leading-6 group-hover:text-foreground">
                  {related.title}
                </span>
              </a>
            ))}
          </nav>
          {page.guideUrl ? (
            <p className="mt-6 text-sm text-muted-foreground">
              Need a walkthrough?{" "}
              <a href={page.guideUrl} className="underline hover:text-foreground">
                Read the related stack guide.
              </a>
            </p>
          ) : null}
        </StackSection>

        <StackSection number="09 / faq" title="Questions">
          <div className="divide-y divide-border/70 border-y border-border/70">
            <details className="group py-5" open>
              <summary className="cursor-pointer list-none font-medium">
                Is this combination supported?
              </summary>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground leading-6">
                It passes the repository's compatibility analysis, selected-option checks, stack
                graph validation, project schema parsing, and virtual generation. That result is
                described here as compatibility checked.
              </p>
            </details>
            <details className="group py-5">
              <summary className="cursor-pointer list-none font-medium">
                Does it generate one app or separate parts?
              </summary>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground leading-6">
                {SHAPE_COPY[page.architecture.shape][0].toUpperCase() +
                  SHAPE_COPY[page.architecture.shape].slice(1)}
                . The actual generated output uses a {page.output.layout} layout.
              </p>
            </details>
            <details className="group py-5">
              <summary className="cursor-pointer list-none font-medium">
                How can I customize the selection?
              </summary>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground leading-6">
                Open the generated builder link above. Its query parameters reproduce this
                selection, and the builder can change compatible options before generating a new
                command.
              </p>
            </details>
          </div>
        </StackSection>
      </article>
    </main>
  );
}
