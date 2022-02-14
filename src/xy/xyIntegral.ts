import { DataXY } from 'cheminfo-types';

import { xGetFromToIndex } from '../x/xGetFromToIndex';

import { xyCheck } from './xyCheck';

/**
 * Generate a X / Y of the xyIntegral
 *
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param options - Options
 * @returns - An object with the xyIntegration function
 */
export function xyIntegral(
  data: DataXY,
  options: {
    /**
     * Integrate from the larger value to the smallest value
     * @default false
     * */
    reverse?: boolean;
    /**
     * First value for xyIntegration in the X scale
     */
    from?: number;
    /**
     * First point for xyIntegration
     * @default 0
     * */
    fromIndex?: number;
    /**
     *  Last point for xyIntegration
     * @default x.length-1
     * */
    toIndex?: number;
    /**
     * Last value for xyIntegration in the X scale
     */
    to?: number;
  } = {},
): DataXY {
  const { reverse = false } = options;
  xyCheck(data, { minLength: 1 });
  const { x, y } = data;

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
