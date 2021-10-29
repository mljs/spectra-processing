import { isAnyArray } from 'is-any-array';

import { DataXYZ } from '..';

/**
 * Throw an error in no an object of x,y arrays
 *
 * @param {{x?:number[],y?:number[]}} [data={}] data
 * @param {number[]} data.x array of numbers
 * @param {number[]} data.y array of numbers
 * @param {number[]} data.z array of numbers
 */
export function xyCheck(data: DataXYZ = {}) {
  if (!isAnyArray(data.x) || !isAnyArray(data.y)) {
    throw new Error('Data must be an object of x and y arrays');
  }
  if ((data.x as number[]).length !== (data.y as number[]).length) {
    throw new Error('The x and y arrays mush have the same length');
  }
}
