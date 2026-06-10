import { describe, expect, it } from "bun:test";
import {
  CATEGORY_ORDER,
  RUST_CATEGORY_ORDER,
  TYPESCRIPT_CATEGORY_ORDER,
} from "@better-fullstack/types";

import type { Ecosystem, TechCategory } from "../src/lib/types";

import { getCategoryDisplayName } from "../src/components/stack-builder/utils";
import {
  DEFAULT_STACK,
  ECOSYSTEMS,
  ECOSYSTEM_CATEGORIES,
  PRESET_CATEGORIES,
  TECH_OPTIONS,
  type StackState,
} from "../src/lib/constant";
import { ICON_REGISTRY } from "../src/lib/tech-icons";

describe("Rust Ecosystem Tab", () => {
  describe("Ecosystem Type", () => {
    it("should have typescript and rust as valid ecosystem values", () => {
      const ecosystems: Ecosystem[] = ["typescript", "react-native", "rust", "python", "go", "java", "elixir"];
      expect(ecosystems).toContain("typescript");
      expect(ecosystems).toContain("rust");
    });
  });

  describe("ECOSYSTEMS constant", () => {
    it("should contain TypeScript ecosystem", () => {
      const tsEcosystem = ECOSYSTEMS.find((e) => e.id === "typescript");
      expect(tsEcosystem).toBeDefined();
      expect(tsEcosystem?.name).toBe("TypeScript");
      expect(tsEcosystem?.icon).toContain("typescript");
    });

    it("should contain Rust ecosystem", () => {
      const rustEcosystem = ECOSYSTEMS.find((e) => e.id === "rust");
      expect(rustEcosystem).toBeDefined();
      expect(rustEcosystem?.name).toBe("Rust");
      expect(rustEcosystem?.icon).toBe("");
      expect(rustEcosystem?.description).toBe("High-performance Rust ecosystem");
    });

    it("should list every ecosystem category", () => {
      expect(ECOSYSTEMS).toHaveLength(Object.keys(ECOSYSTEM_CATEGORIES).length);
    });
  });

  describe("ECOSYSTEM_CATEGORIES", () => {
    it("should have categories for typescript ecosystem", () => {
      expect(ECOSYSTEM_CATEGORIES.typescript).toBeDefined();
      expect(ECOSYSTEM_CATEGORIES.typescript.length).toBeGreaterThan(0);
    });

    it("should have categories for rust ecosystem", () => {
      expect(ECOSYSTEM_CATEGORIES.rust).toBeDefined();
      expect(ECOSYSTEM_CATEGORIES.rust.length).toBeGreaterThan(0);
    });

    it("should include rust-specific categories in rust ecosystem", () => {
      const rustCategories = ECOSYSTEM_CATEGORIES.rust;
      expect(rustCategories).toContain("rustWebFramework");
      expect(rustCategories).toContain("rustFrontend");
      expect(rustCategories).toContain("rustOrm");
      expect(rustCategories).toContain("rustApi");
      expect(rustCategories).toContain("rustCli");
      expect(rustCategories).toContain("rustLibraries");
    });

    it("should include git and install in rust ecosystem", () => {
      const rustCategories = ECOSYSTEM_CATEGORIES.rust;
      expect(rustCategories).toContain("git");
      expect(rustCategories).toContain("install");
    });

    it("should NOT include rust categories in typescript ecosystem", () => {
      const tsCategories = ECOSYSTEM_CATEGORIES.typescript;
      expect(tsCategories).not.toContain("rustWebFramework");
      expect(tsCategories).not.toContain("rustFrontend");
      expect(tsCategories).not.toContain("rustOrm");
    });
  });

  describe("Rust icon registry", () => {
    it("should not use a fallback icon for the Rust preset card", () => {
      const rustPresetCategory = PRESET_CATEGORIES.find((category) => category.id === "rust");

      expect(rustPresetCategory).toBeDefined();
      expect(rustPresetCategory?.icon).toBe("");
    });

    it("should register local icons for the Rust tools that have them", () => {
      expect(ICON_REGISTRY.axum).toEqual({ type: "local", src: "/icon/axum.svg" });
      expect(ICON_REGISTRY["actix-web"]).toEqual({ type: "local", src: "/icon/actix.svg" });
      expect(ICON_REGISTRY.leptos).toEqual({ type: "local", src: "/icon/leptos.svg" });
      expect(ICON_REGISTRY.dioxus).toEqual({ type: "local", src: "/icon/dioxus.svg" });
      expect(ICON_REGISTRY["sea-orm"]).toEqual({ type: "local", src: "/icon/seaorm.svg" });
      expect(ICON_REGISTRY.tonic).toEqual({ type: "local", src: "/icon/tonic.svg" });
      expect(ICON_REGISTRY.rocket).toBeUndefined();
      expect(ICON_REGISTRY.diesel).toBeUndefined();
      expect(ICON_REGISTRY.uuid).toBeUndefined();
      expect(ICON_REGISTRY.chrono).toBeUndefined();
      expect(ICON_REGISTRY.reqwest).toBeUndefined();
      expect(ICON_REGISTRY.config).toBeUndefined();
      expect(ICON_REGISTRY.dashmap).toBeUndefined();
      expect(ICON_REGISTRY["parking-lot"]).toBeUndefined();
      expect(ICON_REGISTRY.secrecy).toBeUndefined();
      expect(ICON_REGISTRY["tokio-util"]).toBeUndefined();
      expect(ICON_REGISTRY.utoipa).toBeUndefined();
      expect(ICON_REGISTRY.tracing).toBeUndefined();
      expect(ICON_REGISTRY["env-logger"]).toBeUndefined();
      expect(ICON_REGISTRY["anyhow-thiserror"]).toBeUndefined();
      expect(ICON_REGISTRY.eyre).toBeUndefined();
      expect(ICON_REGISTRY.moka).toBeUndefined();
      expect(ICON_REGISTRY.oauth2).toBeUndefined();
    });
  });

  describe("TECH_OPTIONS - Rust Categories", () => {
    const rustCategories: TechCategory[] = [
      "rustWebFramework",
      "rustFrontend",
      "rustOrm",
      "rustApi",
      "rustCli",
      "rustLibraries",
    ];

    for (const category of rustCategories) {
      it(`should have options for ${category}`, () => {
        const options = TECH_OPTIONS[category];
        expect(options).toBeDefined();
        expect(Array.isArray(options)).toBe(true);
        expect(options.length).toBeGreaterThan(0);
      });

      it(`should have a "none" option for ${category}`, () => {
        const options = TECH_OPTIONS[category];
        const noneOption = options.find((o) => o.id === "none");
        expect(noneOption).toBeDefined();
      });

      it(`should have exactly one default option for ${category}`, () => {
        const options = TECH_OPTIONS[category];
        const defaultOptions = options.filter((o) => o.default === true);
        expect(defaultOptions.length).toBe(1);
      });
    }

    it("should have Axum as default for rustWebFramework", () => {
      const options = TECH_OPTIONS.rustWebFramework;
      const axumOption = options.find((o) => o.id === "axum");
      expect(axumOption).toBeDefined();
      expect(axumOption?.default).toBe(true);
      expect(axumOption?.name).toBe("Axum");
      expect(axumOption?.description).toContain("Tokio team");
    });

    it("should have Actix-web option for rustWebFramework", () => {
      const options = TECH_OPTIONS.rustWebFramework;
      const actixOption = options.find((o) => o.id === "actix-web");
      expect(actixOption).toBeDefined();
      expect(actixOption?.name).toBe("Actix-web");
      expect(actixOption?.icon).toBe("");
    });

    it("should have Leptos as default for rustFrontend", () => {
      const options = TECH_OPTIONS.rustFrontend;
      const leptosOption = options.find((o) => o.id === "leptos");
      expect(leptosOption).toBeDefined();
      expect(leptosOption?.default).toBe(true);
      expect(leptosOption?.name).toBe("Leptos");
      expect(leptosOption?.description).toContain("reactive");
      expect(leptosOption?.description).toContain("SSR");
    });

    it("should have none option for rustFrontend when user wants to skip", () => {
      const options = TECH_OPTIONS.rustFrontend;
      const noneOption = options.find((o) => o.id === "none");
      expect(noneOption).toBeDefined();
      expect(noneOption?.default).toBe(false);
      expect(noneOption?.name).toBe("No WASM Frontend");
    });

    it("should keep Rust options without real logos icon-free", () => {
      expect(TECH_OPTIONS.rustWebFramework.find((o) => o.id === "rocket")?.icon).toBe("");
      expect(TECH_OPTIONS.rustOrm.find((o) => o.id === "diesel")?.icon).toBe("");
      expect(TECH_OPTIONS.rustApi.find((o) => o.id === "async-graphql")?.icon).toBe("");
      expect(TECH_OPTIONS.rustLibraries.find((o) => o.id === "uuid")?.icon).toBe("");
      expect(TECH_OPTIONS.rustLibraries.find((o) => o.id === "chrono")?.icon).toBe("");
      expect(TECH_OPTIONS.rustLibraries.find((o) => o.id === "reqwest")?.icon).toBe("");
      expect(TECH_OPTIONS.rustLibraries.find((o) => o.id === "config")?.icon).toBe("");
      expect(TECH_OPTIONS.rustLibraries.find((o) => o.id === "dashmap")?.icon).toBe("");
      expect(TECH_OPTIONS.rustLibraries.find((o) => o.id === "parking-lot")?.icon).toBe("");
      expect(TECH_OPTIONS.rustLibraries.find((o) => o.id === "secrecy")?.icon).toBe("");
      expect(TECH_OPTIONS.rustLibraries.find((o) => o.id === "tokio-util")?.icon).toBe("");
      expect(TECH_OPTIONS.rustLibraries.find((o) => o.id === "utoipa")?.icon).toBe("");
      expect(TECH_OPTIONS.rustLogging.find((o) => o.id === "tracing")?.icon).toBe("");
      expect(TECH_OPTIONS.rustLogging.find((o) => o.id === "env-logger")?.icon).toBe("");
      expect(TECH_OPTIONS.rustErrorHandling.find((o) => o.id === "anyhow-thiserror")?.icon).toBe("");
      expect(TECH_OPTIONS.rustErrorHandling.find((o) => o.id === "eyre")?.icon).toBe("");
      expect(TECH_OPTIONS.rustCaching.find((o) => o.id === "moka")?.icon).toBe("");
      expect(TECH_OPTIONS.rustCaching.find((o) => o.id === "redis")?.icon).toBe("");
      expect(TECH_OPTIONS.rustAuth.find((o) => o.id === "oauth2")?.icon).toBe("");
    });

    it("should expose Serde as a selectable rust library", () => {
      const options = TECH_OPTIONS.rustLibraries;
      const serdeOption = options.find((o) => o.id === "serde");
      expect(serdeOption).toBeDefined();
      expect(serdeOption?.default).toBe(false);
      expect(serdeOption?.name).toBe("Serde");
      expect(serdeOption?.description).toContain("serialization");
    });

    it("should use none as the visible default for rustLibraries", () => {
      const options = TECH_OPTIONS.rustLibraries;
      const noneOption = options.find((o) => o.id === "none");
      expect(noneOption).toBeDefined();
      expect(noneOption?.default).toBe(true);
      expect(noneOption?.name).toBe("No Additional Libraries");
    });

    it("should have Validator option for rustLibraries", () => {
      const options = TECH_OPTIONS.rustLibraries;
      const validatorOption = options.find((o) => o.id === "validator");
      expect(validatorOption).toBeDefined();
      expect(validatorOption?.default).toBe(false);
      expect(validatorOption?.name).toBe("Validator");
      expect(validatorOption?.description).toContain("validation");
    });

    it("should have common runtime library options for rustLibraries", () => {
      const options = TECH_OPTIONS.rustLibraries;
      const uuidOption = options.find((o) => o.id === "uuid");
      const chronoOption = options.find((o) => o.id === "chrono");
      const reqwestOption = options.find((o) => o.id === "reqwest");
      const configOption = options.find((o) => o.id === "config");

      expect(uuidOption).toBeDefined();
      expect(uuidOption?.description).toContain("UUID");
      expect(chronoOption).toBeDefined();
      expect(chronoOption?.description).toContain("Date and time");
      expect(reqwestOption).toBeDefined();
      expect(reqwestOption?.description).toContain("HTTP client");
      expect(configOption).toBeDefined();
      expect(configOption?.description).toContain("Layered configuration");
    });

    it("should have additional runtime utility options for rustLibraries", () => {
      const options = TECH_OPTIONS.rustLibraries;
      expect(options.find((o) => o.id === "dashmap")?.name).toBe("DashMap");
      expect(options.find((o) => o.id === "parking-lot")?.name).toBe("parking_lot");
      expect(options.find((o) => o.id === "secrecy")?.name).toBe("Secrecy");
      expect(options.find((o) => o.id === "tokio-util")?.name).toBe("Tokio Util");
      expect(options.find((o) => o.id === "utoipa")?.name).toBe("utoipa");
    });

    it("should have jsonwebtoken option for rustLibraries", () => {
      const options = TECH_OPTIONS.rustLibraries;
      const jwtOption = options.find((o) => o.id === "jsonwebtoken");
      expect(jwtOption).toBeDefined();
      expect(jwtOption?.default).toBe(false);
      expect(jwtOption?.name).toBe("jsonwebtoken");
      expect(jwtOption?.description).toContain("JWT");
    });

    it("should have argon2 option for rustLibraries", () => {
      const options = TECH_OPTIONS.rustLibraries;
      const argon2Option = options.find((o) => o.id === "argon2");
      expect(argon2Option).toBeDefined();
      expect(argon2Option?.default).toBe(false);
      expect(argon2Option?.name).toBe("Argon2");
      expect(argon2Option?.description).toContain("password hashing");
    });
  });

  describe("DEFAULT_STACK", () => {
    it("should have ecosystem set to typescript by default", () => {
      expect(DEFAULT_STACK.ecosystem).toBe("typescript");
    });

    it("should have rust fields with default values", () => {
      expect(DEFAULT_STACK.rustWebFramework).toBe("axum");
      expect(DEFAULT_STACK.rustFrontend).toBe("none");
      expect(DEFAULT_STACK.rustOrm).toBe("sea-orm");
      expect(DEFAULT_STACK.rustApi).toBe("none");
      expect(DEFAULT_STACK.rustCli).toBe("none");
      expect(DEFAULT_STACK.rustLibraries).toEqual([]);
    });

    it("should use an empty array as the default rustLibraries selection", () => {
      expect(DEFAULT_STACK.rustLibraries).toEqual([]);
    });
  });

  describe("StackState type", () => {
    it("should include ecosystem field", () => {
      const stack: Partial<StackState> = {
        ecosystem: "rust",
      };
      expect(stack.ecosystem).toBe("rust");
    });

    it("should include all rust fields", () => {
      const stack: Partial<StackState> = {
        rustWebFramework: "none",
        rustFrontend: "none",
        rustOrm: "none",
        rustApi: "none",
        rustCli: "none",
        rustLibraries: [],
      };
      expect(stack.rustWebFramework).toBe("none");
      expect(stack.rustFrontend).toBe("none");
      expect(stack.rustOrm).toBe("none");
      expect(stack.rustApi).toBe("none");
      expect(stack.rustCli).toBe("none");
      expect(stack.rustLibraries).toEqual([]);
    });
  });

  describe("Category Order", () => {
    it("TYPESCRIPT_CATEGORY_ORDER should not contain rust categories", () => {
      expect(TYPESCRIPT_CATEGORY_ORDER).not.toContain("rustWebFramework");
      expect(TYPESCRIPT_CATEGORY_ORDER).not.toContain("rustFrontend");
      expect(TYPESCRIPT_CATEGORY_ORDER).not.toContain("rustOrm");
    });

    it("RUST_CATEGORY_ORDER should contain rust categories", () => {
      expect(RUST_CATEGORY_ORDER).toContain("rustWebFramework");
      expect(RUST_CATEGORY_ORDER).toContain("rustFrontend");
      expect(RUST_CATEGORY_ORDER).toContain("rustOrm");
      expect(RUST_CATEGORY_ORDER).toContain("rustApi");
      expect(RUST_CATEGORY_ORDER).toContain("rustCli");
      expect(RUST_CATEGORY_ORDER).toContain("rustLibraries");
    });

    it("RUST_CATEGORY_ORDER should contain git and install", () => {
      expect(RUST_CATEGORY_ORDER).toContain("git");
      expect(RUST_CATEGORY_ORDER).toContain("install");
    });

    it("CATEGORY_ORDER should contain all categories", () => {
      // TypeScript categories
      expect(CATEGORY_ORDER).toContain("webFrontend");
      expect(CATEGORY_ORDER).toContain("backend");
      expect(CATEGORY_ORDER).toContain("database");

      // Rust categories
      expect(CATEGORY_ORDER).toContain("rustWebFramework");
      expect(CATEGORY_ORDER).toContain("rustFrontend");
    });
  });

  describe("getCategoryDisplayName", () => {
    it("should return correct display name for rust categories", () => {
      expect(getCategoryDisplayName("rustWebFramework")).toBe("Rust Web Framework");
      expect(getCategoryDisplayName("rustFrontend")).toBe("Rust Frontend (WASM)");
      expect(getCategoryDisplayName("rustOrm")).toBe("Rust ORM / Database");
      expect(getCategoryDisplayName("rustApi")).toBe("Rust API Layer");
      expect(getCategoryDisplayName("rustCli")).toBe("Rust CLI Tools");
      expect(getCategoryDisplayName("rustLibraries")).toBe("Rust Core Libraries");
    });

    it("should return camelCase conversion for other categories", () => {
      expect(getCategoryDisplayName("webFrontend")).toBe("Web Frontend");
      expect(getCategoryDisplayName("backend")).toBe("Backend");
    });
  });
});
