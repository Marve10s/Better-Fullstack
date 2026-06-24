import { Box, Text, createCliRenderer } from "@opentui/core";

const renderer = await createCliRenderer({
  exitOnCtrlC: true,
});

renderer.root.add(
  Box(
    {
      borderStyle: "rounded",
      flexDirection: "column",
      gap: 1,
      padding: 1,
    },
    Text({
      content: "Better Fullstack + OpenTUI",
      fg: "#67D55E",
    }),
    Text({
      content: "Press Ctrl+C to exit.",
    }),
  ),
);
