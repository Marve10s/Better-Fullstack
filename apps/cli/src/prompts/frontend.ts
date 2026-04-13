import type { Backend, Frontend } from "../types";

import { DEFAULT_CONFIG } from "../constants";
import { isFrontendAllowedWithBackend } from "../utils/compatibility-rules";
import { isFirstPrompt } from "../utils/context";
import { exitCancelled } from "../utils/errors";
import type { PromptMultiResolution, PromptOption } from "./prompt-contract";
import {
  GO_BACK_SYMBOL,
  isCancel,
  isGoBack,
  navigableMultiselect,
  navigableSelect,
  setIsFirstPrompt,
} from "./navigable";

const WEB_FRONTEND_PROMPT_OPTIONS: PromptOption<Frontend>[] = [
  {
    value: "tanstack-router",
    label: "TanStack Router",
    hint: "Modern and scalable routing for React Applications",
  },
  {
    value: "react-router",
    label: "React Router",
    hint: "A user-obsessed, standards-focused, multi-strategy router",
  },
  {
    value: "react-vite",
    label: "React + Vite",
    hint: "Client-routed React SPA powered by Vite",
  },
  {
    value: "next",
    label: "Next.js",
    hint: "The React Framework for the Web",
  },
  {
    value: "nuxt",
    label: "Nuxt",
    hint: "The Progressive Web Framework for Vue.js",
  },
  {
    value: "svelte",
    label: "SvelteKit",
    hint: "Full-stack Svelte framework with SSR and server routes",
  },
  {
    value: "solid",
    label: "Solid",
    hint: "Simple and performant reactivity for building user interfaces",
  },
  {
    value: "solid-start",
    label: "SolidStart",
    hint: "Full-stack Solid framework with SSR and API routes",
  },
  {
    value: "astro",
    label: "Astro",
    hint: "Content-focused with Island Architecture",
  },
  {
    value: "tanstack-start",
    label: "TanStack Start",
    hint: "SSR, Server Functions, API Routes and more with TanStack Router",
  },
  {
    value: "qwik",
    label: "Qwik",
    hint: "Resumable framework with instant load times",
  },
  {
    value: "angular",
    label: "Angular",
    hint: "Enterprise-grade TypeScript framework by Google",
  },
  {
    value: "redwood",
    label: "RedwoodJS",
    hint: "Opinionated fullstack (React + GraphQL + Prisma)",
  },
  {
    value: "fresh",
    label: "Fresh",
    hint: "Deno-native framework with islands architecture",
  },
];

const NATIVE_FRONTEND_PROMPT_OPTIONS: PromptOption<Frontend>[] = [
  {
    value: "native-bare",
    label: "Bare",
    hint: "Bare Expo without styling library",
  },
  {
    value: "native-uniwind",
    label: "Uniwind",
    hint: "Fastest Tailwind bindings for React Native with HeroUI Native",
  },
  {
    value: "native-unistyles",
    label: "Unistyles",
    hint: "Consistent styling for React Native",
  },
];

type FrontendPromptContext = {
  frontendOptions?: Frontend[];
  backend?: Backend;
  auth?: string;
};

export function resolveFrontendPrompt(
  context: FrontendPromptContext = {},
): PromptMultiResolution<Frontend> {
  const options = [
    ...WEB_FRONTEND_PROMPT_OPTIONS.filter((option) =>
      isFrontendAllowedWithBackend(option.value, context.backend, context.auth),
    ),
    ...NATIVE_FRONTEND_PROMPT_OPTIONS,
  ];

  return context.frontendOptions !== undefined
    ? {
        shouldPrompt: false,
        mode: "multiple",
        options,
        autoValue: context.frontendOptions,
      }
    : {
        shouldPrompt: true,
        mode: "multiple",
        options,
        initialValue: DEFAULT_CONFIG.frontend,
      };
}

export async function getFrontendChoice(
  frontendOptions?: Frontend[],
  backend?: Backend,
  auth?: string,
): Promise<Frontend[] | symbol> {
  const resolution = resolveFrontendPrompt({ frontendOptions, backend, auth });
  if (!resolution.shouldPrompt) {
    return (resolution.autoValue as Frontend[]) ?? [];
  }
  const allowedValues = new Set(resolution.options.map((option) => option.value));
  const initialValues =
    (resolution.initialValue as Frontend[] | undefined) ?? DEFAULT_CONFIG.frontend;
  const initialTypes = [
    ...(initialValues.some((value) =>
      WEB_FRONTEND_PROMPT_OPTIONS.some((option) => option.value === value),
    )
      ? (["web"] as const)
      : []),
    ...(initialValues.some((value) =>
      NATIVE_FRONTEND_PROMPT_OPTIONS.some((option) => option.value === value),
    )
      ? (["native"] as const)
      : []),
  ];

  while (true) {
    const wasFirstPrompt = isFirstPrompt();

    const frontendTypes = await navigableMultiselect({
      message: "Select project type",
      options: [
        {
          value: "web",
          label: "Web",
          hint: "React, Vue or Svelte Web Application",
        },
        {
          value: "native",
          label: "Native",
          hint: "Create a React Native/Expo app",
        },
      ],
      required: false,
      initialValues: initialTypes.length > 0 ? [...initialTypes] : ["web"],
    });

    if (isGoBack(frontendTypes)) return GO_BACK_SYMBOL;
    if (isCancel(frontendTypes)) return exitCancelled("Operation cancelled");

    setIsFirstPrompt(false);

    const result: Frontend[] = [];
    let shouldRestart = false;

    if (frontendTypes.includes("web")) {
      const webOptions = WEB_FRONTEND_PROMPT_OPTIONS.filter((option) =>
        allowedValues.has(option.value),
      );
      const initialWebValue =
        initialValues.find((value) => webOptions.some((option) => option.value === value)) ??
        webOptions[0]?.value;

      const webFramework = await navigableSelect<Frontend>({
        message: "Select web framework",
        options: webOptions,
        ...(initialWebValue ? { initialValue: initialWebValue } : {}),
      });

      if (isGoBack(webFramework)) {
        shouldRestart = true;
      } else if (isCancel(webFramework)) {
        return exitCancelled("Operation cancelled");
      } else {
        result.push(webFramework as Frontend);
      }
    }

    if (shouldRestart) {
      setIsFirstPrompt(wasFirstPrompt);
      continue;
    }

    if (frontendTypes.includes("native")) {
      const nativeOptions = NATIVE_FRONTEND_PROMPT_OPTIONS.filter((option) =>
        allowedValues.has(option.value),
      );
      const initialNativeValue =
        initialValues.find((value) =>
          nativeOptions.some((option) => option.value === value),
        ) ?? nativeOptions[0]?.value;
      const nativeFramework = await navigableSelect<Frontend>({
        message: "Choose native",
        options: nativeOptions,
        ...(initialNativeValue ? { initialValue: initialNativeValue } : {}),
      });

      if (isGoBack(nativeFramework)) {
        if (frontendTypes.includes("web")) {
          shouldRestart = true;
        } else {
          setIsFirstPrompt(wasFirstPrompt);
          continue;
        }
      } else if (isCancel(nativeFramework)) {
        return exitCancelled("Operation cancelled");
      } else {
        result.push(nativeFramework as Frontend);
      }
    }

    if (shouldRestart) {
      setIsFirstPrompt(wasFirstPrompt);
      continue;
    }

    return result;
  }
}
