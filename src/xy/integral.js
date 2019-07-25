import { getFromToIndex } from '../array/getFromToIndex';

import { check } from './check';
/**
 * Generate a X / Y of the integral
 * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {number} [options.from] - First value for integration in the X scale
 * @param {number} [options.fromIndex=0] - First point for integration
 * @param {number} [options.to] - Last value for integration in the X scale
 * @param {number} [options.toIndex=x.length-1] - Last point for integration
 * @return {{x:[],y:[]}} A object with the integration function
 */

export function integral(points = {}, options = {}) {
  check(points);
  const { x, y } = points;
  if (x.length < 2) return 0;

  const { fromIndex, toIndex } = getFromToIndex(x, options);

  let integral = { x: [x[fromIndex]], y: [0] };
  let integration = 0;
  for (let i = fromIndex; i < toIndex; i++) {
    integration += ((x[i + 1] - x[i]) * (y[i + 1] + y[i])) / 2;
    integral.x.push(x[i + 1]);
    integral.y.push(integration);
  }

  return integral;
}
