import { NumberArray } from 'cheminfo-types';

import { xCheck } from './xCheck';
import { xStandardDeviation } from './xStandardDeviation';

/**
 * Pareto scaling, which uses the square root of standard deviation as the scaling factor, circumvents the amplification of noise by retaining a small portion of magnitude information.
 * Noda, I. (2008). Scaling techniques to enhance two-dimensional correlation spectra. Journal of Molecular Structure, 883, 216-227.
 * DOI: 10.1016/j.molstruc.2007.12.026
 * @param array - array of number
 */
export function xParetoNormalization(array: NumberArray): Float64Array {
  xCheck(array);
  const result = new Float64Array(array.length);
  const sqrtSD = Math.sqrt(xStandardDeviation(array));

  for (let i = 0; i < array.length; i++) {
    result[i] = array[i] / sqrtSD;
  }
  return result;
}
