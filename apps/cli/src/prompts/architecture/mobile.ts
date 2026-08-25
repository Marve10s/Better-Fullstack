import type {
  MobileDeepLinking,
  MobileLibraries,
  MobileNavigation,
  MobileOTA,
  MobilePush,
  MobileStorage,
  MobileTesting,
  MobileUI,
} from "@/types";

import { exitCancelled } from "@/presentation/errors";
import { canPromptInteractively } from "@/presentation/prompt-environment";
import { isCancel, navigableMultiselect, navigableSelect } from "@/prompts/core/navigable";
import {
  createStaticMultiPromptResolution,
  createStaticSinglePromptResolution,
  type PromptOption,
} from "@/prompts/core/prompt-contract";

const MOBILE_NAVIGATION_OPTIONS: PromptOption<MobileNavigation>[] = [
  { value: "expo-router", label: "Expo Router", hint: "File-based routing for Expo apps" },
  {
    value: "react-navigation",
    label: "React Navigation",
    hint: "Code-defined native stacks and tabs",
  },
  { value: "none", label: "None", hint: "Skip navigation setup" },
];

const MOBILE_UI_OPTIONS: PromptOption<MobileUI>[] = [
  { value: "none", label: "None", hint: "Use React Native primitives" },
  { value: "tamagui", label: "Tamagui", hint: "Universal themed UI primitives" },
  { value: "gluestack-ui", label: "Gluestack UI", hint: "Accessible cross-platform components" },
  { value: "uniwind", label: "Uniwind", hint: "Tailwind-style React Native styling" },
  { value: "unistyles", label: "Unistyles", hint: "Type-safe React Native stylesheets" },
];

const MOBILE_STORAGE_OPTIONS: PromptOption<MobileStorage>[] = [
  { value: "none", label: "None", hint: "Skip device storage helpers" },
  { value: "mmkv", label: "MMKV", hint: "Fast encrypted key-value storage" },
];

const MOBILE_TESTING_OPTIONS: PromptOption<MobileTesting>[] = [
  { value: "none", label: "None", hint: "Skip mobile testing setup" },
  { value: "maestro", label: "Maestro", hint: "Mobile E2E flow files" },
  {
    value: "react-native-testing-library",
    label: "React Native Testing Library",
    hint: "Unit tests for native components",
  },
  {
    value: "maestro-react-native-testing-library",
    label: "Maestro + RN Testing Library",
    hint: "Mobile E2E flows and unit tests",
  },
];

const MOBILE_PUSH_OPTIONS: PromptOption<MobilePush>[] = [
  { value: "none", label: "None", hint: "Skip push notification setup" },
  { value: "expo-notifications", label: "Expo Notifications", hint: "Expo push token helper" },
];

const MOBILE_OTA_OPTIONS: PromptOption<MobileOTA>[] = [
  { value: "none", label: "None", hint: "Skip OTA update setup" },
  { value: "expo-updates", label: "Expo Updates", hint: "Runtime version and update helper" },
];

const MOBILE_DEEP_LINKING_OPTIONS: PromptOption<MobileDeepLinking>[] = [
  { value: "expo-linking", label: "Expo Linking", hint: "Scheme config and redirect URI helpers" },
  { value: "none", label: "None", hint: "Skip deep link helpers" },
];

const MOBILE_LIBRARIES_OPTIONS: PromptOption<MobileLibraries>[] = [
  { value: "expo-sqlite", label: "Expo SQLite", hint: "Persistent SQLite database" },
  { value: "expo-camera", label: "Expo Camera", hint: "Camera preview and capture" },
  { value: "expo-image-picker", label: "Expo Image Picker", hint: "System media picker" },
  { value: "expo-location", label: "Expo Location", hint: "Geolocation and geocoding" },
  { value: "expo-sensors", label: "Expo Sensors", hint: "Device motion and sensors" },
  { value: "expo-file-system", label: "Expo File System", hint: "Local file access" },
  { value: "expo-image", label: "Expo Image", hint: "Performant image component" },
  { value: "expo-audio", label: "Expo Audio", hint: "Audio playback and recording" },
  { value: "expo-video", label: "Expo Video", hint: "Cross-platform video playback" },
  { value: "expo-contacts", label: "Expo Contacts", hint: "Device contacts access" },
  { value: "expo-calendar", label: "Expo Calendar", hint: "Device calendars and events" },
  {
    value: "expo-local-authentication",
    label: "Expo Local Authentication",
    hint: "Biometric authentication",
  },
  { value: "expo-sharing", label: "Expo Sharing", hint: "Native share sheet" },
  { value: "expo-clipboard", label: "Expo Clipboard", hint: "System clipboard access" },
  { value: "expo-task-manager", label: "Expo Task Manager", hint: "Background task registry" },
  {
    value: "expo-background-task",
    label: "Expo Background Task",
    hint: "Deferrable background work",
  },
  { value: "expo-maps", label: "Expo Maps", hint: "Native Apple and Google maps" },
  { value: "expo-brightness", label: "Expo Brightness", hint: "Screen brightness control" },
  { value: "expo-battery", label: "Expo Battery", hint: "Battery status monitoring" },
  {
    value: "expo-screen-capture",
    label: "Expo Screen Capture",
    hint: "Screen capture detection and prevention",
  },
  { value: "none", label: "None", hint: "No additional mobile libraries" },
];

