import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';
import { xGetFromToIndex, XGetFromToIndexOptions } from './xGetFromToIndex';

/**
 * Computes the weighted mean value of an array of values.
 * @deprecated please use xyMassCenter
 * @param array - array of numbers
 * @param weights - array of weights
 * @param options - options
 */
export function xMeanWeighted(
  array: NumberArray,
  weights: NumberArray,
  options: XGetFromToIndexOptions = {},
): number {
  xCheck(array, { minLength: 1 });
  xCheck(weights);
  if (array.length !== weights.length) {
    throw new Error('array and weights must have the same length');
  }
  const { fromIndex, toIndex } = xGetFromToIndex(array, options);

  // normalize weights
  let sumWeights = 0;

  let sumValue = array[fromIndex] * weights[fromIndex];
  sumWeights += weights[fromIndex];
  for (let i = fromIndex + 1; i <= toIndex; i++) {
    sumValue += array[i] * weights[i];
    sumWeights += weights[i];
  }

  if (sumWeights === 0) {
    // We throw because the case is not well defined
    throw new Error('sum of weights must be > 0');
  }

  return sumValue / sumWeights;
}
