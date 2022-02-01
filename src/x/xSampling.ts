/**
 * Sample within the array
 *
 * @param array - array from which to sample
 * @param options - options
 * @return - array with evenly spaced elements
 */
export function xSampling(
  array: number[],
  options: {
    /**
     * number of points to sample within the array
     * @default 10 */
    length?: number;
  } = {},
): number[] {
  const { length = 10 } = options;

  let returnArray = [];
  if (length > array.length) {
    throw new Error(
      'Choose sample number smaller than the number of elements in the array',
    );
  }

  let clonedArray = array.slice();
  returnArray.push(clonedArray[0]);
  clonedArray.shift();
  let delta = Math.floor(clonedArray.length / (length - 1));

  for (
    let i = delta - 1, j = 0;
    i < clonedArray.length && j < length - 1;
    i = i + delta, j++
  ) {
    returnArray.push(clonedArray[i]);
  }

  return returnArray;
}
