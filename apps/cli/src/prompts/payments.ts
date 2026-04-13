import type { Auth, Backend, Frontend, Payments } from "../types";

import { DEFAULT_CONFIG } from "../constants";
import { splitFrontends } from "../utils/compatibility-rules";
import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

type PaymentsPromptContext = {
  payments?: Payments;
  auth?: Auth;
  backend?: Backend;
  frontends?: Frontend[];
};

export function resolvePaymentsPrompt(
  context: PaymentsPromptContext = {},
): PromptSingleResolution<Payments> {
  if (context.payments !== undefined) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: context.payments,
    };
  }

  if (context.backend === "none") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  const isPolarCompatible =
    context.auth === "better-auth" &&
    (context.frontends?.length === 0 || splitFrontends(context.frontends).web.length > 0);

  const options: Array<{ value: Payments; label: string; hint: string }> = [];

  if (isPolarCompatible) {
    options.push({
      value: "polar" as Payments,
      label: "Polar",
      hint: "Turn your software into a business. 6 lines of code.",
    });
  }

  options.push(
    {
      value: "stripe" as Payments,
      label: "Stripe",
      hint: "Payment processing platform for internet businesses.",
    },
    {
      value: "lemon-squeezy" as Payments,
      label: "Lemon Squeezy",
      hint: "All-in-one platform for SaaS, digital products, and subscriptions.",
    },
    {
      value: "paddle" as Payments,
      label: "Paddle",
      hint: "Complete payments infrastructure for SaaS.",
    },
    {
      value: "dodo" as Payments,
      label: "Dodo Payments",
      hint: "Simple payment infrastructure for developers.",
    },
    {
      value: "none" as Payments,
      label: "None",
      hint: "No payments integration",
    },
  );

  return {
    shouldPrompt: true,
    mode: "single",
    options,
    initialValue: DEFAULT_CONFIG.payments,
  };
}

export async function getPaymentsChoice(
  payments?: Payments,
  auth?: Auth,
  backend?: Backend,
  frontends?: Frontend[],
) {
  const resolution = resolvePaymentsPrompt({ payments, auth, backend, frontends });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<Payments>({
    message: "Select payments provider",
    options: resolution.options,
    initialValue: resolution.initialValue as Payments,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
