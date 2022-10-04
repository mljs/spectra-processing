/**
 * Performs the Hilbert transform
 * @returns A new vector with 90 degree shift regarding the phase of the original function
 */

export function hilbertTransform(
  input: number[],
  options: { inClockwise?: boolean } = {},
) {
  const { inClockwise = true } = options;
  const array = [0, ...input, 0];
  const result = new Float64Array(input.length);
  for (let k = 1; k < array.length - 1; k++) {
    let aSum = 0;
    for (let i = 0; i < k - 1; i++) {
      const log = Math.log((k - i) / (k - i - 1));
      aSum += array[i] * log + (array[i + 1] - array[i]) * (-1 + (k - i) * log);
    }
    const b = array[k - 1] - array[k + 1];
    let cSum = 0;
    for (let i = k + 1; i < array.length - 1; i++) {
      const log = Math.log((i - k) / (i - k + 1));
      cSum += array[i] * log + (array[i - 1] - array[i]) * (1 + (i - k) * log);
    }
    result[k - 1] = ((inClockwise ? 1 : -1) * (aSum + b + cSum)) / Math.PI;
  }
  return result;
}
