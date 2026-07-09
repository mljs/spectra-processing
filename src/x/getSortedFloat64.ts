import type { NumberArray } from 'cheminfo-types';

// Internal helper: not re-exported from `x/index.ts`, so it stays out of the public API.

/**
 * Copy the data into an ascending-sorted `Float64Array`.
 * The library does not accept NaN: it corrupts ranks, quartiles and moments, so a NaN
 * in the input throws. Sorting groups every NaN at the end, so a single look at the
 * last element detects them.
 * @param array - data.
 * @returns ascending-sorted values.
 */
export function getSortedFloat64(array: NumberArray): Float64Array {
  const sorted = Float64Array.from(array);
  sorted.sort();

  // NaN sorts to the end, so the last element tells us whether any NaN is present.
  if (Number.isNaN(sorted.at(-1))) {
    throw new Error('input must not contain NaN values');
  }

  return sorted;
}
