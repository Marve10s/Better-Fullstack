import { Moon, Sun } from "lucide-react";
import * as React from "react";

import { useTheme } from "@/lib/theme";
import { m } from "@/paraglide/messages.js";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center text-muted-foreground"
        disabled
        aria-label={m.themeToggle()}
      >
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-8 w-8 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
      aria-label={resolvedTheme === "dark" ? m.themeSwitchToLight() : m.themeSwitchToDark()}
    >
      {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
