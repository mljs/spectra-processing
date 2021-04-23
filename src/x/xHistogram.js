import { xCheck } from './xCheck';
import { xMaxValue } from './xMaxValue';
import { xMinValue } from './xMinValue';
import fill from 'ml-array-sequential-fill';

/**
 * Calculates an histogram of defined number of slots
 * @param {array} [array] Array containing values
 * @param {number} [options.nbSlots=256] Number of slots
 * @param {number} [options.min=minValue] Minimum value to calculate used to calculate slot size
 * @param {number} [options.max=maxValue] Maximal value to calculate used to calculate slot size
 * @param {number} [options.log10Scale=false] First apply a log10 on the values
 * @param {number} [options.centerX=true] Center the X value. We will enlarge the first and
 * @return {DataXY} {x,y} of the histogram
 */

export function xHistogram(array, options = {}) {
  xCheck(array);
  const { centerX = true, nbSlots = 256, log10Scale = false } = options;
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
  return {
    x: fill({
      from: min + (centerX ? slotSize / 2 : 0),
      to: max - (centerX ? slotSize / 2 : 0),
      size: nbSlots,
    }),
    y: counts,
  };
}
