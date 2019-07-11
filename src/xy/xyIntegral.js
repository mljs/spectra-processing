import { arrayFindClosestIndex } from '../array/arrayFindClosestIndex';

/**
 * Generate a X / Y of the integral
 * @param {object} [points={}] - Object of points contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {number} [options.from] - First value for integration in the X scale
 * @param {number} [options.fromIndex=0] - First point for integration
 * @param {number} [options.to] - Last value for integration in the X scale
 * @param {number} [options.toIndex=x.length-1] - Last point for integration
 * @return {object}
 */

export function xyIntegral(points = {}, options = {}) {
  const { x, y } = points;
  if (x.length < 2) return { integration: 0 };
  if (x.length !== y.length) {
    throw new Error('The X and Y arrays mush have the same length');
  }

  let { fromIndex, toIndex, from, to } = options;

  if (fromIndex === undefined) {
    if (from !== undefined) {
      fromIndex = arrayFindClosestIndex(x, from);
    } else {
      fromIndex = 0;
    }
  }
  if (toIndex === undefined) {
    if (to !== undefined) {
      toIndex = arrayFindClosestIndex(x, to);
    } else {
      toIndex = x.length - 1;
    }
  }

  let integral = { x: [x[fromIndex]], y: [0] };
  let integration = 0;
  for (let i = fromIndex; i < toIndex; i++) {
    integration += ((x[i + 1] - x[i]) * (y[i + 1] + y[i])) / 2;
    integral.x.push(x[i + 1]);
    integral.y.push(integration);
  }

  return integral;
}
