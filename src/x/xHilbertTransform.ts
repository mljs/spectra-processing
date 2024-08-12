import { NumberArray } from 'cheminfo-types';
import FFT from 'fft.js';

import { nextPowerOfTwo, isPowerOfTwo } from '../utils';

import { xCheck } from './xCheck';

export interface XHilbertTransformOptions {
  forceFFT?: boolean;
}

/**
 * Performs the Hilbert transform
 * @link https://en.wikipedia.org/wiki/Hilbert_transform
 * @param array - Array containing values
 * @param options
 * @returns A new vector with 90 degree shift regarding the phase of the original function
 */

export function xHilbertTransform(
  array: NumberArray,
  options: XHilbertTransformOptions = {},
): Float64Array {
  xCheck(array);
  const { forceFFT = false } = options;
  const length = array.length;
  if (isPowerOfTwo(length)) {
    return hilbertTransformWithFFT(array);
  } else if (forceFFT) {
    return resampling(
      hilbertTransformWithFFT(resampling(array, nextPowerOfTwo(length))),
      length,
    );
  } else {
    return hilbertTransform(array);
  }
}

/**
 * Performs the discrete Hilbert transform using fast Fourier transform
 * @param array - Array containing values
 * @returns A new vector with 90 degree shift regarding the phase of the original function
 * @see DOI: 10.1109/TAU.1970.1162139 "Discrete Hilbert transform"
 */
function hilbertTransformWithFFT(array: NumberArray): Float64Array {
  const length = array.length;
  const fft = new FFT(length);
  const complexSignal = new Float64Array(length * 2);
  for (let i = 0; i < length; i++) {
    complexSignal[i * 2] = array[i];
  }
  const fftResult = new Float64Array(length * 2);
  fft.transform(fftResult, complexSignal);
  const multiplier = new Float64Array(length);
  for (let i = 1; i < length; i++) {
    multiplier[i] = Math.sign(length / 2 - i);
  }
  for (let i = 0; i < length; i++) {
    fftResult[i * 2] *= multiplier[i];
    fftResult[i * 2 + 1] *= multiplier[i];
  }
  const hilbertSignal = new Float64Array(length * 2);
  fft.inverseTransform(hilbertSignal, fftResult);
  const result = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    result[i] = hilbertSignal[i * 2 + 1];
  }
  return result;
}

/**
 * Performs the discrete Hilbert transform
 * @param array - Array containing values
 * @param options
 * @param options.inClockwise
 * @returns A new vector with 90 degree shift regarding the phase of the original function
 */
function hilbertTransform(
  array: NumberArray,
  options: { inClockwise?: boolean } = {},
): Float64Array {
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

/**
 * Performs resampling of an input array to the desired length employing linear interpolation.
 * @param array - Array containing values.
 * @param length - The length of the resulting array.
 * @returns It returns a new array of the desired length.
 * @link https://en.wikipedia.org/wiki/Sample-rate_conversion
 */
function resampling(array: NumberArray, length: number): Float64Array {
  xCheck(array);
  const oldLength = array.length;
  const ratio = (oldLength - 1) / (length - 1);
  const result = new Float64Array(length);

  let currentIndex = 0;
  let floor = Math.floor(currentIndex);
  let ceil = Math.min(Math.ceil(currentIndex), oldLength - 1);
  let diff = currentIndex - floor;

  for (let i = 0; i < length; i++) {
    result[i] = array[floor] * (1 - diff) + array[ceil] * diff;
    currentIndex += ratio;
    floor = Math.floor(currentIndex);
    ceil = Math.min(Math.ceil(currentIndex), oldLength - 1);
    diff = currentIndex - floor;
  }

  return result;
}
