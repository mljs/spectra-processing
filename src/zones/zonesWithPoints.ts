import { normalize } from './normalize';

/**
 * Add the number of points per zone to reach a specified total
 * @param zones - array of zones
 * @param numberOfPoints - total number of points to distribute between zones
 * @param options - options
 * @param options.from - specify min value of a zone
 * @param options.to - specify max value of a zone
 * @returns array of zones with points
 */

export function zonesWithPoints(
  zones: { from: number; to: number }[] = [],
  numberOfPoints = 10,
  options: { from?: number; to?: number } = {},
): { from: number; to: number; numberOfPoints?: number }[] {
  if (zones.length === 0) return zones;
  let returnZones = normalize(zones, options);

  const totalSize = returnZones.reduce((previous, current) => {
    return previous + (current.to - current.from);
  }, 0);

  let unitsPerPoint = totalSize / numberOfPoints;
  let currentTotal = 0;
  for (let i = 0; i < returnZones.length - 1; i++) {
    let zone: any = returnZones[i];
    zone.numberOfPoints = Math.min(
      Math.round((zone.to - zone.from) / unitsPerPoint),
      numberOfPoints - currentTotal,
    );
    currentTotal += zone.numberOfPoints;
  }

  let zone: any = returnZones[returnZones.length - 1];
  zone.numberOfPoints = numberOfPoints - currentTotal;

  return returnZones;
}
