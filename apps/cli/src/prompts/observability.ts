import type { Backend, Ecosystem, Observability } from "../types";

import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const OBSERVABILITY_PROMPT_OPTIONS = [
  {
    value: "opentelemetry" as const,
    label: "OpenTelemetry",
    hint: "Observability framework for traces, metrics, and logs",
  },
  {
    value: "sentry" as const,
    label: "Sentry",
    hint: "Error tracking and performance monitoring",
  },
  {
    value: "grafana" as const,
    label: "Grafana",
    hint: "Prometheus metrics for Grafana dashboards and alerting",
  },
  {
    value: "none" as const,
    label: "None",
    hint: "Skip observability/tracing setup",
  },
];

const NON_TYPESCRIPT_OBSERVABILITY_PROMPT_OPTIONS = OBSERVABILITY_PROMPT_OPTIONS.filter(
  (option) => option.value === "sentry" || option.value === "none",
);

type ObservabilityPromptContext = {
  observability?: Observability;
  backend?: Backend;
  ecosystem?: Ecosystem;
};

export function resolveObservabilityPrompt(
  context: ObservabilityPromptContext = {},
): PromptSingleResolution<Observability> {
  const options =
    context.ecosystem && context.ecosystem !== "typescript"
      ? NON_TYPESCRIPT_OBSERVABILITY_PROMPT_OPTIONS
      : OBSERVABILITY_PROMPT_OPTIONS;

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

  return context.observability !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options,
        autoValue: context.observability,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options,
        initialValue: "none",
      };
}

export async function getObservabilityChoice(
  observability?: Observability,
  backend?: Backend,
  ecosystem?: Ecosystem,
) {
  const resolution = resolveObservabilityPrompt({ observability, backend, ecosystem });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<Observability>({
    message: "Select observability solution",
    options: resolution.options,
    initialValue: resolution.initialValue as Observability,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
