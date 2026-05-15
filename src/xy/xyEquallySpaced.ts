import type { DataXY, FromTo } from 'cheminfo-types';

import { createFromToArray } from '../utils/index.ts';
import { zonesNormalize, zonesWithPoints } from '../zones/index.ts';

import equallySpacedSlot from './utils/equallySpacedSlot.ts';
import equallySpacedSmooth from './utils/equallySpacedSmooth.ts';
import { xyCheck } from './xyCheck.ts';

export interface XYEquallySpacedOptions {
  /**
   * Start of the output x range.
   * @default x[0]
   */
  from?: number;

  /**
   * End of the output x range.
   * @default x[x.length-1]
   */
  to?: number;

  /**
   * `slot` averages y values within each bin; `smooth` uses the trapezoidal integral divided by the step size.
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
 * Resample a spectrum to equally spaced x points.
 * When `exclusions` are provided they take precedence and `zones` is ignored.
 * @param data - object containing x and y arrays
 * @param options - options
 * @returns resampled spectrum with equally spaced x values
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
