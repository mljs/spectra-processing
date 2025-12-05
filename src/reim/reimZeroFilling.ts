import type { DoubleArray } from 'cheminfo-types';

import type { DataReIm } from '../types/index.ts';
import type { DoubleArrayConstructor } from '../utils/createArray.ts';
import { createDoubleArray } from '../utils/createArray.ts';

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
): DataReIm<ArrayType> {
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

  const newRE = createDoubleArray(
    re.constructor as DoubleArrayConstructor,
    totalLength,
  );
  const newIM = createDoubleArray(
    im.constructor as DoubleArrayConstructor,
    totalLength,
  );

  for (let i = 0; i < re.length; i++) {
    newRE[i] = re[i];
    newIM[i] = im[i];
  }

  return {
    re: newRE as ArrayType,
    im: newIM as ArrayType,
  };
}
