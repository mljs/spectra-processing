import type { FromTo } from 'cheminfo-types';

import { createFromToArray } from '../utils/createFromToArray.ts';

import { zonesNormalize } from './zonesNormalize.ts';
import { zonesWithPoints } from './zonesWithPoints.ts';

export interface XZonesEquallySpacedOptions {
  /**
   * from - the minimum x value
   * @default zones[0].from
   */
  from?: number;

  /**
   * to - the maximum x value
   * @default zones[zones.length-1].to
   */
  to?: number;
}

/**
 * Function that returns a Number array of equally spaced numberOfPoints x values
 * distributed across the specified zones.
 * @param zones - array of from/to zones where x values should be distributed
 * @param numberOfPoints - total number of points to distribute across all zones
 * @param options - options
 * @returns array of equally spaced x values distributed across zones
 */
export function zonesToXEquallySpaced(
  zones: FromTo[],
  numberOfPoints: number,
  options: XZonesEquallySpacedOptions = {},
): Float64Array {
  if (!zones || zones.length === 0) {
    throw new RangeError('zones array must not be empty');
  }

  if (numberOfPoints < 1) {
    throw new RangeError("'numberOfPoints' must be greater than 0");
  }

  const from = options.from ?? zones[0].from;
  //@ts-expect-error zones is tested before
  const to = options.to ?? zones.at(-1).to;

  if (from > to) {
    throw new RangeError('from should be less than or equal to to');
  }

  const normalizedZones = zonesNormalize(zones, { from, to, exclusions: [] });
  const zonesWithPointsRes = zonesWithPoints(normalizedZones, numberOfPoints, {
    from,
    to,
  }).filter((zone) => zone.numberOfPoints);

  let xResult: number[] = [];
  for (const zone of zonesWithPointsRes) {
    if (!zone.numberOfPoints) {
      zone.numberOfPoints = 0;
    }

    const zoneXValues = Array.from(
      createFromToArray({
        from: zone.from,
        to: zone.to,
        length: zone.numberOfPoints,
        includeFrom: false,
        includeTo: false,
      }),
    );

    xResult = xResult.concat(zoneXValues);
  }

  return new Float64Array(xResult);
}
