import type { DataXY } from 'cheminfo-types';

import { xyCheck } from './xyCheck.ts';

/**
 * Convert a DataXY object to a flat interleaved array [x, y, x, y, ...].
 * @param data - DataXY object with x and y arrays.
 * @returns Flat array alternating x and y values.
 */
export function xyToInterleaved(data: DataXY): Float64Array {
  xyCheck(data);
  const { x, y } = data;
  const result = new Float64Array(x.length * 2);
  for (let i = 0; i < x.length; i++) {
    result[2 * i] = x[i];
    result[2 * i + 1] = y[i];
  }
  return result;
}
