import type { Backend, Email } from "../types";

import { DEFAULT_CONFIG } from "../constants";
import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const EMAIL_PROMPT_OPTIONS = [
  {
    value: "resend" as Email,
    label: "Resend",
    hint: "Email for developers. Includes React Email components.",
  },
  {
    value: "react-email" as Email,
    label: "React Email",
    hint: "Build emails using React components (no sending service).",
  },
  {
    value: "nodemailer" as Email,
    label: "Nodemailer",
    hint: "Classic Node.js email sending library.",
  },
  {
    value: "postmark" as Email,
    label: "Postmark",
    hint: "Transactional email service with high deliverability.",
  },
  {
    value: "sendgrid" as Email,
    label: "SendGrid",
    hint: "Email delivery and marketing platform by Twilio.",
  },
  {
    value: "aws-ses" as Email,
    label: "AWS SES",
    hint: "Amazon Simple Email Service for scalable email.",
  },
  {
    value: "mailgun" as Email,
    label: "Mailgun",
    hint: "Email API service for sending and tracking emails.",
  },
  {
    value: "plunk" as Email,
    label: "Plunk",
    hint: "Open-source email platform for developers.",
  },
  {
    value: "none" as Email,
    label: "None",
    hint: "No email integration",
  },
];

type EmailPromptContext = {
  email?: Email;
  backend?: Backend;
};

export function resolveEmailPrompt(
  context: EmailPromptContext = {},
): PromptSingleResolution<Email> {
  if (context.backend === "none" || context.backend === "convex") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  return context.email !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options: EMAIL_PROMPT_OPTIONS,
        autoValue: context.email,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options: EMAIL_PROMPT_OPTIONS,
        initialValue: DEFAULT_CONFIG.email ?? "none",
      };
}

export async function getEmailChoice(email?: Email, backend?: Backend) {
  const resolution = resolveEmailPrompt({ email, backend });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<Email>({
    message: "Select email solution",
    options: resolution.options,
    initialValue: resolution.initialValue as Email,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
