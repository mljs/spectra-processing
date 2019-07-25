/**
 * This function performs a circular shift to a new array
 * Positive values of shifts will shift to the right and negative values will do to the left
 * @example rotate([1,2,3,4],1) -> [4,1,2,3]
 * @example rotate([1,2,3,4],-1) -> [2,3,4,1]
 * @param {Array} array - the array that will be rotated
 * @param {number} shift
 * @return {Array}
 */
export function arrayRotate(array, shift) {
  shift = shift % array.length;
  if (shift < 0) shift += array.length;
  return array.slice(array.length - shift).concat(array.slice(0, array.length - shift));
}

