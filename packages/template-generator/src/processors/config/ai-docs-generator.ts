import {
  formatStackPartSpec,
  getCapabilityInventory,
  getCrystalCommands,
  getOptionMetadata,
  legacyProjectConfigToStackParts,
  type AiDocs,
  type ProjectConfig,
} from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { getGraphBackendConnections } from "@/graph/graph-backend";
import { getGraphProjectTasks } from "@/graph/graph-project";

const JAVA_GROUP_ID = "com.example";
const JAVA_RESERVED_WORDS = new Set([
  "abstract",
  "assert",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "const",
  "continue",
  "default",
  "do",
  "double",
  "else",
  "enum",
  "extends",
  "final",
  "finally",
  "float",
  "for",
  "goto",
  "if",
  "implements",
  "import",
  "instanceof",
  "int",
  "interface",
  "long",
  "native",
  "new",
  "non-sealed",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "sealed",
  "short",
  "static",
  "strictfp",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "try",
  "void",
  "volatile",
  "while",
  "yield",
  "record",
  "permits",
  "true",
  "false",
  "null",
]);

export function processAiDocs(vfs: VirtualFileSystem, config: ProjectConfig): void {
  if (!config.aiDocs || config.aiDocs.length === 0) return;

  if (config.ecosystem === "crystal" && !config.stackParts?.some(part => part.ecosystem !== "crystal" && ["backend", "frontend", "mobile"].includes(part.role))) {
    const commands = getCrystalCommands(config);
    const crystalSteps = ["shards install", commands.migrate, commands.seed, commands.build, commands.test, commands.proof].filter(Boolean).join(", then ");
    for (const docType of config.aiDocs) {
      const filename = getFilename(docType);
      if (filename) vfs.writeFile(filename, `# Crystal project\n\nUse Crystal 1.22.1 and Shards 0.20.0 with the HTTP framework pinned in shard.yml. Run ${crystalSteps}. Read README.md for the bounded HTTP contract and native environment variables. Keep dependencies in shard.yml and commit shard.lock after installation. This experimental recipe has no recorded build or runtime receipt. Do not add JavaScript dependencies to this native service.\n`);
    }
    return;
  }

  for (const docType of config.aiDocs) {
    if (docType === "none") continue;

    const content = generateContent(config, docType);
    const filename = getFilename(docType);
    if (filename && content) {
      vfs.writeFile(filename, content);
    }
  }
}

function getFilename(docType: AiDocs): string {
  switch (docType) {
    case "claude-md":
      return "CLAUDE.md";
    case "agents-md":
      return "AGENTS.md";
    case "cursorrules":
      return ".cursorrules";
    default:
      return "";
  }
}

function generateContent(config: ProjectConfig, docType: AiDocs): string {
  if (config.ecosystem === "php" && !config.stackParts?.length) {
    return `# PHP application guidance\n\nComposer owns dependencies and scripts. Read PHP.md before changing routes. Keep strict types, validate JSON at the HTTP boundary, and ${config.phpTesting === "none" ? "no test runner is generated, so keep bin/proof-http.php aligned with real behavior. Run composer install --no-interaction, composer run build and composer run proof:http" : `keep ${config.phpTesting === "pest" ? "Pest" : config.phpTesting === "codeception" ? "Codeception" : "PHPUnit"} request tests aligned with real behavior. Run composer install --no-interaction, composer run build, composer test and composer run proof:http`} from the PHP service directory. The HTTP proof starts and stops its own process. Never claim runtime verification from generated files alone. ${config.phpOrm && config.phpOrm !== "none" ? `The ${config.phpOrm} integration persists notes in SQLite; run composer run db:setup before composer run dev.` : "No database or migration adapter is generated."} ${config.phpAuth && config.phpAuth !== "none" ? `The ${config.phpAuth} integration verifies HS256 bearer tokens on GET /api/me; it does not issue or store credentials.` : "No auth adapter is generated."} No deployment adapter is generated.\n`;
  }
  const content =
    docType === "cursorrules" ? generateCursorRules(config) : generateMarkdownDoc(config, docType);
  const phpServices = (config.stackParts ?? []).filter(
    (part) =>
      part.role === "backend" &&
      part.ecosystem === "php" &&
      !part.ownerPartId &&
      part.source !== "provided",
  );
  if (phpServices.length === 0) return content;
  const guidance = phpServices
    .map((part) => {
      const directory = part.targetPath ?? "apps/server";
      return `- Read ${directory}/PHP.md. Run composer install --no-interaction, composer run build, composer test and composer run proof:http from ${directory}. Composer owns this service; keep TypeScript dependency changes outside it.`;
    })
    .join("\n");
  return `${content}\n## PHP service ownership\n\n${guidance}\n`;
}

function sanitizeJavaPackageSuffix(projectName: string): string {
  const alphanumericOnly = projectName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
  const withLetterPrefix = /^[a-z]/.test(alphanumericOnly)
    ? alphanumericOnly
    : `app${alphanumericOnly}`;
  const guarded = JAVA_RESERVED_WORDS.has(withLetterPrefix)
    ? `app${withLetterPrefix}`
    : withLetterPrefix;
  return guarded || "app";
}

