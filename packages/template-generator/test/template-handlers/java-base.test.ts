import { describe, expect, it, spyOn } from "bun:test";

import { VirtualFileSystem } from "../../src/core/virtual-fs";
import { processJavaBaseTemplate } from "../../src/template-handlers/java-base";
import { makeConfig } from "../_fixtures/config-factory";
import { makeTemplates } from "../_fixtures/template-factory";

const JAVA_TEMPLATES = {
  "java-base/pom.xml.hbs":
    "<project>{{javaArtifactId}}|{{#if hasJavaFlyway}}flyway{{/if}}</project>",
  "java-base/build.gradle.kts.hbs": 'rootProject.name = "{{javaArtifactId}}"',
  "java-base/settings.gradle.kts.hbs": 'rootProject.name = "{{javaArtifactId}}"',
  "java-base/mvnw": "#!/bin/sh\necho maven wrapper",
  "java-base/mvnw.cmd": "@echo maven wrapper",
  "java-base/.mvn/wrapper/maven-wrapper.properties": "distributionUrl=https://example",
  "java-base/gradlew": "#!/bin/sh\necho gradle wrapper",
  "java-base/gradlew.bat": "@echo gradle wrapper",
  "java-base/gradle/wrapper/gradle-wrapper.properties": "distributionUrl=https://example",
  "java-base/src/main/java/__javaPackagePath__/Application.java.hbs":
    "package {{javaPackageName}};",
  "java-base/src/main/java/__javaPackagePath__/controller/HealthController.java.hbs":
    "spring controller",
  "java-base/src/main/java/__javaPackagePath__/controller/CacheController.java.hbs":
    "cache controller",
  "java-base/src/main/java/__javaPackagePath__/cache/CachedTimeService.java.hbs": "cache service",
  "java-base/src/main/java/__javaPackagePath__/domain/AppUser.java.hbs":
    "package {{javaPackageName}}.domain;",
  "java-base/src/main/java/__javaPackagePath__/dto/UserDto.java.hbs":
    "package {{javaPackageName}}.dto;",
  "java-base/src/main/java/__javaPackagePath__/mapper/AppUserMapper.java.hbs":
    "package {{javaPackageName}}.mapper;",
  "java-base/src/main/resources/application.yml.hbs": "spring:",
  "java-base/src/main/resources/db/migration/V1__init.sql.hbs": "-- migration",
  "java-base/src/test/java/__javaPackagePath__/ApplicationTests.java.hbs": "test",
  "java-base/src/test/java/__javaPackagePath__/ArchitectureTest.java.hbs": "arch test",
  "java-base/src/test/java/__javaPackagePath__/PropertyBasedTest.java.hbs": "property test",
  "java-base/src/test/java/__javaPackagePath__/mapper/AppUserMapperTest.java.hbs": "mapper test",
};

