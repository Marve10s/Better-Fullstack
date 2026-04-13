import type {
  PythonAi,
  PythonAuth,
  PythonGraphql,
  PythonOrm,
  PythonQuality,
  PythonTaskQueue,
  PythonValidation,
  PythonWebFramework,
} from "../types";

import { exitCancelled } from "../utils/errors";
import {
  createStaticMultiPromptResolution,
  createStaticSinglePromptResolution,
  type PromptOption,
} from "./prompt-contract";
import { isCancel, navigableMultiselect, navigableSelect } from "./navigable";

const PYTHON_WEB_FRAMEWORK_PROMPT_OPTIONS: PromptOption<PythonWebFramework>[] = [
  {
    value: "fastapi",
    label: "FastAPI",
    hint: "Modern, fast (high-performance) web framework for building APIs",
  },
  {
    value: "django",
    label: "Django",
    hint: "High-level Python web framework with batteries included",
  },
  {
    value: "flask",
    label: "Flask",
    hint: "Lightweight WSGI web framework with minimal boilerplate",
  },
  {
    value: "litestar",
    label: "Litestar",
    hint: "High-performance ASGI framework with class-based controllers",
  },
  {
    value: "none",
    label: "None",
    hint: "No web framework",
  },
];

const PYTHON_ORM_PROMPT_OPTIONS: PromptOption<PythonOrm>[] = [
  {
    value: "sqlalchemy",
    label: "SQLAlchemy",
    hint: "The SQL toolkit and ORM for Python",
  },
  {
    value: "sqlmodel",
    label: "SQLModel",
    hint: "SQL databases in Python with Pydantic and SQLAlchemy",
  },
  {
    value: "tortoise-orm",
    label: "Tortoise ORM",
    hint: "Async-first ORM with Django-like API",
  },
  {
    value: "none",
    label: "None",
    hint: "No ORM/database layer",
  },
];

const PYTHON_VALIDATION_PROMPT_OPTIONS: PromptOption<PythonValidation>[] = [
  {
    value: "pydantic",
    label: "Pydantic",
    hint: "Data validation using Python type hints",
  },
  {
    value: "none",
    label: "None",
    hint: "No validation library",
  },
];

const PYTHON_AI_PROMPT_OPTIONS: PromptOption<PythonAi>[] = [
  {
    value: "none",
    label: "None",
    hint: "No AI/ML framework",
  },
  {
    value: "langchain",
    label: "LangChain",
    hint: "Building applications with LLMs through composability",
  },
  {
    value: "llamaindex",
    label: "LlamaIndex",
    hint: "Data framework for LLM applications",
  },
  {
    value: "openai-sdk",
    label: "OpenAI SDK",
    hint: "Official OpenAI Python client",
  },
  {
    value: "anthropic-sdk",
    label: "Anthropic SDK",
    hint: "Official Anthropic Claude API client",
  },
  {
    value: "langgraph",
    label: "LangGraph",
    hint: "Graph-based agent orchestration",
  },
  {
    value: "crewai",
    label: "CrewAI",
    hint: "Multi-agent orchestration framework",
  },
];

const PYTHON_AUTH_PROMPT_OPTIONS: PromptOption<PythonAuth>[] = [
  {
    value: "authlib",
    label: "Authlib",
    hint: "Comprehensive auth library — OAuth1/2, OIDC, JWS, JWK, JWT",
  },
  {
    value: "jwt",
    label: "JWT (python-jose)",
    hint: "Simple JWT token creation and verification",
  },
  {
    value: "none",
    label: "None",
    hint: "No authentication library",
  },
];

const PYTHON_TASK_QUEUE_PROMPT_OPTIONS: PromptOption<PythonTaskQueue>[] = [
  {
    value: "celery",
    label: "Celery",
    hint: "Distributed task queue for Python",
  },
  {
    value: "none",
    label: "None",
    hint: "No task queue",
  },
];

const PYTHON_GRAPHQL_PROMPT_OPTIONS: PromptOption<PythonGraphql>[] = [
  {
    value: "strawberry",
    label: "Strawberry",
    hint: "Python GraphQL library using dataclasses and type hints",
  },
  {
    value: "none",
    label: "None",
    hint: "No GraphQL framework",
  },
];

const PYTHON_QUALITY_PROMPT_OPTIONS: PromptOption<PythonQuality>[] = [
  {
    value: "ruff",
    label: "Ruff",
    hint: "An extremely fast Python linter and formatter",
  },
  {
    value: "none",
    label: "None",
    hint: "No code quality tools",
  },
];

