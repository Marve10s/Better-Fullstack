import type {
  PythonAi,
  PythonApi,
  PythonAuth,
  PythonCaching,
  PythonCli,
  PythonCloudSdk,
  PythonData,
  PythonHttpClient,
  PythonMedia,
  PythonMessageQueue,
  PythonPackageManager,
  PythonServer,
  PythonGraphql,
  PythonObservability,
  PythonOrm,
  PythonQuality,
  PythonRealtime,
  PythonTaskQueue,
  PythonTesting,
  PythonValidation,
  PythonWebFramework,
} from "@/types";

import { exitCancelled } from "@/presentation/errors";
import { isCancel, navigableMultiselect, navigableSelect } from "@/prompts/core/navigable";
import {
  createStaticMultiPromptResolution,
  createStaticSinglePromptResolution,
  type PromptOption,
} from "@/prompts/core/prompt-contract";

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
    value: "starlette",
    label: "Starlette",
    hint: "Minimal ASGI toolkit that powers FastAPI - great for lean async apps",
  },
  {
    value: "aiohttp",
    label: "aiohttp",
    hint: "Async HTTP server and client framework",
  },
  {
    value: "streamlit",
    label: "Streamlit",
    hint: "Turn Python data scripts into interactive web apps",
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
    value: "peewee",
    label: "Peewee",
    hint: "Small, expressive ORM for SQLite, MySQL, and PostgreSQL",
  },
  {
    value: "pymongo",
    label: "PyMongo",
    hint: "Official MongoDB driver for Python",
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
  {
    value: "haystack",
    label: "Haystack",
    hint: "Composable LLM pipelines, RAG, and search applications",
  },
  {
    value: "pydantic-ai",
    label: "Pydantic AI",
    hint: "Type-safe AI agents from the Pydantic team",
  },
  {
    value: "google-adk",
    label: "Google ADK",
    hint: "Google Agent Development Kit for multi-agent systems",
  },
  {
    value: "smolagents",
    label: "smolagents",
    hint: "HuggingFace's minimal, hackable agent library",
  },
  {
    value: "pytorch",
    label: "PyTorch",
    hint: "Tensor computation and deep learning platform",
  },
  {
    value: "transformers",
    label: "Transformers",
    hint: "Hugging Face pretrained model toolkit",
  },
  {
    value: "scikit-learn",
    label: "scikit-learn",
    hint: "Classical machine learning algorithms and pipelines",
  },
  {
    value: "tensorflow",
    label: "TensorFlow",
    hint: "End-to-end machine learning platform",
  },
  {
    value: "mcp",
    label: "MCP Python SDK",
    hint: "Official Model Context Protocol SDK",
  },
];

const PYTHON_AUTH_PROMPT_OPTIONS: PromptOption<PythonAuth>[] = [
  {
    value: "authlib",
    label: "Authlib",
    hint: "Comprehensive auth library - OAuth1/2, OIDC, JWS, JWK, JWT",
  },
  {
    value: "jwt",
    label: "JWT (python-jose)",
    hint: "Simple JWT token creation and verification",
  },
  {
    value: "pyjwt",
    label: "PyJWT",
    hint: "Focused JSON Web Token encoding and decoding",
  },
  {
    value: "fastapi-users",
    label: "FastAPI Users",
    hint: "Ready-to-use auth for FastAPI: JWT, cookies, OAuth, verification",
  },
  {
    value: "none",
    label: "None",
    hint: "No authentication library",
  },
];

const PYTHON_API_PROMPT_OPTIONS: PromptOption<PythonApi>[] = [
  {
    value: "django-rest-framework",
    label: "Django REST Framework",
    hint: "Mature, widely used toolkit for building Django REST APIs",
  },
  {
    value: "django-ninja",
    label: "Django Ninja",
    hint: "FastAPI-style Django APIs with type hints and automatic OpenAPI docs",
  },
  {
    value: "none",
    label: "None",
    hint: "No additional Python API framework",
  },
];

