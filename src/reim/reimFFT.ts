import FFT from 'fft.js';

import { Reim } from '..';
import { xRotate } from '../x/xRotate';

interface OptionsType {
  inverse?: boolean;
  applyZeroShift?: boolean;
}

/**
 * @param {Reim} data Reim
 * @param {OptionsType} options Options
 * @returns {Reim} Reim
 */
export function reimFFT(data: Reim, options: OptionsType = {}): Reim {
  const { inverse = false, applyZeroShift = false } = options;

  let { re, im } = data;
  const size = re.length;
  const csize = size << 1;

  let complexArray: number[] | Float64Array = new Float64Array(csize);
  for (let i = 0; i < csize; i += 2) {
    complexArray[i] = re[i >>> 1];
    complexArray[i + 1] = im[i >>> 1];
  }

  let fft = new FFT(size);
  let output: number[] | Float64Array = new Float64Array(csize);
  if (inverse) {
    if (applyZeroShift) complexArray = zeroShift(complexArray, true);
    fft.inverseTransform(output, complexArray);
  } else {
    fft.transform(output, complexArray);
    if (applyZeroShift) output = zeroShift(output);
  }

  let newRe = new Float64Array(size);
  let newIm = new Float64Array(size);
  for (let i = 0; i < csize; i += 2) {
    newRe[i >>> 1] = output[i];
    newIm[i >>> 1] = output[i + 1];
  }

  return { re: newRe, im: newIm };
}

const zeroShift = (
  data: number[] | Float64Array,
  inverse?: boolean,
): number[] | Float64Array => {
  let middle = inverse
    ? Math.ceil(data.length / 2)
    : Math.floor(data.length / 2);
  return xRotate(data, middle);
};
