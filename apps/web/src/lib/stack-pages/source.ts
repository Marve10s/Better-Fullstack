import { GENERATED_STACK_PAGES } from "./generated";
import type { GeneratedStackPage, StackPageSummary } from "./types";

const stackPagesBySlug = new Map<string, GeneratedStackPage>(
  GENERATED_STACK_PAGES.map((page) => [page.slug, page as GeneratedStackPage]),
);

export function getStackPage(slug: string): GeneratedStackPage | undefined {
  const page = stackPagesBySlug.get(slug);
  return page?.status === "published" ? page : undefined;
}

export function getPublishedStackPages(): GeneratedStackPage[] {
  return GENERATED_STACK_PAGES.filter(
    (page) => page.status === "published",
  ) as unknown as GeneratedStackPage[];
}

export function getPublishedStackPageSummaries(): StackPageSummary[] {
  return getPublishedStackPages().map(
    ({ slug, status, title, description, ecosystem, updated }) => ({
      slug,
      status,
      title,
      description,
      ecosystem,
      updated,
    }),
  );
}

export function getRelatedStackPages(page: GeneratedStackPage): GeneratedStackPage[] {
  return page.relatedSlugs.flatMap((slug) => {
    const related = getStackPage(slug);
    return related ? [related] : [];
  });
}
