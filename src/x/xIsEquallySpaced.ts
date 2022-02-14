import { DoubleArray } from 'cheminfo-types';

/**
 * Check if the values are separated always by the same difference
 *
 * @param array - Monotone growing array of number
 */
export function xIsEquallySpaced(
  array: DoubleArray,
  options: {
    /**
     * The tolerance define what is the allowed difference in percent
     * @default: 0.05
     */
    tolerance?: number;
  } = {},
) {
  if (array.length < 3) return true;
  const { tolerance = 0.05 } = options;
  let maxDx = 0;
  let minDx = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < array.length - 1; ++i) {
    let absoluteDifference = array[i + 1] - array[i];
    if (absoluteDifference < minDx) {
      minDx = absoluteDifference;
    }
    if (absoluteDifference > maxDx) {
      maxDx = absoluteDifference;
    }
  }
  return (maxDx - minDx) / maxDx < tolerance;
}
