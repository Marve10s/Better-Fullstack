import type { Backend, FileUpload } from "../types";

import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const FILE_UPLOAD_PROMPT_OPTIONS = [
  {
    value: "uploadthing" as const,
    label: "UploadThing",
    hint: "TypeScript-first file uploads with built-in validation",
  },
  {
    value: "filepond" as const,
    label: "FilePond",
    hint: "Flexible file upload with image preview and drag & drop",
  },
  {
    value: "uppy" as const,
    label: "Uppy",
    hint: "Modular file uploader with resumable uploads and plugins",
  },
  {
    value: "none" as const,
    label: "None",
    hint: "Skip file upload integration",
  },
];

type FileUploadPromptContext = {
  fileUpload?: FileUpload;
  backend?: Backend;
};

export function resolveFileUploadPrompt(
  context: FileUploadPromptContext = {},
): PromptSingleResolution<FileUpload> {
  if (context.backend === "none" || context.backend === "convex") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  return context.fileUpload !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options: FILE_UPLOAD_PROMPT_OPTIONS,
        autoValue: context.fileUpload,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options: FILE_UPLOAD_PROMPT_OPTIONS,
        initialValue: "none",
      };
}

export async function getFileUploadChoice(fileUpload?: FileUpload, backend?: Backend) {
  const resolution = resolveFileUploadPrompt({ fileUpload, backend });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<FileUpload>({
    message: "Select file upload solution",
    options: resolution.options,
    initialValue: resolution.initialValue as FileUpload,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
