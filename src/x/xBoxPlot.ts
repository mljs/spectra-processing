import { DoubleArray } from 'cheminfo-types';

/**
 * Calculating the box plot of the array
 *
 * @param array - data
 */
export function xBoxPlot(
  array: DoubleArray,
  options: {
    /**
     * By default there should be at least 5 elements
     * @default false
     */
    allowSmallArray?: boolean;
  } = {},
) {
  const { allowSmallArray = false } = options;
  array = Float64Array.from(array).sort();
  if (array.length < 5) {
    if (allowSmallArray) {
      if (array.length < 1) {
        throw new Error('xBoxPlot: can not calculate info if array is empty');
      }
    } else {
      throw new Error(
        'xBoxPlot: can not calculate info if array contains less than 5 elements',
      );
    }
  }

  const info = {
    q1: 0,
    median: 0,
    q3: 0,
    min: array[0],
    max: array[array.length - 1],
  };
  let q1max, q3min;
  if (array.length % 2 === 1) {
    // odd
    const middle = (array.length - 1) / 2;
    info.median = array[middle];
    q1max = Math.max(middle - 1, 0);
    q3min = Math.min(middle + 1, array.length - 1);
  } else {
    // even
    q3min = array.length / 2;
    q1max = q3min - 1;
    info.median = (array[q1max] + array[q3min]) / 2;
  }
  if (q1max % 2 === 0) {
    info.q1 = array[q1max / 2];
    info.q3 = array[(array.length + q3min - 1) / 2];
  } else {
    info.q1 = (array[(q1max + 1) / 2] + array[(q1max - 1) / 2]) / 2;
    const middleOver = (array.length + q3min) / 2;
    info.q3 = (array[middleOver] + array[middleOver - 1]) / 2;
  }
  return info;
}
