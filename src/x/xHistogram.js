import { xCheck } from './xCheck';
import { xMaxValue } from './xMaxValue';
import { xMinValue } from './xMinValue';

/**
 * Calculates an histogram of defined number of slots
 * @param {array} [array] Array containing values
 * @param {number} [options.nbSlots=256] Number of slots
 * @param {number} [options.min=minValue] Minimum value to calculate used to calculate slot size
 * @param {number} [options.max=maxValue] Maximal value to calculate used to calculate slot size
 * @param {number} [options.log10Scale=false] Should we use a log scale
 * @return {array} array of counts
 */

export function xHistogram(array, options = {}) {
  xCheck(array);
  const { nbSlots = 256, log10Scale = false } = options;
  const counts = new Uint32Array(nbSlots);
  if (log10Scale) {
    array = array.slice();
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.log10(array[i]);
    }
  }

  const { min = xMinValue(array), max = xMaxValue(array) } = options;

  const slotSize = (max - min) / (nbSlots + Number.EPSILON);
  for (let i = 0; i < array.length; i++) {
    counts[
      Math.min(((array[i] - min - Number.EPSILON) / slotSize) >> 0, nbSlots - 1)
    ]++;
  }
  return counts;
}
