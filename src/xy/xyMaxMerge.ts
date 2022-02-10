import { DataXY } from 'cheminfo-types';

/**
 * Merge abscissas values on similar ordinates and weight the group of abscissas
 *
 * @param points - points
 * @param options - options
 * @return array of merged and weighted points
 */
export function xyMaxMerge(
  points: DataXY,
  options: {
    /** window for abscissas to merge
     * @default 0.001
     */
    groupWidth?: number;
  } = {},
): DataXY {
  const { x, y } = points;
  const { groupWidth = 0.001 } = options;

  let merged: { x: number[]; y: number[] } = { x: [], y: [] };
  let maxAbscissa: { x: number[]; y: number[] } = { x: [], y: [] };
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
