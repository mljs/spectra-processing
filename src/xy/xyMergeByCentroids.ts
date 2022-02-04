/**
 * Merge abscissa values if the ordinate value is in a list of centroids
 * @param originalPoints
 * @param centroids
 * @param options
 * @return merged points
 */
export default function xyMergeByCentroids(
  originalPoints: { x: number[]; y: number[] },
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
    y: new Array(centroids.length).fill(0),
  };

  let originalIndex = 0;
  let mergedIndex = 0;
  while (
    originalIndex < originalPoints.x.length &&
    mergedIndex < centroids.length
  ) {
    let diff = originalPoints.x[originalIndex] - centroids[mergedIndex];
    if (Math.abs(diff) < window) {
      mergedPoints.y[mergedIndex] += originalPoints.y[originalIndex++];
    } else if (diff < 0) {
      originalIndex++;
    } else {
      mergedIndex++;
    }
  }

  return mergedPoints;
}
