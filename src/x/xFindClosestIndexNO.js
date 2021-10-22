/**
 * Returns the closest index of a `target` in an `NOT NECESSARILY ORDERED` array
 * @param {Array<number>} array
 * @param {number} target
 * @returns {number} The closest index to the target in the array
 */

export function xFindClosestIndexNO(array, target) {
  let index = 0;
  let diff = Number.POSITIVE_INFINITY;
  for (let i = 0; i < array.length; i++) {
    const currentDiff = Math.abs(array[i] - target);
    if (currentDiff < diff) {
      diff = currentDiff;
      index = i;
    }
  }
  return index;
}
