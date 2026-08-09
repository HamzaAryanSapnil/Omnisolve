import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [{
  ignores: ["components/ui/**/*"],
}, ...nextCoreWebVitals, ...nextTypescript, ...compat.extends("standard"), ...compat.extends("prettier"), {
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index",
          "object",
        ],

        "newlines-between": "always",

        pathGroups: [
          {
            pattern: "@app/**",
            group: "external",
            position: "after",
          },
        ],

        pathGroupsExcludedImportTypes: ["builtin"],

        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "comma-dangle": "off",
  },
}, {
  files: ["**/*.ts", "**/*.tsx"],

  rules: {
    "no-undef": "off",
  },
}];

export default config;
