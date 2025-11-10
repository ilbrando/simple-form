import path from "path";
import fs from "fs";
import { JSONSchema } from "@typescript-eslint/utils";
import { createRule, hasValue } from "src/utils/index.js";

export type Messages = "importPath";

type Alias = {
  alias: string;
  rootPath: string;
};

export type Options = Alias[];

const schema: JSONSchema.JSONSchema4 = {
  type: "array",
  items: {
    type: "object",
    properties: {
      alias: { type: "string" },
      rootPath: { type: "string" }
    }
  }
};

const validateOptions = (options: Options | undefined) => {
  if (!hasValue(options)) return;
  for (const option of options) {
    if (!hasValue(option.alias)) throw new Error("Alias is missing alias value.");
    if (!hasValue(option.rootPath)) throw new Error("Alias is missing rootPath value.");
  }
};

const posixSep = "/";

const makePosixPath = (filePath: string) => filePath.replaceAll(path.sep, posixSep);

export const importPathRule = createRule<Options, Messages>({
  name: "import-path",
  meta: {
    type: "problem",
    docs: {
      description: "Prevents too broad imports which can result in circular references."
    },
    schema,
    messages: { importPath: "Imports from {{source}} are not allowed. Use a more specific path." }
  },
  defaultOptions: [],
  create: context => {
    validateOptions(context.options);
    const options = context.options ?? [];

    const resolvePath = (fileName: string, importPath: string) => {
      if (importPath.length === 0) return undefined;

      const fileDirectoryPath = fileName.substr(0, fileName.lastIndexOf(posixSep));

      if (importPath[0] === ".") {
        // Relative path using "." or ".."
        return makePosixPath(path.resolve(fileDirectoryPath, importPath));
      }

      // Is an alias used?
      const importNameParts = importPath.split(posixSep);
      const firstPart = importNameParts[0];
      const alias = options.find(x => x.alias === firstPart);
      if (hasValue(alias)) {
        // It's an alias
        const aliasPathMatch = new RegExp(`^(.*${posixSep}${alias.rootPath})${posixSep}.*$`).exec(fileDirectoryPath);
        if (!hasValue(aliasPathMatch)) return undefined;
        const aliasRootPath = aliasPathMatch[1];
        return makePosixPath(path.resolve(aliasRootPath, importPath.substr(firstPart.length + 1)));
      }

      // Must be a package
      return undefined;
    };

    return {
      ImportDeclaration: node => {
        const fileName = makePosixPath(context.filename);
        const importName = node.source.value;
        if (typeof importName !== "string") return;
        const resolvedPath = resolvePath(fileName, importName);
        if (!hasValue(resolvedPath)) return;
        if (!fs.existsSync(resolvedPath) || !fs.lstatSync(resolvedPath).isDirectory()) return;
        if (!fileName.startsWith(`${resolvedPath}${posixSep}`)) return;
        context.report({
          loc: node.source.loc,
          messageId: "importPath",
          data: {
            source: importName
          }
        });
      }
    };
  }
});
