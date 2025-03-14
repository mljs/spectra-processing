import type { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';
import type { XGetFromToIndexOptions } from './xGetFromToIndex';
import { xGetFromToIndex } from './xGetFromToIndex';

export function xAbsoluteSum(
  array: NumberArray,
  options: XGetFromToIndexOptions = {},
): number {
  xCheck(array);
  const { fromIndex, toIndex } = xGetFromToIndex(array, options);

  let sum = 0;
  for (let i = fromIndex; i <= toIndex; i++) {
    sum += Math.abs(array[i]);
  }

  return sum;
}
