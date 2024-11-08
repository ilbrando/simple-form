import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      name: "simple-form",
      fileName: "index"
    },
    outDir: "lib",
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies || {})
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "src/": `${path.resolve(__dirname, "src")}/`
    }
  }
});
