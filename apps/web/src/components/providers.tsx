import { lazy, Suspense } from "react";

import { ThemeProvider } from "@/lib/content/theme";

const Toaster = lazy(async () => {
  const mod = await import("@/components/ui/sonner");
  return { default: mod.Toaster };
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Suspense fallback={null}>
        <Toaster />
      </Suspense>
    </ThemeProvider>
  );
}
