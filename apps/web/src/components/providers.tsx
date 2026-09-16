import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/lib/content/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
