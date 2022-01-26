import { DataXY } from 'cheminfo-types';

import { xGetFromToIndex } from '../x/xGetFromToIndex';

import { xyCheck } from './xyCheck';

/**
 * Calculate integration
 *
 * @param data - Object that contains property x (an ordered increasing array) and y (an array)
 * @param options - Options
 * @returns - xyIntegration value on the specified range
 */
export function xyIntegration(data: DataXY, options = {}): number {
  xyCheck(data, { minLength: 1 });
  const { x, y } = data;
  if (x.length === 1) return 0;
  const { fromIndex, toIndex } = xGetFromToIndex(x, options);
  let currentxyIntegration = 0;
  for (let i = fromIndex; i < toIndex; i++) {
    currentxyIntegration += ((x[i + 1] - x[i]) * (y[i + 1] + y[i])) / 2;
  }

  return currentxyIntegration;
}
