import { createRule } from "src/utils/index.js";

export type Messages = "preferType";
export type Options = [];

export const preferTypeRule = createRule<Options, Messages>({
  name: "prefer-type",
  meta: {
    type: "problem",
    docs: {
      description: "Prefers type over interface."
    },
    schema: [],
    fixable: "code",
    messages: { preferType: "Use type instead of interface." }
  },
  defaultOptions: [],
  create: context => {
    return {
      TSInterfaceDeclaration: node => {
        context.report({
          node,
          messageId: "preferType"
        });
      }
    };
  }
});
