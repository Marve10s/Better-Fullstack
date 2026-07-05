import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";
import type { TemplateData } from "./utils";

import { isBinaryFile, processTemplateString, transformFilename } from "../core/template-processor";

type JavaTemplateContext = ProjectConfig & {
  javaArtifactId: string;
  javaGroupId: string;
  javaPackageName: string;
  javaPackagePath: string;
  hasJavaBuildTool: boolean;
  isJavaMaven: boolean;
  isJavaGradle: boolean;
  isJavaSpringBoot: boolean;
  isJavaQuarkus: boolean;
  isJavaMicronaut: boolean;
  isJavaPlainJava: boolean;
  hasJavaJpa: boolean;
  hasJavaJooq: boolean;
  hasJavaMybatis: boolean;
  hasJavaKeycloak: boolean;
  hasJavaGraphql: boolean;
  isJavaOpenApiGenerator: boolean;
  hasJavaGrpc: boolean;
  hasJavaLogback: boolean;
  hasJavaLog4j2: boolean;
  hasJavaAmqp: boolean;
  hasJavaOtel: boolean;
  hasJavaSecurity: boolean;
  hasJavaActuator: boolean;
  hasJavaValidation: boolean;
  hasJavaFlyway: boolean;
  hasJavaLiquibase: boolean;
  hasJavaSpringdocOpenapi: boolean;
  hasJavaLombok: boolean;
  hasJavaMapstruct: boolean;
  hasJavaCaffeine: boolean;
  hasJavaResilience4j: boolean;
  hasJavaWebflux: boolean;
  hasJavaBatch: boolean;
  hasJavaKafka: boolean;
  hasJavaMail: boolean;
  hasJavaDevtools: boolean;
  hasJavaMicrometerPrometheus: boolean;
  hasJavaThymeleaf: boolean;
  hasJavaAnnotationProcessors: boolean;
  hasJavaMockito: boolean;
  hasJavaTestcontainers: boolean;
  hasJavaAssertj: boolean;
  hasJavaRestAssured: boolean;
  hasJavaWireMock: boolean;
  hasJavaAwaitility: boolean;
  hasJavaArchunit: boolean;
  hasJavaJqwik: boolean;
  hasJavaTests: boolean;
};

const JAVA_GROUP_ID = "com.example";
const JAVA_JPA_REQUIRED_LIBRARIES = new Set(["flyway", "liquibase"]);

// Java reserved words + boolean/null literals. Using any of these as a
// package segment produces uncompilable code (`package com.example.class;`).
// Source: JLS §3.9 (keywords) + §3.10.3 (boolean literals) + §3.10.8 (null literal).
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

