import { AST_NODE_TYPES, TSESLint } from "@typescript-eslint/utils";
import { createRule, hasValue } from "src/utils/index.js";
import { TSESTree } from "@typescript-eslint/utils";

export type Messages = "spread";
export type Options = [];

const compareLineColumn = (a: TSESTree.BaseNode["loc"]["end"], b: TSESTree.BaseNode["loc"]["end"]) => (a.line === b.line ? a.column - b.column : a.line - b.line);

const invalidLoc = (definition: TSESTree.BaseNode["loc"], usage: TSESTree.BaseNode["loc"]) => {
  const isUsageBeforeDef = compareLineColumn(usage.end, definition.start) < 0;
  const compareStart = compareLineColumn(definition.start, usage.start);
  const compareEnd = compareLineColumn(definition.end, usage.end);
  if (isUsageBeforeDef) return false;
  return !(compareStart <= 0 && compareEnd >= 0);
};

export const noPartialSpreadRule = createRule<Options, Messages>({
  name: "no-partial-spread",
  meta: {
    type: "suggestion",
    docs: {
      description: "When a variable is spread, all used elements from it must be included in the spread."
    },
    schema: [],
    messages: { spread: "Spread all props (or none of them)." }
  },
  defaultOptions: [],
  create: context => {
    return {
      VariableDeclaration: node => {
        node.declarations.forEach(d => {
          if (d.id.type === AST_NODE_TYPES.ObjectPattern) {
            if (hasValue(d.init) && d.init.type === AST_NODE_TYPES.Identifier) {
              const variableName = d.init.name;
              const variable = context.sourceCode.getScope(node).variables.find(x => x.name === variableName);
              if (hasValue(variable)) {
                const invalidRefs = variable.references.filter(r => invalidLoc(node.loc, r.identifier.loc));
                invalidRefs.forEach(r => context.report({ loc: r.identifier.loc, messageId: "spread" }));
              }
            }
          }
        });
      }
    };
  }
});
