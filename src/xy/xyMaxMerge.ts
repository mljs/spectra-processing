import { DataXY } from 'cheminfo-types';

interface XYMaxMergeOptions {
  /**
   * Window for abscissas to merge
   * @default 0.001
   */
  groupWidth?: number;
}

/**
 * Merge abscissas values on similar ordinates and weight the group of abscissas
 * @param data - object containing 2 properties x and y
 * @param options - options
 * @returns array of merged and weighted points
 */
export function xyMaxMerge(
  data: DataXY,
  options: XYMaxMergeOptions = {},
): DataXY<number[]> {
  const { x, y } = data;
  const { groupWidth = 0.001 } = options;

  const merged: { x: number[]; y: number[] } = { x: [], y: [] };
  const maxAbscissa: { x: number[]; y: number[] } = { x: [], y: [] };
  let size = 0;
  let index = 0;

  while (index < x.length) {
    if (size === 0 || x[index] - merged.x[size - 1] > groupWidth) {
      maxAbscissa.x.push(x[index]);
      maxAbscissa.y.push(y[index]);
      merged.x.push(x[index]);
      merged.y.push(y[index]);
      index++;
      size++;
    } else {
      if (y[index] > maxAbscissa.y[size - 1]) {
        maxAbscissa.x[size - 1] = x[index];
        maxAbscissa.y[size - 1] = y[index];
      }
      merged.x[size - 1] = x[index];
      merged.y[size - 1] += y[index];
      index++;
    }
  }

  merged.x = maxAbscissa.x.slice();

  return merged;
}
