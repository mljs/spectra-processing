import { xyCheck } from './xyCheck';

/**
 *
 * @param {ArrayPoints} [data] array of points {x,y}
 */
export function xyToXYObject(points) {
  xyCheck(points);
  const { x, y } = points;
  let data = [];
  for (let i = 0; i < x.length; i++) {
    data.push({ x: x[i], y: y[i] });
  }
  return data;
}
