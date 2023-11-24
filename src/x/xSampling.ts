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

  const returnArray = [];
  if (length > array.length) {
    throw new Error(
      'Choose sample number smaller than the number of elements in the array',
    );
  }

  returnArray.push(array[0]);
  const delta = Math.floor((array.length - 1) / (length - 1));

  for (
    let i = delta, j = 0;
    i < array.length && j < length - 1;
    i = i + delta, j++
  ) {
    returnArray.push(array[i]);
  }

  return returnArray;
}
