import { NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

/**
 * Calculates the median of an array
 *
 * @param input - Array containing values
 * @returns - median
 */

export function xMedian(input: NumberArray) {
  if (!isAnyArray(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  const array = input.slice();

  let low = 0;
  let high = array.length - 1;
  let middle, ll, hh;
  let median = calcMiddle(low, high);

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
    ll = low + 1;
    hh = high;
    while (true) {
      do ll++;
      while (array[low] > array[ll]);
      do hh--;
      while (array[hh] > array[low]);

      if (hh < ll) {
        break;
      }

      swap(array, ll, hh);
    }

    // Swap middle item (in position low) back into correct position
    swap(array, low, hh);

    // Re-set active partition
    if (hh <= median) {
      low = ll;
    }
    if (hh >= median) {
      high = hh - 1;
    }
  }
}

function swap(array: NumberArray, i: number, j: number) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

function calcMiddle(i: number, j: number) {
  return ~~((i + j) / 2);
}
