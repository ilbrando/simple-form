import { TSESTree } from "@typescript-eslint/utils";
import { hasValue } from "src/utils/index.js";
import { createRule } from "src/utils/rule-creator.js";

export type Messages = "exportOrder";
export type Options = [];

type Export = {
  name: string;
  node: TSESTree.ExportAllDeclaration;
};

const compareExport = (item1: Export, item2: Export) => item1.name.localeCompare(item2.name);

const findFirstError = (exported: Export[], calculatedOrder: Export[]) => {
  if (calculatedOrder.length !== exported.length && exported.length > 0) return exported[0];

  for (let i = 0; i < exported.length; i++) {
    if (exported[i].name !== calculatedOrder[i].name) return exported[i];
  }
  return undefined;
};

export const exportOrderRule = createRule<Options, Messages>({
  name: "export-order",
  meta: {
    type: "suggestion",
    docs: {
      description: "Reorders `export * from 'foo'` statements.",
      recommended: "strict"
    },
    schema: [],
    fixable: "code",
    messages: { exportOrder: "Please order exports." }
  },
  defaultOptions: [],
  create: context => {
    let shouldRunRule = true;
    let exported: Export[] = [];
    return {
      ExportAllDeclaration: node => {
        if (node?.source?.type === "Literal" && typeof node.source.value === "string") {
          exported.push({ name: node.source.value, node });
        }
      },
      "*": (node: TSESTree.Node) => {
        if (node.type === "ExportAllDeclaration" || node.type === "Literal" || node.type === "Program") return;
        shouldRunRule = false;
      },
      "Program:exit": () => {
        if (!shouldRunRule) return;
        if (exported.length === 0) return;
        const calculatedOrder = [...exported].sort(compareExport);
        const firstError = findFirstError(exported, calculatedOrder);
        if (hasValue(firstError)) {
          context.report({
            node: firstError.node,
            messageId: "exportOrder",
            fix: fixer => {
              const sourceCode = context.sourceCode.getText();
              const codeStart = exported[0].node.range[0];
              const codeEnd = exported[exported.length - 1].node.range[1];
              let newCode = "";
              if (calculatedOrder.length > 0) {
                let prevExport = calculatedOrder[0];
                for (let i = 0; i < calculatedOrder.length; i++) {
                  const curExport = calculatedOrder[i];
                  const node = calculatedOrder[i].node;
                  newCode += sourceCode.substring(node.range[0], node.range[1]);
                  if (i < calculatedOrder.length - 1) newCode += "\n";
                  prevExport = curExport;
                }
              }
              return fixer.replaceTextRange([codeStart, codeEnd], newCode);
            }
          });
        }
      }
    };
  }
});
