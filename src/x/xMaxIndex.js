import xCheck from './xCheck';
/**
 * Computes the index of the maximum of the given values
 * @param {Array<number>} input
 * @return {number}
 */
export function xMaxIndex(input) {
  xCheck(input);

  let maxIndex = 0;

  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[maxIndex]) {
      maxIndex = i;
    }
  }
  return maxIndex;
}
