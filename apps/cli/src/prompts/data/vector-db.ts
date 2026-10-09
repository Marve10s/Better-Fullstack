import {
  getVectorDbIncompatibility,
  type Backend,
  type Ecosystem,
  type Runtime,
  type VectorDb,
  type WebDeploy,
} from "@/types";

import { exitCancelled } from "@/presentation/errors";
import type { PromptSingleResolution } from "@/prompts/core/prompt-contract";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";

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
    value: "weaviate" as const,
    label: "Weaviate",
    hint: "Open-source vector database, self-hosted or Weaviate Cloud",
  },
  {
    value: "upstash-vector" as const,
    label: "Upstash Vector",
    hint: "Serverless HTTP vector database, works on edge runtimes",
  },
  {
    value: "turbopuffer" as const,
    label: "turbopuffer",
    hint: "Serverless vector and full-text search on object storage",
  },
  {
    value: "lancedb" as const,
    label: "LanceDB",
    hint: "Embedded vector database stored in local files (Node.js or Bun)",
  },
  {
    value: "none" as const,
    label: "None",
    hint: "Skip vector database setup",
  },
];

type VectorDbPromptStack = {
  backend?: Backend;
  ecosystem?: Ecosystem;
  runtime?: Runtime;
  webDeploy?: WebDeploy;
};

type VectorDbPromptContext = VectorDbPromptStack & {
  vectorDb?: VectorDb;
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

  const options = VECTOR_DB_PROMPT_OPTIONS.filter(
    (option) => !getVectorDbIncompatibility(option.value, context, { partial: true }),
  );

  return context.vectorDb !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options,
        autoValue: context.vectorDb,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options,
        initialValue: "none",
      };
}

export async function getVectorDbChoice(vectorDb?: VectorDb, stack: VectorDbPromptStack = {}) {
  const resolution = resolveVectorDbPrompt({ vectorDb, ...stack });
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
