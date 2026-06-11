import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/lib/theme";

// Convex is intentionally NOT wired up here: no routed page consumes it today,
// and the client SDK is too heavy for the app entry chunk. If an analytics
// page is (re)added, wrap that route in its own lazily-loaded ConvexProvider.
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
