import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { LogHandlerWithDefault } from "rollup";

const customLogHandler: LogHandlerWithDefault = (level, log, defaultHandler) => {
  if (level === "warn") {
    defaultHandler("error", log);
  } else {
    defaultHandler(level, log);
  }
};

export default {
  input: "src/index.ts",
  output: [
    {
      file: "lib/cjs/index.js",
      format: "cjs"
    },
    {
      file: "lib/esm/index.js",
      format: "esm"
    }
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve({ preferBuiltins: false }),
    commonjs(),
    typescript({
      rootDir: "src/",
      outputToFilesystem: false
    })
  ],
  onLog: customLogHandler
};