function getJavaMainClass(config: ProjectConfig): string {
  return `${JAVA_GROUP_ID}.${sanitizeJavaPackageSuffix(config.projectName)}.Application`;
}

function getJavaMainSourcePath(config: ProjectConfig): string {
  return `src/main/java/${getJavaMainClass(config).replace(/\./g, "/")}.java`;
}

function isSpringBootJavaProject(config: ProjectConfig): boolean {
  return config.javaWebFramework === "spring-boot" && config.javaBuildTool !== "none";
}

function isQuarkusJavaProject(config: ProjectConfig): boolean {
  return config.javaWebFramework === "quarkus" && config.javaBuildTool !== "none";
}

function getEffectiveJavaLibraries(config: ProjectConfig): string[] {
  if (!isSpringBootJavaProject(config)) return [];
  const hasJavaJpa = config.javaOrm === "spring-data-jpa";
  const libraries = (config.javaLibraries || []).filter((library) => library !== "none");
  return libraries.filter((library) => {
    if ((library === "flyway" || library === "liquibase") && !hasJavaJpa) {
      return false;
    }
    if (library === "liquibase" && libraries.includes("flyway")) {
      return false;
    }
    return true;
  });
}

function getEffectiveJavaTestingLibraries(config: ProjectConfig): string[] {
  return config.javaBuildTool === "none"
    ? []
    : (config.javaTestingLibraries || []).filter((library) => library !== "none");
}

function getJavaBuildToolCommand(config: ProjectConfig): string | null {
  return config.javaBuildTool === "gradle"
    ? "./gradlew"
    : config.javaBuildTool === "maven"
      ? "./mvnw"
      : null;
}

function generateMarkdownDoc(config: ProjectConfig, docType: AiDocs): string {
  const sections: string[] = [];

  sections.push(`# ${config.projectName}\n`);
  sections.push(`This file provides context about the project for AI assistants.\n`);

  sections.push(`## Project Overview\n`);
  sections.push(`- **Ecosystem**: ${capitalizeFirst(config.ecosystem)}`);

  sections.push(generateTechStackSection(config));
  sections.push(generateStructureSection(config));
  sections.push(generateCommandsSection(config));
  sections.push(generateBetterFullstackContextSection(config));
  sections.push(generateMaintenanceSection(docType));

  return sections.join("\n");
}

function generateBetterFullstackContextSection(config: ProjectConfig): string {
  const parts = config.stackParts ?? legacyProjectConfigToStackParts(config);
  const inventory = getCapabilityInventory();
  const partLines = parts
    .filter((part) => part.source !== "provided" && part.toolId !== "none")
    .map((part) => {
      const owner = part.ownerPartId
        ? parts.find((candidate) => candidate.id === part.ownerPartId)
        : undefined;
      const evidence =
        inventory.find(
          (record) => record.ecosystem === part.ecosystem && record.optionId === part.toolId,
        ) ?? inventory.find((record) => record.optionId === part.toolId);
      const ownerText = owner ? ` It belongs to \`${formatStackPartSpec(owner, parts)}\`.` : "";
      const pathText = part.targetPath ? ` Its generated target is \`${part.targetPath}\`.` : "";
      const evidenceText = evidence
        ? ` Evidence is \`${evidence.evidenceLevel}\` with \`${evidence.freshness}\` freshness. Verification maintainer: ${evidence.maintenanceOwner}.`
        : " Evidence is not mapped for this installed option.";
      return `- \`${formatStackPartSpec(part, parts)}\`.${ownerText}${pathText}${evidenceText}`;
    })
    .sort();

  return `
## Better Fullstack project context

\`bts.jsonc\` is the authority for the current Stack Graph. Its \`stackParts\` array owns role selection and \`ownerPartId\` bindings. Top-level option fields are a compatibility projection and must not become a second mutation path.

### Stack Parts, ownership, and evidence

${partLines.join("\n") || "- No selected Stack Parts were recorded."}

### Installed-version authority

Use \`bts.jsonc\` for the generator and schema version. Use local package manifests and lockfiles for installed dependency versions. Do not assume that documentation for a newer Better Fullstack release matches this project.

### Compatibility and lifecycle safety

Run \`create-better-fullstack context --json\` for bounded roles, capabilities, evidence, compatibility issues, and safe next actions. Run \`create-better-fullstack doctor --json\` before repairing graph drift. Existing-project writes must start with a plan and use the exact review token. Use \`create-better-fullstack recipes check --json\` before editing recipe-owned paths or managed regions, and use recipe history plus project recovery commands to undo a reviewed operation.

User code outside an explicit Better Fullstack managed region is not generator-owned. Missing or changed managed-region hashes stop recipe planning for manual review.

<!-- <better-fullstack:recipes sha256=e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855> -->

<!-- </better-fullstack:recipes> -->
`;
}

