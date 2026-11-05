import {
  getVirtualTreeFileContent as content,
  listVirtualTreeFilePaths,
} from "@test/support/virtual-tree-utils";
import { afterAll, describe, expect, it } from "bun:test";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { z } from "zod";

import {
  buildBtsConfigForPersistence,
  serializeBtsConfig,
  previewBtsConfigUpdate,
} from "@/config/bts-config";
import { validateFullConfig } from "@/config/config-validation";
import { create, createVirtual } from "@/index";
import { generateReproducibleCommand } from "@/lifecycle/generate-reproducible-command";
import { planProjectOperation } from "@/operations/project-create";
import {
  buildProjectConfig,
  getSchemaOptions,
  getInstallCommand,
  validateMcpProjectConfigCompatibility,
} from "@/operations/stack-helpers";
import { MCP_PLAN_CREATE_SCHEMA, MCP_STACK_UPDATE_SCHEMA } from "@/operations/stack-input";
import { runWithContext } from "@/presentation/context";
import { CLIError } from "@/presentation/errors";
import { gatherConfig } from "@/prompts/core/config-prompts";
import { resolveRubyWebFrameworkPrompt } from "@/prompts/ecosystems/ruby-ecosystem";
import {
  ProjectConfigSchema,
  getEcosystemDefaultStackSelection,
  stackSelectionToProjectConfig,
  parseStackPartSpecs,
  RUBY_RECIPE_EXTENSION_REASON,
  type ProjectConfig,
} from "@/types";

const config = () =>
  stackSelectionToProjectConfig(getEcosystemDefaultStackSelection("ruby"), {
    projectDir: "/virtual",
    relativePath: "ruby-service",
    install: false,
  });
const temporaryDirectories: string[] = [];
afterAll(async () => {
  await Promise.all(temporaryDirectories.map((dir) => rm(dir, { recursive: true, force: true })));
});

