import type { Ecosystem } from "../types";

import { exitCancelled } from "../utils/errors";
import { isCancel, navigableSelect } from "./navigable";

export const ECOSYSTEM_PROMPT_OPTIONS = [
  {
    value: "typescript" as const,
    label: "TypeScript",
    hint: "Full-stack TypeScript web with React, Vue, Svelte, and more",
  },
  {
    value: "react-native" as const,
    label: "React Native",
    hint: "Expo and React Native mobile apps with native integrations",
  },
  {
    value: "rust" as const,
    label: "Rust",
    hint: "Rust ecosystem with Axum, Leptos, and more",
  },
  {
    value: "python" as const,
    label: "Python",
    hint: "Python ecosystem with FastAPI, Django, and AI/ML tools",
  },
  {
    value: "go" as const,
    label: "Go",
    hint: "Go ecosystem with Gin, Echo, GORM, and more",
  },
  {
    value: "java" as const,
    label: "Java",
    hint: "Java ecosystem with Spring Boot, Maven, Gradle, and more",
  },
  {
    value: "elixir" as const,
    label: "Elixir",
    hint: "Elixir ecosystem with Phoenix, LiveView, Ecto, and more",
  },
];

export async function getEcosystemChoice(ecosystem?: Ecosystem) {
  if (ecosystem !== undefined) return ecosystem;

  const response = await navigableSelect<Ecosystem>({
    message: "Select ecosystem",
    options: ECOSYSTEM_PROMPT_OPTIONS,
    initialValue: "typescript",
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
