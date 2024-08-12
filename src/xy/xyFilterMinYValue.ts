import { DataXY } from 'cheminfo-types';

import { xMinMaxValues } from '../x';

/**
 * Filter an array x/y based on various criteria x points are expected to be sorted
 * @param data - object containing 2 properties x and y
 * @param minRelativeYValue - the minimum relative value compare to the Y max value
 * @returns filtered data
 */
export function xyFilterMinYValue(data: DataXY, minRelativeYValue?: number) {
  if (minRelativeYValue === undefined) return data;

  const { x, y } = data;

  const { min, max } = xMinMaxValues(y);
  const threshold = max * minRelativeYValue;
  if (min >= threshold) return data;

  const newX: number[] = [];
  const newY: number[] = [];
  for (let i = 0; i < x.length; i++) {
    if (y[i] >= threshold) {
      newX.push(x[i]);
      newY.push(y[i]);
    }
  }

  return {
    x: newX,
    y: newY,
  };
}