function generateTechStackSection(config: ProjectConfig): string {
  const lines: string[] = ["\n## Tech Stack\n"];

  if (config.ecosystem === "typescript") {
    lines.push(`- **Runtime**: ${config.runtime}`);
    lines.push(`- **Package Manager**: ${config.packageManager}`);

    if (config.frontend?.length && !config.frontend.includes("none")) {
      lines.push(`\n### Frontend`);
      lines.push(`- Framework: ${config.frontend.join(", ")}`);
      if (config.cssFramework !== "none") lines.push(`- CSS: ${config.cssFramework}`);
      if (config.uiLibrary !== "none") lines.push(`- UI Library: ${config.uiLibrary}`);
      if (config.stateManagement !== "none") lines.push(`- State: ${config.stateManagement}`);
    }

    if (config.backend !== "none") {
      lines.push(`\n### Backend`);
      lines.push(`- Framework: ${config.backend}`);
      if (config.api !== "none") lines.push(`- API: ${config.api}`);
      if (config.validation !== "none") lines.push(`- Validation: ${config.validation}`);
    }

    if (config.database !== "none") {
      lines.push(`\n### Database`);
      lines.push(`- Database: ${config.database}`);
      if (config.orm !== "none") lines.push(`- ORM: ${config.orm}`);
    }

    if (config.auth !== "none") {
      lines.push(`\n### Authentication`);
      lines.push(`- Provider: ${config.auth}`);
    }

    const additional: string[] = [];
    if (config.testing !== "none") additional.push(`Testing: ${config.testing}`);
    if (config.ai !== "none") additional.push(`AI: ${config.ai}`);
    if (config.email !== "none") additional.push(`Email: ${config.email}`);
    if (config.payments !== "none") additional.push(`Payments: ${config.payments}`);
    if (config.realtime !== "none") additional.push(`Realtime: ${config.realtime}`);
    if (config.jobQueue !== "none") additional.push(`Job Queue: ${config.jobQueue}`);
    if (config.caching !== "none") additional.push(`Caching: ${config.caching}`);
    if (config.cms !== "none") additional.push(`CMS: ${config.cms}`);
    if (config.logging !== "none") additional.push(`Logging: ${config.logging}`);
    if (config.observability !== "none") additional.push(`Observability: ${config.observability}`);

    if (additional.length > 0) {
      lines.push(`\n### Additional Features`);
      additional.forEach((f) => lines.push(`- ${f}`));
    }
  }

  if (config.ecosystem === "ruby") {
    lines.push(`- Experimental Ruby ${rubyFrameworkLabel(config)} HTTP recipe; Bundler owns Gemfile and Gemfile.lock; Puma serves JSON routes; ${rubyTestingLabel(config) ? `${rubyTestingLabel(config)}/Rack tests cover request validation.` : "No test suite is generated."}`);
    const orm = rubyOrmLabel(config);
    if (orm) lines.push(`- Database: ${orm} on SQLite with versioned migrations (\`bundle exec rake db:migrate\`)`);
    if (config.rubyAuth && config.rubyAuth !== "none") lines.push(`- Auth: ${getOptionMetadata("rubyAuth", config.rubyAuth)?.label ?? config.rubyAuth}`);
    const validation = rubyOptionLabel(config, "rubyValidation");
    if (validation) lines.push(`- Validation: ${validation} in name_contract.rb`);
    const cache = rubyOptionLabel(config, "rubyCache");
    if (cache) lines.push(`- Cache: ${cache} in cache.rb behind GET /api/cache`);
    const jobs = rubyOptionLabel(config, "rubyJobQueue");
    if (jobs) lines.push(`- Background jobs: ${jobs} in jobs.rb; run the worker with \`bundle exec ruby bin/worker\``);
    const email = rubyOptionLabel(config, "rubyEmail");
    if (email) lines.push(`- Email: ${email} in mailer.rb; send a test message with \`bundle exec rake "email:welcome[you@example.com]"\``);
    const logging = rubyOptionLabel(config, "rubyLogging");
    if (logging) lines.push(`- Request logging: ${logging}`);
    const httpClient = rubyOptionLabel(config, "rubyHttpClient");
    if (httpClient) lines.push(`- HTTP client: ${httpClient} in upstream.rb behind GET /api/upstream`);
  }

  if (config.ecosystem === "rust") {
    if (config.rustWebFramework !== "none")
      lines.push(`- Web Framework: ${config.rustWebFramework}`);
    if (config.rustFrontend !== "none") lines.push(`- Frontend: ${config.rustFrontend}`);
    if (config.rustOrm !== "none") lines.push(`- Database: ${config.rustOrm}`);
    if (config.rustApi !== "none") lines.push(`- API: ${config.rustApi}`);
    if (config.rustCli !== "none") lines.push(`- CLI: ${config.rustCli}`);
    if (config.rustLibraries?.length) {
      const libs = config.rustLibraries.filter((l) => l !== "none");
      if (libs.length > 0) lines.push(`- Libraries: ${libs.join(", ")}`);
    }
    if (config.rustLogging !== "none") lines.push(`- Logging: ${config.rustLogging}`);
    if (config.rustErrorHandling !== "none")
      lines.push(`- Error Handling: ${config.rustErrorHandling}`);
    if (config.rustAuth !== "none") lines.push(`- Auth: ${config.rustAuth}`);
  }

  if (config.ecosystem === "python") {
    if (config.pythonWebFramework !== "none")
      lines.push(`- Web Framework: ${config.pythonWebFramework}`);
    if (config.pythonOrm !== "none") lines.push(`- ORM: ${config.pythonOrm}`);
    if (config.pythonValidation !== "none") lines.push(`- Validation: ${config.pythonValidation}`);
    if (config.pythonAi?.length) {
      const aiLibs = config.pythonAi.filter((l) => l !== "none");
      if (aiLibs.length > 0) lines.push(`- AI: ${aiLibs.join(", ")}`);
    }
    if (config.pythonApi !== "none") lines.push(`- API Framework: ${config.pythonApi}`);
    if (config.pythonTaskQueue !== "none") lines.push(`- Task Queue: ${config.pythonTaskQueue}`);
    if (config.pythonQuality !== "none") lines.push(`- Code Quality: ${config.pythonQuality}`);
    if (config.pythonLogging && config.pythonLogging !== "none") {
      lines.push(`- Logging: ${config.pythonLogging}`);
    }
  }

  if (config.ecosystem === "go") {
    if (config.goWebFramework !== "none") lines.push(`- Web Framework: ${config.goWebFramework}`);
    if (config.goOrm !== "none") lines.push(`- Database: ${config.goOrm}`);
    if (config.goApi !== "none") lines.push(`- API: ${config.goApi}`);
    if (config.goCli !== "none") lines.push(`- CLI: ${config.goCli}`);
    if (config.goLogging !== "none") lines.push(`- Logging: ${config.goLogging}`);
    if (config.goAuth !== "none") lines.push(`- Auth Library: ${config.goAuth}`);
    if (config.goTesting.length > 0) lines.push(`- Testing: ${config.goTesting.join(", ")}`);
    if (config.goMessageQueue !== "none") lines.push(`- Messaging: ${config.goMessageQueue}`);
    if (config.goObservability !== "none") lines.push(`- Observability: ${config.goObservability}`);
    if (config.goValidation !== "none") lines.push(`- Validation: ${config.goValidation}`);
    if (config.goQuality !== "none") lines.push(`- Code Quality: ${config.goQuality}`);
    if (config.goMigrations !== "none") lines.push(`- Migrations: ${config.goMigrations}`);
    if (config.goTemplating !== "none") lines.push(`- Templating: ${config.goTemplating}`);
    if (config.goProtoTooling !== "none")
      lines.push(`- Protobuf Tooling: ${config.goProtoTooling}`);
    if (config.goDI !== "none") lines.push(`- Dependency Injection: ${config.goDI}`);
    if (config.auth !== "none") lines.push(`- Auth: ${config.auth}`);
  }

  if (config.ecosystem === "java") {
    const javaLibraries = getEffectiveJavaLibraries(config);
    const testingLibraries = getEffectiveJavaTestingLibraries(config);
    const isSpringBoot = isSpringBootJavaProject(config);
    const isQuarkus = isQuarkusJavaProject(config);
    lines.push(`- Java Version: 21`);
    lines.push(
      `- Scaffold: ${isSpringBoot ? "spring-boot" : isQuarkus ? "quarkus" : "plain-java"}`,
    );
    if (config.javaWebFramework !== "none" && (isSpringBoot || isQuarkus)) {
      lines.push(`- Web Framework: ${config.javaWebFramework}`);
    }
    if (config.javaBuildTool !== "none") lines.push(`- Build Tool: ${config.javaBuildTool}`);
    if (isSpringBoot && config.javaOrm !== "none") lines.push(`- ORM: ${config.javaOrm}`);
    if (isSpringBoot && config.javaAuth !== "none") lines.push(`- Auth: ${config.javaAuth}`);
    if (javaLibraries.length > 0) lines.push(`- Libraries: ${javaLibraries.join(", ")}`);
    if (testingLibraries.length > 0) lines.push(`- Testing: ${testingLibraries.join(", ")}`);
  }

  return lines.join("\n");
}

