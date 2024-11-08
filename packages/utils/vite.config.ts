import { defineConfig } from "vite";
import path from "path";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "cjs"],
      name: "utils",
      fileName: "index"
    },
    outDir: "lib",
    rollupOptions: {
      external: Object.keys(pkg.peerDependencies || {})
    }
  },
  resolve: {
    alias: {
      "src/": `${path.resolve(__dirname, "src")}/`
    }
  }
});