export function resolvePythonWebFrameworkPrompt(pythonWebFramework?: PythonWebFramework) {
  return createStaticSinglePromptResolution(
    PYTHON_WEB_FRAMEWORK_PROMPT_OPTIONS,
    "fastapi",
    pythonWebFramework,
  );
}

export async function getPythonWebFrameworkChoice(pythonWebFramework?: PythonWebFramework) {
  const resolution = resolvePythonWebFrameworkPrompt(pythonWebFramework);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<PythonWebFramework>({
    message: "Select Python web framework",
    options: resolution.options,
    initialValue: resolution.initialValue as PythonWebFramework,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolvePythonOrmPrompt(pythonOrm?: PythonOrm) {
  return createStaticSinglePromptResolution(
    PYTHON_ORM_PROMPT_OPTIONS,
    "sqlalchemy",
    pythonOrm,
  );
}

export async function getPythonOrmChoice(pythonOrm?: PythonOrm) {
  const resolution = resolvePythonOrmPrompt(pythonOrm);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<PythonOrm>({
    message: "Select Python ORM/database layer",
    options: resolution.options,
    initialValue: resolution.initialValue as PythonOrm,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolvePythonValidationPrompt(pythonValidation?: PythonValidation) {
  return createStaticSinglePromptResolution(
    PYTHON_VALIDATION_PROMPT_OPTIONS,
    "pydantic",
    pythonValidation,
  );
}

export async function getPythonValidationChoice(pythonValidation?: PythonValidation) {
  const resolution = resolvePythonValidationPrompt(pythonValidation);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<PythonValidation>({
    message: "Select Python validation library",
    options: resolution.options,
    initialValue: resolution.initialValue as PythonValidation,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolvePythonAiPrompt(pythonAi?: PythonAi[]) {
  return createStaticMultiPromptResolution(PYTHON_AI_PROMPT_OPTIONS, [], pythonAi);
}

export async function getPythonAiChoice(pythonAi?: PythonAi[]) {
  const resolution = resolvePythonAiPrompt(pythonAi);
  if (!resolution.shouldPrompt) {
    return (resolution.autoValue as PythonAi[]) ?? [];
  }

  const response = await navigableMultiselect({
    message: "Select Python AI/ML frameworks",
    options: resolution.options,
    required: false,
    initialValues: resolution.initialValue as PythonAi[],
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  if (response.includes("none")) return [];

  return response as PythonAi[];
}

export function resolvePythonAuthPrompt(pythonAuth?: PythonAuth) {
  return createStaticSinglePromptResolution(
    PYTHON_AUTH_PROMPT_OPTIONS,
    "none",
    pythonAuth,
  );
}

export async function getPythonAuthChoice(pythonAuth?: PythonAuth) {
  const resolution = resolvePythonAuthPrompt(pythonAuth);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<PythonAuth>({
    message: "Select Python authentication library",
    options: resolution.options,
    initialValue: resolution.initialValue as PythonAuth,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolvePythonTaskQueuePrompt(pythonTaskQueue?: PythonTaskQueue) {
  return createStaticSinglePromptResolution(
    PYTHON_TASK_QUEUE_PROMPT_OPTIONS,
    "none",
    pythonTaskQueue,
  );
}

export async function getPythonTaskQueueChoice(pythonTaskQueue?: PythonTaskQueue) {
  const resolution = resolvePythonTaskQueuePrompt(pythonTaskQueue);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<PythonTaskQueue>({
    message: "Select Python task queue",
    options: resolution.options,
    initialValue: resolution.initialValue as PythonTaskQueue,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolvePythonGraphqlPrompt(pythonGraphql?: PythonGraphql) {
  return createStaticSinglePromptResolution(
    PYTHON_GRAPHQL_PROMPT_OPTIONS,
    "none",
    pythonGraphql,
  );
}

export async function getPythonGraphqlChoice(pythonGraphql?: PythonGraphql) {
  const resolution = resolvePythonGraphqlPrompt(pythonGraphql);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<PythonGraphql>({
    message: "Select Python GraphQL framework",
    options: resolution.options,
    initialValue: resolution.initialValue as PythonGraphql,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolvePythonQualityPrompt(pythonQuality?: PythonQuality) {
  return createStaticSinglePromptResolution(
    PYTHON_QUALITY_PROMPT_OPTIONS,
    "ruff",
    pythonQuality,
  );
}

export async function getPythonQualityChoice(pythonQuality?: PythonQuality) {
  const resolution = resolvePythonQualityPrompt(pythonQuality);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<PythonQuality>({
    message: "Select Python code quality tool",
    options: resolution.options,
    initialValue: resolution.initialValue as PythonQuality,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
