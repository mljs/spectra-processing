import binarySearch from 'binary-search';
import { DataXY } from 'cheminfo-types';

import { numberSortAscending, numberSortDescending } from '../utils/numberSort';

/**Findding the closest points
 *
 * @param points - points in cartesian space
 * @param options - options
 * @returns - closest point
 */
export function xyClosestX(
  /** points */
  points: DataXY,
  options: {
    /** The target to which the x-coordinates should be close to
     * @default x[0]
     */
    target: number;
    /** The reverse option
     * @default false
     */
    reverse?: boolean;
  },
): {
  x: number;
  y: number;
} {
  const { x, y } = points;
  const { target = x[0], reverse = false } = options;

  let index;
  if (reverse) {
    index = binarySearch(x, target, numberSortDescending);
  } else {
    index = binarySearch(x, target, numberSortAscending);
  }

  if (index >= 0) {
    return {
      x: x[index],
      y: y[index],
    };
  } else {
    index = ~index;
    if (
      (index !== 0 && Math.abs(x[index] - target) > 0.5) ||
      index === x.length
    ) {
      return {
        x: x[index - 1],
        y: y[index - 1],
      };
    } else {
      return {
        x: x[index],
        y: y[index],
      };
    }
  }
}
