import { DataReIm } from '../types';

/**
 * Calculates reimAbsolute value of a complex spectrum.
 * @param data - complex spectrum
 * @returns - reimAbsolute value
 */
export function reimAbsolute(data: DataReIm): Float64Array {
  const length = data.re.length;
  const re = data.re;
  const im = data.im;
  const newArray = new Float64Array(length);
  for (let i = 0; i < length; i++) {
    newArray[i] = Math.hypot(re[i], im[i]);
  }

  return newArray;
}