function generateStructureSection(config: ProjectConfig): string {
  const lines: string[] = ["\n## Project Structure\n"];

  if (config.ecosystem === "typescript") {
    lines.push("```");
    lines.push(`${config.projectName}/`);
    lines.push("├── apps/");

    const hasWeb = config.frontend?.some(
      (f) => !["none", "native-bare", "native-uniwind", "native-unistyles"].includes(f),
    );
    const hasNative = config.frontend?.some((f) =>
      ["native-bare", "native-uniwind", "native-unistyles"].includes(f),
    );
    const isBackendSelf = config.backend === "self";

    if (hasWeb) {
      lines.push("│   ├── web/         # Frontend application");
    }
    if (hasNative) {
      lines.push("│   ├── native/      # Mobile application (React Native)");
    }
    if (config.backend !== "none" && !isBackendSelf) {
      lines.push("│   └── server/      # Backend API");
    }

    lines.push("├── packages/");
    if (config.api !== "none") {
      lines.push("│   ├── api/         # API layer");
    }
    if (config.auth !== "none") {
      lines.push("│   ├── auth/        # Authentication");
    }
    if (config.database !== "none") {
      lines.push("│   └── db/          # Database schema");
    }
    lines.push("```");
  } else if (config.ecosystem === "rust") {
    lines.push("```");
    lines.push(`${config.projectName}/`);
    lines.push("├── Cargo.toml       # Workspace manifest");
    lines.push("├── crates/");
    lines.push("│   └── server/      # Backend server");
    if (config.rustFrontend !== "none") {
      lines.push(
        `│   └── ${config.rustFrontend === "leptos" ? "client" : "dioxus-client"}/    # WASM frontend`,
      );
    }
    lines.push("```");
  } else if (config.ecosystem === "ruby") {
    lines.push("Gemfile, app.rb, config.ru, bin/server, bin/proof, Rakefile, test/app_test.rb");
  } else if (config.ecosystem === "python") {
    lines.push("```");
    lines.push(`${config.projectName}/`);
    lines.push("├── pyproject.toml   # Project config");
    lines.push("├── src/");
    lines.push("│   └── app/         # Application code");
    lines.push("├── tests/           # Test suite");
    if (config.pythonOrm !== "none") {
      lines.push("├── migrations/      # Database migrations");
    }
    lines.push("```");
  } else if (config.ecosystem === "go") {
    lines.push("```");
    lines.push(`${config.projectName}/`);
    lines.push("├── go.mod           # Module definition");
    lines.push("├── cmd/");
    lines.push("│   └── server/      # Server entry point");
    if (config.goOrm !== "none" || config.auth !== "none") {
      lines.push("├── internal/        # Internal packages");
    }
    if (config.goApi === "grpc-go") {
      lines.push("├── proto/           # Protocol buffers");
    }
    lines.push("```");
  } else if (config.ecosystem === "java") {
    const usesGradle = config.javaBuildTool === "gradle";
    const isSpringBoot = isSpringBootJavaProject(config);
    lines.push("```");
    lines.push(`${config.projectName}/`);
    if (config.javaBuildTool !== "none") {
      lines.push(
        usesGradle
          ? "├── gradle/              # Gradle Wrapper metadata"
          : "├── .mvn/                # Maven Wrapper metadata",
      );
      lines.push(
        usesGradle
          ? "├── gradlew              # Gradle Wrapper launcher"
          : "├── mvnw                 # Maven Wrapper launcher",
      );
      lines.push(
        usesGradle
          ? "├── build.gradle.kts     # Gradle build definition"
          : "├── pom.xml              # Maven build definition",
      );
    }
    lines.push("├── src/main/java/       # Application source");
    if (isSpringBoot) {
      lines.push("├── src/main/resources/  # Spring configuration");
    }
    if (getEffectiveJavaLibraries(config).includes("flyway")) {
      lines.push("├── src/main/resources/db/migration/ # SQL migrations");
    }
    if (getEffectiveJavaTestingLibraries(config).length > 0) {
      lines.push("├── src/test/java/       # Test suite");
    }
    lines.push("```");
  }

  return lines.join("\n");
}

