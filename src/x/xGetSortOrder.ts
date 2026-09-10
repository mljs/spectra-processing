import type { NumberArray } from 'cheminfo-types';

import { radixSortOrderExact } from './utils/radixSortOrder.ts';

export interface XGetSortOrderOptions {
  /**
   * Order the values from the largest to the smallest.
   * @default false
   */
  descending?: boolean;
}

/**
 * Returns the indices that order the values, without moving them.
 * The sort is a radix sort over the full 64 bits of each double: it costs a fixed number of
 * linear passes instead of the n log n comparisons of `Array.prototype.sort`, and orders
 * exactly, NaN, infinities, subnormals and the two zeros included.
 * The sort is stable, so equal values keep their input order.
 * @param array - values to order.
 * @param options - options.
 * @returns the indices of the values, in order.
 */
export function xGetSortOrder(
  array: NumberArray,
  options: XGetSortOrderOptions = {},
): Uint32Array {
  const { descending = false } = options;

  return radixSortOrderExact(array, descending);
}
