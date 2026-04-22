import type { VirtualFile, VirtualNode } from "@better-fullstack/template-generator";

import { describe, expect, it } from "bun:test";

import { createVirtual } from "../src/index";
import {
  analyzeStackCompatibility,
  type CompatibilityInput,
  EcosystemSchema,
  JavaAuthSchema,
  JavaBuildToolSchema,
  JavaLibrariesSchema,
  JavaOrmSchema,
  JavaTestingLibrariesSchema,
  JavaWebFrameworkSchema,
} from "../src/types";

function extractEnumValues<T extends string>(schema: { options: readonly T[] }): readonly T[] {
  return schema.options;
}

function findFile(node: VirtualNode, path: string): VirtualFile | undefined {
  if (node.type === "file") {
    const normalizedNodePath = node.path.replace(/^\/+/, "");
    const normalizedPath = path.replace(/^\/+/, "");
    if (normalizedNodePath === normalizedPath) {
      return node;
    }
    return undefined;
  }

  for (const child of node.children) {
    const found = findFile(child, path);
    if (found) return found;
  }
  return undefined;
}

function hasFile(node: VirtualNode, path: string): boolean {
  return findFile(node, path) !== undefined;
}

function getFileContent(node: VirtualNode, path: string): string | undefined {
  return findFile(node, path)?.content;
}

function createJavaCompatibilityInput(
  overrides: Partial<CompatibilityInput> = {},
): CompatibilityInput {
  return {
    ecosystem: "java",
    projectName: "java-compatibility",
    webFrontend: ["none"],
    nativeFrontend: ["none"],
    astroIntegration: "none",
    runtime: "none",
    backend: "none",
    database: "none",
    orm: "none",
    dbSetup: "none",
    auth: "none",
    payments: "none",
    email: "none",
    fileUpload: "none",
    logging: "none",
    observability: "none",
    featureFlags: "none",
    analytics: "none",
    backendLibraries: "none",
    stateManagement: "none",
    forms: "none",
    validation: "none",
    testing: "none",
    realtime: "none",
    jobQueue: "none",
    caching: "none",
    i18n: "none",
    search: "none",
    fileStorage: "none",
    animation: "none",
    cssFramework: "none",
    uiLibrary: "none",
    shadcnBase: "radix",
    shadcnStyle: "nova",
    shadcnIconLibrary: "lucide",
    shadcnColorTheme: "neutral",
    shadcnBaseColor: "neutral",
    shadcnFont: "inter",
    shadcnRadius: "default",
    cms: "none",
    codeQuality: [],
    documentation: [],
    appPlatforms: [],
    packageManager: "bun",
    versionChannel: "stable",
    examples: [],
    aiSdk: "none",
    aiDocs: [],
    git: "false",
    install: "false",
    api: "none",
    webDeploy: "none",
    serverDeploy: "none",
    yolo: "false",
    rustWebFramework: "none",
    rustFrontend: "none",
    rustOrm: "none",
    rustApi: "none",
    rustCli: "none",
    rustLibraries: [],
    rustLogging: "none",
    rustErrorHandling: "none",
    rustCaching: "none",
    rustAuth: "none",
    pythonWebFramework: "none",
    pythonOrm: "none",
    pythonValidation: "none",
    pythonAi: [],
    pythonAuth: "none",
    pythonTaskQueue: "none",
    pythonGraphql: "none",
    pythonQuality: "none",
    goWebFramework: "none",
    goOrm: "none",
    goApi: "none",
    goCli: "none",
    goLogging: "none",
    goAuth: "none",
    javaWebFramework: "spring-boot",
    javaBuildTool: "maven",
    javaOrm: "none",
    javaAuth: "none",
    javaLibraries: [],
    javaTestingLibraries: ["junit5"],
    ...overrides,
  };
}

const ECOSYSTEMS = extractEnumValues(EcosystemSchema);
const JAVA_WEB_FRAMEWORKS = extractEnumValues(JavaWebFrameworkSchema);
const JAVA_BUILD_TOOLS = extractEnumValues(JavaBuildToolSchema);
const JAVA_LIBRARIES = extractEnumValues(JavaLibrariesSchema);
const JAVA_ORMS = extractEnumValues(JavaOrmSchema);
const JAVA_AUTHS = extractEnumValues(JavaAuthSchema);
const JAVA_TESTING_LIBRARIES = extractEnumValues(JavaTestingLibrariesSchema);

