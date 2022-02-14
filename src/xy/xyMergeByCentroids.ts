import { DataXY } from 'cheminfo-types';

/**
 * Merge abscissa values if the ordinate value is in a list of centroids
 *
 * @param points - points
 * @param centroids - centroids
 * @param options - options
 * @return merged points
 */
export function xyMergeByCentroids(
  points: DataXY,
  centroids: number[],
  options: {
    /** window size, has to be a positive number
     * @default 0.01
     */
    window?: number;
  } = {},
) {
  const { window = 0.01 } = options;

  let mergedPoints = {
    x: centroids.slice(),
    y: new Float64Array(centroids.length).fill(0),
  };

  let originalIndex = 0;
  let mergedIndex = 0;
  while (originalIndex < points.x.length && mergedIndex < centroids.length) {
    let diff = points.x[originalIndex] - centroids[mergedIndex];
    if (Math.abs(diff) < window) {
      mergedPoints.y[mergedIndex] += points.y[originalIndex++];
    } else if (diff < 0) {
      originalIndex++;
    } else {
      mergedIndex++;
    }
  }

  return mergedPoints;
}
