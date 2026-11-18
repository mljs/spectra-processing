import { xGetSortOrder } from '../x/index.ts';
import { RADIX_ORDER_MIN_LENGTH } from '../x/utils/radixSortOrder.ts';

type NumericKeys<T> = {
  [Key in keyof T]-?: T[Key] extends number ? Key : never;
}[keyof T];

/**
 * Sorts a copy of an array of xy objects by a numeric property.
 * @param points - points to sort.
 * @param key - numeric property used for sorting (defaults to x).
 * @returns a new array sorted in ascending order.
 */
export function xyObjectToSorted<T extends { x: number }>(
  points: readonly T[],
  key: NumericKeys<T> = 'x' as NumericKeys<T>,
): T[] {
  const { length } = points;

  if (length < RADIX_ORDER_MIN_LENGTH) {
    return points.toSorted((a, b) => (a[key] as number) - (b[key] as number));
  }

  const values = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    values[i] = points[i][key] as number;
  }

  const order = xGetSortOrder(values);
  const sorted = new Array<T>(length);
  for (let i = 0; i < length; i++) {
    sorted[i] = points[order[i]];
  }

  return sorted;
}
