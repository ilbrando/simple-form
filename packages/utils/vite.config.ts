import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      name: "utils",
      fileName: "index"
    },
    outDir: "lib"
  },
  resolve: {
    alias: {
      "src/": `${path.resolve(__dirname, "src")}/`
    }
  }
});
