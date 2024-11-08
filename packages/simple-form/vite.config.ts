import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      name: "simple-form",
      fileName: "index"
    },
    outDir: "lib"
  },
  plugins: [react()],
  resolve: {
    alias: {
      "src/": `${path.resolve(__dirname, "src")}/`
    }
  }
});
