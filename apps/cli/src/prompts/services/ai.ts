import type { AI, Backend } from "@/types";

import { exitCancelled } from "@/presentation/errors";
import {
  createStaticSinglePromptResolution,
  type PromptOption,
} from "@/prompts/core/prompt-contract";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";

const AI_PROMPT_OPTIONS: PromptOption<AI>[] = [
  {
    value: "vercel-ai",
    label: "Vercel AI SDK",
    hint: "The AI Toolkit for TypeScript - supports OpenAI, Anthropic, Google, etc.",
  },
  {
    value: "mastra",
    label: "Mastra",
    hint: "TypeScript-native AI agent framework with workflows",
  },
  {
    value: "voltagent",
    label: "VoltAgent",
    hint: "AI Agent framework with memory, workflows, and observability",
  },
  {
    value: "langgraph",
    label: "LangGraph.js",
    hint: "Graph-based agent orchestration with stateful workflows",
  },
  {
    value: "openai-agents",
    label: "OpenAI Agents SDK",
    hint: "Official multi-agent framework with handoffs and guardrails",
  },
  {
    value: "openai-sdk",
    label: "OpenAI SDK",
    hint: "Official OpenAI JavaScript and TypeScript client",
  },
  {
    value: "anthropic-sdk",
    label: "Anthropic SDK",
    hint: "Official Anthropic TypeScript client for Claude",
  },
  {
    value: "google-adk",
    label: "Google ADK",
    hint: "Code-first agent development kit for building AI agents",
  },
  {
    value: "modelfusion",
    label: "ModelFusion",
    hint: "Type-safe AI library for multi-provider text generation",
  },
  {
    value: "langchain",
    label: "LangChain",
    hint: "Build context-aware reasoning applications",
  },
  {
    value: "llamaindex",
    label: "LlamaIndex",
    hint: "Data framework for LLM applications",
  },
  {
    value: "tanstack-ai",
    label: "TanStack AI",
    hint: "Unified LLM interface for AI-powered apps (Alpha)",
  },
  {
    value: "ai-cli",
    label: "AI CLI",
    hint: "Agent-native terminal CLI for generating text, images, and video",
  },
  {
    value: "none",
    label: "None",
    hint: "No AI SDK",
  },
];

type AIPromptContext = {
  ai?: AI;
  backend?: Backend;
};

export function resolveAIPrompt(context: AIPromptContext = {}) {
  const options = ["none", "convex"].includes(context.backend ?? "")
    ? AI_PROMPT_OPTIONS.filter(
        (option) => option.value !== "openai-sdk" && option.value !== "anthropic-sdk",
      )
    : AI_PROMPT_OPTIONS;
  return createStaticSinglePromptResolution(options, "none", context.ai);
}

export async function getAIChoice(ai?: AI, backend?: Backend) {
  const resolution = resolveAIPrompt({ ai, backend });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<AI>({
    message: "Select AI SDK",
    options: resolution.options,
    initialValue: resolution.initialValue as AI,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
