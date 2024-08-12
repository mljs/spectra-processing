import { FromTo } from 'cheminfo-types';

import { zonesNormalize } from './zonesNormalize';

export interface ZonesWithPointsOptions {
  /**
   * specify min value of zones
   * @default Number.NEGATIVE_INFINITY
   */
  from?: number;

  /**
   * specify max value of zones
   * @default Number.POSITIVE_INFINITY
   */
  to?: number;
}

export interface FromToWithNumberOfPoints extends FromTo {
  numberOfPoints: number;
}

/**
 * Add the number of points per zone to reach a specified total
 * @param zones - array of zones
 * @param numberOfPoints - total number of points to distribute between zones
 * @param options - options
 * @returns array of zones with points
 */
export function zonesWithPoints(
  zones: FromTo[] = [],

  /**
   * total number of points to distribute between zones
   * @default 10
   */
  numberOfPoints = 10,
  options: ZonesWithPointsOptions = {},
): FromToWithNumberOfPoints[] {
  if (zones.length === 0) return [];
  const normalizedZones = zonesNormalize(zones, options);
  const zonesWithNumberOfPoints: FromToWithNumberOfPoints[] = [];

  const totalSize = normalizedZones.reduce((previous, current) => {
    return previous + (current.to - current.from);
  }, 0);

  const unitsPerPoint = totalSize / numberOfPoints;
  let currentTotal = 0;

  for (let i = 0; i < normalizedZones.length - 1; i++) {
    const tempZone = normalizedZones[i];
    const tempZoneNumberOfPoints = Math.min(
      Math.round((tempZone.to - tempZone.from) / unitsPerPoint),
      numberOfPoints - currentTotal,
    );
    zonesWithNumberOfPoints.push({
      ...tempZone,
      numberOfPoints: tempZoneNumberOfPoints,
    });
    currentTotal += tempZoneNumberOfPoints;
  }

  zonesWithNumberOfPoints.push({
    ...(normalizedZones.at(-1) as FromTo),
    numberOfPoints: numberOfPoints - currentTotal,
  });

  return zonesWithNumberOfPoints;
}
