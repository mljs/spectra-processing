import { DataXY } from 'cheminfo-types';

export interface XYMergeByCentroidsOptions {
  /**
   * window size, has to be a positive number
   * @default 0.01
   */
  window?: number;
}

/**
 * Merge abscissa values if the ordinate value is in a list of centroids
 * @param data - object containing 2 properties x and y
 * @param centroids - centroids
 * @param options - options
 * @returns merged points
 */
export function xyMergeByCentroids(
  data: DataXY,
  centroids: number[],
  options: XYMergeByCentroidsOptions = {},
): DataXY<Float64Array> {
  const { window = 0.01 } = options;

  const mergedPoints = {
    x: Float64Array.from(centroids),
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