describe("Ruby language integration", () => {
  it.each([
    { mobilePush: "expo-notifications" },
    { mobileLibraries: ["expo-camera"] },
  ] satisfies Partial<ProjectConfig>[])(
    "rejects mobile integrations instead of returning a partial Ruby project %j",
    async (mobile) => {
      const result = await createVirtual({ ecosystem: "ruby", ...mobile });
      expect(result.success).toBe(false);
      expect(result.error).toBe(RUBY_RECIPE_EXTENSION_REASON);
      expect(result.tree).toBeUndefined();
    },
  );

  it("uses the CLI error contract when normalized Ruby validation fails", () => {
    runWithContext({ silent: true }, () => {
      expect(() => validateFullConfig({ ...config(), database: "sqlite" }, new Set(), {})).toThrow(
        CLIError,
      );
    });
  });

  it("keeps every generated frontend in the Ruby CORS allowlist", async () => {
    const result = await createVirtual({
      stackParts: parseStackPartSpecs([
        "frontend:typescript:react-vite",
        "frontend:dotnet:blazor-webassembly",
        "backend:ruby:sinatra",
      ]),
      aiDocs: ["none"],
    });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No Ruby graph");
    expect(content(result.tree, "apps/server/http_policy.rb")).toContain(
      "http://localhost:5173,http://localhost:5174",
    );
  });

  it("rejects invalid Ruby input before overwriting an existing directory", async () => {
    const root = await mkdtemp(join(tmpdir(), "bfs-ruby-overwrite-"));
    temporaryDirectories.push(root);
    const destination = join(root, "service");
    await mkdir(destination);
    await writeFile(join(destination, "keep.txt"), "preserve me");
    const result = await create(destination, {
      ecosystem: "ruby",
      rubyWebFramework: "sinatra",
      database: "sqlite",
      directoryConflict: "overwrite",
      install: false,
      git: false,
      aiDocs: ["none"],
      packageManager: "bun",
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain(RUBY_RECIPE_EXTENSION_REASON);
    expect(await readFile(join(destination, "keep.txt"), "utf8")).toBe("preserve me");
  });

  it("offers only a runnable standalone framework while composer can disable the backend", () => {
    expect(resolveRubyWebFrameworkPrompt().options.map((option) => option.value)).toEqual([
      "sinatra",
      "rails",
      "roda",
      "grape",
    ]);
    expect(
      resolveRubyWebFrameworkPrompt(undefined, true).options.map((option) => option.value),
    ).toEqual(["sinatra", "rails", "roda", "grape", "none"]);
  });

  it("plans a Bundler-owned native service through the actual MCP operation", async () => {
    const result = await planProjectOperation.invoke({
      projectName: "ruby-mcp",
      ecosystem: "ruby",
      rubyWebFramework: "sinatra",
    });
    expect(result.failed).toBe(false);
    expect(result.output.files).toContain("Gemfile");
    expect(result.output.files).toContain("app.rb");
    expect(result.output.files).not.toContain("package.json");
    expect(result.output.stackPartSpecs).toContain("backend:ruby:sinatra");
  });

  it("rejects tooling-only overlays on a flat Ruby service before generation", async () => {
    const result = await createVirtual({
      ecosystem: "ruby",
      rubyWebFramework: "sinatra",
      stackParts: parseStackPartSpecs(["codeQuality:universal:biome"]),
    });
    expect(result.success).toBe(false);
    expect(result.error).toBe(RUBY_RECIPE_EXTENSION_REASON);
    expect(result.tree).toBeUndefined();
    await expect(
      planProjectOperation.invoke({
        ecosystem: "ruby",
        rubyWebFramework: "sinatra",
        part: ["codeQuality:universal:biome"],
      }),
    ).rejects.toThrow(RUBY_RECIPE_EXTENSION_REASON);
  });

  it("rejects a Ruby-only database through virtual generation and the actual MCP plan", async () => {
    const specs = ["backend:ruby:sinatra", "database:universal:sqlite"];
    const result = await createVirtual({ stackParts: parseStackPartSpecs(specs) });
    expect(result.success).toBe(false);
    expect(result.error).toContain(RUBY_RECIPE_EXTENSION_REASON);
    expect(result.tree).toBeUndefined();
    await expect(
      planProjectOperation.invoke({ projectName: "ruby-mcp", part: specs }),
    ).rejects.toThrow(RUBY_RECIPE_EXTENSION_REASON);
  });

  it("resolves an explicit Ruby prompt flow to a valid complete config without TypeScript choices", async () => {
    const gathered = await gatherConfig(
      {
        ecosystem: "ruby",
        rubyWebFramework: "sinatra",
        git: false,
        install: false,
        aiDocs: ["none"],
        packageManager: "bun",
      },
      "ruby-service",
      "/virtual",
      "ruby-service",
    );
    const parsed = ProjectConfigSchema.parse({ ...gathered, versionChannel: "stable" });
    expect(parsed.rubyWebFramework).toBe("sinatra");
    expect(parsed.javaLanguage).toBe("java");
    expect(parsed.backend).toBe("none");
    expect(parsed.database).toBe("none");
    expect(parsed.frontend).toEqual([]);
  });

  it("emits an entirely native standalone service and preserves its authored README", async () => {
    const result = await createVirtual({
      ecosystem: "ruby",
      projectName: "ruby-service",
      rubyWebFramework: "sinatra",
      aiDocs: ["agents-md"],
    });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No Ruby project");
    const paths = listVirtualTreeFilePaths(result.tree);
    for (const path of [
      "Gemfile",
      "app.rb",
      "config.ru",
      "Rakefile",
      "bin/server",
      "bin/proof",
      "test/app_test.rb",
      "README.md",
      "AGENTS.md",
      ".env.example",
    ])
      expect(paths).toContain(path);
    expect(
      paths.some((path) => path.endsWith("package.json") || path.endsWith("tsconfig.json")),
    ).toBe(false);
    expect(content(result.tree, "README.md")).toContain("bundle exec ruby bin/server");
    expect(content(result.tree, "README.md")).toContain("bundle exec ruby bin/proof");
    expect(content(result.tree, "README.md")).not.toContain("bun run dev");
    expect(content(result.tree, "Gemfile")).toContain('gem "sinatra", "4.2.1"');
    expect(content(result.tree, "AGENTS.md")).toContain("bundle exec rake test");
  });

  it.each([
    { framework: "rails", gem: 'gem "railties", "8.1.4"', app: "class Application < Rails::Application" },
    { framework: "roda", gem: 'gem "roda", "3.109.0"', app: "class App < Roda" },
    { framework: "grape", gem: 'gem "grape", "4.0.1"', app: "class Api < Grape::API" },
  ] as const)("emits the $framework app behind the shared Rack policy", async ({ framework, gem, app }) => {
    const result = await createVirtual({
      ecosystem: "ruby",
      projectName: "ruby-service",
      rubyWebFramework: framework,
      aiDocs: ["none"],
    });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No Ruby project");
    const gemfile = content(result.tree, "Gemfile");
    expect(gemfile).toContain(gem);
    expect(gemfile).not.toContain('gem "sinatra"');
    expect(content(result.tree, "app.rb")).toContain(app);
    expect(content(result.tree, "app.rb")).toContain("HttpPolicy");
    expect(content(result.tree, "test/app_test.rb")).toContain(`"service" => "${framework}"`);
    expect(content(result.tree, "bin/proof")).toContain(`"service" => "${framework}"`);
    expect(listVirtualTreeFilePaths(result.tree).some((path) => path.startsWith("web/"))).toBe(
      false,
    );
    expect(generateReproducibleCommand({ ...config(), rubyWebFramework: framework })).toContain(
      `--ruby-web-framework ${framework}`,
    );
  });

  it.each([
    { orm: "active-record", gem: 'gem "activerecord", "8.1.4"', migration: "db/migrate/20261027000000_create_items.rb" },
    { orm: "sequel", gem: 'gem "sequel", "5.109.0"', migration: "db/migrations/001_create_items.rb" },
    { orm: "rom", gem: 'gem "rom-sql", "3.7.0"', migration: "db/migrate/20261027000000_create_items.rb" },
  ] as const)("persists items through $orm on SQLite", async ({ orm, gem, migration }) => {
    const result = await createVirtual({
      ecosystem: "ruby",
      projectName: "ruby-service",
      rubyWebFramework: "roda",
      rubyOrm: orm,
      aiDocs: ["agents-md"],
    });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No Ruby project");
    const paths = listVirtualTreeFilePaths(result.tree);
    for (const path of ["db.rb", "items.rb", migration]) expect(paths).toContain(path);
    expect(paths.some((path) => path.startsWith("orm/"))).toBe(false);
    expect(content(result.tree, "Gemfile")).toContain(gem);
    expect(content(result.tree, "Gemfile")).toContain('gem "sqlite3", "2.10.2"');
    expect(content(result.tree, "app.rb")).toContain('r.is "api/items"');
    expect(content(result.tree, "Rakefile")).toContain("task :migrate");
    expect(content(result.tree, "test/app_test.rb")).toContain("BetterFullstack::Database.migrate!");
    expect(content(result.tree, "bin/proof")).toContain("DATABASE_PATH");
    expect(content(result.tree, "AGENTS.md")).toContain("bundle exec rake db:migrate");
    const project = { ...config(), rubyWebFramework: "roda" as const, rubyOrm: orm };
    expect(generateReproducibleCommand(project)).toContain(`--ruby-orm ${orm}`);
    const persisted = buildBtsConfigForPersistence(project, {
      version: "test",
      createdAt: "2026-10-27T00:00:00.000Z",
    });
    expect(persisted.rubyOrm).toBe(orm);
    expect(
      persisted.stackParts?.find((part) => part.role === "orm" && part.ecosystem === "ruby")
        ?.toolId,
    ).toBe(orm);
  });

  it.each([
    { auth: "jwt", gems: ['gem "jwt", "3.3.0"'], env: "JWT_SECRET=" },
    {
      auth: "omniauth",
      gems: ['gem "omniauth", "2.3.1"', 'gem "omniauth_openid_connect", "0.8.0"'],
      env: "OIDC_ISSUER=",
    },
    { auth: "rodauth", gems: ['gem "rodauth", "2.49.0"', 'gem "sqlite3", "2.10.2"'], env: "SESSION_SECRET=" },
  ] as const)("protects /api/me with $auth on every framework", async ({ auth, gems, env }) => {
    for (const framework of ["sinatra", "rails", "roda", "grape"] as const) {
      const result = await createVirtual({
        ecosystem: "ruby",
        projectName: "ruby-service",
        rubyWebFramework: framework,
        rubyAuth: auth,
        aiDocs: ["agents-md"],
      });
      if (!result.success || !result.tree) throw new Error(result.error ?? "No Ruby project");
      const paths = listVirtualTreeFilePaths(result.tree);
      expect(paths).toContain("auth.rb");
      expect(paths.some((path) => path.startsWith("auth/"))).toBe(false);
      for (const gem of gems) expect(content(result.tree, "Gemfile")).toContain(gem);
      expect(content(result.tree, "app.rb")).toContain("Auth");
      expect(content(result.tree, "app.rb")).toContain("api/me");
      expect(content(result.tree, ".env.example")).toContain(env);
      expect(content(result.tree, "bin/proof")).toContain('authentication: "passed"');
    }
    const project = { ...config(), rubyAuth: auth };
    expect(generateReproducibleCommand(project)).toContain(`--ruby-auth ${auth}`);
    expect(
      buildBtsConfigForPersistence(project, { version: "test", createdAt: "2026-10-27T00:00:00.000Z" })
        .stackParts?.find((part) => part.role === "auth" && part.ecosystem === "ruby")?.toolId,
    ).toBe(auth);
  });

  it("migrates Rodauth accounts alongside the selected ORM", async () => {
    const result = await createVirtual({
      ecosystem: "ruby",
      rubyWebFramework: "sinatra",
      rubyOrm: "active-record",
      rubyAuth: "rodauth",
    });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No Ruby project");
    expect(listVirtualTreeFilePaths(result.tree)).toContain("db/auth_migrations/001_create_accounts.rb");
    const rakefile = content(result.tree, "Rakefile");
    expect(rakefile).toContain("BetterFullstack::Database.migrate!");
    expect(rakefile).toContain("BetterFullstack::Auth.migrate!");
  });

  it.each([
    { testing: "minitest", file: "test/app_test.rb", runner: "class AppTest < Minitest::Test", gem: 'gem "minitest", "6.0.6"' },
    { testing: "test-unit", file: "test/app_test.rb", runner: "class AppTest < Test::Unit::TestCase", gem: 'gem "test-unit", "3.7.8"' },
    { testing: "rspec", file: "spec/app_spec.rb", runner: "RSpec.describe BetterFullstack::App", gem: 'gem "rspec", "3.13.2"' },
  ] as const)("runs the $testing suite through rake test", async ({ testing, file, runner, gem }) => {
    const result = await createVirtual({
      ecosystem: "ruby",
      rubyWebFramework: "grape",
      rubyOrm: "sequel",
      rubyAuth: "jwt",
      rubyTesting: testing,
      aiDocs: ["agents-md"],
    });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No Ruby project");
    const paths = listVirtualTreeFilePaths(result.tree);
    expect(content(result.tree, file)).toContain(runner);
    expect(content(result.tree, file)).toContain("/api/items");
    expect(content(result.tree, file)).toContain("/api/me");
    expect(paths.some((path) => path.startsWith("testing/"))).toBe(false);
    expect(paths.filter((path) => path.startsWith("test/") || path.startsWith("spec/"))).toEqual(
      testing === "rspec" ? ["spec/app_spec.rb", "spec/spec_helper.rb"] : ["test/app_test.rb"],
    );
    expect(content(result.tree, "Gemfile")).toContain(gem);
    expect(content(result.tree, "Rakefile")).toContain("task default: [:build, :test]");
    expect(content(result.tree, "AGENTS.md")).toContain("bundle exec rake test");
    expect(generateReproducibleCommand({ ...config(), rubyTesting: testing })).toContain(
      `--ruby-testing ${testing}`,
    );
  });

  it("generates no test suite or test command when Ruby testing is disabled", async () => {
    const result = await createVirtual({
      stackParts: parseStackPartSpecs([
        "frontend:typescript:react-vite",
        "frontend.css:typescript:tailwind",
        "backend:ruby:roda:api",
      ]),
      rubyTesting: "none",
      aiDocs: ["agents-md"],
    });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No composed project");
    const paths = listVirtualTreeFilePaths(result.tree);
    const rakefile = paths.find((path) => path.endsWith("/Rakefile"));
    if (!rakefile) throw new Error("Missing Ruby Rakefile");
    const root = rakefile.slice(0, -"Rakefile".length);
    expect(paths.some((path) => path.startsWith(`${root}test/`) || path.startsWith(`${root}spec/`))).toBe(false);
    expect(content(result.tree, rakefile)).toContain("task default: [:build]");
    expect(content(result.tree, `${root}Gemfile`)).not.toContain("group :test");
    expect(content(result.tree, "AGENTS.md")).not.toContain("bundle exec rake test");
  });

  it.each([
    { validation: "dry-validation", library: 'require "dry/validation"', gem: 'gem "dry-validation", "1.11.1"' },
    { validation: "active-model", library: "include ActiveModel::Validations", gem: 'gem "activemodel", "8.1.4"' },
    { validation: "json-schemer", library: "JSONSchemer.schema", gem: 'gem "json_schemer", "2.5.0"' },
  ] as const)("routes greeting validation through $validation", async ({ validation, library, gem }) => {
    const result = await createVirtual({
      ecosystem: "ruby",
      rubyWebFramework: "roda",
      rubyValidation: validation,
      aiDocs: ["agents-md"],
    });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No Ruby project");
    const paths = listVirtualTreeFilePaths(result.tree);
    expect(paths.some((path) => path.startsWith("validation/"))).toBe(false);
    expect(content(result.tree, "name_contract.rb")).toContain(library);
    expect(content(result.tree, "name_input.rb")).toContain("NameContract.error_for(payload)");
    expect(content(result.tree, "Gemfile")).toContain(gem);
    expect(content(result.tree, "AGENTS.md")).toContain("name_contract.rb");
    expect(generateReproducibleCommand({ ...config(), rubyValidation: validation })).toContain(
      `--ruby-validation ${validation}`,
    );
  });

  it.each([
    { cache: "redis", client: "Redis.new(", gem: 'gem "redis", "6.0.0"', env: "REDIS_URL=" },
    { cache: "memcached", client: "Dalli::Client.new(", gem: 'gem "dalli", "5.2.2"', env: "MEMCACHED_SERVERS=" },
    { cache: "memory", client: "ActiveSupport::Cache::MemoryStore.new", gem: 'gem "activesupport", "8.1.4"', env: undefined },
  ] as const)("serves GET /api/cache from $cache on every framework", async ({ cache, client, gem, env }) => {
    for (const rubyWebFramework of ["sinatra", "rails", "roda", "grape"] as const) {
      const result = await createVirtual({ ecosystem: "ruby", rubyWebFramework, rubyCache: cache });
      if (!result.success || !result.tree) throw new Error(result.error ?? "No Ruby project");
      expect(listVirtualTreeFilePaths(result.tree).some((path) => path.startsWith("cache/"))).toBe(false);
      expect(content(result.tree, "cache.rb")).toContain(client);
      expect(content(result.tree, "app.rb")).toContain("Cache.demo");
      expect(content(result.tree, "test/app_test.rb")).toContain('get "/api/cache"');
      expect(content(result.tree, "bin/proof")).toContain('http.get("/api/cache")');
      expect(content(result.tree, "Gemfile")).toContain(gem);
      if (env) expect(content(result.tree, ".env.example")).toContain(env);
    }
    expect(generateReproducibleCommand({ ...config(), rubyCache: cache })).toContain(`--ruby-cache ${cache}`);
  });

  it.each([
    { jobs: "sidekiq", framework: "sinatra", orm: "none", backend: "include Sidekiq::Job", gem: 'gem "sidekiq", "8.1.7"' },
    { jobs: "resque", framework: "roda", orm: "sequel", backend: "Resque.enqueue(GreetingJob", gem: 'gem "resque", "3.2.0"' },
    { jobs: "solid-queue", framework: "rails", orm: "active-record", backend: "class GreetingJob < ActiveJob::Base", gem: 'gem "solid_queue", "1.7.0"' },
  ] as const)("runs greeting jobs through $jobs with a worker command", async ({ jobs, framework, orm, backend, gem }) => {
    const result = await createVirtual({
      ecosystem: "ruby",
      rubyWebFramework: framework,
      rubyOrm: orm,
      rubyJobQueue: jobs,
      aiDocs: ["agents-md"],
    });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No Ruby project");
    const paths = listVirtualTreeFilePaths(result.tree);
    expect(paths.some((path) => path.startsWith("jobs/"))).toBe(false);
    expect(content(result.tree, "jobs.rb")).toContain(backend);
    expect(paths).toContain("bin/worker");
    expect(content(result.tree, "app.rb")).toContain("Jobs.create(name)");
    expect(content(result.tree, "bin/proof")).toContain('File.expand_path("worker", __dir__)');
    expect(content(result.tree, "Gemfile")).toContain(gem);
    expect(content(result.tree, "AGENTS.md")).toContain("bundle exec ruby bin/worker");
    expect(paths.includes("db/migrate/20261027000100_create_solid_queue_tables.rb")).toBe(jobs === "solid-queue");
    expect(
      generateReproducibleCommand({ ...config(), rubyWebFramework: framework, rubyOrm: orm, rubyJobQueue: jobs }),
    ).toContain(`--ruby-job-queue ${jobs}`);
  });

  it.each([
    { email: "mail", framework: "sinatra", library: 'require "mail"', proof: "SmtpCapture.new", env: "SMTP_HOST=" },
    { email: "action-mailer", framework: "rails", library: "class WelcomeMailer < ActionMailer::Base", proof: "SmtpCapture.new", env: "SMTP_HOST=" },
    { email: "resend", framework: "roda", library: "Resend::Emails.send(", proof: "HttpCapture.new", env: "RESEND_API_KEY=" },
  ] as const)("sends the welcome email through $email from a rake task", async ({ email, framework, library, proof, env }) => {
    const result = await createVirtual({ ecosystem: "ruby", rubyWebFramework: framework, rubyEmail: email });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No Ruby project");
    const paths = listVirtualTreeFilePaths(result.tree);
    expect(paths.some((path) => path.startsWith("email/"))).toBe(false);
    expect(content(result.tree, "mailer.rb")).toContain(library);
    expect(content(result.tree, "Rakefile")).toContain("namespace :email do");
    expect(content(result.tree, "bin/proof")).toContain(proof);
    expect(content(result.tree, ".env.example")).toContain(env);
    expect(content(result.tree, "app.rb")).not.toContain("Mailer");
    expect(paths.filter((path) => path.startsWith("support/"))).toEqual(
      email === "resend" ? ["support/http_capture.rb"] : ["support/smtp_capture.rb"],
    );
    expect(
      generateReproducibleCommand({ ...config(), rubyWebFramework: framework, rubyEmail: email }),
    ).toContain(`--ruby-email ${email}`);
  });

  it.each([
    { logging: "logger", framework: "sinatra", file: "request_logger.rb", marker: 'require "logger"' },
    { logging: "semantic-logger", framework: "roda", file: "request_logger.rb", marker: 'SemanticLogger["http"]' },
    { logging: "ougai", framework: "grape", file: "request_logger.rb", marker: "Ougai::Logger.new(" },
    { logging: "lograge", framework: "rails", file: "app.rb", marker: "config.lograge.enabled = true" },
  ] as const)("logs every request with $logging", async ({ logging, framework, file, marker }) => {
    const result = await createVirtual({ ecosystem: "ruby", rubyWebFramework: framework, rubyLogging: logging });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No Ruby project");
    const paths = listVirtualTreeFilePaths(result.tree);
    expect(paths.some((path) => path.startsWith("logging/"))).toBe(false);
    expect(paths.includes("request_logger.rb")).toBe(logging !== "lograge");
    expect(content(result.tree, file)).toContain(marker);
    expect(content(result.tree, "bin/proof")).toContain("Request was not logged");
    expect(
      generateReproducibleCommand({ ...config(), rubyWebFramework: framework, rubyLogging: logging }),
    ).toContain(`--ruby-logging ${logging}`);
  });

  it("defaults Ruby projects to Ruby Logger request logging", async () => {
    const result = await createVirtual({ ecosystem: "ruby", rubyWebFramework: "sinatra" });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No Ruby project");
    expect(content(result.tree, "app.rb")).toContain("use RequestLogger");
    expect(content(result.tree, "Gemfile")).toContain('gem "logger", "1.7.0"');
  });

it.each([
  { client: "faraday", framework: "rails", marker: "Faraday.new(", gem: 'gem "faraday", "2.15.1"' },
  { client: "httparty", framework: "sinatra", marker: "HTTParty.get(", gem: 'gem "httparty", "0.24.3"' },
  { client: "httpx", framework: "grape", marker: "HTTPX.with(", gem: 'gem "httpx", "1.9.0"' },
] as const)("calls the upstream API with $client", async ({ client, framework, marker, gem }) => {
  const result = await createVirtual({ ecosystem: "ruby", rubyWebFramework: framework, rubyHttpClient: client });
  if (!result.success || !result.tree) throw new Error(result.error ?? "No Ruby project");
  const paths = listVirtualTreeFilePaths(result.tree);
  expect(paths.some((path) => path.startsWith("http-client/"))).toBe(false);
  expect(content(result.tree, "upstream.rb")).toContain(marker);
  expect(content(result.tree, "upstream.rb")).toContain('ENV.fetch("UPSTREAM_URL", "http://127.0.0.1:4567")');
  expect(content(result.tree, "app.rb")).toContain("Upstream.health");
  expect(content(result.tree, "test/app_test.rb")).toContain("UPSTREAM.requests.pop");
  expect(paths).toContain("support/http_capture.rb");
  expect(content(result.tree, "Gemfile")).toContain(gem);
  expect(
    generateReproducibleCommand({ ...config(), rubyWebFramework: framework, rubyHttpClient: client }),
  ).toContain(`--ruby-http-client ${client}`);
});

  it("rejects Solid Queue outside Rails with Active Record", async () => {
    const result = await createVirtual({
      ecosystem: "ruby",
      rubyWebFramework: "sinatra",
      rubyOrm: "active-record",
      rubyJobQueue: "solid-queue",
    });
    expect(result.success).toBe(false);
    expect(result.error).toBe("Solid Queue requires Ruby Rails.");
  });

  it("keeps hand-written greeting validation when no Ruby validation library is selected", async () => {
    const result = await createVirtual({ ecosystem: "ruby", rubyWebFramework: "sinatra" });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No Ruby project");
    expect(listVirtualTreeFilePaths(result.tree)).not.toContain("name_contract.rb");
    expect(content(result.tree, "name_input.rb")).toContain('payload.keys == ["name"]');
  });

  it("omits the database layer when no Ruby ORM is selected", async () => {
    const result = await createVirtual({ ecosystem: "ruby", rubyWebFramework: "sinatra" });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No Ruby project");
    const paths = listVirtualTreeFilePaths(result.tree);
    expect(paths).not.toContain("db.rb");
    expect(content(result.tree, "Gemfile")).not.toContain("sqlite3");
    expect(content(result.tree, "app.rb")).not.toContain("/api/items");
  });

  it("accepts a Ruby-owned ORM part in a composed graph", async () => {
    const result = await createVirtual({
      stackParts: parseStackPartSpecs([
        "frontend:typescript:react-vite",
        "frontend.css:typescript:tailwind",
        "backend:ruby:grape:api",
        "api.orm:ruby:sequel",
      ]),
      aiDocs: ["none"],
    });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No composed project");
    const api = listVirtualTreeFilePaths(result.tree).find((path) => path.endsWith("/items.rb"));
    if (!api) throw new Error("Missing Ruby items repository");
    const root = api.slice(0, -"items.rb".length);
    expect(content(result.tree, `${root}Gemfile`)).toContain('gem "sequel", "5.109.0"');
    expect(content(result.tree, `${root}app.rb`)).toContain('post "/api/items"');
  });

  it("round-trips persistence and updates without retaining inactive Ruby defaults", () => {
    const project = config();
    const metadata = { version: "test", createdAt: "2026-10-22T00:00:00.000Z" };
    const persisted = buildBtsConfigForPersistence(project, metadata);
    expect(persisted.rubyWebFramework).toBe("sinatra");
    expect(serializeBtsConfig(project, metadata)).toContain('"rubyWebFramework": "sinatra"');
    expect(generateReproducibleCommand(project)).toContain("--ruby-web-framework sinatra");
    const updated = previewBtsConfigUpdate(persisted, { addons: [] });
    expect(updated.rubyWebFramework).toBe("sinatra");
    expect(updated.stackParts?.find((part) => part.role === "backend")?.toolId).toBe("sinatra");
    const typescript = buildBtsConfigForPersistence(
      {
        ...project,
        ecosystem: "typescript",
        stackParts: parseStackPartSpecs(["backend:typescript:hono"]),
      },
      metadata,
    );
    expect(typescript.rubyWebFramework).toBe("none");
  });

  it("shares the schema and native install command with MCP and prompts", () => {
    expect(getSchemaOptions("rubyWebFramework", "ruby")).toEqual({
      category: "rubyWebFramework",
      options: ["sinatra", "rails", "roda", "grape", "none"],
    });
    expect(
      z.object(MCP_PLAN_CREATE_SCHEMA).parse({ ecosystem: "ruby", rubyWebFramework: "sinatra" })
        .rubyWebFramework,
    ).toBe("sinatra");
    expect(
      z
        .object(MCP_STACK_UPDATE_SCHEMA)
        .parse({ projectDir: "/virtual", rubyWebFramework: "sinatra" }).rubyWebFramework,
    ).toBe("sinatra");
    const mcpConfig = buildProjectConfig({ ecosystem: "ruby", rubyWebFramework: "sinatra" });
    expect(mcpConfig.backend).toBe("none");
    expect(mcpConfig.rubyWebFramework).toBe("sinatra");
    expect(() => validateMcpProjectConfigCompatibility(mcpConfig)).not.toThrow();
    expect(getInstallCommand("ruby", "app")).toBe("cd app && bundle install");
    expect(resolveRubyWebFrameworkPrompt("sinatra").autoValue).toBe("sinatra");
  });

  it("rejects unsupported selections instead of emitting partial integrations", async () => {
    const result = await createVirtual({
      ecosystem: "ruby",
      rubyWebFramework: "sinatra",
      database: "sqlite",
    });
    expect(result.success).toBe(false);
    expect(result.error).toBe(RUBY_RECIPE_EXTENSION_REASON);
    const graph = await createVirtual({
      stackParts: parseStackPartSpecs([
        "backend:ruby:sinatra",
        "backend.auth:typescript:better-auth",
      ]),
    });
    expect(graph.success).toBe(false);
    expect(graph.error).toBe(RUBY_RECIPE_EXTENSION_REASON);
  });

  it("preserves SQLite generation for an unrelated TypeScript service alongside Ruby", async () => {
    const parts = parseStackPartSpecs([
      "backend:ruby:sinatra:ruby-api",
      "backend:typescript:hono:data-api",
      "data-api.orm:typescript:drizzle",
      "database:universal:sqlite",
    ]);
    const ruby = parts.find((part) => part.id === "ruby-api");
    if (!ruby) throw new Error("Missing Ruby backend");
    ruby.targetPath = "services/ruby";
    const result = await createVirtual({ stackParts: parts });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No mixed project");
    const databaseManifest = content(result.tree, "packages/db/package.json");
    if (!databaseManifest) throw new Error("Missing TypeScript database manifest");
    const databasePackage = z
      .object({
        dependencies: z.record(z.string(), z.string()),
        scripts: z.record(z.string(), z.string()),
      })
      .parse(JSON.parse(databaseManifest));
    expect(databasePackage.dependencies["drizzle-orm"]).toBeDefined();
    expect(databasePackage.dependencies["@libsql/client"]).toBeDefined();
    expect(databasePackage.scripts["db:push"]).toBe("drizzle-kit push");
    expect(content(result.tree, "services/ruby/Gemfile")).toContain('gem "sinatra", "4.2.1"');
    expect(listVirtualTreeFilePaths(result.tree)).not.toContain("services/ruby/package.json");
  });

  it("preserves SQLite generation for an unrelated Go service alongside Ruby", async () => {
    const parts = parseStackPartSpecs([
      "backend:ruby:sinatra:ruby-api",
      "backend:go:gin:data-api",
      "data-api.orm:go:gorm",
      "database:universal:sqlite",
    ]);
    for (const part of parts) {
      if (part.id === "ruby-api") part.targetPath = "services/ruby";
      if (part.id === "data-api") part.targetPath = "services/data";
    }
    const result = await createVirtual({ stackParts: parts });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No mixed project");
    expect(content(result.tree, "services/data/internal/database/database.go")).toContain(
      'sqlite.Open("app.db")',
    );
    expect(content(result.tree, "services/ruby/Gemfile")).toContain('gem "sinatra", "4.2.1"');
    expect(listVirtualTreeFilePaths(result.tree)).not.toContain(
      "services/ruby/internal/database/database.go",
    );
  });

  it("keeps repeated Ruby manifests native and allocates distinct launch ports", async () => {
    const parts = parseStackPartSpecs([
      "frontend:typescript:react-vite",
      "frontend.css:typescript:tailwind",
      "backend:ruby:sinatra:api",
      "backend:ruby:rails:admin",
    ]);
    const api = parts.find((part) => part.id === "api");
    const admin = parts.find((part) => part.id === "admin");
    if (!api || !admin) throw new Error("Named services were not preserved");
    api.targetPath = "services/api";
    admin.targetPath = "services/admin";
    const result = await createVirtual({ stackParts: parts });
    if (!result.success || !result.tree) throw new Error(result.error ?? "No composed project");
    const paths = listVirtualTreeFilePaths(result.tree);
    expect(paths).toContain("services/api/Gemfile");
    expect(paths).toContain("services/admin/Gemfile");
    expect(paths).not.toContain("services/api/package.json");
    expect(paths).not.toContain("services/admin/package.json");
    expect(content(result.tree, "services/api/.env.example")).toContain("PORT=4567");
    expect(content(result.tree, "services/admin/.env.example")).toContain("PORT=4568");
    expect(content(result.tree, "services/api/http_policy.rb")).toContain("http://localhost:5173");
    expect(content(result.tree, "services/admin/README.md")).toContain(
      "bundle exec ruby bin/server",
    );
    expect(content(result.tree, "services/api/Gemfile")).toContain('gem "sinatra", "4.2.1"');
    expect(content(result.tree, "services/admin/Gemfile")).toContain('gem "railties", "8.1.4"');
    expect(content(result.tree, "services/admin/app.rb")).toContain("Rails::Application");
  });
});
