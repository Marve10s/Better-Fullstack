import { describe, expect, it } from "bun:test";

import { createVirtual } from "../src/index";
import {
  PythonAiSchema,
  PythonAuthSchema,
  PythonCloudSdkSchema,
  PythonDataSchema,
  PythonHttpClientSchema,
  PythonMediaSchema,
  PythonMessageQueueSchema,
  PythonObservabilitySchema,
  PythonOrmSchema,
  PythonPackageManagerSchema,
  PythonServerSchema,
  PythonTestingSchema,
  PythonWebFrameworkSchema,
  parseStackPartSpecs,
} from "../src/types";
import {
  getVirtualFileContent as getFileContent,
  hasVirtualFile as hasFile,
} from "./virtual-tree-utils";

describe("Python library expansion", () => {
  it("exposes all 20 additions in the shared schemas", () => {
    expect(PythonWebFrameworkSchema.options).toEqual(
      expect.arrayContaining(["aiohttp", "streamlit"]),
    );
    expect(PythonOrmSchema.options).toContain("pymongo");
    expect(PythonAiSchema.options).toEqual(
      expect.arrayContaining(["pytorch", "transformers", "scikit-learn", "tensorflow", "mcp"]),
    );
    expect(PythonAuthSchema.options).toContain("pyjwt");
    expect(PythonTestingSchema.options).toContain("pytest-cov");
    expect(PythonObservabilitySchema.options).toContain("prometheus-client");
    expect(PythonCloudSdkSchema.options).toContain("boto3");
    expect(PythonHttpClientSchema.options).toContain("requests");
    expect(PythonDataSchema.options).toEqual(expect.arrayContaining(["numpy", "pandas", "scipy"]));
    expect(PythonMediaSchema.options).toContain("pillow");
    expect(PythonServerSchema.options).toContain("gunicorn");
    expect(PythonPackageManagerSchema.options).toContain("poetry");
    expect(PythonMessageQueueSchema.options).toContain("confluent-kafka");
  });

  it("generates runnable aiohttp, SDK, data, AI, media, metrics, and Kafka starters", async () => {
    const result = await createVirtual({
      projectName: "python-expansion",
      ecosystem: "python",
      database: "mongodb",
      pythonWebFramework: "aiohttp",
      pythonOrm: "pymongo",
      pythonValidation: "none",
      pythonAi: ["pytorch", "transformers", "scikit-learn", "tensorflow", "mcp"],
      pythonAuth: "pyjwt",
      pythonTesting: ["pytest-cov"],
      pythonObservability: "prometheus-client",
      pythonCloudSdk: "boto3",
      pythonHttpClient: "requests",
      pythonData: ["numpy", "pandas", "scipy"],
      pythonMedia: "pillow",
      pythonServer: "gunicorn",
      pythonPackageManager: "poetry",
      pythonMessageQueue: "confluent-kafka",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    const pyproject = getFileContent(root, "pyproject.toml");
    const main = getFileContent(root, "src/app/main.py");
    const readme = getFileContent(root, "README.md");
    const env = getFileContent(root, ".env.example");

    for (const dependency of [
      "aiohttp",
      "pymongo",
      "torch",
      "transformers",
      "scikit-learn",
      "tensorflow",
      "mcp",
      "PyJWT[crypto]",
      "prometheus-client",
      "boto3",
      "requests",
      "numpy",
      "pandas",
      "scipy",
      "pillow",
      "gunicorn",
      "confluent-kafka",
      "pytest-cov",
    ]) {
      expect(pyproject).toContain(dependency);
    }

    expect(pyproject).toContain('build-backend = "poetry.core.masonry.api"');
    expect(pyproject).toContain('packages = [{ include = "app", from = "src" }]');
    expect(pyproject).toContain('addopts = "--cov=app --cov-report=term-missing"');
    expect(main).toContain("from aiohttp import web");
    expect(main).toContain("app = create_app()");
    expect(readme).toContain("poetry install --extras dev");
    expect(readme).toContain(
      "poetry run gunicorn app.main:app --worker-class aiohttp.GunicornWebWorker",
    );
    expect(env).toContain("MONGODB_URI=mongodb://localhost:27017");
    expect(env).toContain("KAFKA_BOOTSTRAP_SERVERS=localhost:9092");
    expect(env).toContain("HF_MODEL_ID=distilgpt2");

    const expectedFiles = [
      "src/app/aws.py",
      "src/app/http_client.py",
      "src/app/data_tools.py",
      "src/app/media.py",
      "src/app/kafka.py",
      "src/app/pytorch_model.py",
      "src/app/transformers_client.py",
      "src/app/sklearn_model.py",
      "src/app/tensorflow_model.py",
      "src/app/mcp_server.py",
      "src/app/metrics.py",
      "src/app/database.py",
      "src/app/auth.py",
    ];
    for (const file of expectedFiles) expect(hasFile(root, file)).toBe(true);

    expect(getFileContent(root, "src/app/aws.py")).toContain('boto3.client("s3"');
    expect(getFileContent(root, "src/app/http_client.py")).toContain(
      "HTTPAdapter(max_retries=retry)",
    );
    expect(getFileContent(root, "src/app/data_tools.py")).toContain("def normalize(");
    expect(getFileContent(root, "src/app/data_tools.py")).toContain("def records_to_dataframe(");
    expect(getFileContent(root, "src/app/data_tools.py")).toContain("def z_scores(");
    expect(getFileContent(root, "src/app/media.py")).toContain("image.thumbnail(size)");
    expect(getFileContent(root, "src/app/kafka.py")).toContain("producer.produce(");
    expect(getFileContent(root, "src/app/mcp_server.py")).toContain("@mcp.tool()");
    expect(getFileContent(root, "src/app/database.py")).toContain("MongoClient(");
    expect(getFileContent(root, "src/app/auth.py")).toContain("except InvalidTokenError:");
  });

  it("generates a native Streamlit entrypoint", async () => {
    const result = await createVirtual({
      projectName: "python-streamlit",
      ecosystem: "python",
      pythonWebFramework: "streamlit",
      pythonOrm: "none",
      pythonValidation: "none",
      pythonAi: [],
      pythonServer: "none",
      pythonPackageManager: "uv",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(getFileContent(root, "pyproject.toml")).toContain('"streamlit>=');
    expect(getFileContent(root, "src/app/main.py")).toContain("st.set_page_config(");
    expect(getFileContent(root, "README.md")).toContain("uv run streamlit run src/app/main.py");
  });

  it("binds FastAPI and Litestar auth tokens from the Authorization header", async () => {
    const fastapi = await createVirtual({
      projectName: "python-fastapi-pymongo-auth",
      ecosystem: "python",
      database: "mongodb",
      pythonWebFramework: "fastapi",
      pythonOrm: "pymongo",
      pythonValidation: "none",
      pythonAi: [],
      pythonAuth: "pyjwt",
    });
    const litestar = await createVirtual({
      projectName: "python-litestar-auth",
      ecosystem: "python",
      pythonWebFramework: "litestar",
      pythonOrm: "none",
      pythonValidation: "none",
      pythonAi: [],
      pythonAuth: "pyjwt",
    });

    expect(fastapi.success).toBe(true);
    expect(litestar.success).toBe(true);

    const fastapiMain = getFileContent(fastapi.tree!.root, "src/app/main.py");
    expect(fastapiMain).toContain("from fastapi import FastAPI, HTTPException, Header");
    expect(fastapiMain).toContain('authorization: str = Header(default="")');

    const litestarMain = getFileContent(litestar.tree!.root, "src/app/main.py");
    expect(litestarMain).toContain("from typing import Annotated");
    expect(litestarMain).toContain("from litestar.params import Parameter");
    expect(litestarMain).toContain(
      'authorization: Annotated[str, Parameter(header="Authorization")] = ""',
    );
  });

  it("keeps the PyMongo-only FastAPI import free of unused auth exceptions", async () => {
    const result = await createVirtual({
      projectName: "python-fastapi-pymongo",
      ecosystem: "python",
      database: "mongodb",
      pythonWebFramework: "fastapi",
      pythonOrm: "pymongo",
      pythonValidation: "none",
      pythonAi: [],
      pythonAuth: "none",
    });

    expect(result.success).toBe(true);
    expect(getFileContent(result.tree!.root, "src/app/main.py")).toContain(
      "from fastapi import FastAPI",
    );
    expect(getFileContent(result.tree!.root, "src/app/main.py")).not.toContain("HTTPException");
  });

  it("installs Starlette's real test client and mypy integration support", async () => {
    const starlette = await createVirtual({
      projectName: "python-starlette",
      ecosystem: "python",
      pythonWebFramework: "starlette",
      pythonOrm: "none",
      pythonValidation: "none",
      pythonAi: [],
      pythonAuth: "none",
    });
    const mypy = await createVirtual({
      projectName: "python-mypy-integrations",
      ecosystem: "python",
      pythonWebFramework: "none",
      pythonOrm: "none",
      pythonValidation: "none",
      pythonAi: [],
      pythonAuth: "none",
      pythonQuality: "mypy",
      pythonCloudSdk: "boto3",
      pythonHttpClient: "requests",
      pythonData: ["pandas"],
      pythonMessageQueue: "confluent-kafka",
    });

    expect(starlette.success).toBe(true);
    expect(mypy.success).toBe(true);

    const starlettePyproject = getFileContent(starlette.tree!.root, "pyproject.toml");
    expect(starlettePyproject).toContain('"httpx>=0.27.0"');
    expect(starlettePyproject).not.toContain("httpx2");

    const mypyPyproject = getFileContent(mypy.tree!.root, "pyproject.toml");
    expect(mypyPyproject).toContain('"types-requests>=2.32.0"');
    expect(mypyPyproject).toContain('"pandas-stubs>=2.2.3"');
    expect(mypyPyproject).toContain('"numpy<2.5"');
    expect(mypyPyproject).toContain('module = ["boto3", "boto3.*", "botocore", "botocore.*"]');
    expect(mypyPyproject).toContain("ignore_missing_imports = true");
    expect(mypyPyproject).toContain('"types-confluent-kafka>=1.4.1"');
  });

  it("documents dev-extra installation for uv and package-manager none", async () => {
    const uv = await createVirtual({
      projectName: "python-uv-readme",
      ecosystem: "python",
      pythonWebFramework: "none",
      pythonOrm: "none",
      pythonValidation: "none",
      pythonAi: [],
      pythonPackageManager: "uv",
    });
    const none = await createVirtual({
      projectName: "python-none-readme",
      ecosystem: "python",
      pythonWebFramework: "none",
      pythonOrm: "none",
      pythonValidation: "none",
      pythonAi: [],
      pythonPackageManager: "none",
    });

    expect(uv.success).toBe(true);
    expect(none.success).toBe(true);
    expect(getFileContent(uv.tree!.root, "README.md")).toContain("uv sync --extra dev");
    expect(getFileContent(none.tree!.root, "README.md")).toContain(
      'python -m venv .venv && .venv/bin/pip install -e ".[dev]"',
    );
    expect(getFileContent(none.tree!.root, "README.md")).toContain(".venv/bin/pytest");
  });

  it("uses the virtualenv executables in graph backend READMEs without a package manager", async () => {
    const result = await createVirtual({
      projectName: "python-none-graph-readme",
      ecosystem: "typescript",
      frontend: ["react-vite"],
      backend: "none",
      api: "none",
      runtime: "none",
      pythonPackageManager: "none",
      stackParts: parseStackPartSpecs(["frontend:typescript:react-vite", "backend:python:fastapi"]),
    });

    expect(result.success).toBe(true);
    const readme = getFileContent(result.tree!.root, "apps/server/README.md");
    expect(readme).toContain(".venv/bin/uvicorn app.main:app");
    expect(readme).toContain("replace `.venv/bin/` below with `.venv\\Scripts\\`");
  });
});