function rubyFrameworkLabel(config: ProjectConfig) {
  return getOptionMetadata("rubyWebFramework", config.rubyWebFramework ?? "sinatra")?.label ?? "Sinatra";
}

const RUBY_AUTH_GUIDANCE = {
  jwt: "JWT bearer tokens: auth.rb verifies HS256 tokens (issuer, audience, expiry) from JWT_SECRET and exposes the subject at GET /api/me. Never add an endpoint that signs caller-supplied claims; `bundle exec rake auth:token[subject]` prints a development token.",
  omniauth: "OmniAuth OpenID Connect: auth.rb mounts the oidc strategy with discovery and PKCE, a cookie session, GET /auth/csrf for the request-phase token, the callback, and POST /auth/logout. Configure OIDC_ISSUER, OIDC_CLIENT_ID, OIDC_CLIENT_SECRET, OIDC_REDIRECT_URI, and SESSION_SECRET; a real provider is required for an end-to-end sign-in.",
  rodauth: "Rodauth JSON accounts: auth.rb mounts create-account, login, and logout with accounts in SQLite (db/auth_migrations, run by `bundle exec rake db:migrate`). SESSION_SECRET signs the session cookie.",
} as const;

function rubyAuthGuidance(config: ProjectConfig) {
  return config.rubyAuth && config.rubyAuth !== "none" ? RUBY_AUTH_GUIDANCE[config.rubyAuth] : undefined;
}

function rubyTestingLabel(config: ProjectConfig) {
  const testing = config.rubyTesting ?? "minitest";
  return testing === "none" ? undefined : getOptionMetadata("rubyTesting", testing)?.label;
}

function rubyOptionLabel(
  config: ProjectConfig,
  category:
    | "rubyValidation"
    | "rubyCache"
    | "rubyJobQueue"
    | "rubyEmail"
    | "rubyLogging"
    | "rubyHttpClient",
) {
  const value = config[category];
  return value && value !== "none" ? getOptionMetadata(category, value)?.label : undefined;
}

function rubyOrmLabel(config: ProjectConfig) {
  return config.rubyOrm && config.rubyOrm !== "none"
    ? getOptionMetadata("rubyOrm", config.rubyOrm)?.label
    : undefined;
}

