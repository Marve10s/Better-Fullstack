import { getPhpCapabilityIssue } from "@better-fullstack/types";

import type {
  PhpAuth,
  PhpCache,
  PhpEmail,
  PhpHttpClient,
  PhpJobQueue,
  PhpLogging,
  PhpOrm,
  PhpTesting,
  PhpValidation,
  PhpWebFramework,
} from "@/types";

import { exitCancelled } from "@/presentation/errors";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";
import {
  createStaticSinglePromptResolution,
  type PromptOption,
} from "@/prompts/core/prompt-contract";

const OPTIONS: PromptOption<PhpWebFramework>[] = [
  {
    value: "slim",
    label: "Slim",
    hint: "Experimental JSON HTTP application, Composer and PHPUnit",
  },
  { value: "laravel", label: "Laravel", hint: "Experimental Laravel 13 JSON API" },
  { value: "symfony", label: "Symfony", hint: "Experimental Symfony 8 micro-kernel JSON API" },
  { value: "none", label: "None", hint: "No PHP service" },
];

const ORM_OPTIONS: PromptOption<PhpOrm>[] = [
  { value: "eloquent", label: "Eloquent", hint: "Laravel's ActiveRecord ORM with SQLite" },
  { value: "doctrine", label: "Doctrine ORM", hint: "Data-mapper ORM with attribute mapping" },
  { value: "cycle", label: "Cycle ORM", hint: "Data-mapper ORM with Cycle Database" },
  { value: "none", label: "None", hint: "No database layer" },
];

const AUTH_OPTIONS: PromptOption<PhpAuth>[] = [
  { value: "firebase-jwt", label: "Firebase JWT", hint: "Bearer JWT verification with firebase/php-jwt" },
  { value: "lcobucci-jwt", label: "lcobucci/jwt", hint: "Bearer JWT verification with validation constraints" },
  {
    value: "symfony-security",
    label: "Symfony Security",
    hint: "Stateless access-token firewall for Symfony",
  },
  { value: "none", label: "None", hint: "No authentication" },
];

const TESTING_OPTIONS: PromptOption<PhpTesting>[] = [
  { value: "phpunit", label: "PHPUnit", hint: "Request-level PHPUnit tests" },
  { value: "pest", label: "Pest", hint: "Pest specs that also run the PHPUnit classes" },
  { value: "codeception", label: "Codeception", hint: "Codeception Unit suite over the same tests" },
  { value: "none", label: "None", hint: "No test runner; keep only the HTTP proof" },
];

const VALIDATION_OPTIONS: PromptOption<PhpValidation>[] = [
  {
    value: "symfony-validator",
    label: "Symfony Validator",
    hint: "Constraint collection for the greeting payload",
  },
  {
    value: "respect-validation",
    label: "Respect\\Validation",
    hint: "Fluent key-set rules for the greeting payload",
  },
  {
    value: "laravel-validation",
    label: "Laravel Validation",
    hint: "Laravel validator rules (Laravel only)",
  },
  { value: "none", label: "None", hint: "Keep the hand-written payload checks" },
];

const CACHE_OPTIONS: PromptOption<PhpCache>[] = [
  {
    value: "symfony-cache",
    label: "Symfony Cache",
    hint: "Filesystem cache pool behind GET /api/cached-time",
  },
  {
    value: "laminas-cache",
    label: "Laminas Cache",
    hint: "Laminas filesystem storage through PSR-16",
  },
  { value: "predis", label: "Predis", hint: "Redis-backed cache; needs a running Redis server" },
  {
    value: "laravel-cache",
    label: "Laravel Cache",
    hint: "Laravel file cache store (Laravel only)",
  },
  { value: "none", label: "None", hint: "No cache" },
];

const JOB_QUEUE_OPTIONS: PromptOption<PhpJobQueue>[] = [
  {
    value: "symfony-messenger",
    label: "Symfony Messenger",
    hint: "Doctrine transport on SQLite with a worker command",
  },
  {
    value: "enqueue-fs",
    label: "Enqueue (filesystem)",
    hint: "queue-interop filesystem transport with a worker command",
  },
  {
    value: "laravel-queue",
    label: "Laravel Queue",
    hint: "Database queue and queue:work (Laravel only)",
  },
  { value: "none", label: "None", hint: "No background jobs" },
];

