import { describe, expect, it } from "bun:test";

import { getDefaultConfig } from "../src/constants";
import { normalizeKotlinJavaSelection } from "../src/helpers/core/command-handlers";
import { createVirtual } from "../src/index";
import {
  resolveJavaApiPrompt,
  resolveJavaBuildToolPrompt,
  resolveJavaLibrariesPrompt,
  resolveJavaOrmPrompt,
  resolveJavaTestingLibrariesPrompt,
} from "../src/prompts/java-ecosystem";
import {
  analyzeStackCompatibility,
  type CompatibilityInput,
  DEFAULT_STACK_SELECTION,
  EcosystemSchema,
  evaluateCompatibility,
  getDisabledReason,
  JavaApiSchema,
  JavaAuthSchema,
  JavaBuildToolSchema,
  JavaLibrariesSchema,
  JavaOrmSchema,
  JavaTestingLibrariesSchema,
  JavaWebFrameworkSchema,
  parseStackPartSpecs,
  stackPartsToLegacyProjectConfigPartial,
} from "../src/types";
import { validateConfigForProgrammaticUse } from "../src/utils/config-validation";
import { runWithContext } from "../src/utils/context";
import { generateReproducibleCommand } from "../src/utils/generate-reproducible-command";
import { extractEnumValues } from "./test-utils";
import {
  getVirtualFileContent as getFileContent,
  hasVirtualFile as hasFile,
} from "./virtual-tree-utils";

function createJavaCompatibilityInput(
  overrides: Partial<CompatibilityInput> = {},
): CompatibilityInput {
  const {
    stackMode: _stackMode,
    stackPartSpecs: _stackPartSpecs,
    ...baseSelection
  } = DEFAULT_STACK_SELECTION;

  return {
    ...baseSelection,
    ecosystem: "java",
    projectName: "java-compatibility",
    webFrontend: ["none"],
    runtime: "none",
    backend: "none",
    database: "none",
    orm: "none",
    auth: "none",
    forms: "none",
    validation: "none",
    testing: "none",
    cssFramework: "none",
    uiLibrary: "none",
    appPlatforms: [],
    aiDocs: [],
    git: "false",
    install: "false",
    api: "none",
    rustWebFramework: "none",
    rustOrm: "none",
    rustLogging: "none",
    rustErrorHandling: "none",
    pythonWebFramework: "none",
    pythonOrm: "none",
    pythonValidation: "none",
    pythonQuality: "none",
    goWebFramework: "none",
    goOrm: "none",
    goLogging: "none",
    ...overrides,
  };
}

const ECOSYSTEMS = extractEnumValues(EcosystemSchema);
const JAVA_WEB_FRAMEWORKS = extractEnumValues(JavaWebFrameworkSchema);
const JAVA_BUILD_TOOLS = extractEnumValues(JavaBuildToolSchema);
const JAVA_LIBRARIES = extractEnumValues(JavaLibrariesSchema);
const JAVA_ORMS = extractEnumValues(JavaOrmSchema);
const JAVA_AUTHS = extractEnumValues(JavaAuthSchema);
const JAVA_APIS = extractEnumValues(JavaApiSchema);
const JAVA_TESTING_LIBRARIES = extractEnumValues(JavaTestingLibrariesSchema);

