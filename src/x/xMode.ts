import { NumberArray } from 'cheminfo-types';

/**
 * Calculates the mode of an array
 *
 * @param input - Array containing values
 * @returns - mode
 */

export function xMode(input: NumberArray) {
  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  let maxValue = 0;
  let maxCount = 0;
  let count = 0;
  let counts: { [element: number]: number } = {};

  for (let i = 0; i < input.length; ++i) {
    let element = input[i];
    count = counts[element];
    if (count) {
      counts[element]++;
      count++;
    } else {
      counts[element] = count = 1;
    }

    if (count > maxCount) {
      maxCount = count;
      maxValue = input[i];
    }
  }

  return maxValue;
}
