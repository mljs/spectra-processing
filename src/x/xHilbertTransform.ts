import FFT from 'fft.js';

/**
 * Performs the Hilbert transform
 * @returns A new vector with 90 degree shift regarding the phase of the original function
 */

export function xHilbertTransform(x: number[]) {
  if (!Array.isArray(x)) {
    throw new Error('x must be a vector');
  }
  const n = x.length;
  const fft = new FFT(n);
  const v = [1, ...Array(n / 2 - 1).fill(2), 1, ...Array(n / 2 - 1).fill(0)];
  const X = new Float64Array(n * 2);
  fft.realTransform(X, x);
  for (let i = 0; i < n; i++) {
    X[i * 2] = X[i * 2] * v[i];
    X[i * 2 + 1] = X[i * 2 + 1] * v[i];
  }
  const y = new Float64Array(n * 2);
  fft.inverseTransform(y, X);
  const result: { re: Float64Array; im: Float64Array } = {
    re: new Float64Array(n),
    im: new Float64Array(n),
  };
  for (let i = 0; i < n; i++) {
    result.re[i] = y[i * 2];
    result.im[i] = y[i * 2 + 1];
  }
  return result;
}
