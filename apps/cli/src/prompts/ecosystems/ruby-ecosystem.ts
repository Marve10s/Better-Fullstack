import { getRubyOptionIssue } from "@better-fullstack/types";

import type {
  RubyAuth,
  RubyOrm,
  RubyTesting,
  RubyValidation,
  RubyCache,
  RubyJobQueue,
  RubyEmail,
  RubyLogging,
  RubyHttpClient,
  RubyWebFramework,
} from "@/types";

import { exitCancelled } from "@/presentation/errors";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";
import {
  createStaticSinglePromptResolution,
  type PromptOption,
} from "@/prompts/core/prompt-contract";

export function resolveRubyWebFrameworkPrompt(value?: RubyWebFramework, allowNone = false) {
  return createStaticSinglePromptResolution(
    [
      {
        value: "sinatra" as const,
        label: "Sinatra",
        hint: "Experimental JSON HTTP service with Puma and Minitest",
      },
      { value: "rails" as const, label: "Rails", hint: "API-only Rails application on Puma" },
      { value: "roda" as const, label: "Roda", hint: "Routing-tree Rack framework" },
      { value: "grape" as const, label: "Grape", hint: "REST API framework on Rack" },
      ...(allowNone
        ? [{ value: "none" as const, label: "None", hint: "Disable the Ruby backend" }]
        : []),
    ],
    "sinatra",
    value,
  );
}

