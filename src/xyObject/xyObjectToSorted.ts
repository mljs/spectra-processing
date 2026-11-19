import { xGetSortOrder } from '../x/index.ts';
import { RADIX_ORDER_MIN_LENGTH } from '../x/utils/radixSortOrder.ts';

type NumericKeys<T> = keyof {
  [Key in keyof T as T[Key] extends number ? Key : never]: T[Key];
};

/**
 * Sorts a copy of an array of xy objects by a numeric property in ascending order.
 * @param input - dense array of points to sort.
 * @param key - numeric property used for sorting (defaults to x).
 * @returns a new array sorted in ascending order, with NaNs last and ties in input order.
 * @throws {TypeError} If the points array has missing entries.
 */
export function xyObjectToSorted<T extends { x: number }>(
  input: readonly T[],
  key?: NumericKeys<T>,
): T[];
export function xyObjectToSorted<
  Key extends PropertyKey,
  T extends { x: number } & Record<Key, number>,
>(input: readonly T[], key?: Key): T[] {
  const { length } = input;
  const sortKey = key === undefined ? 'x' : key;

  const hasNaN = input.some((point) => Number.isNaN(point[sortKey]));

  // The radix sort orders NaNs by their bit patterns rather than as equal, the convention being that they are last.
  if (hasNaN || length < RADIX_ORDER_MIN_LENGTH) {
    return input.toSorted((a, b) => {
      const left = a[sortKey];
      const right = b[sortKey];
      if (left === right) return 0;
      if (Number.isNaN(left)) return Number.isNaN(right) ? 0 : 1;
      if (Number.isNaN(right)) return -1;
      return left - right;
    });
  }

  const values = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    const value = input[i][sortKey];
    // The radix sort distinguishes signed zeros; the object sort treats them as ties.
    values[i] = value === 0 ? 0 : value;
  }

  const order = xGetSortOrder(values);
  const sorted = new Array<T>(length);
  for (let i = 0; i < length; i++) {
    sorted[i] = input[order[i]];
  }

  return sorted;
}
