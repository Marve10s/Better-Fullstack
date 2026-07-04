import type { Backend, FileStorage } from "../types";

import { exitCancelled } from "../utils/errors";
import { isCancel, navigableSelect } from "./navigable";

export async function getFileStorageChoice(fileStorage?: FileStorage, backend?: Backend) {
  if (fileStorage !== undefined) return fileStorage;

  // File storage requires a backend
  if (backend === "none" || backend === "convex") {
    return "none" as FileStorage;
  }

  const options = [
    {
      value: "s3" as const,
      label: "AWS S3",
      hint: "Amazon S3 object storage - scalable and reliable",
    },
    {
      value: "r2" as const,
      label: "Cloudflare R2",
      hint: "S3-compatible storage with zero egress fees",
    },
    {
      value: "cloudinary" as const,
      label: "Cloudinary",
      hint: "Image and media storage with transformations",
    },
    {
      value: "supabase-storage" as const,
      label: "Supabase Storage",
      hint: "S3-compatible object storage with signed URLs and RLS",
    },
    {
      value: "none" as const,
      label: "None",
      hint: "Skip file storage setup",
    },
  ];

  const response = await navigableSelect<FileStorage>({
    message: "Select file storage",
    options,
    initialValue: "none",
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
