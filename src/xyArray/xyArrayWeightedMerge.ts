import { DataXY, NumberArray } from 'cheminfo-types';

import { Point } from '..';

/**
 * Merge DataXY
 * We have an array of DataXY and the goal is to merge all the values for which the deltaX is small or equal to delta.
 * X values are weighted average
 *
 * @param data - data
 * @param options - Options
 */
export function xyArrayWeightedMerge(
  data: DataXY[],
  options: {
    /**
     * The range in which the two x values of the data must be to be placed on the same line. It may also be a function that allows to change `delta` depending on the X values of the spectrum
     * @default 1
     */
    delta?: ((arg: number) => number) | number;
  } = {},
): DataXY {
  let { delta = 1 } = options;
  if (typeof delta === 'number') {
    let deltaNumber = delta;
    delta = () => deltaNumber;
  }
  data = data.filter((spectrum) => spectrum.x.length > 0);

  if (data.length === 0) return { x: [], y: [] };

  let x = [];
  let y = [];

  const positions = new Array(data.length).fill(0);
  const point: Point = { x: 0, y: 0 };

  nextValue(data, positions, point);
  let slot = {
    maxX: point.x + delta(point.x),
    sumY: point.y,
    sumXY: point.y * point.x,
  };

  while (data.length !== 0) {
    nextValue(data, positions, point);
    let sameSlot = point.x <= slot.maxX;
    if (!sameSlot) {
      if (slot.sumY > 0) {
        x.push(slot.sumXY / slot.sumY);
        y.push(slot.sumY);
      }
      slot.sumY = 0;
      slot.sumXY = 0;
    }

    slot.sumY += point.y;
    slot.sumXY += point.x * point.y;
    slot.maxX = point.x + delta(point.x);

    if (data.length === 0) {
      if (slot.sumY > 0) {
        x.push(slot.sumXY / slot.sumY);
        y.push(slot.sumY);
      }
    }
  }
  return { x, y };
}

/**
 * NextValue.
 *
 * @param data - data.
 * @param positions - Positions array.
 * @param point - Point.
 */
function nextValue(data: DataXY[], positions: NumberArray, point: Point) {
  let minIndex = 0;
  let minX = data[0].x[positions[0]];

  for (let i = 1; i < data.length; i++) {
    let currentX = data[i].x[positions[i]];
    if (currentX < minX) {
      minX = currentX;
      minIndex = i;
    }
  }

  point.x = minX;
  point.y = data[minIndex].y[positions[minIndex]];

  positions[minIndex]++;

  if (positions[minIndex] === data[minIndex].x.length) {
    (positions as number[]).splice(minIndex, 1);
    data.splice(minIndex, 1);
  }
}
