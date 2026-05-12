import type { Backend, Ecosystem, Search } from "../types";

import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const SEARCH_PROMPT_OPTIONS = [
  {
    value: "meilisearch" as const,
    label: "Meilisearch",
    hint: "Lightning-fast search engine with typo tolerance",
  },
  {
    value: "typesense" as const,
    label: "Typesense",
    hint: "Fast, typo-tolerant search with built-in vector search",
  },
  {
    value: "elasticsearch" as const,
    label: "Elasticsearch",
    hint: "Distributed search and analytics engine with local and cloud deployments",
  },
  {
    value: "algolia" as const,
    label: "Algolia",
    hint: "Hosted search API with instant results, typo tolerance, and analytics",
  },
  {
    value: "none" as const,
    label: "None",
    hint: "Skip search engine setup",
  },
];

const NON_TYPESCRIPT_SEARCH_PROMPT_OPTIONS = SEARCH_PROMPT_OPTIONS.filter(
  (option) => option.value === "meilisearch" || option.value === "none",
);

type SearchPromptContext = {
  search?: Search;
  backend?: Backend;
  ecosystem?: Ecosystem;
};

export function resolveSearchPrompt(
  context: SearchPromptContext = {},
): PromptSingleResolution<Search> {
  const options =
    context.ecosystem && context.ecosystem !== "typescript"
      ? NON_TYPESCRIPT_SEARCH_PROMPT_OPTIONS
      : SEARCH_PROMPT_OPTIONS;

  if (
    (!context.ecosystem || context.ecosystem === "typescript") &&
    (context.backend === "none" || context.backend === "convex")
  ) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  return context.search !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options,
        autoValue: context.search,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options,
        initialValue: "none",
      };
}

export async function getSearchChoice(
  search?: Search,
  backend?: Backend,
  ecosystem?: Ecosystem,
) {
  const resolution = resolveSearchPrompt({ search, backend, ecosystem });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<Search>({
    message: "Select search engine",
    options: resolution.options,
    initialValue: resolution.initialValue as Search,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
