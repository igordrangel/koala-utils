module.exports = {
  extends: ["@rocketseat/eslint-config/node"],
  ignorePatterns: ["*.json"],
  globals: {
    NodeJS: true,
  },
  rules: {
    "no-useless-constructor": "off",
    "no-useless-escape": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
  },
  overrides: [
    {
      files: ["**/*.spec.ts"],
      env: {
        jest: true,
      },
    },
  ],
};
