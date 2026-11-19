import { xGetSortOrder } from '../x/index.ts';
import { RADIX_ORDER_MIN_LENGTH } from '../x/utils/radixSortOrder.ts';

type NumericKeys<T> = keyof {
  [Key in keyof T as T[Key] extends number ? Key : never]: T[Key];
};

/**
 * Sorts a copy of an array of xy objects by a numeric property in ascending order.
 * @param input - dense array of points to sort; sparse arrays are not supported.
 * @param key - numeric property used for sorting (defaults to x).
 * @returns a new array sorted in ascending order, with NaNs last and ties in input order.
 */
export function xyObjectToSorted<T>(
  input: readonly T[],
  key: NumericKeys<T>,
): T[];
export function xyObjectToSorted<T extends { x: number }>(
  input: readonly T[],
  key?: NumericKeys<T>,
): T[];
export function xyObjectToSorted<T extends Record<PropertyKey, number>>(
  input: readonly T[],
  key: PropertyKey = 'x',
): T[] {
  const { length } = input;

  const hasNaN = input.some((point) => Number.isNaN(point[key]));

  // The radix sort orders NaNs by their bit patterns rather than as equal, the convention being that they are last.
  if (hasNaN || length < RADIX_ORDER_MIN_LENGTH) {
    return input.toSorted((a, b) => {
      const left = a[key];
      const right = b[key];
      if (left === right) return 0;
      if (Number.isNaN(left)) return Number.isNaN(right) ? 0 : 1;
      if (Number.isNaN(right)) return -1;
      return left - right;
    });
  }

  const values = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    const value = input[i][key];
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
