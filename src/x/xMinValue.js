import xCheck from './xCheck';

/**
 * Computes the index of the minimum of the given values
 * @param {Array<number>} input
 * @param {object} [options={}]
 * @param {number} [options.fromIndex=0] - First point for xyIntegration
 * @param {number} [options.toIndex=x.length-1] - Last point for xyIntegration
 * @return {number}
 */
export function xMinValue(input, options = {}) {
  xCheck(input);
  const { fromIndex = 0, toIndex = input.length - 1 } = options;
  let minValue = input[fromIndex];

  for (let i = fromIndex + 1; i <= toIndex; i++) {
    if (input[i] < minValue) {
      minValue = input[i];
    }
  }
  return minValue;
}
