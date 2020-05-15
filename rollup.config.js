export default {
  input: 'src/index.js',
  output: {
    format: 'cjs',
    file: 'lib/index.js',
    exports: 'named',
  },
  external: ['is-any-array', 'compute-erfcinv', 'distributions-rayleigh-pdf', 'spline-interpolator', 'distributions-normal-random'],
};
