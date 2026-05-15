import type { Point } from '../types/index.ts';
import type { XNormedOptions } from '../x/xNormed.ts';
import { xNormed } from '../x/xNormed.ts';

/**
 * Resize the Y values of the points to be normalized.
 * @param points - array of points {x,y}
 * @param options
 * @returns - array of points {x,y} with normalized Y values
 */
export function xyObjectNormedY(
  points: Point[],
  options?: XNormedOptions,
): Point[] {
  points = structuredClone(points);

  const ys = points.map((point) => point.y);
  const normalizedYs = xNormed(ys, options);
  for (let i = 0; i < points.length; i++) {
    points[i].y = normalizedYs[i];
  }
  return points;
}
