import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';
import { XGetFromToIndexOptions, xGetFromToIndex } from './xGetFromToIndex';

export function xAbsoluteSum(
  array: NumberArray,
  options: XGetFromToIndexOptions = {},
): number {
  xCheck(array);
  const { fromIndex, toIndex } = xGetFromToIndex(array, options);

  let sum = 0;
  for (let i = fromIndex; i <= toIndex; i++) {
    if (array[i] < 0) {
      sum -= array[i];
    } else {
      sum += array[i];
    }
  }

  return sum;
}
