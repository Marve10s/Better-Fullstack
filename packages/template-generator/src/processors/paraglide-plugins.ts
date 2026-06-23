import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";
import type * as TsMorphTypes from "ts-morph";

let tsMorph: typeof TsMorphTypes;

async function loadTsMorph(): Promise<boolean> {
  try {
    tsMorph = await import("ts-morph");
    return true;
  } catch {
    return false;
  }
}

function getParaglideOutdir(config: ProjectConfig): string {
  if (config.frontend.includes("svelte")) return "./src/lib/paraglide";
  if (config.frontend.includes("nuxt")) return "./app/paraglide";
  return "./src/paraglide";
}

function getParaglideOptions(config: ProjectConfig): string {
  return `{
  project: "./project.inlang",
  outdir: "${getParaglideOutdir(config)}",
  emitTsDeclarations: true,
}`;
}

function createSourceFile(fileName: string, content: string, quoteKind = tsMorph.QuoteKind.Double) {
  const project = new tsMorph.Project({
    useInMemoryFileSystem: true,
    manipulationSettings: {
      indentationText: tsMorph.IndentationText.TwoSpaces,
      quoteKind,
    },
  });

  return project.createSourceFile(fileName, content);
}

function addNamedImport(
  sourceFile: TsMorphTypes.SourceFile,
  namedImport: string,
  moduleSpecifier: string,
) {
  const existingImport = sourceFile.getImportDeclaration(
    (decl) => decl.getModuleSpecifierValue() === moduleSpecifier,
  );

  if (existingImport) {
    const hasNamedImport = existingImport
      .getNamedImports()
      .some((decl) => decl.getName() === namedImport);
    if (!hasNamedImport) {
      existingImport.addNamedImport(namedImport);
    }
    return;
  }

  sourceFile.addImportDeclaration({
    namedImports: [namedImport],
    moduleSpecifier,
  });
}

function getExportedConfigObject(
  sourceFile: TsMorphTypes.SourceFile,
  callName: string,
): TsMorphTypes.ObjectLiteralExpression | undefined {
  const exportAssignment = sourceFile.getExportAssignment((decl) => !decl.isExportEquals());
  if (!exportAssignment) return undefined;

  const callExpression = exportAssignment.getExpression();
  if (
    !tsMorph.Node.isCallExpression(callExpression) ||
    callExpression.getExpression().getText() !== callName
  ) {
    return undefined;
  }

  let configObject = callExpression.getArguments()[0];
  if (!configObject) {
    configObject = callExpression.addArgument("{}");
  }

  if (!tsMorph.Node.isObjectLiteralExpression(configObject)) return undefined;
  return configObject;
}

function getOrCreateObjectProperty(
  objectLiteral: TsMorphTypes.ObjectLiteralExpression,
  propertyName: string,
): TsMorphTypes.ObjectLiteralExpression | undefined {
  const existingProperty = objectLiteral.getProperty(propertyName);

  if (existingProperty && tsMorph.Node.isPropertyAssignment(existingProperty)) {
    const initializer = existingProperty.getInitializer();
    if (tsMorph.Node.isObjectLiteralExpression(initializer)) {
      return initializer;
    }
    return undefined;
  }

  if (existingProperty) return undefined;

  objectLiteral.addPropertyAssignment({
    name: propertyName,
    initializer: "{}",
  });

  const property = objectLiteral.getProperty(propertyName);
  if (!property || !tsMorph.Node.isPropertyAssignment(property)) return undefined;

  const initializer = property.getInitializer();
  return tsMorph.Node.isObjectLiteralExpression(initializer) ? initializer : undefined;
}

function addPluginToObject(
  objectLiteral: TsMorphTypes.ObjectLiteralExpression,
  pluginCall: string,
  pluginMarker: string,
) {
  const pluginsProperty = objectLiteral.getProperty("plugins");

  if (pluginsProperty && tsMorph.Node.isPropertyAssignment(pluginsProperty)) {
    const initializer = pluginsProperty.getInitializer();
    if (!tsMorph.Node.isArrayLiteralExpression(initializer)) return;

    const hasPlugin = initializer.getElements().some((element) => element.getText().includes(pluginMarker));
    if (!hasPlugin) {
      initializer.addElement(pluginCall);
    }
    return;
  }

  if (pluginsProperty) return;

  objectLiteral.addPropertyAssignment({
    name: "plugins",
    initializer: `[${pluginCall}]`,
  });
}

