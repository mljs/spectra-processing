import { DoubleArray } from 'cheminfo-types';

/**
 * Calculating the box plot of the array
 *
 * @param array - data
 */
export function xBoxPlot(array: DoubleArray) {
  array = Float64Array.from(array).sort();
  if (array.length < 5) {
    throw Error(
      'xBoxPlot: can not calculate info if array contains less than 3 elements',
    );
  }
  let info = {
    q1: 0.0,
    median: 0.0,
    q3: 0.0,
    min: array[0],
    max: array[array.length - 1],
  };
  let q1max, q3min;
  if (array.length % 2 === 1) {
    // odd
    let middle = (array.length - 1) / 2;
    info.median = array[middle];
    q1max = middle - 1;
    q3min = middle + 1;
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
    let middleOver = (array.length + q3min) / 2;
    info.q3 = (array[middleOver] + array[middleOver - 1]) / 2;
  }
  return info;
}
