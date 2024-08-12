import { NumberArray } from 'cheminfo-types';

/**
 * Calculates the mode of an array
 * @param input - Array containing values
 * @returns - mode
 */
export function xMode(input: NumberArray): number {
  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  let maxValue = 0;
  let maxCount = 0;
  let count = 0;
  const counts: Record<number, number> = {};

  for (let i = 0; i < input.length; ++i) {
    const element = input[i];
    count = counts[element];
    if (count) {
      counts[element]++;
      count++;
    } else {
      counts[element] = 1;
      count = 1;
    }

    if (count > maxCount) {
      maxCount = count;
      maxValue = input[i];
    }
  }

  return maxValue;
}
