import { defineConfig, globalIgnores } from 'eslint/config';
import cheminfo from 'eslint-config-cheminfo-typescript';

export default defineConfig(
  globalIgnores(['.claude', 'coverage', 'lib']),
  cheminfo,
);
