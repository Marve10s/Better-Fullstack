import type { Forms, Frontend } from "../types";

import { splitFrontends } from "../utils/compatibility-rules";
import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

type FormsPromptContext = {
  forms?: Forms;
  frontends?: Frontend[];
};

export function resolveFormsPrompt(
  context: FormsPromptContext = {},
): PromptSingleResolution<Forms> {
  if (context.forms !== undefined) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: context.forms,
    };
  }

  const { web } = splitFrontends(context.frontends);
  if (web.length === 0) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  const isReact = web.some((f) =>
    ["tanstack-router", "react-router", "react-vite", "tanstack-start", "next", "vinext", "redwood"].includes(f),
  );
  const isSolid = web.includes("solid");
  const isQwik = web.includes("qwik");
  const isFresh = web.includes("fresh");
  const options: Array<{ value: Forms; label: string; hint: string }> = [];

  if (isReact) {
    options.push(
      {
        value: "react-hook-form" as const,
        label: "React Hook Form",
        hint: "Performant, flexible form validation library",
      },
      {
        value: "formik" as const,
        label: "Formik",
        hint: "Popular form state management with Yup validation",
      },
      {
        value: "final-form" as const,
        label: "Final Form",
        hint: "Framework-agnostic form state management",
      },
      {
        value: "conform" as const,
        label: "Conform",
        hint: "Progressive enhancement forms with Zod validation",
      },
    );
  }

  if (!isFresh) {
    options.push({
      value: "tanstack-form" as const,
      label: "TanStack Form",
      hint: "Fully-typed, framework-agnostic form library",
    });
  }

  if (isSolid || isQwik) {
    options.push({
      value: "modular-forms" as const,
      label: "Modular Forms",
      hint: "Type-safe forms for Solid and Qwik (3KB bundle)",
    });
  }

  options.push({
    value: "none" as const,
    label: "None",
    hint: "Build custom form handling",
  });

  return {
    shouldPrompt: true,
    mode: "single",
    options,
    initialValue: isReact
      ? "react-hook-form"
      : (options.find((option) => option.value !== "none")?.value ?? "none"),
  };
}

export async function getFormsChoice(forms?: Forms, frontends?: Frontend[]) {
  const resolution = resolveFormsPrompt({ forms, frontends });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<Forms>({
    message: "Select form library",
    options: resolution.options,
    initialValue: resolution.initialValue as Forms,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
