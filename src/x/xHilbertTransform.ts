import FFT from 'fft.js';
import { isAnyArray } from 'is-any-array';

/**
 * Performs the Hilbert transform
 * @returns A new vector with 90 degree shift regarding the phase of the original function
 */

export function xHilbertTransform(x: number[] | Float64Array) {
  if (Math.log2(x.length) % 1 === 0) {
    return hilbertTransformWithFFT(x);
  } else {
    return hilbertTransform(x);
  }
}

export function hilbertTransformWithFFT(x: number[] | Float64Array) {
  if (!isAnyArray(x)) {
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
  const result = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    result[i] = y[i * 2 + 1];
  }
  return result;
}

export function hilbertTransform(
  input: number[] | Float64Array,
  options: { inClockwise?: boolean } = {},
) {
  const { inClockwise = true } = options;
  const array = [0, ...input, 0];
  const result = new Float64Array(input.length);
  for (let k = 1; k < array.length - 1; k++) {
    let aSum = 0;
    for (let i = 0; i < k - 1; i++) {
      const log = Math.log((k - i) / (k - i - 1));
      aSum += array[i] * log + (array[i + 1] - array[i]) * (-1 + (k - i) * log);
    }
    const b = array[k - 1] - array[k + 1];
    let cSum = 0;
    for (let i = k + 1; i < array.length - 1; i++) {
      const log = Math.log((i - k) / (i - k + 1));
      cSum += array[i] * log + (array[i - 1] - array[i]) * (1 + (i - k) * log);
    }
    result[k - 1] = ((inClockwise ? 1 : -1) * (aSum + b + cSum)) / Math.PI;
  }
  return result;
}
