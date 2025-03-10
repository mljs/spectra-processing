import cheminfo from 'eslint-config-cheminfo-typescript';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...cheminfo,
  {
    languageOptions: {},
    rules: {
      'jsdoc/lines-before-block': 'off',
      'no-loss-of-precision': 'off',
      '@typescript-eslint/prefer-for-of': 'off',
      'unicorn/import-style': [
        'error',
        {
          styles: {
            'node:path': false,
          },
        },
      ],
    },
  },
]);
