import { DoubleArray } from 'cheminfo-types';
import FFT from 'fft.js';

import { xCheck } from './xCheck';

/**
 * Performs the Hilbert transform
 * @returns A new vector with 90 degree shift regarding the phase of the original function
 */

export function xHilbertTransform(array: DoubleArray) {
  xCheck(array);
  if (Math.log2(array.length) % 1 === 0) {
    return hilbertTransformWithFFT(array);
  } else {
    return hilbertTransform(array);
  }
}

export function hilbertTransformWithFFT(array: DoubleArray) {
  const n = array.length;
  const fft = new FFT(n);
  const complexSignal = new Float64Array(n * 2);
  for (let i = 0; i < n; i++) {
    complexSignal[i * 2] = array[i];
  }
  const fftResult = new Float64Array(n * 2);
  fft.transform(fftResult, complexSignal);
  const multiplier = new Float64Array(n);
  for (let i = 1; i < n; i++) {
    multiplier[i] = Math.sign(n / 2 - i);
  }
  for (let i = 0; i < n; i++) {
    fftResult[i * 2] *= multiplier[i];
    fftResult[i * 2 + 1] *= multiplier[i];
  }
  const hilbertSignal = new Float64Array(n * 2);
  fft.inverseTransform(hilbertSignal, fftResult);
  const result = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    result[i] = hilbertSignal[i * 2 + 1];
  }
  return result;
}

export function hilbertTransform(
  array: DoubleArray,
  options: { inClockwise?: boolean } = {},
) {
  const { inClockwise = true } = options;
  const input = [0, ...array, 0];
  const result = new Float64Array(array.length);
  for (let k = 1; k < input.length - 1; k++) {
    let aSum = 0;
    for (let i = 0; i < k - 1; i++) {
      const log = Math.log((k - i) / (k - i - 1));
      aSum += input[i] * log + (input[i + 1] - input[i]) * (-1 + (k - i) * log);
    }
    const b = input[k - 1] - input[k + 1];
    let cSum = 0;
    for (let i = k + 1; i < input.length - 1; i++) {
      const log = Math.log((i - k) / (i - k + 1));
      cSum += input[i] * log + (input[i - 1] - input[i]) * (1 + (i - k) * log);
    }
    result[k - 1] = ((inClockwise ? 1 : -1) * (aSum + b + cSum)) / Math.PI;
  }
  return result;
}