describe("processJavaBaseTemplate", () => {
  it("returns early when ecosystem is not java", async () => {
    const vfs = new VirtualFileSystem();
    await processJavaBaseTemplate(
      vfs,
      makeTemplates(JAVA_TEMPLATES),
      makeConfig({ ecosystem: "typescript" }),
    );
    expect(vfs.getFileCount()).toBe(0);
  });

  it("emits a source-only plain Java scaffold when javaBuildTool is 'none'", async () => {
    const vfs = new VirtualFileSystem();
    const warn = spyOn(console, "warn").mockImplementation(() => {});
    try {
      await processJavaBaseTemplate(
        vfs,
        makeTemplates(JAVA_TEMPLATES),
        makeConfig({
          projectName: "my-app",
          projectDir: "/tmp/my-app",
          relativePath: "my-app",
          ecosystem: "java",
          javaWebFramework: "none",
          javaBuildTool: "none",
          javaOrm: "none",
          javaAuth: "none",
          javaLibraries: [],
          javaTestingLibraries: ["junit5"],
        }),
      );

      expect(vfs.exists("src/main/java/com/example/myapp/Application.java")).toBe(true);
      expect(vfs.exists("pom.xml")).toBe(false);
      expect(vfs.exists("build.gradle.kts")).toBe(false);
      expect(vfs.exists("src/main/resources/application.yml")).toBe(false);
      expect(vfs.exists("src/main/java/com/example/myapp/controller/HealthController.java")).toBe(
        false,
      );
      expect(vfs.exists("src/test/java/com/example/myapp/ApplicationTests.java")).toBe(false);
      expect(warn).not.toHaveBeenCalled();
    } finally {
      warn.mockRestore();
    }
  });

  it("skips Spring-only templates when javaWebFramework is 'none'", async () => {
    const vfs = new VirtualFileSystem();
    await processJavaBaseTemplate(
      vfs,
      makeTemplates(JAVA_TEMPLATES),
      makeConfig({
        projectName: "my-app",
        projectDir: "/tmp/my-app",
        relativePath: "my-app",
        ecosystem: "java",
        javaWebFramework: "none",
        javaBuildTool: "maven",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: ["spring-actuator"],
        javaTestingLibraries: ["junit5"],
      }),
    );

    expect(vfs.exists("pom.xml")).toBe(true);
    expect(vfs.exists("src/main/java/com/example/myapp/Application.java")).toBe(true);
    expect(vfs.exists("src/main/resources/application.yml")).toBe(false);
    expect(vfs.exists("src/main/java/com/example/myapp/controller/HealthController.java")).toBe(
      false,
    );
    expect(vfs.exists("src/test/java/com/example/myapp/ApplicationTests.java")).toBe(true);
  });

  it("emits only maven-related build files when javaBuildTool is 'maven'", async () => {
    const vfs = new VirtualFileSystem();
    await processJavaBaseTemplate(
      vfs,
      makeTemplates(JAVA_TEMPLATES),
      makeConfig({
        projectName: "my-app",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: [],
        javaTestingLibraries: ["junit5"],
      }),
    );

    expect(vfs.exists("pom.xml")).toBe(true);
    expect(vfs.exists("mvnw")).toBe(true);
    expect(vfs.exists("mvnw.cmd")).toBe(true);
    expect(vfs.exists(".mvn/wrapper/maven-wrapper.properties")).toBe(true);
    expect(vfs.exists("build.gradle.kts")).toBe(false);
    expect(vfs.exists("settings.gradle.kts")).toBe(false);
    expect(vfs.exists("gradlew")).toBe(false);
    expect(vfs.exists("gradlew.bat")).toBe(false);
  });

  it("emits only gradle-related build files when javaBuildTool is 'gradle'", async () => {
    const vfs = new VirtualFileSystem();
    await processJavaBaseTemplate(
      vfs,
      makeTemplates(JAVA_TEMPLATES),
      makeConfig({
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "gradle",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: [],
        javaTestingLibraries: ["junit5"],
      }),
    );

    expect(vfs.exists("build.gradle.kts")).toBe(true);
    expect(vfs.exists("settings.gradle.kts")).toBe(true);
    expect(vfs.exists("gradlew")).toBe(true);
    expect(vfs.exists("gradlew.bat")).toBe(true);
    expect(vfs.exists("pom.xml")).toBe(false);
    expect(vfs.exists("mvnw")).toBe(false);
    expect(vfs.exists("mvnw.cmd")).toBe(false);
  });

  it("drops flyway from effective libraries when javaOrm is not spring-data-jpa", async () => {
    const vfs = new VirtualFileSystem();
    await processJavaBaseTemplate(
      vfs,
      makeTemplates({
        "java-base/pom.xml.hbs": "<flyway>{{#if hasJavaFlyway}}yes{{else}}no{{/if}}</flyway>",
        "java-base/src/main/resources/db/migration/V1__init.sql.hbs": "-- migration",
      }),
      makeConfig({
        projectName: "my-app",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: ["flyway"],
        javaTestingLibraries: ["junit5"],
      }),
    );

    expect(vfs.readFile("pom.xml")).toContain("<flyway>no</flyway>");
    expect(vfs.exists("src/main/resources/db/migration/V1__init.sql")).toBe(false);
  });

  it("keeps flyway when javaOrm is spring-data-jpa", async () => {
    const vfs = new VirtualFileSystem();
    await processJavaBaseTemplate(
      vfs,
      makeTemplates({
        "java-base/pom.xml.hbs": "<flyway>{{#if hasJavaFlyway}}yes{{else}}no{{/if}}</flyway>",
        "java-base/src/main/resources/db/migration/V1__init.sql.hbs": "-- migration",
      }),
      makeConfig({
        projectName: "my-app",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaOrm: "spring-data-jpa",
        javaAuth: "none",
        javaLibraries: ["flyway"],
        javaTestingLibraries: ["junit5"],
      }),
    );

    expect(vfs.readFile("pom.xml")).toContain("<flyway>yes</flyway>");
    expect(vfs.exists("src/main/resources/db/migration/V1__init.sql")).toBe(true);
  });

  it("drops liquibase from effective libraries when javaOrm is not spring-data-jpa", async () => {
    const vfs = new VirtualFileSystem();
    await processJavaBaseTemplate(
      vfs,
      makeTemplates({
        "java-base/pom.xml.hbs":
          "<liquibase>{{#if hasJavaLiquibase}}yes{{else}}no{{/if}}</liquibase>",
        "java-base/src/main/resources/db/changelog/db.changelog-master.yaml.hbs":
          "databaseChangeLog: []",
      }),
      makeConfig({
        projectName: "my-app",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: ["liquibase"],
        javaTestingLibraries: ["junit5"],
      }),
    );

    expect(vfs.readFile("pom.xml")).toContain("<liquibase>no</liquibase>");
    expect(vfs.exists("src/main/resources/db/changelog/db.changelog-master.yaml")).toBe(false);
  });

  it("keeps liquibase when javaOrm is spring-data-jpa", async () => {
    const vfs = new VirtualFileSystem();
    await processJavaBaseTemplate(
      vfs,
      makeTemplates({
        "java-base/pom.xml.hbs":
          "<liquibase>{{#if hasJavaLiquibase}}yes{{else}}no{{/if}}</liquibase>",
        "java-base/src/main/resources/db/changelog/db.changelog-master.yaml.hbs":
          "databaseChangeLog: []",
      }),
      makeConfig({
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaOrm: "spring-data-jpa",
        javaAuth: "none",
        javaLibraries: ["liquibase"],
        javaTestingLibraries: ["junit5"],
      }),
    );

    expect(vfs.readFile("pom.xml")).toContain("<liquibase>yes</liquibase>");
    expect(vfs.exists("src/main/resources/db/changelog/db.changelog-master.yaml")).toBe(true);
  });

  it("emits MapStruct examples only when JPA is available", async () => {
    const templates = makeTemplates(JAVA_TEMPLATES);

    const withoutJpa = new VirtualFileSystem();
    await processJavaBaseTemplate(
      withoutJpa,
      templates,
      makeConfig({
        projectName: "my-app",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: ["mapstruct"],
        javaTestingLibraries: ["junit5"],
      }),
    );

    expect(withoutJpa.exists("src/main/java/com/example/myapp/dto/UserDto.java")).toBe(false);
    expect(withoutJpa.exists("src/main/java/com/example/myapp/mapper/AppUserMapper.java")).toBe(
      false,
    );
    expect(withoutJpa.exists("src/test/java/com/example/myapp/mapper/AppUserMapperTest.java")).toBe(
      false,
    );

    const withJpa = new VirtualFileSystem();
    await processJavaBaseTemplate(
      withJpa,
      templates,
      makeConfig({
        projectName: "my-app",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaOrm: "spring-data-jpa",
        javaAuth: "none",
        javaLibraries: ["mapstruct"],
        javaTestingLibraries: ["junit5"],
      }),
    );

    expect(withJpa.exists("src/main/java/com/example/myapp/dto/UserDto.java")).toBe(true);
    expect(withJpa.exists("src/main/java/com/example/myapp/mapper/AppUserMapper.java")).toBe(true);
    expect(withJpa.exists("src/test/java/com/example/myapp/mapper/AppUserMapperTest.java")).toBe(
      true,
    );
  });

  it("emits Caffeine, ArchUnit, and jqwik templates only when selected", async () => {
    const withoutSelections = new VirtualFileSystem();
    await processJavaBaseTemplate(
      withoutSelections,
      makeTemplates(JAVA_TEMPLATES),
      makeConfig({
        projectName: "my-app",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: [],
        javaTestingLibraries: ["junit5"],
      }),
    );

    expect(
      withoutSelections.exists("src/main/java/com/example/myapp/cache/CachedTimeService.java"),
    ).toBe(false);
    expect(
      withoutSelections.exists("src/main/java/com/example/myapp/controller/CacheController.java"),
    ).toBe(false);
    expect(withoutSelections.exists("src/test/java/com/example/myapp/ArchitectureTest.java")).toBe(
      false,
    );
    expect(withoutSelections.exists("src/test/java/com/example/myapp/PropertyBasedTest.java")).toBe(
      false,
    );

    const withSelections = new VirtualFileSystem();
    await processJavaBaseTemplate(
      withSelections,
      makeTemplates(JAVA_TEMPLATES),
      makeConfig({
        projectName: "my-app",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaOrm: "none",
        javaAuth: "none",
        javaLibraries: ["caffeine"],
        javaTestingLibraries: ["junit5", "archunit", "jqwik"],
      }),
    );

    expect(
      withSelections.exists("src/main/java/com/example/myapp/cache/CachedTimeService.java"),
    ).toBe(true);
    expect(
      withSelections.exists("src/main/java/com/example/myapp/controller/CacheController.java"),
    ).toBe(true);
    expect(withSelections.exists("src/test/java/com/example/myapp/ArchitectureTest.java")).toBe(
      true,
    );
    expect(withSelections.exists("src/test/java/com/example/myapp/PropertyBasedTest.java")).toBe(
      true,
    );
  });

  it("prefers flyway when flyway and liquibase are both selected", async () => {
    const vfs = new VirtualFileSystem();
    await processJavaBaseTemplate(
      vfs,
      makeTemplates({
        "java-base/pom.xml.hbs":
          "<flyway>{{#if hasJavaFlyway}}yes{{else}}no{{/if}}</flyway><liquibase>{{#if hasJavaLiquibase}}yes{{else}}no{{/if}}</liquibase>",
        "java-base/src/main/resources/db/migration/V1__init.sql.hbs": "-- migration",
        "java-base/src/main/resources/db/changelog/db.changelog-master.yaml.hbs":
          "databaseChangeLog: []",
      }),
      makeConfig({
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaOrm: "spring-data-jpa",
        javaAuth: "none",
        javaLibraries: ["flyway", "liquibase"],
        javaTestingLibraries: ["junit5"],
      }),
    );

    expect(vfs.readFile("pom.xml")).toContain("<flyway>yes</flyway><liquibase>no</liquibase>");
    expect(vfs.exists("src/main/resources/db/migration/V1__init.sql")).toBe(true);
    expect(vfs.exists("src/main/resources/db/changelog/db.changelog-master.yaml")).toBe(false);
  });

  it("falls back to a source-only plain Java scaffold when Spring Boot has no build tool", async () => {
    const vfs = new VirtualFileSystem();
    await processJavaBaseTemplate(
      vfs,
      makeTemplates(JAVA_TEMPLATES),
      makeConfig({
        projectName: "my-app",
        projectDir: "/tmp/my-app",
        relativePath: "my-app",
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "none",
        javaOrm: "spring-data-jpa",
        javaAuth: "spring-security",
        javaLibraries: ["spring-actuator", "liquibase", "springdoc-openapi"],
        javaTestingLibraries: ["junit5", "rest-assured", "wiremock", "awaitility"],
      }),
    );

    expect(vfs.exists("src/main/java/com/example/myapp/Application.java")).toBe(true);
    expect(vfs.exists("pom.xml")).toBe(false);
    expect(vfs.exists("build.gradle.kts")).toBe(false);
    expect(vfs.exists("src/main/resources/application.yml")).toBe(false);
    expect(vfs.exists("src/main/java/com/example/myapp/controller/HealthController.java")).toBe(
      false,
    );
    expect(vfs.exists("src/test/java/com/example/myapp/ApplicationTests.java")).toBe(false);
  });

  it("prefixes 'app' when the project name sanitizes to a java reserved word", async () => {
    const templates = makeTemplates({
      "java-base/pom.xml.hbs": "<artifactId>{{javaArtifactId}}</artifactId>",
      "java-base/src/main/java/__javaPackagePath__/Application.java.hbs":
        "package {{javaPackageName}};",
    });

    for (const reservedName of ["class", "package", "int", "void", "true"]) {
      const vfs = new VirtualFileSystem();
      await processJavaBaseTemplate(
        vfs,
        templates,
        makeConfig({
          projectName: reservedName,
          projectDir: `/tmp/${reservedName}`,
          relativePath: reservedName,
          ecosystem: "java",
          javaWebFramework: "spring-boot",
          javaBuildTool: "maven",
          javaOrm: "none",
          javaAuth: "none",
          javaLibraries: [],
          javaTestingLibraries: ["junit5"],
        }),
      );

      // The package declaration must not be a reserved word.
      const appSource = vfs.readFile(
        `src/main/java/com/example/app${reservedName}/Application.java`,
      );
      expect(appSource).toBe(`package com.example.app${reservedName};`);
    }
  });
});
