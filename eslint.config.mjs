import cheminfo from 'eslint-config-cheminfo-typescript';
import globals from 'globals';

export default [
  ...cheminfo,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "jsdoc/require-jsdoc": "off", // this would add automatically an empty bloc of JsDoc
      "jsdoc/no-defaults": "off", // this would remove our default values https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-defaults.md#readme
      "no-loss-of-precision": "off",
      '@typescript-eslint/prefer-for-of': 'off',
      "unicorn/import-style": [
        "error",
        {
          "styles": {
            "node:path": false
          }
        }
      ]
    }
  }
]

