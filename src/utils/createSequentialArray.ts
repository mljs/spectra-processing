import { ArrayType } from '..';

/**
 * Create an array with sequential numbers between from and to of length
 *
 * @param {object} options Options
 * @param {number} [options.from=0] from
 * @param {number} [options.to=1] to
 * @param {number} [options.length=1001] length
 * @returns {ArrayType} array of floats
 */
export function createSequentialArray(
  options: {
    from?: number;
    to?: number;
    length?: number;
  } = {},
): ArrayType {
  const { from = 0, to = 1, length = 1000 } = options;
  const array = new Float64Array(length);
  let step = (to - from) / (array.length - 1);
  for (let i = 0; i < array.length; i++) {
    array[i] = from + step * i;
  }
  return array;
}
