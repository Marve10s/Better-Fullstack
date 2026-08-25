import { Composition, Still } from "remotion";

import "@/fonts";
import { OgCard, type OgCardProps } from "@/campaign/og-card";
import { OG_CARD_OUTPUTS } from "@/campaign/og-outputs";
import {
  CAMPAIGN_DURATION,
  CAMPAIGN_FPS,
  FeatureClip,
  RunBeforeYouCloneVideo,
} from "@/campaign/video";
import { SearchMediaStill, SearchMediaVideo } from "@/search-media/search-media";
import {
  SEARCH_MEDIA_DURATION,
  SEARCH_MEDIA_FPS,
  SEARCH_MEDIA_HEIGHT,
  SEARCH_MEDIA_SPECS,
  SEARCH_MEDIA_WIDTH,
} from "@/search-media/specs";
import { BF_COLORS } from "@/styles";

const icon = (slug: string, color: string) => `https://cdn.simpleicons.org/${slug}/${color}`;

const sharedOg = {
  body: "Inspect the generated code, run it in your browser and download the real project.",
  accent: BF_COLORS.purple,
} as const;

const nonRunnableOg = {
  body: "Inspect the generated code, configure the stack and download the real project.",
  accent: BF_COLORS.purple,
  actions: ["inspect", "configure", "download"],
} as const;