function generateCommandsSection(config: ProjectConfig): string {
  const lines: string[] = ["\n## Common Commands\n"];

  const rubyConnections = getGraphBackendConnections(config).filter(
    (connection) => connection.ecosystem === "ruby",
  );
  if (rubyConnections.length > 0) {
    lines.push(
      "Each service owns its native manifest, environment, and tests. Run native commands from that service directory.",
    );
    for (const task of getGraphProjectTasks(config)) {
      if (task.setup) lines.push(`- Install ${task.label}: \`${task.setup}\``);
      if (task.dev) lines.push(`- Start ${task.label}: \`${task.dev}\``);
    }
    for (const service of rubyConnections) {
      lines.push(
        `- Check Ruby syntax: \`${service.checkCommand}\``,
        ...(service.testCommand ? [`- Run Rack request tests: \`${service.testCommand}\``] : []),
        `- Prove live HTTP and shutdown: \`cd ${service.targetPath} && bundle exec ruby bin/proof\``,
      );
    }
    lines.push(`Ruby services use Bundler, ${[...new Set(rubyConnections.map((service) => getOptionMetadata("rubyWebFramework", service.toolId)?.label ?? service.toolId))].join(", ")}, and Puma. Do not add TypeScript dependencies to them. Ruby remains experimental until a current revision-matched runtime receipt proves the recipe.`);
    return lines.join("\n");
  }

  if (config.ecosystem === "typescript") {
    const pm = config.packageManager;
    const run = pm === "npm" ? "npm run" : pm;
    lines.push(`- \`${pm} install\` - Install dependencies`);
    lines.push(`- \`${run} dev\` - Start development server`);
    lines.push(`- \`${run} build\` - Build for production`);
    if (config.testing !== "none") {
      lines.push(`- \`${run} test\` - Run tests`);
    }
    if (config.database !== "none") {
      lines.push(`- \`${run} db:push\` - Push database schema`);
      lines.push(`- \`${run} db:studio\` - Open database UI`);
    }
  } else if (config.ecosystem === "rust") {
    lines.push(`- \`cargo build\` - Build project`);
    lines.push(`- \`cargo run\` - Run project`);
    lines.push(`- \`cargo test\` - Run tests`);
    lines.push(`- \`cargo clippy\` - Run linter`);
    lines.push(`- \`cargo fmt\` - Format code`);
  } else if (config.ecosystem === "python") {
    const pythonPackageManager = config.pythonPackageManager ?? "uv";
    const venvBin = process.platform === "win32" ? ".venv\\Scripts\\" : ".venv/bin/";
    const venvPip = process.platform === "win32" ? ".venv/Scripts/pip.exe" : ".venv/bin/pip";
    const pythonRun =
      pythonPackageManager === "poetry"
        ? "poetry run "
        : pythonPackageManager === "uv"
          ? "uv run "
          : venvBin;
    const pythonInstall =
      pythonPackageManager === "poetry"
        ? "poetry install --extras dev"
        : pythonPackageManager === "uv"
          ? "uv sync --extra dev"
          : `python -m venv .venv && ${venvPip} install -e ".[dev]"`;
    lines.push(`- \`${pythonInstall}\` - Install dependencies`);
    if (config.pythonWebFramework === "fastapi") {
      lines.push(`- \`${pythonRun}uvicorn app.main:app --reload\` - Start dev server`);
    } else if (config.pythonWebFramework === "flask") {
      lines.push(`- \`${pythonRun}flask --app app.main run --reload\` - Start dev server`);
    } else if (config.pythonWebFramework === "litestar") {
      lines.push(
        `- \`${pythonRun}litestar --app src.app.main:app run --reload --port 8000\` - Start dev server`,
      );
    } else if (config.pythonWebFramework === "streamlit") {
      lines.push(`- \`${pythonRun}streamlit run src/app/main.py\` - Start dev server`);
    } else {
      lines.push(`- \`${pythonRun}python -m app.main\` - Run application`);
    }
    lines.push(`- \`${pythonRun}pytest\` - Run tests`);
    if (config.pythonQuality === "ruff") {
      lines.push(`- \`${pythonRun}ruff check .\` - Run linter`);
      lines.push(`- \`${pythonRun}ruff format .\` - Format code`);
    }
  } else if (config.ecosystem === "ruby") {
    lines.push(
      "- `bundle install` - Install native dependencies",
      ...(rubyOrmLabel(config) || config.rubyAuth === "rodauth" ? ["- `bundle exec rake db:migrate` - Apply database migrations"] : []),
      "- `bundle exec rake build` - Check Ruby syntax",
      ...(rubyTestingLabel(config) ? [`- \`bundle exec rake test\` - Run ${rubyTestingLabel(config)}/Rack integration tests`] : []),
      "- `bundle exec ruby bin/proof` - Exercise real HTTP and shutdown",
      "- `bundle exec ruby bin/server` - Start Puma",
    );
  } else if (config.ecosystem === "go") {
    lines.push(`- \`go mod tidy\` - Install dependencies`);
    lines.push(`- \`go run cmd/server/main.go\` - Start server`);
    lines.push(`- \`go test ./...\` - Run tests`);
    lines.push(`- \`go fmt ./...\` - Format code`);
  } else if (config.ecosystem === "java") {
    const buildToolCommand = getJavaBuildToolCommand(config);
    const isSpringBoot = isSpringBootJavaProject(config);
    const isQuarkus = isQuarkusJavaProject(config);
    const runCommand = buildToolCommand
      ? isSpringBoot
        ? config.javaBuildTool === "gradle"
          ? `${buildToolCommand} bootRun`
          : `${buildToolCommand} spring-boot:run`
        : isQuarkus
          ? config.javaBuildTool === "gradle"
            ? `${buildToolCommand} quarkusDev`
            : `${buildToolCommand} quarkus:dev`
          : config.javaBuildTool === "gradle"
            ? `${buildToolCommand} run`
            : `${buildToolCommand} exec:java`
      : null;
    const packageCommand = buildToolCommand
      ? config.javaBuildTool === "gradle"
        ? `${buildToolCommand} build`
        : `${buildToolCommand} package`
      : null;
    const testCommand =
      buildToolCommand && getEffectiveJavaTestingLibraries(config).length > 0
        ? `${buildToolCommand} test`
        : null;
    if (buildToolCommand && runCommand && packageCommand) {
      if (testCommand) lines.push(`- \`${testCommand}\` - Run tests`);
      lines.push(`- \`${runCommand}\` - Start the app`);
      lines.push(`- \`${packageCommand}\` - Build the jar`);
    } else {
      lines.push(`- \`javac -d out ${getJavaMainSourcePath(config)}\` - Compile the application`);
      lines.push(`- \`java -cp out ${getJavaMainClass(config)}\` - Run the application`);
    }
  }

  return lines.join("\n");
}

