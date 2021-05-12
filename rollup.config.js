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
    'ml-array-standard-deviation',
    'ml-array-median',
    'ml-array-mean',
    'ml-array-max',
    'ml-array-min',
    'ml-gsd',
    'ml-matrix',
    'fft.js',
  ],
};
