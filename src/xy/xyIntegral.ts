import { DataXY } from 'cheminfo-types';

import { xGetFromToIndex } from '../x';

import { xyCheck } from './xyCheck';
import { XYIntegrationOptions } from './xyIntegration';

export interface XYIntegralOptions extends XYIntegrationOptions {
  /**
   * Integrate from the larger value to the smallest value
   * @default false
   */
  reverse?: boolean;
}

/**
 * Generate a X / Y of the xyIntegral
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param options - Options
 * @returns - An object with the xyIntegration function
 */
export function xyIntegral(
  data: DataXY,
  options: XYIntegralOptions = {},
): DataXY<Float64Array> {
  const { reverse = false } = options;
  xyCheck(data, { minLength: 1 });
  const { x, y } = data;

  const { fromIndex, toIndex } = xGetFromToIndex(x, options);

  let xyIntegration = 0;
  const currentxyIntegral = {
    x: new Float64Array(toIndex - fromIndex + 1),
    y: new Float64Array(toIndex - fromIndex + 1),
  };
  let index = 0;
  if (reverse) {
    currentxyIntegral.y[index] = 0;
    currentxyIntegral.x[index++] = x[toIndex];
    for (let i = toIndex; i > fromIndex; i--) {
      xyIntegration += ((x[i] - x[i - 1]) * (y[i - 1] + y[i])) / 2;
      currentxyIntegral.x[index] = x[i - 1];
      currentxyIntegral.y[index++] = xyIntegration;
    }
    currentxyIntegral.x.reverse();
    currentxyIntegral.y.reverse();
  } else {
    currentxyIntegral.y[index] = 0;
    currentxyIntegral.x[index++] = x[fromIndex];
    for (let i = fromIndex; i < toIndex; i++) {
      xyIntegration += ((x[i + 1] - x[i]) * (y[i + 1] + y[i])) / 2;
      currentxyIntegral.x[index] = x[i + 1];
      currentxyIntegral.y[index++] = xyIntegration;
    }
  }

  return currentxyIntegral;
}
