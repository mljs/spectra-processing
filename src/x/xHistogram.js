import { xCheck } from './xCheck';
import { xMaxValue } from './xMaxValue';
import { xMinValue } from './xMinValue';

/**
 * Calculates an histogram of defined number of slots
 * @param {array} [array] Array containing values
 * @param {number} [options.nbSlots=256] Number of slots
 * @param {number} [options.min=minValue] Minimum value to calculate used to calculate slot size
 * @param {number} [options.max=maxValue] Maximal value to calculate used to calculate slot size
 * @return {array} array of counts
 */

export function xHistogram(array, options = {}) {
  xCheck(array);
  const {
    nbSlots = 256,
    min = xMinValue(array),
    max = xMaxValue(array),
  } = options;
  const counts = new Uint32Array(nbSlots);

  const slotSize = (max - min) / (nbSlots + Number.EPSILON);
  for (let i = 0; i < array.length; i++) {
    counts[((array[i] - min) / slotSize) >> 0]++;
  }
  return counts;
}
