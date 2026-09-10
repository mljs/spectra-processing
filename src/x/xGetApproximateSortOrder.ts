import type { NumberArray } from 'cheminfo-types';

import { radixSortOrderApproximate } from './utils/radixSortOrder.ts';

export interface XGetApproximateSortOrderOptions {
  /**
   * Order the values from the largest to the smallest.
   * @default false
   */
  descending?: boolean;
}

/**
 * Returns the indices that approximately order the values, without moving them.
 * Only the high word of each double is used as the sort key, which halves the work of
 * `xGetSortOrder` but orders to 20 bits of relative precision instead of exactly: two values
 * closer than 2^-20 relative share a key and keep their input order. Reading the result back as
 * values therefore does not give a monotonic sequence — on random data about one adjacent pair
 * in fourteen is transposed, by at most 2^-20 relative.
 * Never feed this order to anything that assumes sorted values, a binary search in particular;
 * use `xGetSortOrder` there. It is meant for ranking by magnitude, such as taking the n most
 * intense points of a spectrum, where that resolution is far below the noise.
 * The sort is stable, so equal values keep their input order.
 * @param array - values to order.
 * @param options - options.
 * @returns the indices of the values, in approximate order.
 */
export function xGetApproximateSortOrder(
  array: NumberArray,
  options: XGetApproximateSortOrderOptions = {},
): Uint32Array {
  const { descending = false } = options;

  return radixSortOrderApproximate(array, descending);
}
