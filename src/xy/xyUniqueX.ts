import { DataXY } from 'cheminfo-types';

import { xyCheck } from './xyCheck';
import { xySortX } from './xySortX';

/**
 * Ensure x values are unique
 *
 * @param data - Object that contains property x (Array) and y (Array)
 * @param options - Object containing a property algorithm (can be 'sum' or 'average', the latter being the default value), and a property isSorted (boolean indicating if the x-array is sorted).
 */
export function xyUniqueX(
  data: DataXY,
  options: {
    /**
     * either 'average' or 'sum'
     * @default 'average'
     * */
    algorithm?: string;
    /**
     * if false the DataXY has to be sorted first
     *  @default true
     * */
    isSorted?: boolean;
  } = {},
): DataXY {
  xyCheck(data);

  const { algorithm = 'average', isSorted = true } = options;

  if (!isSorted) {
    data = xySortX(data);
  }

  switch (algorithm) {
    case 'average':
      return average(data);
    case 'sum':
      return sum(data);
    default:
      throw new Error(`xyUniqueX: unknown algorithm: ${algorithm}`);
  }
}

/**
 * Average.
 *
 * @param data - Input.
 * @returns Result.
 */
function average(data: DataXY): DataXY {
  let x = [];
  let y = [];
  let cumulativeY = data.y[0];
  let divider = 1;
  for (let i = 1; i < data.x.length; i++) {
    if (!(data.x[i] === data.x[i - 1])) {
      x.push(data.x[i - 1]);
      y.push(cumulativeY / divider);
      cumulativeY = 0;
      divider = 0;
    }
    cumulativeY += data.y[i];
    divider++;
  }
  x.push(data.x[data.x.length - 1]);
  y.push(cumulativeY / divider);
  return { x, y };
}

/**
 * Sum.
 *
 * @param data - Input.
 * @returns Result.
 */
function sum(data: DataXY) {
  let x = [];
  let y = [];
  let cumulativeY = data.y[0];
  for (let i = 1; i < data.x.length; i++) {
    if (!(data.x[i] === data.x[i - 1])) {
      x.push(data.x[i - 1]);
      y.push(cumulativeY);
      cumulativeY = 0;
    }
    cumulativeY += data.y[i];
  }
  x.push(data.x[data.x.length - 1]);
  y.push(cumulativeY);
  return { x, y };
}
