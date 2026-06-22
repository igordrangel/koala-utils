import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

const prettierBase = {
  printWidth: 80,
  tabWidth: 2,
  trailingComma: "all" as const,
  arrowParens: "always" as const,
  endOfLine: "lf" as const,
};

export default [
  {
    ignores: ["**/*.json", "node_modules", "dist", "coverage", "**/*.yaml"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ["src/**/*.ts"],
    ignores: ["src/light/**"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": [
        "warn",
        {
          ...prettierBase,
          singleQuote: false,
          semi: true,
        },
      ],
      "no-unused-vars": "off",
      "no-useless-constructor": "off",
      "no-useless-escape": "off",
      "no-use-before-define": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-inferrable-types": "off",
    },
  },
  {
    files: ["src/light/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": [
        "warn",
        {
          ...prettierBase,
          singleQuote: true,
          semi: false,
        },
      ],
      "no-unused-vars": "off",
      "no-useless-constructor": "off",
      "no-useless-escape": "off",
      "no-use-before-define": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-inferrable-types": "off",
    },
  },
  {
    files: ["**/*.spec.ts"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    files: ["eslint.config.mts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": [
        "warn",
        {
          ...prettierBase,
          singleQuote: false,
          semi: true,
        },
      ],
    },
  },
];
