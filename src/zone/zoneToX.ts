import { Zone } from '..';

/**
 * @param {Zone} zone Zone
 * @param {number} size size
 * @returns {Array<Float64Array>} Array of float
 */
export function zoneToX(zone: Zone, size: number): Float64Array {
  const { from, to } = zone;
  let array = new Float64Array(size);
  let step = (to - from) / (size - 1);
  for (let i = 0; i < size; i++) {
    array[i] = from + step * i;
  }
  return array;
}