describe("Java Ecosystem", () => {
  describe("Schema Definitions", () => {
    it("should expose java as a valid ecosystem", () => {
      expect(ECOSYSTEMS).toContain("java");
      expect(ECOSYSTEMS).toContain("react-native");
      expect(ECOSYSTEMS).toContain("elixir");
    });

    it("should expose scaffolded Java web framework values", () => {
      expect(JAVA_WEB_FRAMEWORKS).toEqual(["spring-boot", "quarkus", "micronaut", "none"]);
    });

    it("should only expose scaffolded Java build tool values", () => {
      expect(JAVA_BUILD_TOOLS).toEqual(["maven", "gradle", "none"]);
    });

    it("should expose Java libraries, ORM, auth, and testing values", () => {
      expect(JAVA_LIBRARIES).toEqual([
        "spring-actuator",
        "spring-validation",
        "flyway",
        "liquibase",
        "springdoc-openapi",
        "lombok",
        "mapstruct",
        "caffeine",
        "resilience4j",
        "spring-webflux",
        "spring-batch",
        "spring-kafka",
        "spring-mail",
        "spring-devtools",
        "micrometer-prometheus",
        "thymeleaf",
        "spring-amqp",
        "opentelemetry-java",
        "none",
      ]);
      expect(JAVA_ORMS).toEqual(["spring-data-jpa", "jooq", "mybatis", "none"]);
      expect(JAVA_AUTHS).toEqual(["spring-security", "keycloak", "none"]);
      expect(JAVA_APIS).toEqual(["spring-graphql", "openapi-generator", "grpc", "none"]);
      expect(JAVA_TESTING_LIBRARIES).toEqual([
        "junit5",
        "mockito",
        "testcontainers",
        "assertj",
        "rest-assured",
        "wiremock",
        "awaitility",
        "archunit",
        "jqwik",
        "none",
      ]);
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
        javaTestingLibraries: ["junit5", "wiremock", "archunit", "mockito"],
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
      expect(
        hasFile(root, "src/main/java/com/example/myapp/controller/HealthController.java"),
      ).toBe(true);
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
        javaTestingLibraries: ["junit5", "wiremock", "archunit", "mockito"],
      });

      expect(result.success).toBe(true);
      const pomContent = getFileContent(result.tree!.root, "pom.xml");

      expect(pomContent).toContain("<artifactId>spring-boot-starter-webmvc</artifactId>");
      expect(pomContent).toContain("<artifactId>spring-boot-starter-webmvc-test</artifactId>");
      expect(pomContent).toContain("<artifactId>wiremock-standalone</artifactId>");
      expect(pomContent).not.toContain("<artifactId>jetty-bom</artifactId>");
      expect(pomContent).not.toContain("<artifactId>jetty-ee10-bom</artifactId>");
      expect(pomContent).not.toContain("<wiremock.jetty.version>");
      expect(pomContent).toContain("<groupId>com.example</groupId>");
      expect(pomContent).toContain("<artifactId>java-pom-check</artifactId>");
      expect(pomContent).not.toContain("package.json");
    });

    it("should create a Quarkus Maven project with REST support", async () => {
      const result = await createVirtual({
        projectName: "java-quarkus-maven",
        ecosystem: "java",
        javaWebFramework: "quarkus",
        javaBuildTool: "maven",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: [],
        javaTestingLibraries: ["junit5", "wiremock", "archunit", "mockito"],
        aiDocs: ["claude-md"],
      });

      expect(result.success).toBe(true);
      const root = result.tree!.root;

      expect(hasFile(root, "pom.xml")).toBe(true);
      expect(hasFile(root, "mvnw")).toBe(true);
      expect(hasFile(root, "src/main/java/com/example/javaquarkusmaven/Application.java")).toBe(
        true,
      );
      expect(
        hasFile(root, "src/main/java/com/example/javaquarkusmaven/resource/GreetingResource.java"),
      ).toBe(true);
      expect(
        hasFile(
          root,
          "src/main/java/com/example/javaquarkusmaven/controller/HealthController.java",
        ),
      ).toBe(false);
      expect(hasFile(root, "src/main/resources/application.yml")).toBe(false);

      const pomContent = getFileContent(root, "pom.xml");
      const applicationContent = getFileContent(
        root,
        "src/main/java/com/example/javaquarkusmaven/Application.java",
      );
      const resourceContent = getFileContent(
        root,
        "src/main/java/com/example/javaquarkusmaven/resource/GreetingResource.java",
      );
      const readmeContent = getFileContent(root, "README.md");
      const claudeContent = getFileContent(root, "CLAUDE.md");

      expect(pomContent).toContain("<quarkus.platform.version>3.35.2</quarkus.platform.version>");
      expect(pomContent).toContain("<artifactId>quarkus-rest</artifactId>");
      expect(pomContent).toContain("<artifactId>quarkus-junit5</artifactId>");
      expect(pomContent).toContain("<artifactId>wiremock-jetty12</artifactId>");
      expect(pomContent).toContain("<artifactId>archunit-junit5</artifactId>");
      expect(pomContent).toContain("<artifactId>mockito-junit-jupiter</artifactId>");
      expect(pomContent).toContain("<artifactId>quarkus-maven-plugin</artifactId>");
      expect(
        hasFile(root, "src/test/java/com/example/javaquarkusmaven/MockitoSmokeTest.java"),
      ).toBe(true);
      expect(pomContent).not.toContain("spring-boot-starter-parent");
      expect(applicationContent).toContain("@QuarkusMain");
      expect(resourceContent).toContain('@Path("/hello")');
      expect(readmeContent).toContain("./mvnw quarkus:dev");
      expect(readmeContent).toContain("http://localhost:8080/hello");
      expect(claudeContent).toContain("Web Framework: quarkus");
      expect(claudeContent).toContain("./mvnw quarkus:dev");
    });

    it("should create a Micronaut Maven project with REST support", async () => {
      const result = await createVirtual({
        projectName: "java-micronaut-maven",
        ecosystem: "java",
        javaWebFramework: "micronaut",
        javaBuildTool: "maven",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: [],
        javaTestingLibraries: ["junit5", "mockito", "archunit"],
        aiDocs: ["claude-md"],
      });

      expect(result.success).toBe(true);
      const root = result.tree!.root;

      expect(hasFile(root, "pom.xml")).toBe(true);
      expect(hasFile(root, "mvnw")).toBe(true);
      expect(hasFile(root, "src/main/java/com/example/javamicronautmaven/Application.java")).toBe(
        true,
      );
      expect(
        hasFile(
          root,
          "src/main/java/com/example/javamicronautmaven/controller/HelloController.java",
        ),
      ).toBe(true);
      expect(hasFile(root, "src/main/resources/application.yml")).toBe(true);

      const pomContent = getFileContent(root, "pom.xml");
      const applicationContent = getFileContent(
        root,
        "src/main/java/com/example/javamicronautmaven/Application.java",
      );

      expect(pomContent).toContain("io.micronaut");
      expect(pomContent).not.toContain("spring-boot-starter-parent");
      expect(applicationContent).toContain("Micronaut.run");
    });

    it("should wire log4j2 for a Spring Boot Maven project", async () => {
      const result = await createVirtual({
        projectName: "java-log4j2-maven",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaOrm: "none",
        javaAuth: "none",
        javaLogging: "log4j2",
        javaLibraries: [],
        javaTestingLibraries: ["junit5"],
        aiDocs: ["claude-md"],
      });

      expect(result.success).toBe(true);
      const root = result.tree!.root;

      const pomContent = getFileContent(root, "pom.xml");
      expect(pomContent).toContain("spring-boot-starter-log4j2");
      expect(hasFile(root, "src/main/resources/log4j2-spring.xml")).toBe(true);
      expect(hasFile(root, "src/main/resources/logback-spring.xml")).toBe(false);
    });

    it("should wire OpenAPI Generator for a Spring Boot Maven project", async () => {
      const result = await createVirtual({
        projectName: "java-openapi-maven",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaApi: "openapi-generator",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: [],
        javaTestingLibraries: ["junit5"],
        aiDocs: ["claude-md"],
      });

      expect(result.success).toBe(true);
      const root = result.tree!.root;

      const pomContent = getFileContent(root, "pom.xml");
      expect(pomContent).toContain("openapi-generator-maven-plugin");
      expect(hasFile(root, "src/main/resources/openapi.yaml")).toBe(true);
    });

    it("should create a Quarkus Gradle project with REST support", async () => {
      const result = await createVirtual({
        projectName: "java-quarkus-gradle",
        ecosystem: "java",
        javaWebFramework: "quarkus",
        javaBuildTool: "gradle",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: [],
        javaTestingLibraries: ["junit5", "wiremock", "archunit"],
      });

      expect(result.success).toBe(true);
      const root = result.tree!.root;

      expect(hasFile(root, "build.gradle.kts")).toBe(true);
      expect(hasFile(root, "gradlew")).toBe(true);
      expect(hasFile(root, "pom.xml")).toBe(false);
      expect(
        hasFile(root, "src/main/java/com/example/javaquarkusgradle/resource/GreetingResource.java"),
      ).toBe(true);

      const gradleContent = getFileContent(root, "build.gradle.kts");
      const readmeContent = getFileContent(root, "README.md");

      expect(gradleContent).toContain('id("io.quarkus") version "3.35.2"');
      expect(gradleContent).toContain(
        'implementation(enforcedPlatform("io.quarkus.platform:quarkus-bom:3.35.2"))',
      );
      expect(gradleContent).toContain('implementation("io.quarkus:quarkus-rest")');
      expect(gradleContent).toContain('testImplementation("io.quarkus:quarkus-junit5")');
      expect(gradleContent).toContain('testImplementation("org.wiremock:wiremock-jetty12:3.13.2")');
      expect(gradleContent).toContain(
        'testImplementation("com.tngtech.archunit:archunit-junit5:1.4.2")',
      );
      expect(gradleContent).not.toContain("org.springframework.boot");
      expect(readmeContent).toContain("./gradlew quarkusDev");
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
        javaTestingLibraries: ["junit5", "mockito"],
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
      const gradleContent = getFileContent(root, "build.gradle.kts");

      expect(readmeContent).toContain("./gradlew test");
      expect(readmeContent).toContain("./gradlew bootRun");
      expect(gradleContent).toContain(
        'testImplementation("org.mockito:mockito-junit-jupiter:5.23.0")',
      );
      expect(hasFile(root, "src/test/java/com/example/javagradlecheck/MockitoSmokeTest.java")).toBe(
        true,
      );
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
      expect(hasFile(root, "src/main/java/com/example/javaplainmaven/Application.java")).toBe(true);
      expect(hasFile(root, "src/main/resources/application.yml")).toBe(false);
      expect(
        hasFile(root, "src/main/java/com/example/javaplainmaven/controller/HealthController.java"),
      ).toBe(false);
      expect(hasFile(root, "src/test/java/com/example/javaplainmaven/ApplicationTests.java")).toBe(
        true,
      );
      expect(hasFile(root, "src/test/java/com/example/javaplainmaven/MockitoSmokeTest.java")).toBe(
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

    it("should create a plain Java Gradle project with optional testing libraries", async () => {
      const result = await createVirtual({
        projectName: "java-plain-gradle-tests",
        ecosystem: "java",
        javaWebFramework: "none",
        javaBuildTool: "gradle",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: [],
        javaTestingLibraries: [
          "junit5",
          "mockito",
          "testcontainers",
          "assertj",
          "rest-assured",
          "wiremock",
          "awaitility",
          "archunit",
          "jqwik",
        ],
      });

      expect(result.success).toBe(true);
      const root = result.tree!.root;

      expect(hasFile(root, "build.gradle.kts")).toBe(true);
      expect(hasFile(root, "settings.gradle.kts")).toBe(true);
      expect(hasFile(root, "src/main/resources/application.yml")).toBe(false);
      expect(
        hasFile(
          root,
          "src/main/java/com/example/javaplaingradletests/controller/HealthController.java",
        ),
      ).toBe(false);
      expect(
        hasFile(root, "src/test/java/com/example/javaplaingradletests/ApplicationTests.java"),
      ).toBe(true);
      expect(
        hasFile(root, "src/test/java/com/example/javaplaingradletests/RestAssuredHttpTest.java"),
      ).toBe(true);
      expect(
        hasFile(root, "src/test/java/com/example/javaplaingradletests/WireMockHttpTest.java"),
      ).toBe(true);
      expect(
        hasFile(root, "src/test/java/com/example/javaplaingradletests/AsyncWorkflowTest.java"),
      ).toBe(true);
      expect(
        hasFile(root, "src/test/java/com/example/javaplaingradletests/ArchitectureTest.java"),
      ).toBe(true);
      expect(
        hasFile(root, "src/test/java/com/example/javaplaingradletests/PropertyBasedTest.java"),
      ).toBe(true);

      const gradleContent = getFileContent(root, "build.gradle.kts");

      expect(gradleContent).toContain("application");
      expect(gradleContent).toContain('mainClass = "com.example.javaplaingradletests.Application"');
      expect(gradleContent).toContain('testImplementation(platform("org.junit:junit-bom:5.12.2"))');
      expect(gradleContent).toContain(
        'testRuntimeOnly("org.junit.platform:junit-platform-launcher")',
      );
      expect(gradleContent).toContain(
        'testImplementation("org.mockito:mockito-junit-jupiter:5.23.0")',
      );
      expect(gradleContent).toContain(
        'testImplementation(platform("org.testcontainers:testcontainers-bom:1.20.4"))',
      );
      expect(gradleContent).toContain('testImplementation("org.assertj:assertj-core:3.27.7")');
      expect(gradleContent).toContain('testImplementation("io.rest-assured:rest-assured:6.0.0")');
      expect(gradleContent).toContain('testImplementation("org.wiremock:wiremock-jetty12:3.13.2")');
      expect(gradleContent).toContain('testImplementation("org.awaitility:awaitility:4.3.0")');
      expect(gradleContent).toContain(
        'testImplementation("com.tngtech.archunit:archunit-junit5:1.4.2")',
      );
      expect(gradleContent).toContain('testImplementation("net.jqwik:jqwik:1.9.3")');
      expect(gradleContent).not.toContain("org.springframework.boot");
      expect(gradleContent).not.toContain("spring-boot-starter");
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
      expect(hasFile(root, "src/main/java/com/example/javasourceonly/Application.java")).toBe(true);
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
      expect(
        hasFile(root, "src/main/java/com/example/javafull/repository/AppUserRepository.java"),
      ).toBe(true);
      expect(hasFile(root, "src/main/java/com/example/javafull/service/AppUserService.java")).toBe(
        true,
      );
      expect(
        hasFile(root, "src/main/java/com/example/javafull/controller/UserController.java"),
      ).toBe(true);
      expect(hasFile(root, "src/main/java/com/example/javafull/config/SecurityConfig.java")).toBe(
        true,
      );
      expect(hasFile(root, "src/main/resources/db/migration/V1__init.sql")).toBe(true);
      expect(
        hasFile(root, "src/test/java/com/example/javafull/service/AppUserServiceTest.java"),
      ).toBe(true);
      expect(
        hasFile(root, "src/test/java/com/example/javafull/ApplicationContainerTests.java"),
      ).toBe(true);

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
      expect(pomContent).toContain("spring-boot-starter-flyway");
      expect(pomContent).toContain("spring-boot-testcontainers");
      // Spring Boot 4 manages Testcontainers 2.x, which renamed the JUnit 5
      // module to `testcontainers-junit-jupiter` (the old `junit-jupiter` is a
      // 404 at 2.x). Use the managed artifact, no explicit <version>.
      expect(pomContent).toContain("<artifactId>testcontainers-junit-jupiter</artifactId>");
      expect(pomContent).not.toContain("<artifactId>junit-jupiter</artifactId>");
      expect(applicationConfig).toContain("jdbc:h2:file:./data/java-full");
      expect(applicationConfig).toContain("ddl-auto: validate");
      expect(applicationConfig).toContain("include: health,info,metrics");
      expect(envContent).toContain("APP_BASIC_USERNAME=admin");
      expect(envContent).toContain("APP_BASIC_PASSWORD=change-me");
      expect(userControllerContent).toContain("@Valid @RequestBody");
      expect(userEntityContent).toContain("@Email");
    });

    it("should add extended Java libraries and testing dependencies when selected", async () => {
      const result = await createVirtual({
        projectName: "java-extended",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaOrm: "spring-data-jpa",
        javaAuth: "none",
        javaLibraries: [
          "liquibase",
          "springdoc-openapi",
          "lombok",
          "mapstruct",
          "caffeine",
          "resilience4j",
          "spring-webflux",
          "spring-batch",
          "spring-kafka",
          "spring-mail",
          "spring-devtools",
          "micrometer-prometheus",
          "thymeleaf",
        ],
        javaTestingLibraries: [
          "junit5",
          "assertj",
          "rest-assured",
          "wiremock",
          "awaitility",
          "archunit",
          "jqwik",
          "testcontainers",
        ],
      });

      expect(result.success).toBe(true);
      const root = result.tree!.root;

      expect(hasFile(root, "src/main/resources/db/changelog/db.changelog-master.yaml")).toBe(true);
      expect(hasFile(root, "src/test/java/com/example/javaextended/RestAssuredHttpTest.java")).toBe(
        true,
      );
      expect(hasFile(root, "src/test/java/com/example/javaextended/WireMockHttpTest.java")).toBe(
        true,
      );
      expect(hasFile(root, "src/test/java/com/example/javaextended/AsyncWorkflowTest.java")).toBe(
        true,
      );
      expect(
        hasFile(root, "src/main/java/com/example/javaextended/cache/CachedTimeService.java"),
      ).toBe(true);
      expect(
        hasFile(root, "src/main/java/com/example/javaextended/controller/CacheController.java"),
      ).toBe(true);
      expect(hasFile(root, "src/main/java/com/example/javaextended/dto/UserDto.java")).toBe(true);
      expect(
        hasFile(root, "src/main/java/com/example/javaextended/mapper/AppUserMapper.java"),
      ).toBe(true);
      expect(
        hasFile(root, "src/test/java/com/example/javaextended/mapper/AppUserMapperTest.java"),
      ).toBe(true);
      expect(hasFile(root, "src/test/java/com/example/javaextended/ArchitectureTest.java")).toBe(
        true,
      );
      expect(hasFile(root, "src/test/java/com/example/javaextended/PropertyBasedTest.java")).toBe(
        true,
      );
      expect(hasFile(root, "src/test/java/com/example/javaextended/MockitoSmokeTest.java")).toBe(
        false,
      );

      const pomContent = getFileContent(root, "pom.xml");
      const applicationContent = getFileContent(
        root,
        "src/main/java/com/example/javaextended/Application.java",
      );
      const applicationConfig = getFileContent(root, "src/main/resources/application.yml");
      const applicationTest = getFileContent(
        root,
        "src/test/java/com/example/javaextended/ApplicationTests.java",
      );
      const readmeContent = getFileContent(root, "README.md");

      expect(pomContent).toContain("spring-boot-starter-liquibase");
      expect(pomContent).toContain("springdoc-openapi-starter-webmvc-ui");
      expect(pomContent).toContain("lombok");
      expect(pomContent).toContain("mapstruct");
      expect(pomContent).toContain("mapstruct-processor");
      expect(pomContent).toContain("spring-boot-starter-cache");
      expect(pomContent).toContain("caffeine");
      expect(pomContent).toContain("resilience4j-spring-boot3");
      expect(pomContent).toContain("spring-boot-starter-webflux");
      expect(pomContent).toContain("spring-boot-starter-batch");
      expect(pomContent).toContain("spring-kafka");
      expect(pomContent).toContain("spring-boot-starter-mail");
      expect(pomContent).toContain("spring-boot-devtools");
      expect(pomContent).toContain("micrometer-registry-prometheus");
      expect(pomContent).toContain("spring-boot-starter-thymeleaf");
      expect(pomContent).toContain("<version>2.3.0</version>");
      expect(pomContent).toContain("<optional>true</optional>");
      expect(pomContent).toContain("<artifactId>maven-compiler-plugin</artifactId>");
      expect(pomContent).toContain("<annotationProcessorPaths>");
      expect(pomContent).toContain("<springdoc.version>3.0.3</springdoc.version>");
      expect(pomContent).toContain("<lombok.version>1.18.46</lombok.version>");
      expect(pomContent).toContain("<assertj.version>3.27.7</assertj.version>");
      expect(pomContent).toContain("<rest-assured.version>6.0.0</rest-assured.version>");
      expect(pomContent).toContain("<wiremock.version>3.13.2</wiremock.version>");
      expect(pomContent).toContain("<awaitility.version>4.3.0</awaitility.version>");
      expect(pomContent).toContain("<mapstruct.version>1.6.3</mapstruct.version>");
      expect(pomContent).toContain("<archunit.version>1.4.2</archunit.version>");
      expect(pomContent).toContain("<jqwik.version>1.9.3</jqwik.version>");
      expect(pomContent).toContain("rest-assured");
      expect(pomContent).toContain("wiremock");
      expect(pomContent).toContain("awaitility");
      expect(pomContent).toContain("archunit-junit5");
      expect(pomContent).toContain("jqwik");
      expect(pomContent).not.toContain("spring-boot-starter-flyway");
      expect(applicationContent).toContain("@EnableCaching");
      expect(applicationConfig).toContain(
        "change-log: classpath:db/changelog/db.changelog-master.yaml",
      );
      expect(applicationConfig).toContain("ddl-auto: validate");
      expect(applicationTest).toContain("org.assertj.core.api.Assertions.assertThat");
      expect(readmeContent).toContain("OpenAPI documentation is available");
      expect(readmeContent).toContain("Spring Cache is enabled with Caffeine");
      expect(readmeContent).toContain("Resilience4j is available");
      expect(readmeContent).toContain("MapStruct is configured with a generated mapper example");
    });

    it("should add extended Java libraries and testing dependencies for Gradle", async () => {
      const result = await createVirtual({
        projectName: "java-extended-gradle",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "gradle",
        javaOrm: "spring-data-jpa",
        javaAuth: "none",
        javaLibraries: [
          "liquibase",
          "springdoc-openapi",
          "lombok",
          "mapstruct",
          "caffeine",
          "resilience4j",
        ],
        javaTestingLibraries: [
          "junit5",
          "assertj",
          "rest-assured",
          "wiremock",
          "awaitility",
          "archunit",
          "jqwik",
          "testcontainers",
        ],
      });

      expect(result.success).toBe(true);
      const root = result.tree!.root;

      expect(hasFile(root, "src/main/resources/db/changelog/db.changelog-master.yaml")).toBe(true);
      expect(
        hasFile(root, "src/test/java/com/example/javaextendedgradle/RestAssuredHttpTest.java"),
      ).toBe(true);
      expect(
        hasFile(root, "src/test/java/com/example/javaextendedgradle/WireMockHttpTest.java"),
      ).toBe(true);
      expect(
        hasFile(root, "src/test/java/com/example/javaextendedgradle/AsyncWorkflowTest.java"),
      ).toBe(true);
      expect(
        hasFile(root, "src/main/java/com/example/javaextendedgradle/cache/CachedTimeService.java"),
      ).toBe(true);
      expect(
        hasFile(root, "src/main/java/com/example/javaextendedgradle/mapper/AppUserMapper.java"),
      ).toBe(true);
      expect(
        hasFile(root, "src/test/java/com/example/javaextendedgradle/ArchitectureTest.java"),
      ).toBe(true);
      expect(
        hasFile(root, "src/test/java/com/example/javaextendedgradle/PropertyBasedTest.java"),
      ).toBe(true);

      const gradleContent = getFileContent(root, "build.gradle.kts");
      const applicationConfig = getFileContent(root, "src/main/resources/application.yml");

      expect(gradleContent).toContain(
        'implementation("org.springframework.boot:spring-boot-starter-liquibase")',
      );
      expect(gradleContent).toContain(
        'implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:3.0.3")',
      );
      expect(gradleContent).toContain('compileOnly("org.projectlombok:lombok:1.18.46")');
      expect(gradleContent).toContain('annotationProcessor("org.projectlombok:lombok:1.18.46")');
      expect(gradleContent).toContain('testCompileOnly("org.projectlombok:lombok:1.18.46")');
      expect(gradleContent).toContain(
        'testAnnotationProcessor("org.projectlombok:lombok:1.18.46")',
      );
      expect(gradleContent).toContain('implementation("org.mapstruct:mapstruct:1.6.3")');
      expect(gradleContent).toContain(
        'annotationProcessor("org.mapstruct:mapstruct-processor:1.6.3")',
      );
      expect(gradleContent).toContain(
        'implementation("org.springframework.boot:spring-boot-starter-cache")',
      );
      expect(gradleContent).toContain('implementation("com.github.ben-manes.caffeine:caffeine")');
      expect(gradleContent).toContain(
        'implementation("io.github.resilience4j:resilience4j-spring-boot3:2.3.0")',
      );
      expect(gradleContent).toContain('testImplementation("org.assertj:assertj-core:3.27.7")');
      expect(gradleContent).toContain('testImplementation("io.rest-assured:rest-assured:6.0.0")');
      expect(gradleContent).toContain(
        'testImplementation("org.wiremock:wiremock-standalone:3.13.2")',
      );
      expect(gradleContent).not.toContain("org.eclipse.jetty:jetty-bom");
      expect(gradleContent).not.toContain("org.eclipse.jetty.ee10:jetty-ee10-bom");
      expect(gradleContent).toContain('testImplementation("org.awaitility:awaitility:4.3.0")');
      expect(gradleContent).not.toContain("mockito-junit-jupiter");
      expect(gradleContent).toContain(
        'testImplementation("com.tngtech.archunit:archunit-junit5:1.4.2")',
      );
      expect(gradleContent).toContain('testImplementation("net.jqwik:jqwik:1.9.3")');
      // Spring Boot 4 manages Testcontainers 2.x, which renamed the JUnit 5
      // module to `testcontainers-junit-jupiter` (the old `junit-jupiter` is a
      // 404 at 2.x). Use the managed artifact, no BOM pin.
      expect(gradleContent).toContain(
        'testImplementation("org.testcontainers:testcontainers-junit-jupiter")',
      );
      expect(gradleContent).not.toContain('testImplementation("org.testcontainers:junit-jupiter")');
      expect(gradleContent).not.toContain("spring-boot-starter-flyway");
      expect(applicationConfig).toContain(
        "change-log: classpath:db/changelog/db.changelog-master.yaml",
      );
      expect(applicationConfig).toContain("ddl-auto: validate");
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

      expect(
        hasFile(root, "src/main/java/com/example/javaminimal/config/SecurityConfig.java"),
      ).toBe(false);
      expect(
        hasFile(root, "src/main/java/com/example/javaminimal/controller/UserController.java"),
      ).toBe(false);
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
          javaApi: "openapi-generator",
          javaLibraries: ["spring-actuator", "flyway"],
          javaTestingLibraries: ["junit5", "mockito"],
        }),
      );

      expect(result.adjustedStack?.javaWebFramework).toBe("none");
      expect(result.adjustedStack?.javaOrm).toBe("none");
      expect(result.adjustedStack?.javaAuth).toBe("none");
      expect(result.adjustedStack?.javaApi).toBe("none");
      expect(result.adjustedStack?.javaLibraries).toEqual([]);
      expect(result.adjustedStack?.javaTestingLibraries).toEqual(["junit5", "mockito"]);
      expect(result.changes.some((adjustment) => adjustment.category === "javaWebFramework")).toBe(
        true,
      );
    });

    it("should reject Java API scaffolds outside Spring Boot during validation", () => {
      expect(() =>
        runWithContext({ silent: true }, () =>
          validateConfigForProgrammaticUse({
            projectName: "java-quarkus-openapi",
            ecosystem: "java",
            javaWebFramework: "quarkus",
            javaBuildTool: "maven",
            javaOrm: "none",
            javaAuth: "none",
            javaApi: "openapi-generator",
            javaLibraries: [],
            javaTestingLibraries: [],
          }),
        ),
      ).toThrow("Spring-only Java features require the Spring Boot scaffold with Maven or Gradle.");
    });

    it("should clear the Java framework and testing libraries when the build tool is none", () => {
      const result = analyzeStackCompatibility(
        createJavaCompatibilityInput({
          javaWebFramework: "spring-boot",
          javaBuildTool: "none",
          javaOrm: "spring-data-jpa",
          javaAuth: "spring-security",
          javaLibraries: ["spring-actuator", "mapstruct", "caffeine"],
          javaTestingLibraries: [
            "junit5",
            "assertj",
            "rest-assured",
            "wiremock",
            "awaitility",
            "archunit",
            "jqwik",
          ],
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

    it("should clear Java migration libraries when JPA is not selected", () => {
      const result = analyzeStackCompatibility(
        createJavaCompatibilityInput({
          javaWebFramework: "spring-boot",
          javaBuildTool: "maven",
          javaOrm: "none",
          javaAuth: "none",
          javaLibraries: [
            "spring-actuator",
            "flyway",
            "liquibase",
            "springdoc-openapi",
            "mapstruct",
            "caffeine",
            "resilience4j",
          ],
          javaTestingLibraries: ["junit5"],
        }),
      );

      expect(result.adjustedStack?.javaLibraries).toEqual([
        "spring-actuator",
        "springdoc-openapi",
        "mapstruct",
        "caffeine",
        "resilience4j",
      ]);
      expect(result.changes.some((adjustment) => adjustment.category === "javaOrm")).toBe(true);
    });

    it("should prefer Flyway when Flyway and Liquibase are both selected", () => {
      const result = analyzeStackCompatibility(
        createJavaCompatibilityInput({
          javaWebFramework: "spring-boot",
          javaBuildTool: "maven",
          javaOrm: "spring-data-jpa",
          javaAuth: "none",
          javaLibraries: ["spring-actuator", "flyway", "liquibase", "springdoc-openapi"],
          javaTestingLibraries: ["junit5"],
        }),
      );

      expect(result.adjustedStack?.javaLibraries).toEqual([
        "spring-actuator",
        "flyway",
        "springdoc-openapi",
      ]);
      expect(result.changes.some((adjustment) => adjustment.category === "javaLibraries")).toBe(
        true,
      );
    });

    it("should report Liquibase without JPA as an incompatible Java library", () => {
      const result = evaluateCompatibility(
        createJavaCompatibilityInput({
          javaWebFramework: "spring-boot",
          javaBuildTool: "maven",
          javaOrm: "none",
          javaAuth: "none",
          javaLibraries: ["liquibase"],
          javaTestingLibraries: ["junit5"],
        }),
      );

      expect(result.issues).toContainEqual(
        expect.objectContaining({
          code: "INCOMPATIBLE_JAVA_LIBRARY",
          category: "javaLibraries",
          optionId: "liquibase",
        }),
      );
    });

    it("should report Flyway and Liquibase as mutually incompatible in either order", () => {
      for (const javaLibraries of [
        ["flyway", "liquibase"],
        ["liquibase", "flyway"],
      ]) {
        const result = evaluateCompatibility(
          createJavaCompatibilityInput({
            javaWebFramework: "spring-boot",
            javaBuildTool: "maven",
            javaOrm: "spring-data-jpa",
            javaAuth: "none",
            javaLibraries,
            javaTestingLibraries: ["junit5"],
          }),
        );

        expect(result.issues).toContainEqual(
          expect.objectContaining({
            code: "INCOMPATIBLE_JAVA_LIBRARY",
            category: "javaLibraries",
            optionId: "flyway",
          }),
        );
        expect(result.issues).toContainEqual(
          expect.objectContaining({
            code: "INCOMPATIBLE_JAVA_LIBRARY",
            category: "javaLibraries",
            optionId: "liquibase",
          }),
        );
      }
    });

    it("should keep non-migration Spring libraries compatible without JPA", () => {
      const result = evaluateCompatibility(
        createJavaCompatibilityInput({
          javaWebFramework: "spring-boot",
          javaBuildTool: "maven",
          javaOrm: "none",
          javaAuth: "none",
          javaLibraries: ["springdoc-openapi", "lombok", "mapstruct", "caffeine", "resilience4j"],
          javaTestingLibraries: ["junit5"],
        }),
      );

      expect(result.issues.filter((issue) => issue.category === "javaLibraries")).toEqual([]);
    });
  });

  describe("Kotlin Language Gate", () => {
    it("keeps Kotlin for a supported Spring Boot stack", () => {
      const result = analyzeStackCompatibility(
        createJavaCompatibilityInput({
          javaLanguage: "kotlin",
          javaWebFramework: "spring-boot",
          javaBuildTool: "gradle",
          javaOrm: "spring-data-jpa",
          javaAuth: "spring-security",
          javaApi: "spring-graphql",
          javaLibraries: ["spring-validation", "caffeine"],
          javaTestingLibraries: ["junit5", "mockito", "assertj"],
        }),
      );

      expect(result.adjustedStack?.javaLanguage ?? "kotlin").toBe("kotlin");
      expect(result.changes.some((adjustment) => adjustment.category === "javaLanguage")).toBe(
        false,
      );
    });

    it("normalizes Kotlin back to Java when the stack includes Java-only options", () => {
      // email:'resend' is not testable through analyzeStackCompatibility here —
      // the generic email-requires-backend normalization clears it first (java
      // stacks always have backend 'none'), which also resolves the Kotlin
      // conflict. The email/search/caching/observability legs are covered by
      // the getDisabledReason assertions below instead.
      for (const overrides of [
        { javaOrm: "jooq" },
        { javaApi: "grpc" },
        { javaTestingLibraries: ["junit5", "testcontainers"] },
      ] as const) {
        const result = analyzeStackCompatibility(
          createJavaCompatibilityInput({
            javaLanguage: "kotlin",
            javaWebFramework: "spring-boot",
            javaBuildTool: "maven",
            javaOrm: "none",
            javaAuth: "none",
            javaApi: "none",
            javaLibraries: [],
            javaTestingLibraries: ["junit5"],
            ...overrides,
          }),
        );

        expect(result.adjustedStack?.javaLanguage).toBe("java");
        expect(result.changes.some((adjustment) => adjustment.category === "javaLanguage")).toBe(
          true,
        );
      }
    });

    it("removes drop-only Java libraries while preserving a compatible Kotlin stack", () => {
      const result = analyzeStackCompatibility(
        createJavaCompatibilityInput({
          javaLanguage: "kotlin",
          javaWebFramework: "spring-boot",
          javaBuildTool: "maven",
          javaOrm: "spring-data-jpa",
          javaLibraries: ["lombok", "mapstruct", "caffeine"],
        }),
      );

      expect(result.adjustedStack?.javaLanguage ?? "kotlin").toBe("kotlin");
      expect(result.adjustedStack?.javaLibraries).toEqual(["caffeine"]);
      expect(result.changes).toContainEqual(expect.objectContaining({ category: "javaLibraries" }));
    });

    it("removes a stale Kotlin graph part when an incompatible multi-stack falls back to Java", () => {
      const stackParts = parseStackPartSpecs(
        [
          "frontend:typescript:next",
          "backend:java:spring-boot",
          "backend.language:java:kotlin",
          "backend.buildTool:java:maven",
          "backend.orm:java:jooq",
        ],
        "selected",
      );
      const config = {
        ...getDefaultConfig(),
        ...stackPartsToLegacyProjectConfigPartial(stackParts),
        stackParts,
      };

      runWithContext({ silent: true }, () => normalizeKotlinJavaSelection(config));

      expect(config.javaLanguage).toBe("java");
      expect(generateReproducibleCommand(config)).not.toContain(
        "--part backend.language:java:kotlin",
      );
    });

    it("disables the kotlin option when the current stack excludes it", () => {
      const quarkusStack = createJavaCompatibilityInput({
        javaLanguage: "java",
        javaWebFramework: "quarkus",
        javaBuildTool: "maven",
      });
      expect(getDisabledReason(quarkusStack, "javaLanguage", "kotlin")).not.toBeNull();

      const springStack = createJavaCompatibilityInput({
        javaLanguage: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
      });
      expect(getDisabledReason(springStack, "javaLanguage", "kotlin")).toBeNull();
    });

    it("disables Kotlin-incompatible options while Kotlin is selected", () => {
      const kotlinStack = createJavaCompatibilityInput({
        javaLanguage: "kotlin",
        javaWebFramework: "spring-boot",
        javaBuildTool: "gradle",
        javaOrm: "spring-data-jpa",
      });

      expect(getDisabledReason(kotlinStack, "javaWebFramework", "quarkus")).not.toBeNull();
      expect(getDisabledReason(kotlinStack, "javaBuildTool", "none")).not.toBeNull();
      expect(getDisabledReason(kotlinStack, "javaOrm", "jooq")).not.toBeNull();
      expect(getDisabledReason(kotlinStack, "javaOrm", "mybatis")).not.toBeNull();
      expect(getDisabledReason(kotlinStack, "javaApi", "grpc")).not.toBeNull();
      expect(getDisabledReason(kotlinStack, "javaApi", "openapi-generator")).not.toBeNull();
      expect(getDisabledReason(kotlinStack, "javaLibraries", "lombok")).not.toBeNull();
      expect(getDisabledReason(kotlinStack, "javaLibraries", "mapstruct")).not.toBeNull();
      expect(
        getDisabledReason(kotlinStack, "javaTestingLibraries", "testcontainers"),
      ).not.toBeNull();
      expect(getDisabledReason(kotlinStack, "email", "resend")).not.toBeNull();
      expect(getDisabledReason(kotlinStack, "search", "meilisearch")).not.toBeNull();
      expect(getDisabledReason(kotlinStack, "caching", "upstash-redis")).not.toBeNull();
      expect(getDisabledReason(kotlinStack, "observability", "sentry")).not.toBeNull();

      // The supported surface stays selectable.
      expect(getDisabledReason(kotlinStack, "javaOrm", "spring-data-jpa")).toBeNull();
      expect(getDisabledReason(kotlinStack, "javaApi", "spring-graphql")).toBeNull();
      expect(getDisabledReason(kotlinStack, "javaTestingLibraries", "mockito")).toBeNull();
      expect(getDisabledReason(kotlinStack, "javaLibraries", "caffeine")).toBeNull();
    });

    it("filters Kotlin-incompatible options out of the interactive prompts", () => {
      const ormOptions = resolveJavaOrmPrompt(undefined, "kotlin").options.map(
        (option) => option.value,
      );
      expect(ormOptions).toEqual(["spring-data-jpa", "none"]);

      const apiOptions = resolveJavaApiPrompt(undefined, "kotlin").options.map(
        (option) => option.value,
      );
      expect(apiOptions).toEqual(["spring-graphql", "none"]);

      const buildToolOptions = resolveJavaBuildToolPrompt(undefined, "kotlin").options.map(
        (option) => option.value,
      );
      expect(buildToolOptions).toEqual(["maven", "gradle"]);

      const testingOptions = resolveJavaTestingLibrariesPrompt(undefined, "kotlin").options.map(
        (option) => option.value,
      );
      expect(testingOptions).toEqual(["junit5", "mockito", "assertj", "none"]);

      const libraryOptions = resolveJavaLibrariesPrompt(undefined, "kotlin").options.map(
        (option) => option.value,
      );
      expect(libraryOptions).not.toContain("lombok");
      expect(libraryOptions).not.toContain("mapstruct");

      // Without a language context the full Java option lists stay intact.
      expect(resolveJavaOrmPrompt().options.map((option) => option.value)).toEqual(JAVA_ORMS);
      expect(resolveJavaTestingLibrariesPrompt().options.map((option) => option.value)).toEqual(
        JAVA_TESTING_LIBRARIES,
      );
    });
  });
});
