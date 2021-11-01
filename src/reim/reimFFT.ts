import FFT from 'fft.js';

import { ArrayType, DataReIm } from '..';
import { xRotate } from '../x/xRotate';

/**
 * @param {DataReIm } data Reim
 * @param {object} options Options
 * @param {boolean} options.inverse -
 * @param {boolean} options.applyZeroShift -
 * @returns {DataReIm } Reim
 */
export function reimFFT(
  data: DataReIm,
  options: {
    inverse?: boolean;
    applyZeroShift?: boolean;
  } = {},
): DataReIm {
  const { inverse = false, applyZeroShift = false } = options;

  let { re, im } = data;
  const size = re.length;
  const csize = size << 1;

  let complexArray: ArrayType = new Float64Array(csize);
  for (let i = 0; i < csize; i += 2) {
    complexArray[i] = re[i >>> 1];
    complexArray[i + 1] = im[i >>> 1];
  }

  let fft = new FFT(size);
  let output: ArrayType = new Float64Array(csize);
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

const zeroShift = (data: ArrayType, inverse?: boolean): ArrayType => {
  let middle = inverse
    ? Math.ceil(data.length / 2)
    : Math.floor(data.length / 2);
  return xRotate(data, middle);
};
