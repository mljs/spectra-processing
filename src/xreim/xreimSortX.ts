import { DoubleArray } from 'cheminfo-types';

import { DataXReIm } from '../types';

/**
 * Sort object of array, x has to be monotone.
 * @param data - object of kind {x:[], re:[], im:[]}
 * @returns - sorted array
 */
export function xreimSortX<ArrayType extends DoubleArray = DoubleArray>(
  data: DataXReIm<ArrayType>,
): DataXReIm<ArrayType> {
  const { x, re, im } = data;

  if (x.length !== re.length || x.length !== im.length) {
    throw new TypeError('length of x, re and im must be identical');
  }

  if (x.length < 2 || x[0] < x[1]) return data;

  return {
    x: x.slice(0).reverse() as ArrayType,
    re: re.slice(0).reverse() as ArrayType,
    im: im.slice(0).reverse() as ArrayType,
  };
}
