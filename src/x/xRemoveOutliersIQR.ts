import type { NumberArray } from 'cheminfo-types';
import { isAnyArray } from 'is-any-array';

import { xBoxPlot } from './xBoxPlot';

/**
 * Remove the outliers from the array
 * Based on 1.5 IQR
 * @param array - data
 * @returns - trimmed data
 */
export function xRemoveOutliersIQR(array: NumberArray): NumberArray {
  if (!isAnyArray(array)) {
    throw new TypeError('input must be an array');
  }

  if (array.length === 0) {
    return array;
  }

  const boxPlot = xBoxPlot(array);
  const iqr = boxPlot.q3 - boxPlot.q1;
  const lowerWhisker = boxPlot.q1 - 1.5 * iqr;
  const higherWhisker = boxPlot.q3 + 1.5 * iqr;

  if (boxPlot.min >= lowerWhisker && boxPlot.max <= higherWhisker) {
    return array;
  }

  const filteredArray = [];
  for (const element of array) {
    if (element >= lowerWhisker && element <= higherWhisker) {
      filteredArray.push(element);
    }
  }
  return filteredArray;
}
