import { getFromToIndex } from '../x/getFromToIndex';

import { check } from './check';
/**
 * Generate a X / Y of the integral
 * @param {DataXY} [data={}] - Object that contains property x (an ordered increasing array) and y (an array)
 * @param {object} [options={}]
 * @param {number} [options.from] - First value for integration in the X scale
 * @param {number} [options.fromIndex=0] - First point for integration
 * @param {number} [options.to] - Last value for integration in the X scale
 * @param {number} [options.toIndex=x.length-1] - Last point for integration
 * @param {boolean} [options.reverse=false] - Integrate from the larger value to the smallest value
 * @return {{x:[],y:[]}} An object with the integration function
 */

export function integral(data = {}, options = {}) {
  const { reverse = false } = options;
  check(data);
  const { x, y } = data;
  if (x.length < 2) return 0;

  const { fromIndex, toIndex } = getFromToIndex(x, options);

  let integration = 0;
  let currentIntegral;
  if (reverse) {
    currentIntegral = { x: [x[toIndex]], y: [0] };
    for (let i = toIndex; i > fromIndex; i--) {
      integration += ((x[i] - x[i - 1]) * (y[i - 1] + y[i])) / 2;
      currentIntegral.x.push(x[i - 1]);
      currentIntegral.y.push(integration);
    }
    currentIntegral.x.reverse();
    currentIntegral.y.reverse();
  } else {
    currentIntegral = { x: [x[fromIndex]], y: [0] };
    for (let i = fromIndex; i < toIndex; i++) {
      integration += ((x[i + 1] - x[i]) * (y[i + 1] + y[i])) / 2;
      currentIntegral.x.push(x[i + 1]);
      currentIntegral.y.push(integration);
    }
  }

  return currentIntegral;
}
