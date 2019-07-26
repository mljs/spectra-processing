import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    format: 'cjs',
    file: 'lib/index.js',
  },
  plugins: [
    commonjs(), // prise en charge de require
    resolve(), // prise en charge des modules depuis node_modules
    babel(), // transpilation
  ],
};