function processViteConfig(vfs: VirtualFileSystem, config: ProjectConfig) {
  const viteConfigPath = "apps/web/vite.config.ts";
  if (!vfs.exists(viteConfigPath)) return;

  const content = vfs.readFile(viteConfigPath);
  if (!content) return;

  const sourceFile = createSourceFile("vite.config.ts", content);
  addNamedImport(sourceFile, "paraglideVitePlugin", "@inlang/paraglide-js");

  const configObject = getExportedConfigObject(sourceFile, "defineConfig");
  if (!configObject) return;

  addPluginToObject(
    configObject,
    `paraglideVitePlugin(${getParaglideOptions(config)})`,
    "paraglideVitePlugin",
  );

  vfs.writeFile(viteConfigPath, sourceFile.getFullText());
}

function processNestedViteConfig(
  vfs: VirtualFileSystem,
  config: ProjectConfig,
  filePath: string,
  fileName: string,
  callName: string,
  quoteKind = tsMorph.QuoteKind.Double,
) {
  if (!vfs.exists(filePath)) return;

  const content = vfs.readFile(filePath);
  if (!content) return;

  const sourceFile = createSourceFile(fileName, content, quoteKind);
  addNamedImport(sourceFile, "paraglideVitePlugin", "@inlang/paraglide-js");

  const configObject = getExportedConfigObject(sourceFile, callName);
  if (!configObject) return;

  const viteObject = getOrCreateObjectProperty(configObject, "vite");
  if (!viteObject) return;

  addPluginToObject(
    viteObject,
    `paraglideVitePlugin(${getParaglideOptions(config)})`,
    "paraglideVitePlugin",
  );

  vfs.writeFile(filePath, sourceFile.getFullText());
}

function processNextConfig(vfs: VirtualFileSystem, config: ProjectConfig) {
  const nextConfigPath = "apps/web/next.config.ts";
  if (!vfs.exists(nextConfigPath)) return;

  const content = vfs.readFile(nextConfigPath);
  if (!content) return;

  const sourceFile = createSourceFile("next.config.ts", content);
  addNamedImport(sourceFile, "paraglideWebpackPlugin", "@inlang/paraglide-js");

  const nextConfig = sourceFile.getVariableDeclaration("nextConfig");
  const configObject = nextConfig?.getInitializer();
  if (!tsMorph.Node.isObjectLiteralExpression(configObject)) return;

  const webpackProperty = configObject.getProperty("webpack");
  if (webpackProperty?.getText().includes("paraglideWebpackPlugin")) {
    vfs.writeFile(nextConfigPath, sourceFile.getFullText());
    return;
  }

  if (!webpackProperty) {
    configObject.addPropertyAssignment({
      name: "webpack",
      initializer: `(webpackConfig) => {
  webpackConfig.plugins.push(paraglideWebpackPlugin(${getParaglideOptions(config)}));
  return webpackConfig;
}`,
    });
  }

  vfs.writeFile(nextConfigPath, sourceFile.getFullText());
}

export async function processParaglidePlugins(
  vfs: VirtualFileSystem,
  config: ProjectConfig,
): Promise<void> {
  if (config.i18n !== "paraglide") return;
  if (!(await loadTsMorph())) return;

  processViteConfig(vfs, config);
  processNextConfig(vfs, config);
  processNestedViteConfig(vfs, config, "apps/web/nuxt.config.ts", "nuxt.config.ts", "defineNuxtConfig");
  processNestedViteConfig(
    vfs,
    config,
    "apps/web/astro.config.mjs",
    "astro.config.mjs",
    "defineConfig",
    tsMorph.QuoteKind.Single,
  );
  processNestedViteConfig(
    vfs,
    config,
    "apps/web/app.config.ts",
    "app.config.ts",
    "defineConfig",
  );
}
