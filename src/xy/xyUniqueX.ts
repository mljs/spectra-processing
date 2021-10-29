import { Data } from '..';

import { xyCheck } from './xyCheck';
import { xySortX } from './xySortX';

/**
 * Ensure x values are unique
 *
 * @param {Data} [data] Object that contains property x (Array) and y (Array)
 * @param {object} [options={}] Object containing a property algorithm (can be 'sum' or 'average', the latter being the default value), and a property isSorted (boolean indicating if the x-array is sorted).
 * @param {string} [options.algorithm='average'] either 'average' or 'sum'
 * @param {boolean} [options.isSorted=true] if false the DataXY has to be sorted first
 * @returns {Data} result
 */
export function xyUniqueX(
  data: Data,
  options: { algorithm?: string; isSorted?: boolean } = {},
): Data {
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
 * @param {Data} data input
 * @returns {Data} result
 */
function average(data: Data): Data {
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
 * @param {Data} data input
 * @returns {Data} result
 */
function sum(data: Data) {
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