function generateMaintenanceSection(docType: AiDocs): string {
  const fileName =
    docType === "claude-md" ? "CLAUDE.md" : docType === "agents-md" ? "AGENTS.md" : "this file";

  return `
## Maintenance

Keep ${fileName} updated when:
- Adding/removing dependencies
- Changing project structure
- Adding new features or services
- Modifying build/dev workflows

AI assistants should suggest updates to this file when they notice relevant changes.
`;
}

function generateCursorRules(config: ProjectConfig): string {
  const rules: string[] = [];

  rules.push(`# Project: ${config.projectName}`);
  rules.push(`# Ecosystem: ${capitalizeFirst(config.ecosystem)}`);
  rules.push(``);

  if (config.ecosystem === "typescript") {
    rules.push(`You are working on a TypeScript project.`);
    if (config.runtime !== "none") rules.push(`Runtime: ${config.runtime}`);
    if (config.packageManager) rules.push(`Package manager: ${config.packageManager}`);
    if (config.frontend?.length && !config.frontend.includes("none")) {
      rules.push(`Frontend: ${config.frontend.join(", ")}`);
    }
    if (config.backend !== "none") rules.push(`Backend: ${config.backend}`);
    if (config.database !== "none") {
      rules.push(
        `Database: ${config.database}${config.orm !== "none" ? ` with ${config.orm}` : ""}`,
      );
    }
    if (config.api !== "none") rules.push(`API: ${config.api}`);
    if (config.auth !== "none") rules.push(`Auth: ${config.auth}`);
    if (config.testing !== "none") rules.push(`Testing: ${config.testing}`);
    if (config.validation !== "none") rules.push(`Validation: ${config.validation}`);
  } else if (config.ecosystem === "rust") {
    rules.push(`You are working on a Rust project.`);
    if (config.rustWebFramework !== "none") rules.push(`Web framework: ${config.rustWebFramework}`);
    if (config.rustFrontend !== "none") rules.push(`Frontend: ${config.rustFrontend}`);
    if (config.rustOrm !== "none") rules.push(`Database: ${config.rustOrm}`);
    if (config.rustApi !== "none") rules.push(`API: ${config.rustApi}`);
  } else if (config.ecosystem === "python") {
    rules.push(`You are working on a Python project.`);
    if (config.pythonWebFramework !== "none")
      rules.push(`Web framework: ${config.pythonWebFramework}`);
    if (config.pythonOrm !== "none") rules.push(`ORM: ${config.pythonOrm}`);
    if (config.pythonValidation !== "none") rules.push(`Validation: ${config.pythonValidation}`);
    if (config.pythonQuality !== "none") rules.push(`Code quality: ${config.pythonQuality}`);
    if (config.pythonLogging && config.pythonLogging !== "none") {
      rules.push(`Logging: ${config.pythonLogging}, configured in src/app/logging_config.py`);
    }
  } else if (config.ecosystem === "ruby") {
    rules.push(`Keep Ruby routes in app.rb, shared Rack host, origin, and body policies in http_policy.rb and request_body_limit.rb, and ${config.rubyTesting === "rspec" ? "RSpec coverage in spec/app_spec.rb" : config.rubyTesting === "none" ? "no generated test suite" : `${rubyTestingLabel(config)} coverage in test/app_test.rb`}. Bundler owns native dependencies. Environment variables are read from the process; .env.example is documentation. Run bundle exec rake and bundle exec ruby bin/proof before claiming runtime verification.`);
    const orm = rubyOrmLabel(config);
    rules.push(orm ? `Persistence uses ${orm} on SQLite: connection and migrator in db.rb, the Items repository in items.rb, migrations under db/. DATABASE_PATH overrides the SQLite file. Change the schema with a new migration, never by editing an applied one.` : "No database adapter is generated.");
    rules.push(rubyAuthGuidance(config) ?? "No auth adapter is generated.");
    const validation = rubyOptionLabel(config, "rubyValidation");
    if (validation) rules.push(`Request payload rules live in name_contract.rb and use ${validation}. Keep the 422 error codes name_must_be_a_string and name_length_must_be_1_to_80 stable; the tests assert them.`);
    const cache = rubyOptionLabel(config, "rubyCache");
    if (cache) rules.push(`Caching uses ${cache} through Cache.fetch(key, ttl:) in cache.rb. Always pass a TTL, keep cached values JSON-serializable, and return 503 instead of failing the request when the cache server is down.`);
    const jobs = rubyOptionLabel(config, "rubyJobQueue");
    if (jobs) rules.push(`Background jobs use ${jobs}: GreetingJob and the Jobs service live in jobs.rb, and bin/worker runs them in a separate process. Keep job arguments JSON-serializable and jobs idempotent.`);
    const email = rubyOptionLabel(config, "rubyEmail");
    if (email) rules.push(`Email uses ${email} through Mailer.deliver_welcome in mailer.rb. Never expose an endpoint that sends mail to arbitrary addresses, and keep credentials in the process environment.`);
    const logging = rubyOptionLabel(config, "rubyLogging");
    if (logging) rules.push(config.rubyLogging === "lograge" ? "Request logs come from Lograge, configured in the Rails application in app.rb; keep one line per request." : `Request logging uses ${logging} in request_logger.rb, mounted as the outermost Rack middleware. Never log request bodies or credentials.`);
    const httpClient = rubyOptionLabel(config, "rubyHttpClient");
    if (httpClient) rules.push(`Outbound HTTP uses ${httpClient} in upstream.rb. Keep explicit timeouts, read the upstream base URL from UPSTREAM_URL, and never build request URLs from user input.`);
  } else if (config.ecosystem === "go") {
    rules.push(`You are working on a Go project.`);
    if (config.goWebFramework !== "none") rules.push(`Web framework: ${config.goWebFramework}`);
    if (config.goOrm !== "none") rules.push(`Database: ${config.goOrm}`);
    if (config.goApi !== "none") rules.push(`API: ${config.goApi}`);
    if (config.goLogging !== "none") rules.push(`Logging: ${config.goLogging}`);
    if (config.goValidation !== "none") rules.push(`Validation: ${config.goValidation}`);
    if (config.goQuality !== "none") rules.push(`Code quality: ${config.goQuality}`);
    if (config.goMigrations !== "none") rules.push(`Migrations: ${config.goMigrations}`);
    if (config.goTemplating !== "none") rules.push(`Templating: ${config.goTemplating}`);
    if (config.goProtoTooling !== "none") rules.push(`Protobuf tooling: ${config.goProtoTooling}`);
    if (config.goDI !== "none") rules.push(`Dependency injection: ${config.goDI}`);
    if (config.auth !== "none") rules.push(`Auth: ${config.auth}`);
  } else if (config.ecosystem === "java") {
    const javaLibraries = getEffectiveJavaLibraries(config);
    const testingLibraries = getEffectiveJavaTestingLibraries(config);
    const isSpringBoot = isSpringBootJavaProject(config);
    const isQuarkus = isQuarkusJavaProject(config);
    rules.push(`You are working on a Java project.`);
    rules.push(`Java version: 21`);
    rules.push(`Scaffold: ${isSpringBoot ? "spring-boot" : isQuarkus ? "quarkus" : "plain-java"}`);
    if (config.javaWebFramework !== "none" && (isSpringBoot || isQuarkus)) {
      rules.push(`Web framework: ${config.javaWebFramework}`);
    }
    if (config.javaBuildTool !== "none") rules.push(`Build tool: ${config.javaBuildTool}`);
    if (isSpringBoot && config.javaOrm !== "none") rules.push(`ORM: ${config.javaOrm}`);
    if (isSpringBoot && config.javaAuth !== "none") rules.push(`Auth: ${config.javaAuth}`);
    if (javaLibraries.length > 0) rules.push(`Libraries: ${javaLibraries.join(", ")}`);
    if (testingLibraries.length > 0) rules.push(`Testing: ${testingLibraries.join(", ")}`);
    if (config.javaBuildTool === "gradle") {
      rules.push(`Use ./gradlew for all Gradle commands.`);
    } else if (config.javaBuildTool === "maven") {
      rules.push(`Use ./mvnw for all Maven commands.`);
    } else {
      rules.push(`Use javac/java directly for compile and run steps.`);
    }
  }

  rules.push(``);
  rules.push(`Follow existing code patterns and conventions.`);
  rules.push(`Use the established project structure.`);
  rules.push(`Keep this file updated when the project structure changes.`);

  return rules.join("\n");
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
