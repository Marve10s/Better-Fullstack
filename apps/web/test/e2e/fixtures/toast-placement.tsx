import { useState } from "react";
import { createRoot } from "react-dom/client";
import { toast, type ToasterProps } from "sonner";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/lib/content/theme";

const positions = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const;
function Fixture() {
  const [position, setPosition] = useState<ToasterProps["position"]>("bottom-right");
  return (
    <ThemeProvider>
      {positions.map((value) => (
        <button key={value} onClick={() => setPosition(value)}>
          {value}
        </button>
      ))}
      <button
        onClick={() => {
          for (let index = 0; index < 3; index++) toast(`Message ${index}`, { duration: Infinity });
        }}
      >
        Create notifications
      </button>
      <Toaster position={position} />
    </ThemeProvider>
  );
}
const root = document.getElementById("root");
if (root) createRoot(root).render(<Fixture />);