export async function getRubyWebFrameworkChoice(value?: RubyWebFramework) {
  const resolution = resolveRubyWebFrameworkPrompt(value);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "sinatra";
  const response = await navigableSelect<RubyWebFramework>({
    message: "Select Ruby web framework",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

const ORM_OPTIONS: PromptOption<RubyOrm>[] = [
  { value: "active-record", label: "Active Record", hint: "Rails ORM with versioned migrations" },
  { value: "sequel", label: "Sequel", hint: "Database toolkit and models with its migrator" },
  { value: "rom", label: "ROM", hint: "Data mapper with relations and repositories" },
  { value: "none", label: "None", hint: "No database layer" },
];

export const resolveRubyOrmPrompt = (value?: RubyOrm) =>
  createStaticSinglePromptResolution(ORM_OPTIONS, "none", value);

export async function getRubyOrmChoice(value?: RubyOrm) {
  const resolution = resolveRubyOrmPrompt(value);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<RubyOrm>({
    message: "Select Ruby database layer (SQLite)",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

const AUTH_OPTIONS: PromptOption<RubyAuth>[] = [
  { value: "jwt", label: "JWT (ruby-jwt)", hint: "Verify HS256 bearer tokens on API routes" },
  { value: "omniauth", label: "OmniAuth OIDC", hint: "OpenID Connect sign-in with a cookie session" },
  { value: "rodauth", label: "Rodauth", hint: "Accounts, login, and logout stored in SQLite" },
  { value: "none", label: "None", hint: "No authentication" },
];

export const resolveRubyAuthPrompt = (value?: RubyAuth) =>
  createStaticSinglePromptResolution(AUTH_OPTIONS, "none", value);

export async function getRubyAuthChoice(value?: RubyAuth) {
  const resolution = resolveRubyAuthPrompt(value);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<RubyAuth>({
    message: "Select Ruby authentication",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

const TESTING_OPTIONS: PromptOption<RubyTesting>[] = [
  { value: "minitest", label: "Minitest", hint: "Rack::Test request tests with Minitest" },
  { value: "rspec", label: "RSpec", hint: "Rack::Test request specs with RSpec" },
  { value: "test-unit", label: "Test::Unit", hint: "Rack::Test request tests with test-unit" },
  { value: "none", label: "None", hint: "No test suite" },
];

export const resolveRubyTestingPrompt = (value?: RubyTesting) =>
  createStaticSinglePromptResolution(TESTING_OPTIONS, "minitest", value);

export async function getRubyTestingChoice(value?: RubyTesting) {
  const resolution = resolveRubyTestingPrompt(value);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "minitest";
  const response = await navigableSelect<RubyTesting>({
    message: "Select Ruby test framework",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

const VALIDATION_OPTIONS: PromptOption<RubyValidation>[] = [
  { value: "dry-validation", label: "dry-validation", hint: "Contract with schema and rule checks" },
  { value: "active-model", label: "Active Model Validations", hint: "Rails-style validations on a plain object" },
  { value: "json-schemer", label: "JSONSchemer", hint: "JSON Schema validation of the request body" },
  { value: "none", label: "None", hint: "Hand-written request checks" },
];

export const resolveRubyValidationPrompt = (value?: RubyValidation) =>
  createStaticSinglePromptResolution(VALIDATION_OPTIONS, "none", value);

export async function getRubyValidationChoice(value?: RubyValidation) {
  const resolution = resolveRubyValidationPrompt(value);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<RubyValidation>({
    message: "Select Ruby request validation",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

const CACHE_OPTIONS: PromptOption<RubyCache>[] = [
  { value: "redis", label: "Redis", hint: "redis-rb client with TTL keys at REDIS_URL" },
  { value: "memcached", label: "Memcached (Dalli)", hint: "Dalli client for MEMCACHED_SERVERS" },
  { value: "memory", label: "Active Support MemoryStore", hint: "Per-process cache, no server" },
  { value: "none", label: "None", hint: "No cache" },
];

export const resolveRubyCachePrompt = (value?: RubyCache) =>
  createStaticSinglePromptResolution(CACHE_OPTIONS, "none", value);

export async function getRubyCacheChoice(value?: RubyCache) {
  const resolution = resolveRubyCachePrompt(value);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<RubyCache>({
    message: "Select Ruby cache store",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

const JOB_QUEUE_OPTIONS: PromptOption<RubyJobQueue>[] = [
  { value: "sidekiq", label: "Sidekiq", hint: "Redis-backed jobs run by a Sidekiq process" },
  { value: "resque", label: "Resque", hint: "Redis-backed jobs run by a Resque worker" },
  {
    value: "solid-queue",
    label: "Solid Queue",
    hint: "Database-backed Active Job queue (Rails + Active Record)",
  },
  { value: "none", label: "None", hint: "No background jobs" },
];

export function resolveRubyJobQueuePrompt(
  value?: RubyJobQueue,
  framework?: RubyWebFramework,
  orm?: RubyOrm,
) {
  const options = JOB_QUEUE_OPTIONS.filter(
    (option) => !getRubyOptionIssue("rubyJobQueue", option.value, framework, orm),
  );
  return createStaticSinglePromptResolution(options, "none", value);
}

export async function getRubyJobQueueChoice(
  value?: RubyJobQueue,
  framework?: RubyWebFramework,
  orm?: RubyOrm,
) {
  const resolution = resolveRubyJobQueuePrompt(value, framework, orm);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<RubyJobQueue>({
    message: "Select Ruby background job queue",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

const EMAIL_OPTIONS: PromptOption<RubyEmail>[] = [
  { value: "mail", label: "Mail", hint: "SMTP delivery with the mail gem" },
  { value: "action-mailer", label: "Action Mailer", hint: "Rails mailer class with SMTP delivery" },
  { value: "resend", label: "Resend", hint: "Resend API with RESEND_API_KEY" },
  { value: "none", label: "None", hint: "No email delivery" },
];

export function resolveRubyEmailPrompt(value?: RubyEmail, framework?: RubyWebFramework) {
  const options = EMAIL_OPTIONS.filter(
    (option) => !getRubyOptionIssue("rubyEmail", option.value, framework, undefined),
  );
  return createStaticSinglePromptResolution(options, "none", value);
}

export async function getRubyEmailChoice(value?: RubyEmail, framework?: RubyWebFramework) {
  const resolution = resolveRubyEmailPrompt(value, framework);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<RubyEmail>({
    message: "Select Ruby email delivery",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

const LOGGING_OPTIONS: PromptOption<RubyLogging>[] = [
  { value: "logger", label: "Ruby Logger", hint: "Standard library Logger writing one line per request" },
  { value: "semantic-logger", label: "Semantic Logger", hint: "Structured JSON request logs" },
  { value: "ougai", label: "Ougai", hint: "JSON request logs with Ougai" },
  { value: "lograge", label: "Lograge", hint: "One-line Rails controller request logs" },
  { value: "none", label: "None", hint: "No request logging" },
];

export function resolveRubyLoggingPrompt(value?: RubyLogging, framework?: RubyWebFramework) {
  const options = LOGGING_OPTIONS.filter(
    (option) => !getRubyOptionIssue("rubyLogging", option.value, framework, undefined),
  );
  return createStaticSinglePromptResolution(options, "logger", value);
}

export async function getRubyLoggingChoice(value?: RubyLogging, framework?: RubyWebFramework) {
  const resolution = resolveRubyLoggingPrompt(value, framework);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "logger";
  const response = await navigableSelect<RubyLogging>({
    message: "Select Ruby request logging",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

const HTTP_CLIENT_OPTIONS: PromptOption<RubyHttpClient>[] = [
  { value: "faraday", label: "Faraday", hint: "Faraday connection with timeouts and error middleware" },
  { value: "httparty", label: "HTTParty", hint: "HTTParty GET with open and read timeouts" },
  { value: "httpx", label: "HTTPX", hint: "HTTPX session with connect and request timeouts" },
  { value: "none", label: "None", hint: "No upstream HTTP client" },
];

export const resolveRubyHttpClientPrompt = (value?: RubyHttpClient) =>
  createStaticSinglePromptResolution(HTTP_CLIENT_OPTIONS, "none", value);

export async function getRubyHttpClientChoice(value?: RubyHttpClient) {
  const resolution = resolveRubyHttpClientPrompt(value);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<RubyHttpClient>({
    message: "Select Ruby HTTP client",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}