describe("Java Ecosystem", () => {
  describe("Schema Definitions", () => {
    it("should expose java as a valid ecosystem", () => {
      expect(ECOSYSTEMS).toContain("java");
      expect(ECOSYSTEMS).toHaveLength(5);
    });

    it("should only expose scaffolded Java web framework values", () => {
      expect(JAVA_WEB_FRAMEWORKS).toEqual(["spring-boot", "none"]);
      expect(JAVA_WEB_FRAMEWORKS).not.toContain("quarkus");
    });

    it("should only expose scaffolded Java build tool values", () => {
      expect(JAVA_BUILD_TOOLS).toEqual(["maven", "gradle", "none"]);
    });

    it("should expose Java libraries, ORM, auth, and testing values", () => {
      expect(JAVA_LIBRARIES).toEqual(["spring-actuator", "spring-validation", "flyway", "none"]);
      expect(JAVA_ORMS).toEqual(["spring-data-jpa", "none"]);
      expect(JAVA_AUTHS).toEqual(["spring-security", "none"]);
      expect(JAVA_TESTING_LIBRARIES).toEqual(["junit5", "mockito", "testcontainers", "none"]);
    });
  });

  describe("Java Base Template Structure", () => {
    it("should create a Spring Boot project with Maven Wrapper files", async () => {
      const result = await createVirtual({
        projectName: "my-app",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: [],
        javaTestingLibraries: ["junit5"],
      });

      expect(result.success).toBe(true);
      const root = result.tree!.root;

      expect(hasFile(root, "pom.xml")).toBe(true);
      expect(hasFile(root, "mvnw")).toBe(true);
      expect(hasFile(root, "mvnw.cmd")).toBe(true);
      expect(hasFile(root, ".mvn/wrapper/maven-wrapper.properties")).toBe(true);
      expect(hasFile(root, ".gitattributes")).toBe(true);
      expect(hasFile(root, ".gitignore")).toBe(true);
      expect(hasFile(root, ".env.example")).toBe(true);
      expect(hasFile(root, "README.md")).toBe(true);
      expect(hasFile(root, "src/main/java/com/example/myapp/Application.java")).toBe(true);
      expect(hasFile(root, "src/main/java/com/example/myapp/controller/HealthController.java")).toBe(
        true,
      );
      expect(hasFile(root, "src/main/resources/application.yml")).toBe(true);
      expect(hasFile(root, "src/test/java/com/example/myapp/ApplicationTests.java")).toBe(true);
    });

    it("should generate a Maven pom with Spring Boot webmvc test support", async () => {
      const result = await createVirtual({
        projectName: "java-pom-check",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: [],
        javaTestingLibraries: ["junit5"],
      });

      expect(result.success).toBe(true);
      const pomContent = getFileContent(result.tree!.root, "pom.xml");

      expect(pomContent).toContain("<artifactId>spring-boot-starter-webmvc</artifactId>");
      expect(pomContent).toContain("<artifactId>spring-boot-starter-webmvc-test</artifactId>");
      expect(pomContent).toContain("<groupId>com.example</groupId>");
      expect(pomContent).toContain("<artifactId>java-pom-check</artifactId>");
      expect(pomContent).not.toContain("package.json");
    });

    it("should create a Spring Boot project with Gradle Wrapper files", async () => {
      const result = await createVirtual({
        projectName: "java-gradle-check",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "gradle",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: ["spring-actuator"],
        javaTestingLibraries: ["junit5"],
        aiDocs: ["claude-md", "cursorrules"],
      });

      expect(result.success).toBe(true);
      const root = result.tree!.root;

      expect(hasFile(root, "build.gradle.kts")).toBe(true);
      expect(hasFile(root, "settings.gradle.kts")).toBe(true);
      expect(hasFile(root, "gradlew")).toBe(true);
      expect(hasFile(root, "gradlew.bat")).toBe(true);
      expect(hasFile(root, "gradle/wrapper/gradle-wrapper.properties")).toBe(true);
      expect(hasFile(root, "pom.xml")).toBe(false);
      expect(hasFile(root, "mvnw")).toBe(false);

      const readmeContent = getFileContent(root, "README.md");
      const claudeContent = getFileContent(root, "CLAUDE.md");
      const cursorRules = getFileContent(root, ".cursorrules");

      expect(readmeContent).toContain("./gradlew test");
      expect(readmeContent).toContain("./gradlew bootRun");
      expect(claudeContent).toContain("Build Tool: gradle");
      expect(claudeContent).toContain("Libraries: spring-actuator");
      expect(claudeContent).toContain("./gradlew test");
      expect(cursorRules).toContain("You are working on a Java project.");
      expect(cursorRules).toContain("Use ./gradlew for all Gradle commands.");
    });

    it("should create a plain Java Maven project when no framework is selected", async () => {
      const result = await createVirtual({
        projectName: "java-plain-maven",
        ecosystem: "java",
        javaWebFramework: "none",
        javaBuildTool: "maven",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: [],
        javaTestingLibraries: ["junit5", "mockito"],
      });

      expect(result.success).toBe(true);
      const root = result.tree!.root;

      expect(hasFile(root, "pom.xml")).toBe(true);
      expect(hasFile(root, "mvnw")).toBe(true);
      expect(hasFile(root, "src/main/java/com/example/javaplainmaven/Application.java")).toBe(
        true,
      );
      expect(hasFile(root, "src/main/resources/application.yml")).toBe(false);
      expect(
        hasFile(root, "src/main/java/com/example/javaplainmaven/controller/HealthController.java"),
      ).toBe(false);
      expect(hasFile(root, "src/test/java/com/example/javaplainmaven/ApplicationTests.java")).toBe(
        true,
      );

      const pomContent = getFileContent(root, "pom.xml");
      const readmeContent = getFileContent(root, "README.md");

      expect(pomContent).toContain("exec-maven-plugin");
      expect(pomContent).not.toContain("spring-boot-starter-parent");
      expect(pomContent).not.toContain("spring-boot-starter-webmvc");
      expect(readmeContent).toContain("./mvnw exec:java");
      expect(readmeContent).not.toContain("spring-boot:run");
    });

    it("should create a source-only plain Java project when no build tool is selected", async () => {
      const result = await createVirtual({
        projectName: "java-source-only",
        ecosystem: "java",
        javaWebFramework: "none",
        javaBuildTool: "none",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: [],
        javaTestingLibraries: [],
      });

      expect(result.success).toBe(true);
      const root = result.tree!.root;

      expect(hasFile(root, "pom.xml")).toBe(false);
      expect(hasFile(root, "build.gradle.kts")).toBe(false);
      expect(hasFile(root, "mvnw")).toBe(false);
      expect(hasFile(root, "gradlew")).toBe(false);
      expect(hasFile(root, "src/main/java/com/example/javasourceonly/Application.java")).toBe(
        true,
      );
      expect(hasFile(root, "src/main/resources/application.yml")).toBe(false);
      expect(hasFile(root, "src/test/java/com/example/javasourceonly/ApplicationTests.java")).toBe(
        false,
      );

      const readmeContent = getFileContent(root, "README.md");
      const claudeContent = getFileContent(root, "CLAUDE.md");

      expect(readmeContent).toContain(
        "javac -d out src/main/java/com/example/javasourceonly/Application.java",
      );
      expect(readmeContent).toContain("java -cp out com.example.javasourceonly.Application");
      expect(claudeContent).toContain("Scaffold: plain-java");
      expect(claudeContent).not.toContain("Build Tool:");
    });

    it("should add JPA, security, libraries, and testing scaffolding when selected", async () => {
      const result = await createVirtual({
        projectName: "java-full",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaOrm: "spring-data-jpa",
        javaAuth: "spring-security",
        javaLibraries: ["spring-actuator", "spring-validation", "flyway"],
        javaTestingLibraries: ["junit5", "mockito", "testcontainers"],
      });

      expect(result.success).toBe(true);
      const root = result.tree!.root;

      expect(hasFile(root, "src/main/java/com/example/javafull/domain/AppUser.java")).toBe(true);
      expect(hasFile(root, "src/main/java/com/example/javafull/repository/AppUserRepository.java")).toBe(
        true,
      );
      expect(hasFile(root, "src/main/java/com/example/javafull/service/AppUserService.java")).toBe(
        true,
      );
      expect(hasFile(root, "src/main/java/com/example/javafull/controller/UserController.java")).toBe(
        true,
      );
      expect(hasFile(root, "src/main/java/com/example/javafull/config/SecurityConfig.java")).toBe(
        true,
      );
      expect(hasFile(root, "src/main/resources/db/migration/V1__init.sql")).toBe(true);
      expect(hasFile(root, "src/test/java/com/example/javafull/service/AppUserServiceTest.java")).toBe(
        true,
      );
      expect(hasFile(root, "src/test/java/com/example/javafull/ApplicationContainerTests.java")).toBe(
        true,
      );

      const pomContent = getFileContent(root, "pom.xml");
      const applicationConfig = getFileContent(root, "src/main/resources/application.yml");
      const envContent = getFileContent(root, ".env.example");
      const userControllerContent = getFileContent(
        root,
        "src/main/java/com/example/javafull/controller/UserController.java",
      );
      const userEntityContent = getFileContent(
        root,
        "src/main/java/com/example/javafull/domain/AppUser.java",
      );

      expect(pomContent).toContain("spring-boot-starter-data-jpa");
      expect(pomContent).toContain("spring-boot-starter-security");
      expect(pomContent).toContain("spring-boot-starter-actuator");
      expect(pomContent).toContain("spring-boot-starter-validation");
      expect(pomContent).toContain("flyway-core");
      expect(pomContent).toContain("spring-boot-testcontainers");
      expect(applicationConfig).toContain("jdbc:h2:file:./data/java-full");
      expect(applicationConfig).toContain("ddl-auto: validate");
      expect(applicationConfig).toContain("include: health,info,metrics");
      expect(envContent).toContain("APP_BASIC_USERNAME=admin");
      expect(envContent).toContain("APP_BASIC_PASSWORD=change-me");
      expect(userControllerContent).toContain("@Valid @RequestBody");
      expect(userEntityContent).toContain("@Email");
    });

    it("should omit optional Java files when those features are not selected", async () => {
      const result = await createVirtual({
        projectName: "java-minimal",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: [],
        javaTestingLibraries: [],
      });

      expect(result.success).toBe(true);
      const root = result.tree!.root;

      expect(hasFile(root, "src/main/java/com/example/javaminimal/config/SecurityConfig.java")).toBe(
        false,
      );
      expect(hasFile(root, "src/main/java/com/example/javaminimal/controller/UserController.java")).toBe(
        false,
      );
      expect(hasFile(root, "src/test/java/com/example/javaminimal/ApplicationTests.java")).toBe(
        false,
      );
    });
  });

  describe("Java Compatibility Analysis", () => {
    it("should clear Spring-only Java features when the framework is none", () => {
      const result = analyzeStackCompatibility(
        createJavaCompatibilityInput({
          javaWebFramework: "none",
          javaBuildTool: "maven",
          javaOrm: "spring-data-jpa",
          javaAuth: "spring-security",
          javaLibraries: ["spring-actuator", "flyway"],
          javaTestingLibraries: ["junit5", "mockito"],
        }),
      );

      expect(result.adjustedStack?.javaWebFramework).toBe("none");
      expect(result.adjustedStack?.javaOrm).toBe("none");
      expect(result.adjustedStack?.javaAuth).toBe("none");
      expect(result.adjustedStack?.javaLibraries).toEqual([]);
      expect(result.adjustedStack?.javaTestingLibraries).toEqual(["junit5", "mockito"]);
      expect(result.changes.some((adjustment) => adjustment.category === "javaWebFramework")).toBe(
        true,
      );
    });

    it("should clear the Java framework and testing libraries when the build tool is none", () => {
      const result = analyzeStackCompatibility(
        createJavaCompatibilityInput({
          javaWebFramework: "spring-boot",
          javaBuildTool: "none",
          javaOrm: "spring-data-jpa",
          javaAuth: "spring-security",
          javaLibraries: ["spring-actuator"],
          javaTestingLibraries: ["junit5"],
        }),
      );

      expect(result.adjustedStack?.javaWebFramework).toBe("none");
      expect(result.adjustedStack?.javaBuildTool).toBe("none");
      expect(result.adjustedStack?.javaOrm).toBe("none");
      expect(result.adjustedStack?.javaAuth).toBe("none");
      expect(result.adjustedStack?.javaLibraries).toEqual([]);
      expect(result.adjustedStack?.javaTestingLibraries).toEqual([]);
      expect(result.changes.some((adjustment) => adjustment.category === "javaBuildTool")).toBe(
        true,
      );
    });
  });
});
