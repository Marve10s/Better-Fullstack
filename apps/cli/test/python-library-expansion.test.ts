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
});
