import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    format: 'cjs',
    file: 'lib/index.js',
    exports: 'named',
  },
  plugins: [
    resolve(),
    commonJS({
      include: 'node_modules/**',
    }),
  ],
};
