import { xGetFromToIndex } from '../x/xGetFromToIndex';

import { xyCheck } from './xyCheck';
/**
 * Finds the max y value in a range and return a {x,y} point
 *
 * @param {{x?:number[],y?:number[],z?:number[]}} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
 * @param {number[]} data.x x
 * @param {number[]} data.y y
 * @param {number[]} data.z z
 * @param {object} [options={}] Options
 * @param {number} [options.from] - First value for xyIntegration in the X scale
 * @param {number} [options.fromIndex=0] - First point for xyIntegration
 * @param {number} [options.to] - Last value for xyIntegration in the X scale
 * @param {number} [options.toIndex=x.length-1] - Last point for xyIntegration
 * @returns {{ x: number; y: number; index: number }} result
 */
export function xyMaxYPoint(
  data: {
    x?: number[] | Float64Array | Float32Array | Uint16Array;
    y?: number[] | Float64Array | Float32Array | Uint16Array;
    z?: number[] | Float64Array | Float32Array | Uint16Array;
  } = {},
  options: {
    from?: number;
    fromIndex?: number;
    toIndex?: number;
    to?: number;
  } = {},
): { x: number; y: number; index: number } {
  xyCheck(data);
  const { x, y } = data;
  if (x === undefined || y === undefined || x.length < 2) {
    return { x: 0, y: 0, index: 0 };
  }

  const { fromIndex, toIndex } = xGetFromToIndex(x, options);

  let current = { x: x[fromIndex], y: y[fromIndex], index: fromIndex };
  for (let i = fromIndex; i <= toIndex; i++) {
    if (y[i] > current.y) current = { x: x[i], y: y[i], index: i };
  }

  return current;
}