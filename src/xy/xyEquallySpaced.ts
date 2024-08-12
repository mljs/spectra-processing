import { DataXY, FromTo } from 'cheminfo-types';

import { createFromToArray } from '../utils';
import { zonesNormalize, zonesWithPoints } from '../zones';

import equallySpacedSlot from './utils/equallySpacedSlot';
import equallySpacedSmooth from './utils/equallySpacedSmooth';
import { xyCheck } from './xyCheck';

export interface XYEquallySpacedOptions {
  /**
   * from
   * @default x[0]
   */
  from?: number;

  /**
   * to
   * @default x[x.length-1]
   */
  to?: number;

  /**
   * variant
   * @default 'smooth'
   */
  variant?: 'slot' | 'smooth';

  /**
   * number of points
   * @default 100
   */
  numberOfPoints?: number;

  /**
   * array of from / to that should be skipped for the generation of the points
   * @default []
   */
  exclusions?: FromTo[];

  /**
   * array of from / to that should be kept
   * @default []
   */
  zones?: FromTo[];
}

/**
 * Function that returns a Number array of equally spaced numberOfPoints
 * containing a representation of intensities of the spectra arguments x
 * and y.
 *
 * The options parameter contains an object in the following form:
 * from: starting point
 * to: last point
 * numberOfPoints: number of points between from and to
 * variant: "slot" or "smooth" - smooth is the default option
 *
 * The slot variant consist that each point in an array is calculated
 * averaging the existing points between the slot that belongs to the current
 * value. The smooth variant is the same but takes the integral of the range
 * of the slot and divide by the step size between two points in an array.
 *
 * If exclusions zone are present, zones are ignored !
 * @param data - object containing 2 properties x and y
 * @param options - options
 * @returns new object with x / y array with the equally spaced data.
 */

export function xyEquallySpaced(
  data: DataXY,
  options: XYEquallySpacedOptions = {},
): DataXY<number[]> {
  const { x, y } = data;
  const xLength = x.length;

  const {
    from = x[0],
    to = x[xLength - 1],
    variant = 'smooth',
    numberOfPoints = 100,
    exclusions = [],
    zones = [{ from, to }],
  } = options;

  if (from > to) {
    throw new RangeError('from should be larger than to');
  }

  xyCheck(data);

  if (numberOfPoints < 2) {
    throw new RangeError("'numberOfPoints' option must be greater than 1");
  }

  const normalizedZones = zonesNormalize(zones, { from, to, exclusions });
  const zonesWithPointsRes = zonesWithPoints(normalizedZones, numberOfPoints, {
    from,
    to,
  }).filter((zone) => zone.numberOfPoints);

  let xResult: number[] = [];
  let yResult: number[] = [];
  for (const zone of zonesWithPointsRes) {
    if (!zone.numberOfPoints) {
      zone.numberOfPoints = 0;
    }

    const zoneResult = processZone(
      Array.from(x),
      Array.from(y),
      zone.from,
      zone.to,
      zone.numberOfPoints,
      variant,
    );

    xResult = xResult.concat(zoneResult.x);
    yResult = yResult.concat(zoneResult.y);
  }

  return { x: xResult, y: yResult };
}

function processZone(
  x: number[],
  y: number[],
  from: number,
  to: number,
  numberOfPoints: number,
  variant: 'smooth' | 'slot',
) {
  if (numberOfPoints < 1) {
    throw new RangeError('the number of points must be at least 1');
  }
  const output =
    variant === 'slot'
      ? Array.from(equallySpacedSlot(x, y, from, to, numberOfPoints))
      : Array.from(equallySpacedSmooth(x, y, from, to, numberOfPoints));

  return {
    x: Array.from(
      createFromToArray({
        from,
        to,
        length: numberOfPoints,
      }),
    ),
    y: output,
  };
}
