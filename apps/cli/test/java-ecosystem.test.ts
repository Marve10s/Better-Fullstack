import type { VirtualFile, VirtualNode } from "@better-fullstack/template-generator";

import { describe, expect, it } from "bun:test";

import { createVirtual } from "../src/index";
import {
  analyzeStackCompatibility,
  type CompatibilityInput,
  EcosystemSchema,
  evaluateCompatibility,
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
      expect(JAVA_LIBRARIES).toEqual([
        "spring-actuator",
        "spring-validation",
        "flyway",
        "liquibase",
        "springdoc-openapi",
        "lombok",
        "mapstruct",
        "caffeine",
        "none",
      ]);
      expect(JAVA_ORMS).toEqual(["spring-data-jpa", "none"]);
      expect(JAVA_AUTHS).toEqual(["spring-security", "none"]);
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
      expect(hasFile(root, "src/main/java/com/example/javaplainmaven/Application.java")).toBe(true);
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
        'testImplementation("org.mockito:mockito-junit-jupiter:5.15.2")',
      );
      expect(gradleContent).toContain(
        'testImplementation(platform("org.testcontainers:testcontainers-bom:1.20.4"))',
      );
      expect(gradleContent).toContain('testImplementation("org.assertj:assertj-core:3.27.7")');
      expect(gradleContent).toContain('testImplementation("io.rest-assured:rest-assured:6.0.0")');
      expect(gradleContent).toContain('testImplementation("org.wiremock:wiremock:3.13.2")');
      expect(gradleContent).toContain('testImplementation("org.awaitility:awaitility:4.3.0")');
      expect(gradleContent).toContain(
        'testImplementation("com.tngtech.archunit:archunit-junit5:1.4.1")',
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

    it("should add extended Java libraries and testing dependencies when selected", async () => {
      const result = await createVirtual({
        projectName: "java-extended",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaOrm: "spring-data-jpa",
        javaAuth: "none",
        javaLibraries: ["liquibase", "springdoc-openapi", "lombok", "mapstruct", "caffeine"],
        javaTestingLibraries: [
          "junit5",
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

      expect(pomContent).toContain("liquibase-core");
      expect(pomContent).toContain("springdoc-openapi-starter-webmvc-ui");
      expect(pomContent).toContain("lombok");
      expect(pomContent).toContain("mapstruct");
      expect(pomContent).toContain("mapstruct-processor");
      expect(pomContent).toContain("spring-boot-starter-cache");
      expect(pomContent).toContain("caffeine");
      expect(pomContent).toContain("<optional>true</optional>");
      expect(pomContent).toContain("<artifactId>maven-compiler-plugin</artifactId>");
      expect(pomContent).toContain("<annotationProcessorPaths>");
      expect(pomContent).toContain("<springdoc.version>3.0.3</springdoc.version>");
      expect(pomContent).toContain("<lombok.version>1.18.38</lombok.version>");
      expect(pomContent).toContain("<assertj.version>3.27.7</assertj.version>");
      expect(pomContent).toContain("<rest-assured.version>6.0.0</rest-assured.version>");
      expect(pomContent).toContain("<wiremock.version>3.13.2</wiremock.version>");
      expect(pomContent).toContain("<awaitility.version>4.3.0</awaitility.version>");
      expect(pomContent).toContain("<mapstruct.version>1.6.3</mapstruct.version>");
      expect(pomContent).toContain("<archunit.version>1.4.1</archunit.version>");
      expect(pomContent).toContain("<jqwik.version>1.9.3</jqwik.version>");
      expect(pomContent).toContain("rest-assured");
      expect(pomContent).toContain("wiremock");
      expect(pomContent).toContain("awaitility");
      expect(pomContent).toContain("archunit-junit5");
      expect(pomContent).toContain("jqwik");
      expect(pomContent).not.toContain("flyway-core");
      expect(applicationContent).toContain("@EnableCaching");
      expect(applicationConfig).toContain(
        "change-log: classpath:db/changelog/db.changelog-master.yaml",
      );
      expect(applicationConfig).toContain("ddl-auto: validate");
      expect(applicationTest).toContain("org.assertj.core.api.Assertions.assertThat");
      expect(readmeContent).toContain("OpenAPI documentation is available");
      expect(readmeContent).toContain("Spring Cache is enabled with Caffeine");
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
        javaLibraries: ["liquibase", "springdoc-openapi", "lombok", "mapstruct", "caffeine"],
        javaTestingLibraries: [
          "junit5",
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

      expect(gradleContent).toContain('implementation("org.liquibase:liquibase-core")');
      expect(gradleContent).toContain(
        'implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:3.0.3")',
      );
      expect(gradleContent).toContain('compileOnly("org.projectlombok:lombok:1.18.38")');
      expect(gradleContent).toContain('annotationProcessor("org.projectlombok:lombok:1.18.38")');
      expect(gradleContent).toContain('testCompileOnly("org.projectlombok:lombok:1.18.38")');
      expect(gradleContent).toContain(
        'testAnnotationProcessor("org.projectlombok:lombok:1.18.38")',
      );
      expect(gradleContent).toContain('implementation("org.mapstruct:mapstruct:1.6.3")');
      expect(gradleContent).toContain(
        'annotationProcessor("org.mapstruct:mapstruct-processor:1.6.3")',
      );
      expect(gradleContent).toContain(
        'implementation("org.springframework.boot:spring-boot-starter-cache")',
      );
      expect(gradleContent).toContain('implementation("com.github.ben-manes.caffeine:caffeine")');
      expect(gradleContent).toContain('testImplementation("org.assertj:assertj-core:3.27.7")');
      expect(gradleContent).toContain('testImplementation("io.rest-assured:rest-assured:6.0.0")');
      expect(gradleContent).toContain('testImplementation("org.wiremock:wiremock:3.13.2")');
      expect(gradleContent).toContain('testImplementation("org.awaitility:awaitility:4.3.0")');
      expect(gradleContent).toContain(
        'testImplementation("com.tngtech.archunit:archunit-junit5:1.4.1")',
      );
      expect(gradleContent).toContain('testImplementation("net.jqwik:jqwik:1.9.3")');
      expect(gradleContent).not.toContain("flyway-core");
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
          ],
          javaTestingLibraries: ["junit5"],
        }),
      );

      expect(result.adjustedStack?.javaLibraries).toEqual([
        "spring-actuator",
        "springdoc-openapi",
        "mapstruct",
        "caffeine",
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
          javaLibraries: ["springdoc-openapi", "lombok", "mapstruct", "caffeine"],
          javaTestingLibraries: ["junit5"],
        }),
      );

      expect(result.issues.filter((issue) => issue.category === "javaLibraries")).toEqual([]);
    });
  });
});
