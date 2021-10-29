import { ArrayType, Data, Point, XYPoints } from '..';
import { xyCheck } from './xyCheck';

/**
 *
 * @param {DataXY} [data] array of points {x,y}
 * @returns {DataPoints}
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