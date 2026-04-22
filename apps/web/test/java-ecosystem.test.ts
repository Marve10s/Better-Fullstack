import { describe, expect, it } from "bun:test";

import type { Ecosystem, TechCategory } from "../src/lib/types";

import { getCategoryDisplayName } from "../src/components/stack-builder/utils";
import {
  DEFAULT_STACK,
  ECOSYSTEMS,
  ECOSYSTEM_CATEGORIES,
  PLANNED_JAVA_OPTIONS,
  PRESET_CATEGORIES,
  TECH_OPTIONS,
  type StackState,
} from "../src/lib/constant";
import { createStackSearchParams, parseStackFromUrlRecord } from "../src/lib/stack-url-state.shared";
import { CATEGORY_ORDER, JAVA_CATEGORY_ORDER, generateStackCommand } from "../src/lib/stack-utils";

describe("Java Ecosystem Tab", () => {
  describe("Ecosystem Type", () => {
    it("should have java as a valid ecosystem value", () => {
      const ecosystems: Ecosystem[] = ["typescript", "rust", "python", "go", "java"];
      expect(ecosystems).toContain("java");
    });
  });

  describe("ECOSYSTEMS constant", () => {
    it("should contain Java ecosystem", () => {
      const javaEcosystem = ECOSYSTEMS.find((ecosystem) => ecosystem.id === "java");
      expect(javaEcosystem).toBeDefined();
      expect(javaEcosystem?.name).toBe("Java");
      expect(javaEcosystem?.description).toBe("Modern Java ecosystem");
    });

    it("should have exactly 5 ecosystems", () => {
      expect(ECOSYSTEMS).toHaveLength(5);
    });

    it("should use the Java language icon for Java presets", () => {
      const javaPresetCategory = PRESET_CATEGORIES.find((category) => category.id === "java");

      expect(javaPresetCategory).toBeDefined();
      expect(javaPresetCategory?.icon).toBe("java");
    });
  });

  describe("ECOSYSTEM_CATEGORIES", () => {
    it("should include Java-specific categories", () => {
      const javaCategories = ECOSYSTEM_CATEGORIES.java;

      expect(javaCategories).toContain("javaWebFramework");
      expect(javaCategories).toContain("javaBuildTool");
      expect(javaCategories).toContain("javaOrm");
      expect(javaCategories).toContain("javaAuth");
      expect(javaCategories).toContain("javaLibraries");
      expect(javaCategories).toContain("javaTestingLibraries");
      expect(javaCategories).toContain("git");
      expect(javaCategories).toContain("install");
    });

    it("should not include shared auth in the Java ecosystem category list", () => {
      expect(ECOSYSTEM_CATEGORIES.java).not.toContain("auth");
    });
  });

  describe("TECH_OPTIONS", () => {
    const javaCategories: TechCategory[] = [
      "javaWebFramework",
      "javaBuildTool",
      "javaOrm",
      "javaAuth",
      "javaLibraries",
      "javaTestingLibraries",
    ];

    for (const category of javaCategories) {
      it(`should expose options for ${category}`, () => {
        expect(TECH_OPTIONS[category].length).toBeGreaterThan(0);
      });
    }

    it("should default Spring Boot, Maven, and JUnit 5", () => {
      expect(TECH_OPTIONS.javaWebFramework.find((option) => option.id === "spring-boot")?.default).toBe(
        true,
      );
      expect(TECH_OPTIONS.javaBuildTool.find((option) => option.id === "maven")?.default).toBe(
        true,
      );
      expect(
        TECH_OPTIONS.javaTestingLibraries.find((option) => option.id === "junit5")?.default,
      ).toBe(true);
    });

    it("should keep planned options out of selectable builder options", () => {
      expect(TECH_OPTIONS.javaWebFramework.map((option) => option.id)).not.toContain("quarkus");
      expect(TECH_OPTIONS.javaBuildTool.map((option) => option.id)).toContain("gradle");
      expect(TECH_OPTIONS.javaLibraries.map((option) => option.id)).toEqual([
        "spring-actuator",
        "spring-validation",
        "flyway",
        "none",
      ]);
    });
  });

  describe("Planned Java options", () => {
    it("should expose only unimplemented roadmap items as planned metadata", () => {
      expect(PLANNED_JAVA_OPTIONS.map((option) => option.id)).toEqual(["quarkus"]);
      expect(PLANNED_JAVA_OPTIONS.map((option) => option.category)).toEqual(["javaWebFramework"]);
    });
  });

  describe("DEFAULT_STACK", () => {
    it("should have Java defaults", () => {
      expect(DEFAULT_STACK.javaWebFramework).toBe("spring-boot");
      expect(DEFAULT_STACK.javaBuildTool).toBe("maven");
      expect(DEFAULT_STACK.javaOrm).toBe("none");
      expect(DEFAULT_STACK.javaAuth).toBe("none");
      expect(DEFAULT_STACK.javaLibraries).toEqual([]);
      expect(DEFAULT_STACK.javaTestingLibraries).toEqual(["junit5"]);
    });

    it("should allow Java-specific fields in stack state", () => {
      const stack: Partial<StackState> = {
        ecosystem: "java",
        javaWebFramework: "spring-boot",
        javaBuildTool: "maven",
        javaLibraries: ["spring-actuator"],
        javaTestingLibraries: ["junit5", "mockito"],
      };

      expect(stack.ecosystem).toBe("java");
      expect(stack.javaLibraries).toEqual(["spring-actuator"]);
      expect(stack.javaTestingLibraries).toEqual(["junit5", "mockito"]);
    });
  });

  describe("Category order and labels", () => {
    it("should include Java categories in the Java category order", () => {
      expect(JAVA_CATEGORY_ORDER).toContain("javaWebFramework");
      expect(JAVA_CATEGORY_ORDER).toContain("javaBuildTool");
      expect(JAVA_CATEGORY_ORDER).toContain("javaOrm");
      expect(JAVA_CATEGORY_ORDER).toContain("javaAuth");
      expect(JAVA_CATEGORY_ORDER).toContain("javaLibraries");
      expect(JAVA_CATEGORY_ORDER).toContain("javaTestingLibraries");
      expect(JAVA_CATEGORY_ORDER).not.toContain("auth");
    });

    it("should include Java categories in the global category order", () => {
      expect(CATEGORY_ORDER).toContain("javaWebFramework");
      expect(CATEGORY_ORDER).toContain("javaBuildTool");
      expect(CATEGORY_ORDER).toContain("javaOrm");
      expect(CATEGORY_ORDER).toContain("javaAuth");
      expect(CATEGORY_ORDER).toContain("javaLibraries");
      expect(CATEGORY_ORDER).toContain("javaTestingLibraries");
    });

    it("should return readable Java category labels", () => {
      expect(getCategoryDisplayName("javaWebFramework")).toBe("Java Web Framework");
      expect(getCategoryDisplayName("javaBuildTool")).toBe("Java Build Tool");
      expect(getCategoryDisplayName("javaOrm")).toBe("Java ORM / Database");
      expect(getCategoryDisplayName("javaAuth")).toBe("Java Auth");
      expect(getCategoryDisplayName("javaLibraries")).toBe("Java Libraries");
      expect(getCategoryDisplayName("javaTestingLibraries")).toBe("Java Testing Libraries");
    });
  });

  describe("Command and URL state", () => {
    it("should generate Java CLI flags without shared auth flags", () => {
      const command = generateStackCommand({
        ...DEFAULT_STACK,
        ecosystem: "java",
        javaBuildTool: "gradle",
        javaOrm: "spring-data-jpa",
        javaAuth: "spring-security",
        javaLibraries: ["spring-actuator", "flyway"],
        javaTestingLibraries: ["junit5", "mockito"],
      });

      expect(command).toContain("--ecosystem java");
      expect(command).toContain("--java-web-framework spring-boot");
      expect(command).toContain("--java-build-tool gradle");
      expect(command).toContain("--java-orm spring-data-jpa");
      expect(command).toContain("--java-auth spring-security");
      expect(command).toContain("--java-libraries spring-actuator flyway");
      expect(command).toContain("--java-testing-libraries junit5 mockito");
      expect(command).not.toContain("--auth ");
    });

    it("should round-trip Java URL state including array selections", () => {
      const originalStack: StackState = {
        ...DEFAULT_STACK,
        ecosystem: "java",
        javaBuildTool: "gradle",
        javaOrm: "spring-data-jpa",
        javaAuth: "spring-security",
        javaLibraries: ["spring-actuator", "flyway"],
        javaTestingLibraries: ["junit5", "testcontainers"],
      };

      const params = createStackSearchParams(originalStack, { includeDefaults: true });
      const parsedStack = parseStackFromUrlRecord(Object.fromEntries(params.entries()));

      expect(parsedStack.ecosystem).toBe("java");
      expect(parsedStack.javaBuildTool).toBe("gradle");
      expect(parsedStack.javaOrm).toBe("spring-data-jpa");
      expect(parsedStack.javaAuth).toBe("spring-security");
      expect(parsedStack.javaLibraries).toEqual(["spring-actuator", "flyway"]);
      expect(parsedStack.javaTestingLibraries).toEqual(["junit5", "testcontainers"]);
    });
  });
});
