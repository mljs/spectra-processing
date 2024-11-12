import cheminfo from 'eslint-config-cheminfo-typescript';

export default [
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
];