async function promptMobileOption<T extends string>(
  options: PromptOption<T>[],
  defaultValue: T,
  selected: T | undefined,
  message: string,
) {
  const resolution = createStaticSinglePromptResolution(options, defaultValue, selected);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? defaultValue;
  if (!canPromptInteractively()) return defaultValue;

  const response = await navigableSelect<T>({
    message,
    options: resolution.options,
    initialValue: resolution.initialValue as T,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}

export function resolveMobileNavigationPrompt(mobileNavigation?: MobileNavigation) {
  return createStaticSinglePromptResolution(
    MOBILE_NAVIGATION_OPTIONS,
    "expo-router",
    mobileNavigation,
  );
}

export function resolveMobileUIPrompt(mobileUI?: MobileUI) {
  return createStaticSinglePromptResolution(MOBILE_UI_OPTIONS, "none", mobileUI);
}

export function resolveMobileStoragePrompt(mobileStorage?: MobileStorage) {
  return createStaticSinglePromptResolution(MOBILE_STORAGE_OPTIONS, "none", mobileStorage);
}

export function resolveMobileTestingPrompt(mobileTesting?: MobileTesting) {
  return createStaticSinglePromptResolution(MOBILE_TESTING_OPTIONS, "none", mobileTesting);
}

export function resolveMobilePushPrompt(mobilePush?: MobilePush) {
  return createStaticSinglePromptResolution(MOBILE_PUSH_OPTIONS, "none", mobilePush);
}

export function resolveMobileOTAPrompt(mobileOTA?: MobileOTA) {
  return createStaticSinglePromptResolution(MOBILE_OTA_OPTIONS, "none", mobileOTA);
}

export function resolveMobileDeepLinkingPrompt(mobileDeepLinking?: MobileDeepLinking) {
  return createStaticSinglePromptResolution(
    MOBILE_DEEP_LINKING_OPTIONS,
    "expo-linking",
    mobileDeepLinking,
  );
}

export function resolveMobileLibrariesPrompt(mobileLibraries?: MobileLibraries[]) {
  return createStaticMultiPromptResolution(MOBILE_LIBRARIES_OPTIONS, [], mobileLibraries);
}

export function getMobileNavigationChoice(mobileNavigation?: MobileNavigation) {
  return promptMobileOption(
    MOBILE_NAVIGATION_OPTIONS,
    "expo-router",
    mobileNavigation,
    "Select mobile navigation",
  );
}

export function getMobileUIChoice(mobileUI?: MobileUI) {
  return promptMobileOption(MOBILE_UI_OPTIONS, "none", mobileUI, "Select mobile UI");
}

export function getMobileStorageChoice(mobileStorage?: MobileStorage) {
  return promptMobileOption(MOBILE_STORAGE_OPTIONS, "none", mobileStorage, "Select mobile storage");
}

export function getMobileTestingChoice(mobileTesting?: MobileTesting) {
  return promptMobileOption(MOBILE_TESTING_OPTIONS, "none", mobileTesting, "Select mobile testing");
}

export function getMobilePushChoice(mobilePush?: MobilePush) {
  return promptMobileOption(MOBILE_PUSH_OPTIONS, "none", mobilePush, "Select mobile push");
}

export function getMobileOTAChoice(mobileOTA?: MobileOTA) {
  return promptMobileOption(MOBILE_OTA_OPTIONS, "none", mobileOTA, "Select mobile OTA updates");
}

export function getMobileDeepLinkingChoice(mobileDeepLinking?: MobileDeepLinking) {
  return promptMobileOption(
    MOBILE_DEEP_LINKING_OPTIONS,
    "expo-linking",
    mobileDeepLinking,
    "Select mobile deep linking",
  );
}

export async function getMobileLibrariesChoice(mobileLibraries?: MobileLibraries[]) {
  const resolution = resolveMobileLibrariesPrompt(mobileLibraries);
  if (!resolution.shouldPrompt) return resolution.autoValue ?? [];
  if (!canPromptInteractively()) return [];

  const response = await navigableMultiselect<MobileLibraries>({
    message: "Select mobile application libraries",
    options: resolution.options,
    required: false,
    initialValues: resolution.initialValue,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response.includes("none") ? [] : response;
}
