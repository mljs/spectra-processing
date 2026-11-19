import { xGetSortOrder } from '../x/index.ts';
import { RADIX_ORDER_MIN_LENGTH } from '../x/utils/radixSortOrder.ts';

type NumericKeys<T> = keyof {
  [Key in keyof T as T[Key] extends number ? Key : never]: T[Key];
};

/**
 * Sorts a copy of an array of xy objects by a numeric property.
 * @param points - dense array of points to sort.
 * @param key - numeric property used for sorting (defaults to x).
 * @returns a new array sorted in ascending order, with NaNs last and ties in input order.
 * @throws {TypeError} If the points array has missing entries.
 */
export function xyObjectToSorted<T extends { x: number }>(
  points: readonly T[],
  key?: NumericKeys<T>,
): T[];
export function xyObjectToSorted<
  Key extends PropertyKey,
  T extends { x: number } & Record<Key, number>,
>(points: readonly T[], key?: Key): T[] {
  const { length } = points;
  const sortKey = key === undefined ? 'x' : key;

  const values =
    length < RADIX_ORDER_MIN_LENGTH ? undefined : new Float64Array(length);
  let hasNaN = false;
  for (let i = 0; i < length; i++) {
    const point = points[i];
    if (point === undefined) {
      throw new TypeError('points must be a dense array');
    }
    if (!values) continue;

    const value = point[sortKey];
    // The radix sort distinguishes signed zeros; the object sort treats them as ties.
    values[i] = value === 0 ? 0 : value;
    hasNaN ||= Number.isNaN(value);
  }

  // The radix sort orders NaNs by their bit patterns rather than as equal, last values.
  if (!values || hasNaN) {
    return points.toSorted((a, b) => {
      const left = a[sortKey];
      const right = b[sortKey];
      if (left === right) return 0;
      if (Number.isNaN(left)) return Number.isNaN(right) ? 0 : 1;
      if (Number.isNaN(right)) return -1;
      return left - right;
    });
  }

  const order = xGetSortOrder(values);
  const sorted = new Array<T>(length);
  for (let i = 0; i < length; i++) {
    sorted[i] = points[order[i]];
  }

  return sorted;
}
