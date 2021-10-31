import { Data, Point } from '..';

import { xyCheck } from './xyCheck';

/**
 *
 * @param {Data} [data] array of points {x,y}
 * @returns {Point[]} results
 */
export function xyToXYObject(data: Data): Point[] {
  xyCheck(data);
  const { x, y } = data;
  let objectArray = [];
  for (let i = 0; i < x.length; i++) {
    objectArray.push({ x: x[i], y: y[i] });
  }
  return objectArray;
}
