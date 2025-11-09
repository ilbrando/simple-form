import { defineConfig } from "vite";
import path from "path";
import { builtinModules } from "module";

//const builtinModules = ["crypto", "events", "fs", "fs/promises", "module", "os", "path", "stream", "util", "url"];

const NODE_BUILT_IN_MODULES = builtinModules.filter(m => !m.startsWith("_"));
NODE_BUILT_IN_MODULES.push(...NODE_BUILT_IN_MODULES.map(m => `node:${m}`));
const noReload = process.env.VITE_NO_RELOAD !== undefined;

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index"
    },
    outDir: "lib",
    sourcemap: true,
    target: "es2022", // choose ES target appropriate for your node support
    rollupOptions: {
      // do not bundle peer deps or TS ESLint internals
      external: ["eslint", "@typescript-eslint/utils", "@typescript-eslint/parser", "@typescript-eslint/eslint-plugin", "eslint-config-prettier", "@eslint/js", ...builtinModules, ...builtinModules.map(m => `node:${m}`)],
      output: {
        // ensure named exports preserved
        exports: "named"
      }
    }
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
  },
  optimizeDeps: {
    exclude: NODE_BUILT_IN_MODULES
  },
  resolve: {
    alias: {
      "src/": `${path.resolve(__dirname, "src")}/`
    }
  }
});
