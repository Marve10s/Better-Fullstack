const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const defaultResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const resolveRequest = defaultResolveRequest ?? context.resolveRequest;
  // Uniwind 1.12 redirects this import to a web wrapper it does not ship.
  if (platform === "web" && moduleName === "uniwind/components/InputAccessoryView") {
    return resolveRequest(context, "react-native-web/dist/exports/InputAccessoryView", platform);
  }
  return resolveRequest(context, moduleName, platform);
};

const uniwindConfig = withUniwindConfig(config, {
  cssEntryFile: "./global.css",
  dtsFile: "./uniwind-types.d.ts",
});

module.exports = uniwindConfig;
