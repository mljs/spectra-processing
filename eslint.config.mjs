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
      "jsdoc/lines-before-block": "off",
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

