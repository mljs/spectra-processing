import { DataXY, DoubleArray, FromTo, NumberArray } from 'cheminfo-types';

import { xFindClosestIndex } from '../x';
import { zonesNormalize } from '../zones';

import { xyCheck } from './xyCheck';

interface InternalZone {
  from: number;
  to: number;
  fromIndex: number;
  toIndex: number;
  nbPoints: number;
}

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
   * Number of points
   * @default 4001
   */
  nbPoints?: number;

  /**
   * If optimize we may have less than nbPoints at the end. It should not have visible effects
   * @default false
   */
  optimize?: boolean;

  /**
   * Array of zones to keep (from/to object)
   * @default []
   */
  zones?: FromTo[];
}

/**
 * Reduce the number of points while keeping visually the same noise. Practical to
 * display many spectra as SVG. If you want a similar looking spectrum you should still however
 * generate at least 4x the nbPoints that is being displayed.
 *
 * SHOULD NOT BE USED FOR DATA PROCESSING !!!
 * You should rather use ml-xy-equally-spaced to make further processing
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param options - options
 * @returns Object with x and y arrays
 */
export function xyReduce(
  data: DataXY,
  options: XYReduceOptions = {},
): DataXY<DoubleArray> {
  xyCheck(data);
  // todo we should check that the single point is really in the range and the zones
  if (data.x.length < 2) {
    return {
      x: Float64Array.from(data.x),
      y: Float64Array.from(data.y),
    };
  }
  const { x, y } = data;
  const {
    from = x[0],
    to = x.at(-1) as number,
    nbPoints = 4001,
    optimize = false,
  } = options;
  let { zones = [] } = options;

  zones = zonesNormalize(zones, { from, to });
  if (zones.length === 0) zones = [{ from, to }]; // we take everything

  const { internalZones, totalPoints } = getInternalZones(zones, x);

  // we calculate the number of points per zone that we should keep
  if (totalPoints <= nbPoints) {
    return notEnoughPoints(x, y, internalZones, totalPoints);
  }
  // need to xyReduce number of points
  const ratio = nbPoints / totalPoints;
  let currentTotal = 0;
  for (let i = 0; i < internalZones.length - 1; i++) {
    const zone = internalZones[i];
    zone.nbPoints = Math.round(zone.nbPoints * ratio);
    currentTotal += zone.nbPoints;
  }
  (internalZones.at(-1) as InternalZone).nbPoints = nbPoints - currentTotal;

  const newX: number[] = [];
  const newY: number[] = [];
  for (const zone of internalZones) {
    if (!zone.nbPoints) continue;
    appendFromTo(zone.fromIndex, zone.toIndex, zone.nbPoints);
  }
  return { x: newX, y: newY };

  /**
   * AppendFromTo.
   * @param fromIndex - From.
   * @param  toIndex - To.
   * @param zoneNbPoints - NbPoints.
   */
  function appendFromTo(
    fromIndex: number,
    toIndex: number,
    zoneNbPoints: number,
  ) {
    if (zoneNbPoints === 1) {
      newX.push(x[Math.round((toIndex - fromIndex) / 2)]);
      newY.push(y[Math.round((toIndex - fromIndex) / 2)]);
      return;
    }
    if (zoneNbPoints === 2) {
      newX.push(x[fromIndex], x[toIndex]);
      newY.push(y[fromIndex], y[toIndex]);
      return;
    }
    newX.push(x[fromIndex]);
    newY.push(y[fromIndex]);
    if (zoneNbPoints % 2 === 0) {
      zoneNbPoints = zoneNbPoints / 2 + 1;
    } else {
      zoneNbPoints = (zoneNbPoints - 1) / 2 + 1;
    }

    // we will need to make some kind of min / max because there are too many points
    // we will always keep the first point and the last point
    const slot = (x[toIndex] - x[fromIndex]) / (zoneNbPoints - 1);
    let currentX = x[fromIndex] + slot;
    let first = true;
    let minY = Number.POSITIVE_INFINITY;
    let xyMaxY = Number.NEGATIVE_INFINITY;
    for (let i = fromIndex + 1; i <= toIndex; i++) {
      if (first) {
        minY = y[i];
        xyMaxY = y[i];
        first = false;
      } else {
        if (y[i] < minY) minY = y[i];
        if (y[i] > xyMaxY) xyMaxY = y[i];
      }
      if (x[i] >= currentX || i === toIndex) {
        if (optimize) {
          if (minY > newY[newX.length - 1]) {
            // we can skip the intermediate value
          } else if (xyMaxY < newY[newX.length - 1]) {
            // we can skip the intermediate value
            xyMaxY = minY;
          } else {
            newX.push(currentX - slot / 2);
            newY.push(minY);
          }
        } else {
          newX.push(currentX - slot / 2);
          newY.push(minY);
        }

        newX.push(currentX);
        newY.push(xyMaxY);

        currentX += slot;
        first = true;
      }
    }
  }
}

export function notEnoughPoints(
  x: NumberArray,
  y: NumberArray,
  internalZones: InternalZone[],
  totalPoints: number,
) {
  const newX = new Float64Array(totalPoints);
  const newY = new Float64Array(totalPoints);
  let index = 0;
  for (const zone of internalZones) {
    for (let i = zone.fromIndex; i < zone.toIndex + 1; i++) {
      newX[index] = x[i];
      newY[index] = y[i];
      index++;
    }
  }
  return {
    x: newX,
    y: newY,
  };
}

export function getInternalZones(zones: FromTo[], x: NumberArray) {
  // for each zone we should know the first index, the last index and the number of points
  const internalZones: InternalZone[] = [];
  let totalPoints = 0;
  for (const zone of zones) {
    let fromIndex = xFindClosestIndex(x, zone.from);
    let toIndex = xFindClosestIndex(x, zone.to);
    if (fromIndex > 0 && x[fromIndex] > zone.from) {
      fromIndex--;
    }
    if (toIndex < x.length - 1 && x[toIndex] < zone.to) {
      toIndex++;
    }
    const nbPoints = toIndex - fromIndex + 1;
    internalZones.push({
      from: zone.from,
      to: zone.to,
      fromIndex,
      toIndex,
      nbPoints,
    });
    totalPoints += nbPoints;
  }
  return { internalZones, totalPoints };
}
