import xCheck from './xCheck';

/**
 * Computes the index of the minimum of the given values
 * @param {Array<number>} input
 * @return {number}
 */
export function xMinIndex(input) {
  xCheck(input);
  let minIndex = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[i] < input[minIndex]) {
      minIndex = i;
    }
  }
  return minIndex;
}
