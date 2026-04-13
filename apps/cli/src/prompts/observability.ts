import type { Backend, Observability } from "../types";

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

type ObservabilityPromptContext = {
  observability?: Observability;
  backend?: Backend;
};

export function resolveObservabilityPrompt(
  context: ObservabilityPromptContext = {},
): PromptSingleResolution<Observability> {
  if (context.backend === "none" || context.backend === "convex") {
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
        options: OBSERVABILITY_PROMPT_OPTIONS,
        autoValue: context.observability,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options: OBSERVABILITY_PROMPT_OPTIONS,
        initialValue: "none",
      };
}

export async function getObservabilityChoice(observability?: Observability, backend?: Backend) {
  const resolution = resolveObservabilityPrompt({ observability, backend });
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
