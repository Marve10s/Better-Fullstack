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
  isJavaPlainJava: boolean;
  hasJavaJpa: boolean;
  hasJavaSecurity: boolean;
  hasJavaActuator: boolean;
  hasJavaValidation: boolean;
  hasJavaFlyway: boolean;
  hasJavaLiquibase: boolean;
  hasJavaSpringdocOpenapi: boolean;
  hasJavaLombok: boolean;
  hasJavaMapstruct: boolean;
  hasJavaCaffeine: boolean;
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
    isJavaPlainJava: !isJavaSpringBoot,
    hasJavaJpa,
    hasJavaSecurity: isJavaSpringBoot && config.javaAuth === "spring-security",
    hasJavaActuator: javaLibraries.includes("spring-actuator"),
    hasJavaValidation: javaLibraries.includes("spring-validation"),
    hasJavaFlyway: javaLibraries.includes("flyway"),
    hasJavaLiquibase: javaLibraries.includes("liquibase"),
    hasJavaSpringdocOpenapi: javaLibraries.includes("springdoc-openapi"),
    hasJavaLombok: javaLibraries.includes("lombok"),
    hasJavaMapstruct: javaLibraries.includes("mapstruct"),
    hasJavaCaffeine: javaLibraries.includes("caffeine"),
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

  if (
    !context.isJavaSpringBoot &&
    (templatePath.includes("/config/") ||
      templatePath.includes("/controller/") ||
      templatePath.includes("src/main/resources/"))
  ) {
    return true;
  }

  if (!context.hasJavaJpa) {
    if (
      templatePath.includes("/domain/") ||
      templatePath.includes("/repository/") ||
      templatePath.includes("/service/") ||
      templatePath.endsWith("/controller/UserController.java.hbs") ||
      templatePath.endsWith("/service/AppUserServiceTest.java.hbs")
    ) {
      return true;
    }
  }

  if (!context.hasJavaSecurity && templatePath.includes("/config/")) {
    return true;
  }

  if (!context.hasJavaTests && templatePath.includes("src/test/java/")) {
    return true;
  }

  if (!context.hasJavaMockito && templatePath.endsWith("/service/AppUserServiceTest.java.hbs")) {
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
): Promise<void> {
  if (config.ecosystem !== "java") return;

  const prefix = "java-base/";
  const context = createJavaTemplateContext(config);

  for (const [templatePath, content] of templates) {
    if (!templatePath.startsWith(prefix)) continue;
    if (shouldSkipJavaTemplate(templatePath, context)) continue;

    const relativePath = templatePath.slice(prefix.length);
    const outputPath = transformJavaOutputPath(relativePath, context);

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
    vfs.writeFile(outputPath, processedContent, sourcePath);
  }
}
