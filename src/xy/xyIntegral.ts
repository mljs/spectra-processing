import { DataXY, DataXYZ } from '..';
import { xGetFromToIndex } from '../x/xGetFromToIndex';

import { xyCheck } from './xyCheck';
/**
 * Generate a X / Y of the xyIntegral
 *
 * @param [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
 * @param [options={}] Options
 * @param [options.from] - First value for xyIntegration in the X scale
 * @param [options.fromIndex=0] - First point for xyIntegration
 * @param [options.to] - Last value for xyIntegration in the X scale
 * @param [options.toIndex=x.length-1] - Last point for xyIntegration
 * @param [options.reverse=false] - Integrate from the larger value to the smallest value
 * @returns An object with the xyIntegration function
 */
export function xyIntegral(
  data: DataXYZ = {},
  options: {
    reverse?: boolean;
    from?: number;
    fromIndex?: number;
    toIndex?: number;
    to?: number;
  } = {},
): DataXY | number {
  const { reverse = false } = options;
  xyCheck(data);
  const { x, y } = data;
  if (x === undefined || y === undefined || x.length < 2) return 0;

  const { fromIndex, toIndex } = xGetFromToIndex(x, options);

  let xyIntegration = 0;
  let currentxyIntegral;
  if (reverse) {
    currentxyIntegral = { x: [x[toIndex]], y: [0] };
    for (let i = toIndex; i > fromIndex; i--) {
      xyIntegration += ((x[i] - x[i - 1]) * (y[i - 1] + y[i])) / 2;
      currentxyIntegral.x.push(x[i - 1]);
      currentxyIntegral.y.push(xyIntegration);
    }
    currentxyIntegral.x.reverse();
    currentxyIntegral.y.reverse();
  } else {
    currentxyIntegral = { x: [x[fromIndex]], y: [0] };
    for (let i = fromIndex; i < toIndex; i++) {
      xyIntegration += ((x[i + 1] - x[i]) * (y[i + 1] + y[i])) / 2;
      currentxyIntegral.x.push(x[i + 1]);
      currentxyIntegral.y.push(xyIntegration);
    }
  }

  return currentxyIntegral;
}
