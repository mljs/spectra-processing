import { ArrayType, DataReIm } from '../index';
/**
 * Calculates reimAbsolute value of a complex spectrum
 *
 * @param {DataReIm } data  DATA
 * @returns {Float64Array | number[]} array of float
 */
export function reimAbsolute(data: DataReIm): ArrayType {
  const length = data.re.length;
  const re = data.re;
  const im = data.im;
  const newArray = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    newArray[i] = Math.sqrt(re[i] ** 2 + im[i] ** 2);
  }

  return newArray;
}
