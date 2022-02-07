import { DataXY } from 'cheminfo-types';

/**
 * Merge abscissas values on similar ordinates and weight the group of abscissas
 *
 * @param points - points
 * @param options - options
 * @return array of merged and weighted points
 */
export function xyWeightedMerge(
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
  let weightedAbscissa: { x: number[]; y: number[] } = { x: [], y: [] };
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
