import { ESLintUtils } from "@typescript-eslint/utils";

export const createRule = ESLintUtils.RuleCreator(name => `https://github.com/ilbrando/simple-form/wiki/rules/${name}`);
