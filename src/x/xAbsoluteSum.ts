import type { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck.ts';
import type { XGetFromToIndexOptions } from './xGetFromToIndex.ts';
import { xGetFromToIndex } from './xGetFromToIndex.ts';

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
