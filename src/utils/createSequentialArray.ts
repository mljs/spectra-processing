/**
 * Create an array with sequential numbers between from and to of length
 *
 * @param {number} [options.from=0]
 * @param {number} [options.to=1]
 * @param {number} [options.length=1001]
 * @param {OptionsType} options
 */
interface OptionsType {
  from?: number;
  to?: number;
  length?: number;
}
/**
 * @param {OptionsType} options OptionsType
 * @returns {Float64Array} array of floats
 */
export function createSequentialArray(options: OptionsType = {}): Float64Array {
  const { from = 0, to = 1, length = 1000 } = options;
  const array = new Float64Array(length);
  let step = (to - from) / (array.length - 1);
  for (let i = 0; i < array.length; i++) {
    array[i] = from + step * i;
  }
  return array;
}
