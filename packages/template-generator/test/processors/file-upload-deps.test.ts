import { describe, expect, it } from "bun:test";

import { processFileUploadDeps } from "../../src/processors/file-upload-deps";
import { makeConfig } from "../_fixtures/config-factory";
import { createSeededVFS, getDeps } from "../_fixtures/vfs-factory";

function expectIncludesAll(actual: readonly string[], expected: readonly string[]): void {
  for (const item of expected) {
    expect(actual).toContain(item);
  }
}

describe("processFileUploadDeps", () => {
  it("adds UploadThing for self-hosted React web, separate server, and native apps", () => {
    const selfVfs = createSeededVFS(["apps/web/package.json", "apps/server/package.json"]);
    const nativeVfs = createSeededVFS(["apps/native/package.json"]);

    processFileUploadDeps(
      selfVfs,
      makeConfig({
        fileUpload: "uploadthing",
        backend: "self",
        frontend: ["next"],
      }),
    );
    processFileUploadDeps(
      nativeVfs,
      makeConfig({
        fileUpload: "uploadthing",
        frontend: ["native-bare"],
      }),
    );

    expect(getDeps(selfVfs, "apps/server/package.json").deps).toEqual(["uploadthing"]);
    expectIncludesAll(getDeps(selfVfs, "apps/web/package.json").deps, [
      "uploadthing",
      "@uploadthing/react",
    ]);
    expect(getDeps(nativeVfs, "apps/native/package.json").deps).toEqual(["@uploadthing/expo"]);
  });

  it("adds UploadThing adapters for Astro integrations and server-only base for unsupported Astro UI", () => {
    const astroReactVfs = createSeededVFS(["apps/web/package.json"]);
    const astroBaseVfs = createSeededVFS(["apps/web/package.json"]);

    processFileUploadDeps(
      astroReactVfs,
      makeConfig({
        fileUpload: "uploadthing",
        backend: "self",
        frontend: ["astro"],
        astroIntegration: "react",
      }),
    );
    processFileUploadDeps(
      astroBaseVfs,
      makeConfig({
        fileUpload: "uploadthing",
        backend: "self",
        frontend: ["astro"],
        astroIntegration: "none",
      }),
    );

    expectIncludesAll(getDeps(astroReactVfs, "apps/web/package.json").deps, [
      "uploadthing",
      "@uploadthing/react",
    ]);
    expect(getDeps(astroBaseVfs, "apps/web/package.json").deps).toEqual(["uploadthing"]);
  });

  it("adds UploadThing vue and solid adapters for supported web integrations", () => {
    const nuxtVfs = createSeededVFS(["apps/web/package.json"]);
    const astroVueVfs = createSeededVFS(["apps/web/package.json"]);
    const astroSolidVfs = createSeededVFS(["apps/web/package.json"]);

    processFileUploadDeps(
      nuxtVfs,
      makeConfig({
        fileUpload: "uploadthing",
        backend: "self",
        frontend: ["nuxt"],
      }),
    );
    processFileUploadDeps(
      astroVueVfs,
      makeConfig({
        fileUpload: "uploadthing",
        backend: "self",
        frontend: ["astro"],
        astroIntegration: "vue",
      }),
    );
    processFileUploadDeps(
      astroSolidVfs,
      makeConfig({
        fileUpload: "uploadthing",
        backend: "self",
        frontend: ["astro"],
        astroIntegration: "solid",
      }),
    );

    expectIncludesAll(getDeps(nuxtVfs, "apps/web/package.json").deps, [
      "uploadthing",
      "@uploadthing/nuxt",
    ]);
    expectIncludesAll(getDeps(astroVueVfs, "apps/web/package.json").deps, [
      "uploadthing",
      "@uploadthing/vue",
    ]);
    expectIncludesAll(getDeps(astroSolidVfs, "apps/web/package.json").deps, [
      "uploadthing",
      "@uploadthing/solid",
    ]);
  });

  it("adds FilePond framework adapters or vanilla plugins depending on frontend", () => {
    const svelteVfs = createSeededVFS(["apps/web/package.json"]);
    const astroVfs = createSeededVFS(["apps/web/package.json"]);
    const solidVfs = createSeededVFS(["apps/web/package.json"]);

    processFileUploadDeps(
      svelteVfs,
      makeConfig({
        fileUpload: "filepond",
        frontend: ["svelte"],
      }),
    );
    processFileUploadDeps(
      astroVfs,
      makeConfig({
        fileUpload: "filepond",
        frontend: ["astro"],
        astroIntegration: "none",
      }),
    );
    processFileUploadDeps(
      solidVfs,
      makeConfig({
        fileUpload: "filepond",
        frontend: ["solid"],
      }),
    );

    expectIncludesAll(getDeps(svelteVfs, "apps/web/package.json").deps, [
      "filepond",
      "filepond-plugin-image-preview",
      "filepond-plugin-file-validate-type",
      "filepond-plugin-file-validate-size",
      "svelte-filepond",
    ]);
    expect(getDeps(astroVfs, "apps/web/package.json").deps).toEqual([
      "filepond",
      "filepond-plugin-file-validate-size",
      "filepond-plugin-file-validate-type",
      "filepond-plugin-image-preview",
    ]);
    expect(getDeps(solidVfs, "apps/web/package.json").deps).toEqual([
      "filepond",
      "filepond-plugin-file-validate-size",
      "filepond-plugin-file-validate-type",
      "filepond-plugin-image-preview",
    ]);
  });

  it("adds FilePond vue adapters for Nuxt and Astro Vue integrations", () => {
    const nuxtVfs = createSeededVFS(["apps/web/package.json"]);
    const astroVueVfs = createSeededVFS(["apps/web/package.json"]);

    processFileUploadDeps(
      nuxtVfs,
      makeConfig({
        fileUpload: "filepond",
        frontend: ["nuxt"],
      }),
    );
    processFileUploadDeps(
      astroVueVfs,
      makeConfig({
        fileUpload: "filepond",
        frontend: ["astro"],
        astroIntegration: "vue",
      }),
    );

    expectIncludesAll(getDeps(nuxtVfs, "apps/web/package.json").deps, [
      "filepond",
      "vue-filepond",
    ]);
    expectIncludesAll(getDeps(astroVueVfs, "apps/web/package.json").deps, [
      "filepond",
      "vue-filepond",
    ]);
  });

  it("adds Uppy framework adapters or vanilla packages depending on frontend", () => {
    const angularVfs = createSeededVFS(["apps/web/package.json"]);
    const astroSvelteVfs = createSeededVFS(["apps/web/package.json"]);
    const solidVfs = createSeededVFS(["apps/web/package.json"]);

    processFileUploadDeps(
      angularVfs,
      makeConfig({
        fileUpload: "uppy",
        frontend: ["angular"],
      }),
    );
    processFileUploadDeps(
      astroSvelteVfs,
      makeConfig({
        fileUpload: "uppy",
        frontend: ["astro"],
        astroIntegration: "svelte",
      }),
    );
    processFileUploadDeps(
      solidVfs,
      makeConfig({
        fileUpload: "uppy",
        frontend: ["solid"],
      }),
    );

    expectIncludesAll(getDeps(angularVfs, "apps/web/package.json").deps, [
      "@uppy/core",
      "@uppy/dashboard",
      "@uppy/drag-drop",
      "@uppy/progress-bar",
      "@uppy/xhr-upload",
      "@uppy/tus",
      "@uppy/angular",
    ]);
    expectIncludesAll(getDeps(astroSvelteVfs, "apps/web/package.json").deps, [
      "@uppy/core",
      "@uppy/svelte",
    ]);
    expect(getDeps(solidVfs, "apps/web/package.json").deps).toEqual([
      "@uppy/core",
      "@uppy/dashboard",
      "@uppy/drag-drop",
      "@uppy/progress-bar",
      "@uppy/tus",
      "@uppy/xhr-upload",
    ]);
  });

  it("adds Uppy vue and react adapters for Nuxt and Astro integrations", () => {
    const nuxtVfs = createSeededVFS(["apps/web/package.json"]);
    const astroReactVfs = createSeededVFS(["apps/web/package.json"]);

    processFileUploadDeps(
      nuxtVfs,
      makeConfig({
        fileUpload: "uppy",
        frontend: ["nuxt"],
      }),
    );
    processFileUploadDeps(
      astroReactVfs,
      makeConfig({
        fileUpload: "uppy",
        frontend: ["astro"],
        astroIntegration: "react",
      }),
    );

    expectIncludesAll(getDeps(nuxtVfs, "apps/web/package.json").deps, [
      "@uppy/core",
      "@uppy/vue",
    ]);
    expectIncludesAll(getDeps(astroReactVfs, "apps/web/package.json").deps, [
      "@uppy/core",
      "@uppy/react",
    ]);
  });

  it("does nothing when file upload is none", () => {
    const vfs = createSeededVFS(["apps/web/package.json", "apps/server/package.json"]);

    processFileUploadDeps(vfs, makeConfig({ fileUpload: "none" }));

    expect(getDeps(vfs, "apps/web/package.json")).toEqual({ deps: [], devDeps: [] });
    expect(getDeps(vfs, "apps/server/package.json")).toEqual({ deps: [], devDeps: [] });
  });
});