const EMAIL_OPTIONS: PromptOption<PhpEmail>[] = [
  {
    value: "symfony-mailer",
    label: "Symfony Mailer",
    hint: "SMTP or provider DSN with a mail:send command",
  },
  { value: "phpmailer", label: "PHPMailer", hint: "SMTP mailer with a mail:send command" },
  {
    value: "laravel-mail",
    label: "Laravel Mail",
    hint: "Laravel mailer and Artisan mail:send (Laravel only)",
  },
  { value: "none", label: "None", hint: "No email" },
];

const LOGGING_OPTIONS: PromptOption<PhpLogging>[] = [
  { value: "monolog", label: "Monolog", hint: "JSON logs to stderr through PSR-3 (Slim only)" },
  {
    value: "laravel-log",
    label: "Laravel logging",
    hint: "Log facade on the stderr channel (Laravel only)",
  },
  {
    value: "symfony-monolog",
    label: "Symfony MonologBundle",
    hint: "JSON stream handler and autowired logger (Symfony only)",
  },
  { value: "none", label: "None", hint: "No application logging" },
];

const HTTP_CLIENT_OPTIONS: PromptOption<PhpHttpClient>[] = [
  {
    value: "guzzle",
    label: "Guzzle",
    hint: "GET /api/upstream proxies UPSTREAM_URL with a timeout",
  },
  {
    value: "symfony-http-client",
    label: "Symfony HttpClient",
    hint: "Symfony's client for GET /api/upstream",
  },
  {
    value: "httplug-curl",
    label: "PHP-HTTP cURL client",
    hint: "PSR-18 cURL client with Nyholm PSR-7 factories",
  },
  { value: "none", label: "None", hint: "No outbound HTTP client" },
];

export function resolvePhpWebFrameworkPrompt(value?: PhpWebFramework) {
  return createStaticSinglePromptResolution(OPTIONS, "slim", value);
}

