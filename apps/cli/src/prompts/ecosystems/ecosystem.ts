import type { Auth, Ecosystem } from "@/types";

import { exitCancelled } from "@/presentation/errors";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";
import { getAuthIncompatibility } from "@/types";

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
    value: "dotnet" as const,
    label: ".NET",
    hint: "ASP.NET Core ecosystem with Minimal APIs, EF Core, SignalR, and more",
  },
  {
    value: "elixir" as const,
    label: "Elixir",
    hint: "Elixir ecosystem with Phoenix, LiveView, Ecto, and more",
  },
];

export async function getEcosystemChoice(ecosystem?: Ecosystem, auth?: Auth) {
  if (ecosystem !== undefined) return ecosystem;

  const options = ECOSYSTEM_PROMPT_OPTIONS.filter(
    (option) => !getAuthIncompatibility(auth, { ecosystem: option.value }, { partial: true }),
  );
  const response = await navigableSelect<Ecosystem>({
    message: "Select ecosystem",
    options,
    initialValue: options[0]?.value,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
