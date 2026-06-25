import type { Backend, Ecosystem, VectorDb } from "../types";

import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const VECTOR_DB_PROMPT_OPTIONS = [
  {
    value: "pgvector" as const,
    label: "pgvector",
    hint: "Self-hosted Postgres + pgvector extension for embeddings",
  },
  {
    value: "qdrant" as const,
    label: "Qdrant",
    hint: "High-performance open-source vector database",
  },
  {
    value: "chroma" as const,
    label: "Chroma",
    hint: "Lightweight open-source embedding database",
  },
  {
    value: "pinecone" as const,
    label: "Pinecone",
    hint: "Fully managed serverless vector database",
  },
  {
    value: "none" as const,
    label: "None",
    hint: "Skip vector database setup",
  },
];

type VectorDbPromptContext = {
  vectorDb?: VectorDb;
  backend?: Backend;
  ecosystem?: Ecosystem;
};

/**
 * Vector DB is a TypeScript-ecosystem feature backed by a standalone server.
 * Every provider (including pgvector via a dedicated Postgres instance) is a
 * separate service, so there is no dependency on the primary database choice.
 */
export function resolveVectorDbPrompt(
  context: VectorDbPromptContext = {},
): PromptSingleResolution<VectorDb> {
  const skip = (): PromptSingleResolution<VectorDb> => ({
    shouldPrompt: false,
    mode: "single",
    options: [],
    autoValue: "none",
  });

  // TypeScript ecosystem only.
  if (context.ecosystem && context.ecosystem !== "typescript") {
    return skip();
  }

  // Needs a standalone backend (Convex has built-in vector search).
  if (context.backend === "none" || context.backend === "convex") {
    return skip();
  }

  return context.vectorDb !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options: VECTOR_DB_PROMPT_OPTIONS,
        autoValue: context.vectorDb,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options: VECTOR_DB_PROMPT_OPTIONS,
        initialValue: "none",
      };
}

export async function getVectorDbChoice(
  vectorDb?: VectorDb,
  backend?: Backend,
  ecosystem?: Ecosystem,
) {
  const resolution = resolveVectorDbPrompt({ vectorDb, backend, ecosystem });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<VectorDb>({
    message: "Select vector database",
    options: resolution.options,
    initialValue: resolution.initialValue as VectorDb,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
