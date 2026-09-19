import { createRoot } from "react-dom/client";

import { App } from "@/app";
import "@/styles.css";

// Follow the system scheme; the web app uses the same `.dark` class convention.
const scheme = window.matchMedia("(prefers-color-scheme: dark)");
const applyScheme = () => document.documentElement.classList.toggle("dark", scheme.matches);
applyScheme();
scheme.addEventListener("change", applyScheme);

const root = document.getElementById("app");
if (!root) throw new Error("Missing #app mount point");
createRoot(root).render(<App />);
