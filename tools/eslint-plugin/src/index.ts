import { rules } from "./rules/index.js";
import { parse, parseForESLint } from "@typescript-eslint/parser";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import eslintJs from "@eslint/js";
import eslintPrettierConfig from "eslint-config-prettier";

// note - cannot migrate this to an import statement because it will make TSC copy the package.json to the dist folder
const { name, version } = require("../package.json") as {
  name: string;
  version: string;
};

const plugin = {
  meta: {
    name,
    version
  },
  rules,
  configs: {}
} satisfies FlatConfig.Plugin;

/*
 extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  plugins: ["@typescript-eslint", "prettier"],
 
*/
const configs = {
  recommended: {
    languageOptions: {
      parser: { parse, parseForESLint },
      globals: {
        console: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      "@ilbrando": plugin
    },
    rules: {
      ...eslintJs.configs.recommended.rules,
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...eslintPrettierConfig.rules,

      "default-case-last": "warn",
      "default-case": "off",
      "no-case-declarations": "off",
      "no-console": "warn",
      "no-else-return": "warn",
      "no-template-curly-in-string": "warn",
      "sort-imports": [
        "warn",
        {
          ignoreDeclarationSort: true,
          ignoreCase: true
        }
      ],

      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "error",

      "no-duplicate-imports": "warn",

      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        process.env.NODE_ENV === "production" ? "error" : "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ],

      "@ilbrando/export-order": process.env.NODE_ENV === "production" ? "error" : "warn",
      "@ilbrando/import-order": process.env.NODE_ENV === "production" ? "error" : "warn",
      "@ilbrando/import-path": ["error", { alias: "src", rootPath: "src" }],
      "@ilbrando/jsx-string-attribute": "error",
      "@ilbrando/prefer-type": "error",
      "@ilbrando/no-partial-spread": "error"
    }
  }
} satisfies FlatConfig.Plugin["configs"];

Object.assign(plugin.configs, configs);

export default plugin;
