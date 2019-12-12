import { check } from './check';

/**
 *
 * @param {array} [data] array of points {x,y}
 */
export function toXYObject(points) {
  check(points);
  const { x, y } = points;
  let data = [];
  for (let i = 0; i < x.length; i++) {
    data.push({ x: x[i], y: y[i] });
  }
  return data;
}