const PYTHON_TASK_QUEUE_PROMPT_OPTIONS: PromptOption<PythonTaskQueue>[] = [
  {
    value: "celery",
    label: "Celery",
    hint: "Distributed task queue for Python",
  },
  {
    value: "rq",
    label: "RQ",
    hint: "Simple Redis-backed job queue for Python",
  },
  {
    value: "dramatiq",
    label: "Dramatiq",
    hint: "Distributed task processing with Redis or RabbitMQ brokers",
  },
  {
    value: "huey",
    label: "Huey",
    hint: "Lightweight task queue with Redis-backed scheduling",
  },
  {
    value: "taskiq",
    label: "Taskiq",
    hint: "Fully async task queue that pairs with FastAPI and aiohttp",
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
    value: "ariadne",
    label: "Ariadne",
    hint: "Schema-first GraphQL server library for Python",
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
    value: "mypy",
    label: "mypy",
    hint: "Static type checker for Python",
  },
  {
    value: "pyright",
    label: "Pyright",
    hint: "Fast Python type checker from Microsoft",
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
  return createStaticSinglePromptResolution(PYTHON_ORM_PROMPT_OPTIONS, "sqlalchemy", pythonOrm);
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
  return createStaticSinglePromptResolution(PYTHON_AUTH_PROMPT_OPTIONS, "none", pythonAuth);
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

export function resolvePythonApiPrompt(pythonApi?: PythonApi) {
  return createStaticSinglePromptResolution(PYTHON_API_PROMPT_OPTIONS, "none", pythonApi);
}

export async function getPythonApiChoice(pythonApi?: PythonApi) {
  const resolution = resolvePythonApiPrompt(pythonApi);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<PythonApi>({
    message: "Select Python API framework",
    options: resolution.options,
    initialValue: resolution.initialValue as PythonApi,
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
  return createStaticSinglePromptResolution(PYTHON_GRAPHQL_PROMPT_OPTIONS, "none", pythonGraphql);
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
  return createStaticSinglePromptResolution(PYTHON_QUALITY_PROMPT_OPTIONS, "ruff", pythonQuality);
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

const PYTHON_TESTING_PROMPT_OPTIONS: PromptOption<PythonTesting>[] = [
  {
    value: "pytest",
    label: "pytest",
    hint: "Fixture scaffolding (conftest.py) and example tests",
  },
  {
    value: "hypothesis",
    label: "Hypothesis",
    hint: "Property-based testing that generates edge-case inputs",
  },
  {
    value: "pytest-cov",
    label: "pytest-cov",
    hint: "Coverage reporting for pytest",
  },
  {
    value: "none",
    label: "None",
    hint: "No extra testing scaffolding",
  },
];

const PYTHON_CACHING_PROMPT_OPTIONS: PromptOption<PythonCaching>[] = [
  {
    value: "redis",
    label: "redis-py",
    hint: "Standard Redis client with sync and async APIs",
  },
  {
    value: "aiocache",
    label: "aiocache",
    hint: "Async cache manager with Redis, memcached, and memory backends",
  },
  {
    value: "none",
    label: "None",
    hint: "No caching library",
  },
];

const PYTHON_REALTIME_PROMPT_OPTIONS: PromptOption<PythonRealtime>[] = [
  {
    value: "python-socketio",
    label: "python-socketio",
    hint: "Socket.IO server that works with FastAPI, Flask, and Django",
  },
  {
    value: "websockets",
    label: "websockets",
    hint: "Production-ready async WebSocket client/server library",
  },
  {
    value: "none",
    label: "None",
    hint: "No realtime layer",
  },
];

const PYTHON_OBSERVABILITY_PROMPT_OPTIONS: PromptOption<PythonObservability>[] = [
  {
    value: "opentelemetry",
    label: "OpenTelemetry",
    hint: "Official OTel SDK with OTLP export and auto-instrumentation",
  },
  {
    value: "signoz",
    label: "SigNoz",
    hint: "OpenTelemetry tracing configured for SigNoz Cloud or self-hosting",
  },
  {
    value: "prometheus-client",
    label: "Prometheus Client",
    hint: "Prometheus metrics instrumentation and exposition",
  },
  {
    value: "none",
    label: "None",
    hint: "No tracing/metrics SDK",
  },
];

const PYTHON_CLI_PROMPT_OPTIONS: PromptOption<PythonCli>[] = [
  {
    value: "typer",
    label: "Typer",
    hint: "Type-hint driven CLIs from FastAPI's creator",
  },
  {
    value: "click",
    label: "Click",
    hint: "Composable command line interfaces",
  },
  {
    value: "rich",
    label: "Rich",
    hint: "Beautiful terminal output: tables, progress bars, highlighting",
  },
  {
    value: "none",
    label: "None",
    hint: "No CLI tooling",
  },
];

const PYTHON_CLOUD_SDK_PROMPT_OPTIONS: PromptOption<PythonCloudSdk>[] = [
  { value: "boto3", label: "Boto3", hint: "Official AWS SDK for Python" },
  { value: "none", label: "None", hint: "No cloud SDK" },
];

const PYTHON_HTTP_CLIENT_PROMPT_OPTIONS: PromptOption<PythonHttpClient>[] = [
  { value: "requests", label: "Requests", hint: "Simple, widely adopted synchronous HTTP client" },
  { value: "none", label: "None", hint: "No HTTP client" },
];

const PYTHON_DATA_PROMPT_OPTIONS: PromptOption<PythonData>[] = [
  { value: "numpy", label: "NumPy", hint: "N-dimensional arrays and numerical computing" },
  { value: "pandas", label: "pandas", hint: "DataFrames and data analysis tools" },
  {
    value: "scipy",
    label: "SciPy",
    hint: "Scientific algorithms for optimization, statistics, and signals",
  },
  { value: "none", label: "None", hint: "No data/scientific libraries" },
];

const PYTHON_MEDIA_PROMPT_OPTIONS: PromptOption<PythonMedia>[] = [
  { value: "pillow", label: "Pillow", hint: "Image loading, processing, and export" },
  { value: "none", label: "None", hint: "No media library" },
];

const PYTHON_SERVER_PROMPT_OPTIONS: PromptOption<PythonServer>[] = [
  { value: "gunicorn", label: "Gunicorn", hint: "Production WSGI/ASGI process manager" },
  { value: "none", label: "None", hint: "No production server" },
];

const PYTHON_PACKAGE_MANAGER_PROMPT_OPTIONS: PromptOption<PythonPackageManager>[] = [
  { value: "uv", label: "uv", hint: "Fast Python package and project manager" },
  { value: "poetry", label: "Poetry", hint: "Dependency management and packaging workflow" },
  { value: "none", label: "None", hint: "Do not configure a Python package manager" },
];

const PYTHON_MESSAGE_QUEUE_PROMPT_OPTIONS: PromptOption<PythonMessageQueue>[] = [
  {
    value: "confluent-kafka",
    label: "Confluent Kafka",
    hint: "High-performance Apache Kafka producer and consumer client",
  },
  { value: "none", label: "None", hint: "No message queue client" },
];

export function resolvePythonTestingPrompt(pythonTesting?: PythonTesting[]) {
  return createStaticMultiPromptResolution(PYTHON_TESTING_PROMPT_OPTIONS, [], pythonTesting);
}

export async function getPythonTestingChoice(pythonTesting?: PythonTesting[]) {
  const resolution = resolvePythonTestingPrompt(pythonTesting);
  if (!resolution.shouldPrompt) {
    return (resolution.autoValue as PythonTesting[]) ?? [];
  }

  const response = await navigableMultiselect<PythonTesting>({
    message: "Select Python testing libraries",
    options: resolution.options,
    required: false,
    initialValues: resolution.initialValue as PythonTesting[],
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response.includes("none") ? [] : response;
}

export function resolvePythonCachingPrompt(pythonCaching?: PythonCaching) {
  return createStaticSinglePromptResolution(PYTHON_CACHING_PROMPT_OPTIONS, "none", pythonCaching);
}

export async function getPythonCachingChoice(pythonCaching?: PythonCaching) {
  const resolution = resolvePythonCachingPrompt(pythonCaching);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<PythonCaching>({
    message: "Select Python caching library",
    options: resolution.options,
    initialValue: resolution.initialValue as PythonCaching,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolvePythonRealtimePrompt(pythonRealtime?: PythonRealtime) {
  return createStaticSinglePromptResolution(PYTHON_REALTIME_PROMPT_OPTIONS, "none", pythonRealtime);
}

export async function getPythonRealtimeChoice(pythonRealtime?: PythonRealtime) {
  const resolution = resolvePythonRealtimePrompt(pythonRealtime);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<PythonRealtime>({
    message: "Select Python realtime library",
    options: resolution.options,
    initialValue: resolution.initialValue as PythonRealtime,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolvePythonObservabilityPrompt(pythonObservability?: PythonObservability) {
  return createStaticSinglePromptResolution(
    PYTHON_OBSERVABILITY_PROMPT_OPTIONS,
    "none",
    pythonObservability,
  );
}

export async function getPythonObservabilityChoice(pythonObservability?: PythonObservability) {
  const resolution = resolvePythonObservabilityPrompt(pythonObservability);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<PythonObservability>({
    message: "Select Python observability",
    options: resolution.options,
    initialValue: resolution.initialValue as PythonObservability,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function resolvePythonCliPrompt(pythonCli?: PythonCli[]) {
  return createStaticMultiPromptResolution(PYTHON_CLI_PROMPT_OPTIONS, [], pythonCli);
}

export async function getPythonCliChoice(pythonCli?: PythonCli[]) {
  const resolution = resolvePythonCliPrompt(pythonCli);
  if (!resolution.shouldPrompt) {
    return (resolution.autoValue as PythonCli[]) ?? [];
  }

  const response = await navigableMultiselect<PythonCli>({
    message: "Select Python CLI tooling",
    options: resolution.options,
    required: false,
    initialValues: resolution.initialValue as PythonCli[],
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response.includes("none") ? [] : response;
}

export function resolvePythonCloudSdkPrompt(value?: PythonCloudSdk) {
  return createStaticSinglePromptResolution(PYTHON_CLOUD_SDK_PROMPT_OPTIONS, "none", value);
}

export async function getPythonCloudSdkChoice(value?: PythonCloudSdk) {
  const resolution = resolvePythonCloudSdkPrompt(value);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<PythonCloudSdk>({
    message: "Select Python cloud SDK",
    options: resolution.options,
    initialValue: resolution.initialValue as PythonCloudSdk,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export function resolvePythonHttpClientPrompt(value?: PythonHttpClient) {
  return createStaticSinglePromptResolution(PYTHON_HTTP_CLIENT_PROMPT_OPTIONS, "none", value);
}

export async function getPythonHttpClientChoice(value?: PythonHttpClient) {
  const resolution = resolvePythonHttpClientPrompt(value);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<PythonHttpClient>({
    message: "Select Python HTTP client",
    options: resolution.options,
    initialValue: resolution.initialValue as PythonHttpClient,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export function resolvePythonDataPrompt(value?: PythonData[]) {
  return createStaticMultiPromptResolution(PYTHON_DATA_PROMPT_OPTIONS, [], value);
}

export async function getPythonDataChoice(value?: PythonData[]) {
  const resolution = resolvePythonDataPrompt(value);
  if (!resolution.shouldPrompt) return (resolution.autoValue as PythonData[]) ?? [];
  const response = await navigableMultiselect<PythonData>({
    message: "Select Python data and scientific libraries",
    options: resolution.options,
    required: false,
    initialValues: resolution.initialValue as PythonData[],
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response.includes("none") ? [] : response;
}

export function resolvePythonMediaPrompt(value?: PythonMedia) {
  return createStaticSinglePromptResolution(PYTHON_MEDIA_PROMPT_OPTIONS, "none", value);
}

export async function getPythonMediaChoice(value?: PythonMedia) {
  const resolution = resolvePythonMediaPrompt(value);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<PythonMedia>({
    message: "Select Python media library",
    options: resolution.options,
    initialValue: resolution.initialValue as PythonMedia,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export function resolvePythonServerPrompt(value?: PythonServer) {
  return createStaticSinglePromptResolution(PYTHON_SERVER_PROMPT_OPTIONS, "none", value);
}

export async function getPythonServerChoice(value?: PythonServer) {
  const resolution = resolvePythonServerPrompt(value);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<PythonServer>({
    message: "Select Python production server",
    options: resolution.options,
    initialValue: resolution.initialValue as PythonServer,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export function resolvePythonPackageManagerPrompt(value?: PythonPackageManager) {
  return createStaticSinglePromptResolution(PYTHON_PACKAGE_MANAGER_PROMPT_OPTIONS, "uv", value);
}

export async function getPythonPackageManagerChoice(value?: PythonPackageManager) {
  const resolution = resolvePythonPackageManagerPrompt(value);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "uv";
  const response = await navigableSelect<PythonPackageManager>({
    message: "Select Python package manager",
    options: resolution.options,
    initialValue: resolution.initialValue as PythonPackageManager,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export function resolvePythonMessageQueuePrompt(value?: PythonMessageQueue) {
  return createStaticSinglePromptResolution(PYTHON_MESSAGE_QUEUE_PROMPT_OPTIONS, "none", value);
}

export async function getPythonMessageQueueChoice(value?: PythonMessageQueue) {
  const resolution = resolvePythonMessageQueuePrompt(value);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";
  const response = await navigableSelect<PythonMessageQueue>({
    message: "Select Python message queue client",
    options: resolution.options,
    initialValue: resolution.initialValue as PythonMessageQueue,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}
