import type { PromptSingleResolution } from "@/prompts/core/prompt-contract";
import type { Auth, Backend, Database, ORM } from "@/types";

import { DEFAULT_CONFIG } from "@/constants";
import { exitCancelled } from "@/presentation/errors";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";
import { getBetterAuthDatabaseIncompatibility, getSupportedCapabilityOptions } from "@/types";

type AuthPromptContext = {
  auth?: Auth;
  backend?: Backend;
  frontend?: string[];
  ecosystem?: "typescript" | "react-native" | "go";
  database?: Database;
  orm?: ORM;
};

export function resolveAuthPrompt(context: AuthPromptContext = {}): PromptSingleResolution<Auth> {
  const authOptionOrder = [
    { value: "better-auth" },
    { value: "better-auth-organizations" },
    { value: "go-better-auth" },
    { value: "clerk" },
    { value: "nextauth" },
    { value: "stack-auth" },
    { value: "supabase-auth" },
    { value: "auth0" },
    { value: "workos" },
    { value: "kinde" },
    { value: "passport" },
    { value: "none" },
  ] as const satisfies ReadonlyArray<{ value: Auth }>;

  const supportedOptions = getSupportedCapabilityOptions("auth", {
    ecosystem: context.ecosystem ?? "typescript",
    backend: context.backend,
    frontend: context.frontend,
  });
  const options = authOptionOrder.flatMap(({ value }) => {
    const option = supportedOptions.find((candidate) => candidate.id === value);
    const databaseIssue = getBetterAuthDatabaseIncompatibility(
      value,
      { database: context.database, orm: context.orm },
      { partial: true },
    );
    return option && !databaseIssue
      ? [
          {
            value: option.id,
            label: option.label,
            hint: option.promptHint,
          },
        ]
      : [];
  });

  if (context.auth !== undefined) {
    return {
      shouldPrompt: false,
      mode: "single",
      options,
      autoValue: context.auth,
    };
  }

  if (options.length === 1 && options[0]?.value === "none") {
    return {
      shouldPrompt: false,
      mode: "single",
      options,
      autoValue: "none",
    };
  }

  return {
    shouldPrompt: true,
    mode: "single",
    options,
    initialValue: options.some((option) => option.value === DEFAULT_CONFIG.auth)
      ? DEFAULT_CONFIG.auth
      : (options.find((option) => option.value !== "none")?.value ?? "none"),
  };
}

export async function getAuthChoice(
  auth: Auth | undefined,
  backend?: Backend,
  frontend?: string[],
  ecosystem: "typescript" | "react-native" | "go" = "typescript",
  data: { database?: Database; orm?: ORM } = {},
) {
  const resolution = resolveAuthPrompt({
    auth,
    backend,
    frontend,
    ecosystem,
    ...data,
  });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect({
    message: "Select authentication provider",
    options: resolution.options,
    initialValue: resolution.initialValue as Auth,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response as Auth;
}
