import { DataXY } from 'cheminfo-types';

interface XYWeightedMergeOptions {
  /**
   * window for abscissas to merge
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
export function xyWeightedMerge(
  data: DataXY,
  options: XYWeightedMergeOptions = {},
): DataXY<number[]> {
  const { x, y } = data;
  const { groupWidth = 0.001 } = options;

  const merged: DataXY<number[]> = { x: [], y: [] };
  const weightedAbscissa: DataXY<number[]> = { x: [], y: [] };
  let size = 0;
  let index = 0;

  while (index < x.length) {
    if (size === 0 || x[index] - merged.x[size - 1] > groupWidth) {
      weightedAbscissa.x.push(x[index] * y[index]);
      weightedAbscissa.y.push(y[index]);
      merged.x.push(x[index]);
      merged.y.push(y[index]);
      index++;
      size++;
    } else {
      weightedAbscissa.x[size - 1] += x[index] * y[index];
      weightedAbscissa.y[size - 1] += y[index];
      merged.x[size - 1] = x[index];
      merged.y[size - 1] += y[index];
      index++;
    }
  }

  for (let i = 0; i < merged.x.length; i++) {
    merged.x[i] = weightedAbscissa.x[i] / weightedAbscissa.y[i];
  }

  return merged;
}
