import type { CrystalAuth, CrystalTesting, CrystalValidation, CrystalCache, CrystalJobs, CrystalOrm, CrystalSelection, CrystalWebFramework } from "@/types";
import { CrystalAuthSchema, CrystalTestingSchema, CrystalValidationSchema, CrystalCacheSchema, CrystalJobsSchema, CrystalOrmSchema, CrystalWebFrameworkSchema, getCrystalOptionIssue } from "@/types";
import { exitCancelled } from "@/presentation/errors";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";
import { createStaticSinglePromptResolution } from "@/prompts/core/prompt-contract";

export function resolveCrystalWebFrameworkPrompt(value?: string) {
  const selected = value === undefined ? undefined : CrystalWebFrameworkSchema.parse(value);
  return createStaticSinglePromptResolution(
    [
    { value: "kemal" as const, label: "Kemal", hint: "Experimental native HTTP service" },
    { value: "lucky" as const, label: "Lucky", hint: "Type-safe actions without a database" },
    { value: "athena" as const, label: "Athena", hint: "Annotation-based controllers" },
    { value: "marten" as const, label: "Marten", hint: "Handlers and middleware without a database" },
    { value: "none" as const, label: "None" },
    ],
    "kemal",
    selected,
  );
}

export async function getCrystalWebFrameworkChoice(value?: CrystalWebFramework) {
  const resolution = resolveCrystalWebFrameworkPrompt(value);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "kemal";
  const response = await navigableSelect<CrystalWebFramework>({ message: "Select Crystal HTTP framework", options: resolution.options, initialValue: resolution.initialValue });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export function resolveCrystalOrmPrompt(value?: string, selection: CrystalSelection = {}) {
  const selected = value === undefined ? undefined : CrystalOrmSchema.parse(value);
  const options = [
    { value: "crystal-db" as const, label: "crystal-db (SQLite)", hint: "Parameterized SQL with any HTTP framework" },
    { value: "avram" as const, label: "Avram (PostgreSQL)", hint: "Lucky's type-safe ORM and migrations" },
    { value: "marten-orm" as const, label: "Marten ORM (SQLite)", hint: "Marten models and migrations" },
    { value: "none" as const, label: "None" },
  ].filter((option) => !getCrystalOptionIssue("crystalOrm", option.value, selection));
  return createStaticSinglePromptResolution(options, "none", selected);
}

export async function getCrystalOrmChoice(value?: CrystalOrm, selection: CrystalSelection = {}) {
  const resolution = resolveCrystalOrmPrompt(value, selection);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<CrystalOrm>({ message: "Select Crystal database layer", options: resolution.options, initialValue: resolution.initialValue });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export function resolveCrystalAuthPrompt(value?: string, selection: CrystalSelection = {}) {
  const selected = value === undefined ? undefined : CrystalAuthSchema.parse(value);
  const options = [
    { value: "jwt" as const, label: "JWT bearer tokens", hint: "Signed HS256 tokens with any HTTP framework" },
    { value: "kemal-session" as const, label: "Kemal Session", hint: "Cookie sessions for Kemal" },
    { value: "marten-auth" as const, label: "Marten Auth", hint: "Stored users and sessions for Marten ORM" },
    { value: "none" as const, label: "None" },
  ].filter((option) => !getCrystalOptionIssue("crystalAuth", option.value, selection));
  return createStaticSinglePromptResolution(options, "none", selected);
}

export async function getCrystalAuthChoice(value?: CrystalAuth, selection: CrystalSelection = {}) {
  const resolution = resolveCrystalAuthPrompt(value, selection);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<CrystalAuth>({ message: "Select Crystal authentication", options: resolution.options, initialValue: resolution.initialValue });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export function resolveCrystalTestingPrompt(value?: string, selection: CrystalSelection = {}) {
  const selected = value === undefined ? undefined : CrystalTestingSchema.parse(value);
  const options = [
    { value: "spec" as const, label: "Crystal Spec", hint: "Built-in spec runner" },
    { value: "spectator" as const, label: "Spectator", hint: "RSpec-style specs with doubles beside Spec" },
    { value: "spec-kemal" as const, label: "spec-kemal", hint: "In-memory Kemal route specs" },
    { value: "none" as const, label: "None" },
  ].filter((option) => !getCrystalOptionIssue("crystalTesting", option.value, selection));
  return createStaticSinglePromptResolution(options, "spec", selected);
}

export async function getCrystalTestingChoice(value?: CrystalTesting, selection: CrystalSelection = {}) {
  const resolution = resolveCrystalTestingPrompt(value, selection);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "spec";
  const response = await navigableSelect<CrystalTesting>({ message: "Select Crystal test tooling", options: resolution.options, initialValue: resolution.initialValue });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export function resolveCrystalValidationPrompt(value?: string, selection: CrystalSelection = {}) {
  const selected = value === undefined ? undefined : CrystalValidationSchema.parse(value);
  const options = [
    { value: "athena-validator" as const, label: "Athena Validator", hint: "Annotation constraints with any framework" },
    { value: "active-model" as const, label: "ActiveModel", hint: "Spider-Gazelle model validations" },
    { value: "marten-schema" as const, label: "Marten Schema", hint: "Marten schema fields" },
    { value: "none" as const, label: "None", hint: "Hand-written checks" },
  ].filter((option) => !getCrystalOptionIssue("crystalValidation", option.value, selection));
  return createStaticSinglePromptResolution(options, "none", selected);
}

export async function getCrystalValidationChoice(value?: CrystalValidation, selection: CrystalSelection = {}) {
  const resolution = resolveCrystalValidationPrompt(value, selection);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<CrystalValidation>({ message: "Select Crystal input validation", options: resolution.options, initialValue: resolution.initialValue });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export function resolveCrystalCachePrompt(value?: string, selection: CrystalSelection = {}) {
  const selected = value === undefined ? undefined : CrystalCacheSchema.parse(value);
  const options = [
    { value: "memory" as const, label: "Memory store", hint: "Process-local TTL cache" },
    { value: "file" as const, label: "File store", hint: "TTL cache files under CACHE_DIR" },
    { value: "redis" as const, label: "Redis", hint: "Shared TTL cache in Redis" },
    { value: "none" as const, label: "None" },
  ].filter((option) => !getCrystalOptionIssue("crystalCache", option.value, selection));
  return createStaticSinglePromptResolution(options, "none", selected);
}

export async function getCrystalCacheChoice(value?: CrystalCache, selection: CrystalSelection = {}) {
  const resolution = resolveCrystalCachePrompt(value, selection);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<CrystalCache>({ message: "Select Crystal cache store", options: resolution.options, initialValue: resolution.initialValue });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export function resolveCrystalJobsPrompt(value?: string, selection: CrystalSelection = {}) {
  const selected = value === undefined ? undefined : CrystalJobsSchema.parse(value);
  const options = [
    { value: "sidekiq" as const, label: "Sidekiq.cr", hint: "Redis queue with a separate worker" },
    { value: "mosquito" as const, label: "Mosquito", hint: "Redis queue with a separate worker" },
    { value: "tasker" as const, label: "Tasker (in-process)", hint: "Scheduled in the server process, lost on restart" },
    { value: "none" as const, label: "None" },
  ].filter((option) => !getCrystalOptionIssue("crystalJobs", option.value, selection));
  return createStaticSinglePromptResolution(options, "none", selected);
}

export async function getCrystalJobsChoice(value?: CrystalJobs, selection: CrystalSelection = {}) {
  const resolution = resolveCrystalJobsPrompt(value, selection);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<CrystalJobs>({ message: "Select Crystal background jobs", options: resolution.options, initialValue: resolution.initialValue });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}
