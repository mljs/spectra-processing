import { DataXY, DoubleArray, FromTo } from 'cheminfo-types';

import { zonesNormalize } from '../zones';

import { xyCheck } from './xyCheck';
import { getInternalZones, notEnoughPoints } from './xyReduce';

export interface XYReduceOptions {
  /**
   * @default x[0]
   */
  from?: number;

  /**
   * @default x[x.length-1]
   */
  to?: number;

  /**
   * Number of points but we could have couple more
   * @default 4001
   */
  maxApproximateNbPoints?: number;

  /**
   * Array of zones to keep (from/to object)
   * @default []
   */
  zones?: FromTo[];
}

/**
 * Reduce the number of points while keeping visually the same noise. Practical to
 * display many spectra as SVG. This algorithm is designed for non-continuous data.
 * We are expecting peaks to be only positive and the x values to be ordered.
 * SHOULD NOT BE USED FOR DATA PROCESSING !!!
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param options - options
 * @returns Object with x and y arrays
 */
export function xyReduceNonContinuous(
  data: DataXY,
  options: XYReduceOptions = {},
): DataXY<DoubleArray> {
  xyCheck(data);
  if (data.x.length < 2) {
    // todo we should check that the single point is really in the range and the zones
    return {
      x: Float64Array.from(data.x),
      y: Float64Array.from(data.y),
    };
  }
  const { x, y } = data;
  const {
    from = x[0],
    to = x.at(-1) as number,
    maxApproximateNbPoints = 4001,
  } = options;
  let { zones = [] } = options;

  zones = zonesNormalize(zones, { from, to });
  if (zones.length === 0) zones = [{ from, to }]; // we take everything

  const { internalZones, totalPoints } = getInternalZones(zones, x);

  // we calculate the number of points per zone that we should keep
  if (totalPoints <= maxApproximateNbPoints) {
    return notEnoughPoints(x, y, internalZones, totalPoints);
  }

  const deltaX = (to - from) / (maxApproximateNbPoints - 1);
  const newX: number[] = [];
  const newY: number[] = [];
  for (const internalZone of internalZones) {
    const maxNbPoints =
      Math.ceil((internalZone.to - internalZone.from) / deltaX) + 1;
    const fromIndex = internalZone.fromIndex;
    const toIndex = internalZone.toIndex;

    if (toIndex - fromIndex + 1 <= maxNbPoints) {
      // we keep all the points
      for (let i = fromIndex; i <= toIndex; i++) {
        newX.push(x[i]);
        newY.push(y[i]);
      }
    } else {
      // we need to reduce the number of points
      let currentX = x[fromIndex];
      let currentY = y[fromIndex];
      let lastX = currentX + deltaX;
      newX.push(currentX);
      newY.push(currentY);
      for (let i = fromIndex; i <= toIndex; i++) {
        if (x[i] > lastX) {
          // next slot
          currentX = x[i];
          currentY = y[i];
          newX.push(currentX);
          newY.push(currentY);
          lastX += deltaX;
        }
        if (y[i] > currentY) {
          currentY = y[i];
          newY[newY.length - 1] = currentY;
        }
      }
    }
  }
  return {
    x: newX,
    y: newY,
  };
}
