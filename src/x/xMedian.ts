import { NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

/**
 * Calculates the median of an array.
 * @param input - Array containing values
 * @returns - median
 */
export function xMedian(input: NumberArray): number {
  if (!isAnyArray(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  const array = input.slice();

  let low = 0;
  let high = array.length - 1;
  let middle = 0;
  let currentLow = 0;
  let currentHigh = 0;
  const median = calcMiddle(low, high);

  while (true) {
    if (high <= low) {
      return array[median];
    }

    if (high === low + 1) {
      if (array[low] > array[high]) {
        swap(array, low, high);
      }
      return array[median];
    }

    // Find median of low, middle and high items; swap into position low
    middle = calcMiddle(low, high);
    if (array[middle] > array[high]) swap(array, middle, high);
    if (array[low] > array[high]) swap(array, low, high);
    if (array[middle] > array[low]) swap(array, middle, low);

    // Swap low item (now in position middle) into position (low+1)
    swap(array, middle, low + 1);

    // Nibble from each end towards middle, swapping items when stuck
    currentLow = low + 1;
    currentHigh = high;
    while (true) {
      do currentLow++;
      while (array[low] > array[currentLow]);
      do currentHigh--;
      while (array[currentHigh] > array[low]);

      if (currentHigh < currentLow) {
        break;
      }

      swap(array, currentLow, currentHigh);
    }

    // Swap middle item (in position low) back into correct position
    swap(array, low, currentHigh);

    // Re-set active partition
    if (currentHigh <= median) {
      low = currentLow;
    }
    if (currentHigh >= median) {
      high = currentHigh - 1;
    }
  }
}

function swap(array: NumberArray, i: number, j: number) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

function calcMiddle(i: number, j: number) {
  return Math.floor((i + j) / 2);
}
