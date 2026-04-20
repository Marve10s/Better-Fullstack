import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";
import type { TemplateData } from "./utils";

import { isBinaryFile, processTemplateString, transformFilename } from "../core/template-processor";

type JavaTemplateContext = ProjectConfig & {
  javaArtifactId: string;
  javaGroupId: string;
  javaPackageName: string;
  javaPackagePath: string;
  isJavaMaven: boolean;
  isJavaGradle: boolean;
  hasJavaJpa: boolean;
  hasJavaSecurity: boolean;
  hasJavaActuator: boolean;
  hasJavaValidation: boolean;
  hasJavaFlyway: boolean;
  hasJavaMockito: boolean;
  hasJavaTestcontainers: boolean;
  hasJavaTests: boolean;
};

const JAVA_GROUP_ID = "com.example";

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
  const alphanumericOnly = projectName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
  const withLetterPrefix = /^[a-z]/.test(alphanumericOnly) ? alphanumericOnly : `app${alphanumericOnly}`;
  return withLetterPrefix || "app";
}

function createJavaTemplateContext(config: ProjectConfig): JavaTemplateContext {
  const javaArtifactId = sanitizeJavaArtifactId(config.projectName);
  const javaPackageName = `${JAVA_GROUP_ID}.${sanitizeJavaPackageSuffix(config.projectName)}`;
  const javaLibraries = (config.javaLibraries || []).filter((library) => library !== "none");
  const testingLibraries = (config.javaTestingLibraries || []).filter((library) => library !== "none");
  const hasJavaMockito = testingLibraries.includes("mockito");
  const hasJavaTestcontainers = testingLibraries.includes("testcontainers");
  const hasJavaTests = testingLibraries.length > 0;

  return {
    ...config,
    javaArtifactId,
    javaGroupId: JAVA_GROUP_ID,
    javaPackageName,
    javaPackagePath: javaPackageName.replace(/\./g, "/"),
    isJavaMaven: config.javaBuildTool === "maven",
    isJavaGradle: config.javaBuildTool === "gradle",
    hasJavaJpa: config.javaOrm === "spring-data-jpa",
    hasJavaSecurity: config.javaAuth === "spring-security",
    hasJavaActuator: javaLibraries.includes("spring-actuator"),
    hasJavaValidation: javaLibraries.includes("spring-validation"),
    hasJavaFlyway: javaLibraries.includes("flyway"),
    hasJavaMockito,
    hasJavaTestcontainers,
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

  if (
    (!context.hasJavaFlyway || !context.hasJavaJpa) &&
    templatePath.includes("/db/migration/")
  ) {
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
