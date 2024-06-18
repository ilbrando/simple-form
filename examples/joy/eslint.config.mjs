import globals from "globals";
import ilbrandoPlugin from "@ilbrando/eslint-plugin";

export default [
  {
    ...ilbrandoPlugin.configs.recommended,
    languageOptions: {
      ...ilbrandoPlugin.configs.recommended.languageOptions,
      globals: {
        ...ilbrandoPlugin.configs.recommended.languageOptions.globals,
        ...globals.browser
      }
    },
    files: ["src/**/*.ts", "src/**/*.tsx"]
  },
  {
    ignores: ["**/*.js"]
  }
];
