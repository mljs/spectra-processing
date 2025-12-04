import type { DoubleArray } from 'cheminfo-types';

import type { DataReIm } from '../types/index.ts';

/**
 * This function make a zero filling to re and im part.
 * @param data - object of kind {re:[], im:[]}
 * @param totalLength - final number of points
 * @returns - New DataReIm object with zero-filled,
 * truncated arrays if totalLength is smaller current length or
 * the same input if totalLength is equal that current length
 */
export function reimZeroFilling<ArrayType extends DoubleArray>(
  data: DataReIm<ArrayType>,
  totalLength: number,
): DataReIm<ArrayType | Float64Array<ArrayBuffer>> {
  if (!Number.isInteger(totalLength) || totalLength < 0) {
    throw new RangeError('totalLength must be a non-negative integer');
  }

  const { re, im } = data;
  const length = re.length;

  if (totalLength === 0 || length === totalLength) return data;

  if (length > totalLength) {
    return {
      re: re.slice(0, totalLength) as ArrayType,
      im: im.slice(0, totalLength) as ArrayType,
    };
  }

  const newRE = new Float64Array(totalLength);
  const newIM = new Float64Array(totalLength);

  newRE.set(re);
  newIM.set(im);

  return {
    re: newRE,
    im: newIM,
  };
}
