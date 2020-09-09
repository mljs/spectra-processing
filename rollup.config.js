export default {
  input: 'src/index.js',
  output: {
    format: 'cjs',
    file: 'lib/index.js',
    exports: 'named',
  },
  external: [
    'is-any-array',
    'spline-interpolator',
    'distributions-normal-random',
    'fft.js',
  ],
};
