import { DataXY } from 'cheminfo-types';

/**
 * Merge abscissa values if the ordinate value is in a list of centroids
 *
 * @param data - object containing 2 properties x and y
 * @param centroids - centroids
 * @param options - options
 * @return merged points
 */
export function xyMergeByCentroids(
  data: DataXY,
  centroids: number[],
  options: {
    /** window size, has to be a positive number
     * @default 0.01
     */
    window?: number;
  } = {},
) {
  const { window = 0.01 } = options;

  const mergedPoints = {
    x: centroids.slice(),
    y: new Float64Array(centroids.length).fill(0),
  };

  let originalIndex = 0;
  let mergedIndex = 0;
  while (originalIndex < data.x.length && mergedIndex < centroids.length) {
    const diff = data.x[originalIndex] - centroids[mergedIndex];
    if (Math.abs(diff) < window) {
      mergedPoints.y[mergedIndex] += data.y[originalIndex++];
    } else if (diff < 0) {
      originalIndex++;
    } else {
      mergedIndex++;
    }
  }

  return mergedPoints;
}
