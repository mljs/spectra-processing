import { DataXY } from 'cheminfo-types';

import { xGetFromToIndex, XGetFromToIndexOptions } from '../x/xGetFromToIndex';

import { xyCheck } from '.';

/**
 * Computes the weighted mean value of an array of values.
 * @param data - array of DataXY
 * @param options - options
 */
export function xyMassCenter(
  data: DataXY,
  options: XGetFromToIndexOptions = {},
): number {
  xyCheck(data, { minLength: 1 });
  const { x, y } = data;
  const { fromIndex, toIndex } = xGetFromToIndex(x, options);

  let sumYs = 0;
  let sumProducts = 0;
  for (let i = fromIndex; i <= toIndex; i++) {
    sumProducts += x[i] * y[i];
    sumYs += y[i];
  }
  if (sumYs === 0) {
    throw new Error('Sum of Ys can not be zero.');
  }
  return sumProducts / sumYs;
}
