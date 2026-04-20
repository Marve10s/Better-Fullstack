import { describe, expect, it, spyOn } from "bun:test";

import { VirtualFileSystem } from "../../src/core/virtual-fs";
import { processJavaBaseTemplate } from "../../src/template-handlers/java-base";
import { makeConfig } from "../_fixtures/config-factory";
import { makeTemplates } from "../_fixtures/template-factory";

const JAVA_TEMPLATES = {
  "java-base/pom.xml.hbs":
    "<project>{{javaArtifactId}}|{{#if hasJavaFlyway}}flyway{{/if}}</project>",
  "java-base/build.gradle.kts.hbs": "rootProject.name = \"{{javaArtifactId}}\"",
  "java-base/settings.gradle.kts.hbs": "rootProject.name = \"{{javaArtifactId}}\"",
  "java-base/mvnw": "#!/bin/sh\necho maven wrapper",
  "java-base/mvnw.cmd": "@echo maven wrapper",
  "java-base/.mvn/wrapper/maven-wrapper.properties": "distributionUrl=https://example",
  "java-base/gradlew": "#!/bin/sh\necho gradle wrapper",
  "java-base/gradlew.bat": "@echo gradle wrapper",
  "java-base/gradle/wrapper/gradle-wrapper.properties": "distributionUrl=https://example",
  "java-base/src/main/java/__javaPackagePath__/Application.java.hbs":
    "package {{javaPackageName}};",
  "java-base/src/main/java/__javaPackagePath__/domain/AppUser.java.hbs":
    "package {{javaPackageName}}.domain;",
  "java-base/src/main/resources/db/migration/V1__init.sql.hbs": "-- migration",
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

  it("skips all java emission when javaBuildTool is 'none' and warns", async () => {
    const vfs = new VirtualFileSystem();
    // NOTE: Bun's `mockRestore()` clears `mock.calls` as well as restoring the
    // original implementation, so we must assert BEFORE restoring. We still
    // restore in a `finally` to keep test isolation if any assertion throws.
    const warn = spyOn(console, "warn").mockImplementation(() => {});
    try {
      await processJavaBaseTemplate(
        vfs,
        makeTemplates(JAVA_TEMPLATES),
        makeConfig({
          ecosystem: "java",
          javaWebFramework: "spring-boot",
          javaBuildTool: "none",
          javaOrm: "none",
          javaAuth: "none",
          javaLibraries: [],
          javaTestingLibraries: ["junit5"],
        }),
      );

      expect(vfs.getFileCount()).toBe(0);
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toContain("javaBuildTool is 'none'");
    } finally {
      warn.mockRestore();
    }
  });

  it("emits only maven-related build files when javaBuildTool is 'maven'", async () => {
    const vfs = new VirtualFileSystem();
    await processJavaBaseTemplate(
      vfs,
      makeTemplates(JAVA_TEMPLATES),
      makeConfig({
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
      const appSource = vfs.readFile(`src/main/java/com/example/app${reservedName}/Application.java`);
      expect(appSource).toBe(`package com.example.app${reservedName};`);
    }
  });
});
