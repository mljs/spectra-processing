/**
 * This function returns an array with absolute values
 * @param {Array<Number>} array - the array that will be rotated
 * @return {Number}
 */
export function xAbsolute(array) {
  let tmpArray = array.slice();
  for (let i = 0; i < tmpArray.length; i++) {
    tmpArray[i] = Math.abs(tmpArray[i]);
  }

  return tmpArray;
}
