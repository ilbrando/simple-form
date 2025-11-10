import { createRule, hasValue } from "src/utils/index.js";

export type Messages = "invalidLiteralExpression";
export type Options = [];

export const jsxStringAttributeRule = createRule<Options, Messages>({
  name: "jsx-string-attribute",
  meta: {
    type: "problem",
    docs: {
      description: "Don't wrap JSX string value attributes in curly brackets."
    },
    schema: [],
    fixable: "code",
    messages: { invalidLiteralExpression: "Don't embed constant string in JSX expression." }
  },
  defaultOptions: [],
  create: context => {
    return {
      JSXOpeningElement: node => {
        node.attributes.forEach(attr => {
          if (attr.type === "JSXAttribute") {
            const valueNode = attr.value;
            if (hasValue(valueNode) && valueNode.type === "JSXExpressionContainer") {
              if (valueNode.expression.type === "Literal") {
                const literalValue = valueNode.expression.value;
                if (typeof literalValue === "string") {
                  context.report({
                    node: valueNode,
                    messageId: "invalidLiteralExpression",
                    fix: fixer => fixer.replaceTextRange(valueNode.range, '"' + literalValue + '"')
                  });
                }
              }
            }
          }
        });
      }
    };
  }
});
