/**
 * Returns true if x is monotone
 *
 * @param {Array<number>} array array of numbers
 * @returns {boolean} result
 */
export function xIsMonotone(
  array: number[] | Float64Array | Float32Array | Uint16Array,
): boolean {
  if (array.length <= 2) {
    return true;
  }
  if (array[0] === array[1]) {
    // maybe a constant series
    for (let i = 1; i < array.length - 1; i++) {
      if (array[i] !== array[i + 1]) return false;
    }
    return true;
  }

  if (array[0] < array[array.length - 1]) {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] >= array[i + 1]) return false;
    }
  } else {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] <= array[i + 1]) return false;
    }
  }
  return true;
}