export async function getPhpWebFrameworkChoice(value?: PhpWebFramework) {
  const resolution = resolvePhpWebFrameworkPrompt(value);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "slim";
  const response = await navigableSelect<PhpWebFramework>({
    message: "Select PHP web framework",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  return isCancel(response) ? exitCancelled("Operation cancelled") : response;
}

export function resolvePhpOrmPrompt(value?: PhpOrm, framework?: PhpWebFramework) {
  const options = ORM_OPTIONS.filter(
    (option) => !getPhpCapabilityIssue(framework, "orm", option.value),
  );
  return createStaticSinglePromptResolution(options, "none", value);
}

export async function getPhpOrmChoice(value?: PhpOrm, framework?: PhpWebFramework) {
  const resolution = resolvePhpOrmPrompt(value, framework);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<PhpOrm>({
    message: "Select PHP ORM / database layer",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  return isCancel(response) ? exitCancelled("Operation cancelled") : response;
}

export function resolvePhpAuthPrompt(value?: PhpAuth, framework?: PhpWebFramework) {
  const options = AUTH_OPTIONS.filter(
    (option) => !getPhpCapabilityIssue(framework, "auth", option.value),
  );
  return createStaticSinglePromptResolution(options, "none", value);
}

export async function getPhpAuthChoice(value?: PhpAuth, framework?: PhpWebFramework) {
  const resolution = resolvePhpAuthPrompt(value, framework);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<PhpAuth>({
    message: "Select PHP authentication",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  return isCancel(response) ? exitCancelled("Operation cancelled") : response;
}

export function resolvePhpTestingPrompt(value?: PhpTesting) {
  return createStaticSinglePromptResolution(TESTING_OPTIONS, "phpunit", value);
}

export async function getPhpTestingChoice(value?: PhpTesting) {
  const resolution = resolvePhpTestingPrompt(value);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "phpunit";
  const response = await navigableSelect<PhpTesting>({
    message: "Select PHP test runner",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  return isCancel(response) ? exitCancelled("Operation cancelled") : response;
}

export function resolvePhpValidationPrompt(value?: PhpValidation, framework?: PhpWebFramework) {
  const options = VALIDATION_OPTIONS.filter(
    (option) => !getPhpCapabilityIssue(framework, "validation", option.value),
  );
  return createStaticSinglePromptResolution(options, "none", value);
}

export async function getPhpValidationChoice(value?: PhpValidation, framework?: PhpWebFramework) {
  const resolution = resolvePhpValidationPrompt(value, framework);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<PhpValidation>({
    message: "Select PHP validation library",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  return isCancel(response) ? exitCancelled("Operation cancelled") : response;
}

export function resolvePhpCachePrompt(value?: PhpCache, framework?: PhpWebFramework) {
  const options = CACHE_OPTIONS.filter(
    (option) => !getPhpCapabilityIssue(framework, "caching", option.value),
  );
  return createStaticSinglePromptResolution(options, "none", value);
}

export async function getPhpCacheChoice(value?: PhpCache, framework?: PhpWebFramework) {
  const resolution = resolvePhpCachePrompt(value, framework);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<PhpCache>({
    message: "Select PHP cache",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  return isCancel(response) ? exitCancelled("Operation cancelled") : response;
}

export function resolvePhpJobQueuePrompt(value?: PhpJobQueue, framework?: PhpWebFramework) {
  const options = JOB_QUEUE_OPTIONS.filter(
    (option) => !getPhpCapabilityIssue(framework, "jobQueue", option.value),
  );
  return createStaticSinglePromptResolution(options, "none", value);
}

export async function getPhpJobQueueChoice(value?: PhpJobQueue, framework?: PhpWebFramework) {
  const resolution = resolvePhpJobQueuePrompt(value, framework);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<PhpJobQueue>({
    message: "Select PHP background job queue",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  return isCancel(response) ? exitCancelled("Operation cancelled") : response;
}

export function resolvePhpEmailPrompt(value?: PhpEmail, framework?: PhpWebFramework) {
  const options = EMAIL_OPTIONS.filter(
    (option) => !getPhpCapabilityIssue(framework, "email", option.value),
  );
  return createStaticSinglePromptResolution(options, "none", value);
}

export async function getPhpEmailChoice(value?: PhpEmail, framework?: PhpWebFramework) {
  const resolution = resolvePhpEmailPrompt(value, framework);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<PhpEmail>({
    message: "Select PHP email library",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  return isCancel(response) ? exitCancelled("Operation cancelled") : response;
}

export function resolvePhpLoggingPrompt(value?: PhpLogging, framework?: PhpWebFramework) {
  const options = LOGGING_OPTIONS.filter(
    (option) => !getPhpCapabilityIssue(framework, "logging", option.value),
  );
  return createStaticSinglePromptResolution(options, "none", value);
}

export async function getPhpLoggingChoice(value?: PhpLogging, framework?: PhpWebFramework) {
  const resolution = resolvePhpLoggingPrompt(value, framework);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<PhpLogging>({
    message: "Select PHP logging",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  return isCancel(response) ? exitCancelled("Operation cancelled") : response;
}

export function resolvePhpHttpClientPrompt(value?: PhpHttpClient, framework?: PhpWebFramework) {
  const options = HTTP_CLIENT_OPTIONS.filter(
    (option) => !getPhpCapabilityIssue(framework, "httpClient", option.value),
  );
  return createStaticSinglePromptResolution(options, "none", value);
}

export async function getPhpHttpClientChoice(value?: PhpHttpClient, framework?: PhpWebFramework) {
  const resolution = resolvePhpHttpClientPrompt(value, framework);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<PhpHttpClient>({
    message: "Select PHP HTTP client",
    options: resolution.options,
    initialValue: resolution.initialValue,
  });
  return isCancel(response) ? exitCancelled("Operation cancelled") : response;
}
