import { defineConfig, globalIgnores } from 'eslint/config';
import cheminfo from 'eslint-config-cheminfo-typescript';

export default defineConfig(
  globalIgnores(['.claude', 'coverage', 'lib']),
  cheminfo,
  {
    rules: {
      // The rule has no options, so it cannot be limited to arrays of objects. Over a
      // Float64Array `for … of` costs 4x on V8 and up to 20x on JavaScriptCore, which is
      // most of what this library iterates. eslint-config-cheminfo already turns off
      // unicorn/no-for-loop for the same reason; this one arrives through the
      // typescript-eslint stylistic set.
      '@typescript-eslint/prefer-for-of': 'off',
    },
  },
);
