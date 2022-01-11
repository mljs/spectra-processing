import { isAnyArray } from 'is-any-array';

import { DataXYZ } from '..';

/**
 * Throw an error in no an object of x,y arrays
 *
 * @param data - array of points {x,y,z}
 */
export function xyCheck(data: DataXYZ = {}) {
  if (!isAnyArray(data.x) || !isAnyArray(data.y)) {
    throw new Error('Data must be an object of x and y arrays');
  }
  if ((data.x as number[]).length !== (data.y as number[]).length) {
    throw new Error('The x and y arrays mush have the same length');
  }
}
