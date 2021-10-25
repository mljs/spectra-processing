import { Zone } from '../index';
/**
 * Normalize an array of zones:
 * - ensure than from < to
 * - merge overlapping zones
 *
 * @param {Array<Zone>} [zones=[]]
 * @param {object} [options={}]
 * @param {number} [options.from=Number.MIN_VALUE]
 * @param {number} [options.to=Number.MAX_VALUE]
 */

/**
 * @param zones
 * @param options
 */

interface OptionsType {
  from?: number;
  to?: number;
}
/**
 * @param {Array<Zone>}  zones array of {to: number,from: number}
 * @param {OptionsType} options {from:number, to:number}
 * @returns {Array<Zone>} array of{to: number,from: number}
 */
export function zonesNormalize(
  zones: Zone[] = [],
  options: OptionsType = {},
): Zone[] {
  if (zones.length === 0) return [];
  zones = JSON.parse(JSON.stringify(zones)).map((zone: Zone) =>
    zone.from > zone.to ? { from: zone.to, to: zone.from } : zone,
  );
  let { from = Number.NEGATIVE_INFINITY, to = Number.POSITIVE_INFINITY } =
    options;
  if (from > to) {
    [from, to] = [to, from];
  }

  zones = zones.sort((a, b) => {
    if (a.from !== b.from) return a.from - b.from;
    return a.to - b.to;
  });

  zones.forEach((zone) => {
    if (from > zone.from) zone.from = from;
    if (to < zone.to) zone.to = to;
  });

  zones = zones.filter((zone) => zone.from <= zone.to);
  if (zones.length === 0) return [];

  let currentZone = zones[0];
  let result = [currentZone];
  for (let zone of zones) {
    if (zone.from <= currentZone.to) {
      currentZone.to = zone.to;
    } else {
      currentZone = zone;
      result.push(currentZone);
    }
  }
  return result;
}
