import type { DataXY } from 'cheminfo-types';

import { xEnsureFloat64 } from '../x/index.ts';

/**
 * Converts both x and y arrays to Float64Array if they are not already.
 * @param data - object containing x and y arrays.
 * @returns data with x and y as Float64Array.
 */
export function xyEnsureFloat64(data: DataXY): DataXY<Float64Array> {
  return {
    x: xEnsureFloat64(data.x),
    y: xEnsureFloat64(data.y),
  };
}
