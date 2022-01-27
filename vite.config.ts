// vite.config.ts
import { defineConfig } from "vite";

import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@classes": path.resolve(__dirname, "./src/classes"),
      "@scenes": path.resolve(__dirname, "./src/scenes"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
