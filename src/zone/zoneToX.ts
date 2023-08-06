import { FromTo } from 'cheminfo-types';

/**
 * Deprecated !!! Should use utils/createFromToArray
 *
 * @param zone.
 * @param size - Size.
 * @returns - Array of float.
 */
export function zoneToX(zone: FromTo, size: number): Float64Array {
  const { from, to } = zone;
  const array = new Float64Array(size);
  const step = (to - from) / (size - 1);
  for (let i = 0; i < size; i++) {
    array[i] = from + step * i;
  }
  return array;
}
