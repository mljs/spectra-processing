import { DataXY, PointXY } from 'cheminfo-types';

import { xFindClosestIndex } from '../x';

/**
 * Finds the closest point
 * @param data - x array should be sorted and ascending
 * @param target - target to search
 * @returns - closest point
 */
export function xyFindClosestPoint(
  /** points */
  data: DataXY,
  target: number,
): PointXY {
  const { x, y } = data;

  const index = xFindClosestIndex(x, target);
  return {
    x: x[index],
    y: y[index],
  };
}