const ogCards: Array<{ id: string; fileName: string; props: OgCardProps }> = [
  {
    id: "OgRunBeforeYouClone",
    fileName: "run-before-you-clone-1200x630.png",
    props: {
      ...sharedOg,
      eyebrow: "run before you clone",
      title: "Don’t trust a starter you can’t run.",
      technologies: [
        { name: "TypeScript", icon: icon("typescript", "3178C6") },
        { name: "React", icon: icon("react", "61DAFB") },
        { name: "WebContainers", icon: icon("stackblitz", "1389FD") },
      ],
    },
  },
  {
    id: "OgEditAndRun",
    fileName: "edit-and-run-1200x630.png",
    props: {
      ...sharedOg,
      eyebrow: "live browser runtime",
      title: "Edit the source. Run the real project.",
      technologies: [
        { name: "TypeScript", icon: icon("typescript", "3178C6") },
        { name: "Vite", icon: icon("vite", "646CFF") },
        { name: "React", icon: icon("react", "61DAFB") },
      ],
    },
  },
  {
    id: "OgDownloadZip",
    fileName: "download-zip-1200x630.png",
    props: {
      ...sharedOg,
      eyebrow: "your code stays yours",
      title: "Generate it. Inspect it. Take the ZIP.",
      technologies: [
        { name: "No signup", icon: icon("checkmarx", "C6E853") },
        { name: "No upload", icon: icon("icloud", "18D5FF") },
        { name: "Normal ZIP", icon: icon("files", "F2EEEE") },
      ],
    },
  },
  {
    id: "OgTypeScriptStack",
    fileName: "stack-typescript-1200x630.png",
    props: {
      ...sharedOg,
      eyebrow: "typescript stack",
      title: "Build a TypeScript stack you can run first.",
      technologies: [
        { name: "TypeScript", icon: icon("typescript", "3178C6") },
        { name: "Next.js", icon: icon("nextdotjs", "F2EEEE") },
        { name: "TanStack", icon: icon("reactquery", "FF4154") },
      ],
    },
  },
  {
    id: "OgReactNativeStack",
    fileName: "stack-react-native-1200x630.png",
    props: {
      ...nonRunnableOg,
      eyebrow: "react native stack",
      title: "Start a mobile stack without the wiring.",
      technologies: [
        { name: "React Native", icon: icon("react", "61DAFB") },
        { name: "Expo", icon: icon("expo", "F2EEEE") },
        { name: "NativeWind", icon: icon("tailwindcss", "06B6D4") },
      ],
    },
  },
  {
    id: "OgRustStack",
    fileName: "stack-rust-1200x630.png",
    props: {
      ...nonRunnableOg,
      eyebrow: "rust stack",
      title: "Scaffold Rust without hand-wiring the stack.",
      technologies: [
        { name: "Rust", icon: icon("rust", "F2EEEE") },
        { name: "Axum", icon: icon("rust", "F2EEEE") },
        { name: "PostgreSQL", icon: icon("postgresql", "4169E1") },
      ],
    },
  },
  {
    id: "OgPythonStack",
    fileName: "stack-python-1200x630.png",
    props: {
      ...nonRunnableOg,
      eyebrow: "python stack",
      title: "Start the Python app, not the boilerplate.",
      technologies: [
        { name: "Python", icon: icon("python", "3776AB") },
        { name: "FastAPI", icon: icon("fastapi", "009688") },
        { name: "Django", icon: icon("django", "44B78B") },
      ],
    },
  },
  {
    id: "OgGoStack",
    fileName: "stack-go-1200x630.png",
    props: {
      ...nonRunnableOg,
      eyebrow: "go stack",
      title: "Scaffold a Go service with the pieces connected.",
      technologies: [
        { name: "Go", icon: icon("go", "00ADD8") },
        { name: "Gin", icon: icon("gin", "00ADD8") },
        { name: "GORM", icon: icon("go", "00ADD8") },
      ],
    },
  },
  {
    id: "OgJavaStack",
    fileName: "stack-java-1200x630.png",
    props: {
      ...nonRunnableOg,
      eyebrow: "java stack",
      title: "Generate the Java stack your team can own.",
      technologies: [
        { name: "Java", icon: icon("openjdk", "F2EEEE") },
        { name: "Spring", icon: icon("springboot", "6DB33F") },
        { name: "Hibernate", icon: icon("hibernate", "BCAE79") },
      ],
    },
  },
  {
    id: "OgElixirStack",
    fileName: "stack-elixir-1200x630.png",
    props: {
      ...nonRunnableOg,
      eyebrow: "elixir stack",
      title: "Start with a wired Elixir application.",
      technologies: [
        { name: "Elixir", icon: icon("elixir", "8B6A9E") },
        { name: "Phoenix", icon: icon("phoenixframework", "FD4F00") },
        { name: "PostgreSQL", icon: icon("postgresql", "4169E1") },
      ],
    },
  },
  {
    id: "OgDotnetStack",
    fileName: "stack-dotnet-1200x630.png",
    props: {
      ...nonRunnableOg,
      eyebrow: ".net stack",
      title: "Start the .NET service with less ceremony.",
      technologies: [
        { name: ".NET", icon: icon("dotnet", "512BD4") },
        { name: "ASP.NET", icon: icon("dotnet", "512BD4") },
        { name: "OpenTelemetry", icon: icon("opentelemetry", "F2EEEE") },
      ],
    },
  },
  {
    id: "OgMultiStack",
    fileName: "stack-multi-ecosystem-1200x630.png",
    props: {
      ...nonRunnableOg,
      eyebrow: "multi-ecosystem",
      title: "One project. More than one language.",
      technologies: [
        { name: "TypeScript", icon: icon("typescript", "3178C6") },
        { name: "Python", icon: icon("python", "3776AB") },
        { name: "Rust", icon: icon("rust", "F2EEEE") },
        { name: "Go", icon: icon("go", "00ADD8") },
      ],
    },
  },
];

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="RunBeforeYouClone"
        component={RunBeforeYouCloneVideo}
        durationInFrames={CAMPAIGN_DURATION}
        fps={CAMPAIGN_FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="RunFeature"
        component={() => <FeatureClip mode="run" />}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="EditFeature"
        component={() => <FeatureClip mode="edit" />}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DownloadFeature"
        component={() => <FeatureClip mode="download" />}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      {ogCards.map(({ id, props }) => (
        <Still key={id} id={id} component={OgCard} width={1200} height={630} defaultProps={props} />
      ))}
      {SEARCH_MEDIA_SPECS.map((spec) => (
        <Still
          key={spec.stillId}
          id={spec.stillId}
          component={SearchMediaStill}
          width={SEARCH_MEDIA_WIDTH}
          height={SEARCH_MEDIA_HEIGHT}
          defaultProps={{ spec }}
        />
      ))}
      {SEARCH_MEDIA_SPECS.map((spec) => (
        <Composition
          key={spec.id}
          id={spec.id}
          component={SearchMediaVideo}
          durationInFrames={SEARCH_MEDIA_DURATION}
          fps={SEARCH_MEDIA_FPS}
          width={SEARCH_MEDIA_WIDTH}
          height={SEARCH_MEDIA_HEIGHT}
          defaultProps={{ spec }}
        />
      ))}
    </>
  );
}