function sanitizeJavaArtifactId(projectName: string): string {
  const sanitized = projectName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return sanitized || "app";
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

function createJavaTemplateContext(config: ProjectConfig): JavaTemplateContext {
  const javaArtifactId = sanitizeJavaArtifactId(config.projectName);
  const javaPackageName = `${JAVA_GROUP_ID}.${sanitizeJavaPackageSuffix(config.projectName)}`;
  const hasJavaBuildTool = config.javaBuildTool !== "none";
  // A "no framework" Java scaffold is plain Java. Spring Boot also requires
  // Maven/Gradle, so if validation is bypassed and the user selects
  // `javaWebFramework=spring-boot` with `javaBuildTool=none`, fall back to the
  // plain-Java path instead of emitting uncompilable Spring sources.
  const isJavaSpringBoot = config.javaWebFramework === "spring-boot" && hasJavaBuildTool;
  const isJavaQuarkus = config.javaWebFramework === "quarkus" && hasJavaBuildTool;
  // `micronaut` is added to `JavaWebFrameworkSchema` separately; cast so this
  // handler compiles ahead of (and after) that schema widening landing.
  const isJavaMicronaut = config.javaWebFramework === "micronaut" && hasJavaBuildTool;
  const hasJavaJpa = isJavaSpringBoot && config.javaOrm === "spring-data-jpa";
  const rawLibraries = isJavaSpringBoot
    ? (config.javaLibraries || []).filter((library) => library !== "none")
    : [];
  const rawLibrarySet = new Set(rawLibraries);
  // Flyway requires Spring Data JPA in the current Java scaffold
  // (see compatibility.ts `getDisabledReason` for the matching compat rule).
  // If the user selects Flyway without JPA, we silently drop it here so the
  // generated `pom.xml` / `build.gradle.kts` doesn't advertise a dependency
  // that the scaffold cannot wire up — the Flyway auto-config would otherwise
  // crash the app on startup with "No qualifying bean of type DataSource".
  const javaLibraries: typeof rawLibraries = [];
  for (const library of rawLibraries) {
    if (JAVA_JPA_REQUIRED_LIBRARIES.has(library) && !hasJavaJpa) {
      continue;
    }
    if (library === "liquibase" && rawLibrarySet.has("flyway")) {
      continue;
    }
    javaLibraries.push(library);
  }
  const testingLibraries = hasJavaBuildTool
    ? (config.javaTestingLibraries || []).filter((library) => library !== "none")
    : [];
  const hasJavaMockito = testingLibraries.includes("mockito");
  const hasJavaTestcontainers = testingLibraries.includes("testcontainers");
  const hasJavaAssertj = testingLibraries.includes("assertj");
  const hasJavaRestAssured = testingLibraries.includes("rest-assured");
  const hasJavaWireMock = testingLibraries.includes("wiremock");
  const hasJavaAwaitility = testingLibraries.includes("awaitility");
  const hasJavaArchunit = testingLibraries.includes("archunit");
  const hasJavaJqwik = testingLibraries.includes("jqwik");
  const hasJavaTests = testingLibraries.length > 0;

  return {
    ...config,
    javaArtifactId,
    javaGroupId: JAVA_GROUP_ID,
    javaPackageName,
    javaPackagePath: javaPackageName.replace(/\./g, "/"),
    hasJavaBuildTool,
    isJavaMaven: config.javaBuildTool === "maven",
    isJavaGradle: config.javaBuildTool === "gradle",
    isJavaSpringBoot,
    isJavaQuarkus,
    isJavaMicronaut,
    isJavaPlainJava: !isJavaSpringBoot && !isJavaQuarkus && !isJavaMicronaut,
    hasJavaJpa,
    hasJavaJooq: isJavaSpringBoot && config.javaOrm === "jooq",
    hasJavaMybatis: isJavaSpringBoot && config.javaOrm === "mybatis",
    hasJavaKeycloak: isJavaSpringBoot && config.javaAuth === "keycloak",
    hasJavaGraphql: isJavaSpringBoot && config.javaApi === "spring-graphql",
    // The OpenAPI Generator `spring` generator targets Spring Boot, so this
    // API layer is gated to Spring Boot exactly like `spring-graphql`.
    // `openapi-generator` is added to `JavaApiSchema` separately; cast to string
    // so this handler compiles ahead of (and after) that schema widening.
    isJavaOpenApiGenerator: isJavaSpringBoot && config.javaApi === "openapi-generator",
    // grpc-java runs its own gRPC server (via protoc codegen) alongside the
    // Spring Boot web server, so this API layer is gated to Spring Boot exactly
    // like `spring-graphql` and `openapi-generator`.
    hasJavaGrpc: isJavaSpringBoot && config.javaApi === "grpc",
    hasJavaLogback: isJavaSpringBoot && config.javaLogging === "logback",
    // log4j2 is an additive logging backend supported for Spring Boot,
    // Micronaut, and plain Java. Quarkus keeps its own default logging
    // subsystem (JBoss LogManager) and ignores this flag.
    // `log4j2` is added to `JavaLoggingSchema` separately; cast to string so
    // this handler compiles ahead of (and after) that schema widening landing.
    hasJavaLog4j2: config.javaLogging === "log4j2",
    hasJavaAmqp: javaLibraries.includes("spring-amqp"),
    hasJavaOtel: javaLibraries.includes("opentelemetry-java"),
    hasJavaSecurity: isJavaSpringBoot && config.javaAuth === "spring-security",
    hasJavaActuator: javaLibraries.includes("spring-actuator"),
    hasJavaValidation: javaLibraries.includes("spring-validation"),
    hasJavaFlyway: javaLibraries.includes("flyway"),
    hasJavaLiquibase: javaLibraries.includes("liquibase"),
    hasJavaSpringdocOpenapi: javaLibraries.includes("springdoc-openapi"),
    hasJavaLombok: javaLibraries.includes("lombok"),
    hasJavaMapstruct: javaLibraries.includes("mapstruct"),
    hasJavaCaffeine: javaLibraries.includes("caffeine"),
    hasJavaResilience4j: javaLibraries.includes("resilience4j"),
    hasJavaWebflux: javaLibraries.includes("spring-webflux"),
    hasJavaBatch: javaLibraries.includes("spring-batch"),
    hasJavaKafka: javaLibraries.includes("spring-kafka"),
    hasJavaMail: javaLibraries.includes("spring-mail"),
    hasJavaDevtools: javaLibraries.includes("spring-devtools"),
    hasJavaMicrometerPrometheus: javaLibraries.includes("micrometer-prometheus"),
    hasJavaThymeleaf: javaLibraries.includes("thymeleaf"),
    hasJavaAnnotationProcessors:
      javaLibraries.includes("lombok") || javaLibraries.includes("mapstruct"),
    hasJavaMockito,
    hasJavaTestcontainers,
    hasJavaAssertj,
    hasJavaRestAssured,
    hasJavaWireMock,
    hasJavaAwaitility,
    hasJavaArchunit,
    hasJavaJqwik,
    hasJavaTests,
  };
}

function shouldSkipJavaTemplate(templatePath: string, context: JavaTemplateContext): boolean {
  const isEmailServiceTemplate = templatePath.endsWith("/service/EmailService.java.hbs");

  if (
    (!context.isJavaMaven &&
      (templatePath === "java-base/pom.xml.hbs" ||
        templatePath.startsWith("java-base/.mvn/") ||
        templatePath === "java-base/mvnw" ||
        templatePath === "java-base/mvnw.cmd")) ||
    (!context.isJavaGradle &&
      (templatePath === "java-base/build.gradle.kts.hbs" ||
        templatePath === "java-base/settings.gradle.kts.hbs" ||
        templatePath.startsWith("java-base/gradle/") ||
        templatePath === "java-base/gradlew" ||
        templatePath === "java-base/gradlew.bat"))
  ) {
    return true;
  }

  // Plain Java keeps no config/controller/resource surface, EXCEPT the log4j2
  // config file when javaLogging === "log4j2" and there is a build tool to
  // wire the log4j2 dependencies (a source-only scaffold has no classpath).
  const isPlainJavaLog4j2Config =
    context.hasJavaLog4j2 &&
    context.hasJavaBuildTool &&
    templatePath.endsWith("/log4j2.xml.hbs");
  if (
    context.isJavaPlainJava &&
    !isPlainJavaLog4j2Config &&
    (templatePath.includes("/config/") ||
      templatePath.includes("/controller/") ||
      templatePath.includes("src/main/resources/"))
  ) {
    return true;
  }

  if (context.isJavaQuarkus) {
    if (
      templatePath.includes("/controller/") ||
      templatePath.includes("/config/") ||
      templatePath.includes("src/main/resources/") ||
      templatePath.endsWith("/ApplicationTests.java.hbs") ||
      templatePath.endsWith("/ApplicationContainerTests.java.hbs")
    ) {
      return true;
    }
  }

  // Micronaut keeps its own web surface: a single `HelloController` (health +
  // root endpoint) and a Micronaut-flavoured `application.yml`. Skip the
  // Spring-specific `HealthController` and the Spring/plain-Java lifecycle tests
  // (`Application.main` there either boots Spring or prints a greeting — neither
  // matches a Micronaut server main).
  if (context.isJavaMicronaut) {
    if (
      templatePath.endsWith("/controller/HealthController.java.hbs") ||
      templatePath.endsWith("/ApplicationTests.java.hbs") ||
      templatePath.endsWith("/ApplicationContainerTests.java.hbs")
    ) {
      return true;
    }
  }

  // The Micronaut `HelloController` is Micronaut-only; every other framework
  // (Spring Boot, Quarkus, plain Java) must not emit it.
  if (!context.isJavaMicronaut && templatePath.endsWith("/controller/HelloController.java.hbs")) {
    return true;
  }

  if (!context.isJavaQuarkus && templatePath.includes("/resource/")) {
    return true;
  }

  if (!context.hasJavaJpa) {
    if (
      templatePath.includes("/domain/") ||
      templatePath.includes("/repository/") ||
      (templatePath.includes("/service/") && !isEmailServiceTemplate) ||
      templatePath.endsWith("/controller/UserController.java.hbs") ||
      templatePath.endsWith("/service/AppUserServiceTest.java.hbs")
    ) {
      return true;
    }
  }

  if (
    !context.hasJavaSecurity &&
    !context.hasJavaKeycloak &&
    !context.hasJavaOtel &&
    templatePath.includes("/config/")
  ) {
    return true;
  }
  if (!context.hasJavaOtel && templatePath.endsWith("/config/OtelConfig.java.hbs")) {
    return true;
  }
  if (!context.hasJavaSecurity && templatePath.endsWith("/config/SecurityConfig.java.hbs")) {
    return true;
  }
  if (
    !context.hasJavaKeycloak &&
    templatePath.endsWith("/config/ResourceServerConfig.java.hbs")
  ) {
    return true;
  }
  if (!context.hasJavaGraphql && templatePath.includes("/graphql/")) {
    return true;
  }
  if (
    !context.hasJavaGraphql &&
    templatePath.endsWith("/controller/GraphqlController.java.hbs")
  ) {
    return true;
  }
  // gRPC surface: the .proto contract (src/main/proto) is the protoc codegen
  // input and the /grpc/ Java sources are the service impl + server lifecycle.
  // Emit them only when the gRPC API layer is selected (Spring Boot only).
  if (!context.hasJavaGrpc && (templatePath.includes("/proto/") || templatePath.includes("/grpc/"))) {
    return true;
  }
  // The OpenAPI spec is the codegen input; emit it only when the OpenAPI
  // Generator API layer is selected (Spring Boot only). Other frameworks skip
  // src/main/resources wholesale above, so this guard is what keeps it out of a
  // Spring Boot scaffold that did not opt into openapi-generator.
  if (!context.isJavaOpenApiGenerator && templatePath.endsWith("/openapi.yaml.hbs")) {
    return true;
  }
  if (!context.hasJavaJooq && templatePath.includes("/jooqdata/")) {
    return true;
  }
  if (!context.hasJavaMybatis && templatePath.includes("/mybatisdata/")) {
    return true;
  }
  if (!context.hasJavaLogback && templatePath.endsWith("/logback-spring.xml.hbs")) {
    return true;
  }

  // log4j2 config files are emitted only when javaLogging === "log4j2".
  // Spring Boot uses the `-spring` variant so Spring controls initialization;
  // Micronaut and plain Java (with a build tool) use the standard `log4j2.xml`.
  if (
    templatePath.endsWith("/log4j2-spring.xml.hbs") &&
    !(context.hasJavaLog4j2 && context.isJavaSpringBoot)
  ) {
    return true;
  }
  if (
    templatePath.endsWith("/log4j2.xml.hbs") &&
    !(
      context.hasJavaLog4j2 &&
      context.hasJavaBuildTool &&
      (context.isJavaMicronaut || context.isJavaPlainJava)
    )
  ) {
    return true;
  }

  if (!context.hasJavaTests && templatePath.includes("src/test/java/")) {
    return true;
  }

  if (
    !context.hasJavaMockito &&
    (templatePath.endsWith("/service/AppUserServiceTest.java.hbs") ||
      templatePath.endsWith("/MockitoSmokeTest.java.hbs"))
  ) {
    return true;
  }

  if (
    !context.hasJavaTestcontainers &&
    templatePath.endsWith("/ApplicationContainerTests.java.hbs")
  ) {
    return true;
  }

  if ((!context.hasJavaFlyway || !context.hasJavaJpa) && templatePath.includes("/db/migration/")) {
    return true;
  }

  if (
    (!context.hasJavaLiquibase || !context.hasJavaJpa) &&
    templatePath.includes("/db/changelog/")
  ) {
    return true;
  }

  if (!context.hasJavaRestAssured && templatePath.endsWith("/RestAssuredHttpTest.java.hbs")) {
    return true;
  }

  if (!context.hasJavaWireMock && templatePath.endsWith("/WireMockHttpTest.java.hbs")) {
    return true;
  }

  if (!context.hasJavaAwaitility && templatePath.endsWith("/AsyncWorkflowTest.java.hbs")) {
    return true;
  }

  if (
    (!context.hasJavaMapstruct || !context.hasJavaJpa) &&
    (templatePath.includes("/dto/") || templatePath.includes("/mapper/"))
  ) {
    return true;
  }

  if (
    !context.hasJavaCaffeine &&
    (templatePath.endsWith("/controller/CacheController.java.hbs") ||
      templatePath.endsWith("/cache/CachedTimeService.java.hbs"))
  ) {
    return true;
  }

  if (!context.hasJavaArchunit && templatePath.endsWith("/ArchitectureTest.java.hbs")) {
    return true;
  }

  if (!context.hasJavaJqwik && templatePath.endsWith("/PropertyBasedTest.java.hbs")) {
    return true;
  }

  return false;
}

function transformJavaOutputPath(relativePath: string, context: JavaTemplateContext): string {
  return transformFilename(relativePath.replace(/__javaPackagePath__/g, context.javaPackagePath));
}

export async function processJavaBaseTemplate(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
  targetPath = "",
): Promise<void> {
  if (config.ecosystem !== "java") return;

  const prefix = "java-base/";
  const context = createJavaTemplateContext(config);

  for (const [templatePath, content] of templates) {
    if (!templatePath.startsWith(prefix)) continue;
    if (shouldSkipJavaTemplate(templatePath, context)) continue;

    const relativePath = templatePath.slice(prefix.length);
    const outputPath = transformJavaOutputPath(relativePath, context);
    const destPath = targetPath ? `${targetPath}/${outputPath}` : outputPath;

    let processedContent: string;
    if (isBinaryFile(templatePath)) {
      processedContent = "[Binary file]";
    } else if (templatePath.endsWith(".hbs")) {
      processedContent = processTemplateString(content, context as ProjectConfig);
    } else {
      processedContent = content;
    }

    if (!isBinaryFile(templatePath) && processedContent.trim() === "") continue;

    const sourcePath = isBinaryFile(templatePath) ? templatePath : undefined;
    vfs.writeFile(destPath, processedContent, sourcePath);
  }
}
