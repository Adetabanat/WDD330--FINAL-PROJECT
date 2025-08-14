import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "/WDD330--FINAL-PROJECT/", 
  root: "./src", // still serve files from src during dev
  build: {
    outDir: "../dist", // output folder (at project root)
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
